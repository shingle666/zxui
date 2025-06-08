<template>
  <view 
    class="zx-shakedice" 
    :style="{
      width: width,
      height: height
    }"
  >
    <!-- 骰子容器 -->
    <view class="dice-container">
      <!-- 骰子 -->
      <view 
        class="dice" 
        :class="{
          'dice-shaking': isShaking,
          'dice-rolling': isRolling
        }"
        :style="{
          transform: diceTransform
        }"
      >
        <!-- 骰子六个面 -->
        <view class="dice-face dice-face-1">
          <view class="dot"></view>
        </view>
        <view class="dice-face dice-face-2">
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
        <view class="dice-face dice-face-3">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
        <view class="dice-face dice-face-4">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
        <view class="dice-face dice-face-5">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
        <view class="dice-face dice-face-6">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>
    </view>
    
    <!-- 结果显示 -->
    <view v-if="showResult && result > 0" class="result-display">
      <text class="result-text">{{ result }}</text>
    </view>
    
    <!-- 摇动按钮 -->
    <view 
      v-if="showButton"
      class="shake-button"
      :class="{ 'button-disabled': isShaking || isRolling }"
      @click="shake"
    >
      <text class="button-text">{{ buttonText }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 定义 props
const props = defineProps({
  // 容器宽度
  width: {
    type: String,
    default: '300px'
  },
  // 容器高度
  height: {
    type: String,
    default: '400px'
  },
  // 指定结果 (1-6，-1表示随机)
  id: {
    type: Number,
    default: -1
  },
  // 摇动时间 (毫秒)
  time: {
    type: [String, Number],
    default: 3000
  },
  // 旋转速度 (几秒一圈)
  speed: {
    type: Number,
    default: 1
  },
  // 是否显示结果
  showResult: {
    type: Boolean,
    default: true
  },
  // 是否显示摇动按钮
  showButton: {
    type: Boolean,
    default: true
  },
  // 按钮文字
  buttonText: {
    type: String,
    default: '摇动'
  },
  // 骰子大小
  diceSize: {
    type: String,
    default: '80px'
  },
  // 骰子颜色
  diceColor: {
    type: String,
    default: '#ffffff'
  },
  // 点的颜色
  dotColor: {
    type: String,
    default: '#333333'
  }
})

// 定义 emits
const emit = defineEmits(['shake', 'end'])

// 响应式数据
const isShaking = ref(false)
const isRolling = ref(false)
const result = ref(0)
const currentRotateX = ref(0)
const currentRotateY = ref(0)
const shakeTimer = ref(null)
const rollTimer = ref(null)

// 骰子变换样式
const diceTransform = computed(() => {
  if (isShaking.value) {
    return `rotateX(${currentRotateX.value}deg) rotateY(${currentRotateY.value}deg)`
  }
  
  if (result.value > 0) {
    // 根据结果显示对应的面
    const transforms = {
      1: 'rotateX(0deg) rotateY(0deg)',
      2: 'rotateX(0deg) rotateY(-90deg)',
      3: 'rotateX(-90deg) rotateY(0deg)',
      4: 'rotateX(90deg) rotateY(0deg)',
      5: 'rotateX(0deg) rotateY(90deg)',
      6: 'rotateX(180deg) rotateY(0deg)'
    }
    return transforms[result.value] || 'rotateX(0deg) rotateY(0deg)'
  }
  
  return 'rotateX(0deg) rotateY(0deg)'
})

// 生成随机角度
const getRandomAngle = () => {
  return Math.floor(Math.random() * 360)
}

// 摇动动画
const startShakeAnimation = () => {
  const animate = () => {
    if (!isShaking.value) return
    
    currentRotateX.value = getRandomAngle()
    currentRotateY.value = getRandomAngle()
    
    shakeTimer.value = setTimeout(animate, 50)
  }
  
  animate()
}

// 停止摇动动画
const stopShakeAnimation = () => {
  if (shakeTimer.value) {
    clearTimeout(shakeTimer.value)
    shakeTimer.value = null
  }
}

// 滚动到指定面
const rollToResult = (targetResult) => {
  isRolling.value = true
  
  // 计算需要的旋转角度
  const finalTransforms = {
    1: { x: 0, y: 0 },
    2: { x: 0, y: -90 },
    3: { x: -90, y: 0 },
    4: { x: 90, y: 0 },
    5: { x: 0, y: 90 },
    6: { x: 180, y: 0 }
  }
  
  const target = finalTransforms[targetResult]
  if (!target) return
  
  // 添加额外的旋转圈数使动画更自然
  const extraRotations = 3
  currentRotateX.value = target.x + (extraRotations * 360)
  currentRotateY.value = target.y + (extraRotations * 360)
  
  // 设置结果
  result.value = targetResult
  
  // 动画结束后重置状态
  rollTimer.value = setTimeout(() => {
    isRolling.value = false
    emit('end', targetResult)
  }, 1000)
}

// 摇动骰子
const shake = () => {
  if (isShaking.value || isRolling.value) return
  
  // 重置结果
  result.value = 0
  
  // 开始摇动
  isShaking.value = true
  emit('shake')
  
  // 开始摇动动画
  startShakeAnimation()
  
  // 摇动指定时间后停止
  const shakeTime = typeof props.time === 'string' ? parseInt(props.time) : props.time
  
  setTimeout(() => {
    // 停止摇动
    isShaking.value = false
    stopShakeAnimation()
    
    // 确定结果
    const finalResult = props.id > 0 && props.id <= 6 ? props.id : Math.floor(Math.random() * 6) + 1
    
    // 滚动到结果
    setTimeout(() => {
      rollToResult(finalResult)
    }, 100)
  }, shakeTime)
}

// 暴露方法给父组件
defineExpose({
  shake,
  reset: () => {
    isShaking.value = false
    isRolling.value = false
    result.value = 0
    stopShakeAnimation()
    if (rollTimer.value) {
      clearTimeout(rollTimer.value)
      rollTimer.value = null
    }
  }
})

// 生命周期
onBeforeUnmount(() => {
  stopShakeAnimation()
  if (rollTimer.value) {
    clearTimeout(rollTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.zx-shakedice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  
  .dice-container {
    perspective: 1000px;
    margin-bottom: 40px;
  }
  
  .dice {
    position: relative;
    width: v-bind(diceSize);
    height: v-bind(diceSize);
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
    
    &.dice-shaking {
      animation: shake 0.1s infinite;
    }
    
    &.dice-rolling {
      transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
  }
  
  .dice-face {
    position: absolute;
    width: 100%;
    height: 100%;
    background: v-bind(diceColor);
    border: 2px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    .dot {
      width: 12px;
      height: 12px;
      background: v-bind(dotColor);
      border-radius: 50%;
      margin: 2px;
    }
  }
  
  // 骰子六个面的位置
  .dice-face-1 {
    transform: rotateY(0deg) translateZ(calc(v-bind(diceSize) / 2));
  }
  
  .dice-face-2 {
    transform: rotateY(90deg) translateZ(calc(v-bind(diceSize) / 2));
    
    .dot:nth-child(1) {
      align-self: flex-start;
    }
    
    .dot:nth-child(2) {
      align-self: flex-end;
    }
  }
  
  .dice-face-3 {
    transform: rotateX(90deg) translateZ(calc(v-bind(diceSize) / 2));
    
    .dot:nth-child(1) {
      align-self: flex-start;
    }
    
    .dot:nth-child(2) {
      align-self: center;
    }
    
    .dot:nth-child(3) {
      align-self: flex-end;
    }
  }
  
  .dice-face-4 {
    transform: rotateX(-90deg) translateZ(calc(v-bind(diceSize) / 2));
    
    .dot:nth-child(1),
    .dot:nth-child(2) {
      align-self: flex-start;
    }
    
    .dot:nth-child(3),
    .dot:nth-child(4) {
      align-self: flex-end;
    }
  }
  
  .dice-face-5 {
    transform: rotateY(-90deg) translateZ(calc(v-bind(diceSize) / 2));
    
    .dot:nth-child(1),
    .dot:nth-child(2) {
      align-self: flex-start;
    }
    
    .dot:nth-child(3) {
      align-self: center;
    }
    
    .dot:nth-child(4),
    .dot:nth-child(5) {
      align-self: flex-end;
    }
  }
  
  .dice-face-6 {
    transform: rotateY(180deg) translateZ(calc(v-bind(diceSize) / 2));
    
    .dot:nth-child(1),
    .dot:nth-child(2) {
      align-self: flex-start;
    }
    
    .dot:nth-child(3),
    .dot:nth-child(4) {
      align-self: center;
    }
    
    .dot:nth-child(5),
    .dot:nth-child(6) {
      align-self: flex-end;
    }
  }
  
  .result-display {
    margin-bottom: 20px;
    
    .result-text {
      font-size: 32px;
      font-weight: bold;
      color: #ff6b35;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
  
  .shake-button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
    transition: all 0.3s ease;
    
    &:active {
      transform: translateY(2px);
      box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
    }
    
    &.button-disabled {
      opacity: 0.6;
      pointer-events: none;
    }
    
    .button-text {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }
  }
  
  @keyframes shake {
    0%, 100% {
      transform: translateX(0) translateY(0) rotateZ(0deg);
    }
    25% {
      transform: translateX(-2px) translateY(-2px) rotateZ(-1deg);
    }
    50% {
      transform: translateX(2px) translateY(-2px) rotateZ(1deg);
    }
    75% {
      transform: translateX(-2px) translateY(2px) rotateZ(-1deg);
    }
  }
}
</style>