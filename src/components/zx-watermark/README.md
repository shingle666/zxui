# ZxWatermark 水印组件

在页面上添加文本或图片等水印信息

## 基础用法

```vue
<template>
  <zx-watermark>
    <div style="height: 500px">
      页面内容
    </div>
  </zx-watermark>
</template>
```

## 多行水印

使用 "content" 设置一个字符串数组来指定多行文本水印内容

```vue
<template>
  <zx-watermark :content="['Element+', 'Element Plus']">
    <div style="height: 500px">
      页面内容
    </div>
  </zx-watermark>
</template>
```

## 图片水印

通过 'image' 指定图像地址。为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

```vue
<template>
  <zx-watermark
    :width="130"
    :height="30"
    image="https://example.com/logo.svg"
  >
    <div style="height: 500px">
      页面内容
    </div>
  </zx-watermark>
</template>
```

## 自定义配置

```vue
<template>
  <zx-watermark
    content="自定义水印"
    :font="{
      fontSize: 20,
      color: 'rgba(255, 0, 0, 0.3)'
    }"
    :rotate="-45"
    :gap="[120, 120]"
    :offset="[60, 60]"
  >
    <div style="height: 500px">
      页面内容
    </div>
  </zx-watermark>
</template>
```

## API

### Props

| 属性名 | 描述 | 类型 | 默认值 |
|--------|------|------|--------|
| width | 水印的宽度，content 的默认值是它自己的宽度 | number | 120 |
| height | 水印的高度，content 的默认值是它自己的高度 | number | 64 |
| rotate | 水印的旋转角度，单位 ° | number | -22 |
| zIndex | 水印元素的z-index值 | number | 9 |
| image | 水印图片，建议使用 2x 或 3x 图像 | string | — |
| content | 水印文本内容 | string/array | 'ZxWatermark' |
| font | 文字样式 | object | 见下方Font配置 |
| gap | 水印之间的间距 | array | [100, 100] |
| offset | 水印从容器左上角的偏移，默认值为 gap/2 | array | [gap[0]/2, gap[1]/2] |

### Font

| 名称 | 详情 | 类型 | 默认值 |
|------|------|------|--------|
| color | 字体颜色 | string | rgba(0,0,0,.15) |
| fontSize | 字体大小 | number | 16 |
| fontWeight | 字重 | string | normal |
| fontFamily | 字体 | string | sans-serif |
| fontStyle | 字体样式 | string | normal |
| textAlign | 文本对齐 | string | center |
| textBaseline | 文本基线 | string | hanging |

### Slots

| 名称 | 描述 |
|------|------|
| default | 添加水印的容器 |

## 特性

- 支持文本和图片水印
- 支持多行文本水印
- 支持自定义样式配置
- 支持防删除保护
- 高清显示支持（支持高DPI屏幕）
- 响应式设计
- **智能回退模式**：在不支持Canvas的环境中自动切换到CSS水印模式

## 兼容性

### Canvas 模式（推荐）
- 支持文本和图片水印
- 支持精确的旋转角度和样式控制
- 支持防删除保护
- 在现代浏览器和大部分uniapp环境中可用

### CSS 回退模式
- 仅支持文本水印
- 基础的旋转和样式支持
- 在不支持Canvas的环境中自动启用
- 保证组件在所有环境下都能正常工作

## 注意事项

1. 图片水印建议使用 2x 或 3x 分辨率的图片以确保清晰度
2. 水印会自动适配设备像素比，在高DPI屏幕上显示清晰
3. 组件内置防删除机制，能够防止水印被恶意删除（仅Canvas模式）
4. 水印不会影响子元素的交互事件
5. **自动兼容性检测**：组件会自动检测当前环境，在不支持Canvas时切换到CSS模式
6. 在小程序环境中可能会自动使用CSS回退模式
