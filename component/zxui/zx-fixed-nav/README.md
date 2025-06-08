# zx-fixed-nav 悬浮导航

`zx-fixed-nav` 是一个悬浮导航组件，提供悬浮收起体验交互，用于快捷导航。支持 H5、小程序、App 多端。

## 特性

- 支持左侧和右侧悬浮
- 支持自定义导航列表
- 支持遮罩层显示/隐藏
- 支持自定义样式和颜色
- 支持徽章数字显示
- 完全兼容 uni-app 多端
- 使用 Vue 3 Composition API

## 使用方法

### 基础用法

```vue
<template>
  <zx-fixed-nav 
    v-model:visible="visible" 
    :nav-list="navList"
    @selected="onSelected"
  />
</template>

<script setup>
import { ref } from 'vue'
import ZxFixedNav from '@/components/zx-fixed-nav/zx-fixed-nav.vue'

const visible = ref(false)
const navList = ref([
  {
    id: 1,
    text: '首页',
    icon: '/static/icons/home.png'
  },
  {
    id: 2,
    text: '分类',
    icon: '/static/icons/category.png',
    num: 2
  },
  {
    id: 3,
    text: '购物车',
    icon: '/static/icons/cart.png',
    num: 5
  }
])

const onSelected = ({ item, event }) => {
  console.log('选中项:', item)
  // 处理导航点击
}
</script>
```

### 左侧悬浮

```vue
<template>
  <zx-fixed-nav 
    v-model:visible="visible" 
    :nav-list="navList"
    type="left"
  />
</template>
```

### 取消背景遮罩

```vue
<template>
  <zx-fixed-nav 
    v-model:visible="visible" 
    :nav-list="navList"
    :overlay="false"
  />
</template>
```

### 自定义样式

```vue
<template>
  <zx-fixed-nav 
    v-model:visible="visible" 
    :nav-list="navList"
    active-color="#2979ff"
    active-text="收起菜单"
    un-active-text="展开菜单"
    :position="{ top: '200rpx', bottom: 'auto' }"
  />
</template>
```

### 自定义按钮内容

```vue
<template>
  <zx-fixed-nav 
    v-model:visible="visible" 
    :nav-list="navList"
  >
    <template #btn>
      <view class="custom-btn">
        <text class="custom-icon">☰</text>
        <text class="custom-text">菜单</text>
      </view>
    </template>
  </zx-fixed-nav>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model:visible | 是否显示导航列表 | Boolean | false |
| nav-list | 悬浮列表内容数据 | Array | [] |
| active-color | 选中按钮文案颜色 | String | #fa2c19 |
| active-text | 收起列表按钮文案 | String | 收起导航 |
| un-active-text | 展开列表按钮文案 | String | 快速导航 |
| type | 导航方向，可选值 left、right | String | right |
| overlay | 展开时是否显示遮罩 | Boolean | true |
| position | fixed 垂直位置 | Object | {top: 'auto', bottom: 'auto'} |
| custom-style | 自定义样式 | Object | {} |

### nav-list 数据结构

```javascript
[
  {
    id: 1,           // 唯一标识
    text: '首页',     // 显示文本
    icon: '/static/icons/home.png',  // 图标地址
    num: 2           // 徽章数字（可选）
  }
]
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态改变时触发 | visible: Boolean |
| selected | 选择导航项后触发 | {item: Object, event: Event} |

### Slots

| 名称 | 说明 |
|------|------|
| btn | 自定义按钮内容 |

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 说明 |
|------|--------|------|
| --active-color | #fa2c19 | 激活状态颜色 |

## 注意事项

1. 组件使用 `position: fixed` 定位，请确保页面布局不会被遮挡
2. 图标建议使用本地静态资源，避免网络图片加载问题
3. 在小程序中使用时，请确保图片路径正确
4. 组件支持 Vue 3 的 v-model 语法糖

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ 小程序
- ✅ App (Vue)
- ✅ App (Nvue)

## 更新日志

### 1.0.0

- 初始版本
- 支持基础悬浮导航功能
- 支持左右侧悬浮
- 支持自定义样式
- 支持遮罩层
- 支持徽章显示