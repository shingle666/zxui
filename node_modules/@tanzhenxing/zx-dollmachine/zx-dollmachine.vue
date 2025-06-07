<template>
  <view 
    class="zx-dollmachine" 
    :style="{
      width: width,
      height: height
    }"
  >
    <!-- 娃娃机主体 -->
    <view class="machine-box">
      <!-- 抓取工具 -->
      <view 
        class="machine-tools" 
        :style="{
          left: clawPosition.x + 'px',
          top: clawPosition.y + 'px'
        }"
      >
        <!-- 绳子 -->
        <view 
          class="machine-rope" 
          :style="{
            height: ropeHeight + 'px'
          }"
        ></view>
        
        <!-- 爪子 -->
        <view class="machine-claw">
          <image 
            :src="currentClawImg" 
            mode="aspectFit"
            class="claw-img"
          />
          
          <!-- 抓到的奖品 -->
          <view v-if="grabbedPrize" class="gift-prize">
            <image 
              :src="grabbedPrize.prizeImg" 
              mode="aspectFit"
              class="prize-img"
            />
          </view>
        </view>
      </view>
      
      <!-- 奖品展示区 -->
      <view class="machine-gift-box">
        <view class="box-glass">
          <view 
            v-for="(item, index) in displayPrizes" 
            :key="index"
            class="gift-img"
            :style="{
              left: item.x + 'px',
              top: item.y + 'px'
            }"
          >
            <image 
              :src="item.prizeImg" 
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
      
      <!-- 操作区域 -->
      <view class="machine-operate">
        <!-- 方向控制 -->
        <view class="machine-direction">
          <view 
            class="direction-block"
            @touchstart="startMove('left')"
            @touchend="stopMove"
          ></view>
          <view 
            class="direction-block"
            @touchstart="startMove('right')"
            @touchend="stopMove"
          ></view>
        </view>
        
        <!-- 抓取按钮 -->
        <view 
          class="machine-btn"
          :class="{
            'machine-start': !isGrabbing && !isMoving,
            'machine-disabled': isGrabbing || isMoving
          }"
          @click="startGrab"
        ></view>
        
        <!-- 重置按钮 -->
        <view class="machine-reset-btn" @click="resetGame">
          <text>重置</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

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
    default: '690px'
  },
  // 奖品列表
  prizeList: {
    type: Array,
    required: true,
    default: () => []
  },
  // 中奖奖品索引 (-1 表示未中奖)
  prizeIndex: {
    type: Number,
    default: -1
  },
  // 默认爪子图片
  defaultClaw: {
    type: String,
    default: 'https://img14.360buyimg.com/imagetools/jfs/t1/146467/34/22553/4178/61b088afE198f676e/21952e7018d1d141.png'
  },
  // 抓取状态爪子图片
  activeClaw: {
    type: String,
    default: 'https://img14.360buyimg.com/imagetools/jfs/t1/146467/34/22553/4178/61b088afE198f676e/21952e7018d1d141.png'
  },
  // 爪子移动速度 (ms)
  moveSpeed: {
    type: Number,
    default: 100
  },
  // 抓取时间 (ms)
  grabTime: {
    type: Number,
    default: 2000
  }
})

// 定义 emits
const emit = defineEmits(['init', 'start-turns', 'end-turns'])

// 响应式数据
const isGrabbing = ref(false)
const isMoving = ref(false)
const grabbedPrize = ref(null)
const ropeHeight = ref(20)
const moveTimer = ref(null)
const grabTimer = ref(null)

// 爪子位置
const clawPosition = reactive({
  x: 150, // 初始水平位置
  y: 50   // 初始垂直位置
})

// 显示的奖品位置
const displayPrizes = ref([])

// 当前爪子图片
const currentClawImg = computed(() => {
  return isGrabbing.value ? props.activeClaw : props.defaultClaw
})

// 初始化奖品位置
const initPrizes = () => {
  if (!props.prizeList || props.prizeList.length === 0) return
  
  const prizes = []
  props.prizeList.forEach((prize, index) => {
    // 随机分布奖品位置
    const x = Math.random() * 250 + 20
    const y = Math.random() * 100 + 50
    
    prizes.push({
      ...prize,
      x,
      y,
      id: index
    })
  })
  
  displayPrizes.value = prizes
}

// 开始移动爪子
const startMove = (direction) => {
  if (isGrabbing.value) return
  
  isMoving.value = true
  
  const move = () => {
    if (direction === 'left' && clawPosition.x > 20) {
      clawPosition.x -= 5
    } else if (direction === 'right' && clawPosition.x < 280) {
      clawPosition.x += 5
    }
  }
  
  move()
  moveTimer.value = setInterval(move, props.moveSpeed)
}

// 停止移动爪子
const stopMove = () => {
  isMoving.value = false
  if (moveTimer.value) {
    clearInterval(moveTimer.value)
    moveTimer.value = null
  }
}

// 开始抓取
const startGrab = () => {
  if (isGrabbing.value || isMoving.value) return
  
  isGrabbing.value = true
  emit('start-turns')
  
  // 爪子下降动画
  const originalY = clawPosition.y
  const targetY = 200
  
  // 绳子伸长
  ropeHeight.value = targetY - originalY + 20
  clawPosition.y = targetY
  
  grabTimer.value = setTimeout(() => {
    // 检查是否抓到奖品
    checkGrabResult()
    
    // 爪子上升
    setTimeout(() => {
      clawPosition.y = originalY
      ropeHeight.value = 20
      
      setTimeout(() => {
        isGrabbing.value = false
        emit('end-turns')
        
        // 如果抓到奖品，移除显示
        if (grabbedPrize.value) {
          setTimeout(() => {
            grabbedPrize.value = null
          }, 1000)
        }
      }, 500)
    }, 1000)
  }, props.grabTime)
}

// 检查抓取结果
const checkGrabResult = () => {
  // 根据 prizeIndex 判断是否中奖
  if (props.prizeIndex >= 0 && props.prizeIndex < props.prizeList.length) {
    const prize = props.prizeList[props.prizeIndex]
    grabbedPrize.value = prize
    
    // 从显示列表中移除该奖品
    displayPrizes.value = displayPrizes.value.filter(item => item.id !== props.prizeIndex)
  }
}

// 重置游戏
const resetGame = () => {
  if (isGrabbing.value) return
  
  // 重置爪子位置
  clawPosition.x = 150
  clawPosition.y = 50
  ropeHeight.value = 20
  grabbedPrize.value = null
  
  // 重新初始化奖品
  initPrizes()
}

// 初始化游戏
const init = () => {
  initPrizes()
  emit('init')
}

// 暴露方法给父组件
defineExpose({
  init,
  resetGame
})

// 生命周期
onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  if (moveTimer.value) {
    clearInterval(moveTimer.value)
  }
  if (grabTimer.value) {
    clearTimeout(grabTimer.value)
  }
})
</script>

<style lang="scss" scoped>
.zx-dollmachine {
  position: relative;
  overflow: hidden;
  
  .machine-box {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('https://img12.360buyimg.com/imagetools/jfs/t1/145351/6/24350/800170/61c95470E416c27bb/a3f62a18af70684e.png') no-repeat center;
    background-size: cover;
  }
  
  .machine-tools {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all linear 0.3s;
    z-index: 10;
  }
  
  .machine-rope {
    width: 10px;
    background: linear-gradient(to bottom right, #ff9800, #ffeb3b);
    transition: all linear 2s;
  }
  
  .machine-claw {
    position: relative;
    width: 80px;
    height: 70px;
    text-align: center;
    
    .claw-img {
      width: 100%;
      height: 100%;
    }
    
    .gift-prize {
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 60px;
      
      .prize-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  
  .machine-gift-box {
    position: absolute;
    bottom: 80px;
    left: 0;
    right: 0;
    height: 200px;
    
    .box-glass {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgba(241, 217, 5, 0.1);
      
      .gift-img {
        position: absolute;
        width: 50px;
        height: 50px;
        
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
  .machine-operate {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 20px;
    background: rgba(0, 0, 0, 0.1);
    
    .machine-direction {
      position: relative;
      width: 50px;
      height: 50px;
      background: url('https://img14.360buyimg.com/imagetools/jfs/t1/3283/2/18965/1403/62c28eb5E0cfb824b/9b90cde1898d18af.png') no-repeat center;
      background-size: 100% 100%;
      
      .direction-block {
        position: absolute;
        top: 50%;
        width: 20px;
        height: 20px;
        transform: translateY(-50%);
        
        &:nth-child(1) {
          left: 0;
        }
        
        &:nth-child(2) {
          right: 0;
        }
      }
    }
    
    .machine-btn {
      width: 50px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      
      &.machine-start {
        background-image: url('https://img13.360buyimg.com/imagetools/jfs/t1/205479/17/4245/32041/61309346E02bd3b6b/b41be60bedbb1e69.png');
      }
      
      &.machine-disabled {
        background-image: url('https://img10.360buyimg.com/imagetools/jfs/t1/193040/14/21217/16320/61309346E6569e270/36e45126a5f1fc9c.png');
        pointer-events: none;
      }
    }
    
    .machine-reset-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 16px;
      background: rgba(255, 152, 0, 0.8);
      border-radius: 20px;
      color: white;
      font-size: 14px;
    }
  }
}

.disabledClick {
  pointer-events: none !important;
  cursor: not-allowed !important;
}
</style>