<template>
	<view class="zx-line" :style="lineStyle"></view>
</template>

<script setup>
/**
 * line 线条
 * @description 此组件一般用于显示一根线条，用于分隔内容块，有横向和竖向两种模式
 * @tutorial https://zxui.org/components/line
 * @property {String}			color		线条的颜色 ( 默认 '#d6d7d9' )
 * @property {String | Number}	length		长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 ( 默认 '100%' )
 * @property {String}			direction	线条的方向，row-横向，col-竖向 (默认 'row' )
 * @property {Boolean}			hairline	是否显示细线条 (默认 true )
 * @property {String | Number}	margin		线条与上下左右元素的间距，字符串形式，如"30px"  (默认 0 )
 * @property {Boolean}			dashed		是否虚线，true-虚线，false-实线 (默认 false )
 * @property {String | Number}	width		线条的粗细，带单位的值，如"2px" (默认 '1px')
 * @property {String | Number}	radius		线条的圆角，带单位的值，如"3px" (默认 0 )
 * @property {String}			borderStyle	线条的样式，可选值为 solid、dashed、dotted (默认 'solid')
 * @property {Boolean}			animation	是否有过渡动画效果 (默认 false)
 * @example <zx-line color="red"></zx-line>
 * @example <zx-line direction="col" length="100px" color="#2979ff"></zx-line>
 * @example <zx-line dashed width="2px" radius="3px"></zx-line>
 * @example <zx-line color="linear-gradient(to right, #ff3366, #ff6633)" animation></zx-line>
 */

import { ref, computed } from 'vue';

const props = defineProps({
	color: {
		type: String,
		default: '#d6d7d9'
	},
	// 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
	length: {
		type: [String, Number],
		default: '100%'
	},
	// 线条方向，col-竖向，row-横向
	direction: {
		type: String,
		default: 'row'
	},
	// 是否显示细边框
	hairline: {
		type: Boolean,
		default: true
	},
	// 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px" < 上 右 下  左 >
	margin: {
		type: [String, Number],
		default: 0
	},
	// 是否虚线，true-虚线，false-实线
	dashed: {
		type: Boolean,
		default: false
	},
	// 线条粗细
	width: {
		type: [String, Number],
		default: '1px'
	},
	// 线条圆角
	radius: {
		type: [String, Number],
		default: 0
	},
	// 线条样式
	borderStyle: {
		type: String,
		default: 'solid'
	},
	// 是否有过渡动画效果
	animation: {
		type: Boolean,
		default: false
	}
});

const lineStyle = computed(() => {
	const style = {};
	style.margin = props.margin;
	
	// 设置线条宽度，转换为带单位的值
	const width = typeof props.width === 'number' ? `${props.width}px` : props.width;
	
	// 处理圆角
	if (props.radius) {
		style.borderRadius = typeof props.radius === 'number' ? `${props.radius}px` : props.radius;
	}
	
	// 过渡动画
	if (props.animation) {
		style.transition = 'all 0.3s ease';
	}
	
	// 使用borderStyle替代dashed属性，但保持向后兼容
	const borderStyle = props.dashed ? 'dashed' : props.borderStyle;
	
	// 如果是水平线条
	if (props.direction === 'row') {
		style.width = props.length;
		if (props.hairline) {
			style.height = '1px';
			style.transform = 'scaleY(0.5)';
			style.transformOrigin = '50% 100%';
		} else {
			style.height = width;
		}
		style.borderBottomWidth = props.hairline ? '1px' : 0;
		style.borderBottomStyle = borderStyle;
		style.backgroundColor = props.hairline ? 'transparent' : props.color;
	} else {
		// 如果是竖向线条
		style.height = props.length;
		if (props.hairline) {
			style.width = '1px';
			style.transform = 'scaleX(0.5)';
			style.transformOrigin = '100% 50%';
		} else {
			style.width = width;
		}
		style.borderLeftWidth = props.hairline ? '1px' : 0;
		style.borderLeftStyle = borderStyle;
		style.backgroundColor = props.hairline ? 'transparent' : props.color;
	}
	
	// 设置颜色
	if (props.hairline) {
		style.borderColor = props.color;
	} else {
		style.backgroundColor = props.color;
	}
	
	return style;
});
</script>

<style lang="scss" scoped>
.zx-line {
	/* #ifndef APP-NVUE */
	vertical-align: middle;
	display: inline-block;
	box-sizing: border-box;
	/* #endif */
}
</style>
