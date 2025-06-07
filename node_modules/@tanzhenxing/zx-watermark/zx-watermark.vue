<template>
  <view 
    ref="watermarkRef" 
    class="zx-watermark"
    :class="{
      'zx-watermark--full-page': fullPage,
      'zx-watermark--fallback': fallbackMode
    }"
    :style="wrapperStyle"
  >
    <view class="zx-watermark__content">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// 定义属性及默认值
const props = defineProps({
  // 水印的宽度
  width: {
    type: Number,
    default: 120
  },
  // 水印的高度  
  height: {
    type: Number,
    default: 64
  },
  // 水印的旋转角度，单位 °
  rotate: {
    type: Number,
    default: -22
  },
  // 水印元素的z-index值
  zIndex: {
    type: Number,
    default: 2000
  },
  // 水印图片，建议使用 2x 或 3x 图像
  image: {
    type: String,
    default: ''
  },
  // 图片宽度
  imageWidth: {
    type: Number,
    default: 120
  },
  // 图片高度
  imageHeight: {
    type: Number,
    default: 64
  },
  // 水印文本内容
  content: {
    type: [String, Array],
    default: 'zxui'
  },
  // 水印文字颜色
  fontColor: {
    type: String,
    default: 'rgba(0,0,0,.15)'
  },
  // 水印文字大小
  fontSize: {
    type: [String, Number],
    default: 16
  },
  // 水印文字字体
  fontFamily: {
    type: String,
    default: 'PingFang SC'
  },
  // 水印文字粗细
  fontWeight: {
    type: String,
    default: 'normal'
  },
  // 水印文字样式
  fontStyle: {
    type: String,
    default: 'normal'
  },
  // 水印之间的水平间距
  gapX: {
    type: Number,
    default: 24
  },
  // 水印之间的垂直间距
  gapY: {
    type: Number,
    default: 48
  },
  // 是否覆盖整个页面
  fullPage: {
    type: Boolean,
    default: false
  },

  // 水印从容器左上角的偏移
  offset: {
    type: Array,
    default: () => [],
    validator: (value) => Array.isArray(value) && (value.length === 0 || value.length === 2)
  }
})

// 响应式数据
const watermarkRef = ref(null)
const base64Url = ref('')

const fallbackMode = ref(false) // 是否使用回退模式
const isH5 = ref(false)

// 计算属性
const mergedFont = computed(() => ({
  color: props.fontColor,
  fontSize: Number(props.fontSize),
  fontWeight: props.fontWeight,
  fontFamily: props.fontFamily,
  fontStyle: props.fontStyle,
  textAlign: 'center',
  textBaseline: 'middle'
}))

const mergedOffset = computed(() => {
  if (props.offset.length === 2) {
    return props.offset
  }
  return [props.gapX / 2, props.gapY / 2]
})

const wrapperStyle = computed(() => {
  const baseStyle = {
    zIndex: props.zIndex
  }
  
  if (fallbackMode.value) {
    // CSS 回退模式
    return {
      ...baseStyle,
      position: props.fullPage ? 'fixed' : 'relative',
      '--watermark-content': `"${Array.isArray(props.content) ? props.content.join(' ') : props.content}"`,
      '--watermark-color': mergedFont.value.color,
      '--watermark-size': `${mergedFont.value.fontSize}px`,
      '--watermark-rotate': `${props.rotate}deg`,
      '--watermark-gap-x': `${props.gapX}px`,
      '--watermark-gap-y': `${props.gapY}px`
    }
  }
  
  return {
    ...baseStyle,
    position: props.fullPage ? 'fixed' : 'relative',
    backgroundImage: base64Url.value ? `url(${base64Url.value})` : 'none',
    backgroundRepeat: 'repeat',
    backgroundPosition: `${mergedOffset.value[0]}px ${mergedOffset.value[1]}px`,
    backgroundSize: `${props.gapX + props.width}px ${props.gapY + props.height}px`
  }
})

// 生成水印图片
const generateWatermark = () => {
  // #ifdef H5
  generateWatermarkH5()
  // #endif
  
  // #ifndef H5
  generateWatermarkUni()
  // #endif
}

// H5环境下生成水印
const generateWatermarkH5 = () => {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      console.warn('ZxWatermark: Canvas context not available, using CSS fallback mode')
      fallbackMode.value = true
      return
    }

    fallbackMode.value = false
    const ratio = window.devicePixelRatio || 1

    const canvasWidth = (props.gapX + props.width) * ratio
    const canvasHeight = (props.gapY + props.height) * ratio
    const markWidth = props.width * ratio
    const markHeight = props.height * ratio

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = `${props.gapX + props.width}px`
    canvas.style.height = `${props.gapY + props.height}px`

    if (props.image) {
      // 图片水印
      const img = new Image()
      dealWithImage(ctx, img, ratio, canvas, markWidth, markHeight)
    } else if (props.content) {
      // 文本水印
      dealWithText(ctx, ratio, canvas, markWidth, markHeight)
    }
  } catch (error) {
    console.error('ZxWatermark: Error generating watermark, using CSS fallback mode:', error)
    fallbackMode.value = true
  }
}

// uniapp环境下生成水印
const generateWatermarkUni = async () => {
  try {
    let ratio = 1
    const systemInfo = await new Promise((resolve) => {
      uni.getSystemInfo({
        success: resolve,
        fail: () => resolve({ pixelRatio: 1 })
      })
    })
    ratio = systemInfo.pixelRatio || 1

    const canvasWidth = (props.gapX + props.width) * ratio
    const canvasHeight = (props.gapY + props.height) * ratio
    const markWidth = props.width * ratio
    const markHeight = props.height * ratio

    const canvas = uni.createOffscreenCanvas({
      type: '2d',
      width: canvasWidth,
      height: canvasHeight
    })

    const ctx = canvas.getContext('2d')

    if (ctx) {
      if (props.image) {
        // 图片水印
        const img = canvas.createImage()
        dealWithImage(ctx, img, ratio, canvas, markWidth, markHeight)
      } else if (props.content) {
        // 文本水印
        dealWithText(ctx, ratio, canvas, markWidth, markHeight)
      }
    } else {
      console.warn('ZxWatermark: Canvas not supported, using CSS fallback mode')
      fallbackMode.value = true
    }
  } catch (error) {
    console.error('ZxWatermark: Error generating watermark, using CSS fallback mode:', error)
    fallbackMode.value = true
  }
}

// 处理图片水印
const dealWithImage = (ctx, img, ratio, canvas, markWidth, markHeight) => {
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * props.rotate)
  img.crossOrigin = 'anonymous'
  img.referrerPolicy = 'no-referrer'
  img.src = props.image
  img.onload = () => {
    try {
      ctx.drawImage(
        img,
        (-props.imageWidth * ratio) / 2,
        (-props.imageHeight * ratio) / 2,
        props.imageWidth * ratio,
        props.imageHeight * ratio
      )
      ctx.restore()
      base64Url.value = canvas.toDataURL()
    } catch (error) {
      console.error('ZxWatermark: Error drawing image:', error)
      fallbackMode.value = true
    }
  }
  img.onerror = () => {
    console.error('ZxWatermark: Failed to load image:', props.image)
    fallbackMode.value = true
  }
}

// 处理文本水印
const dealWithText = (ctx, ratio, canvas, markWidth, markHeight) => {
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.translate(markWidth / 2, markHeight / 2)
  ctx.rotate((Math.PI / 180) * props.rotate)
  
  const markSize = mergedFont.value.fontSize * ratio
  ctx.font = `${mergedFont.value.fontStyle} normal ${mergedFont.value.fontWeight} ${markSize}px/${markHeight}px ${mergedFont.value.fontFamily}`
  ctx.fillStyle = mergedFont.value.color
  
  if (Array.isArray(props.content)) {
    props.content.forEach((item, index) => {
      ctx.fillText(String(item), 0, (index - (props.content.length - 1) / 2) * markSize)
    })
  } else {
    ctx.fillText(String(props.content), 0, 0)
  }
  
  ctx.restore()
  base64Url.value = canvas.toDataURL()
}



// 监听属性变化重新生成水印
watch(
  [
    () => props.width,
    () => props.height,
    () => props.rotate,
    () => props.zIndex,
    () => props.image,
    () => props.imageWidth,
    () => props.imageHeight,
    () => props.content,
    () => props.fontColor,
    () => props.fontSize,
    () => props.fontFamily,
    () => props.fontWeight,
    () => props.fontStyle,
    () => props.gapX,
    () => props.gapY,
    () => props.fullPage,
    () => props.offset
  ],
  () => {
    generateWatermark()
  },
  { deep: true }
)

// 生命周期
onMounted(() => {
  // #ifdef H5
  isH5.value = true
  // #endif
  
  nextTick(() => {
    generateWatermark()
  })
})

onUnmounted(() => {
  // 清理工作
})
</script>

<style lang="scss" scoped>
.zx-watermark {
  position: relative;
  background-repeat: repeat;
  
  &--full-page {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
  
  // CSS 回退模式样式
  &--fallback {
    &::before {
      content: var(--watermark-content, "ZxWatermark");
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: repeating-linear-gradient(
        var(--watermark-rotate, -22deg),
        transparent,
        transparent calc(var(--watermark-gap-y, 48px) - 1px),
        var(--watermark-color, rgba(0, 0, 0, 0.15)) var(--watermark-gap-y, 48px)
      );
      font-size: var(--watermark-size, 16px);
      color: var(--watermark-color, rgba(0, 0, 0, 0.15));
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      pointer-events: none;
      z-index: inherit;
      opacity: 0.6;
      transform: rotate(var(--watermark-rotate, -22deg));
    }
  }
  
  // 内容包装器，确保内容在水印之上
  &__content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    min-height: 200px;
    pointer-events: auto;
  }
}
</style>
