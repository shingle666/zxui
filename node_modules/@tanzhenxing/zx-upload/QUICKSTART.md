# ZX-Upload 快速上手指南

## 安装使用

### 1. 复制组件文件

将 `zx-upload` 组件文件夹复制到你的 `components` 目录下：

```
components/
├── zx-upload/
│   ├── zx-upload.vue
│   ├── README.md
│   └── demo.vue
```

### 2. 注册组件

#### 全局注册 (main.js)

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ZxUpload from '@/components/zx-upload/zx-upload.vue'

const app = createApp(App)
app.component('ZxUpload', ZxUpload)
app.mount('#app')
```

#### 局部注册

```vue
<script setup>
import ZxUpload from '@/components/zx-upload/zx-upload.vue'
</script>
```

## 基础示例

### 图片上传

```vue
<template>
  <view class="container">
    <text class="title">选择图片</text>
    <zx-upload
      v-model:fileList="imageList"
      accept="image"
      :maxCount="9"
      :multiple="true"
      uploadText="添加图片"
      @change="onImageChange"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([])

const onImageChange = (data) => {
  console.log('图片列表:', data.fileList)
}
</script>
```

### 上传到服务器

```vue
<template>
  <zx-upload
    v-model:fileList="fileList"
    accept="image"
    :autoUpload="true"
    action="https://your-server.com/api/upload"
    :headers="{ Authorization: `Bearer ${token}` }"
    @success="onUploadSuccess"
    @error="onUploadError"
  />
</template>

<script setup>
import { ref } from 'vue'

const fileList = ref([])
const token = ref('your-auth-token')

const onUploadSuccess = (data) => {
  console.log('上传成功:', data)
  uni.showToast({
    title: '上传成功',
    icon: 'success'
  })
}

const onUploadError = (data) => {
  console.error('上传失败:', data)
  uni.showToast({
    title: '上传失败',
    icon: 'error'
  })
}
</script>
```

## 常用配置

### 限制文件大小和类型

```vue
<zx-upload
  v-model:fileList="fileList"
  accept="image"
  :maxSize="2 * 1024 * 1024"
  :extensions="['jpg', 'png', 'gif']"
  tips="支持 JPG、PNG、GIF 格式，大小不超过 2MB"
/>
```

### 自定义样式

```vue
<zx-upload
  v-model:fileList="fileList"
  :size="100"
  uploadIcon="camera"
  uploadIconColor="#409EFF"
  uploadText="拍照"
  :customStyle="{ marginBottom: '20rpx' }"
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

## 服务器端配置

### Node.js (Express + Multer)

```javascript
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

// 配置文件存储
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    
    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error('只支持图片文件'))
    }
  }
})

// 上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '没有文件上传' })
  }
  
  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size
  })
})

// 错误处理
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件过大' })
    }
  }
  res.status(500).json({ error: error.message })
})

app.listen(3000)
```

### PHP 后端示例

```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => '方法不允许']);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => '没有文件上传']);
    exit;
}

$file = $_FILES['file'];
$uploadDir = 'uploads/';
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
$maxSize = 10 * 1024 * 1024; // 10MB

// 验证文件类型
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => '不支持的文件类型']);
    exit;
}

// 验证文件大小
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => '文件过大']);
    exit;
}

// 生成唯一文件名
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = uniqid() . '.' . $extension;
$filepath = $uploadDir . $filename;

// 确保上传目录存在
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// 移动文件
if (move_uploaded_file($file['tmp_name'], $filepath)) {
    echo json_encode([
        'success' => true,
        'url' => $filepath,
        'filename' => $filename,
        'size' => $file['size']
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => '文件上传失败']);
}
?>
```

## 小程序配置

### 微信小程序

在 `manifest.json` 中配置域名白名单：

```json
{
  "mp-weixin": {
    "permission": {
      "scope.writePhotosAlbum": {
        "desc": "保存图片到相册"
      }
    },
    "requiredBackgroundModes": ["audio"],
    "usingComponents": true
  }
}
```

在微信小程序管理后台配置服务器域名：
- 开发 → 开发管理 → 开发设置 → 服务器域名
- 添加 `uploadFile` 合法域名

### uni-app manifest.json 配置

```json
{
  "name": "your-app",
  "appid": "your-appid",
  "mp-weixin": {
    "appid": "wx-appid",
    "setting": {
      "urlCheck": false
    }
  },
  "h5": {
    "router": {
      "mode": "hash"
    }
  }
}
```

## 常见问题

### 1. 图片不显示
- 检查图片路径是否正确
- 检查服务器是否支持跨域
- H5 端检查图片域名是否在白名单中

### 2. 上传失败
- 检查服务器接口是否正常
- 检查文件大小是否超限
- 检查网络连接状态

### 3. 小程序无法选择文件
- 检查是否配置了域名白名单
- 检查 `accept` 参数是否正确
- 部分功能仅微信小程序支持

### 4. 样式问题
- 检查是否正确引入样式文件
- 检查 rpx 单位是否正确转换
- 自定义样式可能被其他样式覆盖

## 进阶使用

### 自定义预览

```vue
<template>
  <zx-upload
    v-model:fileList="fileList"
    @preview="onPreview"
  />
</template>

<script setup>
const onPreview = ({ file, index }) => {
  // 自定义预览逻辑
  if (file.type === 'video') {
    // 使用自定义视频播放器
    showVideoPlayer(file.url)
  } else {
    // 使用自定义图片预览
    showImageViewer(file.url)
  }
}
</script>
```

### 批量上传

```vue
<template>
  <view>
    <zx-upload
      v-model:fileList="fileList"
      :autoUpload="false"
      @change="onChange"
    />
    <button @tap="uploadAll">批量上传</button>
  </view>
</template>

<script setup>
const uploadAll = async () => {
  const readyFiles = fileList.value.filter(file => file.status === 'ready')
  
  for (const file of readyFiles) {
    try {
      await uploadSingleFile(file)
    } catch (error) {
      console.error('上传失败:', error)
    }
  }
}

const uploadSingleFile = (file) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'https://your-server.com/upload',
      filePath: file.url,
      name: 'file',
      success: resolve,
      fail: reject
    })
  })
}
</script>
```

这样就可以快速上手使用 ZX-Upload 组件了！更多详细配置请参考 [README.md](./README.md)。 