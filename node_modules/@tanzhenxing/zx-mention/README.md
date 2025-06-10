# ZxMention 提及组件

用于在输入中提及某人或某事，基于 Element Plus Mention 组件设计，适配 uni-app 平台。

## 功能特性

- 🎯 支持 input 和 textarea 两种输入类型
- 🔍 实时搜索过滤选项
- 🎨 多种尺寸和样式配置
- 📱 完美适配移动端和小程序
- 🚀 高性能虚拟滚动支持
- 🎪 丰富的自定义插槽
- 🌍 多前缀字符支持
- ⚡ 异步数据加载
- 🎨 自定义标签内容渲染

## 基础用法

```vue
<template>
  <zx-mention
    v-model="value"
    :options="options"
    placeholder="请输入 @ 提及某人"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'Alice', label: 'Alice' },
  { value: 'Bob', label: 'Bob' },
  { value: 'Charlie', label: 'Charlie' }
])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string | '' |
| type | 输入框类型 | 'input' \| 'textarea' | 'input' |
| options | 提及选项列表 | MentionOption[] | [] |
| prefix | 触发字段的前缀 | string \| string[] | '@' |
| split | 用于拆分提及的字符 | string | ' ' |
| filter-option | 自定义筛选器选项逻辑 | boolean \| Function | true |
| placement | 弹出位置 | 'top' \| 'bottom' | 'bottom' |
| offset | 下拉面板偏移量 | number | 0 |
| whole | 是否整体删除提及部分 | boolean | false |
| check-is-whole | 自定义检查整体删除逻辑 | Function | null |
| loading | 下拉面板加载状态 | boolean | false |
| size | 输入框尺寸 | 'small' \| 'default' \| 'large' | 'default' |
| disabled | 是否禁用 | boolean | false |
| placeholder | 占位符文本 | string | '请输入内容' |
| maxlength | 最大输入长度 | number | 300 |
| clearable | 是否可清空 | boolean | false |
| max-height | 下拉面板最大高度 | number | 400 |

### 样式相关 Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| border-size | 边框大小 | string | '1rpx' |
| border-color | 边框颜色 | string | '#ececec' |
| border-active-color | 聚焦时边框颜色 | string | '#2979ff' |
| border-radius | 边框圆角 | string | '10rpx' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| input | 输入值改变时触发 | (event) |
| focus | 获取焦点时触发 | (event) |
| blur | 失去焦点时触发 | (event) |
| search | 搜索时触发 | (pattern: string, prefix: string) |
| select | 选择选项时触发 | (option: MentionOption, prefix: string) |
| clear | 清空时触发 | () |
| confirm | 确认时触发（仅input类型） | (event) |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| label | 自定义选项内容 | { item: MentionOption, index: number } |
| loading | 自定义加载状态 | - |
| header | 下拉列表头部内容 | - |
| footer | 下拉列表底部内容 | - |

### Exposes

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 获取焦点 | () |
| blur | 失去焦点 | () |
| clear | 清空内容 | () |
| hideDropdown | 隐藏下拉面板 | () |
| showDropdown | 显示下拉面板 | () |

## 类型定义

```typescript
interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
  [key: string]: any
}
```

## 使用示例

### Textarea 类型

```vue
<zx-mention
  v-model="value"
  type="textarea"
  :options="options"
  placeholder="请输入内容"
/>
```

### 自定义标签

```vue
<zx-mention
  v-model="value"
  :options="options"
>
  <template #label="{ item }">
    <view style="display: flex; align-items: center;">
      <image :src="item.avatar" style="width: 40rpx; height: 40rpx; border-radius: 50%;" />
      <text style="margin-left: 12rpx;">{{ item.label }}</text>
    </view>
  </template>
</zx-mention>
```

### 异步加载

```vue
<template>
  <zx-mention
    v-model="value"
    :options="options"
    :loading="loading"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([])
const loading = ref(false)

function handleSearch(pattern, prefix) {
  loading.value = true
  // 模拟异步请求
  setTimeout(() => {
    options.value = [
      { value: pattern + 'Alice', label: pattern + 'Alice' },
      { value: pattern + 'Bob', label: pattern + 'Bob' }
    ]
    loading.value = false
  }, 1000)
}
</script>
```

### 多前缀支持

```vue
<zx-mention
  v-model="value"
  :prefix="['@', '#']"
  :options="options"
  placeholder="输入 @ 提及用户，# 提及话题"
  @search="handleSearch"
/>
```

## 注意事项

1. 组件基于 uni-app 开发，支持所有 uni-app 平台
2. 样式单位使用 rpx，自动适配不同屏幕尺寸
3. 下拉面板使用 position: absolute 定位，请确保父容器有正确的定位上下文
4. 异步加载时建议使用 loading 状态提升用户体验
