<template>
  <view v-if="width" :style="itemStyle" class="zx-grid-item">
    <view
      :class="[
        { 'zx-grid-item--border': showBorder.value, 'zx-grid-item--border-top': showBorder.value && props.index < column.value, 'zx-highlight': highlight.value }
      ]"
      :style="boxStyle"
      class="zx-grid-item__box"
      @click="onClick"
    >
      <slot />
    </view>
  </view>
</template>

<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  index: { type: Number, default: 0 }
});

const zxGrid = inject('zxGrid');

// Ensure zxGrid is available before accessing its properties
const column = computed(() => zxGrid?.props?.column ?? 3);
const showBorder = computed(() => zxGrid?.props?.showBorder ?? true);
const square = computed(() => zxGrid?.props?.square ?? true);
const highlight = computed(() => zxGrid?.props?.highlight ?? true);
const borderColor = computed(() => zxGrid?.props?.borderColor ?? '#D2D2D2');
const width = computed(() => zxGrid?.width?.value); // width is reactive, directly from the injected zxGrid context

const itemStyle = computed(() => {
  let style = `width:${width.value || 'auto'};`; // Add fallback for width
  if (square.value) style += `height:${width.value || 'auto'};`; // Use .value for reactive props
  return style;
});

const boxStyle = computed(() => ({
  borderRightColor: borderColor.value, // Use .value for reactive props
  borderBottomColor: borderColor.value, // Use .value for reactive props
  borderTopColor: borderColor.value // Use .value for reactive props
}));

function onClick() {
  zxGrid?.emitChange({ detail: { index: props.index } });
}
</script>

<style lang="scss" scoped>
.zx-grid-item {
  height: 100%;
  display: flex;
}
.zx-grid-item__box {
  display: flex;
  width: 100%;
  position: relative;
  flex: 1;
  flex-direction: column;
}
.zx-grid-item--border {
  position: relative;
  z-index: 0;
  border-bottom: 1px #D2D2D2 solid;
  border-right: 1px #D2D2D2 solid;
}
.zx-grid-item--border-top {
  border-top: 1px #D2D2D2 solid;
  z-index: 0;
}
.zx-highlight:active {
  background-color: #f1f1f1;
}
</style>