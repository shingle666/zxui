# zx-image 图片组件

## 介绍

`zx-image` 是一个基于 uni-app 的增强型图片组件，提供了图片懒加载、占位图、加载失败显示等功能，适用于各类 uni-app 项目中的图片展示需求。

## 特性

- 支持图片懒加载（自定义实现和原生懒加载）
- 支持图片加载动画效果
- 支持占位图和背景色
- 支持加载失败时显示替代图片
- 支持圆角设置
- 兼容各端小程序和 App

## 安装方法

将组件复制到项目的 `components` 目录下即可使用。

## 基本用法

```vue
<template>
  <view>
    <zx-image
      src="https://example.com/image.jpg"
      width="300rpx"
      height="200rpx"
      radius="10rpx"
    ></zx-image>
  </view>
</template>

<script>
import zxImage from '@/components/zx-image/zx-image.vue';

export default {
  components: {
    zxImage
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | String | '' | 图片路径 |
| srcParams | String | '' | 图片链接附加参数，如七牛云图片处理参数 |
| placeholder | String | '' | 占位图路径 |
| backgroundColor | String | '#f1f1f1' | 占位背景色，placeholder有值时失效 |
| mode | String | 'aspectFill' | 图片的裁剪模式，参考image组件mode属性 |
| fadeShow | Boolean | true | 图片显示动画效果，无占位图时有效 |
| webp | Boolean | false | 默认不解析 webP 格式，只支持网络资源 |
| showMenuByLongpress | Boolean | false | 开启长按图片显示识别小程序码菜单（微信小程序2.7.0+） |
| draggable | Boolean | true | 鼠标长按是否能拖动图片（仅H5平台 3.1.1+） |
| width | String | '230rpx' | 图片宽度 |
| height | String | '180rpx' | 图片高度，如果高度设置为auto，mode值需要设置为widthFix |
| radius | String | '0rpx' | 图片圆角值 |
| bottom | Number/String | 50 | 节点布局区域的下边界，目标节点区域以下 bottom(px) 时触发懒加载 |
| disconnect | Boolean | false | 是否停止监听，设置为true时懒加载将不再触发 |
| index | Number | 0 | 图片在列表中的索引值 |
| lazyLoad | Boolean | true | 是否开启懒加载（自定义实现） |
| nativeLazyLoad | Boolean | false | 是否使用原生的lazy-load属性（仅微信小程序、百度小程序、抖音小程序、飞书小程序支持） |
| padding | String | '0rpx' | 内边距 |
| errorImage | String | '' | 加载失败时显示的图片 |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| @error | 当错误发生时触发 | {detail: 图片加载错误信息, index: 索引值} |
| @load | 当图片加载完成时触发 | {detail: {width: 图片宽度, height: 图片高度}, index: 索引值} |
| @click | 点击图片时触发 | {index: 索引值} |

## 方法说明

组件对外暴露的方法，可通过 ref 调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| loadImage | 手动触发加载图片 | 无 |

## 使用示例

### 基础用法

```vue
<zx-image src="/static/images/example.jpg"></zx-image>
```

### 设置圆角

```vue
<zx-image src="/static/images/example.jpg" radius="20rpx"></zx-image>
```

### 使用占位图

```vue
<zx-image 
  src="/static/images/example.jpg" 
  placeholder="/static/images/placeholder.jpg"
></zx-image>
```

### 错误图片

```vue
<zx-image 
  src="/static/images/example.jpg" 
  errorImage="/static/images/error.jpg"
></zx-image>
```

### 列表懒加载

```vue
<template>
  <scroll-view scroll-y>
    <view v-for="(item, index) in imageList" :key="index">
      <zx-image 
        :src="item.src" 
        :index="index"
        @load="onImageLoad"
        @error="onImageError"
        @click="onImageClick"
      ></zx-image>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      imageList: [
        { src: '/static/images/1.jpg' },
        { src: '/static/images/2.jpg' },
        { src: '/static/images/3.jpg' }
        // ...更多图片
      ]
    }
  },
  methods: {
    onImageLoad(e) {
      console.log('图片加载成功', e);
    },
    onImageError(e) {
      console.log('图片加载失败', e);
    },
    onImageClick(e) {
      console.log('点击了图片', e.index);
    }
  }
}
</script>
```

### 手动触发加载

```vue
<template>
  <view>
    <zx-image 
      ref="myImage"
      src="/static/images/example.jpg" 
      :disconnect="true"
    ></zx-image>
    <button @click="loadImage">加载图片</button>
  </view>
</template>

<script>
export default {
  methods: {
    loadImage() {
      this.$refs.myImage.loadImage();
    }
  }
}
</script>
```

## 提示

- 使用 `widthFix` 模式时，建议将 height 设置为 'auto'
- 大量图片列表建议使用懒加载功能，提升性能
- 在 App 和 H5 端，自定义懒加载使用 IntersectionObserver API 实现
- 在小程序中，可以选择使用原生懒加载（nativeLazyLoad=true）或自定义懒加载
