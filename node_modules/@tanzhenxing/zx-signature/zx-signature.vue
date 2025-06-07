<template>
  <view class="zx-signature" :style="customStyle">
    <view class="zx-signature-inner">
      <canvas
        :id="canvasId"
        :canvas-id="canvasId"
        class="zx-signature-canvas"
        :disable-scroll="true"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      />
      <view v-if="!hasDrawn && placeholder" class="zx-signature-placeholder">
        {{ placeholder }}
      </view>
    </view>
    <view class="zx-signature-actions">
      <view class="zx-signature-btn" @click="clear">
        {{ clearText }}
      </view>
      <view class="zx-signature-btn zx-signature-btn--primary" @click="confirm">
        {{ confirmText }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, computed } from 'vue'

// Props 定义
const props = defineProps({
  // 自定义样式
  customStyle: {
    type: [Object, String],
    default: () => ({})
  },
  // 线条宽度
  lineWidth: {
    type: Number,
    default: 3
  },
  // 线条颜色
  strokeStyle: {
    type: String,
    default: '#000000'
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 图片格式
  type: {
    type: String,
    default: 'png'
  },
  // 图片质量 (0-1)
  quality: {
    type: Number,
    default: 1
  },
  // 占位符文本
  placeholder: {
    type: String,
    default: '请在此处签名'
  },
  // 清除按钮文本
  clearText: {
    type: String,
    default: '重签'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits 定义
const emit = defineEmits([
  'start',     // 开始签名
  'signing',   // 签名中
  'end',       // 结束签名
  'confirm',   // 确认签名
  'clear'      // 清除签名
])

// 响应式数据
const instance = getCurrentInstance()
const canvasId = `zx-signature-${Date.now()}`
const hasDrawn = ref(false)
const isDrawing = ref(false)

const canvasState = reactive({
  ctx: null,
  width: 0,
  height: 0
})

const points = ref([])

// 初始化 Canvas
const initCanvas = () => {
  const query = uni.createSelectorQuery().in(instance)
  query.select(`#${canvasId}`)
    .fields({ size: true }, (res) => {
      if (res) {
        canvasState.width = res.width
        canvasState.height = res.height
        canvasState.ctx = uni.createCanvasContext(canvasId, instance)
        
        // 设置画布背景
        canvasState.ctx.setFillStyle(props.backgroundColor)
        canvasState.ctx.fillRect(0, 0, canvasState.width, canvasState.height)
        canvasState.ctx.draw()
      }
    })
    .exec()
}

// 触摸开始
const onTouchStart = (e) => {
  if (props.disabled || !canvasState.ctx) return
  
  e.preventDefault()
  isDrawing.value = true
  
  const touch = e.touches[0]
  const startPoint = {
    x: touch.x,
    y: touch.y
  }
  
  points.value = [startPoint]
  
  // 设置画笔样式
  canvasState.ctx.setLineWidth(props.lineWidth)
  canvasState.ctx.setStrokeStyle(props.strokeStyle)
  canvasState.ctx.setLineCap('round')
  canvasState.ctx.setLineJoin('round')
  canvasState.ctx.beginPath()
  canvasState.ctx.moveTo(startPoint.x, startPoint.y)
  
  emit('start', e)
}

// 触摸移动
const onTouchMove = (e) => {
  if (props.disabled || !isDrawing.value || !canvasState.ctx) return
  
  e.preventDefault()
  hasDrawn.value = true
  
  const touch = e.touches[0]
  const movePoint = {
    x: touch.x,
    y: touch.y
  }
  
  points.value.push(movePoint)
  
  // 绘制线条
  canvasState.ctx.lineTo(movePoint.x, movePoint.y)
  canvasState.ctx.stroke()
  canvasState.ctx.draw(true)
  
  emit('signing', e)
}

// 触摸结束
const onTouchEnd = (e) => {
  if (props.disabled || !canvasState.ctx) return
  
  e.preventDefault()
  isDrawing.value = false
  points.value = []
  
  emit('end', e)
}

// 清除签名
const clear = () => {
  if (props.disabled || !canvasState.ctx) return
  
  hasDrawn.value = false
  canvasState.ctx.clearRect(0, 0, canvasState.width, canvasState.height)
  
  // 重新设置背景
  canvasState.ctx.setFillStyle(props.backgroundColor)
  canvasState.ctx.fillRect(0, 0, canvasState.width, canvasState.height)
  canvasState.ctx.draw()
  
  emit('clear')
}

// 确认签名
const confirm = () => {
  if (props.disabled || !canvasState.ctx) return
  
  if (!hasDrawn.value) {
    uni.showToast({
      title: '请先进行签名',
      icon: 'none'
    })
    return
  }
  
  // 导出图片
  uni.canvasToTempFilePath({
    canvasId: canvasId,
    fileType: props.type,
    quality: props.quality,
    success: (res) => {
      emit('confirm', {
        canvas: canvasState.ctx,
        filePath: res.tempFilePath,
        width: canvasState.width,
        height: canvasState.height
      })
    },
    fail: (err) => {
      console.error('导出签名失败:', err)
      uni.showToast({
        title: '导出签名失败',
        icon: 'none'
      })
    }
  }, instance)
}

// 暴露方法给父组件
defineExpose({
  clear,
  confirm,
  hasDrawn: computed(() => hasDrawn.value)
})

onMounted(() => {
  // 延迟初始化，确保 DOM 渲染完成
  setTimeout(() => {
    initCanvas()
  }, 100)
})
</script>

<style lang="scss" scoped>
.zx-signature {
  width: 100%;
  
  &-inner {
    position: relative;
    width: 100%;
    height: 200px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #ffffff;
    overflow: hidden;
  }
  
  &-canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  &-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #c0c4cc;
    font-size: 14px;
    pointer-events: none;
    z-index: 1;
  }
  
  &-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
  
  &-btn {
    padding: 8px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background-color: #ffffff;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
    
    &:hover {
      background-color: #f5f7fa;
    }
    
    &:active {
      background-color: #e4e7ed;
    }
    
    &--primary {
      background-color: #409eff;
      border-color: #409eff;
      color: #ffffff;
      
      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
      
      &:active {
        background-color: #3a8ee6;
        border-color: #3a8ee6;
      }
    }
  }
}
</style>