<template>
	<view class="page">
		<view class="page-title">页头</view>
		<view class="page-desc">如果页面的路径比较简单，推荐使用页头组件而非面包屑组件</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<zx-page-header @back="goBack">
					<template #content>
						<text>标题</text>
					</template>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 自定义图标 -->
		<view class="section">
			<view class="section-title">自定义图标</view>
			<view class="section-content">
				<zx-page-header icon="left" @back="goBack">
					<template #content>
						<text>标题</text>
					</template>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 无图标 -->
		<view class="section">
			<view class="section-title">无图标</view>
			<view class="section-content">
				<zx-page-header icon="" @back="goBack">
					<template #content>
						<text>标题</text>
					</template>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 面包屑导航 -->
		<view class="section">
			<view class="section-title">面包屑导航</view>
			<view class="section-content">
				<zx-page-header @back="goBack">
					<template #breadcrumb>
						<zx-breadcrumb separator="/">
							<zx-breadcrumb-item to="/pages/index/index">首页</zx-breadcrumb-item>
							<zx-breadcrumb-item to="/pages/components/index">组件</zx-breadcrumb-item>
							<zx-breadcrumb-item>页头</zx-breadcrumb-item>
						</zx-breadcrumb>
					</template>
					<template #content>
						<text>标题</text>
					</template>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 额外操作部分 -->
		<view class="section">
			<view class="section-title">额外操作部分</view>
			<view class="section-content">
				<zx-page-header @back="goBack">
					<template #content>
						<view class="content-with-avatar">
							<image class="avatar" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
							<view class="title-container">
								<text class="title">标题</text>
								<text class="subtitle">副标题</text>
								<zx-tag type="primary" size="small">标签</zx-tag>
							</view>
						</view>
					</template>
					<template #extra>
						<view class="extra-buttons">
							<button size="mini" @click="handlePrint">打印</button>
							<button size="mini" type="primary" @click="handleEdit">编辑</button>
						</view>
					</template>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 主要内容 -->
		<view class="section">
			<view class="section-title">主要内容</view>
			<view class="section-content">
				<zx-page-header @back="goBack">
					<template #content>
						<text>标题</text>
					</template>
					<view class="page-content">
						<text class="content-text">您可以在此处添加任何内容，这部分将作为页头的主体内容显示。</text>
						<text class="content-text">您可以添加任意多的内容，例如描述列表、表格或其他元素。</text>
					</view>
				</zx-page-header>
			</view>
		</view>
		
		<!-- 完整示例 -->
		<view class="section">
			<view class="section-title">完整示例</view>
			<view class="section-content">
				<zx-page-header @back="goBack">
					<template #breadcrumb>
						<zx-breadcrumb separator="/">
							<zx-breadcrumb-item to="/pages/index/index">首页</zx-breadcrumb-item>
							<zx-breadcrumb-item to="/pages/components/index">组件</zx-breadcrumb-item>
							<zx-breadcrumb-item>页头</zx-breadcrumb-item>
						</zx-breadcrumb>
					</template>
					<template #content>
						<view class="content-with-avatar">
							<image class="avatar" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
							<view class="title-container">
								<text class="title">标题</text>
								<text class="subtitle">副标题</text>
								<zx-tag type="primary" size="small">标签</zx-tag>
							</view>
						</view>
					</template>
					<template #extra>
						<view class="extra-buttons">
							<button size="mini" @click="handlePrint">打印</button>
							<button size="mini" type="primary" @click="handleEdit">编辑</button>
						</view>
					</template>
					
					<view class="descriptions">
						<view class="desc-item">
							<text class="desc-label">用户名</text>
							<text class="desc-value">zhangsan</text>
						</view>
						<view class="desc-item">
							<text class="desc-label">手机号</text>
							<text class="desc-value">1310000****</text>
						</view>
						<view class="desc-item">
							<text class="desc-label">地区</text>
							<text class="desc-value">北京</text>
						</view>
						<view class="desc-item">
							<text class="desc-label">备注</text>
							<view class="desc-value">
								<zx-tag size="small">学校</zx-tag>
							</view>
						</view>
						<view class="desc-item">
							<text class="desc-label">地址</text>
							<text class="desc-value">北京市朝阳区xxx街道xxx号</text>
						</view>
					</view>
					
					<view class="page-content">
						<text class="content-text">
							UniApp团队使用<text class="bold">每周</text>发布策略，但重要bug修复可能需要热修复，因此实际发布次数<text class="bold">可能会</text>每周超过1次。
						</text>
					</view>
				</zx-page-header>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * 页头组件示例
 */

// 返回操作
const goBack = () => {
	uni.showToast({
		title: '点击了返回',
		icon: 'none'
	});
};

// 打印按钮点击事件
const handlePrint = () => {
	uni.showToast({
		title: '点击了打印',
		icon: 'none'
	});
};

// 编辑按钮点击事件
const handleEdit = () => {
	uni.showToast({
		title: '点击了编辑',
		icon: 'none'
	});
};
</script>

<style lang="scss" scoped>
.page {
	padding: 30rpx;
	
	&-title {
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	&-desc {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 40rpx;
	}
}

.section {
	margin-bottom: 60rpx;
	
	&-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	&-content {
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
	}
}

.content-with-avatar {
	display: flex;
	align-items: center;
	
	.avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	
	.title-container {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		
		.title {
			font-size: 32rpx;
			font-weight: bold;
			margin-right: 16rpx;
		}
		
		.subtitle {
			font-size: 24rpx;
			color: #909399;
			margin-right: 16rpx;
		}
	}
}

.extra-buttons {
	display: flex;
	align-items: center;
	
	button {
		margin-left: 10rpx;
	}
}

.page-content {
	margin-top: 20rpx;
	padding: 20rpx 0;
	
	.content-text {
		font-size: 28rpx;
		color: #606266;
		line-height: 1.5;
		
		.bold {
			font-weight: bold;
		}
	}
}

.descriptions {
	margin-top: 30rpx;
	display: flex;
	flex-wrap: wrap;
	
	.desc-item {
		width: 50%;
		margin-bottom: 20rpx;
		
		&:last-child {
			width: 100%;
		}
		
		.desc-label {
			font-size: 26rpx;
			color: #909399;
			margin-right: 10rpx;
		}
		
		.desc-value {
			font-size: 26rpx;
			color: #303133;
		}
	}
}
</style> 