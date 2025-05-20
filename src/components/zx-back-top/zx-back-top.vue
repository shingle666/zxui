<template>
	<view v-if="isShow" class="zx-back-top zx-fade-in" hover-class="zx-hover" :style="[contentStyle]" @click.stop="backToTop">
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
 * @property {String}			mode  		返回顶部的形状，circle-圆形，square-方形
 * @property {String} 			iconName 	自定义图标
 * @property {String | Number}  duration	返回顶部滚动时间 （默认 100）
 * @property {String | Number}  scrollTop	滚动距离 （默认 0 ）
 * @property {String | Number}  top  		距离顶部多少距离显示，单位px （默认 400 ）
 * @property {String | Number}  bottom  	返回顶部按钮到底部的距离，单位px （默认 100 ）
 * @property {String | Number}  right  		返回顶部按钮到右边的距离，单位px （默认 20 ）
 * @property {String | Number}  zIndex 		层级   （默认 9999 ）
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
	}
});

const isShow = ref(false);

watch(
	() => props.scrollTop,
	(val) => {
		isShow.value = false;
		if (val > props.top) {
			isShow.value = true;
		}
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
		right: props.right,
		width: props.size,
		height: props.size,
		zIndex: props.zIndex,
		backgroundColor: props.backgroundColor
	};
	let radius = 0;
	// 是否圆形
	if (props.mode === 'circle') {
		radius = '50%';
	} else {
		radius = '10rpx';
	}
	styles.borderTopLeftRadius = radius;
	styles.borderTopRightRadius = radius;
	styles.borderBottomLeftRadius = radius;
	styles.borderBottomRightRadius = radius;
	return styles;
});
// 返回顶部
const backToTop = () => {
	uni.pageScrollTo({
		scrollTop: 0,
		duration: props.duration
	});
	proxy.$emit('onClick');
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
	box-shadow: 0px 0px 10px #bfbfbf;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.zx-hover {
	opacity: 0.88;
}
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
</style>
