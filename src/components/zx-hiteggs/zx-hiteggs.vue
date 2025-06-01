<template>
  <view class="zx-hiteggs" :style="containerStyle">
    <view class="zx-hiteggs__container">
      <!-- 锤子 -->
      <view 
        class="zx-hiteggs__hammer" 
        :class="{ 'zx-hiteggs__hammer--hitting': isHitting }"
        :style="hammerStyle"
        v-if="showHammer"
      >
        <image 
          :src="hammerImg" 
          mode="aspectFit"
          class="zx-hiteggs__hammer-img"
        />
      </view>
      
      <!-- 金蛋网格 -->
      <view class="zx-hiteggs__grid" :style="gridStyle">
        <view 
          v-for="(egg, index) in eggs" 
          :key="index"
          class="zx-hiteggs__egg-item"
          :style="eggItemStyle"
          @click="hitEgg(index)"
        >
          <!-- 完整金蛋 -->
          <view 
            v-if="!egg.isHit"
            class="zx-hiteggs__egg"
            :class="{ 'zx-hiteggs__egg--shaking': egg.isShaking }"
          >
            <image 
              :src="intactImg" 
              mode="aspectFit"
              class="zx-hiteggs__egg-img"
              :style="eggImageStyle"
            />
          </view>
          
          <!-- 破碎金蛋和奖品 -->
          <view v-else class="zx-hiteggs__broken">
            <!-- 破碎效果 -->
            <view class="zx-hiteggs__broken-effect">
              <view 
                v-for="(fragment, fIndex) in 6" 
                :key="fIndex"
                class="zx-hiteggs__fragment"
                :class="`zx-hiteggs__fragment--${fIndex + 1}`"
              >
                <image 
                  :src="brokenImg" 
                  mode="aspectFit"
                  class="zx-hiteggs__fragment-img"
                />
              </view>
            </view>
            
            <!-- 奖品内容 -->
            <view class="zx-hiteggs__prize" v-if="egg.prize">
              <view class="zx-hiteggs__prize-content">
                <image 
                  v-if="egg.prize.image"
                  :src="egg.prize.image"
                  mode="aspectFit"
                  class="zx-hiteggs__prize-img"
                />
                <text v-if="egg.prize.text" class="zx-hiteggs__prize-text">
                  {{ egg.prize.text }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref, computed, onMounted } from 'vue'

const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-hiteggs'

const emit = defineEmits(['click', 'hit', 'allHit'])

const props = defineProps({
  // 金蛋个数
  num: {
    type: Number,
    default: 9
  },
  // 完整金蛋图片地址
  intactImg: {
    type: String,
    default: 'https://img10.360buyimg.com/imagetools/jfs/t1/217651/2/1901/114207/617770f2E74551438/5342f7b949e7bec3.png'
  },
  // 破碎金蛋图片地址
  brokenImg: {
    type: String,
    default: 'https://img13.360buyimg.com/imagetools/jfs/t1/95159/30/17834/9845/61444874E0f463263/924741cae55efb85.png'
  },
  // 锤子图片
  hammerImg: {
    type: String,
    default: 'https://img13.360buyimg.com/imagetools/jfs/t1/95159/30/17834/9845/61444874E0f463263/924741cae55efb85.png'
  },
  // 金蛋图片宽度
  width: {
    type: String,
    default: '80px'
  },
  // 金蛋图片高度
  height: {
    type: String,
    default: '80px'
  },
  // 是否显示锤子
  showHammer: {
    type: Boolean,
    default: true
  },
  // 奖品数据
  prizes: {
    type: Array,
    default: () => []
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 容器背景色
  backgroundColor: {
    type: String,
    default: '#f5f5f5'
  },
  // 网格间距
  gap: {
    type: String,
    default: '10px'
  }
})

// 响应式数据
const eggs = ref([])
const isHitting = ref(false)
const hitCount = ref(0)

// 计算属性
const containerStyle = computed(() => ({
  backgroundColor: props.backgroundColor
}))

const gridStyle = computed(() => {
  const cols = Math.ceil(Math.sqrt(props.num))
  return {
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: props.gap
  }
})

const eggItemStyle = computed(() => ({
  width: props.width,
  height: props.height
}))

const eggImageStyle = computed(() => ({
  width: '100%',
  height: '100%'
}))

const hammerStyle = computed(() => ({
  width: '60px',
  height: '60px'
}))

// 初始化金蛋
const initEggs = () => {
  eggs.value = Array.from({ length: props.num }, (_, index) => ({
    id: index,
    isHit: false,
    isShaking: false,
    prize: props.prizes[index] || null
  }))
  hitCount.value = 0
}

// 砸击金蛋
const hitEgg = async (index) => {
  if (props.disabled || eggs.value[index].isHit) {
    return
  }
  
  // 触发点击事件
  emit('click', { index, egg: eggs.value[index] })
  
  // 显示锤子动画
  if (props.showHammer) {
    isHitting.value = true
    setTimeout(() => {
      isHitting.value = false
    }, 300)
  }
  
  // 金蛋震动效果
  eggs.value[index].isShaking = true
  
  setTimeout(() => {
    // 停止震动，显示破碎效果
    eggs.value[index].isShaking = false
    eggs.value[index].isHit = true
    hitCount.value++
    
    // 触发砸击事件
    emit('hit', { 
      index, 
      egg: eggs.value[index],
      prize: eggs.value[index].prize,
      hitCount: hitCount.value
    })
    
    // 检查是否全部砸完
    if (hitCount.value >= props.num) {
      emit('allHit', {
        eggs: eggs.value,
        prizes: eggs.value.map(egg => egg.prize).filter(Boolean)
      })
    }
  }, 200)
}

// 重置游戏
const reset = () => {
  initEggs()
}

// 暴露方法
defineExpose({
  reset,
  hitEgg
})

// 组件挂载时初始化
onMounted(() => {
  initEggs()
})
</script>

<style lang="scss" scoped>
.zx-hiteggs {
  position: relative;
  padding: 20px;
  border-radius: 12px;
  
  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  &__hammer {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    transition: all 0.3s ease;
    
    &--hitting {
      animation: hammer-hit 0.3s ease;
    }
    
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  
  &__grid {
    display: grid;
    place-items: center;
    width: 100%;
    max-width: 400px;
  }
  
  &__egg-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
  
  &__egg {
    position: relative;
    width: 100%;
    height: 100%;
    
    &--shaking {
      animation: egg-shake 0.2s ease-in-out;
    }
    
    &-img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  
  &__broken {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__broken-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  
  &__fragment {
    position: absolute;
    width: 30%;
    height: 30%;
    opacity: 0;
    animation: fragment-explode 0.6s ease-out forwards;
    
    &-img {
      width: 100%;
      height: 100%;
      filter: brightness(0.8);
    }
    
    &--1 {
      top: 0;
      left: 0;
      animation-delay: 0s;
    }
    
    &--2 {
      top: 0;
      right: 0;
      animation-delay: 0.1s;
    }
    
    &--3 {
      top: 50%;
      left: 0;
      animation-delay: 0.2s;
    }
    
    &--4 {
      top: 50%;
      right: 0;
      animation-delay: 0.1s;
    }
    
    &--5 {
      bottom: 0;
      left: 0;
      animation-delay: 0.2s;
    }
    
    &--6 {
      bottom: 0;
      right: 0;
      animation-delay: 0s;
    }
  }
  
  &__prize {
    position: relative;
    z-index: 5;
    animation: prize-appear 0.5s ease 0.3s both;
  }
  
  &__prize-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &__prize-img {
    width: 40px;
    height: 40px;
    margin-bottom: 4px;
  }
  
  &__prize-text {
    font-size: 12px;
    color: #333;
    text-align: center;
    line-height: 1.2;
  }
}

// 动画定义
@keyframes hammer-hit {
  0% {
    transform: translateX(-50%) translateY(0) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) translateY(20px) rotate(-10deg);
  }
  100% {
    transform: translateX(-50%) translateY(0) rotate(0deg);
  }
}

@keyframes egg-shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px) rotate(-1deg);
  }
  75% {
    transform: translateX(2px) rotate(1deg);
  }
}

@keyframes fragment-explode {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx, 20px), var(--ty, -20px)) rotate(var(--r, 45deg)) scale(0.5);
  }
}

@keyframes prize-appear {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

// 碎片飞散方向
.zx-hiteggs__fragment--1 {
  --tx: -30px;
  --ty: -30px;
  --r: -45deg;
}

.zx-hiteggs__fragment--2 {
  --tx: 30px;
  --ty: -30px;
  --r: 45deg;
}

.zx-hiteggs__fragment--3 {
  --tx: -40px;
  --ty: 0px;
  --r: -90deg;
}

.zx-hiteggs__fragment--4 {
  --tx: 40px;
  --ty: 0px;
  --r: 90deg;
}

.zx-hiteggs__fragment--5 {
  --tx: -30px;
  --ty: 30px;
  --r: -135deg;
}

.zx-hiteggs__fragment--6 {
  --tx: 30px;
  --ty: 30px;
  --r: 135deg;
}
</style>