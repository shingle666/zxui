<template>
  <view class="zx-dropdown-menu" @click.stop>
    <slot></slot>
  </view>
</template>

<script setup>
import { getCurrentInstance } from 'vue'


const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-dropdown-menu'
</script>

<style scoped>
.zx-dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>