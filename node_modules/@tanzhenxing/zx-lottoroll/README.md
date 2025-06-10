# zx-lottoroll 老虎机抽奖

基于Vue3的老虎机抽奖组件，支持自定义奖品列表、转动圈数、转动时间等配置。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| √   | √          | √            | √          | √          | √        | √   |

## 基础用法

```vue
<template>
  <view>
    <zx-lottoroll
      ref="lottoRollRef"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      @start-turns="onStartTurns"
      @end-turns="onEndTurns"
    />
    <button @click="startLotto" :disabled="isRolling">开始抽奖</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const lottoRollRef = ref()
const isRolling = ref(false)
const prizeIndex = ref(-1)

const prizeList = ref([
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    text: '大鸡腿'
  },
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    text: 'VIP'
  },
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png',
    text: 'Apple watch'
  },
  {
    imagePath: 'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png',
    text: '坚果礼盒'
  },
  {
    imagePath: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png',
    text: '手机'
  }
])

const onStartTurns = () => {
  isRolling.value = true
  console.log('开始抽奖')
}

const onEndTurns = () => {
  isRolling.value = false
  console.log('抽奖结束')
}

const startLotto = () => {
  // 设置中奖索引（-1为随机）
  prizeIndex.value = Math.floor(Math.random() * prizeList.value.length)
  lottoRollRef.value.start()
}
</script>
```

## 指定中奖奖品

```vue
<template>
  <view>
    <zx-lottoroll
      ref="lottoRollRef"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      @start-turns="onStartTurns"
      @end-turns="onEndTurns"
    />
    <view class="btn-group">
      <button @click="startWin" :disabled="isRolling">中奖（测试）</button>
      <button @click="startLose" :disabled="isRolling">不中奖（测试）</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const lottoRollRef = ref()
const isRolling = ref(false)
const prizeIndex = ref(-1)

const prizeList = ref([
  { imagePath: '/static/prize1.png', text: '一等奖' },
  { imagePath: '/static/prize2.png', text: '二等奖' },
  { imagePath: '/static/prize3.png', text: '三等奖' },
  { imagePath: '/static/thanks.png', text: '谢谢参与' }
])

const onStartTurns = () => {
  isRolling.value = true
}

const onEndTurns = () => {
  isRolling.value = false
}

const startWin = () => {
  // 指定中奖索引
  prizeIndex.value = Math.floor(Math.random() * 3) // 0-2为中奖
  lottoRollRef.value.start()
}

const startLose = () => {
  // 指定不中奖
  prizeIndex.value = 3 // 谢谢参与
  lottoRollRef.value.start()
}
</script>
```

## 自定义样式

```vue
<template>
  <zx-lottoroll
    ref="lottoRollRef"
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    width="120px"
    height="300px"
    item-height="80px"
    background-color="#f8f9fa"
    border-color="#007bff"
    indicator-color="#28a745"
    :turns-number="5"
    :turns-time="4000"
    @start-turns="onStartTurns"
    @end-turns="onEndTurns"
  />
</template>

<script setup>
import { ref } from 'vue'

const lottoRollRef = ref()
const prizeIndex = ref(-1)

const prizeList = ref([
  { imagePath: '/static/diamond.png', text: '钻石' },
  { imagePath: '/static/gold.png', text: '黄金' },
  { imagePath: '/static/silver.png', text: '白银' },
  { imagePath: '/static/bronze.png', text: '青铜' }
])

const onStartTurns = () => {
  console.log('开始转动')
}

const onEndTurns = () => {
  console.log('转动结束')
}
</script>
```

## 纯文字模式

```vue
<template>
  <zx-lottoroll
    ref="lottoRollRef"
    :prize-list="textPrizeList"
    :prize-index="prizeIndex"
    @start-turns="onStartTurns"
    @end-turns="onEndTurns"
  />
</template>

<script setup>
import { ref } from 'vue'

const lottoRollRef = ref()
const prizeIndex = ref(-1)

// 纯文字奖品列表
const textPrizeList = ref([
  { text: '1000元现金' },
  { text: '500元优惠券' },
  { text: '100元红包' },
  { text: '50元话费' },
  { text: '谢谢参与' }
])

const onStartTurns = () => {
  console.log('开始抽奖')
}

const onEndTurns = () => {
  console.log('抽奖结束')
}
</script>
```

## 重置老虎机

```vue
<template>
  <view>
    <zx-lottoroll
      ref="lottoRollRef"
      :prize-list="prizeList"
      :prize-index="prizeIndex"
      @start-turns="onStartTurns"
      @end-turns="onEndTurns"
    />
    <view class="btn-group">
      <button @click="startLotto" :disabled="isRolling">开始抽奖</button>
      <button @click="resetLotto" :disabled="isRolling">重置</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const lottoRollRef = ref()
const isRolling = ref(false)
const prizeIndex = ref(-1)

const prizeList = ref([
  { text: '奖品1' },
  { text: '奖品2' },
  { text: '奖品3' }
])

const onStartTurns = () => {
  isRolling.value = true
}

const onEndTurns = () => {
  isRolling.value = false
}

const startLotto = () => {
  prizeIndex.value = Math.floor(Math.random() * prizeList.value.length)
  lottoRollRef.value.start()
}

const resetLotto = () => {
  lottoRollRef.value.reset()
}
</script>
```

## Props

| 字段 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prize-list | 奖品列表，每项包含imagePath和text字段 | Array | [] |
| prize-index | 中奖奖品索引，-1为随机，>=0为指定索引 | Number | -1 |
| turns-number | 转动圈数 | Number | 3 |
| turns-time | 转动时间（毫秒） | Number | 3000 |
| height | 容器高度 | String | '200px' |
| width | 容器宽度 | String | '100px' |
| item-height | 奖品项高度 | String | '60px' |
| background-color | 背景颜色 | String | '#ffffff' |
| border-color | 边框颜色 | String | '#e5e5e5' |
| indicator-color | 指示器颜色 | String | '#ff6b6b' |

## Events

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| start-turns | 开始转动时的回调函数 | Function |
| end-turns | 转动结束时的回调函数 | Function |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| start | 开始转动 | - |
| reset | 重置老虎机到初始状态 | - |

## 奖品列表数据格式

```javascript
const prizeList = [
  {
    imagePath: 'https://example.com/image1.png', // 奖品图片地址（可选）
    text: '奖品名称' // 奖品文字描述（可选）
  },
  // ... 更多奖品
]
```

**注意：** imagePath和text至少要有一个，可以同时存在。

## 注意事项

1. 组件基于CSS transform实现动画效果，性能较好
2. 奖品列表建议不少于3项，以获得更好的视觉效果
3. 转动时间建议设置在2000-5000毫秒之间
4. 转动圈数建议设置在2-5圈之间
5. 在转动过程中调用start方法无效，需要等待当前转动结束
6. 图片资源建议使用网络地址或本地静态资源

## 常见问题

### Q: 如何实现服务端控制中奖结果？
A: 在调用start方法前，先请求服务端接口获取中奖结果，然后设置prizeIndex为对应的索引值。

### Q: 如何自定义转动动画效果？
A: 可以通过修改CSS中的transition属性来调整动画曲线，默认使用cubic-bezier(0.25, 0.46, 0.45, 0.94)。

### Q: 奖品项高度如何自适应？
A: 建议根据容器高度和期望显示的奖品数量来计算item-height，确保视觉效果最佳。

### Q: 如何处理奖品图片加载失败？
A: 可以为image标签添加@error事件处理图片加载失败的情况，或者提供默认占位图。