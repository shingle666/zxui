# zx-uploader 文件上传组件

`zx-uploader` 是一个功能强大的文件上传组件，支持 H5、小程序和 APP 端。它提供了丰富的功能，如文件预览、上传状态显示、数量和大小限制、自定义样式等。

## 特性

- 支持多端：H5、小程序、APP
- 文件预览：支持图片和非图片文件预览
- 上传状态：显示上传中、成功、失败等状态
- 数量限制：可配置最大上传文件数量
- 大小限制：可配置单个文件最大上传大小
- 自定义样式：支持自定义上传按钮和预览区域
- 事件回调：提供丰富的事件回调，如读取后、删除前、超限等
- v-model 支持：可通过 `v-model` 双向绑定文件列表
- 禁用与只读：支持禁用和只读状态

## 使用方法

```vue
<template>
  <view>
    <zx-uploader
      v-model="fileList"
      @after-read="handleAfterRead"
      @delete="handleDelete"
      :max-count="5"
      :max-size="1024 * 1024 * 2" 
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const fileList = ref([]);

const handleAfterRead = (event) => {
  console.log('文件读取完成:', event.file);
  // 在这里处理文件上传逻辑
  // event.file 是一个包含文件信息的对象或数组
  // 例如：uni.uploadFile({...})
};

const handleDelete = (event) => {
  console.log('文件删除:', event.file, event.index);
  // fileList.value.splice(event.index, 1); // 如果未使用v-model，则需要手动删除
};
</script>
```

## API

### Props

| 参数           | 说明                                                                 | 类型                                      | 默认值      |
| -------------- | -------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `v-model`      | 已上传的文件列表，元素为对象，至少包含 `url` 属性                      | `Array`                                   | `[]`        |
| `disabled`     | 是否禁用文件上传                                                       | `Boolean`                                 | `false`     |
| `readonly`     | 是否为只读状态，只展示文件列表，不允许上传和删除                       | `Boolean`                                 | `false`     |
| `accept`       | 允许上传的文件类型, `image` `video` `media` `all` 或者自定义 MIME 类型 | `String`                                  | `image`     |
| `capture`      | 图片和视频选取来源，可选值为 `album` (从相册选起)、`camera` (使用相机) | `String` `Array`                          | `['album', 'camera']` |
| `multiple`     | 是否开启多选                                                           | `Boolean`                                 | `false`     |
| `max-count`    | 最大允许上传个数                                                       | `Number` `String`                         | `Infinity`  |
| `max-size`     | 单个文件最大大小，单位为 byte                                          | `Number` `String`                         | `Infinity`  |
| `deletable`    | 是否展示删除按钮                                                       | `Boolean`                                 | `true`      |
| `show-upload`  | 是否展示上传区域                                                       | `Boolean`                                 | `true`      |
| `preview-size` | 预览图和上传区域的大小，单位rpx或px                                    | `Number` `String`                         | `160rpx`    |
| `preview-image`| 是否在上传完成后展示预览图                                             | `Boolean`                                 | `true`      |
| `image-fit`    | 预览图裁剪模式，同 uni-app 中 image 组件的 mode 属性                   | `String`                                  | `aspectFill`|
| `upload-text`  | 上传区域文字提示                                                       | `String`                                  | `''`        |
| `upload-icon`  | 上传区域图标名称 (基于 zx-icon)                                        | `String`                                  | `photograph`|
| `before-read`  | 文件读取前的回调函数，返回 `false` 可阻止读取，支持返回 `Promise`        | `Function`                                | -           |
| `before-delete`| 文件删除前的回调函数，返回 `false` 可阻止删除，支持返回 `Promise`        | `Function`                                | -           |

### File Object 结构

文件列表中的每个文件对象（`v-model` 或事件回调中）通常包含以下属性：

| 属性         | 说明                                                               | 类型     | 备注                                     |
| ------------ | ------------------------------------------------------------------ | -------- | ---------------------------------------- |
| `url`        | 文件访问地址 (必须)                                                | `String` |                                          |
| `status`     | 上传状态 (`uploading`, `done`, `failed`)                           | `String` | 可选，用于控制显示状态                   |
| `message`    | 上传状态提示信息                                                   | `String` | 可选，配合 `status` 使用                 |
| `name`       | 文件名 (可选，H5环境会自动从File对象获取)                            | `String` |                                          |
| `type`       | 文件类型 (可选，H5环境会自动从File对象获取)                            | `String` |                                          |
| `size`       | 文件大小 (可选，H5环境会自动从File对象获取)                            | `Number` |                                          |
| `isImage`    | 是否为图片文件 (可选，如果url不含后缀，可手动指定)                   | `Boolean`|                                          |
| `file`       | 原始文件对象 (可选，通常在 `after-read` 事件中包含)                  | `Object` | H5 为 File 对象, 小程序为 chooseFile 返回的对象 |
| `tempFilePath`| 临时文件路径 (可选, 小程序和APP环境 `after-read` 事件中包含)         | `String` |                                          |

### Events

| 事件名        | 说明                                       | 回调参数                                                           |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------ |
| `after-read`  | 文件读取完成时触发                         | `event: { file: FileObject | FileObject[], name?: string, index?: number }` |
| `delete`      | 删除文件时触发                             | `event: { file: FileObject, name?: string, index: number }`        |
| `oversize`    | 文件大小超过限制时触发                     | `event: { file: FileObject | FileObject[], name?: string, index?: number }` |
| `click-preview`| 点击预览图时触发                           | `event: { file: FileObject, name?: string, index: number }`        |
| `click-upload`| 点击上传区域时触发 (如果使用了默认slot)    | `event: Event`                                                     |

### Slots

| 名称            | 说明                 |
| --------------- | -------------------- |
| `default`       | 自定义上传区域的内容 |
| `preview-cover` | 自定义覆盖在预览图上方的内容，作用域插槽，参数为 `{ file, index }` |
| `preview-delete`| 自定义删除按钮图标，作用域插槽，参数为 `{ file, index }` |

## 注意事项

- 组件本身不包含将文件上传到服务器的逻辑，`after-read` 事件触发后，您需要自行调用 `uni.uploadFile` 或其他上传API将文件发送到服务器。
- `v-model` 绑定的文件列表，其元素的 `url` 属性是必须的，用于展示预览图。
- 在小程序和 App 端，`after-read` 返回的文件对象中会包含 `tempFilePath`，可用于 `uni.uploadFile`。
- H5 端，`after-read` 返回的文件对象中会包含原始的 `File` 对象，可以用于 `FormData` 上传。

## TODO

- [ ] 完善多端兼容性测试
- [ ] 增加视频预览功能
- [ ] 增加文件图标显示，用于非图片类型文件
- [ ] 优化性能和体验