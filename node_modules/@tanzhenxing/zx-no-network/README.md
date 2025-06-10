# zx-no-network 无网络提示组件

## 组件介绍

`zx-no-network` 是一个适用于 uni-app 的无网络提示组件，支持 H5、小程序、APP（含 Android/iOS）。组件会自动检测网络状态，无需手动配置，断网时自动弹出遮罩提示。

## 支持平台
- H5
- 微信/支付宝/百度/字节/QQ/快手小程序
- APP（Android/iOS）

## 属性（Props）
| 属性名   | 类型            | 默认值                | 说明                 |
|----------|-----------------|----------------------|----------------------|
| tips     | String          | 哎呀，网络信号丢失   | 无网络时的提示语     |
| zIndex   | String/Number   | 1000                 | 遮罩层级             |
| image    | String          | 空                   | 无网络图片（可为 src/base64）|

## 事件（Events）
| 事件名         | 说明                       |
|----------------|----------------------------|
| retry          | 用户点击"重试"按钮时触发   |
| connected      | 网络恢复时触发             |
| disconnected   | 网络断开时触发             |

## 用法示例

```vue
<template>
  <zx-no-network
    :tips="'网络不可用，请检查设置'"
    :zIndex="2000"
    image="/static/no-network.png"
    @retry="onRetry"
    @connected="onConnected"
    @disconnected="onDisconnected"
  />
</template>

<script setup>
function onRetry() {
  // 重新发起网络请求等操作
}
function onConnected() {
  // 网络恢复
}
function onDisconnected() {
  // 网络断开
}
</script>
```

## APP 设置跳转说明
- 仅 APP 端支持跳转到系统设置页，H5/小程序端无此功能。
- Android/iOS 跳转均已适配。

## 注意事项
- 组件依赖 `uni.getNetworkType` 和 `uni.onNetworkStatusChange`，请确保 uni-app 版本支持。
- 建议配合 zx-overlay、zx-icon、zx-button 组件使用。

## 相关文档
- [uni-app 网络 API](https://uniapp.dcloud.net.cn/api/system/network.html)
- [plus API 说明](https://ask.dcloud.net.cn/docs/)
