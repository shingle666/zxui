<template>
  <view v-if="modelValue" class="zx-tour">
    <!-- 遮罩层 -->
    <view
      v-if="currentStepConf && currentStepConf.mask !== false"
      class="zx-tour-mask"
      :style="maskStyle"
      @tap.stop.prevent
    ></view>
    <!-- 引导内容浮层 -->
    <view
      v-if="currentStepConf"
      class="zx-tour-popup"
      :style="popupStyle"
    >
      <view class="zx-tour-header">
        <text class="zx-tour-title">{{ currentStepConf.title }}</text>
        <text v-if="showClose" class="zx-tour-close" @tap="close">×</text>
      </view>
      <view class="zx-tour-desc">
        <slot name="desc" :step="currentStepConf">
          {{ currentStepConf.description }}
        </slot>
      </view>
      <view class="zx-tour-footer">
        <button v-if="current > 0" @tap="prev">上一步</button>
        <button v-if="!isLastStep" @tap="next">下一步</button>
        <button v-else @tap="finish">完成</button>
      </view>
      <view class="zx-tour-indicator">
        <text>{{ current + 1 }}/{{ steps.length }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick,getCurrentInstance,onMounted } from 'vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  modelValue: Boolean, // 控制引导显示
  steps: {
    type: Array,
    required: true,
    // [{ selector: '#id', title: '', description: '', mask: true/false, placement: 'bottom/top/left/right/center' }]
  },
  current: {
    type: Number,
    default: 0,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  maskStyle: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue', 'close', 'finish', 'change'])

const current = ref(props.current)
const popupPos = ref({ top: 0, left: 0, width: 0, height: 0 })
const maskRect = ref({ top: 0, left: 0, width: 0, height: 0 })

const isLastStep = computed(() => current.value === props.steps.length - 1)
const currentStepConf = computed(() => props.steps[current.value] || null)

// 遮罩样式
const maskStyle = computed(() => {
  if (!maskRect.value.width) return {}
  return {
    position: 'fixed',
    top: maskRect.value.top + 'px',
    left: maskRect.value.left + 'px',
    width: maskRect.value.width + 'px',
    height: maskRect.value.height + 'px',
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '8px',
    ...props.maskStyle,
    ...(currentStepConf.value && currentStepConf.value.maskStyle || {}),
    zIndex: 9999,
  }
})

// 浮层样式
const popupStyle = computed(() => {
  if (!popupPos.value.width) return { position: 'fixed', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 10000 }
  return {
    position: 'fixed',
    top: popupPos.value.top + 'px',
    left: popupPos.value.left + 'px',
    zIndex: 10000,
    minWidth: '200px',
    maxWidth: '80vw',
  }
})

function updateStepRect() {
  const step = currentStepConf.value
  if (!step) return
  if (!step.selector) {
    // 居中
    popupPos.value = { top: uni.upx2px(400), left: uni.upx2px(375), width: 0, height: 0 }
    maskRect.value = { top: 0, left: 0, width: 0, height: 0 }
    return
  }
  // 跨端 selector 查询
  uni.createSelectorQuery()
    .in(proxy)
    .select(step.selector)
    .boundingClientRect(rect => {
      if (rect) {
        // 遮罩区域
        maskRect.value = {
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        }
        // 浮层位置
        let top = rect.top + rect.height + 8
        let left = rect.left
        if (step.placement === 'top') top = rect.top - 60
        if (step.placement === 'left') left = rect.left - 220
        if (step.placement === 'right') left = rect.left + rect.width + 8
        if (step.placement === 'center') {
          top = uni.upx2px(400)
          left = uni.upx2px(375)
        }
        popupPos.value = { top, left, width: rect.width, height: rect.height }
      } else {
        // 未找到目标，居中
        popupPos.value = { top: uni.upx2px(400), left: uni.upx2px(375), width: 0, height: 0 }
        maskRect.value = { top: 0, left: 0, width: 0, height: 0 }
      }
    })
    .exec()
}

function next() {
  if (current.value < props.steps.length - 1) {
    current.value++
    emit('change', current.value)
    nextTick(updateStepRect)
  }
}
function prev() {
  if (current.value > 0) {
    current.value--
    emit('change', current.value)
    nextTick(updateStepRect)
  }
}
function close() {
  emit('update:modelValue', false)
  emit('close')
}
function finish() {
  emit('update:modelValue', false)
  emit('finish')
}

watch(() => props.modelValue, val => {
  if (val) {
    nextTick(updateStepRect)
  }
})
watch(current, () => {
  nextTick(updateStepRect)
})

onMounted(() => {
  if (props.modelValue) updateStepRect()
})

</script>

<style scoped>
.zx-tour {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
}
.zx-tour-mask {
  position: fixed;
  background: rgba(0,0,0,0.5);
  pointer-events: auto;
  transition: all 0.2s;
}
.zx-tour-popup {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  padding: 16px;
  min-width: 200px;
  max-width: 80vw;
}
.zx-tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.zx-tour-title {
  font-weight: bold;
  font-size: 16px;
}
.zx-tour-close {
  font-size: 20px;
  cursor: pointer;
}
.zx-tour-desc {
  margin-bottom: 12px;
  color: #666;
}
.zx-tour-footer {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.zx-tour-indicator {
  text-align: right;
  color: #999;
  font-size: 12px;
}
</style>
