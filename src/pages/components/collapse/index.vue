<template>
	<view class="example-container">
		<view class="example-title">zx-collapse 使用示例</view>
		
		<!-- 基础用法 -->
		<view class="example-section">
			<view class="section-title">基础用法</view>
			<zx-collapse v-model="activeNames" :items="items" @change="handleChange" />
		</view>
		
		<!-- 手风琴模式 -->
		<view class="example-section">
			<view class="section-title">手风琴模式</view>
			<zx-collapse v-model="activeName" :items="items" accordion />
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	// 基础用法 - 可同时展开多个
	const activeNames = ref(['1'])
	
	// 手风琴模式 - 只能展开一个
	const activeName = ref('1')
	
	// 数据
	const items = ref([
		{
			name: '1',
			title: '一致性',
			content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。'
		},
		{
			name: '2',
			title: '反馈',
			content: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。'
		},
		{
			name: '3',
			title: '效率',
			content: '简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确。'
		}
	])
	
	// 事件处理
	const handleChange = (value) => {
		console.log('当前激活的面板:', value)
	}
</script>

<style lang="scss" scoped>
	.example-container {
		padding: 20rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.example-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 40rpx;
		color: #303133;
	}
	
	.example-section {
		margin-bottom: 40rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
	}
	
	.section-title {
		font-size: 28rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
		color: #606266;
	}
</style> 