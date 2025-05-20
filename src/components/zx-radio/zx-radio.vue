<template>
	<view class="gui-flex gui-row gui-nowrap gui-align-items-center" @tap.stop="changeStatus">
		<text v-if="status" class="gui-icons gui-block gui-text-center" :class="checkedClass" :style="{
			width: size + 'rpx',
			height: size + 'rpx',
			lineHeight: size + 'rpx',
			fontSize: (size - 15) + 'rpx',
			borderRadius: (size) + 'rpx'
		}">&#xe60f;</text>
		<text v-else class="gui-icons gui-block gui-text-center" :class="defaultClass" :style="{
			width: size + 'rpx',
			height: size + 'rpx',
			lineHeight: (size + 2) + 'rpx',
			fontSize: (size - 8) + 'rpx',
		}">&#xe762;</text>
		<view class="gui-radio-lable gui-flex1">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
	size: {
		type: Number,
		default: 38
	},
	defaultClass: {
		type: Array,
		default: () => ['gui-color-gray']
	},
	checked: {
		type: Boolean,
		default: false
	},
	checkedClass: {
		type: Array,
		default: () => ['gui-bg-primary', 'gui-color-white']
	},
	parameter: {
		type: Array,
		default: () => []
	}
});

const emit = defineEmits(['change']);
const status = ref(false);

// 监听checked属性的变化
watch(() => props.checked, (newVal) => {
	status.value = newVal;
});

// 相当于created生命周期
onMounted(() => {
	status.value = props.checked;
});

// 改变状态方法
const changeStatus = () => {
	status.value = !status.value;
	emit('change', [status.value, props.parameter]);
};
</script>

<style scoped>
.gui-radio-lable {
	margin-left: 15rpx;
	width: 100rpx;
}
</style>