<template>
  <div
    :class="[
      'zx-input-tag',
      `zx-input-tag--${size}`,
      {
        'zx-input-tag--disabled': disabled,
        'zx-input-tag--readonly': readonly,
        'zx-input-tag--focus': focused
      }
    ]"
    @click="focusInput"
  >
    <!-- 前缀插槽 -->
    <div v-if="$slots.prefix" class="zx-input-tag__prefix">
      <slot name="prefix" />
    </div>

    <!-- 标签容器 -->
    <div class="zx-input-tag__tags" ref="tagsContainer">
      <div
        v-for="(tag, index) in modelValue"
        :key="`tag-${index}`"
        :class="[
          'zx-input-tag__tag',
          `zx-input-tag__tag--${tagType}`,
          `zx-input-tag__tag--${tagEffect}`,
          {
            'zx-input-tag__tag--dragging': dragging === index
          }
        ]"
        :draggable="draggable && !disabled && !readonly"
        @dragstart="handleDragStart(index, $event)"
        @dragover.prevent
        @drop="handleDrop(index, $event)"
        @dragend="handleDragEnd"
      >
        <slot name="tag" :value="tag" :index="index">
          <span class="zx-input-tag__tag-text">{{ tag }}</span>
        </slot>
        <span
          v-if="!disabled && !readonly"
          class="zx-input-tag__tag-close"
          @click.stop="removeTag(index)"
        >
          ×
        </span>
      </div>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        v-model="inputValue"
        :class="['zx-input-tag__input']"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="shouldShowPlaceholder ? placeholder : ''"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autocomplete"
        :aria-label="ariaLabel"
        :id="id"
        :tabindex="tabindex"
        :autofocus="autofocus"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      />
    </div>

    <!-- 后缀插槽和清除按钮 -->
    <div v-if="$slots.suffix || showClearButton" class="zx-input-tag__suffix">
      <span
        v-if="showClearButton"
        class="zx-input-tag__clear"
        @click="handleClear"
      >
        ×
      </span>
      <slot name="suffix" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxInputTag'
})

// 定义 props
const props = defineProps({
  // 绑定值
  modelValue: {
    type: Array,
    default: () => []
  },
  // 最大标签数
  max: {
    type: Number,
    default: undefined
  },
  // 标签类型
  tagType: {
    type: String,
    default: 'info',
    validator: (value) => ['primary', 'success', 'info', 'warning', 'danger'].includes(value)
  },
  // 标签效果
  tagEffect: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'plain'].includes(value)
  },
  // 触发添加标签的按键
  trigger: {
    type: String,
    default: 'Enter',
    validator: (value) => ['Enter', 'Space', 'Tab'].includes(value)
  },
  // 是否可拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  // 分隔符
  delimiter: {
    type: [String, RegExp],
    default: undefined
  },
  // 尺寸
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['large', 'default', 'small'].includes(value)
  },
  // 失去焦点时是否保存输入值
  saveOnBlur: {
    type: Boolean,
    default: true
  },
  // 是否可清空
  clearable: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  // 是否触发表单验证
  validateEvent: {
    type: Boolean,
    default: true
  },
  // 自动获取焦点
  autofocus: {
    type: Boolean,
    default: false
  },
  // input id
  id: {
    type: String,
    default: undefined
  },
  // tabindex
  tabindex: {
    type: [String, Number],
    default: undefined
  },
  // 最大长度
  maxlength: {
    type: [String, Number],
    default: undefined
  },
  // 最小长度
  minlength: {
    type: [String, Number],
    default: undefined
  },
  // 占位符
  placeholder: {
    type: String,
    default: ''
  },
  // 自动补全
  autocomplete: {
    type: String,
    default: 'off'
  },
  // aria-label
  ariaLabel: {
    type: String,
    default: undefined
  }
})

// 定义 emits
const emit = defineEmits([
  'update:modelValue',
  'change',
  'input',
  'add-tag',
  'remove-tag',
  'focus',
  'blur',
  'clear'
])

// 响应式数据
const inputRef = ref(null)
const tagsContainer = ref(null)
const inputValue = ref('')
const focused = ref(false)
const isComposing = ref(false)
const dragging = ref(null)

// 计算属性
const shouldShowPlaceholder = computed(() => {
  return props.modelValue.length === 0 && !inputValue.value
})

const showClearButton = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && props.modelValue.length > 0
})

const canAddTag = computed(() => {
  return !props.max || props.modelValue.length < props.max
})

// 添加标签
const addTag = (value) => {
  if (!value || !value.trim()) return
  
  const trimmedValue = value.trim()
  if (props.modelValue.includes(trimmedValue)) return
  if (!canAddTag.value) return

  const newTags = [...props.modelValue, trimmedValue]
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('add-tag', trimmedValue)
  inputValue.value = ''
}

// 移除标签
const removeTag = (index) => {
  if (props.disabled || props.readonly) return
  
  const removedTag = props.modelValue[index]
  const newTags = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newTags)
  emit('change', newTags)
  emit('remove-tag', removedTag)
}

// 处理输入
const handleInput = (event) => {
  const value = event.target.value
  inputValue.value = value
  emit('input', value)
  
  // 检查分隔符
  if (props.delimiter && !isComposing.value) {
    checkDelimiter(value)
  }
}

// 检查分隔符
const checkDelimiter = (value) => {
  let delimiter = props.delimiter
  if (typeof delimiter === 'string') {
    delimiter = new RegExp(delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  }
  
  if (delimiter.test(value)) {
    const parts = value.split(delimiter)
    if (parts.length > 1) {
      const tagValue = parts[0]
      if (tagValue.trim()) {
        addTag(tagValue)
      }
    }
  }
}

// 处理按键
const handleKeydown = (event) => {
  if (isComposing.value) return
  
  const { key } = event
  
  // 触发添加标签
  if (key === props.trigger) {
    event.preventDefault()
    if (inputValue.value.trim()) {
      addTag(inputValue.value)
    }
    return
  }
  
  // 退格删除最后一个标签
  if (key === 'Backspace' && !inputValue.value && props.modelValue.length > 0) {
    removeTag(props.modelValue.length - 1)
    return
  }
}

// 处理焦点
const handleFocus = (event) => {
  focused.value = true
  emit('focus', event)
}

// 处理失去焦点
const handleBlur = (event) => {
  focused.value = false
  
  if (props.saveOnBlur && inputValue.value.trim()) {
    addTag(inputValue.value)
  }
  
  emit('blur', event)
}

// 处理中文输入法
const handleCompositionStart = () => {
  isComposing.value = true
}

const handleCompositionEnd = () => {
  isComposing.value = false
}

// 处理清空
const handleClear = () => {
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
  inputValue.value = ''
  focusInput()
}

// 聚焦输入框
const focusInput = () => {
  if (!props.disabled && !props.readonly) {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
}

// 拖拽处理
const handleDragStart = (index, event) => {
  if (!props.draggable || props.disabled || props.readonly) return
  
  dragging.value = index
  event.dataTransfer.setData('text/plain', index.toString())
}

const handleDrop = (targetIndex, event) => {
  event.preventDefault()
  const sourceIndex = parseInt(event.dataTransfer.getData('text/plain'))
  
  if (sourceIndex === targetIndex) return
  
  const newTags = [...props.modelValue]
  const draggedTag = newTags.splice(sourceIndex, 1)[0]
  newTags.splice(targetIndex, 0, draggedTag)
  
  emit('update:modelValue', newTags)
  emit('change', newTags)
}

const handleDragEnd = () => {
  dragging.value = null
}

// 暴露给父组件的方法
defineExpose({
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  }
})
</script>

<style scoped>
.zx-input-tag {
  display: inline-flex;
  align-items: center;
  width: 100%;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.2s ease-in-out;
  cursor: text;
}

.zx-input-tag:hover {
  border-color: #c0c4cc;
}

.zx-input-tag--focus {
  border-color: #409eff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.zx-input-tag--disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.zx-input-tag--readonly {
  cursor: default;
}

/* 尺寸变量 */
.zx-input-tag--large {
  min-height: 40px;
  padding: 6px 12px;
}

.zx-input-tag--small {
  min-height: 24px;
  padding: 2px 6px;
}

.zx-input-tag__prefix,
.zx-input-tag__suffix {
  display: flex;
  align-items: center;
  color: #909399;
  flex-shrink: 0;
}

.zx-input-tag__prefix {
  margin-right: 8px;
}

.zx-input-tag__suffix {
  margin-left: 8px;
}

.zx-input-tag__tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 4px;
  min-width: 0;
}

.zx-input-tag__tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 12px;
  line-height: 1.2;
  white-space: nowrap;
  cursor: default;
  max-width: 200px;
}

.zx-input-tag__tag[draggable="true"] {
  cursor: move;
}

.zx-input-tag__tag--dragging {
  opacity: 0.6;
}

.zx-input-tag__tag-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.zx-input-tag__tag-close {
  margin-left: 4px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.zx-input-tag__tag-close:hover {
  opacity: 1;
}

/* 标签类型样式 */
.zx-input-tag__tag--primary.zx-input-tag__tag--light {
  background-color: #ecf5ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
}

.zx-input-tag__tag--success.zx-input-tag__tag--light {
  background-color: #f0f9ff;
  border: 1px solid #b3e19d;
  color: #67c23a;
}

.zx-input-tag__tag--info.zx-input-tag__tag--light {
  background-color: #f4f4f5;
  border: 1px solid #d3d4d6;
  color: #909399;
}

.zx-input-tag__tag--warning.zx-input-tag__tag--light {
  background-color: #fdf6ec;
  border: 1px solid #f5dab1;
  color: #e6a23c;
}

.zx-input-tag__tag--danger.zx-input-tag__tag--light {
  background-color: #fef0f0;
  border: 1px solid #fbc4c4;
  color: #f56c6c;
}

.zx-input-tag__tag--primary.zx-input-tag__tag--dark {
  background-color: #409eff;
  border: 1px solid #409eff;
  color: #fff;
}

.zx-input-tag__tag--success.zx-input-tag__tag--dark {
  background-color: #67c23a;
  border: 1px solid #67c23a;
  color: #fff;
}

.zx-input-tag__tag--info.zx-input-tag__tag--dark {
  background-color: #909399;
  border: 1px solid #909399;
  color: #fff;
}

.zx-input-tag__tag--warning.zx-input-tag__tag--dark {
  background-color: #e6a23c;
  border: 1px solid #e6a23c;
  color: #fff;
}

.zx-input-tag__tag--danger.zx-input-tag__tag--dark {
  background-color: #f56c6c;
  border: 1px solid #f56c6c;
  color: #fff;
}

.zx-input-tag__tag--primary.zx-input-tag__tag--plain {
  background-color: transparent;
  border: 1px solid #409eff;
  color: #409eff;
}

.zx-input-tag__tag--success.zx-input-tag__tag--plain {
  background-color: transparent;
  border: 1px solid #67c23a;
  color: #67c23a;
}

.zx-input-tag__tag--info.zx-input-tag__tag--plain {
  background-color: transparent;
  border: 1px solid #909399;
  color: #909399;
}

.zx-input-tag__tag--warning.zx-input-tag__tag--plain {
  background-color: transparent;
  border: 1px solid #e6a23c;
  color: #e6a23c;
}

.zx-input-tag__tag--danger.zx-input-tag__tag--plain {
  background-color: transparent;
  border: 1px solid #f56c6c;
  color: #f56c6c;
}

.zx-input-tag__input {
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: inherit;
  flex-grow: 1;
  min-width: 80px;
  height: 22px;
}

.zx-input-tag__input::placeholder {
  color: #c0c4cc;
}

.zx-input-tag__input:disabled {
  cursor: not-allowed;
}

.zx-input-tag__clear {
  cursor: pointer;
  font-size: 16px;
  color: #c0c4cc;
  transition: color 0.2s;
}

.zx-input-tag__clear:hover {
  color: #909399;
}

/* 禁用状态下的标签 */
.zx-input-tag--disabled .zx-input-tag__tag {
  opacity: 0.6;
}

.zx-input-tag--disabled .zx-input-tag__tag-close {
  display: none;
}

/* 只读状态下的标签 */
.zx-input-tag--readonly .zx-input-tag__tag-close {
  display: none;
}
</style>
