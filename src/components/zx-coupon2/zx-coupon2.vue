<template>
	<view :class="['zx-coupon2', customClass, sizeClass, typeClass, statusClass]" :style="[customStyle]" @tap="handleClick">
		<!-- 标签 -->
		<view class="zx-coupon2__label" v-if="label" :style="{ backgroundColor: labelBgColor, color: labelTextColor }">
			{{ label }}
		</view>
		
		<!-- 优惠券主体 -->
		<view class="zx-coupon2__main">
			<!-- 左侧价格区域 -->
			<view class="zx-coupon2__left">
				<view class="zx-coupon2__price">
					<text class="zx-coupon2__currency" :style="{ color: priceColor }">{{ currency }}</text>
					<text class="zx-coupon2__amount" :style="{ color: priceColor }">{{ amount }}</text>
				</view>
				<text class="zx-coupon2__condition" :style="{ color: conditionColor }" v-if="condition">{{ condition }}</text>
			</view>
			
			<!-- 分割线 -->
			<view class="zx-coupon2__divider">
				<view class="zx-coupon2__circle zx-coupon2__circle--top"></view>
				<view class="zx-coupon2__dashed-line"></view>
				<view class="zx-coupon2__circle zx-coupon2__circle--bottom"></view>
			</view>
			
			<!-- 右侧内容区域 -->
			<view class="zx-coupon2__right">
				<view class="zx-coupon2__content">
					<text class="zx-coupon2__title" :style="{ color: titleColor }">{{ title }}</text>
					<text class="zx-coupon2__desc" :style="{ color: descColor }" v-if="desc">{{ desc }}</text>
					<text class="zx-coupon2__time" :style="{ color: timeColor }" v-if="validTime">{{ validTime }}</text>
				</view>
				
				<!-- 按钮区域 -->
				<view class="zx-coupon2__btn" v-if="showBtn" :style="{ backgroundColor: btnBgColor, color: btnTextColor, borderColor: btnBgColor }" @tap.stop="handleBtnClick">
					<text class="zx-coupon2__btn-text">{{ btnText }}</text>
				</view>
			</view>
		</view>
		
		<!-- 状态遮罩 -->
		<view class="zx-coupon2__status-mask" v-if="status !== 'normal'">
			<text class="zx-coupon2__status-text" :style="{ color: statusTextColor }">{{ getStatusText() }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
	// 基础属性
	amount: {
		type: [String, Number],
		default: '10'
	},
	currency: {
		type: String,
		default: '￥'
	},
	condition: {
		type: String,
		default: ''
	},
	title: {
		type: String,
		default: '优惠券'
	},
	desc: {
		type: String,
		default: ''
	},
	validTime: {
		type: String,
		default: ''
	},
	
	// 样式属性
	size: {
		type: String,
		default: 'normal', // normal, small, large
		validator: (value) => ['normal', 'small', 'large'].includes(value)
	},
	type: {
		type: String,
		default: 'default', // default, primary, success, warning, danger
		validator: (value) => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
	},
	shape: {
		type: String,
		default: 'round', // round, square
		validator: (value) => ['round', 'square'].includes(value)
	},
	
	// 状态属性
	status: {
		type: String,
		default: 'normal', // normal, used, expired, disabled
		validator: (value) => ['normal', 'used', 'expired', 'disabled'].includes(value)
	},
	statusText: {
		type: String,
		default: ''
	},
	
	// 按钮属性
	showBtn: {
		type: Boolean,
		default: true
	},
	btnText: {
		type: String,
		default: '立即使用'
	},
	
	// 标签属性
	label: {
		type: String,
		default: ''
	},
	
	// 显示属性
	showSawtooth: {
		type: Boolean,
		default: true
	},
	
	// 自定义样式
	customClass: {
		type: String,
		default: ''
	},
	customStyle: {
		type: Object,
		default: () => ({})
	},
	
	// 颜色自定义
	themeColor: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['click', 'btn-click'])

// 计算样式类
const sizeClass = computed(() => `zx-coupon2--${props.size}`)
const typeClass = computed(() => `zx-coupon2--${props.type}`)
const statusClass = computed(() => `zx-coupon2--${props.status}`)

// 获取状态文本
const getStatusText = () => {
	if (props.statusText) return props.statusText
	
	switch (props.status) {
		case 'used': return '已使用'
		case 'expired': return '已过期'
		case 'disabled': return '已失效'
		default: return ''
	}
}

// 计算主题颜色
const getThemeColor = () => {
	if (props.themeColor) return props.themeColor
	
	switch (props.type) {
		case 'primary': return '#007aff'
		case 'success': return '#4cd964'
		case 'warning': return '#f0ad4e'
		case 'danger': return '#dd524d'
		default: return '#ff6900'
	}
}

// 计算各部分颜色
const priceColor = computed(() => {
	return props.status === 'disabled' ? '#c8c9cc' : getThemeColor()
})

const conditionColor = computed(() => {
	return props.status === 'disabled' ? '#c8c9cc' : '#666'
})

const titleColor = computed(() => {
	return props.status === 'disabled' ? '#c8c9cc' : '#333'
})

const descColor = computed(() => {
	return props.status === 'disabled' ? '#c8c9cc' : '#666'
})

const timeColor = computed(() => {
	return props.status === 'disabled' ? '#c8c9cc' : '#999'
})

const btnBgColor = computed(() => {
	if (props.status === 'disabled') return '#c8c9cc'
	return getThemeColor()
})

const btnTextColor = computed(() => '#fff')

const statusBgColor = computed(() => {
	switch (props.status) {
		case 'used': return '#c8c9cc'
		case 'expired': return '#dd524d'
		default: return getThemeColor()
	}
})

const statusTextColor = computed(() => '#fff')

const labelBgColor = computed(() => getThemeColor())
const labelTextColor = computed(() => '#fff')

// 事件处理
const handleClick = () => {
	if (props.status === 'disabled') return
	emit('click')
}

const handleBtnClick = () => {
	if (props.status === 'disabled') return
	emit('btn-click')
}
</script>

<style lang="scss" scoped>
.zx-coupon2 {
	position: relative;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	margin-bottom: 20rpx;
	
	&__label {
		position: absolute;
		top: 0;
		left: 0;
		padding: 8rpx 16rpx;
		border-radius: 12rpx 0 20rpx 0;
		font-size: 20rpx;
		font-weight: 500;
		line-height: 1;
		max-width: 120rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		z-index: 2;
	}
	
	&__main {
		display: flex;
		align-items: stretch;
		position: relative;
	}
	
	&__left {
		padding: 32rpx 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-width: 160rpx;
		background: linear-gradient(135deg, #ff6b35 0%, #ff8f65 100%);
		position: relative;
	}
	
	&__price {
		display: flex;
		align-items: baseline;
		flex-direction: row;
		margin-bottom: 8rpx;
	}
	
	&__currency {
		font-size: 28rpx;
		font-weight: 600;
		color: #fff;
	}
	
	&__amount {
		font-size: 56rpx;
		font-weight: bold;
		line-height: 1;
		color: #fff;
		margin-left: 4rpx;
	}
	
	&__condition {
		font-size: 22rpx;
		line-height: 1.2;
		color: rgba(255, 255, 255, 0.9);
		text-align: center;
	}
	
	&__divider {
		position: relative;
		width: 2rpx;
		background: #f0f0f0;
		margin: 20rpx 0;
	}
	
	&__circle {
		position: absolute;
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
		background: #f5f5f5;
		left: 50%;
		transform: translateX(-50%);
		
		&--top {
			top: -12rpx;
		}
		
		&--bottom {
			bottom: -12rpx;
		}
	}
	
	&__dashed-line {
		position: absolute;
		top: 12rpx;
		bottom: 12rpx;
		left: 50%;
		width: 2rpx;
		border-left: 2rpx dashed #e0e0e0;
		transform: translateX(-50%);
	}
	
	&__right {
		flex: 1;
		padding: 32rpx 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	
	&__content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	&__title {
		font-size: 32rpx;
		font-weight: 600;
		line-height: 1.4;
		margin-bottom: 8rpx;
		color: #333;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	&__desc {
		font-size: 24rpx;
		line-height: 1.4;
		margin-bottom: 8rpx;
		color: #666;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	&__time {
		font-size: 22rpx;
		line-height: 1.4;
		color: #999;
	}
	
	&__btn {
		align-self: flex-end;
		padding: 12rpx 24rpx;
		border-radius: 20rpx;
		border: 2rpx solid;
		font-size: 24rpx;
		font-weight: 500;
		line-height: 1;
		margin-top: 16rpx;
		transition: all 0.3s;
		
		&:active {
			opacity: 0.8;
			transform: scale(0.95);
		}
	}
	
	&__btn-text {
		font-size: 24rpx;
		font-weight: 500;
	}
	
	&__status-mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		border-radius: 12rpx;
	}
	
	&__status-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #fff;
		text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
	}
	
	// 尺寸变体
	&--small {
		.zx-coupon2__left {
			padding: 24rpx 20rpx;
			min-width: 120rpx;
		}
		
		.zx-coupon2__right {
			padding: 24rpx 20rpx;
		}
		
		.zx-coupon2__currency {
			font-size: 22rpx;
		}
		
		.zx-coupon2__amount {
			font-size: 40rpx;
		}
		
		.zx-coupon2__condition {
			font-size: 18rpx;
		}
		
		.zx-coupon2__title {
			font-size: 26rpx;
		}
		
		.zx-coupon2__desc {
			font-size: 20rpx;
		}
		
		.zx-coupon2__time {
			font-size: 18rpx;
		}
		
		.zx-coupon2__btn {
			padding: 8rpx 16rpx;
			font-size: 20rpx;
		}
	}
	
	&--large {
		.zx-coupon2__left {
			padding: 40rpx 28rpx;
			min-width: 180rpx;
		}
		
		.zx-coupon2__right {
			padding: 40rpx 28rpx;
		}
		
		.zx-coupon2__currency {
			font-size: 32rpx;
		}
		
		.zx-coupon2__amount {
			font-size: 64rpx;
		}
		
		.zx-coupon2__condition {
			font-size: 24rpx;
		}
		
		.zx-coupon2__title {
			font-size: 36rpx;
		}
		
		.zx-coupon2__desc {
			font-size: 28rpx;
		}
		
		.zx-coupon2__time {
			font-size: 24rpx;
		}
		
		.zx-coupon2__btn {
			padding: 16rpx 32rpx;
			font-size: 28rpx;
		}
	}
	
	// 主题色彩
	&--primary {
		.zx-coupon2__left {
			background: linear-gradient(135deg, #007aff 0%, #4da6ff 100%);
		}
	}
	
	&--success {
		.zx-coupon2__left {
			background: linear-gradient(135deg, #4cd964 0%, #7ee87f 100%);
		}
	}
	
	&--warning {
		.zx-coupon2__left {
			background: linear-gradient(135deg, #f0ad4e 0%, #f4c571 100%);
		}
	}
	
	&--danger {
		.zx-coupon2__left {
			background: linear-gradient(135deg, #dd524d 0%, #e67e7a 100%);
		}
	}
	
	// 状态样式
	&--used,
	&--expired,
	&--disabled {
		.zx-coupon2__left {
			background: linear-gradient(135deg, #c8c9cc 0%, #d8d9dc 100%);
		}
		
		.zx-coupon2__currency,
		.zx-coupon2__amount,
		.zx-coupon2__condition {
			color: rgba(255, 255, 255, 0.8) !important;
		}
	}
	
	// 方形样式
	&--square {
		border-radius: 0;
		
		.zx-coupon2__label {
			border-radius: 0;
		}
		
		.zx-coupon2__status-mask {
			border-radius: 0;
		}
	}
}
</style>