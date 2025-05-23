<template>
	<view class="container">
		<view class="section">
			<view class="section-title">普通选择器</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<zx-picker
					mode="selector"
					:range="selectorRange"
					:value="selectorIndex"
					@change="onSelectorChange"
				>
					<view class="picker-value">{{ selectorRange[selectorIndex] }}</view>
				</zx-picker>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">多列选择器</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<zx-picker
					mode="multiSelector"
					:range="multiSelectorRange"
					:value="multiSelectorValue"
					@change="onMultiSelectorChange"
					@columnchange="onMultiSelectorColumnChange"
				>
					<view class="picker-value">
						{{ multiSelectorRange[0][multiSelectorValue[0]] + ' ' + multiSelectorRange[1][multiSelectorValue[1]] }}
					</view>
				</zx-picker>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">时间选择器</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<zx-picker
					mode="time"
					:value="timeValue"
					start="00:00"
					end="23:59"
					@change="onTimeChange"
				>
					<view class="picker-value">{{ timeValue }}</view>
				</zx-picker>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">日期选择器</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<zx-picker
					mode="date"
					:value="dateValue"
					:start="startDate"
					:end="endDate"
					@change="onDateChange"
				>
					<view class="picker-value">{{ dateValue }}</view>
				</zx-picker>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">日期选择器（年月）</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<zx-picker
					mode="date"
					:value="yearMonthValue"
					fields="month"
					@change="onYearMonthChange"
				>
					<view class="picker-value">{{ yearMonthValue }}</view>
				</zx-picker>
			</view>
		</view>
		
		<!-- 省市区选择器部分在小程序中有效，在App中需要处理兼容性 -->
		<view class="section">
			<view class="section-title">省市区选择器</view>
			<view class="input-item">
				<text class="input-label">当前选择：</text>
				<view class="picker-info">
					<text class="picker-info-text">在小程序中可用，App和H5请使用自定义多列选择器</text>
				</view>
				<!-- #ifdef MP -->
				<zx-picker
					mode="region"
					:value="regionValue"
					@change="onRegionChange"
				>
					<view class="picker-value">{{ regionValue.join(' ') }}</view>
				</zx-picker>
				<!-- #endif -->
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义弹出选择器</view>
			<view class="input-item">
				<button class="custom-button" @click="showCustomPicker = true">显示自定义选择器</button>
			</view>
			<zx-picker
				mode="customSelector"
				:show="showCustomPicker"
				:range="customSelectorRange"
				:value="customSelectorIndex"
				title="请选择"
				@change="onCustomSelectorChange"
				@cancel="onCustomSelectorCancel"
			/>
		</view>
		
		<view class="section">
			<view class="section-title">自定义时间选择器</view>
			<view class="input-item">
				<button class="custom-button" @click="showCustomTimePicker = true">显示自定义时间选择器</button>
				<view class="picker-value" v-if="customTimeValue">已选择：{{ customTimeValue }}</view>
			</view>
			<zx-picker
				mode="customTime"
				:show="showCustomTimePicker"
				:value="customTimeValue"
				title="选择时间"
				@change="onCustomTimeChange"
				@cancel="onCustomTimeCancel"
			/>
		</view>
		
		<view class="section">
			<view class="section-title">禁用状态选择器</view>
			<view class="input-item">
				<text class="input-label">当前状态：</text>
				<zx-picker
					mode="selector"
					:range="selectorRange"
					:value="selectorIndex"
					:disabled="true"
				>
					<view class="picker-value picker-disabled">已禁用的选择器</view>
				</zx-picker>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 普通选择器
const selectorRange = ref(['选项1', '选项2', '选项3', '选项4', '选项5']);
const selectorIndex = ref(0);

const onSelectorChange = (e) => {
	selectorIndex.value = e.detail.value;
	console.log('选择器选中值：', selectorRange.value[selectorIndex.value]);
};

// 多列选择器
const multiSelectorRange = ref([
	['北京', '上海', '广州', '深圳'],
	['春', '夏', '秋', '冬']
]);
const multiSelectorValue = ref([0, 0]);

const onMultiSelectorChange = (e) => {
	multiSelectorValue.value = e.detail.value;
	console.log('多列选择器选中值：', 
		multiSelectorRange.value[0][multiSelectorValue.value[0]] + ' ' + 
		multiSelectorRange.value[1][multiSelectorValue.value[1]]
	);
};

const onMultiSelectorColumnChange = (e) => {
	console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
	// 可以在这里处理联动逻辑
};

// 时间选择器
const timeValue = ref('12:30');

const onTimeChange = (e) => {
	timeValue.value = e.detail.value;
	console.log('时间选择器选中值：', timeValue.value);
};

// 日期选择器
const dateValue = ref('2023-10-20');
const startDate = ref('2020-01-01');
const endDate = ref('2025-12-31');

const onDateChange = (e) => {
	dateValue.value = e.detail.value;
	console.log('日期选择器选中值：', dateValue.value);
};

// 年月选择器
const yearMonthValue = ref('2023-10');

const onYearMonthChange = (e) => {
	yearMonthValue.value = e.detail.value;
	console.log('年月选择器选中值：', yearMonthValue.value);
};

// 省市区选择器
const regionValue = ref(['广东省', '广州市', '海珠区']);

const onRegionChange = (e) => {
	regionValue.value = e.detail.value;
	console.log('省市区选择器选中值：', regionValue.value);
};

// 自定义选择器（弹出式）
const showCustomPicker = ref(false);
const customSelectorRange = ref(['选项A', '选项B', '选项C', '选项D', '选项E']);
const customSelectorIndex = ref(0);

const onCustomSelectorChange = (e) => {
	customSelectorIndex.value = e.detail.value;
	console.log('自定义选择器选中值：', customSelectorRange.value[customSelectorIndex.value]);
	showCustomPicker.value = false;
};

const onCustomSelectorCancel = () => {
	showCustomPicker.value = false;
	console.log('自定义选择器取消选择');
};

// 自定义时间选择器
const showCustomTimePicker = ref(false);
const customTimeValue = ref('10:30');

const onCustomTimeChange = (e) => {
	customTimeValue.value = e.detail.value;
	console.log('自定义时间选择器选中值：', customTimeValue.value);
	showCustomTimePicker.value = false;
};

const onCustomTimeCancel = () => {
	showCustomTimePicker.value = false;
	console.log('自定义时间选择器取消选择');
};
</script>

<style lang="scss">
.container {
	padding: 20rpx;
}

.section {
	margin-bottom: 30rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	border-bottom: 1px solid #eee;
	padding-bottom: 10rpx;
}

.input-item {
	padding: 20rpx 0;
	display: flex;
	align-items: center;
	
	.input-label {
		width: 180rpx;
		font-size: 28rpx;
		color: #666;
	}
}

.picker-value {
	flex: 1;
	height: 80rpx;
	line-height: 80rpx;
	padding: 0 20rpx;
	font-size: 28rpx;
	color: #333;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.picker-disabled {
	color: #999;
	background-color: #f2f2f2;
}

.custom-button {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 28rpx;
	color: #fff;
	background-color: #3c9cff;
	border-radius: 8rpx;
}

.picker-info {
	flex: 1;
	margin-bottom: 10rpx;
	
	.picker-info-text {
		font-size: 24rpx;
		color: #999;
	}
}
</style>
