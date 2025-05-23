<template>
	<view class="container">
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="demo-box">
				<zx-title title="基础标题" type="h2"></zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">标题级别</view>
			<view class="demo-box">
				<zx-title title="H1 标题" type="h1"></zx-title>
				<zx-title title="H2 标题" type="h2"></zx-title>
				<zx-title title="H3 标题" type="h3"></zx-title>
				<zx-title title="H4 标题" type="h4"></zx-title>
				<zx-title title="H5 标题" type="h5"></zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">带图标</view>
			<view class="demo-box">
				<zx-title 
					title="默认图标" 
					iconShow>
				</zx-title>
				<zx-title 
					title="自定义图标" 
					iconShow 
					icon="star" 
					iconColor="#ff9900">
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">带副标题</view>
			<view class="demo-box">
				<zx-title 
					title="产品详情" 
					subtitle="了解更多产品信息和使用方法" 
					type="h3" 
					color="#2979ff">
				</zx-title>
				<zx-title 
					title="使用指南" 
					subtitle="仔细阅读使用说明，正确操作设备" 
					type="h2"
					subtitleColor="#999">
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">对齐方式</view>
			<view class="demo-box">
				<zx-title 
					title="左对齐" 
					align="left">
				</zx-title>
				<zx-title 
					title="居中对齐" 
					align="center">
				</zx-title>
				<zx-title 
					title="右对齐" 
					align="right">
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">带右侧文本</view>
			<view class="demo-box">
				<zx-title 
					title="消息列表" 
					rightText="查看全部" 
					@right="onRightClick('消息列表')">
				</zx-title>
				<zx-title 
					title="热门推荐" 
					rightText="更多" 
					rightTextColor="#ff5500"
					@right="onRightClick('热门推荐')">
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义右侧内容</view>
			<view class="demo-box">
				<zx-title title="商品分类">
					<template #right>
						<view class="custom-right">
							<button size="mini" type="primary" @click="onButtonClick">筛选</button>
						</view>
					</template>
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义样式</view>
			<view class="demo-box">
				<zx-title 
					title="热门推荐" 
					background="#f5f5f5" 
					padding="20rpx 30rpx" 
					borderRadius="10rpx" 
					iconShow 
					icon="fire" 
					iconColor="#ff5500">
				</zx-title>
				<zx-title 
					title="标签云" 
					subtitle="热门标签集合" 
					background="#E8F4FF" 
					padding="15rpx 20rpx" 
					margin="20rpx 0" 
					borderRadius="8rpx"
					color="#2979FF">
				</zx-title>
				<zx-title 
					title="卡片标题" 
					iconShow
					icon="info"
					rightText="详情"
					background="#FFFFFF" 
					padding="25rpx" 
					margin="20rpx 0" 
					borderRadius="12rpx"
					style="box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);">
				</zx-title>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">组合使用</view>
			<view class="demo-box">
				<view class="combined-box">
					<zx-title 
						title="商品列表" 
						subtitle="共12件商品"
						iconShow
						icon="cart"
						rightText="查看全部"
						background="#FFFFFF" 
						padding="20rpx" 
						borderRadius="10rpx"
						style="box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);">
					</zx-title>
					<view class="mock-content">
						<view class="mock-item" v-for="i in 2" :key="i"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * 标题组件示例
 */
import { ref } from 'vue';

const onRightClick = (title) => {
	uni.showToast({
		title: `点击了${title}的更多`,
		icon: 'none'
	});
};

const onButtonClick = () => {
	uni.showToast({
		title: '点击了筛选按钮',
		icon: 'none'
	});
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
	background-color: #f8f8f8;
}

.section {
	margin-bottom: 50rpx;
	
	&-title {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
	}
}

.demo-box {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
	
	.zx-title {
		margin-bottom: 30rpx;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
}

.custom-right {
	button {
		font-size: 24rpx;
		padding: 2rpx 20rpx;
		line-height: 1.8;
	}
}

.combined-box {
	.mock-content {
		padding: 20rpx;
		
		.mock-item {
			height: 100rpx;
			background-color: #f5f5f5;
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
