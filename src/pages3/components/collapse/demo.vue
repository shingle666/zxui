<template>
	<view class="collapse-demo">
		<zx-navbar title="折叠面板演示" :border="false"></zx-navbar>
		
		<scroll-view scroll-y class="scroll-view">
			<!-- 基础用法 -->
			<view class="demo-section">
				<view class="demo-title">基础用法</view>
				<view class="demo-desc">可以同时展开多个面板</view>
				<zx-collapse v-model="activeNames1" :items="basicItems" @change="handleChange1" />
			</view>
			
			<!-- 手风琴模式 -->
			<view class="demo-section">
				<view class="demo-title">手风琴模式</view>
				<view class="demo-desc">同时只能展开一个面板</view>
				<zx-collapse 
					v-model="activeName" 
					:items="accordionItems" 
					accordion 
					@change="handleAccordionChange" 
				/>
			</view>
			
			<!-- 图标位置 -->
			<view class="demo-section">
				<view class="demo-title">图标位置</view>
				<view class="demo-desc">可以设置图标在左侧或右侧</view>
				
				<view class="demo-subtitle">图标在左侧</view>
				<zx-collapse 
					v-model="activeNames2" 
					:items="iconItems" 
					expand-icon-position="left"
					:border="false"
				/>
				
				<view class="demo-subtitle">图标在右侧（默认）</view>
				<zx-collapse 
					v-model="activeNames3" 
					:items="iconItems" 
					expand-icon-position="right"
					:border="false"
				/>
			</view>
			
			<!-- 禁用状态 -->
			<view class="demo-section">
				<view class="demo-title">禁用状态</view>
				<view class="demo-desc">可以禁用特定的面板</view>
				<zx-collapse v-model="activeNames4" :items="disabledItems" />
			</view>
			
			<!-- 无边框 -->
			<view class="demo-section">
				<view class="demo-title">无边框模式</view>
				<view class="demo-desc">隐藏组件边框</view>
				<zx-collapse 
					v-model="activeNames5" 
					:items="noBorderItems" 
					:border="false"
				/>
			</view>
			
			<!-- 自定义样式 -->
			<view class="demo-section">
				<view class="demo-title">自定义样式</view>
				<view class="demo-desc">自定义颜色、字体大小等</view>
				<zx-collapse 
					v-model="activeNames6" 
					:items="customItems"
					title-color="#E6A23C"
					active-color="#67C23A"
					content-color="#909399"
					:title-size="32"
					:content-size="28"
					:title-bold="true"
				/>
			</view>
			
			<!-- 自定义内容插槽 -->
			<view class="demo-section">
				<view class="demo-title">自定义内容</view>
				<view class="demo-desc">使用插槽自定义标题和内容</view>
				<zx-collapse v-model="activeNames7" :items="slotItems">
					<template #title="{ item, isActive }">
						<view class="custom-title">
							<text :style="{ color: isActive ? '#409EFF' : '#303133', fontWeight: 'bold' }">
								🎯 {{ item.title }}
							</text>
							<view v-if="item.tag" class="custom-tag" :class="'tag-' + item.tagType">
								{{ item.tag }}
							</view>
						</view>
					</template>
					
					<template #default="{ item }">
						<view class="custom-content">
							<text class="content-text">{{ item.content }}</text>
							<view v-if="item.showButton" class="content-actions">
								<zx-button size="small" type="primary" @click="handleViewDetail(item)">
									查看详情
								</zx-button>
								<zx-button size="small" type="text" @click="handleEdit(item)">
									编辑
								</zx-button>
							</view>
						</view>
					</template>
				</zx-collapse>
			</view>
			
			<!-- 动态数据 -->
			<view class="demo-section">
				<view class="demo-title">动态数据</view>
				<view class="demo-desc">动态添加和删除面板</view>
				<view class="demo-actions">
					<zx-button type="primary" size="small" @click="addItem">添加面板</zx-button>
					<zx-button type="danger" size="small" @click="removeItem">删除面板</zx-button>
				</view>
				<zx-collapse v-model="dynamicActiveNames" :items="dynamicItems" />
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	// 基础用法
	const activeNames1 = ref(['1'])
	const basicItems = ref([
		{
			name: '1',
			title: '一致性 Consistency',
			content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。'
		},
		{
			name: '2',
			title: '反馈 Feedback',
			content: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。'
		},
		{
			name: '3',
			title: '效率 Efficiency',
			content: '简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；帮助用户识别：界面简单直白，能够让用户快速识别而非回忆，减少用户记忆负担。'
		}
	])
	
	// 手风琴模式
	const activeName = ref('1')
	const accordionItems = ref([
		{
			name: '1',
			title: '苹果',
			content: '苹果是一种营养丰富的水果，含有维生素C、膳食纤维等多种营养成分，有助于维持身体健康。'
		},
		{
			name: '2',
			title: '香蕉',
			content: '香蕉富含钾元素，有助于维持心脏健康和肌肉功能，同时也是很好的能量来源。'
		},
		{
			name: '3',
			title: '橙子',
			content: '橙子含有丰富的维生素C和抗氧化物质，有助于增强免疫系统和促进胶原蛋白生成。'
		}
	])
	
	// 图标位置
	const activeNames2 = ref([])
	const activeNames3 = ref(['2'])
	const iconItems = ref([
		{
			name: '1',
			title: '前端开发',
			content: '使用HTML、CSS、JavaScript等技术构建用户界面。'
		},
		{
			name: '2',
			title: '后端开发',
			content: '负责服务器端逻辑、数据库设计和API开发。'
		}
	])
	
	// 禁用状态
	const activeNames4 = ref([])
	const disabledItems = ref([
		{
			name: '1',
			title: '可用功能',
			content: '这是一个可以正常使用的功能模块。'
		},
		{
			name: '2',
			title: '禁用功能',
			content: '这个功能暂时不可用，正在维护中...',
			disabled: true
		},
		{
			name: '3',
			title: '另一个可用功能',
			content: '这也是一个可以正常使用的功能模块。'
		}
	])
	
	// 无边框
	const activeNames5 = ref(['1'])
	const noBorderItems = ref([
		{
			name: '1',
			title: '无边框样式',
			content: '这是无边框模式的折叠面板，看起来更加简洁。'
		},
		{
			name: '2',
			title: '简洁设计',
			content: '去掉边框后，组件与页面背景融为一体。'
		}
	])
	
	// 自定义样式
	const activeNames6 = ref([])
	const customItems = ref([
		{
			name: '1',
			title: '自定义颜色',
			content: '这里演示了自定义标题颜色、激活颜色等样式属性。'
		},
		{
			name: '2',
			title: '字体大小',
			content: '可以调整标题和内容的字体大小，适应不同的设计需求。'
		}
	])
	
	// 自定义插槽
	const activeNames7 = ref(['1'])
	const slotItems = ref([
		{
			name: '1',
			title: '产品功能',
			content: '这是一个重要的产品功能介绍，包含了详细的功能说明和使用指南。',
			tag: '重要',
			tagType: 'primary',
			showButton: true
		},
		{
			name: '2',
			title: '技术文档',
			content: '详细的技术实现文档，包括架构设计、API接口、数据结构等技术细节。',
			tag: '文档',
			tagType: 'success',
			showButton: true
		},
		{
			name: '3',
			title: '更新日志',
			content: '最新版本的功能更新和bug修复记录，帮助用户了解产品的改进情况。',
			tag: '新增',
			tagType: 'warning',
			showButton: false
		}
	])
	
	// 动态数据
	const dynamicActiveNames = ref([])
	const dynamicItems = ref([
		{
			name: '1',
			title: '动态面板 1',
			content: '这是动态添加的面板内容。'
		}
	])
	
	// 事件处理
	const handleChange1 = (value) => {
		console.log('基础用法 - 当前激活:', value)
	}
	
	const handleAccordionChange = (value) => {
		console.log('手风琴模式 - 当前激活:', value)
	}
	
	const handleViewDetail = (item) => {
		uni.showToast({
			title: `查看 ${item.title} 详情`,
			icon: 'none'
		})
	}
	
	const handleEdit = (item) => {
		uni.showToast({
			title: `编辑 ${item.title}`,
			icon: 'none'
		})
	}
	
	// 动态操作
	const addItem = () => {
		const newIndex = dynamicItems.value.length + 1
		dynamicItems.value.push({
			name: newIndex.toString(),
			title: `动态面板 ${newIndex}`,
			content: `这是第 ${newIndex} 个动态添加的面板内容。`
		})
	}
	
	const removeItem = () => {
		if (dynamicItems.value.length > 1) {
			const removedItem = dynamicItems.value.pop()
			// 如果删除的面板是激活状态，从激活列表中移除
			const index = dynamicActiveNames.value.indexOf(removedItem.name)
			if (index > -1) {
				dynamicActiveNames.value.splice(index, 1)
			}
		} else {
			uni.showToast({
				title: '至少保留一个面板',
				icon: 'none'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.collapse-demo {
		height: 100vh;
		background-color: #f5f5f5;
	}
	
	.scroll-view {
		height: calc(100vh - 88rpx);
		padding: 20rpx;
	}
	
	.demo-section {
		margin-bottom: 40rpx;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
	}
	
	.demo-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #303133;
		margin-bottom: 16rpx;
	}
	
	.demo-desc {
		font-size: 26rpx;
		color: #909399;
		margin-bottom: 30rpx;
		line-height: 1.5;
	}
	
	.demo-subtitle {
		font-size: 28rpx;
		font-weight: 600;
		color: #606266;
		margin: 30rpx 0 20rpx 0;
	}
	
	.demo-actions {
		display: flex;
		gap: 20rpx;
		margin-bottom: 30rpx;
	}
	
	.custom-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	.custom-tag {
		font-size: 20rpx;
		padding: 4rpx 12rpx;
		border-radius: 12rpx;
		color: #fff;
		
		&.tag-primary {
			background-color: #409EFF;
		}
		
		&.tag-success {
			background-color: #67C23A;
		}
		
		&.tag-warning {
			background-color: #E6A23C;
		}
	}
	
	.custom-content {
		.content-text {
			display: block;
			margin-bottom: 20rpx;
			line-height: 1.6;
		}
		
		.content-actions {
			display: flex;
			gap: 16rpx;
		}
	}
</style> 