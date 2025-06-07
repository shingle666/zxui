<template>
  <view 
    class="zx-giftrain" 
    :style="{
      width: width,
      height: height,
      background: backgroundColor
    }"
    @click="handleClick"
  >
    <view class="zx-giftrain-content" ref="rainContainer">
      <!-- 红包雨容器 -->
      <view 
        v-for="(item, index) in rainItems" 
        :key="index"
        class="zx-giftrain-item"
        :style="{
          left: item.left + 'px',
          top: item.top + 'px',
          width: rainWidth + 'px',
          height: rainHeight + 'px',
          transform: `rotate(${item.rotation}deg)`,
          opacity: item.opacity
        }"
        @click.stop="handleItemClick(item, index)"
      >
        <image 
          :src="rainImg" 
          mode="aspectFit"
          class="zx-giftrain-img"
        />
      </view>
    </view>
    
    <!-- 插槽内容 -->
    <slot></slot>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 定义 props
const props = defineProps({
  // 容器宽度
  width: {
    type: String,
    default: '375px'
  },
  // 容器高度
  height: {
    type: String,
    default: '500px'
  },
  // 持续时间(毫秒)
  rainTime: {
    type: [String, Number],
    default: 30000
  },
  // 一页最多展示多少红包
  rainNum: {
    type: [String, Number],
    default: 5
  },
  // 红包图片
  rainImg: {
    type: String,
    default: 'https://img13.360buyimg.com/imagetools/jfs/t1/199416/7/16633/40527/618c8bebEb03467d8/6af8bde529c5cf61.png'
  },
  // 红包宽度
  rainWidth: {
    type: Number,
    default: 50
  },
  // 红包高度
  rainHeight: {
    type: Number,
    default: 50
  },
  // 背景颜色
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 红包下落速度(px/ms)
  fallSpeed: {
    type: Number,
    default: 0.1
  },
  // 红包生成间隔(毫秒)
  generateInterval: {
    type: Number,
    default: 800
  }
})

// 定义 emits
const emit = defineEmits(['start', 'gameOver', 'click', 'containerClick'])

// 响应式数据
const rainItems = ref([]) // 红包数组
const isRaining = ref(false) // 是否正在下雨
const animationTimer = ref(null) // 动画定时器
const generateTimer = ref(null) // 生成定时器
const gameTimer = ref(null) // 游戏定时器
const containerWidth = ref(375) // 容器实际宽度
const containerHeight = ref(500) // 容器实际高度
const clickedCount = ref(0) // 点击计数

// 初始化容器尺寸
const initContainer = () => {
  // 解析宽高
  containerWidth.value = parseSize(props.width)
  containerHeight.value = parseSize(props.height)
}

// 解析尺寸字符串
const parseSize = (size) => {
  if (typeof size === 'number') return size
  if (typeof size === 'string') {
    if (size.includes('px')) {
      return parseInt(size.replace('px', ''))
    } else if (size.includes('%')) {
      // 简单处理百分比，实际项目中可能需要获取父容器尺寸
      return size === '100%' ? 375 : parseInt(size.replace('%', '')) * 3.75
    }
    return parseInt(size) || 375
  }
  return 375
}

// 开始红包雨
const startRain = () => {
  if (isRaining.value) return
  
  isRaining.value = true
  rainItems.value = []
  clickedCount.value = 0
  
  emit('start')
  
  // 开始生成红包
  startGenerate()
  
  // 开始动画循环
  startAnimation()
  
  // 设置游戏结束定时器
  gameTimer.value = setTimeout(() => {
    stopRain()
  }, parseInt(props.rainTime))
}

// 停止红包雨
const stopRain = () => {
  isRaining.value = false
  
  // 清除所有定时器
  if (generateTimer.value) {
    clearInterval(generateTimer.value)
    generateTimer.value = null
  }
  
  if (animationTimer.value) {
    clearInterval(animationTimer.value)
    animationTimer.value = null
  }
  
  if (gameTimer.value) {
    clearTimeout(gameTimer.value)
    gameTimer.value = null
  }
  
  // 清空红包
  rainItems.value = []
  
  emit('gameOver', {
    clickedCount: clickedCount.value
  })
}

// 开始生成红包
const startGenerate = () => {
  generateTimer.value = setInterval(() => {
    if (rainItems.value.length < parseInt(props.rainNum)) {
      generateRainItem()
    }
  }, props.generateInterval)
}

// 生成单个红包
const generateRainItem = () => {
  const item = {
    id: Date.now() + Math.random(),
    left: Math.random() * (containerWidth.value - props.rainWidth),
    top: -props.rainHeight,
    rotation: Math.random() * 360,
    opacity: 1,
    speed: props.fallSpeed + Math.random() * 0.05 // 添加随机速度变化
  }
  
  rainItems.value.push(item)
}

// 开始动画循环
const startAnimation = () => {
  animationTimer.value = setInterval(() => {
    updateRainItems()
  }, 16) // 约60fps
}

// 更新红包位置
const updateRainItems = () => {
  rainItems.value = rainItems.value.filter(item => {
    // 更新位置
    item.top += item.speed * 16 // 16ms间隔
    
    // 添加轻微的水平摆动
    item.left += Math.sin(item.top * 0.01) * 0.5
    
    // 更新旋转
    item.rotation += 1
    
    // 检查是否超出底部
    return item.top < containerHeight.value + props.rainHeight
  })
}

// 处理红包点击
const handleItemClick = (item, index) => {
  clickedCount.value++
  
  // 移除被点击的红包
  rainItems.value.splice(index, 1)
  
  emit('click', {
    item: item,
    clickedCount: clickedCount.value
  })
}

// 处理容器点击
const handleClick = (e) => {
  // 如果点击的不是红包，也触发点击事件
  emit('containerClick', e)
}

// 暴露方法给父组件
defineExpose({
  startRain,
  stopRain
})

// 生命周期钩子
onMounted(() => {
  initContainer()
})

onBeforeUnmount(() => {
  stopRain()
})
</script>

<style lang="scss" scoped>
.zx-giftrain {
  position: relative;
  overflow: hidden;
  background: #ffffff;
  
  .zx-giftrain-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .zx-giftrain-item {
    position: absolute;
    z-index: 10;
    cursor: pointer;
    transition: opacity 0.3s ease;
    
    .zx-giftrain-img {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    
    &:active {
      transform: scale(0.9);
    }
  }
}
</style>