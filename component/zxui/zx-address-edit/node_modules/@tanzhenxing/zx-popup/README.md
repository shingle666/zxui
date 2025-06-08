# zx-popup 弹出层组件

## 简介

zx-popup 是一个功能完善的弹出层组件，基于 Vue 3 Composition API 开发，支持多种弹出方式和动画效果。组件兼容 H5、小程序、App 等多个平台。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| √   | √          | √            | √          | √          | √        | √   |

## 引入方式

### 局部引入

```vue
<template>
  <zx-popup v-model:show="showPopup" type="center">
    <view class="popup-content">
      弹窗内容
    </view>
  </zx-popup>
</template>

<script setup>
import { ref } from 'vue'
import zxPopup from '@/components/zx-popup/zx-popup.vue'

const showPopup = ref(false)
</script>
```

### 全局引入

在 `main.js` 中：

```javascript
import zxPopup from '@/components/zx-popup/zx-popup.vue'

app.component('zx-popup', zxPopup)
```

## 基础用法

### 居中弹出

```vue
<template>
  <view>
    <button @click="showCenter = true">显示居中弹窗</button>
    
    <zx-popup v-model:show="showCenter" type="center">
      <view class="popup-content">
        <text>这是一个居中弹窗</text>
        <button @click="showCenter = false">关闭</button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showCenter = ref(false)
</script>

<style>
.popup-content {
  width: 600rpx;
  padding: 60rpx;
  background-color: #fff;
  border-radius: 20rpx;
  text-align: center;
}
</style>
```

### 底部弹出

```vue
<template>
  <view>
    <button @click="showBottom = true">显示底部弹窗</button>
    
    <zx-popup v-model:show="showBottom" type="bottom">
      <view class="bottom-content">
        <text>这是一个底部弹窗</text>
        <button @click="showBottom = false">关闭</button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showBottom = ref(false)
</script>

<style>
.bottom-content {
  padding: 60rpx;
  background-color: #fff;
  border-radius: 20rpx 20rpx 0 0;
}
</style>
```

### 顶部弹出

```vue
<template>
  <view>
    <button @click="showTop = true">显示顶部弹窗</button>
    
    <zx-popup v-model:show="showTop" type="top">
      <view class="top-content">
        <text>这是一个顶部弹窗</text>
        <button @click="showTop = false">关闭</button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showTop = ref(false)
</script>

<style>
.top-content {
  padding: 60rpx;
  background-color: #fff;
  border-radius: 0 0 20rpx 20rpx;
}
</style>
```

### 左侧弹出

```vue
<template>
  <view>
    <button @click="showLeft = true">显示左侧弹窗</button>
    
    <zx-popup v-model:show="showLeft" type="left">
      <view class="side-content">
        <text>这是一个左侧弹窗</text>
        <button @click="showLeft = false">关闭</button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showLeft = ref(false)
</script>

<style>
.side-content {
  width: 500rpx;
  height: 100%;
  padding: 60rpx;
  background-color: #fff;
}
</style>
```

### 右侧弹出

```vue
<template>
  <view>
    <button @click="showRight = true">显示右侧弹窗</button>
    
    <zx-popup v-model:show="showRight" type="right">
      <view class="side-content">
        <text>这是一个右侧弹窗</text>
        <button @click="showRight = false">关闭</button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showRight = ref(false)
</script>
```

## 高级用法

### 禁用遮罩点击关闭

```vue
<template>
  <zx-popup 
    v-model:show="showPopup" 
    type="center" 
    :mask-click="false"
  >
    <view class="popup-content">
      <text>点击遮罩无法关闭</text>
      <button @click="showPopup = false">手动关闭</button>
    </view>
  </zx-popup>
</template>
```

### 自定义样式

```vue
<template>
  <zx-popup 
    v-model:show="showPopup" 
    type="center"
    background-color="#f5f5f5"
    mask-background-color="rgba(0, 0, 0, 0.8)"
    border-radius="30rpx"
    :z-index="1000"
  >
    <view class="custom-content">
      自定义样式弹窗
    </view>
  </zx-popup>
</template>
```

### 禁用动画

```vue
<template>
  <zx-popup 
    v-model:show="showPopup" 
    type="center"
    :animation="false"
  >
    <view class="popup-content">
      无动画弹窗
    </view>
  </zx-popup>
</template>
```

### 隐藏遮罩

```vue
<template>
  <zx-popup 
    v-model:show="showPopup" 
    type="center"
    :overlay="false"
  >
    <view class="popup-content">
      无遮罩弹窗
    </view>
  </zx-popup>
</template>
```

### 监听事件

```vue
<template>
  <zx-popup 
    v-model:show="showPopup" 
    type="center"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
    @mask-click="onMaskClick"
    @change="onChange"
  >
    <view class="popup-content">
      监听事件示例
    </view>
  </zx-popup>
</template>

<script setup>
const onOpen = () => {
  console.log('弹窗开始打开')
}

const onOpened = () => {
  console.log('弹窗打开完成')
}

const onClose = () => {
  console.log('弹窗开始关闭')
}

const onClosed = () => {
  console.log('弹窗关闭完成')
}

const onMaskClick = () => {
  console.log('点击了遮罩')
}

const onChange = (e) => {
  console.log('弹窗状态改变:', e)
}
</script>
```

### 通过 ref 调用方法

```vue
<template>
  <view>
    <button @click="openPopup">打开弹窗</button>
    <button @click="closePopup">关闭弹窗</button>
    
    <zx-popup ref="popupRef" type="center">
      <view class="popup-content">
        通过 ref 控制的弹窗
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const popupRef = ref()

const openPopup = () => {
  popupRef.value.open()
}

const closePopup = () => {
  popupRef.value.close()
}
</script>
```

## API

### Props

| 参数                  | 说明                     | 类型    | 默认值                | 可选值                                    |
| --------------------- | ------------------------ | ------- | --------------------- | ----------------------------------------- |
| show                  | 是否显示弹窗             | Boolean | false                 | true / false                              |
| type                  | 弹出方式                 | String  | center                | top / center / bottom / left / right      |
| animation             | 是否开启动画             | Boolean | true                  | true / false                              |
| mask-click            | 点击遮罩是否关闭弹窗     | Boolean | true                  | true / false                              |
| background-color      | 主窗口背景色             | String  | transparent           | 任意有效的 CSS 颜色值                     |
| mask-background-color | 遮罩背景色               | String  | rgba(0, 0, 0, 0.4)    | 任意有效的 CSS 颜色值                     |
| border-radius         | 圆角设置                 | String  | 0                     | 任意有效的 CSS border-radius 值           |
| safe-area             | 是否适配底部安全区       | Boolean | true                  | true / false                              |
| z-index               | 层级                     | Number  | 999                   | 任意数字                                  |
| duration              | 动画持续时间（毫秒）     | Number  | 300                   | 任意数字                                  |
| overlay               | 是否显示遮罩             | Boolean | true                  | true / false                              |

### Events

| 事件名      | 说明                     | 回调参数                                    |
| ----------- | ------------------------ | ------------------------------------------- |
| update:show | 弹窗显示状态改变时触发   | (show: boolean)                             |
| change      | 弹窗状态改变时触发       | ({ show: boolean, type: string })           |
| mask-click  | 点击遮罩时触发           | -                                           |
| open        | 弹窗开始打开时触发       | -                                           |
| opened      | 弹窗打开动画完成时触发   | -                                           |
| close       | 弹窗开始关闭时触发       | -                                           |
| closed      | 弹窗关闭动画完成时触发   | -                                           |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明     | 参数 |
| ------ | -------- | ---- |
| open   | 打开弹窗 | -    |
| close  | 关闭弹窗 | -    |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 弹窗内容       |

## 注意事项

1. **依赖组件**：本组件依赖 `zx-transition` 组件，请确保项目中已正确引入
2. **平台兼容**：组件已针对不同平台进行适配，避免使用浏览器特有的 DOM 操作
3. **安全区适配**：在 iOS 设备上，底部弹窗会自动适配安全区域
4. **键盘事件**：在 H5 平台支持 ESC 键关闭弹窗
5. **滚动穿透**：在 H5 平台会自动处理滚动穿透问题
6. **层级管理**：建议根据实际需求调整 z-index 值，避免层级冲突
7. **动画性能**：在低端设备上可以考虑禁用动画以提升性能

## 常见问题

### Q: 弹窗无法显示？
A: 请检查以下几点：
1. 确保 `show` 属性正确绑定
2. 检查是否正确引入了 `zx-transition` 组件
3. 确认弹窗内容是否有足够的宽高

### Q: 在小程序中动画效果异常？
A: 小程序平台对某些 CSS 动画支持有限，组件已针对不同平台进行适配，如仍有问题可尝试禁用动画。

### Q: 如何实现自定义动画？
A: 可以通过修改 `zx-transition` 组件的 `mode-class` 来实现自定义动画效果。

### Q: 弹窗层级被其他元素遮挡？
A: 可以通过调整 `z-index` 属性来解决层级问题。