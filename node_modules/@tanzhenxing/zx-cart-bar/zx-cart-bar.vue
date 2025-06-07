<template>
	<view 
		:class="['zx-cart-bar', customClass, { 'zx-cart-bar--safe-area': safeAreaInsetBottom }]" 
		:style="[customStyle]"
	>
		<!-- 顶部提示信息 -->
		<view v-if="tip || $slots.tip" class="zx-cart-bar__tip">
			<zx-icon v-if="tipIcon" :name="tipIcon" class="zx-cart-bar__tip-icon"></zx-icon>
			<text v-if="tip" class="zx-cart-bar__tip-text">{{ tip }}</text>
			<slot name="tip"></slot>
		</view>
		
		<!-- 购物车主体 -->
		<view class="zx-cart-bar__main">
			<!-- 全选区域 -->
			<view v-if="showCheckAll" class="zx-cart-bar__check-all" @tap="handleCheckAll">
				<zx-checkbox 
					v-model="isAllChecked" 
					:disabled="disabled || totalCount === 0"
					:color="checkboxColor"
					@change="onCheckAllChange"
				></zx-checkbox>
				<text class="zx-cart-bar__check-text">全选</text>
			</view>
			
			<!-- 自定义左侧内容 -->
			<view class="zx-cart-bar__left" v-if="$slots.left">
				<slot name="left"></slot>
			</view>
			
			<!-- 价格信息区域 -->
			<view class="zx-cart-bar__price-info">
				<!-- 商品数量 -->
				<view v-if="showCount" class="zx-cart-bar__count">
					<text class="zx-cart-bar__count-text">已选</text>
					<text class="zx-cart-bar__count-num">{{ checkedCount }}</text>
					<text class="zx-cart-bar__count-text">件</text>
				</view>
				
				<!-- 价格显示 -->
				<view v-if="showPrice" class="zx-cart-bar__price">
					<text class="zx-cart-bar__price-label">{{ priceLabel }}</text>
					<text class="zx-cart-bar__price-symbol">{{ currency }}</text>
					<text class="zx-cart-bar__price-integer">{{ priceInteger }}</text>
					<text v-if="priceDecimal" class="zx-cart-bar__price-decimal">.{{ priceDecimal }}</text>
				</view>
				
				<!-- 原价显示 -->
				<view v-if="showOriginalPrice && originalPrice > 0" class="zx-cart-bar__original-price">
					<text class="zx-cart-bar__original-price-text">原价：{{ currency }}{{ (originalPrice / 100).toFixed(2) }}</text>
				</view>
				
				<!-- 优惠信息 -->
				<view v-if="discountText" class="zx-cart-bar__discount">
					<text class="zx-cart-bar__discount-text">{{ discountText }}</text>
				</view>
			</view>
			
			<!-- 按钮区域 -->
			<view class="zx-cart-bar__button-group">
				<!-- 自定义按钮插槽 -->
				<slot name="button">
					<!-- 默认结算按钮 -->
					<zx-button
						:type="buttonType"
						:color="buttonColor"
						:disabled="disabled || checkedCount === 0 || loading"
						:loading="loading"
						:round="buttonRound"
						class="zx-cart-bar__button"
						@click="handleSubmit"
					>
						{{ getButtonText() }}
					</zx-button>
				</slot>
			</view>
		</view>
		
		<!-- 底部插槽 -->
		<slot name="bottom"></slot>
	</view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

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
	
	// 文本配置
	priceLabel: {
		type: String,
		default: '合计：'
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
	
	// 按钮样式
	buttonType: {
		type: String,
		default: 'danger'
	},
	buttonColor: {
		type: String,
		default: ''
	},
	buttonRound: {
		type: Boolean,
		default: true
	},
	
	// 复选框颜色
	checkboxColor: {
		type: String,
		default: '#ff6900'
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

const emit = defineEmits(['submit', 'check-all', 'update:allChecked'])

// 全选状态
const isAllChecked = ref(props.allChecked)

// 监听外部全选状态变化
watch(() => props.allChecked, (newVal) => {
	isAllChecked.value = newVal
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
	if (props.disabled || props.loading || props.checkedCount === 0) return
	emit('submit', {
		checkedCount: props.checkedCount,
		totalPrice: props.totalPrice,
		originalPrice: props.originalPrice
	})
}
</script>

<style lang="scss" scoped>
.zx-cart-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: #fff;
	border-top: 1rpx solid #ebedf0;
	user-select: none;
	
	&--safe-area {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	&__tip {
		display: flex;
		align-items: center;
		padding: 16rpx 32rpx;
		background: #fff7e8;
		border-bottom: 1rpx solid #f0f0f0;
		
		&-icon {
			margin-right: 12rpx;
			font-size: 28rpx;
			color: #ff6900;
		}
		
		&-text {
			font-size: 24rpx;
			color: #ff6900;
			line-height: 1.4;
		}
	}
	
	&__main {
		display: flex;
		align-items: center;
		padding: 20rpx 32rpx;
		min-height: 100rpx;
	}
	
	&__check-all {
		display: flex;
		align-items: center;
		margin-right: 24rpx;
		
		.zx-cart-bar__check-text {
			margin-left: 12rpx;
			font-size: 28rpx;
			color: #323233;
		}
	}
	
	&__left {
		margin-right: 24rpx;
	}
	
	&__price-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-right: 24rpx;
	}
	
	&__count {
		display: flex;
		align-items: center;
		margin-bottom: 8rpx;
		
		&-text {
			font-size: 24rpx;
			color: #969799;
		}
		
		&-num {
			font-size: 24rpx;
			color: #ff6900;
			font-weight: 600;
			margin: 0 4rpx;
		}
	}
	
	&__price {
		display: flex;
		align-items: baseline;
		margin-bottom: 4rpx;
		
		&-label {
			font-size: 24rpx;
			color: #323233;
			margin-right: 8rpx;
		}
		
		&-symbol {
			font-size: 24rpx;
			color: #ee0a24;
			font-weight: 600;
		}
		
		&-integer {
			font-size: 40rpx;
			color: #ee0a24;
			font-weight: bold;
			font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
		}
		
		&-decimal {
			font-size: 24rpx;
			color: #ee0a24;
			font-weight: 600;
		}
	}
	
	&__original-price {
		margin-bottom: 4rpx;
		
		&-text {
			font-size: 20rpx;
			color: #969799;
			text-decoration: line-through;
		}
	}
	
	&__discount {
		&-text {
			font-size: 20rpx;
			color: #ff6900;
		}
	}
	
	&__button-group {
		display: flex;
		align-items: center;
	}
	
	&__button {
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
</style>