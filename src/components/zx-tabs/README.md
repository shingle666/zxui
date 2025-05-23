# zx-tabs 标签页组件

基于 Element Plus Tabs 组件设计的 uni-app 标签页组件，支持多种风格和丰富的功能。

## 特性

- 🎨 多种风格：默认、卡片、边框卡片
- 📍 四个方向：上、下、左、右
- ➕ 动态增减：支持添加和删除标签页
- 🔄 双向绑定：支持 v-model
- 🎯 延迟渲染：提升性能
- 🎪 自定义插槽：灵活的内容定制
- 📱 响应式设计：适配不同屏幕尺寸
- 🎮 事件丰富：完整的事件体系

## 基础用法

### 静态标签页

```vue
<template>
  <zx-tabs v-model="activeTab">
    <zx-tab-pane label="用户管理" name="user">
      用户管理内容
    </zx-tab-pane>
    <zx-tab-pane label="角色管理" name="role">
      角色管理内容
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('user')
</script>
```

### 数据驱动

```vue
<template>
  <zx-tabs v-model="activeTab" :tabs="tabsData">
    <!-- 内容区域 -->
    <view>当前选中：{{ activeTab }}</view>
  </zx-tabs>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('tab1')
const tabsData = reactive([
  { name: 'tab1', label: '标签一' },
  { name: 'tab2', label: '标签二', disabled: true },
  { name: 'tab3', label: '标签三' }
])
</script>
```

## 风格类型

### 卡片风格

```vue
<zx-tabs v-model="activeTab" type="card">
  <!-- 标签页内容 -->
</zx-tabs>
```

### 边框卡片风格

```vue
<zx-tabs v-model="activeTab" type="border-card">
  <!-- 标签页内容 -->
</zx-tabs>
```

## 标签位置

```vue
<zx-tabs v-model="activeTab" tab-position="left">
  <!-- 标签页内容 -->
</zx-tabs>
```

支持的位置：`top`、`right`、`bottom`、`left`

## 动态增减标签页

```vue
<template>
  <zx-tabs 
    v-model="activeTab" 
    type="card" 
    editable
    @tab-remove="handleRemove"
    @tab-add="handleAdd"
  >
    <zx-tab-pane 
      v-for="tab in tabs" 
      :key="tab.name"
      :label="tab.title" 
      :name="tab.name"
      :closable="true"
    >
      {{ tab.content }}
    </zx-tab-pane>
  </zx-tabs>
</template>

<script setup>
const handleRemove = (targetName) => {
  // 删除标签页逻辑
}

const handleAdd = () => {
  // 添加标签页逻辑
}
</script>
```

## 自定义标签内容

```vue
<template>
  <zx-tabs v-model="activeTab">
    <template #tab-calendar>
      <view style="display: flex; align-items: center; gap: 8rpx;">
        <text>📅</text>
        <text>日历</text>
      </view>
    </template>
    
    <zx-tab-pane label="日历" name="calendar">
      日历内容
    </zx-tab-pane>
  </zx-tabs>
</template>
```

## 延迟渲染

```vue
<zx-tab-pane label="延迟渲染" name="lazy" lazy>
  <!-- 只有激活时才会渲染 -->
</zx-tab-pane>
```

## API

### zx-tabs Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model-value / v-model | 绑定值，选中选项卡的 name | `string \| number` | — |
| type | 风格类型 | `'' \| 'card' \| 'border-card'` | `''` |
| tab-position | 标签位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| tabs | 标签数据（数据驱动模式） | `Array` | `[]` |
| label-key | 标签文本的键名 | `string` | `'label'` |
| name-key | 标签唯一标识的键名 | `string` | `'name'` |
| closable | 标签是否可关闭 | `boolean` | `false` |
| addable | 标签是否可增加 | `boolean` | `false` |
| editable | 标签是否同时可增加和关闭 | `boolean` | `false` |
| stretch | 标签的宽度是否自撑开 | `boolean` | `false` |
| before-leave | 切换标签之前的钩子函数 | `Function` | `() => true` |
| size | 组件尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| custom-style | 自定义样式 | `Object` | `{}` |
| active-color | 激活状态颜色 | `string` | `'#409eff'` |
| inactive-color | 普通状态颜色 | `string` | `'#303133'` |
| disabled-color | 禁用状态颜色 | `string` | `'#c0c4cc'` |

### zx-tabs Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| tab-click | tab 被选中时触发 | `(data: { tab, index, name })` |
| tab-change | activeName 改变时触发 | `(newName, oldName)` |
| tab-remove | 点击 tab 移除按钮后触发 | `(targetName, tab, index)` |
| tab-add | 点击 tab 新增按钮后触发 | `()` |
| edit | 点击 tab 的新增或移除按钮后触发 | `(targetName, action)` |

### zx-tabs Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，放置 zx-tab-pane |
| left | 标签栏左侧内容 |
| right | 标签栏右侧内容 |
| add-icon | 自定义添加按钮图标 |
| tab-[name] | 自定义标签内容，[name] 为标签的 name 值 |

### zx-tab-pane Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 选项卡标题 | `string` | `''` |
| name | 标签唯一标识符 | `string \| number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 标签是否可关闭 | `boolean` | `undefined` |
| lazy | 标签是否延迟渲染 | `boolean` | `false` |
| custom-style | 自定义样式 | `Object` | `{}` |

### zx-tab-pane Slots

| 插槽名 | 说明 |
|--------|------|
| default | 标签页内容 |

## 样式变量

```scss
// 主要颜色
--zx-tabs-active-color: #409eff;
--zx-tabs-inactive-color: #303133;
--zx-tabs-disabled-color: #c0c4cc;

// 边框颜色
--zx-tabs-border-color: #e4e7ed;

// 背景颜色
--zx-tabs-bg-color: #fff;
--zx-tabs-card-bg-color: #f5f7fa;

// 尺寸
--zx-tabs-height: 80rpx;
--zx-tabs-padding: 20rpx;
--zx-tabs-font-size: 28rpx;
```

## 注意事项

1. 在数据驱动模式下，`tabs` 属性优先级高于 `zx-tab-pane` 组件
2. 使用 `lazy` 属性时，标签页内容只有在首次激活后才会渲染
3. `before-leave` 钩子返回 `false` 或被拒绝的 Promise 时，会阻止标签页切换
4. 在小程序环境下，部分 CSS3 特性可能不被支持
5. 使用自定义插槽时，插槽名称格式为 `tab-[name]`

## 更新日志

### v2.0.0
- 🎉 全面重构，参考 Element Plus Tabs 组件
- ✨ 新增多种风格支持
- ✨ 新增标签位置设置
- ✨ 新增动态增减功能
- ✨ 新增延迟渲染功能
- ✨ 新增自定义插槽支持
- ✨ 新增完整的事件体系
- 🐛 修复滚动定位问题
- 💄 优化样式和动画效果
