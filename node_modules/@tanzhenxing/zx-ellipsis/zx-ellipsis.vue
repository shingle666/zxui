<template>
  <view class="zx-ellipsis" :class="classNames" :style="containerStyle" @click="handleClick">
    <!-- 单行省略 -->
    <text v-if="rows === 1" class="zx-ellipsis__text zx-ellipsis__text--single" :style="textStyle">
      {{ displayContent }}
    </text>

    <!-- 多行省略 -->
    <view v-else class="zx-ellipsis__multiline" :style="multilineStyle">
      <text class="zx-ellipsis__text zx-ellipsis__text--multiline" :style="textStyle">
        {{ displayContent }}
      </text>

      <!-- 展开/收起按钮 -->
      <text v-if="showToggle && (expandText || collapseText)" class="zx-ellipsis__toggle" :style="toggleStyle"
        @click.stop="handleToggle">
        {{ isExpanded ? collapseText : expandText }}
      </text>
    </view>
  </view>
</template>

<script setup>
/**
 * Ellipsis 文本省略
 * @description 展示空间不足时，隐去部分内容并用"…"替代
 * @tutorial https://zxui.org/component/ellipsis
 * @property {String}  content        文本内容
 * @property {String}  direction      省略位置，可选值 start | end | middle，默认end
 * @property {Number}  rows           展示几行，默认1
 * @property {String}  expandText     展开操作的文案，默认''
 * @property {String}  collapseText   收起操作的文案，默认''
 * @property {String}  symbol         省略的符号，默认...
 * @property {String|Number} lineHeight 容器的行高，默认20
 * @property {String}  fontSize       字体大小，默认14px
 * @property {String}  textColor      文字颜色，默认#333333
 * @property {String}  toggleColor    展开收起按钮颜色，默认#3460fa
 * @property {Object}  customStyle    自定义样式
 * @event {Function}   click          文本点击时触发
 * @event {Function}   change         点击展开收起时触发，参数为 expand 或 collapse
 * @example <zx-ellipsis content="这是一段很长的文本内容" :rows="2" />
 */
import { computed, ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  // 文本内容
  content: {
    type: String,
    default: ''
  },
  // 省略位置
  direction: {
    type: String,
    default: 'end',
    validator: (value) => ['start', 'end', 'middle'].includes(value)
  },
  // 展示几行
  rows: {
    type: Number,
    default: 1
  },
  // 展开操作的文案
  expandText: {
    type: String,
    default: ''
  },
  // 收起操作的文案
  collapseText: {
    type: String,
    default: ''
  },
  // 省略的符号
  symbol: {
    type: String,
    default: '...'
  },
  // 容器的行高
  lineHeight: {
    type: [String, Number],
    default: 20
  },
  // 字体大小
  fontSize: {
    type: String,
    default: '14px'
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#333333'
  },
  // 展开收起按钮颜色
  toggleColor: {
    type: String,
    default: '#3460fa'
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click', 'change'])

// 响应式数据
const isExpanded = ref(false)
const needEllipsis = ref(false)

// 计算属性
const classNames = computed(() => {
  return [
    'zx-ellipsis',
    `zx-ellipsis--${props.direction}`,
    {
      'zx-ellipsis--expanded': isExpanded.value,
      'zx-ellipsis--multiline': props.rows > 1
    }
  ]
})

const containerStyle = computed(() => {
  return {
    ...props.customStyle
  }
})

const textStyle = computed(() => {
  const style = {
    fontSize: props.fontSize,
    color: props.textColor,
    lineHeight: typeof props.lineHeight === 'number' ? `${props.lineHeight}px` : props.lineHeight
  }

  if (props.rows === 1) {
    // 单行省略样式
    style.overflow = 'hidden'
    style.textOverflow = 'ellipsis'
    style.whiteSpace = 'nowrap'
    style.display = 'block'
  }

  return style
})

const multilineStyle = computed(() => {
  if (props.rows === 1) return {}

  const style = {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical'
  }

  if (!isExpanded.value) {
    style['-webkit-line-clamp'] = props.rows
  }

  return style
})

const toggleStyle = computed(() => {
  return {
    color: props.toggleColor,
    fontSize: props.fontSize,
    marginLeft: '4px',
    cursor: 'pointer'
  }
})

const showToggle = computed(() => {
  return props.rows > 1 && needEllipsis.value
})

const displayContent = computed(() => {
  if (!props.content) return ''

  // 单行省略直接返回内容，由CSS处理
  if (props.rows === 1) {
    return getEllipsisText(props.content)
  }

  // 多行省略
  if (isExpanded.value) {
    return props.content
  }

  return props.content
})

// 方法
function getEllipsisText(text) {
  if (!text || props.rows !== 1) return text

  // 简单的文本截断逻辑，实际项目中可能需要更复杂的计算
  const maxLength = 50 // 可以根据实际需要调整

  if (text.length <= maxLength) {
    return text
  }

  switch (props.direction) {
    case 'start':
      return props.symbol + text.slice(-(maxLength - props.symbol.length))
    case 'middle':
      const halfLength = Math.floor((maxLength - props.symbol.length) / 2)
      return text.slice(0, halfLength) + props.symbol + text.slice(-halfLength)
    case 'end':
    default:
      return text.slice(0, maxLength - props.symbol.length) + props.symbol
  }
}

function handleClick() {
  emit('click')
}

function handleToggle() {
  isExpanded.value = !isExpanded.value
  emit('change', isExpanded.value ? 'expand' : 'collapse')
}

// 初始化时检查是否需要省略
function checkNeedEllipsis() {
  // 简单判断，实际项目中可能需要更精确的计算
  if (props.content && props.content.length > 50) {
    needEllipsis.value = true
  }
}

// 组件挂载后检查
proxy.$nextTick(() => {
  checkNeedEllipsis()
})
</script>

<style lang="scss" scoped>
.zx-ellipsis {
  word-wrap: break-word;
  word-break: break-all;

  &__text {
    &--single {
      width: 100%;
    }

    &--multiline {
      width: 100%;
    }
  }

  &__multiline {
    position: relative;
  }

  &__toggle {
    display: inline;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>