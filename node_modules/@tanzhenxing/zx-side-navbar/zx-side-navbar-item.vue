<script setup>
import { computed, inject } from 'vue'

import { ZX_SIDE_NAVBAR_KEY } from './zx-side-navbar.js'
import { zxSideNavbarItemEmits, zxSideNavbarItemProps } from './zx-side-navbar-item.js'

// 定义组件选项
defineOptions({
  name: 'zx-side-navbar-item',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(zxSideNavbarItemProps)

const emit = defineEmits(zxSideNavbarItemEmits)

const componentName = 'zx-side-navbar-item'

// 注入父组件上下文
const parentContext = inject(ZX_SIDE_NAVBAR_KEY, null)

const classes = computed(() => {
  return `${componentName}`
})

const styles = computed(() => {
  return {
    paddingLeft: `${(parentContext?.props?.offset || 15) + 15}px`
  }
})

function handleClick() {
  emit('click')
}
</script>

<template>
  <view
    :class="classes"
    :style="styles"
    :ikey="ikey"
    @click.stop="handleClick"
  >
    <text class="zx-side-navbar-item__title">
      {{ title }}
    </text>
  </view>
</template>

<style lang="scss">

</style>