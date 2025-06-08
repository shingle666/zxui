# zx-row 组件

基于 uni-app，支持 H5、各类小程序、App 的通用行布局组件，参考 [uni-row 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-row.html)。

## 组件特性
- 支持 24 栅格布局体系
- 支持 gutter（栅格间隔）、flex 布局、对齐方式
- 兼容 H5、各类小程序、App 平台
- 无浏览器特有 DOM 操作

## 属性说明
| 属性名   | 类型           | 默认值 | 说明 |
|----------|----------------|--------|------|
| type     | String         | -      | 布局模式，可选 'flex'，不填为 float 布局 |
| gutter   | Number         | 0      | 栅格间隔，单位 rpx |
| justify  | String         | start  | flex 布局下的水平排列方式，可选：start/end/center/space-around/space-between |
| align    | String         | top    | flex 布局下的垂直排列方式，可选：top/middle/bottom |
| width    | String/Number  | 750    | nvue 下需要配置宽度 |

## 插槽
- 默认插槽：用于放置 zx-col 或其他内容

## 平台支持
- H5
- 微信/支付宝/百度/抖音/飞书/QQ/快手/京东/华为/360/小红书等主流小程序
- App（nvue）

## 基本用法
```vue
<zx-row>
  <view>A</view>
  <view>B</view>
  <view>C</view>
</zx-row>
```

## 带间隔（gutter）
```vue
<zx-row :gutter="32">
  <view>A</view>
  <view>B</view>
  <view>C</view>
</zx-row>
```

## flex 布局
```vue
<zx-row type="flex" justify="center" align="middle">
  <view>A</view>
  <view>B</view>
  <view>C</view>
</zx-row>
```

## 详细示例
详见 `src/pages/components/row/index.vue`

## 参考文档
- [uni-row 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-row.html)
