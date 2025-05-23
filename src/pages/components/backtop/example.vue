<template>
	<view class="example-page">
		<view class="content">
			<view class="section">
				<text class="title">zx-backtop 回到顶部组件</text>
				<text class="description">参考 Element Plus Backtop 组件优化的回到顶部按钮</text>
			</view>
			
			<view class="section">
				<text class="subtitle">基础用法</text>
				<text class="text">滚动页面超过 200px 后显示回到顶部按钮</text>
			</view>
			
			<view class="section">
				<text class="subtitle">主要特性</text>
				<view class="feature-list">
					<text class="feature-item">• 可自定义显示位置（left/right/bottom）</text>
					<text class="feature-item">• 支持多种动画效果（fade/slide/scale）</text>
					<text class="feature-item">• 可自定义图标和样式</text>
					<text class="feature-item">• 支持震动反馈</text>
					<text class="feature-item">• 可自定义触发高度</text>
				</view>
			</view>
			
			<!-- 创建足够的内容来产生滚动 -->
			<view v-for="i in 50" :key="i" class="scroll-item">
				<text>滚动内容 {{ i }} - 向下滚动查看回到顶部按钮</text>
			</view>
		</view>
		
		<!-- 基础用法 -->
		<zx-backtop 
			:scrollTop="scrollTop" 
			@click="onBacktopClick"
			@show="onShow"
			@hide="onHide"
		/>
		
		<!-- 自定义位置和样式的示例（取消注释使用） -->
		<!-- 
		<zx-backtop 
			:scrollTop="scrollTop"
			:left="50"
			:bottom="200"
			background-color="#409EFF"
			icon-color="#ffffff"
			animation="scale"
			:vibrate="true"
			@click="onCustomBacktopClick"
		>
			<view style="color: white; font-size: 12px;">UP</view>
		</zx-backtop>
		-->
	</view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrollTop = ref(0);

const updateScrollTop = () => {
	// 获取页面滚动位置
	uni.getSystemInfo({
		success: (res) => {
			scrollTop.value = res.scrollTop || 0;
		}
	});
};

// 监听页面滚动
const onPageScroll = (e) => {
	scrollTop.value = e.scrollTop;
};

onMounted(() => {
	// 在页面挂载时开始监听滚动
	updateScrollTop();
});

const onBacktopClick = () => {
	console.log('回到顶部按钮被点击');
	uni.showToast({
		title: '返回顶部',
		icon: 'success',
		duration: 1000
	});
};

const onCustomBacktopClick = () => {
	console.log('自定义回到顶部按钮被点击');
	uni.showToast({
		title: '自定义返回顶部',
		icon: 'success',
		duration: 1000
	});
};

const onShow = () => {
	console.log('回到顶部按钮显示');
};

const onHide = () => {
	console.log('回到顶部按钮隐藏');
};

// 导出页面滚动事件处理函数，供页面使用
defineExpose({
	onPageScroll
});
</script>

<style scoped>
.example-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.content {
	padding: 40rpx;
}

.section {
	margin-bottom: 60rpx;
}

.title {
	font-size: 48rpx;
	font-weight: bold;
	color: #303133;
	display: block;
	margin-bottom: 20rpx;
}

.subtitle {
	font-size: 36rpx;
	font-weight: 600;
	color: #409EFF;
	display: block;
	margin-bottom: 20rpx;
}

.description {
	font-size: 28rpx;
	color: #606266;
	line-height: 1.6;
	display: block;
}

.text {
	font-size: 28rpx;
	color: #606266;
	line-height: 1.6;
	display: block;
}

.feature-list {
	margin-top: 20rpx;
}

.feature-item {
	font-size: 28rpx;
	color: #606266;
	line-height: 1.8;
	display: block;
	margin-bottom: 10rpx;
}

.scroll-item {
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.scroll-item text {
	font-size: 28rpx;
	color: #303133;
}
</style> 