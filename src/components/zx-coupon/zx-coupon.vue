<template>
	<view :class="['zx-coupons flex-row', customClass]" style="flex-wrap: nowrap">
		<view class="zx-coupons-left flex1 flex-row nowrap" :style="{ height: couponData.height }">
			<view class="zx-coupons-left-number">
				<view class="flex-row nowrap" style="align-items: center; justify-content: center">
					<text class="zx-color-gray zx-h4">{{ couponData.unit }}</text>
					<text class="zx-h3 zx-bold" :style="{ color: couponData.color }">{{ couponData.number }}</text>
				</view>
				<text class="zx-text-small zx-block zx-text-center" :style="{ color: couponData.color }">{{ couponData.txt }}</text>
			</view>
			<view class="zx-coupons-left-body">
				<text class="zx-block zx-h5 zx-primary-color">{{ couponData.title }}</text>
				<text class="zx-block zx-text-small zx-color-gray">{{ couponData.desc }}</text>
			</view>
			<text class="zx-coupons-status" v-if="couponData.drawed" :style="{ backgroundColor: couponData.color }">{{ couponData.drawed }}</text>
		</view>
		<view
			class="zx-coupons-right zx-color-white zx-text-center zx-block"
			:style="{
				height: couponData.height,
				lineHeight: couponData.height,
				backgroundColor: couponData.color,
				opacity: btnDisabled ? 0.5 : 1
			}"
			@tap="handleBtnClick"
			:class="{ 'zx-coupons-btn-disabled': btnDisabled }"
		>
			{{ couponData.btn }}
		</view>
		<view
			class="zx-coupons-sawtooth"
			:style="{
				height: couponData.height,
				backgroundColor: couponData.color
			}"
		>
			<view class="zx-coupons-sawtooth-circular zx-bg-gray zx-dark-bg-level-3" v-for="(item, index) in 10" :key="index"></view>
		</view>
	</view>
</template>
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
	/* {
		color: '#9F6DFA',
		height: '180rpx',
		unit: '￥',
		number: 5,
		txt: '满50元可用',
		title: '全场通用券',
		desc: '有效期至 2018-05-20',
		btn: '领取',
		drawed: '已抢2100张'
	} */
	coupon: {
		type: Object,
		default: () => ({})
	},
	// 新增：按钮点击事件
	onBtnClick: {
		type: Function,
		default: null
	},
	// 新增：自定义样式
	customClass: {
		type: String,
		default: ''
	},
	// 新增：自定义按钮禁用
	btnDisabled: {
		type: Boolean,
		default: false
	}
});

// 兼容默认数据
const couponData = computed(() => ({
	color: props.coupon.color || '#9F6DFA',
	height: props.coupon.height || '150rpx',
	unit: props.coupon.unit || '￥',
	number: props.coupon.number || 5,
	txt: props.coupon.txt || '满50元可用',
	title: props.coupon.title || '全场通用券',
	desc: props.coupon.desc || '有效期至 2099-12-31',
	btn: props.coupon.btn || '领取',
	drawed: props.coupon.drawed || '',
}));

function handleBtnClick() {
	if (props.btnDisabled) return;
	props.onBtnClick && props.onBtnClick(couponData.value);
}
</script>
<style lang="scss" scoped>
.zx-block {
	display: block;
}
.zx-text-center {
	text-align: center;
}
.zx-text-small {
	font-size: 26rpx;
}
.zx-bold {
	font-weight: bold;
}
.zx-h1 {
	font-size: 60rpx;
}
.zx-h2 {
	font-size: 50rpx;
}
.zx-h3 {
	font-size: 40rpx;
}
.zx-h4 {
	font-size: 36rpx;
}
.zx-h5 {
	font-size: 32rpx;
}
.zx-h6 {
	font-size: 30rpx;
}
.zx-color-black {
	color: #2b2e3d !important;
}
.zx-color-white {
	color: #ffffff !important;
}
.zx-color-gray {
	color: rgba(69, 90, 100, 0.6) !important;
}
.zx-color-gray-light {
	color: rgba(69, 90, 100, 0.3) !important;
}
.zx-color-blue {
	color: #008aff !important;
}
.zx-color-red {
	color: #ee0a25 !important;
}
.zx-color-orange {
	color: #ed6a0c !important;
}
.zx-color-purple {
	color: #8a3fd4 !important;
}
.zx-color-green {
	color: #39b55a !important;
}
.zx-color-yellow {
	color: #fbde4e !important;
}
.zx-primary-color {
	color: #008aff !important;
}
.zx-bg-gray {
	background-color: #f8f8f8 !important;
}
.zx-coupons {
	border-top-left-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
}
.zx-coupons-left {
	width: 500rpx;
	height: 150rpx;
	padding-right: 10rpx;
	border-radius: 8rpx;
	position: relative;
	align-items: center;
	justify-content: space-between;
	background-color: #ffffff;
}
.zx-coupons-left-number {
	width: 168rpx;
	border-right: 1px dashed #d2d2d2;
}
.zx-coupons-left-body {
	width: 320rpx;
}
.zx-coupons-status {
	color: #ffffff;
	padding: 0 10px;
	height: 36rpx;
	line-height: 36rpx;
	font-size: 20rpx;
	position: absolute;
	z-index: 1;
	right: 6px;
	top: 8px;
	border-radius: 36rpx;
}
.zx-coupons-right {
	width: 150rpx;
	height: 150rpx;
	font-size: 32rpx;
}
.zx-coupons-sawtooth {
	width: 8px;
	height: 150rpx;
	overflow: hidden;
	position: relative;
}
.zx-coupons-sawtooth-circular {
	width: 10px;
	margin: 3px 5px;
	height: 10px;
	border-radius: 10px;
}
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex1 {
	flex: 1;
}
.nowrap {
	flex-wrap: nowrap;
}
.zx-coupons-btn-disabled {
	pointer-events: none;
}
</style>
