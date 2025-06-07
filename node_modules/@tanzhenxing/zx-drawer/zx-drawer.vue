<template>
  <view>
    <!-- 遮罩层 -->
    <view 
      v-if="modelValue && modal" 
      class="zx-drawer__mask"
      :style="{ zIndex: zIndex }"
      @click="handleClickModal"
    ></view>
    
    <!-- 抽屉内容 -->
    <view 
      class="zx-drawer" 
      :class="[
        `zx-drawer--${direction}`,
        customClass,
        { 'zx-drawer--open': modelValue }
      ]"
      :style="drawerStyle"
    >
      <!-- 头部 -->
      <view v-if="withHeader" class="zx-drawer__header" :class="headerClass">
        <slot name="header">
          <view class="zx-drawer__title" :aria-level="headerAriaLevel">{{ title }}</view>
        </slot>
        <view 
          v-if="showClose" 
          class="zx-drawer__close-btn" 
          @click="handleClose"
        >
          <text class="zx-icon-close"></text>
        </view>
      </view>
      
      <!-- 内容区 -->
      <view class="zx-drawer__body" :class="bodyClass">
        <slot></slot>
      </view>
      
      <!-- 底部 -->
      <view v-if="$slots.footer" class="zx-drawer__footer" :class="footerClass">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// Props 定义
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  modal: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'rtl',
    validator: (val) => ['ltr', 'rtl', 'ttb', 'btt'].includes(val)
  },
  showClose: {
    type: Boolean,
    default: true
  },
  size: {
    type: [Number, String],
    default: '30%'
  },
  title: {
    type: String,
    default: ''
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalClass: {
    type: String,
    default: ''
  },
  headerClass: {
    type: String,
    default: ''
  },
  bodyClass: {
    type: String,
    default: ''
  },
  footerClass: {
    type: String,
    default: ''
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  headerAriaLevel: {
    type: String,
    default: '2'
  },
  customClass: {
    type: String,
    default: ''
  }
})

// Emits 定义
const emit = defineEmits([
  'update:modelValue',
  'open',
  'opened',
  'close',
  'closed',
  'open-auto-focus',
  'close-auto-focus'
])

// 计算 drawer 样式
const drawerStyle = computed(() => {
  const styles = {
    zIndex: props.zIndex
  }
  
  if (props.modelValue) {
    // 根据方向设置位置和尺寸
    const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
    
    if (['ltr', 'rtl'].includes(props.direction)) {
      styles.width = sizeValue
    } else {
      styles.height = sizeValue
    }
  }
  
  return styles
})

// 打开和关闭的定时器
let openTimer = null
let closeTimer = null

// 处理关闭
const handleClose = () => {
  if (props.beforeClose) {
    props.beforeClose(close)
  } else {
    close()
  }
}

// 关闭抽屉
const close = () => {
  if (openTimer !== null) {
    clearTimeout(openTimer)
    openTimer = null
  }

  if (props.closeDelay > 0) {
    closeTimer = setTimeout(() => {
      closeTimer = null
      emit('update:modelValue', false)
    }, props.closeDelay)
  } else {
    emit('update:modelValue', false)
  }
}

// 处理遮罩点击
const handleClickModal = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      // 打开抽屉
      if (props.openDelay > 0) {
        if (closeTimer !== null) {
          clearTimeout(closeTimer)
          closeTimer = null
        }
        openTimer = setTimeout(() => {
          openTimer = null
          emit('open')
          nextTick(() => {
            emit('opened')
            emit('open-auto-focus')
          })
        }, props.openDelay)
      } else {
        emit('open')
        nextTick(() => {
          emit('opened')
          emit('open-auto-focus')
        })
      }
    } else {
      // 关闭抽屉
      emit('close')
      nextTick(() => {
        emit('closed')
        emit('close-auto-focus')
      })
    }
  }
)

// 暴露方法
defineExpose({
  handleClose
})
</script>

<style>
.zx-drawer__mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}

.zx-drawer {
  position: fixed;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
              0 16px 24px 2px rgba(0, 0, 0, 0.14),
              0 6px 30px 5px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.3s;
}

/* 从右到左 */
.zx-drawer--rtl {
  top: 0;
  right: 0;
  bottom: 0;
  transform: translateX(100%);
}

/* 从左到右 */
.zx-drawer--ltr {
  top: 0;
  left: 0;
  bottom: 0;
  transform: translateX(-100%);
}

/* 从上到下 */
.zx-drawer--ttb {
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
}

/* 从下到上 */
.zx-drawer--btt {
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(100%);
}

/* 打开状态 */
.zx-drawer--open {
  transform: translate(0, 0);
}

.zx-drawer__header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
}

.zx-drawer__title {
  font-size: 16px;
  color: #303133;
  font-weight: 700;
}

.zx-drawer__close-btn {
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  color: #909399;
}

.zx-drawer__body {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

.zx-drawer__footer {
  padding: 20px;
  border-top: 1px solid #ebeef5;
}

/* 适配小程序端的按钮样式 */
.zx-icon-close:before {
  content: "×";
  font-size: 20px;
}
</style>
