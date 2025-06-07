# ZxAiPrompts AI 提示集组件

用于显示一组与当前上下文相关的预定义的问题或建议，为用户提供快速的交互入口。

## 特性

- 🎯 **多样化布局**：支持水平、垂直、换行等多种布局方式
- 🎨 **高度可定制**：支持自定义样式、类名和插槽
- 🔗 **嵌套支持**：支持多级嵌套的提示项结构
- 📱 **全平台兼容**：支持 H5、微信小程序、其他小程序平台、App
- ♿ **无障碍友好**：支持禁用状态和键盘导航
- 🚀 **性能优化**：基于 Vue 3 Composition API，性能更优

## 安装使用

### 基础用法

```vue
<template>
  <zx-ai-prompts 
    title="💡 你可能想问："
    :items="items"
    @item-click="handleItemClick"
  />
</template>

<script setup>
const items = [
  {
    key: '1',
    icon: '💡',
    label: '激发创意',
    description: '有什么新项目的灵感吗？'
  },
  {
    key: '2',
    icon: 'ℹ️',
    label: '了解背景', 
    description: '帮我了解这个话题的背景。'
  }
]

const handleItemClick = (event) => {
  console.log('点击了:', event.data)
}
</script>
```

### 垂直布局

```vue
<template>
  <zx-ai-prompts 
    title="🤔 你可能还想问："
    :items="items"
    :vertical="true"
    @item-click="handleItemClick"
  />
</template>
```

### 可换行布局

```vue
<template>
  <zx-ai-prompts 
    title="🔥 热门话题："
    :items="items"
    :wrap="true"
    @item-click="handleItemClick"
  />
</template>
```

### 嵌套组合

```vue
<template>
  <zx-ai-prompts 
    title="📚 分类推荐："
    :items="nestedItems"
    @item-click="handleItemClick"
  />
</template>

<script setup>
const nestedItems = [
  {
    key: '1',
    icon: '🔥',
    label: '热门话题',
    description: '你感兴趣什么？',
    children: [
      {
        key: '1-1',
        description: 'X 平台有什么新功能？'
      },
      {
        key: '1-2',
        description: '什么是 AGI？'
      }
    ]
  }
]
</script>
```

### 禁用状态

```vue
<template>
  <zx-ai-prompts 
    title="☕️ 休息时间！"
    :items="items"
    @item-click="handleItemClick"
  />
</template>

<script setup>
const items = [
  {
    key: '1',
    icon: '✅',
    label: '任务完成秘诀',
    description: '完成任务有什么技巧？',
    disabled: true // 禁用状态
  }
]
</script>
```

### 自定义样式

```vue
<template>
  <zx-ai-prompts 
    title="🎨 自定义风格："
    :items="items"
    :styles="customStyles"
    :class-names="customClassNames"
    @item-click="handleItemClick"
  />
</template>

<script setup>
const customStyles = {
  root: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '16px',
    borderRadius: '12px'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold'
  },
  item: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)'
  }
}

const customClassNames = {
  root: 'custom-prompts',
  item: 'custom-item'
}
</script>
```

### 使用插槽

```vue
<template>
  <zx-ai-prompts 
    :items="items"
    @item-click="handleItemClick"
  >
    <template #title>
      <view class="custom-title">
        <text class="title-icon">🚀</text>
        <text class="title-text">自定义标题插槽</text>
      </view>
    </template>
  </zx-ai-prompts>
</template>
```

## API 文档

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| items | 包含多个提示项的列表 | `PromptItem[]` | `[]` | - |
| title | 显示在提示列表顶部的标题 | `string` | `''` | - |
| vertical | 设置为 `true` 时，提示列表将垂直排列 | `boolean` | `false` | - |
| wrap | 设置为 `true` 时，提示列表将自动换行 | `boolean` | `false` | - |
| prefixCls | 样式类名的前缀 | `string` | `'zx-ai-prompts'` | - |
| rootClassName | 根节点的样式类名 | `string` | `''` | - |
| styles | 自定义样式，用于各个提示项的不同部分 | `Record<SemanticType, CSSProperties>` | `{}` | - |
| classNames | 自定义样式类名，用于各个提示项的不同部分 | `Record<SemanticType, string>` | `{}` | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| itemClick | 提示项被点击时的回调函数 | `(event: { data: PromptItem, parent?: PromptItem }) => void` | - |

### Slots

| 插槽名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| title | 显示在提示列表顶部的标题 | - | - |

### 类型定义

#### PromptItem

```typescript
interface PromptItem {
  // 唯一标识用于区分每个提示项
  key: string
  
  // 提示图标显示在提示项的左侧
  icon?: string | VNode
  
  // 提示标签显示提示的主要内容
  label?: string | VNode
  
  // 提示描述提供额外的信息
  description?: string | VNode
  
  // 设置为 true 时禁用点击事件
  disabled?: boolean
  
  // 子级提示项（用于嵌套结构）
  children?: PromptItem[]
}
```

#### SemanticType

```typescript
type SemanticType = 
  | 'root'        // 根容器
  | 'title'       // 标题
  | 'list'        // 列表容器
  | 'item'        // 提示项
  | 'itemContent' // 提示项内容
  | 'subList'     // 子级列表
  | 'subItem'     // 子级提示项
```

## 平台兼容性

| 平台 | 支持情况 | 说明 |
| --- | --- | --- |
| H5 | ✅ | 完全支持 |
| 微信小程序 | ✅ | 完全支持 |
| 支付宝小程序 | ✅ | 完全支持 |
| 百度小程序 | ✅ | 完全支持 |
| 字节跳动小程序 | ✅ | 完全支持 |
| QQ 小程序 | ✅ | 完全支持 |
| 快手小程序 | ✅ | 完全支持 |
| 京东小程序 | ✅ | 完全支持 |
| App (Android) | ✅ | 完全支持 |
| App (iOS) | ✅ | 完全支持 |

## 最佳实践

### 1. 提示项设计原则

- **简洁明了**：每个提示项的描述应该简洁明了，让用户一眼就能理解
- **相关性强**：提示项应该与当前上下文高度相关
- **数量适中**：建议单屏显示的提示项不超过 6 个
- **分类清晰**：使用嵌套结构时，分类应该清晰合理

### 2. 图标使用建议

```vue
<!-- 推荐：使用 emoji 图标，兼容性好 -->
<zx-ai-prompts :items="[
  { key: '1', icon: '💡', label: '创意灵感' },
  { key: '2', icon: '🚀', label: '效率提升' }
]" />

<!-- 也可以：使用 uni-app 内置图标 -->
<zx-ai-prompts :items="[
  { key: '1', icon: 'star', label: '收藏' },
  { key: '2', icon: 'heart', label: '喜欢' }
]" />
```

### 3. 响应式设计

```vue
<template>
  <!-- 移动端使用垂直布局 -->
  <zx-ai-prompts 
    :items="items"
    :vertical="isMobile"
    :wrap="!isMobile"
  />
</template>

<script setup>
import { computed } from 'vue'

const isMobile = computed(() => {
  // #ifdef H5
  return window.innerWidth < 768
  // #endif
  // #ifndef H5
  return true
  // #endif
})
</script>
```

### 4. 性能优化

```vue
<script setup>
// 使用 ref 而不是 reactive 来存储大量数据
const items = ref([
  // 大量提示项数据
])

// 避免在模板中使用复杂计算
const processedItems = computed(() => {
  return items.value.map(item => ({
    ...item,
    // 预处理数据
  }))
})
</script>
```

## 注意事项

### 1. 样式覆盖

由于组件使用了 `scoped` 样式，如需覆盖内部样式，请使用 `:deep()` 选择器：

```vue
<style scoped>
:deep(.zx-ai-prompts-item) {
  border-radius: 16px;
}
</style>
```

### 2. 事件处理

```vue
<script setup>
const handleItemClick = (event) => {
  const { data, parent } = event
  
  // 检查是否禁用
  if (data.disabled) {
    console.log('该项已禁用')
    return
  }
  
  // 处理点击逻辑
  console.log('点击了:', data.label || data.description)
  
  // 如果是嵌套项，可以获取父级信息
  if (parent) {
    console.log('父级:', parent.label)
  }
}
</script>
```

### 3. 数据结构

确保每个提示项都有唯一的 `key` 值：

```javascript
// ✅ 正确
const items = [
  { key: '1', label: '项目1' },
  { key: '2', label: '项目2' }
]

// ❌ 错误 - 缺少 key
const items = [
  { label: '项目1' },
  { label: '项目2' }
]
```

## 常见问题

### Q: 如何实现动态加载提示项？

A: 可以通过响应式数据来实现：

```vue
<script setup>
const items = ref([])

// 动态加载数据
const loadItems = async () => {
  const response = await api.getPrompts()
  items.value = response.data
}

onMounted(() => {
  loadItems()
})
</script>
```

### Q: 如何实现点击后的状态变化？

A: 可以在数据中添加状态字段：

```vue
<script setup>
const items = ref([
  { key: '1', label: '项目1', selected: false }
])

const handleItemClick = (event) => {
  const item = items.value.find(i => i.key === event.data.key)
  if (item) {
    item.selected = !item.selected
  }
}
</script>
```

### Q: 如何自定义提示项的渲染？

A: 目前组件支持通过 `icon`、`label`、`description` 属性传入 VNode 来实现自定义渲染：

```vue
<script setup>
import { h } from 'vue'

const items = [
  {
    key: '1',
    icon: h('view', { class: 'custom-icon' }, '🎨'),
    label: h('text', { class: 'custom-label' }, '自定义标签'),
    description: h('text', { class: 'custom-desc' }, '自定义描述')
  }
]
</script>
```

### Q: 组件在小程序中样式异常怎么办？

A: 请检查以下几点：

1. 确保没有使用小程序不支持的 CSS 属性
2. 避免使用 `vh`、`vw` 等视口单位
3. 使用 `rpx` 单位来适配不同屏幕
4. 检查是否有样式冲突

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础提示项显示
- ✨ 支持垂直和换行布局
- ✨ 支持嵌套结构
- ✨ 支持自定义样式和类名
- ✨ 支持插槽自定义
- ✨ 全平台兼容

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件。

### 开发环境

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 提交规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 许可证

MIT License