<template>
  <view class="zx-group" :class="[`zx-group--${mode}`]" :style="{ marginTop: `${top}px` }">
    <slot name="title">
      <view v-if="title" class="zx-group__title">
        <text class="zx-group__title-text">{{ title }}</text>
      </view>
    </slot>
    <view class="zx-group__content">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  top: {
    type: [Number, String],
    default: 10
  },
  mode: {
    type: String,
    default: 'default' // 可选: 'default', 'card'
  },
  stat: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['click']);

const instance = getCurrentInstance();

watch(() => props.title, (newVal) => {
  // 兼容uni统计
  if (typeof uni !== 'undefined' && uni.report && props.stat && newVal !== '') {
    uni.report('title', newVal);
  }
});

function onClick() {
  emits('click');
}
</script>

<style lang="scss" scoped>
.zx-group {
  background: #fff;
  margin-top: 10px;
}

.zx-group__title {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  height: 40px;
  background-color: #eee;
  font-weight: normal;
  color: #666;
}

.zx-group__content {
  padding: 15px;
}

.zx-group__title-text {
  font-size: 14px;
  color: #666;
}

.zx-group--card {
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.08);
}
</style>
