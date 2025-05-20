<template>
	<view class="page">
		<view class="page-title">头像 Avatar</view>
		
		<view class="section-title">基础用法</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar :src="defaultAvatar"></zx-avatar>
				<view class="avatar-desc">默认头像</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar shape="square" :src="defaultAvatar"></zx-avatar>
				<view class="avatar-desc">方形头像</view>
			</view>
		</view>
		
		<view class="section-title">大小尺寸</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar size="60rpx" :src="defaultAvatar"></zx-avatar>
				<view class="avatar-desc">小尺寸</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar size="100rpx" :src="defaultAvatar"></zx-avatar>
				<view class="avatar-desc">默认尺寸</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar size="140rpx" :src="defaultAvatar"></zx-avatar>
				<view class="avatar-desc">大尺寸</view>
			</view>
		</view>
		
		<view class="section-title">文字头像</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar text="张"></zx-avatar>
				<view class="avatar-desc">默认颜色</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="李" bgColor="#ff6600" color="#fff"></zx-avatar>
				<view class="avatar-desc">自定义颜色</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="王" shape="square" bgColor="#5ac725"></zx-avatar>
				<view class="avatar-desc">方形文字</view>
			</view>
		</view>
		
		<view class="section-title">图标头像</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar icon="person"></zx-avatar>
				<view class="avatar-desc">默认图标</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar icon="star" bgColor="#ff9500"></zx-avatar>
				<view class="avatar-desc">自定义颜色</view>
			</view>
		</view>
		
		<view class="section-title">随机背景色</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar text="随" randomBgColor></zx-avatar>
				<view class="avatar-desc">随机颜色1</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="机" randomBgColor></zx-avatar>
				<view class="avatar-desc">随机颜色2</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="色" randomBgColor></zx-avatar>
				<view class="avatar-desc">随机颜色3</view>
			</view>
		</view>
		
		<view class="section-title">指定颜色索引</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar text="红" randomBgColor colorIndex="3"></zx-avatar>
				<view class="avatar-desc">红色系</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="绿" randomBgColor colorIndex="7"></zx-avatar>
				<view class="avatar-desc">绿色系</view>
			</view>
			<view class="avatar-demo">
				<zx-avatar text="蓝" randomBgColor colorIndex="15"></zx-avatar>
				<view class="avatar-desc">蓝色系</view>
			</view>
		</view>
		
		<view class="section-title">点击预览</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar :src="defaultAvatar" :preview="true"></zx-avatar>
				<view class="avatar-desc">点击预览图片</view>
			</view>
		</view>
		
		<view class="section-title">点击事件</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar :src="defaultAvatar" @click="clickAvatar"></zx-avatar>
				<view class="avatar-desc">点击触发事件</view>
			</view>
		</view>
		
		<view class="section-title">加载状态演示</view>
		<view class="section-content">
			<view class="avatar-demo">
				<zx-avatar :src="loadingAvatar"></zx-avatar>
				<view class="avatar-desc">加载中状态</view>
			</view>
			<view class="avatar-demo">
				<button class="btn" @click="changeAvatar">{{isDefaultAvatar ? '切换为错误链接' : '恢复正常链接'}}</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 默认头像链接
const defaultAvatar = ref('https://picsum.photos/200');
// 错误头像链接（用于演示加载失败的情况）
const errorAvatar = ref('https://example.com/not-exist.jpg');
// 当前使用的头像链接
const loadingAvatar = ref(defaultAvatar.value);
// 是否使用默认头像
const isDefaultAvatar = ref(true);

// 点击头像事件
const clickAvatar = () => {
	uni.showToast({
		title: '点击了头像',
		icon: 'none'
	});
};

// 切换头像链接方法
const changeAvatar = () => {
	isDefaultAvatar.value = !isDefaultAvatar.value;
	loadingAvatar.value = isDefaultAvatar.value ? defaultAvatar.value : errorAvatar.value;
};
</script>

<style lang="scss" scoped>
.page {
	padding: 30rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 40rpx;
	text-align: center;
}

.section-title {
	font-size: 30rpx;
	color: #333;
	margin: 30rpx 0 20rpx;
	font-weight: bold;
}

.section-content {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
}

.avatar-demo {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-right: 40rpx;
	margin-bottom: 20rpx;
}

.avatar-desc {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
}

.btn {
	font-size: 28rpx;
	padding: 12rpx 24rpx;
	background-color: #2979ff;
	color: #fff;
	border-radius: 6rpx;
}
</style> 