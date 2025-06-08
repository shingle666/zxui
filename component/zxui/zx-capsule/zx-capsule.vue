<template>
	<!-- 胶囊容器 -->
	<view class="zx-capsule" :style="containerStyle">
		<slot></slot>
	</view>
</template>

<script setup>
/**
 * 胶囊组件 - 跨平台实现
 * 支持微信小程序、H5、APP
 */
import { computed, ref, onMounted, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 背景颜色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	// 自定义宽度，为0时使用系统胶囊宽度或默认值
	width: {
		type: Number,
		default: 0
	},
	// 自定义高度，为0时使用系统胶囊高度或默认值
	height: {
		type: Number,
		default: 0
	},
	// 是否使用固定定位
	fixed: {
		type: Boolean,
		default: false
	},
	// 是否根据系统状态栏位置自动定位（仅小程序有效）
	autoPosition: {
		type: Boolean,
		default: true
	},
	// 自定义右边距
	right: {
		type: Number,
		default: 10
	},
	// 自定义上边距
	top: {
		type: Number,
		default: 0
	},
	// 圆角
	borderRadius: {
		type: Number,
		default: 100
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: 'transparent'
	},
	// 边框宽度
	borderWidth: {
		type: Number,
		default: 0
	},
	// 阴影
	shadow: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['created', 'update']);

// 胶囊尺寸信息
const capsuleInfo = ref({
	width: 87, // 默认宽度
	height: 32, // 默认高度
	top: 0,
	right: 10,
	bottom: 0,
	left: 0
});

// 系统信息
const systemInfo = ref({
	statusBarHeight: 20
});

onMounted(() => {
	getCapsuleInfo();
});

// 获取胶囊信息 - 跨平台实现
const getCapsuleInfo = () => {
	// #ifdef MP-WEIXIN
	try {
		// 微信小程序获取胶囊信息
		const wxCapsuleInfo = wx.getMenuButtonBoundingClientRect();
		const wxSystemInfo = uni.getWindowInfo();
		
		capsuleInfo.value = {
			width: wxCapsuleInfo.width,
			height: wxCapsuleInfo.height,
			top: wxCapsuleInfo.top,
			right: wxCapsuleInfo.right,
			bottom: wxCapsuleInfo.bottom,
			left: wxCapsuleInfo.left
		};
		
		systemInfo.value = {
			statusBarHeight: wxSystemInfo.statusBarHeight
		};
	} catch (error) {
		console.error('获取微信胶囊信息失败', error);
	}
	// #endif
	
	// #ifdef H5 || APP-PLUS
	try {
		// H5和APP使用状态栏高度和默认尺寸
		const sysInfo = uni.getWindowInfo();
		systemInfo.value = {
			statusBarHeight: sysInfo.statusBarHeight || 20
		};
		
		// 使用默认尺寸
		if (!capsuleInfo.value.width) {
			capsuleInfo.value.width = 87;
		}
		
		if (!capsuleInfo.value.height) {
			capsuleInfo.value.height = 32;
		}
		
		// 计算默认位置
		if (props.autoPosition) {
			capsuleInfo.value.top = systemInfo.value.statusBarHeight;
			capsuleInfo.value.right = 10;
		}
	} catch (error) {
		console.error('获取系统信息失败', error);
	}
	// #endif
	
	// 发送胶囊信息到父组件
	emit('created', { ...capsuleInfo.value });
	emit('update', { ...capsuleInfo.value });
};

// 计算容器样式
const containerStyle = computed(() => {
	const width = props.width || capsuleInfo.value.width;
	const height = props.height || capsuleInfo.value.height;
	
	const style = {
		width: width + 'px',
		height: height + 'px',
		backgroundColor: props.backgroundColor,
		borderRadius: props.borderRadius + 'px',
		borderColor: props.borderColor,
		borderWidth: props.borderWidth + 'px',
		borderStyle: props.borderWidth > 0 ? 'solid' : 'none'
	};
	
	if (props.shadow) {
		style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
	}
	
	if (props.fixed) {
		style.position = 'fixed';
		
		if (props.autoPosition) {
			// 根据系统胶囊位置自动定位
			style.top = (capsuleInfo.value.top || props.top) + 'px';
			style.right = (props.right) + 'px';
		} else {
			// 使用自定义位置
			style.top = props.top + 'px';
			style.right = props.right + 'px';
		}
	}
	
	return style;
});
</script>

<style scoped>
.zx-capsule {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
