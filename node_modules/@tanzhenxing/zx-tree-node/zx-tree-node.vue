<template>
  <view :class="['zx-tree-node', `zx-tree-node-level-${props.level}`]">
    <view class="zx-tree-node-content" @click="handleClick">
      <template v-if="!isLeafNode">
        <text class="zx-tree-node-expand" @click.stop="handleExpand">
          {{ expanded ? '-' : '+' }}
        </text>
      </template>
      <template v-if="props.showCheckbox">
        <checkbox
          class="zx-tree-node-checkbox"
          :checked="checked"
          @click.stop="handleCheck"
        />
      </template>
      <template v-else>
        <text class="zx-tree-node-label">{{ props.node[props.props.label] }}</text>
      </template>
      <text v-if="loading" class="zx-tree-node-loading">加载中...</text>
    </view>
    <view v-if="expanded && children && children.length > 0" class="zx-tree-node-children">
      <zx-tree-node
        v-for="(child, idx) in children"
        :key="child[props.props.key] || idx"
        :node="child"
        :props="props.props"
        :level="props.level + 1"
        :show-checkbox="props.showCheckbox"
        :checked-keys="props.checkedKeys"
        :lazy="props.lazy"
        :load="props.load"
        :is-leaf="props.isLeaf"
        @node-click="emit('node-click', $event)"
        @check-change="emit('check-change', ...arguments)"
        @check="emit('check', ...arguments)"
        @toggle-check="emit('toggle-check', $event)"
      />
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
  lazy: Boolean,
  load: Function,
  isLeaf: Function
})
const emit = defineEmits(['node-click', 'check-change', 'check', 'toggle-check'])
const expanded = ref(false)
const loading = ref(false)
const children = ref(props.node[props.props.children] || [])
const isLeafNode = computed(() => {
  if (props.isLeaf) return props.isLeaf(props.node)
  return props.node[props.props.isLeaf] || !children.value || children.value.length === 0
})
const checked = computed(() => {
  return props.checkedKeys.includes(props.node[props.props.key])
})
function handleExpand() {
  if (props.lazy && !expanded.value && !isLeafNode.value && props.load) {
    loading.value = true
    props.load(props.node, (data = []) => {
      children.value = data
      loading.value = false
      expanded.value = true
    })
  } else {
    expanded.value = !expanded.value
  }
}
function handleCheck() {
  emit('toggle-check', props.node[props.props.key])
  emit('check-change', props.node, !checked.value, false)
  emit('check', props.node, props.checkedKeys)
}
function handleClick() {
  emit('node-click', props.node)
}
</script>

<style scoped>
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