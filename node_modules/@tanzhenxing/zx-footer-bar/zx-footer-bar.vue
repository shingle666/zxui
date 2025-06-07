<template>
	<view v-if="show" class="zx-footer" :style="footerStyle">
		<view class="flex-center" :style="{ height: height }">
			<slot></slot>
		</view>
	</view>
	<view :style="{ height: height }"></view>
	<zx-safe-bottom></zx-safe-bottom>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	zIndex: {
		type: Number,
		default: 99
	},
	height: {
		type: String,
		default: '100rpx'
	},
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	line: {
		type: Boolean,
		default: true
	},
	lineColor: {
		type: String,
		default: '#ececec'
	}
});

const footerStyle = computed(() => {
	return {
		height: props.height,
		backgroundColor: props.backgroundColor,
		border: props.line ? '1rpx solid ' + props.lineColor : '',
		zIndex: props.zIndex
	};
});
</script>

<style lang="scss" scoped>
.zx-footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 750rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
.flex-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	flex: 1;
}
</style>
