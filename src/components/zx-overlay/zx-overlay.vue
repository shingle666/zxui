<template>
	<zx-transition 
		:show="show" 
		custom-class="zx-overlay" 
		:duration="duration" 
		:mode="mode"
		:custom-style="overlayStyle" 
		@click="clickHandler"
		@afterEnter="afterEnterHandler"
		@afterLeave="afterLeaveHandler"
	>
		<slot></slot>
	</zx-transition>
</template>

<script setup>
/**
 * overlay 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @tutorial https://zxui.org/components/overlay
 * @property {Boolean}			show				是否显示遮罩（默认 false ）
 * @property {String | Number}	zIndex				zIndex 层级（默认 10070 ）
 * @property {String | Number}	duration			动画时长，单位毫秒（默认 500 ）
 * @property {String | Number}	opacity				不透明度值，当做rgba的第四个参数 （默认 0.5 ）
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭（默认 true ）
 * @property {Boolean}			lockScroll			是否锁定背景滚动（默认 true ）
 * @property {String}			mode				动画模式（默认 fade ）
 * @event {Function} click 点击遮罩发送事件
 * @event {Function} open  遮罩打开动画结束时触发
 * @event {Function} close 遮罩关闭动画结束时触发
 * @example <zx-overlay :show="show" @click="show = false"></zx-overlay>
 */
import { computed, watch, nextTick } from 'vue';

// 定义属性
const props = defineProps({
	// 是否显示遮罩
	show: {
		type: Boolean,
		default: false
	},
	// 层级z-index
	zIndex: {
		type: [String, Number],
		default: 10070
	},
	// 遮罩的过渡时间，单位为ms
	duration: {
		type: [String, Number],
		default: 500
	},
	// 不透明度值，当做rgba的第四个参数
	opacity: {
		type: [String, Number],
		default: 0.5
	},
	// 点击遮罩是否关闭
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 是否锁定背景滚动
	lockScroll: {
		type: Boolean,
		default: true
	},
	// 动画模式
	mode: {
		type: String,
		default: 'fade'
	}
});

// 定义事件
const emits = defineEmits(['click', 'open', 'close']);

// 锁定/解锁背景滚动
let originalOverflow = '';
const lockScrollHandler = (lock) => {
	// 只在H5环境下生效
	// #ifdef H5
	if (lock) {
		originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = originalOverflow;
	}
	// #endif
};

// 监听show属性变化
watch(() => props.show, (newVal) => {
	if (props.lockScroll) {
		nextTick(() => {
			lockScrollHandler(newVal);
		});
	}
}, { immediate: true });

// 计算样式
const overlayStyle = computed(() => ({
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	width: '100%',
	height: '100%',
	zIndex: props.zIndex,
	backgroundColor: `rgba(0, 0, 0, ${props.opacity})`
}));

// 点击处理函数
const clickHandler = () => {
	emits('click');
	if (props.closeOnClickOverlay) {
		emits('close');
	}
};

// 进入动画结束
const afterEnterHandler = () => {
	emits('open');
};

// 离开动画结束
const afterLeaveHandler = () => {
	emits('close');
};
</script>

<style lang="scss" scoped>
/**
 * zx-overlay 样式
 * 提供基础遮罩层样式
 */
.zx-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	
	// 确保内容可以居中显示
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	// 确保子内容正常显示
	&__content {
		position: relative;
		z-index: 1;
	}
}
</style>
