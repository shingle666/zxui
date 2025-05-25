<template>
	<view class="page-container">
		<!-- 页面头部 -->
		<view class="page-header">
			<text class="page-title">ZX-Sticky 吸顶组件示例</text>
			<text class="page-desc">演示各种吸顶效果和配置选项</text>
		</view>
		
		<!-- 状态显示 -->
		<view class="status-info">
			<view class="status-item">
				<text class="status-label">滚动距离:</text>
				<text class="status-value">{{ scrollTop }}px</text>
			</view>
			<view class="status-item">
				<text class="status-label">吸顶状态:</text>
				<text class="status-value" :class="{ active: isSticky }">
					{{ isSticky ? '已吸顶' : '未吸顶' }}
				</text>
			</view>
		</view>
		
		<!-- 控制面板 -->
		<view class="control-panel">
			<button 
				class="control-btn" 
				:class="{ disabled: disabled }"
				@click="toggleDisabled"
			>
				{{ disabled ? '启用吸顶' : '禁用吸顶' }}
			</button>
			<button class="control-btn" @click="toggleAnimation">
				{{ enableTransition ? '禁用动画' : '启用动画' }}
			</button>
		</view>
		
		<!-- 滚动容器 -->
		<scroll-view 
			class="scroll-container"
			scroll-y 
			@scroll="onScroll"
		>
			<!-- 顶部内容 -->
			<view class="content-section">
				<text class="section-title">顶部内容区域</text>
				<text class="section-desc">向下滚动查看吸顶效果</text>
				
				<view class="feature-list">
					<view class="feature-item">
						<text class="feature-icon">✨</text>
						<text class="feature-text">自动占位防跳动</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">🎯</text>
						<text class="feature-text">精确触发控制</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">⚡</text>
						<text class="feature-text">防抖性能优化</text>
					</view>
					<view class="feature-item">
						<text class="feature-icon">🎨</text>
						<text class="feature-text">丰富动画效果</text>
					</view>
				</view>
			</view>
			
			<!-- 第一个吸顶组件 - 主导航 -->
			<zx-sticky 
				ref="mainStickyRef"
				:scroll-top="scrollTop"
				:offset-top="10"
				:disabled="disabled"
				:enable-transition="enableTransition"
				background-color="#007AFF"
				z-index="100"
				@sticky-change="onStickyChange"
				@ready="onStickyReady"
			>
				<view class="sticky-nav">
					<text class="nav-title">主导航栏</text>
					<view class="nav-menu">
						<text 
							v-for="(item, index) in navItems" 
							:key="index"
							class="nav-item"
							:class="{ active: activeNav === index }"
							@click="activeNav = index"
						>
							{{ item }}
						</text>
					</view>
				</view>
			</zx-sticky>
			
			<!-- 中间内容区域 -->
			<view class="content-section">
				<text class="section-title">内容区域 1</text>
				<view class="content-grid">
					<view 
						v-for="(item, index) in 6" 
						:key="index" 
						class="grid-item"
					>
						<text class="item-number">{{ index + 1 }}</text>
						<text class="item-title">内容卡片 {{ index + 1 }}</text>
						<text class="item-desc">这里是卡片的描述信息</text>
					</view>
				</view>
			</view>
			
			<!-- 第二个吸顶组件 - 分类标签 -->
			<zx-sticky 
				ref="tabStickyRef"
				:scroll-top="scrollTop"
				:offset-top="70"
				:disabled="disabled"
				:enable-transition="enableTransition"
				:threshold="20"
				background-color="#FF6B35"
				@sticky-change="onTabStickyChange"
			>
				<view class="sticky-tabs">
					<scroll-view class="tabs-scroll" scroll-x>
						<view class="tabs-container">
							<text 
								v-for="(tab, index) in tabs" 
								:key="index"
								class="tab-item"
								:class="{ active: activeTab === index }"
								@click="activeTab = index"
							>
								{{ tab }}
							</text>
						</view>
					</scroll-view>
				</view>
			</zx-sticky>
			
			<!-- 更多内容区域 -->
			<view class="content-section">
				<text class="section-title">内容区域 2</text>
				<text class="section-desc">这里展示更多内容...</text>
				
				<view class="article-list">
					<view 
						v-for="(article, index) in articles" 
						:key="index" 
						class="article-item"
					>
						<view class="article-header">
							<text class="article-title">{{ article.title }}</text>
							<text class="article-time">{{ article.time }}</text>
						</view>
						<text class="article-content">{{ article.content }}</text>
						<view class="article-tags">
							<text 
								v-for="tag in article.tags" 
								:key="tag" 
								class="article-tag"
							>
								{{ tag }}
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 底部内容 -->
			<view class="content-section">
				<text class="section-title">底部区域</text>
				<view class="bottom-content">
					<text class="bottom-text">
						这是一个完整的吸顶组件示例，展示了多层级吸顶、动画效果、状态控制等功能。
					</text>
					<text class="bottom-text">
						组件支持自定义样式、防抖优化、平台兼容等特性。
					</text>
				</view>
			</view>
		</scroll-view>
		
		<!-- 浮动操作按钮 -->
		<view class="fab-container">
			<view class="fab" @click="scrollToTop">
				<text class="fab-icon">↑</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 响应式数据
const scrollTop = ref(0)
const disabled = ref(false)
const enableTransition = ref(true)
const activeNav = ref(0)
const activeTab = ref(0)

// 组件引用
const mainStickyRef = ref()
const tabStickyRef = ref()

// 导航菜单
const navItems = ref(['首页', '分类', '推荐', '我的'])

// 标签页
const tabs = ref(['热门', '最新', '推荐', '关注', '收藏', '历史', '设置'])

// 文章列表
const articles = ref([
	{
		title: '吸顶组件的设计原理',
		time: '2024-01-15',
		content: '吸顶组件是移动端常见的交互模式，通过监听滚动事件实现元素的固定定位效果。',
		tags: ['前端', 'Vue', '组件']
	},
	{
		title: '性能优化最佳实践',
		time: '2024-01-14',
		content: '在实现吸顶效果时，需要注意防抖处理、减少重绘重排、合理使用 CSS 属性等。',
		tags: ['性能', '优化', '最佳实践']
	},
	{
		title: '跨平台兼容性处理',
		time: '2024-01-13',
		content: '不同平台对状态栏、安全区域的处理方式不同，需要做好适配工作。',
		tags: ['跨平台', '兼容性', 'uni-app']
	},
	{
		title: 'CSS 动画与用户体验',
		time: '2024-01-12',
		content: '适当的动画效果可以提升用户体验，但要注意性能和流畅度的平衡。',
		tags: ['CSS', '动画', 'UX']
	}
])

// 计算属性
const isSticky = computed(() => {
	return mainStickyRef.value?.isSticky || false
})

// 滚动事件处理
const onScroll = (e) => {
	scrollTop.value = e.detail.scrollTop
}

// 主导航吸顶状态变化
const onStickyChange = (data) => {
	console.log('主导航吸顶状态变化:', data)
}

// 标签吸顶状态变化
const onTabStickyChange = (data) => {
	console.log('标签吸顶状态变化:', data)
}

// 组件就绪事件
const onStickyReady = (data) => {
	console.log('吸顶组件就绪:', data)
}

// 切换禁用状态
const toggleDisabled = () => {
	disabled.value = !disabled.value
	uni.showToast({
		title: disabled.value ? '已禁用吸顶' : '已启用吸顶',
		icon: 'none',
		duration: 1500
	})
}

// 切换动画效果
const toggleAnimation = () => {
	enableTransition.value = !enableTransition.value
	uni.showToast({
		title: enableTransition.value ? '已启用动画' : '已禁用动画',
		icon: 'none',
		duration: 1500
	})
}

// 滚动到顶部
const scrollToTop = () => {
	// 这里可以使用 scroll-view 的 scroll-top 属性实现
	uni.pageScrollTo({
		scrollTop: 0,
		duration: 300
	})
}
</script>

<style scoped>
.page-container {
	min-height: 100vh;
	background-color: #f5f5f5;
}

/* 页面头部 */
.page-header {
	padding: 40rpx 30rpx 20rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	text-align: center;
}

.page-title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.page-desc {
	display: block;
	font-size: 28rpx;
	opacity: 0.9;
}

/* 状态信息 */
.status-info {
	display: flex;
	background-color: white;
	padding: 20rpx 30rpx;
	border-bottom: 1px solid #eee;
}

.status-item {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.status-label {
	font-size: 28rpx;
	color: #666;
}

.status-value {
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.status-value.active {
	color: #007AFF;
}

/* 控制面板 */
.control-panel {
	display: flex;
	gap: 20rpx;
	padding: 20rpx 30rpx;
	background-color: white;
	border-bottom: 1px solid #eee;
}

.control-btn {
	flex: 1;
	padding: 24rpx;
	font-size: 28rpx;
	background-color: #007AFF;
	color: white;
	border: none;
	border-radius: 12rpx;
	transition: all 0.3s ease;
}

.control-btn.disabled {
	background-color: #FF6B35;
}

/* 滚动容器 */
.scroll-container {
	height: calc(100vh - 200rpx);
}

/* 内容区域 */
.content-section {
	margin: 30rpx;
	padding: 40rpx;
	background-color: white;
	border-radius: 16rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.section-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 16rpx;
}

.section-desc {
	display: block;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 30rpx;
	line-height: 1.6;
}

/* 功能列表 */
.feature-list {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
	margin-top: 30rpx;
}

.feature-item {
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 24rpx;
	background-color: #f8f9fa;
	border-radius: 12rpx;
}

.feature-icon {
	font-size: 32rpx;
}

.feature-text {
	font-size: 26rpx;
	color: #333;
}

/* 吸顶导航 */
.sticky-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	color: white;
}

.nav-title {
	font-size: 30rpx;
	font-weight: bold;
}

.nav-menu {
	display: flex;
	gap: 30rpx;
}

.nav-item {
	font-size: 26rpx;
	padding: 8rpx 16rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 16rpx;
	transition: all 0.3s ease;
}

.nav-item.active {
	background-color: white;
	color: #007AFF;
}

/* 内容网格 */
.content-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.grid-item {
	padding: 30rpx;
	background-color: #f8f9fa;
	border-radius: 12rpx;
	text-align: center;
	border: 2rpx solid transparent;
	transition: all 0.3s ease;
}

.grid-item:hover {
	border-color: #007AFF;
	transform: translateY(-4rpx);
}

.item-number {
	display: block;
	font-size: 24rpx;
	color: #007AFF;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.item-title {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.item-desc {
	display: block;
	font-size: 24rpx;
	color: #666;
}

/* 吸顶标签 */
.sticky-tabs {
	background-color: #FF6B35;
	padding: 16rpx 0;
}

.tabs-scroll {
	white-space: nowrap;
}

.tabs-container {
	display: inline-flex;
	gap: 30rpx;
	padding: 0 30rpx;
}

.tab-item {
	font-size: 28rpx;
	color: white;
	padding: 12rpx 24rpx;
	background-color: rgba(255, 255, 255, 0.2);
	border-radius: 20rpx;
	white-space: nowrap;
	transition: all 0.3s ease;
}

.tab-item.active {
	background-color: white;
	color: #FF6B35;
}

/* 文章列表 */
.article-list {
	margin-top: 30rpx;
}

.article-item {
	padding: 30rpx;
	margin-bottom: 20rpx;
	background-color: #f8f9fa;
	border-radius: 12rpx;
	border-left: 6rpx solid #007AFF;
}

.article-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16rpx;
}

.article-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}

.article-time {
	font-size: 24rpx;
	color: #999;
}

.article-content {
	display: block;
	font-size: 26rpx;
	color: #666;
	line-height: 1.6;
	margin-bottom: 20rpx;
}

.article-tags {
	display: flex;
	gap: 16rpx;
	flex-wrap: wrap;
}

.article-tag {
	font-size: 22rpx;
	color: #007AFF;
	background-color: rgba(0, 122, 255, 0.1);
	padding: 6rpx 12rpx;
	border-radius: 12rpx;
}

/* 底部内容 */
.bottom-content {
	margin-top: 30rpx;
}

.bottom-text {
	display: block;
	font-size: 26rpx;
	color: #666;
	line-height: 1.8;
	margin-bottom: 20rpx;
}

/* 浮动按钮 */
.fab-container {
	position: fixed;
	bottom: 60rpx;
	right: 60rpx;
	z-index: 1000;
}

.fab {
	width: 100rpx;
	height: 100rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
}

.fab:active {
	transform: scale(0.95);
}

.fab-icon {
	font-size: 36rpx;
	color: white;
	font-weight: bold;
}
</style>
