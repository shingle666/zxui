<template>
  <view class="container">
    <view class="title">zx-button 按钮组件</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="button-group">
        <zx-button @click="onClick">默认按钮</zx-button>
        <zx-button type="primary" @click="onClick">主要按钮</zx-button>
        <zx-button type="warn" @click="onClick">警告按钮</zx-button>
        <zx-button type="success" @click="onClick">成功按钮</zx-button>
        <zx-button type="warning" @click="onClick">提醒按钮</zx-button>
        <zx-button type="danger" @click="onClick">危险按钮</zx-button>
        <zx-button type="info" @click="onClick">信息按钮</zx-button>
      </view>
    </view>
    
    <!-- 镂空按钮 -->
    <view class="section">
      <view class="section-title">镂空按钮</view>
      <view class="button-group">
        <zx-button plain @click="onClick">镂空按钮</zx-button>
        <zx-button type="primary" plain @click="onClick">镂空主要按钮</zx-button>
        <zx-button type="success" plain @click="onClick">镂空成功按钮</zx-button>
        <zx-button type="danger" plain @click="onClick">镂空危险按钮</zx-button>
        <zx-button type="warning" plain @click="onClick">镂空提醒按钮</zx-button>
      </view>
    </view>
    
    <!-- 文本按钮 -->
    <view class="section">
      <view class="section-title">文本按钮</view>
      <view class="button-group">
        <zx-button text @click="onClick">默认文本按钮</zx-button>
        <zx-button type="primary" text @click="onClick">主要文本按钮</zx-button>
        <zx-button type="success" text @click="onClick">成功文本按钮</zx-button>
        <zx-button type="danger" text @click="onClick">危险文本按钮</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button text bg @click="onClick">背景色文本按钮</zx-button>
        <zx-button type="primary" text bg @click="onClick">背景色主要文本按钮</zx-button>
      </view>
    </view>
    
    <!-- 链接按钮 -->
    <view class="section">
      <view class="section-title">链接按钮</view>
      <view class="button-group">
        <zx-button link @click="onClick">默认链接按钮</zx-button>
        <zx-button type="primary" link @click="onClick">主要链接按钮</zx-button>
        <zx-button type="success" link @click="onClick">成功链接按钮</zx-button>
        <zx-button type="danger" link @click="onClick">危险链接按钮</zx-button>
      </view>
    </view>
    
    <!-- 禁用状态 -->
    <view class="section">
      <view class="section-title">禁用状态</view>
      <view class="button-group">
        <zx-button disabled>禁用按钮</zx-button>
        <zx-button type="primary" disabled>禁用主要按钮</zx-button>
        <zx-button type="primary" plain disabled>禁用镂空按钮</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button text disabled>禁用文本按钮</zx-button>
        <zx-button type="primary" link disabled>禁用链接按钮</zx-button>
      </view>
    </view>
    
    <!-- 加载状态 -->
    <view class="section">
      <view class="section-title">加载状态</view>
      <view class="button-group">
        <zx-button loading>加载中</zx-button>
        <zx-button type="primary" loading>加载中</zx-button>
        <zx-button type="success" loading>加载中</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button type="primary" text loading>加载中</zx-button>
        <zx-button type="success" loading>加载中</zx-button>
      </view>
    </view>
    
    <!-- 按钮尺寸 -->
    <view class="section">
      <view class="section-title">按钮尺寸</view>
      <view class="button-group">
        <zx-button type="primary" size="large">大尺寸</zx-button>
        <zx-button type="primary">默认尺寸</zx-button>
        <zx-button type="primary" size="mini">小尺寸</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button type="primary" size="large" icon="search">大尺寸图标按钮</zx-button>
        <zx-button type="primary" icon="search">默认尺寸图标按钮</zx-button>
        <zx-button type="primary" size="mini" icon="search">小尺寸图标按钮</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button type="primary" size="120rpx">自定义高度120rpx</zx-button>
      </view>
    </view>
    
    <!-- 按钮形状 -->
    <view class="section">
      <view class="section-title">按钮形状</view>
      <view class="button-group">
        <zx-button type="primary">默认形状</zx-button>
        <zx-button type="primary" round>圆角按钮</zx-button>
        <zx-button type="primary" circle icon="close"></zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button type="success" round>成功圆角按钮</zx-button>
        <zx-button type="warning" round>警告圆角按钮</zx-button>
        <zx-button type="danger" round>危险圆角按钮</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button type="success" circle icon="check"></zx-button>
        <zx-button type="warning" circle icon="star"></zx-button>
        <zx-button type="info" circle icon="info"></zx-button>
      </view>
    </view>
    
    <!-- 带图标的按钮 -->
    <view class="section">
      <view class="section-title">带图标的按钮</view>
      <view class="button-group">
        <zx-button type="primary" icon="search">搜索</zx-button>
        <zx-button type="success" icon="check">确认</zx-button>
        <zx-button type="danger" icon="close">关闭</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button icon="search" text>搜索</zx-button>
        <zx-button type="success" icon="check" text>确认</zx-button>
        <zx-button type="danger" icon="close" text>关闭</zx-button>
      </view>
    </view>
    
    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="button-group">
        <zx-button 
          color="#fff" 
          backgroundColor="#8a2be2"
          :style="{ boxShadow: '0 4rpx 10rpx rgba(138, 43, 226, 0.4)' }"
          @click="onClick"
        >自定义样式</zx-button>
        <zx-button 
          color="#fff" 
          :style="{ 
            background: 'linear-gradient(to right, #4facfe, #00f2fe)',
            border: 'none' 
          }"
          @click="onClick"
        >渐变背景</zx-button>
      </view>
      <view class="button-group" style="margin-top: 20rpx;">
        <zx-button 
          round
          color="#fff" 
          :style="{ 
            background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
            border: 'none',
            boxShadow: '0 4rpx 10rpx rgba(255, 154, 158, 0.5)'
          }"
          @click="onClick"
        >自定义圆角</zx-button>
        <zx-button
          color="#673ab7"
          plain
          :style="{
            borderWidth: '2rpx'
          }"
          @click="onClick"
        >纯色按钮</zx-button>
      </view>
    </view>
    
    <!-- 使用插槽 -->
    <view class="section">
      <view class="section-title">使用插槽</view>
      <view class="button-group">
        <zx-button type="primary" @click="onClick">
          <template #icon>
            <view class="custom-icon">🔍</view>
          </template>
          自定义内容
        </zx-button>
        <zx-button type="success" @click="onClick">
          <template #loading>
            <view style="margin-right: 10rpx;">🔄</view>
          </template>
          自定义加载图标
        </zx-button>
      </view>
    </view>
    
    <!-- 表单提交按钮 -->
    <view class="section">
      <view class="section-title">表单提交按钮</view>
      <form @submit="onSubmit" @reset="onReset">
        <view class="form-item">
          <input name="username" placeholder="请输入用户名" />
        </view>
        <view class="button-group">
          <zx-button form-type="submit" type="primary">提交表单</zx-button>
          <zx-button form-type="reset">重置表单</zx-button>
        </view>
      </form>
    </view>
    
    <!-- 开放能力按钮 -->
    <view class="section">
      <view class="section-title">开放能力按钮</view>
      <view class="button-group">
        <zx-button 
          open-type="share" 
          type="primary"
        >分享</zx-button>
        <zx-button 
          open-type="contact" 
          type="success"
          @contact="onContact"
        >联系客服</zx-button>
        <!-- 注：部分开放能力在不同平台可能不支持 -->
      </view>
    </view>
    
    <!-- 事件按钮 -->
    <view class="section">
      <view class="section-title">事件按钮</view>
      <view class="button-group">
        <zx-button 
          type="primary"
          @click="onButtonClick"
        >点击按钮</zx-button>
      </view>
      <view v-if="clickInfo" class="event-info">
        <text>上次点击：{{ clickInfo }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const clickInfo = ref('');

// 普通点击事件
const onClick = () => {
  uni.showToast({
    title: '点击了按钮',
    icon: 'none'
  });
};

// 特定按钮点击事件
const onButtonClick = (e) => {
  clickInfo.value = `${new Date().toLocaleTimeString()}`;
  console.log('按钮点击事件', e);
};

// 表单提交
const onSubmit = (e) => {
  uni.showModal({
    title: '表单提交',
    content: `提交的内容：${JSON.stringify(e.detail.value)}`,
    showCancel: false
  });
};

// 表单重置
const onReset = () => {
  uni.showToast({
    title: '表单已重置',
    icon: 'none'
  });
};

// 联系客服
const onContact = (e) => {
  console.log('客服消息事件', e);
};
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin: 30rpx 0;
}

.section {
  margin-bottom: 50rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 30rpx;
  color: #303133;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8rpx;
    height: 32rpx;
    background-color: #2979ff;
    border-radius: 4rpx;
  }
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  align-items: center;
}

.form-item {
  margin-bottom: 30rpx;
  
  input {
    border: 1px solid #dcdfe6;
    height: 80rpx;
    padding: 0 20rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    width: 100%;
    box-sizing: border-box;
    
    &:focus {
      border-color: #409eff;
    }
  }
}

.event-info {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #606266;
  padding: 10rpx 20rpx;
  background-color: #f5f7fa;
  border-radius: 6rpx;
}

.custom-icon {
  font-size: 36rpx;
  margin-right: 10rpx;
}
</style>
