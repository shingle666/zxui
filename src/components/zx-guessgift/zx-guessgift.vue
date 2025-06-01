<template>
  <view 
    class="zx-guessgift" 
    :style="{
      width: width,
      height: height
    }"
  >
    <!-- 游戏容器 -->
    <view class="guess-gift-container">
      <!-- 碗容器 -->
      <view class="bowl-container">
        <view 
          v-for="(bowl, index) in bowlList" 
          :key="index"
          class="bowl-item"
          :class="{
            'bowl-moving': bowl.isMoving,
            'bowl-raised': bowl.isRaised,
            'disabled-click': isAnimating
          }"
          :style="{
            transform: `translate(${bowl.translateX}px, ${bowl.translateY}px)`,
            transition: bowl.transition
          }"
          @click="onBowlClick(index)"
        >
          <!-- 碗的图片 -->
          <image 
            :src="bowlImg" 
            mode="aspectFit"
            class="bowl-image"
          />
          
          <!-- 奖品（隐藏在碗下） -->
          <view 
            class="gold-bean"
            :class="{
              '_opacity0': !bowl.showPrize,
              '_opacity1': bowl.showPrize
            }"
          >
            <image 
              :src="prizeImg" 
              mode="aspectFit"
              class="prize-image"
            />
          </view>
        </view>
      </view>
      
      <!-- 开始按钮 -->
      <view 
        class="start-button"
        :class="{
          'button-disabled': isAnimating
        }"
        @click="startGame"
      >
        <text class="button-text">{{ isAnimating ? '游戏中...' : '开始游戏' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'zx-guessgift',
  props: {
    // 组件宽度
    width: {
      type: String,
      default: '100%'
    },
    // 组件高度
    height: {
      type: String,
      default: '400px'
    },
    // 交换次数
    turnsNumber: {
      type: Number,
      default: 20
    },
    // 每个碗移动所用时间（毫秒）
    turnsTime: {
      type: Number,
      default: 0
    },
    // 动画频率，位置交换更新（毫秒）
    turnsFrequency: {
      type: Number,
      default: 500
    },
    // 碗抬起的高度
    raiseHeight: {
      type: Number,
      default: 50
    },
    // 中奖奖品在列表的索引位置（-1不中奖，>=0中奖）
    prizeIndex: {
      type: Number,
      default: -1
    },
    // 碗的图片
    bowlImg: {
      type: String,
      default: 'https://img14.360buyimg.com/imagetools/jfs/t1/213395/37/9376/5774/61cc34b8Ec3d2eddd/1ddf6d42663e1285.png'
    },
    // 奖品图片
    prizeImg: {
      type: String,
      default: 'https://img13.360buyimg.com/imagetools/jfs/t1/219815/14/9349/4725/61cc34b8E059ebbd2/55e8002ae82a01ea.png'
    }
  },
  data() {
    return {
      // 碗的数据
      bowlList: [
        {
          id: 0,
          translateX: 0,
          translateY: 0,
          isMoving: false,
          isRaised: false,
          showPrize: false,
          transition: 'all ease-out 0.5s'
        },
        {
          id: 1,
          translateX: 0,
          translateY: 0,
          isMoving: false,
          isRaised: false,
          showPrize: false,
          transition: 'all ease-out 0.5s'
        },
        {
          id: 2,
          translateX: 0,
          translateY: 0,
          isMoving: false,
          isRaised: false,
          showPrize: false,
          transition: 'all ease-out 0.5s'
        }
      ],
      // 是否正在动画中
      isAnimating: false,
      // 当前交换次数
      currentTurns: 0,
      // 奖品所在的碗索引
      currentPrizeIndex: 0
    }
  },
  mounted() {
    this.initGame()
  },
  methods: {
    // 初始化游戏
    initGame() {
      // 重置所有碗的状态
      this.bowlList.forEach((bowl, index) => {
        bowl.translateX = 0
        bowl.translateY = 0
        bowl.isMoving = false
        bowl.isRaised = false
        bowl.showPrize = false
      })
      
      // 设置奖品位置
      this.currentPrizeIndex = this.prizeIndex >= 0 ? this.prizeIndex : Math.floor(Math.random() * 3)
      this.isAnimating = false
      this.currentTurns = 0
    },
    
    // 开始游戏
    startGame() {
      if (this.isAnimating) return
      
      this.isAnimating = true
      this.currentTurns = 0
      
      // 触发开始事件
      this.$emit('start-turns')
      
      // 开始交换动画
      this.startSwapping()
    },
    
    // 开始交换动画
    startSwapping() {
      if (this.currentTurns >= this.turnsNumber) {
        this.endSwapping()
        return
      }
      
      // 随机选择两个碗进行交换
      const bowl1Index = Math.floor(Math.random() * 3)
      let bowl2Index = Math.floor(Math.random() * 3)
      while (bowl2Index === bowl1Index) {
        bowl2Index = Math.floor(Math.random() * 3)
      }
      
      this.swapBowls(bowl1Index, bowl2Index)
      
      this.currentTurns++
      
      // 继续下一次交换
      setTimeout(() => {
        this.startSwapping()
      }, this.turnsFrequency)
    },
    
    // 交换两个碗
    swapBowls(index1, index2) {
      const bowl1 = this.bowlList[index1]
      const bowl2 = this.bowlList[index2]
      
      // 计算交换距离
      const distance = (index2 - index1) * 120 // 假设每个碗间距120px
      
      // 设置移动状态
      bowl1.isMoving = true
      bowl2.isMoving = true
      
      // 先抬起碗
      bowl1.isRaised = true
      bowl2.isRaised = true
      bowl1.translateY = -this.raiseHeight
      bowl2.translateY = -this.raiseHeight
      
      setTimeout(() => {
        // 水平移动
        bowl1.translateX = distance
        bowl2.translateX = -distance
        
        setTimeout(() => {
          // 放下碗
          bowl1.translateY = 0
          bowl2.translateY = 0
          bowl1.isRaised = false
          bowl2.isRaised = false
          
          setTimeout(() => {
            // 重置位置和状态
            bowl1.translateX = 0
            bowl2.translateX = 0
            bowl1.isMoving = false
            bowl2.isMoving = false
            
            // 更新奖品位置
            if (this.currentPrizeIndex === index1) {
              this.currentPrizeIndex = index2
            } else if (this.currentPrizeIndex === index2) {
              this.currentPrizeIndex = index1
            }
          }, 200)
        }, 300)
      }, 200)
    },
    
    // 结束交换
    endSwapping() {
      this.isAnimating = false
      
      // 触发结束事件
      this.$emit('end-turns')
    },
    
    // 点击碗
    onBowlClick(index) {
      if (this.isAnimating) return
      
      // 显示选中碗下的奖品
      this.bowlList[index].showPrize = (index === this.currentPrizeIndex)
      
      // 抬起碗
      this.bowlList[index].isRaised = true
      this.bowlList[index].translateY = -this.raiseHeight
      
      // 触发点击事件
      this.$emit('bowl-click', {
        index,
        isWin: index === this.currentPrizeIndex,
        prizeIndex: this.currentPrizeIndex
      })
      
      // 2秒后重置游戏
      setTimeout(() => {
        this.initGame()
      }, 2000)
    },
    
    // 手动开始游戏（供外部调用）
    start() {
      this.startGame()
    }
  }
}
</script>

<style lang="scss" scoped>
.zx-guessgift {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  overflow: hidden;
  
  .guess-gift-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40rpx;
    
    .bowl-container {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 40rpx;
      margin-bottom: 60rpx;
      
      .bowl-item {
        position: relative;
        width: 200rpx;
        height: 200rpx;
        cursor: pointer;
        transition: all ease-out 0.5s;
        
        &.bowl-moving {
          z-index: 10;
        }
        
        &.disabled-click {
          pointer-events: none;
          cursor: not-allowed;
        }
        
        .bowl-image {
          width: 100%;
          height: 100%;
        }
        
        .gold-bean {
          position: absolute;
          z-index: 1;
          bottom: 60rpx;
          left: 50%;
          transform: translateX(-50%);
          width: 60rpx;
          height: 60rpx;
          transition: opacity 0.3s ease;
          
          &._opacity0 {
            opacity: 0;
          }
          
          &._opacity1 {
            opacity: 1;
          }
          
          .prize-image {
            width: 100%;
            height: 100%;
          }
        }
        
        &:hover {
          transform: scale(1.05);
        }
        
        &:active {
          transform: scale(0.95);
        }
      }
    }
    
    .start-button {
      padding: 24rpx 60rpx;
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      border-radius: 50rpx;
      box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
      
      &.button-disabled {
        background: #ccc;
        cursor: not-allowed;
        box-shadow: none;
      }
      
      .button-text {
        color: white;
        font-size: 32rpx;
        font-weight: bold;
      }
      
      &:hover:not(.button-disabled) {
        transform: translateY(-4rpx);
        box-shadow: 0 12rpx 25rpx rgba(255, 107, 107, 0.4);
      }
      
      &:active:not(.button-disabled) {
        transform: translateY(-2rpx);
      }
    }
  }
}
</style>