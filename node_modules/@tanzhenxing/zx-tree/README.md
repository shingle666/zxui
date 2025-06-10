# zx-tree 组件

基于 uni-app 的通用树形控件，支持 H5、小程序、App。参考 Element Plus Tree 设计，支持基础树、可选中、懒加载、自定义节点内容等功能。

## 功能特性
- 支持多层级树形结构展示
- 支持节点点击事件
- 支持复选框选择（多选）
- 支持懒加载子节点
- 支持自定义节点内容
- 兼容 H5、小程序、App（不依赖浏览器特有 DOM）

## 基本用法
```vue
<template>
  <zx-tree :data="treeData" @node-click="onNodeClick" />
</template>

<script setup>
import { ref } from 'vue'
import zxTree from '@/components/zx-tree/zx-tree.vue'

const treeData = ref([
  { id: 1, label: '一级 1', children: [ { id: 11, label: '二级 1-1' } ] },
  { id: 2, label: '一级 2' }
])
function onNodeClick(node) {
  console.log('点击节点', node)
}
</script>
```

## 属性说明
| 属性名            | 说明                 | 类型     | 默认值         |
|-------------------|----------------------|----------|----------------|
| data              | 树形数据             | Array    | []             |
| props             | 字段映射配置         | Object   | { label, ... } |
| showCheckbox      | 是否显示复选框       | Boolean  | false          |
| lazy              | 是否懒加载           | Boolean  | false          |
| load              | 懒加载方法           | Function | null           |
| defaultCheckedKeys| 默认选中节点 key 数组| Array    | []             |
| isLeaf            | 判断叶子节点方法     | Function | null           |
| renderContent     | 自定义节点内容渲染   | Function | null           |

### props 字段默认值
```js
{
  label: 'label',
  children: 'children',
  isLeaf: 'isLeaf',
  disabled: 'disabled',
  key: 'id',
}
```

## 事件说明
| 事件名        | 说明                 | 回调参数                                      |
|---------------|----------------------|-----------------------------------------------|
| node-click    | 节点被点击时触发     | (node)                                       |
| check-change  | 复选框选中状态变化   | (node, checked, indeterminate)                |
| check         | 复选框点击后触发     | (node, checkedKeys)                           |

## 懒加载用法
```vue
<zx-tree :data="lazyTreeData" :lazy="true" :load="loadNode" />
<script setup>
const lazyTreeData = ref([
  { id: 1, label: '根节点1', isLeaf: false },
])
function loadNode(node, resolve) {
  setTimeout(() => {
    resolve([
      { id: 11, label: '子节点1-1', isLeaf: true },
    ])
  }, 800)
}
</script>
```

## 自定义节点内容
```vue
<zx-tree :data="treeData" :renderContent="renderNodeContent" />
<script setup>
function renderNodeContent({ node, level }) {
  return `<text style='color: #409EFF;'>${node.label}</text>`
}
</script>
```

## 兼容性说明
- 组件未使用任何浏览器特有 DOM API，适配 uni-app 全端。

## 示例效果
请参考 `src/pages/components/tree/index.vue` 示例页面。

## 参考文档
- [Element Plus Tree 官方文档](https://element-plus.org/zh-CN/component/tree.html)
