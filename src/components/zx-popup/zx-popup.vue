<template>
	<view class="zx-popup">
		<zx-overlay
			v-if="overlay"
			:show="show"
			@click="overlayClick"
			:duration="overlayDuration"
			:customStyle="overlayStyle"
			:opacity="overlayOpacity"
			:zIndex="zIndex - 1"
		></zx-overlay>
		<zx-transition :show="show" :customStyle="transitionStyle" :mode="position" :duration="duration" @afterEnter="afterEnter" @click="clickHandler">
			<view 
				class="zx-popup__content" 
				:style="[contentStyle,border?{border: '1rpx solid #ececec'}:'']" 
				@tap.stop="noop"
				:role="role"
				:aria-modal="true"
				:aria-label="ariaLabel"
			>
				<zx-status-bar v-if="safeAreaInsetTop"></zx-status-bar>
				<slot></slot>
				<view
					v-if="closeable"
					@tap.stop="close"
					class="zx-popup__content__close"
					:class="['zx-popup__content__close--' + closeIconPos]"
					hover-class="zx-popup__content__close--hover"
					hover-stay-time="150"
					role="button"
					aria-label="关闭"
				>
					<zx-icon name="close" color="#909399" size="36rpx" :bold="true"></zx-icon>
				</view>
				<zx-safe-bottom v-if="safeAreaInsetBottom"></zx-safe-bottom>
			</view>
		</zx-transition>
	</view>
</template>

<script setup>
/**
 * popup 弹窗
 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出
 * @tutorial https://zxui.org/components/popup
 * @property {Boolean}			show				是否展示弹窗 (默认 false )
 * @property {Boolean}			overlay				是否显示遮罩 （默认 true ）
 * @property {String}			mode				弹出方向（默认 'bottom' ）
 * @property {String | Number}	duration			动画时长，单位ms （默认 300 ）
 * @property {String | Number}	overlayDuration		遮罩层动画时长，单位ms （默认 350 ）
 * @property {Boolean}			closeable			是否显示关闭图标（默认 false ）
 * @property {Object | String}	overlayStyle		自定义遮罩的样式
 * @property {String | Number}	overlayOpacity		遮罩透明度，0-1之间（默认 0.5）
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭弹窗 （默认  true ）
 * @property {String | Number}	zIndex				层级 （默认 10075 ）
 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离 （默认 true ）
 * @property {Boolean}			safeAreaInsetTop	是否留出顶部安全距离（状态栏高度） （默认 false ）
 * @property {String}			closeIconPos		自定义关闭图标位置（默认 'top-right' ）
 * @property {String | Number}	round				圆角值（默认 0）
 * @property {Boolean}			zoom				当mode=center时 是否开启缩放（默认 true ）
 * @property {Object}			customStyle			组件的样式，对象形式
 * @property {Boolean}			closeOnEsc			是否支持ESC键关闭（默认 true ）
 * @property {Boolean}			lockScroll			是否锁定背景滚动（默认 true ）
 * @property {String}			role				ARIA角色属性（默认 'dialog' ）
 * @property {String}			ariaLabel			ARIA标签（默认 '弹窗' ）
 * @event {Function}            open                弹出层打开
 * @event {Function}            close               弹出层收起
 * @example <zx-popup><text>窗口内容</text></zx-popup>
 */
import { getCurrentInstance, ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';

const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否展示弹窗
	show: {
		type: Boolean,
		default: false
	},
	// 是否显示遮罩
	overlay: {
		type: Boolean,
		default: true
	},
	// 弹出的方向，可选值为 top bottom right left center
	mode: {
		type: String,
		default: 'bottom'
	},
	// 动画时长，单位ms
	duration: {
		type: [String, Number],
		default: 300
	},
	// 是否显示关闭图标
	closeable: {
		type: Boolean,
		default: false
	},
	// 自定义遮罩的样式
	overlayStyle: {
		type: [Object, String],
		default: () => {
			return {};
		}
	},
	// 点击遮罩是否关闭弹窗
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 层级
	zIndex: {
		type: [String, Number],
		default: 10075
	},
	// 是否为iPhoneX留出底部安全距离
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	// 是否留出顶部安全距离（状态栏高度）
	safeAreaInsetTop: {
		type: Boolean,
		default: false
	},
	// 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
	closeIconPos: {
		type: String,
		default: 'top-right'
	},
	// 是否显示圆角
	round: {
		type: [Boolean, String, Number],
		default: '5rpx'
	},
	// mode=center，也即中部弹出时，是否使用缩放模式
	zoom: {
		type: Boolean,
		default: true
	},
	// 弹窗背景色，设置为transparent可去除白色背景
	bgColor: {
		type: String,
		default: ''
	},
	// 遮罩的透明度，0-1之间
	overlayOpacity: {
		type: [String, Number],
		default: 0.8
	},
	// 边框
	border: {
		type: Boolean,
		default: false
	},
	customStyle: {
		type: Object,
		default: () => {
			return {};
		}
	},
	// 是否支持ESC键关闭
	closeOnEsc: {
		type: Boolean,
		default: true
	},
	// 是否锁定背景滚动
	lockScroll: {
		type: Boolean,
		default: true
	},
	// ARIA角色
	role: {
		type: String,
		default: 'dialog'
	},
	// ARIA标签
	ariaLabel: {
		type: String,
		default: '弹窗'
	}
});

const overlayDuration = ref(0);
let originalBodyOverflow = '';

// 监听ESC键
const handleKeydown = (event) => {
	if (event.key === 'Escape' && props.show && props.closeOnEsc) {
		close();
	}
};

onMounted(() => {
	overlayDuration.value = parseInt(props.duration) + 50;
	
	// 添加ESC键盘事件监听
	// #ifdef H5
	document.addEventListener('keydown', handleKeydown);
	// #endif
});

onBeforeUnmount(() => {
	// 移除ESC键盘事件监听
	// #ifdef H5
	document.removeEventListener('keydown', handleKeydown);
	// #endif
	
	// 恢复滚动状态
	if (props.lockScroll) {
		enableScroll();
	}
});

const transitionStyle = computed(() => {
	const style = {
		zIndex: props.zIndex,
		position: 'fixed',
		display: 'flex'
	};
	style[props.mode] = 0;
	if (props.mode === 'left') {
		style.bottom = 0;
		style.top = 0;
		return style;
	} else if (props.mode === 'right') {
		style.bottom = 0;
		style.top = 0;
		return style;
	} else if (props.mode === 'top') {
		style.left = 0;
		style.right = 0;
		return style;
	} else if (props.mode === 'bottom') {
		style.left = 0;
		style.right = 0;
		return style;
	} else if (props.mode === 'center') {
		style.alignItems = 'center';
		style['justify-content'] = 'center';
		style.bottom = 0;
		style.top = 0;
		style.left = 0;
		style.right = 0;
		return style;
	}
});

const contentStyle = computed(() => {
	const style = {};
	// 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
	if (props.mode !== 'center') {
		style.flex = 1;
	}
	// 背景色，一般用于设置为transparent，去除默认的白色背景
	if (props.bgColor) {
		style.backgroundColor = props.bgColor;
	}
	if (props.round) {
		const value = props.round;
		if (props.mode === 'top') {
			style.borderBottomLeftRadius = value;
			style.borderBottomRightRadius = value;
		} else if (props.mode === 'bottom') {
			style.borderTopLeftRadius = value;
			style.borderTopRightRadius = value;
		} else if (props.mode === 'center') {
			style.borderRadius = value;
		}
	}
	return style;
});

const position = computed(() => {
	if (props.mode === 'center') {
		return props.zoom ? 'fade-zoom' : 'fade';
	}
	if (props.mode === 'left') {
		return 'slide-left';
	}
	if (props.mode === 'right') {
		return 'slide-right';
	}
	if (props.mode === 'bottom') {
		return 'slide-up';
	}
	if (props.mode === 'top') {
		return 'slide-down';
	}
});

// 禁用滚动
const disableScroll = () => {
	// #ifdef H5
	if (document && document.body) {
		originalBodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
	}
	// #endif
};

// 启用滚动
const enableScroll = () => {
	// #ifdef H5
	if (document && document.body) {
		document.body.style.overflow = originalBodyOverflow;
	}
	// #endif
};

watch(() => props.show, (newValue) => {
	if (newValue) {
		// 弹窗显示时
		if (props.lockScroll) {
			disableScroll();
		}
		
		// #ifdef MP-WEIXIN
		const children = proxy.$children;
		retryComputedComponentRect(children);
		// #endif
	} else {
		// 弹窗关闭时
		if (props.lockScroll) {
			enableScroll();
		}
	}
});

// 点击遮罩
const overlayClick = () => {
	if (props.closeOnClickOverlay) {
		proxy.$emit('close');
	}
};

const close = (e) => {
	proxy.$emit('close');
};

const afterEnter = () => {
	proxy.$emit('open');
};

const clickHandler = () => {
	// 由于中部弹出时，其zx-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件，是否无法通过点击遮罩关闭弹窗
	if (props.mode === 'center') {
		overlayClick();
	}
	proxy.$emit('click');
};

const noop = () => {};

// #ifdef MP-WEIXIN
const retryComputedComponentRect = (children) => {
	// 组件内部需要计算节点的组件
	const names = [
		'zx-calendar-month',
		'zx-album',
		'zx-collapse-item',
		'zx-dropdown',
		'zx-index-item',
		'zx-index-list',
		'zx-line-progress',
		'zx-list-item',
		'zx-rate',
		'zx-read-more',
		'zx-row',
		'zx-row-notice',
		'zx-scroll-list',
		'zx-skeleton',
		'zx-slider',
		'zx-steps-item',
		'zx-sticky',
		'zx-subsection',
		'zx-swipe-action-item',
		'zx-tabbar',
		'zx-tabs',
		'zx-tooltip'
	];
	// 历遍所有的子组件节点
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		// 拿到子组件的子组件
		const grandChild = child.$children;
		// 判断如果在需要重新初始化的组件数组中名中，并且存在init方法的话，则执行
		if (names.includes(child.$options.name) && typeof child?.init === 'function') {
			// 需要进行一定的延时，因为初始化页面需要时间
			proxy.$util.sleep(50).then(() => {
				child.init();
			});
		}
		// 如果子组件还有孙组件，进行递归历遍
		if (grandChild.length) {
			retryComputedComponentRect(grandChild);
		}
	}
};
// #endif
</script>

<style lang="scss" scoped>
.zx-popup {
	flex: 1;
	&__content {
		background-color: #ffffff;
		position: relative;
		box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
		max-height: 100vh;
		overflow: auto;

		&--round-top {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}

		&--round-left {
			border-top-left-radius: 0;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 10px;
		}

		&--round-right {
			border-top-left-radius: 10px;
			border-top-right-radius: 0;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 0;
		}

		&--round-bottom {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		&--round-center {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}

		&__close {
			position: absolute;
			transition: opacity 0.2s;

			&--hover {
				opacity: 0.4;
			}
		}

		&__close--top-left {
			top: 15px;
			left: 15px;
		}

		&__close--top-right {
			top: 15px;
			right: 15px;
		}

		&__close--bottom-left {
			bottom: 15px;
			left: 15px;
		}

		&__close--bottom-right {
			right: 15px;
			bottom: 15px;
		}
	}
}
</style>
