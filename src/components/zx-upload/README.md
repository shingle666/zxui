# zx-upload 上传组件

## 组件介绍

`zx-upload` 是一个功能强大的文件上传组件，可用于图片、视频及文件的选择、预览和上传。支持单选/多选、文件大小限制、自定义样式、进度显示、重试功能等。

## 新版本特性

✨ **新增功能**
- 📊 **进度显示**：实时显示上传进度条
- 🔄 **重试功能**：上传失败时支持重试
- 📋 **文件列表模式**：支持图片和文件列表两种展示模式
- 🎯 **严格类型检查**：支持文件扩展名和 MIME 类型验证
- 🎨 **更好的视觉反馈**：错误状态、加载状态、成功状态的视觉优化
- 🔧 **自动上传**：可配置自动上传到服务器
- 📱 **更好的兼容性**：优化跨平台兼容性

## 基础用法

```vue
<template>
  <view>
    <!-- 基础图片上传 -->
    <zx-upload 
      :file-list="fileList" 
      @afterRead="afterRead" 
      @delete="deletePic" 
      :max-count="5"
    />
    
    <!-- 文件列表模式 -->
    <zx-upload 
      :file-list="fileList2"
      list-type="text"
      accept="file"
      :extensions="['pdf', 'doc', 'docx']"
      @afterRead="afterRead"
    />
    
    <!-- 自动上传到服务器 -->
    <zx-upload 
      :file-list="fileList3"
      :auto-upload="true"
      action="https://your-server.com/upload"
      :headers="{ 'Authorization': 'Bearer token' }"
      :data="{ userId: 123 }"
      @progress="onProgress"
      @afterRead="afterRead"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);
const fileList2 = ref([]);
const fileList3 = ref([]);

// 读取文件后的处理
const afterRead = (event) => {
  const { file } = event;
  
  // 如果不是自动上传，需要手动处理
  if (!autoUpload) {
    const targetList = getTargetFileList(event);
    targetList.value.push({
      ...file,
      status: 'uploading',
      message: '上传中'
    });
    
    // 模拟上传
    setTimeout(() => {
      const lastIndex = targetList.value.length - 1;
      targetList.value[lastIndex].status = 'success';
    }, 1500);
  }
};

// 上传进度回调
const onProgress = (event) => {
  console.log('上传进度:', event.progress);
};

// 删除文件
const deletePic = (event) => {
  const targetList = getTargetFileList(event);
  targetList.value.splice(event.index, 1);
};

// 获取对应的文件列表
const getTargetFileList = (event) => {
  // 根据 name 或其他标识确定目标列表
  return fileList; // 简化示例
};
</script>
```

## 属性说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型，可选值为 `image`、`video`、`file`，微信小程序还支持 `media`、`all` | String | image |
| extensions | 允许上传的文件扩展名数组，如 `['jpg', 'png', 'pdf']` | Array | [] |
| capture | 图片或视频拾取模式，可选值为 `['album', 'camera']` | Array/String | ['album', 'camera'] |
| compressed | 当 accept 为 video 时是否压缩视频 | Boolean | true |
| camera | 当 accept 为 video 时，指定摄像头，可选值 `back`（后置）或 `front`（前置） | String | back |
| maxDuration | 当 accept 为 video 时，拍摄视频最长时间，单位秒 | Number | 60 |
| uploadIcon | 上传区域的图标 | String | camera-fill |
| uploadIconColor | 上传区域图标的颜色 | String | #D3D4D6 |
| useBeforeRead | 是否开启文件读取前事件 | Boolean | false |
| previewFullImage | 是否显示组件自带的图片预览功能 | Boolean | true |
| maxCount | 最大上传数量 | String/Number | 52 |
| disabled | 是否禁用 | Boolean | false |
| imageMode | 预览图片的裁剪模式 | String | aspectFill |
| name | 标识符，可用于区分多个上传组件 | String | '' |
| sizeType | 所选图片的尺寸，可选值为 `original`（原图）、`compressed`（压缩图） | Array | ['original', 'compressed'] |
| multiple | 是否开启图片多选 | Boolean | false |
| deletable | 是否展示删除按钮 | Boolean | true |
| maxSize | 文件大小限制，单位为字节 | String/Number | Number.MAX_VALUE |
| fileList | 显示已上传的文件列表 | Array | [] |
| uploadText | 上传区域的提示文字 | String | '' |
| width | 内部预览和选择按钮的区域宽度 | String/Number | 80 |
| height | 内部预览和选择按钮的区域高度 | String/Number | 80 |
| customStyle | 组件的自定义样式 | Object | {} |
| **显示模式** |
| listType | 文件列表展示类型，可选值 `picture`（图片模式）、`text`（列表模式） | String | picture |
| showProgress | 是否显示上传进度 | Boolean | true |
| showRetry | 是否显示重试按钮 | Boolean | true |
| **自动上传** |
| autoUpload | 是否自动上传 | Boolean | true |
| action | 上传地址 | String | '' |
| headers | 上传请求头 | Object | {} |
| data | 上传参数 | Object | {} |
| filename | 上传文件字段名 | String | file |
| **其他** |
| tips | 提示信息 | String | '' |
| strict | 严格文件类型检查 | Boolean | false |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| afterRead | 文件读取完成后触发 | `{ file, name, index }` |
| beforeRead | 文件读取前的钩子函数，返回 `false` 则停止文件读取 | `{ file, name, index, callback }` |
| oversize | 文件超出大小限制时触发 | `{ file, name, index }` |
| clickPreview | 点击预览文件时触发 | `{ url, name, index, ...其他文件信息 }` |
| delete | 删除文件时触发 | `{ file, name, index }` |
| error | 文件上传错误时触发 | `error` |
| progress | 上传进度变化时触发 | `{ progress, file, index }` |
| retry | 点击重试时触发 | `{ file, index }` |

## 插槽说明

| 名称 | 说明 |
| --- | --- |
| default | 自定义上传按钮的内容，如不提供则使用默认按钮样式 |

## 文件对象结构

上传后的文件对象结构示例：

```js
{
  url: 'https://example.com/image.png', // 文件地址
  thumb: 'https://example.com/image.png', // 缩略图地址，视频类型时可以是视频的第一帧
  type: 'image', // 文件类型，可选值：image（图片）、video（视频）、file（文件）
  name: 'image.png', // 文件名称
  size: 123456, // 文件大小，单位字节
  status: 'success', // 文件状态，可选值：ready（就绪）、uploading（上传中）、failed（上传失败）、success（上传成功）
  progress: 100, // 上传进度 0-100
  message: '上传完成', // 提示消息
  deletable: true, // 是否显示删除按钮，优先级高于组件的 deletable 属性
}
```

## 平台差异说明

| 功能 | H5 | 微信小程序 | APP | 其他小程序 |
| --- | --- | --- | --- | --- |
| 基础上传 | ✅ | ✅ | ✅ | ✅ |
| accept="media" | ❌ | ✅ | ❌ | ❌ |
| accept="file" | ✅ | ✅ | ❌ | ❌ |
| 进度显示 | ✅ | ✅ | ✅ | ✅ |
| 严格类型检查 | ✅ | 部分 | 部分 | 部分 |

## 使用示例

### 1. 图片上传带预览

```vue
<zx-upload 
  :file-list="imageList"
  accept="image"
  :max-count="9"
  :max-size="2 * 1024 * 1024"
  @afterRead="handleImageRead"
  @oversize="handleOversize"
  @delete="handleDelete"
/>
```

### 2. 文件列表模式

```vue
<zx-upload 
  :file-list="documentList"
  list-type="text"
  accept="file"
  :extensions="['pdf', 'doc', 'docx']"
  @afterRead="handleDocumentRead"
  @clickPreview="handlePreview"
/>
```

### 3. 自动上传到服务器

```vue
<zx-upload 
  :file-list="uploadList"
  :auto-upload="true"
  action="https://your-api.com/upload"
  :headers="{ 'Authorization': `Bearer ${token}` }"
  :data="{ category: 'images' }"
  filename="image"
  @progress="handleProgress"
  @afterRead="handleUploadRead"
  @error="handleUploadError"
/>
```

### 4. 严格文件类型检查

```vue
<zx-upload 
  :file-list="strictList"
  accept="image"
  :strict="true"
  :extensions="['jpg', 'jpeg', 'png']"
  @afterRead="handleStrictRead"
/>
```

### 5. 视频上传

```vue
<zx-upload 
  :file-list="videoList"
  accept="video"
  :compressed="true"
  :max-duration="30"
  camera="back"
  @afterRead="handleVideoRead"
/>
```

### 6. 自定义上传按钮

```vue
<zx-upload :file-list="fileList" @afterRead="afterRead">
  <view class="custom-upload-btn">
    <zx-icon name="plus" size="22"></zx-icon>
    <text>自定义上传</text>
  </view>
</zx-upload>
```

## 方法说明

通过 ref 可以调用组件的方法：

```vue
<template>
  <zx-upload ref="uploadRef" :file-list="fileList" />
  <button @click="chooseFile">选择文件</button>
  <button @click="uploadFiles">上传文件</button>
</template>

<script setup>
import { ref } from 'vue';

const uploadRef = ref();
const fileList = ref([]);

// 手动触发选择文件
const chooseFile = () => {
  uploadRef.value.chooseFile();
};

// 手动上传文件
const uploadFiles = () => {
  const readyFiles = fileList.value.filter(file => file.status === 'ready');
  readyFiles.forEach(file => {
    uploadRef.value.uploadFile(file);
  });
};
</script>
```

## 常见问题

### 1. 如何实现自定义上传按钮？

```vue
<zx-upload :file-list="fileList" @afterRead="afterRead">
  <view class="custom-upload-btn">
    <zx-icon name="plus" size="22"></zx-icon>
    <text>自定义上传</text>
  </view>
</zx-upload>
```

### 2. 如何限制文件类型？

```vue
<!-- 方式1：使用 accept 属性 -->
<zx-upload accept="image" />

<!-- 方式2：使用 extensions 属性 -->
<zx-upload :extensions="['jpg', 'png', 'pdf']" />

<!-- 方式3：严格模式 -->
<zx-upload accept="image" :strict="true" />
```

### 3. 如何处理上传失败？

```vue
<zx-upload 
  :file-list="fileList"
  :show-retry="true"
  @error="handleError"
  @retry="handleRetry"
/>

<script setup>
const handleError = (error) => {
  console.error('上传失败:', error);
  uni.showToast({
    title: '上传失败，请重试',
    icon: 'none'
  });
};

const handleRetry = ({ file, index }) => {
  console.log('重试上传:', file.name);
};
</script>
```

### 4. 如何实现分片上传？

```vue
<script setup>
const handleAfterRead = (event) => {
  const { file } = event;
  
  // 大文件分片上传
  if (file.size > 5 * 1024 * 1024) { // 5MB
    uploadFileInChunks(file);
  } else {
    normalUpload(file);
  }
};

const uploadFileInChunks = async (file) => {
  const chunkSize = 1024 * 1024; // 1MB per chunk
  const chunks = Math.ceil(file.size / chunkSize);
  
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.raw.slice(start, end);
    
    // 上传单个分片
    await uploadChunk(chunk, i, chunks, file);
  }
};
</script>
```

### 5. 如何实现拖拽排序？

组件本身不支持拖拽排序，但可以结合第三方拖拽库实现：

```vue
<template>
  <draggable v-model="fileList" @end="onSortEnd">
    <zx-upload 
      v-for="(item, index) in fileList" 
      :key="item.id"
      :file-list="[item]"
      @delete="handleDelete(index)"
    />
  </draggable>
</template>
```

## 样式自定义

组件支持 SCSS 变量自定义：

```scss
// 在你的样式文件中覆盖默认变量
$zx-upload-button-bgColor: #f0f0f0;
$zx-upload-button-border-radius: 8px;
$zx-upload-success: #52c41a;

// 然后导入组件
@import '@/components/zx-upload/zx-upload.vue';
```

## 更新日志

### v2.0.0
- ✨ 新增进度显示和重试功能
- ✨ 新增文件列表展示模式
- ✨ 新增自动上传功能
- ✨ 新增严格文件类型检查
- 🐛 修复文件预览问题
- 💄 优化视觉效果和用户体验
- 📝 完善文档和示例
- 📱 优化移动端体验

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持图片、视频、文件上传
- ✨ 支持预览和删除功能
- ✨ 跨平台兼容性支持
