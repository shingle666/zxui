# zx-capsule 胶囊组件

一个跨平台的胶囊组件，支持微信小程序、H5和APP，可用于自定义导航栏、悬浮按钮等场景。

## 特性

- 支持微信小程序、H5和APP多端适配
- 自动获取微信小程序原生胶囊位置和尺寸
- 支持自定义尺寸、位置、样式
- 可固定定位或普通定位
- 提供丰富的自定义样式属性
- 支持内容插槽

## 安装

```bash
npm install @tanzhenxing/zx-capsule
```

## 基本用法

### 引入组件

```vue
<template>
  <zx-capsule>
    <view>胶囊内容</view>
  </zx-capsule>
</template>

<script>
import zxCapsule from '@tanzhenxing/zx-capsule/zx-capsule.vue';

export default {
  components: {
    zxCapsule
  }
}
</script>
```

### 使用 setup 语法

```vue
<template>
  <zx-capsule>
    <view>胶囊内容</view>
  </zx-capsule>
</template>

<script setup>
import zxCapsule from '@tanzhenxing/zx-capsule/zx-capsule.vue';
</script>
```

## 组件属性

| 属性名           | 类型    | 默认值       | 说明                                  |
|-----------------|---------|-------------|--------------------------------------|
| backgroundColor | String  | transparent | 胶囊背景颜色                          |
| width           | Number  | 0           | 自定义宽度，为0时使用系统宽度或默认值   |
| height          | Number  | 0           | 自定义高度，为0时使用系统高度或默认值   |
| fixed           | Boolean | false       | 是否使用固定定位                      |
| autoPosition    | Boolean | true        | 是否根据系统胶囊位置自动定位（小程序有效）|
| right           | Number  | 10          | 自定义右边距                          |
| top             | Number  | 0           | 自定义上边距                          |
| borderRadius    | Number  | 100         | 圆角大小                              |
| borderColor     | String  | transparent | 边框颜色                              |
| borderWidth     | Number  | 0           | 边框宽度                              |
| shadow          | Boolean | false       | 是否显示阴影                          |

## 事件

| 事件名    | 说明               | 返回值                                |
|-----------|-------------------|--------------------------------------|
| created   | 组件创建完成时触发 | 胶囊信息对象 (width, height, top, right 等) |
| update    | 胶囊信息更新时触发 | 胶囊信息对象 (width, height, top, right 等) |

## 使用示例

### 基础用法

```vue
<zx-capsule background-color="#F5F5F5">
  <view>基础胶囊</view>
</zx-capsule>
```

### 自定义尺寸

```vue
<zx-capsule :width="150" :height="40" background-color="#E1F5FE">
  <view>自定义尺寸</view>
</zx-capsule>
```

### 自定义样式

```vue
<zx-capsule 
  background-color="#FFF8E1" 
  border-color="#FFC107"
  :border-width="1"
  :border-radius="8"
  :shadow="true">
  <view>自定义样式</view>
</zx-capsule>
```

### 固定定位

```vue
<zx-capsule 
  :fixed="true" 
  :auto-position="true"
  background-color="rgba(0,0,0,0.7)"
  @created="onCapsuleCreated">
  <view style="color: #fff;">固定胶囊</view>
</zx-capsule>
```

### 获取胶囊信息

```vue
<template>
  <zx-capsule @created="onCapsuleCreated">
    <view>获取胶囊信息</view>
  </zx-capsule>
</template>

<script setup>
const onCapsuleCreated = (info) => {
  console.log('胶囊信息', info);
  // info: { width, height, top, right, bottom, left }
};
</script>
```

## 注意事项

1. 在微信小程序中，组件会自动获取原生胶囊的位置和尺寸
2. 在H5和APP中，组件使用默认尺寸和状态栏位置进行布局
3. 使用 `fixed` 属性时，组件会使用固定定位，可以配合 `autoPosition` 属性自动定位
4. 组件内部使用了条件编译，根据不同平台提供不同实现
5. 若要完全自定义样式，可以设置 `width`、`height`、`top`、`right` 等属性

## 应用场景

1. 自定义导航栏
2. 悬浮按钮
3. 小程序胶囊位置适配
4. 跨平台UI统一
