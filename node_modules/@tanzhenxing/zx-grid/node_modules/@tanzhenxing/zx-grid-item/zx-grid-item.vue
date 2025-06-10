<template>
  <view v-if="width" :style="itemStyle" class="zx-grid-item">
    <view
      :class="[
        { 'zx-grid-item--border': showBorder, 'zx-grid-item--border-top': showBorder && index < column, 'zx-highlight': highlight }
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
import { inject, ref, computed, onMounted } from 'vue';

const props = defineProps({
  index: { type: Number, default: 0 }
});

const zxGrid = inject('zxGrid');
const column = zxGrid?.props.column ?? 3;
const showBorder = zxGrid?.props.showBorder ?? true;
const square = zxGrid?.props.square ?? true;
const highlight = zxGrid?.props.highlight ?? true;
const borderColor = zxGrid?.props.borderColor ?? '#D2D2D2';
const width = zxGrid?.width;

const itemStyle = computed(() => {
  let style = `width:${width.value};`;
  if (square) style += `height:${width.value};`;
  return style;
});
const boxStyle = computed(() => ({
  borderRightColor: borderColor,
  borderBottomColor: borderColor,
  borderTopColor: borderColor
}));

onMounted(() => {
  if (zxGrid && zxGrid.children) {
    zxGrid.children.value.push({ width: width.value });
  }
});

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