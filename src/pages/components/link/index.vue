<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-link 链接</text>
			<text class="desc">该组件为超链接组件，在不同平台有不同表现形式</text>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">
				<text>基础用法</text>
			</view>
			<view class="section-content">
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/">默认链接</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="primary">主要链接</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="success">成功链接</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="warning">警告链接</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="danger">危险链接</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="info">信息链接</zx-link>
				</view>
			</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">
				<text>禁用状态</text>
			</view>
			<view class="section-content">
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" disabled>默认禁用</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="primary" disabled>主要禁用</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="success" disabled>成功禁用</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="warning" disabled>警告禁用</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="danger" disabled>危险禁用</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="info" disabled>信息禁用</zx-link>
				</view>
			</view>
		</view>
		
		<!-- 下划线控制 -->
		<view class="section">
			<view class="section-title">
				<text>下划线控制</text>
			</view>
			<view class="section-content">
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" underline="always" type="primary">总是显示下划线</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" underline="hover" type="primary">悬停显示下划线（默认）</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" underline="never" type="primary">从不显示下划线</zx-link>
				</view>
			</view>
		</view>
		
		<!-- 图标链接 -->
		<view class="section">
			<view class="section-title">
				<text>图标链接</text>
			</view>
			<view class="section-content">
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="primary">
						<template #icon>
							<text class="icon">📝</text>
						</template>
						编辑文档
					</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="success">
						<template #icon>
							<text class="icon">✅</text>
						</template>
						查看详情
					</zx-link>
				</view>
				<view class="item">
					<zx-link url="https://uniapp.dcloud.io/" type="danger">
						<template #icon>
							<text class="icon">🗑️</text>
						</template>
						删除
					</zx-link>
				</view>
			</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">
				<text>自定义样式</text>
			</view>
			<view class="section-content">
				<view class="item">
					<zx-link 
						url="https://uniapp.dcloud.io/" 
						:customStyle="{ 
							padding: '10rpx 20rpx', 
							borderRadius: '4rpx', 
							backgroundColor: '#f0f9eb' 
						}"
					>
						自定义背景
					</zx-link>
				</view>
				<view class="item">
					<zx-link 
						url="https://uniapp.dcloud.io/" 
						color="#8e44ad"
						:fontSize="32"
						:customStyle="{ fontWeight: 'bold' }"
					>
						自定义颜色和大小
					</zx-link>
				</view>
				<view class="item">
					<zx-link 
						url="https://uniapp.dcloud.io/" 
						:customStyle="{ 
							border: '1px solid #dcdfe6', 
							padding: '6rpx 15rpx',
							borderRadius: '4rpx'
						}"
					>
						带边框链接
					</zx-link>
				</view>
			</view>
		</view>
		
		<!-- 平台差异说明 -->
		<view class="section">
			<view class="section-title">
				<text>平台差异说明</text>
			</view>
			<view class="section-content desc-text">
				<text>• 在 APP 中：通过内置浏览器打开链接</text>
				<text>• 在小程序中：复制链接到剪贴板</text>
				<text>• 在 H5 中：使用a标签打开链接</text>
			</view>
		</view>
	</view>
</template>

<script setup>
// 导入组件
import ZxLink from '@/components/zx-link/zx-link.vue';

// 页面配置
defineOptions({
	name: 'LinkDemo'
});
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.header {
	padding-bottom: 30rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.desc {
		font-size: 28rpx;
		color: #666;
	}
}

.section {
	margin-bottom: 40rpx;
	
	&-title {
		border-left: 4rpx solid #2979ff;
		padding-left: 16rpx;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		line-height: 1.4;
	}
	
	&-content {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 30rpx;
	}
}

.item {
	margin-bottom: 20rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.icon {
	margin-right: 8rpx;
	font-size: 28rpx;
}

.desc-text {
	display: flex;
	flex-direction: column;
	
	text {
		line-height: 1.8;
		font-size: 28rpx;
		color: #666;
	}
}
</style>
