<template>
  <view class="zx-luckshake" :style="{
    width: luckWidth,
    height: luckHeight,
    position: 'relative'
  }" @click="handleClick">
    <!-- 红包上半部分 -->
    <view class="zx-luckshake-top" :class="{ 'shake-animation': isShaking }" :style="{
      width: luckWidth,
      height: topHeight,
      backgroundImage: luckImgTop ? `url(${luckImgTop})` : '',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '2',
      transform: isShaking ? `translateY(${shakeOffset}px)` : 'translateY(0)'
    }">
      <!-- 默认红包上半部分 -->
      <view v-if="!luckImgTop" class="default-top">
        <view class="red-packet-top"></view>
      </view>
    </view>

    <!-- 红包下半部分 -->
    <view class="zx-luckshake-bottom" :style="{
      width: luckWidth,
      height: bottomHeight,
      backgroundImage: luckImgBottom ? `url(${luckImgBottom})` : '',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: '0',
      left: '0',
      zIndex: '1'
    }">
      <!-- 默认红包下半部分 -->
      <view v-if="!luckImgBottom" class="default-bottom">
        <view class="red-packet-bottom"></view>
      </view>
    </view>

    <!-- 点击手势图片 -->
    <view v-if="clickPoint !== false" class="zx-luckshake-pointer" :class="{ 'pointer-animation': showPointer }" :style="{
      ...pointerStyle,
      backgroundImage: clickPoint ? `url(${clickPoint})` : '',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'absolute',
      bottom: '-60px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: '3'
    }">
      <!-- 默认手势图标 -->
      <view v-if="!clickPoint" class="default-pointer">
        <text class="pointer-text">👆</text>
        <text class="pointer-hint">摇一摇</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 定义 props
const props = defineProps({
  // 当前环境是否支持摇一摇
  isShake: {
    type: [String, Boolean],
    default: true
  },
  // 红包图片的宽度
  luckWidth: {
    type: String,
    default: '200px'
  },
  // 红包图片的高度
  luckHeight: {
    type: String,
    default: '160px'
  },
  // 红包上半部分图片
  luckImgTop: {
    type: String,
    default: ''
  },
  // 红包下半部分图片
  luckImgBottom: {
    type: String,
    default: ''
  },
  // 点击手势图片，不需要可设置为 false
  clickPoint: {
    type: [String, Boolean],
    default: ''
  },
  // 摇手机的阈值，越小越灵敏
  shakeSpeed: {
    type: Number,
    default: 110
  },
  // 震动持续时间，小程序不可设置此参数
  durationTime: {
    type: Number,
    default: 1000
  },
  // 触发摇一摇后距离回调函数的时间
  durationAnimation: {
    type: Number,
    default: 1000
  },
  // 点击图片的样式
  pointerStyle: {
    type: Object,
    default: () => ({
      width: '90px',
      height: '90px'
    })
  }
})

// 定义 emits
const emit = defineEmits(['shake-event', 'click-shake'])

// 响应式数据
const isShaking = ref(false)
const showPointer = ref(true)
const shakeOffset = ref(0)
const lastTime = ref(0)
const lastX = ref(0)
const lastY = ref(0)
const lastZ = ref(0)

// 计算属性
const topHeight = computed(() => {
  const height = parseInt(props.luckHeight)
  return (height * 0.6) + 'px'
})

const bottomHeight = computed(() => {
  const height = parseInt(props.luckHeight)
  return (height * 0.4) + 'px'
})

// 检测设备运动
const handleDeviceMotion = (event) => {
  if (!props.isShake) return

  const acceleration = event.accelerationIncludingGravity
  const curTime = new Date().getTime()

  if ((curTime - lastTime.value) > 100) {
    const diffTime = curTime - lastTime.value
    const x = acceleration.x
    const y = acceleration.y
    const z = acceleration.z

    const speed = Math.abs(x + y + z - lastX.value - lastY.value - lastZ.value) / diffTime * 10000

    if (speed > props.shakeSpeed) {
      triggerShake()
    }

    lastTime.value = curTime
    lastX.value = x
    lastY.value = y
    lastZ.value = z
  }
}

// 触发摇一摇效果
const triggerShake = () => {
  if (isShaking.value) return

  isShaking.value = true
  showPointer.value = false

  // 震动效果（仅在支持的平台）
  // #ifdef APP-PLUS || H5
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(props.durationTime)
  }
  // #endif

  // 摇晃动画
  let animationCount = 0
  const maxAnimations = 10
  const animationInterval = props.durationAnimation / maxAnimations

  const shakeAnimation = setInterval(() => {
    shakeOffset.value = Math.random() * 10 - 5
    animationCount++

    if (animationCount >= maxAnimations) {
      clearInterval(shakeAnimation)
      shakeOffset.value = 0
      isShaking.value = false
      showPointer.value = true

      // 延迟触发回调
      setTimeout(() => {
        emit('shake-event')
      }, 200)
    }
  }, animationInterval)
}

// 点击事件处理
const handleClick = () => {
  emit('click-shake')
  triggerShake()
}

// 生命周期
onMounted(() => {
  // 检查是否支持设备运动事件
  // #ifdef H5
  if (typeof window !== 'undefined' && window.DeviceMotionEvent) {
    // iOS 13+ 需要请求权限
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response === 'granted') {
          window.addEventListener('devicemotion', handleDeviceMotion, false)
        }
      }).catch(console.error)
    } else {
      window.addEventListener('devicemotion', handleDeviceMotion, false)
    }
  }
  // #endif

  // 小程序和 App 平台的处理
  // #ifdef MP || APP-PLUS
  // 小程序可以使用 uni.onAccelerometerChange
  uni.startAccelerometer({
    interval: 'normal',
    success: () => {
      uni.onAccelerometerChange((res) => {
        const event = {
          accelerationIncludingGravity: {
            x: res.x,
            y: res.y,
            z: res.z
          }
        }
        handleDeviceMotion(event)
      })
    }
  })
  // #endif
})

onBeforeUnmount(() => {
  // #ifdef H5
  if (typeof window !== 'undefined') {
    window.removeEventListener('devicemotion', handleDeviceMotion, false)
  }
  // #endif

  // #ifdef MP || APP-PLUS
  uni.stopAccelerometer()
  // #endif
})
</script>

<style lang="scss" scoped>
.zx-luckshake {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.zx-luckshake-top,
.zx-luckshake-bottom {
  transition: transform 0.1s ease-out;
}

.shake-animation {
  animation: shake 0.1s ease-in-out;
}

@keyframes shake {

  0%,
  100% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-3px) rotate(-1deg);
  }

  75% {
    transform: translateY(3px) rotate(1deg);
  }
}

.zx-luckshake-pointer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pointer-animation {
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-10px);
  }

  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* 默认红包样式 */
.default-top {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red-packet-top {
  width: 80%;
  height: 80%;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-radius: 20px 20px 0 0;
  position: relative;
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

.red-packet-top::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: #ffd700;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(255, 215, 0, 0.5);
}

.default-bottom {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.red-packet-bottom {
  width: 80%;
  height: 100%;
  background: linear-gradient(135deg, #ff4757, #ff6b6b);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
}

/* 默认手势样式 */
.default-pointer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.pointer-text {
  font-size: 40px;
  margin-bottom: 8px;
}

.pointer-hint {
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>