<template>
  <view :class="bem()" ref="rootRef">
    <slot />
    <view
      v-if="props.teleport"
      :style="{ display: 'none' }"
      ref="teleportContainerRef"
    >
      <view
        ref="sidebarRef"
        :class="bem('sidebar')"
        :style="sidebarStyle"
        @click="onClickSidebar"
        @touchstart.passive="onTouchStartSidebar"
        @touchmove.passive="onTouchMoveSidebar"
        @touchend.passive="onTouchEndSidebar"
        @touchcancel.passive="onTouchEndSidebar"
      >
        <text
          v-for="(item, index) in props.indexList"
          :key="index"
          :class="bem('index', { active: item === activeAnchor })"
          :style="item === activeAnchor ? highlightStyle : undefined"
          :data-index="item"
        >
          {{ item }}
        </text>
      </view>
    </view>
    <view
      v-else
      ref="sidebarRef"
      :class="bem('sidebar')"
      :style="sidebarStyle"
      @click="onClickSidebar"
      @touchstart.passive="onTouchStartSidebar"
      @touchmove.passive="onTouchMoveSidebar"
      @touchend.passive="onTouchEndSidebar"
      @touchcancel.passive="onTouchEndSidebar"
    >
      <text
        v-for="(item, index) in props.indexList"
        :key="index"
        :class="bem('index', { active: item === activeAnchor })"
        :style="item === activeAnchor ? highlightStyle : undefined"
        :data-index="item"
      >
        {{ item }}
      </text>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick, getCurrentInstance, provide, PropType, ComponentPublicInstance } from 'vue';
import { createNamespace, isDef, getScrollTop, getRootScrollTop, setRootScrollTop, preventDefault, truthProp, numericProp, makeNumberProp } from '../../utils/index';
import { useTouch } from '../../composables/use-touch';
import { useScrollParent } from '../../composables/use-scroll-parent';
import { useRect } from '../../composables/use-rect';
import { INDEX_BAR_KEY } from './constants';

const [name, bem] = createNamespace('index-bar');

const props = defineProps({
  // ... existing props
  customClass: String,
  customStyle: [String, Object],
  // ... existing props
  sticky: truthProp,
  zIndex: numericProp,
  teleport: [String, Object] as PropType<string | Element>,
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array as PropType<(string | number)[]>, // More specific type
    default: () => {
      const charCodeOfA = 'A'.charCodeAt(0);
      return Array(26)
        .fill('')
        .map((_, i) => String.fromCharCode(charCodeOfA + i));
    },
  },
  itemHeight: makeNumberProp(0),
  scrollable: truthProp,
});

const actualZIndex = computed(() => props.zIndex || 1);
  sticky: truthProp,
  zIndex: numericProp,
  teleport: [String, Object],
  highlightColor: String,
  stickyOffsetTop: makeNumberProp(0),
  indexList: {
    type: Array,
    default: () => {
      const charCodeOfA = 'A'.charCodeAt(0);
      return Array(26)
        .fill('')
        .map((_, i) => String.fromCharCode(charCodeOfA + i));
    },
  },
  itemHeight: makeNumberProp(0), // For uniapp, we might need a fixed item height for calculations if getBoundingClientRect is not reliable
  scrollable: truthProp, // Indicates if the main content area is scrollable by itself or relies on page scroll
});

const emit = defineEmits(['select', 'change']);

const instance = getCurrentInstance()!; // Non-null assertion if sure it exists

const rootRef = ref<ComponentPublicInstance | HTMLElement>();
const sidebarRef = ref<ComponentPublicInstance | HTMLElement>();
const teleportContainerRef = ref<ComponentPublicInstance | HTMLElement>(); // For teleport

const activeAnchor = ref('');
const touch = useTouch();
const scrollParent = ref<Window | Element | UniApp.ScrollViewProps | undefined>();

const children = ref<any[]>([]);

provide(INDEX_BAR_KEY, {
  props,
  children,
  addChild: (child: any) => {
    children.value.push(child);
    children.value.sort((a, b) => {
      // Ensure proxy and index exist before comparing
      const indexA = a.proxy?.index;
      const indexB = b.proxy?.index;
      if (indexA !== undefined && indexB !== undefined) {
        if (typeof indexA === 'number' && typeof indexB === 'number') {
          return indexA - indexB || a.uid - b.uid;
        }
        // Handle string indices if necessary, or ensure they are numbers
        return String(indexA).localeCompare(String(indexB)) || a.uid - b.uid;
      }
      return a.uid - b.uid; // Fallback if indices are not available
    });
  },
  removeChild: (child: any) => {
    children.value = children.value.filter(item => item !== child);
  }
});

let selectActiveIndex: string | number = '';

const sidebarStyle = computed(() => {
  const style: Record<string, any> = {};
  if (isDef(actualZIndex.value)) {
    style.zIndex = +actualZIndex.value + 1;
  }
  return style;
});

const highlightStyle = computed(() => {
  if (props.highlightColor) {
    return {
      color: props.highlightColor,
    };
  }
  return {};
});

const getActiveAnchor = (scrollTop: number, rects: any[]) => {
  for (let i = children.value.length - 1; i >= 0; i--) {
    const prevHeight = i > 0 ? rects[i - 1].height : 0;
    const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;
    if (scrollTop + reachTop >= rects[i].top) {
      return i;
    }
  }
  return -1;
};

const getElementRect = (selector: string, inInstance?: any): Promise<UniApp.BoundingClientRect | null> => {
  return new Promise((resolve) => {
    const query = inInstance ? uni.createSelectorQuery().in(inInstance) : uni.createSelectorQuery();
    query.select(selector).boundingClientRect(data => {
      resolve(data as UniApp.BoundingClientRect | null);
    }).exec();
  });
};

const getAnchorsRects = async () => {
  const rects = [];
  for (const child of children.value) {
    const rect = await child.proxy.getRect();
    rects.push(rect);
  }
  return rects;
};

const onScroll = async () => {
  if (!rootRef.value || !scrollParent.value) {
    return;
  }

  // #ifdef H5
  if (rootRef.value && (rootRef.value as any).style.display === 'none') return;
  // #endif

  const scrollTop = getScrollTop(scrollParent.value);
  const scrollParentRect = scrollParent.value === window ? { top: 0, left: 0, width: 0, height: 0 } : await useRect(scrollParent.value as Element, instance);
  const rects = await getAnchorsRects();

  let active = -1;
  if (selectActiveIndex) {
    const match = children.value.find(item => String(item.proxy.index) === selectActiveIndex);
    if (match) {
      const rect = await match.proxy.getRect() as UniApp.BoundingClientRect;
      if (rect) {
        active = getActiveAnchor(rect.top - (props.sticky ? props.stickyOffsetTop : 0), rects);
      }
    }
  } else {
    active = getActiveAnchor(scrollTop, rects);
  }

  // Ensure active is within bounds of indexList
  if (active < 0 || active >= props.indexList.length) {
    // Potentially reset activeAnchor or handle out-of-bounds case
    // activeAnchor.value = ''; // Or some default
  } else {
    const currentActiveAnchor = props.indexList[active] as string;
    if (activeAnchor.value !== currentActiveAnchor) {
      activeAnchor.value = currentActiveAnchor;
      emit('change', activeAnchor.value);
    }
  }

  if (props.sticky) {
    for (let i = 0; i < children.value.length; i++) {
      const item = children.value[i];
      const itemProxy = item.proxy;
      const rect = await itemProxy.getRect() as UniApp.BoundingClientRect;
      if (!rect) continue;

      const isActive = i === active;
      // Check if rect.top is a valid number before comparison
      const isStuck = isActive && typeof rect.top === 'number' && rect.top <= props.stickyOffsetTop;

      itemProxy.state.active = isActive;
      itemProxy.state.isStuck = isStuck;
      itemProxy.state.left = rect.left;
      itemProxy.state.width = rect.width;

      if (isStuck) {
        itemProxy.state.top = props.stickyOffsetTop + (scrollParentRect?.top || 0);
      } else if (i === active - 1 && selectActiveIndex === '') {
        const activeItem = children.value[active];
        if (activeItem) {
          const activeItemRect = await activeItem.proxy.getRect() as UniApp.BoundingClientRect;
          if (activeItemRect && typeof activeItemRect.top === 'number' && typeof rect.height === 'number') {
            const activeItemTop = activeItemRect.top - scrollTop;
            itemProxy.state.active = activeItemTop > 0;
            itemProxy.state.top = activeItemTop + (scrollParentRect?.top || 0) - rect.height;
          }
        }
      } else {
        itemProxy.state.top = 0; // Reset if not active or stuck
      }
    }
  }
  selectActiveIndex = '';
};

const init = async () => {
  // #ifdef H5
  if (props.teleport && teleportContainerRef.value && sidebarRef.value) {
    const targetElement = typeof props.teleport === 'string' ? document.querySelector(props.teleport) : props.teleport;
    const sidebarNode = sidebarRef.value as HTMLElement;
    if (targetElement && sidebarNode && sidebarNode.parentElement !== targetElement) {
        targetElement.appendChild(sidebarNode);
    }
  }
  // #endif
  await nextTick();
  onScroll();
};

const getSidebarRect = async (): Promise<UniApp.BoundingClientRect | null> => {
  if (sidebarRef.value) {
    // In uniapp, refs might point to component instance or DOM element
    // For querySelector, we need a DOM element or a selector string.
    // If sidebarRef is a component instance, try to get its $el or a specific class within it.
    const sidebarElement = (sidebarRef.value as any).$el || sidebarRef.value;
    if (sidebarElement && typeof sidebarElement.getAttribute === 'function') { // Check if it's an HTMLElement-like object
        return getElementRect(bem('sidebar'), instance);
    }
    // Fallback if it's not directly queryable, or if bem('sidebar') is not unique enough
    // This might happen if sidebarRef is not a direct DOM element ref
    // Consider adding a unique ID to the sidebar view for more robust selection
  }
  return null;
};

const getIndexFromTouchEvent = async (event: TouchEvent | UniApp.TouchEvent) => {
  const touchDetail = (event as UniApp.TouchEvent).touches[0] || (event as UniApp.TouchEvent).changedTouches[0];
  // Fallback for H5 TouchEvent
  const clientX = touchDetail?.clientX ?? (event as TouchEvent).touches[0]?.clientX;
  const clientY = touchDetail?.clientY ?? (event as TouchEvent).touches[0]?.clientY;

  if (typeof clientX !== 'number' || typeof clientY !== 'number') return null;

  const sidebarRect = await getSidebarRect();
  if (!sidebarRect || typeof sidebarRect.height !== 'number' || typeof sidebarRect.top !== 'number' || typeof sidebarRect.left !== 'number' || typeof sidebarRect.width !== 'number') return null;

  const itemHeight = sidebarRect.height / props.indexList.length;
  if (itemHeight <= 0) return null; // Avoid division by zero or negative height

  // Check if touch is within sidebar bounds
  if (clientX >= sidebarRect.left && clientX <= sidebarRect.left + sidebarRect.width && clientY >= sidebarRect.top && clientY <= sidebarRect.top + sidebarRect.height) {
    const offsetY = clientY - sidebarRect.top;
    const index = Math.floor(offsetY / itemHeight);
    if (index >= 0 && index < props.indexList.length) {
      return props.indexList[index];
    }
  }
  return null;
};

const scrollTo = async (index: string | number) => {
  selectActiveIndex = String(index);
  const match = children.value.find(item => String(item.proxy?.index) === selectActiveIndex);

  if (match && match.proxy) {
    emit('select', match.proxy.index);
    const rect = await match.proxy.getRect() as UniApp.BoundingClientRect;
    if (!rect || typeof rect.top !== 'number') return;

    const currentScrollTop = getScrollTop(scrollParent.value);

    let targetScrollTop = currentScrollTop + rect.top;
    if (props.sticky) {
      targetScrollTop -= props.stickyOffsetTop;
    }

    // For uniapp, scrolling needs to be handled differently
    // #ifdef MP | APP-PLUS
    uni.pageScrollTo({
      scrollTop: targetScrollTop,
      duration: 0, // Instant scroll
      complete: () => {
        setTimeout(() => {
            onScroll();
        }, 100);
      }
    });
    // #endif
    // #ifdef H5
    if (scrollParent.value === window) {
      setRootScrollTop(targetScrollTop);
    } else if (scrollParent.value && typeof (scrollParent.value as Element).scrollTop === 'number') {
      (scrollParent.value as Element).scrollTop = targetScrollTop;
    }
    // Use requestAnimationFrame for H5 to ensure smooth updates after scroll
    requestAnimationFrame(onScroll);
    // #endif
  }
};

const onClickSidebar = async (event: Event | UniApp.TapEvent) => {
  const target = event.target as HTMLElement;
  // In UniApp, dataset might be on currentTarget for complex event bubbling
  const index = target.dataset?.index || (event.currentTarget as HTMLElement)?.dataset?.index;
  if (index) {
    scrollTo(index);
  }
};

let touchActiveIndex: string | number | null = null;

const onTouchStartSidebar = (event: TouchEvent | UniApp.TouchEvent) => {
  touch.start(event as TouchEvent); // useTouch expects TouchEvent, cast if needed
};

const onTouchMoveSidebar = async (event: TouchEvent | UniApp.TouchEvent) => {
  touch.move(event as TouchEvent);
  if (touch.isVertical()) {
    preventDefault(event as Event, true);
    const currentIndex = await getIndexFromTouchEvent(event);
    if (currentIndex && touchActiveIndex !== currentIndex) {
      touchActiveIndex = currentIndex;
      scrollTo(currentIndex);
    }
  }
};

const onTouchEndSidebar = () => {
  touchActiveIndex = null;
};


onMounted(async () => {
  scrollParent.value = await useScrollParent(rootRef as any, instance);
  // #ifdef H5
  if (scrollParent.value && typeof (scrollParent.value as Window).addEventListener === 'function') {
    (scrollParent.value as Window).addEventListener('scroll', onScroll, { passive: true });
  }
  // #endif
  init();
});

// Expose for parent or template refs
defineExpose({
  scrollTo,
  rootRef,
  sidebarRef,
  children,
  onScroll // Expose onScroll for manual triggering from page
});

// Watchers
watch(() => props.indexList, init, { deep: true });
watch(children, init, { deep: true });

</script>

<style lang="scss">
:root,
:host {
  --van-index-bar-sidebar-z-index: var(--zx-index-bar-sidebar-z-index, 2); // Use a zx-prefixed var or fallback
  --van-index-bar-index-font-size: var(--zx-index-bar-index-font-size, var(--van-font-size-xs, 10px));
  --van-index-bar-index-line-height: var(--zx-index-bar-index-line-height, var(--van-line-height-xs, 14px));
  --van-index-bar-index-active-color: var(--zx-index-bar-index-active-color, var(--van-primary-color, #1989fa));
  --van-padding-xs: var(--zx-padding-xs, 8px);
  --van-padding-md: var(--zx-padding-md, 16px);
}

.zx-index-bar {
  position: relative;

  &__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: var(--van-index-bar-sidebar-z-index);
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
  }

  &__index {
    padding: 0 var(--van-padding-xs) 0 var(--van-padding-md);
    font-weight: var(--van-font-bold, 500);
    font-size: var(--van-index-bar-index-font-size);
    line-height: var(--van-index-bar-index-line-height);
    display: block;

    &--active {
      color: var(--van-index-bar-index-active-color);
    }
  }
}
</style>
    }
  } else {
    active = getActiveAnchor(scrollTop, rects);
  }

  const currentActiveAnchor = props.indexList[active] as string;
  if (activeAnchor.value !== currentActiveAnchor) {
    activeAnchor.value = currentActiveAnchor;
    emit('change', activeAnchor.value);
  }

  if (props.sticky) {
    children.value.forEach(async (item, index) => {
      const itemProxy = item.proxy;
      const rect = await itemProxy.getRect();
      const isActive = index === active;
      const isStuck = isActive && rect.top <= props.stickyOffsetTop;

      itemProxy.state.active = isActive;
      itemProxy.state.isStuck = isStuck;
      itemProxy.state.left = rect.left;
      itemProxy.state.width = rect.width;

      if (isStuck) {
        itemProxy.state.top = props.stickyOffsetTop + scrollParentRect.top;
      } else if (index === active - 1 && selectActiveIndex === '') {
        const activeItemRect = await children.value[active]?.proxy.getRect();
        if (activeItemRect) {
          const activeItemTop = activeItemRect.top - scrollTop;
          itemProxy.state.active = activeItemTop > 0;
          itemProxy.state.top = activeItemTop + scrollParentRect.top - rect.height;
        }
      } else {
        itemProxy.state.top = 0; // Reset if not active or stuck
      }
    });
  }
  selectActiveIndex = '';
};

const init = async () => {
  // #ifdef H5
  if (props.teleport && teleportContainerRef.value && sidebarRef.value) {
    const target = typeof props.teleport === 'string' ? document.querySelector(props.teleport) : props.teleport;
    if (target && sidebarRef.value.parentElement !== target) {
        target.appendChild(sidebarRef.value);
    }
  }
  // #endif
  await nextTick();
  onScroll();
};

const getSidebarRect = () => {
  return new Promise((resolve) => {
    if (sidebarRef.value) {
      uni.createSelectorQuery().in(instance).select(`.${bem('sidebar')}`).boundingClientRect(data => {
        resolve(data);
      }).exec();
    } else {
      resolve(null);
    }
  });
};

const getIndexFromTouchEvent = async (event: TouchEvent) => {
  const touchDetail = event.touches[0] || event.changedTouches[0];
  const { clientX, clientY } = touchDetail;

  const sidebarRect = await getSidebarRect() as UniApp.BoundingClientRect;
  if (!sidebarRect) return null;

  const { top, left, width, height } = sidebarRect;
  const itemHeight = height / props.indexList.length;

  // Check if touch is within sidebar bounds
  if (clientX >= left && clientX <= left + width && clientY >= top && clientY <= top + height) {
    const offsetY = clientY - top;
    const index = Math.floor(offsetY / itemHeight);
    if (index >= 0 && index < props.indexList.length) {
      return props.indexList[index];
    }
  }
  return null;
};

const scrollTo = async (index: string | number) => {
  selectActiveIndex = String(index);
  const match = children.value.find(item => String(item.proxy.index) === selectActiveIndex);

  if (match) {
    emit('select', match.proxy.index);
    const rect = await match.proxy.getRect();
    const currentScrollTop = getScrollTop(scrollParent.value);

    let targetScrollTop = currentScrollTop + rect.top;
    if (props.sticky) {
      targetScrollTop -= props.stickyOffsetTop;
    }

    // For uniapp, scrolling needs to be handled differently
    // #ifdef MP | APP-PLUS
    uni.pageScrollTo({
      scrollTop: targetScrollTop,
      duration: 0, // Instant scroll
      complete: () => {
        // After scrolling, recalculate positions
        // Use timeout to ensure DOM updates after scroll
        setTimeout(() => {
            onScroll();
        }, 100); // Adjust delay if needed
      }
    });
    // #endif
    // #ifdef H5
    if (scrollParent.value === window) {
      setRootScrollTop(targetScrollTop);
    } else if (scrollParent.value) {
      (scrollParent.value as Element).scrollTop = targetScrollTop;
    }
    // H5 might also need a slight delay or rely on its scroll event listener
    requestAnimationFrame(onScroll);
    // #endif
  }
};

const onClickSidebar = async (event: Event) => {
  // For uniapp, event.target.dataset might not be reliable directly in click
  // We need to calculate based on click position if possible, or rely on a different approach
  // The current implementation uses data-index on the text node, which might work
  const target = event.target as HTMLElement;
  const index = target.dataset.index;
  if (index) {
    scrollTo(index);
  }
};

let touchActiveIndex: string | number | null = null;

const onTouchStartSidebar = (event: TouchEvent) => {
  touch.start(event);
};

const onTouchMoveSidebar = async (event: TouchEvent) => {
  touch.move(event);
  if (touch.isVertical()) {
    preventDefault(event, true);
    const currentIndex = await getIndexFromTouchEvent(event);
    if (currentIndex && touchActiveIndex !== currentIndex) {
      touchActiveIndex = currentIndex;
      scrollTo(currentIndex);
    }
  }
};

const onTouchEndSidebar = () => {
  touchActiveIndex = null;
};


onMounted(async () => {
  scrollParent.value = await useScrollParent(rootRef, instance);
  // #ifdef H5
  if (scrollParent.value) {
    scrollParent.value.addEventListener('scroll', onScroll, { passive: true });
  }
  // #endif
  // For MP/APP, page scroll is listened to by onPageScroll in the page itself
  // or we can try to use IntersectionObserver if available and suitable.
  // For now, we'll rely on manual calls or a wrapper component to trigger onScroll for MP/APP.
  init();
});

// Expose for parent or template refs
defineExpose({
  scrollTo,
  rootRef,
  sidebarRef,
  children
});

// Watchers
watch(() => props.indexList, init, { deep: true });
watch(children, init, { deep: true });

// For Mini Programs and App, onPageScroll needs to be handled in the page using this component
// This is a common pattern for scroll-dependent components in UniApp.
// The page would get the ref to this component and call its onScroll method.
// Alternatively, if props.scrollable is true, this component might manage its own scroll view.

// If using teleport, ensure the sidebar is moved correctly in H5
// For non-H5, teleport might not be directly supported or needed in the same way.
// UniApp's teleport equivalent might be cover-view for some scenarios, but that's for native components.
// For now, teleport is primarily an H5 consideration for this component structure.

</script>

<style lang="scss">
:root,
:host {
  --van-index-bar-sidebar-z-index: 2;
  --van-index-bar-index-font-size: var(--van-font-size-xs, 10px);
  --van-index-bar-index-line-height: var(--van-line-height-xs, 14px);
  --van-index-bar-index-active-color: var(--van-primary-color, #1989fa);
  --van-padding-xs: 8px; // Define if not globally available
  --van-padding-md: 16px; // Define if not globally available
}

.zx-index-bar {
  position: relative;

  &__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: var(--van-index-bar-sidebar-z-index);
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
    // background-color: #f7f8fa; // Optional: for better visibility
    // padding: 5px 0;
    // border-radius: 100px;
  }

  &__index {
    padding: 0 var(--van-padding-xs) 0 var(--van-padding-md);
    font-weight: var(--van-font-bold, 500);
    font-size: var(--van-index-bar-index-font-size);
    line-height: var(--van-index-bar-index-line-height);
    // For uniapp, ensure text nodes are clickable
    display: block; // or inline-block if preferred
    // min-width: 20px; // Ensure a minimum tap area

    &--active {
      color: var(--van-index-bar-index-active-color);
      // font-weight: 700; // Already bold from parent, or make it bolder
    }
  }
}
</style>