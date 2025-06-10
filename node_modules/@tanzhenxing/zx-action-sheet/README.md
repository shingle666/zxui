# zx-action-sheet 动作面板组件

## 组件介绍

`zx-action-sheet` 是一个基于 uni-app 开发的跨平台动作面板组件。它从屏幕底部向上弹出一个操作菜单，提供了一系列可供用户选择的选项。该组件设计灵活，支持 H5、微信公众号、各种小程序、安卓、IOS、鸿蒙等10多个平台，并提供了丰富的功能和自定义选项，旨在提升用户交互体验。

## 项目地址

- 组件文档与示例：[https://zxui.org/components/action-sheet](https://zxui.org/components/action-sheet)
- NPM 包地址：[https://www.npmjs.com/package/@tanzhenxing/zx-action-sheet](https://www.npmjs.com/package/@tanzhenxing/zx-action-sheet)
- GitHub 仓库：[https://github.com/shingle666/zxui/tree/master/src/components/zx-action-sheet](https://github.com/shingle666/zxui/tree/master/src/components/zx-action-sheet)

## 适用范围与兼容性

### 适用范围
- **适用项目**：uni-app 项目。
- **前端框架**：仅支持 Vue 3。
- **构建方式**：支持通过 HBuilderX 和 CLI 方式搭建的 uni-app 项目，兼容 vite 和 webpack 构建。
- **目标平台**：Android、iOS、微信小程序、微信公众号、Web（H5）、支付宝小程序、百度小程序、抖音小程序、QQ小程序、360小程序、快手小程序、飞书小程序、钉钉小程序、京东小程序、小红书小程序、快应用、鸿蒙app、鸿蒙元服务。

### 兼容性

#### 小程序支持

| 快应用 | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节小程序 | QQ小程序   | 抖音小程序 | 小红书小程序 |
| ------ | ---------- | ------------ | ---------- | ---------- | -------- | ---------- | ------------ |
| √      | √          | √            | √          | √          | √        | √          | √            |

| 钉钉小程序 | 快手小程序 | 飞书小程序 | 京东小程序 | 鸿蒙元服务   |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| √          | √          | √          | √          | √            |

#### 浏览器支持

| H5-Safari | Android Browser | 微信浏览器(Android) | QQ浏览器(Android) | Chrome | IE | Edge | Firefox |
| --------- | --------------- | ------------------- | ----------------- | ------ | -- | ---- | ------- |
| √ | √ | √ | √ | √ | √ | √ | √ |

#### App 支持

| iOS | Android |
| --- | ------- |
| √ | √ |

## 特性

- ✅ **跨平台兼容**：一套代码，多端运行，完美适配主流平台。
- ✅ **多主题支持**：内置明亮（light）和暗黑（dark）两种主题，可轻松切换。
- ✅ **丰富的选项**：支持为每个操作项配置图标、徽标（badge）、自定义颜色和字体大小。
- ✅ **安全区适配**：自动适配 iPhone 等设备的底部安全区域，保证内容完整显示。
- ✅ **灵活的插槽**：提供 `tips` 和 `cancel-button` 插槽，允许用户自定义提示区域和取消按钮的内容与样式。
- ✅ **完善的事件**：提供 `open`、`close`、`change`（点击操作项）、`cancel`（点击取消按钮）以及 `update:show` 事件，方便开发者监听和响应用户操作。
- ✅ **流畅的动画**：优化的 CSS 过渡动画效果，确保弹出和收起过程平滑自然。
- ✅ **易于扩展**：支持通过 `customStyle` 属性自定义组件根节点样式，满足个性化需求。
- ✅ **v-model 支持**：支持 `v-model:show` 双向绑定控制面板的显示与隐藏。
- ✅ **API 调用**：支持通过 `ref` 获取组件实例，并调用 `open()` 和 `close()` 方法控制面板显隐。

## 安装与使用

### NPM 安装

推荐使用 npm、yarn 或 pnpm 进行安装：

```bash
# 使用 npm
npm install @tanzhenxing/zx-action-sheet

# 使用 yarn
yarn add @tanzhenxing/zx-action-sheet

# 使用 pnpm
pnpm add @tanzhenxing/zx-action-sheet
```

### 在项目中使用

#### 1. easycom 模式（推荐）

在项目的 `pages.json` 文件中配置 `easycom` 规则，即可在页面中直接使用组件，无需手动引入和注册。

```json
// pages.json
{
  "easycom": {
    "autoscan": true, // 是否自动扫描组件 true 为开启
    "custom": {
      // 自定义组件别名或路径
      "zx-action-sheet": "@tanzhenxing/zx-action-sheet/zx-action-sheet.vue" // 指定组件的完整路径
      // 批量导入
      // "^zx-(.*)": "@tanzhenxing/zx-$1/zx-$1.vue"
    }
  }
}
```

配置完成后，在页面的 `<template>` 中直接使用：

```vue
<template>
  <zx-action-sheet v-model:show="showSheet" :items="sheetItems" />
</template>
```

#### 2. 局部注册

在需要使用 `zx-action-sheet` 组件的页面的 `<script setup>` 中单独引入并注册：

```vue
<script setup>
import ZxActionSheet from '@tanzhenxing/zx-action-sheet/zx-action-sheet.vue';
</script>

<template>
  <zx-action-sheet v-model:show="showSheet" :items="sheetItems" />
</template>
```

#### 3. 全局注册

在项目的 `main.js` 文件中引入并全局注册组件：

```javascript
// main.js
import { createSSRApp } from 'vue';
import App from './App.vue';
import ZxActionSheet from '@tanzhenxing/zx-action-sheet/zx-action-sheet.vue'; // 引入组件

export function createApp() {
  const app = createSSRApp(App);
  app.component('zx-action-sheet', ZxActionSheet); // 全局注册组件
  return {
    app
  };
}
```

全局注册后，可以在项目中的任何页面直接使用 `<zx-action-sheet>`。

### 基础用法

```vue
<template>
  <view>
    <button @click="showActionSheet = true">打开动作面板</button>
    
    <zx-action-sheet 
      v-model:show="showActionSheet" 
      :items="actionItems"
      tips="这是一个提示信息"
      @change="handleChange"
      @cancel="handleCancel"
      @open="handleOpen"
      @close="handleClose"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';
// 如果不是通过 easycom 引入，需要在此处 import ZxActionSheet from '@tanzhenxing/zx-action-sheet/zx-action-sheet.vue';

const showActionSheet = ref(false);
const actionItems = ref([
  { text: '选项一' },
  { text: '选项二', color: 'red' }, // 自定义颜色
  { text: '选项三 (禁用)', disabled: true }
]);

const handleChange = (item) => {
  console.log('点击了项目：', item);
  // item 对象包含 { index, text, ...其他自定义属性 }
};

const handleCancel = () => {
  console.log('点击了取消按钮');
};

const handleOpen = () => {
  console.log('动作面板已打开');
};

const handleClose = () => {
  console.log('动作面板已关闭');
};
</script>
```

### 基础用法

```vue
<template>
  <view>
    <button @click="showActionSheet = true">打开动作面板</button>
    
    <zx-action-sheet 
      v-model:show="showActionSheet" 
      :items="actionItems"
      @change="handleChange"
      @cancel="handleCancel"
    />
  </view>
</template>

<script setup>
const showActionSheet = ref(false)
const actionItems = ref([
  { text: '选项一' },
  { text: '选项二' },
  { text: '选项三' }
])

const handleChange = (item) => {
  console.log('点击了项目：', item)
}

const handleCancel = () => {
  console.log('点击了取消')
}
</script>
```

## API

### Props

| 参数名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| show | Boolean | false | 是否显示动作面板 |
| maskClosable | Boolean | true | 点击遮罩是否可关闭 |
| items | Array | [] | 菜单按钮数组 |
| tips | String | '' | 提示文字 |
| color | String | '#808080' | 提示文字颜色 |
| size | Number | 26 | 提示文字大小(rpx) |
| radius | Boolean | true | 是否需要圆角 |
| isCancel | Boolean | true | 是否需要取消按钮 |
| cancelText | String | '取消' | 取消按钮文字 |
| theme | String | 'light' | 主题样式，可选：light、dark |
| safeAreaInsetBottom | Boolean | true | 是否适配底部安全区域 |
| maskColor | String | 'rgba(0, 0, 0, 0.6)' | 遮罩颜色 |
| customStyle | Object | {} | 自定义样式 |
| itemFontSize | Number | 34 | 菜单项字体大小(rpx) |
| disabledColor | String | '#c8c9cc' | 禁用状态的文字颜色 |
| closeOnItemClick | Boolean | true | 点击菜单项后是否自动关闭 |
| zIndex | Number | `9999` | 组件z-index层级 |
| duration | Number | `250` | 动画持续时间(ms) |

### `items` 数组项属性详解

`items` 属性接收一个对象数组，每个对象代表一个操作项，可以包含以下属性：

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| text | String | **必填** | 按钮上显示的文字内容 |
| color | String | `''` (暗色主题下为`#fff`，亮色主题下为`#2B2B2B`) | 操作项文字颜色，如果为空，则根据主题自动设置 |
| icon | String | `''` | 操作项左侧的图标类名 (例如 `iconfont icon-name`) |
| badge | String / Number | `''` | 操作项右侧显示的徽标内容 |
| disabled | Boolean | `false` | 是否禁用该操作项，禁用后不可点击且样式会变化 |
| fontSize | String / Number | `''` (默认为组件的 `itemFontSize` 属性值) | 操作项文字大小，可传入如 `'28rpx'` 或数字（单位rpx） |
| ... | Any | - | 可以传入其他自定义属性，这些属性会在 `change` 事件回调时一并返回 |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| `open` | 面板打开动画开始时触发 | - |
| `close` | 面板关闭动画结束后触发 | - |
| `change` | 点击任一操作项时触发（禁用项除外） | `item` 对象，包含该操作项的所有属性，如 `{ index: number, text: string, color?: string, icon?: string, badge?: string, disabled?: boolean, fontSize?: string, ...自定义属性 }` |
| `cancel` | 点击取消按钮或遮罩层（如果 `maskClosable` 为 `true`）时触发 | - |
| `update:show` | 当组件内部状态导致 `show` 属性需要变更时触发，用于实现 `v-model:show` | `Boolean`，表示面板最新的显示状态 |

### 插槽 (Slots)

| 插槽名 | 说明 |
|-------|------|
| `tips` | 自定义顶部提示区域的内容。替换默认的 `tips` 文字显示区域。 |
| `cancel-button` | 自定义底部取消按钮的内容。替换默认的取消按钮文字。 |

### 方法 (Methods)

可以通过 `ref` 获取组件实例后调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|-------|
| `open()` | 主动打开动作面板 | - | `void` |
| `close()` | 主动关闭动作面板 | - | `void` |

**方法调用示例：**

```vue
<template>
  <button @click="openSheet">通过方法打开</button>
  <zx-action-sheet ref="actionSheetRef" :items="items" />
</template>

<script setup>
import { ref } from 'vue';
const actionSheetRef = ref(null);
const items = ref([{ text: '方法调用选项' }]);

const openSheet = () => {
  if (actionSheetRef.value) {
    actionSheetRef.value.open();
  }
};
</script>
```

## 使用示例

### 暗色主题

```vue
<zx-action-sheet 
  v-model:show="showDark" 
  :items="darkItems"
  tips="暗色主题动作面板"
  theme="dark"
  @change="handleChange"
/>
```

### 带图标和徽标

```vue
<zx-action-sheet 
  v-model:show="showWithIcons" 
  :items="iconItems"
  @change="handleChange"
/>

<script setup>
const iconItems = ref([
  { text: '拍照', icon: 'camera' },
  { text: '相册选择', icon: 'image' },
  { text: '文件', icon: 'file', badge: '5' },
  { text: '收藏', icon: 'star' }
])
</script>
```

### 禁用项

```vue
<zx-action-sheet 
  v-model:show="showWithDisabled" 
  :items="disabledItems"
  @change="handleChange"
/>

<script setup>
const disabledItems = ref([
  { text: '选项一' },
  { text: '选项二', disabled: true },
  { text: '选项三' }
])
</script>
```

### 自定义样式

```vue
<zx-action-sheet 
  v-model:show="showCustomStyle" 
  :items="customItems"
  :custom-style="{ boxShadow: '0 -5rpx 20rpx rgba(0, 0, 0, 0.1)' }"
  mask-color="rgba(0, 0, 0, 0.3)"
  :item-font-size="30"
  @change="handleChange"
/>
```

### 使用插槽

```vue
<zx-action-sheet v-model:show="showWithSlots" :items="basicItems">
  <template #tips>
    <view class="custom-tips">
      <text class="custom-tips-title">自定义提示</text>
      <text class="custom-tips-desc">这是一个自定义的提示内容</text>
    </view>
  </template>
  <template #cancel-button>
    <view class="custom-cancel">
      <text class="custom-cancel-text">关闭面板</text>
    </view>
  </template>
</zx-action-sheet>
```

### 方法调用

```vue
<template>
  <view>
    <button @click="openActionSheet">打开动作面板</button>
    <button @click="closeActionSheet">关闭动作面板</button>
    
    <zx-action-sheet 
      ref="actionSheet"
      :items="actionItems"
      @change="handleChange"
    />
  </view>
</template>

<script setup>
const actionSheet = ref(null)

const openActionSheet = () => {
  actionSheet.value.open()
}

const closeActionSheet = () => {
  actionSheet.value.close()
}
</script>
```


## 常见问题

### 1. 图标使用

组件内部使用 `<zx-icon>` 来显示图标。你需要在 `items` 数组对象的 `icon` 属性中传入图标的名称。请确保你已经正确安装和配置了 `zx-icon` 组件及其依赖的图标库。

例如，如果你的图标库中有一个名为 `setting` 的图标，你可以这样使用：

```js
// 使用 zx-icon 显示图标
const items = [
  { text: '设置', icon: 'setting' } // 'setting' 是图标的名称
]
```

如果需要使用自定义前缀的图标，请确保 `zx-icon` 组件支持该前缀，或者你可能需要调整 `zx-action-sheet.vue` 中 `<zx-icon>` 的 `custom-prefix` 属性。

### 2. 动态控制面板显示

可以使用 `v-model:show` 双向绑定或者 `ref` 调用方法来控制面板的显示和隐藏。

### 3. 自适应高度

组件会根据内容自动调整高度，无需手动设置。


## 注意事项

- **主题与颜色**：当 `items` 中的操作项没有指定 `color` 时，其文字颜色会根据当前的 `theme` (light/dark) 自动适应。如果指定了 `color`，则优先使用指定的颜色。
- **图标使用**：`icon` 属性需要传入图标的名称（例如 `setting`）。组件内部使用 `<zx-icon>` 显示图标，请确保已正确配置和引入图标库，并且 `<zx-icon>` 组件能够识别该图标名称。
- **z-index 管理**：组件的 `z-index` 默认为 `9999`，遮罩层的 `z-index` 会比组件低。如果项目中存在更高 `z-index` 的元素，可能需要调整此属性以确保组件正确显示在顶层。
- **动画性能**：组件内置了 CSS 动画。在 H5 平台，已通过 `will-change` 和 `backface-visibility` 进行了优化。在低性能设备上，如果遇到动画卡顿，可以考虑适当减少 `duration` 或简化操作项内容。
- **内容溢出**：如果操作项的文字内容过长，组件内部未做特殊处理（如文字截断）。建议控制操作项文字长度，或通过自定义样式及插槽进行处理。
- **安全区域**：`safeAreaInsetBottom` 属性默认为 `true`，会自动在底部添加安全区域的占位，避免内容被设备底部（如 iPhone X系列的小黑条）遮挡。如果不需要，可以设置为 `false`。
