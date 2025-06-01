<template>
  <view class="zx-lottoroll" :style="containerStyle">
    <!-- 老虎机滚轮容器 -->
    <view class="zx-lottoroll__container">
      <view 
        v-for="(item, index) in prizeList" 
        :key="index"
        class="zx-lottoroll__item"
        :class="{ 'zx-lottoroll__item--active': currentIndex === index }"
        :style="getItemStyle(index)"
      >
        <image 
          v-if="item.imagePath" 
          :src="item.imagePath" 
          class="zx-lottoroll__image"
          mode="aspectFit"
        />
        <view v-if="item.text" class="zx-lottoroll__text">{{ item.text }}</view>
      </view>
    </view>
    
    <!-- 指示器 -->
    <view class="zx-lottoroll__indicator" :style="indicatorStyle"></view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// 组件名称
defineOptions({
  name: 'zx-lottoroll'
})

// Props定义
const props = defineProps({
  // 奖品列表
  prizeList: {
    type: Array,
    default: () => []
  },
  // 中奖奖品索引 (-1为随机，>=0为指定索引)
  prizeIndex: {
    type: Number,
    default: -1
  },
  // 转动圈数
  turnsNumber: {
    type: Number,
    default: 3
  },
  // 转动时间(毫秒)
  turnsTime: {
    type: Number,
    default: 3000
  },
  // 容器高度
  height: {
    type: String,
    default: '200px'
  },
  // 容器宽度
  width: {
    type: String,
    default: '100px'
  },
  // 奖品项高度
  itemHeight: {
    type: String,
    default: '60px'
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 边框颜色
  borderColor: {
    type: String,
    default: '#e5e5e5'
  },
  // 指示器颜色
  indicatorColor: {
    type: String,
    default: '#ff6b6b'
  }
})

// Emits定义
const emit = defineEmits(['start-turns', 'end-turns'])

// 响应式数据
const isRolling = ref(false)
const currentIndex = ref(0)
const translateY = ref(0)
const animationDuration = ref(0)

// 计算属性
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  backgroundColor: props.backgroundColor,
  border: `1px solid ${props.borderColor}`
}))

const indicatorStyle = computed(() => ({
  borderTopColor: props.indicatorColor,
  borderBottomColor: props.indicatorColor
}))

// 获取奖品项样式
const getItemStyle = (index) => {
  const itemHeightNum = parseInt(props.itemHeight)
  const transform = `translateY(${translateY.value}px)`
  
  return {
    height: props.itemHeight,
    transform,
    transition: animationDuration.value > 0 ? `transform ${animationDuration.value}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none'
  }
}

// 开始转动
const start = () => {
  if (isRolling.value || props.prizeList.length === 0) return
  
  isRolling.value = true
  emit('start-turns')
  
  // 计算目标索引
  let targetIndex = props.prizeIndex
  if (targetIndex < 0 || targetIndex >= props.prizeList.length) {
    targetIndex = Math.floor(Math.random() * props.prizeList.length)
  }
  
  // 计算转动距离
  const itemHeightNum = parseInt(props.itemHeight)
  const containerHeightNum = parseInt(props.height)
  const visibleItems = Math.floor(containerHeightNum / itemHeightNum)
  const centerOffset = Math.floor(visibleItems / 2)
  
  // 计算总转动距离：基础圈数 + 目标位置
  const totalItems = props.prizeList.length
  const baseDistance = props.turnsNumber * totalItems * itemHeightNum
  const targetDistance = (targetIndex + centerOffset) * itemHeightNum
  const finalDistance = baseDistance + targetDistance
  
  // 设置动画
  animationDuration.value = props.turnsTime
  translateY.value = -finalDistance
  
  // 动画结束后的处理
  setTimeout(() => {
    currentIndex.value = targetIndex
    isRolling.value = false
    animationDuration.value = 0
    
    // 重置位置到目标位置（无动画）
    nextTick(() => {
      translateY.value = -(targetIndex + centerOffset) * itemHeightNum
      emit('end-turns')
    })
  }, props.turnsTime)
}

// 重置
const reset = () => {
  if (isRolling.value) return
  
  isRolling.value = false
  currentIndex.value = 0
  translateY.value = 0
  animationDuration.value = 0
}

// 暴露方法
defineExpose({
  start,
  reset
})
</script>

<style lang="scss" scoped>
.zx-lottoroll {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  
  &__container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    &--active {
      background-color: rgba(255, 107, 107, 0.1);
    }
  }
  
  &__image {
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
  }
  
  &__text {
    font-size: 12px;
    color: #333;
    text-align: center;
    line-height: 1.2;
  }
  
  &__indicator {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 12px solid #ff6b6b;
    transform: translateY(-50%);
    z-index: 10;
    
    &::after {
      content: '';
      position: absolute;
      top: -8px;
      right: -12px;
      height: 0;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 12px solid #ff6b6b;
    }
  }
}
</style>