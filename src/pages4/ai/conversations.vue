<template>
  <view class="page">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">AI 对话管理</text>
      <text class="page-desc">展示 zx-ai-conversations 组件的各种使用方式</text>
    </view>
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-container">
        <zx-ai-conversations 
          :items="basicItems" 
          :active-key="activeKey1"
          @active-change="onActiveChange1"
          @item-click="onItemClick"
        />
      </view>
    </view>
    
    <!-- 带菜单操作 -->
    <view class="demo-section">
      <view class="demo-title">带菜单操作</view>
      <view class="demo-container">
        <zx-ai-conversations 
          :items="menuItems" 
          :active-key="activeKey2"
          :menu="menuConfig"
          @active-change="onActiveChange2"
          @menu-click="onMenuClick"
        >
          <template #menu="{ item }">
            <text class="custom-menu-icon">⚙️</text>
          </template>
        </zx-ai-conversations>
      </view>
    </view>
    
    <!-- 分组展示 -->
    <view class="demo-section">
      <view class="demo-title">分组展示</view>
      <view class="demo-container">
        <zx-ai-conversations 
          :items="groupItems" 
          :active-key="activeKey3"
          :groupable="true"
          @active-change="onActiveChange3"
        >
          <template #groupTitle="{ group, title }">
            <view class="custom-group-title">
              <text class="custom-group-title-text">📁 {{ title }}</text>
            </view>
          </template>
        </zx-ai-conversations>
      </view>
    </view>
    
    <!-- 分组排序 -->
    <view class="demo-section">
      <view class="demo-title">分组排序</view>
      <view class="demo-container">
        <zx-ai-conversations 
          :items="sortGroupItems" 
          :active-key="activeKey4"
          :groupable="groupableConfig"
          @active-change="onActiveChange4"
        />
      </view>
    </view>
    
    <!-- 自定义样式 -->
    <view class="demo-section">
      <view class="demo-title">自定义样式</view>
      <view class="demo-container">
        <zx-ai-conversations 
          :items="customItems" 
          :active-key="activeKey5"
          :custom-style="customStyle"
          custom-class="custom-conversations"
          @active-change="onActiveChange5"
        >
          <template #icon="{ item }">
            <view class="custom-icon">
              <text class="custom-icon-text">{{ item.icon }}</text>
            </view>
          </template>
          <template #label="{ item }">
            <view class="custom-label">
              <text class="custom-label-text">{{ item.label }}</text>
              <text v-if="item.badge" class="custom-badge">{{ item.badge }}</text>
            </view>
          </template>
        </zx-ai-conversations>
      </view>
    </view>
    
    <!-- 操作日志 -->
    <view class="demo-section">
      <view class="demo-title">操作日志</view>
      <view class="log-container">
        <view v-for="(log, index) in logs" :key="index" class="log-item">
          <text class="log-text">{{ log }}</text>
        </view>
        <view v-if="logs.length === 0" class="log-empty">
          <text class="log-empty-text">暂无操作记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 页面状态
const activeKey1 = ref('conv1')
const activeKey2 = ref('conv5')
const activeKey3 = ref('conv9')
const activeKey4 = ref('conv13')
const activeKey5 = ref('conv17')
const logs = ref([])

// 基础数据
const basicItems = ref([
  {
    key: 'conv1',
    label: '与 ChatGPT 的对话',
    icon: '🤖',
    timestamp: Date.now() - 1000 * 60 * 5 // 5分钟前
  },
  {
    key: 'conv2',
    label: '代码优化讨论',
    icon: '💻',
    timestamp: Date.now() - 1000 * 60 * 60 * 2 // 2小时前
  },
  {
    key: 'conv3',
    label: '产品需求分析',
    icon: '📋',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 // 1天前
  },
  {
    key: 'conv4',
    label: '已禁用的对话',
    icon: '🚫',
    disabled: true,
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 7 // 7天前
  }
])

// 带菜单的数据
const menuItems = ref([
  {
    key: 'conv5',
    label: '技术方案讨论',
    icon: '⚡',
    timestamp: Date.now() - 1000 * 60 * 10
  },
  {
    key: 'conv6',
    label: 'UI 设计评审',
    icon: '🎨',
    timestamp: Date.now() - 1000 * 60 * 30
  },
  {
    key: 'conv7',
    label: '项目进度同步',
    icon: '📊',
    timestamp: Date.now() - 1000 * 60 * 60
  }
])

// 菜单配置
const menuConfig = reactive({
  items: [
    { key: 'edit', label: '编辑' },
    { key: 'delete', label: '删除' },
    { key: 'share', label: '分享' }
  ]
})

// 分组数据
const groupItems = ref([
  {
    key: 'conv8',
    label: '工作讨论 1',
    icon: '💼',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 15
  },
  {
    key: 'conv9',
    label: '工作讨论 2',
    icon: '💼',
    group: '工作',
    timestamp: Date.now() - 1000 * 60 * 45
  },
  {
    key: 'conv10',
    label: '学习笔记 1',
    icon: '📚',
    group: '学习',
    timestamp: Date.now() - 1000 * 60 * 60 * 3
  },
  {
    key: 'conv11',
    label: '学习笔记 2',
    icon: '📚',
    group: '学习',
    timestamp: Date.now() - 1000 * 60 * 60 * 5
  },
  {
    key: 'conv12',
    label: '生活随聊',
    icon: '🌟',
    group: '生活',
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2
  }
])

// 分组排序数据
const sortGroupItems = ref([
  {
    key: 'conv13',
    label: '重要项目讨论',
    icon: '🔥',
    group: 'A-重要',
    timestamp: Date.now() - 1000 * 60 * 5
  },
  {
    key: 'conv14',
    label: '一般任务',
    icon: '📝',
    group: 'B-一般',
    timestamp: Date.now() - 1000 * 60 * 30
  },
  {
    key: 'conv15',
    label: '低优先级',
    icon: '📎',
    group: 'C-低优先级',
    timestamp: Date.now() - 1000 * 60 * 60 * 2
  },
  {
    key: 'conv16',
    label: '另一个重要项目',
    icon: '⭐',
    group: 'A-重要',
    timestamp: Date.now() - 1000 * 60 * 60
  }
])

// 分组配置
const groupableConfig = reactive({
  sort: (a, b) => a.localeCompare(b), // 按字母排序
  title: (group) => group
})

// 自定义样式数据
const customItems = ref([
  {
    key: 'conv17',
    label: '自定义样式对话 1',
    icon: '🎯',
    badge: 'New',
    timestamp: Date.now() - 1000 * 60 * 2
  },
  {
    key: 'conv18',
    label: '自定义样式对话 2',
    icon: '🚀',
    badge: '5',
    timestamp: Date.now() - 1000 * 60 * 20
  },
  {
    key: 'conv19',
    label: '自定义样式对话 3',
    icon: '💎',
    timestamp: Date.now() - 1000 * 60 * 60
  }
])

// 自定义样式
const customStyle = reactive({
  borderRadius: '16rpx',
  boxShadow: '0 4rpx 12rpx rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
})

// 添加日志
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  logs.value.unshift(`[${timestamp}] ${message}`)
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10)
  }
}

// 事件处理
const onActiveChange1 = (key) => {
  activeKey1.value = key
  addLog(`基础用法：选中对话 ${key}`)
}

const onActiveChange2 = (key) => {
  activeKey2.value = key
  addLog(`菜单操作：选中对话 ${key}`)
}

const onActiveChange3 = (key) => {
  activeKey3.value = key
  addLog(`分组展示：选中对话 ${key}`)
}

const onActiveChange4 = (key) => {
  activeKey4.value = key
  addLog(`分组排序：选中对话 ${key}`)
}

const onActiveChange5 = (key) => {
  activeKey5.value = key
  addLog(`自定义样式：选中对话 ${key}`)
}

const onItemClick = (item) => {
  addLog(`点击对话项：${item.label} (${item.key})`)
}

const onMenuClick = (item) => {
  addLog(`点击菜单：对话 ${item.label} (${item.key})`)
  
  // 这里可以处理具体的菜单操作
  uni.showActionSheet({
    itemList: ['编辑', '删除', '分享'],
    success: (res) => {
      const actions = ['编辑', '删除', '分享']
      addLog(`执行操作：${actions[res.tapIndex]} - ${item.label}`)
    }
  })
}
</script>

<style scoped>
.page {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 48rpx;
  text-align: center;
}

.page-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 16rpx;
}

.page-desc {
  display: block;
  font-size: 28rpx;
  color: #666;
}

.demo-section {
  margin-bottom: 48rpx;
}

.demo-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
  border-left: 8rpx solid #1890ff;
}

.demo-container {
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

/* 自定义组件样式 */
:deep(.custom-conversations) {
  border: 2rpx solid #1890ff;
}

.custom-menu-icon {
  font-size: 32rpx;
}

.custom-group-title {
  padding: 16rpx 24rpx;
  background-color: #f0f9ff;
  border-bottom: 1rpx solid #e1f5fe;
}

.custom-group-title-text {
  font-size: 26rpx;
  color: #1890ff;
  font-weight: 600;
}

.custom-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-icon-text {
  font-size: 32rpx;
}

.custom-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.custom-label-text {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.custom-badge {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
  min-width: 32rpx;
  text-align: center;
}

/* 日志样式 */
.log-container {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  max-height: 400rpx;
  overflow-y: auto;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.log-item {
  padding: 12rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.log-item:last-child {
  border-bottom: none;
}

.log-text {
  font-size: 24rpx;
  color: #666;
  font-family: 'Courier New', monospace;
}

.log-empty {
  text-align: center;
  padding: 48rpx 0;
}

.log-empty-text {
  font-size: 28rpx;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .page {
    padding: 24rpx 16rpx;
  }
  
  .page-title {
    font-size: 40rpx;
  }
  
  .demo-title {
    font-size: 28rpx;
  }
}
</style>