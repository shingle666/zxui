# zx-scratchcard 刮刮卡

基于canvas的刮刮卡组件，支持自定义刮开层颜色、图片、刮开比例等配置。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| √   | √          | √            | √          | √          | √        | √   |

## 基础用法

```vue
<template>
  <zx-scratchcard content="恭喜中奖1000元" @open="handleOpen" />
</template>

<script setup>
const handleOpen = () => {
  console.log('刮开了！')
}
</script>
```

## 异步数据

```vue
<template>
  <zx-scratchcard :content="prizeContent" @open="handleOpen" />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const prizeContent = ref('')

onMounted(() => {
  setTimeout(() => {
    prizeContent.value = '恭喜获得iPhone 15'
  }, 2000)
})

const handleOpen = () => {
  console.log('刮开了！')
}
</script>
```

## 自定义颜色

```vue
<template>
  <zx-scratchcard
    cover-color="#F9CC9D"
    background-color="#C3D08B"
    content="<em>1000</em><strong>元</strong>"
    @open="handleOpen"
  />
</template>

<script setup>
const handleOpen = () => {
  console.log('刮开了！')
}
</script>
```

## 背景图片

```vue
<template>
  <zx-scratchcard
    content="恭喜中奖1000万"
    :cover-img="coverImage"
    @open="handleOpen"
  />
</template>

<script setup>
import { ref } from 'vue'

const coverImage = ref('https://example.com/cover.jpg')

const handleOpen = () => {
  console.log('刮开了！')
}
</script>
```

## 自定义尺寸和样式

```vue
<template>
  <zx-scratchcard
    width="400px"
    height="200px"
    font-size="24px"
    cover-color="#FF6B6B"
    background-color="#4ECDC4"
    cover-text="刮开有惊喜"
    cover-text-color="#FFFFFF"
    cover-text-size="18px"
    content="恭喜获得特等奖"
    @open="handleOpen"
  />
</template>

<script setup>
const handleOpen = () => {
  console.log('刮开了！')
}
</script>
```

## 设置刮开比例

```vue
<template>
  <zx-scratchcard
    content="恭喜中奖1000万"
    :ratio="0.3"
    @open="handleOpen"
  />
</template>

<script setup>
const handleOpen = () => {
  console.log('只需要刮开30%就触发事件！')
}
</script>
```

## 重置刮刮卡

```vue
<template>
  <view>
    <zx-scratchcard
      ref="scratchcardRef"
      content="恭喜中奖1000元"
      @open="handleOpen"
    />
    <button @click="resetCard">重置</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const scratchcardRef = ref()

const handleOpen = () => {
  console.log('刮开了！')
}

const resetCard = () => {
  scratchcardRef.value?.reset()
}
</script>
```

## Props

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 奖项信息，支持html | String | '' |
| height | 卡片高度 | String | '50px' |
| width | 卡片宽度 | String | '300px' |
| cover-color | 刮开层颜色 | String | '#C5C5C5' |
| cover-img | 刮开层图片（设置此项后cover-color失效） | String | '' |
| font-size | 中奖信息字号 | String | '20px' |
| background-color | 内容层背景颜色 | String | '#FFFFFF' |
| ratio | 触发事件的刮开比例（0-1之间） | Number | 0.8 |
| cover-text | 刮刮层文字 | String | '刮一刮' |
| cover-text-color | 刮刮层文字颜色 | String | '#FFFFFF' |
| cover-text-size | 刮刮层文字大小 | String | '16px' |

## Events

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| open | 刮开后回调函数 | Function |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| reset | 重置刮刮卡 | - |

## 注意事项

1. 组件基于canvas实现，在不同平台上可能存在性能差异
2. 图片资源建议使用网络地址或base64格式
3. 在小程序中使用时，需要确保canvas-id的唯一性
4. 刮开比例ratio建议设置在0.3-0.8之间，过小可能导致误触发，过大可能影响用户体验
5. 组件会自动适配高清屏幕，无需额外处理

## 常见问题

### Q: 为什么在某些情况下canvas不显示？
A: 请确保组件已经正确挂载，可以尝试在nextTick中初始化或添加适当的延时。

### Q: 如何实现更复杂的刮开效果？
A: 可以通过修改scratch方法中的绘制逻辑来实现不同的刮开效果，比如改变刮除半径、形状等。

### Q: 在小程序中性能如何优化？
A: 建议合理设置刮开比例，避免过于频繁的重绘操作，必要时可以添加节流处理。