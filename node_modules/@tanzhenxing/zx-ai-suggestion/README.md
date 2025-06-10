# ZxAiSuggestion AI 建议组件

一个基于 Vue 3 Composition API 的智能建议组件，专为 uni-app 框架设计，支持全平台兼容。

## 特性

- 🚀 **Vue 3 Composition API**: 使用最新的 Vue 3 setup 语法
- 📱 **全平台兼容**: 支持 H5、微信小程序、其他小程序平台、App
- 🎯 **智能建议**: 支持静态和动态建议项
- 🌳 **多层级支持**: 支持嵌套的建议项结构
- ⌨️ **键盘导航**: 完整的键盘操作支持
- 🎨 **高度可定制**: 丰富的自定义选项和样式
- 📦 **轻量级**: 纯 JavaScript 实现，无外部依赖
- 🌙 **暗色主题**: 内置暗色主题支持

## 安装使用

### 1. 复制组件文件

将 `zx-ai-suggestion.vue` 文件复制到你的项目中的 `components` 目录下。

### 2. 在页面中引入

```vue
<template>
  <zx-ai-suggestion
    :items="suggestions"
    @select="handleSelect"
  >
    <template #default="{ onTrigger, onKeyDown }">
      <input 
        v-model="inputValue"
        placeholder="输入 / 获取建议"
        @focus="onTrigger"
        @keydown="onKeyDown"
      />
    </template>
  </zx-ai-suggestion>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const suggestions = [
  { label: '写一份报告', value: 'report', icon: '📝' },
  { label: '画一幅图', value: 'draw', icon: '🎨' },
  { label: '查询知识', value: 'knowledge', icon: '🔍' }
]

const handleSelect = (value) => {
  inputValue.value = `[${value}]: `
  console.log('选中:', value)
}
</script>
```

## API 文档

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| customClass | 自定义类名 | `string` | `''` | - |
| customStyle | 自定义样式 | `string \| object` | `''` | - |
| block | 是否整行宽度 | `boolean` | `false` | - |
| open | 受控打开面板 | `boolean` | `undefined` | - |
| items | 建议项列表 | `SuggestionItem[] \| (info?: T) => SuggestionItem[]` | `[]` | - |
| placement | 面板位置 | `'top' \| 'bottom'` | `'bottom'` | - |
| maxItems | 最大显示项数 | `number` | `8` | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| select | 选中建议项时触发 | `(value: string) => void` | - |
| open-change | 面板打开状态变化时触发 | `(open: boolean) => void` | - |
| update:open | 更新 open 属性（用于 v-model:open） | `(open: boolean) => void` | - |

### Slots

| 插槽名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| default | 自定义触发器内容 | `{ onTrigger, onKeyDown }` | - |

#### Slot 参数说明

- **onTrigger**: `(info?: T \| false) => void`
  - 触发建议面板的方法
  - 传入 `false` 时关闭面板
  - 传入其他值时打开面板并传递给 items 函数

- **onKeyDown**: `(event: KeyboardEvent) => void`
  - 键盘事件处理方法
  - 支持方向键导航、回车选择、ESC 关闭等

### 类型定义

#### SuggestionItem

```typescript
interface SuggestionItem {
  label: string | VNode;           // 显示文本或组件
  value: string;                   // 选项值
  icon?: string | VNode;           // 图标
  extra?: string | VNode;          // 额外信息
  children?: SuggestionItem[];     // 子项（多层级）
}
```

### 方法

通过 `ref` 可以调用组件的方法：

```vue
<template>
  <zx-ai-suggestion ref="suggestionRef" :items="items">
    <!-- ... -->
  </zx-ai-suggestion>
</template>

<script setup>
import { ref } from 'vue'

const suggestionRef = ref()

// 打开面板
const openPanel = () => {
  suggestionRef.value.open()
}

// 关闭面板
const closePanel = () => {
  suggestionRef.value.close()
}
</script>
```

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| open | 打开建议面板 | `(info?: T) => void` | - |
| close | 关闭建议面板 | `() => void` | - |
| onTrigger | 触发器方法 | `(info?: T \| false) => void` | - |
| onKeyDown | 键盘事件处理 | `(event: KeyboardEvent) => void` | - |

## 使用示例

### 基础用法

```vue
<template>
  <zx-ai-suggestion
    :items="suggestions"
    @select="handleSelect"
  >
    <template #default="{ onTrigger, onKeyDown }">
      <input 
        v-model="value"
        placeholder="输入 / 获取建议"
        @input="handleInput"
        @keydown="onKeyDown"
      />
    </template>
  </zx-ai-suggestion>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const suggestions = [
  { label: '写一份报告', value: 'report', icon: '📝' },
  { label: '画一幅图', value: 'draw', icon: '🎨' },
  { label: '查询知识', value: 'knowledge', icon: '🔍' }
]

const handleInput = (event) => {
  if (event.target.value.endsWith('/')) {
    // 触发建议面板
  }
}

const handleSelect = (selectedValue) => {
  value.value = `[${selectedValue}]: `
}
</script>
```

### 整行宽度

```vue
<template>
  <zx-ai-suggestion
    :items="suggestions"
    :block="true"
    @select="handleSelect"
  >
    <template #default="{ onTrigger }">
      <div class="custom-trigger" @click="onTrigger">
        <span>{{ selectedText || '点击选择' }}</span>
        <span class="arrow">▼</span>
      </div>
    </template>
  </zx-ai-suggestion>
</template>
```

### 多层级建议

```vue
<template>
  <zx-ai-suggestion
    :items="nestedSuggestions"
    @select="handleSelect"
  >
    <template #default="{ onTrigger }">
      <button @click="onTrigger">
        {{ selectedText || '选择编程语言' }}
      </button>
    </template>
  </zx-ai-suggestion>
</template>

<script setup>
import { ref } from 'vue'

const selectedText = ref('')
const nestedSuggestions = [
  {
    label: 'JavaScript',
    value: 'javascript',
    icon: '🟨',
    children: [
      { label: 'Vue.js', value: 'vue', icon: '💚' },
      { label: 'React', value: 'react', icon: '⚛️' },
      { label: 'Angular', value: 'angular', icon: '🔴' }
    ]
  },
  {
    label: 'Python',
    value: 'python',
    icon: '🐍',
    children: [
      { label: 'Django', value: 'django', icon: '🎸' },
      { label: 'Flask', value: 'flask', icon: '🌶️' }
    ]
  }
]

const handleSelect = (value) => {
  // 根据 value 查找对应的 label
  selectedText.value = findLabelByValue(nestedSuggestions, value)
}
</script>
```

### 动态建议

```vue
<template>
  <zx-ai-suggestion
    :items="getDynamicSuggestions"
    @select="handleSelect"
  >
    <template #default="{ onTrigger, onKeyDown }">
      <input 
        v-model="searchValue"
        placeholder="输入关键词搜索"
        @input="handleInput"
        @focus="onTrigger"
        @keydown="onKeyDown"
      />
    </template>
  </zx-ai-suggestion>
</template>

<script setup>
import { ref } from 'vue'

const searchValue = ref('')

const getDynamicSuggestions = (info) => {
  const keyword = searchValue.value.toLowerCase()
  const allSuggestions = [
    { label: '搜索用户', value: 'search-users', icon: '👥' },
    { label: '搜索文档', value: 'search-docs', icon: '📚' },
    { label: '搜索图片', value: 'search-images', icon: '🖼️' }
  ]
  
  return allSuggestions.filter(item => 
    item.label.toLowerCase().includes(keyword)
  )
}

const handleInput = () => {
  // 输入时自动更新建议
}

const handleSelect = (value) => {
  console.log('选中:', value)
}
</script>
```

### 受控模式

```vue
<template>
  <div>
    <button @click="isOpen = true">打开面板</button>
    <button @click="isOpen = false">关闭面板</button>
    
    <zx-ai-suggestion
      :items="suggestions"
      :open="isOpen"
      @open-change="handleOpenChange"
      @select="handleSelect"
    >
      <template #default="{ onTrigger }">
        <div @click="onTrigger">
          受控模式示例 ({{ isOpen ? '已打开' : '已关闭' }})
        </div>
      </template>
    </zx-ai-suggestion>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const suggestions = [
  { label: '选项一', value: 'option1' },
  { label: '选项二', value: 'option2' }
]

const handleOpenChange = (open) => {
  isOpen.value = open
}

const handleSelect = (value) => {
  console.log('选中:', value)
  isOpen.value = false
}
</script>
```

## 键盘操作

| 按键 | 功能 |
| --- | --- |
| `↑` / `↓` | 上下导航选择项 |
| `←` / `→` | 左右导航（多层级时） |
| `Enter` | 选中当前项 |
| `Escape` | 关闭面板 |

## 样式定制

### CSS 变量

组件支持通过 CSS 变量进行样式定制：

```css
.zx-ai-suggestion {
  --suggestion-bg-color: #fff;
  --suggestion-border-color: #d9d9d9;
  --suggestion-border-radius: 8px;
  --suggestion-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  --suggestion-item-hover-bg: #f5f5f5;
  --suggestion-item-active-bg: #e6f4ff;
  --suggestion-item-padding: 8px 12px;
  --suggestion-item-font-size: 14px;
}
```

### 自定义类名

```vue
<template>
  <zx-ai-suggestion
    custom-class="my-suggestion"
    :items="suggestions"
  >
    <!-- ... -->
  </zx-ai-suggestion>
</template>

<style>
.my-suggestion .zx-ai-suggestion__panel {
  border: 2px solid #1890ff;
  border-radius: 12px;
}

.my-suggestion .zx-ai-suggestion__item:hover {
  background: linear-gradient(90deg, #1890ff, #36cfc9);
  color: white;
}
</style>
```

## 平台兼容性

| 平台 | 支持状态 | 说明 |
| --- | --- | --- |
| H5 | ✅ 完全支持 | 支持所有功能 |
| 微信小程序 | ✅ 完全支持 | 支持所有功能 |
| 支付宝小程序 | ✅ 完全支持 | 支持所有功能 |
| 百度小程序 | ✅ 完全支持 | 支持所有功能 |
| 字节跳动小程序 | ✅ 完全支持 | 支持所有功能 |
| QQ 小程序 | ✅ 完全支持 | 支持所有功能 |
| 快手小程序 | ✅ 完全支持 | 支持所有功能 |
| 京东小程序 | ✅ 完全支持 | 支持所有功能 |
| App (iOS) | ✅ 完全支持 | 支持所有功能 |
| App (Android) | ✅ 完全支持 | 支持所有功能 |

### 兼容性说明

1. **纯 JavaScript 实现**: 组件使用纯 JavaScript 实现，避免使用浏览器特有的 DOM API
2. **uni-app 标准组件**: 使用 uni-app 标准的 `<view>`、`<text>` 等组件
3. **CSS 兼容性**: 样式使用标准 CSS 属性，确保跨平台兼容
4. **事件处理**: 使用 uni-app 标准事件处理方式

## 最佳实践

### 1. 性能优化

```vue
<script setup>
import { ref, computed, shallowRef } from 'vue'

// 对于大量数据，使用 shallowRef
const largeSuggestions = shallowRef([])

// 使用计算属性进行数据过滤
const filteredSuggestions = computed(() => {
  return largeSuggestions.value.filter(item => 
    item.label.includes(searchKeyword.value)
  )
})
</script>
```

### 2. 异步数据加载

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

const getDynamicSuggestions = async (info) => {
  if (loading.value) return []
  
  loading.value = true
  try {
    const response = await fetch(`/api/suggestions?q=${info}`)
    const data = await response.json()
    return data.suggestions
  } catch (error) {
    console.error('获取建议失败:', error)
    return []
  } finally {
    loading.value = false
  }
}
</script>
```

### 3. 防抖处理

```vue
<script setup>
import { ref, computed } from 'vue'
import { debounce } from 'lodash-es'

const searchValue = ref('')
const debouncedSearch = ref('')

const updateSearch = debounce((value) => {
  debouncedSearch.value = value
}, 300)

const handleInput = (value) => {
  searchValue.value = value
  updateSearch(value)
}

const suggestions = computed(() => {
  return getSuggestionsByKeyword(debouncedSearch.value)
})
</script>
```

### 4. 无障碍访问

```vue
<template>
  <zx-ai-suggestion
    :items="suggestions"
    @select="handleSelect"
  >
    <template #default="{ onTrigger, onKeyDown }">
      <input 
        v-model="value"
        placeholder="输入内容获取建议"
        aria-label="智能建议输入框"
        aria-describedby="suggestion-help"
        @keydown="onKeyDown"
        @focus="onTrigger"
      />
      <div id="suggestion-help" class="sr-only">
        使用方向键导航，回车键选择，ESC 键关闭
      </div>
    </template>
  </zx-ai-suggestion>
</template>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
```

## 常见问题

### Q: 如何在小程序中使用自定义图标？

A: 在小程序中，建议使用 Unicode 字符或 emoji 作为图标，避免使用 SVG 或字体图标：

```javascript
const suggestions = [
  { label: '搜索', value: 'search', icon: '🔍' },
  { label: '设置', value: 'settings', icon: '⚙️' },
  { label: '帮助', value: 'help', icon: '❓' }
]
```

### Q: 如何处理大量建议项的性能问题？

A: 可以通过以下方式优化：

1. 使用 `maxItems` 属性限制显示数量
2. 实现虚拟滚动（适用于超大数据集）
3. 使用防抖处理用户输入
4. 异步加载数据

```vue
<zx-ai-suggestion
  :items="suggestions"
  :max-items="10"
>
  <!-- ... -->
</zx-ai-suggestion>
```

### Q: 如何自定义面板的位置？

A: 使用 `placement` 属性控制面板位置：

```vue
<zx-ai-suggestion
  :items="suggestions"
  placement="top"
>
  <!-- ... -->
</zx-ai-suggestion>
```

### Q: 如何在触发器外部关闭面板？

A: 可以通过 ref 调用组件方法：

```vue
<template>
  <div>
    <zx-ai-suggestion ref="suggestionRef" :items="suggestions">
      <!-- ... -->
    </zx-ai-suggestion>
    <button @click="closeSuggestion">关闭建议</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const suggestionRef = ref()

const closeSuggestion = () => {
  suggestionRef.value.close()
}
</script>
```

### Q: 如何处理建议项的点击事件冒泡？

A: 组件内部已经处理了事件冒泡，如果需要阻止特定事件，可以在事件处理函数中调用 `event.stopPropagation()`：

```vue
<script setup>
const handleSelect = (value, event) => {
  // 阻止事件冒泡
  event?.stopPropagation()
  
  // 处理选择逻辑
  console.log('选中:', value)
}
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础建议功能
- ✨ 支持多层级建议
- ✨ 支持键盘导航
- ✨ 支持自定义样式
- ✨ 支持全平台兼容

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件。

### 开发环境

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`

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

## 相关链接

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Ant Design X Vue](https://antd-design-x-vue.netlify.app/)