<template>
	<view class="container">
		<zx-coupon
			:coupon="coupon1"
			:onBtnClick="onReceive"
		/>
		<zx-coupon
			:coupon="coupon2"
			:btnDisabled="true"
			customClass="mt20"
		/>
		<zx-coupon
			:coupon="coupon3"
			:onBtnClick="onReceive"
			customClass="mt20"
		/>
	</view>
</template>
<script setup>
import { ref } from 'vue';
import zxCoupon from '@/components/zx-coupon/zx-coupon.vue';

const coupon1 = ref({
	color: '#9F6DFA',
	height: '150rpx',
	unit: '￥',
	number: 5,
	txt: '满50元可用',
	title: '全场通用券',
	desc: '有效期至 2025-12-31',
	btn: '立即领取',
	drawed: '已抢2100张'
});
const coupon2 = ref({
	color: '#39b55a',
	height: '150rpx',
	unit: '￥',
	number: 10,
	txt: '满100元可用',
	title: '新人专享券',
	desc: '有效期至 2025-12-31',
	btn: '已领取',
	drawed: ''
});
const coupon3 = ref({
	color: '#ee0a25',
	height: '150rpx',
	unit: '￥',
	number: 20,
	txt: '满200元可用',
	title: '限时大额券',
	desc: '有效期至 2025-12-31',
	btn: '立即领取',
	drawed: '剩余50张'
});

function onReceive(coupon) {
	uni.showToast({
		title: `领取成功: ${coupon.title}`,
		icon: 'success'
	});
}
</script>
<style scoped>
.container {
	padding: 32rpx;
}
.mt20 {
	margin-top: 20rpx;
}
</style> 