# zx-turntable 转盘抽奖

一个可配置的转盘抽奖组件，支持 H5、小程序和 App。

## 使用方法

```vue
<template>
  <view>
    <zx-turntable
      ref="turntable"
      :rewardNames="rewards"
      :rewardBGColors="bgColors"
      :rewardColors="textColors"
      :turns="5"
      :duration="6000"
      @end="onLotteryEnd"
    />
    <button @click="startLottery">开始抽奖</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const turntable = ref(null);
const rewards = ref(['奖品1', '奖品2', '奖品3', '奖品4', '奖品5', '奖品6']);
const bgColors = ref(['#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4']);
const textColors = ref(['#C70000', '#8C0000', '#C70000', '#8C0000', '#C70000', '#8C0000']);

const startLottery = () => {
  if (turntable.value && !turntable.value.isSpinning) {
    const randomIndex = Math.floor(Math.random() * rewards.value.length);
    turntable.value.spinTo(randomIndex);
  }
};

const onLotteryEnd = (index) => {
  console.log('抽奖结束，中奖索引:', index, '奖品为:', rewards.value[index]);
  uni.showToast({
    title: `恭喜你抽中：${rewards.value[index]}`,
    icon: 'none'
  });
};
</script>
```

## API

### Props

| 属性名         | 类型    | 默认值                                  | 说明                                     |
| -------------- | ------- | --------------------------------------- | ---------------------------------------- |
| rewardNames    | Array   | `['', '', '', '', '', '']`             | 奖品名称数组                             |
| rewardBGColors | Array   | `[]` (内部有默认颜色)                   | 奖品扇区背景颜色数组，数量不足时循环使用默认颜色 |
| rewardColors   | Array   | `[]` (内部有默认颜色)                   | 奖品文字颜色数组，数量不足时循环使用默认颜色   |
| fontSize       | String  | `'32rpx'`                               | 奖品文字大小                             |
| turns          | Number  | `6`                                     | 转盘转动圈数                             |
| duration       | Number  | `5000`                                  | 转盘转动时间 (毫秒)                      |

### Events

| 事件名 | 回调参数 | 说明         |
| ------ | -------- | ------------ |
| end    | `index`  | 抽奖结束时触发，返回中奖奖品的索引 |

### Methods

通过 `ref` 获取组件实例后，可以调用以下方法：

| 方法名   | 参数        | 说明                                         |
| -------- | ----------- | -------------------------------------------- |
| init     | -           | 初始化转盘（通常在 `onMounted` 后自动调用）      |
| spinTo   | `targetIndex` | 转动到指定的奖品索引                         |
| isSpinning | - (getter)  | 返回一个布尔值，表示转盘当前是否正在转动     |

## 注意事项

- 奖品数量至少为2个，建议为偶数个，以获得更好的视觉效果。
- `rewardBGColors` 和 `rewardColors` 数组的长度如果小于 `rewardNames` 的长度，组件会使用内置的默认颜色进行补充。
- 确保在调用 `spinTo` 方法前，转盘已经初始化完成（通常是自动的）。
- `spinTo` 方法的 `targetIndex` 参数必须是 `rewardNames` 数组中的有效索引。