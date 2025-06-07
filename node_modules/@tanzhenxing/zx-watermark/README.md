# ZxWatermark 水印组件

在页面上添加文本或图片等水印信息，支持多端兼容

## 基础用法

```vue
<template>
  <zx-watermark>
    <view style="height: 500px">
      页面内容
    </view>
  </zx-watermark>
</template>
```

## 局部水印

设置 `fullPage` 为 `false` 来创建局部水印

```vue
<template>
  <view style="position: relative; height: 500px">
    <zx-watermark :full-page="false" font-color="#fa2c19" content="局部水印">
      <view style="padding: 20px">
        页面内容
      </view>
    </zx-watermark>
  </view>
</template>
```

## 多行水印

使用 `content` 设置一个字符串数组来指定多行文本水印内容

```vue
<template>
  <zx-watermark :content="['ZxWatermark', 'Vue3 组件']" :gap-y="24">
    <view style="height: 500px">
      页面内容
    </view>
  </zx-watermark>
</template>
```

## 图片水印

通过 `image` 指定图像地址。为了确保图像清晰展示，请设置 `imageWidth` 和 `imageHeight`，建议使用至少两倍分辨率的图片。

```vue
<template>
  <zx-watermark
    :width="130"
    :height="30"
    :image-width="120"
    :image-height="64"
    image="https://zxui.org/logo.png"
  >
    <view style="height: 500px">
      页面内容
    </view>
  </zx-watermark>
</template>
```

## 自定义配置

```vue
<template>
  <zx-watermark
    content="自定义水印"
    font-color="rgba(255, 0, 0, 0.3)"
    :font-size="20"
    font-weight="bold"
    :rotate="-45"
    :gap-x="120"
    :gap-y="120"
    :offset="[60, 60]"
  >
    <view style="height: 500px">
      页面内容
    </view>
  </zx-watermark>
</template>
```

## API

### Props

| 属性名 | 描述 | 类型 | 默认值 |
|--------|------|------|--------|
| width | 水印的宽度 | number | 120 |
| height | 水印的高度 | number | 64 |
| rotate | 水印的旋转角度，单位 ° | number | -22 |
| zIndex | 水印元素的z-index值 | number | 2000 |
| image | 水印图片，建议使用 2x 或 3x 图像 | string | — |
| imageWidth | 图片宽度 | number | 120 |
| imageHeight | 图片高度 | number | 64 |
| content | 水印文本内容 | string/array | 'ZxWatermark' |
| fontColor | 水印文字颜色 | string | rgba(0,0,0,.15) |
| fontSize | 水印文字大小 | string/number | 16 |
| fontFamily | 水印文字字体 | string | PingFang SC |
| fontWeight | 水印文字粗细 | string | normal |
| fontStyle | 水印文字样式 | string | normal |
| gapX | 水印之间的水平间距 | number | 24 |
| gapY | 水印之间的垂直间距 | number | 48 |
| fullPage | 是否覆盖整个页面 | boolean | true |
| font | 文字样式（兼容旧版本） | object | {} |
| gap | 水印之间的间距（兼容旧版本） | array | [] |
| offset | 水印从容器左上角的偏移 | array | [gapX/2, gapY/2] |

### Font 对象（兼容旧版本）

当使用 `font` 属性时，可以包含以下字段：

| 名称 | 详情 | 类型 | 默认值 |
|------|------|------|--------|
| color | 字体颜色 | string | rgba(0,0,0,.15) |
| fontSize | 字体大小 | number | 16 |
| fontWeight | 字重 | string | normal |
| fontFamily | 字体 | string | PingFang SC |
| fontStyle | 字体样式 | string | normal |

### Slots

| 名称 | 描述 |
|------|------|
| default | 添加水印的容器 |

## 特性

- ✨ 支持文本和图片水印
- 📝 支持多行文本水印
- 🎨 支持自定义样式配置
- 🔒 支持防删除保护（H5环境）
- 📱 多端兼容（H5、小程序、App）
- 🖥️ 高清显示支持（支持高DPI屏幕）
- 🌐 全屏或局部水印支持
- 🔄 智能回退模式：在不支持Canvas的环境中自动切换到CSS水印模式

## 兼容性

### Canvas 模式（推荐）
- ✅ H5 环境完全支持
- ✅ 支持文本和图片水印
- ✅ 支持精确的旋转角度和样式控制
- ✅ 支持防删除保护
- ✅ uniapp 多端环境支持

### CSS 回退模式
- ✅ 仅支持文本水印
- ✅ 基础的旋转和样式支持
- ✅ 在不支持Canvas的环境中自动启用
- ✅ 保证组件在所有环境下都能正常工作

## 平台支持

| 平台 | Canvas模式 | CSS回退模式 | 防删除保护 |
|------|-----------|------------|----------|
| H5 | ✅ | ✅ | ✅ |
| 微信小程序 | ✅ | ✅ | ❌ |
| 支付宝小程序 | ✅ | ✅ | ❌ |
| App | ✅ | ✅ | ❌ |
| 其他小程序 | ✅ | ✅ | ❌ |

## 注意事项

1. 📸 图片水印建议使用 2x 或 3x 分辨率的图片以确保清晰度
2. 📱 水印会自动适配设备像素比，在高DPI屏幕上显示清晰
3. 🔒 组件内置防删除机制，能够防止水印被恶意删除（仅H5环境的Canvas模式）
4. 🎯 水印不会影响子元素的交互事件
5. 🔄 自动兼容性检测：组件会自动检测当前环境，在不支持Canvas时切换到CSS模式
6. 📦 在小程序环境中会优先使用Canvas模式，不支持时自动回退到CSS模式
7. 🌐 `fullPage` 为 `true` 时水印覆盖整个页面，为 `false` 时仅覆盖组件容器区域
8. ⚡ 新版本API向下兼容，支持旧版本的 `font` 和 `gap` 属性写法
