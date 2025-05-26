# zx-action-sheet 动作面板组件

基于 uni-app 开发的跨平台动作面板组件，支持 H5、小程序和 App 平台。

## 特性

- ✅ **跨平台兼容**：支持 H5、各家小程序和 App
- ✅ **多主题支持**：内置明亮和暗黑两种主题
- ✅ **丰富的选项**：支持图标、徽标、自定义颜色和字体大小
- ✅ **安全区适配**：自动适配底部安全区
- ✅ **灵活的插槽**：支持自定义提示和取消按钮内容
- ✅ **事件完善**：提供打开、关闭、点击项、取消等事件
- ✅ **动画流畅**：优化的过渡动画效果
- ✅ **易于扩展**：提供自定义样式接口

## 安装使用

### 引入组件

```vue
<script setup>
import ZxActionSheet from '@/components/zx-action-sheet/zx-action-sheet.vue'
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
import { ref } from 'vue'
import ZxActionSheet from '@/components/zx-action-sheet/zx-action-sheet.vue'

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
| zIndex | Number | 9999 | 组件z-index层级 |
| duration | Number | 250 | 动画持续时间(ms) |

### items 数组项属性

| 参数名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| text | String | - | 按钮文字 |
| color | String | '#2B2B2B' | 文字颜色 |
| icon | String | - | 图标类名 |
| badge | String | - | 徽标内容 |
| disabled | Boolean | false | 是否禁用 |
| fontSize | String | - | 文字大小(可传如'28rpx') |

### 事件

| 事件名 | 说明 | 回调参数 |
|-------|------|---------|
| change | 点击菜单项时触发 | {index, text, ...} item对象 |
| cancel | 点击取消按钮时触发 | - |
| open | 面板打开时触发 | - |
| close | 面板关闭时触发 | - |
| update:show | 更新show属性值时触发 | Boolean |

### 插槽

| 插槽名 | 说明 |
|-------|------|
| tips | 自定义提示内容 |
| cancel-button | 自定义取消按钮内容 |

### 方法

| 方法名 | 说明 | 参数 |
|-------|------|------|
| open | 打开动作面板 | - |
| close | 关闭动作面板 | - |

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
  { text: '拍照', icon: 'icon-camera' },
  { text: '相册选择', icon: 'icon-image' },
  { text: '文件', icon: 'icon-file', badge: '5' },
  { text: '收藏', icon: 'icon-star' }
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
import { ref } from 'vue'

const actionSheet = ref(null)

const openActionSheet = () => {
  actionSheet.value.open()
}

const closeActionSheet = () => {
  actionSheet.value.close()
}
</script>
```

## 兼容性

| 平台 | 是否支持 |
|-----|---------|
| H5 | ✅ |
| 微信小程序 | ✅ |
| 支付宝小程序 | ✅ |
| 百度小程序 | ✅ |
| 抖音小程序 | ✅ |
| QQ小程序 | ✅ |
| 快手小程序 | ✅ |
| App (vue) | ✅ |
| App (nvue) | ✅ |

## 常见问题

### 1. 自定义图标

组件支持使用自定义图标，只需要在全局样式中定义对应的图标类，然后在 `items` 中使用该类名即可。

```css
/* 在全局样式中定义 */
.icon-custom::before {
  content: '⚙️';  /* 使用Unicode字符或其他图标库 */
}
```

```js
// 使用自定义图标
const items = [
  { text: '设置', icon: 'icon-custom' }
]
```

### 2. 动态控制面板显示

可以使用 `v-model:show` 双向绑定或者 `ref` 调用方法来控制面板的显示和隐藏。

### 3. 自适应高度

组件会根据内容自动调整高度，无需手动设置。
