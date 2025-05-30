<template>
	<view class="container">
		<view class="header">
			<text class="title">加载动画 Loading Icon</text>
			<text class="subtitle">一个简洁的加载动画组件，用于展示正在加载的状态</text>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="demo-box">
				<zx-loading-icon></zx-loading-icon>
			</view>
		</view>
		
		<!-- 不同模式 -->
		<view class="section">
			<view class="section-title">不同模式</view>
			<view class="demo-row">
				<view class="demo-item">
					<zx-loading-icon mode="circle"></zx-loading-icon>
					<text class="demo-text">circle</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon mode="spinner"></zx-loading-icon>
					<text class="demo-text">spinner</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon mode="semicircle"></zx-loading-icon>
					<text class="demo-text">semicircle</text>
				</view>
			</view>
		</view>
		
		<!-- 自定义颜色 -->
		<view class="section">
			<view class="section-title">自定义颜色</view>
			<view class="demo-row">
				<view class="demo-item">
					<zx-loading-icon color="#3c9cff"></zx-loading-icon>
					<text class="demo-text">蓝色</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon color="#f56c6c"></zx-loading-icon>
					<text class="demo-text">红色</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon color="#5ac725"></zx-loading-icon>
					<text class="demo-text">绿色</text>
				</view>
			</view>
		</view>
		
		<!-- 自定义大小 -->
		<view class="section">
			<view class="section-title">自定义大小</view>
			<view class="demo-row">
				<view class="demo-item">
					<zx-loading-icon size="40rpx"></zx-loading-icon>
					<text class="demo-text">小</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon size="60rpx"></zx-loading-icon>
					<text class="demo-text">中</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon size="80rpx"></zx-loading-icon>
					<text class="demo-text">大</text>
				</view>
			</view>
		</view>
		
		<!-- 显示文字 -->
		<view class="section">
			<view class="section-title">显示文字</view>
			<view class="demo-box">
				<zx-loading-icon text="加载中" color="#3c9cff"></zx-loading-icon>
			</view>
		</view>
		
		<!-- 文字垂直排列 -->
		<view class="section">
			<view class="section-title">文字垂直排列</view>
			<view class="demo-box">
				<zx-loading-icon text="加载中" vertical color="#3c9cff"></zx-loading-icon>
			</view>
		</view>
		
		<!-- 自定义文字样式 -->
		<view class="section">
			<view class="section-title">自定义文字样式</view>
			<view class="demo-box">
				<zx-loading-icon 
					text="加载中" 
					textSize="28rpx" 
					textColor="#f56c6c"
					color="#f56c6c">
				</zx-loading-icon>
			</view>
		</view>
		
		<!-- 自定义动画 -->
		<view class="section">
			<view class="section-title">自定义动画</view>
			<view class="demo-row">
				<view class="demo-item">
					<zx-loading-icon 
						color="#3c9cff" 
						duration="800">
					</zx-loading-icon>
					<text class="demo-text">快速</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon 
						color="#3c9cff" 
						duration="1200">
					</zx-loading-icon>
					<text class="demo-text">标准</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon 
						color="#3c9cff" 
						duration="2000">
					</zx-loading-icon>
					<text class="demo-text">慢速</text>
				</view>
			</view>
		</view>
		
		<!-- 非激活颜色 -->
		<view class="section">
			<view class="section-title">设置非激活颜色</view>
			<view class="demo-row">
				<view class="demo-item">
					<zx-loading-icon 
						mode="circle" 
						color="#3c9cff"
						inactiveColor="#e4e4e4">
					</zx-loading-icon>
					<text class="demo-text">自定义</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon 
						mode="circle" 
						color="#f56c6c"
						inactiveColor="#f9d7d7">
					</zx-loading-icon>
					<text class="demo-text">自定义</text>
				</view>
				<view class="demo-item">
					<zx-loading-icon 
						mode="circle" 
						color="#5ac725"
						inactiveColor="#d9f5d6">
					</zx-loading-icon>
					<text class="demo-text">自定义</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
// 导入需要的组件
import { ref } from 'vue';
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.header {
	margin-bottom: 40rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #909399;
	}
}

.section {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	
	.section-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 30rpx;
	}
}

.demo-box {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f5f5f5;
	border-radius: 8rpx;
	padding: 40rpx;
}

.demo-row {
	display: flex;
	justify-content: space-around;
	align-items: center;
	
	.demo-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.demo-text {
			font-size: 24rpx;
			color: #909399;
			margin-top: 20rpx;
		}
	}
}
</style>
