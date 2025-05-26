<template>
	<view class="container">
		<view class="section">
			<view class="section-title">基本用法</view>
			<view class="card">
				<view class="form-item">
					<text class="label">车牌号：</text>
					<text class="value">{{ carNumber || '请输入车牌号' }}</text>
				</view>
				<button class="btn" @tap="openCarNumber">打开车牌输入</button>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">预设车牌号和类型</view>
			<view class="card">
				<view class="form-item">
					<text class="label">车牌号：</text>
					<text class="value">{{ presetCarNumber || '请输入车牌号' }}</text>
				</view>
				<view class="form-item">
					<text class="label">车牌类型：</text>
					<view class="type-selector">
						<view 
							class="type-item" 
							:class="{'active': selectedType === 0}"
							@tap="selectType(0)"
						>普通车牌</view>
						<view 
							class="type-item" 
							:class="{'active': selectedType === 1}"
							@tap="selectType(1)"
						>新能源车牌</view>
					</view>
				</view>
				<view class="form-item">
					<text class="label">预设车牌：</text>
					<input class="input" v-model="inputCarNumber" placeholder="输入预设车牌" />
				</view>
				<button class="btn" @tap="openPresetCarNumber">打开预设车牌输入</button>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">事件记录</view>
			<view class="card">
				<scroll-view class="log-area" scroll-y>
					<text class="log-text" v-for="(log, index) in logs" :key="index">{{ log }}</text>
				</scroll-view>
				<button class="btn btn-secondary" @tap="clearLogs">清空日志</button>
			</view>
		</view>
		
		<!-- 车牌输入组件 -->
		<zx-car-number 
			ref="carNumberRef" 
			@confirm="onCarNumberConfirm" 
			@open="onOpen" 
			@close="onClose"
		></zx-car-number>
		
		<zx-car-number 
			ref="presetCarNumberRef" 
			@confirm="onPresetCarNumberConfirm" 
			@open="onPresetOpen" 
			@close="onPresetClose"
		></zx-car-number>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 响应式数据
const carNumber = ref('');
const presetCarNumber = ref('');
const inputCarNumber = ref('京A12345');
const selectedType = ref(0);
const logs = ref([]);

// ref 引用
const carNumberRef = ref(null);
const presetCarNumberRef = ref(null);

// 基本用法
const openCarNumber = () => {
	carNumberRef.value.open();
};

const onCarNumberConfirm = (number) => {
	carNumber.value = number;
	addLog(`基本用法确认：${number}`);
};

const onOpen = () => {
	addLog('基本用法组件打开');
};

const onClose = () => {
	addLog('基本用法组件关闭');
};

// 预设车牌号和类型
const selectType = (type) => {
	selectedType.value = type;
};

const openPresetCarNumber = () => {
	// 设置车牌类型
	presetCarNumberRef.value.setType(selectedType.value);
	// 设置预设车牌号
	if (inputCarNumber.value) {
		presetCarNumberRef.value.setVal(inputCarNumber.value);
	}
	// 打开组件
	presetCarNumberRef.value.open();
};

const onPresetCarNumberConfirm = (number) => {
	presetCarNumber.value = number;
	addLog(`预设用法确认：${number}`);
};

const onPresetOpen = () => {
	addLog('预设用法组件打开');
};

const onPresetClose = () => {
	addLog('预设用法组件关闭');
};

// 日志管理
const addLog = (message) => {
	const now = new Date();
	const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	logs.value.unshift(`[${timeStr}] ${message}`);
};

const clearLogs = () => {
	logs.value = [];
};
</script>

<style>
.container {
	padding: 30rpx;
	padding-bottom: 100rpx;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #333;
}

.card {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.form-item {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.label {
	width: 160rpx;
	font-size: 28rpx;
	color: #666;
}

.value {
	flex: 1;
	font-size: 28rpx;
	color: #333;
}

.type-selector {
	display: flex;
	flex: 1;
}

.type-item {
	padding: 10rpx 20rpx;
	font-size: 26rpx;
	background-color: #f5f5f5;
	margin-right: 20rpx;
	border-radius: 6rpx;
}

.type-item.active {
	background-color: #007aff;
	color: #fff;
}

.input {
	flex: 1;
	height: 70rpx;
	border: 1px solid #eee;
	border-radius: 6rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
}

.btn {
	margin: 20rpx 0;
	background-color: #007aff;
	color: #fff;
}

.btn-secondary {
	background-color: #f5f5f5;
	color: #666;
}

.log-area {
	height: 300rpx;
	border: 1px solid #eee;
	border-radius: 6rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}

.log-text {
	font-size: 24rpx;
	color: #666;
	display: block;
	margin-bottom: 10rpx;
}
</style>
