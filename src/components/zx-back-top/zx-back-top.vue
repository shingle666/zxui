<template>
	<view v-if="isShow" :class="['zx-back-top', showAnimation]" hover-class="zx-hover" :style="[contentStyle]" @click.stop="backToTop">
		<slot>
			<text class="back-top" :class="iconName" :style="{ fontSize: iconSize, color: iconColor }"></text>
		</slot>
	</view>
</template>

<script setup>
/**
 * backTop 返回顶部
 * @description 返回顶部按钮，方便快速返回顶部的场景。
 * @tutorial https://zxui.org/components/backTop
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形 （默认 circle）
 * @property {String} 			iconName 	自定义图标 （默认 arrow-up）
 * @property {String | Number}  duration	返回顶部滚动时间 （默认 300）
 * @property {String | Number}  scrollTop	滚动距离 （默认 0）
 * @property {String | Number}  top  		距离顶部多少距离显示，单位px （默认 100）
 * @property {String | Number}  bottom  	返回顶部按钮到底部的距离 （默认 100rpx）
 * @property {String | Number}  right  		返回顶部按钮到右边的距离 （默认 50rpx）
 * @property {String | Number}  left  		返回顶部按钮到左边的距离
 * @property {String | Number}  zIndex 		层级 （默认 9999）
 * @property {String}           position     位置，可选值为 right、left （默认 right）
 * @property {String}           animation    动画效果，可选值为 fade、slide、scale （默认 fade）
 * @property {Boolean}          isVibrate    点击时是否震动反馈 （默认 false）
 * @property {String}           customClass  自定义类名
 * @event {Function}            onClick      点击按钮时触发
 * @event {Function}            onShow       按钮显示时触发
 * @event {Function}            onHide       按钮隐藏时触发
 * @example <zx-back-top :scrollTop="scrollTop"></zx-back-top>
 */

import { ref, getCurrentInstance, computed, watch } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 组件层级
	zIndex: {
		type: Number,
		default: 9999
	},
	// 返回顶部的形状，circle-圆形，square-方形
	mode: {
		type: String,
		default: 'circle'
	},
	// 背景色
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	// 组件大小
	size: {
		type: String,
		default: '90rpx'
	},
	// 返回顶部滚动时间
	duration: {
		type: Number,
		default: 300
	},
	// 滚动距离
	scrollTop: {
		type: Number,
		default: 0
	},
	// 距离顶部多少距离显示
	top: {
		type: Number,
		default: 100
	},
	// 返回顶部按钮到底部的距离
	bottom: {
		type: String,
		default: '100rpx'
	},
	// 返回顶部按钮到右边的距离
	right: {
		type: String,
		default: '50rpx'
	},
	// 返回顶部按钮到左边的距离
	left: {
		type: String,
		default: ''
	},
	// 位置，可选值为 right、left
	position: {
		type: String,
		default: 'right'
	},
	// 图标名称
	iconName: {
		type: String,
		default: 'arrow-up'
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#999999'
	},
	// 图标大小
	iconSize: {
		type: String,
		default: '50rpx'
	},
	// 动画效果，可选值为 fade、slide、scale
	animation: {
		type: String,
		default: 'fade'
	},
	// 点击时是否震动反馈
	isVibrate: {
		type: Boolean,
		default: false
	},
	// 自定义类名
	customClass: {
		type: String,
		default: ''
	}
});

const emit = defineEmits(['onClick', 'onShow', 'onHide']);
const isShow = ref(false);
const showAnimation = computed(() => {
	const animations = {
		fade: 'zx-fade-in',
		slide: 'zx-slide-in',
		scale: 'zx-scale-in'
	};
	
	return [animations[props.animation] || 'zx-fade-in', props.customClass].filter(Boolean);
});

// 监听滚动并防抖处理
let timer = null;
watch(
	() => props.scrollTop,
	(val) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const oldShow = isShow.value;
			isShow.value = val > props.top;
			
			// 触发显示/隐藏事件
			if (!oldShow && isShow.value) {
				emit('onShow');
			} else if (oldShow && !isShow.value) {
				emit('onHide');
			}
		}, 100);
	},
	{
		immediate: true
	}
);

// 内容样式
const contentStyle = computed(() => {
	let styles = {
		position: 'fixed',
		bottom: props.bottom,
		width: props.size,
		height: props.size,
		zIndex: props.zIndex,
		backgroundColor: props.backgroundColor
	};
	
	// 设置位置
	if (props.position === 'left' || props.left) {
		styles.left = props.left || '50rpx';
	} else {
		styles.right = props.right;
	}
	
	let radius = 0;
	// 是否圆形
	if (props.mode === 'circle') {
		radius = '50%';
	} else {
		radius = '10rpx';
	}
	styles.borderRadius = radius;
	
	return styles;
});

// 返回顶部
const backToTop = () => {
	// 震动反馈
	if (props.isVibrate) {
		uni.vibrateShort();
	}
	
	uni.pageScrollTo({
		scrollTop: 0,
		duration: props.duration
	});
	
	emit('onClick');
};
</script>

<style scoped>
@font-face {
	font-family: 'back-top';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}

.back-top {
	font-family: 'back-top' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.dingbu:before {
	content: '\e64b';
}

.rocket:before {
	content: '\e633';
}

.top:before {
	content: '\e60f';
}

.arrow-up:before {
	content: '\e62b';
}

.zx-back-top {
	flex: 1;
	height: 100%;
	box-shadow: 0px 0px 10px rgba(191, 191, 191, 0.8);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.zx-hover {
	opacity: 0.88;
	transform: translateY(-3px);
	transition: all 0.2s ease;
}

/* 淡入动画 */
.zx-fade-in {
	animation: zx-fade-in 300ms ease-in forwards;
}
@keyframes zx-fade-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

/* 滑入动画 */
.zx-slide-in {
	animation: zx-slide-in 300ms ease-out forwards;
}
@keyframes zx-slide-in {
	0% {
		opacity: 0;
		transform: translateY(30px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

/* 缩放动画 */
.zx-scale-in {
	animation: zx-scale-in 300ms ease-out forwards;
}
@keyframes zx-scale-in {
	0% {
		opacity: 0;
		transform: scale(0.5);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}
</style>
