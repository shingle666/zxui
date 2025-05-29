<template>
	<view class="page">
		<view class="page-title">卡片组件示例</view>
		
		<!-- 基础卡片 -->
		<view class="section">
			<view class="section-title">基础卡片</view>
			<zx-card 
				title="基础卡片" 
				sub-title="这是一张基础卡片" 
				:thumbnail="avatarUrl"
				extra="额外信息"
				@click="onClick"
			>
				这里是卡片的内容区域，可以放置任意内容
			</zx-card>
		</view>
		
		<!-- 带封面图的卡片 -->
		<view class="section">
			<view class="section-title">带封面图的卡片</view>
			<zx-card 
				title="带封面的卡片" 
				sub-title="这是一个带封面的卡片" 
				:cover="coverUrl"
				cover-radius="8"
			>
				这里是卡片的内容区域，展示一些简短的描述信息
			</zx-card>
		</view>
		
		<!-- 可点击的卡片 -->
		<view class="section">
			<view class="section-title">可点击的卡片</view>
			<zx-card 
				title="可点击的卡片" 
				:clickable="true"
				@click="handleCardClick"
			>
				点击此卡片会有轻微的缩放效果，同时触发点击事件
			</zx-card>
		</view>
		
		<!-- 不同主题的卡片 -->
		<view class="section">
			<view class="section-title">不同主题的卡片</view>
			<zx-card title="默认卡片" mode="default" margin="10rpx 0">默认主题</zx-card>
			<zx-card title="主要卡片" mode="primary" margin="10rpx 0">主要主题</zx-card>
			<zx-card title="成功卡片" mode="success" margin="10rpx 0">成功主题</zx-card>
			<zx-card title="警告卡片" mode="warning" margin="10rpx 0">警告主题</zx-card>
			<zx-card title="错误卡片" mode="error" margin="10rpx 0">错误主题</zx-card>
			<zx-card title="信息卡片" mode="info" margin="10rpx 0">信息主题</zx-card>
		</view>
		
		<!-- 自定义底部操作区 -->
		<view class="section">
			<view class="section-title">自定义底部操作区</view>
			<zx-card title="带操作按钮的卡片">
				卡片内容区域，展示主要信息
				
				<template #actions>
					<view class="action-btn" @click="handleShare">分享</view>
					<view class="action-btn" @click="handleLike">点赞</view>
					<view class="action-btn" @click="handleComment">评论</view>
				</template>
			</zx-card>
		</view>
		
		<!-- 自定义底部区域 -->
		<view class="section">
			<view class="section-title">自定义底部区域</view>
			<zx-card title="带底部的卡片">
				卡片内容区域，可以放置主要信息
				
				<template #footer>
					<view class="footer-content">
						<text>底部区域内容</text>
						<text class="footer-time">2023-10-15 18:30</text>
					</view>
				</template>
			</zx-card>
		</view>
		
		<!-- 通栏卡片 -->
		<view class="section">
			<view class="section-title">通栏卡片</view>
			<zx-card 
				title="通栏卡片" 
				:is-full="true"
			>
				这是一个通栏卡片，没有左右边距，适合作为列表项使用
			</zx-card>
		</view>
		
		<!-- 自定义样式卡片 -->
		<view class="section">
			<view class="section-title">自定义样式卡片</view>
			<zx-card 
				title="自定义样式" 
				sub-title="自定义字体大小和颜色"
				title-color="#8B2252"
				sub-title-color="#666"
				content-color="#333"
				:title-size="36"
				:sub-title-size="26"
				:content-size="30"
				:title-bold="true"
				bg-color="#f8f8f8"
				:radius="20"
			>
				这是一个使用自定义样式的卡片，可以自定义标题、副标题、内容的颜色和大小，以及卡片的背景色和圆角等
			</zx-card>
		</view>
		
		<!-- 头像样式 -->
		<view class="section">
			<view class="section-title">头像样式</view>
			<zx-card 
				title="圆形头像" 
				sub-title="自定义头像大小和形状"
				:thumbnail="avatarUrl"
				:avatar-size="100"
				:avatar-circle="true"
			>
				这是一个使用圆形头像的卡片，可以自定义头像的大小和形状
			</zx-card>
		</view>
		
		<!-- 商品卡片示例 -->
		<view class="section">
			<view class="section-title">商品卡片示例</view>
			<zx-card 
				title="iPhone 15 Pro" 
				sub-title="超瓷晶面板，钛金属边框"
				:cover="productUrl"
				extra="￥7999起"
				mode="primary"
				:clickable="true"
				:title-bold="true"
				title-color="#333"
				@click="goToDetail"
			>
				A17 Pro 芯片，创新相机控制，4800万像素主摄，全新操作体验
				
				<template #actions>
					<view class="product-btn cart-btn" @click.stop="addToCart">加入购物车</view>
					<view class="product-btn buy-btn" @click.stop="buyNow">立即购买</view>
				</template>
			</zx-card>
		</view>
		
		<!-- 文章卡片示例 -->
		<view class="section">
			<view class="section-title">文章卡片示例</view>
			<zx-card 
				title="Vue 3.0新特性解析" 
				sub-title="发布于2023-10-12"
				:thumbnail="avatarUrl"
				:cover="articleUrl"
				content-size="30"
				:title-bold="true"
			>
				Vue 3.0带来了Composition API、Teleport、Fragments等新特性，本文将详细解析这些特性的使用方法和实际应用场景...
				
				<template #footer>
					<view class="article-footer">
						<view class="article-stat">阅读量: 2380</view>
						<view class="article-stat">点赞: 168</view>
						<view class="article-stat">评论: 32</view>
					</view>
				</template>
			</zx-card>
		</view>
	</view>
</template>

<script setup>
// 示例数据，实际使用时应该从服务器获取或使用本地资源
const avatarUrl = 'https://cdn.uviewui.com/uview/album/1.jpg'
const coverUrl = 'https://cdn.uviewui.com/uview/album/2.jpg'
const productUrl = 'https://cdn.uviewui.com/uview/album/3.jpg'
const articleUrl = 'https://cdn.uviewui.com/uview/album/4.jpg'

// 事件处理
const onClick = (type) => {
	uni.showToast({
		title: '点击了' + type,
		icon: 'none'
	})
}

const handleCardClick = (type) => {
	uni.showToast({
		title: '点击了可点击卡片：' + type,
		icon: 'none'
	})
}

const handleShare = () => {
	uni.showToast({
		title: '点击了分享按钮',
		icon: 'none'
	})
}

const handleLike = () => {
	uni.showToast({
		title: '点击了点赞按钮',
		icon: 'none'
	})
}

const handleComment = () => {
	uni.showToast({
		title: '点击了评论按钮',
		icon: 'none'
	})
}

const goToDetail = () => {
	uni.showToast({
		title: '跳转到商品详情',
		icon: 'none'
	})
}

const addToCart = () => {
	uni.showToast({
		title: '已加入购物车',
		icon: 'success'
	})
}

const buyNow = () => {
	uni.showToast({
		title: '立即购买',
		icon: 'none'
	})
}
</script>

<style lang="scss">
.page {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	
	.page-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin: 20rpx 0 40rpx;
		color: #333;
	}
	
	.section {
		margin-bottom: 40rpx;
		
		.section-title {
			font-size: 30rpx;
			color: #666;
			margin-bottom: 20rpx;
			position: relative;
			padding-left: 20rpx;
			
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6rpx;
				height: 30rpx;
				background-color: #2979ff;
				border-radius: 3rpx;
			}
		}
	}
	
	.action-btn {
		font-size: 28rpx;
		color: #2979ff;
		margin-left: 30rpx;
		
		&:first-child {
			margin-left: 0;
		}
	}
	
	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.footer-time {
			color: #999;
			font-size: 24rpx;
		}
	}
	
	.product-btn {
		padding: 10rpx 30rpx;
		border-radius: 50rpx;
		font-size: 26rpx;
		margin-left: 20rpx;
	}
	
	.cart-btn {
		background-color: #fff;
		color: #2979ff;
		border: 1px solid #2979ff;
	}
	
	.buy-btn {
		background-color: #2979ff;
		color: #fff;
	}
	
	.article-footer {
		display: flex;
		justify-content: flex-start;
		
		.article-stat {
			margin-right: 30rpx;
			font-size: 24rpx;
			color: #999;
		}
	}
}
</style>
