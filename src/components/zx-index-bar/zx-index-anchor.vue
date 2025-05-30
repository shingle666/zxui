<template>
  <view :id="elementId" :class="bem({ sticky: state.isStuck && props.sticky })" :style="style">
    <view
      v-if="props.sticky"
      :class="bem('sticky-content')"
      :style="stickyStyle"
    >
      <slot>
        <text>{{ props.index }}</text>
      </slot>
    </view>
    <template v-else>
      <slot>
        <text>{{ props.index }}</text>
      </slot>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, onBeforeUnmount, inject, getCurrentInstance, ref, nextTick, ComponentPublicInstance, PropType } from 'vue';
import { createNamespace } from '../../utils/index';
import { useRect } from '../../composables/use-rect'; // useRect might be needed if not using uni.createSelectorQuery directly everywhere
import { INDEX_BAR_KEY } from './constants';

const [name, bem] = createNamespace('index-anchor');

const props = defineProps({
  customClass: String,
  customStyle: [String, Object],
  index: [Number, String] as PropType<number | string>,
  sticky: {
    type: Boolean,
    default: true,
  },
});

const parent = inject(INDEX_BAR_KEY, null) as {
  props: {
    zIndex?: number | string;
    stickyOffsetTop?: number;
  };
  addChild: (child: ComponentPublicInstance) => void;
  removeChild: (child: ComponentPublicInstance) => void;
  children: ComponentPublicInstance[];
} | null;

const actualStickyOffsetTop = computed(() => parent?.props?.stickyOffsetTop ?? 0);
const actualZIndex = computed(() => parent?.props?.zIndex ?? 1);
  index: [Number, String],
  sticky: {
    type: Boolean,
    default: true, // Default to true as per Vant, parent IndexBar controls overall stickiness
  },
});

const instance = getCurrentInstance()!; // Non-null assertion
const elementId = ref(`${name}-${instance.uid}`); // Unique ID for querySelector

const state = reactive({
  top: 0,
  left: null as number | null,
  width: null as number | null,
  active: false,
  isStuck: false, // Added to explicitly track if the anchor is in a stuck state
});

// parent is now defined above with props definition

if (!parent) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ZXUI] zx-index-anchor must be used inside zx-index-bar.');
  }
}

const getRect = async (): Promise<UniApp.BoundingClientRect> => {
  // Use a more reliable way to get rect in uniapp
  return new Promise<UniApp.BoundingClientRect>((resolve) => {
    uni.createSelectorQuery().in(instance).select(`#${elementId.value}`).boundingClientRect(data => {
      if (data) {
        resolve(data as UniApp.BoundingClientRect);
      } else {
        // Fallback if query fails, though less likely with a unique ID
        resolve({ top: 0, height: 0, left: 0, width: 0, bottom: 0, right: 0, dataset: {} as any, id: '' }); // Ensure dataset matches type if strict
      }
    }).exec();
  });
};

const style = computed(() => {
  if (state.isStuck && props.sticky) { // Changed from state.active to state.isStuck for clarity
    return {
      // position: 'fixed', // This is handled by stickyStyle now
      // top: `${state.top}px`,
      // zIndex: actualZIndex.value,
      // left: state.left !== null ? `${state.left}px` : undefined,
      // width: state.width !== null ? `${state.width}px` : undefined,
      // height: `${state.height}px`, // Keep original height when sticky
    };
  }
  return {};
});

const stickyStyle = computed(() => {
  if (!state.isStuck || !props.sticky) return {};
  return {
    position: 'fixed',
    top: `${state.top}px`,
    left: state.left !== null ? `${state.left}px` : undefined,
    width: state.width !== null ? `${state.width}px` : undefined,
    zIndex: actualZIndex.value,
    color: 'var(--zx-index-anchor-sticky-text-color, var(--van-index-anchor-sticky-text-color, var(--van-primary-color, #1989fa)))',
    background: 'var(--zx-index-anchor-sticky-background, var(--van-index-anchor-sticky-background, var(--van-background-2, #fff)))',
  };
});

// Added height to state for preserving dimensions when sticky
interface AnchorState {
  top: number;
  left: number | null;
  width: number | null;
  height: number | null; // Added height
  active: boolean;
  isStuck: boolean;
}

const state = reactive<AnchorState>({
  top: 0,
  left: null,
  width: null,
  height: null, // Initialize height
  active: false,
  isStuck: false,
});

// Update getRect to also store height
const updateRect = async () => {
  const rect = await getRect();
  state.height = rect.height;
  // other state updates if necessary, e.g., for initial positioning if not done by parent
};

onMounted(() => {
  if (parent && instance) {
    parent.addChild(instance as ComponentPublicInstance);
  }
  nextTick(() => {
    updateRect(); // Get initial height
  });
});

onBeforeUnmount(() => {
  if (parent && instance) {
    parent.removeChild(instance as ComponentPublicInstance);
  }
});

defineExpose({
  state,
  getRect,
  index: props.index,
  elementId
});

</script>

<style lang="scss">
:root,
:host {
  --zx-index-anchor-z-index: var(--van-index-anchor-z-index, 1);
  --zx-index-anchor-padding: var(--van-index-anchor-padding, 0 var(--van-padding-md, 16px));
  --zx-index-anchor-text-color: var(--van-index-anchor-text-color, var(--van-text-color, #323233));
  --zx-index-anchor-font-weight: var(--van-index-anchor-font-weight, var(--van-font-bold, 500));
  --zx-index-anchor-font-size: var(--van-index-anchor-font-size, var(--van-font-size-md, 14px));
  --zx-index-anchor-line-height: var(--van-index-anchor-line-height, 32px);
  --zx-index-anchor-background: var(--van-index-anchor-background, transparent);
  --zx-index-anchor-sticky-text-color: var(--van-index-anchor-sticky-text-color, var(--van-primary-color, #1989fa));
  --zx-index-anchor-sticky-background: var(--van-index-anchor-sticky-background, var(--van-background-2, #fff));
}

.zx-index-anchor {
  box-sizing: border-box;
  padding: var(--zx-index-anchor-padding);
  color: var(--zx-index-anchor-text-color);
  font-weight: var(--zx-index-anchor-font-weight);
  font-size: var(--zx-index-anchor-font-size);
  line-height: var(--zx-index-anchor-line-height);
  background: var(--zx-index-anchor-background);

  &--sticky {
    // Main sticky styles are now in `stickyStyle` computed property for the inner content wrapper
    // This outer element will just occupy space.
    // We might need to set its height explicitly if the inner content is position:fixed
    // This is handled by the slot content itself or by ensuring the wrapper takes space.
    // If the content becomes fixed, the original anchor spot might collapse.
    // One way is to add a placeholder div with the same height when sticky.
    // Or, ensure the .zx-index-anchor itself maintains its height.
    // For now, assuming the content slot itself handles its layout correctly or
    // the parent `zx-index-bar` calculations account for this.
    // If `state.isStuck` is true, the content is in `sticky-content` which is fixed.
    // The original `<view :id="elementId">` needs to maintain its space.
    // This can be done by setting its height when `state.isStuck`.
    // The `style` computed property can be used for this.
    height: v-bind(state.isStuck && props.sticky && state.height ? `${state.height}px` : 'auto');
  }

  &__sticky-content {
    // Styles are applied via :style="stickyStyle"
  }
}
</style>
  if (state.active && props.sticky) {
    return {
      // position: 'fixed', // This will be handled by the sticky logic if needed
      // top: `${state.top}px`,
      // zIndex: parent?.props.zIndex || 1, // Use parent's zIndex or a default
      // left: state.left !== null ? `${state.left}px` : undefined,
      // width: state.width !== null ? `${state.width}px` : undefined,
    };
  }
  return {};
});

const stickyStyle = computed(() => {
  if (!state.isStuck || !props.sticky) return {};
  return {
    position: 'fixed',
    top: `${state.top}px`,
    zIndex: parent?.props.zIndex || 1,
    left: state.left !== null ? `${state.left}px` : undefined,
    width: state.width !== null ? `${state.width}px` : undefined,
    // Ensure the background and color match the Vant sticky state
    color: 'var(--van-index-anchor-sticky-text-color, var(--van-primary-color, #1989fa))',
    background: 'var(--van-index-anchor-sticky-background, var(--van-background-2, #fff))',
  };
});

onMounted(() => {
  parent?.addChild(instance);
  // Ensure elementId is set before parent tries to access it
  nextTick(() => {
    // console.log(`Anchor ${props.index} mounted with id ${elementId.value}`);
  });
});

onBeforeUnmount(() => {
  parent?.removeChild(instance);
});

defineExpose({
  state,
  getRect,
  index: props.index,
  elementId
});

</script>

<style lang="scss">
:root,
:host {
  --van-index-anchor-z-index: 1;
  --van-index-anchor-padding: 0 var(--van-padding-md, 16px);
  --van-index-anchor-text-color: var(--van-text-color, #323233);
  --van-index-anchor-font-weight: var(--van-font-bold, 500);
  --van-index-anchor-font-size: var(--van-font-size-md, 14px);
  --van-index-anchor-line-height: 32px;
  --van-index-anchor-background: transparent;
  --van-index-anchor-sticky-text-color: var(--van-primary-color, #1989fa);
  --van-index-anchor-sticky-background: var(--van-background-2, #fff);
}

.zx-index-anchor {
  box-sizing: border-box;
  padding: var(--van-index-anchor-padding);
  color: var(--van-index-anchor-text-color);
  font-weight: var(--van-index-anchor-font-weight);
  font-size: var(--van-index-anchor-font-size);
  line-height: var(--van-index-anchor-line-height);
  background: var(--van-index-anchor-background);

  // This class is applied by the script when sticky and active
  &--sticky {
    // position: fixed; // Handled by inline style for dynamic top/left/width
    // z-index: var(--van-index-anchor-z-index);
    // color: var(--van-index-anchor-sticky-text-color);
    // background: var(--van-index-anchor-sticky-background);
  }

  // This is for the content wrapper when sticky is active
  .zx-index-anchor__sticky-content {
    // Styles for this are now applied via computed `stickyStyle`
    // This ensures dynamic values for top, left, width are correctly applied.
  }
}
</style>