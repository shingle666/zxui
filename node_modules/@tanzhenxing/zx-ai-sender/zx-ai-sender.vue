<template>
  <view :class="senderClasses" :style="senderStyles">
    <!-- 头部区域 -->
    <view v-if="header || $slots.header" :class="headerClasses" :style="headerStyles">
      <slot name="header">{{ header }}</slot>
    </view>

    <!-- 主要内容区域 -->
    <view :class="contentClasses" :style="contentStyles">
      <!-- 前缀区域 -->
      <view v-if="prefix || $slots.prefix" :class="prefixClasses" :style="prefixStyles">
        <slot name="prefix">{{ prefix }}</slot>
      </view>

      <!-- 输入区域 -->
      <view :class="inputWrapperClasses" :style="inputWrapperStyles">
        <textarea
          ref="textareaRef"
          v-model="inputValue"
          :class="inputClasses"
          :style="inputStyles"
          :placeholder="placeholder"
          :disabled="disabled || loading"
          :readonly="readOnly"
          :maxlength="maxlength"
          :auto-height="autoSize"
          :cursor-spacing="cursorSpacing"
          :show-confirm-bar="showConfirmBar"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :adjust-position="adjustPosition"
          :hold-keyboard="holdKeyboard"
          :confirm-type="confirmType"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
          @keyboardheightchange="handleKeyboardHeightChange"
        />
      </view>

      <!-- 操作按钮区域 -->
      <view :class="actionsClasses" :style="actionsStyles">
        <slot name="actions" :components="actionComponents" :info="{ components: actionComponents }">
          <!-- 默认操作按钮 -->
          <view :class="defaultActionsClasses">
            <!-- 清除按钮 -->
            <view
              v-if="showClearButton"
              :class="clearButtonClasses"
              :style="clearButtonStyles"
              @click="handleClear"
            >
              <slot name="clearIcon">
                <text :class="clearIconClasses">✕</text>
              </slot>
            </view>

            <!-- 语音按钮 -->
            <view
              v-if="allowSpeech && showSpeechButton"
              :class="speechButtonClasses"
              :style="speechButtonStyles"
              @click="handleSpeech"
            >
              <slot name="speechIcon">
                <text :class="speechIconClasses">🎤</text>
              </slot>
            </view>

            <!-- 发送按钮 -->
            <view
              v-if="showSendButton"
              :class="sendButtonClasses"
              :style="sendButtonStyles"
              @click="handleSend"
            >
              <slot name="sendIcon" v-if="loading">
                <view :class="loadingClasses">
                  <view :class="loadingDotClasses"></view>
                </view>
              </slot>
              <slot name="sendIcon" v-else>
                <text :class="sendIconClasses">➤</text>
              </slot>
            </view>
          </view>
        </slot>
      </view>
    </view>

    <!-- 底部区域 -->
    <view v-if="footer || $slots.footer" :class="footerClasses" :style="footerStyles">
      <slot name="footer" :components="actionComponents" :info="{ components: actionComponents }">{{ footer }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch, nextTick, useSlots } from 'vue'

// Props 定义
const props = defineProps({
  // 基础属性
  prefixCls: {
    type: String,
    default: 'zx-ai-sender'
  },
  rootClassName: {
    type: String,
    default: ''
  },
  // 输入相关
  modelValue: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入消息...'
  },
  maxlength: {
    type: Number,
    default: -1
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  // 提交类型
  submitType: {
    type: [String, Boolean],
    default: 'enter',
    validator: (value) => [true, false, 'enter', 'shiftEnter'].includes(value)
  },
  // 状态
  loading: {
    type: Boolean,
    default: false
  },
  // 自动调整高度
  autoSize: {
    type: [Boolean, Object],
    default: true
  },
  // 语音功能
  allowSpeech: {
    type: [Boolean, Object],
    default: false
  },
  // 自定义区域
  prefix: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: ''
  },
  footer: {
    type: String,
    default: ''
  },
  // 样式配置
  styles: {
    type: Object,
    default: () => ({})
  },
  classNames: {
    type: Object,
    default: () => ({})
  },
  // 小程序特有属性
  cursorSpacing: {
    type: Number,
    default: 0
  },
  showConfirmBar: {
    type: Boolean,
    default: true
  },
  selectionStart: {
    type: Number,
    default: -1
  },
  selectionEnd: {
    type: Number,
    default: -1
  },
  adjustPosition: {
    type: Boolean,
    default: true
  },
  holdKeyboard: {
    type: Boolean,
    default: false
  },
  confirmType: {
    type: String,
    default: 'send'
  }
})

// Emits 定义
const emit = defineEmits([
  'update:modelValue',
  'update:value',
  'submit',
  'cancel',
  'change',
  'focus',
  'blur',
  'clear',
  'speech',
  'keyboardHeightChange'
])

// Slots
const slots = useSlots()

// 响应式数据
const textareaRef = ref(null)
const inputValue = ref('')
const isFocused = ref(false)
const isComposing = ref(false)

// 初始化输入值
const initValue = () => {
  const val = props.modelValue || props.value || props.defaultValue
  inputValue.value = val
}

// 监听外部值变化
watch(
  () => props.modelValue || props.value,
  (newVal) => {
    if (newVal !== inputValue.value) {
      inputValue.value = newVal || ''
    }
  },
  { immediate: true }
)

// 初始化
initValue()

// 计算属性 - 是否显示各种按钮
const showClearButton = computed(() => {
  return inputValue.value.length > 0 && !props.disabled && !props.readOnly
})

const showSpeechButton = computed(() => {
  return props.allowSpeech && !props.disabled && !props.readOnly
})

const showSendButton = computed(() => {
  return !props.disabled && !props.readOnly
})

// 计算属性 - 是否可以发送
const canSend = computed(() => {
  return inputValue.value.trim().length > 0 && !props.loading
})

// 操作组件对象
const actionComponents = {
  SendButton: 'SendButton',
  ClearButton: 'ClearButton',
  LoadingButton: 'LoadingButton',
  SpeechButton: 'SpeechButton'
}

// 样式计算
const senderClasses = computed(() => {
  return [
    props.prefixCls,
    props.rootClassName,
    props.classNames.root,
    {
      [`${props.prefixCls}--disabled`]: props.disabled,
      [`${props.prefixCls}--loading`]: props.loading,
      [`${props.prefixCls}--focused`]: isFocused.value,
      [`${props.prefixCls}--readonly`]: props.readOnly
    }
  ].filter(Boolean)
})

const senderStyles = computed(() => {
  return {
    ...props.styles.root
  }
})

const headerClasses = computed(() => {
  return [
    `${props.prefixCls}__header`,
    props.classNames.header
  ].filter(Boolean)
})

const headerStyles = computed(() => {
  return {
    ...props.styles.header
  }
})

const contentClasses = computed(() => {
  return [
    `${props.prefixCls}__content`,
    props.classNames.content
  ].filter(Boolean)
})

const contentStyles = computed(() => {
  return {
    ...props.styles.content
  }
})

const prefixClasses = computed(() => {
  return [
    `${props.prefixCls}__prefix`,
    props.classNames.prefix
  ].filter(Boolean)
})

const prefixStyles = computed(() => {
  return {
    ...props.styles.prefix
  }
})

const inputWrapperClasses = computed(() => {
  return [
    `${props.prefixCls}__input-wrapper`,
    props.classNames.inputWrapper
  ].filter(Boolean)
})

const inputWrapperStyles = computed(() => {
  return {
    ...props.styles.inputWrapper
  }
})

const inputClasses = computed(() => {
  return [
    `${props.prefixCls}__input`,
    props.classNames.input
  ].filter(Boolean)
})

const inputStyles = computed(() => {
  return {
    ...props.styles.input
  }
})

const actionsClasses = computed(() => {
  return [
    `${props.prefixCls}__actions`,
    props.classNames.actions
  ].filter(Boolean)
})

const actionsStyles = computed(() => {
  return {
    ...props.styles.actions
  }
})

const defaultActionsClasses = computed(() => {
  return [
    `${props.prefixCls}__default-actions`
  ]
})

const clearButtonClasses = computed(() => {
  return [
    `${props.prefixCls}__clear-button`,
    `${props.prefixCls}__action-button`
  ]
})

const clearButtonStyles = computed(() => {
  return {
    ...props.styles.clearButton
  }
})

const speechButtonClasses = computed(() => {
  return [
    `${props.prefixCls}__speech-button`,
    `${props.prefixCls}__action-button`
  ]
})

const speechButtonStyles = computed(() => {
  return {
    ...props.styles.speechButton
  }
})

const sendButtonClasses = computed(() => {
  return [
    `${props.prefixCls}__send-button`,
    `${props.prefixCls}__action-button`,
    {
      [`${props.prefixCls}__send-button--disabled`]: !canSend.value,
      [`${props.prefixCls}__send-button--loading`]: props.loading
    }
  ].filter(Boolean)
})

const sendButtonStyles = computed(() => {
  return {
    ...props.styles.sendButton
  }
})

const footerClasses = computed(() => {
  return [
    `${props.prefixCls}__footer`,
    props.classNames.footer
  ].filter(Boolean)
})

const footerStyles = computed(() => {
  return {
    ...props.styles.footer
  }
})

const clearIconClasses = computed(() => {
  return [
    `${props.prefixCls}__clear-icon`
  ]
})

const speechIconClasses = computed(() => {
  return [
    `${props.prefixCls}__speech-icon`
  ]
})

const sendIconClasses = computed(() => {
  return [
    `${props.prefixCls}__send-icon`
  ]
})

const loadingClasses = computed(() => {
  return [
    `${props.prefixCls}__loading`
  ]
})

const loadingDotClasses = computed(() => {
  return [
    `${props.prefixCls}__loading-dot`
  ]
})

// 事件处理
const handleInput = (e) => {
  const value = e.detail.value
  inputValue.value = value
  
  // 触发双向绑定
  emit('update:modelValue', value)
  emit('update:value', value)
  
  // 触发 change 事件
  emit('change', value, e)
}

const handleFocus = (e) => {
  isFocused.value = true
  emit('focus', e)
}

const handleBlur = (e) => {
  isFocused.value = false
  emit('blur', e)
}

const handleConfirm = (e) => {
  if (props.submitType === 'enter' || props.submitType === true) {
    handleSend()
  }
}

const handleKeyboardHeightChange = (e) => {
  emit('keyboardHeightChange', e)
}

const handleSend = () => {
  if (!canSend.value) return
  
  const message = inputValue.value.trim()
  if (message) {
    emit('submit', message)
  }
}

const handleClear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  emit('update:value', '')
  emit('clear')
  
  // 聚焦到输入框
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.focus()
    }
  })
}

const handleSpeech = () => {
  emit('speech')
}

// 暴露方法
const focus = () => {
  if (textareaRef.value) {
    textareaRef.value.focus()
  }
}

const blur = () => {
  if (textareaRef.value) {
    textareaRef.value.blur()
  }
}

const clear = () => {
  handleClear()
}

defineExpose({
  focus,
  blur,
  clear
})
</script>

<style lang="scss" scoped>
.zx-ai-sender {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 12rpx;
  border: 2rpx solid #e4e7ed;
  overflow: hidden;
  transition: border-color 0.3s;

  &--focused {
    border-color: #409eff;
  }

  &--disabled {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    opacity: 0.6;
  }

  &--readonly {
    background-color: #f5f7fa;
  }

  &__header {
    padding: 24rpx;
    border-bottom: 2rpx solid #f0f0f0;
    background-color: #fafafa;
  }

  &__content {
    display: flex;
    align-items: flex-end;
    padding: 24rpx;
    gap: 16rpx;
  }

  &__prefix {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__input-wrapper {
    flex: 1;
    min-height: 80rpx;
  }

  &__input {
    width: 100%;
    min-height: 80rpx;
    padding: 16rpx 20rpx;
    border: none;
    outline: none;
    background: transparent;
    font-size: 28rpx;
    line-height: 1.5;
    color: #303133;
    resize: none;
    box-sizing: border-box;

    &::placeholder {
      color: #c0c4cc;
    }
  }

  &__actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  &__default-actions {
    display: flex;
    align-items: center;
    gap: 12rpx;
  }

  &__action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__clear-button {
    background-color: #f0f0f0;
    color: #909399;

    &:hover {
      background-color: #e0e0e0;
    }
  }

  &__speech-button {
    background-color: #e1f3d8;
    color: #67c23a;

    &:hover {
      background-color: #d1e7c1;
    }
  }

  &__send-button {
    background-color: #409eff;
    color: #ffffff;

    &:hover {
      background-color: #337ecc;
    }

    &--disabled {
      background-color: #c0c4cc;
      cursor: not-allowed;
      transform: none !important;

      &:hover {
        background-color: #c0c4cc;
        transform: none !important;
      }
    }

    &--loading {
      cursor: not-allowed;
    }
  }

  &__clear-icon,
  &__speech-icon,
  &__send-icon {
    font-size: 32rpx;
    line-height: 1;
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__loading-dot {
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background-color: currentColor;
    animation: loading-dot 1.4s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }

  &__footer {
    padding: 24rpx;
    border-top: 2rpx solid #f0f0f0;
    background-color: #fafafa;
  }
}

@keyframes loading-dot {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .zx-ai-sender {
    background-color: #1f1f1f;
    border-color: #3a3a3a;
    color: #ffffff;

    &__header,
    &__footer {
      background-color: #2a2a2a;
      border-color: #3a3a3a;
    }

    &__input {
      color: #ffffff;

      &::placeholder {
        color: #8a8a8a;
      }
    }

    &__clear-button {
      background-color: #3a3a3a;
      color: #8a8a8a;

      &:hover {
        background-color: #4a4a4a;
      }
    }

    &--disabled {
      background-color: #2a2a2a;
    }

    &--readonly {
      background-color: #2a2a2a;
    }
  }
}
</style>