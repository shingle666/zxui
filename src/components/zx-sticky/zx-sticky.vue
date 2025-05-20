<template>
	<view class="zx-sticky" :style="stickyStyles">
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, watch, computed } from 'vue';

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
		type: Number,
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
	}
});

// 响应式状态
const topHeight = ref(0);          // 组件距离顶部的高度
const statusBarHeight = ref(0);    // 状态栏高度
const capsuleHeight = ref(0);      // 微信胶囊高度
const isSticky = ref(false);       // 是否处于吸顶状态

// 获取组件实例，用于选择器查询
const { proxy } = getCurrentInstance();

// 计算样式
const stickyStyles = computed(() => {
	// 基础样式
	const baseStyles = {
		zIndex: props.zIndex,
		backgroundColor: props.backgroundColor,
		width: props.width,
		height: props.height
	};
	
	// 如果需要吸顶，添加固定定位样式
	if (isSticky.value) {
		return {
			...baseStyles,
			position: 'fixed',
			left: 0,
			top: `${props.offsetTop + statusBarHeight.value + capsuleHeight.value}px`,
			marginTop: props.offsetTop
		};
	}
	
	return baseStyles;
});

// 获取元素尺寸信息
const getRect = (selector) => {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.in(proxy)
			.select(selector)
			.boundingClientRect((res) => {
				resolve(res);
			})
			.exec();
	});
};

// 组件挂载时获取必要的尺寸信息
onMounted(async () => {
	try {
		// 获取组件位置信息
		const topInfo = await getRect('.zx-sticky');
		if (topInfo) {
			topHeight.value = topInfo.top;
		}
		
		// 获取系统窗口信息
		const systemInfo = uni.getWindowInfo();
		statusBarHeight.value = systemInfo.statusBarHeight;
		
		// 获取胶囊信息
		const capsuleInfo = uni.getMenuButtonBoundingClientRect();
		capsuleHeight.value = capsuleInfo.height + 11;
	} catch (error) {
		console.error('获取元素位置信息失败:', error);
	}
});

// 监听滚动位置变化，更新吸顶状态
watch(
	() => props.scrollTop,
	(newScrollTop) => {
		// 根据滚动位置判断是否需要吸顶
		isSticky.value = newScrollTop > topHeight.value;
	},
	{ immediate: true }
);
</script>

<style scoped>
.zx-sticky {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
</style>
