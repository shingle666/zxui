<template>
	<view class="zx-checkbox-group" :class="bemClass">
		<slot></slot>
	</view>
</template>

<script setup>
/**
 * checkboxGroup 复选框组
 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
 * @tutorial https://zxui.org/components/checkbox-group
 * @property {String}			name			标识符
 * @property {Array}			value			绑定的值（已废弃，请使用v-model或modelValue）
 * @property {Array}			modelValue		v-model绑定的值
 * @property {String}			shape			形状，circle-圆形，square-方形 （默认 'square' ）
 * @property {Boolean}			disabled		是否禁用全部checkbox （默认 false ）
 * @property {String}			activeColor		选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 （默认 '#2979ff' ）
 * @property {String}			inactiveColor	未选中的颜色 （默认 '#c8c9cc' ）
 * @property {String | Number}	size			整个组件的尺寸 单位px （默认 18 ）
 * @property {String}			placement		布局方式，row-横向，column-纵向 （默认 'row' ）
 * @property {String | Number}	labelSize		label的字体大小，px单位  （默认 14 ）
 * @property {String}			labelColor		label的字体颜色 （默认 '#303133' ）
 * @property {Boolean}			labelDisabled	是否禁止点击文本操作 (默认 false )
 * @property {String}			iconColor		图标颜色 （默认 '#ffffff' ）
 * @property {String | Number}	iconSize		图标的大小，单位px （默认 12 ）
 * @property {String}			iconPlacement	勾选图标的对齐方式，left-左边，right-右边  （默认 'left' ）
 * @property {Boolean}			borderBottom	placement为row时，是否显示下边框 （默认 false ）
 * @property {Number}			min				可被勾选的checkbox的最小数量
 * @property {Number}			max				可被勾选的checkbox的最大数量
 * @property {Boolean}			validateEvent	是否触发表单校验 （默认 true ）
 * @property {String}			tag				复选框组元素标签 （默认 'view' ）
 * @property {String}			textColor		当按钮为活跃状态时的字体颜色 （默认 '#ffffff' ）
 * @property {String}			fill			当按钮为活跃状态时的边框和背景颜色 （默认 '#2979ff' ）
 * @event {Function}	change			任一个checkbox状态发生变化时触发，回调为当前选中的值数组
 * @event {Function}	input			修改通过v-model绑定的值时触发（已废弃，请使用update:modelValue）
 * @event {Function}	update:modelValue	更新v-model绑定的值时触发
 * @example <zx-checkbox-group v-model="checkList"></zx-checkbox-group>
 */
import { ref, getCurrentInstance, computed, onMounted, watch, provide } from 'vue';
const { proxy } = getCurrentInstance();

const emit = defineEmits(['change', 'input', 'update:modelValue']);

const props = defineProps({
	// 标识符
	name: {
		type: String,
		default: ''
	},
	// 绑定的值（已废弃，但保留向后兼容）
	value: {
		type: Array,
		default: () => []
	},
	// v-model绑定的值
	modelValue: {
		type: Array,
		default: () => []
	},
	// 形状，circle-圆形，square-方形
	shape: {
		type: String,
		default: 'square'
	},
	// 是否禁用全部checkbox
	disabled: {
		type: Boolean,
		default: false
	},
	// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
	activeColor: {
		type: String,
		default: '#2979ff'
	},
	// 未选中的颜色
	inactiveColor: {
		type: String,
		default: '#c8c9cc'
	},
	// 整个组件的尺寸，默认rpx
	size: {
		type: [String, Number],
		default: '36rpx'
	},
	// 布局方式，row-横向，column-纵向
	placement: {
		type: String,
		default: 'row'
	},
	// label的字体大小，rpx单位
	labelSize: {
		type: [String, Number],
		default: '28rpx'
	},
	// label的字体颜色
	labelColor: {
		type: [String],
		default: '#303133'
	},
	// 是否禁止点击文本操作
	labelDisabled: {
		type: Boolean,
		default: false
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	// 图标的大小，单位rpx
	iconSize: {
		type: [String, Number],
		default: '24rpx'
	},
	// 勾选图标的对齐方式，left-左边，right-右边
	iconPlacement: {
		type: String,
		default: 'left'
	},
	// 竖向配列时，是否显示下边框
	borderBottom: {
		type: Boolean,
		default: false
	},
	// 可被勾选的checkbox的最小数量
	min: {
		type: Number,
		default: 0
	},
	// 可被勾选的checkbox的最大数量
	max: {
		type: Number,
		default: Infinity
	},
	// 是否触发表单校验
	validateEvent: {
		type: Boolean,
		default: true
	},
	// 复选框组元素标签
	tag: {
		type: String,
		default: 'view'
	},
	// 当按钮为活跃状态时的字体颜色
	textColor: {
		type: String,
		default: '#ffffff'
	},
	// 当按钮为活跃状态时的边框和背景颜色
	fill: {
		type: String,
		default: '#2979ff'
	}
});

// 子组件引用集合
const children = ref([]);

// 获取实际绑定的值（兼容v-model和value）
const checkboxValue = computed(() => {
	return props.modelValue.length > 0 ? props.modelValue : props.value;
});

// 当前组件样式类
const bemClass = computed(() => {
	return {
		'zx-checkbox-group--row': props.placement === 'row',
		'zx-checkbox-group--column': props.placement === 'column'
	};
});

// 这里computed的变量，都是子组件zx-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
// 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(zx-checkbox-group)
// 拉取父组件新的变化后的参数
const parentData = computed(() => {
	return {
		value: checkboxValue.value,
		disabled: props.disabled,
		inactiveColor: props.inactiveColor,
		activeColor: props.activeColor,
		size: props.size,
		labelDisabled: props.labelDisabled,
		shape: props.shape,
		iconSize: props.iconSize,
		iconColor: props.iconColor,
		placement: props.placement,
		borderBottom: props.borderBottom,
		iconPlacement: props.iconPlacement,
		labelSize: props.labelSize,
		labelColor: props.labelColor,
		textColor: props.textColor,
		fill: props.fill
	};
});

// 提供给子组件的方法和数据
provide('checkboxGroup', {
	props: parentData,
	modelValue: checkboxValue,
	addChild: (child) => {
		if (child) {
			children.value.push(child);
		}
	},
	removeChild: (child) => {
		const index = children.value.findIndex(item => item === child);
		if (index !== -1) {
			children.value.splice(index, 1);
		}
	}
});

// 更新选中的值
const updateValue = (values) => {
	emit('change', values);
	emit('input', values); // 兼容旧版API
	emit('update:modelValue', values);

	// 触发表单校验
	if (props.validateEvent) {
		formValidate();
	}
};

// 当子组件值变化时的处理函数
const handleValueChange = (child, checked) => {
	// 检查最小、最大值限制
	if (!checked) {
		// 如果是取消选中且当前选中数量已经达到最小值，则不允许取消
		if (checkboxValue.value.length <= props.min) {
			// 恢复选中状态
			child.isChecked = true;
			return;
		}
	} else {
		// 如果是选中且当前选中数量已经达到最大值，则不允许选中
		if (props.max !== Infinity && checkboxValue.value.length >= props.max) {
			// 取消选中状态
			child.isChecked = false;
			return;
		}
	}

	const values = [];
	children.value.forEach(item => {
		if (item.isChecked) {
			values.push(item.name || item.value);
		}
	});

	updateValue(values);
};

// 表单校验
const formValidate = () => {
	const formItem = getParent('zx-form-item');
	const form = getParent('zx-form');
	if (formItem && form) {
		form.validateField(formItem.prop, () => {}, 'change');
	}
};

// 获取父组件
const getParent = (name) => {
	let parent = proxy.$parent;
	while (parent) {
		if (parent.$options && parent.$options.name === name) {
			return parent;
		}
		parent = parent.$parent;
	}
	return null;
};

// 注册子组件
const registerChildren = (child) => {
	if (child) {
		children.value.push(child);
	}
};

// 将其他的checkbox设置为未选中的状态
const unCheckedOther = (childInstance) => {
	const values = [];
	children.value.forEach(child => {
		// 将被选中的checkbox，放到数组中返回
		if (child.isChecked) {
			values.push(child.name || child.value);
		}
	});
	
	updateValue(values);
};

// 导出方法给子组件使用
defineExpose({
	name: 'zx-checkbox-group',
	unCheckedOther,
	registerChildren,
	handleValueChange,
	children: children.value,
	...parentData.value
});
</script>

<style lang="scss" scoped>
.zx-checkbox-group {
	&--row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	&--column {
		display: flex;
		flex-direction: column;
		
		> .zx-checkbox {
			margin-bottom: 10rpx;
			
			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
