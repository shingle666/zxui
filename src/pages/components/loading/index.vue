<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-loading组件示例</text>
		</view>
		
		<view class="section">
			<text class="section-title">基础用法</text>
			<button type="primary" @click="basicLoading = true">显示加载</button>
			<zx-loading v-model:show="basicLoading" />
		</view>
		
		<view class="section">
			<text class="section-title">自定义文本</text>
			<button type="primary" @click="textLoading = true">显示自定义文本</button>
			<zx-loading v-model:show="textLoading" text="数据加载中..." />
		</view>
		
		<view class="section">
			<text class="section-title">带遮罩层</text>
			<button type="primary" @click="maskLoading = true">显示带遮罩的加载</button>
			<zx-loading v-model:show="maskLoading" mask />
		</view>
		
		<view class="section">
			<text class="section-title">通过ref调用方法</text>
			<button type="primary" @click="openLoading">显示加载</button>
			<button type="default" @click="closeLoading">关闭加载</button>
			<zx-loading ref="loadingRef" text="使用ref调用..." />
		</view>
		
		<view class="section">
			<text class="section-title">模拟异步请求</text>
			<button type="primary" @click="mockRequest">模拟请求数据</button>
			<view v-if="requestDone" class="result-box">
				<text>数据加载完成</text>
			</view>
			<zx-loading v-model:show="requestLoading" text="请求数据中..." />
		</view>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

// 基础用法
const basicLoading = ref(false);

// 自定义文本
const textLoading = ref(false);

// 带遮罩层
const maskLoading = ref(false);

// 通过ref调用方法
const loadingRef = ref(null);
const openLoading = () => {
	loadingRef.value.open();
};
const closeLoading = () => {
	loadingRef.value.close();
};

// 模拟异步请求
const requestLoading = ref(false);
const requestDone = ref(false);
const mockRequest = () => {
	requestLoading.value = true;
	requestDone.value = false;
	
	// 模拟网络请求，3秒后关闭loading
	setTimeout(() => {
		requestLoading.value = false;
		requestDone.value = true;
	}, 3000);
};

// 监听基础用法loading状态，2秒后自动关闭
watch(basicLoading, (val) => {
	if (val) {
		setTimeout(() => {
			basicLoading.value = false;
		}, 2000);
	}
});

// 监听自定义文本loading状态，2秒后自动关闭
watch(textLoading, (val) => {
	if (val) {
		setTimeout(() => {
			textLoading.value = false;
		}, 2000);
	}
});

// 监听带遮罩loading状态，2秒后自动关闭
watch(maskLoading, (val) => {
	if (val) {
		setTimeout(() => {
			maskLoading.value = false;
		}, 2000);
	}
});
</script>

<style>
.container {
	padding: 30rpx;
}

.header {
	margin-bottom: 50rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
}

.section {
	margin-bottom: 40rpx;
	border-bottom: 1px solid #eee;
	padding-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	margin-bottom: 20rpx;
	display: block;
	font-weight: bold;
}

button {
	margin: 10rpx 0;
}

.result-box {
	background-color: #f8f8f8;
	padding: 20rpx;
	margin-top: 20rpx;
	border-radius: 8rpx;
}
</style>
