# Giftbox 神秘礼盒

神秘礼盒组件，支持自定义颜色、尺寸、动画效果等，适用于抽奖、活动等场景。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| √   | √          | √            | √          | √          | √        | √   |

## 基础用法

```vue
<template>
  <zx-giftbox 
    prize-text="恭喜获得1000元红包" 
    @start-turns="handleStart"
    @end-turns="handleEnd"
  />
</template>

<script setup>
const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}
</script>
```

## 自定义颜色

```vue
<template>
  <zx-giftbox
    box-color="#4ECDC4"
    lid-color="#45B7D1"
    ribbon-color="#FF6B6B"
    prize-text="恭喜获得特等奖"
    @start-turns="handleStart"
    @end-turns="handleEnd"
  />
</template>

<script setup>
const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}
</script>
```

## 自定义尺寸

```vue
<template>
  <zx-giftbox
    width="250px"
    height="250px"
    prize-text="恭喜获得豪华大奖"
    prize-text-size="20px"
    prize-text-color="#FF6B6B"
    @start-turns="handleStart"
    @end-turns="handleEnd"
  />
</template>

<script setup>
const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}
</script>
```

## 自定义动画

```vue
<template>
  <zx-giftbox
    :duration="500"
    :show-particle-effect="false"
    prize-text="快速开启礼盒"
    @start-turns="handleStart"
    @end-turns="handleEnd"
  />
</template>

<script setup>
const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}
</script>
```

## 重置功能

```vue
<template>
  <view>
    <zx-giftbox
      ref="giftboxRef"
      prize-text="可重置的礼盒"
      @start-turns="handleStart"
      @end-turns="handleEnd"
    />
    <button @click="resetGiftbox">重置礼盒</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const giftboxRef = ref()

const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}

const resetGiftbox = () => {
  if (giftboxRef.value) {
    giftboxRef.value.init()
  }
}
</script>
```

## 禁用状态

```vue
<template>
  <view>
    <zx-giftbox
      :disabled="isDisabled"
      prize-text="禁用状态"
      @start-turns="handleStart"
      @end-turns="handleEnd"
    />
    <button @click="toggleDisabled">
      {{ isDisabled ? '启用' : '禁用' }}礼盒
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isDisabled = ref(false)

const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}
</script>
```

## 自定义内容插槽

```vue
<template>
  <zx-giftbox
    @start-turns="handleStart"
    @end-turns="handleEnd"
  >
    <template #prize>
      <view class="custom-prize">
        <image class="prize-icon" src="/static/images/gift.png" />
        <view class="prize-title">恭喜获得</view>
        <view class="prize-name">超级大奖</view>
        <view class="prize-value">￥10,000</view>
      </view>
    </template>
  </zx-giftbox>
</template>

<script setup>
const handleStart = () => {
  console.log('礼盒开始打开')
}

const handleEnd = () => {
  console.log('礼盒打开完成')
}
</script>

<style>
.custom-prize {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.prize-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.prize-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.prize-name {
  font-size: 16px;
  font-weight: bold;
  color: #E056FD;
  margin-bottom: 4px;
}

.prize-value {
  font-size: 18px;
  font-weight: bold;
  color: #FF6B6B;
}
</style>
```

## 异步奖品

```vue
<template>
  <zx-giftbox
    :prize-text="asyncPrize"
    @start-turns="handleAsyncStart"
    @end-turns="handleAsyncEnd"
  />
</template>

<script setup>
import { ref } from 'vue'

const asyncPrize = ref('加载中...')

const handleAsyncStart = () => {
  console.log('异步礼盒开始打开')
  
  // 模拟异步加载奖品信息
  setTimeout(() => {
    const prizes = [
      '恭喜获得iPhone 15',
      '恭喜获得MacBook Pro',
      '恭喜获得1000元红包',
      '谢谢参与'
    ]
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
    asyncPrize.value = randomPrize
  }, 800)
}

const handleAsyncEnd = () => {
  console.log('异步礼盒打开完成')
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 礼盒宽度 | String | '200px' |
| height | 礼盒高度 | String | '200px' |
| box-color | 礼盒颜色 | String | '#FF6B6B' |
| lid-color | 盖子颜色 | String | '#FF5252' |
| ribbon-color | 丝带颜色 | String | '#FFD700' |
| prize-text | 奖品文本 | String | '恭喜获奖！' |
| prize-text-color | 奖品文本颜色 | String | '#FF6B6B' |
| prize-text-size | 奖品文本大小 | String | '16px' |
| click-text | 点击提示文本 | String | '点击打开' |
| disabled | 是否禁用 | Boolean | false |
| duration | 动画持续时间(ms) | Number | 1000 |
| show-particle-effect | 是否显示粒子效果 | Boolean | true |
| particle-count | 粒子数量 | Number | 20 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| start-turns | 礼盒开始打开时触发 | - |
| end-turns | 礼盒打开完成时触发 | - |
| click | 点击礼盒时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| prize | 自定义奖品内容 |

### Methods

通过 ref 可以获取到 Giftbox 实例并调用实例方法。

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| init | 重置礼盒到初始状态 | - |
| openGiftbox | 手动打开礼盒 | - |

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
:root {
  --zx-giftbox-border-radius: 8px;
  --zx-giftbox-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  --zx-giftbox-ribbon-gradient: linear-gradient(45deg, #FFD700, #FFA500);
  --zx-giftbox-content-bg: rgba(255, 255, 255, 0.9);
  --zx-giftbox-light-color: rgba(255, 255, 0, 0.3);
}
```

## 注意事项

1. 组件使用了 CSS3 动画和变换，在低版本浏览器中可能存在兼容性问题
2. 粒子效果会消耗一定的性能，在低端设备上建议关闭或减少粒子数量
3. 组件支持响应式设计，会根据容器大小自动调整
4. 建议在使用前先调用 `init()` 方法确保组件处于初始状态
5. 异步加载奖品信息时，建议在 `start-turns` 事件中开始加载，在动画完成前完成数据更新

## 更新日志

### v1.0.0

- 初始版本
- 支持基础的礼盒打开动画
- 支持自定义颜色、尺寸、文本
- 支持粒子效果
- 支持重置功能
- 支持禁用状态
- 支持自定义内容插槽