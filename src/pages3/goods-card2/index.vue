<template>
	<view class="page">
		<zx-navbar title="商品卡片2" back></zx-navbar>
		
		<scroll-view scroll-y class="scroll-view">
			<view class="container">
				<!-- 基础用法 -->
				<zx-section title="基础用法" padding>
					<view class="demo-grid">
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="商品标题"
							description="这是商品的详细描述信息"
							price="99.99"
							origin-price="199.99"
							shop-name="官方旗舰店"
							@click="handleCardClick"
							@shop-click="handleShopClick"
						/>
					</view>
				</zx-section>
				
				<!-- 水平布局 -->
				<zx-section title="水平布局" padding>
					<zx-goods-card2
						layout="horizontal"
						image="https://img.yzcdn.cn/vant/cat.jpeg"
						title="水平布局商品标题"
						description="这是水平布局的商品描述"
						price="158.00"
						origin-price="298.00"
						shop-name="品牌官方店"
						@click="handleCardClick"
					/>
				</zx-section>
				
				<!-- 不同尺寸 -->
				<zx-section title="不同尺寸" padding>
					<view class="demo-grid">
						<zx-goods-card2
							size="small"
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="小尺寸商品"
							price="59.99"
							@click="handleCardClick"
						/>
						<zx-goods-card2
							size="normal"
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="正常尺寸商品"
							price="99.99"
							@click="handleCardClick"
						/>
					</view>
					<view style="margin-top: 20rpx;">
						<zx-goods-card2
							size="large"
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="大尺寸商品标题"
							description="大尺寸商品的详细描述"
							price="199.99"
							origin-price="399.99"
							shop-name="旗舰店"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 商品标签 -->
				<zx-section title="商品标签" padding>
					<view class="demo-grid">
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="带标签的商品"
							price="88.88"
							:tags="['热销', '包邮', '新品']"
							image-tag="限时"
							title-tag="推荐"
							@click="handleCardClick"
						/>
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="自定义标签样式"
							price="128.00"
							:tags="customTags"
							image-tag="HOT"
							image-tag-position="top-right"
							image-tag-bg-color="#ff4757"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 自定义颜色 -->
				<zx-section title="自定义颜色" padding>
					<view class="demo-grid">
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="蓝色主题商品"
							description="自定义蓝色主题"
							price="168.00"
							price-color="#007aff"
							title-color="#007aff"
							tag-bg-color="#007aff"
							:tags="['蓝色主题']"
							@click="handleCardClick"
						/>
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="绿色主题商品"
							description="自定义绿色主题"
							price="188.00"
							price-color="#4cd964"
							title-color="#4cd964"
							tag-bg-color="#4cd964"
							:tags="['绿色主题']"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 标题行数控制 -->
				<zx-section title="标题行数控制" padding>
					<view class="demo-grid">
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="单行标题显示，超出部分会被省略号代替"
							:title-lines="1"
							price="99.99"
							@click="handleCardClick"
						/>
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="多行标题显示，可以显示更多的商品标题信息内容"
							:title-lines="3"
							price="99.99"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 禁用状态 -->
				<zx-section title="禁用状态" padding>
					<view class="demo-grid">
						<zx-goods-card2
							disabled
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="禁用状态商品"
							description="此商品已禁用"
							price="99.99"
							origin-price="199.99"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 自定义插槽 -->
				<zx-section title="自定义插槽" padding>
					<zx-goods-card2
						image="https://img.yzcdn.cn/vant/cat.jpeg"
						title="自定义插槽商品"
						price="299.99"
						@click="handleCardClick"
					>
						<template #priceAfter>
							<view class="custom-badge">限时特价</view>
						</template>
						<template #bottom>
							<view class="custom-actions">
								<button class="action-btn" size="mini" type="primary" @tap.stop="handleAddCart">加购物车</button>
								<button class="action-btn" size="mini" type="warn" @tap.stop="handleBuyNow">立即购买</button>
							</view>
						</template>
					</zx-goods-card2>
				</zx-section>
				
				<!-- 无图片状态 -->
				<zx-section title="无图片状态" padding>
					<view class="demo-grid">
						<zx-goods-card2
							title="无图片商品"
							description="这是没有图片的商品"
							price="66.66"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
				
				<!-- 不显示价格 -->
				<zx-section title="不显示价格" padding>
					<view class="demo-grid">
						<zx-goods-card2
							image="https://img.yzcdn.cn/vant/cat.jpeg"
							title="不显示价格的商品"
							description="价格面议或其他情况"
							:show-price="false"
							shop-name="专业定制店"
							@click="handleCardClick"
						/>
					</view>
				</zx-section>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 自定义标签数据
const customTags = ref([
	{ text: 'VIP', color: '#fff', bgColor: '#ff6900' },
	{ text: '包邮', color: '#fff', bgColor: '#4cd964' },
	{ text: '限量', color: '#fff', bgColor: '#ff4757' }
])

// 事件处理
const handleCardClick = () => {
	uni.showToast({
		title: '点击了商品卡片',
		icon: 'none'
	})
}

const handleShopClick = () => {
	uni.showToast({
		title: '点击了店铺',
		icon: 'none'
	})
}

const handleAddCart = () => {
	uni.showToast({
		title: '加入购物车',
		icon: 'success'
	})
}

const handleBuyNow = () => {
	uni.showToast({
		title: '立即购买',
		icon: 'success'
	})
}
</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #f5f5f5;
}

.scroll-view {
	flex: 1;
}

.container {
	padding-bottom: 40rpx;
}

.demo-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.custom-badge {
	padding: 4rpx 8rpx;
	background: linear-gradient(135deg, #ff6b35, #ff8f65);
	color: #fff;
	border-radius: 4rpx;
	font-size: 20rpx;
	font-weight: 500;
}

.custom-actions {
	display: flex;
	gap: 12rpx;
	margin-top: 16rpx;
}

.action-btn {
	flex: 1;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
	border-radius: 8rpx;
}
</style>