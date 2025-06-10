<template>
  <view :id="elementId" :class="bem({ sticky: state.isStuck && props.sticky })" :style="style">
    <view v-if="state.isStuck && props.sticky" :class="bem('sticky-content')" :style="stickyStyle">
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

<script setup>
import { computed, reactive, onMounted, onBeforeUnmount, inject, getCurrentInstance, ref, nextTick } from 'vue';
import { createNamespace, INDEX_BAR_KEY } from './utils.js';

const [name, bem] = createNamespace('index-anchor');

const props = defineProps({
  customClass: String,
  customStyle: [String, Object],
  index: {
    type: [Number, String],
    required: true
  },
  sticky: {
    type: Boolean,
    default: true,
  },
});

const parent = inject(INDEX_BAR_KEY, null);

if (!parent) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('[ZXUI] zx-index-anchor must be used inside zx-index-bar.');
  }
}

const actualStickyOffsetTop = computed(() => parent?.props?.stickyOffsetTop ?? 0);
const actualZIndex = computed(() => parent?.props?.zIndex ?? 1);

const instance = getCurrentInstance();
const elementId = ref(`${name}-${instance.uid}`);

const state = reactive({
  top: 0,
  left: null,
  width: null,
  height: null,
  active: false,
  isStuck: false,
});

const getRect = async () => {
  return new Promise((resolve) => {
    uni.createSelectorQuery().in(instance).select(`#${elementId.value}`).boundingClientRect(data => {
      if (data) {
        resolve(data);
      } else {
        resolve({ top: 0, height: 0, left: 0, width: 0, bottom: 0, right: 0, dataset: {}, id: '' });
      }
    }).exec();
  });
};

const style = computed(() => {
  if (state.isStuck && props.sticky && state.height) {
    return {
      height: `${state.height}px`, // Preserve space when content is fixed
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
    padding: 'var(--zx-index-anchor-padding, 0 var(--van-padding-md, 16px))',
    boxSizing: 'border-box',
  };
});

const updateRect = async () => {
  const rect = await getRect();
  state.height = rect.height;
};

onMounted(() => {
  if (parent && instance) {
    parent.addChild(instance);
  }
  nextTick(() => {
    updateRect();
  });
});

onBeforeUnmount(() => {
  if (parent && instance) {
    parent.removeChild(instance);
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
    // Height is dynamically set via style binding to preserve space
  }

  &__sticky-content {
    // Styles are applied via :style="stickyStyle"
  }
}
</style>