<template>
	<view class="zx-sticky-container">
		<!-- 占位元素，防止吸顶时页面跳动 -->
		<view 
			v-if="isSticky" 
			class="zx-sticky-placeholder" 
			:style="placeholderStyles"
		></view>
		
		<!-- 吸顶内容 -->
		<view 
			class="zx-sticky" 
			:class="{ 'is-sticky': isSticky, 'with-transition': enableTransition }"
			:style="stickyStyles"
		>
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUnmounted, watch, computed, nextTick } from 'vue';

// 定义组件属性
const props = defineProps({
	// 滚动时，距离顶部的高度
	scrollTop: {
		type: Number,
		default: 0
	},
	// 吸顶时与顶部的距离
	offsetTop: {
		type: Number,
		default: 0
	},
	// 占位容器背景颜色
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	// 索引值
	zIndex: {
		type: [Number, String],
		default: 9999
	},
	// 组件宽度
	width: {
		type: String,
		default: '750rpx'
	},
	// 组件高度
	height: {
		type: String,
		default: '120rpx'
	},
	// 是否启用过渡动画
	enableTransition: {
		type: Boolean,
		default: true
	},
	// 防抖延迟时间（毫秒）
	debounceDelay: {
		type: Number,
		default: 16
	},
	// 是否包含状态栏高度
	includeStatusBar: {
		type: Boolean,
		default: true
	},
	// 是否包含胶囊高度
	includeCapsule: {
		type: Boolean,
		default: true
	},
	// 自定义吸顶触发阈值
	threshold: {
		type: Number,
		default: 0
	},
	// 是否禁用组件
	disabled: {
		type: Boolean,
		default: false
	}
});

// 定义事件
const emit = defineEmits(['sticky-change', 'ready', 'error']);

// 响应式状态
const topHeight = ref(0);              // 组件距离顶部的高度
const elementHeight = ref(0);          // 组件实际高度
const statusBarHeight = ref(0);        // 状态栏高度
const capsuleHeight = ref(0);          // 微信胶囊高度
const isSticky = ref(false);           // 是否处于吸顶状态
const isReady = ref(false);            // 组件是否准备就绪
const debounceTimer = ref(null);       // 防抖定时器

// 获取组件实例，用于选择器查询
const { proxy } = getCurrentInstance();

// 计算占位元素样式
const placeholderStyles = computed(() => ({
	width: props.width,
	height: elementHeight.value ? `${elementHeight.value}px` : props.height,
	backgroundColor: 'transparent'
}));

// 计算吸顶样式
const stickyStyles = computed(() => {
	// 基础样式
	const baseStyles = {
		zIndex: props.zIndex,
		backgroundColor: props.backgroundColor,
		width: props.width,
		height: props.height
	};
	
	// 如果禁用或未准备就绪，返回基础样式
	if (props.disabled || !isReady.value) {
		return baseStyles;
	}
	
	// 如果需要吸顶，添加固定定位样式
	if (isSticky.value) {
		let topOffset = props.offsetTop;
		
		// 根据配置添加状态栏和胶囊高度
		if (props.includeStatusBar) {
			topOffset += statusBarHeight.value;
		}
		if (props.includeCapsule) {
			topOffset += capsuleHeight.value;
		}
		
		return {
			...baseStyles,
			position: 'fixed',
			left: 0,
			top: `${topOffset}px`,
			width: '100%'
		};
	}
	
	return baseStyles;
});

// 防抖函数
const debounce = (func, delay) => {
	return (...args) => {
		if (debounceTimer.value) {
			clearTimeout(debounceTimer.value);
		}
		debounceTimer.value = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};

// 获取元素尺寸信息
const getRect = (selector) => {
	return new Promise((resolve, reject) => {
		try {
			uni.createSelectorQuery()
				.in(proxy)
				.select(selector)
				.boundingClientRect((res) => {
					if (res) {
						resolve(res);
					} else {
						reject(new Error(`无法获取元素 ${selector} 的位置信息`));
					}
				})
				.exec();
		} catch (error) {
			reject(error);
		}
	});
};

// 初始化组件
const initComponent = async () => {
	try {
		// 等待下一个 tick 确保 DOM 渲染完成
		await nextTick();
		
		// 获取组件位置信息
		const elementInfo = await getRect('.zx-sticky');
		if (elementInfo) {
			topHeight.value = elementInfo.top;
			elementHeight.value = elementInfo.height;
		}
		
		// 获取系统窗口信息
		const systemInfo = uni.getWindowInfo();
		statusBarHeight.value = systemInfo.statusBarHeight || 0;
		
		// 获取胶囊信息（仅在微信小程序中有效）
		try {
			const capsuleInfo = uni.getMenuButtonBoundingClientRect();
			if (capsuleInfo && capsuleInfo.height) {
				capsuleHeight.value = capsuleInfo.height + 11;
			}
		} catch (capsuleError) {
			// 非微信小程序环境，忽略胶囊高度
			capsuleHeight.value = 0;
		}
		
		isReady.value = true;
		emit('ready', {
			topHeight: topHeight.value,
			elementHeight: elementHeight.value,
			statusBarHeight: statusBarHeight.value,
			capsuleHeight: capsuleHeight.value
		});
		
	} catch (error) {
		console.error('zx-sticky 组件初始化失败:', error);
		emit('error', error);
	}
};

// 更新吸顶状态
const updateStickyState = debounce((scrollTop) => {
	if (!isReady.value || props.disabled) {
		return;
	}
	
	// 计算触发吸顶的阈值
	const triggerPoint = topHeight.value + props.threshold;
	const shouldSticky = scrollTop > triggerPoint;
	
	// 如果状态发生变化，更新并触发事件
	if (shouldSticky !== isSticky.value) {
		isSticky.value = shouldSticky;
		emit('sticky-change', {
			isSticky: isSticky.value,
			scrollTop,
			triggerPoint
		});
	}
}, props.debounceDelay);

// 重新初始化组件（用于响应尺寸变化）
const refresh = async () => {
	isReady.value = false;
	await initComponent();
};

// 组件挂载时初始化
onMounted(() => {
	initComponent();
});

// 组件卸载时清理
onUnmounted(() => {
	if (debounceTimer.value) {
		clearTimeout(debounceTimer.value);
	}
});

// 监听滚动位置变化，更新吸顶状态
watch(
	() => props.scrollTop,
	(newScrollTop) => {
		updateStickyState(newScrollTop);
	}
);

// 监听禁用状态变化
watch(
	() => props.disabled,
	(disabled) => {
		if (disabled) {
			isSticky.value = false;
		}
	}
);

// 暴露方法给父组件
defineExpose({
	refresh,
	isSticky: computed(() => isSticky.value),
	isReady: computed(() => isReady.value),
	topHeight: computed(() => topHeight.value),
	elementHeight: computed(() => elementHeight.value)
});
</script>

<style scoped>
.zx-sticky-container {
	width: 100%;
}

.zx-sticky {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.zx-sticky.with-transition {
	transition: all 0.3s ease-in-out;
}

.zx-sticky.is-sticky {
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.zx-sticky-placeholder {
	width: 100%;
	pointer-events: none;
}

/* 动画效果 */
.zx-sticky.with-transition.is-sticky {
	animation: stickySlideDown 0.3s ease-out;
}

@keyframes stickySlideDown {
	from {
		opacity: 0;
		transform: translateY(-100%);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
