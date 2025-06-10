# ZxGoodsMenu 商品菜单

## 介绍

向下弹出的商品菜单列表，适用于商品筛选、分类选择等场景。支持 H5、小程序、App 多端。

## 安装

```javascript
import { createApp } from 'vue'
import ZxGoodsMenu from '@/components/zx-goods-menu'

const app = createApp()
app.use(ZxGoodsMenu)
```

## 基础用法

```vue
<template>
  <zx-goods-menu 
    v-model="menu" 
    @change="handleChange"
  ></zx-goods-menu>
</template>

<script setup>
import { ref } from 'vue'

const menu = ref([
  {
    title: '全部商品',
    value: '',
    options: [
      { text: '全部商品', value: '' },
      { text: '新款商品', value: 'new' },
      { text: '活动商品', value: 'activity' }
    ]
  },
  {
    title: '销量',
    value: '',
    options: [
      { text: '默认', value: '' },
      { text: '销量从高到低', value: 'desc' },
      { text: '销量从低到高', value: 'asc' }
    ]
  }
])

const handleChange = (data) => {
  console.log('选择变化:', data)
}
</script>
```

## 自定义菜单内容

使用 `content` 插槽可以自定义菜单的弹出内容。

```vue
<template>
  <zx-goods-menu v-model="menu">
    <template #content="{ item, options }">
      <view class="custom-content">
        <view class="custom-header">
          <text class="custom-title">{{ item.title }}</text>
        </view>
        <view class="custom-options">
          <view 
            v-for="(option, index) in options" 
            :key="index"
            class="custom-option"
            :class="{ 'custom-option--active': option.value === item.value }"
            @click="selectOption(item, option)"
          >
            <text>{{ option.text }}</text>
          </view>
        </view>
      </view>
    </template>
  </zx-goods-menu>
</template>
```

## 一行两列

设置 `cols` 属性可以在一行中显示多列选项。

```vue
<template>
  <zx-goods-menu 
    v-model="menu" 
    :cols="2"
  ></zx-goods-menu>
</template>
```

## 自定义选中态颜色

```vue
<template>
  <zx-goods-menu 
    v-model="menu" 
    active-color="#07c160"
  ></zx-goods-menu>
</template>
```

## 自定义图标

使用 `icon` 插槽可以自定义菜单项的图标。

```vue
<template>
  <zx-goods-menu v-model="menu">
    <template #icon="{ item, index }">
      <text class="custom-icon" :class="item.icon"></text>
    </template>
  </zx-goods-menu>
</template>
```

## 向上展开

```vue
<template>
  <zx-goods-menu 
    v-model="menu" 
    direction="up"
  ></zx-goods-menu>
</template>
```

## 禁用菜单

```vue
<template>
  <zx-goods-menu v-model="menu"></zx-goods-menu>
</template>

<script setup>
const menu = ref([
  {
    title: '可用菜单',
    value: '',
    options: [...]
  },
  {
    title: '禁用菜单',
    value: '',
    disabled: true,
    options: [...]
  }
])
</script>
```

## 手动控制

使用实例上的 `toggle` 方法可以手动控制菜单的显示和隐藏。

```vue
<template>
  <zx-goods-menu 
    ref="menuRef"
    v-model="menu"
  ></zx-goods-menu>
  <button @click="openMenu">打开菜单</button>
  <button @click="closeMenu">关闭菜单</button>
</template>

<script setup>
import { ref } from 'vue'

const menuRef = ref()

const openMenu = () => {
  menuRef.value?.toggle(true)
}

const closeMenu = () => {
  menuRef.value?.toggle(false)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 菜单数据 | Array | [] |
| direction | 菜单展开方向，可选值为 `up` `down` | string | down |
| duration | 动画时长，单位 s | string \| number | 0.3 |
| active-color | 选项的选中态颜色 | string | #F2270C |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单 | boolean | true |
| scroll-fixed | 滚动后是否固定，可设置固定位置 | boolean \| string \| number | false |
| scroll-fixed-z-index | 固定时的层级 | number | 1000 |
| lock-scroll | 背景是否锁定 | boolean | true |
| overlay | 是否开启背景遮罩 | boolean | true |
| cols | 可以设置一行展示多少列 options | number | 1 |

### Menu Data Structure

```javascript
[
  {
    title: '菜单标题',
    value: '当前选中值',
    disabled: false, // 是否禁用
    icon: 'icon-class', // 图标类名
    options: [
      {
        text: '选项文本',
        value: '选项值',
        icon: 'option-icon', // 选项图标
        image: 'image-url', // 选项图片
        desc: '选项描述' // 选项描述
      }
    ]
  }
]
```

### Slots

| 名称 | 说明 | 参数 |
|------|------|------|
| icon | 自定义菜单项图标 | { item, index } |
| content | 自定义菜单内容 | { item, options } |
| option-icon | 自定义选项图标 | { option, index } |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选择 option 之后触发 | { index, item, option, optionIndex } |
| toggle | 切换菜单展示状态 | show: boolean |
| open | 打开菜单栏时触发 | - |
| close | 关闭菜单栏时触发 | - |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| toggle | 切换菜单展示状态，传 true 为显示，false 为隐藏，不传参为取反 | show?: boolean |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 描述 |
|------|--------|------|
| --zx-goods-menu-bar-height | 48px | 菜单栏高度 |
| --zx-goods-menu-item-font-size | 14px | 菜单项字体大小 |
| --zx-goods-menu-item-text-color | #323233 | 菜单项文字颜色 |
| --zx-goods-menu-item-active-text-color | #F2270C | 菜单项激活文字颜色 |
| --zx-goods-menu-bar-border-color | #eaf0fb | 菜单栏边框颜色 |
| --zx-goods-menu-bar-box-shadow | 0 2px 12px rgba(89, 89, 89, 0.12) | 菜单栏阴影 |
| --zx-goods-menu-item-disabled-color | #969799 | 禁用菜单项颜色 |
| --zx-goods-menu-content-max-height | 214px | 菜单内容最大高度 |
| --zx-goods-menu-option-padding | 12px 24px | 选项内边距 |
| --zx-goods-menu-overlay-bg-color | rgba(0, 0, 0, 0.5) | 遮罩背景颜色 |

### 自定义样式示例

```scss
.custom-goods-menu {
  --zx-goods-menu-item-active-text-color: #07c160;
  --zx-goods-menu-bar-height: 56px;
  --zx-goods-menu-item-font-size: 16px;
}
```

## 注意事项

1. 组件使用 `v-model` 进行数据绑定，请确保传入的数据结构正确
2. 在小程序中，由于不支持 `document.body`，锁定滚动功能可能无效
3. 自定义内容时，需要手动处理选项点击事件
4. 组件支持多端，但在不同平台上的表现可能略有差异
5. 使用图标时，请确保相关的图标字体文件已正确引入

## 更新日志

### v1.0.0

- 初始版本
- 支持基础菜单功能
- 支持自定义内容
- 支持多列显示
- 支持自定义颜色和图标
- 支持向上/向下展开
- 支持禁用状态
- 支持手动控制