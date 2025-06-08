<template>
  <view class="zx-safe-bottom" :style="[getStyle]">
    <view class="zx-safe-area-inset-bottom"></view>
  </view>
</template>

<script setup>
/**
 * SafeBottom 底部安全区
 * @description 这个适配，主要是针对IPhone等一些底部带指示条的机型，指示条的操作区域与页面底部存在重合，容易导致用户误操作，因此我们需要针对这些机型进行底部安全区适配。
 * @tutorial https://zxui.org/components/safeBottom

 * @example <zx-safe-bottom></zx-safe-bottom>
 * @example <zx-safe-bottom bgColor="#ffffff"></zx-safe-bottom>
 * @example <zx-safe-bottom height="30" bgColor="red"></zx-safe-bottom>
 */
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  /**
   * 自定义高度
   */
  height: {
    type: [String, Number],
    default: "",
  },
  /**
   * 背景颜色
   */
  bgColor: {
    type: String,
    default: "transparent",
  },
});

const safeAreaBottomHeight = ref(0);

onMounted(() => {
  // #ifdef APP-PLUS
  // 获取底部安全区高度
  const info = uni.getWindowInfo();
  if (info && info.safeAreaInsets) {
    safeAreaBottomHeight.value = info.safeAreaInsets.bottom;
  }
  // #endif
});

const getStyle = computed(() => {
  const styles = {};

  // 设置背景色
  if (props.bgColor) {
    styles.backgroundColor = props.bgColor;
  }

  if (props.height) {
    styles.height = `${props.height}px`;
  }

  return styles;
});
</script>

<style lang="scss" scoped>
.zx-safe-bottom {
  width: 100%;
  display: block;
}
.zx-safe-area-inset-bottom {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  &:empty {
    height: constant(safe-area-inset-bottom);
    height: env(safe-area-inset-bottom);
  }
}
</style>
