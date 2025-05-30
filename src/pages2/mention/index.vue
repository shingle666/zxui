<template>
  <view class="demo-container">
    <view class="demo-header">
      <text class="demo-title">ZxMention 提及组件演示</text>
      <text class="demo-desc">用于在输入中提及某人或某事的组件</text>
    </view>

    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">输入 @ 触发提及功能</view>
      <zx-mention 
        v-model="basicValue" 
        :options="userOptions"
        placeholder="请输入 @ 提及某人"
        clearable
        @search="onBasicSearch"
        @select="onBasicSelect"
      />
      <view class="result-display">
        <text class="result-label">输入内容：</text>
        <text class="result-text">{{ basicValue || '无' }}</text>
      </view>
    </view>

    <!-- Textarea 类型 -->
    <view class="demo-section">
      <view class="section-title">Textarea 类型</view>
      <view class="section-desc">支持多行文本输入</view>
      <zx-mention 
        v-model="textareaValue" 
        type="textarea"
        :options="userOptions"
        placeholder="请输入多行内容，支持 @ 提及"
        auto-height
        clearable
      />
      <view class="result-display">
        <text class="result-label">输入内容：</text>
        <text class="result-text">{{ textareaValue || '无' }}</text>
      </view>
    </view>

    <!-- 不同尺寸 -->
    <view class="demo-section">
      <view class="section-title">不同尺寸</view>
      <view class="size-demo">
        <view class="size-item">
          <text class="size-label">小号</text>
          <zx-mention 
            v-model="smallValue" 
            size="small"
            :options="userOptions"
            placeholder="小号输入框"
          />
        </view>
        
        <view class="size-item">
          <text class="size-label">默认</text>
          <zx-mention 
            v-model="defaultValue" 
            size="default"
            :options="userOptions"
            placeholder="默认输入框"
          />
        </view>
        
        <view class="size-item">
          <text class="size-label">大号</text>
          <zx-mention 
            v-model="largeValue" 
            size="large"
            :options="userOptions"
            placeholder="大号输入框"
          />
        </view>
      </view>
    </view>

    <!-- 多前缀支持 -->
    <view class="demo-section">
      <view class="section-title">多前缀支持</view>
      <view class="section-desc">支持 @ 提及用户，# 提及话题</view>
      <zx-mention 
        v-model="multiPrefixValue" 
        :prefix="['@', '#']"
        :options="getCurrentOptions"
        placeholder="输入 @ 提及用户，# 提及话题"
        clearable
        @search="onMultiPrefixSearch"
      />
      <view class="prefix-info">
        <text class="info-label">当前前缀：</text>
        <text class="info-text">{{ currentPrefix || '无' }}</text>
      </view>
      <view class="result-display">
        <text class="result-label">输入内容：</text>
        <text class="result-text">{{ multiPrefixValue || '无' }}</text>
      </view>
    </view>

    <!-- 异步加载 -->
    <view class="demo-section">
      <view class="section-title">异步加载</view>
      <view class="section-desc">动态搜索用户数据</view>
      <zx-mention 
        v-model="asyncValue" 
        :options="asyncOptions"
        :loading="asyncLoading"
        placeholder="输入 @ 进行搜索"
        @search="onAsyncSearch"
      >
        <template #loading>
          <text class="loading-text">🔍 搜索中...</text>
        </template>
      </zx-mention>
      <view class="result-display">
        <text class="result-label">搜索关键词：</text>
        <text class="result-text">{{ searchKeyword || '无' }}</text>
      </view>
    </view>

    <!-- 自定义标签内容 -->
    <view class="demo-section">
      <view class="section-title">自定义标签内容</view>
      <view class="section-desc">自定义下拉选项的显示内容</view>
      <zx-mention 
        v-model="customValue" 
        :options="userDetailsOptions"
        placeholder="请输入 @ 查看自定义标签"
        clearable
      >
        <template #label="{ item }">
          <view class="custom-option">
            <view class="avatar">{{ item.avatar }}</view>
            <view class="user-info">
              <text class="username">{{ item.label }}</text>
              <text class="department">{{ item.department }}</text>
            </view>
            <view v-if="item.online" class="online-status">●</view>
          </view>
        </template>
      </zx-mention>
    </view>

    <!-- 自定义过滤逻辑 -->
    <view class="demo-section">
      <view class="section-title">自定义过滤逻辑</view>
      <view class="section-desc">按拼音首字母过滤</view>
      <zx-mention 
        v-model="filterValue" 
        :options="pinyinOptions"
        :filter-option="customFilter"
        placeholder="输入 @ 然后输入拼音首字母"
        clearable
      />
      <view class="filter-tip">
        <text class="tip-text">💡 提示：输入 "zs" 可以找到 "张三"，输入 "ls" 可以找到 "李四"</text>
      </view>
    </view>

    <!-- 弹出位置 -->
    <view class="demo-section">
      <view class="section-title">弹出位置</view>
      <view class="placement-demo">
        <view class="placement-item">
          <text class="placement-label">向下弹出</text>
          <zx-mention 
            v-model="bottomValue" 
            :options="userOptions"
            placement="bottom"
            placeholder="向下弹出"
          />
        </view>
        
        <view class="placement-item">
          <text class="placement-label">向上弹出</text>
          <zx-mention 
            v-model="topValue" 
            :options="userOptions"
            placement="top"
            placeholder="向上弹出"
          />
        </view>
      </view>
    </view>

    <!-- 可清空 -->
    <view class="demo-section">
      <view class="section-title">可清空</view>
      <view class="section-desc">显示清空按钮</view>
      <zx-mention 
        v-model="clearableValue" 
        :options="userOptions"
        placeholder="带清空按钮"
        clearable
        @clear="onClear"
      />
    </view>

    <!-- 禁用状态 -->
    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <view class="section-desc">输入框不可用</view>
      <zx-mention 
        v-model="disabledValue" 
        :options="userOptions"
        placeholder="禁用状态"
        disabled
      />
    </view>

    <!-- 头部和底部插槽 -->
    <view class="demo-section">
      <view class="section-title">头部和底部插槽</view>
      <view class="section-desc">自定义下拉面板的头部和底部内容</view>
      <zx-mention 
        v-model="slotValue" 
        :options="userOptions"
        placeholder="查看头部和底部内容"
      >
        <template #header>
          <view class="dropdown-header">
            <text class="header-text">👥 选择用户</text>
          </view>
        </template>
        <template #footer>
          <view class="dropdown-footer">
            <text class="footer-text" @click="showAllUsers">查看所有用户 →</text>
          </view>
        </template>
      </zx-mention>
    </view>

    <!-- 事件监听演示 -->
    <view class="demo-section">
      <view class="section-title">事件监听</view>
      <view class="section-desc">监听各种组件事件</view>
      <zx-mention 
        v-model="eventValue" 
        :options="userOptions"
        placeholder="查看事件日志"
        clearable
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @search="onSearch"
        @select="onSelect"
        @clear="onClear"
      />
      <view class="event-log">
        <text class="log-title">事件日志：</text>
        <scroll-view class="log-content" scroll-y>
          <view v-for="(log, index) in eventLogs" :key="index" class="log-item">
            <text class="log-time">[{{ log.time }}]</text>
            <text class="log-event">{{ log.event }}</text>
            <text class="log-data">{{ log.data }}</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 基础数据
const basicValue = ref('')
const textareaValue = ref('')
const smallValue = ref('')
const defaultValue = ref('')
const largeValue = ref('')
const multiPrefixValue = ref('')
const asyncValue = ref('')
const customValue = ref('')
const filterValue = ref('')
const bottomValue = ref('')
const topValue = ref('')
const clearableValue = ref('Hello @Alice ')
const disabledValue = ref('禁用状态演示 @Bob ')
const slotValue = ref('')
const eventValue = ref('')

// 当前前缀和搜索关键词
const currentPrefix = ref('')
const searchKeyword = ref('')

// 异步加载状态
const asyncLoading = ref(false)
const asyncOptions = ref([])

// 事件日志
const eventLogs = ref([])

// 基础用户选项
const userOptions = ref([
  { value: 'Alice', label: 'Alice' },
  { value: 'Bob', label: 'Bob' },
  { value: 'Charlie', label: 'Charlie' },
  { value: 'David', label: 'David' },
  { value: 'Eve', label: 'Eve' },
  { value: 'Frank', label: 'Frank' }
])

// 话题选项
const topicOptions = ref([
  { value: '前端开发', label: '前端开发' },
  { value: 'Vue3', label: 'Vue3' },
  { value: 'JavaScript', label: 'JavaScript' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'uniapp', label: 'uniapp' }
])

// 用户详细信息选项
const userDetailsOptions = ref([
  { 
    value: 'Alice', 
    label: 'Alice Johnson', 
    avatar: '👩‍💼',
    department: '产品部',
    online: true
  },
  { 
    value: 'Bob', 
    label: 'Bob Smith', 
    avatar: '👨‍💻',
    department: '技术部',
    online: true
  },
  { 
    value: 'Charlie', 
    label: 'Charlie Brown', 
    avatar: '👨‍🎨',
    department: '设计部',
    online: false
  },
  { 
    value: 'David', 
    label: 'David Wilson', 
    avatar: '👨‍🔧',
    department: '运维部',
    online: true
  }
])

// 拼音选项
const pinyinOptions = ref([
  { value: '张三', label: '张三', pinyin: 'zhangsan', initial: 'zs' },
  { value: '李四', label: '李四', pinyin: 'lisi', initial: 'ls' },
  { value: '王五', label: '王五', pinyin: 'wangwu', initial: 'ww' },
  { value: '赵六', label: '赵六', pinyin: 'zhaoliu', initial: 'zl' },
  { value: '钱七', label: '钱七', pinyin: 'qianqi', initial: 'qq' }
])

// 根据前缀获取选项
const getCurrentOptions = computed(() => {
  if (currentPrefix.value === '@') {
    return userOptions.value
  } else if (currentPrefix.value === '#') {
    return topicOptions.value
  }
  return [...userOptions.value, ...topicOptions.value]
})

// 添加事件日志
function addEventLog(event, data = '') {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  eventLogs.value.unshift({
    time,
    event,
    data: typeof data === 'object' ? JSON.stringify(data) : String(data)
  })
  
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 基础搜索
function onBasicSearch(pattern, prefix) {
  console.log('基础搜索:', { pattern, prefix })
}

// 基础选择
function onBasicSelect(option, prefix) {
  console.log('基础选择:', { option, prefix })
  uni.showToast({
    title: `选择了 ${option.label}`,
    icon: 'none',
    duration: 1500
  })
}

// 多前缀搜索
function onMultiPrefixSearch(pattern, prefix) {
  currentPrefix.value = prefix
  console.log('多前缀搜索:', { pattern, prefix })
}

// 异步搜索
function onAsyncSearch(pattern, prefix) {
  searchKeyword.value = pattern
  
  if (!pattern.trim()) {
    asyncOptions.value = []
    return
  }
  
  asyncLoading.value = true
  
  // 模拟异步请求
  setTimeout(() => {
    asyncOptions.value = [
      { value: `${pattern}_user1`, label: `${pattern} 用户1` },
      { value: `${pattern}_user2`, label: `${pattern} 用户2` },
      { value: `${pattern}_user3`, label: `${pattern} 用户3` }
    ]
    asyncLoading.value = false
  }, 1000)
}

// 自定义过滤逻辑
function customFilter(pattern, option) {
  const lowerPattern = pattern.toLowerCase()
  const lowerLabel = option.label.toLowerCase()
  const lowerInitial = option.initial?.toLowerCase() || ''
  const lowerPinyin = option.pinyin?.toLowerCase() || ''
  
  return lowerLabel.includes(lowerPattern) || 
         lowerInitial.includes(lowerPattern) || 
         lowerPinyin.includes(lowerPattern)
}

// 显示所有用户
function showAllUsers() {
  uni.showModal({
    title: '所有用户',
    content: userOptions.value.map(user => user.label).join(', '),
    showCancel: false
  })
}

// 事件处理函数
function onInput(e) {
  addEventLog('input', `值: ${e.detail.value}`)
}

function onFocus(e) {
  addEventLog('focus', '获取焦点')
}

function onBlur(e) {
  addEventLog('blur', '失去焦点')
}

function onSearch(pattern, prefix) {
  addEventLog('search', `搜索: ${pattern}, 前缀: ${prefix}`)
}

function onSelect(option, prefix) {
  addEventLog('select', `选择: ${option.label}, 前缀: ${prefix}`)
}

function onClear() {
  addEventLog('clear', '清空内容')
  uni.showToast({
    title: '已清空',
    icon: 'success',
    duration: 1000
  })
}
</script>

<style scoped>
.demo-container {
  padding: 40rpx;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.demo-header {
  margin-bottom: 60rpx;
  text-align: center;
}

.demo-title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.demo-desc {
  display: block;
  font-size: 28rpx;
  color: #666666;
}

.demo-section {
  margin-bottom: 60rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
}

.section-desc {
  display: block;
  font-size: 28rpx;
  color: #666666;
  margin-bottom: 30rpx;
}

.result-display {
  margin-top: 30rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 8rpx;
  border-left: 4rpx solid #409eff;
}

.result-label {
  font-size: 26rpx;
  color: #666666;
  margin-right: 16rpx;
}

.result-text {
  font-size: 26rpx;
  color: #333333;
  word-break: break-all;
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.size-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.size-label {
  font-size: 28rpx;
  color: #666666;
  font-weight: 500;
}

.prefix-info {
  margin-top: 20rpx;
  padding: 16rpx;
  background-color: #ecf5ff;
  border-radius: 8rpx;
  border: 1rpx solid #b3d8ff;
}

.info-label {
  font-size: 26rpx;
  color: #409eff;
  margin-right: 16rpx;
}

.info-text {
  font-size: 26rpx;
  color: #409eff;
  font-weight: 500;
}

.loading-text {
  color: #409eff;
  font-size: 28rpx;
}

.custom-option {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  margin-right: 24rpx;
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 28rpx;
  color: #333333;
  font-weight: 500;
  line-height: 1.2;
}

.department {
  font-size: 24rpx;
  color: #999999;
  margin-top: 4rpx;
}

.online-status {
  width: 16rpx;
  height: 16rpx;
  color: #67c23a;
  font-size: 16rpx;
}

.filter-tip {
  margin-top: 20rpx;
  padding: 16rpx;
  background-color: #fff7e6;
  border-radius: 8rpx;
  border: 1rpx solid #ffd591;
}

.tip-text {
  font-size: 26rpx;
  color: #fa8c16;
}

.placement-demo {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.placement-item {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.placement-label {
  font-size: 28rpx;
  color: #666666;
  font-weight: 500;
}

.dropdown-header,
.dropdown-footer {
  text-align: center;
}

.header-text {
  font-size: 28rpx;
  color: #409eff;
  font-weight: 500;
}

.footer-text {
  font-size: 26rpx;
  color: #409eff;
  cursor: pointer;
}

.footer-text:active {
  opacity: 0.8;
}

.event-log {
  margin-top: 30rpx;
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
  background-color: #fafafa;
}

.log-title {
  display: block;
  padding: 16rpx 20rpx;
  border-bottom: 1rpx solid #e4e7ed;
  font-size: 28rpx;
  font-weight: 500;
  color: #333333;
  background-color: #f5f7fa;
}

.log-content {
  max-height: 400rpx;
}

.log-item {
  padding: 12rpx 20rpx;
  border-bottom: 1rpx solid #e4e7ed;
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  font-size: 24rpx;
  color: #909399;
  white-space: nowrap;
}

.log-event {
  font-size: 26rpx;
  color: #409eff;
  font-weight: 500;
  white-space: nowrap;
}

.log-data {
  font-size: 24rpx;
  color: #666666;
  word-break: break-all;
  flex: 1;
}
</style>
