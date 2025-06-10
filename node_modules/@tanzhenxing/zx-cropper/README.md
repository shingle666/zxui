# zx-cropper 裁剪组件

## 组件简介

`zx-cropper` 是一个基于 `uni-app` 的图片裁剪组件，支持 H5、微信小程序、App 等多端，支持矩形/圆形裁剪、旋转、缩放、拖动、导出图片等功能。

## 支持平台
- H5
- 微信小程序
- App（含nvue）

## 基本用法

```vue
<template>
  <zx-cropper
    v-model:imageUrl="imageUrl"
    :width="280"
    :height="280"
    :isRound="true"
    :scaleRatio="2"
    :quality="0.8"
    :minScale="0.5"
    :maxScale="2"
    :custom="false"
    @cropper="onCropper"
  />
</template>

<script setup>
import { ref } from 'vue';
import zxCropper from '@/components/zx-cropper/zx-cropper.vue';

const imageUrl = ref('');
function onCropper(data) {
  // data.url 裁剪后图片临时路径
  // data.base64 裁剪后图片base64
}
</script>
```

## 属性说明
| 属性名         | 类型           | 默认值         | 说明                       |
| -------------- | -------------- | -------------- | -------------------------- |
| imageUrl       | String         | ''             | 待裁剪图片路径             |
| width          | Number         | 280            | 裁剪框宽度(px)             |
| height         | Number         | 280            | 裁剪框高度(px)             |
| isRound        | Boolean        | true           | 是否为圆形裁剪框           |
| border         | String         | 1px solid #fff | 裁剪框边框样式             |
| scaleRatio     | Number         | 2              | 导出图片相对裁剪框的比例   |
| quality        | Number         | 0.8            | 导出图片质量(0-1]          |
| rotateAngle    | Number         | 0              | 初始旋转角度               |
| minScale       | Number         | 0.5            | 最小缩放比例               |
| maxScale       | Number         | 2              | 最大缩放比例               |
| custom         | Boolean        | false          | 是否自定义操作栏           |
| startCutting   | Number/Boolean | 0              | custom为true时，触发裁剪   |
| isBase64       | Boolean        | false          | 是否返回base64（H5默认base64）|
| loadding       | Boolean        | true           | 裁剪时是否显示loading       |
| rotateImg      | String         | '/static/components/cropper/img_rotate.png' | 旋转按钮图片 |

## 事件说明
| 事件名      | 说明                       | 回调参数           |
| ----------- | -------------------------- | ------------------ |
| cropper     | 裁剪完成后回调             | data: {url, base64, width, height} |
| ready       | 组件初始化完成             | -                  |
| imageLoad   | 图片加载完成               | -                  |
| initAngle   | 初始化角度回调             | -                  |

## 方法说明
- 通过ref可调用组件方法（如重置、获取图片等，setup语法糖下可用`defineExpose`暴露方法）

## 常见用法
1. 选择图片后赋值给`imageUrl`，即可进入裁剪。
2. 点击"完成"按钮后会触发`cropper`事件，返回裁剪后图片信息。
3. 可通过`isRound`切换圆形/矩形裁剪框。
4. 支持手势缩放、拖动、旋转。

## 注意事项
- H5端导出图片为base64，其他端为临时文件路径。
- 建议裁剪框尺寸不要超过屏幕宽高。
- 组件样式可根据实际需求自定义。

## 组件示例
详见 `src/pages/components/cropper/index.vue`。
