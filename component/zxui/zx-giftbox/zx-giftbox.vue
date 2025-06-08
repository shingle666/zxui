<template>
  <view class="zx-giftbox" :style="containerStyle">
    <!-- 礼盒容器 -->
    <view class="zx-giftbox__container" :class="{ 'zx-giftbox__container--opening': isOpening, 'zx-giftbox__container--opened': isOpened }">
      <!-- 礼盒盖子 -->
      <view class="zx-giftbox__lid" :style="lidStyle">
        <view class="zx-giftbox__lid-decoration"></view>
        <view class="zx-giftbox__ribbon zx-giftbox__ribbon--horizontal"></view>
        <view class="zx-giftbox__ribbon zx-giftbox__ribbon--vertical"></view>
      </view>
      
      <!-- 礼盒底部 -->
      <view class="zx-giftbox__bottom" :style="bottomStyle">
        <view class="zx-giftbox__bottom-decoration"></view>
      </view>
      
      <!-- 奖品内容 -->
      <view class="zx-giftbox__content" :class="{ 'zx-giftbox__content--show': showContent }">
        <view class="zx-giftbox__prize" :style="prizeStyle">
          <slot name="prize">
            <view class="zx-giftbox__prize-text" v-html="prizeText"></view>
          </slot>
        </view>
      </view>
      
      <!-- 光效 -->
      <view class="zx-giftbox__light" :class="{ 'zx-giftbox__light--show': showLight }"></view>
      
      <!-- 点击区域 -->
      <view 
        class="zx-giftbox__click-area" 
        @click="handleClick"
        :class="{ 'zx-giftbox__click-area--disabled': props.disabled || isOpened }"
      >
        <view class="zx-giftbox__click-text" v-if="!isOpened && props.clickText">{{ props.clickText }}</view>
      </view>
    </view>
    
    <!-- 粒子效果 -->
    <view class="zx-giftbox__particles" v-if="showParticles">
      <view 
        class="zx-giftbox__particle" 
        v-for="(particle, index) in particles" 
        :key="index"
        :style="particle.style"
      ></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'

// 组件名称
defineOptions({
  name: 'zx-giftbox'
})

// Props定义
const props = defineProps({
  // 礼盒宽度
  width: {
    type: String,
    default: '200px'
  },
  // 礼盒高度
  height: {
    type: String,
    default: '200px'
  },
  // 礼盒颜色
  boxColor: {
    type: String,
    default: '#FF6B6B'
  },
  // 盖子颜色
  lidColor: {
    type: String,
    default: '#FF5252'
  },
  // 丝带颜色
  ribbonColor: {
    type: String,
    default: '#FFD700'
  },
  // 奖品文本
  prizeText: {
    type: String,
    default: '恭喜获奖！'
  },
  // 奖品文本颜色
  prizeTextColor: {
    type: String,
    default: '#FF6B6B'
  },
  // 奖品文本大小
  prizeTextSize: {
    type: String,
    default: '16px'
  },
  // 点击提示文本
  clickText: {
    type: String,
    default: '点击打开'
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 动画持续时间(ms)
  duration: {
    type: Number,
    default: 1000
  },
  // 是否显示粒子效果
  showParticleEffect: {
    type: Boolean,
    default: true
  },
  // 粒子数量
  particleCount: {
    type: Number,
    default: 20
  }
})

// 事件定义
const emit = defineEmits(['start-turns', 'end-turns', 'click'])

// 响应式数据
const isOpening = ref(false)
const isOpened = ref(false)
const showContent = ref(false)
const showLight = ref(false)
const showParticles = ref(false)
const particles = ref([])

// 计算属性
const containerStyle = computed(() => ({
  width: props.width,
  height: props.height
}))

const lidStyle = computed(() => ({
  backgroundColor: props.lidColor
}))

const bottomStyle = computed(() => ({
  backgroundColor: props.boxColor
}))

const prizeStyle = computed(() => ({
  color: props.prizeTextColor,
  fontSize: props.prizeTextSize
}))

// 生成粒子
const generateParticles = () => {
  particles.value = []
  for (let i = 0; i < props.particleCount; i++) {
    const particle = {
      style: {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        backgroundColor: getRandomColor(),
        animationDelay: Math.random() * 0.5 + 's',
        animationDuration: (Math.random() * 2 + 1) + 's'
      }
    }
    particles.value.push(particle)
  }
}

// 获取随机颜色
const getRandomColor = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 处理点击事件
const handleClick = () => {
  if (props.disabled || isOpened.value || isOpening.value) return
  
  emit('click')
  openGiftbox()
}

// 打开礼盒
const openGiftbox = () => {
  if (isOpened.value || isOpening.value) return
  
  isOpening.value = true
  emit('start-turns')
  
  // 显示光效
  setTimeout(() => {
    showLight.value = true
  }, 200)
  
  // 显示内容
  setTimeout(() => {
    showContent.value = true
  }, 400)
  
  // 显示粒子效果
  if (props.showParticleEffect) {
    setTimeout(() => {
      generateParticles()
      showParticles.value = true
    }, 600)
  }
  
  // 动画完成
  setTimeout(() => {
    isOpening.value = false
    isOpened.value = true
    emit('end-turns')
    
    // 隐藏粒子效果
    if (props.showParticleEffect) {
      setTimeout(() => {
        showParticles.value = false
      }, 2000)
    }
  }, props.duration)
}

// 重置礼盒
const init = () => {
  isOpening.value = false
  isOpened.value = false
  showContent.value = false
  showLight.value = false
  showParticles.value = false
  particles.value = []
}

// 暴露方法
defineExpose({
  init,
  openGiftbox
})
</script>

<style lang="scss" scoped>
.zx-giftbox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.3s ease;
    
    &--opening {
      animation: giftbox-shake 0.5s ease-in-out;
    }
  }
  
  &__lid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    border-radius: 8px 8px 4px 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transition: transform 1s ease;
    transform-origin: bottom;
    z-index: 3;
    
    .zx-giftbox__container--opening & {
      transform: rotateX(-120deg) translateZ(20px);
    }
    
    .zx-giftbox__container--opened & {
      transform: rotateX(-120deg) translateZ(20px);
    }
  }
  
  &__lid-decoration {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 15px;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60%;
    border-radius: 4px 4px 8px 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
  
  &__bottom-decoration {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 4px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 2px;
  }
  
  &__ribbon {
    position: absolute;
    background: linear-gradient(45deg, #FFD700, #FFA500);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    &--horizontal {
      top: 50%;
      left: 0;
      width: 100%;
      height: 12px;
      transform: translateY(-50%);
    }
    
    &--vertical {
      top: 0;
      left: 50%;
      width: 12px;
      height: 100%;
      transform: translateX(-50%);
    }
  }
  
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.5s ease;
    
    &--show {
      opacity: 1;
    }
  }
  
  &__prize {
    text-align: center;
    padding: 10px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    animation: prize-bounce 0.6s ease;
  }
  
  &__prize-text {
    font-weight: bold;
    line-height: 1.4;
  }
  
  &__light {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(255, 255, 0, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    z-index: 0;
    transition: opacity 0.5s ease;
    
    &--show {
      opacity: 1;
      animation: light-pulse 2s ease-in-out infinite;
    }
  }
  
  &__click-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 10px;
    cursor: pointer;
    z-index: 4;
    
    &--disabled {
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  
  &__click-text {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    animation: click-text-bounce 2s ease-in-out infinite;
  }
  
  &__particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
  }
  
  &__particle {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: particle-float 2s ease-out forwards;
  }
}

// 动画定义
@keyframes giftbox-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px) rotate(-1deg); }
  75% { transform: translateX(2px) rotate(1deg); }
}

@keyframes prize-bounce {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes light-pulse {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes click-text-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes particle-float {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(0.5);
  }
}
</style>