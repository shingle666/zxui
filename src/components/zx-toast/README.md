# zx-toast 组件

## 介绍

`zx-toast` 是一个基于 uni-app 的跨端（H5/小程序/APP）消息提示组件，支持多种主题、位置、遮罩、加载、手动/自动关闭等功能，无需依赖浏览器特有 DOM。

## 基本用法

```vue
<template>
  <zx-toast ref="toast" />
  <button @click="showToast">显示Toast</button>
</template>

<script setup>
import { ref } from 'vue';
const toast = ref(null);
function showToast() {
  toast.value.show({ message: '操作成功', type: 'success' });
}
</script>
```

## 属性说明

| 属性名      | 类型            | 默认值     | 说明                         |
| ----------- | --------------- | ---------- | ---------------------------- |
| type        | String          | default    | 主题类型：success、error、warning、primary、default、loading |
| zIndex      | String/Number   | 10090      | 层级                         |
| loading     | Boolean         | false      | 是否加载中                   |
| message     | String/Number   | ''         | 显示的文字内容               |
| icon        | String          | ''         | 图标名或图片路径             |
| overlay     | Boolean         | false      | 是否显示遮罩                 |
| position    | String          | center     | 位置：top、center、bottom    |
| params      | Object          | {}         | 跳转参数                     |
| duration    | String/Number   | 2000       | 展示时间(ms)，0为手动关闭    |
| isTab       | Boolean         | false      | 跳转是否为tab页面            |
| url         | String          | ''         | toast消失后跳转页面          |
| back        | Boolean         | false      | toast结束后返回上一页        |
| customStyle | Object          | {}         | 内容自定义样式               |
| show        | Boolean         | false      | 是否显示（受控）             |

## 方法

### show(options)
显示toast。options为对象，支持上述所有属性。

### hide()
隐藏toast。

## 事件

无（如需进入页面即显示toast，请在onReady生命周期调用show）。

## 示例

详见 `src/pages/components/toast/index.vue`：

- 普通提示
- 成功/失败/警告/主要类型
- 加载中（手动关闭）
- 顶部/底部/居中显示
- 带遮罩
- 自定义图标
- 手动关闭

## 跨端兼容说明
- 组件不依赖window、document等浏览器特有对象。
- 使用 `<view>`、`<text>` 等通用标签，样式兼容H5、小程序、APP。
- 跳转、返回等操作使用 `uni.navigateTo`、`uni.navigateBack`。

## 依赖
- 依赖 `zx-overlay`、`zx-icon`、`zx-loading-icon`、`zx-gap` 组件，请确保已注册。

## 联系与反馈
如有问题或建议，请提交 issue。
