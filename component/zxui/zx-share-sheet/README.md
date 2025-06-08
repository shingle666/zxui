# zx-share-sheet 分享面板

底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。

## 平台兼容性

本组件理论上支持所有 uni-app 能编译到的平台，包括 H5、小程序（微信、支付宝、百度、头条、QQ、钉钉等）、App（iOS、Android）。

## 引入方式

```vue
<script setup>
import zxShareSheet from '@/components/zx-share-sheet/zx-share-sheet.vue';
</script>
```

## 代码演示

### 基础用法

分享面板通过 `options` 属性来定义分享选项，数组的每一项是一个对象，对象格式见下方的 API 文档。

```vue
<template>
  <zx-button @click="showShare = true">显示分享面板</zx-button>
  <zx-share-sheet
    :show="showShare"
    title="立即分享给好友"
    :options="options"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
import { ref } from 'vue';

const showShare = ref(false);
const options = ref([
  { name: '微信', icon: 'wechat' },
  { name: '微博', icon: 'weibo' },
  { name: '复制链接', icon: 'link' },
  { name: '分享海报', icon: 'poster' },
  { name: '二维码', icon: 'qrcode' },
]);

const onSelect = (option, index) => {
  uni.showToast({ title: `选择了 ${option.name}`, icon: 'none' });
  showShare.value = false; // 通常在选择后关闭
};
</script>
```

### 展示多行选项

当分享选项的数量较多时，可以将 `options` 定义为数组嵌套的格式，每个子数组会作为一行选项展示。

```vue
<script setup>
const options = ref([
  [
    { name: '微信', icon: 'wechat' },
    { name: '朋友圈', icon: 'wechat-moments' },
    { name: '微博', icon: 'weibo' },
    { name: 'QQ', icon: 'qq' },
  ],
  [
    { name: '复制链接', icon: 'link' },
    { name: '分享海报', icon: 'poster' },
    { name: '二维码', icon: 'qrcode' },
    { name: '小程序码', icon: 'weapp-qrcode' },
  ],
]);
</script>
```

### 自定义图标

除了使用内置的几种图标名（如 `wechat`, `link` 等），可以直接在 `icon` 中传入图片 URL 来使用自定义的图标。

```vue
<script setup>
const options = ref([
  {
    name: '自定义图标',
    icon: 'https://example.com/custom-icon.png',
  },
  {
    name: '本地图标',
    icon: '/static/images/my-icon.svg', // 推荐使用本地路径
  },
]);
</script>
```

### 展示描述信息

通过 `description` 属性可以设置标题下方的描述文字。在 `options` 内的每个选项对象中设置 `description` 属性可以添加分享选项的描述。

```vue
<template>
  <zx-share-sheet
    :show="showShare"
    title="立即分享给好友"
    description="这是一段面板的描述信息"
    :options="optionsWithDescription"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
const optionsWithDescription = ref([
  { name: '微信', icon: 'wechat' },
  { name: '复制链接', icon: 'link', description: '链接已复制' },
  { name: '分享海报', icon: 'poster', description: '保存到相册' },
]);
</script>
```

## API

### Props

| 参数                | 说明                                                                 | 类型                         | 默认值      |
| ------------------- | -------------------------------------------------------------------- | ---------------------------- | ----------- |
| `v-model:show` 或 `show` | 是否显示分享面板                                                     | `Boolean`                    | `false`     |
| `options`           | 分享选项，见下方 Option 数据结构                                       | `Array<Option | Array<Option>>` | `[]`        |
| `title`             | 顶部标题                                                             | `String`                     | `''`        |
| `cancel-text`       | 取消按钮文字，传入空字符串可以隐藏按钮                                 | `String`                     | `'取消'`    |
| `description`       | 标题下方的辅助描述文字                                                 | `String`                     | `''`        |
| `duration`          | 动画时长，单位秒，设置为 0 可以禁用动画                                | `Number` \| `String`         | `0.3`       |
| `z-index`           | 面板的 z-index 层级                                                  | `Number` \| `String`         | `2000`      |
| `round`             | 是否显示圆角                                                         | `Boolean`                    | `true`      |
| `overlay`           | 是否显示遮罩层                                                       | `Boolean`                    | `true`      |
| `overlay-style`     | 自定义遮罩层样式                                                     | `Object`                     | `{}`        |
| `close-on-click-overlay` | 是否在点击遮罩层后关闭                                               | `Boolean`                    | `true`      |
| `before-close`      | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 `Promise`          | `(action: string) => boolean \| Promise<boolean>` | `null`      |

### Option 数据结构

`options` 属性为一个对象数组，数组中的每个对象配置一个选项，或者是一个二维数组用于多行展示。对象可以包含以下值：

| 键名          | 说明                                                                                                | 类型     | 是否必填 |
| ------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| `name`        | 分享渠道名称                                                                                        | `String` | 是       |
| `icon`        | 图标。可选值为：`wechat`, `weibo`, `qq`, `link`, `qrcode`, `poster`, `weapp-qrcode`, `wechat-moments`。也支持传入图片 URL。 | `String` | 是       |
| `description` | 分享选项描述                                                                                        | `String` | 否       |
| `className`   | 为选项添加额外的 CSS 类名                                                                             | `String` | 否       |
| `...`         | 其他自定义数据，会在 `select` 事件中透传                                                              | `any`    | 否       |

### Events

| 事件名        | 说明                                                              | 回调参数                                     |
| ------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| `select`      | 点击分享选项时触发                                                | `(option: Option, index: number \| string)` (如果是多行，index 为 `rowIndex-itemIndex` 格式的字符串) |
| `cancel`      | 点击取消按钮时触发                                                | -                                            |
| `open`        | 面板打开时触发                                                    | -                                            |
| `opened`      | 面板打开且动画结束后触发                                          | -                                            |
| `close`       | 面板关闭时触发                                                    | -                                            |
| `closed`      | 面板关闭且动画结束后触发                                          | -                                            |
| `update:show` | `show` 属性更新时触发 (用于 `v-model:show`)                       | `(value: boolean)`                           |

## 注意事项

- **图标**: 内置的 `icon` 名称（如 `wechat`）仅为样式占位，你需要自行实现这些图标的显示，例如通过 `uni-icons`、图片或者 SVG。组件内提供的简单文本仅为示例。
- **分享逻辑**: 本组件不包含任何实际的分享逻辑（如调用微信分享 API）。你需要在 `select` 事件回调中根据选择的 `option` 自行实现具体的分享功能。
- **样式**: 组件样式尽可能参考了 Vant Design，但由于 uni-app 的限制和跨端需求，可能存在细微差异。你可以根据需要覆盖或调整样式。
- **滚动**: 当选项过多时，选项区域会自动出现垂直滚动条。