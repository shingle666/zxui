<template>
	<view :class="classIn" :hover-class="hoverClass" :style="styleIn">
		<slot></slot>
	</view>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
	// 自定义行内样式
	customStyle: {
		type: String,
		default: ''
	},
	// 自定义样式
	customClass: {
		type: [String, Array],
		default: () => []
	},
	// 点击样式
	hoverClass: {
		type: String,
		default: ''
	},
	// 主轴方向
	direction: {
		type: String,
		default: 'column'
	},
	// 换行
	wrap: {
		type: Boolean,
		default: true
	},
	justifyContent: {
		type: String,
		default: ''
	},
	alignItems: {
		type: String,
		default: ''
	}
});

// 处理 customClass 支持字符串和数组
const customClassArray = computed(() => {
	if (typeof props.customClass === 'string') {
		return props.customClass.split(' ').filter(Boolean);
	}
	return Array.isArray(props.customClass) ? props.customClass : [];
});

const classIn = computed(() => {
	let customClassData = ['zx-flex-box', 'zx-flex'];
	if (props.direction === 'column') {
		customClassData.push('zx-column');
	} else {
		customClassData.push('zx-row');
	}
	if (props.direction === 'row') {
		if (props.wrap) {
			customClassData.push('zx-wrap');
		} else {
			customClassData.push('zx-nowrap');
		}
	}
	customClassData = customClassData.concat(customClassArray.value);
	return customClassData;
});

const styleIn = computed(() => {
	let styleStr = props.customStyle ? props.customStyle + ';' : '';
	if (props.justifyContent) {
		styleStr += `justify-content:${props.justifyContent};`;
	}
	if (props.alignItems) {
		styleStr += `align-items:${props.alignItems};`;
	}
	return styleStr;
});

</script>
<style scoped>
.zx-flex-box {
	display: flex;
	box-sizing: border-box;
}
.zx-flex {
	/* 可扩展基础样式 */
}
.zx-row {
	flex-direction: row;
}
.zx-column {
	flex-direction: column;
}
.zx-wrap {
	flex-wrap: wrap;
}
.zx-nowrap {
	flex-wrap: nowrap;
}
</style>
