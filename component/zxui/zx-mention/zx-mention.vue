<template>
  <view class="zx-mention-container" :class="[size ? 'zx-mention-' + size : '']">
    <!-- 输入框 -->
    <textarea
      v-if="type === 'textarea'"
      ref="textareaRef"
      class="zx-mention-textarea"
      :style="getInputStyle"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :placeholderClass="placeholderClass"
      :maxlength="maxlength"
      :autoHeight="autoHeight"
      :fixed="fixed"
      :cursorSpacing="cursorSpacing"
      :cursor="cursor"
      :showConfirmBar="showConfirmBar"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :holdKeyboard="holdKeyboard"
      :autoFocus="autoFocus"
      :focus="focus"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @linechange="onLineChange"
      @keyboardheightchange="onKeyboardHeightChange"
    />
    <input
      v-else
      ref="inputRef"
      class="zx-mention-input"
      :style="getInputStyle"
      :type="inputType"
      :value="modelValue"
      :disabled="disabled"
      :password="password"
      :placeholder="placeholder"
      :placeholderStyle="placeholderStyle"
      :placeholderClass="placeholderClass"
      :maxlength="maxlength"
      :cursorSpacing="cursorSpacing"
      :cursorColor="cursorColor"
      :autoFocus="autoFocus"
      :focus="focus"
      :cursor="cursor"
      :confirmType="confirmType"
      :alwaysEmbed="alwaysEmbed"
      :confirmHold="confirmHold"
      :selectionStart="selectionStart"
      :selectionEnd="selectionEnd"
      :adjustPosition="adjustPosition"
      :holdKeyboard="holdKeyboard"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @confirm="onConfirm"
      @keyboardheightchange="onKeyboardHeightChange"
    />

    <!-- 清除按钮 -->
    <view
      class="zx-mention-clear"
      v-if="clearable && modelValue && !disabled && isFocused"
      @click="onClear"
    >
      <text class="zx-mention-clear-icon">×</text>
    </view>

    <!-- 下拉选项面板 -->
    <view
      class="zx-mention-dropdown"
      :class="[
        'zx-mention-dropdown-' + placement,
        { 'zx-mention-dropdown-visible': dropdownVisible }
      ]"
      :style="getDropdownStyle"
      v-show="dropdownVisible"
    >
      <!-- Loading状态 -->
      <view v-if="loading" class="zx-mention-loading">
        <slot name="loading">
          <text class="zx-mention-loading-text">加载中...</text>
        </slot>
      </view>
      
      <!-- 头部插槽 -->
      <view v-if="$slots.header" class="zx-mention-dropdown-header">
        <slot name="header"></slot>
      </view>

      <!-- 选项列表 -->
      <scroll-view
        v-if="!loading && filteredOptions.length > 0"
        class="zx-mention-options"
        scroll-y
        :style="{ maxHeight: maxHeight + 'rpx' }"
      >
        <view
          v-for="(option, index) in filteredOptions"
          :key="option.value || index"
          class="zx-mention-option"
          :class="{
            'zx-mention-option-disabled': option.disabled,
            'zx-mention-option-active': index === activeIndex
          }"
          @click="selectOption(option, index)"
        >
          <slot name="label" :item="option" :index="index">
            <text class="zx-mention-option-text">{{ option.label || option.value }}</text>
          </slot>
        </view>
      </scroll-view>

      <!-- 空状态 -->
      <view v-if="!loading && filteredOptions.length === 0" class="zx-mention-empty">
        <text class="zx-mention-empty-text">暂无数据</text>
      </view>

      <!-- 底部插槽 -->
      <view v-if="$slots.footer" class="zx-mention-dropdown-footer">
        <slot name="footer"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

// Props定义
const props = defineProps({
  // 双向绑定值
  modelValue: {
    type: String,
    default: ''
  },
  // 输入框类型
  type: {
    type: String,
    default: 'input',
    validator: (value) => ['input', 'textarea'].includes(value)
  },
  // 输入框的原生type属性，仅在type为input时有效
  inputType: {
    type: String,
    default: 'text'
  },
  // 是否密码输入框
  password: {
    type: Boolean,
    default: false
  },
  // 提及选项列表
  options: {
    type: Array,
    default: () => []
  },
  // 触发字段的前缀
  prefix: {
    type: [String, Array],
    default: '@'
  },
  // 用于拆分提及的字符
  split: {
    type: String,
    default: ' '
  },
  // 自定义筛选器选项逻辑
  filterOption: {
    type: [Boolean, Function],
    default: true
  },
  // 弹出位置
  placement: {
    type: String,
    default: 'bottom',
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  // 下拉面板偏移量
  offset: {
    type: Number,
    default: 0
  },
  // 当退格键被按下做删除操作时，是否将提及部分作为整体删除
  whole: {
    type: Boolean,
    default: false
  },
  // 检查是否将提及部分作为整体删除的自定义函数
  checkIsWhole: {
    type: Function,
    default: null
  },
  // 提及的下拉面板是否处于加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 输入框尺寸
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['small', 'default', 'large'].includes(value)
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  // 占位符样式
  placeholderStyle: {
    type: String,
    default: ''
  },
  // 占位符样式类
  placeholderClass: {
    type: String,
    default: ''
  },
  // 最大输入长度
  maxlength: {
    type: Number,
    default: 300
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: false
  },
  // 下拉面板最大高度
  maxHeight: {
    type: Number,
    default: 400
  },
  // 边框样式
  borderSize: {
    type: String,
    default: '1rpx'
  },
  borderColor: {
    type: String,
    default: '#ececec'
  },
  borderActiveColor: {
    type: String,
    default: '#2979ff'
  },
  borderRadius: {
    type: String,
    default: '10rpx'
  },
  // textarea特有属性
  autoHeight: {
    type: Boolean,
    default: false
  },
  fixed: {
    type: Boolean,
    default: false
  },
  showConfirmBar: {
    type: Boolean,
    default: true
  },
  // 通用输入框属性
  cursorSpacing: {
    type: Number,
    default: 0
  },
  cursorColor: {
    type: String,
    default: '#2979ff'
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  focus: {
    type: Boolean,
    default: false
  },
  cursor: {
    type: Number,
    default: 0
  },
  confirmType: {
    type: String,
    default: 'done'
  },
  alwaysEmbed: {
    type: Boolean,
    default: false
  },
  confirmHold: {
    type: Boolean,
    default: false
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
  }
})

// 事件定义
const emit = defineEmits([
  'update:modelValue',
  'input',
  'focus',
  'blur',
  'confirm',
  'clear',
  'search',
  'select',
  'linechange',
  'keyboardheightchange'
])

// 响应式数据
const inputRef = ref(null)
const textareaRef = ref(null)
const isFocused = ref(false)
const dropdownVisible = ref(false)
const activeIndex = ref(-1)
const currentPrefix = ref('')
const currentPattern = ref('')
const cursorPosition = ref(0)

// 获取前缀数组
const prefixArray = computed(() => {
  return Array.isArray(props.prefix) ? props.prefix : [props.prefix]
})

// 过滤后的选项
const filteredOptions = computed(() => {
  if (!dropdownVisible.value || !currentPattern.value) {
    return props.options
  }

  if (props.filterOption === false) {
    return props.options
  }

  if (typeof props.filterOption === 'function') {
    return props.options.filter(option => 
      props.filterOption(currentPattern.value, option)
    )
  }

  // 默认过滤逻辑
  return props.options.filter(option => {
    const text = option.label || option.value || ''
    return text.toLowerCase().includes(currentPattern.value.toLowerCase())
  })
})

// 输入框样式
const getInputStyle = computed(() => {
  const style = {
    border: `${props.borderSize} solid ${props.borderColor}`,
    borderRadius: props.borderRadius
  }

  if (isFocused.value) {
    style.borderColor = props.borderActiveColor
  }

  // 根据尺寸设置样式
  switch (props.size) {
    case 'small':
      style.fontSize = '28rpx'
      style.padding = props.type === 'textarea' ? '20rpx' : '15rpx 20rpx'
      style.height = props.type === 'textarea' ? 'auto' : '60rpx'
      break
    case 'large':
      style.fontSize = '34rpx'
      style.padding = props.type === 'textarea' ? '24rpx' : '18rpx 24rpx'
      style.height = props.type === 'textarea' ? 'auto' : '80rpx'
      break
    default:
      style.fontSize = '30rpx'
      style.padding = props.type === 'textarea' ? '22rpx' : '16rpx 22rpx'
      style.height = props.type === 'textarea' ? 'auto' : '70rpx'
      break
  }

  return style
})

// 下拉面板样式
const getDropdownStyle = computed(() => {
  const style = {
    marginTop: props.placement === 'bottom' ? props.offset + 'px' : '0',
    marginBottom: props.placement === 'top' ? props.offset + 'px' : '0'
  }
  return style
})

// 输入事件处理
function onInput(e) {
  const value = e.detail.value
  cursorPosition.value = e.detail.cursor || 0
  
  emit('update:modelValue', value)
  emit('input', e)
  
  // 检查是否触发提及
  checkMentionTrigger(value, cursorPosition.value)
}

// 检查提及触发
function checkMentionTrigger(value, cursor) {
  const textBeforeCursor = value.substring(0, cursor)
  
  // 查找最近的前缀
  let lastPrefixIndex = -1
  let matchedPrefix = ''
  
  for (const prefix of prefixArray.value) {
    const index = textBeforeCursor.lastIndexOf(prefix)
    if (index > lastPrefixIndex) {
      lastPrefixIndex = index
      matchedPrefix = prefix
    }
  }
  
  if (lastPrefixIndex >= 0) {
    // 检查前缀后是否有分隔符
    const textAfterPrefix = textBeforeCursor.substring(lastPrefixIndex + matchedPrefix.length)
    const splitIndex = textAfterPrefix.indexOf(props.split)
    
    if (splitIndex === -1) {
      // 没有分隔符，显示提及面板
      currentPrefix.value = matchedPrefix
      currentPattern.value = textAfterPrefix
      showDropdown()
      
      // 触发搜索事件
      emit('search', currentPattern.value, currentPrefix.value)
    } else {
      hideDropdown()
    }
  } else {
    hideDropdown()
  }
}

// 显示下拉面板
function showDropdown() {
  if (!props.disabled) {
    dropdownVisible.value = true
    activeIndex.value = -1
  }
}

// 隐藏下拉面板
function hideDropdown() {
  dropdownVisible.value = false
  activeIndex.value = -1
  currentPrefix.value = ''
  currentPattern.value = ''
}

// 选择选项
function selectOption(option, index) {
  if (option.disabled) return
  
  const value = props.modelValue
  const cursor = cursorPosition.value
  const textBeforeCursor = value.substring(0, cursor)
  const textAfterCursor = value.substring(cursor)
  
  // 查找前缀位置
  const prefixIndex = textBeforeCursor.lastIndexOf(currentPrefix.value)
  
  if (prefixIndex >= 0) {
    // 替换文本
    const beforePrefix = value.substring(0, prefixIndex)
    const mentionText = currentPrefix.value + option.value + props.split
    const newValue = beforePrefix + mentionText + textAfterCursor
    
    emit('update:modelValue', newValue)
    emit('select', option, currentPrefix.value)
    
    hideDropdown()
    
    // 设置光标位置
    nextTick(() => {
      const newCursor = beforePrefix.length + mentionText.length
      cursorPosition.value = newCursor
    })
  }
}

// 焦点事件
function onFocus(e) {
  isFocused.value = true
  emit('focus', e)
}

// 失焦事件
function onBlur(e) {
  isFocused.value = false
  // 延迟隐藏下拉面板，允许点击选项
  setTimeout(() => {
    hideDropdown()
  }, 200)
  emit('blur', e)
}

// 确认事件
function onConfirm(e) {
  emit('confirm', e)
}

// 清空事件
function onClear() {
  emit('update:modelValue', '')
  emit('clear')
  hideDropdown()
}

// 行数变化事件（仅textarea）
function onLineChange(e) {
  emit('linechange', e)
}

// 键盘高度变化事件
function onKeyboardHeightChange(e) {
  emit('keyboardheightchange', e)
}

// 监听选项变化
watch(() => props.options, () => {
  if (dropdownVisible.value) {
    activeIndex.value = -1
  }
})

// 监听加载状态
watch(() => props.loading, (loading) => {
  if (!loading && dropdownVisible.value) {
    activeIndex.value = -1
  }
})

// 暴露组件实例方法
defineExpose({
  focus() {
    const el = props.type === 'textarea' ? textareaRef.value : inputRef.value
    if (el) {
      el.focus()
    }
  },
  blur() {
    const el = props.type === 'textarea' ? textareaRef.value : inputRef.value
    if (el) {
      el.blur()
    }
  },
  clear() {
    onClear()
  },
  hideDropdown() {
    hideDropdown()
  },
  showDropdown() {
    showDropdown()
  }
})
</script>

<style scoped>
.zx-mention-container {
  position: relative;
  width: 100%;
}

.zx-mention-input,
.zx-mention-textarea {
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;
  outline: none;
}

.zx-mention-input:disabled,
.zx-mention-textarea:disabled {
  background-color: #f5f7fa;
  color: #c0c4cc;
  cursor: not-allowed;
}

.zx-mention-clear {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40rpx;
  height: 40rpx;
  background-color: #c0c4cc;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
}

.zx-mention-clear:hover {
  background-color: #909399;
}

.zx-mention-clear-icon {
  color: #ffffff;
  font-size: 24rpx;
  font-weight: bold;
}

.zx-mention-dropdown {
  position: absolute;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
  z-index: 1000;
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
  transition: all 0.2s ease;
}

.zx-mention-dropdown-bottom {
  top: 100%;
  margin-top: 8rpx;
}

.zx-mention-dropdown-top {
  bottom: 100%;
  margin-bottom: 8rpx;
  transform-origin: center bottom;
}

.zx-mention-dropdown-visible {
  opacity: 1;
  transform: scaleY(1);
}

.zx-mention-loading {
  padding: 24rpx;
  text-align: center;
}

.zx-mention-loading-text {
  color: #909399;
  font-size: 28rpx;
}

.zx-mention-dropdown-header,
.zx-mention-dropdown-footer {
  padding: 16rpx 20rpx;
  border-bottom: 1rpx solid #e4e7ed;
}

.zx-mention-dropdown-footer {
  border-bottom: none;
  border-top: 1rpx solid #e4e7ed;
}

.zx-mention-options {
  max-height: 400rpx;
}

.zx-mention-option {
  padding: 20rpx;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1rpx solid #f5f7fa;
}

.zx-mention-option:last-child {
  border-bottom: none;
}

.zx-mention-option:hover {
  background-color: #f5f7fa;
}

.zx-mention-option-active {
  background-color: #ecf5ff;
  color: #409eff;
}

.zx-mention-option-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-color: transparent;
}

.zx-mention-option-disabled:hover {
  background-color: transparent;
}

.zx-mention-option-text {
  font-size: 28rpx;
  line-height: 1.5;
}

.zx-mention-empty {
  padding: 40rpx 20rpx;
  text-align: center;
}

.zx-mention-empty-text {
  color: #909399;
  font-size: 28rpx;
}

/* 尺寸样式 */
.zx-mention-small .zx-mention-option {
  padding: 16rpx 20rpx;
}

.zx-mention-small .zx-mention-option-text {
  font-size: 26rpx;
}

.zx-mention-large .zx-mention-option {
  padding: 24rpx 20rpx;
}

.zx-mention-large .zx-mention-option-text {
  font-size: 32rpx;
}
</style>
