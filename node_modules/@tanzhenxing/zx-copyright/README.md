# zx-copyright 版权信息组件

用于在页面底部展示版权信息，支持自定义文本、样式、对齐方式和跳转链接。

## 特性

- 支持 H5、小程序、App 端。
- 可自定义版权文本内容。
- 可自定义背景颜色、文字颜色、文字大小、内边距。
- 支持文本左对齐、居中对齐、右对齐。
- 支持点击跳转链接 (H5 端可配置打开方式，非 H5 端默认使用 webview 打开)。

## 使用方法

```vue
<template>
  <view>
    <zx-copyright 
      text="© 2024 My Awesome App. All rights reserved."
      background-color="#f5f5f5"
      color="#666666"
      size="22rpx"
      padding="30rpx 0"
      align="center"
      link="https://example.com"
      link-target="_blank"
    />
  </view>
</template>

<script setup>
// 如果需要，可以在这里导入组件，但在 uni-app 中通常是全局注册或按需引入
// import zxCopyright from '@/components/zx-copyright/zx-copyright.vue';
</script>
```

## API

### Props

| 属性名          | 类型   | 默认值                                  | 说明                                                                 |
| --------------- | ------ | --------------------------------------- | -------------------------------------------------------------------- |
| text            | String | '© 2024 YourCompany. All rights reserved.' | 版权文本内容                                                         |
| backgroundColor | String | 'transparent'                           | 背景颜色                                                             |
| size            | String | '24rpx'                                 | 文字大小                                                             |
| color           | String | '#999999'                               | 文字颜色                                                             |
| padding         | String | '20rpx 0'                               | 内边距，例如：'20rpx' (四边), '20rpx 10rpx' (上下 左右), '10rpx 20rpx 30rpx 40rpx' (上 右 下 左) |
| align           | String | 'center'                                | 文本对齐方式，可选值为 'left', 'center', 'right'                     |
| link            | String | ''                                      | 点击后跳转的链接，如果为空则不跳转                                   |
| linkTarget      | String | '_blank'                                | 链接打开方式，仅 H5 有效。可选值为 '_blank', '_self', '_parent', '_top' |

### Events

无

## 注意事项

- 在非 H5 平台（如小程序、App），点击带 `link` 属性的组件时，会尝试通过 `uni.navigateTo` 跳转到一个 `/pages/webview/index` 页面，并携带 `url` 参数。请确保你的项目中存在此 webview 页面，或者根据实际情况修改组件内的跳转逻辑。
- `align` 属性控制的是 `<text>` 元素的 `text-align` 样式。组件本身使用了 Flex 布局来辅助居中，如果需要更复杂的布局，可能需要调整组件内部样式或自行封装。