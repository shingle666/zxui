# zx-link 链接组件

## 介绍

`zx-link` 是一个跨平台的超链接组件，在不同平台有不同的表现形式：
- 在 APP 平台：通过 plus 环境打开内置浏览器
- 在小程序：将链接复制到剪贴板，并显示提示信息
- 在 H5：通过 `<a>` 标签打开链接

该组件参考 Element Plus 的 Link 组件设计，支持多种类型、状态和样式。

## 基础用法

```html
<zx-link url="https://example.com">默认链接</zx-link>
<zx-link url="https://example.com" type="primary">主要链接</zx-link>
<zx-link url="https://example.com" type="success">成功链接</zx-link>
<zx-link url="https://example.com" type="warning">警告链接</zx-link>
<zx-link url="https://example.com" type="danger">危险链接</zx-link>
<zx-link url="https://example.com" type="info">信息链接</zx-link>
```

## 禁用状态

```html
<zx-link url="https://example.com" disabled>禁用链接</zx-link>
<zx-link url="https://example.com" type="primary" disabled>禁用主要链接</zx-link>
```

## 下划线控制

```html
<!-- 始终显示下划线 -->
<zx-link url="https://example.com" underline="always">显示下划线</zx-link>

<!-- 悬停显示下划线（默认） -->
<zx-link url="https://example.com" underline="hover">悬停显示下划线</zx-link>

<!-- 从不显示下划线 -->
<zx-link url="https://example.com" underline="never">不显示下划线</zx-link>
```

## 图标链接

使用图标插槽添加图标：

```html
<zx-link url="https://example.com">
  <template #icon>
    <text class="icon-edit"></text>
  </template>
  编辑
</zx-link>
```

## 自定义样式

```html
<zx-link 
  url="https://example.com" 
  :customStyle="{ padding: '10rpx 20rpx', borderRadius: '4rpx', backgroundColor: '#f0f9eb' }"
>
  自定义样式
</zx-link>
```

## 属性说明

| 属性名      | 说明                                         | 类型           | 默认值                       |
|------------|----------------------------------------------|---------------|------------------------------|
| url        | 跳转的链接                                    | String        | ''                           |
| text       | 链接文字（也可以使用默认插槽）                  | String        | ''                           |
| type       | 链接类型，可选值：default/primary/success/warning/danger/info | String | 'default' |
| underline  | 下划线控制，可选值：always/hover/never          | String        | 'hover'                      |
| disabled   | 是否禁用                                      | Boolean       | false                        |
| color      | 文字颜色（会覆盖type对应的颜色）                | String        | ''                           |
| fontSize   | 字体大小，单位px或rpx                          | String/Number | '28rpx'                      |
| lineHeight | 行高，单位px或rpx                             | String/Number | '50rpx'                      |
| mpTips     | 小程序平台复制链接后的提示文字                  | String        | '链接已复制，请在浏览器打开'    |
| customStyle| 自定义样式对象                                | Object        | {}                           |

## 插槽

| 插槽名  | 说明         |
|--------|-------------|
| default| 链接内容      |
| icon   | 图标内容      |

## 平台差异说明

- 在 APP 中：通过 plus.runtime.openURL() 打开内置浏览器
- 在小程序中：点击链接会复制到剪贴板，并显示提示信息
- 在 H5 中：正常使用 a 标签行为，支持悬停效果

## 注意事项

1. 在 nvue 页面中使用时，建议通过 `text` 属性传入文字内容，而不是使用插槽，以确保样式正常
2. 自定义样式可通过 `customStyle` 属性传入对象
