# ZxAiThoughtChain 思维链组件

思维链组件用于可视化和追踪 AI Agent 对 Actions 和 Tools 的调用链，适用于展示复杂的思维推理过程。

## 特性

- 🎯 **可视化思维链**：清晰展示 AI 思维推理过程
- 🔄 **状态管理**：支持 pending、success、error 三种状态
- 📱 **全平台兼容**：支持 H5、微信小程序、其他小程序平台、App
- 🎨 **高度自定义**：支持自定义图标、样式、内容
- 📦 **可折叠内容**：支持展开/收起详细内容
- 🌍 **国际化支持**：支持 RTL 布局
- 📏 **多种尺寸**：提供 large、middle、small 三种尺寸

## 何时使用

- 调试和跟踪复杂 AI Agent System 中的调用链
- 展示 AI 思维推理过程
- 类似的链式场景中使用
- 需要可视化步骤流程的场景

## 基本用法

```vue
<template>
  <zx-ai-thought-chain :items="items" />
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    key: '1',
    title: '分析用户问题',
    description: '理解用户的具体需求',
    status: 'success'
  },
  {
    key: '2', 
    title: '搜索相关信息',
    description: '从知识库中检索相关内容',
    status: 'success'
  },
  {
    key: '3',
    title: '生成回答',
    description: '基于检索结果生成最终回答',
    status: 'pending'
  }
])
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| items | 思维节点集合 | `ThoughtChainItem[]` | `[]` | - |
| collapsible | 是否可折叠 | `boolean \| CollapsibleOptions` | `false` | - |
| size | 组件大小 | `'large' \| 'middle' \| 'small'` | `'middle'` | - |
| prefixCls | 自定义前缀 | `string` | `'zx-thought-chain'` | - |
| rootClassName | 自定义根类名 | `string` | `''` | - |
| customClass | 自定义类名 | `string` | `''` | - |
| customStyle | 自定义样式 | `object \| string` | `{}` | - |
| styles | 语义化结构样式 | `Record<SemanticType, CSSProperties>` | `{}` | - |
| classNames | 语义化结构类名 | `Record<SemanticType, string>` | `{}` | - |
| direction | 文本方向 | `'ltr' \| 'rtl'` | `'ltr'` | - |

### ThoughtChainItem

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| key | 思维节点唯一标识符 | `string` | - | - |
| icon | 思维节点图标 | `VNode \| string \| number` | `index + 1` | - |
| title | 思维节点标题 | `VNode \| string` | - | - |
| description | 思维节点描述 | `VNode \| string` | - | - |
| extra | 思维节点额外内容 | `VNode \| string` | - | - |
| content | 思维节点内容 | `VNode \| string` | - | - |
| footer | 思维节点脚注 | `VNode \| string` | - | - |
| status | 思维节点状态 | `'pending' \| 'success' \| 'error'` | - | - |

### CollapsibleOptions

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultExpandedKeys | 默认展开的节点 | `string[]` | `[]` | - |
| expandedKeys | 受控展开的节点 | `string[]` | - | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| itemClick | 点击节点时触发 | `{ item, index, key }` | - |
| itemExpand | 展开/收起节点时触发 | `{ item, index, key, expanded, expandedKeys }` | - |

### Methods

通过 ref 可以访问以下方法：

| 方法名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| expandItem | 展开指定节点 | `(key: string) => void` | - |
| collapseItem | 收起指定节点 | `(key: string) => void` | - |
| toggleItem | 切换指定节点展开状态 | `(key: string) => void` | - |

## 代码示例

### 基础用法

```vue
<template>
  <zx-ai-thought-chain :items="basicItems" />
</template>

<script setup>
const basicItems = [
  {
    title: '思维链节点标题',
    description: '节点描述信息'
  },
  {
    title: '思维链节点标题',
    description: '节点描述信息'
  }
]
</script>
```

### 不同尺寸

```vue
<template>
  <view>
    <zx-ai-thought-chain :items="items" size="large" />
    <zx-ai-thought-chain :items="items" size="middle" />
    <zx-ai-thought-chain :items="items" size="small" />
  </view>
</template>
```

### 节点状态

```vue
<template>
  <zx-ai-thought-chain :items="statusItems" />
</template>

<script setup>
const statusItems = [
  {
    title: '已完成的步骤',
    description: '这个步骤已经成功完成',
    status: 'success'
  },
  {
    title: '进行中的步骤',
    description: '这个步骤正在执行中',
    status: 'pending'
  },
  {
    title: '失败的步骤',
    description: '这个步骤执行失败',
    status: 'error'
  }
]
</script>
```

### 可折叠内容

```vue
<template>
  <zx-ai-thought-chain 
    :items="collapsibleItems" 
    :collapsible="true"
    @itemExpand="onItemExpand"
  />
</template>

<script setup>
const collapsibleItems = [
  {
    key: '1',
    title: '分析问题',
    description: '深入分析用户提出的问题',
    content: '这里是详细的分析内容，包含了具体的分析步骤和结果。',
    status: 'success'
  },
  {
    key: '2',
    title: '制定方案',
    description: '根据分析结果制定解决方案',
    content: '详细的解决方案内容...',
    status: 'pending'
  }
]

const onItemExpand = (data) => {
  console.log('节点展开状态变化:', data)
}
</script>
```

### 受控模式

```vue
<template>
  <zx-ai-thought-chain 
    :items="items" 
    :collapsible="collapsibleConfig"
  />
</template>

<script setup>
import { ref } from 'vue'

const expandedKeys = ref(['1'])

const collapsibleConfig = {
  expandedKeys: expandedKeys.value
}

const items = [
  {
    key: '1',
    title: '步骤一',
    content: '步骤一的详细内容'
  },
  {
    key: '2', 
    title: '步骤二',
    content: '步骤二的详细内容'
  }
]
</script>
```

### 自定义图标和内容

```vue
<template>
  <zx-ai-thought-chain :items="customItems" />
</template>

<script setup>
import { h } from 'vue'

const customItems = [
  {
    icon: '🤔',
    title: '思考阶段',
    description: '正在思考解决方案',
    extra: '2分钟前',
    content: '详细的思考过程...',
    footer: '耗时: 120ms'
  },
  {
    icon: '🔍',
    title: '搜索阶段', 
    description: '搜索相关信息',
    status: 'success'
  }
]
</script>
```

### 使用 ref 控制展开状态

```vue
<template>
  <view>
    <button @click="expandAll">展开全部</button>
    <button @click="collapseAll">收起全部</button>
    <zx-ai-thought-chain 
      ref="thoughtChainRef"
      :items="items" 
      :collapsible="true"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const thoughtChainRef = ref()

const items = [
  { key: '1', title: '步骤1', content: '内容1' },
  { key: '2', title: '步骤2', content: '内容2' }
]

const expandAll = () => {
  items.forEach(item => {
    thoughtChainRef.value?.expandItem(item.key)
  })
}

const collapseAll = () => {
  items.forEach(item => {
    thoughtChainRef.value?.collapseItem(item.key)
  })
}
</script>
```

## 平台兼容性

| 平台 | 支持状态 | 说明 |
| --- | --- | --- |
| H5 | ✅ | 完全支持 |
| 微信小程序 | ✅ | 完全支持 |
| 支付宝小程序 | ✅ | 完全支持 |
| 百度小程序 | ✅ | 完全支持 |
| 字节小程序 | ✅ | 完全支持 |
| QQ小程序 | ✅ | 完全支持 |
| 快手小程序 | ✅ | 完全支持 |
| 京东小程序 | ✅ | 完全支持 |
| App (Android) | ✅ | 完全支持 |
| App (iOS) | ✅ | 完全支持 |

## 最佳实践

### 1. 合理使用状态

```vue
<!-- 推荐：明确的状态表示 -->
<zx-ai-thought-chain :items="[
  { title: '步骤1', status: 'success' },
  { title: '步骤2', status: 'pending' },
  { title: '步骤3' } // 未开始，不设置状态
]" />
```

### 2. 适当的内容长度

```vue
<!-- 推荐：简洁的标题和描述 -->
<zx-ai-thought-chain :items="[
  {
    title: '分析用户需求', // 简洁明了
    description: '理解用户的具体问题和期望', // 适当长度
    content: '详细的分析过程...' // 详细内容放在 content 中
  }
]" />
```

### 3. 性能优化

```vue
<script setup>
// 推荐：使用 key 属性提升渲染性能
const items = ref([
  { key: 'step-1', title: '步骤1' },
  { key: 'step-2', title: '步骤2' }
])

// 推荐：避免频繁更新大量数据
const updateItem = (key, updates) => {
  const index = items.value.findIndex(item => item.key === key)
  if (index > -1) {
    items.value[index] = { ...items.value[index], ...updates }
  }
}
</script>
```

## 注意事项

1. **避免使用浏览器特有 API**：组件基于 uni-app 开发，请避免使用 `document`、`window` 等浏览器特有对象

2. **图标兼容性**：在小程序环境中，建议使用文本图标或 uni-app 内置图标

3. **样式隔离**：使用 `scoped` 样式避免样式污染

4. **内存管理**：大量数据时注意及时清理不需要的节点

5. **事件处理**：合理使用事件监听，避免内存泄漏

## 常见问题

### Q: 如何自定义节点图标？

A: 可以通过 `icon` 属性设置，支持文本、数字或组件：

```vue
<zx-ai-thought-chain :items="[
  { icon: '🤖', title: 'AI 分析' },
  { icon: 1, title: '步骤一' }
]" />
```

### Q: 如何实现动态更新节点状态？

A: 直接修改 items 数组中对应项的 status 属性：

```vue
<script setup>
const updateStatus = (key, status) => {
  const item = items.value.find(item => item.key === key)
  if (item) {
    item.status = status
  }
}
</script>
```

### Q: 在小程序中样式不生效怎么办？

A: 确保使用了正确的样式写法，避免使用小程序不支持的 CSS 属性：

```scss
// 推荐：使用小程序支持的属性
.custom-style {
  background-color: #f0f0f0;
  border-radius: 8px;
}

// 避免：小程序可能不支持的属性
.avoid-style {
  backdrop-filter: blur(10px); // 部分小程序不支持
}
```

### Q: 如何处理大量数据的性能问题？

A: 可以考虑虚拟滚动或分页加载：

```vue
<script setup>
// 分页加载示例
const pageSize = 20
const currentPage = ref(1)
const displayItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return allItems.value.slice(start, start + pageSize)
})
</script>
```

### Q: 如何实现嵌套的思维链？

A: 可以在 content 中嵌套另一个思维链组件：

```vue
<template>
  <zx-ai-thought-chain :items="parentItems" />
</template>

<script setup>
import { h } from 'vue'

const parentItems = [
  {
    title: '主要步骤',
    content: h(ZxAiThoughtChain, {
      items: [
        { title: '子步骤1' },
        { title: '子步骤2' }
      ]
    })
  }
]
</script>
```