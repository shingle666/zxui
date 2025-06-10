<template>
  <view ref="scrollbarRef" :class="scrollbarClass" :style="scrollbarStyle">
    <scroll-view v-if="!native" ref="wrapRef" :class="wrapClass" :style="wrapStyle" :scroll-top="currentScrollTop"
      :scroll-left="currentScrollLeft" :scroll-y="enableScrollY" :scroll-x="enableScrollX" :enable-flex="true"
      :enhanced="true" :bounces="false" :show-scrollbar="false" @scroll="handleScroll">
      <view ref="viewRef" :class="viewClass" :style="viewStyle">
        <slot />
      </view>
    </scroll-view>

    <view v-else ref="wrapRef" :class="wrapClass" :style="wrapStyle">
      <view ref="viewRef" :class="viewClass" :style="viewStyle">
        <slot />
      </view>
    </view>

    <!-- 垂直滚动条 -->
    <view v-show="!native && (always || showVerticalScrollbar)" ref="verticalRef"
      :class="['zx-scrollbar__bar', 'is-vertical']" @touchstart="onVerticalTouchStart" @touchmove="onVerticalTouchMove"
      @touchend="onTouchEnd">
      <view :class="['zx-scrollbar__thumb']" :style="verticalThumbStyle" />
    </view>

    <!-- 水平滚动条 -->
    <view v-show="!native && (always || showHorizontalScrollbar)" ref="horizontalRef"
      :class="['zx-scrollbar__bar', 'is-horizontal']" @touchstart="onHorizontalTouchStart"
      @touchmove="onHorizontalTouchMove" @touchend="onTouchEnd">
      <view :class="['zx-scrollbar__thumb']" :style="horizontalThumbStyle" />
    </view>
  </view>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  defineEmits,
  defineExpose
} from 'vue'

// Props 定义
const props = defineProps({
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: [String, Object],
    default: ''
  },
  wrapClass: {
    type: String,
    default: ''
  },
  viewStyle: {
    type: [String, Object],
    default: ''
  },
  viewClass: {
    type: String,
    default: ''
  },
  noresize: {
    type: Boolean,
    default: false
  },
  always: {
    type: Boolean,
    default: false
  },
  minSize: {
    type: Number,
    default: 20
  },
  scrollX: {
    type: Boolean,
    default: true
  },
  scrollY: {
    type: Boolean,
    default: true
  }
})

// Emits 定义
const emit = defineEmits(['scroll'])

// 响应式数据
const scrollbarRef = ref()
const wrapRef = ref()
const viewRef = ref()
const verticalRef = ref()
const horizontalRef = ref()

const scrollTop = ref(0)
const scrollLeft = ref(0)
const scrollHeight = ref(0)
const scrollWidth = ref(0)
const clientHeight = ref(0)
const clientWidth = ref(0)

const currentScrollTop = ref(0)
const currentScrollLeft = ref(0)

const isDragging = ref(false)
const dragDirection = ref('')
const dragStartY = ref(0)
const dragStartX = ref(0)
const dragStartScrollTop = ref(0)
const dragStartScrollLeft = ref(0)
const scrollbarVisible = ref(false)

// 计算属性
const scrollbarClass = computed(() => [
  'zx-scrollbar',
  {
    'zx-scrollbar--native': props.native
  }
])

const scrollbarStyle = computed(() => {
  const style = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  if (props.maxHeight) {
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  }
  return style
})

const wrapClass = computed(() => [
  'zx-scrollbar__wrap',
  props.wrapClass,
  {
    'zx-scrollbar__wrap--native': props.native
  }
])

const wrapStyle = computed(() => {
  const style = {}
  if (props.height || props.maxHeight) {
    style.height = '100%'
  }

  // 合并用户自定义样式
  if (typeof props.wrapStyle === 'string') {
    Object.assign(style, parseStyleString(props.wrapStyle))
  } else if (typeof props.wrapStyle === 'object') {
    Object.assign(style, props.wrapStyle)
  }

  return style
})

const viewClass = computed(() => [
  'zx-scrollbar__view',
  props.viewClass
])

const viewStyle = computed(() => {
  let style = {}

  if (typeof props.viewStyle === 'string') {
    style = parseStyleString(props.viewStyle)
  } else if (typeof props.viewStyle === 'object') {
    style = { ...props.viewStyle }
  }

  return style
})

const enableScrollY = computed(() => props.scrollY)
const enableScrollX = computed(() => props.scrollX)

// 垂直滚动条显示状态
const showVerticalScrollbar = computed(() => {
  return scrollHeight.value > clientHeight.value && props.scrollY
})

// 水平滚动条显示状态  
const showHorizontalScrollbar = computed(() => {
  return scrollWidth.value > clientWidth.value && props.scrollX
})

// 垂直滚动条样式
const verticalThumbStyle = computed(() => {
  if (!showVerticalScrollbar.value) return {}

  const heightPercentage = (clientHeight.value * 100) / scrollHeight.value
  const thumbHeight = Math.max(heightPercentage, props.minSize)
  const trackHeight = clientHeight.value - thumbHeight
  const thumbTop = scrollHeight.value > clientHeight.value ?
    (scrollTop.value / (scrollHeight.value - clientHeight.value)) * trackHeight : 0

  return {
    height: `${thumbHeight}px`,
    transform: `translateY(${thumbTop}px)`
  }
})

// 水平滚动条样式
const horizontalThumbStyle = computed(() => {
  if (!showHorizontalScrollbar.value) return {}

  const widthPercentage = (clientWidth.value * 100) / scrollWidth.value
  const thumbWidth = Math.max(widthPercentage, props.minSize)
  const trackWidth = clientWidth.value - thumbWidth
  const thumbLeft = scrollWidth.value > clientWidth.value ?
    (scrollLeft.value / (scrollWidth.value - clientWidth.value)) * trackWidth : 0

  return {
    width: `${thumbWidth}px`,
    transform: `translateX(${thumbLeft}px)`
  }
})

// 方法
const parseStyleString = (styleStr) => {
  const style = {}
  if (styleStr) {
    styleStr.split(';').forEach(item => {
      const [key, value] = item.split(':')
      if (key && value) {
        const camelKey = key.trim().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
        style[camelKey] = value.trim()
      }
    })
  }
  return style
}

const updateScrollInfo = () => {
  if (!wrapRef.value) return

  // 使用 uni.createSelectorQuery 获取节点信息
  nextTick(() => {
    const query = uni.createSelectorQuery().in(wrapRef.value)
    query.select('.zx-scrollbar__wrap').boundingClientRect()
    query.select('.zx-scrollbar__view').boundingClientRect()
    query.exec((res) => {
      if (res && res[0] && res[1]) {
        clientHeight.value = res[0].height || 0
        clientWidth.value = res[0].width || 0
        scrollHeight.value = res[1].height || 0
        scrollWidth.value = res[1].width || 0
      }
    })
  })
}

const handleScroll = (e) => {
  const { scrollTop: st, scrollLeft: sl, scrollHeight: sh, scrollWidth: sw } = e.detail

  scrollTop.value = st
  scrollLeft.value = sl

  if (sh) scrollHeight.value = sh
  if (sw) scrollWidth.value = sw

  // 显示滚动条
  scrollbarVisible.value = true

  emit('scroll', {
    scrollTop: scrollTop.value,
    scrollLeft: scrollLeft.value,
    scrollHeight: scrollHeight.value,
    scrollWidth: scrollWidth.value
  })

  // 隐藏滚动条
  setTimeout(() => {
    if (!isDragging.value) {
      scrollbarVisible.value = false
    }
  }, 1000)
}

const scrollTo = (options) => {
  if (typeof options === 'number') {
    setScrollTop(options)
  } else if (typeof options === 'object') {
    const { top, left } = options
    if (top !== undefined) setScrollTop(top)
    if (left !== undefined) setScrollLeft(left)
  }
}

const setScrollTop = (value) => {
  currentScrollTop.value = Math.max(0, Math.min(value, scrollHeight.value - clientHeight.value))
  scrollTop.value = currentScrollTop.value
}

const setScrollLeft = (value) => {
  currentScrollLeft.value = Math.max(0, Math.min(value, scrollWidth.value - clientWidth.value))
  scrollLeft.value = currentScrollLeft.value
}

const update = () => {
  nextTick(() => {
    updateScrollInfo()
  })
}

// 触摸事件处理
const onVerticalTouchStart = (e) => {
  e.preventDefault()
  startDrag('vertical', e.touches[0].clientY)
}

const onHorizontalTouchStart = (e) => {
  e.preventDefault()
  startDrag('horizontal', e.touches[0].clientX)
}

const onVerticalTouchMove = (e) => {
  if (!isDragging.value || dragDirection.value !== 'vertical') return
  e.preventDefault()
  onTouchMove(e)
}

const onHorizontalTouchMove = (e) => {
  if (!isDragging.value || dragDirection.value !== 'horizontal') return
  e.preventDefault()
  onTouchMove(e)
}

const startDrag = (direction, startPosition) => {
  isDragging.value = true
  dragDirection.value = direction
  scrollbarVisible.value = true

  if (direction === 'vertical') {
    dragStartY.value = startPosition
    dragStartScrollTop.value = scrollTop.value
  } else {
    dragStartX.value = startPosition
    dragStartScrollLeft.value = scrollLeft.value
  }
}

const onTouchMove = (e) => {
  if (!isDragging.value) return

  if (dragDirection.value === 'vertical') {
    const deltaY = e.touches[0].clientY - dragStartY.value
    const thumbHeight = parseFloat(verticalThumbStyle.value.height) || 20
    const trackHeight = clientHeight.value - thumbHeight
    const scrollDelta = trackHeight > 0 ? (deltaY / trackHeight) * (scrollHeight.value - clientHeight.value) : 0
    setScrollTop(dragStartScrollTop.value + scrollDelta)
  } else {
    const deltaX = e.touches[0].clientX - dragStartX.value
    const thumbWidth = parseFloat(horizontalThumbStyle.value.width) || 20
    const trackWidth = clientWidth.value - thumbWidth
    const scrollDelta = trackWidth > 0 ? (deltaX / trackWidth) * (scrollWidth.value - clientWidth.value) : 0
    setScrollLeft(dragStartScrollLeft.value + scrollDelta)
  }
}

const onTouchEnd = () => {
  isDragging.value = false
  dragDirection.value = ''

  setTimeout(() => {
    if (!isDragging.value) {
      scrollbarVisible.value = false
    }
  }, 1000)
}

// 监听器
watch(() => [props.height, props.maxHeight], () => {
  update()
}, { flush: 'post' })

// 生命周期
onMounted(() => {
  nextTick(() => {
    updateScrollInfo()
  })
})

onBeforeUnmount(() => {
  // 清理工作
})

// 暴露的方法和属性
defineExpose({
  scrollTo,
  setScrollTop,
  setScrollLeft,
  update,
  handleScroll,
  wrapRef
})
</script>

<style scoped>
.zx-scrollbar {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.zx-scrollbar__wrap {
  height: 100%;
  overflow: hidden;
}

.zx-scrollbar__wrap--native {
  overflow: auto;
}

.zx-scrollbar__view {
  display: block;
}

.zx-scrollbar__bar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.12s ease-out;
  cursor: pointer;
}

.zx-scrollbar:hover .zx-scrollbar__bar,
.zx-scrollbar__bar.is-dragging {
  opacity: 1;
}

.zx-scrollbar__bar.is-vertical {
  width: 6px;
  top: 2px;
}

.zx-scrollbar__bar.is-horizontal {
  height: 6px;
  left: 2px;
}

.zx-scrollbar__thumb {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: inherit;
  background-color: rgba(144, 147, 153, 0.3);
  transition: background-color 0.3s;
}

.zx-scrollbar__thumb:hover {
  background-color: rgba(144, 147, 153, 0.5);
}

.zx-scrollbar--native .zx-scrollbar__bar {
  display: none;
}

/* uni-app 特定样式 */
.zx-scrollbar scroll-view {
  height: 100%;
}

/* 小程序兼容 */
/* #ifdef MP */
.zx-scrollbar__bar {
  pointer-events: auto;
}

/* #endif */

/* H5 兼容 */
/* #ifdef H5 */
.zx-scrollbar__bar:hover {
  opacity: 1;
}

/* #endif */
</style>
