<template>
  <view class="zx-dropdown-item" :class="[{ 'is-disabled': disabled, 'is-divided': divided }]" :data-command="command"
    @click.stop="handleClick">
    <view v-if="icon || $slots.icon" class="zx-dropdown-item__icon">
      <slot name="icon">
        <zx-icon v-if="icon" :name="icon" size="16"></zx-icon>
      </slot>
    </view>
    <view class="zx-dropdown-item__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, inject } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-dropdown-item'

const props = defineProps({
  // 指令，会传递给 command 回调函数
  command: {
    type: [String, Number, Object],
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示分隔符
  divided: {
    type: Boolean,
    default: false
  },
  // 图标
  icon: {
    type: String,
    default: ''
  }
})

// 注入的dropdown上下文
const dropdown = inject('zx-dropdown', {
  handleClose: () => { }
})

// 点击处理
const handleClick = (event) => {
  if (props.disabled) {
    event.stopPropagation()
    return
  }

  // 阻止事件冒泡到页面
  event.stopPropagation()

  // 触发command事件
  if (props.command !== undefined) {
    const dropdownRoot = dropdown
    if (dropdownRoot) {
      dropdownRoot.handleClose()
    }
  }
}
</script>

<style scoped>
.zx-dropdown-item {
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  outline: none;
}

.zx-dropdown-item:hover,
.zx-dropdown-item:focus {
  background-color: #f5f7fa;
  color: #409eff;
}

.zx-dropdown-item.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  pointer-events: none;
}

.zx-dropdown-item.is-divided {
  position: relative;
  margin-top: 6px;
  border-top: 1px solid #ebeef5;
}

.zx-dropdown-item.is-divided:before {
  content: '';
  height: 6px;
  display: block;
  margin: 0 -20px;
  background-color: #fff;
}

.zx-dropdown-item__icon {
  margin-right: 10px;
}

.zx-dropdown-item__content {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>