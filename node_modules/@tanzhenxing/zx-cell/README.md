# zx-cell 单元格组件

## 组件介绍

`zx-cell` 单元格组件是一个通用的列表项组件，常用于展示一组列表信息，如个人中心页、设置页等场景。该组件支持H5、小程序和App多端平台，采用Vue3 setup语法糖实现。

## 平台兼容性

- H5：✓
- 微信小程序：✓
- 支付宝小程序：✓
- 百度小程序：✓
- 头条小程序：✓
- QQ小程序：✓
- App（Vue）：✓

## 基础用法

```vue
<template>
  <zx-cell-group title="基础用法">
    <zx-cell title="单元格" value="内容"></zx-cell>
    <zx-cell title="单元格" value="内容" label="描述信息"></zx-cell>
  </zx-cell-group>
</template>
```

## 图标用法

```vue
<template>
  <zx-cell-group title="图标用法">
    <zx-cell title="单元格" icon="home"></zx-cell>
    <zx-cell title="单元格" icon="user" value="内容"></zx-cell>
  </zx-cell-group>
</template>
```

## 链接用法

```vue
<template>
  <zx-cell-group title="链接用法">
    <zx-cell title="单元格" is-link></zx-cell>
    <zx-cell title="单元格" is-link value="内容"></zx-cell>
    <zx-cell title="跳转页面" is-link url="/pages/index/index"></zx-cell>
  </zx-cell-group>
</template>
```

## 自定义插槽

```vue
<template>
  <zx-cell-group title="自定义插槽">
    <zx-cell title="单元格">
      <template #value>
        <zx-button size="mini" type="primary">按钮</zx-button>
      </template>
    </zx-cell>
    <zx-cell>
      <template #title>
        <view class="custom-title">
          <text>自定义标题</text>
          <zx-tag type="warning" size="mini">标签</zx-tag>
        </view>
      </template>
    </zx-cell>
    <zx-cell>
      <template #icon>
        <image src="https://zxui.org/logo.png" style="width: 30px; height: 30px;"></image>
      </template>
      <template #title>
        <text>自定义图标</text>
      </template>
    </zx-cell>
  </zx-cell-group>
</template>
```

## 垂直居中

```vue
<template>
  <zx-cell-group title="垂直居中">
    <zx-cell title="单元格" value="内容" center></zx-cell>
    <zx-cell title="单元格" label="描述信息" value="内容" center></zx-cell>
  </zx-cell-group>
</template>
```

## 尺寸设置

```vue
<template>
  <zx-cell-group title="大尺寸">
    <zx-cell title="单元格" value="内容" size="large"></zx-cell>
    <zx-cell title="单元格" value="内容" label="描述信息" size="large"></zx-cell>
  </zx-cell-group>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | String / Number | - |
| label | 标题下方的描述信息 | String / Number | - |
| value | 右侧的内容 | String / Number | - |
| icon | 左侧图标名称，或者图片链接 | String | - |
| disabled | 是否禁用单元格 | Boolean | false |
| border | 是否显示下边框 | Boolean | true |
| center | 内容是否垂直居中 | Boolean | false |
| url | 点击后跳转的URL地址 | String | - |
| link-type | 链接跳转的方式 | String | navigateTo |
| clickable | 是否开启点击反馈 | Boolean | false |
| is-link | 是否展示右侧箭头并开启点击反馈 | Boolean | false |
| required | 是否显示表单状态下的必填星号 | Boolean | false |
| right-icon | 右侧的图标箭头 | String | arrow-right |
| arrow-direction | 右侧箭头的方向，可选值为：left，up，down | String | right |
| icon-style | 左侧图标样式 | Object / String | - |
| right-icon-style | 右侧箭头图标的样式 | Object / String | - |
| title-style | 标题的样式 | Object / String | - |
| size | 单元格的大小，可选值为 large | String | - |
| stop | 点击cell是否阻止事件传播 | Boolean | true |
| name | 标识符，cell被点击时返回 | String / Number | - |
| custom-style | 定义需要用到的外部样式 | Object | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击单元格时触发 | {name: 标识符} |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义右侧内容 |
| title | 自定义标题内容 |
| label | 自定义标题下方描述内容 |
| icon | 自定义左侧图标 |
| right-icon | 自定义右侧图标 |

## 注意事项

1. 使用 `url` 属性进行页面跳转时，优先级高于 `click` 事件。
2. 当 `disabled` 为 true 时，单元格不可点击。
3. 搭配 `zx-cell-group` 组件使用效果更佳。