# ZX-BreadcrumbItem 面包屑项组件

面包屑导航的子组件，用于构成完整的路径导航链条。必须与 `zx-breadcrumb` 组件配合使用。

## 特性

- 🔗 **路由跳转**：支持 Vue Router 风格的路由跳转
- 🌐 **外部链接**：支持跳转到外部网站
- 🎨 **自定义样式**：支持自定义文字颜色
- 🚫 **禁用状态**：支持单独禁用某一项
- 🎯 **当前页面识别**：自动识别并高亮当前页面
- 🧩 **插槽支持**：支持自定义内容和分隔符
- 🎪 **继承配置**：自动继承父组件的尺寸和颜色配置
- 📱 **跨平台兼容**：支持 H5、App 等多平台

## 基础用法

```vue
<template>
  <zx-breadcrumb>
    <!-- 带路由跳转的面包屑项 -->
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/list" text="列表页"></zx-breadcrumb-item>
    
    <!-- 当前页面（无跳转） -->
    <zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 路由跳转

### Vue Router 风格跳转

```vue
<template>
  <zx-breadcrumb>
    <!-- 字符串路径 -->
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/user/profile" text="用户资料"></zx-breadcrumb-item>
    
    <!-- 对象路径 -->
    <zx-breadcrumb-item :to="{ path: '/product', query: { id: 123 } }" text="产品详情"></zx-breadcrumb-item>
    
    <!-- 命名路由 -->
    <zx-breadcrumb-item :to="{ name: 'UserDetail', params: { id: 456 } }" text="用户详情"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

### 替换式导航

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    <!-- 使用 replace 不会在浏览器历史中留下记录 -->
    <zx-breadcrumb-item to="/login" replace text="登录"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 外部链接

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    
    <!-- 在当前窗口打开 -->
    <zx-breadcrumb-item href="https://www.baidu.com" text="百度"></zx-breadcrumb-item>
    
    <!-- 在新窗口打开 -->
    <zx-breadcrumb-item href="https://www.google.com" target="_blank" text="谷歌"></zx-breadcrumb-item>
    
    <zx-breadcrumb-item text="当前页面"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 禁用状态

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    
    <!-- 禁用单个项目 -->
    <zx-breadcrumb-item disabled text="禁用项"></zx-breadcrumb-item>
    
    <zx-breadcrumb-item text="当前页面"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 自定义颜色

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    
    <!-- 自定义单个项目的颜色 -->
    <zx-breadcrumb-item to="/important" color="#f56c6c" text="重要页面"></zx-breadcrumb-item>
    
    <zx-breadcrumb-item text="当前页面"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 事件处理

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item 
      to="/" 
      text="首页" 
      @click="handleItemClick"
    ></zx-breadcrumb-item>
    
    <zx-breadcrumb-item 
      to="/analytics" 
      text="数据分析" 
      @click="trackNavigation"
    ></zx-breadcrumb-item>
    
    <zx-breadcrumb-item text="当前页面"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>

<script setup>
const handleItemClick = () => {
  console.log('点击了首页链接')
}

const trackNavigation = () => {
  // 埋点统计
  console.log('用户点击了数据分析页面')
}
</script>
```

## 自定义内容

### 插槽内容

```vue
<template>
  <zx-breadcrumb>
    <!-- 带图标的面包屑项 -->
    <zx-breadcrumb-item to="/">
      <view class="flex-row align-center gap-5">
        <zx-icon name="home" size="16" color="#409eff"></zx-icon>
        <text>首页</text>
      </view>
    </zx-breadcrumb-item>
    
    <!-- 带徽章的面包屑项 -->
    <zx-breadcrumb-item to="/messages">
      <view class="flex-row align-center gap-5">
        <text>消息中心</text>
        <zx-badge value="99+" type="danger"></zx-badge>
      </view>
    </zx-breadcrumb-item>
    
    <zx-breadcrumb-item text="消息详情"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

### 自定义分隔符

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    
    <zx-breadcrumb-item to="/category">
      <!-- 自定义这一项的分隔符 -->
      <template #separator>
        <zx-icon name="chevron-right" size="12" color="#909399"></zx-icon>
      </template>
      分类页面
    </zx-breadcrumb-item>
    
    <zx-breadcrumb-item>
      <template #separator>
        <text style="color: #67c23a; margin: 0 8px;">→</text>
      </template>
      详情页面
    </zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 动态面包屑

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item 
      v-for="(item, index) in breadcrumbItems" 
      :key="index"
      :to="item.path"
      :text="item.name"
      @click="handleBreadcrumbClick(item)"
    ></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>

<script setup>
import { ref } from 'vue'

const breadcrumbItems = ref([
  { name: '首页', path: '/' },
  { name: '用户管理', path: '/users' },
  { name: '用户详情', path: '/users/123' },
  { name: '编辑资料', path: '' } // 当前页面，无路径
])

const handleBreadcrumbClick = (item) => {
  console.log('点击了:', item.name)
  // 处理点击事件，比如埋点统计
}
</script>
```

## 响应式设计

```vue
<template>
  <zx-breadcrumb>
    <!-- 长文本会自动处理，不会影响布局 -->
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="这是一个很长很长的页面标题示例"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="超级无敌长的面包屑项目名称"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="当前页面"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 实际应用场景

### 电商网站

```vue
<template>
  <zx-breadcrumb separator=" > ">
    <zx-breadcrumb-item to="/" text="商城首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item :to="{ path: '/category', query: { type: 'electronics' } }" text="数码产品"></zx-breadcrumb-item>
    <zx-breadcrumb-item :to="{ path: '/category/phones' }" text="手机通讯"></zx-breadcrumb-item>
    <zx-breadcrumb-item :to="{ path: '/brand/apple' }" text="苹果官方"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="iPhone 15 Pro Max 512GB 深空黑色"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

### 后台管理系统

```vue
<template>
  <zx-breadcrumb separator-icon="arrow-right">
    <zx-breadcrumb-item to="/dashboard">
      <view class="flex-row align-center gap-5">
        <zx-icon name="dashboard" size="16"></zx-icon>
        <text>控制台</text>
      </view>
    </zx-breadcrumb-item>
    
    <zx-breadcrumb-item to="/system" text="系统管理"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/system/users" text="用户管理"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="新增用户"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

### 文档系统

```vue
<template>
  <zx-breadcrumb separator=" / ">
    <zx-breadcrumb-item href="https://docs.example.com" target="_blank" text="文档首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/docs/guide" text="开发指南"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/docs/guide/components" text="组件库"></zx-breadcrumb-item>
    <zx-breadcrumb-item text="面包屑组件"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## API 参考

### 属性 (Props)

| 属性名 | 说明 | 类型 | 可选值 | 默认值 | 示例 |
|--------|------|------|--------|--------|------|
| to | 路由跳转目标，同 vue-router 的 to 属性 | `string` \| `object` | — | — | `"/"` 或 `{ path: "/user" }` |
| replace | 如果设置为 true，导航将不会留下历史记录 | `boolean` | — | `false` | `true` |
| text | 面包屑项的文字内容 | `string` \| `number` | — | — | `"首页"` |
| disabled | 是否禁用该项 | `boolean` | — | `false` | `true` |
| color | 文字颜色，会覆盖父组件设置 | `string` | — | — | `"#f56c6c"` |
| href | 外部链接地址 | `string` | — | — | `"https://www.baidu.com"` |
| target | 链接打开方式，仅在使用 href 时有效 | `string` | `_self` \| `_blank` | `_self` | `"_blank"` |

### 事件 (Events)

| 事件名 | 说明 | 回调参数 | 示例 |
|--------|------|----------|------|
| click | 点击面包屑项时触发 | — | `@click="handleClick"` |

### 插槽 (Slots)

| 插槽名 | 说明 | 示例 |
|--------|------|------|
| default | 自定义面包屑项内容，会覆盖 text 属性 | `<template #default>自定义内容</template>` |
| separator | 自定义该项的分隔符 | `<template #separator><zx-icon name="arrow" /></template>` |

## 继承的配置

从父组件 `zx-breadcrumb` 继承以下配置：

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| size | 尺寸大小 | `string` | `"default"` |
| separator | 默认分隔符 | `string` | `"/"` |
| separatorIcon | 图标分隔符 | `string` | — |
| disabled | 整体禁用状态 | `boolean` | `false` |
| color | 默认文字颜色 | `string` | — |
| activeColor | 当前页面颜色 | `string` | — |
| separatorColor | 分隔符颜色 | `string` | — |

## 状态说明

### 当前页面判断

组件会自动判断是否为当前页面：
- **当前页面**：没有 `to` 和 `href` 属性的项目
- **链接页面**：有 `to` 或 `href` 属性的项目

```vue
<template>
  <zx-breadcrumb>
    <!-- 这是链接，可以点击 -->
    <zx-breadcrumb-item to="/" text="首页"></zx-breadcrumb-item>
    <zx-breadcrumb-item to="/list" text="列表页"></zx-breadcrumb-item>
    
    <!-- 这是当前页面，不可点击，会有不同的样式 -->
    <zx-breadcrumb-item text="详情页"></zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

### 禁用状态

禁用状态的优先级：
1. 单项 `disabled` 属性
2. 父组件 `disabled` 属性
3. 当前页面状态（自动禁用）

## 平台兼容性

### H5 平台

```javascript
// 外部链接处理
if (props.target === '_blank') {
  window.open(props.href);
} else {
  window.location.href = props.href;
}
```

### App 平台

```javascript
// 使用 plus.runtime.openURL 打开外部链接
plus.runtime.openURL(props.href);
```

### 小程序平台

小程序平台不支持外部链接跳转，会在控制台输出提示信息。

## 注意事项

1. **必须配合使用**：`zx-breadcrumb-item` 必须作为 `zx-breadcrumb` 的子组件使用
2. **路由方法检测**：组件会自动检测项目的路由方法（`$zx.route`），如果不存在会使用备用处理
3. **当前页面识别**：没有跳转属性的项目会被视为当前页面，具有特殊样式
4. **颜色优先级**：单项的 `color` 属性优先级高于父组件的颜色设置
5. **插槽优先级**：使用默认插槽时会覆盖 `text` 属性
6. **外部链接限制**：在某些平台（如小程序）可能无法正常跳转外部链接

## 样式自定义

可以通过 CSS 变量或直接覆盖样式类来自定义外观：

```scss
// 自定义链接颜色
.zx-breadcrumb-item__text {
  color: #custom-color;
}

// 自定义悬停效果
.zx-breadcrumb-item__inner:hover {
  color: #custom-hover-color;
}

// 自定义分隔符样式
.zx-breadcrumb-item__separator {
  margin: 0 12px; // 自定义间距
}
```

## 完整示例

参考 `src/pages/components/breadcrumb/index.vue` 获取更多使用示例和最佳实践。
