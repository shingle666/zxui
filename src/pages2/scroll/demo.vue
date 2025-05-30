<template>
	<view class="demo-container">
		<view class="demo-header">
			<text class="demo-title">ZX-Scroll 组件演示</text>
		</view>
		
		<!-- 基础示例 -->
		<view class="demo-section">
			<text class="demo-section-title">基础滚动</text>
			<zx-scroll 
				height="300rpx" 
				:show-scrollbar="true"
				:show-back-top="true"
				@scroll="onScroll"
			>
				<view 
					v-for="item in list" 
					:key="item.id" 
					class="demo-item"
					:style="{ backgroundColor: colors[item.id % colors.length] }"
				>
					{{ item.text }}
				</view>
			</zx-scroll>
		</view>
		
		<!-- 下拉刷新示例 -->
		<view class="demo-section">
			<text class="demo-section-title">下拉刷新</text>
			<zx-scroll 
				height="350rpx"
				:refresher-enabled="true"
				:refresher-triggered="refreshing"
				@refresherrefresh="onRefresh"
			>
				<view 
					v-for="item in refreshList" 
					:key="item.id" 
					class="demo-item"
					:style="{ backgroundColor: colors[item.id % colors.length] }"
				>
					{{ item.text }} (刷新时间: {{ refreshTime }})
				</view>
			</zx-scroll>
		</view>
		
		<!-- 虚拟列表示例 -->
		<view class="demo-section">
			<text class="demo-section-title">虚拟列表 ({{ virtualList.length }} 条数据)</text>
			<zx-scroll 
				height="400rpx"
				:enable-virtual-list="true"
				:virtual-list-source="virtualList"
				:virtual-item-height="80"
				:show-scrollbar="true"
			>
				<template #virtual-item="{ item, index }">
					<view class="virtual-demo-item">
						<view class="virtual-index">{{ index }}</view>
						<view class="virtual-content">
							<text class="virtual-title">{{ item.title }}</text>
							<text class="virtual-desc">{{ item.desc }}</text>
						</view>
					</view>
				</template>
			</zx-scroll>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式数据
const list = ref([])
const refreshList = ref([])
const virtualList = ref([])
const refreshing = ref(false)
const refreshTime = ref('')

// 颜色数组
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD']

// 生成列表数据
const generateList = (count = 15, prefix = '列表项') => {
	const result = []
	for (let i = 1; i <= count; i++) {
		result.push({
			id: i,
			text: `${prefix} ${i}`
		})
	}
	return result
}

// 生成虚拟列表数据
const generateVirtualList = (count = 5000) => {
	const result = []
	for (let i = 1; i <= count; i++) {
		result.push({
			id: i,
			title: `虚拟列表项 ${i}`,
			desc: `这是第 ${i} 个虚拟列表项的描述信息`
		})
	}
	return result
}

// 滚动事件
const onScroll = (e) => {
	console.log('滚动位置:', e.scrollTop)
}

// 下拉刷新
const onRefresh = () => {
	refreshing.value = true
	refreshTime.value = new Date().toLocaleTimeString()
	
	// 模拟网络请求
	setTimeout(() => {
		refreshList.value = generateList(15, '刷新后的项')
		refreshing.value = false
		uni.showToast({
			title: '刷新成功',
			icon: 'success'
		})
	}, 1500)
}

// 初始化数据
onMounted(() => {
	list.value = generateList()
	refreshList.value = generateList(15, '下拉刷新项')
	virtualList.value = generateVirtualList()
	refreshTime.value = new Date().toLocaleTimeString()
})
</script>

<style scoped>
.demo-container {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-header {
	text-align: center;
	padding: 40rpx 0;
}

.demo-title {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
}

.demo-section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 20rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.demo-section-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.demo-item {
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 10rpx;
	border-radius: 8rpx;
	color: #fff;
	font-size: 28rpx;
}

.virtual-demo-item {
	height: 80rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	border-bottom: 1px solid #eee;
	background-color: #fff;
}

.virtual-index {
	width: 60rpx;
	height: 40rpx;
	background-color: #007AFF;
	color: #fff;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20rpx;
	margin-right: 20rpx;
}

.virtual-content {
	flex: 1;
}

.virtual-title {
	display: block;
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.virtual-desc {
	display: block;
	font-size: 24rpx;
	color: #666;
	margin-top: 8rpx;
}
</style> 