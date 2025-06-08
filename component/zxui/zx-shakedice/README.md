# zx-shakedice 摇骰子组件

一个支持 H5、小程序、App 的 3D 摇骰子组件，提供真实的骰子摇动和滚动效果。

## 功能特点

- 🎲 3D 骰子效果，支持六个面显示
- 🎯 可指定摇出的结果或随机生成
- ⏱️ 可自定义摇动时间和速度
- 🎨 支持自定义骰子颜色、大小等样式
- 📱 完美支持 H5、小程序、App 多端
- 🚀 使用 Vue 3 Composition API 开发

## 基础用法

```vue
<template>
  <zx-shakedice 
    ref="diceRef"
    :id="targetResult"
    @shake="onShake"
    @end="onEnd"
  />
</template>

<script setup>
import { ref } from 'vue'

const diceRef = ref()
const targetResult = ref(-1) // -1 表示随机结果

const onShake = () => {
  console.log('开始摇骰子')
}

const onEnd = (result) => {
  console.log('摇骰子结束，结果:', result)
}

// 手动触发摇骰子
const shake = () => {
  diceRef.value.shake()
}
</script>
```

## 指定结果

```vue
<template>
  <zx-shakedice 
    :id="5"
    :time="2000"
    @end="onEnd"
  />
</template>

<script setup>
const onEnd = (result) => {
  console.log('摇出了:', result) // 总是输出 5
}
</script>
```

## 自定义样式

```vue
<template>
  <zx-shakedice 
    width="400px"
    height="500px"
    dice-size="100px"
    dice-color="#ff6b35"
    dot-color="#ffffff"
    button-text="开始摇动"
  />
</template>
```

## 隐藏按钮，手动控制

```vue
<template>
  <zx-shakedice 
    ref="diceRef"
    :show-button="false"
    :show-result="false"
  />
  
  <button @click="startShake">自定义摇动按钮</button>
</template>

<script setup>
import { ref } from 'vue'

const diceRef = ref()

const startShake = () => {
  diceRef.value.shake()
}
</script>
```

## Props 参数

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 容器宽度 | String | '300px' |
| height | 容器高度 | String | '400px' |
| id | 指定结果 (1-6，-1表示随机) | Number | -1 |
| time | 摇动时间 (毫秒) | String/Number | 3000 |
| speed | 旋转速度 (几秒一圈) | Number | 1 |
| show-result | 是否显示结果 | Boolean | true |
| show-button | 是否显示摇动按钮 | Boolean | true |
| button-text | 按钮文字 | String | '摇动' |
| dice-size | 骰子大小 | String | '80px' |
| dice-color | 骰子颜色 | String | '#ffffff' |
| dot-color | 点的颜色 | String | '#333333' |

## Events 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| shake | 骰子开始摇动 | - |
| end | 骰子摇动结束 | result: 摇出的结果 (1-6) |

## Methods 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| shake | 开始摇骰子 | - |
| reset | 重置骰子状态 | - |

## 使用示例

### 基础摇骰子

```vue
<template>
  <view class="demo">
    <zx-shakedice 
      @shake="onShake"
      @end="onEnd"
    />
  </view>
</template>

<script setup>
const onShake = () => {
  uni.showToast({
    title: '开始摇骰子',
    icon: 'none'
  })
}

const onEnd = (result) => {
  uni.showToast({
    title: `摇出了 ${result} 点`,
    icon: 'success'
  })
}
</script>
```

### 游戏应用场景

```vue
<template>
  <view class="game">
    <zx-shakedice 
      ref="diceRef"
      :id="gameResult"
      :show-button="false"
      @end="onGameEnd"
    />
    
    <button 
      @click="playGame"
      :disabled="isPlaying"
    >
      {{ isPlaying ? '游戏中...' : '开始游戏' }}
    </button>
    
    <view class="score">
      总分: {{ totalScore }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const diceRef = ref()
const gameResult = ref(-1)
const isPlaying = ref(false)
const totalScore = ref(0)

const playGame = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  gameResult.value = -1 // 随机结果
  diceRef.value.shake()
}

const onGameEnd = (result) => {
  totalScore.value += result
  isPlaying.value = false
  
  uni.showToast({
    title: `获得 ${result} 分！`,
    icon: 'success'
  })
}
</script>
```

## 注意事项

1. **兼容性**: 组件使用 CSS 3D 变换，在低版本浏览器或小程序中可能效果有差异
2. **性能**: 摇动动画会频繁更新 DOM，建议合理设置摇动时间
3. **样式**: 骰子使用绝对定位和 3D 变换，请确保父容器有足够空间
4. **事件**: 摇动过程中会禁用按钮，避免重复触发

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础摇骰子功能
- 支持自定义样式和结果
- 完美兼容多端平台