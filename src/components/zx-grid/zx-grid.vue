<template>
  <view class="zx-grid-wrap">
    <view
      class="zx-grid"
      :class="{ 'zx-grid--border': showBorder }"
      :style="{ 'border-left-color': borderColor }"
    >
      <slot />
    </view>
  </view>
</template>

<script setup>
import { ref, provide, watch, onMounted } from 'vue';
import { useUniAppSystemInfo } from './useUniAppSystemInfo';

const props = defineProps({
  column: { type: Number, default: 3 },
  showBorder: { type: Boolean, default: true },
  borderColor: { type: String, default: '#D2D2D2' },
  square: { type: Boolean, default: true },
  highlight: { type: Boolean, default: true }
});

const emit = defineEmits(['change']);

const children = ref([]);
const width = ref(0);

provide('zxGrid', {
  props,
  children,
  width,
  emitChange: (e) => emit('change', e)
});

function calcWidth() {
  // 兼容多端，使用系统信息获取屏幕宽度
  const { windowWidth } = useUniAppSystemInfo();
  width.value = parseInt((windowWidth - 1) / props.column) + 'px';
  children.value.forEach((item) => {
    item.width = width.value;
  });
}

onMounted(() => {
  calcWidth();
});

watch(() => props.column, calcWidth);
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
