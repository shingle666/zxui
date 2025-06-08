# zx-square-nine 九宫格抽奖组件

`zx-square-nine` 是一个用于实现九宫格抽奖效果的 Vue 组件，适用于 H5、小程序和 App 端。

## 特性

- 支持自定义奖品列表。
- 支持指定中奖奖品。
- 可配置卡片翻转动画。
- 可配置洗牌动画。
- 提供了开始/返回按钮的插槽。
- 跨平台兼容 (H5, 小程序, App)。

## 使用方法

### 引入组件

```vue
<script setup>
import ZxSquareNine from '@/components/zx-square-nine/zx-square-nine.vue';
// ...
</script>
```

### 基本用法

```vue
<template>
  <view class="container">
    <ZxSquareNine
      :prize-list="prizes"
      :prize-id="winningPrizeId"
      :card-img="cardBackImg"
      @start="handleStart"
      @click="handleClick"
      @end="handleEnd"
      @return="handleReturn"
    />
    <button @click="setWinner">指定中奖</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import ZxSquareNine from '@/components/zx-square-nine/zx-square-nine.vue';

const cardBackImg = ref('https://img12.360buyimg.com/imagetools/jfs/t1/160909/31/22531/4759/60e6bc51E8c977632/a0f91c40a7dc0961.png'); // 卡片背面图片

const prizes = ref([
  { id: 1, name: '奖品A', pictureUrl: 'https://via.placeholder.com/50/FF0000/FFFFFF?Text=A' },
  { id: 2, name: '奖品B', pictureUrl: 'https://via.placeholder.com/50/00FF00/FFFFFF?Text=B' },
  { id: 3, name: '奖品C', pictureUrl: 'https://via.placeholder.com/50/0000FF/FFFFFF?Text=C' },
  { id: 4, name: '奖品D', pictureUrl: 'https://via.placeholder.com/50/FFFF00/000000?Text=D' },
  // 中心位置通常由组件内部处理或留空，如果prizeList包含8个元素，则第5个位置（索引4）将是中心按钮
  // 如果prizeList包含9个元素，则索引4的元素会作为普通奖品项，除非其特殊标记
  { id: 5, name: '奖品E', pictureUrl: 'https://via.placeholder.com/50/FF00FF/FFFFFF?Text=E' },
  { id: 6, name: '奖品F', pictureUrl: 'https://via.placeholder.com/50/00FFFF/000000?Text=F' },
  { id: 7, name: '奖品G', pictureUrl: 'https://via.placeholder.com/50/FFA500/FFFFFF?Text=G' },
  { id: 8, name: '奖品H', pictureUrl: 'https://via.placeholder.com/50/800080/FFFFFF?Text=H' },
]);

const winningPrizeId = ref(null); // 初始无中奖奖品，点击开始后随机或指定

const handleStart = () => {
  console.log('抽奖开始');
  // 可以在这里决定本次的中奖ID，如果不是由父组件预设的话
  if (!winningPrizeId.value) {
    const randomIndex = Math.floor(Math.random() * prizes.value.filter(p => p.id !== undefined).length);
    const randomPrize = prizes.value.filter(p => p.id !== undefined)[randomIndex];
    winningPrizeId.value = randomPrize.id;
    console.log('本次中奖ID:', winningPrizeId.value);
  }
};

const handleClick = (item) => {
  console.log('点击卡片:', item);
};

const handleEnd = (item) => {
  console.log('抽奖结束，中奖:', item);
  // 重置 winningPrizeId 以便下次可以重新随机或指定
  // winningPrizeId.value = null; 
};

const handleReturn = () => {
  console.log('返回初始状态');
  winningPrizeId.value = null; // 清空中奖ID，以便下次重新开始
};

const setWinner = () => {
  const newWinnerId = prizes.value[Math.floor(Math.random() * prizes.value.length)].id;
  winningPrizeId.value = newWinnerId;
  console.log('已指定新的中奖ID:', newWinnerId);
  uni.showToast({title: `已指定中奖ID: ${newWinnerId}`, icon: 'none'});
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}
button {
    margin-top: 20px;
}
</style>
```

## API

### Props

| 属性名            | 说明                                                                 | 类型           | 默认值     | 
|-------------------|----------------------------------------------------------------------|----------------|------------|
| `prizeList`       | 奖品列表，数组包含对象，每个对象至少有 `id` 和 `name`，可选 `pictureUrl` | Array          | `[]`       |
| `prizeId`         | 中奖奖品的 `id`                                                        | Number / String | `null`     |
| `cardImg`         | 卡片背面的图片 URL                                                       | String         | `''`       |
| `shuffleDuration` | 洗牌动画总时长 (毫秒)                                                    | Number         | `1500`     |
| `shuffleItemDelay`| 洗牌时每个卡片移动的延迟 (毫秒)                                            | Number         | `150`      |

**prizeList Item 结构:**

| 键           | 说明       | 类型   | 是否必须 |
|--------------|------------|--------|----------|
| `id`         | 奖品唯一标识 | Number/String | 是       |
| `name`       | 奖品名称   | String | 是       |
| `pictureUrl` | 奖品图片URL | String | 否       |

### Events

| 事件名    | 说明                                         | 回调参数                 |
|-----------|----------------------------------------------|--------------------------|
| `click`   | 点击任意一张可翻转的卡片时触发                 | `item`: 被点击的卡片对象 |
| `start`   | 点击开始抽奖按钮时触发                       | -                        |
| `end`     | 抽奖动画结束，确定中奖结果后触发             | `item`: 中奖的卡片对象   |
| `return`  | 点击返回按钮，回到初始状态时触发             | -                        |

### Slots

| 名称       | 说明                     |
|------------|--------------------------|
| `startBtn` | 自定义九宫格中间的开始按钮 |

**startBtn Slot 用法示例:**

```vue
<ZxSquareNine :prize-list="prizes" :prize-id="winningPrizeId">
  <template #startBtn>
    <view style="background-color: lightblue; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; border-radius: 6px;" @click="customStartAction">
      <text style="font-weight:bold;">自定义开始</text>
      <text style="font-size:10px;">点我抽奖</text>
    </view>
  </template>
</ZxSquareNine>
```

## 注意事项

- `prizeList` 数组长度建议为8个，组件会自动在中间（索引4）插入操作按钮区域。如果提供9个元素，则第5个元素（索引4）将被视为普通奖品项，除非它是一个空对象 `{}` 或具有特殊标记（如 `isCenterPlaceholder: true`），这种情况下它仍会被替换为操作按钮。
- `prizeId` 必须是 `prizeList` 中某个奖品的 `id`。
- 组件内部的动画效果尽量使用 CSS Transform 和 Transition 实现，以保证性能和跨平台兼容性。
- 为确保小程序和App端的表现一致性，避免使用浏览器特有的DOM API进行复杂计算和操作。组件内部已尽量规避此类用法。
- 图片请使用 `image` 标签，并注意其 `mode` 属性以获得最佳显示效果。