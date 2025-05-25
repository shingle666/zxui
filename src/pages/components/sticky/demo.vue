<template>
	<view class="demo-container">
		<!-- 顶部状态显示 -->
		<view class="status-bar">
			<text>滚动距离: {{ scrollTop }}px</text>
			<text>吸顶状态: {{ isSticky ? '已吸顶' : '未吸顶' }}</text>
			<text>组件状态: {{ isReady ? '就绪' : '未就绪' }}</text>
		</view>
		
		<!-- 控制按钮区域 -->
		<view class="control-section">
			<button 
				@click="toggleDisabled" 
				:class="{ 'disabled': disabled }"
			>
				{{ disabled ? '启用吸顶' : '禁用吸顶' }}
			</button>
			
			<button @click="refreshComponent">
				刷新组件
			</button>
			
			<button @click="toggleAnimation">
				{{ enableTransition ? '禁用动画' : '启用动画' }}
			</button>
		</view>
		
		<!-- 滚动容器 -->
		<scroll-view 
			class="scroll-container"
			scroll-y 
			@scroll="onScroll"
			:scroll-top="programScrollTop"
		>
			<!-- 顶部内容区域 -->
			<view class="content-section top-content">
				<text class="section-title">顶部内容区域</text>
				<text class="section-desc">向下滚动查看吸顶效果</text>
				
				<!-- 快速跳转按钮 -->
				<view class="quick-nav">
					<button @click="scrollToPosition(500)">滚动到 500px</button>
					<button @click="scrollToPosition(1000)">滚动到 1000px</button>
					<button @click="scrollToPosition(0)">回到顶部</button>
				</view>
			</view>
			
			<!-- 第一个吸顶组件 - 主导航 -->
			<zx-sticky 
				ref="mainStickyRef"
				:scroll-top="scrollTop"
				:offset-top="20"
				:disabled="disabled"
				:enable-transition="enableTransition"
				background-color="#6c5ce7"
				@sticky-change="onMainStickyChange"
				@ready="onStickyReady"
				@error="onStickyError"
			>
				<view class="sticky-nav main-nav">
					<text class="nav-title">主导航栏</text>
					<view class="nav-buttons">
						<text class="nav-btn">首页</text>
						<text class="nav-btn">分类</text>
						<text class="nav-btn">购物车</text>
						<text class="nav-btn">我的</text>
					</view>
				</view>
			</zx-sticky>
			
			<!-- 中间内容区域 -->
			<view class="content-section middle-content">
				<text class="section-title">中间内容区域</text>
				<view class="content-cards">
					<view 
						v-for="(item, index) in 8" 
						:key="index" 
						class="content-card"
					>
						<text>内容卡片 {{ index + 1 }}</text>
					</view>
				</view>
			</view>
			
			<!-- 第二个吸顶组件 - 子导航 -->
			<zx-sticky 
				ref="subStickyRef"
				:scroll-top="scrollTop"
				:offset-top="100"
				:disabled="disabled"
				:enable-transition="enableTransition"
				:threshold="20"
				background-color="#fd79a8"
				@sticky-change="onSubStickyChange"
			>
				<view class="sticky-nav sub-nav">
					<text class="nav-title">子导航栏</text>
					<view class="nav-tabs">
						<text 
							v-for="tab in tabs" 
							:key="tab.id"
							class="nav-tab"
							:class="{ active: activeTab === tab.id }"
							@click="activeTab = tab.id"
						>
							{{ tab.name }}
						</text>
					</view>
				</view>
			</zx-sticky>
			
			<!-- 底部内容区域 -->
			<view class="content-section bottom-content">
				<text class="section-title">底部内容区域</text>
				<text class="section-desc">这里有更多内容...</text>
				
				<view class="long-content">
					<view 
						v-for="(item, index) in 20" 
						:key="index" 
						class="content-item"
					>
						<text>内容项目 {{ index + 1 }}</text>
						<text class="item-desc">这是一段描述文字，用来展示长内容效果。</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 调试信息面板 -->
		<view class="debug-panel" v-if="showDebug">
			<text class="debug-title">调试信息</text>
			<text>主导航距顶部: {{ mainTopHeight }}px</text>
			<text>子导航距顶部: {{ subTopHeight }}px</text>
			<text>状态栏高度: {{ statusBarHeight }}px</text>
			<text>胶囊高度: {{ capsuleHeight }}px</text>
		</view>
		
		<!-- 调试开关 -->
		<view class="debug-toggle" @click="showDebug = !showDebug">
			{{ showDebug ? '隐藏' : '显示' }}调试
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 响应式数据
const scrollTop = ref(0)
const programScrollTop = ref(0)
const disabled = ref(false)
const enableTransition = ref(true)
const showDebug = ref(false)
const activeTab = ref('tab1')

// 组件实例引用
const mainStickyRef = ref()
const subStickyRef = ref()

// 标签页数据
const tabs = ref([
	{ id: 'tab1', name: '热门' },
	{ id: 'tab2', name: '推荐' },
	{ id: 'tab3', name: '最新' },
	{ id: 'tab4', name: '关注' }
])

// 调试信息
const mainTopHeight = ref(0)
const subTopHeight = ref(0)
const statusBarHeight = ref(0)
const capsuleHeight = ref(0)

// 计算属性
const isSticky = computed(() => {
	return mainStickyRef.value?.isSticky || false
})

const isReady = computed(() => {
	return mainStickyRef.value?.isReady || false
})

// 滚动事件处理
const onScroll = (e) => {
	scrollTop.value = e.detail.scrollTop
}

// 主导航吸顶状态变化
const onMainStickyChange = (data) => {
	console.log('主导航吸顶状态变化:', data)
	uni.showToast({
		title: data.isSticky ? '主导航已吸顶' : '主导航取消吸顶',
		icon: 'none',
		duration: 1000
	})
}

// 子导航吸顶状态变化
const onSubStickyChange = (data) => {
	console.log('子导航吸顶状态变化:', data)
}

// 组件就绪事件
const onStickyReady = (data) => {
	console.log('吸顶组件就绪:', data)
	mainTopHeight.value = data.topHeight
	statusBarHeight.value = data.statusBarHeight
	capsuleHeight.value = data.capsuleHeight
}

// 组件错误事件
const onStickyError = (error) => {
	console.error('吸顶组件错误:', error)
	uni.showToast({
		title: '组件初始化失败',
		icon: 'error'
	})
}

// 切换禁用状态
const toggleDisabled = () => {
	disabled.value = !disabled.value
	uni.showToast({
		title: disabled.value ? '已禁用吸顶' : '已启用吸顶',
		icon: 'none'
	})
}

// 刷新组件
const refreshComponent = async () => {
	try {
		await Promise.all([
			mainStickyRef.value?.refresh(),
			subStickyRef.value?.refresh()
		])
		uni.showToast({
			title: '组件已刷新',
			icon: 'success'
		})
		
		// 更新调试信息
		if (mainStickyRef.value) {
			mainTopHeight.value = mainStickyRef.value.topHeight
		}
		if (subStickyRef.value) {
			subTopHeight.value = subStickyRef.value.topHeight
		}
	} catch (error) {
		console.error('刷新组件失败:', error)
		uni.showToast({
			title: '刷新失败',
			icon: 'error'
		})
	}
}

// 切换动画
const toggleAnimation = () => {
	enableTransition.value = !enableTransition.value
	uni.showToast({
		title: enableTransition.value ? '已启用动画' : '已禁用动画',
		icon: 'none'
	})
}

// 滚动到指定位置
const scrollToPosition = (position) => {
	programScrollTop.value = Math.random() // 触发更新
	setTimeout(() => {
		programScrollTop.value = position
	}, 50)
}

// 组件挂载
onMounted(() => {
	console.log('Demo 页面挂载完成')
})
</script>

<style scoped>
.demo-container {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f8f9fa;
}

/* 状态栏 */
.status-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #2d3436;
	color: white;
	font-size: 24rpx;
}

/* 控制区域 */
.control-section {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 30rpx;
	background-color: white;
	border-bottom: 1px solid #eee;
}

.control-section button {
	flex: 1;
	padding: 20rpx;
	font-size: 28rpx;
	background-color: #0984e3;
	color: white;
	border: none;
	border-radius: 8rpx;
}

.control-section button.disabled {
	background-color: #fab1a0;
}

/* 滚动容器 */
.scroll-container {
	flex: 1;
	background-color: #f8f9fa;
}

/* 内容区域 */
.content-section {
	padding: 40rpx 30rpx;
	margin: 20rpx;
	background-color: white;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	color: #2d3436;
	margin-bottom: 20rpx;
}

.section-desc {
	display: block;
	font-size: 28rpx;
	color: #636e72;
	margin-bottom: 30rpx;
}

/* 快速导航 */
.quick-nav {
	display: flex;
	gap: 20rpx;
	margin-top: 30rpx;
}

.quick-nav button {
	flex: 1;
	padding: 20rpx;
	font-size: 24rpx;
	background-color: #a29bfe;
	color: white;
	border: none;
	border-radius: 8rpx;
}

/* 内容卡片 */
.content-cards {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	margin-top: 30rpx;
}

.content-card {
	padding: 40rpx;
	background-color: #f1f2f6;
	border-radius: 12rpx;
	text-align: center;
	font-size: 28rpx;
	color: #2d3436;
}

/* 吸顶导航样式 */
.sticky-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 25rpx 30rpx;
	color: white;
}

.nav-title {
	font-size: 32rpx;
	font-weight: bold;
}

.nav-buttons {
	display: flex;
	gap: 30rpx;
}

.nav-btn {
	font-size: 28rpx;
	padding: 10rpx 20rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 20rpx;
}

.nav-tabs {
	display: flex;
	gap: 30rpx;
}

.nav-tab {
	font-size: 28rpx;
	padding: 10rpx 20rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 20rpx;
	transition: all 0.3s ease;
}

.nav-tab.active {
	background-color: white;
	color: #fd79a8;
}

/* 长内容 */
.long-content {
	margin-top: 30rpx;
}

.content-item {
	display: flex;
	flex-direction: column;
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: #f8f9fa;
	border-radius: 12rpx;
	border-left: 4px solid #0984e3;
}

.content-item text:first-child {
	font-size: 30rpx;
	font-weight: bold;
	color: #2d3436;
	margin-bottom: 10rpx;
}

.item-desc {
	font-size: 26rpx;
	color: #636e72;
	line-height: 1.5;
}

/* 调试面板 */
.debug-panel {
	position: fixed;
	bottom: 100rpx;
	right: 30rpx;
	padding: 20rpx;
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	border-radius: 12rpx;
	font-size: 24rpx;
	max-width: 400rpx;
	z-index: 10000;
}

.debug-title {
	display: block;
	font-weight: bold;
	margin-bottom: 10rpx;
	color: #ffeaa7;
}

.debug-panel text {
	display: block;
	margin-bottom: 5rpx;
}

.debug-toggle {
	position: fixed;
	bottom: 30rpx;
	right: 30rpx;
	padding: 20rpx;
	background-color: #0984e3;
	color: white;
	border-radius: 50rpx;
	font-size: 24rpx;
	z-index: 10001;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.3);
}
</style> 