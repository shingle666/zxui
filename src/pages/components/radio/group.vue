<template>
	<view class="container">
		<view class="header">
			<view class="title">单选框组 RadioGroup</view>
			<view class="subtitle">单选框组用于包含多个单选框，实现单选效果</view>
		</view>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<zx-radio-group v-model="radio1">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
			<view class="demo-value">当前选中：{{ radio1 }}</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="section-title">禁用状态</view>
			<view class="section-content">
				<zx-radio-group v-model="radio2" disabled>
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 自定义颜色 -->
		<view class="demo-section">
			<view class="section-title">自定义颜色</view>
			<view class="section-content">
				<zx-radio-group v-model="radio3" active-color="#ff5500">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 布局方式 -->
		<view class="demo-section">
			<view class="section-title">布局方式</view>
			<view class="section-subtitle">横向布局（默认）</view>
			<view class="section-content">
				<zx-radio-group v-model="radio4" placement="row">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
			<view class="section-subtitle">纵向布局</view>
			<view class="section-content">
				<zx-radio-group v-model="radio5" placement="column">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 自定义尺寸 -->
		<view class="demo-section">
			<view class="section-title">自定义尺寸</view>
			<view class="section-content">
				<zx-radio-group v-model="radio6" size="24" icon-size="16" label-size="16">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 形状 -->
		<view class="demo-section">
			<view class="section-title">形状</view>
			<view class="section-subtitle">圆形（默认）</view>
			<view class="section-content">
				<zx-radio-group v-model="radio7" shape="circle">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
			<view class="section-subtitle">方形</view>
			<view class="section-content">
				<zx-radio-group v-model="radio8" shape="square">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 事件监听 -->
		<view class="demo-section">
			<view class="section-title">事件监听</view>
			<view class="section-content">
				<zx-radio-group v-model="radio9" @change="radioChange">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
			<view class="demo-value">change 事件：{{ changeValue }}</view>
		</view>
		
		<!-- 带边框样式 -->
		<view class="demo-section">
			<view class="section-title">带边框样式</view>
			<view class="section-content">
				<zx-radio-group v-model="radio10" placement="column" border-bottom>
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
					<zx-radio value="3">选项3</zx-radio>
				</zx-radio-group>
			</view>
		</view>
		
		<!-- 图标位置 -->
		<view class="demo-section">
			<view class="section-title">图标位置</view>
			<view class="section-subtitle">左侧（默认）</view>
			<view class="section-content">
				<zx-radio-group v-model="radio11" icon-placement="left">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
			<view class="section-subtitle">右侧</view>
			<view class="section-content">
				<zx-radio-group v-model="radio12" icon-placement="right">
					<zx-radio value="1">选项1</zx-radio>
					<zx-radio value="2">选项2</zx-radio>
				</zx-radio-group>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const radio1 = ref('1');
	const radio2 = ref('1');
	const radio3 = ref('1');
	const radio4 = ref('1');
	const radio5 = ref('1');
	const radio6 = ref('1');
	const radio7 = ref('1');
	const radio8 = ref('1');
	const radio9 = ref('1');
	const radio10 = ref('1');
	const radio11 = ref('1');
	const radio12 = ref('1');
	
	const changeValue = ref('');
	
	const radioChange = (value) => {
		changeValue.value = value;
		uni.showToast({
			title: `选中了：${value}`,
			icon: 'none'
		});
	};
</script>

<style lang="scss">
	.container {
		padding: 30rpx;
	}
	
	.header {
		margin-bottom: 40rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #303133;
			margin-bottom: 10rpx;
		}
		
		.subtitle {
			font-size: 28rpx;
			color: #909399;
		}
	}
	
	.demo-section {
		margin-bottom: 50rpx;
		
		.section-title {
			font-size: 32rpx;
			color: #303133;
			font-weight: bold;
			margin-bottom: 20rpx;
			position: relative;
			padding-left: 24rpx;
			
			&::before {
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
		
		.section-subtitle {
			font-size: 28rpx;
			color: #606266;
			margin: 20rpx 0 10rpx;
		}
		
		.section-content {
			background-color: #ffffff;
			padding: 30rpx;
			border-radius: 8rpx;
			box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
		}
		
		.demo-value {
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #909399;
			padding: 0 30rpx;
		}
	}
</style>
