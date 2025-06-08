<template>
  <!-- #ifndef APP-NVUE -->
  <view class="zx-list zx-border-top-bottom">
    <view v-if="border" class="zx-list--border-top"></view>
    <slot />
    <view v-if="border" class="zx-list--border-bottom"></view>
  </view>
  <!-- #endif -->
  <!-- #ifdef APP-NVUE -->
  <list
    :bounce="false"
    :scrollable="true"
    show-scrollbar
    :render-reverse="renderReverse"
    @scroll="onScroll"
    class="zx-list"
    :class="{ 'zx-list--border': border }"
    :enableBackToTop="enableBackToTop"
    loadmoreoffset="15"
    @loadmore="onScrollToLower"
  >
    <slot />
  </list>
  <!-- #endif -->
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  stackFromEnd: {
    type: Boolean,
    default: false,
  },
  enableBackToTop: {
    type: [Boolean, String],
    default: false,
  },
  scrollY: {
    type: [Boolean, String],
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  renderReverse: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["scroll", "scrolltolower"]);

function onScroll(e) {
  emit("scroll", e);
}
function onScrollToLower(e) {
  emit("scrolltolower", e);
}
</script>

<style lang="scss">
$zx-bg-color: #ffffff;
$zx-border-color: #e5e5e5;

.zx-list {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  background-color: $zx-bg-color;
  position: relative;
  flex-direction: column;
}

.zx-list--border {
  position: relative;
  /* #ifdef APP-NVUE */
  border-top-color: $zx-border-color;
  border-top-style: solid;
  border-top-width: 0.5px;
  border-bottom-color: $zx-border-color;
  border-bottom-style: solid;
  border-bottom-width: 0.5px;
  /* #endif */
  z-index: -1;
}

/* #ifndef APP-NVUE */

.zx-list--border-top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $zx-border-color;
  z-index: 1;
}

.zx-list--border-bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: $zx-border-color;
}

/* #endif */
</style>
