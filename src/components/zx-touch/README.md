# zx-touch 触摸手势组件

适用于 uni-app 的多端（H5、微信/支付宝/百度/QQ/抖音小程序、App）通用触摸手势识别组件。

## 功能特性
- 支持 tap（点击）、swipe（滑动）、move（移动）、scale（双指缩放）、end（结束）、start（开始）等事件
- 兼容 H5、小程序、App，无浏览器特有依赖
- 事件参数简洁，易于集成

## 属性
| 属性  | 说明         | 类型    | 默认值 |
|-------|--------------|---------|--------|
| show  | 是否显示组件 | Boolean | true   |

## 事件
| 事件名  | 说明             | 回调参数                      |
|---------|------------------|-------------------------------|
| tap     | 点击             | 触点对象                      |
| swipe   | 滑动方向         | 'left'/'right'/'up'/'down'    |
| move    | 移动             | { dx, dy, touches }           |
| scale   | 双指缩放         | scale（缩放比例）             |
| end     | 触摸结束         | { dx, dy, duration, ... }     |
| start   | 触摸开始         | 起始触点数组                  |

## 平台兼容
- H5
- 微信/支付宝/百度/QQ/抖音小程序
- App（基于 uni-app）

## 使用示例

```vue
<template>
  <zx-touch
    style="width: 300rpx; height: 300rpx; background: #f5f5f5; border-radius: 16rpx;"
    @tap="onTap"
    @swipe="onSwipe"
    @move="onMove"
    @scale="onScale"
    @end="onEnd"
    @start="onStart"
  >
    <text>请在此区域进行触摸操作</text>
  </zx-touch>
</template>
<script setup>
function onTap(e) {
  // 处理点击
}
function onSwipe(direction) {
  // 处理滑动
}
function onMove(e) {
  // 处理移动
}
function onScale(scale) {
  // 处理缩放
}
function onEnd(e) {
  // 处理结束
}
function onStart(e) {
  // 处理开始
}
</script>
```

## 事件说明
- `tap`：单指快速点击触发
- `swipe`：单指快速滑动，direction 为方向
- `move`：单指拖动时持续触发，返回 dx/dy
- `scale`：双指缩放时触发，返回缩放比例
- `end`：触摸结束时触发，返回本次操作信息
- `start`：触摸开始时触发

## 注意事项
- 组件内部不依赖 window/document，可直接用于小程序、App
- 事件参数均为原生 touch 事件对象的简化/封装
- 建议设置固定宽高

## 贡献&反馈
如有问题或建议，欢迎提 issue 或 PR。
