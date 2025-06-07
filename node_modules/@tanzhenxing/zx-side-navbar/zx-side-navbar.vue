<script setup>
import { computed, provide } from 'vue'

import { ZX_SIDE_NAVBAR_KEY, zxSideNavbarProps } from './zx-side-navbar.js'

// 定义组件选项
defineOptions({
  name: 'zx-side-navbar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(zxSideNavbarProps)

const componentName = 'zx-side-navbar'

// 提供上下文给子组件
provide(ZX_SIDE_NAVBAR_KEY, {
  props,
  componentName: `${componentName}-item`
})

const classes = computed(() => {
  return `${componentName}`
})

const styles = computed(() => {
  return {}
})
</script>

<template>
  <view :class="classes" :style="styles">
    <view class="zx-side-navbar__content">
      <view class="zx-side-navbar__content__list">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">

</style>