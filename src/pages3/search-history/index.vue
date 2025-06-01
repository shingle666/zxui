<template>
  <view class="page">
    <zx-navbar title="SearchHistory 搜索历史" />
    
    <view class="demo-section">
      <zx-section title="基础用法" desc="展示基本的搜索历史功能">
        <view class="demo-block">
          <zx-search-history 
            v-model="basicHistory"
            @item-click="onItemClick"
            @item-delete="onItemDelete"
            @clear-all="onClearAll"
          />
        </view>
      </zx-section>
      
      <zx-section title="自定义样式" desc="自定义标题、图标和颜色">
        <view class="demo-block">
          <zx-search-history 
            v-model="customHistory"
            title="最近搜索"
            title-icon="time"
            title-color="#007aff"
            clear-text="全部清除"
            clear-icon="trash"
            item-icon="magnifying-glass"
            item-text-color="#333"
            highlight-color="#007aff"
            :keyword="searchKeyword"
            @item-click="onItemClick"
          />
        </view>
      </zx-section>
      
      <zx-section title="限制显示数量" desc="最多显示5条历史记录">
        <view class="demo-block">
          <zx-search-history 
            v-model="limitHistory"
            :max-count="5"
            title="搜索记录（最多5条）"
            @item-click="onItemClick"
          />
        </view>
      </zx-section>
      
      <zx-section title="对象数据格式" desc="使用对象格式的历史数据">
        <view class="demo-block">
          <zx-search-history 
            v-model="objectHistory"
            :field-names="{ text: 'keyword', value: 'id' }"
            title="搜索记录"
            @item-click="onObjectItemClick"
          />
        </view>
      </zx-section>
      
      <zx-section title="禁用删除功能" desc="隐藏删除按钮和清空按钮">
        <view class="demo-block">
          <zx-search-history 
            v-model="readonlyHistory"
            :show-delete="false"
            :show-clear="false"
            title="只读历史记录"
            @item-click="onItemClick"
          />
        </view>
      </zx-section>
      
      <zx-section title="关键词高亮" desc="高亮显示匹配的关键词">
        <view class="demo-block">
          <view class="search-input">
            <zx-input 
              v-model="searchKeyword"
              placeholder="输入关键词查看高亮效果"
              clearable
            />
          </view>
          <zx-search-history 
            v-model="highlightHistory"
            :keyword="searchKeyword"
            :highlight-keyword="true"
            highlight-color="#ff6b35"
            title="高亮搜索"
            @item-click="onItemClick"
          />
        </view>
      </zx-section>
      
      <zx-section title="空状态" desc="没有历史记录时的显示">
        <view class="demo-block">
          <zx-search-history 
            v-model="emptyHistory"
            empty-text="还没有搜索记录哦~"
            empty-icon="search"
            title="空状态演示"
          />
        </view>
      </zx-section>
      
      <zx-section title="自定义项目高度" desc="调整历史记录项的高度">
        <view class="demo-block">
          <zx-search-history 
            v-model="heightHistory"
            :item-height="120"
            item-padding="0 40rpx"
            title="大尺寸项目"
            @item-click="onItemClick"
          />
        </view>
      </zx-section>
    </view>
    
    <!-- 操作按钮 -->
    <view class="action-buttons">
      <zx-button type="primary" @click="addRandomHistory">添加随机历史</zx-button>
      <zx-button type="warning" @click="clearAllHistory">清空所有历史</zx-button>
    </view>
    
    <!-- 事件日志 -->
    <view class="event-log" v-if="eventLogs.length > 0">
      <zx-section title="事件日志">
        <view class="log-list">
          <view 
            v-for="(log, index) in eventLogs" 
            :key="index" 
            class="log-item"
          >
            <text class="log-time">{{ log.time }}</text>
            <text class="log-content">{{ log.content }}</text>
          </view>
        </view>
        <zx-button size="small" @click="clearLogs">清空日志</zx-button>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础历史数据
const basicHistory = ref([
  '手机',
  '电脑',
  '耳机',
  '键盘',
  '鼠标'
])

// 自定义样式历史数据
const customHistory = ref([
  'iPhone 15',
  'MacBook Pro',
  'AirPods Pro',
  'iPad Air',
  'Apple Watch'
])

// 限制数量历史数据
const limitHistory = ref([
  '笔记本电脑',
  '台式机',
  '显示器',
  '机械键盘',
  '游戏鼠标',
  '音响',
  '摄像头',
  '麦克风'
])

// 对象格式历史数据
const objectHistory = ref([
  { id: 1, keyword: '智能手机', category: '数码' },
  { id: 2, keyword: '运动鞋', category: '服装' },
  { id: 3, keyword: '咖啡机', category: '家电' },
  { id: 4, keyword: '护肤品', category: '美妆' }
])

// 只读历史数据
const readonlyHistory = ref([
  '热门推荐',
  '新品上市',
  '限时优惠',
  '品牌专区'
])

// 高亮历史数据
const highlightHistory = ref([
  '苹果手机',
  '华为手机',
  '小米手机',
  '三星手机',
  '一加手机'
])

// 空历史数据
const emptyHistory = ref([])

// 自定义高度历史数据
const heightHistory = ref([
  '大屏电视',
  '智能冰箱',
  '洗衣机',
  '空调'
])

// 搜索关键词
const searchKeyword = ref('')

// 事件日志
const eventLogs = ref([])

// 随机历史词汇
const randomWords = [
  '笔记本', '平板电脑', '智能手表', '蓝牙耳机', '充电器',
  '数据线', '移动电源', '音响', '键盘', '鼠标',
  '显示器', '摄像头', '麦克风', '路由器', '硬盘',
  '内存卡', 'U盘', '打印机', '扫描仪', '投影仪'
]

// 添加日志
const addLog = (content) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  eventLogs.value.unshift({ time, content })
  
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 处理项目点击
const onItemClick = ({ item, index }) => {
  addLog(`点击了历史记录: ${typeof item === 'string' ? item : JSON.stringify(item)}`)
  uni.showToast({
    title: `选择了: ${typeof item === 'string' ? item : item.keyword || item.text}`,
    icon: 'none'
  })
}

// 处理对象项目点击
const onObjectItemClick = ({ item, index }) => {
  addLog(`点击了对象历史记录: ${item.keyword} (ID: ${item.id})`)
  uni.showToast({
    title: `选择了: ${item.keyword}`,
    icon: 'none'
  })
}

// 处理项目删除
const onItemDelete = ({ item, index }) => {
  addLog(`删除了历史记录: ${typeof item === 'string' ? item : JSON.stringify(item)}`)
  uni.showToast({
    title: '删除成功',
    icon: 'success'
  })
}

// 处理清空所有
const onClearAll = () => {
  addLog('清空了所有历史记录')
  uni.showToast({
    title: '已清空',
    icon: 'success'
  })
}

// 添加随机历史
const addRandomHistory = () => {
  const randomWord = randomWords[Math.floor(Math.random() * randomWords.length)]
  
  // 随机选择一个历史列表添加
  const lists = [basicHistory, customHistory, limitHistory, highlightHistory, heightHistory]
  const randomList = lists[Math.floor(Math.random() * lists.length)]
  
  if (!randomList.value.includes(randomWord)) {
    randomList.value.unshift(randomWord)
    addLog(`添加了随机历史记录: ${randomWord}`)
  }
}

// 清空所有历史
const clearAllHistory = () => {
  basicHistory.value = []
  customHistory.value = []
  limitHistory.value = []
  objectHistory.value = []
  highlightHistory.value = []
  heightHistory.value = []
  
  addLog('清空了所有演示历史记录')
  uni.showToast({
    title: '已清空所有历史',
    icon: 'success'
  })
}

// 清空日志
const clearLogs = () => {
  eventLogs.value = []
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.demo-section {
  padding: 20rpx;
}

.demo-block {
  background-color: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
}

.search-input {
  padding: 20rpx;
  border-bottom: 1px solid #f0f0f0;
}

.action-buttons {
  padding: 40rpx 20rpx;
  display: flex;
  gap: 20rpx;
  
  .zx-button {
    flex: 1;
  }
}

.event-log {
  padding: 20rpx;
  
  .log-list {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;
    max-height: 400rpx;
    overflow-y: auto;
  }
  
  .log-item {
    display: flex;
    align-items: flex-start;
    gap: 20rpx;
    padding: 10rpx 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .log-time {
    flex-shrink: 0;
    font-size: 24rpx;
    color: #999999;
    font-family: monospace;
  }
  
  .log-content {
    flex: 1;
    font-size: 26rpx;
    color: #333333;
    line-height: 1.4;
  }
}
</style>