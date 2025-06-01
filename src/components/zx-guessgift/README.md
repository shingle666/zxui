# zx-guessgift 你藏我猜

`zx-guessgift` 是一个你藏我猜游戏组件，用于盲猜或考验眼力的游戏，支持 H5、小程序、App 多端运行。可配置动画速度、开始结束回调、图片等。

## 特性

- 🎮 模拟真实的你藏我猜游戏体验
- 📱 兼容 H5、小程序、App 多端
- 🎯 支持自定义中奖逻辑和奖品图片
- ⚡ 流畅的动画效果和交互体验
- 🎨 支持自定义碗和奖品图片
- 🔧 灵活的配置选项

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-guessgift
      ref="guessgift"
      width="100%"
      height="400px"
      :prize-index="prizeIndex"
      :turns-number="turnNum"
      @start-turns="startTurns"
      @end-turns="endTurns"
      @bowl-click="onBowlClick"
    />
    <button @click="gameStart">开始游戏</button>
  </view>
</template>

<script>
import ZxGuessgift from '@/components/zx-guessgift/zx-guessgift.vue'

export default {
  components: {
    ZxGuessgift
  },
  data() {
    return {
      // 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
      prizeIndex: 1,
      turnNum: 20
    }
  },
  methods: {
    gameStart() {
      this.$refs.guessgift.start()
    },
    startTurns() {
      console.log('开始抽奖')
    },
    endTurns() {
      console.log('抽奖结束')
    },
    onBowlClick(result) {
      console.log('点击碗:', result)
      if (result.isWin) {
        console.log('恭喜中奖!')
      } else {
        console.log('很遗憾，没有中奖')
      }
    }
  }
}
</script>
```

### 自定义样式

```vue
<template>
  <zx-guessgift
    width="375px"
    height="500px"
    :turns-number="30"
    :turns-frequency="300"
    :raise-height="60"
    :prize-index="2"
    bowl-img="/static/custom-bowl.png"
    prize-img="/static/custom-prize.png"
    @start-turns="onStart"
    @end-turns="onEnd"
    @bowl-click="onBowlClick"
  />
</template>
```

### 随机中奖

```vue
<template>
  <zx-guessgift
    :prize-index="-1"
    @bowl-click="onBowlClick"
  />
</template>

<script>
export default {
  methods: {
    onBowlClick(result) {
      // prize-index为-1时，组件会随机生成中奖位置
      console.log('中奖位置:', result.prizeIndex)
      console.log('是否中奖:', result.isWin)
    }
  }
}
</script>
```

## Props

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 组件宽度 | String | '100%' |
| height | 组件高度 | String | '400px' |
| turns-number | 交换次数 | Number | 20 |
| turns-time | 每个碗移动所用时间(毫秒) | Number | 0 |
| turns-frequency | 动画频率，位置交换更新(毫秒) | Number | 500 |
| raise-height | 碗抬起的高度(px) | Number | 50 |
| prize-index | 中奖奖品在列表的索引位置 | Number | -1 |
| bowl-img | 碗的图片地址 | String | 默认碗图片 |
| prize-img | 奖品图片地址 | String | 默认奖品图片 |

### prize-index 说明

- `-1`: 不中奖或随机中奖
- `0`: 第一个碗中奖
- `1`: 第二个碗中奖
- `2`: 第三个碗中奖

## Events

| 字段 | 说明 | 回调参数 |
|------|------|----------|
| start-turns | 碗开始换位 | - |
| end-turns | 碗停止换位 | - |
| bowl-click | 点击某个碗 | { index, isWin, prizeIndex } |

### bowl-click 回调参数说明

- `index`: 点击的碗的索引(0-2)
- `isWin`: 是否中奖
- `prizeIndex`: 实际中奖的碗索引

## Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| start | 手动开始游戏 | - |

## 样式变量

组件支持以下 CSS 变量自定义：

```css
.zx-guessgift {
  --bowl-size: 200rpx;           /* 碗的大小 */
  --bowl-gap: 40rpx;             /* 碗之间的间距 */
  --prize-size: 60rpx;           /* 奖品大小 */
  --button-bg: linear-gradient(45deg, #ff6b6b, #ee5a24); /* 按钮背景 */
  --container-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* 容器背景 */
}
```

## 注意事项

1. 组件使用 `view` 和 `image` 标签，兼容所有小程序平台
2. 动画使用 CSS3 transform，性能良好
3. 图片建议使用网络地址或本地静态资源
4. 组件高度建议不小于 300px，以保证良好的视觉效果
5. 在小程序中使用时，确保图片域名已添加到合法域名列表

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础的你藏我猜游戏功能
- 支持自定义样式和配置
- 兼容多端运行