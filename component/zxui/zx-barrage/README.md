# zx-barrage 弹幕组件

`zx-barrage` 是一个用于在 uniapp 应用中实现弹幕效果的组件，支持 H5、小程序和 App 端。它允许开发者轻松地在视频或其他内容区域展示滚动的评论性字幕。

## 特性

- **跨平台兼容**：专为 uniapp 设计，确保在 H5、小程序和 App 上的表现一致性。
- **Vue3 Setup**：使用 Vue 3 Composition API (`setup` 语法糖) 编写，代码更清晰易维护。
- **灵活配置**：提供丰富的 props 来自定义弹幕的行为，如行数、速度、颜色、字体大小等。
- **事件支持**：提供弹幕播放、暂停、结束等关键事件。
- **方法调用**：可以通过 `ref` 获取组件实例，并调用 `play`、`pause`、`add`、`clear` 等方法控制弹幕。
- **动态添加**：支持在运行时动态添加新的弹幕数据。
- **循环播放**：可选支持弹幕循环播放。

## 使用方法

### 引入组件

```vue
<script setup>
import zxBarrage from '@/components/zx-barrage/zx-barrage.vue'; // 请根据实际路径调整
import { ref } from 'vue';

const barrageList = ref([
  { id: 1, text: '第一条弹幕' },
  { id: 2, text: 'Hello ZXUI!' },
]);

const barrageRef = ref(null);

const addBarrage = () => {
  const newText = `新弹幕 ${Date.now()}`;
  // 方式一：直接修改 v-model 绑定的数据
  // barrageList.value.push({ id: Date.now(), text: newText });
  // 方式二：通过 ref 调用 add 方法 (推荐，可以处理内部ID等)
  barrageRef.value?.add({ text: newText });
};

const play = () => {
  barrageRef.value?.play();
};

const pause = () => {
  barrageRef.value?.pause();
};
</script>
```

### 基础用法

```vue
<template>
  <view>
    <view style="width: 100%; height: 200px; background-color: #000;">
      <zx-barrage ref="barrageRef" v-model="barrageList">
        <!-- 这里可以放置视频播放器或其他背景内容 -->
        <view style="width:100%; height: 100%; display:flex; align-items:center; justify-content:center;">
          <text style="color: white;">视频区域</text>
        </view>
      </zx-barrage>
    </view>
    <button @click="addBarrage">发送弹幕</button>
    <button @click="play">播放</button>
    <button @click="pause">暂停</button>
  </view>
</template>
```

## API

### Props

| 参数        | 说明                                                                 | 类型               | 默认值      |
| ----------- | -------------------------------------------------------------------- | ------------------ | ----------- |
| `v-model`   | 弹幕数据列表，数组元素为对象，至少包含 `text` 属性，建议有唯一 `id` | `Array<Object>`    | `[]`        |
| `autoPlay`  | 是否自动开始播放弹幕                                                   | `Boolean`          | `true`      |
| `rows`      | 弹幕显示的行数                                                         | `Number \| String` | `4`         |
| `top`       | 弹幕区域距离容器顶部的间距 (px)                                        | `Number \| String` | `10`        |
| `duration`  | 一条弹幕从出现到完全消失的平均持续时间 (ms)                              | `Number \| String` | `5000`      |
| `delay`     | 相邻弹幕在同一轨道出现的基础延迟时间 (ms)，实际会有小幅随机                 | `Number \| String` | `300`       |
| `loop`      | 是否循环播放弹幕，`true` 时弹幕播放完毕会重新进入队列                   | `Boolean`          | `false`     |
| `color`     | 全局弹幕文字颜色，单个弹幕可在数据项中通过 `color` 属性覆盖             | `String`           | `'#ffffff'` |
| `fontSize`  | 全局弹幕文字大小 (px)，单个弹幕可在数据项中通过 `fontSize` 属性覆盖     | `Number \| String` | `16`        |
| `trackHeight`| 弹幕轨道区域的总高度 (px)。若不设置或为0，则根据 `fontSize` 和 `rows` 自动计算 | `Number \| String` | `0`         |

**v-model 数据项 (BarrageItem) 示例:**

```javascript
{
  id: 1, // 可选但强烈推荐，用于唯一标识，方便更新和删除
  text: '这是一条弹幕', // 必选，弹幕文字内容
  color: '#FF0000', // 可选，覆盖全局弹幕颜色
  fontSize: 20, // 可选，覆盖全局字体大小 (px)
  // ...可以添加其他自定义属性，这些属性会在事件回调中透传
}
```

### Events

| 事件名            | 说明                                       | 回调参数                                   |
| ----------------- | ------------------------------------------ | ------------------------------------------ |
| `update:modelValue` | 当弹幕列表内部发生变化时触发（如非循环弹幕播放完毕后移除） | `(newModelValue: BarrageItem[])`           |
| `play`            | 调用 `play` 方法或自动播放开始时触发         | `-`                                        |
| `pause`           | 调用 `pause` 方法时触发                      | `-`                                        |
| `ended`           | 单条弹幕播放结束（完全移出可视区域）时触发   | `(endedItem: BarrageItem)`                 |

### Methods

通过 `ref` 获取到组件实例后，可以调用以下方法：

| 方法名  | 说明                                                                 | 参数                               |
| ------- | -------------------------------------------------------------------- | ---------------------------------- |
| `play()`  | 开始或继续播放弹幕                                                     | -                                  |
| `pause()` | 暂停播放弹幕                                                         | -                                  |
| `add(item: BarrageItem)` | 向弹幕队列中添加一条新的弹幕，并立即尝试调度播放（如果当前是播放状态） | `item`: 弹幕对象，至少包含 `text` 属性 |
| `clear()` | 清空当前所有弹幕（包括正在显示的和等待队列中的），并重置轨道状态         | -                                  |

## 注意事项

- **容器尺寸**：`zx-barrage` 组件本身会撑满其父容器，请确保父容器具有明确的宽度和高度，以便弹幕轨道正确计算。
- **性能**：同时显示大量弹幕可能会影响性能，尤其是在低端设备上。建议根据实际情况控制弹幕密度和数量。
- **文本宽度计算**：在小程序等环境中，动态精确计算文本宽度有一定限制。组件内部采用估算方式，对于过长或特殊字体的弹幕，其飞行速度可能与预期略有差异。如果需要非常精确的控制，可以考虑在 `BarrageItem` 中传入预估的宽度。
- **CSS动画**：组件主要依赖 CSS transform 和 transition 实现动画。在部分老旧设备或特定小程序环境下，动画性能可能需要关注。

## 示例页面

更详细的用法请参考项目中的示例页面：`src/pages/components/barrage/index.vue` (路径可能根据您的项目结构有所不同)。