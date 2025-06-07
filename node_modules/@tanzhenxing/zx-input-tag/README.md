# ZxInputTag 标签输入框组件

基于 Element Plus InputTag 组件设计的 Vue 3 标签输入框组件，使用普通 JavaScript 开发，功能完整且易于使用。

## 功能特性

- ✅ **基础标签输入**：支持键盘输入添加标签
- ✅ **自定义触发键**：支持 Enter、Space、Tab 键触发
- ✅ **最大标签数限制**：可设置最大允许的标签数量
- ✅ **多种尺寸**：支持 large、default、small 三种尺寸
- ✅ **标签样式**：支持 5 种类型 × 3 种效果 = 15 种标签样式
- ✅ **拖拽排序**：支持拖拽标签进行重新排序
- ✅ **分隔符支持**：支持自定义分隔符自动创建标签
- ✅ **状态控制**：支持禁用、只读、可清空等状态
- ✅ **自定义插槽**：支持自定义标签内容、前缀、后缀
- ✅ **完整事件**：提供丰富的事件监听
- ✅ **表单集成**：支持 v-model 双向绑定
- ✅ **中文输入法友好**：正确处理中文输入法状态

## 基础用法

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    placeholder="请输入标签，按回车添加"
  />
</template>

<script>
import ZxInputTag from './components/zx-input-tag/zx-input-tag.vue'

export default {
  components: {
    ZxInputTag
  },
  data() {
    return {
      tags: ['Vue', 'JavaScript']
    }
  }
}
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `modelValue` | `Array` | `[]` | 绑定值，使用 v-model |
| `max` | `Number` | `undefined` | 最大标签数量 |
| `tagType` | `String` | `'info'` | 标签类型：`primary`、`success`、`info`、`warning`、`danger` |
| `tagEffect` | `String` | `'light'` | 标签效果：`light`、`dark`、`plain` |
| `trigger` | `String` | `'Enter'` | 触发键：`Enter`、`Space`、`Tab` |
| `draggable` | `Boolean` | `false` | 是否可拖拽排序 |
| `delimiter` | `String/RegExp` | `undefined` | 分隔符，支持字符串或正则表达式 |
| `size` | `String` | `'default'` | 尺寸：`large`、`default`、`small` |
| `saveOnBlur` | `Boolean` | `true` | 失去焦点时是否保存输入值 |
| `clearable` | `Boolean` | `false` | 是否显示清空按钮 |
| `disabled` | `Boolean` | `false` | 是否禁用 |
| `readonly` | `Boolean` | `false` | 是否只读 |
| `placeholder` | `String` | `''` | 占位符文本 |
| `maxlength` | `String/Number` | `undefined` | 最大输入长度 |
| `minlength` | `String/Number` | `undefined` | 最小输入长度 |
| `autocomplete` | `String` | `'off'` | 自动完成属性 |
| `autofocus` | `Boolean` | `false` | 自动获取焦点 |
| `id` | `String` | `undefined` | input 元素 id |
| `tabindex` | `String/Number` | `undefined` | tabindex 属性 |
| `ariaLabel` | `String` | `undefined` | aria-label 属性 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `tags: Array` | 标签数组更新时触发 |
| `change` | `tags: Array` | 标签数组变化时触发 |
| `input` | `value: String` | 输入框内容变化时触发 |
| `add-tag` | `tag: String` | 添加标签时触发 |
| `remove-tag` | `tag: String` | 移除标签时触发 |
| `focus` | `event: FocusEvent` | 获得焦点时触发 |
| `blur` | `event: FocusEvent` | 失去焦点时触发 |
| `clear` | - | 点击清空按钮时触发 |

### Slots

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `tag` | `{ value: String, index: Number }` | 自定义标签内容 |
| `prefix` | - | 输入框前缀内容 |
| `suffix` | - | 输入框后缀内容 |

### 方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `focus()` | - | 使输入框获得焦点 |
| `blur()` | - | 使输入框失去焦点 |

## 使用示例

### 1. 自定义触发键

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    trigger="Space"
    placeholder="按空格键添加标签"
  />
</template>
```

### 2. 限制标签数量

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    :max="5"
    placeholder="最多添加 5 个标签"
  />
</template>
```

### 3. 自定义标签样式

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    tag-type="primary"
    tag-effect="dark"
    placeholder="深色主题标签"
  />
</template>
```

### 4. 可拖拽排序

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    draggable
    placeholder="拖拽标签进行排序"
  />
</template>
```

### 5. 分隔符支持

```vue
<template>
  <zx-input-tag 
    v-model="tags" 
    delimiter=","
    placeholder="用逗号分隔多个标签"
  />
</template>
```

### 6. 自定义标签内容

```vue
<template>
  <zx-input-tag v-model="tags">
    <template #tag="{ value, index }">
      <span>🏷️ {{ value }} ({{ index + 1 }})</span>
    </template>
  </zx-input-tag>
</template>
```

### 7. 前缀和后缀

```vue
<template>
  <zx-input-tag v-model="tags" clearable>
    <template #prefix>
      <span>🔍</span>
    </template>
    <template #suffix>
      <span>✨</span>
    </template>
  </zx-input-tag>
</template>
```

### 8. 事件监听

```vue
<template>
  <zx-input-tag 
    v-model="tags"
    @add-tag="onAddTag"
    @remove-tag="onRemoveTag"
    @change="onChange"
  />
</template>

<script>
export default {
  data() {
    return {
      tags: []
    }
  },
  methods: {
    onAddTag(tag) {
      console.log('添加标签:', tag)
    },
    onRemoveTag(tag) {
      console.log('移除标签:', tag)
    },
    onChange(tags) {
      console.log('标签变化:', tags)
    }
  }
}
</script>
```

## 样式自定义

组件使用 BEM 命名规范，你可以通过以下 CSS 类来自定义样式：

```css
/* 主容器 */
.zx-input-tag { }

/* 不同尺寸 */
.zx-input-tag--large { }
.zx-input-tag--small { }

/* 不同状态 */
.zx-input-tag--disabled { }
.zx-input-tag--readonly { }
.zx-input-tag--focus { }

/* 标签样式 */
.zx-input-tag__tag { }
.zx-input-tag__tag--primary { }
.zx-input-tag__tag--light { }

/* 输入框 */
.zx-input-tag__input { }

/* 前缀后缀 */
.zx-input-tag__prefix { }
.zx-input-tag__suffix { }
```

## 注意事项

1. **中文输入法**：组件已正确处理中文输入法，在输入法激活状态下不会触发标签添加
2. **重复标签**：组件会自动过滤重复的标签
3. **空标签**：组件会自动忽略空字符串或只包含空格的标签
4. **拖拽功能**：只有在启用 `draggable` 属性且非禁用/只读状态下才能拖拽
5. **事件顺序**：`add-tag`/`remove-tag` 事件会在 `change` 事件之前触发

## 兼容性

- Vue 3.0+
- 现代浏览器（支持 HTML5 drag and drop API）

## 更新日志

### v1.0.0
- 初始版本发布
- 实现所有基础功能
- 完整的 API 支持
- 完善的事件系统
- 丰富的自定义选项
