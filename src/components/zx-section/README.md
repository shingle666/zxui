# ZxSection 标题栏组件

标题栏组件，主要用于文章、列表详情等标题展示。

## 介绍

ZxSection 组件是一个用于显示标题和副标题的组件，可用于各种需要标题展示的场景。组件支持多种装饰样式和自定义内容。

## 使用方法

### 基础用法

```vue
<zx-section title="基础用法" sub-title="副标题"></zx-section>
```

### 竖线装饰

```vue
<zx-section title="竖线装饰" sub-title="副标题" type="line"></zx-section>
```

### 圆形装饰

```vue
<zx-section title="圆形装饰" sub-title="副标题" type="circle"></zx-section>
```

### 方形装饰

```vue
<zx-section title="方形装饰" sub-title="副标题" type="square"></zx-section>
```

### 自定义装饰器

```vue
<zx-section title="自定义装饰器" sub-title="使用插槽自定义装饰器">
  <template #decoration>
    <view class="custom-decoration"></view>
  </template>
</zx-section>
```

### 默认插槽内容

```vue
<zx-section title="默认插槽内容" sub-title="包含内容区域" padding>
  <view>这是默认插槽中的内容</view>
</zx-section>
```

### 自定义字体大小和颜色

```vue
<zx-section 
  title="自定义字体大小和颜色" 
  titleFontSize="18px" 
  titleColor="#007AFF"
  subTitle="自定义副标题样式" 
  subTitleFontSize="14px"
  subTitleColor="#FF9500">
</zx-section>
```

### 右侧插槽示例

```vue
<zx-section title="右侧插槽示例">
  <template #right>
    <view>更多</view>
  </template>
</zx-section>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | - | 装饰类型，可选值：line（竖线）、circle（圆形）、square（方形） |
| title | String | - | 主标题 |
| titleFontSize | String | 14px | 主标题字体大小 |
| titleColor | String | #333 | 主标题字体颜色 |
| subTitle | String | - | 副标题 |
| subTitleFontSize | String | 12px | 副标题字体大小 |
| subTitleColor | String | #999 | 副标题字体颜色 |
| padding | Boolean/String | false | 默认插槽容器的padding值，传入类型为Boolean时，设置为10px或0 |

## 事件

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| @click | 点击 Section 触发事件 | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置内容 |
| decoration | 装饰器插槽，当不使用 type 属性时可用 |
| right | 右侧插槽，用于放置右侧内容 |
