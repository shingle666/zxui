<template>
  <view class="container">
    <view class="title">zx-result 结果组件</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-item">
        <zx-result
          icon="success"
          title="Success Tip"
          sub-title="Please follow the instructions"
        >
          <template #extra>
            <zx-button type="primary" @click="onBack">返回</zx-button>
          </template>
        </zx-result>
      </view>
      
      <view class="demo-item">
        <zx-result
          icon="warning"
          title="Warning Tip"
          sub-title="Please follow the instructions"
        >
          <template #extra>
            <zx-button type="warning" @click="onBack">返回</zx-button>
          </template>
        </zx-result>
      </view>
    </view>
    
    <!-- 不同状态 -->
    <view class="section">
      <view class="section-title">不同状态</view>
      <view class="demo-row">
        <view class="demo-col">
          <zx-result
            icon="error"
            title="Error"
            sub-title="网络错误"
            :margin-top="0"
            :margin-bottom="0"
          >
            <template #extra>
              <zx-button type="danger" size="mini" @click="onRetry">重试</zx-button>
            </template>
          </zx-result>
        </view>
        
        <view class="demo-col">
          <zx-result
            icon="info"
            title="Info"
            sub-title="信息提示"
            :margin-top="0"
            :margin-bottom="0"
          >
            <template #extra>
              <zx-button type="info" size="mini" @click="onBack">知道了</zx-button>
            </template>
          </zx-result>
        </view>
      </view>
    </view>
    
    <!-- 自定义内容 -->
    <view class="section">
      <view class="section-title">自定义内容</view>
      <view class="demo-item">
        <zx-result 
          title="404" 
          sub-title="Sorry, request error"
        >
          <template #icon>
            <image
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              style="width: 200rpx; height: 200rpx;"
            />
          </template>
          <template #extra>
            <zx-button type="primary" @click="onBack">返回首页</zx-button>
          </template>
        </zx-result>
      </view>
    </view>
    
    <!-- 自定义图标 -->
    <view class="section">
      <view class="section-title">自定义图标</view>
      <view class="demo-item">
        <zx-result
          icon="heart"
          title="感谢使用"
          sub-title="您的支持是我们前进的动力"
          icon-color="#ff5500"
        >
          <template #extra>
            <zx-button type="primary" @click="onBack">继续使用</zx-button>
          </template>
        </zx-result>
      </view>
    </view>
    
    <!-- 插槽用法 -->
    <view class="section">
      <view class="section-title">使用插槽</view>
      <view class="demo-item">
        <zx-result icon="info">
          <template #title>
            <zx-text text="自定义标题" size="44rpx" color="#3c9cff" bold></zx-text>
          </template>
          <template #sub-title>
            <view style="margin-bottom: 20rpx;">
              <zx-text text="这是通过插槽自定义的副标题内容" size="32rpx" color="#666"></zx-text>
            </view>
            <view>
              <zx-text text="可以插入多行内容" size="28rpx" color="#999"></zx-text>
            </view>
          </template>
          <template #extra>
            <view style="display: flex; gap: 20rpx; justify-content: center; flex-wrap: wrap;">
              <zx-button type="primary" size="mini" @click="onRetry">重试</zx-button>
              <zx-button size="mini" @click="onBack">返回</zx-button>
            </view>
          </template>
        </zx-result>
      </view>
    </view>
    
    <!-- 无操作按钮 -->
    <view class="section">
      <view class="section-title">无操作按钮</view>
      <view class="demo-item">
        <zx-result
          icon="success"
          title="操作成功"
          sub-title="您的操作已成功完成"
        ></zx-result>
      </view>
    </view>
    
    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="demo-item">
        <zx-result
          icon="success"
          title="自定义样式"
          sub-title="可以自定义背景色、间距等"
          background-color="#f8f9fa"
          padding="60rpx"
          :margin-top="20"
          :margin-bottom="20"
          title-color="#333"
          sub-title-color="#666"
          :icon-size="120"
        >
          <template #extra>
            <zx-button type="success" @click="onBack">确定</zx-button>
          </template>
        </zx-result>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 示例方法
const onBack = () => {
  uni.showToast({
    title: '返回操作',
    icon: 'none'
  });
};

const onRetry = () => {
  uni.showToast({
    title: '重试操作',
    icon: 'none'
  });
};
</script>

<style scoped lang="scss">
.container {
  padding: 40rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 60rpx;
}

.section {
  margin-bottom: 60rpx;
  
  &-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 30rpx;
    padding-left: 20rpx;
    border-left: 8rpx solid #3c9cff;
  }
}

.demo-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.demo-row {
  display: flex;
  gap: 20rpx;
}

.demo-col {
  flex: 1;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 40rpx 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}
</style> 