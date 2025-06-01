<template>
	<view 
		:class="['zx-cart-bar2', customClass, { 
			'zx-cart-bar2--safe-area': safeAreaInsetBottom,
			'zx-cart-bar2--shadow': showShadow,
			'zx-cart-bar2--border': showBorder
		}]" 
		:style="[customStyle, rootStyle]"
	>
		<!-- 顶部提示信息 -->
		<view v-if="tip || tipIcon || $slots.tip" class="zx-cart-bar2__tip" :style="tipStyle">
			<view class="zx-cart-bar2__tip-content">
				<zx-icon v-if="tipIcon" :name="tipIcon" :color="tipIconColor" class="zx-cart-bar2__tip-icon"></zx-icon>
				<text v-if="tip" class="zx-cart-bar2__tip-text" :style="{ color: tipTextColor }">{{ tip }}</text>
				<slot name="tip"></slot>
			</view>
			<view v-if="tipClosable" class="zx-cart-bar2__tip-close" @tap="closeTip">
				<zx-icon name="close" :color="tipIconColor" size="16"></zx-icon>
			</view>
		</view>
		
		<!-- 购物车主体 -->
		<view class="zx-cart-bar2__main" :style="mainStyle">
			<!-- 左侧区域 -->
			<view class="zx-cart-bar2__left">
				<!-- 全选区域 -->
				<view v-if="showCheckAll" class="zx-cart-bar2__check-all" @tap="handleCheckAll">
					<zx-checkbox 
						v-model="isAllChecked" 
						:disabled="disabled || totalCount === 0"
						:color="checkboxColor"
						:size="checkboxSize"
						@change="onCheckAllChange"
					></zx-checkbox>
					<text class="zx-cart-bar2__check-text" :style="{ color: checkAllTextColor }">{{ checkAllText }}</text>
				</view>
				
				<!-- 自定义左侧内容 -->
				<view class="zx-cart-bar2__left-content" v-if="$slots.left">
					<slot name="left"></slot>
				</view>
			</view>
			
			<!-- 中间价格信息区域 -->
			<view class="zx-cart-bar2__center">
				<!-- 商品数量 -->
				<view v-if="showCount" class="zx-cart-bar2__count">
					<text class="zx-cart-bar2__count-label" :style="{ color: countLabelColor }">{{ countLabel }}</text>
					<text class="zx-cart-bar2__count-num" :style="{ color: countNumColor }">{{ checkedCount }}</text>
					<text class="zx-cart-bar2__count-unit" :style="{ color: countLabelColor }">{{ countUnit }}</text>
				</view>
				
				<!-- 价格显示 -->
				<view v-if="showPrice" class="zx-cart-bar2__price">
					<text class="zx-cart-bar2__price-label" :style="{ color: priceLabelColor }">{{ priceLabel }}</text>
					<text class="zx-cart-bar2__price-symbol" :style="{ color: priceColor }">{{ currency }}</text>
					<text class="zx-cart-bar2__price-integer" :style="{ color: priceColor }">{{ priceInteger }}</text>
					<text v-if="priceDecimal && showDecimal" class="zx-cart-bar2__price-decimal" :style="{ color: priceColor }">.{{ priceDecimal }}</text>
				</view>
				
				<!-- 原价显示 -->
				<view v-if="showOriginalPrice && originalPrice > 0" class="zx-cart-bar2__original-price">
					<text class="zx-cart-bar2__original-price-text" :style="{ color: originalPriceColor }">{{ originalPriceLabel }}{{ currency }}{{ (originalPrice / 100).toFixed(decimalLength) }}</text>
				</view>
				
				<!-- 优惠信息 -->
				<view v-if="discountText" class="zx-cart-bar2__discount">
					<text class="zx-cart-bar2__discount-text" :style="{ color: discountColor }">{{ discountText }}</text>
				</view>
			</view>
			
			<!-- 右侧按钮区域 -->
			<view class="zx-cart-bar2__right">
				<!-- 自定义按钮插槽 -->
				<slot name="button">
					<!-- 默认按钮组 -->
					<view class="zx-cart-bar2__button-group">
						<!-- 收藏按钮 -->
						<zx-button
							v-if="showFavoriteButton"
							:type="favoriteButtonType"
							:size="buttonSize"
							:round="buttonRound"
							:disabled="disabled || checkedCount === 0"
							class="zx-cart-bar2__favorite-btn"
							@click="handleFavorite"
						>
							{{ favoriteButtonText }}
						</zx-button>
						
						<!-- 主要操作按钮 -->
						<zx-button
							:type="buttonType"
							:color="buttonColor"
							:size="buttonSize"
							:disabled="disabled || (requireSelection && checkedCount === 0) || loading"
							:loading="loading"
							:round="buttonRound"
							:gradient="buttonGradient"
							class="zx-cart-bar2__submit-btn"
							@click="handleSubmit"
						>
							{{ getButtonText() }}
						</zx-button>
					</view>
				</slot>
			</view>
		</view>
		
		<!-- 底部插槽 -->
		<slot name="bottom"></slot>
	</view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
	// 基础属性
	totalPrice: {
		type: [Number, String],
		default: 0
	},
	originalPrice: {
		type: [Number, String],
		default: 0
	},
	checkedCount: {
		type: [Number, String],
		default: 0
	},
	totalCount: {
		type: [Number, String],
		default: 0
	},
	
	// 全选状态
	allChecked: {
		type: Boolean,
		default: false
	},
	
	// 显示控制
	showCheckAll: {
		type: Boolean,
		default: true
	},
	showCount: {
		type: Boolean,
		default: true
	},
	showPrice: {
		type: Boolean,
		default: true
	},
	showOriginalPrice: {
		type: Boolean,
		default: false
	},
	showDecimal: {
		type: Boolean,
		default: true
	},
	showShadow: {
		type: Boolean,
		default: true
	},
	showBorder: {
		type: Boolean,
		default: true
	},
	showFavoriteButton: {
		type: Boolean,
		default: false
	},
	
	// 文本配置
	priceLabel: {
		type: String,
		default: '合计：'
	},
	originalPriceLabel: {
		type: String,
		default: '原价：'
	},
	currency: {
		type: String,
		default: '¥'
	},
	buttonText: {
		type: String,
		default: ''
	},
	discountText: {
		type: String,
		default: ''
	},
	tip: {
		type: String,
		default: ''
	},
	tipIcon: {
		type: String,
		default: ''
	},
	checkAllText: {
		type: String,
		default: '全选'
	},
	countLabel: {
		type: String,
		default: '已选'
	},
	countUnit: {
		type: String,
		default: '件'
	},
	favoriteButtonText: {
		type: String,
		default: '收藏'
	},
	
	// 按钮样式
	buttonType: {
		type: String,
		default: 'danger'
	},
	buttonColor: {
		type: String,
		default: ''
	},
	buttonSize: {
		type: String,
		default: 'normal'
	},
	buttonRound: {
		type: Boolean,
		default: true
	},
	buttonGradient: {
		type: Boolean,
		default: false
	},
	favoriteButtonType: {
		type: String,
		default: 'default'
	},
	
	// 复选框配置
	checkboxColor: {
		type: String,
		default: '#ff6900'
	},
	checkboxSize: {
		type: String,
		default: 'normal'
	},
	
	// 颜色配置
	priceColor: {
		type: String,
		default: '#ee0a24'
	},
	priceLabelColor: {
		type: String,
		default: '#323233'
	},
	originalPriceColor: {
		type: String,
		default: '#969799'
	},
	discountColor: {
		type: String,
		default: '#ff6900'
	},
	countLabelColor: {
		type: String,
		default: '#969799'
	},
	countNumColor: {
		type: String,
		default: '#ff6900'
	},
	checkAllTextColor: {
		type: String,
		default: '#323233'
	},
	tipTextColor: {
		type: String,
		default: '#ff6900'
	},
	tipIconColor: {
		type: String,
		default: '#ff6900'
	},
	tipBackgroundColor: {
		type: String,
		default: '#fff7e8'
	},
	
	// 提示配置
	tipClosable: {
		type: Boolean,
		default: false
	},
	
	// 状态控制
	disabled: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	},
	requireSelection: {
		type: Boolean,
		default: true
	},
	
	// 安全区域
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	
	// 价格小数位数
	decimalLength: {
		type: [Number, String],
		default: 2
	},
	
	// 高度配置
	mainHeight: {
		type: [Number, String],
		default: ''
	},
	
	// 自定义样式
	customClass: {
		type: String,
		default: ''
	},
	customStyle: {
		type: Object,
		default: () => ({})
	}
})

const emit = defineEmits(['submit', 'check-all', 'update:allChecked', 'favorite', 'tip-close'])

// 内部状态
const isAllChecked = ref(props.allChecked)
const showTipContent = ref(true)

// 监听外部全选状态变化
watch(() => props.allChecked, (newVal) => {
	isAllChecked.value = newVal
})

// 计算样式
const rootStyle = computed(() => {
	const style = {}
	return style
})

const mainStyle = computed(() => {
	const style = {}
	if (props.mainHeight) {
		style.height = typeof props.mainHeight === 'number' ? `${props.mainHeight}rpx` : props.mainHeight
	}
	return style
})

const tipStyle = computed(() => {
	const style = {
		backgroundColor: props.tipBackgroundColor
	}
	if (!showTipContent.value) {
		style.display = 'none'
	}
	return style
})

// 计算价格显示
const priceInteger = computed(() => {
	const price = Number(props.totalPrice) || 0
	const priceStr = (price / 100).toFixed(Number(props.decimalLength))
	return priceStr.split('.')[0]
})

const priceDecimal = computed(() => {
	if (Number(props.decimalLength) === 0) return ''
	const price = Number(props.totalPrice) || 0
	const priceStr = (price / 100).toFixed(Number(props.decimalLength))
	const decimal = priceStr.split('.')[1]
	return decimal || '00'
})

// 获取按钮文本
const getButtonText = () => {
	if (props.buttonText) return props.buttonText
	if (props.checkedCount > 0) {
		return `结算(${props.checkedCount})`
	}
	return '结算'
}

// 全选点击事件
const handleCheckAll = () => {
	if (props.disabled || props.totalCount === 0) return
	isAllChecked.value = !isAllChecked.value
	onCheckAllChange(isAllChecked.value)
}

// 全选状态改变
const onCheckAllChange = (checked) => {
	emit('update:allChecked', checked)
	emit('check-all', checked)
}

// 提交按钮点击
const handleSubmit = () => {
	if (props.disabled || props.loading) return
	if (props.requireSelection && props.checkedCount === 0) return
	
	emit('submit', {
		checkedCount: props.checkedCount,
		totalPrice: props.totalPrice,
		originalPrice: props.originalPrice,
		discountAmount: props.originalPrice - props.totalPrice
	})
}

// 收藏按钮点击
const handleFavorite = () => {
	if (props.disabled || props.checkedCount === 0) return
	
	emit('favorite', {
		checkedCount: props.checkedCount,
		totalPrice: props.totalPrice
	})
}

// 关闭提示
const closeTip = () => {
	showTipContent.value = false
	nextTick(() => {
		emit('tip-close')
	})
}
</script>

<style lang="scss" scoped>
.zx-cart-bar2 {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: #fff;
	user-select: none;
	transition: all 0.3s ease;
	
	&--safe-area {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	&--shadow {
		box-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);
	}
	
	&--border {
		border-top: 1rpx solid #ebedf0;
	}
	
	&__tip {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 32rpx;
		border-bottom: 1rpx solid #f0f0f0;
		transition: all 0.3s ease;
		
		&-content {
			display: flex;
			align-items: center;
			flex: 1;
		}
		
		&-icon {
			margin-right: 12rpx;
			font-size: 28rpx;
		}
		
		&-text {
			font-size: 24rpx;
			line-height: 1.4;
			flex: 1;
		}
		
		&-close {
			padding: 8rpx;
			margin: -8rpx;
			opacity: 0.6;
			transition: opacity 0.2s;
			
			&:active {
				opacity: 1;
			}
		}
	}
	
	&__main {
		display: flex;
		align-items: center;
		padding: 20rpx 32rpx;
		min-height: 100rpx;
		gap: 24rpx;
	}
	
	&__left {
		display: flex;
		align-items: center;
		gap: 24rpx;
	}
	
	&__check-all {
		display: flex;
		align-items: center;
		gap: 12rpx;
		
		.zx-cart-bar2__check-text {
			font-size: 28rpx;
			white-space: nowrap;
		}
	}
	
	&__left-content {
		display: flex;
		align-items: center;
	}
	
	&__center {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4rpx;
		min-width: 0;
	}
	
	&__count {
		display: flex;
		align-items: center;
		gap: 4rpx;
		
		&-label, &-unit {
			font-size: 24rpx;
		}
		
		&-num {
			font-size: 24rpx;
			font-weight: 600;
		}
	}
	
	&__price {
		display: flex;
		align-items: baseline;
		gap: 4rpx;
		
		&-label {
			font-size: 24rpx;
		}
		
		&-symbol {
			font-size: 24rpx;
			font-weight: 600;
		}
		
		&-integer {
			font-size: 40rpx;
			font-weight: bold;
			font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
		
		&-decimal {
			font-size: 24rpx;
			font-weight: 600;
		}
	}
	
	&__original-price {
		&-text {
			font-size: 20rpx;
			text-decoration: line-through;
		}
	}
	
	&__discount {
		&-text {
			font-size: 20rpx;
		}
	}
	
	&__right {
		display: flex;
		align-items: center;
	}
	
	&__button-group {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}
	
	&__favorite-btn {
		min-width: 120rpx;
		height: 64rpx;
		font-size: 24rpx;
		border: none;
		
		&:not(:disabled):active {
			opacity: 0.8;
			transform: scale(0.98);
		}
	}
	
	&__submit-btn {
		min-width: 200rpx;
		height: 80rpx;
		font-size: 28rpx;
		font-weight: 600;
		border: none;
		
		&:not(:disabled):active {
			opacity: 0.8;
			transform: scale(0.98);
		}
	}
}

// CSS 变量支持主题定制
.zx-cart-bar2 {
	--zx-cart-bar2-background: #fff;
	--zx-cart-bar2-border-color: #ebedf0;
	--zx-cart-bar2-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);
	--zx-cart-bar2-padding: 20rpx 32rpx;
	--zx-cart-bar2-min-height: 100rpx;
	--zx-cart-bar2-gap: 24rpx;
	
	// 提示区域
	--zx-cart-bar2-tip-background: #fff7e8;
	--zx-cart-bar2-tip-padding: 16rpx 32rpx;
	--zx-cart-bar2-tip-text-color: #ff6900;
	--zx-cart-bar2-tip-icon-color: #ff6900;
	
	// 价格区域
	--zx-cart-bar2-price-color: #ee0a24;
	--zx-cart-bar2-price-label-color: #323233;
	--zx-cart-bar2-price-integer-size: 40rpx;
	--zx-cart-bar2-price-symbol-size: 24rpx;
	--zx-cart-bar2-price-decimal-size: 24rpx;
	
	// 按钮区域
	--zx-cart-bar2-button-height: 80rpx;
	--zx-cart-bar2-button-min-width: 200rpx;
	--zx-cart-bar2-button-font-size: 28rpx;
	--zx-cart-bar2-button-font-weight: 600;
	
	background: var(--zx-cart-bar2-background);
	padding: var(--zx-cart-bar2-padding);
	min-height: var(--zx-cart-bar2-min-height);
	
	&--border {
		border-top: 1rpx solid var(--zx-cart-bar2-border-color);
	}
	
	&--shadow {
		box-shadow: var(--zx-cart-bar2-shadow);
	}
	
	&__main {
		gap: var(--zx-cart-bar2-gap);
	}
	
	&__tip {
		background: var(--zx-cart-bar2-tip-background);
		padding: var(--zx-cart-bar2-tip-padding);
		
		&-text {
			color: var(--zx-cart-bar2-tip-text-color);
		}
		
		&-icon {
			color: var(--zx-cart-bar2-tip-icon-color);
		}
	}
	
	&__price {
		&-label {
			color: var(--zx-cart-bar2-price-label-color);
		}
		
		&-symbol {
			color: var(--zx-cart-bar2-price-color);
			font-size: var(--zx-cart-bar2-price-symbol-size);
		}
		
		&-integer {
			color: var(--zx-cart-bar2-price-color);
			font-size: var(--zx-cart-bar2-price-integer-size);
		}
		
		&-decimal {
			color: var(--zx-cart-bar2-price-color);
			font-size: var(--zx-cart-bar2-price-decimal-size);
		}
	}
	
	&__submit-btn {
		height: var(--zx-cart-bar2-button-height);
		min-width: var(--zx-cart-bar2-button-min-width);
		font-size: var(--zx-cart-bar2-button-font-size);
		font-weight: var(--zx-cart-bar2-button-font-weight);
	}
}
</style>