# zx-gallery 图片预览组件

支持 H5、小程序、App，基于 `uniapp` + `vue3 setup` 实现。

## 功能特性
- 支持图片预览、左右滑动切换
- 支持图片描述显示
- 支持删除图片
- 支持点击遮罩关闭
- 适配多端（H5/小程序/App），不依赖浏览器特有 DOM

## 属性（Props）
| 属性名      | 类型    | 默认值   | 说明                 |
| ----------- | ------- | -------- | -------------------- |
| urls        | Array   | []       | 图片数组，格式见下方 |
| show        | Boolean | false    | 是否显示组件         |
| current     | Number  | 0        | 当前显示图片索引     |
| showDelete  | Boolean | false    | 是否显示删除按钮     |
| hideOnClick | Boolean | true     | 点击遮罩是否关闭     |

### 图片数组格式
```js
[
  { src: '图片地址', desc: '图片描述' },
  ...
]
```

## 事件（Events）
| 事件名 | 说明             | 回调参数                |
| ------ | ---------------- | ----------------------- |
| change | 图片切换时触发   | { current }            |
| delete | 删除图片时触发   | { url, index }         |
| hide   | 点击遮罩关闭时触发 | 无                     |

## 使用示例
详见 `src/pages/components/gallery/index.vue`

```vue
<template>
  <view>
    <button @tap="openGallery">打开图片预览</button>
    <zx-gallery
      :urls="images"
      :show="showGallery"
      :current="current"
      :showDelete="true"
      @change="onChange"
      @delete="onDelete"
      @hide="onHide"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxGallery from '@/components/zx-gallery/zx-gallery.vue';

const images = ref([
  { src: 'https://cdn.uviewui.com/uview/swiper/1.jpg', desc: '图片1描述' },
  { src: 'https://cdn.uviewui.com/uview/swiper/2.jpg', desc: '图片2描述' },
  { src: 'https://cdn.uviewui.com/uview/swiper/3.jpg', desc: '图片3描述' }
]);
const showGallery = ref(false);
const current = ref(0);

function openGallery() {
  showGallery.value = true;
  current.value = 0;
}

function onChange(e) {
  current.value = e.current;
}

function onDelete(e) {
  images.value.splice(e.index, 1);
  if (images.value.length === 0) {
    showGallery.value = false;
  } else {
    current.value = 0;
  }
}

function onHide() {
  showGallery.value = false;
}
</script>
```

