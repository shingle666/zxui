<template>
  <view class="page">
    <view class="page-title">快捷入口组件示例</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">默认4列布局，支持图标和文字</view>
      <zx-quick-enter 
        :list="basicList"
        @click="handleClick"
      />
    </view>
    
    <!-- 自定义列数 -->
    <view class="section">
      <view class="section-title">自定义列数</view>
      <view class="section-desc">3列布局</view>
      <zx-quick-enter 
        :list="columnList"
        :column="3"
        @click="handleClick"
      />
    </view>
    
    <!-- 5列布局 -->
    <view class="section">
      <view class="section-title">5列布局</view>
      <zx-quick-enter 
        :list="fiveColumnList"
        :column="5"
        :icon-size="40"
        :text-size="22"
        @click="handleClick"
      />
    </view>
    
    <!-- 使用图片图标 -->
    <view class="section">
      <view class="section-title">使用图片图标</view>
      <view class="section-desc">支持本地图片和网络图片</view>
      <zx-quick-enter 
        :list="imageList"
        :icon-size="60"
        @click="handleClick"
      />
    </view>
    
    <!-- 带徽标 -->
    <view class="section">
      <view class="section-title">带徽标</view>
      <view class="section-desc">支持数字徽标、文字徽标和红点</view>
      <zx-quick-enter 
        :list="badgeList"
        @click="handleClick"
      />
    </view>
    
    <!-- 禁用状态 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="section-desc">部分功能可设置为禁用状态</view>
      <zx-quick-enter 
        :list="disabledList"
        @click="handleClick"
      />
    </view>
    
    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="section-desc">自定义颜色、大小、间距等</view>
      <zx-quick-enter 
        :list="customList"
        :icon-size="56"
        :text-size="26"
        icon-color="#1890ff"
        text-color="#1890ff"
        background-color="#f8f9fa"
        padding="30rpx"
        :gap="25"
        :item-height="180"
        @click="handleClick"
      />
    </view>
    
    <!-- 电商场景 -->
    <view class="section">
      <view class="section-title">电商场景示例</view>
      <view class="section-desc">模拟电商首页快捷入口</view>
      <zx-quick-enter 
        :list="ecommerceList"
        :column="4"
        :icon-size="52"
        :text-size="24"
        background-color="#ffffff"
        padding="25rpx"
        :gap="20"
        :item-height="170"
        @click="handleClick"
      />
    </view>
    
    <!-- 金融场景 -->
    <view class="section">
      <view class="section-title">金融场景示例</view>
      <view class="section-desc">模拟金融APP快捷功能</view>
      <zx-quick-enter 
        :list="financeList"
        :column="3"
        :icon-size="48"
        :text-size="24"
        icon-color="#2c5aa0"
        text-color="#2c5aa0"
        @click="handleClick"
      />
    </view>
    
    <!-- 点击结果显示 -->
    <view class="section" v-if="clickResult">
      <view class="section-title">点击结果</view>
      <view class="click-result">
        <text>点击了：{{ clickResult.text }}</text>
        <text>索引：{{ clickResult.index }}</text>
        <text>ID：{{ clickResult.id }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 点击结果
const clickResult = ref(null)

// 基础列表
const basicList = [
  {
    text: '扫一扫',
    icon: 'scan',
    id: 'scan'
  },
  {
    text: '付款码',
    icon: 'qrcode',
    id: 'pay'
  },
  {
    text: '收款',
    icon: 'money-circle',
    id: 'receive'
  },
  {
    text: '转账',
    icon: 'exchange',
    id: 'transfer'
  }
]

// 3列布局列表
const columnList = [
  {
    text: '我的订单',
    icon: 'order',
    id: 'order'
  },
  {
    text: '我的收藏',
    icon: 'star',
    id: 'favorite'
  },
  {
    text: '购物车',
    icon: 'shopping-cart',
    id: 'cart'
  }
]

// 5列布局列表
const fiveColumnList = [
  {
    text: '首页',
    icon: 'home',
    id: 'home'
  },
  {
    text: '分类',
    icon: 'grid',
    id: 'category'
  },
  {
    text: '搜索',
    icon: 'search',
    id: 'search'
  },
  {
    text: '消息',
    icon: 'message',
    id: 'message'
  },
  {
    text: '我的',
    icon: 'user',
    id: 'profile'
  }
]

// 图片图标列表
const imageList = [
  {
    text: '京东超市',
    image: 'https://img12.360buyimg.com/imagetools/jfs/t1/202336/18/18586/7437/61b832ccE0b13d53e/0b9cab0d5a5c3e6d.png',
    id: 'supermarket'
  },
  {
    text: '京东国际',
    image: 'https://img12.360buyimg.com/imagetools/jfs/t1/123336/18/18586/7437/61b832ccE0b13d53e/0b9cab0d5a5c3e6d.png',
    id: 'international'
  },
  {
    text: '京东生鲜',
    image: 'https://img12.360buyimg.com/imagetools/jfs/t1/145336/18/18586/7437/61b832ccE0b13d53e/0b9cab0d5a5c3e6d.png',
    id: 'fresh'
  },
  {
    text: '京东到家',
    image: 'https://img12.360buyimg.com/imagetools/jfs/t1/167336/18/18586/7437/61b832ccE0b13d53e/0b9cab0d5a5c3e6d.png',
    id: 'home-delivery'
  }
]

// 带徽标列表
const badgeList = [
  {
    text: '消息',
    icon: 'message',
    badge: 5,
    id: 'message'
  },
  {
    text: '通知',
    icon: 'bell',
    badge: 'new',
    badgeColor: '#ff6600',
    id: 'notification'
  },
  {
    text: '红点',
    icon: 'star',
    badgeDot: true,
    id: 'star'
  },
  {
    text: '优惠券',
    icon: 'coupon',
    badge: 99,
    badgeColor: '#ff4444',
    id: 'coupon'
  }
]

// 禁用状态列表
const disabledList = [
  {
    text: '正常功能',
    icon: 'check',
    id: 'normal'
  },
  {
    text: '禁用功能',
    icon: 'close',
    disabled: true,
    id: 'disabled'
  },
  {
    text: '维护中',
    icon: 'setting',
    disabled: true,
    id: 'maintenance'
  },
  {
    text: '即将上线',
    icon: 'time',
    disabled: true,
    id: 'coming-soon'
  }
]

// 自定义样式列表
const customList = [
  {
    text: '自定义颜色',
    icon: 'star',
    iconColor: '#ff4444',
    textColor: '#ff4444',
    id: 'custom-color'
  },
  {
    text: '蓝色主题',
    icon: 'heart',
    iconColor: '#1890ff',
    textColor: '#1890ff',
    id: 'blue-theme'
  },
  {
    text: '绿色主题',
    icon: 'like',
    iconColor: '#52c41a',
    textColor: '#52c41a',
    id: 'green-theme'
  },
  {
    text: '橙色主题',
    icon: 'fire',
    iconColor: '#fa8c16',
    textColor: '#fa8c16',
    id: 'orange-theme'
  }
]

// 电商场景列表
const ecommerceList = [
  {
    text: '京东超市',
    icon: 'shop',
    id: 'supermarket'
  },
  {
    text: '数码电器',
    icon: 'phone',
    id: 'digital'
  },
  {
    text: '京东服饰',
    icon: 'clothes',
    id: 'fashion'
  },
  {
    text: '京东生鲜',
    icon: 'food',
    id: 'fresh'
  },
  {
    text: '京东到家',
    icon: 'home',
    id: 'home-delivery'
  },
  {
    text: '充值缴费',
    icon: 'money',
    id: 'recharge'
  },
  {
    text: '9.9特卖',
    icon: 'tag',
    badge: 'hot',
    badgeColor: '#ff4444',
    id: 'sale'
  },
  {
    text: '领券',
    icon: 'coupon',
    badge: 3,
    id: 'coupon'
  }
]

// 金融场景列表
const financeList = [
  {
    text: '转账',
    icon: 'exchange',
    id: 'transfer'
  },
  {
    text: '收付款',
    icon: 'qrcode',
    id: 'payment'
  },
  {
    text: '信用卡',
    icon: 'card',
    id: 'credit-card'
  },
  {
    text: '理财',
    icon: 'chart',
    id: 'investment'
  },
  {
    text: '贷款',
    icon: 'money-circle',
    id: 'loan'
  },
  {
    text: '保险',
    icon: 'shield',
    id: 'insurance'
  }
]

// 处理点击事件
const handleClick = ({ item, index }) => {
  if (item.disabled) {
    uni.showToast({
      title: '功能暂不可用',
      icon: 'none'
    })
    return
  }
  
  clickResult.value = {
    text: item.text,
    index,
    id: item.id
  }
  
  uni.showToast({
    title: `点击了${item.text}`,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  
  &-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    padding: 30rpx 30rpx 10rpx;
  }
  
  &-desc {
    font-size: 24rpx;
    color: #666;
    padding: 0 30rpx 20rpx;
    line-height: 1.4;
  }
}

.click-result {
  padding: 20rpx 30rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
  margin: 20rpx 30rpx;
  
  text {
    display: block;
    font-size: 24rpx;
    color: #666;
    margin-bottom: 8rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>