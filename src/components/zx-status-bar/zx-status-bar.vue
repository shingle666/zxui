<template>
  <view class="zx-status-bar" :style="barStyle">
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * StatbusBar 状态栏占位
 * @description 本组件主要用于状态填充，比如在自定导航栏的时候，它会自动适配一个恰当的状态栏高度。
 * @tutorial https://zxui.org/components/statusBar
 * @property {String} backgroundColor 背景色 (默认 'transparent')
 * @property {Number} zIndex z-index值 (默认 999)
 * @property {Boolean} fixed 是否固定在顶部 (默认 false)
 * @property {Boolean} useSafe 是否使用安全区域高度计算 (默认 true)
 * @example <zx-status-bar></zx-status-bar>
 */
import { ref, computed, onBeforeMount } from "vue";

const props = defineProps({
  // 背景色
  backgroundColor: {
    type: String,
    default: "transparent",
  },
  // z-index值
  zIndex: {
    type: Number,
    default: 999,
  },
  // 是否固定在顶部
  fixed: {
    type: Boolean,
    default: false,
  },
  // 是否使用安全区域高度计算
  useSafe: {
    type: Boolean,
    default: true,
  },
});

const statusBarHeight = ref(0);

// 提前获取状态栏高度，避免页面闪烁
onBeforeMount(() => {
  getStatusBarHeight();
});

// 获取状态栏高度的方法
const getStatusBarHeight = () => {
  // 获取系统信息
  const systemInfo = uni.getWindowInfo();

  // 根据条件决定使用哪种高度
  if (props.useSafe && systemInfo.safeAreaInsets) {
    statusBarHeight.value = systemInfo.safeAreaInsets.top;
  } else {
    statusBarHeight.value = systemInfo.statusBarHeight;
  }

  // 修正高度为0的情况
  if (!statusBarHeight.value) {
    // 不同平台默认值
    // #ifdef APP-PLUS || H5
    statusBarHeight.value = 20;
    // #endif
    // #ifdef MP-WEIXIN
    statusBarHeight.value = 44;
    // #endif
  }
};

// 使用计算属性定义样式
const barStyle = computed(() => {
  return {
    height: statusBarHeight.value + "px",
    backgroundColor: props.backgroundColor,
    zIndex: props.zIndex,
    position: props.fixed ? "fixed" : "relative",
    top: props.fixed ? 0 : "auto",
    left: props.fixed ? 0 : "auto",
    right: props.fixed ? 0 : "auto",
  };
});
</script>

<style scoped>
.zx-status-bar {
  /* #ifndef APP-NVUE */
  width: 100%;
  /* #endif */
  overflow: hidden;

  /* #ifdef H5 */
  box-sizing: border-box;
  /* #endif */
}

/* #ifdef MP-WEIXIN */
@supports (padding-top: constant(safe-area-inset-top)) {
  .zx-status-bar {
    padding-top: constant(safe-area-inset-top);
  }
}
@supports (padding-top: env(safe-area-inset-top)) {
  .zx-status-bar {
    padding-top: env(safe-area-inset-top);
  }
}
/* #endif */
</style>
