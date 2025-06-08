<template>
	<view class="zx-radio-group" :class="radioGroupClass" :style="customStyle" :role="'radiogroup'"
		:aria-label="ariaLabel">
		<slot></slot>
	</view>
</template>

<script setup>
import { computed, ref, watch, provide, onBeforeMount } from 'vue';

/**
 * radioGroup 单选框父组件
 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配zx-radio使用
 * @property {String | Number | Boolean} modelValue 绑定的值
 * @property {Boolean} disabled 是否禁用所有radio（默认 false）
 * @property {String} name 标识符，用于表单验证
 * @property {String} placement 布局方式，row-横向，column-纵向（默认 'column'）
 * @property {Object} customStyle 组件的样式，对象形式
 * @property {Boolean} validateEvent 输入时是否触发表单验证（默认 true）
 * @property {String} ariaLabel 无障碍访问标签
 * @event {Function} change 任一个radio状态发生变化时触发，event.detail = {value: 选中项radio的value}
 * @example <zx-radio-group v-model="value"></zx-radio-group>
 */

const props = defineProps({
	// 绑定的值 (Vue 3中v-model默认绑定到modelValue)
	modelValue: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 是否禁用全部radio
	disabled: {
		type: Boolean,
		default: false
	},
	// 标识符，用于表单验证
	name: {
		type: String,
		default: ''
	},
	// 布局方式，row-横向，column-纵向
	placement: {
		type: String,
		default: 'column'
	},
	// 组件的样式，对象形式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 输入时是否触发表单的校验
	validateEvent: {
		type: Boolean,
		default: true
	},
	// 无障碍标签
	ariaLabel: {
		type: String,
		default: ''
	}
});

const emit = defineEmits(['update:modelValue', 'change']);

// 子组件列表
const children = ref([]);

// 计算组件类名
const radioGroupClass = computed(() => {
	return `zx-radio-group--${props.placement}`;
});

// 添加子组件
const addChild = (child) => {
	children.value.push(child);
};

// 移除子组件
const removeChild = (child) => {
	const index = children.value.indexOf(child);
	if (index !== -1) {
		children.value.splice(index, 1);
	}
};

// 改变选中值
const changeValue = (value) => {
	// 更新modelValue
	emit('update:modelValue', value);

	// 触发change事件，符合uni-app官方规范
	emit('change', { value });

	// 触发表单验证
	if (props.validateEvent) {
		// 可以在这里添加表单验证逻辑
		console.log('表单验证:', props.name, value);
	}
};

// 监听modelValue变化，通知子组件更新
watch(() => props.modelValue, (newValue) => {
	// 通知所有子组件更新状态
	children.value.forEach(child => {
		if (child.updateChecked && typeof child.updateChecked === 'function') {
			child.updateChecked(child.value === newValue);
		}
	});
});

// 提供数据和方法给子组件
provide('radioGroup', {
	modelValue: computed(() => props.modelValue),
	disabled: computed(() => props.disabled),
	changeValue,
	addChild,
	removeChild
});

// 组件挂载前初始化
onBeforeMount(() => {
	children.value = [];
});
</script>

<style scoped>
.zx-radio-group {
	display: flex;
	width: 100%;
}

.zx-radio-group--row {
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
}

.zx-radio-group--row> :global(.zx-radio-container:not(:last-child)) {
	margin-right: 16px;
}

.zx-radio-group--column {
	flex-direction: column;
}

.zx-radio-group--column> :global(.zx-radio-container:not(:last-child)) {
	margin-bottom: 12px;
}
</style>
