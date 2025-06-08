<template>
  <view ref="rootRef" :class="bem()">
    <slot />
    <view ref="sidebarRef" :class="bem('sidebar')" :style="sidebarStyle" @click="onClickSidebar"
      @touchstart="onTouchStartSidebar" @touchmove="onTouchMoveSidebar" @touchend="onTouchEndSidebar">
      <view v-for="(index, i) in indexList" :key="i" :class="bem('index', { active: activeAnchor === index })"
        :style="{ color: activeAnchor === index ? highlightColor : '' }" :data-index="index">
        {{ index }}
      </view>
    </view>
    <!-- Teleport container for H5 -->
    <view v-if="false" ref="teleportContainerRef" style="display: none;"></view>
  </view>
</template>

<script setup>
import { computed, ref, reactive, provide, onMounted, watch, nextTick, getCurrentInstance } from 'vue';
import { createNamespace, useTouch, useScrollParent, getScrollTop, getRootScrollTop, setRootScrollTop, preventDefault, INDEX_BAR_KEY, isDef } from '../utils/index.js';

const [name, bem] = createNamespace('index-bar');

const props = defineProps({
  customClass: String,
  customStyle: [String, Object],
  sticky: {
    type: Boolean,
    default: true,
  },
  zIndex: {
    type: [Number, String],
    default: 1,
  },
  teleport: {
    type: [String, Element],
    default: '',
  },
  highlightColor: {
    type: String,
    default: '#1989fa',
  },
  stickyOffsetTop: {
    type: Number,
    default: 0,
  },
  indexList: {
    type: Array,
    default: () => {
      const charCodeOfA = 'A'.charCodeAt(0);
      const indexList = [];
      for (let i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
      }
      return indexList;
    },
  },
});

const emit = defineEmits(['select', 'change']);

const instance = getCurrentInstance();
const rootRef = ref();
const sidebarRef = ref();
const teleportContainerRef = ref();

const activeAnchor = ref('');
const children = ref([]);
const scrollParent = ref(null);
const touch = useTouch();

const sidebarStyle = computed(() => ({
  zIndex: props.zIndex,
}));

const addChild = (child) => {
  children.value.push(child);
};

const removeChild = (child) => {
  const index = children.value.indexOf(child);
  if (index !== -1) {
    children.value.splice(index, 1);
  }
};

// Provide context to child anchors
provide(INDEX_BAR_KEY, {
  props,
  addChild,
  removeChild,
  children,
});

const getActiveAnchor = (scrollTop, rects) => {
  for (let i = rects.length - 1; i >= 0; i--) {
    const prevHeight = i > 0 ? rects[i - 1].height : 0;
    const reachTop = props.sticky ? scrollTop + props.stickyOffsetTop + prevHeight >= rects[i].top : scrollTop >= rects[i].top;
    if (reachTop) {
      return i;
    }
  }
  return -1;
};

const getAnchorsRects = async () => {
  const rects = [];
  for (const child of children.value) {
    const rect = await child.proxy.getRect();
    rects.push({
      top: rect.top,
      height: rect.height,
    });
  }
  return rects;
};

let selectActiveIndex = '';

const onScroll = async () => {
  if (!children.value.length) return;

  const scrollTop = getScrollTop(scrollParent.value);
  const rects = await getAnchorsRects();

  let active = -1;
  if (selectActiveIndex) {
    const activeIndex = children.value.findIndex(child => String(child.proxy.index) === selectActiveIndex);
    if (activeIndex !== -1) {
      active = activeIndex;
    }
  } else {
    active = getActiveAnchor(scrollTop, rects);
  }

  const currentActiveAnchor = active >= 0 ? props.indexList[active] : '';
  if (activeAnchor.value !== currentActiveAnchor) {
    activeAnchor.value = currentActiveAnchor;
    emit('change', activeAnchor.value);
  }

  if (props.sticky) {
    const scrollParentRect = scrollParent.value === window
      ? { top: 0, left: 0 }
      : await new Promise((resolve) => {
        if (scrollParent.value && scrollParent.value !== window) {
          uni.createSelectorQuery().in(instance)
            .select('.scroll-parent') // You might need to adjust this selector
            .boundingClientRect((data) => {
              resolve(data ? { top: data.top, left: data.left } : { top: 0, left: 0 });
            }).exec();
        } else {
          resolve({ top: 0, left: 0 });
        }
      });

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
        itemProxy.state.active = false;
        itemProxy.state.isStuck = false;
      }
    });
  }

  selectActiveIndex = '';
};

const init = async () => {
  // #ifdef H5
  if (props.teleport && teleportContainerRef.value && sidebarRef.value) {
    const target = typeof props.teleport === 'string'
      ? document.querySelector(props.teleport)
      : props.teleport;
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
      uni.createSelectorQuery().in(instance)
        .select(`.${bem('sidebar')}`)
        .boundingClientRect((data) => {
          resolve(data);
        }).exec();
    } else {
      resolve(null);
    }
  });
};

const getIndexFromTouchEvent = async (event) => {
  const touchDetail = event.touches[0] || event.changedTouches[0];
  const { clientX, clientY } = touchDetail;

  const sidebarRect = await getSidebarRect();
  if (!sidebarRect) return null;

  const { top, left, width, height } = sidebarRect;
  const itemHeight = height / props.indexList.length;

  if (clientX >= left && clientX <= left + width && clientY >= top && clientY <= top + height) {
    const offsetY = clientY - top;
    const index = Math.floor(offsetY / itemHeight);
    if (index >= 0 && index < props.indexList.length) {
      return props.indexList[index];
    }
  }
  return null;
};

const scrollTo = async (index) => {
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

    // #ifdef MP || APP-PLUS
    uni.pageScrollTo({
      scrollTop: targetScrollTop,
      duration: 0,
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
    } else if (scrollParent.value && typeof scrollParent.value.scrollTop === 'number') {
      scrollParent.value.scrollTop = targetScrollTop;
    }
    requestAnimationFrame(onScroll);
    // #endif
  }
};

const onClickSidebar = async (event) => {
  const target = event.target;
  const index = target.dataset?.index || event.currentTarget?.dataset?.index;
  if (index) {
    scrollTo(index);
  }
};

let touchActiveIndex = null;

const onTouchStartSidebar = (event) => {
  touch.start(event);
};

const onTouchMoveSidebar = async (event) => {
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
  if (scrollParent.value && typeof scrollParent.value.addEventListener === 'function') {
    scrollParent.value.addEventListener('scroll', onScroll, { passive: true });
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
  onScroll
});

// Watchers
watch(() => props.indexList, init, { deep: true });
watch(children, init, { deep: true });

</script>

<style lang="scss">
:root,
:host {
  --zx-index-bar-sidebar-z-index: var(--van-index-bar-sidebar-z-index, 2);
  --zx-index-bar-index-font-size: var(--van-index-bar-index-font-size, var(--van-font-size-xs, 10px));
  --zx-index-bar-index-line-height: var(--van-index-bar-index-line-height, var(--van-line-height-xs, 14px));
  --zx-index-bar-index-active-color: var(--van-index-bar-index-active-color, var(--van-primary-color, #1989fa));
  --zx-padding-xs: var(--van-padding-xs, 8px);
  --zx-padding-md: var(--van-padding-md, 16px);
}

.zx-index-bar {
  position: relative;

  &__sidebar {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: var(--zx-index-bar-sidebar-z-index);
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    cursor: pointer;
    user-select: none;
  }

  &__index {
    padding: 0 var(--zx-padding-xs) 0 var(--zx-padding-md);
    font-weight: var(--van-font-bold, 500);
    font-size: var(--zx-index-bar-index-font-size);
    line-height: var(--zx-index-bar-index-line-height);
    display: block;

    &--active {
      color: var(--zx-index-bar-index-active-color);
    }
  }
}
</style>