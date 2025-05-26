# zx-charts-scatter 散点图组件

## 组件简介
`zx-charts-scatter` 是基于 Vue3 + <script setup> + uni-app 实现的高性能多端散点图表组件，支持 H5、微信/支付宝/百度/字节小程序、App 等平台。无需依赖浏览器专属 API，适合二维数据分布可视化场景。

## 属性（Props）
| 属性名           | 类型            | 默认值         | 说明 |
|------------------|-----------------|---------------|------|
| legend           | Object          | {show: false, size: 24, color: '#333'} | 图例配置 |
| tooltip          | Boolean         | true          | 是否显示 tooltip 提示 |
| xAxis            | Object          | {min: 0, max: 100, splitNumber: 20} | x轴配置 |
| yAxis            | Object          | {min: 0, max: 100, splitNumber: 20} | y轴配置 |
| xAxisTick        | Object          | {height: '12rpx', color: '#e3e3e3'} | x轴刻度线配置 |
| yAxisTick        | Object          | {width: '12rpx', color: '#e3e3e3'} | y轴刻度线配置 |
| xAxisLine        | Object          | {color: '#e3e3e3', itemGap: 100} | x轴线条配置 |
| yAxisLine        | Object          | {color: '#e3e3e3', itemGap: 80} | y轴线条配置 |
| xAxisLabel       | Object          | {color: '#333', size: 24} | x轴标签配置 |
| yAxisLabel       | Object          | {color: '#333', size: 24} | y轴标签配置 |
| splitLine        | Object          | {color: '#e3e3e3', type: 'dashed'} | 分割线配置 |

### draw 方法数据格式
通过 `draw(dataset)` 方法传入，格式如下：
```js
[
  {
    name: 'A类样本',
    color: '#3b82f6',
    width: 18, // 散点大小（rpx）
    source: [
      [10, 20, 'A1'],
      [30, 40, 'A2']
    ]
  },
  {
    name: 'B类样本',
    color: '#f59e42',
    width: 18,
    source: [
      [20, 30, 'B1'],
      [40, 50, 'B2']
    ]
  }
]
```

## 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click  | 点击某一散点时触发 | { datasetIndex, sourceIndex } |

## 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| draw   | 绘制/更新图表 | (dataset) |

## 基本用法示例
详见下方示例或 `src/pages/components/charts/scatter.vue`

```vue
<template>
  <view class="demo-scatter">
    <zx-charts-scatter
      ref="scatterRef"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :xAxis="{ min: 0, max: 100, splitNumber: 20 }"
      :yAxis="{ min: 0, max: 100, splitNumber: 20 }"
      :xAxisLine="{ color: '#e3e3e3', itemGap: 100 }"
      :yAxisLine="{ color: '#e3e3e3', itemGap: 80 }"
      :xAxisTick="{ height: '12rpx', color: '#e3e3e3' }"
      :yAxisTick="{ width: '12rpx', color: '#e3e3e3' }"
      :xAxisLabel="{ color: '#333', size: 24 }"
      :yAxisLabel="{ color: '#333', size: 24 }"
      :splitLine="{ color: '#e3e3e3', type: 'dashed' }"
      @click="onScatterClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsScatter from '@/components/zx-charts-scatter/zx-charts-scatter.vue';

const scatterRef = ref();
const dataset = [
  {
    name: 'A类样本',
    color: '#3b82f6',
    width: 18,
    source: [
      [10, 20, 'A1'],
      [30, 40, 'A2'],
      [50, 60, 'A3'],
      [70, 80, 'A4']
    ]
  },
  {
    name: 'B类样本',
    color: '#f59e42',
    width: 18,
    source: [
      [20, 30, 'B1'],
      [40, 50, 'B2'],
      [60, 70, 'B3'],
      [80, 90, 'B4']
    ]
  }
];

function onScatterClick(e) {
  const { datasetIndex, sourceIndex } = e;
  if (datasetIndex !== undefined && sourceIndex !== undefined) {
    const item = dataset[datasetIndex];
    const point = item.source[sourceIndex];
    uni.showToast({ title: `点击：${item.name} - ${point[2] || point[0] + ',' + point[1]}` });
  }
}

onMounted(() => {
  scatterRef.value.draw(dataset);
});
</script>
```

## 注意事项
- 组件为多端兼容实现，不依赖 window/document。
- 建议在页面 onReady 或 onMounted 后调用 draw 方法。
- dataset.source 为二维数组，格式为 [x, y, name?]。
- 支持自定义颜色、图例、tooltip、坐标轴、分割线等。
