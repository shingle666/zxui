<template>
	<view class="zx-steps" :class="[
		`zx-steps--${direction}`,
		alignCenter ? 'is-center' : '',
		simple ? 'is-simple' : ''
	]">
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, reactive, provide, computed, getCurrentInstance, watch } from 'vue';

/**
 * zx-steps 步骤条组件
 * @description 引导用户按照流程完成任务的分步导航条
 * @property {Number} active - 设置当前激活步骤，默认为0（从0开始）
 * @property {String} direction - 显示方向，可选值为horizontal或vertical，默认为horizontal
 * @property {String/Number} space - 每个step的间距，不填写将自适应间距
 * @property {String} processStatus - 设置当前步骤的状态，可选值为wait/process/finish/error/success，默认为process
 * @property {String} finishStatus - 设置结束步骤的状态，可选值为wait/process/finish/error/success，默认为finish
 * @property {Boolean} alignCenter - 进行居中对齐，默认为false
 * @property {Boolean} simple - 是否应用简洁风格，默认为false
 */

// Props定义
const props = defineProps({
	active: {
		type: Number,
		default: 0
	},
	direction: {
		type: String,
		default: 'horizontal',
		validator: (val) => ['horizontal', 'vertical'].includes(val)
	},
	space: {
		type: [Number, String],
		default: ''
	},
	processStatus: {
		type: String,
		default: 'process',
		validator: (val) => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
	},
	finishStatus: {
		type: String,
		default: 'finish',
		validator: (val) => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
	},
	alignCenter: {
		type: Boolean,
		default: false
	},
	simple: {
		type: Boolean,
		default: false
	}
});

// 状态数据
const steps = reactive([]);

// 注册步骤
const registerStep = (step) => {
	steps.push(step);
	return steps.length - 1; // 返回步骤索引
};

// 重置步骤
const resetSteps = () => {
	steps.length = 0;
};

// 通过provide提供给子组件
provide('zxSteps', {
	props,
	steps,
	registerStep,
	resetSteps
});
</script>

<style lang="scss" scoped>
.zx-steps {
	display: flex;
	width: 100%;
}

.zx-steps--horizontal {
	flex-direction: row;
	white-space: nowrap;
}

.zx-steps--vertical {
	flex-direction: column;
}

.zx-steps.is-center {
	justify-content: center;
}

.zx-steps.is-simple {
	display: flex;
	align-items: center;
}
</style>
