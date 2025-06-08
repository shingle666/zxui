# zx-tree-v2 组件说明

高性能树形控件，支持大数据量虚拟滚动，兼容 H5、小程序、APP，基于 uniapp + Vue3 实现。

## 基本用法

```vue
<zx-tree-v2 :data="treeData" />
```

## 属性（Props）
| 属性                | 说明                                   | 类型      | 默认值      |
|---------------------|----------------------------------------|-----------|-------------|
| data                | 树形数据源，数组结构                   | Array     | []          |
| props               | 配置项，指定字段名                     | Object    | { value: 'id', label: 'label', children: 'children', disabled: 'disabled' } |
| showCheckbox        | 是否显示复选框                         | Boolean   | false       |
| defaultCheckedKeys  | 默认选中的节点 key 数组                | Array     | []          |
| defaultExpandedKeys | 默认展开的节点 key 数组                | Array     | []          |
| height              | 虚拟滚动区域高度（px），不传为自适应    | Number    | -           |
| virtual             | 是否开启虚拟滚动（大数据量建议开启）    | Boolean   | false       |
| renderContent       | 自定义节点内容渲染函数                  | Function  | -           |

## 事件（Events）
| 事件名         | 说明                   | 回调参数                                      |
|----------------|------------------------|-----------------------------------------------|
| node-click     | 节点被点击时触发       | (node)                                       |
| check-change   | 节点勾选状态变化时触发 | (node, checked)                              |
| expand-change  | 节点展开状态变化时触发 | (expandedKeys)                               |

## 插槽（Slots）
- 暂不支持具名插槽，推荐使用 `renderContent` 进行自定义渲染。

## 用法示例

```vue
<template>
  <zx-tree-v2 :data="treeData" showCheckbox :defaultCheckedKeys="[111]" :defaultExpandedKeys="[1]" :renderContent="renderNodeContent" @node-click="onNodeClick" />
</template>

<script setup>
import { ref } from 'vue'
const treeData = ref([
  { id: 1, label: '一级', children: [{ id: 11, label: '二级' }] }
])
function onNodeClick(node) {
  uni.showToast({ title: node.label })
}
function renderNodeContent({ node, level }) {
  return `<text style='color: ${level === 1 ? "#409EFF" : "#333"}'>${node.label}</text>`
}
</script>
```

## 注意事项
- 组件不依赖浏览器特有 DOM，适配所有 uniapp 支持的平台。
- 虚拟滚动为大数据量优化，普通数据量可不开启。
- 禁用节点请在数据中加 `disabled: true` 字段。

## 参考文档
- [Element Plus TreeV2 官方文档](https://element-plus.org/zh-CN/component/tree-v2.html)
