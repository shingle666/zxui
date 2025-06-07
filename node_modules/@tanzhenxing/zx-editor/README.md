# zx-editor 富文本编辑器组件

`zx-editor` 是一个适用于 uni-app 的多功能富文本编辑器组件，支持传统分块编辑模式和官方富文本编辑器模式，提供了丰富的文本编辑功能。

## 功能特点

- **双模式编辑**：支持传统分块编辑和官方富文本编辑器两种模式，可随时切换
- **丰富的编辑元素**：支持标题、普通文本、居中文本、图片、引用、代码块、加粗文本、链接和分割线等多种内容类型
- **灵活的内容管理**：支持内容块的上移、下移和删除操作
- **格式化工具**：富文本模式下支持文本加粗、斜体、下划线、标题、列表等格式化功能
- **内容互通**：两种编辑模式之间可以实现内容转换
- **数据导出**：支持获取多种格式的内容（HTML、文本、Delta）

## 安装使用

1. 将 `zx-editor` 组件复制到项目的 `components` 目录下
2. 在需要使用的页面中引入组件

```vue
<script setup>
import ZxEditor from '@/components/zx-editor/zx-editor.vue';
</script>

<template>
  <zx-editor ref="editorRef"></zx-editor>
</template>
```

## 基本使用

### 获取编辑器内容

```js
// 获取编辑器内容
const editorRef = ref(null);

const getContent = async () => {
  const data = await editorRef.value.getData();
  console.log('编辑器内容：', data);
  // 富文本模式下返回 {title, html, text, delta}
  // 传统模式下返回 {title, contents}
};
```

### 设置默认内容

```js
// 设置默认内容
onMounted(() => {
  editorRef.value.setDefault({
    title: '文章标题',
    contents: [
      { type: 'h3', content: '一级标题', focusin: false },
      { type: 'txt', content: '这是一段普通文本内容', focusin: false },
      { type: 'img', content: '/static/images/example.jpg', focusin: false }
    ]
  });
});
```

## API 文档

### Props

组件暂无可配置的 props 属性。

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|------|------|------|------|
| getData | 获取编辑器内容 | 无 | 富文本模式：Promise<{title, html, text, delta}><br>传统模式：{title, contents} |
| setDefault | 设置默认内容 | defaultArticle: {title, contents} | 无 |
| setError | 设置图片上传错误状态 | index: 图片在内容数组中的索引 | 无 |
| getEditorCtx | 获取富文本编辑器上下文 | 无 | editorCtx 或 null |

### 内容类型

传统编辑模式下，支持以下内容类型：

| 类型 | 描述 |
|------|------|
| h3 | 标题 |
| txt | 普通文本 |
| center | 居中文本 |
| img | 图片 |
| quote | 引用 |
| code | 代码块 |
| strong | 加粗文本 |
| link | 链接 |
| spline | 分割线 |

## 编辑模式说明

### 传统分块编辑模式

传统模式下，内容以块的形式组织，每个块都有特定的类型和编辑界面。用户可以通过底部的工具栏添加不同类型的内容块，并可以对每个块进行上移、下移和删除操作。

### 富文本编辑器模式

富文本模式基于 uni-app 官方的 editor 组件实现，提供类似 Word 的编辑体验。支持文本格式化（加粗、斜体、下划线等）、对齐方式调整、列表、图片插入等功能。

## 完整示例

```vue
<template>
  <view class="content">
    <view class="editor-container">
      <zx-editor ref="editorRef"></zx-editor>
    </view>
    <view class="btn-container">
      <button type="primary" @tap="saveContent">保存内容</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ZxEditor from '@/components/zx-editor/zx-editor.vue';

const editorRef = ref(null);

// 设置默认内容
onMounted(() => {
  editorRef.value.setDefault({
    title: '我的文章',
    contents: [
      { type: 'h3', content: '欢迎使用 zx-editor', focusin: false },
      { type: 'txt', content: '这是一个功能强大的富文本编辑器组件...', focusin: false }
    ]
  });
});

// 保存内容
const saveContent = async () => {
  const data = await editorRef.value.getData();
  console.log('编辑器内容：', data);
  
  // 示例：上传内容到服务器
  // const result = await uni.request({
  //   url: 'https://your-api-url/save',
  //   method: 'POST',
  //   data: data
  // });
  
  uni.showToast({
    title: '内容已保存',
    icon: 'success'
  });
};
</script>

<style>
.content {
  padding: 20rpx;
}
.editor-container {
  margin-bottom: 30rpx;
  background-color: #fff;
  border-radius: 10rpx;
}
.btn-container {
  padding: 20rpx 0;
}
</style>
```

## 图片上传

组件内置的图片选择功能仅支持从相册选择图片，如需实现图片上传功能，需要自行处理：

```js
// 图片上传示例
const uploadImage = async (index, tempFilePath) => {
  try {
    // 上传图片到服务器
    const uploadResult = await uni.uploadFile({
      url: 'https://your-upload-api',
      filePath: tempFilePath,
      name: 'file'
    });
    
    // 替换为服务器返回的图片URL
    const imageUrl = JSON.parse(uploadResult.data).url;
    editorRef.value.contents[index].content = imageUrl;
    
  } catch (error) {
    // 设置上传错误状态
    editorRef.value.setError(index);
    console.error('图片上传失败', error);
  }
};
```

## 注意事项

1. 富文本编辑器模式仅在支持 editor 组件的平台上可用（H5、App的vue页面、微信小程序、百度小程序）
2. 在不支持 editor 组件的平台上，将自动使用传统分块编辑模式
3. 从富文本模式切换到传统模式时，复杂的格式可能会丢失
4. 如需支持图片上传功能，需要自行实现上传逻辑
5. 富文本模式下的 `getData()` 方法返回 Promise，请使用 await 或 then 获取结果

## 兼容性

| 平台 | 传统模式 | 富文本模式 |
|------|---------|-----------|
| App (vue) | ✓ | ✓ |
| H5 | ✓ | ✓ (2.4.5+) |
| 微信小程序 | ✓ | ✓ (基础库 2.7.0+) |
| 百度小程序 | ✓ | ✓ (需引入动态库) |
| 其他平台 | ✓ | ✗ |
