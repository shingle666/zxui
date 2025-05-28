	<template>
		<view class="demo-container">
			<scroll-view scroll-y class="demo-scroll">
				<!-- 基础用法 -->
				<view class="demo-section">
					<text class="demo-title">基础用法</text>
					<zx-navbar title="标题" left-text="返回" right-text="更多" @left-click="onLeftClick"
						@right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 副标题 -->
				<view class="demo-section">
					<text class="demo-title">带副标题</text>
					<zx-navbar title="主标题" subtitle="副标题" :auto-back="false"></zx-navbar>
				</view>

				<!-- 透明背景 -->
				<view class="demo-section">
					<text class="demo-title">透明背景</text>
					<zx-navbar title="透明导航栏" :transparent="true" left-icon="arrow-left" right-icon="more-horizontal"
						@left-click="onLeftClick" @right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 沉浸式模式 -->
				<view class="demo-section">
					<text class="demo-title">沉浸式模式</text>
					<zx-navbar title="沉浸式导航栏" :immersive="true" :shadow="true" left-icon="arrow-left"
						right-icon="search" @left-click="onLeftClick" @right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 暗色主题 -->
				<view class="demo-section">
					<text class="demo-title">暗色主题</text>
					<zx-navbar title="暗色主题" theme="dark" bg-color="#1f1f1f" left-icon="arrow-left" right-icon="settings"
						left-icon-color="#ffffff" right-icon-color="#ffffff" @left-click="onLeftClick"
						@right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 加载状态 -->
				<view class="demo-section">
					<text class="demo-title">加载状态</text>
					<zx-navbar title="正在加载..." :loading="true" left-icon="arrow-left" :left-disabled="true"
						@left-click="onLeftClick"></zx-navbar>
				</view>

				<!-- 自定义颜色 -->
				<view class="demo-section">
					<text class="demo-title">自定义颜色</text>
					<zx-navbar title="自定义导航栏" bg-color="#007AFF" left-icon="arrow-left" right-text="完成"
						left-icon-color="#ffffff" right-icon-color="#ffffff" :title-style="{ color: '#ffffff' }"
						@left-click="onLeftClick" @right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 固定在顶部 -->
				<view class="demo-section">
					<text class="demo-title">固定在顶部</text>
					<zx-navbar title="固定导航栏" :fixed="true" :shadow="true" left-icon="arrow-left" right-icon="share"
						@left-click="onLeftClick" @right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 自定义插槽 -->
				<view class="demo-section">
					<text class="demo-title">自定义插槽</text>
					<zx-navbar :auto-back="false" @left-click="onLeftClick" @right-click="onRightClick">
						<template #left>
							<view class="custom-left">
								<zx-icon name="arrow-left" size="20" color="#333"></zx-icon>
								<text class="custom-text">首页</text>
							</view>
						</template>
						<template #center>
							<view class="custom-center">
								<zx-icon name="logo" size="24"></zx-icon>
								<text class="custom-title">品牌名称</text>
							</view>
						</template>
						<template #right>
							<view class="custom-right">
								<zx-icon name="search" size="20" color="#333" style="margin-right: 10px;"></zx-icon>
								<zx-icon name="shopping-cart" size="20" color="#333"></zx-icon>
							</view>
						</template>
					</zx-navbar>
				</view>

				<!-- 渐变背景 -->
				<view class="demo-section">
					<text class="demo-title">渐变背景</text>
					<zx-navbar title="渐变导航栏" left-icon="arrow-left" right-icon="more"
						bg-color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" left-icon-color="#ffffff"
						right-icon-color="#ffffff" :title-style="{ color: '#ffffff' }" @left-click="onLeftClick"
						@right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 底部边框 -->
				<view class="demo-section">
					<text class="demo-title">底部边框</text>
					<zx-navbar title="带边框" :border="true" border-color="#e0e0e0" left-icon="arrow-left" right-text="编辑"
						@left-click="onLeftClick" @right-click="onRightClick"></zx-navbar>
				</view>

				<!-- 功能演示区域 -->
				<view class="demo-content">
					<text class="demo-info">点击导航栏按钮测试功能</text>
					<view class="demo-actions">
						<button @click="toggleLoading">切换加载状态</button>
						<button @click="toggleTheme">切换主题</button>
					</view>
				</view>
			</scroll-view>
		</view>
	</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);
const currentTheme = ref('light');

const onLeftClick = () => {
	console.log('点击了左侧按钮');
	uni.showToast({
		title: '点击了左侧按钮',
		icon: 'none'
	});
};

const onRightClick = () => {
	console.log('点击了右侧按钮');
	uni.showToast({
		title: '点击了右侧按钮',
		icon: 'none'
	});
};

const toggleLoading = () => {
	loading.value = !loading.value;
};

const toggleTheme = () => {
	currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
};
</script>

<style lang="scss" scoped>
.demo-container {
	height: 100vh;
	background-color: #f5f5f5;
}

.demo-scroll {
	height: 100%;
}

.demo-section {
	margin-bottom: 40rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.demo-title {
	display: block;
	padding: 30rpx;
	font-size: 32rpx;
	font-weight: 500;
	color: #333333;
	background-color: #fafafa;
	border-bottom: 1px solid #eeeeee;
}

.demo-content {
	padding: 60rpx 30rpx;
	text-align: center;
}

.demo-info {
	display: block;
	font-size: 28rpx;
	color: #666666;
	margin-bottom: 40rpx;
}

.demo-actions {
	display: flex;
	justify-content: center;
	gap: 20rpx;

	button {
		padding: 20rpx 40rpx;
		font-size: 28rpx;
		border-radius: 8rpx;
		border: 1px solid #007AFF;
		color: #007AFF;
		background-color: transparent;

		&:active {
			background-color: #007AFF;
			color: #ffffff;
		}
	}
}

// 自定义插槽样式
.custom-left {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.custom-text {
	font-size: 28rpx;
	color: #333333;
}

.custom-center {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.custom-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
}

.custom-right {
	display: flex;
	align-items: center;
	gap: 20rpx;
}
</style> 