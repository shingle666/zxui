# zx-giftrain 红包雨组件

`zx-giftrain` 是一个红包雨游戏组件，支持 H5、小程序、App 多端运行，提供丰富的自定义配置选项。

## 特性

- 🎮 支持红包雨游戏效果
- 📱 兼容 H5、小程序、App 多端
- 🎨 支持自定义红包图片、尺寸、速度等
- ⚡ 高性能动画，流畅的游戏体验
- 🎯 支持点击事件和游戏状态回调
- 🔧 灵活的配置选项

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-giftrain
      ref="giftrain"
      width="100%"
      height="580px"
      @start="onGameStart"
      @gameOver="onGameOver"
      @click="onRainClick"
    >
      <!-- 可以在这里放置开始按钮或其他内容 -->
      <view v-if="!isGameStarted" class="start-btn" @click="startGame">
        开始游戏
      </view>
    </zx-giftrain>
  </view>
</template>

<script>
import ZxGiftrain from '@/components/zx-giftrain/zx-giftrain.vue'

export default {
  components: {
    ZxGiftrain
  },
  data() {
    return {
      isGameStarted: false,
      score: 0
    }
  },
  methods: {
    // 开始游戏
    startGame() {
      this.$refs.giftrain.startRain()
    },
    
    // 游戏开始回调
    onGameStart() {
      this.isGameStarted = true
      console.log('游戏开始')
    },
    
    // 游戏结束回调
    onGameOver(result) {
      this.isGameStarted = false
      this.score = result.clickedCount
      console.log('游戏结束，得分：', result.clickedCount)
    },
    
    // 点击红包回调
    onRainClick(data) {
      console.log('点击红包，当前得分：', data.clickedCount)
    }
  }
}
</script>

<style>
.start-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20rpx 40rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border-radius: 50rpx;
  font-size: 32rpx;
  z-index: 100;
}
</style>
```

### 自定义配置

```vue
<template>
  <zx-giftrain
    width="750rpx"
    height="1000rpx"
    :rain-time="20000"
    :rain-num="8"
    rain-img="/static/custom-gift.png"
    :rain-width="60"
    :rain-height="60"
    background-color="#f0f8ff"
    :fall-speed="0.15"
    :generate-interval="600"
    @start="onStart"
    @gameOver="onGameOver"
    @click="onClick"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 容器宽度 | String | '375px' |
| height | 容器高度 | String | '500px' |
| rain-time | 游戏持续时间(毫秒) | String/Number | 30000 |
| rain-num | 同时显示的最大红包数量 | String/Number | 5 |
| rain-img | 红包图片地址 | String | 默认红包图片 |
| rain-width | 红包宽度(px) | Number | 50 |
| rain-height | 红包高度(px) | Number | 50 |
| background-color | 背景颜色 | String | '#ffffff' |
| fall-speed | 红包下落速度(px/ms) | Number | 0.1 |
| generate-interval | 红包生成间隔(毫秒) | Number | 800 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| start | 游戏开始时触发 | - |
| gameOver | 游戏结束时触发 | { clickedCount: number } |
| click | 点击红包时触发 | { item: object, clickedCount: number } |
| containerClick | 点击容器时触发 | Event |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| startRain | 开始红包雨游戏 | - |
| stopRain | 停止红包雨游戏 | - |

## 使用示例

### 完整的游戏示例

```vue
<template>
  <view class="game-container">
    <!-- 游戏区域 -->
    <zx-giftrain
      ref="giftrain"
      width="100%"
      height="600px"
      :rain-time="gameTime"
      :rain-num="difficulty"
      @start="handleGameStart"
      @gameOver="handleGameOver"
      @click="handleRainClick"
    >
      <!-- 游戏UI -->
      <view class="game-ui">
        <!-- 分数显示 -->
        <view class="score-board">
          <text>得分: {{ score }}</text>
          <text>时间: {{ timeLeft }}s</text>
        </view>
        
        <!-- 开始按钮 -->
        <view v-if="!isPlaying" class="start-button" @click="startGame">
          {{ gameStatus === 'ready' ? '开始游戏' : '重新开始' }}
        </view>
        
        <!-- 游戏结束提示 -->
        <view v-if="gameStatus === 'ended'" class="game-over">
          <text>游戏结束！</text>
          <text>最终得分: {{ finalScore }}</text>
        </view>
      </view>
    </zx-giftrain>
    
    <!-- 设置面板 -->
    <view class="settings">
      <view class="setting-item">
        <text>难度:</text>
        <picker :value="difficultyIndex" :range="difficultyOptions" @change="changeDifficulty">
          <text>{{ difficultyOptions[difficultyIndex] }}</text>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      gameStatus: 'ready', // ready, playing, ended
      score: 0,
      finalScore: 0,
      timeLeft: 30,
      gameTime: 30000,
      difficulty: 5,
      difficultyIndex: 1,
      difficultyOptions: ['简单', '普通', '困难'],
      difficultySettings: {
        0: { rainNum: 3, generateInterval: 1000 },
        1: { rainNum: 5, generateInterval: 800 },
        2: { rainNum: 8, generateInterval: 600 }
      },
      timer: null
    }
  },
  methods: {
    startGame() {
      this.score = 0
      this.timeLeft = 30
      this.gameStatus = 'playing'
      this.$refs.giftrain.startRain()
    },
    
    handleGameStart() {
      this.isPlaying = true
      this.startTimer()
    },
    
    handleGameOver(result) {
      this.isPlaying = false
      this.gameStatus = 'ended'
      this.finalScore = result.clickedCount
      this.clearTimer()
    },
    
    handleRainClick(data) {
      this.score = data.clickedCount
      // 可以添加音效或动画效果
      uni.vibrateShort()
    },
    
    changeDifficulty(e) {
      this.difficultyIndex = e.detail.value
      const setting = this.difficultySettings[this.difficultyIndex]
      this.difficulty = setting.rainNum
    },
    
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          this.$refs.giftrain.stopRain()
        }
      }, 1000)
    },
    
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  
  beforeUnmount() {
    this.clearTimer()
  }
}
</script>
```

## 注意事项

1. **性能优化**: 组件内部已经做了性能优化，但在低端设备上建议适当降低红包数量和生成频率
2. **图片资源**: 建议使用压缩过的图片资源，以提高加载速度
3. **内存管理**: 组件会自动清理定时器和动画，无需手动处理
4. **多端兼容**: 组件使用 uni-app 标准组件开发，确保多端兼容性

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础红包雨功能
- 支持多端运行
- 提供丰富的配置选项