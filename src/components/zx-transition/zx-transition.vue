<template>
	<view v-if="inited" class="zx-transition" ref="zxTransitionRef" :animation="animationData" @tap="clickHandler" @touchmove="noop">
		<slot></slot>
	</view>
</template>

<script setup>
	import { ref, reactive, computed, watch, nextTick, onMounted } from 'vue';
	
	// Props 定义
	const props = defineProps({
		// 是否展示组件
		show: {
			type: Boolean,
			default: false
		},
		// 使用的动画模式
		mode: {
			type: String,
			default: 'fade'
		},
		// 动画的执行时间，单位ms
		duration: {
			type: [String, Number],
			default: 500
		},
		// 使用的动画过渡函数
		timingFunction: {
			type: String,
			default: 'ease-out'
		},
		// 动画延迟时间
		delay: {
			type: [String, Number],
			default: 0
		},
		// 设置transform-origin
		transformOrigin: {
			type: String,
			default: '50% 50% 0'
		}
	})
	
	// 定义事件
	const emit = defineEmits([
		'click', 
		'beforeEnter', 
		'enter', 
		'afterEnter', 
		'beforeLeave', 
		'leave', 
		'afterLeave'
	])
	
	// 响应式状态
	const inited = ref(false)
	const display = ref(false)
	const status = ref('')
	const zxTransitionRef = ref(null)
	const animationData = ref({})
	let animation = null
	
	// 获取动画实例
	function getAnimation() {
		if (!animation) {
			// 创建动画实例
			animation = uni.createAnimation({
				duration: Number(props.duration),
				timingFunction: props.timingFunction,
				delay: Number(props.delay),
				transformOrigin: props.transformOrigin
			})
		}
		return animation
	}
	
	// 不同模式的动画配置
	const animationModes = {
		fade: {
			enter: (animation) => animation.opacity(1),
			leave: (animation) => animation.opacity(0)
		},
		'fade-up': {
			enter: (animation) => animation.opacity(1).translateY(0),
			leave: (animation) => animation.opacity(0).translateY('100%')
		},
		'fade-down': {
			enter: (animation) => animation.opacity(1).translateY(0),
			leave: (animation) => animation.opacity(0).translateY('-100%')
		},
		'fade-left': {
			enter: (animation) => animation.opacity(1).translateX(0),
			leave: (animation) => animation.opacity(0).translateX('-100%')
		},
		'fade-right': {
			enter: (animation) => animation.opacity(1).translateX(0),
			leave: (animation) => animation.opacity(0).translateX('100%')
		},
		'slide-up': {
			enter: (animation) => animation.translateY(0),
			leave: (animation) => animation.translateY('100%')
		},
		'slide-down': {
			enter: (animation) => animation.translateY(0),
			leave: (animation) => animation.translateY('-100%')
		},
		'slide-left': {
			enter: (animation) => animation.translateX(0),
			leave: (animation) => animation.translateX('-100%')
		},
		'slide-right': {
			enter: (animation) => animation.translateX(0),
			leave: (animation) => animation.translateX('100%')
		},
		zoom: {
			enter: (animation) => animation.scale(1, 1),
			leave: (animation) => animation.scale(0.95, 0.95)
		},
		'fade-zoom': {
			enter: (animation) => animation.opacity(1).scale(1, 1),
			leave: (animation) => animation.opacity(0).scale(0.95, 0.95)
		},
		rotate: {
			enter: (animation) => animation.rotate(0),
			leave: (animation) => animation.rotate(-90)
		},
		'rotate-zoom': {
			enter: (animation) => animation.opacity(1).rotate(0).scale(1, 1),
			leave: (animation) => animation.opacity(0).rotate(-90).scale(0.95, 0.95)
		}
	}
	
	// 动画进入前的初始状态设置
	const initialStates = {
		fade: (animation) => animation.opacity(0),
		'fade-up': (animation) => animation.opacity(0).translateY('100%'),
		'fade-down': (animation) => animation.opacity(0).translateY('-100%'),
		'fade-left': (animation) => animation.opacity(0).translateX('-100%'),
		'fade-right': (animation) => animation.opacity(0).translateX('100%'),
		'slide-up': (animation) => animation.translateY('100%'),
		'slide-down': (animation) => animation.translateY('-100%'),
		'slide-left': (animation) => animation.translateX('-100%'),
		'slide-right': (animation) => animation.translateX('100%'),
		zoom: (animation) => animation.scale(0.95, 0.95),
		'fade-zoom': (animation) => animation.opacity(0).scale(0.95, 0.95),
		rotate: (animation) => animation.rotate(-90),
		'rotate-zoom': (animation) => animation.opacity(0).rotate(-90).scale(0.95, 0.95)
	}
	
	// 监听 show 属性变化
	watch(() => props.show, (newVal) => {
		// 防止重复触发动画
		if (newVal === display.value) return
		
		newVal ? enter() : leave()
	}, { immediate: true })
	
	// 组件被点击发出事件
	function clickHandler() {
		emit('click')
	}
	
	function noop(e) {
		// 阻止冒泡和默认行为
		e && e.stopPropagation && e.stopPropagation()
	}
	
	// 完成过渡后触发
	function onTransitionEnd() {
		// 发出组件动画执行后的事件
		emit(status.value === 'leave' ? 'afterLeave' : 'afterEnter')
		if (!props.show && display.value) {
			display.value = false
			inited.value = false
		}
	}
	
	// 组件进入处理
	function enter() {
		if (!animationModes[props.mode]) {
			console.error(`[zx-transition] mode ${props.mode} is not supported`)
			return
		}
		
		status.value = 'enter'
		emit('beforeEnter')
		inited.value = true
		display.value = true
		
		nextTick(async () => {
			// #ifdef H5
			await new Promise(resolve => setTimeout(resolve, 20))
			// #endif
			
			const animationInstance = getAnimation()
			
			// 先设置初始状态
			if (initialStates[props.mode]) {
				initialStates[props.mode](animationInstance).step({duration: 0})
				animationData.value = animationInstance.export()
				
				// 等待初始状态应用
				await new Promise(resolve => setTimeout(resolve, 50))
			}
			
			emit('enter')
			
			// 执行进入动画
			animationModes[props.mode].enter(animationInstance).step()
			animationData.value = animationInstance.export()
			
			// 动画结束后触发事件
			setTimeout(onTransitionEnd, Number(props.duration) + Number(props.delay))
		})
	}
	
	// 动画离场处理
	function leave() {
		// 如果不是展示状态，无需执行逻辑
		if (!display.value) return
		if (!animationModes[props.mode]) {
			console.error(`[zx-transition] mode ${props.mode} is not supported`)
			return
		}
		
		status.value = 'leave'
		emit('beforeLeave')
		
		const animationInstance = getAnimation()
		
		emit('leave')
		
		// 执行离开动画
		animationModes[props.mode].leave(animationInstance).step()
		animationData.value = animationInstance.export()
		
		// 动画结束后触发事件
		setTimeout(onTransitionEnd, Number(props.duration) + Number(props.delay))
	}
	
	// 定义供外部调用的方法
	defineExpose({
		// 供外部强制触发过渡的方法
		trigger: (show) => {
			if (show === undefined) {
				show = !display.value
			}
			show ? enter() : leave()
		}
	})
</script>

<style lang="scss" scoped>
// 使用现代Sass语法导入兼容性工具
@use '@/styles/compatibility.scss' as compat;

/**
 * vue版本动画内置的动画模式有如下：
 * fade：淡入
 * zoom：缩放
 * fade-zoom：缩放淡入
 * fade-up：上滑淡入
 * fade-down：下滑淡入
 * fade-left：左滑淡入
 * fade-right：右滑淡入
 * slide-up：上滑进入
 * slide-down：下滑进入
 * slide-left：左滑进入
 * slide-right：右滑进入
 * rotate：旋转进入
 * rotate-zoom：旋转缩放淡入
 */

.zx-fade-enter-active,
.zx-fade-leave-active {
	transition-property: opacity;
}

.zx-fade-enter,
.zx-fade-leave-to {
	opacity: 0
}

.zx-fade-zoom-enter,
.zx-fade-zoom-leave-to {
	@include compat.uni-scale(0.95);
	opacity: 0;
}

.zx-fade-zoom-enter-active,
.zx-fade-zoom-leave-active {
	transition-property: transform, opacity;
}

.zx-fade-down-enter-active,
.zx-fade-down-leave-active,
.zx-fade-left-enter-active,
.zx-fade-left-leave-active,
.zx-fade-right-enter-active,
.zx-fade-right-leave-active,
.zx-fade-up-enter-active,
.zx-fade-up-leave-active {
	transition-property: opacity, transform;
}

.zx-fade-up-enter,
.zx-fade-up-leave-to {
	@include compat.uni-transform(translate3d(0, 100%, 0));
	opacity: 0
}

.zx-fade-down-enter,
.zx-fade-down-leave-to {
	@include compat.uni-transform(translate3d(0, -100%, 0));
	opacity: 0
}

.zx-fade-left-enter,
.zx-fade-left-leave-to {
	@include compat.uni-transform(translate3d(-100%, 0, 0));
	opacity: 0
}

.zx-fade-right-enter,
.zx-fade-right-leave-to {
	@include compat.uni-transform(translate3d(100%, 0, 0));
	opacity: 0
}

.zx-slide-down-enter-active,
.zx-slide-down-leave-active,
.zx-slide-left-enter-active,
.zx-slide-left-leave-active,
.zx-slide-right-enter-active,
.zx-slide-right-leave-active,
.zx-slide-up-enter-active,
.zx-slide-up-leave-active {
	transition-property: transform;
}

.zx-slide-up-enter,
.zx-slide-up-leave-to {
	@include compat.uni-transform(translate3d(0, 100%, 0))
}

.zx-slide-down-enter,
.zx-slide-down-leave-to {
	@include compat.uni-transform(translate3d(0, -100%, 0))
}

.zx-slide-left-enter,
.zx-slide-left-leave-to {
	@include compat.uni-transform(translate3d(-100%, 0, 0))
}

.zx-slide-right-enter,
.zx-slide-right-leave-to {
	@include compat.uni-transform(translate3d(100%, 0, 0))
}

.zx-zoom-enter-active,
.zx-zoom-leave-active {
	transition-property: transform
}

.zx-zoom-enter,
.zx-zoom-leave-to {
	@include compat.uni-scale(0.95)
}

/* 添加旋转动画相关样式 */
.zx-rotate-enter-active,
.zx-rotate-leave-active {
	transition-property: transform;
}

.zx-rotate-enter,
.zx-rotate-leave-to {
	@include compat.uni-transform(rotate(-90deg));
}

/* 添加旋转缩放动画相关样式 */
.zx-rotate-zoom-enter-active,
.zx-rotate-zoom-leave-active {
	transition-property: transform, opacity;
}

.zx-rotate-zoom-enter,
.zx-rotate-zoom-leave-to {
	@include compat.uni-transform(rotate(-90deg) scale(0.95));
	opacity: 0;
}

.zx-transition {
	/* 可以添加基础样式，如需要 */
	will-change: transform;
}
</style>

