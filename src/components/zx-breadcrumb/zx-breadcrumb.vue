<template>
	<view class="zx-breadcrumb" :class="[
		`zx-breadcrumb--${size}`,
		disabled && 'zx-breadcrumb--disabled'
	]">
		<slot></slot>
	</view>
</template>

<script setup>
/**
 * Breadcrumb 面包屑
 * @description 显示当前页面的路径，快速返回之前的任意页面
 * @property {String}			separator			分隔符 （默认 '/' ）
 * @property {String}			separatorIcon		图标分隔符名称，使用 zx-icon 组件的 name 属性值
 * @property {String}			size				面包屑尺寸：large、default、small （默认 'default' ）
 * @property {Boolean}			disabled			是否禁用整个面包屑 （默认 false ）
 * @property {String}			color				文字颜色
 * @property {String}			activeColor			当前页面颜色
 * @property {String}			separatorColor		分隔符颜色
 * @example <zx-breadcrumb separator="/"><zx-breadcrumb-item to="/">首页</zx-breadcrumb-item></zx-breadcrumb>
 * @example <zx-breadcrumb separator-icon="arrow-right"><zx-breadcrumb-item to="/">首页</zx-breadcrumb-item></zx-breadcrumb>
 */
import { provide, onBeforeMount, onMounted, getCurrentInstance, ref, computed } from 'vue';

const props = defineProps({
	// 分隔符
	separator: {
		type: String,
		default: '/'
	},
	// 图标分隔符
	separatorIcon: {
		type: String,
		default: ''
	},
	// 尺寸 
	size: {
		type: String,
		default: 'default',
		validator: (value) => ['large', 'default', 'small'].includes(value)
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 文字颜色
	color: {
		type: String,
		default: ''
	},
	// 当前页面颜色
	activeColor: {
		type: String,
		default: ''
	},
	// 分隔符颜色
	separatorColor: {
		type: String,
		default: ''
	}
});

// 子组件列表
const items = ref([]);

// 面包屑配置
const breadcrumbConfig = computed(() => {
	return {
		separator: props.separator,
		separatorIcon: props.separatorIcon,
		size: props.size,
		disabled: props.disabled,
		color: props.color,
		activeColor: props.activeColor,
		separatorColor: props.separatorColor
	};
});

// 向子组件提供配置
provide('breadcrumbConfig', breadcrumbConfig.value);

// 添加子组件到列表
const addItem = (item) => {
	items.value.push(item);
	updateItems();
};

// 从列表中移除子组件
const removeItem = (item) => {
	const index = items.value.indexOf(item);
	if (index !== -1) {
		items.value.splice(index, 1);
	}
	updateItems();
};

// 更新子组件布局
const updateItems = () => {
	const itemsArr = items.value;
	if (itemsArr.length === 0) return;
	
	// 设置最后一个元素的标志
	const lastIndex = itemsArr.length - 1;
	itemsArr.forEach((item, index) => {
		if (item && typeof item.setLast === 'function') {
			item.setLast(index !== lastIndex);
		}
	});
};

// 向子组件暴露方法
defineExpose({
	addItem,
	removeItem
});
</script>

<style lang="scss" scoped>
.zx-breadcrumb {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	font-size: 14px;
	line-height: 1;

	&--disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	&--small {
		font-size: 12px;
	}

	&--default {
		font-size: 14px;
	}

	&--large {
		font-size: 16px;
	}
}
</style>
