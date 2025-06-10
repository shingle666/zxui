<template>
	<view v-if="show" class="zx-loading-icon" :class="[vertical && 'zx-loading-icon--vertical']">
		<view v-if="!webviewHide" class="zx-loading-icon__spinner" :class="[`zx-loading-icon__spinner--${mode}`]"
			ref="ani" :style="{
				color: color,
				width: size,
				height: size,
				borderTopColor: color,
				borderBottomColor: otherBorderColor,
				borderLeftColor: otherBorderColor,
				borderRightColor: otherBorderColor,
				'animation-duration': `${duration}ms`,
				'animation-timing-function': mode === 'semicircle' || mode === 'circle' ? timingFunction : '',
				'animation-play-state': webviewHide ? 'paused' : 'running'
			}">
			<block v-if="mode === 'spinner'">
				<view v-for="(item, index) in array12" :key="index" class="zx-loading-icon__dot"></view>
			</block>
		</view>
		<text v-if="text" class="zx-loading-icon__text" :style="{ fontSize: textSize, color: textColor }">
			{{ text }}
		</text>
	</view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';


/**
 * loading 加载动画
 * @description 警此组件为一个小动画，目前用在loadmore加载更多和switch开关等组件的正在加载状态场景。
 * @tutorial https://zxui.org/components/loading-icon
 * @property {Boolean}			show			是否显示组件  (默认 true)
 * @property {String}			color			动画活动区域的颜色，只对 mode = flower 模式有效
 * @property {String}			textColor		提示文本的颜色
 * @property {Boolean}			vertical		文字和图标是否垂直排列 (默认 false )
 * @property {String}			mode			模式选择，见官网说明（默认 'circle' ）
 * @property {String | Number}	size			加载图标的大小，单位px （默认 24 ）
 * @property {String | Number}	textSize		文字大小（默认 15 ）
 * @property {String | Number}	text			文字内容
 * @property {String}			timingFunction	动画模式 （默认 'ease-in-out' ）
 * @property {String | Number}	duration		动画执行周期时间（默认 1200）
 * @property {String}			inactiveColor	mode=circle时的暗边颜色
 * @example <zx-loading-icon mode="circle"></zx-loading-icon>
 */

// defineProps替代props选项
const props = defineProps({
	// 是否显示组件
	show: {
		type: Boolean,
		default: true
	},
	// 颜色
	color: {
		type: String,
		default: '#ffffff'
	},
	// 提示文字颜色
	textColor: {
		type: String,
		default: '#909193'
	},
	// 文字和图标是否垂直排列
	vertical: {
		type: Boolean,
		default: false
	},
	// 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
	mode: {
		type: String,
		default: 'circle'
	},
	// 图标大小，单位默认px
	size: {
		type: [String, Number],
		default: '60rpx'
	},
	// 文字大小
	textSize: {
		type: [String, Number],
		default: '30rpx'
	},
	// 文字内容
	text: {
		type: [String, Number],
		default: ''
	},
	// 动画模式
	timingFunction: {
		type: String,
		default: 'ease-in-out'
	},
	// 动画执行周期时间
	duration: {
		type: [String, Number],
		default: 1200
	},
	// mode=circle时的暗边颜色
	inactiveColor: {
		type: String,
		default: 'transparent'
	}
});

// data转换为ref
const ani = ref(null);
const array12 = ref(Array.from({ length: 12 }));
const webviewHide = ref(false); // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗

// 颜色处理工具函数
const colorGradient = (startColor, endColor, step) => {
	// 将hex转rgb
	const hexToRgb = (hex) => {
		hex = hex.replace("#", "");
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		return [r, g, b];
	};

	// 将rgb转hex
	const rgbToHex = (r, g, b) => {
		const hex = ((r << 16) | (g << 8) | b).toString(16);
		return "#" + new Array(Math.abs(hex.length - 7)).join("0") + hex;
	};

	// 当开始颜色和结束颜色相同时，返回相同颜色
	if (startColor === endColor) {
		return Array(step).fill(startColor);
	}

	// 将起始颜色和结束颜色转为rgb
	const startRgb = hexToRgb(startColor);
	const endRgb = hexToRgb(endColor);

	// 计算差值
	const rStep = (endRgb[0] - startRgb[0]) / (step - 1);
	const gStep = (endRgb[1] - startRgb[1]) / (step - 1);
	const bStep = (endRgb[2] - startRgb[2]) / (step - 1);

	// 创建结果数组
	const colorArr = [];
	for (let i = 0; i < step; i++) {
		const r = Math.round(startRgb[0] + rStep * i);
		const g = Math.round(startRgb[1] + gStep * i);
		const b = Math.round(startRgb[2] + bStep * i);
		colorArr.push(rgbToHex(r, g, b));
	}
	return colorArr;
};

// 计算otherBorderColor
const otherBorderColor = computed(() => {
	// 添加colorGradient实现
	if (props.mode === 'circle') {
		if (props.inactiveColor !== 'transparent') {
			return props.inactiveColor;
		} else {
			// 使用淡化版的主颜色作为非活动颜色
			const lightColor = colorGradient(props.color, '#ffffff', 100)[80];
			return lightColor;
		}
	} else {
		return 'transparent';
	}
});

// 生命周期方法
onMounted(() => {
	init();
});

// 初始化方法
function init() {
	setTimeout(() => {
		// #ifdef APP-PLUS
		props.show && addEventListenerToWebview();
		// #endif
	}, 20);
}

// 监听webview的显示与隐藏
function addEventListenerToWebview() {
	// webview的堆栈
	const pages = getCurrentPages();
	// 当前页面
	const page = pages[pages.length - 1];
	// 当前页面的webview实例
	const currentWebview = page.$getAppWebview();
	// 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
	currentWebview.addEventListener('hide', () => {
		webviewHide.value = true;
	});
	currentWebview.addEventListener('show', () => {
		webviewHide.value = false;
	});
}

</script>

<style lang="scss" scoped>
.zx-loading-icon {
	flex-direction: row;
	align-items: center;
	justify-content: center;
	color: #ffffff;

	&__text {
		margin-left: 10rpx;
		color: #606266;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	&__spinner {
		width: 60rpx;
		height: 60rpx;
		position: relative;
		box-sizing: border-box;
		max-width: 100%;
		max-height: 100%;
		animation: zx-rotate 1s linear infinite;
	}

	&__spinner--semicircle {
		border-width: 5rpx;
		border-color: transparent;
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		border-style: solid;
	}

	&__spinner--circle {
		border-top-right-radius: 50%;
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;
		border-bottom-right-radius: 50%;
		border-width: 5rpx;
		border-top-color: currentColor;
		border-right-color: currentColor;
		border-bottom-color: currentColor;
		border-left-color: currentColor;
		border-style: solid;
		opacity: 0.8;
	}

	&--vertical {
		flex-direction: column;
	}
}

:host {
	font-size: 0px;
	line-height: 1;
}

.zx-loading-icon {
	&__spinner--spinner {
		animation-timing-function: steps(12);
	}

	&__text:empty {
		display: none;
	}

	&--vertical &__text {
		margin: 15rpx 0 0;
		color: #606266;
	}

	&__dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		&:before {
			display: block;
			width: 5rpx;
			height: 25%;
			margin: 0 auto;
			background-color: currentColor;
			border-radius: 40%;
			content: ' ';
		}
	}
}

@for $i from 1 through 12 {
	.zx-loading-icon__dot:nth-of-type(#{$i}) {
		transform: rotate($i * 30deg);
		opacity: 1 - 0.0625 * ($i - 1);
	}
}

@keyframes zx-rotate {
	0% {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(1turn);
	}
}
</style>
