<template>
	<view class="goods-price-demo">
		<!-- 页面标题 -->
		<view class="demo-header">
			<text class="demo-header__title">商品价格组件</text>
			<text class="demo-header__desc">用于展示商品价格，支持多种样式和格式化选项</text>
		</view>

		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="demo-section__title">基础用法</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">默认样式</text>
					<zx-goods-price price="99.99" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">整数价格</text>
					<zx-goods-price price="99" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">字符串价格</text>
					<zx-goods-price price="199.50" />
				</view>
			</view>
		</view>

		<!-- 不同尺寸 -->
		<view class="demo-section">
			<view class="demo-section__title">不同尺寸</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">小号 (small)</text>
					<zx-goods-price price="99.99" size="small" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">正常 (normal)</text>
					<zx-goods-price price="99.99" size="normal" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">大号 (large)</text>
					<zx-goods-price price="99.99" size="large" />
				</view>
			</view>
		</view>

		<!-- 自定义颜色 -->
		<view class="demo-section">
			<view class="demo-section__title">自定义颜色</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">红色 (默认)</text>
					<zx-goods-price price="99.99" color="#ee0a24" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">橙色</text>
					<zx-goods-price price="99.99" color="#ff6900" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">绿色</text>
					<zx-goods-price price="99.99" color="#07c160" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">蓝色</text>
					<zx-goods-price price="99.99" color="#1989fa" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">灰色</text>
					<zx-goods-price price="99.99" color="#999999" />
				</view>
			</view>
		</view>

		<!-- 货币符号 -->
		<view class="demo-section">
			<view class="demo-section__title">货币符号</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">人民币 (¥)</text>
					<zx-goods-price price="99.99" currency="¥" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">美元 ($)</text>
					<zx-goods-price price="99.99" currency="$" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">欧元 (€)</text>
					<zx-goods-price price="99.99" currency="€" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">英镑 (£)</text>
					<zx-goods-price price="99.99" currency="£" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">无符号</text>
					<zx-goods-price price="99.99" currency="" />
				</view>
			</view>
		</view>

		<!-- 前缀和后缀 -->
		<view class="demo-section">
			<view class="demo-section__title">前缀和后缀</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">前缀文字</text>
					<zx-goods-price price="99.99" prefix="现价" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">后缀文字</text>
					<zx-goods-price price="99.99" suffix="起" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">前缀+后缀</text>
					<zx-goods-price price="99.99" prefix="仅需" suffix="包邮" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">价格区间</text>
					<zx-goods-price price="99.99" suffix="~199.99" />
				</view>
			</view>
		</view>

		<!-- 小数位控制 -->
		<view class="demo-section">
			<view class="demo-section__title">小数位控制</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">无小数位</text>
					<zx-goods-price price="99" :decimal-length="0" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">1位小数</text>
					<zx-goods-price price="99.9" :decimal-length="1" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">2位小数</text>
					<zx-goods-price price="99.99" :decimal-length="2" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">3位小数</text>
					<zx-goods-price price="99.999" :decimal-length="3" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">隐藏小数</text>
					<zx-goods-price price="99.99" :show-decimal="false" />
				</view>
			</view>
		</view>

		<!-- 删除线样式 -->
		<view class="demo-section">
			<view class="demo-section__title">删除线样式</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">原价展示</text>
					<view class="price-group">
						<zx-goods-price price="199.99" line-through color="#999" size="small" />
						<zx-goods-price price="99.99" color="#ee0a24" />
					</view>
				</view>
				<view class="demo-item">
					<text class="demo-item__label">促销价格</text>
					<view class="price-group">
						<zx-goods-price price="299.99" line-through color="#999" size="small" />
						<zx-goods-price price="199.99" color="#ff6900" prefix="特价" />
					</view>
				</view>
			</view>
		</view>

		<!-- 自定义字体大小 -->
		<view class="demo-section">
			<view class="demo-section__title">自定义字体大小</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">小符号大数字</text>
					<zx-goods-price price="99.99" :symbol-size="20" :integer-size="48" :decimal-size="24" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">统一大小</text>
					<zx-goods-price price="99.99" :symbol-size="32" :integer-size="32" :decimal-size="32" />
				</view>
				<view class="demo-item">
					<text class="demo-item__label">加粗字体</text>
					<zx-goods-price price="99.99" font-weight="bold" />
				</view>
			</view>
		</view>

		<!-- 插槽用法 -->
		<view class="demo-section">
			<view class="demo-section__title">插槽用法</view>
			<view class="demo-section__content">
				<view class="demo-item">
					<text class="demo-item__label">自定义前缀</text>
					<zx-goods-price price="99.99">
						<template #prefix>
							<text class="custom-prefix">限时特价</text>
						</template>
					</zx-goods-price>
				</view>
				<view class="demo-item">
					<text class="demo-item__label">自定义后缀</text>
					<zx-goods-price price="99.99">
						<template #suffix>
							<text class="custom-suffix">包邮</text>
						</template>
					</zx-goods-price>
				</view>
				<view class="demo-item">
					<text class="demo-item__label">前缀+后缀</text>
					<zx-goods-price price="99.99">
						<template #prefix>
							<text class="custom-prefix">秒杀价</text>
						</template>
						<template #suffix>
							<text class="custom-suffix">限量</text>
						</template>
					</zx-goods-price>
				</view>
			</view>
		</view>

		<!-- 实际应用场景 -->
		<view class="demo-section">
			<view class="demo-section__title">实际应用场景</view>
			<view class="demo-section__content">
				<!-- 商品卡片 -->
				<view class="goods-card">
					<view class="goods-card__image">
						<text class="goods-card__placeholder">商品图片</text>
					</view>
					<view class="goods-card__info">
						<text class="goods-card__title">Apple iPhone 15 Pro Max 256GB 深空黑色</text>
						<view class="goods-card__price">
							<zx-goods-price price="9999" color="#ee0a24" size="large" />
							<zx-goods-price price="10999" line-through color="#999" size="small" />
						</view>
						<view class="goods-card__tags">
							<text class="goods-card__tag">限时特价</text>
							<text class="goods-card__tag">包邮</text>
						</view>
					</view>
				</view>

				<!-- 购物车条 -->
				<view class="cart-bar">
					<view class="cart-bar__left">
						<text class="cart-bar__label">合计：</text>
						<zx-goods-price price="299.97" color="#ee0a24" size="large" />
					</view>
					<view class="cart-bar__right">
						<view class="cart-bar__button">去结算(3)</view>
					</view>
				</view>

				<!-- 价格区间 -->
				<view class="price-range">
					<text class="price-range__label">价格区间：</text>
					<zx-goods-price price="99.99" suffix="~299.99" color="#333" />
				</view>
			</view>
		</view>

		<!-- 底部间距 -->
		<view class="demo-footer"></view>
	</view>
</template>

<script setup>
import zxGoodsPrice from '@/components/zx-goods-price/zx-goods-price.vue'

// 页面配置
uni.setNavigationBarTitle({
	title: '商品价格组件'
})
</script>

<style lang="scss" scoped>
.goods-price-demo {
	padding: 0;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-header {
	padding: 40rpx 30rpx 30rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	
	&__title {
		display: block;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	&__desc {
		display: block;
		font-size: 26rpx;
		opacity: 0.8;
	}
}

.demo-section {
	margin-bottom: 20rpx;
	background-color: white;
	
	&__title {
		padding: 30rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		border-bottom: 1px solid #f0f0f0;
	}
	
	&__content {
		padding: 0 30rpx 20rpx;
	}
}

.demo-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 1px solid #f8f8f8;
	
	&:last-child {
		border-bottom: none;
	}
	
	&__label {
		font-size: 28rpx;
		color: #666;
		flex: 1;
	}
}

.price-group {
	display: flex;
	align-items: baseline;
	gap: 20rpx;
}

.custom-prefix {
	color: #ff6900;
	font-size: 24rpx;
	background-color: #fff3e0;
	padding: 4rpx 8rpx;
	border-radius: 6rpx;
}

.custom-suffix {
	color: #07c160;
	font-size: 20rpx;
	background-color: #f0f9ff;
	padding: 4rpx 8rpx;
	border-radius: 6rpx;
	border: 1px solid #07c160;
}

// 实际应用场景样式
.goods-card {
	display: flex;
	padding: 20rpx;
	background-color: white;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	
	&__image {
		width: 160rpx;
		height: 160rpx;
		background-color: #f5f5f5;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}
	
	&__placeholder {
		font-size: 24rpx;
		color: #999;
	}
	
	&__info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	&__title {
		font-size: 28rpx;
		color: #333;
		line-height: 1.4;
		margin-bottom: 10rpx;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	&__price {
		display: flex;
		align-items: baseline;
		gap: 20rpx;
		margin-bottom: 10rpx;
	}
	
	&__tags {
		display: flex;
		gap: 10rpx;
	}
	
	&__tag {
		font-size: 20rpx;
		color: #ff6900;
		background-color: #fff3e0;
		padding: 4rpx 8rpx;
		border-radius: 4rpx;
	}
}

.cart-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx;
	background-color: white;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	
	&__left {
		display: flex;
		align-items: baseline;
		gap: 10rpx;
	}
	
	&__label {
		font-size: 28rpx;
		color: #333;
	}
	
	&__button {
		background-color: #ee0a24;
		color: white;
		padding: 16rpx 32rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
	}
}

.price-range {
	display: flex;
	align-items: baseline;
	gap: 10rpx;
	padding: 20rpx;
	background-color: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	
	&__label {
		font-size: 28rpx;
		color: #666;
	}
}

.demo-footer {
	height: 40rpx;
}
</style>