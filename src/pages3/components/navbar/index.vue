<template>
	<view class="navbar-demo">
		<!-- 页面导航栏 -->
		<zx-navbar
			title="Navbar 组件示例"
			bg-color="#007AFF"
			:title-style="{ color: '#ffffff' }"
			left-icon="arrow-left"
			left-icon-color="#ffffff"
			right-text="源码"
			right-icon-color="#ffffff"
			@left-click="goBack"
			@right-click="viewSource"
		/>

		<scroll-view scroll-y class="demo-scroll">
			<!-- 基础用法 -->
			<view class="demo-section">
				<view class="demo-section-title">基础用法</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="基础导航栏"
						left-text="返回"
						right-text="更多"
						@left-click="showToast('点击了返回')"
						@right-click="showToast('点击了更多')"
					/>
				</view>
			</view>

			<!-- 副标题 -->
			<view class="demo-section">
				<view class="demo-section-title">副标题</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="主标题"
						subtitle="这是副标题说明"
						:auto-back="false"
						right-icon="help-circle"
						@right-click="showToast('查看帮助')"
					/>
				</view>
			</view>

			<!-- 透明背景 -->
			<view class="demo-section bg-image">
				<view class="demo-section-title">透明背景</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="透明导航栏"
						:transparent="true"
						left-icon="arrow-left"
						right-icon="more-horizontal"
						left-icon-color="#ffffff"
						right-icon-color="#ffffff"
						:title-style="{ color: '#ffffff', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }"
						@left-click="showToast('透明背景返回')"
						@right-click="showToast('透明背景更多')"
					/>
				</view>
			</view>

			<!-- 沉浸式模式 -->
			<view class="demo-section">
				<view class="demo-section-title">沉浸式模式</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="沉浸式导航栏"
						:immersive="true"
						:shadow="true"
						left-icon="arrow-left"
						right-icon="search"
						@left-click="showToast('沉浸式返回')"
						@right-click="showToast('沉浸式搜索')"
					/>
				</view>
			</view>

			<!-- 主题模式 -->
			<view class="demo-section">
				<view class="demo-section-title">主题模式</view>
				<view class="demo-section-content">
					<view class="theme-demo">
						<!-- 亮色主题 -->
						<view class="theme-item">
							<text class="theme-label">亮色主题</text>
							<zx-navbar 
								title="Light Theme"
								theme="light"
								bg-color="#ffffff"
								left-icon="sun"
								right-icon="settings"
								@left-click="showToast('亮色主题')"
							/>
						</view>
						
						<!-- 暗色主题 -->
						<view class="theme-item">
							<text class="theme-label">暗色主题</text>
							<zx-navbar 
								title="Dark Theme"
								theme="dark"
								bg-color="#1f1f1f"
								left-icon="moon"
								right-icon="settings"
								left-icon-color="#ffffff"
								right-icon-color="#ffffff"
								@left-click="showToast('暗色主题')"
							/>
						</view>
					</view>
				</view>
			</view>

			<!-- 加载状态 -->
			<view class="demo-section">
				<view class="demo-section-title">加载状态</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="正在加载..."
						:loading="isLoading"
						left-icon="arrow-left"
						:left-disabled="isLoading"
						right-text="刷新"
						:right-disabled="isLoading"
						@left-click="showToast('返回被禁用')"
						@right-click="toggleLoading"
					/>
					<view class="demo-actions">
						<button @click="toggleLoading" :disabled="isLoading">
							{{ isLoading ? '加载中...' : '切换加载状态' }}
						</button>
					</view>
				</view>
			</view>

			<!-- 自定义颜色 -->
			<view class="demo-section">
				<view class="demo-section-title">自定义颜色</view>
				<view class="demo-section-content">
					<view class="color-demo">
						<zx-navbar 
							title="蓝色主题"
							bg-color="#007AFF"
							left-icon="arrow-left"
							right-text="完成"
							left-icon-color="#ffffff"
							right-icon-color="#ffffff"
							:title-style="{ color: '#ffffff' }"
							@left-click="showToast('蓝色主题返回')"
							@right-click="showToast('蓝色主题完成')"
						/>
					</view>
					<view class="color-demo">
						<zx-navbar 
							title="绿色主题"
							bg-color="#34C759"
							left-icon="arrow-left"
							right-icon="check"
							left-icon-color="#ffffff"
							right-icon-color="#ffffff"
							:title-style="{ color: '#ffffff' }"
							@left-click="showToast('绿色主题返回')"
							@right-click="showToast('绿色主题确认')"
						/>
					</view>
				</view>
			</view>

			<!-- 渐变背景 -->
			<view class="demo-section">
				<view class="demo-section-title">渐变背景</view>
				<view class="demo-section-content">
					<view class="gradient-navbar">
						<zx-navbar 
							title="渐变导航栏"
							left-icon="arrow-left"
							right-icon="heart"
							left-icon-color="#ffffff"
							right-icon-color="#ffffff"
							:title-style="{ color: '#ffffff' }"
							@left-click="showToast('渐变返回')"
							@right-click="showToast('渐变喜欢')"
						/>
					</view>
				</view>
			</view>

			<!-- 自定义插槽 -->
			<view class="demo-section">
				<view class="demo-section-title">自定义插槽</view>
				<view class="demo-section-content">
					<zx-navbar 
						:auto-back="false"
						@left-click="showToast('自定义左侧')"
						@right-click="showToast('自定义右侧')"
					>
						<template #left>
							<view class="custom-left">
								<zx-icon name="home" size="20" color="#007AFF"></zx-icon>
								<text class="custom-text">首页</text>
							</view>
						</template>
						<template #center>
							<view class="custom-center">
								<view class="logo">LOGO</view>
								<text class="brand-name">品牌名称</text>
							</view>
						</template>
						<template #right>
							<view class="custom-right">
								<zx-icon name="search" size="20" color="#333" class="icon-item"></zx-icon>
								<view class="badge-container">
									<zx-icon name="shopping-cart" size="20" color="#333"></zx-icon>
									<text class="badge">{{ cartCount }}</text>
								</view>
							</view>
						</template>
					</zx-navbar>
				</view>
			</view>

			<!-- 固定在顶部 -->
			<view class="demo-section">
				<view class="demo-section-title">固定在顶部</view>
				<view class="demo-section-content">
					<view class="fixed-demo">
						<text class="demo-tip">下面的导航栏已固定在顶部</text>
						<button @click="toggleFixed">
							{{ isFixed ? '取消固定' : '固定在顶部' }}
						</button>
					</view>
					<zx-navbar 
						v-if="isFixed"
						title="固定导航栏"
						:fixed="true"
						:shadow="true"
						bg-color="#FF3B30"
						left-icon="arrow-left"
						right-icon="share"
						left-icon-color="#ffffff"
						right-icon-color="#ffffff"
						:title-style="{ color: '#ffffff' }"
						@left-click="showToast('固定导航栏返回')"
						@right-click="showToast('固定导航栏分享')"
					/>
				</view>
			</view>

			<!-- 底部边框 -->
			<view class="demo-section">
				<view class="demo-section-title">底部边框</view>
				<view class="demo-section-content">
					<zx-navbar 
						title="带边框导航栏"
						:border="true"
						border-color="#e0e0e0"
						left-icon="arrow-left"
						right-text="编辑"
						@left-click="showToast('边框返回')"
						@right-click="showToast('边框编辑')"
					/>
				</view>
			</view>

			<!-- 高度自定义 -->
			<view class="demo-section">
				<view class="demo-section-title">自定义高度</view>
				<view class="demo-section-content">
					<view class="height-demo">
						<text class="demo-label">标准高度 (44px)</text>
						<zx-navbar 
							title="标准高度"
							height="44px"
							left-icon="arrow-left"
							@left-click="showToast('标准高度')"
						/>
					</view>
					<view class="height-demo">
						<text class="demo-label">较高 (60px)</text>
						<zx-navbar 
							title="较高导航栏"
							subtitle="60px 高度"
							height="60px"
							bg-color="#f8f8f8"
							left-icon="arrow-left"
							@left-click="showToast('较高导航栏')"
						/>
					</view>
				</view>
			</view>

			<!-- 交互演示 -->
			<view class="demo-section">
				<view class="demo-section-title">交互演示</view>
				<view class="demo-section-content">
					<view class="interaction-demo">
						<zx-navbar 
							:title="dynamicTitle"
							:subtitle="dynamicSubtitle"
							:bg-color="dynamicBgColor"
							:loading="interactionLoading"
							left-icon="arrow-left"
							right-text="操作"
							:left-disabled="interactionLoading"
							@left-click="showToast('交互返回')"
							@right-click="performAction"
						/>
						<view class="demo-controls">
							<button @click="changeTitle">更改标题</button>
							<button @click="changeColor">更改颜色</button>
							<button @click="performAction">执行操作</button>
						</view>
					</view>
				</view>
			</view>

			<!-- 功能总结 -->
			<view class="demo-section last">
				<view class="demo-section-title">功能特性</view>
				<view class="demo-section-content">
					<view class="feature-list">
						<view class="feature-item" v-for="feature in features" :key="feature.title">
							<view class="feature-icon">{{ feature.icon }}</view>
							<view class="feature-content">
								<text class="feature-title">{{ feature.title }}</text>
								<text class="feature-desc">{{ feature.desc }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 响应式数据
const isLoading = ref(false);
const isFixed = ref(false);
const cartCount = ref(5);
const interactionLoading = ref(false);

// 动态数据
const dynamicTitle = ref('动态标题');
const dynamicSubtitle = ref('可以动态更新');
const dynamicBgColor = ref('#ffffff');

// 功能特性列表
const features = ref([
	{
		icon: '🎨',
		title: '主题支持',
		desc: '支持亮色/暗色/自动主题模式'
	},
	{
		icon: '✨',
		title: '沉浸式',
		desc: '支持透明背景和毛玻璃效果'
	},
	{
		icon: '📱',
		title: '响应式',
		desc: '适配不同屏幕尺寸和设备'
	},
	{
		icon: '🔧',
		title: '高度定制',
		desc: '丰富的配置选项和插槽支持'
	},
	{
		icon: '♿',
		title: '无障碍',
		desc: '完整的无障碍访问支持'
	},
	{
		icon: '⚡',
		title: '高性能',
		desc: '使用 Composition API 优化性能'
	}
]);

// 方法
const showToast = (message) => {
	uni.showToast({
		title: message,
		icon: 'none',
		duration: 1500
	});
};

const goBack = () => {
	uni.navigateBack({
		fail: () => {
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	});
};

const viewSource = () => {
	uni.showModal({
		title: '查看源码',
		content: '可以在 GitHub 上查看完整的组件源码',
		confirmText: '前往',
		success: (res) => {
			if (res.confirm) {
				// 这里可以添加跳转到源码页面的逻辑
				showToast('准备跳转到源码页面');
			}
		}
	});
};

const toggleLoading = () => {
	isLoading.value = !isLoading.value;
	setTimeout(() => {
		if (isLoading.value) {
			isLoading.value = false;
			showToast('加载完成');
		}
	}, 2000);
};

const toggleFixed = () => {
	isFixed.value = !isFixed.value;
	if (isFixed.value) {
		showToast('导航栏已固定在顶部');
	} else {
		showToast('导航栏固定已取消');
	}
};

const changeTitle = () => {
	const titles = ['动态标题', '已更新标题', '新标题内容', '实时更新'];
	const subtitles = ['可以动态更新', '标题已变更', '支持实时修改', '响应式更新'];
	const index = Math.floor(Math.random() * titles.length);
	dynamicTitle.value = titles[index];
	dynamicSubtitle.value = subtitles[index];
};

const changeColor = () => {
	const colors = ['#ffffff', '#007AFF', '#34C759', '#FF3B30', '#FF9500', '#5856D6'];
	const index = Math.floor(Math.random() * colors.length);
	dynamicBgColor.value = colors[index];
};

const performAction = () => {
	interactionLoading.value = true;
	setTimeout(() => {
		interactionLoading.value = false;
		showToast('操作执行完成');
	}, 1500);
};
</script>

<style lang="scss" scoped>
.navbar-demo {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-scroll {
	height: calc(100vh - 88px);
}

// Demo 区块样式
.demo-section {
	margin: 30rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
	
	&.last {
		margin-bottom: 60rpx;
	}
	
	// 透明背景演示区域
	&.bg-image {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		
		.demo-section-title {
			background-color: rgba(255, 255, 255, 0.9);
		}
		
		.demo-section-content {
			background: transparent;
		}
	}
}

.demo-section-title {
	padding: 30rpx;
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
	background-color: #fafafa;
	border-bottom: 1px solid #eeeeee;
}

.demo-section-content {
	padding: 30rpx;
}

// 主题演示
.theme-demo {
	.theme-item {
		margin-bottom: 30rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.theme-label {
		display: block;
		font-size: 26rpx;
		color: #666666;
		margin-bottom: 20rpx;
	}
}

// 颜色演示
.color-demo {
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

// 渐变导航栏
.gradient-navbar {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12rpx;
	overflow: hidden;
}

// 自定义插槽样式
.custom-left {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.custom-text {
	font-size: 28rpx;
	color: #007AFF;
}

.custom-center {
	display: flex;
	align-items: center;
	gap: 12rpx;
}

.logo {
	width: 60rpx;
	height: 60rpx;
	background: linear-gradient(45deg, #007AFF, #34C759);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #ffffff;
	font-size: 20rpx;
	font-weight: bold;
}

.brand-name {
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
}

.custom-right {
	display: flex;
	align-items: center;
	gap: 24rpx;
}

.icon-item {
	margin-right: 24rpx;
}

// 简单的徽章实现
.badge-container {
	position: relative;
	
	.badge {
		position: absolute;
		top: -8rpx;
		right: -8rpx;
		background-color: #ff4757;
		color: #ffffff;
		font-size: 20rpx;
		padding: 4rpx 8rpx;
		border-radius: 20rpx;
		min-width: 32rpx;
		text-align: center;
		line-height: 1;
	}
}

// 演示操作按钮
.demo-actions {
	padding: 30rpx;
	text-align: center;
	
	button {
		padding: 20rpx 40rpx;
		font-size: 28rpx;
		border-radius: 8rpx;
		border: 1px solid #007AFF;
		color: #007AFF;
		background-color: transparent;
		
		&:active {
			background-color: #007AFF;
			color: #ffffff;
		}
		
		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}
	}
}

// 固定演示
.fixed-demo {
	padding: 30rpx;
	text-align: center;
	
	.demo-tip {
		display: block;
		font-size: 26rpx;
		color: #666666;
		margin-bottom: 20rpx;
	}
	
	button {
		padding: 16rpx 32rpx;
		font-size: 26rpx;
		border-radius: 6rpx;
		border: 1px solid #FF3B30;
		color: #FF3B30;
		background-color: transparent;
		
		&:active {
			background-color: #FF3B30;
			color: #ffffff;
		}
	}
}

// 高度演示
.height-demo {
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
	
	.demo-label {
		display: block;
		font-size: 26rpx;
		color: #666666;
		margin-bottom: 20rpx;
	}
}

// 交互演示
.interaction-demo {
	.demo-controls {
		padding: 30rpx;
		display: flex;
		justify-content: space-around;
		gap: 20rpx;
		
		button {
			flex: 1;
			padding: 16rpx 20rpx;
			font-size: 24rpx;
			border-radius: 6rpx;
			border: 1px solid #007AFF;
			color: #007AFF;
			background-color: transparent;
			
			&:active {
				background-color: #007AFF;
				color: #ffffff;
			}
		}
	}
}

// 功能特性列表
.feature-list {
	padding: 30rpx;
}

.feature-item {
	display: flex;
	align-items: flex-start;
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.feature-icon {
	width: 60rpx;
	height: 60rpx;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	border-radius: 50%;
	margin-right: 24rpx;
	flex-shrink: 0;
}

.feature-content {
	flex: 1;
}

.feature-title {
	display: block;
	font-size: 30rpx;
	font-weight: 600;
	color: #333333;
	margin-bottom: 8rpx;
}

.feature-desc {
	display: block;
	font-size: 26rpx;
	color: #666666;
	line-height: 1.4;
}
</style>
