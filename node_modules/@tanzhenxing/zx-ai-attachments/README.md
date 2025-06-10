# ZxAiAttachments 附件组件

用于展示一组附件信息集合的 Vue 3 组件，基于 uni-app 框架开发，支持全平台使用。

## 特性

- 🎯 **多平台兼容**：支持 H5、微信小程序、其他小程序平台、App
- 🎨 **丰富的展示样式**：支持换行、横向滚动、纵向滚动等布局方式
- 📱 **响应式设计**：自适应不同屏幕尺寸
- 🎭 **文件类型识别**：自动识别并展示不同文件类型的图标
- 🔧 **高度可定制**：支持自定义样式、占位内容等
- ♿ **无障碍支持**：支持禁用状态和键盘导航
- 📦 **轻量级**：纯 JavaScript 实现，无外部依赖

## 安装使用

### 1. 组件引入

```vue
<template>
  <zx-ai-attachments
    :items="attachments"
    @remove="handleRemove"
    @preview="handlePreview"
  />
</template>

<script setup>
import ZxAiAttachments from '@/components/zx-ai-attachments/zx-ai-attachments.vue';

const attachments = ref([
  {
    uid: '1',
    name: '文档.pdf',
    size: 1024 * 1024 * 2,
    type: 'application/pdf',
    status: 'done'
  }
]);

const handleRemove = (item) => {
  console.log('移除文件:', item);
};

const handlePreview = (item) => {
  console.log('预览文件:', item);
};
</script>
```

### 2. 全局注册（可选）

```javascript
// main.js
import ZxAiAttachments from '@/components/zx-ai-attachments/zx-ai-attachments.vue';

app.component('ZxAiAttachments', ZxAiAttachments);
```

## API 文档

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| items | 附件列表 | `Attachment[]` | `[]` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| overflow | 文件列表超出时样式 | `'wrap' \| 'scrollX' \| 'scrollY'` | `'wrap'` | - |
| placeholder | 没有文件时的占位信息 | `string \| PlaceholderConfig` | `null` | - |
| imageProps | 图片属性配置 | `object` | `{}` | - |
| customClass | 自定义样式类名 | `string` | `''` | - |
| customStyle | 自定义样式对象 | `string \| object` | `''` | - |
| classNames | 语义化样式类名 | `Record<string, string>` | `{}` | - |
| styles | 语义化样式对象 | `Record<string, object>` | `{}` | - |

#### Attachment 类型定义

```typescript
interface Attachment {
  uid: string;                    // 唯一标识
  name: string;                   // 文件名
  size?: number;                  // 文件大小（字节）
  type?: string;                  // 文件类型
  status?: 'uploading' | 'done' | 'error'; // 上传状态
  percent?: number;               // 上传进度（0-100）
  url?: string;                   // 文件 URL
  thumbUrl?: string;              // 缩略图 URL
  preview?: string;               // 预览 URL
}
```

#### PlaceholderConfig 类型定义

```typescript
interface PlaceholderConfig {
  icon?: string;                  // 图标内容
  title?: string;                 // 标题
  description?: string;           // 描述
}
```

#### ClassNames 语义化类名

| 属性 | 说明 |
| --- | --- |
| list | 文件列表容器类名 |
| item | 文件项容器类名 |
| placeholder | 占位内容容器类名 |

#### Styles 语义化样式

| 属性 | 说明 |
| --- | --- |
| list | 文件列表容器样式 |
| item | 文件项容器样式 |
| placeholder | 占位内容容器样式 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| remove | 点击移除文件时触发 | `(item: Attachment) => void` |
| preview | 点击预览文件时触发 | `(item: Attachment) => void` |
| click | 点击组件时触发 | `() => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| placeholder | 自定义占位内容 | `{ type: 'inline' }` |

## 使用示例

### 基础用法

```vue
<template>
  <zx-ai-attachments
    :items="attachments"
    @remove="handleRemove"
    @preview="handlePreview"
  />
</template>

<script setup>
const attachments = ref([
  {
    uid: '1',
    name: '产品设计图.png',
    size: 1024 * 1024 * 2.5,
    type: 'image/png',
    status: 'done',
    url: 'https://example.com/image.png'
  },
  {
    uid: '2',
    name: '项目文档.pdf',
    size: 1024 * 1024 * 5.2,
    type: 'application/pdf',
    status: 'done'
  }
]);
</script>
```

### 占位信息

```vue
<template>
  <!-- 字符串占位 -->
  <zx-ai-attachments
    :items="[]"
    placeholder="请选择要上传的文件"
  />
  
  <!-- 对象配置占位 -->
  <zx-ai-attachments
    :items="[]"
    :placeholder="{
      icon: '☁️',
      title: '拖拽文件到此处',
      description: '支持图片、文档、音频、视频等格式'
    }"
  />
  
  <!-- 插槽自定义占位 -->
  <zx-ai-attachments :items="[]">
    <template #placeholder>
      <view class="custom-placeholder">
        <text>自定义占位内容</text>
      </view>
    </template>
  </zx-ai-attachments>
</template>
```

### 超出样式

```vue
<template>
  <!-- 换行显示（默认） -->
  <zx-ai-attachments
    :items="manyFiles"
    overflow="wrap"
  />
  
  <!-- 横向滚动 -->
  <zx-ai-attachments
    :items="manyFiles"
    overflow="scrollX"
  />
  
  <!-- 纵向滚动 -->
  <zx-ai-attachments
    :items="manyFiles"
    overflow="scrollY"
  />
</template>
```

### 上传状态

```vue
<template>
  <zx-ai-attachments :items="uploadingFiles" />
</template>

<script setup>
const uploadingFiles = ref([
  {
    uid: '1',
    name: '上传中.jpg',
    size: 1024 * 1024 * 3,
    status: 'uploading',
    percent: 65
  },
  {
    uid: '2',
    name: '上传失败.pdf',
    size: 1024 * 1024 * 5,
    status: 'error'
  },
  {
    uid: '3',
    name: '上传完成.docx',
    size: 1024 * 1024 * 2,
    status: 'done'
  }
]);
</script>
```

### 自定义样式

```vue
<template>
  <zx-ai-attachments
    :items="attachments"
    custom-class="my-attachments"
    :custom-style="{
      border: '2px solid #1677ff',
      borderRadius: '12px',
      padding: '16px'
    }"
    :class-names="{
      list: 'my-list',
      item: 'my-item',
      placeholder: 'my-placeholder'
    }"
    :styles="{
      list: { gap: '16px' },
      item: { borderColor: '#1677ff' }
    }"
  />
</template>

<style>
.my-attachments {
  background-color: #f0f8ff;
}

.my-list {
  padding: 8px;
}

.my-item {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 禁用状态

```vue
<template>
  <zx-ai-attachments
    :items="attachments"
    :disabled="true"
  />
</template>
```

## 平台兼容性

| 平台 | 支持情况 | 说明 |
| --- | --- | --- |
| H5 | ✅ 完全支持 | 支持所有功能 |
| 微信小程序 | ✅ 完全支持 | 支持所有功能 |
| 支付宝小程序 | ✅ 完全支持 | 支持所有功能 |
| 百度小程序 | ✅ 完全支持 | 支持所有功能 |
| 字节小程序 | ✅ 完全支持 | 支持所有功能 |
| QQ 小程序 | ✅ 完全支持 | 支持所有功能 |
| 快手小程序 | ✅ 完全支持 | 支持所有功能 |
| 京东小程序 | ✅ 完全支持 | 支持所有功能 |
| App (Android) | ✅ 完全支持 | 支持所有功能 |
| App (iOS) | ✅ 完全支持 | 支持所有功能 |

## 最佳实践

### 1. 文件大小格式化

组件会自动格式化文件大小显示，建议传入准确的字节数：

```javascript
const file = {
  uid: '1',
  name: 'document.pdf',
  size: 1024 * 1024 * 2.5, // 2.5MB
  // ...
};
```

### 2. 文件类型识别

组件会根据文件扩展名和 MIME 类型自动识别文件类型并显示对应图标：

```javascript
// 推荐同时提供 name 和 type
const file = {
  name: 'document.pdf',
  type: 'application/pdf',
  // ...
};
```

### 3. 图片预览

对于图片文件，建议提供 `url` 或 `thumbUrl` 用于预览：

```javascript
const imageFile = {
  uid: '1',
  name: 'photo.jpg',
  type: 'image/jpeg',
  url: 'https://example.com/photo.jpg',
  thumbUrl: 'https://example.com/photo_thumb.jpg', // 缩略图
  // ...
};
```

### 4. 上传进度

上传过程中可以实时更新进度：

```javascript
const uploadFile = (file) => {
  const fileItem = {
    uid: generateUID(),
    name: file.name,
    size: file.size,
    status: 'uploading',
    percent: 0
  };
  
  // 模拟上传进度
  const timer = setInterval(() => {
    fileItem.percent += 10;
    if (fileItem.percent >= 100) {
      fileItem.status = 'done';
      clearInterval(timer);
    }
  }, 200);
};
```

### 5. 错误处理

上传失败时设置错误状态：

```javascript
const handleUploadError = (fileItem) => {
  fileItem.status = 'error';
  fileItem.percent = 0;
};
```

### 6. 性能优化

对于大量文件，建议使用虚拟滚动或分页加载：

```javascript
// 分页加载示例
const pageSize = 20;
const currentPage = ref(1);

const visibleFiles = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return allFiles.value.slice(start, end);
});
```

## 注意事项

### 1. 样式隔离

组件使用 `scoped` 样式，如需自定义样式，请使用 `:deep()` 或全局样式：

```vue
<style scoped>
:deep(.zx-ai-attachments__item) {
  border-color: #1677ff;
}
</style>
```

### 2. 事件处理

移除文件时，组件不会自动从列表中删除，需要在父组件中处理：

```javascript
const handleRemove = (item) => {
  const index = attachments.value.findIndex(file => file.uid === item.uid);
  if (index > -1) {
    attachments.value.splice(index, 1);
  }
};
```

### 3. 文件预览

组件只负责展示，文件预览功能需要在父组件中实现：

```javascript
const handlePreview = (item) => {
  if (item.type?.startsWith('image/')) {
    // 图片预览
    uni.previewImage({
      urls: [item.url]
    });
  } else {
    // 其他文件预览
    uni.downloadFile({
      url: item.url,
      success: (res) => {
        uni.openDocument({
          filePath: res.tempFilePath
        });
      }
    });
  }
};
```

### 4. 内存管理

对于大文件或大量文件，注意及时清理不需要的引用：

```javascript
// 组件销毁时清理
onUnmounted(() => {
  attachments.value = [];
});
```

## 常见问题

### Q: 如何实现文件上传功能？

A: 组件只负责展示附件，上传功能需要结合 uni-app 的上传 API 实现：

```javascript
const uploadFile = () => {
  uni.chooseFile({
    count: 1,
    success: (res) => {
      const file = res.tempFiles[0];
      const fileItem = {
        uid: Date.now().toString(),
        name: file.name,
        size: file.size,
        status: 'uploading',
        percent: 0
      };
      
      attachments.value.push(fileItem);
      
      uni.uploadFile({
        url: 'https://api.example.com/upload',
        filePath: file.path,
        name: 'file',
        success: (uploadRes) => {
          fileItem.status = 'done';
          fileItem.url = JSON.parse(uploadRes.data).url;
        },
        fail: () => {
          fileItem.status = 'error';
        }
      });
    }
  });
};
```

### Q: 如何自定义文件图标？

A: 可以通过 CSS 覆盖默认图标样式：

```vue
<style>
:deep(.zx-attachment-item__file-icon--pdf) {
  background-image: url('path/to/custom-pdf-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
```

### Q: 如何限制文件类型和大小？

A: 在添加文件时进行验证：

```javascript
const validateFile = (file) => {
  // 限制文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.type)) {
    uni.showToast({
      title: '不支持的文件类型',
      icon: 'none'
    });
    return false;
  }
  
  // 限制文件大小（10MB）
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    uni.showToast({
      title: '文件大小不能超过 10MB',
      icon: 'none'
    });
    return false;
  }
  
  return true;
};
```

### Q: 如何实现拖拽上传？

A: 在 H5 平台可以使用原生拖拽 API：

```vue
<template>
  <view 
    class="drop-area"
    @drop="handleDrop"
    @dragover="handleDragOver"
  >
    <zx-ai-attachments :items="attachments" />
  </view>
</template>

<script setup>
const handleDragOver = (e) => {
  e.preventDefault();
};

const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  files.forEach(file => {
    if (validateFile(file)) {
      addFileToList(file);
    }
  });
};
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础附件展示功能
- ✨ 支持多种布局方式
- ✨ 支持自定义样式
- ✨ 支持占位内容配置
- ✨ 支持上传状态展示
- ✨ 全平台兼容

## 许可证

MIT License