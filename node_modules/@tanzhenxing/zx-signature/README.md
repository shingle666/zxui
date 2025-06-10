# zx-signature 签名组件

基于 Canvas 的签名组件，支持 H5、小程序、App 多端使用。

## 特性

- 🎨 支持自定义线条颜色、粗细
- 📱 支持触摸绘制，流畅的签名体验
- 🖼️ 支持导出为图片文件
- 🎯 支持多端运行（H5、小程序、App）
- 🛠️ 支持自定义样式和尺寸
- 🚫 支持禁用状态
- 📋 支持占位符提示

## 安装使用

### 基础用法

```vue
<template>
  <zx-signature 
    @confirm="onConfirm"
    @clear="onClear"
  />
</template>

<script setup>
import ZxSignature from '@/components/zx-signature/zx-signature.vue'

const onConfirm = (result) => {
  console.log('签名结果:', result)
  // result.filePath - 图片文件路径
  // result.canvas - Canvas 上下文
  // result.width - 画布宽度
  // result.height - 画布高度
}

const onClear = () => {
  console.log('签名已清除')
}
</script>
```

### 自定义样式

```vue
<template>
  <zx-signature
    :line-width="5"
    stroke-style="#ff6b6b"
    background-color="#f8f9fa"
    placeholder="请在此处签名"
    clear-text="重新签名"
    confirm-text="确认签名"
    :custom-style="{ height: '300px' }"
    @confirm="onConfirm"
  />
</template>
```

### 禁用状态

```vue
<template>
  <zx-signature
    disabled
    placeholder="签名功能已禁用"
  />
</template>
```

### 通过 ref 调用方法

```vue
<template>
  <zx-signature ref="signatureRef" />
  <button @click="clearSignature">清除签名</button>
  <button @click="saveSignature">保存签名</button>
</template>

<script setup>
import { ref } from 'vue'

const signatureRef = ref()

const clearSignature = () => {
  signatureRef.value.clear()
}

const saveSignature = () => {
  if (signatureRef.value.hasDrawn) {
    signatureRef.value.confirm()
  } else {
    uni.showToast({ title: '请先进行签名', icon: 'none' })
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| customStyle | 自定义样式 | Object \| String | {} |
| lineWidth | 线条宽度 | Number | 3 |
| strokeStyle | 线条颜色 | String | '#000000' |
| backgroundColor | 背景颜色 | String | '#ffffff' |
| type | 图片格式，可选值：png、jpg | String | 'png' |
| quality | 图片质量，取值范围 0-1 | Number | 1 |
| placeholder | 占位符文本 | String | '请在此处签名' |
| clearText | 清除按钮文本 | String | '重签' |
| confirmText | 确认按钮文本 | String | '确认' |
| disabled | 是否禁用 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| start | 开始签名时触发 | event: TouchEvent |
| signing | 签名过程中触发 | event: TouchEvent |
| end | 签名结束时触发 | event: TouchEvent |
| confirm | 确认签名时触发 | result: { canvas, filePath, width, height } |
| clear | 清除签名时触发 | - |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| clear | 清除签名 | - |
| confirm | 确认并导出签名 | - |
| hasDrawn | 是否已经签名（计算属性） | - |

### 返回值说明

`confirm` 事件的回调参数 `result` 包含以下字段：

- `canvas`: Canvas 上下文对象
- `filePath`: 导出的图片临时文件路径
- `width`: 画布宽度（像素）
- `height`: 画布高度（像素）

## 样式定制

### CSS 变量

组件支持通过 CSS 变量进行样式定制：

```scss
.zx-signature {
  --signature-height: 250px; // 签名区域高度
  --signature-border-color: #e4e7ed; // 边框颜色
  --signature-border-radius: 8px; // 边框圆角
  --signature-bg-color: #ffffff; // 背景颜色
}
```

### 自定义样式示例

```vue
<template>
  <zx-signature 
    class="custom-signature"
    :custom-style="customStyle"
  />
</template>

<script setup>
const customStyle = {
  '--signature-height': '300px',
  '--signature-border-color': '#409eff',
  '--signature-border-radius': '12px',
  marginBottom: '20px'
}
</script>

<style>
.custom-signature {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. **Canvas 尺寸**: 组件会自动获取容器尺寸来设置 Canvas 大小，确保容器有明确的宽高。

2. **图片导出**: 导出的图片为临时文件，如需永久保存请使用 `uni.saveFile` 等 API。

3. **平台兼容性**: 
   - H5: 完全支持
   - 小程序: 完全支持
   - App: 完全支持

4. **性能优化**: 签名过程中会实时绘制，在低端设备上可能存在性能问题，可以通过降低 `lineWidth` 来优化。

5. **触摸事件**: 组件已禁用滚动，确保签名时不会触发页面滚动。

## 常见问题

### Q: 为什么签名区域显示空白？
A: 请检查容器是否有明确的高度，组件需要容器有确定的尺寸才能正确初始化 Canvas。

### Q: 如何自定义签名区域大小？
A: 可以通过 `customStyle` 属性或 CSS 变量 `--signature-height` 来设置高度，宽度会自动适应容器。

### Q: 导出的图片质量不清晰怎么办？
A: 可以调整 `quality` 属性（0-1），值越大质量越高，同时文件也会更大。

### Q: 在小程序中无法正常使用？
A: 请确保在 `pages.json` 中正确配置了页面，并且组件路径正确。

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础签名功能
- ✨ 支持自定义样式
- ✨ 支持多端运行
- ✨ 支持图片导出