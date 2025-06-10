# zx-side-navbar 侧边导航栏

侧边导航栏组件，适用于展示多级导航菜单，支持 H5、小程序和 App 平台。参考 NutUI 设计规范重构。

## 特性

- 🎯 支持多级嵌套导航展示
- 🎨 自定义缩进宽度
- 📱 兼容 H5、小程序、App
- 🎪 支持动态数据
- 🔧 灵活的事件处理
- 🌙 支持暗黑模式
- 📂 支持折叠展开功能
- 🎨 现代化 UI 设计

## 基础用法

```vue
<template>
  <zx-side-navbar>
    <zx-side-navbar-item title="首页" ikey="home" @click="handleClick" />
    <zx-side-navbar-item title="分类" ikey="category" @click="handleClick" />
    <zx-side-navbar-item title="购物车" ikey="cart" @click="handleClick" />
    <zx-side-navbar-item title="我的" ikey="profile" @click="handleClick" />
  </zx-side-navbar>
</template>

<script setup>
function handleClick() {
  console.log('导航项被点击')
}
</script>
```

## 自定义缩进

通过 `offset` 属性可以设置导航项的缩进宽度：

```vue
<template>
  <zx-side-navbar :offset="30">
    <zx-side-navbar-item title="一级菜单" ikey="level1" />
    <zx-side-navbar-item title="二级菜单" ikey="level2" />
    <zx-side-navbar-item title="三级菜单" ikey="level3" />
  </zx-side-navbar>
</template>
```

## 嵌套导航（推荐）

使用 `zx-sub-side-navbar` 组件实现真正的嵌套导航，支持折叠展开：

```vue
<template>
  <zx-side-navbar>
    <zx-sub-side-navbar title="智能城市AI">
      <zx-sub-side-navbar title="人体识别1">
        <zx-side-navbar-item title="人体检测1" ikey="detect1" />
        <zx-side-navbar-item title="细粒度人像分割1" ikey="segment1" />
      </zx-sub-side-navbar>
      <zx-sub-side-navbar title="人体识别2">
        <zx-side-navbar-item title="人体检测2" ikey="detect2" />
        <zx-side-navbar-item title="细粒度人像分割2" ikey="segment2" />
      </zx-sub-side-navbar>
    </zx-sub-side-navbar>
  </zx-side-navbar>
</template>
```

## 多级导航（兼容旧版）

可以通过缩进和标题前缀来实现多级导航的视觉效果：

```vue
<template>
  <zx-side-navbar :offset="20">
    <zx-side-navbar-item title="电子产品" ikey="electronics" />
    <zx-side-navbar-item title="　手机数码" ikey="mobile" />
    <zx-side-navbar-item title="　　智能手机" ikey="smartphone" />
    <zx-side-navbar-item title="　　平板电脑" ikey="tablet" />
    <zx-side-navbar-item title="　电脑办公" ikey="computer" />
    <zx-side-navbar-item title="　　笔记本" ikey="laptop" />
    <zx-side-navbar-item title="　　台式机" ikey="desktop" />
  </zx-side-navbar>
</template>
```

## 动态数据

支持通过 `v-for` 渲染动态数据：

```vue
<template>
  <zx-side-navbar>
    <zx-side-navbar-item 
      v-for="item in navItems" 
      :key="item.ikey"
      :title="item.title" 
      :ikey="item.ikey" 
      @click="handleNavClick(item)"
    />
  </zx-side-navbar>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref([
  { title: '首页', ikey: 'home' },
  { title: '分类', ikey: 'category' },
  { title: '购物车', ikey: 'cart' },
  { title: '我的', ikey: 'profile' }
])

function handleNavClick(item) {
  console.log('点击了:', item.title)
}
</script>
```

## API

### zx-side-navbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 导航缩进宽度 | number \| string | 15 |

### zx-sub-side-navbar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 导航标题 | string | '' |
| open | 导航是否默认展开 | boolean | true |

### zx-side-navbar-item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 导航标题 | string | '' |
| ikey | 导航唯一标识 | string | '' |

### zx-sub-side-navbar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| title-click | 导航标题点击 | { title: string, open: boolean } |

### zx-side-navbar-item Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 导航项点击 | - |

## 主题定制

组件提供了下列 CSS 变量，可用于自定义样式：

### 基础变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --zx-sidenavbar-content-bg-color | #fff | 内容背景色 |
| --zx-sidenavbar-item-height | 80rpx | 导航项高度 |
| --zx-sidenavbar-item-font-size | 32rpx | 导航项字体大小 |
| --zx-sidenavbar-item-title-color | #333 | 导航项文字颜色 |
| --zx-sidenavbar-item-title-active-color | #fa2c19 | 导航项激活文字颜色 |

### 子导航变量

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --zx-sidenavbar-sub-title-bg-color | #f6f6f6 | 子导航背景色 |
| --zx-sidenavbar-sub-title-font-size | 30rpx | 子导航字体大小 |
| --zx-sidenavbar-sub-title-height | 80rpx | 子导航高度 |
| --zx-sidenavbar-sub-title-text-color | #333 | 子导航文字颜色 |
| custom-class | 自定义类名 | string | - |
| custom-style | 自定义样式 | string \| object | - |

### zx-side-navbar-item Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 导航标题 | string | - |
| ikey | 导航唯一标识 | string | - |
| custom-class | 自定义类名 | string | - |
| custom-style | 自定义样式 | string \| object | - |

### zx-side-navbar-item Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击导航项时触发 | - |

### zx-side-navbar Slots

| 名称 | 说明 |
|------|------|
| default | 默认插槽，用于放置 zx-side-navbar-item |

## 样式定制

组件提供了丰富的 CSS 变量，可以方便地进行样式定制：

```scss
// 主要颜色变量
$zx-sidenavbar-content-bg-color: #f7f8fa; // 容器背景色
$zx-sidenavbar-item-height: 56rpx; // 导航项高度
$zx-sidenavbar-item-font-size: 28rpx; // 字体大小
$zx-sidenavbar-item-title-color: #1a1a1a; // 标题颜色
$zx-sidenavbar-item-title-bg-color: #fff; // 背景色
$zx-sidenavbar-item-title-active-color: #fa2c19; // 激活状态颜色
```

### 自定义样式示例

```vue
<template>
  <zx-side-navbar custom-class="my-navbar">
    <zx-side-navbar-item 
      title="自定义样式" 
      ikey="custom" 
      custom-class="my-nav-item"
    />
  </zx-side-navbar>
</template>

<style>
.my-navbar {
  border-radius: 12rpx;
  overflow: hidden;
}

.my-nav-item {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
}
</style>
```

## 注意事项

1. **平台兼容性**：组件使用 `view` 和 `text` 标签，兼容所有 uni-app 支持的平台
2. **事件处理**：点击事件使用 `@click.stop` 防止事件冒泡
3. **样式隔离**：组件使用 `styleIsolation: 'shared'` 确保样式正确应用
4. **性能优化**：大量数据时建议使用虚拟滚动或分页加载
5. **无障碍访问**：建议为导航项添加适当的 `aria-label` 属性

## 完整示例

查看 [示例页面](../../pages3/side-navbar/index.vue) 了解更多用法。

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础导航功能
- ✨ 支持自定义缩进
- ✨ 支持事件处理
- ✨ 支持暗黑模式