# zx-marquee 跑马灯抽奖

用于跑马灯抽奖场景的组件，支持自定义奖品、样式等配置。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| √   | √          | √            | √          | √          | √        | √   |

## 基础用法

```vue
<template>
  <zx-marquee
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    :speed="100"
    :circle="40"
    @start-turns="startTurns"
    @end-turns="endTurns"
  />
</template>

<script setup>
import { ref } from 'vue'

const prizeList = ref([
  {
    id: 'xiaomi',
    prizeName: '小米手机',
    prizeImg: 'https://example.com/phone.png'
  },
  {
    id: 'bluetooth',
    prizeName: '蓝牙耳机',
    prizeImg: 'https://example.com/bluetooth.png'
  },
  {
    id: 'thanks',
    prizeName: '谢谢参与',
    prizeImg: 'https://example.com/thanks.png'
  },
  {
    id: 'watch',
    prizeName: 'Apple Watch',
    prizeImg: 'https://example.com/watch.png'
  },
  {
    id: 'fruit',
    prizeName: '迪士尼苹果',
    prizeImg: 'https://example.com/fruit.png'
  },
  {
    id: 'thanks2',
    prizeName: '谢谢参与',
    prizeImg: 'https://example.com/thanks.png'
  },
  {
    id: 'seafood',
    prizeName: '海鲜套餐',
    prizeImg: 'https://example.com/seafood.png'
  },
  {
    id: 'thanks3',
    prizeName: '谢谢参与',
    prizeImg: 'https://example.com/thanks.png'
  }
])

const prizeIndex = ref(-1)

const startTurns = () => {
  // 模拟接口请求获取中奖结果
  const index = Math.floor(Math.random() * prizeList.value.length)
  prizeIndex.value = index
}

const endTurns = () => {
  console.log('抽奖结束，中奖奖品：', prizeList.value[prizeIndex.value])
}
</script>
```

## 自定义样式

```vue
<template>
  <zx-marquee
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    :style-opt="styleOpt"
    width="350px"
    height="350px"
    start-text="抽奖"
    @start-turns="startTurns"
    @end-turns="endTurns"
  />
</template>

<script setup>
const styleOpt = {
  bgStyle: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)'
  },
  prizeItemStyle: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px'
  },
  startBtnStyle: {
    background: 'linear-gradient(45deg, #f093fb, #f5576c)',
    width: '80px',
    height: '80px'
  }
}
</script>
```

## 自定义开始按钮

```vue
<template>
  <zx-marquee
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
    <template #start>
      <view class="custom-start-btn">
        <image src="/static/start-icon.png" />
        <text>开始抽奖</text>
      </view>
    </template>
  </zx-marquee>
</template>

<style>
.custom-start-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prize-list | 奖品列表 | Array | [] |
| prize-index | 中奖奖品在列表的索引位置 | Number | -1 |
| speed | 转动速度(毫秒) | Number | 150 |
| circle | 转动圈数 | Number | 30 |
| width | 容器宽度 | String | '300px' |
| height | 容器高度 | String | '300px' |
| start-text | 开始按钮文字 | String | '开始' |
| style-opt | 样式配置对象 | Object | 见下方说明 |

### styleOpt 配置

```javascript
{
  // 背景样式
  bgStyle: {
    background: 'linear-gradient(45deg, #FFE795, #FFF7DF)'
  },
  // 奖品项样式
  prizeItemStyle: {},
  // 开始按钮样式
  startBtnStyle: {}
}
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| start-turns | 开始跑动的回调函数 | - |
| end-turns | 停止跑动后的回调函数 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| start | 自定义开始按钮内容 |

### 奖品数据格式

```javascript
[
  {
    id: 'unique-id',        // 奖品唯一标识
    prizeName: '奖品名称',   // 奖品名称
    prizeImg: '图片地址'     // 奖品图片(可选)
  }
]
```

## 注意事项

1. 奖品列表固定为8个位置，按顺序排列
2. `prize-index` 需要在 `start-turns` 事件中设置，用于指定中奖位置
3. 组件会自动处理转动动画和停止逻辑
4. 支持自定义样式，可通过 `style-opt` 配置
5. 兼容 H5、小程序、App 等多端平台

## 更新日志

### v1.0.0
- 初始版本
- 支持基础跑马灯抽奖功能
- 支持自定义样式配置
- 支持多端兼容