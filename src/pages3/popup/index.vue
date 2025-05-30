<template>
	<view class="container">
		<view class="header">
			<text class="title">Popup 弹出层</text>
			<text class="description">弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出</text>
		</view>
		
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="button-group">
				<zx-button @click="showPopup('center')">居中弹出</zx-button>
				<zx-button @click="showPopup('top')">顶部弹出</zx-button>
				<zx-button @click="showPopup('bottom')">底部弹出</zx-button>
				<zx-button @click="showPopup('left')">左侧弹出</zx-button>
				<zx-button @click="showPopup('right')">右侧弹出</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">关闭图标</view>
			<view class="button-group">
				<zx-button @click="showCloseablePopup('top-left')">左上角图标</zx-button>
				<zx-button @click="showCloseablePopup('top-right')">右上角图标</zx-button>
				<zx-button @click="showCloseablePopup('bottom-left')">左下角图标</zx-button>
				<zx-button @click="showCloseablePopup('bottom-right')">右下角图标</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">圆角弹窗</view>
			<view class="button-group">
				<zx-button @click="showRoundPopup('5rpx')">小圆角</zx-button>
				<zx-button @click="showRoundPopup('15rpx')">中圆角</zx-button>
				<zx-button @click="showRoundPopup('30rpx')">大圆角</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">滚动演示</view>
			<view class="button-group">
				<zx-button @click="showScrollPopup(true)">锁定背景滚动</zx-button>
				<zx-button @click="showScrollPopup(false)">允许背景滚动</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">高级特性</view>
			<view class="button-group">
				<zx-button @click="showCustomPopup(true)">支持ESC关闭</zx-button>
				<zx-button @click="showCustomPopup(false)">禁用ESC关闭</zx-button>
			</view>
		</view>
		
		<!-- 基础弹窗 -->
		<zx-popup :show="basicPopupShow" :mode="popupMode" @close="basicPopupShow = false">
			<view class="popup-content">
				<text class="popup-title">{{ popupMode }}弹窗</text>
				<view class="popup-text">这是一个{{ popupMode }}弹出的弹窗</view>
				<zx-button @click="basicPopupShow = false">关闭弹窗</zx-button>
			</view>
		</zx-popup>
		
		<!-- 带关闭图标的弹窗 -->
		<zx-popup 
			:show="closeablePopupShow" 
			mode="center" 
			closeable 
			:closeIconPos="closeIconPos" 
			@close="closeablePopupShow = false"
		>
			<view class="popup-content">
				<text class="popup-title">带关闭图标的弹窗</text>
				<view class="popup-text">关闭图标位置：{{ closeIconPos }}</view>
				<zx-button @click="closeablePopupShow = false">关闭弹窗</zx-button>
			</view>
		</zx-popup>
		
		<!-- 圆角弹窗 -->
		<zx-popup 
			:show="roundPopupShow" 
			mode="bottom" 
			:round="roundValue" 
			@close="roundPopupShow = false"
		>
			<view class="popup-content">
				<text class="popup-title">圆角弹窗</text>
				<view class="popup-text">圆角大小：{{ roundValue }}</view>
				<zx-button @click="roundPopupShow = false">关闭弹窗</zx-button>
			</view>
		</zx-popup>
		
		<!-- 滚动相关弹窗 -->
		<zx-popup 
			:show="scrollPopupShow" 
			mode="bottom" 
			:lockScroll="lockScrollValue" 
			@close="scrollPopupShow = false"
		>
			<view class="popup-content scroll-content">
				<text class="popup-title">滚动演示</text>
				<view class="popup-text">背景滚动状态：{{ lockScrollValue ? '锁定' : '可滚动' }}</view>
				<view class="scroll-list">
					<view class="scroll-item" v-for="i in 20" :key="i">列表项 {{ i }}</view>
				</view>
				<zx-button @click="scrollPopupShow = false">关闭弹窗</zx-button>
			</view>
		</zx-popup>
		
		<!-- 自定义特性弹窗 -->
		<zx-popup 
			:show="customPopupShow" 
			mode="center" 
			:closeOnEsc="closeOnEscValue" 
			@close="customPopupShow = false"
		>
			<view class="popup-content">
				<text class="popup-title">高级特性</text>
				<view class="popup-text">
					ESC键关闭：{{ closeOnEscValue ? '开启' : '禁用' }}
					<text v-if="closeOnEscValue" class="tip">(H5环境下可按ESC键关闭)</text>
				</view>
				<zx-button @click="customPopupShow = false">关闭弹窗</zx-button>
			</view>
		</zx-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础弹窗
const basicPopupShow = ref(false);
const popupMode = ref('center');

const showPopup = (mode) => {
	popupMode.value = mode;
	basicPopupShow.value = true;
};

// 带关闭图标的弹窗
const closeablePopupShow = ref(false);
const closeIconPos = ref('top-right');

const showCloseablePopup = (position) => {
	closeIconPos.value = position;
	closeablePopupShow.value = true;
};

// 圆角弹窗
const roundPopupShow = ref(false);
const roundValue = ref('5rpx');

const showRoundPopup = (value) => {
	roundValue.value = value;
	roundPopupShow.value = true;
};

// 滚动相关弹窗
const scrollPopupShow = ref(false);
const lockScrollValue = ref(true);

const showScrollPopup = (lockScroll) => {
	lockScrollValue.value = lockScroll;
	scrollPopupShow.value = true;
};

// 自定义特性弹窗
const customPopupShow = ref(false);
const closeOnEscValue = ref(true);

const showCustomPopup = (closeOnEsc) => {
	closeOnEscValue.value = closeOnEsc;
	customPopupShow.value = true;
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.header {
	margin-bottom: 40rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.description {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}
}

.demo-section {
	margin-bottom: 40rpx;
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		position: relative;
		padding-left: 20rpx;
		
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 10rpx;
			width: 8rpx;
			height: 32rpx;
			background-color: #2979ff;
			border-radius: 4rpx;
		}
	}
	
	.button-group {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -10rpx;
		
		:deep(.zx-button) {
			margin: 10rpx;
		}
	}
}

.popup-content {
	padding: 30rpx;
	min-width: 300rpx;
	
	&.scroll-content {
		height: 600rpx;
	}
	
	.popup-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		display: block;
		text-align: center;
	}
	
	.popup-text {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 30rpx;
		line-height: 1.5;
		
		.tip {
			font-size: 24rpx;
			color: #999;
			margin-left: 10rpx;
		}
	}
	
	.scroll-list {
		height: 400rpx;
		overflow-y: auto;
		margin-bottom: 20rpx;
		
		.scroll-item {
			padding: 20rpx;
			border-bottom: 1rpx solid #eee;
			font-size: 28rpx;
		}
	}
}
</style>
