<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-loading 组件示例</text>
		</view>

		<view class="section">
			<text class="section-title">加载类型 (type)</text>
			<view class="loading-group">
				<zx-loading />
				<zx-loading type="spinner" />
			</view>
		</view>

		<view class="section">
			<text class="section-title">自定义颜色 (color)</text>
			<view class="loading-group">
				<zx-loading color="#1989fa" />
				<zx-loading type="spinner" color="#1989fa" />
			</view>
		</view>

		<view class="section">
			<text class="section-title">自定义大小 (size)</text>
			<view class="loading-group">
				<zx-loading size="24" />
				<zx-loading type="spinner" size="24px" />
        <zx-loading size="40rpx" />
			</view>
		</view>

		<view class="section">
			<text class="section-title">加载文案 (text)</text>
			<view class="loading-group">
				<zx-loading size="24px" text="加载中..." />
			</view>
		</view>

		<view class="section">
			<text class="section-title">垂直排列 (vertical)</text>
			<view class="loading-group">
				<zx-loading size="24px" vertical text="加载中..." />
			</view>
		</view>

		<view class="section">
			<text class="section-title">自定义文案颜色 (textColor)</text>
			<view class="loading-group">
				<zx-loading text-color="#0094ff" text="自定义文案颜色" />
				<zx-loading color="#1989fa" text-color="#0094ff" text="图标与文案颜色不同" />
			</view>
		</view>

    <view class="section">
			<text class="section-title">自定义文案大小 (textSize)</text>
			<view class="loading-group">
				<zx-loading text-size="20px" text="大号字体" />
        <zx-loading text-size="12rpx" text="小号字体" />
			</view>
		</view>

		<view class="section">
			<text class="section-title">通过 v-model:show 控制显示/隐藏</text>
			<button type="primary" @click="toggleShow">{{ showLoading ? '隐藏' : '显示' }}加载</button>
			<zx-loading :show="showLoading" text="v-model 控制" />
		</view>

		<view class="section">
			<text class="section-title">自定义图标 (slot icon)</text>
			<view class="loading-group">
				<zx-loading vertical text="自定义图标">
          <template #icon>
            <image style="width: 30px; height: 30px;" src="/static/logo.png" />
          </template>
        </zx-loading>
			</view>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';

const showLoading = ref(true);
const toggleShow = () => {
	showLoading.value = !showLoading.value;
};

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
