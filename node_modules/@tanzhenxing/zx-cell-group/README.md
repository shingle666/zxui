# zx-cell-group 单元格组

`zx-cell-group` 组件用于将多个 `zx-cell` 组件组合在一起，形成一个列表区域，通常用于设置页面、个人中心等场景。

## 平台兼容性

| H5  | 小程序 | App |
| --- | ---- | --- |
| ✔️  | ✔️   | ✔️  |

## 基础用法

`zx-cell-group` 组件通常与 `zx-cell` 组件配合使用。

```vue
<template>
  <zx-cell-group title="基础用法">
    <zx-cell title="单元格1" value="内容"></zx-cell>
    <zx-cell title="单元格2" value="内容" label="描述信息"></zx-cell>
  </zx-cell-group>
</template>
```

## 带边框

通过 `border` 属性可以控制是否显示外边框，默认为 `true`。

```vue
<template>
  <zx-cell-group title="无边框" :border="false">
    <zx-cell title="单元格1" value="内容"></zx-cell>
    <zx-cell title="单元格2" value="内容"></zx-cell>
  </zx-cell-group>
</template>
```

## 自定义标题

可以通过 `title` 属性设置分组的标题，也可以通过 `title` 插槽自定义标题内容。

```vue
<template>
  <zx-cell-group>
    <template #title>
      <view style="color: blue; font-size: 18px; padding: 10px;">自定义标题</view>
    </template>
    <zx-cell title="单元格A" value="内容A"></zx-cell>
    <zx-cell title="单元格B" value="内容B"></zx-cell>
  </zx-cell-group>
</template>
```

## API

### Props

| 属性名      | 类型    | 默认值 | 说明                                   |
| ----------- | ------- | ------ | -------------------------------------- |
| title       | String  | `''`   | 分组标题                               |
| border      | Boolean | `true` | 是否显示外层边框                       |
| customStyle | Object  | `{}`   | 自定义样式，作用于组件根元素           |

### Slots

| 插槽名 | 说明                                         |
| ------ | -------------------------------------------- |
| -      | 默认插槽，用于放置 `zx-cell` 或其他自定义内容  |
| title  | 自定义分组标题内容                           |

## 注意事项

- `zx-cell-group` 主要作为 `zx-cell` 的容器使用，以实现列表分组效果。
- 确保在 uni-app 项目中正确引入和注册组件。