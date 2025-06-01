<template>
  <view class="demo-page">
    <zx-navbar title="横向滚动 HorizontalScrolling" />
    
    <view class="demo-section">
      <view class="demo-title">基本用法</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">遮罩层位置</view>
      <view class="demo-subtitle">左侧遮罩</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          height="120px" 
          mask-position="left"
          @click-mask="handleMaskClick"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
      
      <view class="demo-subtitle">右侧遮罩（默认）</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          height="120px" 
          mask-position="right"
          @click-mask="handleMaskClick"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">遮罩层阴影样式</view>
      
      <view class="demo-subtitle">阴影（shadow）</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px" mask-shadow-type="shadow">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
      
      <view class="demo-subtitle">有三角箭头阴影（triangle）</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px" mask-shadow-type="triangle">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
      
      <view class="demo-subtitle">半透明阴影（transparent）</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px" mask-shadow-type="transparent">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
      
      <view class="demo-subtitle">无阴影（none）</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px" mask-shadow-type="none">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">遮罩层半透明阴影样式</view>
      <view class="demo-subtitle">设置遮罩距离</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          height="120px" 
          mask-shadow-type="transparent"
          mask-distance="20px"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">自定义遮罩内容</view>
      
      <view class="demo-subtitle">通过属性自定义</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          height="120px" 
          mask-content="<div style='color: #ff6600; font-weight: bold;'>查看更多</div>"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
      
      <view class="demo-subtitle">通过插槽自定义</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px">
          <template #maskContent>
            <view class="custom-mask">
              <zx-icon name="arrow-right" size="24px" color="#007aff" />
              <text class="custom-mask-text">查看全部</text>
            </view>
          </template>
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">无遮罩</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="120px" :show-mask="false">
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">事件演示</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          height="120px"
          @click-mask="handleMaskClick"
          @scroll-right="handleScrollRight"
          @scroll-change="handleScrollChange"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
        
        <view class="event-log">
          <text class="event-title">事件日志：</text>
          <view class="event-item" v-for="(log, index) in eventLogs" :key="index">
            <text>{{ log }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">方法调用</view>
      <view class="demo-content">
        <zx-horizontal-scrolling 
          ref="scrollRef"
          height="120px"
        >
          <view class="scroll-item" v-for="item in basicList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <text>{{ item.title }}</text>
          </view>
        </zx-horizontal-scrolling>
        
        <view class="method-buttons">
          <zx-button size="small" @click="scrollToPosition">滚动到200px</zx-button>
          <zx-button size="small" @click="getCurrentScroll">获取滚动距离</zx-button>
        </view>
        
        <view class="method-result" v-if="scrollResult">
          <text>当前滚动距离：{{ scrollResult }}px</text>
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">商品列表示例</view>
      <view class="demo-content">
        <zx-horizontal-scrolling height="160px" gap="16px">
          <view class="product-item" v-for="item in productList" :key="item.id">
            <image :src="item.image" mode="aspectFill" />
            <view class="product-info">
              <text class="product-title">{{ item.title }}</text>
              <text class="product-price">¥{{ item.price }}</text>
            </view>
          </view>
        </zx-horizontal-scrolling>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础数据
const basicList = ref([
  { id: 1, image: '/static/demo/product1.jpg', title: '商品1' },
  { id: 2, image: '/static/demo/product2.jpg', title: '商品2' },
  { id: 3, image: '/static/demo/product3.jpg', title: '商品3' },
  { id: 4, image: '/static/demo/product4.jpg', title: '商品4' },
  { id: 5, image: '/static/demo/product5.jpg', title: '商品5' },
  { id: 6, image: '/static/demo/product6.jpg', title: '商品6' },
  { id: 7, image: '/static/demo/product7.jpg', title: '商品7' },
  { id: 8, image: '/static/demo/product8.jpg', title: '商品8' }
])

// 商品列表数据
const productList = ref([
  { id: 1, image: '/static/demo/product1.jpg', title: 'iPhone 15 Pro', price: '7999' },
  { id: 2, image: '/static/demo/product2.jpg', title: 'MacBook Pro', price: '12999' },
  { id: 3, image: '/static/demo/product3.jpg', title: 'iPad Air', price: '4399' },
  { id: 4, image: '/static/demo/product4.jpg', title: 'Apple Watch', price: '2999' },
  { id: 5, image: '/static/demo/product5.jpg', title: 'AirPods Pro', price: '1899' },
  { id: 6, image: '/static/demo/product6.jpg', title: 'iMac', price: '9999' }
])

// 事件日志
const eventLogs = ref([])

// 滚动结果
const scrollResult = ref('')

// 组件引用
const scrollRef = ref()

// 事件处理
const handleMaskClick = () => {
  const log = `${new Date().toLocaleTimeString()}: 点击了遮罩层`
  eventLogs.value.unshift(log)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
  
  uni.showToast({
    title: '点击了遮罩层',
    icon: 'none'
  })
}

const handleScrollRight = () => {
  const log = `${new Date().toLocaleTimeString()}: 滚动到了右边`
  eventLogs.value.unshift(log)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

const handleScrollChange = (scrollLeft) => {
  const log = `${new Date().toLocaleTimeString()}: 滚动距离 ${scrollLeft}px`
  eventLogs.value.unshift(log)
  if (eventLogs.value.length > 5) {
    eventLogs.value.pop()
  }
}

// 方法调用
const scrollToPosition = () => {
  if (scrollRef.value) {
    scrollRef.value.scrollTo(200)
    uni.showToast({
      title: '滚动到200px',
      icon: 'none'
    })
  }
}

const getCurrentScroll = () => {
  if (scrollRef.value) {
    const scrollLeft = scrollRef.value.getScrollLeft()
    scrollResult.value = scrollLeft
    uni.showToast({
      title: `当前滚动距离：${scrollLeft}px`,
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 32px;
  background-color: #fff;
}

.demo-title {
  padding: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #eee;
}

.demo-subtitle {
  padding: 12px 16px 8px;
  font-size: 14px;
  color: #666;
  background-color: #fafafa;
}

.demo-content {
  padding: 16px;
}

// 基础滚动项样式
.scroll-item {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  
  image {
    width: 60px;
    height: 60px;
    border-radius: 6px;
    background-color: #e0e0e0;
  }
  
  text {
    margin-top: 8px;
    font-size: 12px;
    color: #666;
    text-align: center;
  }
}

// 自定义遮罩样式
.custom-mask {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  &-text {
    margin-top: 8px;
    font-size: 12px;
    color: #007aff;
    font-weight: bold;
  }
}

// 事件日志样式
.event-log {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f8f8;
  border-radius: 8px;
  
  .event-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }
  
  .event-item {
    margin-bottom: 4px;
    
    text {
      font-size: 12px;
      color: #666;
    }
  }
}

// 方法按钮样式
.method-buttons {
  margin-top: 16px;
  display: flex;
  gap: 12px;
}

.method-result {
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #e8f4fd;
  border-radius: 4px;
  
  text {
    font-size: 14px;
    color: #007aff;
  }
}

// 商品项样式
.product-item {
  width: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  image {
    width: 120px;
    height: 120px;
    background-color: #e0e0e0;
  }
  
  .product-info {
    padding: 8px;
    
    .product-title {
      font-size: 12px;
      color: #333;
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .product-price {
      font-size: 14px;
      color: #ff6600;
      font-weight: bold;
    }
  }
}
</style>