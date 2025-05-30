<template>
	<view class="container">
		<zx-navbar title="PasswordInput 密码输入框"></zx-navbar>

		<view class="example-section">
			<text class="example-title">基础用法</text>
			<zx-password-input v-model="value1" :focused="showKeyboard1" @focus="showKeyboard1 = true"></zx-password-input>
			<zx-number-keyboard v-model="value1" :show="showKeyboard1" @blur="showKeyboard1 = false"></zx-number-keyboard>
			<view class="current-value">当前值: {{ value1 }}</view>
		</view>

		<view class="example-section">
			<text class="example-title">自定义长度 (4位)</text>
			<zx-password-input v-model="value2" :length="4" :focused="showKeyboard2" @focus="showKeyboard2 = true"></zx-password-input>
			<zx-number-keyboard v-model="value2" :show="showKeyboard2" @blur="showKeyboard2 = false" :maxlength="4"></zx-number-keyboard>
			<view class="current-value">当前值: {{ value2 }}</view>
		</view>

		<view class="example-section">
			<text class="example-title">格子间距 (10rpx)</text>
			<zx-password-input v-model="value3" :gutter="10" :focused="showKeyboard3" @focus="showKeyboard3 = true"></zx-password-input>
			<zx-number-keyboard v-model="value3" :show="showKeyboard3" @blur="showKeyboard3 = false"></zx-number-keyboard>
			<view class="current-value">当前值: {{ value3 }}</view>
		</view>

		<view class="example-section">
			<text class="example-title">明文展示</text>
			<zx-password-input v-model="value4" :mask="false" :focused="showKeyboard4" @focus="showKeyboard4 = true"></zx-password-input>
			<zx-number-keyboard v-model="value4" :show="showKeyboard4" @blur="showKeyboard4 = false"></zx-number-keyboard>
			<view class="current-value">当前值: {{ value4 }}</view>
		</view>

		<view class="example-section">
			<text class="example-title">提示信息</text>
			<zx-password-input
				v-model="value5"
				info="密码为 6 位数字"
				:error-info="errorInfo5"
				:focused="showKeyboard5"
				@focus="showKeyboard5 = true"
			></zx-password-input>
			<zx-number-keyboard v-model="value5" :show="showKeyboard5" @blur="showKeyboard5 = false"></zx-number-keyboard>
			<view class="current-value">当前值: {{ value5 }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref, watch } from 'vue';

// 假设你有一个全局的 zx-navbar 和 zx-number-keyboard 组件，或者局部引入
// import zxNavbar from '@/components/zx-navbar/zx-navbar.vue';
// import zxNumberKeyboard from '@/components/zx-number-keyboard/zx-number-keyboard.vue'; // 确保路径正确
// import zxPasswordInput from '@/components/zx-password-input/zx-password-input.vue'; // 确保路径正确

const value1 = ref('');
const showKeyboard1 = ref(false);

const value2 = ref('');
const showKeyboard2 = ref(false);

const value3 = ref('');
const showKeyboard3 = ref(false);

const value4 = ref('');
const showKeyboard4 = ref(false);

const value5 = ref('');
const errorInfo5 = ref('');
const showKeyboard5 = ref(false);

watch(value5, (newVal) => {
	if (newVal.length === 6 && newVal !== '123456') {
		errorInfo5.value = '密码错误';
	} else {
		errorInfo5.value = '';
	}
});

</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
	padding-bottom: 100rpx; /* 为键盘留出空间 */
}

.example-section {
	margin-bottom: 40rpx;
	padding: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.example-title {
	display: block;
	margin-bottom: 20rpx;
	font-size: 32rpx;
	color: #333;
	font-weight: bold;
}

.current-value {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #666;
}
</style>