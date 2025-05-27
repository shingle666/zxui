<template>
  <view
    class="zx-copyright"
    :style="{ backgroundColor: backgroundColor, padding: padding, textAlign: align }"
    @click="handleClick"
  >
    <text :style="{ color: color, fontSize: size }">{{ text }}</text>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 版权文本
  text: {
    type: String,
    default: "© 2024 YourCompany. All rights reserved.",
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: "transparent", // 默认为透明，更通用
  },
  // 文字大小
  size: {
    type: String,
    default: "24rpx", // 调整默认大小
  },
  // 文字颜色
  color: {
    type: String,
    default: "#999999", // 调整默认颜色
  },
  // 内边距
  padding: {
    type: String,
    default: "20rpx 0", // 调整默认内边距，上下20rpx，左右0
  },
  // 文字对齐方式: left, center, right
  align: {
    type: String,
    default: "center",
    validator: (value) => ["left", "center", "right"].includes(value),
  },
  // 跳转链接，如果为空则不跳转
  link: {
    type: String,
    default: "",
  },
  // 链接打开方式，仅 H5 有效
  // target: '_blank' | '_self' | '_parent' | '_top'
  linkTarget: {
    type: String,
    default: "_blank",
  },
});

const handleClick = () => {
  if (props.link) {
    // #ifdef H5
    window.open(props.link, props.linkTarget);
    // #endif
    // #ifndef H5
    uni.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(props.link)}`, // 假设有一个webview页面用于打开链接
    });
    // #endif
  }
};
</script>

<style scoped>
.zx-copyright {
  width: 100%;
  display: flex;
  justify-content: center; /* align prop 会控制 text-align, 这里保持flex的居中 */
  align-items: center;
}

.zx-copyright text {
  line-height: 1.5;
}
</style>
