<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">通过 rate 属性设置数值，大于0时箭头向上，小于0时箭头向下。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :sync-text-color="false" :rate="1" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :sync-text-color="false" :rate="-0.2535" />
            </view>
          </view>
        </view>

        <!-- 改变文字颜色 -->
        <view class="demo-section">
          <view class="demo-title">改变文字颜色</view>
          <view class="demo-desc">设置 sync-text-color 为 true 可以让文字颜色跟随箭头颜色变化。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :rate="10.2365" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :rate="-0.2535" />
            </view>
          </view>
        </view>

        <!-- 指定小数位 -->
        <view class="demo-section">
          <view class="demo-title">指定小数位</view>
          <view class="demo-desc">通过 digits 属性指定小数位数。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :digits="0" :rate="10.2365" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :digits="0" :rate="-0.2535" />
            </view>
          </view>
        </view>

        <!-- 箭头在前面 -->
        <view class="demo-section">
          <view class="demo-title">箭头在前面</view>
          <view class="demo-desc">设置 arrow-left 属性可以让箭头显示在数字前面。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow arrow-left :rate="0.2535" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow arrow-left :rate="-0.2535" />
            </view>
          </view>
        </view>

        <!-- 显示正负号 -->
        <view class="demo-section">
          <view class="demo-title">显示正负号</view>
          <view class="demo-desc">设置 show-sign 属性可以显示正负号。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow show-sign :rate="1" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow show-sign :rate="-0.2535" />
            </view>
          </view>
        </view>

        <!-- 是否展示0 -->
        <view class="demo-section">
          <view class="demo-title">是否展示0</view>
          <view class="demo-desc">通过 show-zero 属性控制是否显示0值。</view>
          <view class="demo-block">
            <view class="demo-item">
              <text class="demo-label">不显示0：</text>
              <zx-trend-arrow show-sign :rate="0" />
            </view>
            <view class="demo-item">
              <text class="demo-label">显示0：</text>
              <zx-trend-arrow show-sign show-zero :rate="0" />
            </view>
          </view>
        </view>

        <!-- 自定义颜色 -->
        <view class="demo-section">
          <view class="demo-title">自定义颜色</view>
          <view class="demo-desc">可以通过 rise-color、drop-color、text-color 属性自定义颜色。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :rate="10.2365" rise-color="rgb(73,143,242)" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :rate="-0.2535" show-sign drop-color="rgb(255, 190, 13)" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow
                :sync-text-color="false"
                show-sign
                :rate="-0.2535"
                text-color="rgb(39,197,48)"
                drop-color="rgb(255, 190, 13)"
              />
            </view>
          </view>
        </view>

        <!-- 自定义图标 -->
        <view class="demo-section">
          <view class="demo-title">自定义图标</view>
          <view class="demo-desc">通过插槽可以自定义箭头图标。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :rate="10.2365">
                <template #upIcon>
                  <text class="custom-icon" style="color: blue;">↗</text>
                </template>
              </zx-trend-arrow>
            </view>
            <view class="demo-item">
              <zx-trend-arrow :rate="-10.2365">
                <template #downIcon>
                  <text class="custom-icon" style="color: red;">↘</text>
                </template>
              </zx-trend-arrow>
            </view>
          </view>
        </view>

        <!-- 不同字体大小 -->
        <view class="demo-section">
          <view class="demo-title">不同字体大小</view>
          <view class="demo-desc">通过 font-size 属性设置字体大小。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :rate="10.2365" font-size="12px" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :rate="-0.2535" font-size="16px" />
            </view>
            <view class="demo-item">
              <zx-trend-arrow :rate="5.68" font-size="20px" />
            </view>
          </view>
        </view>

        <!-- 点击事件 -->
        <view class="demo-section">
          <view class="demo-title">点击事件</view>
          <view class="demo-desc">组件支持点击事件。</view>
          <view class="demo-block">
            <view class="demo-item">
              <zx-trend-arrow :rate="clickCount" @click="handleClick" />
              <text class="demo-tip">点击次数：{{ clickCount }}</text>
            </view>
          </view>
        </view>

        <!-- 综合示例 -->
        <view class="demo-section">
          <view class="demo-title">综合示例</view>
          <view class="demo-desc">模拟真实业务场景的使用示例。</view>
          <view class="demo-block">
            <view class="stats-card">
              <view class="stats-item">
                <text class="stats-label">今日销售额</text>
                <view class="stats-value">
                  <text class="stats-number">¥12,345</text>
                  <zx-trend-arrow :rate="8.5" show-sign />
                </view>
              </view>
              <view class="stats-item">
                <text class="stats-label">访问量</text>
                <view class="stats-value">
                  <text class="stats-number">1,234</text>
                  <zx-trend-arrow :rate="-2.3" show-sign />
                </view>
              </view>
              <view class="stats-item">
                <text class="stats-label">转化率</text>
                <view class="stats-value">
                  <text class="stats-number">12.5%</text>
                  <zx-trend-arrow :rate="0" show-sign show-zero />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxTrendArrow from '@tanzhenxing/zx-trend-arrow/zx-trend-arrow.vue'

// 点击计数
const clickCount = ref(0)

// 处理点击事件
const handleClick = () => {
  clickCount.value++
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 30rpx 30rpx 20rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.demo-desc {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  background-color: #fafafa;
}

.demo-block {
  padding: 30rpx;
}

.demo-item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #666;
  min-width: 120rpx;
}

.demo-tip {
  margin-left: 20rpx;
  font-size: 24rpx;
  color: #999;
}

.custom-icon {
  font-size: 18px;
  font-weight: bold;
}

.stats-card {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.stats-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.stats-label {
  font-size: 28rpx;
  color: #666;
}

.stats-value {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.stats-number {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}
</style>