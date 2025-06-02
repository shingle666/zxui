<template>
  <view>
    <zx-navbar title="zx-badge 数字角标" border></zx-navbar>
    <view class="container">
      <zx-title title="zx-badge 数字角标" subtitle="数字角标一般和其它控件配合使用，用于数量提示"></zx-title>

      <!-- 基础用法 -->
      <zx-section title="基础用法" padding type="line">
        <view class="demo-row">
          <zx-badge text="12" class="badge-item">
            <zx-button size="small" type="default">评论</zx-button>
          </zx-badge>
          <zx-badge text="3" class="badge-item">
            <zx-button size="small" type="default">回复</zx-button>
          </zx-badge>
          <zx-badge text="1" type="primary" class="badge-item">
            <zx-button size="small" type="primary">评论</zx-button>
          </zx-badge>
          <zx-badge text="2" type="warning" class="badge-item">
            <zx-button size="small" type="warning">回复</zx-button>
          </zx-badge>
        </view>
        <view class="demo-row">
          <zx-badge text="1" bgColor="green" class="badge-item">
            <zx-button size="small" type="success">自定义背景色</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 最大值 -->
      <zx-section title="最大值" padding type="line">
        <view class="demo-row">
          <zx-badge text="200" :maxNum="99" class="badge-item">
            <zx-button size="small" type="default">评论</zx-button>
          </zx-badge>
          <zx-badge text="100" :maxNum="10" class="badge-item">
            <zx-button size="small" type="default">回复</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 自定义显示内容 -->
      <zx-section title="自定义显示内容" padding type="line">
        <view class="demo-row">
          <zx-badge text="new" class="badge-item">
            <zx-button size="small" type="default">评论</zx-button>
          </zx-badge>
          <zx-badge text="hot" class="badge-item">
            <zx-button size="small" type="default">回复</zx-button>
          </zx-badge>
          <zx-badge text="VIP" type="success" class="badge-item">
            <zx-button size="small" type="success">会员</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 小红点 -->
      <zx-section title="小红点" padding type="line">
        <view class="demo-row">
          <zx-badge isDot class="badge-item">
            <zx-button size="small" type="default">提醒</zx-button>
          </zx-badge>
          <zx-badge isDot type="primary" class="badge-item">
            <zx-button size="small" type="primary">消息</zx-button>
          </zx-badge>
          <zx-badge isDot type="success" class="badge-item">
            <zx-button size="small" type="success">通知</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 位置偏移 -->
      <zx-section title="位置偏移" padding type="line">
        <view class="demo-row">
          <zx-badge text="1" :offset="[10, 5]" class="badge-item">
            <zx-button size="small" type="default">右上偏移</zx-button>
          </zx-badge>
          <zx-badge text="2" absolute="rightBottom" class="badge-item">
            <zx-button size="small" type="default">右下角</zx-button>
          </zx-badge>
        </view>
        <view class="demo-row">
          <zx-badge text="3" absolute="leftTop" class="badge-item">
            <zx-button size="small" type="default">左上角</zx-button>
          </zx-badge>
          <zx-badge text="4" absolute="leftBottom" class="badge-item">
            <zx-button size="small" type="default">左下角</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 自定义样式 -->
      <zx-section title="自定义样式" padding type="line">
        <view class="demo-row">
          <zx-badge text="99+" :badgeStyle="{ backgroundColor: '#ff6600', padding: '0 15rpx' }" class="badge-item">
            <zx-button size="small" type="default">自定义样式</zx-button>
          </zx-badge>
          <zx-badge text="VIP" badgeClass="custom-badge" class="badge-item">
            <zx-button size="small" type="default">自定义类名</zx-button>
          </zx-badge>
        </view>
      </zx-section>

      <!-- 显示控制 -->
      <zx-section title="显示控制" padding type="line">
        <view class="demo-row">
          <zx-badge text="1" :hidden="isHidden" class="badge-item">
            <zx-button size="small" type="default" @click="toggleHidden"> {{ isHidden ? '显示角标' : '隐藏角标' }}</zx-button>
          </zx-badge>
          <zx-badge text="0" :showZero="false" class="badge-item">
            <zx-button size="small" type="default">零值不显示</zx-button>
          </zx-badge>
          <zx-badge text="0" :showZero="true" class="badge-item">
            <zx-button size="small" type="default">零值显示</zx-button>
          </zx-badge>
        </view>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const isHidden = ref(false);

const toggleHidden = () => {
  isHidden.value = !isHidden.value;
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f1f1f1;
  min-height: 100vh;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 30rpx;
  margin-bottom: 20rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.badge-item {
  flex-shrink: 0;
}

.custom-badge {
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  font-weight: bold;
  padding: 0 15rpx;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(255, 154, 158, 0.3);
}

// 优化按钮样式
:deep(.zx-button) {
  border-radius: 12rpx;
  font-size: 26rpx;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }
}

// 活跃状态样式
.active {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(41, 121, 255, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10rpx rgba(41, 121, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(41, 121, 255, 0);
  }
}

// 响应式设计
@media (max-width: 750rpx) {
  .container {
    padding: 15rpx;
  }
  
  .demo-row {
    gap: 25rpx;
    margin-bottom: 15rpx;
  }
}
</style>
