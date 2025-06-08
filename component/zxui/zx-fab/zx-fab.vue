<template>
	<view class="zx-cursor-point">
		<view v-if="isShow && popMenu && closeOnClickOutside" class="zx-fab__mask" :style="{ zIndex: props.zIndex - 1 }"
			@click="close"></view>
		<view v-if="popMenu && (leftBottom || rightBottom || leftTop || rightTop) && content.length > 0"
			:class="{ 'zx-fab--leftBottom': leftBottom, 'zx-fab--rightBottom': rightBottom, 'zx-fab--leftTop': leftTop, 'zx-fab--rightTop': rightTop }"
			class="zx-fab" :style="{
				zIndex: props.zIndex,
				borderRadius: borderRadiusSize,
				boxShadow: props.shadow ? '0 1px 5px 2px rgba(0, 0, 0, 0.3)' : 'none',
				...getPositionStyle
			}">
			<view :class="{
				'zx-fab__content--left': horizontal === 'left',
				'zx-fab__content--right': horizontal === 'right',
				'zx-fab__content--flexDirection': direction === 'vertical',
				'zx-fab__content--flexDirectionStart': flexDirectionStart,
				'zx-fab__content--flexDirectionEnd': flexDirectionEnd,
				'zx-fab__content--other-platform': !isAndroidNvue
			}" :style="{
				width: boxWidth,
				height: boxHeight,
				backgroundColor: styles.backgroundColor,
				borderRadius: borderRadiusSize,
				boxShadow: !isAndroidNvue && props.shadow ? '0 1px 5px 2px rgba(0, 0, 0, 0.3)' : 'none',
				transitionDuration: props.animationDuration / 1000 + 's'
			}" class="zx-fab__content" elevation="5">
				<view v-if="flexDirectionStart || horizontalLeft" class="zx-fab__item zx-fab__item--first"
					:style="{ width: mainButtonStyle.width }" />
				<view v-for="(item, index) in content" :key="index" :class="{
					'zx-fab__item--active': isShow,
					'zx-fab__item--scale': props.animationType === 'scale',
					'zx-fab__item--fade': props.animationType === 'fade',
					'zx-fab__item--slide-x': props.animationType === 'slide' && props.direction === 'horizontal',
					'zx-fab__item--slide-y': props.animationType === 'slide' && props.direction === 'vertical'
				}" class="zx-fab__item" @click="onItemClick(index, item)" :style="{
					transitionDelay: isShow ? (index * 50) + 'ms' : '0ms',
					width: mainButtonStyle.width,
					height: props.itemButtonSize + 'px',
					transitionDuration: props.animationDuration / 1000 + 's'
				}">
					<zx-icon :name="item.active ? item.selectedIcon : item.icon" :size="item.iconSize || '55rpx'"
						:color="item.active ? styles.selectedColor : styles.color"
						:labelColor="item.active ? styles.selectedColor : styles.color" :label="item.text"
						space="15rpx"></zx-icon>
				</view>
				<view v-if="flexDirectionEnd || horizontalRight" class="zx-fab__item zx-fab__item--first"
					:style="{ width: mainButtonStyle.width }" />
			</view>
		</view>
		<view :class="{
			'zx-fab__circle--leftBottom': leftBottom,
			'zx-fab__circle--rightBottom': rightBottom,
			'zx-fab__circle--leftTop': leftTop,
			'zx-fab__circle--rightTop': rightTop,
			'zx-fab__content--other-platform': !isAndroidNvue
		}" class="zx-fab__circle zx-fab__plus" :style="{
			...mainButtonStyle,
			...getPositionStyle,
			zIndex: props.zIndex + 1,
			boxShadow: props.shadow ? '0 1px 5px 2px rgba(0, 0, 0, 0.3)' : 'none',
			borderRadius: borderRadiusSize,
			transitionDuration: props.animationDuration / 1000 + 's'
		}" @click="onClick">
			<zx-icon class="fab-circle-icon" :name="mainIcon" :color="styles.iconColor" size="30"
				:style="{ transitionDuration: props.animationDuration / 1000 + 's' }"
				:class="{ 'zx-fab__plus--active': isShow && content.length > 0 }"></zx-icon>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

// 定义平台
let platform = 'other';
// #ifdef APP-NVUE
platform = uni.getDeviceInfo().platform;
// #endif

/**
 * Fab 悬浮按钮
 * @description 点击可展开一个图形按钮菜单
 */

// 定义 props
const props = defineProps({
	pattern: {
		type: Object,
		default: () => ({})
	},
	horizontal: {
		type: String,
		default: 'left'
	},
	vertical: {
		type: String,
		default: 'bottom'
	},
	direction: {
		type: String,
		default: 'horizontal'
	},
	content: {
		type: Array,
		default: () => []
	},
	show: {
		type: Boolean,
		default: false
	},
	popMenu: {
		type: Boolean,
		default: true
	},
	// 自定义参数
	mainButtonSize: {
		type: [Number, String],
		default: 55
	},
	itemButtonSize: {
		type: [Number, String],
		default: 45
	},
	shadow: {
		type: Boolean,
		default: true
	},
	zIndex: {
		type: Number,
		default: 10
	},
	animationType: {
		type: String,
		default: 'scale', // scale, fade, slide
		validator: (val) => ['scale', 'fade', 'slide'].includes(val)
	},
	animationDuration: {
		type: Number,
		default: 300
	},
	mainIcon: {
		type: String,
		default: 'plus'
	},
	closeOnClickOutside: {
		type: Boolean,
		default: true
	},
	margin: {
		type: [Number, String],
		default: 15
	},
	bottom: {
		type: [Number, String],
		default: 30
	},
	borderRadius: {
		type: [Number, String],
		default: 45
	}
});

// 定义 emits
const emit = defineEmits(['fabClick', 'trigger', 'open', 'close']);

// 响应式数据
const fabShow = ref(false);
const isShow = ref(false);
const isAndroidNvue = ref(platform === 'android');
const isAnimating = ref(false);

const styles = reactive({
	color: '#3c3e49',
	selectedColor: '#007AFF',
	backgroundColor: '#fff',
	buttonColor: '#007AFF',
	iconColor: '#fff'
});

// 定义工具函数
const getPosition = (types, paramA, paramB) => {
	if (types === 0) {
		return props.horizontal === paramA && props.vertical === paramB;
	} else if (types === 1) {
		return props.direction === paramA && props.vertical === paramB;
	} else if (types === 2) {
		return props.direction === paramA && props.horizontal === paramB;
	} else {
		return isShow.value && props.direction === paramA ? contentWidth.value : contentWidthMin.value;
	}
};

// 计算属性
const contentWidth = computed(() => {
	const size = typeof props.mainButtonSize === 'number' ? props.mainButtonSize : parseFloat(props.mainButtonSize);
	return (props.content.length + 1) * size + 15 + 'px';
});

const contentWidthMin = computed(() => {
	return typeof props.mainButtonSize === 'number' ? `${props.mainButtonSize}px` : props.mainButtonSize;
});

// 动态计算宽度
const boxWidth = computed(() => {
	return getPosition(3, 'horizontal');
});

// 动态计算高度
const boxHeight = computed(() => {
	return getPosition(3, 'vertical');
});

// 计算位置相关的计算属性
const leftBottom = computed(() => getPosition(0, 'left', 'bottom'));
const rightBottom = computed(() => getPosition(0, 'right', 'bottom'));
const leftTop = computed(() => getPosition(0, 'left', 'top'));
const rightTop = computed(() => getPosition(0, 'right', 'top'));
const flexDirectionStart = computed(() => getPosition(1, 'vertical', 'top'));
const flexDirectionEnd = computed(() => getPosition(1, 'vertical', 'bottom'));
const horizontalLeft = computed(() => getPosition(2, 'horizontal', 'left'));
const horizontalRight = computed(() => getPosition(2, 'horizontal', 'right'));

// 计算 nvue bottom
const nvueBottom = computed(() => {
	const safeBottom = uni.getWindowInfo().windowBottom;
	// #ifdef APP-NVUE
	return 30 + safeBottom + 'px';
	// #endif
	// #ifndef APP-NVUE
	return '30px';
	// #endif
});

// 计算主按钮样式
const mainButtonStyle = computed(() => {
	const size = typeof props.mainButtonSize === 'number' ? `${props.mainButtonSize}px` : props.mainButtonSize;
	return {
		width: size,
		height: size,
		'background-color': styles.buttonColor,
		bottom: nvueBottom.value
	};
});

// 计算边距
const marginSize = computed(() => {
	return typeof props.margin === 'number' ? `${props.margin}px` : props.margin;
});

const bottomSize = computed(() => {
	return typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom;
});

const borderRadiusSize = computed(() => {
	return typeof props.borderRadius === 'number' ? `${props.borderRadius}px` : props.borderRadius;
});

// 计算位置样式
const getPositionStyle = computed(() => {
	const style = {};
	if (leftBottom.value) {
		style.left = marginSize.value;
		style.bottom = bottomSize.value;
	} else if (rightBottom.value) {
		style.right = marginSize.value;
		style.bottom = bottomSize.value;
	} else if (leftTop.value) {
		style.left = marginSize.value;
		style.top = bottomSize.value;
	} else if (rightTop.value) {
		style.right = marginSize.value;
		style.top = bottomSize.value;
	}
	return style;
});

// 监听 pattern 变化
watch(() => props.pattern, (val) => {
	Object.assign(styles, val);
}, { deep: true });

// 监听显示状态变化
watch(() => isShow.value, (val) => {
	if (val) {
		emit('open');
	} else {
		emit('close');
	}
});

// 方法
const onClick = () => {
	emit('fabClick');
	if (!props.popMenu || isAnimating.value) {
		return;
	}

	isAnimating.value = true;
	isShow.value = !isShow.value;

	setTimeout(() => {
		isAnimating.value = false;
	}, props.animationDuration);
};

const open = () => {
	if (isShow.value || isAnimating.value) return;

	isAnimating.value = true;
	isShow.value = true;

	setTimeout(() => {
		isAnimating.value = false;
	}, props.animationDuration);

	emit('open');
};

const close = () => {
	if (!isShow.value || isAnimating.value) return;

	isAnimating.value = true;
	isShow.value = false;

	setTimeout(() => {
		isAnimating.value = false;
	}, props.animationDuration);

	emit('close');
};

/**
 * 按钮点击事件
 */
const onItemClick = (index, item) => {
	if (!isShow.value) {
		return;
	}
	emit('trigger', { index, item });
	// 可选自动关闭
	if (item.autoClose !== false) {
		close();
	}
};

// 组件初始化
onMounted(() => {
	isShow.value = props.show;
	// 初始化样式
	Object.assign(styles, props.pattern);
});

// 暴露方法供外部调用
defineExpose({
	open,
	close,
	isShow
});
</script>

<style lang="scss" scoped>
$zx-shadow-base: 0 1px 5px 2px rgba($color: #000000, $alpha: 0.3) !default;

.zx-fab {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	border-radius: 45px;
}

.zx-cursor-point {
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}

.zx-fab--active {
	opacity: 1;
}

.zx-fab--leftBottom {
	left: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab--leftTop {
	left: 15px;
	top: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab--rightBottom {
	right: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab--rightTop {
	right: 15px;
	top: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab__circle {
	position: fixed;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
	width: 55px;
	height: 55px;
	background-color: #007AFF;
	border-radius: 45px;
	z-index: 11;
}

.zx-fab__circle--leftBottom {
	left: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab__circle--leftTop {
	left: 15px;
	top: 30px;
	/* #ifdef H5 */
	left: calc(15px + var(--window-left));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab__circle--rightBottom {
	right: 15px;
	bottom: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	bottom: calc(30px + var(--window-bottom));
	/* #endif */
}

.zx-fab__circle--rightTop {
	right: 15px;
	top: 30px;
	/* #ifdef H5 */
	right: calc(15px + var(--window-right));
	top: calc(30px + var(--window-top));
	/* #endif */
}

.zx-fab__circle--left {
	left: 0;
}

.zx-fab__circle--right {
	right: 0;
}

.zx-fab__circle--top {
	top: 0;
}

.zx-fab__circle--bottom {
	bottom: 0;
}

.zx-fab__plus {
	font-weight: bold;
}

.fab-circle-icon {
	transform: rotate(0deg);
	font-weight: 200;
}

.zx-fab__plus--active {
	transform: rotate(135deg);
}

.zx-fab__content {
	/* #ifndef APP-NVUE */
	box-sizing: border-box;
	display: flex;
	/* #endif */
	flex-direction: row;
	border-radius: 55px;
	overflow: hidden;
	transition-property: width, height;
	width: 55px;
	border-color: #dddddd;
	border-width: 1rpx;
	border-style: solid;
}

.zx-fab__content--other-platform {
	border-width: 0px;
}

.zx-fab__content--left {
	justify-content: flex-start;
}

.zx-fab__content--right {
	justify-content: flex-end;
}

.zx-fab__content--flexDirection {
	flex-direction: column;
	justify-content: flex-end;
}

.zx-fab__content--flexDirectionStart {
	flex-direction: column;
	justify-content: flex-start;
}

.zx-fab__content--flexDirectionEnd {
	flex-direction: column;
	justify-content: flex-end;
}

.zx-fab__item {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 55px;
	height: 45px;
	opacity: 0;
}

.zx-fab__item--active {
	opacity: 1;
}

// 动画样式
.zx-fab__item--scale {
	transform: scale(0);
}

.zx-fab__item--active.zx-fab__item--scale {
	transform: scale(1);
}

.zx-fab__item--fade {
	opacity: 0;
}

.zx-fab__item--active.zx-fab__item--fade {
	opacity: 1;
}

.zx-fab__item--slide-x {
	transform: translateX(-20px);
}

.zx-fab__item--active.zx-fab__item--slide-x {
	transform: translateX(0);
}

.zx-fab__item--slide-y {
	transform: translateY(20px);
}

.zx-fab__item--active.zx-fab__item--slide-y {
	transform: translateY(0);
}

.zx-fab__item-image {
	width: 20px;
	height: 20px;
	margin-bottom: 4px;
}

.zx-fab__item-text {
	color: #ffffff;
	font-size: 12px;
	line-height: 12px;
	margin-top: 2px;
}

.zx-fab__item--first {
	width: 55px;
}

.zx-fab__mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: transparent;
}
</style>
