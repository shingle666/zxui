# ZxAiConversations 对话管理组件

用于承载用户侧发送的历史对话列表，基于 uni-app 框架开发，支持全平台兼容。

## 特性

- 🚀 基于 Vue 3 Composition API 开发
- 📱 全平台兼容：H5、微信小程序、其他小程序平台、App
- 🎨 丰富的自定义能力和插槽支持
- 📊 支持分组展示和排序
- ⚡ 高性能，支持大量数据渲染
- 🛠 完善的 TypeScript 类型支持
- 🎯 参考 Ant Design X Vue 设计理念

## 何时使用

- 需要对多个 AI 会话进行管理
- 查看历史会话列表
- 需要对会话进行分组展示
- 需要对会话进行操作（编辑、删除等）

## 基本用法

```vue
<template>
  <zx-ai-conversations 
    :items="conversations" 
    :active-key="activeKey"
    @active-change="onActiveChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import ZxAiConversations from '@/components/zx-ai-conversations/zx-ai-conversations.vue'

const activeKey = ref('conv1')

const conversations = ref([
  {
    key: 'conv1',
    label: '与 ChatGPT 的对话',
    icon: '🤖',
    timestamp: Date.now() - 1000 * 60 * 5
  },
  {
    key: 'conv2',
    label: '代码优化讨论',
    icon: '💻',
    timestamp: Date.now() - 1000 * 60 * 60 * 2
  }
])

const onActiveChange = (key) => {
  activeKey.value = key
  console.log('选中对话:', key)
}
</script>
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| items | 会话列表数据源 | `Conversation[]` | `[]` | - |
| activeKey | 当前选中的值 | `string` | `''` | - |
| defaultActiveKey | 默认选中值 | `string` | `''` | - |
| menu | 会话操作菜单 | `MenuConfig \| Function` | `null` | - |
| groupable | 是否支持分组 | `boolean \| GroupableConfig` | `false` | - |
| customStyle | 自定义样式 | `object` | `{}` | - |
| customClass | 自定义类名 | `string` | `''` | - |

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
| --- | --- | --- | --- |
| update:activeKey | 选中值更新事件（支持 v-model） | `(key: string) => void` | - |
| activeChange | 选中变更回调 | `(key: string) => void` | - |
| itemClick | 对话项点击事件 | `(item: Conversation) => void` | - |
| menuClick | 菜单点击事件 | `(item: Conversation) => void` | - |

### Slots

| 插槽名 | 说明 | 参数 | 版本 |
| --- | --- | --- | --- |
| groupTitle | 自定义分组标题 | `{ group: string, title: string }` | - |
| icon | 自定义图标 | `{ item: Conversation }` | - |
| label | 自定义标签内容 | `{ item: Conversation }` | - |
| menu | 自定义菜单图标 | `{ item: Conversation }` | - |

## 数据结构

### Conversation

```typescript
interface Conversation {
  key: string                    // 唯一标识
  label?: string                 // 会话名称
  icon?: string                  // 会话图标
  timestamp?: number             // 会话时间戳
  group?: string                 // 会话分组类型
  disabled?: boolean             // 是否禁用
  [key: string]: any             // 其他自定义属性
}
```

### GroupableConfig

```typescript
interface GroupableConfig {
  sort?: (a: string, b: string) => number    // 分组排序函数
  title?: (group: string) => string          // 自定义分组标题
}
```

### MenuConfig

```typescript
interface MenuConfig {
  items: Array<{
    key: string
    label: string
    [key: string]: any
  }>
}
```

## 使用示例

### 带菜单操作

```vue
<template>
  <zx-ai-conversations 
    :items="conversations" 
    :menu="menuConfig"
    @menu-click="onMenuClick"
  >
    <template #menu="{ item }">
      <text class="custom-menu-icon">⚙️</text>
    </template>
  </zx-ai-conversations>
</template>

<script setup>
const menuConfig = {
  items: [
    { key: 'edit', label: '编辑' },
    { key: 'delete', label: '删除' },
    { key: 'share', label: '分享' }
  ]
}

const onMenuClick = (item) => {
  uni.showActionSheet({
    itemList: ['编辑', '删除', '分享'],
    success: (res) => {
      console.log('执行操作:', res.tapIndex, item)
    }
  })
}
</script>
```

### 分组展示

```vue
<template>
  <zx-ai-conversations 
    :items="groupedConversations" 
    :groupable="true"
  >
    <template #groupTitle="{ group, title }">
      <view class="custom-group-title">
        <text>📁 {{ title }}</text>
      </view>
    </template>
  </zx-ai-conversations>
</template>

<script setup>
const groupedConversations = ref([
  {
    key: 'work1',
    label: '工作讨论',
    group: '工作',
    icon: '💼'
  },
  {
    key: 'study1',
    label: '学习笔记',
    group: '学习',
    icon: '📚'
  }
])
</script>
```

### 分组排序

```vue
<template>
  <zx-ai-conversations 
    :items="conversations" 
    :groupable="groupableConfig"
  />
</template>

<script setup>
const groupableConfig = {
  sort: (a, b) => a.localeCompare(b), // 按字母排序
  title: (group) => `分组: ${group}`
}
</script>
```

### 自定义样式

```vue
<template>
  <zx-ai-conversations 
    :items="conversations" 
    :custom-style="customStyle"
    custom-class="my-conversations"
  >
    <template #icon="{ item }">
      <view class="custom-icon">
        <text>{{ item.icon }}</text>
      </view>
    </template>
    
    <template #label="{ item }">
      <view class="custom-label">
        <text>{{ item.label }}</text>
        <text v-if="item.badge" class="badge">{{ item.badge }}</text>
      </view>
    </template>
  </zx-ai-conversations>
</template>

<script setup>
const customStyle = {
  borderRadius: '16rpx',
  boxShadow: '0 4rpx 12rpx rgba(0, 0, 0, 0.1)'
}
</script>

<style>
.custom-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}
</style>
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

### 平台差异说明

1. **样式兼容性**：组件使用 rpx 单位，在不同平台上会自动适配
2. **事件处理**：使用 uni-app 标准事件，确保跨平台兼容
3. **插槽支持**：所有平台都支持具名插槽和作用域插槽
4. **动画效果**：使用 CSS transition，在所有平台上都有良好表现

## 最佳实践

### 1. 数据管理

```javascript
// 推荐使用 Pinia 或 Vuex 管理对话数据
import { defineStore } from 'pinia'

export const useConversationsStore = defineStore('conversations', {
  state: () => ({
    conversations: [],
    activeKey: ''
  }),
  
  actions: {
    addConversation(conversation) {
      this.conversations.unshift(conversation)
    },
    
    removeConversation(key) {
      const index = this.conversations.findIndex(item => item.key === key)
      if (index > -1) {
        this.conversations.splice(index, 1)
      }
    },
    
    setActiveKey(key) {
      this.activeKey = key
    }
  }
})
```

### 2. 性能优化

```vue
<template>
  <!-- 使用 v-show 而不是 v-if 来切换显示状态 -->
  <view v-show="visible">
    <zx-ai-conversations 
      :items="conversations" 
      :active-key="activeKey"
      @active-change="onActiveChange"
    />
  </view>
</template>

<script setup>
// 使用 computed 优化数据处理
const filteredConversations = computed(() => {
  return conversations.value.filter(item => 
    item.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// 使用防抖优化搜索
const debouncedSearch = debounce((text) => {
  searchText.value = text
}, 300)
</script>
```

### 3. 错误处理

```javascript
// 添加错误边界处理
const onError = (error) => {
  console.error('对话组件错误:', error)
  uni.showToast({
    title: '操作失败，请重试',
    icon: 'none'
  })
}

// 数据验证
const validateConversation = (item) => {
  if (!item.key) {
    throw new Error('对话项必须包含 key 属性')
  }
  if (!item.label) {
    throw new Error('对话项必须包含 label 属性')
  }
}
```

### 4. 无障碍支持

```vue
<template>
  <zx-ai-conversations 
    :items="conversations"
    role="list"
    aria-label="对话列表"
  >
    <template #label="{ item }">
      <text :aria-label="`对话: ${item.label}, 时间: ${formatTime(item.timestamp)}`">
        {{ item.label }}
      </text>
    </template>
  </zx-ai-conversations>
</template>
```

## 常见问题

### Q: 如何实现对话的拖拽排序？

A: 可以结合 `zx-drag` 组件实现拖拽排序功能：

```vue
<template>
  <zx-drag 
    :list="conversations" 
    @change="onDragChange"
  >
    <template #item="{ item }">
      <zx-ai-conversations 
        :items="[item]" 
        :active-key="activeKey"
      />
    </template>
  </zx-drag>
</template>
```

### Q: 如何实现虚拟滚动以支持大量数据？

A: 对于大量数据场景，建议使用分页加载或虚拟滚动：

```vue
<template>
  <scroll-view 
    scroll-y
    @scrolltolower="loadMore"
    style="height: 600rpx;"
  >
    <zx-ai-conversations 
      :items="displayedConversations" 
      :active-key="activeKey"
    />
  </scroll-view>
</template>

<script setup>
const pageSize = 20
const currentPage = ref(1)

const displayedConversations = computed(() => {
  return conversations.value.slice(0, currentPage.value * pageSize)
})

const loadMore = () => {
  if (displayedConversations.value.length < conversations.value.length) {
    currentPage.value++
  }
}
</script>
```

### Q: 如何自定义时间格式？

A: 组件内部提供了基础的时间格式化，你可以通过插槽自定义：

```vue
<template>
  <zx-ai-conversations :items="conversations">
    <template #label="{ item }">
      <view class="custom-item">
        <text class="title">{{ item.label }}</text>
        <text class="time">{{ formatCustomTime(item.timestamp) }}</text>
      </view>
    </template>
  </zx-ai-conversations>
</template>

<script setup>
const formatCustomTime = (timestamp) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm')
}
</script>
```

### Q: 如何实现搜索功能？

A: 可以通过过滤 items 数据实现搜索：

```vue
<template>
  <view>
    <input 
      v-model="searchText" 
      placeholder="搜索对话"
      @input="onSearch"
    />
    <zx-ai-conversations 
      :items="filteredConversations" 
      :active-key="activeKey"
    />
  </view>
</template>

<script setup>
const searchText = ref('')

const filteredConversations = computed(() => {
  if (!searchText.value) return conversations.value
  
  return conversations.value.filter(item => 
    item.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
})
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础对话列表展示
- ✨ 支持分组功能
- ✨ 支持菜单操作
- ✨ 支持自定义样式和插槽
- ✨ 全平台兼容支持

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