<template>
  <view class="tabbar-demo">
    <view class="section">
      <text class="title">基础用法</text>
      <zx-tabbar :value="tab1" @change="tab1 = $event" :items="tabbarList1" />
    </view>
    <view class="section">
      <text class="title">徽标与圆点</text>
      <zx-tabbar :value="tab2" @change="tab2 = $event" :items="tabbarList2" />
    </view>
    <view class="section">
      <text class="title">拦截切换（需登录）</text>
      <zx-tabbar :value="tab3" @change="onTabChange" :items="tabbarList3" />
    </view>
    <view class="section">
      <text class="title">固定底部</text>
      <zx-tabbar :value="tab4" @change="tab4 = $event" :items="tabbarList1" fixed placeholder safeAreaInsetBottom />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const tab1 = ref(0);
const tab2 = ref(1);
const tab3 = ref(0);
const tab4 = ref(0);

const tabbarList1 = [
  { icon: 'home', title: '首页' },
  { icon: 'photo', title: '放映厅' },
  { icon: 'play-right', title: '直播' },
  { icon: 'account', title: '我的' }
];

const tabbarList2 = [
  { icon: 'home', title: '首页', dot: true },
  { icon: 'photo', title: '放映厅', badge: 3 },
  { icon: 'play-right', title: '直播' },
  { icon: 'account', title: '我的' }
];

const tabbarList3 = [
  { icon: 'home', title: '首页' },
  { icon: 'photo', title: '放映厅' },
  { icon: 'play-right', title: '直播' },
  { icon: 'account', title: '我的' }
];

function onTabChange(index) {
  if (index === 1) {
    uni.showToast({ title: '请先登录', icon: 'none' });
    return;
  }
  tab3.value = index;
}
</script>

<style scoped>
.tabbar-demo {
  padding-bottom: 120rpx;
}
.section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 16rpx;
  display: block;
}
</style> 