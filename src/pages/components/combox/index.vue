<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-combox 组合框</text>
			<text class="description">组合框组件一般用于可以选择也可以输入的表单项</text>
		</view>
		
		<view class="section">
			<view class="section-title">基本用法</view>
			<view class="example-body">
				<zx-combox 
					label="所在城市" 
					:candidates="candidates" 
					placeholder="请选择所在城市" 
					v-model="city"
				></zx-combox>
				<view class="result-box">
					<text>当前选择的城市: {{city}}</text>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">无边框</view>
			<view class="example-body">
				<zx-combox 
					:border="false" 
					label="选择职业" 
					:candidates="jobs" 
					placeholder="请选择职业"
					v-model="job"
				></zx-combox>
				<view class="result-box">
					<text>当前选择的职业: {{job}}</text>
				</view>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义无匹配提示</view>
			<view class="example-body">
				<zx-combox 
					label="选择水果" 
					:candidates="fruits" 
					placeholder="请选择水果" 
					emptyTips="没有找到相关水果"
					v-model="fruit"
				></zx-combox>
				<view class="result-box">
					<text>当前选择的水果: {{fruit}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 城市列表
const candidates = ref(['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '成都', '西安']);
const city = ref('');

// 职业列表
const jobs = ref(['工程师', '设计师', '产品经理', '运营', '市场', '销售', '客服', '财务', '人事']);
const job = ref('');

// 水果列表
const fruits = ref(['苹果', '香蕉', '橙子', '葡萄', '西瓜', '芒果', '草莓', '菠萝', '樱桃']);
const fruit = ref('');
</script>

<style lang="scss">
.container {
	padding: 20rpx;
}

.header {
	padding-bottom: 30rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #303133;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.description {
		font-size: 28rpx;
		color: #606266;
	}
}

.section {
	margin-bottom: 40rpx;
	
	.section-title {
		font-size: 32rpx;
		color: #303133;
		font-weight: bold;
		margin-bottom: 20rpx;
		position: relative;
		padding-left: 16rpx;
		
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 10rpx;
			bottom: 10rpx;
			width: 6rpx;
			background-color: #2979ff;
			border-radius: 3rpx;
		}
	}
	
	.example-body {
		padding: 30rpx;
		background-color: #ffffff;
		border-radius: 8rpx;
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
	}
	
	.result-box {
		margin-top: 20rpx;
		padding: 15rpx;
		background-color: #f8f8f8;
		border-radius: 6rpx;
		font-size: 28rpx;
		color: #606266;
	}
}
</style>
