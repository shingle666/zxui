<template>
  <zx-popup ref="popupRef" :show="show" :type="'center'" :mask-click="false" :safe-area="false" @change="onPopupChange">
    <view class="zx-popup-dialog">
      <!-- 标题区域 -->
      <view class="zx-dialog-title" v-if="title || $slots.title">
        <slot name="title">
          <text class="zx-dialog-title-text" :class="['zx-popup__' + dialogType]">{{ titleText }}</text>
        </slot>
      </view>

      <!-- 内容区域 -->
      <view class="zx-dialog-content">
        <slot>
          <view v-if="mode === 'base'">
            <text class="zx-dialog-content-text">{{ content }}</text>
          </view>
          <view v-else class="zx-dialog-input-wrapper">
            <zx-input class="zx-dialog-input" :maxlength="maxlength" v-model="inputValue" :type="inputType"
              :placeholder="placeholderText" :focus="focus && show" @input="onInput" />
          </view>
        </slot>
      </view>

      <!-- 按钮区域 -->
      <view class="zx-dialog-button-group">
        <zx-button v-if="showCancel" class="zx-dialog-button" @click="onCancel">
          <text class="zx-dialog-button-text">{{ cancelText }}</text>
        </zx-button>
        <zx-button class="zx-dialog-button" :class="showCancel ? 'zx-border-left' : ''" @click="onConfirm">
          <text class="zx-dialog-button-text zx-button-color">{{ confirmText }}</text>
        </zx-button>
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import zxPopup from '@tanzhenxing/zx-popup/zx-popup.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'

// 定义 props
const props = defineProps({
  // 是否显示弹窗
  show: {
    type: Boolean,
    default: false
  },
  // 弹窗标题
  title: {
    type: String,
    default: '提示'
  },
  // 弹窗内容
  content: {
    type: String,
    default: ''
  },
  // 弹窗类型：success、warning、info、error
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'warning', 'info', 'error'].includes(value)
  },
  // 弹窗模式：base（基础对话框）、input（输入对话框）
  mode: {
    type: String,
    default: 'base',
    validator: (value) => ['base', 'input'].includes(value)
  },
  // 是否显示取消按钮
  showCancel: {
    type: Boolean,
    default: true
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 是否在确认前拦截
  beforeClose: {
    type: Boolean,
    default: false
  },
  // input 模式相关属性
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  inputType: {
    type: String,
    default: 'text'
  },
  maxlength: {
    type: Number,
    default: -1
  },
  focus: {
    type: Boolean,
    default: true
  }
})

// 定义 emits
const emit = defineEmits([
  'update:show',
  'update:modelValue',
  'confirm',
  'cancel',
  'change'
])

// 响应式数据
const popupRef = ref(null)
const inputValue = ref('')

// 计算属性
const dialogType = computed(() => {
  if (props.mode === 'input') {
    return 'info'
  }
  return props.type
})

const titleText = computed(() => {
  return props.title
})

const placeholderText = computed(() => {
  return props.placeholder
})

// 监听器
watch(
  () => props.modelValue,
  (newVal) => {
    inputValue.value = newVal
  },
  { immediate: true }
)

watch(
  () => props.show,
  (newVal) => {
    if (newVal && props.mode === 'input') {
      inputValue.value = props.modelValue
    }
  }
)

// 方法
const onInput = (e) => {
  const value = e.detail ? e.detail.value : e.target.value
  inputValue.value = value
  emit('update:modelValue', value)
}

const onConfirm = () => {
  if (props.beforeClose) {
    if (props.mode === 'input') {
      emit('confirm', inputValue.value)
    } else {
      emit('confirm')
    }
    return
  }

  if (props.mode === 'input') {
    emit('confirm', inputValue.value)
  } else {
    emit('confirm')
  }

  close()
}

const onCancel = () => {
  if (props.beforeClose) {
    emit('cancel')
    return
  }

  emit('cancel')
  close()
}

const onPopupChange = (e) => {
  emit('change', e)
  if (!e.show) {
    emit('update:show', false)
  }
}

const open = () => {
  emit('update:show', true)
  if (popupRef.value) {
    popupRef.value.open()
  }
}

const close = () => {
  emit('update:show', false)
  if (popupRef.value) {
    popupRef.value.close()
  }
}

// 暴露方法给父组件
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>
.zx-popup-dialog {
  width: 300px;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;
}

.zx-dialog-title {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 25px 20px 15px;
}

.zx-dialog-title-text {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-align: center;
}

.zx-dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px 25px;
  min-height: 40px;
}

.zx-dialog-content-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  text-align: center;
}

.zx-dialog-input-wrapper {
  width: 100%;
}

.zx-dialog-input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  color: #333;
  background-color: #f8f8f8;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  box-sizing: border-box;
}

.zx-dialog-input:focus {
  border-color: #007aff;
  background-color: #fff;
}

.zx-dialog-button-group {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #f0f0f0;
}

.zx-dialog-button {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #fff;
}

.zx-dialog-button:active {
  background-color: #f8f8f8;
}

.zx-border-left {
  border-left: 1px solid #f0f0f0;
}

.zx-dialog-button-text {
  font-size: 16px;
  color: #333;
}

.zx-button-color {
  color: #007aff;
  font-weight: 500;
}

/* 主题样式 */
.zx-popup__success {
  color: #4cd964;
}

.zx-popup__warning {
  color: #f0ad4e;
}

.zx-popup__error {
  color: #dd524d;
}

.zx-popup__info {
  color: #909399;
}
</style>