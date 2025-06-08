# zx-charts-pie 饼图/环形图组件

## 组件简介
`zx-charts-pie` 是基于 Vue3 + <script setup> + uni-app 实现的高性能多端饼图/环形图表组件，支持 H5、微信/支付宝/百度/字节小程序、App 等平台。无需依赖浏览器专属 API，适合数据可视化场景。

## 属性（Props）
| 属性名           | 类型            | 默认值         | 说明 |
|------------------|-----------------|---------------|------|
| title            | String          | ''            | 饼图标题 |
| diam             | Number          | 400           | 饼图直径（rpx） |
| backgroundColor  | String          | 'transparent'  | 饼图背景色 |
| legend           | Object          | {show: true, size: 24, color: '#333', direction: 'horizontal'} | 图例配置 |
| tooltip          | Boolean         | true          | 是否显示 tooltip 提示 |
| type             | Number          | 1             | 1-饼状图 2-环状图 |
| annular          | Object          | {width: 200, backgroundColor: '#f8f8f8'} | 环形中间圆圈样式 |

### draw 方法数据格式
通过 `draw(dataset)` 方法传入，格式如下：
```js
[
  { name: 'A类用户', value: 40, color: '#3b82f6' },
  { name: 'B类用户', value: 30, color: '#34d399' },
  { name: 'C类用户', value: 20, color: '#f59e42' },
  { name: 'D类用户', value: 10, color: '#f43f5e' }
]
```

## 事件
| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click  | 点击某一扇区时触发 | { index, ...item } |

## 方法
| 方法名 | 说明 | 参数 |
|--------|------|------|
| draw   | 绘制/更新图表 | (dataset) |

## 基本用法示例
详见下方示例或 `src/pages/components/charts/pie.vue`

## 注意事项
- 组件为多端兼容实现，不依赖 window/document。
- 建议在页面 onReady 或 onMounted 后调用 draw 方法。
- dataset 数组 value 之和建议为100或总量，支持自定义颜色、图例、tooltip、环形等。
