<template>
	<view class="container">
		
		<view class="content">
			<!-- 基础滚动示例 -->
			<view class="section">
				<view class="section-title">基础垂直滚动</view>
				<view class="demo-box">
					<zx-scroll 
						height="300rpx"
						:show-scrollbar="true"
						:show-back-top="true"
						@scroll="onScroll"
						@scrolltolower="onScrollToLower"
					>
						<view 
							v-for="item in basicList" 
							:key="item.id"
							class="scroll-item"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 水平滚动示例 -->
			<view class="section">
				<view class="section-title">水平滚动</view>
				<view class="demo-box">
					<zx-scroll 
						direction="x"
						height="200rpx"
						:show-scrollbar="true"
					>
						<view 
							v-for="item in horizontalList" 
							:key="item.id"
							class="scroll-item-horizontal"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 下拉刷新示例 -->
			<view class="section">
				<view class="section-title">下拉刷新</view>
				<view class="demo-box">
					<zx-scroll 
						height="350rpx"
						:refresher-enabled="true"
						:refresher-triggered="refreshTriggered"
						:show-scrollbar="true"
						@refresherrefresh="onRefresh"
					>
						<view 
							v-for="item in refreshList" 
							:key="item.id"
							class="scroll-item"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 加载更多示例 */
			<view class="section">
				<view class="section-title">加载更多</view>
				<view class="demo-box">
					<zx-scroll 
						height="400rpx"
						:show-load-more="true"
						:is-loading="isLoading"
						:no-more="noMore"
						loading-text="正在加载..."
						no-more-text="已加载全部数据"
						@loadMore="onLoadMore"
					>
						<view 
							v-for="item in loadMoreList" 
							:key="item.id"
							class="scroll-item"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 虚拟列表示例 -->
			<view class="section">
				<view class="section-title">虚拟列表 (性能优化)</view>
				<view class="demo-box">
					<zx-scroll 
						height="400rpx"
						:enable-virtual-list="true"
						:virtual-list-source="virtualListData"
						:virtual-item-height="80"
						:virtual-buffer="5"
						:show-scrollbar="true"
						@virtualScroll="onVirtualScroll"
					>
						<template #virtual-item="{ item, index }">
							<view class="virtual-item">
								<view class="virtual-item-index">{{ index }}</view>
								<view class="virtual-item-content">
									<view class="virtual-item-title">{{ item.title }}</view>
									<view class="virtual-item-desc">{{ item.description }}</view>
								</view>
							</view>
						</template>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 自动滚动示例 */
			<view class="section">
				<view class="section-title">自动滚动</view>
				<view class="demo-box">
					<view class="auto-scroll-controls">
						<button 
							@tap="toggleAutoScroll" 
							class="control-btn"
							:class="{ active: autoScrolling }"
						>
							{{ autoScrolling ? '停止自动滚动' : '开始自动滚动' }}
						</button>
					</view>
					<zx-scroll 
						ref="autoScrollRef"
						height="300rpx"
						:auto-scroll-interval="autoScrolling ? 2000 : 0"
						:auto-scroll-speed="50"
						:show-scrollbar="true"
					>
						<view 
							v-for="item in autoScrollList" 
							:key="item.id"
							class="scroll-item"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 空状态示例 */
			<view class="section">
				<view class="section-title">空状态</view>
				<view class="demo-box">
					<zx-scroll 
						height="200rpx"
						:is-empty="true"
						empty-text="暂无数据"
					>
						<template #empty>
							<view class="custom-empty">
								<text class="empty-icon">📭</text>
								<text class="empty-text">自定义空状态</text>
							</view>
						</template>
					</zx-scroll>
				</view>
			</view>
			
			<!-- 性能测试示例 -->
			<view class="section">
				<view class="section-title">性能测试 (节流/防抖)</view>
				<view class="demo-box">
					<view class="performance-controls">
						<button 
							@tap="setPerformanceMode('normal')" 
							class="control-btn"
							:class="{ active: performanceMode === 'normal' }"
						>
							普通模式
						</button>
						<button 
							@tap="setPerformanceMode('throttle')" 
							class="control-btn"
							:class="{ active: performanceMode === 'throttle' }"
						>
							节流模式
						</button>
						<button 
							@tap="setPerformanceMode('debounce')" 
							class="control-btn"
							:class="{ active: performanceMode === 'debounce' }"
						>
							防抖模式
						</button>
					</view>
					<view class="scroll-info">
						<text>滚动事件触发次数: {{ scrollEventCount }}</text>
					</view>
					<zx-scroll 
						height="300rpx"
						:throttle="performanceMode === 'throttle'"
						:debounce="performanceMode === 'debounce'"
						:throttle-time="16"
						:debounce-time="100"
						:show-scrollbar="true"
						@scroll="onPerformanceScroll"
					>
						<view 
							v-for="item in performanceList" 
							:key="item.id"
							class="scroll-item"
							:style="{ backgroundColor: item.color }"
						>
							{{ item.text }}
						</view>
					</zx-scroll>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式数据
const basicList = ref([])
const horizontalList = ref([])
const refreshList = ref([])
const loadMoreList = ref([])
const virtualListData = ref([])
const autoScrollList = ref([])
const performanceList = ref([])

const refreshTriggered = ref(false)
const isLoading = ref(false)
const noMore = ref(false)
const autoScrolling = ref(false)
const performanceMode = ref('normal')
const scrollEventCount = ref(0)

const autoScrollRef = ref(null)

// 颜色数组
const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD']

// 生成测试数据
const generateBasicList = () => {
	const list = []
	for (let i = 1; i <= 20; i++) {
		list.push({
			id: i,
			text: `基础列表项 ${i}`,
			color: colors[i % colors.length]
		})
	}
	return list
}

const generateHorizontalList = () => {
	const list = []
	for (let i = 1; i <= 10; i++) {
		list.push({
			id: i,
			text: `项目${i}`,
			color: colors[i % colors.length]
		})
	}
	return list
}

const generateVirtualListData = () => {
	const list = []
	for (let i = 1; i <= 10000; i++) {
		list.push({
			id: i,
			title: `虚拟列表项 ${i}`,
			description: `这是第 ${i} 个虚拟列表项的描述内容`
		})
	}
	return list
}

const generatePerformanceList = () => {
	const list = []
	for (let i = 1; i <= 100; i++) {
		list.push({
			id: i,
			text: `性能测试项 ${i}`,
			color: colors[i % colors.length]
		})
	}
	return list
}

// 事件处理
const onScroll = (e) => {
	console.log('基础滚动事件:', e)
}

const onScrollToLower = () => {
	console.log('滚动到底部')
	uni.showToast({
		title: '已滚动到底部',
		icon: 'none'
	})
}

const onRefresh = () => {
	console.log('下拉刷新')
	refreshTriggered.value = true
	
	// 模拟网络请求
	setTimeout(() => {
		refreshList.value = generateBasicList()
		refreshTriggered.value = false
		uni.showToast({
			title: '刷新成功',
			icon: 'success'
		})
	}, 1500)
}

const onLoadMore = () => {
	console.log('加载更多')
	
	if (isLoading.value || noMore.value) return
	
	isLoading.value = true
	
	// 模拟网络请求
	setTimeout(() => {
		const currentLength = loadMoreList.value.length
		const newItems = []
		
		for (let i = 1; i <= 10; i++) {
			newItems.push({
				id: currentLength + i,
				text: `加载更多项 ${currentLength + i}`,
				color: colors[(currentLength + i) % colors.length]
			})
		}
		
		loadMoreList.value.push(...newItems)
		isLoading.value = false
		
		// 模拟数据加载完毕
		if (loadMoreList.value.length >= 50) {
			noMore.value = true
		}
		
		uni.showToast({
			title: '加载成功',
			icon: 'success'
		})
	}, 1000)
}

const onVirtualScroll = (info) => {
	console.log('虚拟滚动:', info)
}

const toggleAutoScroll = () => {
	autoScrolling.value = !autoScrolling.value
	uni.showToast({
		title: autoScrolling.value ? '开始自动滚动' : '停止自动滚动',
		icon: 'none'
	})
}

const setPerformanceMode = (mode) => {
	performanceMode.value = mode
	scrollEventCount.value = 0
	uni.showToast({
		title: `切换到${mode}模式`,
		icon: 'none'
	})
}

const onPerformanceScroll = (e) => {
	scrollEventCount.value++
}

// 初始化数据
onMounted(() => {
	basicList.value = generateBasicList()
	horizontalList.value = generateHorizontalList()
	refreshList.value = generateBasicList()
	loadMoreList.value = generateBasicList().slice(0, 10)
	virtualListData.value = generateVirtualListData()
	autoScrollList.value = generateBasicList()
	performanceList.value = generatePerformanceList()
})
</script>

<style scoped>
.container {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.content {
	padding: 20rpx;
}

.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	padding: 30rpx 30rpx 20rpx;
	background-color: #fafafa;
	border-bottom: 1px solid #eee;
}

.demo-box {
	padding: 30rpx;
}

.scroll-item {
	height: 100rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
	color: #fff;
	font-size: 28rpx;
	font-weight: 500;
}

.scroll-item-horizontal {
	width: 200rpx;
	height: 160rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
	border-radius: 12rpx;
	color: #fff;
	font-size: 24rpx;
	font-weight: 500;
	flex-shrink: 0;
}

.virtual-item {
	height: 80rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	border-bottom: 1px solid #eee;
	background-color: #fff;
}

.virtual-item-index {
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

.virtual-item-content {
	flex: 1;
}

.virtual-item-title {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.virtual-item-desc {
	font-size: 24rpx;
	color: #666;
	margin-top: 8rpx;
}

.auto-scroll-controls,
.performance-controls {
	display: flex;
	gap: 20rpx;
	margin-bottom: 20rpx;
	flex-wrap: wrap;
}

.control-btn {
	padding: 16rpx 32rpx;
	font-size: 24rpx;
	border: 1px solid #007AFF;
	border-radius: 24rpx;
	background-color: #fff;
	color: #007AFF;
	transition: all 0.3s ease;
}

.control-btn.active {
	background-color: #007AFF;
	color: #fff;
}

.custom-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60rpx 0;
}

.empty-icon {
	font-size: 80rpx;
	margin-bottom: 20rpx;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
}

.scroll-info {
	margin-bottom: 20rpx;
	padding: 20rpx;
	background-color: #f0f0f0;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #666;
}
</style> 