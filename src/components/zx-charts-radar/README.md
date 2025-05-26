# zx-charts-radar 雷达图组件

## 组件简介
`zx-charts-radar` 是基于 Vue3 + <script setup> + uni-app 实现的高性能多端雷达图表组件，支持 H5、微信/支付宝/百度/字节小程序、App 等平台。无需依赖浏览器专属 API，适合多维数据可视化场景。

## 属性（Props）
| 属性名           | 类型            | 默认值         | 说明 |
|------------------|-----------------|---------------|------|
| legend           | Object          | {show: true, size: 24, color: '#333'} | 图例配置 |
| tooltip          | Boolean         | true          | 是否显示 tooltip 提示 |
| width            | Number/String   | 480           | 雷达图宽度（rpx） |
| splitNumber      | Number/String   | 5             | 分割圈数 |
| indicator        | Array           | []            | 维度配置，见下方数据格式 |
| label            | Object          | {show: true, color: '#bbb', size: 24} | 维度标签配置 |
| axisLineColor    | String          | '#ddd'        | 轴线颜色 |
| splitLineColor   | String          | '#eee'        | 分割线颜色 |
| lineBold         | Boolean         | false         | 是否加粗线条 |

### draw 方法数据格式
通过 `draw(dataset)` 方法传入，格式如下：
```js
[
  {
    name: 'A类用户',
    color: '#3b82f6',
    source: [80, 90, 70, 60, 85]
  },
  {
    name: 'B类用户',
    color: '#f59e42',
    source: [60, 70, 80, 90, 60]
  }
]
```

### indicator 维度格式
```js
[
  { name: '活跃度', max: 100 },
  { name: '消费力', max: 100 },
  { name: '忠诚度', max: 100 },
  { name: '传播力', max: 100 },
  { name: '成长性', max: 100 }
]
```

## 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click  | 点击某一数据系列时触发 | { datasetIndex } |

## 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| draw   | 绘制/更新图表 | (dataset) |

## 基本用法示例
详见下方示例或 `src/pages/components/charts/radar.vue`

```vue
<template>
  <view class="demo-radar">
    <zx-charts-radar
      ref="radarRef"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :width="500"
      :splitNumber="5"
      :indicator="indicator"
      :label="{ show: true, color: '#bbb', size: 24 }"
      :axisLineColor="'#ddd'"
      :splitLineColor="'#eee'"
      :lineBold="false"
      @click="onRadarClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsRadar from '@/components/zx-charts-radar/zx-charts-radar.vue';

const radarRef = ref();
const indicator = [
  { name: '活跃度', max: 100 },
  { name: '消费力', max: 100 },
  { name: '忠诚度', max: 100 },
  { name: '传播力', max: 100 },
  { name: '成长性', max: 100 }
];
const dataset = [
  {
    name: 'A类用户',
    color: '#3b82f6',
    source: [80, 90, 70, 60, 85]
  },
  {
    name: 'B类用户',
    color: '#f59e42',
    source: [60, 70, 80, 90, 60]
  }
];

function onRadarClick(e) {
  uni.showToast({ title: `点击：${e.datasetIndex !== undefined ? dataset[e.datasetIndex].name : ''}` });
}

onMounted(() => {
  radarRef.value.draw(dataset);
});
</script>
```

## 注意事项
- 组件为多端兼容实现，不依赖 window/document。
- 建议在页面 onReady 或 onMounted 后调用 draw 方法。
- indicator 数组需与 dataset.source 数组长度一致。
- 支持自定义颜色、图例、tooltip、线条样式等。
