<template>
  <view class="container">
    <view class="header">
      <view class="title">返回顶部</view>
      <view class="subtitle">返回顶部按钮，方便快速返回顶部的场景</view>
    </view>

    <!-- 演示切换按钮 -->
    <view style="display: flex; flex-wrap: wrap; gap: 20rpx; margin-bottom: 40rpx;">
      <button v-for="item in demoList" :key="item.value" size="mini" :type="currentDemo === item.value ? 'primary' : 'default'" @click="currentDemo = item.value">{{ item.label }}</button>
    </view>

    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="demo-box">
        <zx-backtop v-if="currentDemo === 'base'" :scrollTop="scrollTop"></zx-backtop>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="demo-box">
        <view class="style-item">
          <view class="item-title">方形按钮</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'square'" :scrollTop="scrollTop" mode="square"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义颜色</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'color'" :scrollTop="scrollTop" backgroundColor="#2979ff" iconColor="#fff"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义大小</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'size'" :scrollTop="scrollTop" size="120rpx" iconSize="60rpx"></zx-backtop>
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
            <zx-backtop v-if="currentDemo === 'left'" :scrollTop="scrollTop" left="100" bottom="200"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">自定义距离</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'distance'" :scrollTop="scrollTop" right="80" bottom="150"></zx-backtop>
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
            <zx-backtop v-if="currentDemo === 'fade'" :scrollTop="scrollTop" animation="fade"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">滑入动画</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'slide'" :scrollTop="scrollTop" animation="slide"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">缩放动画</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'scale'" :scrollTop="scrollTop" animation="scale"></zx-backtop>
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
            <zx-backtop v-if="currentDemo === 'arrow'" :scrollTop="scrollTop" iconName="arrow-up"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">火箭图标</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'rocket'" :scrollTop="scrollTop" iconName="rocket"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">TOP图标</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'top'" :scrollTop="scrollTop" iconName="top"></zx-backtop>
          </view>
        </view>
        
        <view class="style-item">
          <view class="item-title">顶部图标</view>
          <view class="style-showcase">
            <zx-backtop v-if="currentDemo === 'dingbu'" :scrollTop="scrollTop" iconName="dingbu"></zx-backtop>
          </view>
        </view>
      </view>
    </view>

    <!-- 震动反馈 -->
    <view class="section">
      <view class="section-title">震动反馈</view>
      <view class="demo-box">
        <zx-backtop v-if="currentDemo === 'vibrate'" :scrollTop="scrollTop" :vibrate="true" backgroundColor="#ff9500" iconColor="#fff" @click="handleClick"></zx-backtop>
        <view class="feedback-text">点击按钮体验震动效果</view>
      </view>
    </view>

    <!-- 事件监听 -->
    <view class="section">
      <view class="section-title">事件监听</view>
      <view class="demo-box">
        <zx-backtop :scrollTop="scrollTop" @click="handleClick" @show="handleShow" @hide="handleHide"></zx-backtop>
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
import { onPageScroll } from '@dcloudio/uni-app';

// 滚动高度
const scrollTop = ref(0);
// 当前演示类型
const currentDemo = ref('base');
// 事件日志
const eventLogs = ref([]);
// 演示类型列表
const demoList = [
  { label: '基础用法', value: 'base' },
  { label: '方形按钮', value: 'square' },
  { label: '自定义颜色', value: 'color' },
  { label: '自定义大小', value: 'size' },
  { label: '左侧按钮', value: 'left' },
  { label: '自定义距离', value: 'distance' },
  { label: '淡入动画', value: 'fade' },
  { label: '滑入动画', value: 'slide' },
  { label: '缩放动画', value: 'scale' },
  { label: '箭头图标', value: 'arrow' },
  { label: '火箭图标', value: 'rocket' },
  { label: 'TOP图标', value: 'top' },
  { label: '顶部图标', value: 'dingbu' },
  { label: '震动反馈', value: 'vibrate' }
];
// 参数列表
const params = [
  { name: 'scrollTop', desc: '当前滚动距离，用于控制显示/隐藏', type: 'Number', default: '0' },
  { name: 'visibilityHeight', desc: '滚动高度达到此值才出现', type: 'Number | String', default: '200' },
  { name: 'right', desc: '距离页面右边距（rpx）', type: 'Number | String', default: '10' },
  { name: 'bottom', desc: '距离页面底部距离（rpx）', type: 'Number | String', default: '120' },
  { name: 'left', desc: '距离页面左边距（rpx，优先级高于right）', type: 'Number | String', default: '0' },
  { name: 'duration', desc: '返回顶部滚动时间(ms)', type: 'Number', default: '300' },
  { name: 'zIndex', desc: '层级', type: 'Number', default: '9999' },
  { name: 'mode', desc: '返回顶部的形状：circle-圆形，square-方形', type: 'String', default: 'circle' },
  { name: 'backgroundColor', desc: '背景色', type: 'String', default: '#ffffff' },
  { name: 'size', desc: '组件大小（rpx）', type: 'String', default: '80rpx' },
  { name: 'iconName', desc: '自定义图标', type: 'String', default: 'arrow-up' },
  { name: 'iconColor', desc: '图标颜色', type: 'String', default: '#999999' },
  { name: 'iconSize', desc: '图标大小（rpx）', type: 'String', default: '50rpx' },
  { name: 'animation', desc: '动画效果：fade、slide、scale', type: 'String', default: 'fade' },
  { name: 'vibrate', desc: '点击时是否震动反馈', type: 'Boolean', default: 'false' },
  { name: 'customClass', desc: '自定义类名', type: 'String', default: '' }
];

// 页面滚动监听
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});

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
