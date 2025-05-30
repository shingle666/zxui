<template>
  <view class="page-container">
    <zx-pull-refresh v-model="loading1" @refresh="onRefresh1">
      <view class="content-area">
        <text class="refresh-count">基础用法 - 刷新次数: {{ count1 }}</text>
        <view v-for="item in list1" :key="item" class="list-item">{{ item }}</view>
      </view>
    </zx-pull-refresh>

    <zx-pull-refresh v-model="loading2" success-text="恭喜你，刷新成功！" @refresh="onRefresh2" style="margin-top: 20px;">
      <view class="content-area">
        <text class="refresh-count">成功提示 - 刷新次数: {{ count2 }}</text>
        <view v-for="item in list2" :key="item" class="list-item">{{ item }}</view>
      </view>
    </zx-pull-refresh>

    <zx-pull-refresh v-model="loading3" :head-height="80" @refresh="onRefresh3" style="margin-top: 20px;">
      <template #pulling="props">
        <view class="custom-indicator">
          <image class="doge-image" src="/static/logo.png" :style="{ transform: `scale(${props.distance / 80})` }" />
          <text>下拉看看...</text>
        </view>
      </template>
      <template #loosing>
        <view class="custom-indicator">
          <image class="doge-image" src="/static/logo.png" />
          <text>松手吧！</text>
        </view>
      </template>
      <template #loading>
        <view class="custom-indicator">
          <image class="doge-image animated-doge" src="/static/logo.png" />
          <text>努力加载中...</text>
        </view>
      </template>
      <view class="content-area">
        <text class="refresh-count">自定义提示 - 刷新次数: {{ count3 }}</text>
        <view v-for="item in list3" :key="item" class="list-item">{{ item }}</view>
      </view>
    </zx-pull-refresh>

     <view style="height: 50px;"></view> <!-- Add some space at the bottom -->
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxPullRefresh from '@/components/zx-pull-refresh/zx-pull-refresh.vue';
import zxNavbar from '@/components/zx-navbar/zx-navbar.vue'; // Assuming you have a navbar component

// Basic Usage
const loading1 = ref(false);
const count1 = ref(0);
const list1 = ref(['初始数据1', '初始数据2', '初始数据3']);
const onRefresh1 = () => {
  console.log('onRefresh1 triggered');
  setTimeout(() => {
    // uni.showToast({ title: '刷新成功', icon: 'success' });
    loading1.value = false;
    count1.value++;
    list1.value = [`新数据 ${count1.value}-1`, `新数据 ${count1.value}-2`, `新数据 ${count1.value}-3`, ...list1.value];
    console.log('onRefresh1 completed');
  }, 1500);
};

// Success Text
const loading2 = ref(false);
const count2 = ref(0);
const list2 = ref(['Item A', 'Item B', 'Item C']);
const onRefresh2 = () => {
  console.log('onRefresh2 triggered');
  setTimeout(() => {
    loading2.value = false;
    count2.value++;
    list2.value = [`Updated ${count2.value}-A`, `Updated ${count2.value}-B`, `Updated ${count2.value}-C`];
    console.log('onRefresh2 completed');
  }, 1500);
};

// Custom Content
const loading3 = ref(false);
const count3 = ref(0);
const list3 = ref(['Apple', 'Banana', 'Cherry']);
const onRefresh3 = () => {
  console.log('onRefresh3 triggered');
  setTimeout(() => {
    loading3.value = false;
    count3.value++;
    list3.value = [`Fruit ${count3.value}-X`, `Fruit ${count3.value}-Y`, `Fruit ${count3.value}-Z`];
    console.log('onRefresh3 completed');
  }, 2000);
};

</script>

<style scoped>
.page-container {
  padding: 10px;
  background-color: #f7f8fa;
  min-height: 100vh; /* Ensure page takes full height for pull-refresh to work well */
}

.content-area {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px; /* Space between list items and next pull-refresh */
}

.refresh-count {
  display: block;
  margin-bottom: 10px;
  color: #323233;
  font-size: 16px;
  font-weight: bold;
}

.list-item {
  padding: 10px 0;
  border-bottom: 1px solid #ebedf0;
  color: #646566;
  font-size: 14px;
}

.list-item:last-child {
  border-bottom: none;
}

.custom-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.doge-image {
  width: 70px; /* Adjust as needed */
  height: 70px; /* Adjust as needed */
  margin-bottom: 8px;
  border-radius: 4px;
}

.animated-doge {
  animation: doge-spin 1s linear infinite;
}

@keyframes doge-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Add some global styling if needed for scroll behavior, though zx-pull-refresh handles its own overflow */
/* For example, if the page itself needs to be scrollable for content longer than the viewport */
/* uni-page-body {
  height: 100%;
  overflow-y: auto; 
} */
</style>