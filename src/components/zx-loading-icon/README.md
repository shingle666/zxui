# zx-loading-icon 加载动画

## 介绍

一个简洁的加载动画组件，用于在加载更多内容、开关切换等场景中展示正在加载的状态。

## 平台兼容性

全平台兼容（App、H5、微信小程序等）

## 基础用法

```html
<zx-loading-icon mode="circle"></zx-loading-icon>
```

## 不同模式

组件提供三种模式：circle（圆形）、spinner（花朵形）、semicircle（半圆形）

```html
<!-- 圆形加载动画 -->
<zx-loading-icon mode="circle"></zx-loading-icon>

<!-- 花朵形加载动画 -->
<zx-loading-icon mode="spinner"></zx-loading-icon>

<!-- 半圆形加载动画 -->
<zx-loading-icon mode="semicircle"></zx-loading-icon>
```

## 自定义颜色和大小

```html
<!-- 自定义颜色 -->
<zx-loading-icon color="#3c9cff"></zx-loading-icon>

<!-- 自定义大小 -->
<zx-loading-icon size="80rpx"></zx-loading-icon>

<!-- 设置非激活边框颜色 -->
<zx-loading-icon mode="circle" color="#3c9cff" inactiveColor="#e4e4e4"></zx-loading-icon>
```

## 显示文字

```html
<!-- 水平排列 -->
<zx-loading-icon text="加载中"></zx-loading-icon>

<!-- 垂直排列 -->
<zx-loading-icon text="加载中" vertical></zx-loading-icon>

<!-- 自定义文字样式 -->
<zx-loading-icon text="加载中" textSize="28rpx" textColor="#3c9cff"></zx-loading-icon>
```

## 自定义动画

```html
<!-- 自定义动画速度 -->
<zx-loading-icon duration="800"></zx-loading-icon>

<!-- 自定义动画函数 -->
<zx-loading-icon timingFunction="linear"></zx-loading-icon>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示组件 | Boolean | true |
| color | 动画活动区域的颜色 | String | #ffffff |
| textColor | 提示文本的颜色 | String | #909193 |
| vertical | 文字和图标是否垂直排列 | Boolean | false |
| mode | 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形 | String | circle |
| size | 加载图标的大小，单位默认rpx | String / Number | 60rpx |
| textSize | 文字大小 | String / Number | 30rpx |
| text | 文字内容 | String / Number | '' |
| timingFunction | 动画模式 | String | ease-in-out |
| duration | 动画执行周期时间(ms) | String / Number | 1200 |
| inactiveColor | mode=circle时的暗边颜色 | String | transparent |

## 示例项目

更多示例和详细用法请参考：[https://zxui.org/components/loading-icon](https://zxui.org/components/loading-icon)
