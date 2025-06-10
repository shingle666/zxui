<template>
  <view class="zx-scratchcard" :style="containerStyle">
    <!-- 内容层 -->
    <view class="zx-scratchcard__content" :style="contentStyle">
      <zx-html :style="textStyle" :content="content"></zx-html>
    </view>

    <!-- 刮刮层 -->
    <canvas v-if="!isScratched" class="zx-scratchcard__canvas" :canvas-id="canvasId" :id="canvasId" :style="canvasStyle"
      @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
      @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" disable-scroll></canvas>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, getCurrentInstance } from 'vue'
import zxHtml from '@tanzhenxing/zx-html/zx-html.vue'

// 组件名称
defineOptions({
  name: 'zx-scratchcard'
})

// Props定义
const props = defineProps({
  // 奖项信息，支持html
  content: {
    type: String,
    default: ''
  },
  // 卡片高度
  height: {
    type: String,
    default: '50px'
  },
  // 卡片宽度
  width: {
    type: String,
    default: '300px'
  },
  // 刮开层颜色
  coverColor: {
    type: String,
    default: '#C5C5C5'
  },
  // 刮开层图片（设置此项后coverColor失效）
  coverImg: {
    type: String,
    default: ''
  },
  // 中奖信息字号
  fontSize: {
    type: String,
    default: '20px'
  },
  // 内容层背景颜色
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  // 触发事件的刮开比例（0-1之间）
  ratio: {
    type: Number,
    default: 0.8
  },
  // 刮刮层文字
  coverText: {
    type: String,
    default: '刮一刮'
  },
  // 刮刮层文字颜色
  coverTextColor: {
    type: String,
    default: '#FFFFFF'
  },
  // 刮刮层文字大小
  coverTextSize: {
    type: String,
    default: '16px'
  }
})

// 事件定义
const emit = defineEmits(['open'])

// 响应式数据
const canvasId = ref(`scratchcard_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
const isScratched = ref(false)
const isDrawing = ref(false)
const ctx = ref(null)
const canvasWidth = ref(0)
const canvasHeight = ref(0)
const scratchedPixels = ref(0)
const totalPixels = ref(0)

// 获取当前实例
const instance = getCurrentInstance()

// 计算属性
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  position: 'relative',
  overflow: 'hidden'
}))

const contentStyle = computed(() => ({
  width: '100%',
  height: '100%',
  backgroundColor: props.backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '0',
  left: '0'
}))

const textStyle = computed(() => ({
  fontSize: props.fontSize,
  textAlign: 'center',
  userSelect: 'none'
}))

const canvasStyle = computed(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1'
}))

// 初始化canvas
const initCanvas = () => {
  // #ifdef H5
  const canvas = document.getElementById(canvasId.value)
  if (!canvas) {
    console.warn('Canvas element not found, retrying...')
    setTimeout(() => {
      initCanvas()
    }, 50)
    return
  }

  // 确保canvas元素是HTMLCanvasElement
  if (!(canvas instanceof HTMLCanvasElement)) {
    console.error('Element is not a canvas element')
    return
  }

  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) {
    console.warn('Canvas size is 0, retrying...')
    setTimeout(() => {
      initCanvas()
    }, 50)
    return
  }

  canvasWidth.value = rect.width
  canvasHeight.value = rect.height

  canvas.width = canvasWidth.value * 2 // 高清适配
  canvas.height = canvasHeight.value * 2

  ctx.value = canvas.getContext('2d')
  if (!ctx.value) {
    console.error('Failed to get 2d context')
    return
  }
  ctx.value.scale(2, 2)
  drawCover()
  // #endif

  // #ifndef H5
  const query = uni.createSelectorQuery().in(instance)
  query.select(`#${canvasId.value}`).boundingClientRect(rect => {
    if (!rect) return

    canvasWidth.value = rect.width
    canvasHeight.value = rect.height

    ctx.value = uni.createCanvasContext(canvasId.value, instance)
    drawCover()
  }).exec()
  // #endif
}

// 绘制刮刮层
const drawCover = () => {
  if (!ctx.value) return

  // 绘制背景
  if (props.coverImg) {
    // 如果有图片，绘制图片
    // #ifdef H5
    const img = new Image()
    img.onload = () => {
      ctx.value.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value)
      drawCoverText()
    }
    img.src = props.coverImg
    // #endif

    // #ifndef H5
    ctx.value.drawImage(props.coverImg, 0, 0, canvasWidth.value, canvasHeight.value)
    drawCoverText()
    // #endif
  } else {
    // 绘制纯色背景
    ctx.value.fillStyle = props.coverColor
    ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value)
    drawCoverText()
  }
}

// 绘制刮刮层文字
const drawCoverText = () => {
  if (!ctx.value || !props.coverText) return

  ctx.value.fillStyle = props.coverTextColor
  ctx.value.font = `${parseInt(props.coverTextSize)}px Arial`
  ctx.value.textAlign = 'center'
  ctx.value.textBaseline = 'middle'
  ctx.value.fillText(
    props.coverText,
    canvasWidth.value / 2,
    canvasHeight.value / 2
  )

  // #ifndef H5
  ctx.value.draw()
  // #endif

  // 计算总像素数
  totalPixels.value = canvasWidth.value * canvasHeight.value
}

// 刮除指定区域
const scratch = (x, y) => {
  if (!ctx.value) return

  const radius = 20 // 刮除半径

  // #ifdef H5
  ctx.value.globalCompositeOperation = 'destination-out'
  ctx.value.beginPath()
  ctx.value.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.value.fill()
  // #endif

  // #ifndef H5
  ctx.value.globalCompositeOperation = 'destination-out'
  ctx.value.beginPath()
  ctx.value.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.value.fill()
  ctx.value.draw(true)
  // #endif

  // 计算刮除面积
  scratchedPixels.value += Math.PI * radius * radius

  // 检查是否达到刮开比例
  if (scratchedPixels.value / totalPixels.value >= props.ratio) {
    handleScratchComplete()
  }
}

// 刮开完成处理
const handleScratchComplete = () => {
  isScratched.value = true
  emit('open')
}

// 触摸事件处理
const handleTouchStart = (e) => {
  isDrawing.value = true
  const touch = e.touches[0]
  const rect = e.currentTarget.getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top
  scratch(x, y)
}

const handleTouchMove = (e) => {
  if (!isDrawing.value) return
  e.preventDefault()

  const touch = e.touches[0]
  const rect = e.currentTarget.getBoundingClientRect()
  const x = touch.clientX - rect.left
  const y = touch.clientY - rect.top
  scratch(x, y)
}

const handleTouchEnd = () => {
  isDrawing.value = false
}

// 鼠标事件处理（H5）
const handleMouseDown = (e) => {
  // #ifdef H5
  isDrawing.value = true
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  scratch(x, y)
  // #endif
}

const handleMouseMove = (e) => {
  // #ifdef H5
  if (!isDrawing.value) return
  e.preventDefault()

  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  scratch(x, y)
  // #endif
}

const handleMouseUp = () => {
  // #ifdef H5
  isDrawing.value = false
  // #endif
}

// 重置刮刮卡
const reset = () => {
  isScratched.value = false
  scratchedPixels.value = 0
  nextTick(() => {
    setTimeout(() => {
      initCanvas()
    }, 100)
  })
}

// 暴露方法
defineExpose({
  reset
})

// 生命周期
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      initCanvas()
    }, 200)
  })
})
</script>

<style lang="scss" scoped>
.zx-scratchcard {
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  &__content {
    background: #fff;
    border-radius: 8px;
  }

  &__text {
    padding: 10px;
    word-break: break-all;
  }

  &__canvas {
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>