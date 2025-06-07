# zx-dialog 对话框组件

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 介绍

`zx-dialog` 是一个基于 uni-app 的对话框组件，参考 Element Plus 的 Dialog 组件实现，提供了丰富的功能和灵活的定制选项。

## 基础用法

通过 `v-model` 控制对话框的显示和隐藏。

```vue
<template>
  <zx-button @click="dialogVisible = true">打开对话框</zx-button>
  
  <zx-dialog v-model="dialogVisible" title="提示">
    <view>这是一条消息提示</view>
    <template #footer>
      <view class="dialog-footer">
        <zx-button @click="dialogVisible = false">取消</zx-button>
        <zx-button type="primary" @click="dialogVisible = false">确定</zx-button>
      </view>
    </template>
  </zx-dialog>
</template>

<script setup>
import { ref } from 'vue';

const dialogVisible = ref(false);
</script>
```

## 自定义内容

对话框内容可以是任何内容，例如表格、表单等。

```vue
<zx-dialog v-model="dialogVisible" title="收货地址">
  <!-- 这里可以放置表格、表单或其他内容 -->
  <view>自定义内容</view>
</zx-dialog>
```

## 自定义头部

通过 `header` 插槽自定义对话框头部内容。

```vue
<zx-dialog v-model="dialogVisible" :show-close="false">
  <template #header>
    <view class="custom-header">
      <text class="custom-title">自定义标题</text>
      <zx-button type="danger" size="small" @click="dialogVisible = false">
        关闭
      </zx-button>
    </view>
  </template>
  <view>对话框内容</view>
</zx-dialog>
```

## 嵌套对话框

支持对话框嵌套。

```vue
<zx-dialog v-model="outerDialogVisible" title="外层对话框">
  <view>这是外层对话框的内容</view>
  <zx-button @click="innerDialogVisible = true">打开内层对话框</zx-button>
</zx-dialog>

<zx-dialog v-model="innerDialogVisible" title="内层对话框">
  <view>这是内层对话框的内容</view>
</zx-dialog>
```

## 居中对话框

通过 `center` 属性设置对话框内容居中。

```vue
<zx-dialog v-model="dialogVisible" title="提示" center>
  <view>居中显示的内容</view>
</zx-dialog>
```

## 可拖拽对话框

通过 `draggable` 属性可以使对话框变为可拖拽的。

```vue
<zx-dialog v-model="dialogVisible" title="可拖拽对话框" draggable>
  <view>通过拖拽对话框头部可以移动对话框位置</view>
</zx-dialog>
```

## 全屏对话框

通过 `fullscreen` 属性可以使对话框变为全屏显示。

```vue
<zx-dialog v-model="dialogVisible" title="全屏对话框" fullscreen>
  <view>这是全屏对话框的内容</view>
</zx-dialog>
```

## 简洁提示对话框

类似于系统的消息框，用于简单的提示和确认。

```vue
<zx-dialog
  v-model="tipsDialogVisible"
  title="Tips"
  width="80%"
  :show-close="true"
>
  <view class="tips-content">
    This is a message
  </view>
  <template #footer>
    <view class="dialog-footer">
      <zx-button @click="tipsDialogVisible = false">Cancel</zx-button>
      <zx-button type="primary" @click="handleConfirm">Confirm</zx-button>
    </view>
  </template>
</zx-dialog>
```

## 辅助函数

提供了一组辅助函数，使对话框的使用更加简便。

### 引入

### showConfirm - 确认对话框

```js
// 显示确认对话框
const showConfirmDialog = async () => {
  try {
    const result = await showConfirm('您确定要执行此操作吗？', '确认操作');
    if (result) {
      // 用户点击了确认
    } else {
      // 用户点击了取消
    }
  } catch (error) {
    console.error('对话框出错:', error);
  }
};
```

### showAlert - 提示对话框

```js
// 显示提示对话框
const showAlertDialog = async () => {
  try {
    await showAlert('操作已完成！', '操作提示');
    // 用户点击了确定
  } catch (error) {
    console.error('对话框出错:', error);
  }
};
```

### showDialog - 自定义对话框

```js
// 显示自定义对话框
const showCustomDialog = async () => {
  try {
    const result = await showDialog({
      title: '自定义标题',
      message: '自定义消息内容',
      confirmButtonText: '同意',
      cancelButtonText: '拒绝',
      showCancelButton: true,
      closeOnClickModal: false
    });
    
    if (result) {
      // 用户点击了确认
    } else {
      // 用户点击了取消
    }
  } catch (error) {
    console.error('对话框出错:', error);
  }
};
```

## 全局注册辅助函数组件

在 uni-app 环境中使用辅助函数时，需要全局注册组件。在 `App.vue` 中添加：

```vue
<template>
  <view>
    <component :is="DialogComponent" />
    <!-- 应用内容 -->
  </view>
</template>

<script setup>
import { DialogComponent } from '@/components/zx-dialog/showDialog.uni.js';
</script>
```

## Props 属性

| 属性名                | 说明                                  | 类型                     | 默认值     |
| -------------------- | ------------------------------------ | ----------------------- | --------- |
| modelValue / v-model | 是否显示对话框                         | boolean                 | false     |
| title                | 对话框标题                             | string                  | ''        |
| width                | 对话框宽度                             | string / number         | '85%'     |
| fullscreen           | 是否为全屏对话框                        | boolean                 | false     |
| top                  | 对话框距离顶部的高度                    | string                  | '15vh'    |
| modal                | 是否需要遮罩层                         | boolean                 | true      |
| customClass          | 自定义类名                             | string                  | ''        |
| lockScroll           | 是否在对话框出现时将滚动锁定              | boolean                 | true      |
| openDelay            | 对话框打开的延时时间（毫秒）              | number                  | 0         |
| closeDelay           | 对话框关闭的延时时间（毫秒）              | number                  | 0         |
| closeOnClickModal    | 是否可以通过点击遮罩层关闭对话框           | boolean                 | true      |
| closeOnPressEscape   | 是否可以通过按下 ESC 关闭对话框           | boolean                 | true      |
| showClose            | 是否显示关闭按钮                        | boolean                 | true      |
| beforeClose          | 关闭前的回调函数                        | Function(done)          | -         |
| draggable            | 是否可拖拽                             | boolean                 | false     |
| overflow             | 拖拽范围是否可超出可视区                  | boolean                 | false     |
| center               | 是否居中                               | boolean                 | false     |
| alignCenter          | 是否水平垂直居中                        | boolean                 | false     |
| destroyOnClose       | 关闭时是否销毁元素                       | boolean                 | false     |
| zIndex               | z-index 值                            | number                  | -         |
| headerClass          | header 部分的自定义 class 名            | string                  | ''        |
| bodyClass            | body 部分的自定义 class 名              | string                  | ''        |
| footerClass          | footer 部分的自定义 class 名            | string                  | ''        |

## 插槽

| 插槽名    | 说明                       |
| -------- | -------------------------- |
| default  | 对话框内容                  |
| header   | 对话框标题区的内容           |
| footer   | 对话框底部按钮操作区的内容     |

## 事件

| 事件名            | 说明                       | 回调参数 |
| ---------------- | -------------------------- | ------- |
| open             | 对话框打开的回调             | -       |
| opened           | 对话框打开动画结束时的回调     | -       |
| close            | 对话框关闭的回调             | -       |
| closed           | 对话框关闭动画结束时的回调     | -       |
| openAutoFocus    | 输入焦点聚焦在对话框内容时的回调 | -       |
| closeAutoFocus   | 输入焦点从对话框内容失焦时的回调 | -       |

## 方法

| 方法名          | 说明         | 参数 |
| -------------- | ------------ | ---- |
| resetPosition  | 重置对话框位置  | -    |
| handleClose    | 关闭对话框     | -    |
