<template>
	<view class="container">
		<view class="header">
			<view class="title">zx-select-picker 选择器组件</view>
			<view class="subtitle">底部弹出式选择器，支持单选和多选模式</view>
		</view>

		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="button-group">
				<button class="btn" @tap="openBasicSelect">打开单选选择器</button>
				<zx-select-picker :show="showBasicSelect" :list="basicList" @confirm="onBasicConfirm" @close="onBasicClose"
					title="请选择一个选项"></zx-select-picker>
			</view>
			<view class="result" v-if="basicResult">
				<text>已选择：{{ basicResult }}</text>
			</view>
		</view>

		<view class="section">
			<view class="section-title">多选模式</view>
			<view class="button-group">
				<button class="btn" @tap="openMultiSelect">打开多选选择器</button>
				<zx-select-picker :show="showMultiSelect" :list="multiList" multiple @confirm="onMultiConfirm"
					@close="onMultiClose" title="请选择多个选项"></zx-select-picker>
			</view>
			<view class="result" v-if="multiResult && multiResult.length > 0">
				<text>已选择：{{ multiResult.join(', ') }}</text>
			</view>
		</view>

		<view class="section">
			<view class="section-title">带图标选项</view>
			<view class="button-group">
				<button class="btn" @tap="openIconSelect">打开带图标选择器</button>
				<zx-select-picker :show="showIconSelect" :list="iconList" @confirm="onIconConfirm" @close="onIconClose"
					title="请选择一个选项"></zx-select-picker>
			</view>
			<view class="result" v-if="iconResult">
				<text>已选择：{{ iconResult }}</text>
			</view>
		</view>

		<view class="section">
			<view class="section-title">自定义样式</view>
			<view class="button-group">
				<button class="btn" @tap="openCustomSelect">打开自定义样式选择器</button>
				<zx-select-picker :show="showCustomSelect" :list="customList" @confirm="onCustomConfirm"
					@close="onCustomClose" title="自定义样式选择器" titleColor="#ff5500" titleSize="36"
					checkboxColor="#ff5500" btnText="确认选择" btnBackground="#ff5500" btnColor="#ffffff"
					background="#f8f8f8" :radius="16"></zx-select-picker>
			</view>
			<view class="result" v-if="customResult">
				<text>已选择：{{ customResult }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础单选
const showBasicSelect = ref(false);
const basicList = ref(['选项1', '选项2', '选项3', '选项4', '选项5']);
const basicResult = ref('');

const openBasicSelect = () => {
	showBasicSelect.value = true;
};

const onBasicConfirm = (e) => {
	console.log('单选确认', e);
	basicResult.value = e.options;
	showBasicSelect.value = false;
};

const onBasicClose = () => {
	showBasicSelect.value = false;
};

// 多选模式
const showMultiSelect = ref(false);
const multiList = ref(['选项A', '选项B', '选项C', '选项D', '选项E']);
const multiResult = ref([]);

const openMultiSelect = () => {
	showMultiSelect.value = true;
};

const onMultiConfirm = (e) => {
	console.log('多选确认', e);
	multiResult.value = e.options;
	showMultiSelect.value = false;
};

const onMultiClose = () => {
	showMultiSelect.value = false;
};

// 带图标选项
const showIconSelect = ref(false);
const iconList = ref([
	{
		text: '微信支付',
		src: '/static/images/wechat.png'
	},
	{
		text: '支付宝支付',
		src: '/static/images/alipay.png'
	},
	{
		text: '银行卡支付',
		src: '/static/images/bank.png'
	}
]);
const iconResult = ref('');

const openIconSelect = () => {
	showIconSelect.value = true;
};

const onIconConfirm = (e) => {
	console.log('图标选择确认', e);
	iconResult.value = e.options.text;
	showIconSelect.value = false;
};

const onIconClose = () => {
	showIconSelect.value = false;
};

// 自定义样式
const showCustomSelect = ref(false);
const customList = ref(['红色', '橙色', '黄色', '绿色', '蓝色', '紫色']);
const customResult = ref('');

const openCustomSelect = () => {
	showCustomSelect.value = true;
};

const onCustomConfirm = (e) => {
	console.log('自定义样式确认', e);
	customResult.value = e.options;
	showCustomSelect.value = false;
};

const onCustomClose = () => {
	showCustomSelect.value = false;
};
</script>

<style>
.container {
	padding: 30rpx;
}

.header {
	margin-bottom: 40rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 10rpx;
}

.subtitle {
	font-size: 28rpx;
	color: #666;
}

.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.button-group {
	margin-bottom: 20rpx;
}

.btn {
	background-color: #5677fc;
	color: #fff;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}

.result {
	padding: 20rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #333;
}
</style>