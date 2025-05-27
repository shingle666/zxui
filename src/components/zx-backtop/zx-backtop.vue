<template>
  <view
    v-if="isShow"
    :class="['zx-backtop', showAnimation]"
    hover-class="zx-hover"
    :style="[contentStyle]"
    @click.stop="handleClick"
  >
    <slot>
      <zx-icon :name="iconName" :size="iconSize" :color="iconColor" />
    </slot>
  </view>
</template>

<script setup>
/**
 * backtop 回到顶部
 * @description 返回页面顶部的操作按钮，参考 Element Plus Backtop 组件
 * @tutorial https://zxui.org/components/backtop
 * @property {String | Number}  visibilityHeight	滚动高度达到此参数值才出现 （默认 200）
 * @property {String | Number}  duration		返回顶部滚动时间 （默认 300）
 * @property {String | Number}  scrollTop		当前滚动距离，用于控制显示/隐藏 （默认 0）
 * @property {String | Number}  right  		控制其显示位置，距离页面右边距 （默认 40）
 * @property {String | Number}  bottom  		控制其显示位置，距离页面底部距离 （默认 40）
 * @property {String | Number}  left  		控制其显示位置，距离页面左边距，设置后优先级高于right
 * @property {String | Number}  zIndex 		层级 （默认 9999）
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形 （默认 circle）
 * @property {String}           backgroundColor 背景色 （默认 #ffffff）
 * @property {String}           size         组件大小 （默认 80rpx）
 * @property {String}           iconName     自定义图标 （默认 arrow-up）
 * @property {String}           iconColor    图标颜色 （默认 #999999）
 * @property {String}           iconSize     图标大小 （默认 50rpx）
 * @property {String}           animation    动画效果，可选值为 fade、slide、scale （默认 fade）
 * @property {Boolean}          vibrate      点击时是否震动反馈 （默认 false）
 * @property {String}           customClass  自定义类名
 * @event {Function}            click        点击按钮时触发
 * @event {Function}            show         按钮显示时触发
 * @event {Function}            hide         按钮隐藏时触发
 * @example <zx-backtop :scrollTop="scrollTop"></zx-backtop>
 */

import { ref, getCurrentInstance, computed, watch } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  // 滚动高度达到此参数值才出现
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  // 控制其显示位置，距离页面右边距
  right: {
    type: Number,
    default: 10,
  },
  // 控制其显示位置，距离页面底部距离
  bottom: {
    type: Number,
    default: 120,
  },
  // 控制其显示位置，距离页面左边距，设置后优先级高于right
  left: {
    type: Number,
    default: 0,
  },
  // 当前滚动距离，用于控制显示/隐藏
  scrollTop: {
    type: Number,
    default: 0,
  },
  // 返回顶部滚动时间
  duration: {
    type: Number,
    default: 300,
  },
  // 组件层级
  zIndex: {
    type: Number,
    default: 9999,
  },
  // 返回顶部的形状，circle-圆形，square-方形
  mode: {
    type: String,
    default: "circle",
  },
  // 背景色
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  // 组件大小
  size: {
    type: String,
    default: "80rpx",
  },
  // 图标名称
  iconName: {
    type: String,
    default: "arrow-up",
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: "#999999",
  },
  // 图标大小
  iconSize: {
    type: String,
    default: "50rpx",
  },
  // 动画效果，可选值为 fade、slide、scale
  animation: {
    type: String,
    default: "fade",
  },
  // 点击时是否震动反馈
  vibrate: {
    type: Boolean,
    default: false,
  },
  // 自定义类名
  customClass: {
    type: String,
    default: "",
  }
});

const emit = defineEmits(["click", "show", "hide"]);
const isShow = ref(false);

const showAnimation = computed(() => {
  const animations = {
    fade: "zx-fade-in",
    slide: "zx-slide-in",
    scale: "zx-scale-in",
  };

  return [animations[props.animation] || "zx-fade-in", props.customClass].filter(Boolean);
});

// 监听滚动并防抖处理
let timer = null;
watch(
  () => props.scrollTop,
  (val) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const oldShow = isShow.value;
      isShow.value = val > props.visibilityHeight;

      // 触发显示/隐藏事件
      if (!oldShow && isShow.value) {
        emit("show");
      } else if (oldShow && !isShow.value) {
        emit("hide");
      }
    }, 100);
  },
  {
    immediate: true,
  }
);

// 内容样式
const contentStyle = computed(() => {
  let styles = {
    position: "fixed",
    bottom: `${props.bottom}rpx`,
    width: props.size,
    height: props.size,
    zIndex: props.zIndex,
    backgroundColor: props.backgroundColor,
    cursor: "pointer",
  };

  // 设置位置 - left 优先级高于 right
  if (props.left) {
    styles.left = `${props.left}rpx`;
  } else {
    styles.right = `${props.right}rpx`;
  }

  // 设置圆角
  if (props.mode === "circle") {
    styles.borderRadius = "50%";
  } else {
    styles.borderRadius = "12rpx";
  }

  return styles;
});

// 返回顶部
const handleClick = () => {
  // 震动反馈
  if (props.vibrate) {
    uni.vibrateShort();
  }

  uni.pageScrollTo({
    scrollTop: 0,
    duration: props.duration,
  });

  emit("click");
};
</script>

<style lang="scss" scoped>
.zx-backtop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.zx-hover {
  opacity: 0.85;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.15);
}

/* 淡入动画 */
.zx-fade-in {
  animation: zx-fade-in 0.3s ease-in-out forwards;
}
@keyframes zx-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 滑入动画 */
.zx-slide-in {
  animation: zx-slide-in 0.3s ease-out forwards;
}
@keyframes zx-slide-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放动画 */
.zx-scale-in {
  animation: zx-scale-in 0.3s ease-out forwards;
}
@keyframes zx-scale-in {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
