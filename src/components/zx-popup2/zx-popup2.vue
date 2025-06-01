<template>
	<view class="zx-popup" v-if="shouldRender">
		<!-- 遮罩层 -->
		<zx-overlay v-if="overlay" :show="show" @click="overlayClick" :duration="overlayDuration"
			:customStyle="overlayStyle" :opacity="overlayOpacity" :zIndex="computedZIndex - 1"
			:class="overlayClass"></zx-overlay>

		<!-- 弹窗内容 -->
		<zx-transition :show="show" :customStyle="transitionStyle" :mode="position" :duration="duration"
			@afterEnter="afterEnter" @afterLeave="afterLeave" @click="clickHandler">
			<view ref="popupRef" class="zx-popup__content" :class="contentClass"
				:style="[contentStyle, customStyle, border ? { border: '1rpx solid #ececec' } : '']" @tap.stop="noop"
				@keydown="onKeydown" :role="role" :aria-modal="true" :aria-label="ariaLabel" :tabindex="0">
				<zx-status-bar v-if="safeAreaInsetTop"></zx-status-bar>

				<!-- 插槽内容 -->
				<slot></slot>

				<!-- 关闭图标 -->
				<view v-if="closeable" @tap.stop="onClickCloseIcon" class="zx-popup__content__close"
					:class="['zx-popup__content__close--' + closeIconPosition]"
					hover-class="zx-popup__content__close--hover" hover-stay-time="150" role="button" aria-label="关闭"
					:tabindex="0">
					<zx-icon :name="closeIcon" :color="closeIconColor" :size="closeIconSize" :bold="true"></zx-icon>
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
 * @property {String}			position			弹出位置，可选值为 top bottom right left center（默认 'bottom' ）
 * @property {String | Number}	duration			动画时长，单位ms （默认 300 ）
 * @property {Boolean}			closeable			是否显示关闭图标（默认 false ）
 * @property {String}			closeIcon			关闭图标名称（默认 'close' ）
 * @property {String}			closeIconPosition	关闭图标位置（默认 'top-right' ）
 * @property {String}			closeIconColor		关闭图标颜色（默认 '#909399' ）
 * @property {String}			closeIconSize		关闭图标大小（默认 '36rpx' ）
 * @property {Object | String}	overlayStyle		自定义遮罩的样式
 * @property {String | Array}	overlayClass		自定义遮罩的类名
 * @property {String | Number}	overlayOpacity		遮罩透明度，0-1之间（默认 0.5）
 * @property {Boolean}			closeOnClickOverlay	点击遮罩是否关闭弹窗 （默认  true ）
 * @property {String | Number}	zIndex				层级 （默认 10075 ）
 * @property {Boolean}			safeAreaInsetBottom	是否为iPhoneX留出底部安全距离 （默认 true ）
 * @property {Boolean}			safeAreaInsetTop	是否留出顶部安全距离（状态栏高度） （默认 false ）
 * @property {String | Number}	round				圆角值（默认 '5rpx'）
 * @property {Boolean}			zoom				当position=center时 是否开启缩放（默认 true ）
 * @property {String}			bgColor				弹窗背景色，设置为transparent可去除白色背景
 * @property {Boolean}			border				是否显示边框（默认 false ）
 * @property {Object}			customStyle			组件的样式，对象形式
 * @property {Boolean}			closeOnEsc			是否支持ESC键关闭（默认 true ）
 * @property {Boolean}			lockScroll			是否锁定背景滚动（默认 true ）
 * @property {Boolean}			lazyRender			是否在显示弹层时才渲染节点（默认 true ）
 * @property {Boolean}			destroyOnClose		是否在关闭时销毁内容（默认 false ）
 * @property {Function}			beforeClose			关闭前的回调函数
 * @property {Boolean}			closeOnPopstate		是否在页面回退时自动关闭（默认 false ）
 * @property {String}			transition			自定义过渡动画名称
 * @property {Boolean}			transitionAppear	是否在初始渲染时启用过渡动画（默认 false ）
 * @property {String}			role				ARIA角色属性（默认 'dialog' ）
 * @property {String}			ariaLabel			ARIA标签（默认 '弹窗' ）
 * @event {Function}            open                弹出层打开时立即触发
 * @event {Function}            opened              弹出层打开且动画结束后触发
 * @event {Function}            close               弹出层关闭时立即触发
 * @event {Function}            closed              弹出层关闭且动画结束后触发
 * @event {Function}            click               点击弹出层时触发
 * @event {Function}            clickOverlay        点击遮罩层时触发
 * @event {Function}            clickCloseIcon      点击关闭图标时触发
 * @event {Function}            keydown             按键事件
 * @example <zx-popup v-model:show="show"><text>窗口内容</text></zx-popup>
 */
import {
	getCurrentInstance,
	ref,
	computed,
	onMounted,
	onBeforeUnmount,
	onActivated,
	onDeactivated,
	watch,
	nextTick,
	provide
} from 'vue';

const { proxy } = getCurrentInstance();

// 定义事件
const emit = defineEmits([
	'update:show',
	'open',
	'opened',
	'close',
	'closed',
	'click',
	'clickOverlay',
	'clickCloseIcon',
	'keydown'
]);

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
	// 弹出位置，可选值为 top bottom right left center
	position: {
		type: String,
		default: 'bottom',
		validator: (value) => ['top', 'bottom', 'left', 'right', 'center'].includes(value)
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
	// 关闭图标名称
	closeIcon: {
		type: String,
		default: 'close'
	},
	// 关闭图标位置
	closeIconPosition: {
		type: String,
		default: 'top-right',
		validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
	},
	// 关闭图标颜色
	closeIconColor: {
		type: String,
		default: '#909399'
	},
	// 关闭图标大小
	closeIconSize: {
		type: String,
		default: '36rpx'
	},
	// 自定义遮罩层类名
	overlayClass: {
		type: [String, Array, Object],
		default: ''
	},
	// 是否显示圆角
	round: {
		type: [Boolean, String, Number],
		default: '5rpx'
	},
	// position=center，也即中部弹出时，是否使用缩放模式
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
	},
	// 是否在显示弹层时才渲染节点
	lazyRender: {
		type: Boolean,
		default: true
	},
	// 是否在关闭时销毁内容
	destroyOnClose: {
		type: Boolean,
		default: false
	},
	// 关闭前的回调函数
	beforeClose: {
		type: Function,
		default: null
	},
	// 是否在页面回退时自动关闭
	closeOnPopstate: {
		type: Boolean,
		default: false
	},
	// 自定义过渡动画名称
	transition: {
		type: String,
		default: ''
	},
	// 是否在初始渲染时启用过渡动画
	transitionAppear: {
		type: Boolean,
		default: false
	}
});

// 响应式数据
const overlayDuration = ref(0);
const popupRef = ref(null);
const opened = ref(false);
const shouldReopen = ref(false);
const computedZIndex = ref(props.zIndex);

// 滚动锁定相关
let originalBodyOverflow = '';

// 弹窗重新打开的标识
const POPUP_TOGGLE_KEY = Symbol('popup-toggle');

// 监听ESC键
const handleKeydown = (event) => {
	if (event.key === 'Escape' && props.show && props.closeOnEsc) {
		close();
	}
};

// 监听浏览器后退事件
const handlePopstate = () => {
	if (props.closeOnPopstate && props.show) {
		close();
		shouldReopen.value = false;
	}
};

onMounted(() => {
	overlayDuration.value = parseInt(props.duration) + 50;

	// 添加ESC键盘事件监听
	// #ifdef H5
	document.addEventListener('keydown', handleKeydown);
	document.addEventListener('popstate', handlePopstate);
	// #endif

	// 如果初始状态为显示，则打开弹窗
	if (props.show) {
		open();
	}
});

onBeforeUnmount(() => {
	// 移除事件监听
	// #ifdef H5
	document.removeEventListener('keydown', handleKeydown);
	document.removeEventListener('popstate', handlePopstate);
	// #endif

	// 恢复滚动状态
	if (props.lockScroll) {
		enableScroll();
	}
});

// Keep-alive 相关生命周期
onActivated(() => {
	if (shouldReopen.value) {
		emit('update:show', true);
		shouldReopen.value = false;
	}
});

onDeactivated(() => {
	if (props.show) {
		close();
		shouldReopen.value = true;
	}
});

// 计算属性
const transitionStyle = computed(() => {
	const style = {
		zIndex: computedZIndex.value,
		position: 'fixed',
		display: 'flex'
	};

	// 设置动画时长
	if (props.duration) {
		const key = props.position === 'center' ? 'animationDuration' : 'transitionDuration';
		style[key] = `${props.duration}ms`;
	}

	style[props.position] = 0;
	if (props.position === 'left') {
		style.bottom = 0;
		style.top = 0;
		return style;
	} else if (props.position === 'right') {
		style.bottom = 0;
		style.top = 0;
		return style;
	} else if (props.position === 'top') {
		style.left = 0;
		style.right = 0;
		return style;
	} else if (props.position === 'bottom') {
		style.left = 0;
		style.right = 0;
		return style;
	} else if (props.position === 'center') {
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
	if (props.position !== 'center') {
		style.flex = 1;
	}
	// 背景色，一般用于设置为transparent，去除默认的白色背景
	if (props.bgColor) {
		style.backgroundColor = props.bgColor;
	}
	// 圆角处理
	if (props.round) {
		const value = props.round;
		if (props.position === 'top') {
			style.borderBottomLeftRadius = value;
			style.borderBottomRightRadius = value;
		} else if (props.position === 'bottom') {
			style.borderTopLeftRadius = value;
			style.borderTopRightRadius = value;
		} else if (props.position === 'left') {
			style.borderTopRightRadius = value;
			style.borderBottomRightRadius = value;
		} else if (props.position === 'right') {
			style.borderTopLeftRadius = value;
			style.borderBottomLeftRadius = value;
		} else if (props.position === 'center') {
			style.borderRadius = value;
		}
	}
	return style;
});

const contentClass = computed(() => {
	const classes = [];
	if (props.round) {
		classes.push(`zx-popup__content--round-${props.position}`);
	}
	return classes;
});

const position = computed(() => {
	if (props.transition) {
		return props.transition;
	}
	if (props.position === 'center') {
		return props.zoom ? 'fade-zoom' : 'fade';
	}
	if (props.position === 'left') {
		return 'slide-left';
	}
	if (props.position === 'right') {
		return 'slide-right';
	}
	if (props.position === 'bottom') {
		return 'slide-up';
	}
	if (props.position === 'top') {
		return 'slide-down';
	}
});

// 懒渲染控制
const shouldRender = computed(() => {
	return props.show || !props.lazyRender || opened.value;
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

// 监听显示状态变化
watch(() => props.show, (show) => {
	if (show && !opened.value) {
		open();
		// 自动聚焦
		nextTick(() => {
			if (popupRef.value) {
				// #ifdef H5
				// 检查元素是否支持 focus 方法
				if (typeof popupRef.value.focus === 'function') {
					popupRef.value.focus();
				}
				// #endif
			}
		});
	}
	if (!show && opened.value) {
		opened.value = false;
		emit('close');
	}

	if (show) {
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

// 方法定义
const open = () => {
	if (!opened.value) {
		opened.value = true;
		computedZIndex.value = props.zIndex;
		emit('open');
	}
};

const close = () => {
	if (opened.value) {
		// 如果有关闭前回调，先执行回调
		if (props.beforeClose) {
			props.beforeClose({
				done: () => {
					opened.value = false;
					emit('close');
					emit('update:show', false);
				}
			});
		} else {
			opened.value = false;
			emit('close');
			emit('update:show', false);
		}
	}
};

// 点击遮罩
const overlayClick = (event) => {
	emit('clickOverlay', event);
	if (props.closeOnClickOverlay) {
		close();
	}
};

// 点击关闭图标
const onClickCloseIcon = (event) => {
	emit('clickCloseIcon', event);
	close();
};

// 动画完成事件
const afterEnter = () => {
	emit('opened');
};

const afterLeave = () => {
	emit('closed');
};

// 键盘事件
const onKeydown = (event) => {
	emit('keydown', event);
};

const clickHandler = (event) => {
	// 由于中部弹出时，其zx-transition占据了整个页面相当于遮罩，此时需要发出遮罩点击事件
	if (props.position === 'center') {
		overlayClick(event);
	}
	emit('click', event);
};

const noop = () => { };

// 提供弹窗状态给子组件
provide(POPUP_TOGGLE_KEY, () => props.show);

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

	// 增强的无障碍支持
	&__content:focus {
		outline: none;
	}

	// 响应式设计优化
	@media (max-width: 768px) {
		&__content {
			max-width: 95vw;
			max-height: 90vh;
		}
	}

	// 高对比度模式支持
	@media (prefers-contrast: high) {
		&__content {
			border: 2px solid;
		}
	}

	// 减少动画模式支持
	@media (prefers-reduced-motion: reduce) {
		&__content {
			transition: none !important;
			animation: none !important;
		}
	}

	// 暗色模式支持
	@media (prefers-color-scheme: dark) {
		&__content {
			background-color: #1a1a1a;
			color: #ffffff;
			box-shadow: 0 1px 10px rgba(255, 255, 255, 0.1);
		}

		&__content__close {
			color: #cccccc;
		}
	}
}
</style>
