<template>
  <view class="zx-grid-wrap">
    <view class="zx-grid" :id="elId" ref="zx-grid-inner" :class="{ 'zx-grid--border': showBorder }"
      :style="{ 'border-left-color': borderColor }">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { ref, provide, onMounted, computed, getCurrentInstance } from 'vue';

const props = defineProps({
  column: { type: Number, default: 3 },
  showBorder: { type: Boolean, default: true },
  borderColor: { type: String, default: '#D2D2D2' },
  square: { type: Boolean, default: true },
  highlight: { type: Boolean, default: true }
});

const emit = defineEmits(['change']);

const instance = getCurrentInstance();
const elId = `zx_grid_${Math.ceil(Math.random() * 10e5).toString(36)}`;
const gridWidth = ref(0);

const itemWidth = computed(() => {
  if (gridWidth.value === 0) return '0px';
  return parseInt((gridWidth.value - 1) / props.column) + 'px';
});

onMounted(() => {
  // #ifndef APP-NVUE
  uni.createSelectorQuery()
    .in(instance)
    .select(`#${elId}`)
    .boundingClientRect()
    .exec(ret => {
      if (ret && ret[0]) {
        gridWidth.value = ret[0].width;
      }
    });
  // #endif
  // #ifdef APP-NVUE
  const dom = uni.requireNativePlugin('dom');
  dom.getComponentRect(instance.refs['zx-grid-inner'], (ret) => {
    if (ret && ret.size) {
      gridWidth.value = ret.size.width;
    }
  });
  // #endif
});

provide('zxGrid', {
  props,
  width: itemWidth, // Provide the computed itemWidth
  emitChange: (e) => emit('change', e)
});

</script>

<style lang="scss" scoped>
.zx-grid-wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
}

.zx-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.zx-grid--border {
  position: relative;
  z-index: 1;
  border-left: 1px #D2D2D2 solid;
}
</style>
