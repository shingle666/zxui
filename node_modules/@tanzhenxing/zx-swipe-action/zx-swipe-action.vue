<script setup>
import { ref, provide } from 'vue'

/**
 * zx-swipe-action 滑动操作
 * @description 通过滑动触发选项的容器
 */

// 所有子组件引用
const children = ref([])

// 当前打开的项目
const openItem = ref(null)

// 提供给子组件使用的方法
provide('swipe-action', {
  addChild: (child) => {
    children.value.push(child)
  },
  removeChild: (child) => {
    const index = children.value.indexOf(child)
    if (index !== -1) {
      children.value.splice(index, 1)
    }
  },
  closeOther: (vm) => {
    if (openItem.value && openItem.value !== vm) {
      // 关闭其他已打开的项目
      openItem.value.close()
    }
    // 记录当前打开的项目
    openItem.value = vm
  }
})

// 暴露给外部的方法
defineExpose({
  // 重置组件样式
  resize() {
    // 针对非 wxs 平台需要重新初始化
    // #ifndef APP-VUE || H5 || MP-WEIXIN
    children.value.forEach(vm => {
      vm.init()
    })
    // #endif
  },
  
  // 关闭全部已打开的组件
  closeAll() {
    children.value.forEach(vm => {
      vm.close()
    })
  }
})
</script>

<template>
  <view class="zx-swipe-action">
    <slot></slot>
  </view>
</template>

<style>
.zx-swipe-action {
  position: relative;
}
</style>
