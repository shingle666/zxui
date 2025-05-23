<template>
  <div 
    ref="watermarkRef" 
    class="zx-watermark"
    :class="{ 'zx-watermark--fallback': fallbackMode }"
    :style="wrapperStyle"
  >
    <div class="zx-watermark__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxWatermark'
})

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
    default: 9
  },
  // 水印图片，建议使用 2x 或 3x 图像
  image: {
    type: String,
    default: ''
  },
  // 水印文本内容
  content: {
    type: [String, Array],
    default: 'ZxWatermark'
  },
  // 文字样式
  font: {
    type: Object,
    default: () => ({
      color: 'rgba(0,0,0,.15)',
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      textAlign: 'center',
      textBaseline: 'hanging'
    })
  },
  // 水印之间的间距
  gap: {
    type: Array,
    default: () => [100, 100],
    validator: (value) => Array.isArray(value) && value.length === 2
  },
  // 水印从容器左上角的偏移 默认值为 gap/2
  offset: {
    type: Array,
    default: () => [],
    validator: (value) => Array.isArray(value) && (value.length === 0 || value.length === 2)
  }
})

// 响应式数据
const watermarkRef = ref(null)
const base64Url = ref('')
const observer = ref(null)
const fallbackMode = ref(false) // 是否使用回退模式

// 计算属性
const mergedFont = computed(() => ({
  color: 'rgba(0,0,0,.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  fontStyle: 'normal',
  textAlign: 'center',
  textBaseline: 'hanging',
  ...props.font
}))

const mergedOffset = computed(() => {
  if (props.offset.length === 2) {
    return props.offset
  }
  return [props.gap[0] / 2, props.gap[1] / 2]
})

const wrapperStyle = computed(() => {
  if (fallbackMode.value) {
    // CSS 回退模式
    return {
      position: 'relative',
      '--watermark-content': `"${Array.isArray(props.content) ? props.content.join(' ') : props.content}"`,
      '--watermark-color': mergedFont.value.color,
      '--watermark-size': `${mergedFont.value.fontSize}px`,
      '--watermark-rotate': `${props.rotate}deg`,
      '--watermark-gap-x': `${props.gap[0]}px`,
      '--watermark-gap-y': `${props.gap[1]}px`,
      zIndex: props.zIndex
    }
  }
  
  return {
    position: 'relative',
    backgroundImage: base64Url.value ? `url(${base64Url.value})` : 'none',
    backgroundRepeat: 'repeat',
    backgroundPosition: `${mergedOffset.value[0]}px ${mergedOffset.value[1]}px`,
    backgroundSize: `${props.gap[0] + props.width}px ${props.gap[1] + props.height}px`,
    zIndex: props.zIndex
  }
})

// 生成水印图片
const generateWatermark = () => {
  // 检查是否支持 Canvas API
  if (typeof document === 'undefined' || !document.createElement) {
    console.warn('ZxWatermark: Canvas API not supported, using CSS fallback mode')
    fallbackMode.value = true
    return
  }

  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    if (!ctx) {
      console.warn('ZxWatermark: Canvas context not available, using CSS fallback mode')
      fallbackMode.value = true
      return
    }

    fallbackMode.value = false // 确保使用Canvas模式
    const ratio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1

    const canvasWidth = (props.gap[0] + props.width) * ratio
    const canvasHeight = (props.gap[1] + props.height) * ratio

    canvas.width = canvasWidth
    canvas.height = canvasHeight
    canvas.style.width = `${props.gap[0] + props.width}px`
    canvas.style.height = `${props.gap[1] + props.height}px`

    ctx.scale(ratio, ratio)
    ctx.translate(props.width / 2, props.height / 2)
    ctx.rotate((Math.PI / 180) * props.rotate)

    if (props.image) {
      // 图片水印
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        try {
          ctx.drawImage(img, -props.width / 2, -props.height / 2, props.width, props.height)
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
      img.src = props.image
    } else {
      // 文本水印
      const { color, fontSize, fontWeight, fontFamily, fontStyle, textAlign, textBaseline } = mergedFont.value
      
      ctx.fillStyle = color
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
      ctx.textAlign = textAlign
      ctx.textBaseline = textBaseline

      if (Array.isArray(props.content)) {
        // 多行文本
        const lineHeight = fontSize * 1.2
        const totalHeight = props.content.length * lineHeight
        const startY = -totalHeight / 2 + lineHeight / 2

        props.content.forEach((text, index) => {
          ctx.fillText(String(text), 0, startY + index * lineHeight)
        })
      } else {
        // 单行文本
        ctx.fillText(String(props.content), 0, 0)
      }

      base64Url.value = canvas.toDataURL()
    }
  } catch (error) {
    console.error('ZxWatermark: Error generating watermark, using CSS fallback mode:', error)
    fallbackMode.value = true
  }
}

// 防止水印被删除的观察器
const createMutationObserver = () => {
  if (!watermarkRef.value || typeof MutationObserver === 'undefined') {
    return
  }

  try {
    observer.value = new MutationObserver(() => {
      nextTick(() => {
        generateWatermark()
      })
    })

    observer.value.observe(watermarkRef.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true
    })
  } catch (error) {
    console.error('ZxWatermark: Error creating MutationObserver:', error)
  }
}

// 监听属性变化重新生成水印
watch(
  [
    () => props.width,
    () => props.height,
    () => props.rotate,
    () => props.image,
    () => props.content,
    () => props.font,
    () => props.gap,
    () => props.offset
  ],
  () => {
    generateWatermark()
  },
  { deep: true }
)

// 生命周期
onMounted(() => {
  nextTick(() => {
    generateWatermark()
    createMutationObserver()
  })
})

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect()
  }
})
</script>

<style lang="scss" scoped>
.zx-watermark {
  width: 100%;
  height: 100%;
  min-height: 200px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: inherit;
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
        transparent calc(var(--watermark-gap-y, 100px) - 1px),
        var(--watermark-color, rgba(0, 0, 0, 0.15)) var(--watermark-gap-y, 100px)
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
  }
}
</style>
