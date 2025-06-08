<template>
  <view class="zx-tree">
    <template v-for="(node, index) in treeData" :key="getNodeKey(node, index)">
      <zx-tree-node
        :node="node"
        :props="props"
        :level="1"
        :show-checkbox="showCheckbox"
        :checked-keys="checkedKeys"
        :lazy="lazy"
        :load="load"
        :is-leaf="isLeaf"
        :render-content="renderContent"
        @node-click="onNodeClick"
        @check-change="onCheckChange"
        @check="onCheck"
        @toggle-check="toggleCheck"
      />
    </template>
  </view>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue'

// 组件属性
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      label: 'label',
      children: 'children',
      isLeaf: 'isLeaf',
      disabled: 'disabled',
      key: 'id',
    })
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  },
  load: {
    type: Function,
    default: null
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  },
  isLeaf: {
    type: Function,
    default: null
  },
  renderContent: {
    type: Function,
    default: null
  }
})

const emits = defineEmits([
  'node-click',
  'check-change',
  'check',
])

const checkedKeys = ref([...props.defaultCheckedKeys])

const treeData = computed(() => props.data)

function getNodeKey(node, index) {
  return node[props.props.key] ?? index
}

function onNodeClick(node) {
  emits('node-click', node)
}
function onCheckChange(node, checked, indeterminate) {
  emits('check-change', node, checked, indeterminate)
}
function onCheck(node, checkedNodes) {
  emits('check', node, checkedNodes)
}
function toggleCheck(key) {
  const idx = checkedKeys.value.indexOf(key)
  if (idx > -1) {
    checkedKeys.value.splice(idx, 1)
  } else {
    checkedKeys.value.push(key)
  }
}
</script>

<style scoped>
.zx-tree {
  font-size: 14px;
}
.zx-tree-node {
  margin-left: 8px;
}
.zx-tree-node-content {
  display: flex;
  align-items: center;
  padding: 4px 0;
}
.zx-tree-node-expand {
  margin-right: 4px;
  cursor: pointer;
}
.zx-tree-node-checkbox {
  margin-right: 4px;
}
.zx-tree-node-label {
  margin-right: 4px;
}
.zx-tree-node-loading {
  color: #999;
  margin-left: 8px;
}
.zx-tree-node-children {
  margin-left: 16px;
}
</style>
