<template>
	<view class="demo-container">
		<view class="demo-title">日期选择器示例</view>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<zx-date-picker 
				v-model="basicDate" 
				placeholder="请选择日期"
				@change="handleDateChange"
			/>
			<view class="result">选择的日期：{{ basicDate }}</view>
		</view>
		
		<!-- 选择日期时间 -->
		<view class="demo-section">
			<view class="section-title">选择日期时间</view>
			<zx-date-picker 
				v-model="datetimeValue" 
				type="datetime"
				placeholder="请选择日期时间"
				format="YYYY-MM-DD HH:mm:ss"
			/>
			<view class="result">选择的日期时间：{{ datetimeValue }}</view>
		</view>
		
		<!-- 选择月份 -->
		<view class="demo-section">
			<view class="section-title">选择月份</view>
			<zx-date-picker 
				v-model="monthValue" 
				type="month"
				placeholder="请选择月份"
			/>
			<view class="result">选择的月份：{{ monthValue }}</view>
		</view>
		
		<!-- 选择年份 -->
		<view class="demo-section">
			<view class="section-title">选择年份</view>
			<zx-date-picker 
				v-model="yearValue" 
				type="year"
				placeholder="请选择年份"
			/>
			<view class="result">选择的年份：{{ yearValue }}</view>
		</view>
		
		<!-- 日期范围选择 -->
		<view class="demo-section">
			<view class="section-title">日期范围选择</view>
			<zx-date-picker 
				v-model="rangeValue" 
				type="daterange"
				range-separator=" ~ "
				start-placeholder="开始日期"
				end-placeholder="结束日期"
			/>
			<view class="result">选择的日期范围：{{ rangeValue.join(' ~ ') }}</view>
		</view>
		
		<!-- 带快捷选项 -->
		<view class="demo-section">
			<view class="section-title">带快捷选项</view>
			<zx-date-picker 
				v-model="shortcutValue" 
				type="daterange"
				:shortcuts="shortcuts"
				placeholder="请选择日期范围"
			/>
			<view class="result">选择的日期范围：{{ shortcutValue.join(' ~ ') }}</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="section-title">禁用状态</view>
			<zx-date-picker 
				v-model="disabledValue" 
				placeholder="禁用状态"
				:disabled="true"
			/>
		</view>
		
		<!-- 自定义格式 -->
		<view class="demo-section">
			<view class="section-title">自定义格式</view>
			<zx-date-picker 
				v-model="customFormatValue" 
				placeholder="自定义格式"
				format="YYYY年MM月DD日"
				value-format="YYYY/MM/DD"
			/>
			<view class="result">选择的日期：{{ customFormatValue }}</view>
		</view>
		
		<!-- 限制日期范围 -->
		<view class="demo-section">
			<view class="section-title">限制日期范围</view>
			<zx-date-picker 
				v-model="limitedValue" 
				placeholder="只能选择今天之后的日期"
				:disabled-date="disabledBeforeToday"
			/>
			<view class="result">选择的日期：{{ limitedValue }}</view>
		</view>
		
		<!-- 默认值 -->
		<view class="demo-section">
			<view class="section-title">默认值</view>
			<zx-date-picker 
				v-model="defaultValue" 
				placeholder="带默认值"
				:default-value="new Date()"
			/>
			<view class="result">选择的日期：{{ defaultValue }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import ZxDatePicker from './zx-date-picker.vue';

// 基础日期
const basicDate = ref('');

// 日期时间
const datetimeValue = ref('');

// 月份
const monthValue = ref('');

// 年份
const yearValue = ref('');

// 日期范围
const rangeValue = ref([]);

// 带快捷选项的日期范围
const shortcutValue = ref([]);

// 禁用状态
const disabledValue = ref('2024-01-01');

// 自定义格式
const customFormatValue = ref('');

// 限制日期
const limitedValue = ref('');

// 默认值
const defaultValue = ref('');

// 快捷选项配置
const shortcuts = ref([
	{
		text: '今天',
		value: () => {
			const today = new Date();
			return [today, today];
		}
	},
	{
		text: '昨天',
		value: () => {
			const yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1);
			return [yesterday, yesterday];
		}
	},
	{
		text: '最近一周',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setDate(start.getDate() - 6);
			return [start, end];
		}
	},
	{
		text: '最近一个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setMonth(start.getMonth() - 1);
			return [start, end];
		}
	},
	{
		text: '最近三个月',
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setMonth(start.getMonth() - 3);
			return [start, end];
		}
	}
]);

// 事件处理
const handleDateChange = (value) => {
	console.log('日期变化：', value);
	uni.showToast({
		title: `选择了日期：${value}`,
		icon: 'none'
	});
};

// 禁用今天之前的日期
const disabledBeforeToday = (date) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return date < today;
};
</script>

<style lang="scss" scoped>
.demo-container {
	padding: 32rpx;
	background-color: #f5f7fa;
	min-height: 100vh;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 48rpx;
	color: #303133;
}

.demo-section {
	margin-bottom: 48rpx;
	padding: 32rpx;
	background-color: #fff;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 28rpx;
	font-weight: 500;
	margin-bottom: 24rpx;
	color: #303133;
	padding-bottom: 16rpx;
	border-bottom: 2rpx solid #f0f2f5;
}

.result {
	margin-top: 24rpx;
	padding: 16rpx;
	background-color: #f8f9fa;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #606266;
	border-left: 6rpx solid #409eff;
}
</style> 