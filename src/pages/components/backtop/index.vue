<template>
  <view class="container">
    <view class="header">
      <view class="title">返回顶部</view>
      <view class="subtitle">返回顶部按钮，方便快速返回顶部的场景</view>
    </view>

    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-box">
        <image class="demo-image" src="/static/images/demo.jpg" mode="widthFix"></image>
        <image class="demo-image" src="/static/images/demo.jpg" mode="widthFix"></image>
        <image class="demo-image" src="/static/images/demo.jpg" mode="widthFix"></image>
        
        <!-- 基础用法示例 -->
        <zx-backtop :scrollTop="scrollTop"></zx-backtop>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="demo-box">
        <view class="style-item">
          <view class="item-title">方形按钮</view>
          <view class="style-showcase">
            <zx-backtop 
              mode="square" 
              :scrollTop="scrollTop"
              backgroundColor="#fafafa"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义颜色</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              backgroundColor="#2979ff" 
              iconColor="#ffffff"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义大小</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              size="120rpx"
              iconSize="60rpx"
            ></zx-backtop>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义位置 -->
    <view class="section">
      <view class="section-title">自定义位置</view>
      <view class="demo-box">
        <view class="style-item">
          <view class="item-title">左侧按钮</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              position="left"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义距离</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              bottom="150rpx"
              right="80rpx"
            ></zx-backtop>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义动画 -->
    <view class="section">
      <view class="section-title">自定义动画</view>
      <view class="demo-box">
        <view class="style-item">
          <view class="item-title">淡入动画 (默认)</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              animation="fade"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">滑入动画</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              animation="slide"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">缩放动画</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              animation="scale"
            ></zx-backtop>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义图标 -->
    <view class="section">
      <view class="section-title">自定义图标</view>
      <view class="demo-box">
        <view class="style-item">
          <view class="item-title">箭头图标 (默认)</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              iconName="arrow-up"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">火箭图标</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              iconName="rocket"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">TOP图标</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              iconName="top"
            ></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">顶部图标</view>
          <view class="style-showcase">
            <zx-backtop 
              :scrollTop="scrollTop" 
              iconName="dingbu"
            ></zx-backtop>
          </view>
        </view>
      </view>
    </view>

    <!-- 震动反馈 -->
    <view class="section">
      <view class="section-title">震动反馈</view>
      <view class="demo-box">
        <zx-backtop 
          :scrollTop="scrollTop" 
          :isVibrate="true"
          backgroundColor="#ff9500"
          iconColor="#ffffff"
          @onClick="handleClick"
        ></zx-backtop>
        <view class="feedback-text">点击按钮体验震动效果</view>
      </view>
    </view>

    <!-- 事件监听 -->
    <view class="section">
      <view class="section-title">事件监听</view>
      <view class="demo-box">
        <zx-backtop 
          :scrollTop="scrollTop" 
          @onClick="handleClick"
          @onShow="handleShow"
          @onHide="handleHide"
        ></zx-backtop>
        <view class="event-log">
          <view class="log-title">事件日志：</view>
          <view class="log-content">
            <view v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 参数说明 -->
    <view class="section">
      <view class="section-title">参数说明</view>
      <view class="param-table">
        <view class="table-header">
          <view class="th">参数</view>
          <view class="th">说明</view>
          <view class="th">类型</view>
          <view class="th">默认值</view>
        </view>
        <view class="table-row" v-for="(item, index) in params" :key="index">
          <view class="td">{{ item.name }}</view>
          <view class="td">{{ item.desc }}</view>
          <view class="td">{{ item.type }}</view>
          <view class="td">{{ item.default }}</view>
        </view>
      </view>
    </view>
    
    <!-- 添加底部间距 -->
    <view style="height: 200rpx;"></view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 滚动高度
const scrollTop = ref(0);
// 事件日志
const eventLogs = ref([]);
// 参数列表
const params = [
  { name: 'mode', desc: '形状：circle/square', type: 'String', default: 'circle' },
  { name: 'iconName', desc: '图标名称', type: 'String', default: 'arrow-up' },
  { name: 'duration', desc: '滚动时间(ms)', type: 'Number', default: '300' },
  { name: 'scrollTop', desc: '滚动距离', type: 'Number', default: '0' },
  { name: 'top', desc: '显示阈值', type: 'Number', default: '100' },
  { name: 'position', desc: '位置：right/left', type: 'String', default: 'right' },
  { name: 'animation', desc: '动画：fade/slide/scale', type: 'String', default: 'fade' },
  { name: 'isVibrate', desc: '是否震动', type: 'Boolean', default: 'false' }
];

// 滚动监听
const onPageScroll = (e) => {
  scrollTop.value = e.scrollTop;
};

// 清空日志
const clearLogs = () => {
  if (eventLogs.value.length > 10) {
    eventLogs.value = [];
  }
};

// 事件处理
const handleClick = () => {
  eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 点击了返回顶部按钮`);
  clearLogs();
};

const handleShow = () => {
  eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 按钮显示`);
  clearLogs();
};

const handleHide = () => {
  eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 按钮隐藏`);
  clearLogs();
};

// 页面挂载
onMounted(() => {
  uni.$on('onPageScroll', onPageScroll);
});

// 页面卸载
onUnmounted(() => {
  uni.$off('onPageScroll', onPageScroll);
});
</script>

<style scoped>
.container {
  padding: 30rpx;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
}

.section {
  margin-bottom: 50rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8rpx;
  height: 32rpx;
  width: 6rpx;
  background-color: #2979ff;
  border-radius: 3rpx;
}

.demo-box {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  position: relative;
}

.demo-image {
  width: 100%;
  display: block;
  margin-bottom: 20rpx;
}

.style-item {
  margin-bottom: 40rpx;
}

.item-title {
  font-size: 28rpx;
  margin-bottom: 20rpx;
  color: #333;
}

.style-showcase {
  height: 200rpx;
  background-color: #f7f7f7;
  border-radius: 8rpx;
  position: relative;
}

.feedback-text {
  text-align: center;
  color: #666;
  margin-top: 30rpx;
  font-size: 28rpx;
}

.event-log {
  margin-top: 30rpx;
  padding: 20rpx;
  background-color: #f7f7f7;
  border-radius: 8rpx;
}

.log-title {
  font-size: 28rpx;
  margin-bottom: 10rpx;
  color: #333;
}

.log-content {
  height: 200rpx;
  overflow-y: auto;
}

.log-item {
  font-size: 24rpx;
  color: #666;
  line-height: 1.8;
  border-bottom: 1rpx solid #eee;
  padding: 10rpx 0;
}

.param-table {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  font-size: 24rpx;
}

.table-header {
  display: flex;
  background-color: #f7f7f7;
}

.th {
  flex: 1;
  padding: 20rpx 10rpx;
  text-align: center;
  font-weight: bold;
}

.table-row {
  display: flex;
  border-bottom: 1rpx solid #eee;
}

.td {
  flex: 1;
  padding: 20rpx 10rpx;
  text-align: center;
}
</style>
