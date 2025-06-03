<template>
  <view class="content">
    <!-- 用户信息区域 -->
    <view class="user-section">
      <view class="user-bg">
        <view class="user-info">
          <view class="avatar-container">
            <image class="avatar" :src="userInfo.avatar" mode="aspectFill" @click="handleAvatarClick" />
            <view class="avatar-edit" @click="handleAvatarClick">
              <zx-icon name="camera" size="24" color="#fff"></zx-icon>
            </view>
          </view>
          <view class="user-details">
            <text class="username">{{ userInfo.nickname || '点击登录' }}</text>
            <text class="user-desc">{{ userInfo.desc || 'zxUI框架用户' }}</text>
          </view>
          <view class="user-actions">
            <zx-button v-if="!userInfo.isLogin" @click="handleLogin" type="primary" size="small" round>登录</zx-button>
            <zx-button v-else @click="handleProfile" type="default" size="small" round>编辑资料</zx-button>
          </view>
        </view>
      </view>
    </view>

    <!-- 数据统计 -->
    <view class="stats-section">
      <view class="stats-item" @click="handleStatsClick('downloads')">
        <text class="stats-number">{{ userStats.downloads }}</text>
        <text class="stats-label">下载量</text>
      </view>
      <view class="stats-item" @click="handleStatsClick('favorites')">
        <text class="stats-number">{{ userStats.favorites }}</text>
        <text class="stats-label">收藏</text>
      </view>
      <view class="stats-item" @click="handleStatsClick('views')">
        <text class="stats-number">{{ userStats.views }}</text>
        <text class="stats-label">浏览</text>
      </view>
      <view class="stats-item" @click="handleStatsClick('points')">
        <text class="stats-number">{{ userStats.points }}</text>
        <text class="stats-label">积分</text>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-title">我的服务</view>
        <view class="menu-list">
          <view class="menu-item" v-for="(item, index) in serviceMenus" :key="index" @click="handleMenuClick(item)">
            <view class="menu-left">
              <zx-icon :name="item.icon" :color="item.iconColor" size="40"></zx-icon>
              <text class="menu-text">{{ item.title }}</text>
            </view>
            <view class="menu-right">
              <text class="menu-badge" v-if="item.badge">{{ item.badge }}</text>
              <zx-icon name="arrow-right" color="#ccc" size="28"></zx-icon>
            </view>
          </view>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-title">工具与设置</view>
        <view class="menu-list">
          <view class="menu-item" v-for="(item, index) in toolMenus" :key="index" @click="handleMenuClick(item)">
            <view class="menu-left">
              <zx-icon :name="item.icon" :color="item.iconColor" size="40"></zx-icon>
              <text class="menu-text">{{ item.title }}</text>
            </view>
            <view class="menu-right">
              <text class="menu-desc" v-if="item.desc">{{ item.desc }}</text>
              <zx-icon name="arrow-right" color="#ccc" size="28"></zx-icon>
            </view>
          </view>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-title">关于与帮助</view>
        <view class="menu-list">
          <view class="menu-item" v-for="(item, index) in aboutMenus" :key="index" @click="handleMenuClick(item)">
            <view class="menu-left">
              <zx-icon :name="item.icon" :color="item.iconColor" size="40"></zx-icon>
              <text class="menu-text">{{ item.title }}</text>
            </view>
            <view class="menu-right">
              <text class="menu-version" v-if="item.version">{{ item.version }}</text>
              <zx-icon name="arrow-right" color="#ccc" size="28"></zx-icon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 退出登录 -->
    <view class="logout-section" v-if="userInfo.isLogin">
      <zx-button @click="handleLogout" type="danger" size="large" round>退出登录</zx-button>
    </view>

    <!-- 底部导航 -->
    <zx-tabbar
      :value="tabbarValue"
      :items="tabbarList"
      @change="onTabbarChange"
      fixed
      placeholder
      safeAreaInsetBottom
    />
  </view>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { useStore } from 'vuex';

const title = ref("我的");

// 用户信息
const userInfo = reactive({
  isLogin: false,
  avatar: 'https://zxui.org/avatar-default.png',
  nickname: '',
  desc: ''
});

// 用户统计数据
const userStats = reactive({
  downloads: '0',
  favorites: '0',
  views: '0',
  points: '0'
});

// 服务菜单
const serviceMenus = ref([
  { icon: 'heart', iconColor: '#ff4757', title: '我的收藏', path: '/pages/my/favorites', badge: '' },
  { icon: 'download', iconColor: '#5352ed', title: '下载记录', path: '/pages/my/downloads', badge: '' },
  { icon: 'eye', iconColor: '#00d2d3', title: '浏览历史', path: '/pages/my/history', badge: '' },
  { icon: 'gift', iconColor: '#ff6b6b', title: '我的积分', path: '/pages/my/points', badge: 'NEW' },
  { icon: 'message', iconColor: '#ffa502', title: '消息中心', path: '/pages/my/messages', badge: '3' },
  { icon: 'star', iconColor: '#ff9ff3', title: '我的评价', path: '/pages/my/reviews', badge: '' }
]);

// 工具菜单
const toolMenus = ref([
  { icon: 'setting', iconColor: '#747d8c', title: '设置', path: '/pages/my/settings', desc: '' },
  { icon: 'theme', iconColor: '#5f27cd', title: '主题设置', path: '/pages/my/theme', desc: '浅色' },
  { icon: 'language', iconColor: '#00d2d3', title: '语言设置', path: '/pages/my/language', desc: '中文' },
  { icon: 'notification', iconColor: '#ff6348', title: '消息通知', path: '/pages/my/notification', desc: '已开启' },
  { icon: 'shield', iconColor: '#2ed573', title: '隐私设置', path: '/pages/my/privacy', desc: '' }
]);

// 关于菜单
const aboutMenus = ref([
  { icon: 'info', iconColor: '#3742fa', title: '关于zxUI', path: '/pages/my/about', version: 'v2.0.0' },
  { icon: 'help', iconColor: '#2f3542', title: '帮助中心', path: '/pages/my/help', version: '' },
  { icon: 'feedback', iconColor: '#ff4757', title: '意见反馈', path: '/pages/my/feedback', version: '' },
  { icon: 'share', iconColor: '#1e90ff', title: '分享推荐', path: '/pages/my/share', version: '' }
]);

// 使用 store 中的底部导航数据
const store = useStore();
const tabbarValue = ref(4);
const tabbarList = computed(() => store.getters.tabbarList);

onLoad(() => {
  uni.setNavigationBarTitle({ title: title.value });
  loadUserData();
});

// 加载用户数据
function loadUserData() {
  // 模拟用户数据
  const mockUser = {
    isLogin: true,
    avatar: 'https://zxui.org/avatar-user.png',
    nickname: 'zxUI开发者',
    desc: '专注于跨平台UI框架开发'
  };
  
  const mockStats = {
    downloads: '1.2k',
    favorites: '89',
    views: '3.5k',
    points: '2580'
  };
  
  Object.assign(userInfo, mockUser);
  Object.assign(userStats, mockStats);
}

// 头像点击
function handleAvatarClick() {
  if (!userInfo.isLogin) {
    handleLogin();
    return;
  }
  
  uni.showActionSheet({
    itemList: ['拍照', '从相册选择', '查看头像'],
    success: (res) => {
      if (res.tapIndex === 0) {
        // 拍照
        chooseImage('camera');
      } else if (res.tapIndex === 1) {
        // 从相册选择
        chooseImage('album');
      } else if (res.tapIndex === 2) {
        // 查看头像
        uni.previewImage({
          urls: [userInfo.avatar]
        });
      }
    }
  });
}

// 选择图片
function chooseImage(sourceType) {
  uni.chooseImage({
    count: 1,
    sourceType: [sourceType],
    success: (res) => {
      userInfo.avatar = res.tempFilePaths[0];
      uni.showToast({ title: '头像更新成功', icon: 'success' });
    }
  });
}

// 登录
function handleLogin() {
  uni.navigateTo({ url: '/pages/login/login' });
}

// 编辑资料
function handleProfile() {
  uni.navigateTo({ url: '/pages/my/profile' });
}

// 统计数据点击
function handleStatsClick(type) {
  const pathMap = {
    downloads: '/pages/my/downloads',
    favorites: '/pages/my/favorites',
    views: '/pages/my/history',
    points: '/pages/my/points'
  };
  
  uni.navigateTo({ url: pathMap[type] });
}

// 菜单点击
function handleMenuClick(item) {
  if (item.path) {
    uni.navigateTo({ url: item.path });
  } else {
    uni.showToast({ title: '功能开发中', icon: 'none' });
  }
}

// 退出登录
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        userInfo.isLogin = false;
        userInfo.nickname = '';
        userInfo.desc = '';
        userInfo.avatar = 'https://zxui.org/avatar-default.png';
        
        Object.assign(userStats, {
          downloads: '0',
          favorites: '0',
          views: '0',
          points: '0'
        });
        
        uni.showToast({ title: '已退出登录', icon: 'success' });
      }
    }
  });
}

// 底部导航切换
function onTabbarChange(name) {
  let path = tabbarList.value.find(item => item.name == name).path;
  uni.navigateTo({ url: path });
}
</script>

<style scoped>
.content {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 120rpx;
}

/* 用户信息区域 */
.user-section {
  position: relative;
  margin-bottom: 20rpx;
}

.user-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 30rpx 40rpx;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  color: #fff;
}

.avatar-container {
  position: relative;
  margin-right: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40rpx;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-details {
  flex: 1;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
  display: block;
}

.user-desc {
  font-size: 26rpx;
  opacity: 0.8;
  display: block;
}

.user-actions {
  margin-left: 20rpx;
}

/* 数据统计 */
.stats-section {
  display: flex;
  background: #fff;
  margin: 0 30rpx 20rpx;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.stats-item {
  flex: 1;
  padding: 40rpx 20rpx;
  text-align: center;
  border-right: 1rpx solid #f0f0f0;
}

.stats-item:last-child {
  border-right: none;
}

.stats-number {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 8rpx;
}

.stats-label {
  font-size: 24rpx;
  color: #666;
  display: block;
}

/* 菜单区域 */
.menu-section {
  padding: 0 30rpx;
}

.menu-group {
  margin-bottom: 20rpx;
}

.menu-title {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 16rpx;
  padding-left: 8rpx;
}

.menu-list {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.menu-text {
  font-size: 28rpx;
  color: #333;
  margin-left: 24rpx;
}

.menu-right {
  display: flex;
  align-items: center;
}

.menu-badge {
  background: #ff4757;
  color: #fff;
  font-size: 20rpx;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
  margin-right: 16rpx;
  min-width: 32rpx;
  text-align: center;
}

.menu-desc,
.menu-version {
  font-size: 24rpx;
  color: #999;
  margin-right: 16rpx;
}

/* 退出登录 */
.logout-section {
  padding: 40rpx 30rpx;
}
</style>