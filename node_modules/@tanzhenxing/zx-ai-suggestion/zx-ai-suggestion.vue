<template>
  <view :class="[
    'zx-ai-suggestion',
    customClass,
    {
      'zx-ai-suggestion--block': block,
      'zx-ai-suggestion--open': mergedOpen
    }
  ]" :style="customStyle">
    <!-- 触发器内容 -->
    <view class="zx-ai-suggestion__trigger" @click="handleTriggerClick">
      <slot :on-trigger="onTrigger" :on-key-down="onKeyDown">
        <view class="zx-ai-suggestion__default-trigger">
          点击获取建议
        </view>
      </slot>
    </view>

    <!-- 建议面板 -->
    <view v-if="mergedOpen" class="zx-ai-suggestion__panel" :class="{
      'zx-ai-suggestion__panel--block': block
    }">
      <view class="zx-ai-suggestion__list">
        <template v-for="(item, index) in flattenItems" :key="item.value">
          <view class="zx-ai-suggestion__item" :class="{
            'zx-ai-suggestion__item--active': activeIndex === index,
            'zx-ai-suggestion__item--has-children': item.hasChildren
          }" @click="handleItemClick(item, index)">
            <!-- 图标 -->
            <view v-if="item.icon" class="zx-ai-suggestion__item-icon">
              <slot name="icon" :item="item" :index="index">
                <zx-icon :name="item.icon"></zx-icon>
              </slot>
            </view>

            <!-- 标签 -->
            <view class="zx-ai-suggestion__item-label">
              <slot name="label" :item="item" :index="index">
                <text>{{ item.label }}</text>
              </slot>
            </view>

            <!-- 额外内容 -->
            <view v-if="item.extra" class="zx-ai-suggestion__item-extra">
              <slot name="extra" :item="item" :index="index">
                <text>{{ item.extra }}</text>
              </slot>
            </view>

            <!-- 箭头指示器 -->
            <view v-if="item.hasChildren" class="zx-ai-suggestion__item-arrow">
              <text class="zx-ai-suggestion__arrow-icon">›</text>
            </view>
          </view>
        </template>
      </view>

      <!-- 遮罩层 -->
      <view class="zx-ai-suggestion__mask" @click="handleMaskClick"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxAiSuggestion'
})

// 定义 Props
const props = defineProps({
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  },
  // 是否整行宽度
  block: {
    type: Boolean,
    default: false
  },
  // 受控打开面板
  open: {
    type: Boolean,
    default: undefined
  },
  // 建议项列表
  items: {
    type: [Array, Function],
    default: () => []
  },
  // 面板位置
  placement: {
    type: String,
    default: 'bottom', // top, bottom
    validator: (value) => ['top', 'bottom'].includes(value)
  },
  // 最大显示项数
  maxItems: {
    type: Number,
    default: 8
  }
})

// 定义 Emits
const emit = defineEmits([
  'select',
  'open-change',
  'update:open'
])

// 响应式数据
const innerOpen = ref(false)
const activeIndex = ref(-1)
const currentInfo = ref(undefined)
const currentLevel = ref(0)
const breadcrumb = ref([])

// 计算属性
const mergedOpen = computed(() => {
  return props.open !== undefined ? props.open : innerOpen.value
})

const currentItems = computed(() => {
  const itemList = typeof props.items === 'function'
    ? props.items(currentInfo.value)
    : props.items

  if (!Array.isArray(itemList)) return []

  // 根据当前层级和面包屑导航获取当前显示的项目
  let items = itemList
  for (const crumb of breadcrumb.value) {
    const parentItem = items.find(item => item.value === crumb)
    if (parentItem && parentItem.children) {
      items = parentItem.children
    } else {
      break
    }
  }

  return items.slice(0, props.maxItems)
})

const flattenItems = computed(() => {
  return currentItems.value.map(item => ({
    ...item,
    hasChildren: Array.isArray(item.children) && item.children.length > 0
  }))
})

// 方法
const triggerOpen = (nextOpen) => {
  if (props.open === undefined) {
    innerOpen.value = nextOpen
  }
  emit('update:open', nextOpen)
  emit('open-change', nextOpen)
}

const onTrigger = (info) => {
  if (info === false) {
    triggerOpen(false)
    resetNavigation()
  } else {
    currentInfo.value = info
    triggerOpen(true)
  }
}

const onKeyDown = (event) => {
  if (!mergedOpen.value) return

  const { key } = event

  switch (key) {
    case 'ArrowDown':
      event.preventDefault()
      moveActiveIndex(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveActiveIndex(-1)
      break
    case 'Enter':
      event.preventDefault()
      if (activeIndex.value >= 0) {
        const item = flattenItems.value[activeIndex.value]
        handleItemSelect(item)
      }
      break
    case 'Escape':
      event.preventDefault()
      triggerOpen(false)
      resetNavigation()
      break
    case 'ArrowLeft':
      event.preventDefault()
      navigateBack()
      break
    case 'ArrowRight':
      event.preventDefault()
      if (activeIndex.value >= 0) {
        const item = flattenItems.value[activeIndex.value]
        if (item.hasChildren) {
          navigateToChildren(item)
        }
      }
      break
  }
}

const moveActiveIndex = (offset) => {
  const maxIndex = flattenItems.value.length - 1
  let newIndex = activeIndex.value + offset

  if (newIndex < 0) {
    newIndex = maxIndex
  } else if (newIndex > maxIndex) {
    newIndex = 0
  }

  activeIndex.value = newIndex
}

const handleTriggerClick = () => {
  if (!mergedOpen.value) {
    onTrigger()
  }
}

const handleItemClick = (item, index) => {
  activeIndex.value = index
  handleItemSelect(item)
}

const handleItemSelect = (item) => {
  if (item.hasChildren) {
    navigateToChildren(item)
  } else {
    emit('select', item.value)
    triggerOpen(false)
    resetNavigation()
  }
}

const navigateToChildren = (item) => {
  breadcrumb.value.push(item.value)
  currentLevel.value++
  activeIndex.value = 0
}

const navigateBack = () => {
  if (breadcrumb.value.length > 0) {
    breadcrumb.value.pop()
    currentLevel.value--
    activeIndex.value = 0
  } else {
    triggerOpen(false)
    resetNavigation()
  }
}

const resetNavigation = () => {
  activeIndex.value = -1
  currentLevel.value = 0
  breadcrumb.value = []
  currentInfo.value = undefined
}

const handleMaskClick = () => {
  triggerOpen(false)
  resetNavigation()
}

// 监听器
watch(mergedOpen, (newVal) => {
  if (newVal) {
    nextTick(() => {
      activeIndex.value = 0
    })
  } else {
    resetNavigation()
  }
})

watch(() => currentItems.value, () => {
  activeIndex.value = 0
})

// 暴露方法给父组件
defineExpose({
  onTrigger,
  onKeyDown,
  open: () => onTrigger(),
  close: () => onTrigger(false)
})
</script>

<style lang="scss" scoped>
.zx-ai-suggestion {
  position: relative;
  display: inline-block;

  &--block {
    display: block;
    width: 100%;
  }
}

.zx-ai-suggestion__trigger {
  cursor: pointer;
}

.zx-ai-suggestion__default-trigger {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    border-color: #4096ff;
  }
}

.zx-ai-suggestion__panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  &--block {
    width: 100%;
  }
}

.zx-ai-suggestion__list {
  max-height: 256px;
  overflow-y: auto;
}

.zx-ai-suggestion__item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &--active {
    background-color: #f5f5f5;
  }

  &--has-children {
    &:hover {
      background-color: #e6f4ff;
    }
  }
}

.zx-ai-suggestion__item-icon {
  margin-right: 8px;
  font-size: 16px;
  color: #666;
  flex-shrink: 0;
}

.zx-ai-suggestion__item-label {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.zx-ai-suggestion__item-extra {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
  flex-shrink: 0;
}

.zx-ai-suggestion__item-arrow {
  margin-left: 8px;
  flex-shrink: 0;
}

.zx-ai-suggestion__arrow-icon {
  font-size: 16px;
  color: #999;
  transform: rotate(0deg);
  transition: transform 0.2s;
}

.zx-ai-suggestion__mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-color: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .zx-ai-suggestion__panel {
    left: 8px;
    right: 8px;
    max-width: calc(100vw - 16px);
  }

  .zx-ai-suggestion__item {
    padding: 12px 16px;
  }

  .zx-ai-suggestion__item-label {
    font-size: 16px;
  }
}

/* 暗色主题支持 */
@media (prefers-color-scheme: dark) {
  .zx-ai-suggestion__default-trigger {
    background-color: #141414;
    border-color: #434343;
    color: #fff;

    &:hover {
      border-color: #1677ff;
    }
  }

  .zx-ai-suggestion__panel {
    background-color: #141414;
    border-color: #434343;
  }

  .zx-ai-suggestion__item {
    border-bottom-color: #303030;

    &:hover,
    &--active {
      background-color: #262626;
    }

    &--has-children {
      &:hover {
        background-color: #111a2c;
      }
    }
  }

  .zx-ai-suggestion__item-label {
    color: #fff;
  }

  .zx-ai-suggestion__item-icon,
  .zx-ai-suggestion__arrow-icon {
    color: #999;
  }

  .zx-ai-suggestion__item-extra {
    color: #666;
  }
}
</style>