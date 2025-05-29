<template>
	<view class="example-container">
		<view class="section">
			<view class="section-title">组件方式</view>
			<view class="section-content">
				<zx-button @click="toggleComponentLoading">{{ componentLoading ? '关闭加载' : '显示加载' }}</zx-button>
				<zx-loading :show="componentLoading" text="加载中..." :mask="true"></zx-loading>
			</view>
		</view>

		<view class="section">
			<view class="section-title">直接使用API</view>
			<view class="section-content">
				<zx-button @click="showNativeLoading">显示原生加载</zx-button>
			</view>
		</view>

		<view class="section">
			<view class="section-title">使用组件方法</view>
			<view class="section-content">
				<zx-button @click="useComponentMethods">调用组件方法</zx-button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 组件引用
const loadingRef = ref(null)

// 组件方式加载
const componentLoading = ref(false)
const toggleComponentLoading = () => {
	componentLoading.value = !componentLoading.value

	// 3秒后自动关闭
	if (componentLoading.value) {
		setTimeout(() => {
			componentLoading.value = false
		}, 3000)
	}
}

// 直接使用uni API
const showNativeLoading = () => {
	uni.showLoading({
		title: '原生API加载中...',
		mask: true
	})

	// 3秒后关闭
	setTimeout(() => {
		uni.hideLoading()
	}, 3000)
}

// 使用组件方法
const useComponentMethods = () => {
	// 调用组件的open方法
	loadingRef.value.open()

	// 3秒后关闭
	setTimeout(() => {
		loadingRef.value.close()
	}, 3000)
}
</script>

<style scoped>
.example-container {
	padding: 30rpx;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.section-content {
	margin-bottom: 20rpx;
}
</style>