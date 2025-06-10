<template>
  <view :class="classes">
    <!-- 标题区域 -->
    <view :class="titleClasses" :style="titleStyles" @click.stop="handleTitleClick">
      <text class="zx-sub-side-navbar__title__text">
        {{ title }}
      </text>
      <view class="zx-sub-side-navbar__title__icon">
        <text class="zx-sub-side-navbar__title__arrow" :class="{ 'zx-sub-side-navbar__title__arrow--open': isOpen }">
          >
        </text>
      </view>
    </view>

    <!-- 内容区域 -->
    <view :class="contentClasses" v-show="isOpen">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed, ref, inject } from 'vue'

import { ZX_SIDE_NAVBAR_KEY } from './zx-side-navbar.js'
import { zxSubSideNavbarEmits, zxSubSideNavbarProps } from './zx-sub-side-navbar.js'

// 定义组件选项
defineOptions({
  name: 'zx-sub-side-navbar',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(zxSubSideNavbarProps)

const emit = defineEmits(zxSubSideNavbarEmits)

const componentName = 'zx-sub-side-navbar'

// 注入父组件上下文
const parentContext = inject(ZX_SIDE_NAVBAR_KEY, null)

// 展开状态
const isOpen = ref(props.open)

const classes = computed(() => {
  return `${componentName}`
})

const titleClasses = computed(() => {
  return [
    `${componentName}__title`,
    {
      [`${componentName}__title--open`]: isOpen.value
    }
  ]
})

const contentClasses = computed(() => {
  return [
    `${componentName}__content`,
    {
      [`${componentName}__content--open`]: isOpen.value
    }
  ]
})

const titleStyles = computed(() => {
  const offset = parentContext?.props?.offset || 15
  return {
    paddingLeft: `${Number(offset)}rpx`,
  }
})

function handleTitleClick() {
  isOpen.value = !isOpen.value
  emit('title-click', {
    title: props.title,
    open: isOpen.value
  })
}
</script>

<style lang="scss"></style>