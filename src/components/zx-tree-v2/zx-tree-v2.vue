<template>
  <scroll-view
    :scroll-y="virtual"
    :style="{ maxHeight: height ? height + 'px' : 'auto', overflow: 'auto' }"
    @scroll="onScroll"
    class="zx-tree-v2"
  >
    <template v-for="(node, index) in visibleData" :key="getNodeKey(node, index)">
      <TreeNode
        :node="node"
        :props="props"
        :level="1"
        :show-checkbox="showCheckbox"
        :checked-keys="checkedKeys"
        :disabled-keys="disabledKeys"
        :expanded-keys="expandedKeys"
        :render-content="renderContent"
        @node-click="onNodeClick"
        @check-change="onCheckChange"
        @toggle-expand="toggleExpand"
        @toggle-check="toggleCheck"
      />
    </template>
  </scroll-view>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue'

// 递归节点组件
const TreeNode = defineAsyncComponent(() => import('./zx-tree-v2-node.vue'))

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({
      value: 'id',
      label: 'label',
      children: 'children',
      disabled: 'disabled',
    })
  },
  showCheckbox: Boolean,
  defaultCheckedKeys: {
    type: Array,
    default: () => []
  },
  defaultExpandedKeys: {
    type: Array,
    default: () => []
  },
  height: Number, // 虚拟滚动区域高度
  virtual: {
    type: Boolean,
    default: false
  },
  renderContent: Function,
})

const emits = defineEmits([
  'node-click',
  'check-change',
  'expand-change',
])

const checkedKeys = ref([...props.defaultCheckedKeys])
const expandedKeys = ref([...props.defaultExpandedKeys])
const disabledKeys = ref([])

// 虚拟滚动相关
const visibleData = computed(() => {
  // 简单实现：暂时全部渲染，后续可优化为分片渲染
  return props.data
})

function getNodeKey(node, index) {
  return node[props.props.value] ?? index
}

function onNodeClick(node) {
  emits('node-click', node)
}
function onCheckChange(node, checked) {
  emits('check-change', node, checked)
}
function toggleExpand(key) {
  const idx = expandedKeys.value.indexOf(key)
  if (idx > -1) {
    expandedKeys.value.splice(idx, 1)
  } else {
    expandedKeys.value.push(key)
  }
  emits('expand-change', expandedKeys.value)
}
function toggleCheck(key) {
  const idx = checkedKeys.value.indexOf(key)
  if (idx > -1) {
    checkedKeys.value.splice(idx, 1)
  } else {
    checkedKeys.value.push(key)
  }
}
function onScroll(e) {
  // 预留虚拟滚动优化
}
</script>

<style scoped>
.zx-tree-v2 {
  font-size: 14px;
  background: #fff;
}
</style>
