<template>
  <view class="zx-dropdown" :class="[{ 'is-disabled': disabled }]">
    <!-- 触发元素 -->
    <view 
      class="zx-dropdown__trigger" 
      @click.stop="handleTriggerClick"
    >
      <slot></slot>
    </view>
    
    <!-- 下拉菜单 -->
    <view 
      v-if="visible"
      class="zx-dropdown__menu" 
      :class="[`zx-dropdown__menu--${placement}`, popperClass]"
      :style="dropdownStyle"
      @click.stop="handleMenuClick"
    >
      <slot name="dropdown"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, provide, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-dropdown'

const props = defineProps({
  // 菜单按钮类型
  type: {
    type: String,
    default: ''
  },
  // 菜单尺寸
  size: {
    type: String,
    default: ''
  },
  // 菜单最大高度
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  // 下拉触发元素呈现为按钮组
  splitButton: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 菜单弹出位置: top/top-start/top-end/bottom/bottom-start/bottom-end
  placement: {
    type: String,
    default: 'bottom'
  },
  // 触发下拉的行为: click
  trigger: {
    type: String,
    default: 'click'
  },
  // 是否在点击菜单项后隐藏菜单
  hideOnClick: {
    type: Boolean,
    default: true
  },
  // 展开下拉菜单的延时
  showTimeout: {
    type: Number,
    default: 150
  },
  // 收起下拉菜单的延时
  hideTimeout: {
    type: Number,
    default: 150
  },
  // 自定义浮层类名
  popperClass: {
    type: String,
    default: ''
  },
  // 是否将下拉列表插入至 body 元素
  teleported: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['click', 'command', 'visible-change'])

// 状态变量
const visible = ref(false)
const showTimer = ref(null)
const hideTimer = ref(null)
const dropdownWidth = ref(0)

// 下拉菜单样式
const dropdownStyle = computed(() => {
  const style = {}
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' 
      ? `${props.maxHeight}px` 
      : props.maxHeight
    style.overflow = 'auto'
  }
  return style
})

// 打开下拉菜单
const handleOpen = () => {
  if (props.disabled) return
  clearTimeout(hideTimer.value)
  if (showTimer.value) clearTimeout(showTimer.value)
  
  showTimer.value = setTimeout(() => {
    visible.value = true
    emit('visible-change', true)
  }, props.showTimeout)
}

// 关闭下拉菜单
const handleClose = () => {
  if (showTimer.value) clearTimeout(showTimer.value)
  
  hideTimer.value = setTimeout(() => {
    visible.value = false
    emit('visible-change', false)
  }, props.hideTimeout)
}

// 点击触发器
const handleTriggerClick = (event) => {
  if (props.disabled) return
  
  if (props.splitButton) {
    emit('click', event)
  } else {
    if (visible.value) {
      handleClose()
    } else {
      handleOpen()
    }
  }
}

// 点击菜单
const handleMenuClick = (event) => {
  const target = event.target
  const commandElement = findCommandElement(target)
  
  if (commandElement) {
    const command = commandElement.dataset.command
    emit('command', command)
    
    if (props.hideOnClick) {
      handleClose()
    }
  }
}

// 查找具有command属性的元素
const findCommandElement = (element) => {
  while (element && element !== proxy.$el) {
    if (element.dataset && element.dataset.command !== undefined) {
      return element
    }
    element = element.parentNode
  }
  return null
}

// 提供方法给子组件
provide('zx-dropdown', {
  handleClose,
  handleOpen
})

// 处理页面点击事件，用于关闭下拉菜单
const handlePageClick = (event) => {
  // 小程序环境中无法使用 contains 方法检查点击的元素是否在组件内
  // 所以在点击菜单之外的地方时，关闭下拉菜单
  if (visible.value) {
    // 这里简化处理逻辑，当菜单显示状态下，点击页面任何地方都关闭菜单
    // 而菜单内的点击由 handleMenuClick 处理，阻止冒泡即可
    handleClose()
  }
}

onMounted(() => {
  // 测量触发器宽度 - 小程序中不支持直接使用querySelector
  // 使用uni-app提供的createSelectorQuery代替
  setTimeout(() => {
    // 在小程序环境中，我们需要使用uni的API代替DOM操作
    // 由于无法直接获取元素宽度，这里可以设置一个默认值或通过其他方式计算
    dropdownWidth.value = 150 // 默认宽度
  }, 0)
  
  // 小程序环境中无法直接使用document.addEventListener
  // 可以通过页面的点击事件处理点击外部关闭
  // 注意：这在小程序中可能需要在父组件上添加点击处理
})

onBeforeUnmount(() => {
  // 清理定时器
  if (showTimer.value) {
    clearTimeout(showTimer.value)
  }
  if (hideTimer.value) {
    clearTimeout(hideTimer.value)
  }
})

// 暴露方法
defineExpose({
  handleOpen,
  handleClose
})
</script>

<style scoped>
.zx-dropdown {
  position: relative;
  display: inline-block;
  color: #606266;
  font-size: 14px;
}

.zx-dropdown.is-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.zx-dropdown__trigger {
  display: inline-flex;
  align-items: center;
}

.zx-dropdown__menu {
  position: absolute;
  z-index: 10;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin: 5px 0;
  min-width: 150px;
}

.zx-dropdown__menu--top,
.zx-dropdown__menu--top-start,
.zx-dropdown__menu--top-end {
  bottom: 100%;
}

.zx-dropdown__menu--bottom,
.zx-dropdown__menu--bottom-start,
.zx-dropdown__menu--bottom-end {
  top: 100%;
}

.zx-dropdown__menu--top,
.zx-dropdown__menu--bottom {
  left: 50%;
  transform: translateX(-50%);
}

.zx-dropdown__menu--top-start,
.zx-dropdown__menu--bottom-start {
  left: 0;
}

.zx-dropdown__menu--top-end,
.zx-dropdown__menu--bottom-end {
  right: 0;
}
</style>
