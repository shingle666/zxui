# zx-tree-node 树形节点组件

## 组件介绍

`zx-tree-node` 是一个用于构建树形结构的节点组件，支持展开/收起、复选框选择、懒加载等功能。该组件通常与树形组件配合使用，用于渲染树形数据的单个节点。

## 功能特性

- ✅ 支持节点展开/收起
- ✅ 支持复选框选择
- ✅ 支持懒加载
- ✅ 支持自定义节点层级
- ✅ 支持叶子节点判断
- ✅ 支持节点点击事件
- ✅ 支持加载状态显示

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| node | Object | - | 当前节点数据对象 |
| props | Object | - | 树形组件的配置对象，包含 key、label、children、isLeaf 等字段映射 |
| level | Number | - | 当前节点的层级，从 0 开始 |
| showCheckbox | Boolean | false | 是否显示复选框 |
| checkedKeys | Array | [] | 已选中的节点 key 数组 |
| lazy | Boolean | false | 是否启用懒加载 |
| load | Function | - | 懒加载函数，接收 (node, callback) 参数 |
| isLeaf | Function | - | 判断节点是否为叶子节点的函数 |

### props 配置对象说明

```javascript
{
  key: 'id',        // 节点唯一标识字段名
  label: 'name',    // 节点显示文本字段名
  children: 'children', // 子节点数组字段名
  isLeaf: 'isLeaf'  // 是否为叶子节点字段名
}
```

## 事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| node-click | node | 节点被点击时触发 |
| check-change | node, checked, indeterminate | 节点选中状态改变时触发 |
| check | node, checkedKeys | 节点被选中时触发 |
| toggle-check | nodeKey | 切换节点选中状态时触发 |

## 使用示例

### 基础用法

```vue
<template>
  <zx-tree-node
    :node="nodeData"
    :props="treeProps"
    :level="0"
    @node-click="handleNodeClick"
  />
</template>

<script setup>
const nodeData = {
  id: 1,
  name: '根节点',
  children: [
    {
      id: 2,
      name: '子节点1',
      children: []
    },
    {
      id: 3,
      name: '子节点2',
      children: []
    }
  ]
}

const treeProps = {
  key: 'id',
  label: 'name',
  children: 'children'
}

function handleNodeClick(node) {
  console.log('节点被点击:', node)
}
</script>
```

### 带复选框的用法

```vue
<template>
  <zx-tree-node
    :node="nodeData"
    :props="treeProps"
    :level="0"
    :show-checkbox="true"
    :checked-keys="checkedKeys"
    @check-change="handleCheckChange"
    @toggle-check="handleToggleCheck"
  />
</template>

<script setup>
import { ref } from 'vue'

const checkedKeys = ref([2, 3])

function handleCheckChange(node, checked, indeterminate) {
  console.log('选中状态改变:', node, checked, indeterminate)
}

function handleToggleCheck(nodeKey) {
  const index = checkedKeys.value.indexOf(nodeKey)
  if (index > -1) {
    checkedKeys.value.splice(index, 1)
  } else {
    checkedKeys.value.push(nodeKey)
  }
}
</script>
```

### 懒加载用法

```vue
<template>
  <zx-tree-node
    :node="nodeData"
    :props="treeProps"
    :level="0"
    :lazy="true"
    :load="loadNode"
    :is-leaf="isLeafNode"
  />
</template>

<script setup>
const nodeData = {
  id: 1,
  name: '根节点',
  isLeaf: false
}

const treeProps = {
  key: 'id',
  label: 'name',
  children: 'children',
  isLeaf: 'isLeaf'
}

function loadNode(node, callback) {
  // 模拟异步加载数据
  setTimeout(() => {
    const children = [
      { id: node.id * 10 + 1, name: `子节点${node.id}-1`, isLeaf: true },
      { id: node.id * 10 + 2, name: `子节点${node.id}-2`, isLeaf: true }
    ]
    callback(children)
  }, 1000)
}

function isLeafNode(node) {
  return node.isLeaf
}
</script>
```

## 样式说明

组件提供了以下 CSS 类名用于自定义样式：

- `.zx-tree-node`: 节点容器
- `.zx-tree-node-level-{level}`: 特定层级的节点样式
- `.zx-tree-node-content`: 节点内容容器
- `.zx-tree-node-expand`: 展开/收起按钮
- `.zx-tree-node-checkbox`: 复选框
- `.zx-tree-node-label`: 节点文本标签
- `.zx-tree-node-loading`: 加载状态文本
- `.zx-tree-node-children`: 子节点容器

## 注意事项

1. 该组件通常不单独使用，而是作为树形组件的子组件
2. 使用懒加载时，需要正确实现 `load` 函数和 `isLeaf` 函数
3. 节点数据对象必须包含 `props` 配置中指定的字段
4. 复选框功能需要配合父组件管理选中状态
5. 组件会递归渲染子节点，注意数据结构的正确性

## 版本信息

- 当前版本：1.0.0
- 兼容性：Vue 3.x
- 平台支持：uni-app 全平台