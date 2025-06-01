<template>
	<view class="page">
		<zx-navbar title="CartBar 购物车底部栏" back></zx-navbar>
		
		<view class="demo-content">
			<!-- 基础用法 -->
			<zx-section title="基础用法" padding>
				<view class="demo-block">
					<view class="cart-list">
						<view 
							v-for="(item, index) in cartList" 
							:key="index" 
							class="cart-item"
							@tap="toggleCheck(index)"
						>
							<zx-checkbox v-model="item.checked" :color="checkboxColor" @change="calculateTotal"></zx-checkbox>
							<image :src="item.image" class="item-image"></image>
							<view class="item-info">
								<text class="item-title">{{ item.title }}</text>
								<text class="item-spec">{{ item.spec }}</text>
								<view class="item-bottom">
									<text class="item-price">¥{{ (item.price / 100).toFixed(2) }}</text>
									<view class="item-stepper">
										<zx-button 
											size="mini" 
											type="default" 
											:disabled="item.quantity <= 1"
											@click.stop="decreaseQuantity(index)"
										>-</zx-button>
										<text class="quantity">{{ item.quantity }}</text>
										<zx-button 
											size="mini" 
											type="default"
											@click.stop="increaseQuantity(index)"
										>+</zx-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</zx-section>
			
			<!-- 显示原价和优惠 -->
			<zx-section title="显示原价和优惠" padding>
				<view class="demo-block">
					<zx-cell-group>
						<zx-cell title="显示原价" is-link @click="toggleOriginalPrice">
							<zx-switch v-model="showOriginalPrice" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="显示优惠信息" is-link @click="toggleDiscount">
							<zx-switch v-model="showDiscount" size="small"></zx-switch>
						</zx-cell>
					</zx-cell-group>
				</view>
			</zx-section>
			
			<!-- 自定义按钮 -->
			<zx-section title="自定义按钮" padding>
				<view class="demo-block">
					<zx-cell-group>
						<zx-cell title="按钮类型">
							<zx-radio-group v-model="buttonType" direction="horizontal">
								<zx-radio name="danger">危险</zx-radio>
								<zx-radio name="primary">主要</zx-radio>
								<zx-radio name="success">成功</zx-radio>
							</zx-radio-group>
						</zx-cell>
						<zx-cell title="圆角按钮" is-link @click="toggleButtonRound">
							<zx-switch v-model="buttonRound" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="加载状态" is-link @click="toggleLoading">
							<zx-switch v-model="loading" size="small"></zx-switch>
						</zx-cell>
					</zx-cell-group>
				</view>
			</zx-section>
			
			<!-- 功能控制 -->
			<zx-section title="功能控制" padding>
				<view class="demo-block">
					<zx-cell-group>
						<zx-cell title="显示全选" is-link @click="toggleShowCheckAll">
							<zx-switch v-model="showCheckAll" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="显示数量" is-link @click="toggleShowCount">
							<zx-switch v-model="showCount" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="显示价格" is-link @click="toggleShowPrice">
							<zx-switch v-model="showPrice" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="禁用状态" is-link @click="toggleDisabled">
							<zx-switch v-model="disabled" size="small"></zx-switch>
						</zx-cell>
					</zx-cell-group>
				</view>
			</zx-section>
			
			<!-- 提示信息 -->
			<zx-section title="提示信息" padding>
				<view class="demo-block">
					<zx-cell-group>
						<zx-cell title="显示提示" is-link @click="toggleTip">
							<zx-switch v-model="showTip" size="small"></zx-switch>
						</zx-cell>
					</zx-cell-group>
				</view>
			</zx-section>
			
			<!-- 自定义插槽示例 -->
			<zx-section title="自定义插槽" padding>
				<view class="demo-block">
					<zx-cell-group>
						<zx-cell title="自定义左侧" is-link @click="toggleCustomLeft">
							<zx-switch v-model="customLeft" size="small"></zx-switch>
						</zx-cell>
						<zx-cell title="自定义按钮" is-link @click="toggleCustomButton">
							<zx-switch v-model="customButton" size="small"></zx-switch>
						</zx-cell>
					</zx-cell-group>
				</view>
			</zx-section>
			
			<!-- 占位空间 -->
			<view class="placeholder"></view>
		</view>
		
		<!-- 购物车底部栏 -->
		<zx-cart-bar
			v-model:all-checked="allChecked"
			:total-price="totalPrice"
			:original-price="showOriginalPrice ? originalPrice : 0"
			:checked-count="checkedCount"
			:total-count="totalCount"
			:show-check-all="showCheckAll"
			:show-count="showCount"
			:show-price="showPrice"
			:show-original-price="showOriginalPrice"
			:discount-text="showDiscount ? discountText : ''"
			:tip="showTip ? tipText : ''"
			:tip-icon="showTip ? 'info-circle' : ''"
			:button-type="buttonType"
			:button-round="buttonRound"
			:disabled="disabled"
			:loading="loading"
			:checkbox-color="checkboxColor"
			@submit="handleSubmit"
			@check-all="handleCheckAll"
		>
			<!-- 自定义左侧内容 -->
			<template #left v-if="customLeft">
				<view class="custom-left">
					<zx-icon name="gift" color="#ff6900" size="20"></zx-icon>
					<text class="gift-text">有礼品</text>
				</view>
			</template>
			
			<!-- 自定义按钮 -->
			<template #button v-if="customButton">
				<view class="custom-buttons">
					<zx-button 
						type="warning" 
						size="small" 
						round
						class="custom-btn"
						@click="addToFavorites"
					>
						收藏
					</zx-button>
					<zx-button 
						type="danger" 
						round
						class="custom-btn"
						:disabled="checkedCount === 0"
						@click="buyNow"
					>
						立即购买({{ checkedCount }})
					</zx-button>
				</view>
			</template>
		</zx-cart-bar>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 购物车数据
const cartList = ref([
	{
		id: 1,
		title: 'iPhone 15 Pro Max',
		spec: '深空黑色 256GB',
		price: 999900, // 9999.00元
		quantity: 1,
		checked: true,
		image: 'https://img.yzcdn.cn/vant/ipad.jpeg'
	},
	{
		id: 2,
		title: 'MacBook Pro 14英寸',
		spec: '银色 M3芯片 512GB',
		price: 1599900, // 15999.00元
		quantity: 1,
		checked: true,
		image: 'https://img.yzcdn.cn/vant/cat.jpeg'
	},
	{
		id: 3,
		title: 'AirPods Pro 2',
		spec: '白色 USB-C充电盒',
		price: 189900, // 1899.00元
		quantity: 2,
		checked: false,
		image: 'https://img.yzcdn.cn/vant/tree.jpg'
	},
	{
		id: 4,
		title: 'Apple Watch Series 9',
		spec: '午夜色 45mm GPS',
		price: 329900, // 3299.00元
		quantity: 1,
		checked: false,
		image: 'https://img.yzcdn.cn/vant/leaf.jpg'
	},
	{
		id: 5,
		title: 'iPad Air 5',
		spec: '深空灰色 256GB WiFi',
		price: 489900, // 4899.00元
		quantity: 1,
		checked: false,
		image: 'https://img.yzcdn.cn/vant/sand.jpg'
	}
])

// 控制状态
const allChecked = ref(false)
const showOriginalPrice = ref(false)
const showDiscount = ref(false)
const buttonType = ref('danger')
const buttonRound = ref(true)
const loading = ref(false)
const showCheckAll = ref(true)
const showCount = ref(true)
const showPrice = ref(true)
const disabled = ref(false)
const showTip = ref(false)
const customLeft = ref(false)
const customButton = ref(false)

// 样式配置
const checkboxColor = ref('#ff6900')
const tipText = ref('满99元免运费，还差21元')
const discountText = ref('已优惠 ¥200.00')

// 计算属性
const checkedCount = computed(() => {
	return cartList.value.filter(item => item.checked).reduce((total, item) => total + item.quantity, 0)
})

const totalCount = computed(() => {
	return cartList.value.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
	return cartList.value
		.filter(item => item.checked)
		.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const originalPrice = computed(() => {
	return totalPrice.value + 20000 // 假设优惠了200元
})

// 方法
const toggleCheck = (index) => {
	cartList.value[index].checked = !cartList.value[index].checked
	calculateTotal()
}

const increaseQuantity = (index) => {
	cartList.value[index].quantity++
	calculateTotal()
}

const decreaseQuantity = (index) => {
	if (cartList.value[index].quantity > 1) {
		cartList.value[index].quantity--
		calculateTotal()
	}
}

const calculateTotal = () => {
	const checkedItems = cartList.value.filter(item => item.checked)
	allChecked.value = checkedItems.length === cartList.value.length && cartList.value.length > 0
}

const handleCheckAll = (checked) => {
	cartList.value.forEach(item => {
		item.checked = checked
	})
	calculateTotal()
	uni.showToast({
		title: checked ? '已全选' : '已取消全选',
		icon: 'none'
	})
}

const handleSubmit = (data) => {
	uni.showModal({
		title: '结算确认',
		content: `共${data.checkedCount}件商品，总价¥${(data.totalPrice / 100).toFixed(2)}`,
		success: (res) => {
			if (res.confirm) {
				uni.showToast({
					title: '结算成功',
					icon: 'success'
				})
			}
		}
	})
}

const addToFavorites = () => {
	uni.showToast({
		title: '已添加到收藏',
		icon: 'success'
	})
}

const buyNow = () => {
	uni.showToast({
		title: '立即购买',
		icon: 'success'
	})
}

// 切换方法
const toggleOriginalPrice = () => {
	showOriginalPrice.value = !showOriginalPrice.value
}

const toggleDiscount = () => {
	showDiscount.value = !showDiscount.value
}

const toggleButtonRound = () => {
	buttonRound.value = !buttonRound.value
}

const toggleLoading = () => {
	loading.value = !loading.value
	if (loading.value) {
		setTimeout(() => {
			loading.value = false
		}, 3000)
	}
}

const toggleShowCheckAll = () => {
	showCheckAll.value = !showCheckAll.value
}

const toggleShowCount = () => {
	showCount.value = !showCount.value
}

const toggleShowPrice = () => {
	showPrice.value = !showPrice.value
}

const toggleDisabled = () => {
	disabled.value = !disabled.value
}

const toggleTip = () => {
	showTip.value = !showTip.value
}

const toggleCustomLeft = () => {
	customLeft.value = !customLeft.value
}

const toggleCustomButton = () => {
	customButton.value = !customButton.value
}

// 初始化
onMounted(() => {
	calculateTotal()
})
</script>

<style lang="scss" scoped>
.page {
	background: #f5f5f5;
	min-height: 100vh;
}

.demo-content {
	padding-bottom: 200rpx;
}

.demo-block {
	padding: 32rpx;
	background: #fff;
	margin-bottom: 20rpx;
}

.cart-list {
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
}

.cart-item {
	display: flex;
	align-items: center;
	padding: 24rpx;
	border-bottom: 1rpx solid #f0f0f0;
	
	&:last-child {
		border-bottom: none;
	}
	
	.item-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 12rpx;
		margin: 0 24rpx;
		background: #f5f5f5;
	}
	
	.item-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		
		.item-title {
			font-size: 28rpx;
			color: #323233;
			font-weight: 500;
			margin-bottom: 8rpx;
			line-height: 1.4;
		}
		
		.item-spec {
			font-size: 24rpx;
			color: #969799;
			margin-bottom: 16rpx;
		}
		
		.item-bottom {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.item-price {
				font-size: 32rpx;
				color: #ee0a24;
				font-weight: 600;
			}
			
			.item-stepper {
				display: flex;
				align-items: center;
				gap: 16rpx;
				
				.quantity {
					font-size: 28rpx;
					color: #323233;
					min-width: 40rpx;
					text-align: center;
				}
			}
		}
	}
}

.custom-left {
	display: flex;
	align-items: center;
	gap: 8rpx;
	
	.gift-text {
		font-size: 24rpx;
		color: #ff6900;
	}
}

.custom-buttons {
	display: flex;
	align-items: center;
	gap: 16rpx;
	
	.custom-btn {
		min-width: 120rpx;
		height: 64rpx;
		font-size: 24rpx;
	}
}

.placeholder {
	height: 200rpx;
}
</style>