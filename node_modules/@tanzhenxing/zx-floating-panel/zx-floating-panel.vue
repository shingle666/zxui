<template>
  <view v-if="visible" ref="rootRef" class="zx-floating-panel" :style="rootStyle" @touchstart="onTouchstart"
    @touchmove.stop.prevent="onTouchmove" @touchend="onTouchend" @touchcancel="onTouchend">
    <view class="zx-floating-panel__header">
      <slot name="header">
        <view class="zx-floating-panel__header-bar"></view>
      </slot>
    </view>
    <view ref="contentRef" class="zx-floating-panel__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  /**
   * 当前面板的显示高度
   */
  height: {
    type: [Number, String],
    default: 0
  },
  /**
   * 设置自定义锚点, 单位 px
   */
  anchors: {
    type: Array,
    default: () => []
  },
  /**
   * 动画时长，单位秒，设置为 0 可以禁用动画
   */
  duration: {
    type: [Number, String],
    default: 0.3
  },
  /**
   * 允许拖拽内容容器
   */
  contentDraggable: {
    type: Boolean,
    default: true
  },
  /**
   * 当不拖拽时，是否锁定背景滚动
   */
  lockScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 是否开启底部安全区适配
   */
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示面板
   */
  modelValue: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['heightChange', 'update:height', 'update:modelValue']);

const DAMP = 0.2;
const rootRef = ref(null);
const contentRef = ref(null);
const visible = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  visible.value = val;
});

const currentHeight = ref(Number(props.height));
watch(() => props.height, (val) => {
  if (Number(val) !== currentHeight.value) {
    currentHeight.value = Number(val);
  }
});

watch(currentHeight, (val) => {
  emit('update:height', val);
});

const getWindowHeight = () => {
  // #ifdef H5
  return window.innerHeight;
  // #endif
  // #ifdef MP || APP-PLUS
  return uni.getSystemInfoSync().windowHeight;
  // #endif
  return 0; // Default or fallback
};

const boundary = computed(() => {
  const windowHeight = getWindowHeight();
  return {
    min: props.anchors[0] ?? 100,
    max: props.anchors[props.anchors.length - 1] ?? Math.round(windowHeight * 0.6)
  };
});

const computedAnchors = computed(() => {
  return props.anchors.length >= 2 ? props.anchors.map(Number).sort((a, b) => a - b) : [boundary.value.min, boundary.value.max].map(Number).sort((a, b) => a - b);
});

const dragging = ref(false);

const rootStyle = computed(() => {
  const style = {
    height: `${boundary.value.max}px`,
    transform: `translateY(calc(100% - ${currentHeight.value}px))`,
    transition: !dragging.value ? `transform ${props.duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)` : 'none'
  };
  if (props.safeAreaInsetBottom) {
    // 在 uniapp 中，safe-area-inset-bottom 通常通过 CSS 环境变量处理，或组件内边距
    // style.paddingBottom = 'env(safe-area-inset-bottom)';
  }
  return style;
});

const ease = (moveY) => {
  const absDistance = Math.abs(moveY);
  const { min, max } = boundary.value;
  if (absDistance > max) {
    return -(max + (absDistance - max) * DAMP);
  }
  if (absDistance < min) {
    return -(min - (min - absDistance) * DAMP);
  }
  return moveY;
};

let startY = 0;
let touchStartY = 0; // 触摸起始点的 Y 坐标 (相对于页面)
let startPanelHeight = 0; // 触摸开始时面板的高度
let maxScroll = -1;

const onTouchstart = (event) => {
  if (!visible.value) return;
  dragging.value = true;
  touchStartY = event.touches[0].clientY;
  startPanelHeight = currentHeight.value;
  startY = -currentHeight.value; // Vant 源码中的 startY 是负值，表示 translateY 的偏移量
  maxScroll = -1;
};

const onTouchmove = (event) => {
  if (!visible.value || !dragging.value) return;

  const touch = event.touches[0];
  const deltaY = touch.clientY - touchStartY;

  let contentScrollTop = ref();
  // 检查内容是否滚动
  // #ifdef H5
  contentScrollTop = contentRef.value ? contentRef.value.scrollTop : 0;
  // #endif
  // #ifdef MP || APP-PLUS
  // 小程序和 App 获取 scrollTop 可能需要不同的 API 或组件内部状态
  // 暂时简化处理，后续可根据具体平台优化
  contentScrollTop = 0; // Placeholder
  // #endif

  if (contentRef.value && (contentRef.value === event.target || contentRef.value.contains(event.target))) {
    maxScroll = Math.max(maxScroll, contentScrollTop);
    if (!props.contentDraggable) return;

    // 如果面板未完全展开，且内容尝试向上滚动（deltaY < 0），则优先拖动面板
    // 如果面板已完全展开，内容可以滚动
    // 如果内容滚动到顶部，且手势是向下滑动（deltaY > 0），则拖动面板
    if (currentHeight.value < boundary.value.max && deltaY < 0) {
      // 向上拖动面板
    } else if (contentScrollTop <= 0 && deltaY > 0) {
      // 向下拖动面板
    } else if (currentHeight.value >= boundary.value.max && deltaY < 0 && contentScrollTop > 0) {
      // 内容区域自己滚动
      return;
    } else if (currentHeight.value >= boundary.value.max && deltaY > 0 && contentScrollTop > 0) {
      // 内容区域自己滚动
      return;
    }
  }

  // Vant 的 moveY 是基于 startY (负的初始高度) 和 deltaY (触摸移动距离)
  // 我们这里直接计算新的高度
  let newHeight = startPanelHeight - deltaY;
  // 应用 ease 效果，注意 Vant 的 ease 是作用于负值偏移量
  // 我们需要调整一下，或者直接 clamp 高度
  // currentHeight.value = -ease(moveY);

  // 限制拖动范围，并应用阻尼效果
  if (newHeight > boundary.value.max) {
    newHeight = boundary.value.max + (newHeight - boundary.value.max) * DAMP;
  } else if (newHeight < boundary.value.min) {
    newHeight = boundary.value.min - (boundary.value.min - newHeight) * DAMP;
  }
  currentHeight.value = newHeight;
};

const closest = (arr, target) => {
  return arr.reduce((prev, curr) =>
    Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev
  );
};

const onTouchend = () => {
  if (!visible.value || !dragging.value) return;
  maxScroll = -1;
  dragging.value = false;
  const finalHeight = closest(computedAnchors.value, currentHeight.value);

  if (currentHeight.value !== finalHeight) {
    currentHeight.value = finalHeight;
  }

  // 检查高度是否真的改变了，因为 closest 可能返回当前值
  if (currentHeight.value !== startPanelHeight) { // 比较拖动结束时的高度和开始时的高度
    emit('heightChange', { height: currentHeight.value });
  }
};

watch(boundary, () => {
  currentHeight.value = closest(computedAnchors.value, currentHeight.value);
}, { immediate: true });

// Lock scroll - uniapp 中处理方式与 H5 不同
// #ifdef H5
const preventDefault = (event, isStopPropagation) => {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    event.stopPropagation();
  }
};

const onScroll = (event) => {
  if (props.lockScroll && dragging.value) {
    preventDefault(event, true);
  }
};

onMounted(() => {
  if (rootRef.value) {
    // H5 环境下，如果需要阻止 document.body 滚动
    // document.body.addEventListener('touchmove', onScroll, { passive: false });
  }
});

onUnmounted(() => {
  if (rootRef.value) {
    // document.body.removeEventListener('touchmove', onScroll);
  }
});
// #endif

// #ifdef MP || APP-PLUS
// 小程序和 App 的 lockScroll 通常通过 page-meta 或 catchtouchmove 实现
// 这里暂时不实现，因为组件内部无法直接控制页面滚动，除非使用 page-meta
// 如果需要，可以在页面级别配合使用 <page-meta :page-style="dragging ? 'overflow: hidden;' : ''"></page-meta>
// #endif

// 暴露方法 (如果需要)
// defineExpose({});

</script>

<style lang="scss" scoped>
.zx-floating-panel {
  position: fixed;
  left: 0;
  bottom: 0;
  /* 将面板定位在底部 */
  width: 100vw;
  z-index: var(--van-floating-panel-z-index, 999);
  display: flex;
  flex-direction: column;
  touch-action: none;
  /* 阻止浏览器默认的触摸行为，如滚动 */
  border-top-left-radius: var(--van-floating-panel-border-radius, 16px);
  border-top-right-radius: var(--van-floating-panel-border-radius, 16px);
  background: var(--van-floating-panel-background, #fff);
  will-change: transform;
  /* 提升性能 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);

  /* 用于在拖动超出底部时依然显示背景色 */
  &::after {
    content: "";
    display: block;
    position: absolute;
    // bottom: -100vh; /* Vant 的做法，确保拖到底部以下也有背景 */
    top: 100%;
    /* 另一种实现方式，使其在面板下方 */
    height: 100vh;
    /* 足够高以覆盖拖动区域 */
    width: 100vw;
    background-color: inherit;
    /* 继承面板背景色 */
  }
}

.zx-floating-panel__header {
  height: var(--van-floating-panel-header-height, 30px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  user-select: none;
}

.zx-floating-panel__header-bar {
  height: var(--van-floating-panel-bar-height, 3px);
  width: var(--van-floating-panel-bar-width, 20px);
  border-radius: var(--van-radius-md, 3px);
  background: var(--van-floating-panel-bar-color, #c8c9cc);
}

.zx-floating-panel__content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--van-floating-panel-background, #fff);
  /* For Webkit browsers */
  -webkit-overflow-scrolling: touch;
}

/* Safe area for bottom */
.zx-floating-panel.safe-area-inset-bottom {
  // uniapp 会自动处理刘海屏等，但如果需要额外控制，可以加 padding
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
}
</style>