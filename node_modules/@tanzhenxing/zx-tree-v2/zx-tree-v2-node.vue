<template>
  <view :class="['zx-tree-v2-node', `zx-tree-v2-node-level-${level}`]">
    <view class="zx-tree-v2-node-content" @click="handleClick">
      <template v-if="!isLeaf">
        <text class="zx-tree-v2-node-expand" @click.stop="handleExpand">
          {{ expanded ? '-' : '+' }}
        </text>
      </template>
      <template v-if="showCheckbox">
        <checkbox class="zx-tree-v2-node-checkbox" :checked="checked" :disabled="disabled" @click.stop="handleCheck" />
      </template>
      <!-- <template v-if="renderContent">
        <view v-html="renderContent({ node, level })" />
      </template> -->
      <template v-else>
        <text class="zx-tree-v2-node-label">{{ node[props.label] }}</text>
      </template>
    </view>
    <view v-if="expanded && children && children.length > 0" class="zx-tree-v2-node-children">
      <TreeNode v-for="(child, idx) in children" :key="child[props.value] || idx" :node="child" :props="props"
        :level="level + 1" :show-checkbox="showCheckbox" :checked-keys="checkedKeys" :disabled-keys="disabledKeys"
        :expanded-keys="expandedKeys" :render-content="renderContent" @node-click="$emit('node-click', $event)"
        @check-change="$emit('check-change', ...arguments)" @toggle-expand="$emit('toggle-expand', $event)"
        @toggle-check="$emit('toggle-check', $event)" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  node: Object,
  props: Object,
  level: Number,
  showCheckbox: Boolean,
  checkedKeys: Array,
  disabledKeys: Array,
  expandedKeys: Array,
  renderContent: Function,
})
const emit = defineEmits(['node-click', 'check-change', 'toggle-expand', 'toggle-check'])
const TreeNode = defineAsyncComponent(() => import('./zx-tree-v2-node.vue'))

const children = computed(() => props.node[props.props.children] || [])
const isLeaf = computed(() => !children.value || children.value.length === 0)
const checked = computed(() => props.checkedKeys.includes(props.node[props.props.value]))
const disabled = computed(() => props.node[props.props.disabled] || props.disabledKeys.includes(props.node[props.props.value]))
const expanded = computed(() => props.expandedKeys.includes(props.node[props.props.value]))

function handleExpand() {
  emit('toggle-expand', props.node[props.props.value])
}
function handleCheck() {
  if (disabled.value) return
  emit('toggle-check', props.node[props.props.value])
  emit('check-change', props.node, !checked.value)
}
function handleClick() {
  emit('node-click', props.node)
}
</script>

<style scoped>
.zx-tree-v2-node {
  margin-left: 8px;
}

.zx-tree-v2-node-content {
  display: flex;
  align-items: center;
  padding: 4px 0;
}

.zx-tree-v2-node-expand {
  margin-right: 4px;
  cursor: pointer;
}

.zx-tree-v2-node-checkbox {
  margin-right: 4px;
}

.zx-tree-v2-node-label {
  margin-right: 4px;
}

.zx-tree-v2-node-children {
  margin-left: 16px;
}
</style>