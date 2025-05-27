<template>
  <view class="tree-demo">
    <view class="tree-demo-block">
      <text class="tree-demo-title">基础用法</text>
      <zx-tree :data="treeData" @node-click="onNodeClick" />
    </view>

    <view class="tree-demo-block">
      <text class="tree-demo-title">可选择（带复选框）</text>
      <zx-tree :data="treeData" showCheckbox @check-change="onCheckChange" />
    </view>

    <view class="tree-demo-block">
      <text class="tree-demo-title">懒加载</text>
      <zx-tree :data="lazyTreeData" :lazy="true" :load="loadNode" showCheckbox />
    </view>

    <view class="tree-demo-block">
      <text class="tree-demo-title">自定义节点内容</text>
      <zx-tree :data="treeData" :renderContent="renderNodeContent" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 11,
        label: '二级 1-1',
        children: [
          { id: 111, label: '三级 1-1-1' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 21,
        label: '二级 2-1',
        children: [
          { id: 211, label: '三级 2-1-1' },
        ],
      },
      {
        id: 22,
        label: '二级 2-2',
        children: [
          { id: 221, label: '三级 2-2-1' },
        ],
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 31,
        label: '二级 3-1',
        children: [
          { id: 311, label: '三级 3-1-1' },
        ],
      },
      {
        id: 32,
        label: '二级 3-2',
        children: [
          { id: 321, label: '三级 3-2-1' },
        ],
      },
    ],
  },
])

const lazyTreeData = ref([
  { id: 1, label: '根节点1', isLeaf: false },
  { id: 2, label: '根节点2', isLeaf: false },
])

function loadNode(node, resolve) {
  setTimeout(() => {
    if (node.id === 1) {
      resolve([
        { id: 11, label: '子节点1-1', isLeaf: true },
        { id: 12, label: '子节点1-2', isLeaf: true },
      ])
    } else if (node.id === 2) {
      resolve([
        { id: 21, label: '子节点2-1', isLeaf: true },
      ])
    } else {
      resolve([])
    }
  }, 800)
}

function onNodeClick(node) {
  uni.showToast({ title: `点击节点：${node.label}`, icon: 'none' })
}
function onCheckChange(node, checked, indeterminate) {
  uni.showToast({ title: `${checked ? '选中' : '取消'}：${node.label}`, icon: 'none' })
}

function renderNodeContent({ node, level }) {
  return `<text style='color: ${level === 1 ? "#409EFF" : level === 2 ? "#67C23A" : "#E6A23C"};font-weight:bold;'>${node.label}</text>`
}
</script>

<style scoped>
.tree-demo {
  padding: 16px;
}
.tree-demo-block {
  margin-bottom: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 16px;
}
.tree-demo-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}
</style>
