<template>
  <view class="tree-v2-demo">
    <view class="tree-v2-demo-block">
      <text class="tree-v2-demo-title">基础用法</text>
      <zx-tree-v2 :data="treeData" @node-click="onNodeClick" />
    </view>

    <view class="tree-v2-demo-block">
      <text class="tree-v2-demo-title">可选择（带复选框）</text>
      <zx-tree-v2 :data="treeData" showCheckbox @check-change="onCheckChange" />
    </view>

    <view class="tree-v2-demo-block">
      <text class="tree-v2-demo-title">禁用节点</text>
      <zx-tree-v2 :data="disabledTreeData" showCheckbox />
    </view>

    <view class="tree-v2-demo-block">
      <text class="tree-v2-demo-title">默认展开和默认选中</text>
      <zx-tree-v2 :data="treeData" showCheckbox :defaultCheckedKeys="[111, 221]" :defaultExpandedKeys="[1, 2]" />
    </view>

    <view class="tree-v2-demo-block">
      <text class="tree-v2-demo-title">自定义节点内容</text>
      <zx-tree-v2 :data="treeData" :renderContent="renderNodeContent" />
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

const disabledTreeData = ref([
  {
    id: 1,
    label: '一级 1',
    disabled: true,
    children: [
      {
        id: 11,
        label: '二级 1-1',
        children: [
          { id: 111, label: '三级 1-1-1', disabled: true },
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
        disabled: true,
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
])

function onNodeClick(node) {
  uni.showToast({ title: `点击节点：${node.label}`, icon: 'none' })
}
function onCheckChange(node, checked) {
  uni.showToast({ title: `${checked ? '选中' : '取消'}：${node.label}`, icon: 'none' })
}
function renderNodeContent({ node, level }) {
  return `<text style='color: ${level === 1 ? "#409EFF" : level === 2 ? "#67C23A" : "#E6A23C"};font-weight:bold;'>${node.label}</text>`
}
</script>

<style scoped>
.tree-v2-demo {
  padding: 16px;
}
.tree-v2-demo-block {
  margin-bottom: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 16px;
}
.tree-v2-demo-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}
</style>
