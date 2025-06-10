# zx-qrcode 二维码组件

一个功能强大的uni-app二维码生成组件，支持自定义样式、长按保存等功能。支持多端运行，特别优化了微信小程序环境。

## 功能特点

- 支持自定义大小、颜色和背景色
- 支持长按保存二维码到相册
- 自动将二维码转换为图片提供给父组件
- 支持自定义纠错级别、边框等样式
- 支持动态更新二维码内容
- 错误处理和加载状态显示
- 响应式设计，数据变化自动更新二维码
- 针对微信小程序环境特别优化

## 使用方法

### 基本用法

```vue
<template>
  <view>
    <zx-qrcode :text="qrText" @getImg="onGetQrImg"></zx-qrcode>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const qrText = ref('https://example.com');
const qrImg = ref('');

const onGetQrImg = (path) => {
  qrImg.value = path;
}
</script>
```

### 自定义样式

```vue
<template>
  <view>
    <zx-qrcode 
      :text="qrText" 
      :size="200" 
      color="#0066FF"
      bgColor="#F5F5F5"
      :showBorder="true"
      borderColor="#000000"
      :borderWidth="10"
      @getImg="onGetQrImg">
    </zx-qrcode>
  </view>
</template>
```

### 调用方法

```vue
<template>
  <view>
    <zx-qrcode ref="qrcode" :text="qrText"></zx-qrcode>
    <button @click="saveQrcode">保存二维码</button>
    <button @click="refreshQrcode">刷新二维码</button>
    <button @click="clearQrcode">清除二维码</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const qrcode = ref(null);
const qrText = ref('https://example.com');

const saveQrcode = () => {
  qrcode.value.saveQrcode();
}

const refreshQrcode = () => {
  qrcode.value.refresh();
}

const clearQrcode = () => {
  qrcode.value.clear();
}
</script>
```

### 微信小程序环境优化

在微信小程序环境中，Canvas的操作存在异步特性，为确保二维码正常生成，组件针对微信小程序做了特殊处理：

1. 自动检测微信小程序环境
2. 使用回调方式处理Canvas绘制完成事件
3. 增加延迟处理，确保绘制完成后再获取图片
4. 优化错误处理，避免"canvas is empty"错误

对于微信小程序，建议设置较长的延迟时间：

```vue
<template>
  <view>
    <zx-qrcode 
      :text="qrText" 
      :delay="500" 
      @getImg="onGetQrImg"
      @error="onError">
    </zx-qrcode>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const qrText = ref('https://example.com');

const onGetQrImg = (path) => {
  console.log('二维码图片路径:', path);
}

const onError = (error) => {
  console.error('二维码生成错误:', error);
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| canvasId | String | 'qrcodeId' | Canvas的标识符 |
| size | Number | 150 | 二维码尺寸（单位px） |
| text | String | 'https://zxui.org/' | 二维码内容 |
| bgColor | String | '#FFFFFF' | 二维码背景色 |
| color | String | '#000000' | 二维码前景色 |
| correctLevel | Number | 0 | 二维码纠错级别（0-3，对应L/M/Q/H） |
| autoSave | Boolean | false | 是否自动保存到相册 |
| showBorder | Boolean | false | 是否显示边框 |
| borderWidth | Number | 8 | 边框宽度 |
| borderColor | String | '#000000' | 边框颜色 |
| margin | Number | 10 | 二维码边距 |
| delay | Number | 300 | 延迟时间(ms)，微信小程序中绘制完成后等待的时间 |

## 事件说明

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| getImg | 获取生成的二维码图片路径 | 图片临时路径 |
| error | 二维码生成错误事件 | 错误对象 |

## 方法说明

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| saveQrcode | 保存二维码到相册 | 无 |
| refresh | 刷新/重新生成二维码 | 无 |
| clear | 清除二维码 | 无 |
| getImgPath | 获取二维码图片路径 | 无 |

## 常见问题

### 微信小程序报错 "canvas is empty"

如果在微信小程序中遇到 `canvasToTempFilePath:fail fail canvas is empty` 错误，可以尝试以下解决方法：

1. 增加 `delay` 属性值，例如设置为 500 或更高
2. 确保 canvas-id 在页面中唯一
3. 如果在组件中使用，确保正确引用和注册组件

```vue
<zx-qrcode :text="qrText" :delay="500"></zx-qrcode>
```
