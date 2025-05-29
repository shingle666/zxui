<template>
	<view class="qrcode-demo">
		<view class="header">
			<text class="title">二维码组件示例</text>
		</view>
		
		<view class="section">
			<text class="section-title">基本用法</text>
			<view class="demo-box">
				<zx-qrcode ref="basicQrcode" :text="basicText" @getImg="onGetImg"></zx-qrcode>
				<text class="demo-hint">长按二维码可保存到相册</text>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">自定义样式</text>
			<view class="custom-styles">
				<view class="style-item">
					<zx-qrcode 
						:text="basicText" 
						:size="120" 
						color="#0066FF"
						bgColor="#F5F5F5"
					></zx-qrcode>
					<text class="style-desc">自定义颜色</text>
				</view>
				<view class="style-item">
					<zx-qrcode 
						:text="basicText" 
						:size="120" 
						:showBorder="true" 
						borderColor="#FF0000" 
						:borderWidth="6"
					></zx-qrcode>
					<text class="style-desc">带边框</text>
				</view>
				<view class="style-item">
					<zx-qrcode 
						:text="basicText" 
						:size="120" 
						:correctLevel="3"
					></zx-qrcode>
					<text class="style-desc">高纠错等级</text>
				</view>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">动态更新内容</text>
			<view class="dynamic-update">
				<zx-qrcode ref="dynamicQrcode" :text="dynamicText" :size="150"></zx-qrcode>
				<view class="input-group">
					<input 
						class="qr-input" 
						v-model="dynamicText" 
						placeholder="输入文本生成二维码"
					/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">操作控制</text>
			<view class="operation">
				<zx-qrcode ref="controlQrcode" :text="basicText" :size="150"></zx-qrcode>
				<view class="button-group">
					<button class="btn" @click="saveQrcode">保存二维码</button>
					<button class="btn" @click="refreshQrcode">刷新二维码</button>
					<button class="btn" @click="clearQrcode">清除二维码</button>
				</view>
			</view>
		</view>
		
		<view class="section" v-if="qrcodePath">
			<text class="section-title">获取图片路径</text>
			<view class="result-box">
				<text class="path-text">{{qrcodePath}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基本二维码文本
const basicText = ref('https://zxui.org/');

// 动态二维码文本
const dynamicText = ref('https://example.com/');

// 二维码图片路径
const qrcodePath = ref('');

// 组件引用
const basicQrcode = ref(null);
const dynamicQrcode = ref(null);
const controlQrcode = ref(null);

// 获取图片路径
const onGetImg = (path) => {
	qrcodePath.value = path;
	console.log('二维码图片路径:', path);
};

// 保存二维码
const saveQrcode = () => {
	controlQrcode.value.saveQrcode();
};

// 刷新二维码
const refreshQrcode = () => {
	controlQrcode.value.refresh();
};

// 清除二维码
const clearQrcode = () => {
	controlQrcode.value.clear();
};
</script>

<style>
.qrcode-demo {
	padding: 20rpx;
}

.header {
	text-align: center;
	margin-bottom: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
}

.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 10rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
	border-left: 8rpx solid #0066FF;
	padding-left: 20rpx;
}

.demo-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx 0;
}

.demo-hint {
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
}

.custom-styles {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}

.style-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10rpx;
}

.style-desc {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
}

.dynamic-update {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.input-group {
	width: 100%;
	margin-top: 20rpx;
}

.qr-input {
	width: 100%;
	height: 80rpx;
	border: 1px solid #ddd;
	border-radius: 8rpx;
	padding: 0 20rpx;
	box-sizing: border-box;
}

.operation {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.button-group {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	width: 100%;
	margin-top: 20rpx;
}

.btn {
	font-size: 26rpx;
	margin: 10rpx;
	background-color: #0066FF;
	color: white;
}

.result-box {
	padding: 20rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
}

.path-text {
	font-size: 24rpx;
	color: #666;
	word-break: break-all;
}
</style>
