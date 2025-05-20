<template>
	<view style="margin-bottom: 30rpx;">
		<view class="zx-form-item">
			<slot name="label">
				<view v-if="label" class="label" :style="{width:labelWidth}">
					<text v-if="required" class="is-required">*</text>
					<text>{{label}}</text>
				</view>
			</slot>
			<view class="content">
				<slot></slot>
			</view>
		</view>
		<view class="error" :style="{marginLeft:parseInt(labelWidth)+40+'rpx'}">
			{{errorMessage}}
		</view>
	</view>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue';

const {proxy} = getCurrentInstance();

const props = defineProps({
	// 是否为必填项
	required: {
		type: Boolean,
		default: false
	},
	// 标签名称
	label: {
		type: String,
		default: ''
	},
	// label的宽度
	labelWidth: {
		type: [String, Number],
		default: '100rpx'
	},
	// label 居中方式，默认 left 取值 left/center/right
	labelAlign: {
		type: String,
		default: ''
	},
	// 强制显示错误信息
	errorMessage: {
		type: [String, Boolean],
		default: ''
	},
});
</script>

<style scoped>
.zx-form-item {
	display: flex;
	flex-direction: row;
}
.label {
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
	padding-right: 20rpx;
}
.error {
	margin-top: 10rpx;
	margin-left: 20rpx;
	color: #ff0000;
	font-size: 28rpx;
}
.content {
	flex: 1;
}

.is-required {
	color: #dd524d;
	font-weight: bold;
	font-size: 34rpx;
	margin-top: 10rpx;
	margin-right: 10rpx;
}
</style>