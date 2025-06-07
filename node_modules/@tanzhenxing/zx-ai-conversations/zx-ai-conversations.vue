<template>
  <view class="zx-ai-conversations" :class="mergedCls" :style="mergedStyle">
    <view v-for="(groupInfo, groupIndex) in groupList" :key="groupInfo.name || `group-${groupIndex}`" class="zx-ai-conversations-group">
      <!-- 分组标题 -->
      <view v-if="enableGroup && groupInfo.title" class="zx-ai-conversations-group-title">
        <slot name="groupTitle" :group="groupInfo.name" :title="groupInfo.title">
          <text class="zx-ai-conversations-group-title-text">{{ groupInfo.title }}</text>
        </slot>
      </view>
      
      <!-- 对话列表 -->
      <view class="zx-ai-conversations-list">
        <view 
          v-for="(item, itemIndex) in groupInfo.data" 
          :key="item.key || `item-${itemIndex}`"
          class="zx-ai-conversations-item"
          :class="{
            'zx-ai-conversations-item-active': mergedActiveKey === item.key && !item.disabled,
            'zx-ai-conversations-item-disabled': item.disabled
          }"
          @click="onItemClick(item)"
        >
          <!-- 图标 -->
          <view v-if="item.icon" class="zx-ai-conversations-item-icon">
            <slot name="icon" :item="item">
              <zx-icon :name="item.icon" size="32rpx" class="zx-ai-conversations-item-icon-text"></zx-icon>
            </slot>
          </view>
          
          <!-- 标签内容 -->
          <view class="zx-ai-conversations-item-content">
            <view class="zx-ai-conversations-item-label">
              <slot name="label" :item="item">
                <text class="zx-ai-conversations-item-label-text">{{ item.label }}</text>
              </slot>
            </view>
            
            <!-- 时间戳 -->
            <view v-if="item.timestamp" class="zx-ai-conversations-item-timestamp">
              <text class="zx-ai-conversations-item-timestamp-text">{{ formatTimestamp(item.timestamp) }}</text>
            </view>
          </view>
          
          <!-- 操作菜单 -->
          <view v-if="!item.disabled && (menu || item.menu)" class="zx-ai-conversations-item-menu" @click.stop="onMenuClick(item)">
            <slot name="menu" :item="item">
              <text class="zx-ai-conversations-item-menu-icon">⋯</text>
            </slot>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
// 引入组件
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

// 定义 Props
const props = defineProps({
  // 会话列表数据源
  items: {
    type: Array,
    default: () => []
  },
  // 当前选中的值
  activeKey: {
    type: String,
    default: ''
  },
  // 默认选中值
  defaultActiveKey: {
    type: String,
    default: ''
  },
  // 会话操作菜单
  menu: {
    type: [Object, Function],
    default: null
  },
  // 是否支持分组
  groupable: {
    type: [Boolean, Object],
    default: false
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  }
})

// 定义 Emits
const emit = defineEmits([
  'update:activeKey',
  'activeChange',
  'itemClick',
  'menuClick'
])

// 内部状态
const internalActiveKey = ref(props.activeKey || props.defaultActiveKey)

// 监听 activeKey 变化
watch(() => props.activeKey, (newVal) => {
  if (newVal !== undefined) {
    internalActiveKey.value = newVal
  }
})

// 合并后的 activeKey
const mergedActiveKey = computed(() => {
  return props.activeKey !== undefined ? props.activeKey : internalActiveKey.value
})

// 分组配置
const groupConfig = computed(() => {
  if (typeof props.groupable === 'boolean') {
    return {
      enabled: props.groupable,
      sort: null,
      title: null
    }
  }
  return {
    enabled: true,
    sort: props.groupable?.sort || null,
    title: props.groupable?.title || null
  }
})

// 是否启用分组
const enableGroup = computed(() => {
  return groupConfig.value.enabled && props.items.some(item => item.group)
})

// 分组后的数据
const groupList = computed(() => {
  if (!enableGroup.value) {
    return [{
      name: 'default',
      title: null,
      data: props.items
    }]
  }
  
  // 按分组归类
  const groups = {}
  props.items.forEach(item => {
    const groupName = item.group || 'default'
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(item)
  })
  
  // 转换为数组格式
  let groupArray = Object.keys(groups).map(groupName => ({
    name: groupName,
    title: groupName === 'default' ? null : groupName,
    data: groups[groupName]
  }))
  
  // 排序
  if (groupConfig.value.sort) {
    groupArray.sort((a, b) => groupConfig.value.sort(a.name, b.name))
  }
  
  return groupArray
})

// 合并样式
const mergedStyle = computed(() => {
  return {
    ...props.customStyle
  }
})

// 合并类名
const mergedCls = computed(() => {
  return props.customClass
})

// 格式化时间戳
const formatTimestamp = (timestamp) => {
  if (!timestamp) return ''
  
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  // 小于1分钟
  if (diff < 60 * 1000) {
    return '刚刚'
  }
  
  // 小于1小时
  if (diff < 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 1000))}分钟前`
  }
  
  // 小于1天
  if (diff < 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  }
  
  // 大于1天
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

// 点击事件处理
const onItemClick = (item) => {
  if (item.disabled) return
  
  internalActiveKey.value = item.key
  emit('update:activeKey', item.key)
  emit('activeChange', item.key)
  emit('itemClick', item)
}

// 菜单点击事件处理
const onMenuClick = (item) => {
  emit('menuClick', item)
}
</script>

<style scoped>
.zx-ai-conversations {
  width: 100%;
  background-color: #fff;
}

.zx-ai-conversations-group {
  margin-bottom: 16rpx;
}

.zx-ai-conversations-group:last-child {
  margin-bottom: 0;
}

.zx-ai-conversations-group-title {
  padding: 16rpx 24rpx 8rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.zx-ai-conversations-group-title-text {
  font-size: 24rpx;
  color: #999;
  font-weight: 500;
}

.zx-ai-conversations-list {
  /* 列表容器 */
}

.zx-ai-conversations-item {
  display: flex;
  align-items: center;
  padding: 24rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.2s;
  position: relative;
}

.zx-ai-conversations-item:last-child {
  border-bottom: none;
}

.zx-ai-conversations-item:hover {
  background-color: #f5f5f5;
}

.zx-ai-conversations-item-active {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.zx-ai-conversations-item-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.zx-ai-conversations-item-icon {
  margin-right: 24rpx;
  flex-shrink: 0;
}

.zx-ai-conversations-item-icon-text {
  font-size: 32rpx;
}

.zx-ai-conversations-item-content {
  flex: 1;
  min-width: 0;
}

.zx-ai-conversations-item-label {
  margin-bottom: 8rpx;
}

.zx-ai-conversations-item-label-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zx-ai-conversations-item-timestamp {
  /* 时间戳样式 */
}

.zx-ai-conversations-item-timestamp-text {
  font-size: 24rpx;
  color: #999;
}

.zx-ai-conversations-item-menu {
  margin-left: 16rpx;
  padding: 8rpx;
  flex-shrink: 0;
}

.zx-ai-conversations-item-menu-icon {
  font-size: 32rpx;
  color: #999;
  transform: rotate(90deg);
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .zx-ai-conversations-item {
    padding: 20rpx 16rpx;
  }
  
  .zx-ai-conversations-item-icon {
    margin-right: 16rpx;
  }
  
  .zx-ai-conversations-item-label-text {
    font-size: 26rpx;
  }
  
  .zx-ai-conversations-item-timestamp-text {
    font-size: 22rpx;
  }
}
</style>