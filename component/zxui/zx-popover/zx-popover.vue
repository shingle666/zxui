<template>
	<view class="zx-popover">
		<!-- 使用zx-overlay作为弹窗背景遮罩 -->
		<zx-overlay
			v-if="overlay"
			:show="showPopover"
			@click="overlayClick"
			:opacity="0.1"
			:zIndex="zIndex - 1"
		></zx-overlay>
		
		<!-- 触发元素 -->
		<view 
			ref="referenceEl"
			class="zx-popover__reference"
			@click="handleClick"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
			@focus="handleFocus"
			@contextmenu="handleContextMenu"
		>
			<slot name="reference"></slot>
		</view>
		
		<!-- 弹出层内容 -->
		<zx-transition 
			:show="showPopover" 
			:mode="'fade'" 
			:duration="duration"
			@afterEnter="onAfterEnter"
			@afterLeave="onAfterLeave"
		>
			<view
				class="zx-popover__content"
				:class="[`zx-popover__content--${placement}`]"
				:style="[contentStyle]"
				@click.stop="noop"
				@mouseenter="handleContentEnter"
				@mouseleave="handleContentLeave"
			>
				<!-- 箭头 -->
				<view v-if="showArrow" class="zx-popover__arrow" :class="[`zx-popover__arrow--${placement}`]"></view>
				
				<!-- 标题 -->
				<view v-if="title" class="zx-popover__title">{{ title }}</view>
				
				<!-- 内容 -->
				<view class="zx-popover__body">
					<slot>{{ content }}</slot>
				</view>
			</view>
		</zx-transition>
	</view>
</template>

<script setup>
/**
 * popover 弹出框
 * @description 弹出框是在元素旁边显示浮层，支持不同的触发方式和位置
 * @property {Boolean}			show				是否展示弹出框 (默认 false )
 * @property {String}			trigger				触发方式，可选值：hover/click/focus/contextmenu/manual (默认 'hover' )
 * @property {String}			title				标题
 * @property {String}			content				显示的内容，也可以通过slot修改
 * @property {String}			placement			出现位置，可选值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end (默认 'top' )
 * @property {Boolean}			showArrow			是否显示箭头 (默认 true )
 * @property {Number|String}	width				宽度，单位rpx (默认 300 )
 * @property {Boolean}			disabled			是否禁用 (默认 false )
 * @property {Number|String}	offset				出现位置的偏移量 (默认 0 )
 * @property {Number|String}	zIndex				层级 (默认 10090 )
 * @property {Boolean}			closeOnClickOutside	点击外部是否关闭 (默认 true )
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭 (默认 true )
 * @property {Number|String}	showAfter			延迟出现，单位毫秒 (默认 0 )
 * @property {Number|String}	hideAfter			延迟消失，单位毫秒 (默认 200 )
 * @property {String}			effect				主题，可选值：dark/light (默认 'light' )
 * @property {Boolean}			overlay				是否显示遮罩 (默认 false )
 * @event {Function}			show				显示时触发
 * @event {Function}			hide				隐藏时触发
 * @event {Function}			beforeEnter			显示动画播放前触发
 * @event {Function}			afterEnter			显示动画播放完毕后触发
 * @event {Function}			beforeLeave			隐藏动画播放前触发
 * @event {Function}			afterLeave			隐藏动画播放完毕后触发
 * @example <zx-popover content="提示内容"><button>点击我</button></zx-popover>
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否展示弹出框
	show: {
		type: Boolean,
		default: false
	},
	// 触发方式
	trigger: {
		type: String,
		default: 'hover',
		validator: (value) => ['hover', 'click', 'focus', 'contextmenu', 'manual'].includes(value)
	},
	// 标题
	title: {
		type: String,
		default: ''
	},
	// 显示的内容
	content: {
		type: String,
		default: ''
	},
	// 出现位置
	placement: {
		type: String,
		default: 'top',
		validator: (value) => [
			'top', 'top-start', 'top-end',
			'bottom', 'bottom-start', 'bottom-end',
			'left', 'left-start', 'left-end',
			'right', 'right-start', 'right-end'
		].includes(value)
	},
	// 是否显示箭头
	showArrow: {
		type: Boolean,
		default: true
	},
	// 宽度
	width: {
		type: [Number, String],
		default: 300
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 出现位置的偏移量
	offset: {
		type: [Number, String],
		default: 0
	},
	// 层级
	zIndex: {
		type: [Number, String],
		default: 10090
	},
	// 点击外部是否关闭
	closeOnClickOutside: {
		type: Boolean,
		default: true
	},
	// 点击遮罩是否关闭
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 延迟出现，单位毫秒
	showAfter: {
		type: [Number, String],
		default: 0
	},
	// 延迟消失，单位毫秒
	hideAfter: {
		type: [Number, String],
		default: 200
	},
	// 主题
	effect: {
		type: String,
		default: 'light',
		validator: (value) => ['dark', 'light'].includes(value)
	},
	// 是否显示遮罩
	overlay: {
		type: Boolean,
		default: false
	},
	// 动画时长，单位ms
	duration: {
		type: [Number, String],
		default: 300
	}
});

const emits = defineEmits(['show', 'hide', 'beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave']);

// 引用元素
const referenceEl = ref(null);
// 是否显示popover
const showPopover = ref(false);
// 延时器ID
let showTimer = null;
let hideTimer = null;

// 监听show属性变化
watch(() => props.show, (val) => {
	if (props.trigger === 'manual') {
		val ? show() : hide();
	}
});

// 内容样式
const contentStyle = computed(() => {
	const style = {
		width: typeof props.width === 'number' ? `${props.width}rpx` : props.width,
		zIndex: props.zIndex
	};
	
	// 根据主题设置样式
	if (props.effect === 'dark') {
		style.backgroundColor = '#303133';
		style.color = '#fff';
	}
	
	return style;
});

// 显示弹出框
const show = () => {
	if (props.disabled) return;
	clearTimeout(hideTimer);
	
	if (props.showAfter > 0) {
		showTimer = setTimeout(() => {
			showPopover.value = true;
			emits('beforeEnter');
		}, parseInt(props.showAfter));
	} else {
		showPopover.value = true;
		emits('beforeEnter');
	}
};

// 隐藏弹出框
const hide = () => {
	clearTimeout(showTimer);
	
	if (props.hideAfter > 0) {
		hideTimer = setTimeout(() => {
			showPopover.value = false;
			emits('beforeLeave');
		}, parseInt(props.hideAfter));
	} else {
		showPopover.value = false;
		emits('beforeLeave');
	}
};

// 点击事件
const handleClick = (e) => {
	e.stopPropagation();
	if (props.trigger === 'click') {
		if (showPopover.value) {
			hide();
		} else {
			show();
		}
	}
};

// 鼠标进入事件
const handleMouseEnter = (e) => {
	if (props.trigger === 'hover') {
		show();
	}
};

// 鼠标离开事件
const handleMouseLeave = () => {
	if (props.trigger === 'hover') {
		hide();
	}
};

// 焦点事件
const handleFocus = () => {
	if (props.trigger === 'focus') {
		show();
	}
};

// 右键菜单事件
const handleContextMenu = (e) => {
	if (props.trigger === 'contextmenu') {
		e.preventDefault();
		if (showPopover.value) {
			hide();
		} else {
			show();
		}
	}
};

// 内容区域鼠标进入
const handleContentEnter = () => {
	if (props.trigger === 'hover') {
		clearTimeout(hideTimer);
	}
};

// 内容区域鼠标离开
const handleContentLeave = () => {
	if (props.trigger === 'hover') {
		hide();
	}
};

// 点击遮罩
const overlayClick = () => {
	if (props.closeOnClickOverlay) {
		hide();
	}
};

// 显示动画完成后
const onAfterEnter = () => {
	emits('show');
	emits('afterEnter');
};

// 隐藏动画完成后
const onAfterLeave = () => {
	emits('hide');
	emits('afterLeave');
};

// 阻止事件冒泡
const noop = (e) => {
	e.stopPropagation();
};

// 点击外部
const handleClickOutside = (e) => {
	if (
		showPopover.value && 
		props.closeOnClickOutside && 
		referenceEl.value && 
		!referenceEl.value.contains(e.target)
	) {
		hide();
	}
};

onMounted(() => {
	// 初始显示状态
	if (props.trigger === 'manual' && props.show) {
		show();
	}
	
	// #ifdef H5
	// 添加点击外部事件监听
	document.addEventListener('click', handleClickOutside);
	// #endif
});

onBeforeUnmount(() => {
	// #ifdef H5
	// 移除点击外部事件监听
	document.removeEventListener('click', handleClickOutside);
	// #endif
	
	// 清除定时器
	clearTimeout(showTimer);
	clearTimeout(hideTimer);
});

// 对外暴露方法
defineExpose({
	show,
	hide
});
</script>

<style lang="scss" scoped>
.zx-popover {
	position: relative;
	display: inline-block;
	
	&__reference {
		display: inline-flex;
		position: relative;
	}
	
	&__content {
		position: absolute;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
		box-shadow: 0 4rpx 24rpx rgba(0, 0, 0, 0.12);
		line-height: 1.4;
		min-width: 200rpx;
		box-sizing: border-box;
		
		// 顶部显示
		&--top {
			bottom: 100%;
			left: 50%;
			transform: translateX(-50%) translateY(-20rpx);
		}
		
		&--top-start {
			bottom: 100%;
			left: 0;
			transform: translateY(-20rpx);
		}
		
		&--top-end {
			bottom: 100%;
			right: 0;
			transform: translateY(-20rpx);
		}
		
		// 底部显示
		&--bottom {
			top: 100%;
			left: 50%;
			transform: translateX(-50%) translateY(20rpx);
		}
		
		&--bottom-start {
			top: 100%;
			left: 0;
			transform: translateY(20rpx);
		}
		
		&--bottom-end {
			top: 100%;
			right: 0;
			transform: translateY(20rpx);
		}
		
		// 左侧显示
		&--left {
			right: 100%;
			top: 50%;
			transform: translateY(-50%) translateX(-20rpx);
		}
		
		&--left-start {
			right: 100%;
			top: 0;
			transform: translateX(-20rpx);
		}
		
		&--left-end {
			right: 100%;
			bottom: 0;
			transform: translateX(-20rpx);
		}
		
		// 右侧显示
		&--right {
			left: 100%;
			top: 50%;
			transform: translateY(-50%) translateX(20rpx);
		}
		
		&--right-start {
			left: 100%;
			top: 0;
			transform: translateX(20rpx);
		}
		
		&--right-end {
			left: 100%;
			bottom: 0;
			transform: translateX(20rpx);
		}
	}
	
	&__arrow {
		position: absolute;
		width: 0;
		height: 0;
		border: 12rpx solid transparent;
		
		// 箭头指向下方（内容在上方）
		&--top, &--top-start, &--top-end {
			bottom: -12rpx;
			border-top-color: #fff;
		}
		
		&--top {
			left: 50%;
			transform: translateX(-50%);
		}
		
		&--top-start {
			left: 40rpx;
		}
		
		&--top-end {
			right: 40rpx;
		}
		
		// 箭头指向上方（内容在下方）
		&--bottom, &--bottom-start, &--bottom-end {
			top: -12rpx;
			border-bottom-color: #fff;
		}
		
		&--bottom {
			left: 50%;
			transform: translateX(-50%);
		}
		
		&--bottom-start {
			left: 40rpx;
		}
		
		&--bottom-end {
			right: 40rpx;
		}
		
		// 箭头指向右方（内容在左方）
		&--left, &--left-start, &--left-end {
			right: -12rpx;
			border-left-color: #fff;
		}
		
		&--left {
			top: 50%;
			transform: translateY(-50%);
		}
		
		&--left-start {
			top: 40rpx;
		}
		
		&--left-end {
			bottom: 40rpx;
		}
		
		// 箭头指向左方（内容在右方）
		&--right, &--right-start, &--right-end {
			left: -12rpx;
			border-right-color: #fff;
		}
		
		&--right {
			top: 50%;
			transform: translateY(-50%);
		}
		
		&--right-start {
			top: 40rpx;
		}
		
		&--right-end {
			bottom: 40rpx;
		}
	}
	
	&__title {
		font-size: 32rpx;
		line-height: 1;
		margin-bottom: 12rpx;
		font-weight: bold;
	}
	
	&__body {
		font-size: 28rpx;
		color: #606266;
	}
}

// 深色主题
:host([effect="dark"]) {
	.zx-popover {
		&__content {
			background-color: #303133;
		}
		
		&__arrow {
			&--top, &--top-start, &--top-end {
				border-top-color: #303133;
			}
			
			&--bottom, &--bottom-start, &--bottom-end {
				border-bottom-color: #303133;
			}
			
			&--left, &--left-start, &--left-end {
				border-left-color: #303133;
			}
			
			&--right, &--right-start, &--right-end {
				border-right-color: #303133;
			}
		}
		
		&__title {
			color: #fff;
		}
		
		&__body {
			color: #e5eaf3;
		}
	}
}
</style>
