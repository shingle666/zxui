<template>
	<view class="barcode-demo">
		<view class="header">
			<text class="title">条形码组件示例</text>
		</view>
		
		<view class="section">
			<text class="section-title">基本用法</text>
			<view class="demo-box">
				<zx-barcode ref="basicBarcode" :text="basicText" @getImg="onGetImg"></zx-barcode>
				<text class="demo-hint">长按条形码可保存到相册</text>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">自定义样式</text>
			<view class="custom-styles">
				<view class="style-item">
					<zx-barcode 
						:text="basicText" 
						:width="500" 
						:height="120" 
						foreground="#0066FF"
						background="#F5F5F5"
					></zx-barcode>
					<text class="style-desc">自定义颜色</text>
				</view>
				<view class="style-item">
					<zx-barcode 
						:text="basicText" 
						:width="500" 
						:height="120" 
						foreground="#FF0000"
						background="#FFFFCC"
					></zx-barcode>
					<text class="style-desc">红色条形码</text>
				</view>
				<view class="style-item">
					<zx-barcode 
						:text="basicText" 
						:width="500" 
						:height="80"
					></zx-barcode>
					<text class="style-desc">较窄条形码</text>
				</view>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">动态更新内容</text>
			<view class="dynamic-update">
				<zx-barcode ref="dynamicBarcode" :text="dynamicText" :width="600" :height="150"></zx-barcode>
				<view class="input-group">
					<input 
						class="barcode-input" 
						v-model="dynamicText" 
						placeholder="输入文本生成条形码"
					/>
				</view>
			</view>
		</view>
		
		<view class="section">
			<text class="section-title">操作控制</text>
			<view class="operation">
				<zx-barcode ref="controlBarcode" :text="controlText" :width="600" :height="150"></zx-barcode>
				<view class="button-group">
					<button class="btn" @click="saveBarcode">保存条形码</button>
					<button class="btn" @click="refreshBarcode">刷新条形码</button>
					<button class="btn" @click="changeText">更改文本</button>
				</view>
			</view>
		</view>
		
		<view class="section" v-if="barcodePath">
			<text class="section-title">获取图片路径</text>
			<view class="result-box">
				<text class="path-text">{{barcodePath}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxBarcode from '@tanzhenxing/zx-barcode/zx-barcode.vue';

// 基本条形码文本
const basicText = ref('1234567890');

// 动态条形码文本
const dynamicText = ref('1234567890');

// 控制条形码文本
const controlText = ref('9876543210');

// 条形码图片路径
const barcodePath = ref('');

// 组件引用
const basicBarcode = ref(null);
const dynamicBarcode = ref(null);
const controlBarcode = ref(null);

// 获取图片路径
const onGetImg = (path) => {
	barcodePath.value = path;
	console.log('条形码图片路径:', path);
};

// 保存条形码
const saveBarcode = () => {
	controlBarcode.value.saveBarcode();
};

// 刷新条形码
const refreshBarcode = () => {
	controlBarcode.value.refresh();
};

// 更改文本
const changeText = () => {
	// 生成随机数字字符串
	const randomNum = Math.floor(Math.random() * 10000000000);
	controlText.value = randomNum.toString();
};

</script>

<style>
.barcode-demo {
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
	flex-direction: column;
	align-items: center;
}

.style-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 20rpx 0;
	width: 100%;
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

.barcode-input {
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