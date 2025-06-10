# zx-barcode 条形码组件

基于 uni-app 封装的条形码生成组件，支持CODE-128编码格式，同时兼容H5、小程序和App平台。

## 特性

- ✅ 跨平台支持：H5、App、微信小程序等多平台兼容
- ✅ 基于 canvas 绘制，性能良好
- ✅ 支持自定义颜色和样式
- ✅ 长按保存条形码到相册
- ✅ 自动监听文本变化，动态更新条形码
- ✅ 支持自定义宽高

## 使用方式

### 基础用法

```vue
<template>
  <view>
    <zx-barcode :text="barcodeText"></zx-barcode>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const barcodeText = ref('1234567890');
</script>
```

### 自定义样式

```vue
<template>
  <view>
    <zx-barcode 
      :text="barcodeText" 
      :width="600" 
      :height="150"
      foreground="#0066FF"
      background="#F5F5F5"
    ></zx-barcode>
  </view>
</template>
```

### 监听图片生成

```vue
<template>
  <view>
    <zx-barcode 
      :text="barcodeText" 
      @getImg="onGetImg"
    ></zx-barcode>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const barcodeText = ref('1234567890');
const barcodeImg = ref('');

const onGetImg = (path) => {
  barcodeImg.value = path;
  console.log('条形码图片路径:', path);
};
</script>
```

### 手动保存条形码

```vue
<template>
  <view>
    <zx-barcode ref="barcodeRef" :text="barcodeText"></zx-barcode>
    <button @click="saveBarcode">保存条形码</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const barcodeRef = ref(null);
const barcodeText = ref('1234567890');

const saveBarcode = () => {
  barcodeRef.value.saveBarcode();
};
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| canvasId | String | 'barcodeId' | Canvas的ID，页面中使用多个条形码时需要设置不同的ID |
| width | Number | 690 | 条形码宽度，单位rpx |
| height | Number | 180 | 条形码高度，单位rpx |
| text | String | '1221339122586765388' | 要生成条形码的文本内容 |
| background | String | '#ffffff' | 条形码背景色 |
| foreground | String | '#000000' | 条形码前景色（条形码颜色） |
| autoWidth | Boolean | true | 是否根据文本长度自动调整宽度 |
| disabled | Boolean | false | 是否禁用长按保存功能 |

## 事件

| 事件名 | 说明 | 返回参数 |
|--------|------|----------|
| getImg | 条形码图片生成完成后触发 | 图片临时路径 |

## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| saveBarcode | 保存条形码到相册 | - |
| refresh | 刷新/重绘条形码 | - |

## 平台差异说明

- 在H5平台下，长按保存会触发图片下载
- 在小程序和App平台，长按保存会将图片保存到相册（需授权）
- 小程序平台需在 `app.json` 或页面 `json` 中配置 `permission` 相关内容以获取相册权限

## 注意事项

1. 条形码文本建议使用数字，以获得最佳的编码效率和扫描效果
2. 过长的文本可能导致条形码过宽，请适当调整宽度或减少文本长度
3. 如需在条形码下方显示文本，可自行在组件外部添加

## 示例展示

```vue
<template>
  <view class="container">
    <view class="section">
      <text class="title">标准条形码</text>
      <zx-barcode :text="'1234567890'"></zx-barcode>
    </view>
    
    <view class="section">
      <text class="title">自定义颜色</text>
      <zx-barcode 
        :text="'9876543210'" 
        foreground="#0066FF"
        background="#F5F5F5"
      ></zx-barcode>
    </view>
    
    <view class="section">
      <text class="title">自定义尺寸</text>
      <zx-barcode 
        :text="'ABCDEFG123'" 
        :width="500"
        :height="120"
      ></zx-barcode>
    </view>
  </view>
</template>

<style>
.container {
  padding: 20rpx;
}
.section {
  margin-bottom: 30rpx;
}
.title {
  font-size: 28rpx;
  margin-bottom: 10rpx;
  display: block;
}
</style>
