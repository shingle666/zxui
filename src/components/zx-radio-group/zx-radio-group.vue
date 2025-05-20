<template>
	<view
	    class="u-radio-group"
	    :class="bemClass"
	>
		<slot></slot>
	</view>
</template>

<script setup>
	import { computed, ref, watch, provide, onBeforeMount } from 'vue';
	import props from './props.js';
	
	/**
	 * radioRroup 单选框父组件
	 * @description 单选框用于有一个选择，用户只能选择其中一个的场景。搭配u-radio使用
	 * @tutorial https://zxui.org/components/radio
	 * @property {String | Number | Boolean}	modelValue 		绑定的值
	 * @property {Boolean}						disabled		是否禁用所有radio（默认 false ）
	 * @property {String}						shape			外观形状，shape-方形，circle-圆形(默认 circle )
	 * @property {String}						activeColor		选中时的颜色，应用到所有子Radio组件（默认 '#2979ff' ）
	 * @property {String}						inactiveColor	未选中的颜色 (默认 '#c8c9cc' )
	 * @property {String}						name			标识符
	 * @property {String | Number}				size			组件整体的大小，单位px（默认 18 ）
	 * @property {String}						placement		布局方式，row-横向，column-纵向 （默认 'row' ）
	 * @property {String}						label			文本
	 * @property {String}						labelColor		label的颜色 （默认 '#303133' ）
	 * @property {String | Number}				labelSize		label的字体大小，px单位 （默认 14 ）
	 * @property {Boolean}						labelDisabled	是否禁止点击文本操作checkbox(默认 false )
	 * @property {String}						iconColor		图标颜色 （默认 '#ffffff' ）
	 * @property {String | Number}				iconSize		图标的大小，单位px （默认 12 ）
	 * @property {Boolean}						borderBottom	placement为row时，是否显示下边框 （默认 false ）
	 * @property {String}						iconPlacement	图标与文字的对齐方式 （默认 'left' ）
     * @property {Object}						customStyle		组件的样式，对象形式
	 * @event {Function} change 任一个radio状态发生变化时触发
	 * @example <u-radio-group v-model="value"></u-radio-group>
	 */
	
	// 使用defineProps定义属性，替代原来的props选项
	const props = defineProps({
		// 绑定的值 (注意: Vue 3中v-model默认绑定到modelValue)
		modelValue: {
			type: [String, Number, Boolean],
			default: uni.$u.props.radioGroup.value
		},
		// 是否禁用全部radio
		disabled: {
			type: Boolean,
			default: uni.$u.props.radioGroup.disabled
		},
		// 形状，circle-圆形，square-方形
		shape: {
			type: String,
			default: uni.$u.props.radioGroup.shape
		},
		// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
		activeColor: {
			type: String,
			default: uni.$u.props.radioGroup.activeColor
		},
		// 未选中的颜色
		inactiveColor: {
			type: String,
			default: uni.$u.props.radioGroup.inactiveColor
		},
		// 标识符
		name: {
			type: String,
			default: uni.$u.props.radioGroup.name
		},
		// 整个组件的尺寸，默认px
		size: {
			type: [String, Number],
			default: uni.$u.props.radioGroup.size
		},
		// 布局方式，row-横向，column-纵向
		placement: {
			type: String,
			default: uni.$u.props.radioGroup.placement
		},
		// label的文本
		label: {
			type: [String],
			default: uni.$u.props.radioGroup.label
		},
		// label的颜色 （默认 '#303133' ）
		labelColor: {
			type: [String],
			default: uni.$u.props.radioGroup.labelColor
		},
		// label的字体大小，px单位
		labelSize: {
			type: [String, Number],
			default: uni.$u.props.radioGroup.labelSize
		},
		// 是否禁止点击文本操作checkbox(默认 false )
		labelDisabled: {
			type: Boolean,
			default: uni.$u.props.radioGroup.labelDisabled
		},
		// 图标颜色
		iconColor: {
			type: String,
			default: uni.$u.props.radioGroup.iconColor
		},
		// 图标的大小，单位px
		iconSize: {
			type: [String, Number],
			default: uni.$u.props.radioGroup.iconSize
		},
		// 竖向配列时，是否显示下划线
		borderBottom: {
			type: Boolean,
			default: uni.$u.props.radioGroup.borderBottom
		},
		// 图标与文字的对齐方式
		iconPlacement: {
			type: String,
			default: uni.$u.props.radio.iconPlacement
		},
		// 组件的样式，对象形式
		customStyle: {
			type: Object,
			default: () => ({})
		}
	});
	
	// 使用defineEmits定义事件
	const emit = defineEmits(['update:modelValue', 'change']);
	
	// 子组件列表
	const children = ref([]);
	
	// 父组件数据，用于传递给子组件
	const parentData = computed(() => {
		return [
			props.modelValue,
			props.disabled,
			props.inactiveColor,
			props.activeColor,
			props.size,
			props.labelDisabled,
			props.shape,
			props.iconSize,
			props.borderBottom,
			props.placement
		];
	});
	
	// 使用uni.$u.bem方法处理类名
	const bemClass = computed(() => {
		return uni.$u.bem('radio-group', ['placement'], {
			placement: props.placement
		});
	});
	
	// 监听parentData变化，通知子组件更新
	watch(parentData, () => {
		if (children.value.length) {
			children.value.forEach(child => {
				typeof child.init === 'function' && child.init();
			});
		}
	});
	
	// 将其他的radio设置为未选中状态
	const unCheckedOther = (childInstance) => {
		children.value.forEach(child => {
			// 所有子radio中，被操作组件实例的checked的值无需修改
			if (childInstance !== child) {
				child.checked = false;
			}
		});
		
		const { name } = childInstance;
		// Vue 3中v-model默认绑定到modelValue，需要发出update:modelValue事件
		emit('update:modelValue', name);
		// 发出change事件
		emit('change', name);
	};
	
	// 提供方法和数据给子组件
	provide('radioGroup', {
		unCheckedOther,
		registerChild: (child) => {
			children.value.push(child);
		},
		unregisterChild: (child) => {
			const index = children.value.indexOf(child);
			if (index !== -1) {
				children.value.splice(index, 1);
			}
		},
		parentData,
		modelValue: computed(() => props.modelValue)
	});
	
	// 组件挂载前初始化children数组
	onBeforeMount(() => {
		children.value = [];
	});
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-radio-group {
		flex: 1;

		&--row {
			@include flex;
		}

		&--column {
			@include flex(column);
		}
	}
</style>
