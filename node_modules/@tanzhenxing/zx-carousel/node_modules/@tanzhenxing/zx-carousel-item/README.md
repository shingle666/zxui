# zx-carousel-item 走马灯项组件

## 介绍

`zx-carousel-item` 是走马灯的子组件，用于包装轮播内容。它必须作为 `zx-carousel` 组件的子组件使用。

## 引入

```vue
<zx-carousel-item></zx-carousel-item>
```

## 代码演示

### 基础用法

```vue
<zx-carousel>
  <zx-carousel-item v-for="item in 4" :key="item">
    <view class="content">{{ item }}</view>
  </zx-carousel-item>
</zx-carousel>
```

### 图片轮播

```vue
<zx-carousel>
  <zx-carousel-item 
    v-for="(item, index) in imageList" 
    :key="index"
    :src="item.url"
    :name="item.id"
  />
</zx-carousel>
```

### 卡片模式

```vue
<zx-carousel type="card">
  <zx-carousel-item 
    v-for="(item, index) in dataList" 
    :key="index"
    :name="item.id"
    :label="item.title"
  >
    <view class="custom-card">
      <image class="card-image" :src="item.imageUrl" mode="aspectFill" />
      <view class="card-title">{{ item.title }}</view>
    </view>
  </zx-carousel-item>
</zx-carousel>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 幻灯片的名字，可用作 setActiveItem 的参数 | string | '' |
| label | 该幻灯片所对应指示器的文本 | string / number | '' |
| src | 图片链接 | string | '' |
| type | 内容类型 | string | 'custom' |
| imageMode | 图片的裁剪模式 | string | 'aspectFill' |
| lazyLoad | 是否开启懒加载 | boolean | true |
| customStyle | 自定义样式 | string / object | '' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击幻灯片时触发 | { name, label, src } |
| imageLoad | 图片加载成功时触发 | event |
| imageError | 图片加载失败时触发 | event |

### 插槽

| 名称 | 说明 |
| --- | --- |
| default | 自定义幻灯片内容 |

## 注意事项

1. `zx-carousel-item` 必须作为 `zx-carousel` 的子组件使用
2. 当设置 `src` 属性时，组件会默认显示图片内容
3. 如需自定义内容，请使用默认插槽
4. 当 `type` 设置为 'card' 时，会启用卡片样式
