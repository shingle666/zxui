# ZX-Upload 上传组件

基于 UniApp 的移动端文件上传组件，支持图片、视频、文件上传，具有丰富的功能和良好的用户体验。

## 特性

- 🚀 **多平台支持**: 支持微信小程序、App、H5 等平台
- 📱 **移动端优化**: 专为移动端设计，触摸友好的交互体验
- 🎨 **多种展示模式**: 支持图片预览模式和文件列表模式
- 📊 **上传进度**: 实时显示上传进度和状态
- 🔄 **重试机制**: 上传失败后支持重试功能
- 🎯 **文件类型限制**: 支持扩展名和文件大小限制
- 📤 **自动上传**: 选择文件后自动上传到服务器
- 👀 **文件预览**: 支持图片预览、视频播放等功能

## 基础用法

```vue
<template>
  <zx-upload
    v-model:fileList="fileList"
    accept="image"
    :maxCount="9"
    :multiple="true"
    uploadText="上传图片"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([])

const handleChange = (data) => {
  console.log('文件列表变化:', data)
}
</script>
```

## Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fileList | Array | `[]` | 文件列表，支持 v-model |
| accept | String | `'image'` | 接受的文件类型：`image`/`video`/`file`/`media` |
| extensions | Array | `[]` | 允许的文件扩展名，如 `['jpg', 'png']` |
| maxCount | Number | `9` | 最大上传数量 |
| maxSize | Number | `10485760` | 文件大小限制（字节），默认 10MB |
| multiple | Boolean | `false` | 是否支持多选 |
| disabled | Boolean | `false` | 是否禁用 |
| deletable | Boolean | `true` | 是否显示删除按钮 |
| previewImage | Boolean | `true` | 是否显示预览 |
| imageMode | String | `'aspectFill'` | 图片裁剪模式 |
| uploadIcon | String | `'plus'` | 上传按钮图标 |
| uploadIconColor | String | `'#C0C4CC'` | 上传按钮图标颜色 |
| uploadText | String | `''` | 上传按钮文字 |
| size | Number/String | `80` | 组件尺寸（rpx） |
| customStyle | Object | `{}` | 自定义样式 |
| listType | String | `'picture'` | 列表类型：`picture`/`text` |
| showProgress | Boolean | `true` | 是否显示上传进度 |
| showRetry | Boolean | `true` | 是否显示重试按钮 |
| autoUpload | Boolean | `true` | 是否自动上传 |
| action | String | `''` | 上传地址 |
| headers | Object | `{}` | 上传请求头 |
| data | Object | `{}` | 上传表单数据 |
| name | String | `'file'` | 上传文件字段名 |
| tips | String | `''` | 提示信息 |
| sizeType | Array | `['original', 'compressed']` | 图片质量 |
| sourceType | Array | `['album', 'camera']` | 图片来源 |

## Events 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:fileList | 文件列表更新 | fileList |
| change | 文件列表变化 | `{ fileList, file }` |
| progress | 上传进度 | `{ file, progressEvent }` |
| success | 上传成功 | `{ file, response }` |
| error | 上传失败 | `{ file, error }` |
| remove | 删除文件 | `{ file, fileList }` |
| preview | 预览文件 | `{ file, index }` |
| exceed | 超出数量限制 | `{ files, limit }` |

## 文件对象结构

```javascript
{
  uid: 'unique-id',        // 唯一标识
  url: 'file-path',        // 文件路径
  thumb: 'thumb-path',     // 缩略图路径（视频）
  name: 'file-name',       // 文件名
  size: 102400,            // 文件大小（字节）
  type: 'image',           // 文件类型
  status: 'success',       // 状态：ready/uploading/success/error
  progress: 100,           // 上传进度（0-100）
  message: '上传失败',      // 错误信息
  response: {},            // 服务器响应数据
  loadError: false         // 图片加载失败标识
}
```

## 使用示例

### 基础图片上传

```vue
<zx-upload
  v-model:fileList="imageList"
  accept="image"
  :maxCount="9"
  :multiple="true"
  uploadText="上传图片"
/>
```

### 视频上传

```vue
<zx-upload
  v-model:fileList="videoList"
  accept="video"
  :maxCount="3"
  :maxSize="50 * 1024 * 1024"
  uploadText="上传视频"
/>
```

### 自动上传到服务器

```vue
<zx-upload
  v-model:fileList="uploadList"
  accept="image"
  :autoUpload="true"
  action="https://your-server.com/upload"
  :headers="{ Authorization: 'Bearer token' }"
  :data="{ userId: '123' }"
  name="file"
  @success="onUploadSuccess"
  @error="onUploadError"
/>
```

### 限制文件类型

```vue
<zx-upload
  v-model:fileList="restrictList"
  accept="image"
  :extensions="['jpg', 'png', 'gif']"
  uploadText="仅支持 JPG/PNG/GIF"
  tips="只能上传 JPG、PNG、GIF 格式的图片"
/>
```

### 文件列表模式

```vue
<zx-upload
  v-model:fileList="fileList"
  accept="file"
  listType="text"
  uploadText="选择文件"
/>
```

### 自定义样式

```vue
<zx-upload
  v-model:fileList="customList"
  accept="image"
  :size="120"
  uploadIcon="camera"
  uploadIconColor="#409EFF"
  uploadText="拍照"
  :customStyle="{ marginBottom: '20rpx' }"
/>
```

## 平台兼容性

| 功能 | 微信小程序 | App | H5 | 说明 |
|------|-----------|-----|----|----|
| 图片选择 | ✅ | ✅ | ✅ | 支持多选和单选 |
| 视频选择 | ✅ | ✅ | ✅ | 单选 |
| 文件选择 | ✅ | ❌ | ✅ | 仅微信小程序和 H5 |
| 媒体选择 | ✅ | ❌ | ❌ | 仅微信小程序 |
| 图片预览 | ✅ | ✅ | ✅ | 系统预览 |
| 视频预览 | ✅ | ❌ | ❌ | 仅微信小程序 |
| 文件上传 | ✅ | ✅ | ✅ | uni.uploadFile |

## 注意事项

1. **平台差异**: 不同平台支持的文件类型和 API 有差异，组件已做兼容处理
2. **文件大小**: 建议设置合理的文件大小限制，避免上传超大文件
3. **网络配置**: 小程序平台需要在管理后台配置服务器域名白名单
4. **图标依赖**: 组件依赖 `zx-icon` 组件，请确保已正确引入
5. **样式单位**: 组件使用 rpx 单位，适配不同屏幕尺寸

## 更新日志

### v2.0.0
- 重构组件架构，优化代码结构
- 改进移动端体验和交互逻辑
- 优化文件类型检测和错误处理
- 简化 API 设计，提升易用性
- 完善文档和示例代码

### v1.x.x
- 初始版本功能实现
