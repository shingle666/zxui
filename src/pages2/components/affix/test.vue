<template>
	<view class="test-page">
		<view class="test-header">
			<text class="test-title">zx-affix 组件测试</text>
			<text class="test-desc">验证各种配置和功能</text>
		</view>

		<!-- 测试状态显示 -->
		<view class="status-panel">
			<text class="status-title">固钉状态</text>
			<view class="status-list">
				<text class="status-item">基础固钉: {{ basicFixed ? '已固定' : '未固定' }}</text>
				<text class="status-item">容器固钉: {{ containerFixed ? '已固定' : '未固定' }}</text>
				<text class="status-item">底部固钉: {{ bottomFixed ? '已固定' : '未固定' }}</text>
				<text class="status-item">滚动距离: {{ scrollTop }}px</text>
			</view>
		</view>

		<!-- 控制面板 -->
		<view class="control-panel">
			<text class="control-title">控制面板</text>
			<view class="control-group">
				<button @click="manualUpdate" type="primary" size="mini">手动更新</button>
				<button @click="updateRoot" type="primary" size="mini">更新根元素</button>
				<button @click="scrollToTop" type="default" size="mini">回到顶部</button>
				<button @click="scrollToBottom" type="default" size="mini">滚动到底部</button>
			</view>
		</view>

		<!-- 基础固钉测试 -->
		<view class="test-section">
			<text class="section-title">基础固钉测试</text>
			<zx-affix 
				ref="basicAffixRef"
				:offset="80" 
				@change="onBasicChange" 
				@scroll="onScroll"
			>
				<view class="test-affix basic">
					<text>基础固钉 (offset: 80px)</text>
				</view>
			</zx-affix>
		</view>

		<!-- 滚动内容 -->
		<view v-for="i in 10" :key="`content-${i}`" class="content-block">
			<text>测试内容 {{ i }} - 滚动查看固钉效果</text>
		</view>

		<!-- 容器固钉测试 -->
		<view class="test-section">
			<text class="section-title">容器固钉测试</text>
			<view class="test-container" id="testContainer">
				<zx-affix 
					ref="containerAffixRef"
					target="#testContainer" 
					:offset="50" 
					@change="onContainerChange"
				>
					<view class="test-affix container">
						<text>容器固钉 (offset: 50px)</text>
					</view>
				</zx-affix>
				
				<view v-for="i in 8" :key="`container-${i}`" class="container-block">
					<text>容器内容 {{ i }}</text>
				</view>
			</view>
		</view>

		<!-- 更多内容 -->
		<view v-for="i in 15" :key="`more-${i}`" class="content-block">
			<text>更多内容 {{ i }} - 继续滚动</text>
		</view>

		<!-- 底部固钉测试 -->
		<view class="test-section">
			<text class="section-title">底部固钉测试</text>
			<zx-affix 
				ref="bottomAffixRef"
				position="bottom" 
				:offset="30" 
				@change="onBottomChange"
			>
				<view class="test-affix bottom">
					<text>底部固钉 (offset: 30px)</text>
				</view>
			</zx-affix>
		</view>

		<!-- 结尾内容 -->
		<view v-for="i in 8" :key="`end-${i}`" class="content-block">
			<text>结尾内容 {{ i }} - 测试底部固钉</text>
		</view>

		<!-- 测试日志 -->
		<view class="log-panel">
			<text class="log-title">测试日志</text>
			<view class="log-content">
				<text 
					v-for="(log, index) in logs" 
					:key="index" 
					class="log-item"
				>
					{{ log }}
				</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 组件引用
const basicAffixRef = ref(null);
const containerAffixRef = ref(null);
const bottomAffixRef = ref(null);

// 状态数据
const basicFixed = ref(false);
const containerFixed = ref(false);
const bottomFixed = ref(false);
const scrollTop = ref(0);
const logs = ref([]);

// 添加日志
const addLog = (message) => {
	const timestamp = new Date().toLocaleTimeString();
	logs.value.unshift(`[${timestamp}] ${message}`);
	if (logs.value.length > 20) {
		logs.value.pop();
	}
};

// 事件处理
const onBasicChange = (fixed) => {
	basicFixed.value = fixed;
	addLog(`基础固钉状态变化: ${fixed ? '已固定' : '已取消固定'}`);
};

const onContainerChange = (fixed) => {
	containerFixed.value = fixed;
	addLog(`容器固钉状态变化: ${fixed ? '已固定' : '已取消固定'}`);
};

const onBottomChange = (fixed) => {
	bottomFixed.value = fixed;
	addLog(`底部固钉状态变化: ${fixed ? '已固定' : '已取消固定'}`);
};

const onScroll = (info) => {
	scrollTop.value = info.scrollTop;
};

// 控制方法
const manualUpdate = () => {
	if (basicAffixRef.value) {
		basicAffixRef.value.update();
		addLog('手动更新基础固钉');
	}
	if (containerAffixRef.value) {
		containerAffixRef.value.update();
		addLog('手动更新容器固钉');
	}
	if (bottomAffixRef.value) {
		bottomAffixRef.value.update();
		addLog('手动更新底部固钉');
	}
};

const updateRoot = () => {
	if (basicAffixRef.value) {
		basicAffixRef.value.updateRoot();
		addLog('更新基础固钉根元素');
	}
	if (containerAffixRef.value) {
		containerAffixRef.value.updateRoot();
		addLog('更新容器固钉根元素');
	}
	if (bottomAffixRef.value) {
		bottomAffixRef.value.updateRoot();
		addLog('更新底部固钉根元素');
	}
};

const scrollToTop = () => {
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 300
	});
	addLog('滚动到顶部');
};

const scrollToBottom = () => {
	uni.pageScrollTo({
		scrollTop: 99999,
		duration: 300
	});
	addLog('滚动到底部');
};

onMounted(() => {
	addLog('测试页面已加载');
	
	// 延迟初始化
	setTimeout(() => {
		addLog('开始执行初始化测试');
		manualUpdate();
	}, 1000);
});
</script>

<style scoped>
.test-page {
	min-height: 400vh;
	background-color: #f8f9fa;
	padding: 30rpx;
}

.test-header {
	text-align: center;
	margin-bottom: 40rpx;
	padding: 30rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.test-title {
	font-size: 42rpx;
	font-weight: bold;
	color: #1f2937;
	display: block;
	margin-bottom: 12rpx;
}

.test-desc {
	font-size: 28rpx;
	color: #6b7280;
	display: block;
}

/* 状态面板 */
.status-panel {
	margin-bottom: 30rpx;
	padding: 30rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.status-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #374151;
	display: block;
	margin-bottom: 20rpx;
}

.status-list {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.status-item {
	font-size: 26rpx;
	color: #6b7280;
	padding: 12rpx 20rpx;
	background: #f3f4f6;
	border-radius: 6rpx;
}

/* 控制面板 */
.control-panel {
	margin-bottom: 30rpx;
	padding: 30rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.control-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #374151;
	display: block;
	margin-bottom: 20rpx;
}

.control-group {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
}

/* 测试区域 */
.test-section {
	margin: 40rpx 0;
	padding: 30rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #374151;
	display: block;
	margin-bottom: 24rpx;
}

.test-affix {
	padding: 20rpx 30rpx;
	border-radius: 8rpx;
	text-align: center;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.test-affix text {
	font-size: 28rpx;
	font-weight: 500;
	color: white;
}

.test-affix.basic {
	background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.test-affix.container {
	background: linear-gradient(135deg, #10b981, #34d399);
}

.test-affix.bottom {
	background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

/* 容器测试 */
.test-container {
	height: 600rpx;
	padding: 30rpx;
	background: linear-gradient(135deg, #e0f2fe, #bae6fd);
	border: 2rpx dashed #0ea5e9;
	border-radius: 12rpx;
	overflow: hidden;
	position: relative;
}

.container-block {
	padding: 20rpx;
	margin-bottom: 16rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 6rpx;
}

.container-block text {
	font-size: 26rpx;
	color: #374151;
}

/* 内容块 */
.content-block {
	padding: 30rpx;
	margin-bottom: 20rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 1rpx 3rpx rgba(0, 0, 0, 0.1);
}

.content-block text {
	font-size: 28rpx;
	color: #374151;
}

/* 日志面板 */
.log-panel {
	margin-top: 40rpx;
	padding: 30rpx;
	background: #1f2937;
	border-radius: 12rpx;
	max-height: 600rpx;
}

.log-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #f9fafb;
	display: block;
	margin-bottom: 20rpx;
}

.log-content {
	max-height: 400rpx;
	overflow-y: auto;
}

.log-item {
	font-size: 24rpx;
	color: #d1d5db;
	display: block;
	margin-bottom: 8rpx;
	font-family: 'Monaco', 'Consolas', monospace;
	line-height: 1.4;
}
</style> 