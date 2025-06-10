# zx-charts-column 柱状图组件

## 组件简介
`zx-charts-column` 是基于 Vue3 + <script setup> + uni-app 实现的高性能多端柱状图表组件，支持 H5、微信/支付宝/百度/字节小程序、App 等平台。无需依赖浏览器专属 API，适合数据可视化场景。

## 属性（Props）
| 属性名           | 类型            | 默认值         | 说明 |
|------------------|-----------------|---------------|------|
| legend           | Object          | {show: false, size: 24, color: '#333'} | 图例配置 |
| tooltip          | Boolean         | false         | 是否显示 tooltip 提示 |
| xAxis            | Array           | []            | x 轴刻度数组 |
| currentIndex     | Number          | -1            | 默认选中 x 轴索引 |
| columnBarWidth   | Number/String   | 32            | 柱状条宽度（rpx） |
| splitLine        | Object          | {color: '#e3e3e3', type: 'dashed'} | 分割线样式 |
| xAxisTick        | Object          | {height: '12rpx', color: '#e3e3e3'} | x 轴刻度线样式 |
| xAxisLine        | Object          | {color: '#e3e3e3', itemPadding: '0 30rpx'} | x 轴线条样式及间距 |
| xAxisLabel       | Object          | {color: '#333', size: 24, height: 60} | x 轴标签样式 |
| xAxisVal         | Object          | {show: false, color: '#333', size: 24, height: 60} | x 轴 value 样式及显示 |
| yAxis            | Array           | []            | y 轴自定义刻度（不传则自动计算） |
| min              | Number          | 0             | y 轴最小值 |
| max              | Number          | 100           | y 轴最大值 |
| splitNumber      | Number          | 20            | y 轴分段递增数值 |
| yAxisLine        | Object          | {color: '#e3e3e3', itemGap: 60} | y 轴线条样式及间距 |
| yAxisLabel       | Object          | {show: true, color: '#333', size: 24} | y 轴标签样式 |
| scrollable       | Boolean         | false         | x 轴是否可滚动 |
| isStack          | Boolean         | false         | 是否堆叠展示 |
| clickEffect      | Number          | 1             | 柱状条点击效果：1-出现背景，2-高亮显示，3-无效果 |
| columnCap        | String          | 'square'      | 柱状条端点样式：'round'/'square' |

### dataset 数据格式
通过 `draw(dataset)` 方法传入，格式如下：
```js
[
  {
    name: '系列1',
    color: '#3b82f6',
    source: [10, 20, 30, 40, 50]
  },
  {
    name: '系列2',
    color: '#f59e42',
    source: [20, 15, 35, 25, 45]
  }
]
```

## 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click  | 点击数据点时触发 | { datasetIndex, sourceIndex, ...datasetItem } |

## 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| draw   | 绘制/更新图表 | (dataset, xAxisValFormatter) |

## 基本用法示例
详见下方示例或 `src/pages/components/charts/column.vue`

## 注意事项
- 组件为多端兼容实现，不依赖 window/document。
- 建议在页面 onReady 或 onMounted 后调用 draw 方法。
- xAxis、dataset.source 数组长度需一致。
- 支持自定义颜色、格式化 value、图例等。
