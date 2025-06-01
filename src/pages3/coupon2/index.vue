<template>
	<view class="container">
		<zx-navbar title="优惠券组件 zx-coupon2" />
		
		<scroll-view scroll-y class="scroll-view">
			<!-- 基础用法 -->
			<view class="section">
				<view class="section-title">基础用法</view>
				<zx-coupon2 
					amount="10" 
					title="全场通用券" 
					desc="满100元可用" 
					valid-time="2024-12-31前有效"
					@click="handleCouponClick"
					@btn-click="handleBtnClick"
				/>
			</view>
			
			<!-- 不同尺寸 -->
			<view class="section">
				<view class="section-title">不同尺寸</view>
				<zx-coupon2 
					size="small" 
					amount="5" 
					title="小额优惠券" 
					desc="满50元可用"
					valid-time="2024-06-30前有效"
				/>
				<zx-coupon2 
					size="normal" 
					amount="10" 
					title="标准优惠券" 
					desc="满100元可用"
					valid-time="2024-07-31前有效"
				/>
				<zx-coupon2 
					size="large" 
					amount="20" 
					title="大额优惠券" 
					desc="满200元可用"
					valid-time="2024-08-31前有效"
				/>
			</view>
			
			<!-- 不同主题 -->
			<view class="section">
				<view class="section-title">不同主题</view>
				<zx-coupon2 
					type="default" 
					amount="10" 
					title="默认主题" 
					desc="满100元可用"
				/>
				<zx-coupon2 
					type="primary" 
					amount="15" 
					title="主要主题" 
					desc="满150元可用"
				/>
				<zx-coupon2 
					type="success" 
					amount="20" 
					title="成功主题" 
					desc="满200元可用"
				/>
				<zx-coupon2 
					type="warning" 
					amount="25" 
					title="警告主题" 
					desc="满250元可用"
				/>
				<zx-coupon2 
					type="danger" 
					amount="30" 
					title="危险主题" 
					desc="满300元可用"
				/>
			</view>
			
			<!-- 不同状态 -->
			<view class="section">
				<view class="section-title">不同状态</view>
				<zx-coupon2 
					status="normal" 
					amount="10" 
					title="可用优惠券" 
					desc="满100元可用"
					valid-time="2024-12-31前有效"
				/>
				<zx-coupon2 
					status="used" 
					status-text="已使用" 
					amount="10" 
					title="已使用优惠券" 
					desc="满100元可用"
					valid-time="2024-12-31前有效"
				/>
				<zx-coupon2 
					status="expired" 
					status-text="已过期" 
					amount="10" 
					title="已过期优惠券" 
					desc="满100元可用"
					valid-time="2023-12-31前有效"
				/>
				<zx-coupon2 
					status="disabled" 
					amount="10" 
					title="禁用优惠券" 
					desc="满100元可用"
					valid-time="2024-12-31前有效"
				/>
			</view>
			
			<!-- 自定义样式 -->
			<view class="section">
				<view class="section-title">自定义样式</view>
				<zx-coupon2 
					theme-color="#ff6900" 
					amount="10" 
					title="自定义颜色" 
					desc="满100元可用"
					valid-time="2024-12-31前有效"
				/>
				<zx-coupon2 
					shape="square" 
					amount="15" 
					title="方形优惠券" 
					desc="满150元可用"
					valid-time="2024-12-31前有效"
				/>
				<zx-coupon2 
					:show-sawtooth="false" 
					amount="20" 
					title="无锯齿边" 
					desc="满200元可用"
					valid-time="2024-12-31前有效"
				/>
				<zx-coupon2 
					:show-btn="false" 
					amount="25" 
					title="无按钮优惠券" 
					desc="满250元可用"
					valid-time="2024-12-31前有效"
				/>
			</view>
			
			<!-- 带标签 -->
			<view class="section">
				<view class="section-title">带标签</view>
				<zx-coupon2 
					amount="10" 
					title="限时优惠券" 
					label="限时" 
					desc="仅限今日使用"
					valid-time="今日23:59前有效"
				/>
				<zx-coupon2 
					amount="20" 
					title="新人专享券" 
					label="新人" 
					desc="新用户专享优惠"
					valid-time="注册后7天内有效"
					type="success"
				/>
				<zx-coupon2 
					amount="50" 
					title="VIP专属券" 
					label="VIP" 
					desc="VIP会员专享"
					valid-time="长期有效"
					type="warning"
				/>
			</view>
			
			<!-- 复杂示例 -->
			<view class="section">
				<view class="section-title">复杂示例</view>
				<zx-coupon2 
					amount="100" 
					currency="$" 
					condition="满500可用" 
					title="超级大额优惠券" 
					desc="全场商品通用，不与其他优惠同享" 
					valid-time="2024-12-31 23:59前有效"
					label="超值" 
					btn-text="立即领取"
					type="danger"
					size="large"
					@click="handleComplexCouponClick"
					@btn-click="handleComplexBtnClick"
				/>
			</view>
			
			<!-- 列表示例 -->
			<view class="section">
				<view class="section-title">列表示例</view>
				<view class="coupon-list">
					<zx-coupon2 
						v-for="(coupon, index) in couponList" 
						:key="index"
						:amount="coupon.amount"
						:title="coupon.title"
						:desc="coupon.desc"
						:valid-time="coupon.validTime"
						:type="coupon.type"
						:status="coupon.status"
						:status-text="coupon.statusText"
						:label="coupon.label"
						@click="handleListCouponClick(coupon, index)"
						@btn-click="handleListBtnClick(coupon, index)"
					/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 优惠券列表数据
const couponList = ref([
	{
		amount: '5',
		title: '新人专享券',
		desc: '满50元可用',
		validTime: '2024-06-30前有效',
		type: 'success',
		status: 'normal',
		statusText: '',
		label: '新人'
	},
	{
		amount: '10',
		title: '全场通用券',
		desc: '满100元可用',
		validTime: '2024-07-31前有效',
		type: 'primary',
		status: 'normal',
		statusText: '',
		label: ''
	},
	{
		amount: '20',
		title: '品类专享券',
		desc: '满200元可用',
		validTime: '2024-08-31前有效',
		type: 'warning',
		status: 'used',
		statusText: '已使用',
		label: ''
	},
	{
		amount: '50',
		title: 'VIP专属券',
		desc: '满500元可用',
		validTime: '2023-12-31前有效',
		type: 'danger',
		status: 'expired',
		statusText: '已过期',
		label: 'VIP'
	},
	{
		amount: '15',
		title: '限时抢购券',
		desc: '满150元可用',
		validTime: '2024-12-31前有效',
		type: 'default',
		status: 'disabled',
		statusText: '',
		label: '限时'
	}
])

// 事件处理函数
const handleCouponClick = () => {
	uni.showToast({
		title: '优惠券被点击',
		icon: 'none'
	})
}

const handleBtnClick = () => {
	uni.showToast({
		title: '按钮被点击',
		icon: 'none'
	})
}

const handleComplexCouponClick = () => {
	uni.showToast({
		title: '复杂优惠券被点击',
		icon: 'none'
	})
}

const handleComplexBtnClick = () => {
	uni.showToast({
		title: '复杂优惠券按钮被点击',
		icon: 'success'
	})
}

const handleListCouponClick = (coupon, index) => {
	uni.showToast({
		title: `第${index + 1}个优惠券被点击`,
		icon: 'none'
	})
	console.log('优惠券数据:', coupon)
}

const handleListBtnClick = (coupon, index) => {
	if (coupon.status === 'normal') {
		uni.showToast({
			title: `领取第${index + 1}个优惠券`,
			icon: 'success'
		})
		// 这里可以调用领取优惠券的API
		console.log('领取优惠券:', coupon)
	} else {
		uni.showToast({
			title: '该优惠券不可用',
			icon: 'none'
		})
	}
}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
}

.scroll-view {
	flex: 1;
	padding: 20rpx;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	padding-left: 20rpx;
	position: relative;
	
	&::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 6rpx;
		height: 24rpx;
		background-color: #007aff;
		border-radius: 3rpx;
	}
}

.coupon-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}
</style>