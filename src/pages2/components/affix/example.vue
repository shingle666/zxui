<template>
	<view class="example-page">
		<view class="content">
			<view class="section">
				<text class="title">zx-affix 固钉组件</text>
				<text class="description">参考 Element Plus Affix 组件实现的固钉功能</text>
			</view>
			
			<view class="section">
				<text class="subtitle">基础用法</text>
				<text class="text">固钉默认固定在页面顶部，通过设置 offset 属性改变吸顶距离</text>
			</view>
			
			<view class="section">
				<text class="subtitle">主要特性</text>
				<view class="feature-list">
					<text class="feature-item">• 支持顶部和底部固定（position: top/bottom）</text>
					<text class="feature-item">• 可自定义偏移距离（offset）</text>
					<text class="feature-item">• 支持指定容器范围（target）</text>
					<text class="feature-item">• 提供状态变化和滚动事件</text>
					<text class="feature-item">• 支持手动更新位置信息</text>
				</view>
			</view>

			<!-- 基础用法示例 -->
			<view class="demo-section">
				<text class="demo-title">基础用法</text>
				<zx-affix :offset="120" @change="onAffixChange" @scroll="onAffixScroll">
					<view class="affix-btn primary">
						<text>Offset top 120px</text>
					</view>
				</zx-affix>
			</view>

			<!-- 创建足够的内容来产生滚动 -->
			<view v-for="i in 15" :key="`content-${i}`" class="scroll-item">
				<text>滚动内容 {{ i }} - 向下滚动查看固钉效果</text>
			</view>

			<!-- 指定容器示例 -->
			<view class="demo-section">
				<text class="demo-title">指定容器</text>
				<text class="demo-desc">固钉始终保持在容器内，超过范围则隐藏</text>
				
				<view class="affix-container" id="targetContainer">
					<zx-affix target="#targetContainer" :offset="80" @change="onTargetAffixChange">
						<view class="affix-btn success">
							<text>Target container</text>
						</view>
					</zx-affix>
					
					<!-- 容器内容 -->
					<view v-for="i in 10" :key="`container-${i}`" class="container-item">
						<text>容器内容 {{ i }}</text>
					</view>
				</view>
			</view>

			<!-- 更多滚动内容 -->
			<view v-for="i in 20" :key="`more-${i}`" class="scroll-item">
				<text>更多内容 {{ i }} - 继续滚动查看底部固钉</text>
			</view>

			<!-- 底部固定示例 -->
			<view class="demo-section">
				<text class="demo-title">底部固定</text>
				<zx-affix position="bottom" :offset="20" @change="onBottomAffixChange">
					<view class="affix-btn warning">
						<text>Offset bottom 20px</text>
					</view>
				</zx-affix>
			</view>

			<!-- 额外内容 -->
			<view v-for="i in 10" :key="`extra-${i}`" class="scroll-item">
				<text>额外内容 {{ i }} - 滚动到底部查看固钉效果</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 状态展示
const showToast = (message) => {
	uni.showToast({
		title: message,
		icon: 'none',
		duration: 2000
	});
};

// 基础固钉事件
const onAffixChange = (fixed) => {
	console.log('基础固钉状态变化:', fixed);
	showToast(`基础固钉 ${fixed ? '已固定' : '已取消固定'}`);
};

const onAffixScroll = (scrollInfo) => {
	// console.log('基础固钉滚动:', scrollInfo);
};

// 容器固钉事件
const onTargetAffixChange = (fixed) => {
	console.log('容器固钉状态变化:', fixed);
	showToast(`容器固钉 ${fixed ? '已固定' : '已取消固定'}`);
};

// 底部固钉事件
const onBottomAffixChange = (fixed) => {
	console.log('底部固钉状态变化:', fixed);
	showToast(`底部固钉 ${fixed ? '已固定' : '已取消固定'}`);
};

onMounted(() => {
	// 组件挂载后的初始化操作
	console.log('zx-affix 示例页面已加载');
});
</script>

<style scoped>
.example-page {
	min-height: 200vh; /* 确保有足够的滚动空间 */
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

/* 演示区域 */
.demo-section {
	margin: 60rpx 0;
	padding: 40rpx;
	background-color: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #303133;
	display: block;
	margin-bottom: 20rpx;
}

.demo-desc {
	font-size: 26rpx;
	color: #909399;
	display: block;
	margin-bottom: 30rpx;
}

/* 固钉按钮样式 */
.affix-btn {
	padding: 20rpx 40rpx;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.affix-btn text {
	font-size: 28rpx;
	font-weight: 500;
	color: white;
}

.affix-btn.primary {
	background: linear-gradient(135deg, #409EFF, #66b3ff);
}

.affix-btn.success {
	background: linear-gradient(135deg, #67C23A, #85ce61);
}

.affix-btn.warning {
	background: linear-gradient(135deg, #E6A23C, #ebb563);
}

/* 指定容器样式 */
.affix-container {
	position: relative;
	height: 800rpx;
	padding: 40rpx;
	background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
	border: 2rpx dashed #409EFF;
	border-radius: 12rpx;
	overflow: hidden;
}

.container-item {
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 8rpx;
}

.container-item text {
	font-size: 28rpx;
	color: #303133;
}

/* 滚动内容 */
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

/* 响应式适配 */
@media (max-width: 750rpx) {
	.content {
		padding: 30rpx;
	}
	
	.demo-section {
		padding: 30rpx;
	}
	
	.affix-container {
		height: 600rpx;
		padding: 30rpx;
	}
}
</style> 