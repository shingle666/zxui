# zx-popup-share 分享弹窗

一个功能丰富的分享弹窗组件，基于 `zx-popup` 组件构建，支持多种分享方式和自定义配置。

## 特性

- 🎨 **多种图标样式**：支持文字图标和图片图标
- 🎯 **灵活配置**：可自定义分享选项、标题、描述等
- 📱 **跨平台兼容**：支持 H5、小程序、App 平台
- 🎭 **主题定制**：内置多种分享平台主题色
- 🔧 **事件丰富**：提供完整的生命周期事件
- 🛡️ **类型安全**：完整的 TypeScript 类型定义
- 🎪 **动画流畅**：基于 zx-popup 的流畅动画效果

## 基本用法

### 默认分享选项

```vue
<template>
  <view>
    <zx-button @click="showShare = true">显示分享面板</zx-button>
    
    <zx-popup-share
      v-model:show="showShare"
      @select="onSelect"
      @cancel="onCancel"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showShare = ref(false);

const onSelect = (option, index) => {
  console.log('选择分享:', option, index);
  uni.showToast({
    title: `分享到${option.name}`,
    icon: 'success'
  });
};

const onCancel = () => {
  console.log('取消分享');
};
</script>
```

### 自定义分享选项

```vue
<template>
  <zx-popup-share
    v-model:show="showShare"
    title="选择分享方式"
    :options="customOptions"
    @select="onSelect"
  />
</template>

<script setup>
const customOptions = [
  { name: '微信好友', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ好友', icon: 'qq', type: 'qq' },
  { name: '复制链接', icon: 'link', type: 'copy' },
  { name: '保存图片', icon: 'save', type: 'save' }
];
</script>
```

### 使用图片图标

```vue
<template>
  <zx-popup-share
    v-model:show="showShare"
    title="分享到社交平台"
    :options="imageOptions"
    @select="onSelect"
  />
</template>

<script setup>
const imageOptions = [
  {
    name: '微信',
    icon: 'https://img.yzcdn.cn/vant/share-wechat.png',
    type: 'wechat'
  },
  {
    name: '朋友圈',
    icon: 'https://img.yzcdn.cn/vant/share-wechat-moments.png',
    type: 'wechat-moments'
  }
];
</script>
```

### 带描述信息

```vue
<template>
  <zx-popup-share
    v-model:show="showShare"
    title="分享给好友"
    description="让更多人看到这个精彩内容"
    :options="optionsWithDesc"
    @select="onSelect"
  />
</template>

<script setup>
const optionsWithDesc = [
  { name: '微信好友', icon: 'wechat', type: 'wechat', description: '分享给微信好友' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments', description: '分享到朋友圈' }
];
</script>
```

### 拦截关闭操作

```vue
<template>
  <zx-popup-share
    v-model:show="showShare"
    :before-close="beforeClose"
    @select="onSelect"
  />
</template>

<script setup>
const beforeClose = (action) => {
  return new Promise((resolve) => {
    if (action === 'cancel') {
      uni.showModal({
        title: '提示',
        content: '确定要取消分享吗？',
        success: (res) => {
          resolve(res.confirm);
        }
      });
    } else {
      resolve(true);
    }
  });
};
</script>
```

### 方法调用

```vue
<template>
  <view>
    <zx-button @click="openShare">打开分享面板</zx-button>
    
    <zx-popup-share
      ref="shareRef"
      title="通过方法调用"
      @select="onSelect"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const shareRef = ref();

const openShare = () => {
  shareRef.value?.open();
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示分享面板 | `boolean` | `false` |
| options | 分享选项列表 | `ShareOption[]` | 默认选项 |
| title | 分享面板标题 | `string` | `'分享到'` |
| description | 分享面板描述 | `string` | `''` |
| cancel-text | 取消按钮文字，为空时不显示 | `string` | `'取消'` |
| duration | 动画持续时间（秒） | `number \| string` | `0.3` |
| z-index | 弹窗层级 | `number \| string` | `2000` |
| round | 是否显示圆角 | `boolean` | `true` |
| overlay | 是否显示遮罩层 | `boolean` | `true` |
| overlay-style | 自定义遮罩层样式 | `object` | `{}` |
| close-on-click-overlay | 是否在点击遮罩层后关闭 | `boolean` | `true` |
| safe-area | 是否开启底部安全区适配 | `boolean` | `true` |
| before-close | 关闭前的回调函数 | `function` | `null` |

### ShareOption 类型

```typescript
interface ShareOption {
  name: string;           // 分享选项名称
  icon: string;           // 图标名称或图片URL
  type: string;           // 分享类型标识
  description?: string;   // 选项描述（可选）
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 显示状态改变时触发 | `(show: boolean)` |
| select | 选择分享选项时触发 | `(option: ShareOption, index: number)` |
| cancel | 点击取消按钮时触发 | `()` |
| open | 打开面板时触发 | `()` |
| opened | 打开面板且动画结束后触发 | `()` |
| close | 关闭面板时触发 | `()` |
| closed | 关闭面板且动画结束后触发 | `()` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开分享面板 | `()` |
| close | 关闭分享面板 | `()` |

### Slots

当前版本暂不支持插槽，后续版本会考虑添加自定义内容插槽。

## 内置图标

组件内置了多种常用的分享平台图标：

- `wechat` - 微信（绿色背景）
- `wechat-moments` - 朋友圈（绿色背景）
- `qq` - QQ（蓝色背景）
- `weibo` - 微博（红色背景）
- `link` - 链接
- `copy` - 复制
- `more` - 更多
- `save` - 保存
- `photo` - 图片
- `share` - 分享
- `download` - 下载
- `qrcode` - 二维码
- `poster` - 海报
- `warning` - 警告
- `heart` - 喜欢
- `star` - 收藏

## 主题定制

### 自定义图标颜色

可以通过 CSS 变量自定义图标颜色：

```scss
.zx-popup-share {
  --zx-share-icon-color: #646566;
  --zx-share-icon-bg: #f7f8fa;
}
```

### 自定义样式

```scss
.zx-popup-share {
  &__header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .zx-popup-share__title {
      color: #fff;
    }
  }
  
  &__option {
    &:hover {
      background-color: #f5f5f5;
    }
  }
}
```

## 注意事项

1. **依赖组件**：本组件依赖 `zx-popup` 组件，请确保已正确引入
2. **图标资源**：使用图片图标时，请确保图片资源可访问
3. **平台兼容**：不同平台的分享 API 可能不同，请根据实际需求调用对应的分享接口
4. **性能优化**：大量分享选项时建议使用虚拟滚动或分页加载
5. **无障碍访问**：组件已考虑基本的无障碍访问，建议添加适当的 aria 标签

## 实际应用场景

### 文章分享

```vue
<script setup>
const shareArticle = (option) => {
  const shareData = {
    title: '精彩文章标题',
    desc: '文章摘要描述',
    link: 'https://example.com/article/123',
    imgUrl: 'https://example.com/article-cover.jpg'
  };
  
  switch (option.type) {
    case 'wechat':
      // 调用微信分享 API
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: shareData.link,
        title: shareData.title,
        summary: shareData.desc,
        imageUrl: shareData.imgUrl
      });
      break;
      
    case 'copy':
      // 复制链接
      uni.setClipboardData({
        data: shareData.link,
        success: () => {
          uni.showToast({ title: '链接已复制', icon: 'success' });
        }
      });
      break;
  }
};
</script>
```

### 商品分享

```vue
<script setup>
const shareProduct = (option) => {
  const productData = {
    title: '商品名称',
    price: '¥99.00',
    link: 'https://example.com/product/456',
    imgUrl: 'https://example.com/product-image.jpg'
  };
  
  // 根据不同平台调用相应的分享接口
  // ...
};
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础分享功能
- ✨ 支持自定义分享选项
- ✨ 支持图片图标
- ✨ 支持主题定制
- ✨ 完整的事件系统
- ✨ 跨平台兼容性

底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑。基于 Vue 3 Composition API 开发，使用 uni-app 框架。

## 平台兼容性

本组件理论上支持所有 uni-app 能编译到的平台，包括 H5、小程序（微信、支付宝、百度、头条、QQ、钉钉等）、App（iOS、Android）。

## 引入方式

```vue
<script setup>
import zxPopupShare from '@/components/zx-popup-share/zx-popup-share.vue';
</script>
```

## 代码演示

### 基础用法

分享面板通过 `options` 属性来定义分享选项，数组的每一项是一个对象，对象格式见下方的 API 文档。如果不传入 `options`，将使用默认的分享选项。

```vue
<template>
  <zx-button @click="showShare = true">显示分享面板</zx-button>
  <zx-popup-share
    :show="showShare"
    title="立即分享给好友"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
import { ref } from 'vue';

const showShare = ref(false);

const onSelect = (option, index) => {
  uni.showToast({ title: `选择了 ${option.name}`, icon: 'none' });
  showShare.value = false; // 通常在选择后关闭
};
</script>
```

### 自定义分享选项

可以通过 `options` 属性自定义分享选项。

```vue
<template>
  <zx-popup-share
    :show="showShare"
    title="分享到"
    :options="customOptions"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
import { ref } from 'vue';

const showShare = ref(false);
const customOptions = ref([
  { name: '微信', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ', icon: 'qq', type: 'qq' },
  { name: '微博', icon: 'weibo', type: 'weibo' },
  { name: '复制链接', icon: 'link', type: 'copy' },
  { name: '保存图片', icon: 'photo', type: 'save' },
]);

const onSelect = (option, index) => {
  console.log('选择的分享方式:', option);
  // 根据 option.type 执行不同的分享逻辑
  switch (option.type) {
    case 'wechat':
      // 调用微信分享 API
      break;
    case 'copy':
      // 复制链接到剪贴板
      uni.setClipboardData({
        data: 'https://example.com',
        success: () => {
          uni.showToast({ title: '链接已复制', icon: 'success' });
        }
      });
      break;
    // ... 其他分享逻辑
  }
  showShare.value = false;
};
</script>
```

### 自定义图标

除了使用内置的几种图标名（如 `wechat`, `link` 等），可以直接在 `icon` 中传入图片 URL 来使用自定义的图标。

```vue
<script setup>
const customOptions = ref([
  {
    name: '自定义图标',
    icon: 'https://example.com/custom-icon.png',
    type: 'custom'
  },
  {
    name: '本地图标',
    icon: '/static/images/my-icon.svg', // 推荐使用本地路径
    type: 'local'
  },
]);
</script>
```

### 展示描述信息

通过 `description` 属性可以设置标题下方的描述文字。在 `options` 内的每个选项对象中设置 `description` 属性可以添加分享选项的描述。

```vue
<template>
  <zx-popup-share
    :show="showShare"
    title="立即分享给好友"
    description="选择你想要分享的平台"
    :options="optionsWithDescription"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
const optionsWithDescription = ref([
  { name: '微信', icon: 'wechat', type: 'wechat' },
  { name: '复制链接', icon: 'link', type: 'copy', description: '链接已复制' },
  { name: '保存图片', icon: 'photo', type: 'save', description: '保存到相册' },
]);
</script>
```

### 禁用点击遮罩关闭

默认情况下，点击遮罩会自动关闭分享面板，如不想点击关闭，只需将 `close-on-click-overlay` 设置为 `false`。

```vue
<template>
  <zx-popup-share
    :show="showShare"
    :close-on-click-overlay="false"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>
```

### 关闭前确认

通过 `before-close` 属性可以在关闭前进行确认操作。

```vue
<template>
  <zx-popup-share
    :show="showShare"
    :before-close="beforeClose"
    @select="onSelect"
    @cancel="showShare = false"
    @update:show="(val) => showShare = val"
  />
</template>

<script setup>
const beforeClose = (action) => {
  return new Promise((resolve) => {
    uni.showModal({
      title: '提示',
      content: '确定要关闭分享面板吗？',
      success: (res) => {
        resolve(res.confirm);
      }
    });
  });
};
</script>
```

## API

### Props

| 参数                | 说明                                                                 | 类型                         | 默认值      |
| ------------------- | -------------------------------------------------------------------- | ---------------------------- | ----------- |
| `v-model:show` 或 `show` | 是否显示分享面板                                                     | `Boolean`                    | `false`     |
| `options`           | 分享选项，见下方 Option 数据结构                                       | `Array<Option>`              | `[]`        |
| `title`             | 顶部标题                                                             | `String`                     | `'分享到'`  |
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

`options` 属性为一个对象数组，数组中的每个对象配置一个选项。对象可以包含以下值：

| 键名          | 说明                                                                                                | 类型     | 是否必填 |
| ------------- | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| `name`        | 分享渠道名称                                                                                        | `String` | 是       |
| `icon`        | 图标。可选值为：`wechat`, `wechat-moments`, `qq`, `weibo`, `link`, `photo`, `more` 等。也支持传入图片 URL。 | `String` | 是       |
| `type`        | 分享类型标识，用于在 `select` 事件中区分不同的分享方式                                                | `String` | 否       |
| `description` | 分享选项描述                                                                                        | `String` | 否       |
| `customPrefix`| 自定义图标前缀（用于 zx-icon 组件）                                                                  | `String` | 否       |
| `...`         | 其他自定义数据，会在 `select` 事件中透传                                                              | `any`    | 否       |

### 默认分享选项

如果不传入 `options` 属性，组件将使用以下默认分享选项：

```javascript
[
  { name: '微信', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ', icon: 'qq', type: 'qq' },
  { name: '微博', icon: 'weibo', type: 'weibo' },
  { name: '复制链接', icon: 'link', type: 'copy' },
  { name: '更多', icon: 'more', type: 'more' }
]
```

### Events

| 事件名        | 说明                                                              | 回调参数                                     |
| ------------- | ----------------------------------------------------------------- | -------------------------------------------- |
| `select`      | 点击分享选项时触发                                                | `(option: Option, index: number)`            |
| `cancel`      | 点击取消按钮时触发                                                | -                                            |
| `open`        | 面板打开时触发                                                    | -                                            |
| `opened`      | 面板打开且动画结束后触发                                          | -                                            |
| `close`       | 面板关闭时触发                                                    | -                                            |
| `closed`      | 面板关闭且动画结束后触发                                          | -                                            |
| `update:show` | `show` 属性更新时触发 (用于 `v-model:show`)                       | `(value: boolean)`                           |

## 注意事项

- **图标依赖**: 本组件依赖 `zx-icon` 组件来显示图标，请确保项目中已正确引入该组件。
- **分享逻辑**: 本组件不包含任何实际的分享逻辑（如调用微信分享 API）。你需要在 `select` 事件回调中根据选择的 `option` 自行实现具体的分享功能。
- **样式**: 组件样式参考了主流设计规范，但由于 uni-app 的限制和跨端需求，可能存在细微差异。你可以根据需要覆盖或调整样式。
- **滚动**: 当选项过多时，选项区域会自动出现垂直滚动条。
- **动画**: 组件使用 CSS 动画实现弹出效果，在某些低端设备上可能存在性能问题。
- **安全区域**: 组件会自动适配底部安全区域（如 iPhone X 系列的 Home Indicator）。

## 常见问题

### 1. 如何实现真实的分享功能？

本组件只提供 UI 界面，具体的分享功能需要结合各平台的分享 API 实现：

```javascript
const onSelect = (option, index) => {
  switch (option.type) {
    case 'wechat':
      // 微信分享
      uni.share({
        provider: 'weixin',
        scene: 'WXSceneSession',
        type: 0,
        href: 'https://example.com',
        title: '分享标题',
        summary: '分享描述',
        imageUrl: 'https://example.com/image.jpg'
      });
      break;
    case 'copy':
      // 复制链接
      uni.setClipboardData({
        data: 'https://example.com',
        success: () => {
          uni.showToast({ title: '链接已复制' });
        }
      });
      break;
  }
};
```

### 2. 如何自定义图标样式？

可以通过覆盖 CSS 类名来自定义图标样式：

```scss
.zx-popup-share__icon-wrapper {
  // 自定义图标容器样式
  background-color: #your-color;
  border-radius: 12rpx; // 改为圆角矩形
}
```

### 3. 如何适配不同屏幕尺寸？

组件已经使用响应式设计，会自动适配不同屏幕尺寸。如需进一步调整，可以修改 `width: calc(25% - 20rpx)` 来改变每行显示的选项数量。