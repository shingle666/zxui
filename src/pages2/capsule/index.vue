<template>
	<view class="container">
		<view class="title">胶囊组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-capsule>
				<view class="capsule-content">基础胶囊</view>
			</zx-capsule>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<zx-capsule 
				backgroundColor="#ff4d4f" 
				:width="150" 
				:height="40" 
				:borderRadius="20"
			>
				<view class="capsule-content light">自定义颜色和尺寸</view>
			</zx-capsule>
		</view>
		
		<!-- 边框样式 -->
		<view class="section">
			<view class="section-title">边框样式</view>
			<zx-capsule 
				backgroundColor="#fff" 
				borderColor="#1890ff"
				:borderWidth="1"
				:width="150" 
				:height="40"
			>
				<view class="capsule-content">带边框胶囊</view>
			</zx-capsule>
		</view>
		
		<!-- 阴影效果 -->
		<view class="section">
			<view class="section-title">阴影效果</view>
			<zx-capsule 
				backgroundColor="#fff" 
				:shadow="true"
				:width="150" 
				:height="40"
			>
				<view class="capsule-content">带阴影胶囊</view>
			</zx-capsule>
		</view>
		
		<!-- 固定定位示例 -->
		<view class="section">
			<view class="section-title">固定定位示例</view>
			<view class="tip">查看页面右上角的固定胶囊</view>
		</view>
		
		<!-- 固定定位的胶囊 -->
		<zx-capsule 
			:fixed="true"
			:autoPosition="true"
			backgroundColor="rgba(0,0,0,0.6)"
			:right="10"
			@created="onCapsuleCreated"
		>
			<view class="capsule-content light">
				<text class="iconfont icon-home"></text>
				<text class="btn-text">首页</text>
			</view>
		</zx-capsule>
	</view>
</template>

<script setup>
/**
 * zx-capsule 组件使用示例
 */
import { ref } from 'vue';

// 胶囊信息
const capsuleInfo = ref({});

// 胶囊创建回调
const onCapsuleCreated = (info) => {
	console.log('胶囊信息:', info);
	capsuleInfo.value = info;
};
</script>

<style scoped>
.container {
	padding: 20rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	text-align: center;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 30rpx;
	margin-bottom: 20rpx;
	color: #666;
}

.capsule-content {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-size: 28rpx;
}

.light {
	color: #fff;
}

.tip {
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
}

.iconfont {
	margin-right: 6rpx;
}

.btn-text {
	font-size: 24rpx;
}
</style> 