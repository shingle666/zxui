<template>
  <view class="demo-page">
    <view class="demo-header">
      <text class="title">zx-circle 环形进度条</text>
    </view>

    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate1" :rate="rate1" :speed="100" :text="text1" />
      </view>
      <view class="controls">
        <text>目标进度: {{ rate1 }}%</text>
        <slider :value="rate1" @changing="e => rate1 = e.detail.value" show-value min="0" max="100" />
      </view>
    </view>

    <view class="demo-section">
      <text class="section-title">宽度定制 (stroke-width: 60)</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate2" :rate="75" stroke-width="60" text="75%" />
      </view>
    </view>

    <view class="demo-section">
      <text class="section-title">颜色定制</text>
      <view class="circle-container">
        <zx-circle
          v-model:currentRate="currentRate3"
          :rate="60"
          color="#ee0a24"
          layer-color="#ebedf0"
          text="60%"
        />
        <zx-circle
          v-model:currentRate="currentRate4"
          :rate="80"
          :color="gradientColor"
          text="渐变色"
          style="margin-left: 20rpx;"
        />
      </view>
    </view>

    <view class="demo-section">
      <text class="section-title">逆时针方向</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate5" :rate="70" :clockwise="false" text="逆时针70%" />
      </view>
    </view>

    <view class="demo-section">
      <text class="section-title">大小定制 (size: 240rpx)</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate6" :rate="50" size="240" text="240rpx" />
      </view>
    </view>

    <view class="demo-section">
      <text class="section-title">起始位置</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate7" :rate="25" start-position="left" text="左侧" />
        <zx-circle v-model:currentRate="currentRate8" :rate="50" start-position="right" text="右侧" style="margin-left: 20rpx;"/>
        <zx-circle v-model:currentRate="currentRate9" :rate="75" start-position="bottom" text="底部" style="margin-left: 20rpx;"/>
      </view>
    </view>

     <view class="demo-section">
      <text class="section-title">自定义内容</text>
      <view class="circle-container">
        <zx-circle v-model:currentRate="currentRate10" :rate="rate10" :speed="50">
            <image style="width: 50rpx; height: 50rpx; border-radius: 50%;" src="/static/logo.png"></image>
        </zx-circle>
      </view>
       <view class="controls">
        <text>目标进度: {{ rate10 }}%</text>
        <slider :value="rate10" @changing="e => rate10 = e.detail.value" show-value min="0" max="100" />
      </view>
    </view>

  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import ZxCircle from '@/components/zx-circle/zx-circle.vue';

const currentRate1 = ref(10);
const rate1 = ref(30);
const text1 = computed(() => currentRate1.value.toFixed(0) + '%');

const currentRate2 = ref(75);
const currentRate3 = ref(60);
const currentRate4 = ref(80);
const gradientColor = {
  '0%': '#3fecff',
  '100%': '#6149f6',
};

const currentRate5 = ref(70);
const currentRate6 = ref(50);
const currentRate7 = ref(25);
const currentRate8 = ref(50);
const currentRate9 = ref(75);

const currentRate10 = ref(0);
const rate10 = ref(60);

</script>

<style lang="scss" scoped>
.demo-page {
  padding: 20rpx;
  background-color: #f7f8fa;
}

.demo-header {
  margin-bottom: 30rpx;
  .title {
    font-size: 36rpx;
    font-weight: bold;
  }
}

.demo-section {
  margin-bottom: 40rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 16rpx;
  .section-title {
    display: block;
    font-size: 28rpx;
    color: #909399;
    margin-bottom: 20rpx;
  }
}

.circle-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start; // Or center if you prefer
  gap: 20rpx; // Adds space between items if they wrap
  padding: 20rpx 0;
}

.controls {
  margin-top: 20rpx;
  font-size: 24rpx;
  color: #606266;
  slider {
    margin-top: 10rpx;
  }
}
</style>