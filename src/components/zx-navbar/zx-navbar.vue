<template>
	<view class="zx-navbar" :class="[themeClass]" :style="{borderBottom:border?'1rpx solid '+borderColor:''}">
		<!-- 固定在顶部时的占位 -->
		<view v-if="fixed && placeholder" class="zx-navbar__placeholder"
			:style="{ height: barHeight + 'px', backgroundColor: bgColor }"></view>

		<view :class="[
			fixed && 'zx-navbar--fixed',
			transparent && 'zx-navbar--transparent',
			shadow && 'zx-navbar--shadow'
		]" :style="{ zIndex: zIndex }">
			<zx-status-bar v-if="safeAreaInsetTop"
				:backgroundColor="transparent ? 'transparent' : bgColor"></zx-status-bar>

			<view class="zx-navbar__content" :class="[
				border && 'zx-border-bottom',
				immersive && 'zx-navbar__content--immersive'
			]" :style="navbarStyle">
				<!-- 左侧区域 -->
				<view v-if="showLeft" class="zx-navbar__content__left"
					:class="leftDisabled && 'zx-navbar__content__left--disabled'"
					hover-class="zx-navbar__content__left--hover" :hover-start-time="hoverTime" @tap="handleLeftClick"
					:aria-label="leftAriaLabel" role="button">
					<slot name="left">
						<zx-icon v-if="leftIcon" :name="leftIcon" :size="leftIconSize" :color="leftIconColor"
							:class="leftIconClass"></zx-icon>
						<text v-if="leftText" :style="{ color: leftIconColor }"
							class="zx-navbar__content__left__text">{{ leftText }}</text>
					</slot>
				</view>

				<!-- 中央标题区域 -->
				<view class="zx-navbar__content__center" :style="centerStyle">
					<slot name="center">
						<text v-if="title" class="zx-line-1 zx-navbar__content__title"
							:style="[{ width: titleWidth }, titleStyle]" :aria-label="`页面标题：${title}`">{{ title
							}}</text>
						<view v-if="subtitle" class="zx-navbar__content__subtitle">
							<text :style="subtitleStyle">{{ subtitle }}</text>
						</view>
					</slot>
				</view>

				<!-- 右侧区域 -->
				<view v-if="showRight" class="zx-navbar__content__right"
					:class="rightDisabled && 'zx-navbar__content__right--disabled'"
					hover-class="zx-navbar__content__right--hover" :hover-start-time="hoverTime" @tap="handleRightClick"
					:aria-label="rightAriaLabel" role="button">
					<slot name="right">
						<zx-icon v-if="rightIcon" :name="rightIcon" :size="rightIconSize" :color="rightIconColor"
							:class="rightIconClass"></zx-icon>
						<text v-if="rightText" class="zx-navbar__content__right__text"
							:style="{ color: rightIconColor }">{{ rightText }}</text>
					</slot>
				</view>

				<!-- 加载状态 -->
				<view v-if="loading" class="zx-navbar__loading">
					<zx-loading></zx-loading>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * Navbar 自定义导航栏
 * @description 此组件一般用于在特殊情况下，需要自定义导航栏的时候用到，一般建议使用uni-app带的导航栏。
 * @tutorial https://zxui.org/components/navbar
 * @property {Boolean}			safeAreaInsetTop	是否开启顶部安全区适配  （默认 true ）
 * @property {Boolean}			placeholder			固定在顶部时，是否生成一个等高元素，以防止塌陷 （默认 true ）
 * @property {Boolean}			fixed				导航栏是否固定在顶部 （默认 false ）
 * @property {Boolean}			border				导航栏底部是否显示下边框 （默认 false ）
 * @property {Boolean}			transparent			是否透明背景 （默认 false ）
 * @property {Boolean}			immersive			是否沉浸式模式 （默认 false ）
 * @property {Boolean}			shadow				是否显示阴影 （默认 false ）
 * @property {Boolean}			loading				是否显示加载状态 （默认 false ）
 * @property {String}			theme				主题模式 light/dark/auto （默认 'light' ）
 * @property {String}			leftIcon			左边返回图标的名称
 * @property {String}			leftText			左边的提示文字
 * @property {String}			rightText			右边的提示文字
 * @property {String}			rightIcon			右边返回图标的名称
 * @property {String}			title				导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String}			subtitle			导航栏副标题
 * @property {String}			bgColor				导航栏背景设置 （默认 '#ffffff' ）
 * @property {String | Number}	titleWidth			导航栏标题的最大宽度，内容超出会以省略号隐藏 （默认 '400rpx' ）
 * @property {String | Number}	height				导航栏高度(不包括状态栏高度在内，内部自动加上)（默认 '44px' ）
 * @property {String | Number}	leftIconSize		左侧返回图标的大小（默认 '36rpx' ）
 * @property {String | Number}	rightIconSize		右侧图标的大小（默认 '36rpx' ）
 * @property {String}			leftIconColor		左侧返回图标的颜色（默认 '#303133' ）
 * @property {String}			rightIconColor		右侧图标的颜色（默认 '#303133' ）
 * @property {Boolean}	        autoBack			点击左侧区域(返回图标)，是否自动返回上一页（默认 true ）
 * @property {Boolean}	        leftDisabled		是否禁用左侧区域点击（默认 false ）
 * @property {Boolean}	        rightDisabled		是否禁用右侧区域点击（默认 false ）
 * @property {Object | String}	titleStyle			标题的样式，对象或字符串
 * @property {Object | String}	subtitleStyle		副标题的样式，对象或字符串
 * @property {Number}			zIndex				层级（默认 980 ）
 * @property {Number}			hoverTime			按钮按下去的时间（默认 150 ）
 * @event {Function} leftClick		点击左侧区域
 * @event {Function} rightClick		点击右侧区域
 * @example <zx-navbar title="标题内容" left-text="返回" right-text="帮助" @left-click="onClickBack" @right-click="onClickRight"></zx-navbar>
 */
import { ref, computed, getCurrentInstance, onMounted, watch } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否开启顶部安全区适配
	safeAreaInsetTop: {
		type: Boolean,
		default: true
	},
	// 固定在顶部时，是否生成一个等高元素，以防止塌陷
	placeholder: {
		type: Boolean,
		default: true
	},
	// 是否固定在顶部
	fixed: {
		type: Boolean,
		default: false
	},
	// 是否显示下边框
	border: {
		type: Boolean,
		default: true
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: '#ececec'
	},
	// 是否透明背景
	transparent: {
		type: Boolean,
		default: false
	},
	// 是否沉浸式模式
	immersive: {
		type: Boolean,
		default: false
	},
	// 是否显示阴影
	shadow: {
		type: Boolean,
		default: false
	},
	// 是否显示加载状态
	loading: {
		type: Boolean,
		default: false
	},
	// 主题模式
	theme: {
		type: String,
		default: 'light',
		validator: (value) => ['light', 'dark', 'auto'].includes(value)
	},
	// 左边的图标
	leftIcon: {
		type: String,
		default: 'arrow-left'
	},
	// 左边的提示文字
	leftText: {
		type: String,
		default: ''
	},
	// 右边的提示文字
	rightText: {
		type: String,
		default: ''
	},
	// 右边的图标
	rightIcon: {
		type: String,
		default: ''
	},
	// 标题
	title: {
		type: [String, Number],
		default: ''
	},
	// 副标题
	subtitle: {
		type: String,
		default: ''
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: '#ffffff'
	},
	// 标题的宽度
	titleWidth: {
		type: [String, Number],
		default: '400rpx'
	},
	// 导航栏高度
	height: {
		type: [String, Number],
		default: '50px'
	},
	// 左侧返回图标的大小
	leftIconSize: {
		type: [String, Number],
		default: '36rpx'
	},
	// 右侧图标的大小
	rightIconSize: {
		type: [String, Number],
		default: '36rpx'
	},
	// 左侧返回图标的颜色
	leftIconColor: {
		type: String,
		default: '#303133'
	},
	// 右侧图标的颜色
	rightIconColor: {
		type: String,
		default: '#303133'
	},
	// 点击左侧区域(返回图标)，是否自动返回上一页
	autoBack: {
		type: Boolean,
		default: true
	},
	// 是否禁用左侧区域点击
	leftDisabled: {
		type: Boolean,
		default: false
	},
	// 是否禁用右侧区域点击
	rightDisabled: {
		type: Boolean,
		default: false
	},
	// 标题的样式，对象或字符串
	titleStyle: {
		type: [String, Object],
		default: null
	},
	// 副标题的样式，对象或字符串
	subtitleStyle: {
		type: [String, Object],
		default: null
	},
	// z-index层级
	zIndex: {
		type: Number,
		default: 980
	},
	// 按钮按下时间
	hoverTime: {
		type: Number,
		default: 150
	}
});

// 发出的事件
const emit = defineEmits(['leftClick', 'rightClick']);

const barHeight = ref(0);
const systemInfo = ref({});

// 主题样式类
const themeClass = computed(() => {
	if (props.theme === 'auto') {
		// 可以根据系统主题自动切换
		return 'zx-navbar--auto';
	}
	return `zx-navbar--${props.theme}`;
});

// 导航栏样式
const navbarStyle = computed(() => {
	const style = {
		height: typeof props.height === 'number' ? `${props.height}px` : props.height,
		backgroundColor: props.transparent ? 'transparent' : props.bgColor
	};

	if (props.immersive) {
		style.background = 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))';
		style.backdropFilter = 'blur(10px)';
	}

	return style;
});

// 中央区域样式
const centerStyle = computed(() => {
	const hasLeft = showLeft.value;
	const hasRight = showRight.value;

	if (!hasLeft && !hasRight) {
		return { flex: 1 };
	} else if (hasLeft && hasRight) {
		return {
			position: 'absolute',
			left: '80rpx',
			right: '80rpx',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		};
	} else {
		return {
			flex: 1,
			paddingLeft: hasLeft ? '80rpx' : '0',
			paddingRight: hasRight ? '80rpx' : '80rpx'
		};
	}
});

// 是否显示左侧区域
const showLeft = computed(() => {
	return props.autoBack || props.leftIcon || props.leftText || proxy.$slots.left;
});

// 是否显示右侧区域  
const showRight = computed(() => {
	return props.rightIcon || props.rightText || proxy.$slots.right;
});

// 无障碍标签
const leftAriaLabel = computed(() => {
	if (props.leftText) return props.leftText;
	if (props.autoBack) return '返回上一页';
	return '左侧操作按钮';
});

const rightAriaLabel = computed(() => {
	if (props.rightText) return props.rightText;
	return '右侧操作按钮';
});

// 图标样式类
const leftIconClass = computed(() => {
	return {
		'zx-navbar__icon--loading': props.loading
	};
});

const rightIconClass = computed(() => {
	return {
		'zx-navbar__icon--loading': props.loading
	};
});

onMounted(() => {
	getSystemInfo();
});

// 获取系统信息
const getSystemInfo = () => {
	try {
		const sys = uni.getWindowInfo();
		systemInfo.value = sys;
		barHeight.value = (sys.statusBarHeight || 0) + (typeof props.height === 'number' ? props.height : 44);
	} catch (error) {
		console.warn('获取系统信息失败:', error);
		barHeight.value = 44; // 默认高度
	}
};

// 点击左侧区域
const handleLeftClick = () => {
	if (props.leftDisabled || props.loading) return;

	emit('leftClick');

	if (props.autoBack) {
		try {
			uni.navigateBack({
				fail: () => {
					// 如果返回失败，可能是没有上一页，可以跳转到首页或其他逻辑
					console.warn('导航返回失败，可能已经是首页');
				}
			});
		} catch (error) {
			console.error('导航返回异常:', error);
		}
	}
};

// 点击右侧区域
const handleRightClick = () => {
	if (props.rightDisabled || props.loading) return;

	emit('rightClick');
};

// 监听主题变化
watch(() => props.theme, (newTheme) => {
	if (newTheme === 'auto') {
		// 可以监听系统主题变化
		// 这里可以添加监听系统主题的逻辑
	}
}, { immediate: true });
</script>

<style lang="scss" scoped>
.zx-navbar {

	// 主题样式
	&--light {
		.zx-navbar__content__title {
			color: #303133;
		}
	}

	&--dark {
		.zx-navbar__content__title {
			color: #ffffff;
		}

		.zx-navbar__content {
			background-color: #2c2c2c;
		}
	}

	// 固定定位
	&--fixed {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 980;
	}

	// 透明背景
	&--transparent {
		.zx-navbar__content {
			background-color: transparent !important;
		}
	}

	// 阴影效果
	&--shadow {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	&__placeholder {
		width: 100%;
	}

	&__content {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 44px;
		position: relative;
		transition: all 0.3s ease;

		// 沉浸式模式
		&--immersive {
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}

		&__left,
		&__right {
			padding: 0 32rpx;
			position: absolute;
			top: 0;
			bottom: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			min-width: 80rpx;
			transition: opacity 0.2s ease;

			&--disabled {
				opacity: 0.4;
				pointer-events: none;
			}
		}

		&__left {
			left: 0;
			justify-content: flex-start;

			&--hover {
				opacity: 0.6;
			}

			&__text {
				font-size: 32rpx;
				margin-left: 16rpx;
				line-height: 1.2;
			}
		}

		&__center {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-height: 44px;
		}

		&__title {
			text-align: center;
			font-size: 36rpx;
			font-weight: 500;
			color: #303133;
			line-height: 1.2;
			max-width: 100%;
		}

		&__subtitle {
			margin-top: 4rpx;

			text {
				font-size: 24rpx;
				color: #909399;
				line-height: 1;
			}
		}

		&__right {
			right: 0;
			justify-content: flex-end;

			&--hover {
				opacity: 0.6;
			}

			&__text {
				font-size: 32rpx;
				margin-left: 8rpx;
				line-height: 1.2;
			}
		}
	}

	&__loading {
		position: absolute;
		right: 32rpx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}
}

// 图标动画
.zx-navbar__icon--loading {
	animation: rotate 1s linear infinite;
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}

// 响应式设计
@media (max-width: 375px) {
	.zx-navbar__content {

		&__left,
		&__right {
			padding: 0 24rpx;
			min-width: 60rpx;
		}

		&__center {
			padding-left: 60rpx;
			padding-right: 60rpx;
		}

		&__title {
			font-size: 32rpx;
		}
	}
}

// 暗色模式适配
@media (prefers-color-scheme: dark) {
	.zx-navbar--auto {
		.zx-navbar__content__title {
			color: #ffffff;
		}

		.zx-navbar__content {
			background-color: #2c2c2c;
		}

		.zx-navbar__content__subtitle text {
			color: #a0a0a0;
		}
	}
}
</style>
