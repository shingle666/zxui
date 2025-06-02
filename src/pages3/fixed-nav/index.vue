<template>
  <view class="container">
    <view class="header">
      <view class="title">悬浮导航</view>
      <view class="subtitle">悬浮收起体验交互，用于快捷导航</view>
    </view>

    <!-- 演示切换按钮 -->
    <view style="display: flex; flex-wrap: wrap; gap: 20rpx; margin-bottom: 40rpx;">
      <button 
        v-for="item in demoList" 
        :key="item.value" 
        size="mini" 
        :type="currentDemo === item.value ? 'primary' : 'default'" 
        @click="currentDemo = item.value"
      >
        {{ item.label }}
      </button>
    </view>

    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">右侧悬浮（默认）</view>
          <view class="item-desc">点击按钮展开/收起导航列表</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showBasic = !showBasic">
              {{ showBasic ? '隐藏' : '显示' }}导航
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 左侧悬浮 -->
    <view class="section">
      <view class="section-title">左侧悬浮</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">左侧悬浮导航</view>
          <view class="item-desc">设置 type="left" 可以让导航在左侧显示</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showLeft = !showLeft">
              {{ showLeft ? '隐藏' : '显示' }}左侧导航
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 取消背景遮罩 -->
    <view class="section">
      <view class="section-title">取消背景遮罩</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">无遮罩层</view>
          <view class="item-desc">设置 :overlay="false" 可以取消背景遮罩</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showNoOverlay = !showNoOverlay">
              {{ showNoOverlay ? '隐藏' : '显示' }}无遮罩导航
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">自定义颜色和文案</view>
          <view class="item-desc">可以自定义激活颜色、按钮文案等</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showCustom = !showCustom">
              {{ showCustom ? '隐藏' : '显示' }}自定义导航
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义位置 -->
    <view class="section">
      <view class="section-title">自定义位置</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">自定义垂直位置</view>
          <view class="item-desc">通过 position 属性设置导航的垂直位置</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showPosition = !showPosition">
              {{ showPosition ? '隐藏' : '显示' }}定位导航
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义按钮 -->
    <view class="section">
      <view class="section-title">自定义按钮</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">自定义按钮内容</view>
          <view class="item-desc">使用 #btn 插槽自定义按钮样式</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showCustomBtn = !showCustomBtn">
              {{ showCustomBtn ? '隐藏' : '显示' }}自定义按钮
            </button>
          </view>
        </view>
      </view>
    </view>

    <!-- 事件处理 -->
    <view class="section">
      <view class="section-title">事件处理</view>
      <view class="demo-box">
        <view class="demo-item">
          <view class="item-title">点击事件</view>
          <view class="item-desc">监听导航项点击事件</view>
          <view class="demo-actions">
            <button size="mini" type="primary" @click="showEvent = !showEvent">
              {{ showEvent ? '隐藏' : '显示' }}事件导航
            </button>
          </view>
          <view v-if="selectedItem" class="event-result">
            <text>最后点击: {{ selectedItem.text }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 长内容区域，用于演示滚动 -->
    <view class="content-area">
      <view class="content-title">页面内容区域</view>
      <view class="content-text">
        这里是页面的主要内容区域。悬浮导航会固定在页面右侧（或左侧），不会随页面滚动而移动。
        您可以滚动页面来测试悬浮导航的固定效果。
      </view>
      
      <view v-for="i in 20" :key="i" class="content-item">
        <view class="item-number">{{ i }}</view>
        <view class="item-content">
          <view class="item-title">内容项 {{ i }}</view>
          <view class="item-desc">
            这是第 {{ i }} 个内容项的描述信息。悬浮导航组件可以帮助用户快速访问重要功能，
            提升用户体验。组件支持多种自定义选项，可以根据实际需求进行配置。
          </view>
        </view>
      </view>
    </view>

    <!-- 悬浮导航组件 -->
    <!-- 基础用法 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'basic'"
      v-model:visible="showBasic" 
      :nav-list="navList"
      @selected="onSelected"
    />

    <!-- 左侧悬浮 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'left'"
      v-model:visible="showLeft" 
      :nav-list="navList"
      type="left"
      @selected="onSelected"
    />

    <!-- 无遮罩 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'no-overlay'"
      v-model:visible="showNoOverlay" 
      :nav-list="navList"
      :overlay="false"
      @selected="onSelected"
    />

    <!-- 自定义样式 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'custom'"
      v-model:visible="showCustom" 
      :nav-list="navList"
      active-color="#2979ff"
      active-text="收起菜单"
      un-active-text="展开菜单"
      @selected="onSelected"
    />

    <!-- 自定义位置 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'position'"
      v-model:visible="showPosition" 
      :nav-list="navList"
      :position="{ top: '200rpx', bottom: 'auto' }"
      @selected="onSelected"
    />

    <!-- 自定义按钮 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'custom-btn'"
      v-model:visible="showCustomBtn" 
      :nav-list="navList"
      @selected="onSelected"
    >
      <template #btn>
        <view class="custom-btn">
          <text class="custom-icon">☰</text>
          <text class="custom-text">{{ showCustomBtn ? '收起' : '菜单' }}</text>
        </view>
      </template>
    </zx-fixed-nav>

    <!-- 事件处理 -->
    <zx-fixed-nav 
      v-if="currentDemo === 'event'"
      v-model:visible="showEvent" 
      :nav-list="navListWithBadge"
      @selected="onSelected"
    />
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ZxFixedNav from '@/components/zx-fixed-nav/zx-fixed-nav.vue'

// 演示列表
const demoList = ref([
  { label: '基础用法', value: 'basic' },
  { label: '左侧悬浮', value: 'left' },
  { label: '无遮罩', value: 'no-overlay' },
  { label: '自定义样式', value: 'custom' },
  { label: '自定义位置', value: 'position' },
  { label: '自定义按钮', value: 'custom-btn' },
  { label: '事件处理', value: 'event' }
])

// 当前演示
const currentDemo = ref('basic')

// 显示状态
const showBasic = ref(false)
const showLeft = ref(false)
const showNoOverlay = ref(false)
const showCustom = ref(false)
const showPosition = ref(false)
const showCustomBtn = ref(false)
const showEvent = ref(false)

// 选中的项目
const selectedItem = ref(null)

// 导航列表数据
const navList = ref([
  {
    id: 1,
    text: '首页',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEyVjIwSDIxVjEySDI0TDEyIDNMMCAxMkgzVjIwSDEwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K'
  },
  {
    id: 2,
    text: '分类',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkg5VjExSDRWNlpNMTEgNkgxNlYxMUgxMVY2Wk0xOCA2SDIzVjExSDE4VjZaTTQgMTNIOVYxOEg0VjEzWk0xMSAxM0gxNlYxOEgxMVYxM1pNMTggMTNIMjNWMThIMThWMTNaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo='
  },
  {
    id: 3,
    text: '购物车',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMThDNS45IDIwIDUuOSAyMCA3IDIwQzguMSAyMCA4LjEgMjAgNyAxOFpNMSAyVjRIMy4yTDYuNiAxMS41OUw1LjI1IDE0QzUuMDkgMTQuMzIgNSAxNC42NSA1IDE1QzUgMTYuMSA1LjkgMTcgNyAxN0gxOVYxNUg3LjQyQzcuMjggMTUgNy4xNyAxNC44OSA3LjE3IDE0Ljc1TDcuMiAxNC42M0w4LjEgMTNIMTUuNTVDMTYuMyAxMyAxNi45NiAxMi41OSAxNy4zIDExLjk3TDIwLjg4IDVINUwyIDJIMVpNMTcgMThDMTUuOSAyMCAxNS45IDIwIDE3IDIwQzE4LjEgMjAgMTguMSAyMCAxNyAxOFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg=='
  },
  {
    id: 4,
    text: '我的',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIxIDEyIDE2IDEwLjIxIDE2IDhDMTYgNS43OSAxNC4yMSA0IDEyIDRDOS43OSA0IDggNS43OSA4IDhDOCAxMC4yMSA5Ljc5IDEyIDEyIDEyWk0xMiAxNEM5LjMzIDE0IDQgMTUuMzQgNCAyMFYyMkgyMFYyMEMyMCAxNS4zNCAxNC42NyAxNCAxMiAxNFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg=='
  }
])

// 带徽章的导航列表
const navListWithBadge = ref([
  {
    id: 1,
    text: '首页',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEyVjIwSDIxVjEySDI0TDEyIDNMMCAxMkgzVjIwSDEwWiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K'
  },
  {
    id: 2,
    text: '消息',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkg5VjExSDRWNlpNMTEgNkgxNlYxMUgxMVY2Wk0xOCA2SDIzVjExSDE4VjZaTTQgMTNIOVYxOEg0VjEzWk0xMSAxM0gxNlYxOEgxMVYxM1pNMTggMTNIMjNWMThIMThWMTNaIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPgo=',
    num: 3
  },
  {
    id: 3,
    text: '购物车',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMThDNS45IDIwIDUuOSAyMCA3IDIwQzguMSAyMCA4LjEgMjAgNyAxOFpNMSAyVjRIMy4yTDYuNiAxMS41OUw1LjI1IDE0QzUuMDkgMTQuMzIgNSAxNC42NSA1IDE1QzUgMTYuMSA1LjkgMTcgNyAxN0gxOVYxNUg3LjQyQzcuMjggMTUgNy4xNyAxNC44OSA3LjE3IDE0Ljc1TDcuMiAxNC42M0w4LjEgMTNIMTUuNTVDMTYuMyAxMyAxNi45NiAxMi41OSAxNy4zIDExLjk3TDIwLjg4IDVINUwyIDJIMVpNMTcgMThDMTUuOSAyMCAxNS45IDIwIDE3IDIwQzE4LjEgMjAgMTguMSAyMCAxNyAxOFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg==',
    num: 99
  },
  {
    id: 4,
    text: '我的',
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIxIDEyIDE2IDEwLjIxIDE2IDhDMTYgNS43OSAxNC4yMSA0IDEyIDRDOS43OSA0IDggNS43OSA4IDhDOCAxMC4yMSA5Ljc5IDEyIDEyIDEyWk0xMiAxNEM5LjMzIDE0IDQgMTUuMzQgNCAyMFYyMkgyMFYyMEMyMCAxNS4zNCAxNC42NyAxNCAxMiAxNFoiIGZpbGw9IiMzMzMzMzMiLz4KPC9zdmc+Cg=='
  }
])

// 事件处理
const onSelected = ({ item, event }) => {
  selectedItem.value = item
  console.log('选中导航项:', item)
  
  // 模拟页面跳转
  uni.showToast({
    title: `点击了${item.text}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx;
  padding-bottom: 200rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .subtitle {
    font-size: 28rpx;
    color: #666;
    line-height: 1.5;
  }
}

.section {
  margin-bottom: 60rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    padding-left: 20rpx;
    border-left: 8rpx solid #007aff;
  }
}

.demo-box {
  background: #fff;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.demo-item {
  .item-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .item-desc {
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 30rpx;
  }
  
  .demo-actions {
    display: flex;
    gap: 20rpx;
  }
}

.event-result {
  margin-top: 20rpx;
  padding: 20rpx;
  background: #f5f5f5;
  border-radius: 10rpx;
  
  text {
    font-size: 24rpx;
    color: #333;
  }
}

.content-area {
  margin-top: 80rpx;
  
  .content-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    text-align: center;
  }
  
  .content-text {
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 40rpx;
    padding: 30rpx;
    background: #f8f9fa;
    border-radius: 20rpx;
  }
}

.content-item {
  display: flex;
  align-items: flex-start;
  padding: 30rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
  
  .item-number {
    width: 60rpx;
    height: 60rpx;
    background: #007aff;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    font-weight: bold;
    margin-right: 30rpx;
    flex-shrink: 0;
  }
  
  .item-content {
    flex: 1;
    
    .item-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
    }
    
    .item-desc {
      font-size: 24rpx;
      color: #666;
      line-height: 1.6;
    }
  }
}

// 自定义按钮样式
.custom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .custom-icon {
    font-size: 32rpx;
    color: #fff;
    margin-right: 10rpx;
  }
  
  .custom-text {
    font-size: 20rpx;
    color: #fff;
    line-height: 26rpx;
  }
}
</style>