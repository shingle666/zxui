<template>
  <view class="content">
    <view class="header">
      <image class="logo" src="https://zxui.org/logo.png" mode="widthFix" />
      <text class="title">zxUI</text>
      <text class="slogan">多平台快速开发的UI框架</text>
      <text class="desc">zxUI是一套基于uni-app开发的跨平台UI框架，提供丰富组件、布局及界面库，让你一套代码多端发布。</text>
    </view>
    <view class="search-bar-container">
      <zx-search-bar v-model="searchValue" placeholder="功能搜索" @confirm="handleSearch" :bgColor="'#fff'" />
    </view>
    <view v-for="(category, cIndex) in filteredList" :key="cIndex" class="category-section">
      <view class="section-title">
        <text>{{ category.title }}</text>
      </view>
      <view class="component-list">
        <view class="component-item" v-for="(item, index) in category.lists" :key="index"
          @click="handleClick(item.path)" :class="{ 'no-border': index === category.lists.length - 1 }">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-arrow">›</text>
        </view>
      </view>
    </view>
    <!-- 返回顶部 -->
    <zx-backtop :scrollTop="scrollTop"></zx-backtop>

    <!-- 底部导航 -->
    <zx-tabbar :value="tabbarValue" :items="tabbarList" @change="onTabbarChange" fixed placeholder
      safeAreaInsetBottom />
  </view>
</template>

<script setup>
import { ref, computed } from "vue";
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import { useStore } from 'vuex';
import zxSearchBar from '@tanzhenxing/zx-search-bar/zx-search-bar.vue';
import zxBacktop from '@tanzhenxing/zx-backtop/zx-backtop.vue';
import zxTabbar from '@tanzhenxing/zx-tabbar/zx-tabbar.vue';


const scrollTop = ref(0);
const datalist = ref([]);
const loading = ref(false);

// 加载远程数据
const loadData = async () => {
  try {
    loading.value = true;
    const response = await uni.request({
      url: 'https://cdn.mp.ac.cn/json/home.json?t=' + Date.now(),
      method: 'GET'
    });

    if (response.statusCode === 200 && response.data) {
      datalist.value = response.data;
    } else {
      uni.showToast({
        title: '数据加载失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('加载数据失败:', error);
    uni.showToast({
      title: '网络请求失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取数据
onLoad(() => {
  loadData();
});

// 使用 store 中的底部导航数据
const store = useStore();
const tabbarValue = ref(0);
const tabbarList = computed(() => store.getters.tabbarList);

// 监听页面滚动
onPageScroll((e) => {
  scrollTop.value = e.scrollTop;
});


function handleBacktopClick() {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  });
}

function onTabbarChange(name) {
  let path = tabbarList.value.find(item => item.name == name).path;
  uni.navigateTo({ url: path });
  console.log(name)
}

function handleClick(path) {
  uni.navigateTo({ url: path });
}

const searchValue = ref("");
const filteredList = computed(() => {
  if (!searchValue.value.trim()) return datalist.value;
  return datalist.value
    .map(category => {
      const filteredItems = category.lists.filter(item =>
        item.title.toLowerCase().includes(searchValue.value.toLowerCase())
      );
      return filteredItems.length
        ? { ...category, lists: filteredItems }
        : null;
    })
    .filter(Boolean);
});

function handleSearch() {
  if (!searchValue.value.trim()) {
    uni.showToast({ title: '请输入关键词', icon: 'none' });
    return;
  }
  if (typeof uni.hideKeyboard === 'function') {
    uni.hideKeyboard();
  }
  // filteredList 已自动响应，无需额外处理
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  padding: 40rpx 30rpx 20rpx 30rpx;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 2rpx solid #f0f0f0;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 10rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000;
  margin-bottom: 8rpx;
}

.slogan {
  font-size: 28rpx;
  color: #1989fa;
  margin-bottom: 8rpx;
}

.desc {
  font-size: 24rpx;
  color: #666;
  margin-bottom: 12rpx;
  text-align: center;
}

.links {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12rpx;
  font-size: 24rpx;
  color: #1989fa;
}

.links navigator {
  color: #1989fa;
}

.category-section {
  margin-bottom: 20rpx;
}

.section-title {
  padding: 20rpx 30rpx;
  padding-bottom: 10rpx;
  font-size: 28rpx;
  color: #666;
  font-weight: 500;
}

.component-list {
  background-color: #fff;
  margin: 0 30rpx;
  border-radius: 12rpx;
  overflow: hidden;
}

.component-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.no-border {
  border-bottom: none;
}

.item-title {
  font-size: 28rpx;
  color: #333;
}

.item-arrow {
  color: #ccc;
  font-size: 36rpx;
  font-weight: 300;
}

.search-bar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #fff;
  padding: 16rpx 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  margin: 24rpx 30rpx 20rpx 30rpx;
}

.search-bar-container .zx-searchbar {
  flex: 1;
}

.search-bar-container .zx-button {
  margin-left: 16rpx;
  height: 72rpx;
  line-height: 72rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
}
</style>
