# zx-album 相册组件

相册组件用于展示一个或多个图片，支持单图、多图布局，图片预览，懒加载，删除等功能。

## 介绍

相册组件是一个功能丰富的图片展示组件，支持以下特性：

- 单图/多图展示
- 自适应图片尺寸
- 图片预览
- 懒加载
- 删除功能
- 加载状态
- 错误处理
- 空状态提示

## 使用示例

### 基础用法

```vue
<template>
  <zx-album :urls="urls"></zx-album>
</template>

<script setup>
import { ref } from 'vue';

const urls = ref([
  'https://cdn.mp.ac.cn/banner/01.jpg',
  'https://cdn.mp.ac.cn/banner/02.jpg',
  'https://cdn.mp.ac.cn/banner/03.jpg'
]);
</script>
```

### 自定义大小和间距

```vue
<template>
  <zx-album 
    :urls="urls" 
    singleSize="400rpx" 
    multipleSize="120rpx"
    space="10rpx"
  ></zx-album>
</template>
```

### 可删除的相册

```vue
<template>
  <zx-album 
    :urls="urls" 
    :deletable="true"
    @delete="onDelete"
  ></zx-album>
</template>

<script setup>
import { ref } from 'vue';

const urls = ref([
  'https://cdn.mp.ac.cn/banner/01.jpg',
  'https://cdn.mp.ac.cn/banner/02.jpg',
  'https://cdn.mp.ac.cn/banner/03.jpg'
]);

const onDelete = (index) => {
  urls.value.splice(index, 1);
};
</script>
```

### 配合上传组件使用

```vue
<template>
  <zx-album 
    :urls="images" 
    :deletable="true"
    @delete="onDelete"
  ></zx-album>
  <zx-upload 
    :fileList="images" 
    @afterRead="afterRead" 
    :maxCount="9"
  ></zx-upload>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([]);

const afterRead = (event) => {
  const { file } = event;
  // 此处省略上传逻辑
  images.value.push(file.url);
};

const onDelete = (index) => {
  images.value.splice(index, 1);
};
</script>
```

### 使用对象数组

```vue
<template>
  <zx-album 
    :urls="images" 
    keyName="url"
  ></zx-album>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  { url: 'https://cdn.mp.ac.cn/banner/01.jpg', id: '1' },
  { url: 'https://cdn.mp.ac.cn/banner/02.jpg', id: '2' },
  { url: 'https://cdn.mp.ac.cn/banner/03.jpg', id: '3' }
]);
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|-----|------|------|-------|
| urls | 图片地址列表 | Array | [] |
| keyName | 指定从对象数组中读取的图片地址属性名 | String | '' |
| singleSize | 单图时，图片长边的长度 | String/Number | '360rpx' |
| multipleSize | 多图时，图片边长 | String/Number | '140rpx' |
| space | 多图时，图片间隔 | String/Number | '12rpx' |
| singleMode | 单图时，图片缩放裁剪模式 | String | 'scaleToFill' |
| multipleMode | 多图时，图片缩放裁剪模式 | String | 'aspectFill' |
| maxCount | 最多展示图片数量 | String/Number | 9 |
| previewFullImage | 是否可以预览图片 | Boolean | true |
| rowCount | 每行展示图片数量 | String/Number | 3 |
| showMore | 超出maxCount时是否显示查看更多提示 | Boolean | true |
| deletable | 是否可以删除图片 | Boolean | false |
| lazyLoad | 是否开启图片懒加载 | Boolean | true |
| loading | 是否显示加载状态 | Boolean | false |
| showError | 是否显示加载失败提示 | Boolean | true |
| showEmpty | 是否显示空状态提示 | Boolean | true |
| emptyText | 空状态提示文字 | String | '暂无图片' |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| albumWidth | 当相册宽度变化时触发 | width: 相册宽度 |
| delete | 删除图片时触发 | index: 被删除图片的索引 |
| error | 图片加载失败时触发 | {rowIndex, colIndex, src}: 行索引、列索引和图片地址 |

## 注意事项

1. 在小程序中，需要将网络图片的域名添加到小程序的download域名才可能获取尺寸
2. 对于单图模式，组件会根据图片原始比例自动调整尺寸
3. 使用对象数组时，需要指定keyName属性来提取图片地址
4. 删除功能需要手动处理数组更新
