# zx-upload 上传组件

## 组件介绍

`zx-upload` 是一个功能强大的文件上传组件，可用于图片、视频及文件的选择、预览和上传。支持单选/多选、文件大小限制、自定义样式等功能。

## 基础用法

```vue
<template>
  <view>
    <zx-upload 
      :file-list="fileList" 
      @afterRead="afterRead" 
      @delete="deletePic" 
      :max-count="5"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

// 读取文件后的处理
const afterRead = (event) => {
  const { file } = event;
  // 此处可对上传文件进行处理，例如上传至服务器
  fileList.value.push({
    ...file,
    status: 'uploading',
    message: '上传中'
  });
  
  // 模拟上传成功
  setTimeout(() => {
    fileList.value[fileList.value.length - 1].status = 'success';
  }, 1500);
};

// 删除图片
const deletePic = (event) => {
  fileList.value.splice(event.index, 1);
};
</script>
```

## 属性说明

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受的文件类型，可选值为 `image`、`video`、`file`，微信小程序还支持 `media`、`all` | String | image |
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

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| afterRead | 文件读取完成后触发 | `{ file, name, index }` |
| beforeRead | 文件读取前的钩子函数，返回 `false` 则停止文件读取 | `{ file, name, index, callback }` |
| oversize | 文件超出大小限制时触发 | `{ file, name, index }` |
| clickPreview | 点击预览图片时触发 | `{ url, name, index, ...其他文件信息 }` |
| delete | 删除文件时触发 | `{ file, name, index }` |
| error | 文件上传错误时触发 | `error` |

## 插槽说明

| 名称 | 说明 |
| --- | --- |
| default | 自定义上传按钮的内容，如不提供则使用默认按钮样式 |

## 文件对象结构

上传后的文件对象结构示例：

```js
{
  // 文件唯一标识
  url: 'https://example.com/image.png', // 文件地址
  thumb: 'https://example.com/image.png', // 缩略图地址，视频类型时可以是视频的第一帧
  type: 'image', // 文件类型，可选值：image（图片）、video（视频）
  name: 'image.png', // 文件名称
  size: 123456, // 文件大小，单位字节
  status: 'uploading', // 文件状态，可选值：uploading（上传中）、failed（上传失败）、success（上传成功）
  message: '上传中', // 提示消息，例如上传中、上传失败的提示
  deletable: true, // 是否显示删除按钮，优先级高于组件的 deletable 属性
}
```

## 平台差异说明

- `accept` 为 `all` 或 `media` 时，仅微信小程序支持
- `accept` 为 `file` 时，仅微信小程序和 H5(HX2.9.9及以上版本)支持

## 常见问题

### 如何实现自定义上传按钮？

可以通过默认插槽自定义上传按钮的样式：

```vue
<zx-upload :file-list="fileList" @afterRead="afterRead">
  <view class="custom-upload-btn">
    <zx-icon name="plus" size="22"></zx-icon>
    <text>自定义上传</text>
  </view>
</zx-upload>
```

### 如何实现上传至服务器？

在 `afterRead` 事件中处理文件上传逻辑：

```js
const afterRead = (event) => {
  const { file } = event;
  // 更新文件状态为上传中
  fileList.value.push({
    ...file,
    status: 'uploading',
    message: '上传中'
  });
  
  // 上传文件到服务器
  uni.uploadFile({
    url: 'https://your-server-url.com/upload',
    filePath: file.url,
    name: 'file',
    success: (res) => {
      // 假设服务器返回的数据中包含文件访问地址
      const responseData = JSON.parse(res.data);
      // 更新文件状态为成功
      const index = fileList.value.length - 1;
      fileList.value[index].status = 'success';
      fileList.value[index].url = responseData.url;
    },
    fail: () => {
      // 更新文件状态为失败
      const index = fileList.value.length - 1;
      fileList.value[index].status = 'failed';
      fileList.value[index].message = '上传失败';
    }
  });
};
```

### 如何限制上传文件的类型和大小？

通过 `accept` 和 `maxSize` 属性可以限制上传文件的类型和大小：

```vue
<zx-upload 
  accept="image" 
  :max-size="2 * 1024 * 1024"  <!-- 限制为2MB -->
  @oversize="onOversize" 
  :file-list="fileList" 
  @afterRead="afterRead"
/>
```

```js
const onOversize = () => {
  uni.showToast({
    title: '文件大小不能超过2MB',
    icon: 'none'
  });
};
```

## 示例

### 基础图片上传

```vue
<zx-upload :file-list="fileList" @afterRead="afterRead" @delete="deletePic" />
```

### 多图片上传

```vue
<zx-upload 
  :file-list="fileList" 
  @afterRead="afterRead" 
  @delete="deletePic"
  multiple
  :max-count="9"
/>
```

### 上传视频

```vue
<zx-upload 
  accept="video"
  :file-list="fileList" 
  @afterRead="afterRead" 
  @delete="deleteFile"
/>
```

### 上传文件(仅支持微信小程序和H5)

```vue
<zx-upload 
  accept="file"
  :file-list="fileList" 
  @afterRead="afterRead" 
  @delete="deleteFile"
/>
``` 