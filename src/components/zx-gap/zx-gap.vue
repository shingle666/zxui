<template>
  <view 
    class="zx-gap" 
    :style="gapStyle"
  ></view>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxGap'
})

// 定义属性及默认值
const props = defineProps({
  // 背景颜色
  bgColor: {
    type: String,
    default: 'transparent'
  },
  // 间隔槽高度，单位px
  height: {
    type: [String, Number],
    default: 20
  },
  // 与前一个组件的距离，单位px
  marginTop: {
    type: [String, Number],
    default: 0
  },
  // 与后一个组件的距离，单位px
  marginBottom: {
    type: [String, Number],
    default: 0
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

// 添加单位的工具函数
const addUnit = (value) => {
  if (value === null || value === undefined || value === '') {
    return ''
  }
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (typeof value === 'string') {
    // 如果已经包含单位，直接返回
    if (/^\d+(\.\d+)?(px|rpx|rem|em|vh|vw|%)$/.test(value)) {
      return value
    }
    // 如果是纯数字字符串，添加px单位
    if (/^\d+(\.\d+)?$/.test(value)) {
      return `${value}px`
    }
  }
  return value
}

// 深度合并对象的工具函数
const deepMerge = (target, source) => {
  const result = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

// 计算间隔槽样式
const gapStyle = computed(() => {
  const style = {
    backgroundColor: props.bgColor,
    height: addUnit(props.height),
    marginTop: addUnit(props.marginTop),
    marginBottom: addUnit(props.marginBottom)
  }
  return deepMerge(style, props.customStyle)
})
</script>

<style lang="scss" scoped>
.zx-gap {
  width: 100%;
  box-sizing: border-box;
}
</style>