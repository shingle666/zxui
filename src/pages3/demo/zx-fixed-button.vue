<template>
	<view class="demo-page">
		<zx-navbar title="悬浮按钮 zx-fixed-button" back></zx-navbar>
		
		<view class="demo-content">
			<zx-fixed-button bgColor="#ffff00" :borderRadius="0" :width="200" :height="50" :top="100" :right="10" :isFixed="false">
				<view>
					按钮
				</view>
			</zx-fixed-button>
			<!-- 基础用法 -->
			<zx-section title="基础用法" padding>
				<view class="demo-item">
					<text class="demo-text">默认悬浮按钮（右下角）</text>
				</view>
			</zx-section>
			
			<!-- 不同位置 -->
			<zx-section title="不同位置" padding>
				<view class="demo-item">
					<text class="demo-text">左上角、右上角、顶部居中、左侧居中等位置</text>
				</view>
			</zx-section>
			
			<!-- 自定义样式 -->
			<zx-section title="自定义样式" padding>
				<view class="demo-item">
					<text class="demo-text">不同颜色、大小、图标的悬浮按钮</text>
				</view>
			</zx-section>
			
			<!-- 精确位置控制 -->
			<zx-section title="精确位置控制" padding>
				<view class="demo-item">
					<text class="demo-text">使用具体数值控制位置</text>
				</view>
			</zx-section>
			
			<!-- 自定义内容 -->
			<zx-section title="自定义内容" padding>
				<view class="demo-item">
					<text class="demo-text">使用插槽自定义按钮内容</text>
				</view>
			</zx-section>
			
			<!-- 控制按钮 -->
			<zx-section title="控制按钮" padding>
				<view class="demo-controls">
					<zx-button @click="toggleShow" :type="showButtons ? 'primary' : 'default'">
						{{ showButtons ? '隐藏' : '显示' }}悬浮按钮
					</zx-button>
				</view>
			</zx-section>
		</view>
		
		<!-- 悬浮按钮示例 -->
		<!-- 基础用法 -->
		<zx-fixed-button 
			v-if="showButtons"
			position="bottom-right" 
			@click="handleClick('默认按钮')"
		/>
		
		<!-- 不同位置 -->
		<zx-fixed-button 
			v-if="showButtons"
			position="top-left" 
			icon="menu" 
			bg-color="#ff6b6b"
			@click="handleClick('左上角按钮')"
		/>
		
		<zx-fixed-button 
			v-if="showButtons"
			position="top-right" 
			icon="search" 
			bg-color="#4ecdc4"
			@click="handleClick('右上角按钮')"
		/>
		
		<zx-fixed-button 
			v-if="showButtons"
			position="left-center" 
			icon="phone" 
			bg-color="#45b7d1"
			:width="100"
			:height="100"
			@click="handleClick('左侧居中按钮')"
		/>
		
		<!-- 精确位置控制 -->
		<zx-fixed-button 
			v-if="showButtons"
			:top="300" 
			:right="200"
			icon="star" 
			bg-color="#6c5ce7"
			:width="80"
			:height="80"
			@click="handleClick('精确位置按钮')"
		/>
		
		<!-- 自定义内容 -->
		<zx-fixed-button 
			v-if="showButtons"
			position="bottom-left" 
			bg-color="#fd79a8"
			:width="140"
			:height="140"
			@click="handleClick('购物车按钮')"
		>
			<view class="custom-button">
				<zx-icon name="shopping-cart" size="40" color="#ffffff" />
				<view class="badge">{{ cartCount }}</view>
			</view>
		</zx-fixed-button>
		
		<!-- 带文字的按钮 -->
		<zx-fixed-button 
			v-if="showButtons"
			position="top-center" 
			icon="message" 
			text="消息"
			bg-color="#00b894"
			:width="120"
			:height="120"
			@click="handleClick('消息按钮')"
		/>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const showButtons = ref(true)
const cartCount = ref(3)

// 方法
const toggleShow = () => {
	showButtons.value = !showButtons.value
}

const handleClick = (buttonName) => {
	uni.showToast({
		title: `点击了${buttonName}`,
		icon: 'none'
	})
	
	// 如果是购物车按钮，增加数量
	if (buttonName === '购物车按钮') {
		cartCount.value++
	}
}
</script>

<style lang="scss" scoped>
.demo-page {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.demo-content {
	padding-bottom: 100rpx;
}

.demo-item {
	padding: 30rpx 0;
}

.demo-text {
	font-size: 28rpx;
	color: #666;
	line-height: 1.6;
}

.demo-controls {
	padding: 30rpx 0;
	display: flex;
	justify-content: center;
}

.custom-button {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.badge {
	position: absolute;
	top: -10rpx;
	right: -10rpx;
	background-color: #ff4757;
	color: #ffffff;
	font-size: 20rpx;
	padding: 4rpx 8rpx;
	border-radius: 20rpx;
	min-width: 32rpx;
	height: 32rpx;
	line-height: 24rpx;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>