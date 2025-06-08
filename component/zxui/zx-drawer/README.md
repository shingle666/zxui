# zx-drawer 抽屉组件

`zx-drawer` 是一个从屏幕边缘滑出的抽屉面板组件，适用于临时展示表单、文档等内容。

## 基本用法

```vue
<template>
  <view>
    <button @click="drawer = true">打开抽屉</button>
    
    <zx-drawer v-model="drawer" title="我是标题">
      <view>抽屉内容</view>
    </zx-drawer>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
```

## 不同方向

抽屉可以从四个方向打开：

- 从右至左（默认）：`direction="rtl"`
- 从左至右：`direction="ltr"`
- 从上至下：`direction="ttb"`
- 从下至上：`direction="btt"`

```vue
<zx-drawer v-model="drawer" title="标题" direction="ltr">
  <view>从左侧打开的抽屉</view>
</zx-drawer>
```

## 自定义大小

可以通过 `size` 属性控制抽屉的大小，接受数字（像素值）或字符串（百分比）。

```vue
<zx-drawer v-model="drawer" title="标题" size="50%">
  <view>占屏幕宽度50%的抽屉</view>
</zx-drawer>
```

## 自定义头部

可以通过 header 插槽自定义头部内容：

```vue
<zx-drawer v-model="drawer">
  <template #header>
    <view class="custom-header">自定义头部</view>
  </template>
  <view>抽屉内容</view>
</zx-drawer>
```

## 底部插槽

通过 footer 插槽添加底部内容：

```vue
<zx-drawer v-model="drawer" title="标题">
  <view>抽屉内容</view>
  <template #footer>
    <view class="footer-btns">
      <button @click="drawer = false">取消</button>
      <button type="primary" @click="handleConfirm">确认</button>
    </view>
  </template>
</zx-drawer>
```

## API

### Props

| 属性名               | 说明                                            | 类型             | 默认值    |
| ------------------- | ---------------------------------------------- | --------------- | -------- |
| v-model             | 是否显示抽屉                                     | boolean         | false    |
| title               | 抽屉标题                                         | string          | ''       |
| direction           | 打开方向（ltr/rtl/ttb/btt）                      | string          | 'rtl'    |
| size                | 抽屉大小，支持数字(px)或字符串(%)                  | number/string   | '30%'    |
| modal               | 是否显示遮罩层                                    | boolean         | true     |
| append-to-body      | 是否挂载到 body 元素上                            | boolean         | false    |
| with-header         | 是否显示头部                                      | boolean         | true     |
| show-close          | 是否显示关闭按钮                                  | boolean         | true     |
| close-on-click-modal| 是否可通过点击遮罩层关闭                           | boolean         | true     |
| close-on-press-escape| 是否可通过按下 ESC 关闭                          | boolean         | true     |
| destroy-on-close    | 关闭时是否销毁子元素                              | boolean         | false    |
| before-close        | 关闭前的回调，可阻止关闭                           | function        | -        |
| z-index             | 抽屉的 z-index                                   | number          | 2000     |
| custom-class        | 自定义类名                                       | string          | ''       |

### 事件

| 事件名              | 说明                     | 回调参数  |
| ------------------ | ----------------------- | -------- |
| open               | 抽屉打开的回调            | -        |
| opened             | 抽屉打开动画结束时的回调    | -        |
| close              | 抽屉关闭的回调            | -        |
| closed             | 抽屉关闭动画结束时的回调    | -        |

### 插槽

| 插槽名    | 说明        |
| -------- | ---------- |
| default  | 抽屉内容    |
| header   | 自定义头部  |
| footer   | 自定义底部  |
