# zx-charts-funnel 漏斗图组件

## 组件简介
`zx-charts-funnel` 是基于 Vue3 + <script setup> + uni-app 实现的高性能多端漏斗图表组件，支持 H5、微信/支付宝/百度/字节小程序、App 等平台。无需依赖浏览器专属 API，适合数据可视化场景。

## 属性（Props）
| 属性名   | 类型            | 默认值         | 说明 |
|----------|-----------------|---------------|------|
| title    | String          | ''            | 漏斗图标题 |
| width    | Number/String   | 400           | 图表宽度（rpx） |
| height   | Number/String   | 480           | 图表高度（rpx） |
| gap      | Number/String   | 4             | 各层间距（rpx） |
| legend   | Object          | {show: true, size: 24, color: '#333', direction: 'horizontal'} | 图例配置 |
| tooltip  | Boolean         | true          | 是否显示 tooltip 提示 |
| sort     | String          | 'desc'        | 数据排序方式：'desc'（默认，顶部最大）或 'asc'（顶部最小）|

### draw 方法数据格式
通过 `draw(dataset)` 方法传入，格式如下：
```js
[
  { name: '访问', value: 1000, color: '#3b82f6' },
  { name: '注册', value: 800, color: '#34d399' },
  { name: '下单', value: 600, color: '#f59e42' },
  { name: '支付', value: 300, color: '#f43f5e' },
  { name: '复购', value: 100, color: '#6366f1' }
]
```

## 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click  | 点击某一层时触发 | { index, ...item } |

## 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| draw   | 绘制/更新图表 | (dataset) |

## 基本用法示例
详见下方示例或 `src/pages/components/charts/funnel.vue`

## 注意事项
- 组件为多端兼容实现，不依赖 window/document。
- 建议在页面 onReady 或 onMounted 后调用 draw 方法。
- dataset 数组需按 value 从大到小（desc）或小到大（asc）排序，组件内部也会自动排序。
- 支持自定义颜色、图例、tooltip、方向等。
