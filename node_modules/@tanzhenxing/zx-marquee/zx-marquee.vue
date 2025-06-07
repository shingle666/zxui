<template>
  <view class="zx-marquee" :style="containerStyle">
    <!-- 背景层 -->
    <view class="zx-marquee__bg" :style="bgStyle"></view>
    
    <!-- 开始按钮 -->
    <view 
      class="zx-marquee__start" 
      :class="{ 'zx-marquee__start--disabled': isRunning }"
      :style="startBtnStyle"
      @click="handleStart"
    >
      <slot name="start">
        <text class="zx-marquee__start-text">{{ startText }}</text>
      </slot>
    </view>
    
    <!-- 奖品列表 -->
    <view class="zx-marquee__prizes">
      <view 
        v-for="(item, index) in prizeList" 
        :key="index"
        class="zx-marquee__prize-item"
        :class="{
          'zx-marquee__prize-item--active': currentIndex === index,
          [`zx-marquee__prize-item--${index + 1}`]: true
        }"
        :style="prizeItemStyle"
      >
        <view class="zx-marquee__prize-img" v-if="item.prizeImg">
          <image :src="item.prizeImg" mode="aspectFit" />
        </view>
        <view class="zx-marquee__prize-name">{{ item.prizeName }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// 组件名称
defineOptions({
  name: 'zx-marquee'
})

// Props定义
const props = defineProps({
  // 奖品列表
  prizeList: {
    type: Array,
    default: () => []
  },
  // 中奖奖品索引
  prizeIndex: {
    type: Number,
    default: -1
  },
  // 转动速度(ms)
  speed: {
    type: Number,
    default: 150
  },
  // 转动圈数
  circle: {
    type: Number,
    default: 30
  },
  // 容器宽度
  width: {
    type: String,
    default: '300px'
  },
  // 容器高度
  height: {
    type: String,
    default: '300px'
  },
  // 开始按钮文字
  startText: {
    type: String,
    default: '开始'
  },
  // 样式配置
  styleOpt: {
    type: Object,
    default: () => ({
      bgStyle: {
        background: 'linear-gradient(45deg, #FFE795, #FFF7DF)'
      },
      prizeItemStyle: {},
      startBtnStyle: {}
    })
  }
})

// 事件定义
const emit = defineEmits(['start-turns', 'end-turns'])

// 响应式数据
const isRunning = ref(false)
const currentIndex = ref(0)
const timer = ref(null)
const cellNumber = ref(0)
const velocity = ref(props.speed)
const totalCircle = ref(props.circle)

// 计算属性
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height
}))

const bgStyle = computed(() => ({
  ...props.styleOpt.bgStyle
}))

const prizeItemStyle = computed(() => ({
  ...props.styleOpt.prizeItemStyle
}))

const startBtnStyle = computed(() => ({
  ...props.styleOpt.startBtnStyle
}))

// 方法
const rollMarquee = () => {
  cellNumber.value += 1
  let idx = currentIndex.value
  const count = 8 // 固定8个位置
  
  idx += 1
  if (idx > count - 1) {
    idx = 0
  }
  currentIndex.value = idx
  
  checkPrize()
}

const checkPrize = () => {
  if (cellNumber.value > totalCircle.value && props.prizeIndex === currentIndex.value) {
    // 停止抽奖
    clearTimeout(timer.value)
    timer.value = null
    cellNumber.value = 0
    velocity.value = props.speed
    totalCircle.value = props.circle
    
    setTimeout(() => {
      currentIndex.value = props.prizeIndex
      emit('end-turns')
      isRunning.value = false
    }, 500)
  } else {
    // 调整速度
    if (cellNumber.value < totalCircle.value) {
      velocity.value -= 4
      if (velocity.value < 50) velocity.value = 50
    } else {
      velocity.value += 20
    }
    
    timer.value = setTimeout(rollMarquee, velocity.value)
  }
}

const handleStart = () => {
  if (isRunning.value) return
  
  isRunning.value = true
  emit('start-turns')
  
  // 延迟开始，等待父组件设置prizeIndex
  nextTick(() => {
    setTimeout(() => {
      rollMarquee()
    }, 100)
  })
}

// 监听prizeIndex变化
watch(() => props.prizeIndex, (newVal) => {
  if (newVal >= 0 && newVal < props.prizeList.length) {
    // prizeIndex已设置，可以开始抽奖逻辑
  }
})

// 组件销毁时清理定时器
const cleanup = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

// 暴露方法给父组件
defineExpose({
  start: handleStart,
  stop: cleanup
})
</script>

<style lang="scss" scoped>
.zx-marquee {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  
  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #FFE795, #FFF7DF);
  }
  
  &__start {
    position: relative;
    z-index: 10;
    width: 75px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    transition: all 0.3s ease;
    
    &:active {
      transform: scale(0.95);
    }
    
    &--disabled {
      opacity: 0.6;
      pointer-events: none;
    }
    
    &-text {
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
  
  &__prizes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  &__prize-item {
    position: absolute;
    width: 75px;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    border: 2px solid transparent;
    transition: all 0.3s ease;
    
    &--active {
      border-color: #FF6B6B;
      background: rgba(255, 107, 107, 0.1);
      transform: scale(1.05);
    }
    
    // 位置定位
    &--1 { top: 25px; left: 15px; }
    &--2 { top: 25px; left: 50%; transform: translateX(-50%); }
    &--3 { top: 25px; right: 15px; }
    &--4 { top: 50%; right: 15px; transform: translateY(-50%); }
    &--5 { bottom: 25px; right: 15px; }
    &--6 { bottom: 25px; left: 50%; transform: translateX(-50%); }
    &--7 { bottom: 25px; left: 15px; }
    &--8 { top: 50%; left: 15px; transform: translateY(-50%); }
    
    // 激活状态的位置调整
    &--1.zx-marquee__prize-item--active { top: 25px; left: 15px; transform: scale(1.05); }
    &--2.zx-marquee__prize-item--active { top: 25px; left: 50%; transform: translateX(-50%) scale(1.05); }
    &--3.zx-marquee__prize-item--active { top: 25px; right: 15px; transform: scale(1.05); }
    &--4.zx-marquee__prize-item--active { top: 50%; right: 15px; transform: translateY(-50%) scale(1.05); }
    &--5.zx-marquee__prize-item--active { bottom: 25px; right: 15px; transform: scale(1.05); }
    &--6.zx-marquee__prize-item--active { bottom: 25px; left: 50%; transform: translateX(-50%) scale(1.05); }
    &--7.zx-marquee__prize-item--active { bottom: 25px; left: 15px; transform: scale(1.05); }
    &--8.zx-marquee__prize-item--active { top: 50%; left: 15px; transform: translateY(-50%) scale(1.05); }
  }
  
  &__prize-img {
    width: 35px;
    height: 35px;
    margin-bottom: 4px;
    
    image {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
  }
  
  &__prize-name {
    font-size: 10px;
    color: #333;
    text-align: center;
    line-height: 1.2;
    max-width: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>