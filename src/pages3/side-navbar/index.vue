<template>
  <view class="demo-page">
    <!-- 页面标题 -->
    <zx-navbar title="侧边导航栏" back-icon-color="#000" :border="false" />
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <view class="side-navbar-container">
          <zx-side-navbar>
            <zx-side-navbar-item title="首页" ikey="home" @click="handleItemClick" />
            <zx-side-navbar-item title="分类" ikey="category" @click="handleItemClick" />
            <zx-side-navbar-item title="购物车" ikey="cart" @click="handleItemClick" />
            <zx-side-navbar-item title="我的" ikey="profile" @click="handleItemClick" />
          </zx-side-navbar>
        </view>
      </view>
    </view>

    <!-- 自定义缩进 -->
    <view class="demo-section">
      <view class="demo-title">自定义缩进</view>
      <view class="demo-content">
        <view class="side-navbar-container">
          <zx-side-navbar :offset="30">
            <zx-side-navbar-item title="一级菜单" ikey="level1" @click="handleItemClick" />
            <zx-side-navbar-item title="二级菜单" ikey="level2" @click="handleItemClick" />
            <zx-side-navbar-item title="三级菜单" ikey="level3" @click="handleItemClick" />
          </zx-side-navbar>
        </view>
      </view>
    </view>

    <!-- 多级导航 -->
    <view class="demo-section">
      <view class="demo-title">多级导航示例</view>
      <view class="demo-content">
        <view class="side-navbar-container">
          <zx-side-navbar :offset="20">
            <zx-side-navbar-item 
              v-for="item in navItems" 
              :key="item.ikey"
              :title="item.title" 
              :ikey="item.ikey" 
              @click="handleNavClick(item)"
            />
          </zx-side-navbar>
        </view>
      </view>
    </view>

    <!-- 动态数据 -->
    <view class="demo-section">
      <view class="demo-title">动态数据</view>
      <view class="demo-content">
        <view class="demo-buttons">
          <zx-button type="primary" size="small" @click="addNavItem">添加导航</zx-button>
          <zx-button type="danger" size="small" @click="removeNavItem">删除导航</zx-button>
        </view>
        <view class="side-navbar-container">
          <zx-side-navbar>
            <zx-side-navbar-item 
              v-for="item in dynamicItems" 
              :key="item.ikey"
              :title="item.title" 
              :ikey="item.ikey" 
              @click="handleDynamicClick(item)"
            />
          </zx-side-navbar>
        </view>
      </view>
    </view>

    <!-- 事件处理 -->
    <view class="demo-section">
      <view class="demo-title">事件处理</view>
      <view class="demo-content">
        <view class="event-log">
          <text class="event-title">点击日志：</text>
          <text class="event-text">{{ clickLog }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 响应式数据
const clickLog = ref('暂无点击记录')
const dynamicItems = ref([
  { title: '动态项目1', ikey: 'dynamic1' },
  { title: '动态项目2', ikey: 'dynamic2' }
])

// 多级导航数据
const navItems = reactive([
  { title: '电子产品', ikey: 'electronics' },
  { title: '　手机数码', ikey: 'mobile' },
  { title: '　　智能手机', ikey: 'smartphone' },
  { title: '　　平板电脑', ikey: 'tablet' },
  { title: '　电脑办公', ikey: 'computer' },
  { title: '　　笔记本', ikey: 'laptop' },
  { title: '　　台式机', ikey: 'desktop' },
  { title: '服装鞋帽', ikey: 'clothing' },
  { title: '　男装', ikey: 'menswear' },
  { title: '　女装', ikey: 'womenswear' },
  { title: '　运动鞋', ikey: 'sneakers' }
])

// 事件处理函数
function handleItemClick(event) {
  clickLog.value = `基础导航被点击`
  console.log('基础导航点击事件:', event)
}

function handleNavClick(item) {
  clickLog.value = `点击了: ${item.title} (${item.ikey})`
  console.log('多级导航点击:', item)
}

function handleDynamicClick(item) {
  clickLog.value = `动态导航点击: ${item.title}`
  console.log('动态导航点击:', item)
}

// 动态操作函数
function addNavItem() {
  const newIndex = dynamicItems.value.length + 1
  dynamicItems.value.push({
    title: `新增项目${newIndex}`,
    ikey: `new${newIndex}`
  })
  clickLog.value = `添加了新的导航项目${newIndex}`
}

function removeNavItem() {
  if (dynamicItems.value.length > 0) {
    const removed = dynamicItems.value.pop()
    clickLog.value = `删除了导航项目: ${removed.title}`
  } else {
    clickLog.value = '没有可删除的项目了'
  }
}
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 40rpx;
  background-color: #fff;
}

.demo-title {
  padding: 30rpx;
  font-size: 32rpx;
  font-weight: 500;
  color: #323233;
  border-bottom: 1rpx solid #ebedf0;
}

.demo-content {
  padding: 30rpx;
}

.side-navbar-container {
  height: 400rpx;
  border: 1rpx solid #ebedf0;
  border-radius: 12rpx;
  overflow: hidden;
}

.demo-buttons {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.event-log {
  padding: 30rpx;
  background-color: #f7f8fa;
  border-radius: 12rpx;
  border: 1rpx solid #ebedf0;
}

.event-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #646566;
}

.event-text {
  font-size: 28rpx;
  color: #323233;
  margin-left: 20rpx;
}
</style>