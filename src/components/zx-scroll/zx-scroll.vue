<template>
	<view class="zx-scroll-outer">
		<scroll-view
			ref="scrollViewRef"
			v-bind="scrollViewProps"
			:style="scrollViewStyle"
			:class="['zx-scroll-view', customClass]"
			@scroll="handleScroll"
			@scrolltoupper="handleScrollToUpper"
			@scrolltolower="handleScrollToLower"
			@refresherpulling="handleRefresherPulling"
			@refresherrefresh="handleRefresherRefresh"
			@refresherrestore="handleRefresherRestore"
			@refresherabort="handleRefresherAbort"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<!-- 自定义下拉刷新器 -->
			<template v-if="refresherEnabled && customRefresher">
				<slot name="refresher" :triggered="refresherTriggered"></slot>
			</template>
			
			<!-- 主内容 -->
			<view class="zx-scroll-container" :class="containerClass">
				<!-- 虚拟列表 -->
				<template v-if="enableVirtualList">
					<view 
						class="zx-scroll-virtual-list"
						:class="virtualListClass"
						:style="virtualListStyle"
					>
						<view 
							v-for="vItem in visibleItems" 
							:key="`virtual-${vItem.index}`"
							class="zx-scroll-virtual-item"
							:style="getVirtualItemStyle(vItem.index)"
						>
							<slot 
								:name="direction === 'y' ? 'virtual-item' : 'virtual-item-horizontal'" 
								:item="vItem.item" 
								:index="vItem.index"
								:isVisible="true"
							></slot>
						</view>
					</view>
				</template>
				
				<!-- 普通内容插槽 -->
				<slot></slot>
			</view>
			
			<!-- 加载更多区域 -->
			<view v-if="showLoadMore" class="zx-scroll-load-more">
				<slot name="loadMore" :loading="isLoading" :noMore="noMore">
					<view v-if="isLoading" class="zx-scroll-load-more-default">
						<view class="zx-scroll-loading-icon" :class="loadingIconClass"></view>
						<text class="zx-scroll-loading-text">{{ loadingText }}</text>
					</view>
					<view v-else-if="noMore" class="zx-scroll-no-more">
						<text>{{ noMoreText }}</text>
					</view>
				</slot>
			</view>
			
			<!-- 空内容提示 -->
			<view v-if="isEmpty" class="zx-scroll-empty">
				<slot name="empty">
					<view class="zx-scroll-empty-default">
						<text class="zx-scroll-empty-text">{{ emptyText }}</text>
					</view>
				</slot>
			</view>
		</scroll-view>
		
		<!-- 返回顶部按钮 -->
		<transition name="zx-scroll-fade">
			<view 
				v-if="showBackTop && showBackTopButton" 
				class="zx-scroll-back-top" 
				:style="backTopButtonStyle" 
				@tap="scrollToTop"
			>
				<slot name="backTop" :scrollTop="currentScrollPosition">
					<view class="zx-scroll-back-top-default">
						<text class="zx-scroll-back-top-icon">↑</text>
					</view>
				</slot>
			</view>
		</transition>
	</view>
</template>

<script setup>
import { 
	onMounted, 
	ref, 
	computed, 
	nextTick, 
	watch, 
	getCurrentInstance, 
	onBeforeUnmount,
	reactive,
	toRefs,
	shallowRef
} from 'vue';

/**
 * zx-scroll 增强滚动组件
 * @description 基于uni-app的scroll-view的增强组件，支持更多自定义功能
 */

// Props 定义
const props = defineProps({
	/** 滚动方向：x-横向滚动, y-纵向滚动 */
	direction: {
		type: String,
		default: 'y',
		validator: (value) => ['x', 'y'].includes(value)
	},
	/** 滚动条位置 */
	position: {
		type: [Number, String],
		default: 0
	},
	/** 容器宽度，支持常规CSS宽度值，如100%、100px */
	width: {
		type: String,
		default: '100%'
	},
	/** 容器高度，支持常规CSS高度值，如400rpx、100vh */
	height: {
		type: String,
		default: '400rpx'
	},
	/** 距顶部/左边多远时（单位px），触发scrolltoupper事件 */
	upperThreshold: {
		type: [Number, String],
		default: 50
	},
	/** 距底部/右边多远时（单位px），触发scrolltolower事件 */
	lowerThreshold: {
		type: [Number, String],
		default: 50
	},
	/** 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素 */
	scrollIntoView: {
		type: String,
		default: ''
	},
	/** 在设置滚动条位置时使用动画过渡 */
	scrollWithAnimation: {
		type: Boolean,
		default: true
	},
	/** iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向 */
	enableBackToTop: {
		type: Boolean,
		default: true
	},
	/** 控制是否出现滚动条 */
	showScrollbar: {
		type: Boolean,
		default: false
	},
	/** 开启自定义下拉刷新 */
	refresherEnabled: {
		type: Boolean,
		default: false
	},
	/** 设置自定义下拉刷新阈值 */
	refresherThreshold: {
		type: Number,
		default: 45
	},
	/** 设置当前下拉刷新状态，true表示下拉刷新已经被触发，false表示下拉刷新未被触发 */
	refresherTriggered: {
		type: Boolean,
		default: false
	},
	/** 设置自定义下拉刷新默认样式，支持设置black，white，none（表示不使用默认样式） */
	refresherDefaultStyle: {
		type: String,
		default: 'black',
		validator: (value) => ['black', 'white', 'none'].includes(value)
	},
	/** 设置自定义下拉刷新区域背景颜色 */
	refresherBackground: {
		type: String,
		default: '#ffffff'
	},
	/** 启用flexbox布局。开启后，当前节点声明了display:flex就会成为flex container，并作用于其孩子节点 */
	enableFlex: {
		type: Boolean,
		default: false
	},
	/** 开启scroll anchoring特性，即控制滚动位置不随内容变化而抖动，仅在iOS下生效，安卓下可参考CSS overflow-anchor属性 */
	scrollAnchoring: {
		type: Boolean,
		default: false
	},
	/** 背景颜色 */
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	/** 是否显示返回顶部按钮（仅在竖向滚动时有效） */
	showBackTop: {
		type: Boolean,
		default: false
	},
	/** 返回顶部按钮显示的滚动距离阈值 */
	backTopThreshold: {
		type: Number,
		default: 200
	},
	/** 自定义返回顶部按钮样式 */
	backTopStyle: {
		type: Object,
		default: () => ({})
	},
	/** 是否显示加载更多 */
	showLoadMore: {
		type: Boolean,
		default: false
	},
	/** 是否处于加载中状态 */
	isLoading: {
		type: Boolean,
		default: false
	},
	/** 是否已加载全部数据 */
	noMore: {
		type: Boolean,
		default: false
	},
	/** 加载中文本 */
	loadingText: {
		type: String,
		default: '加载中...'
	},
	/** 没有更多数据文本 */
	noMoreText: {
		type: String,
		default: '没有更多数据了'
	},
	/** 内容为空时是否显示空内容提示 */
	isEmpty: {
		type: Boolean,
		default: false
	},
	/** 空内容提示文本 */
	emptyText: {
		type: String,
		default: '暂无数据'
	},
	/** 边框圆角 */
	borderRadius: {
		type: String,
		default: '0'
	},
	/** 边框 */
	border: {
		type: String,
		default: 'none'
	},
	/** 内边距 */
	padding: {
		type: String,
		default: '0'
	},
	/** 阴影 */
	boxShadow: {
		type: String,
		default: 'none'
	},
	/** 增强安卓性能 */
	enhanced: {
		type: Boolean,
		default: false
	},
	/** iOS是否回弹 */
	bounce: {
		type: Boolean,
		default: true
	},
	/** 分页滑动效果，仅在iOS生效 */
	pagingEnabled: {
		type: Boolean,
		default: false
	},
	/** 滑动减速速率加快 */
	fastDeceleration: {
		type: Boolean,
		default: false
	},
	/** 启用拖拽滚动 */
	enableDrag: {
		type: Boolean,
		default: false
	},
	/** 自动滚动的时间间隔（毫秒）, 0表示不自动滚动 */
	autoScrollInterval: {
		type: Number,
		default: 0
	},
	/** 自定义类名 */
	customClass: {
		type: String,
		default: ''
	},
	/** 自定义刷新器 */
	customRefresher: {
		type: Boolean,
		default: false
	},
	/** 自动滚动的速度 */
	autoScrollSpeed: {
		type: Number,
		default: 1
	},
	/** 是否防抖，避免频繁触发滚动事件 */
	debounce: {
		type: Boolean,
		default: true
	},
	/** 防抖延迟时间（毫秒） */
	debounceTime: {
		type: Number,
		default: 100
	},
	/** 是否启用虚拟列表 */
	enableVirtualList: {
		type: Boolean,
		default: false
	},
	/** 虚拟列表项高度 */
	virtualItemHeight: {
		type: Number,
		default: 50
	},
	/** 虚拟列表缓冲区大小 */
	virtualBuffer: {
		type: Number,
		default: 5
	},
	/** 虚拟列表数据源 */
	virtualListSource: {
		type: Array,
		default: () => []
	},
	/** 虚拟列表项宽度 (水平滚动时使用) */
	virtualItemWidth: {
		type: Number,
		default: 100
	},
	/** 节流模式，用于性能优化 */
	throttle: {
		type: Boolean,
		default: false
	},
	/** 节流时间（毫秒） */
	throttleTime: {
		type: Number,
		default: 16
	},
	/** 预加载距离 */
	preloadDistance: {
		type: Number,
		default: 100
	}
});

// 事件发射器
const emit = defineEmits([
	'scroll',
	'scrolltoupper',
	'scrolltolower',
	'refresherpulling',
	'refresherrefresh',
	'refresherrestore',
	'refresherabort',
	'loadMore',
	'inited',
	'dragStart',
	'dragMove',
	'dragEnd',
	'virtualScroll'
]);

// 响应式数据
const scrollViewRef = shallowRef(null);
const currentScrollPosition = ref(0);
const showBackTopButton = ref(false);
const isInitialized = ref(false);

// 状态管理
const state = reactive({
	scrollSize: { width: 0, height: 0 },
	contentSize: { width: 0, height: 0 },
	dragState: {
		isDragging: false,
		startX: 0,
		startY: 0,
		lastX: 0,
		lastY: 0,
		deltaX: 0,
		deltaY: 0
	}
});

// 定时器
let autoScrollTimer = null;
let debounceTimer = null;
let throttleTimer = null;

// 获取当前组件实例
const instance = getCurrentInstance();

// 计算属性
const scrollViewProps = computed(() => {
	const baseProps = {
		'scroll-into-view': props.scrollIntoView,
		'upper-threshold': props.upperThreshold,
		'lower-threshold': props.lowerThreshold,
		'scroll-with-animation': props.scrollWithAnimation,
		'enable-back-to-top': props.enableBackToTop,
		'show-scrollbar': props.showScrollbar,
		'refresher-enabled': props.refresherEnabled,
		'refresher-threshold': props.refresherThreshold,
		'refresher-default-style': props.refresherDefaultStyle,
		'refresher-background': props.refresherBackground,
		'refresher-triggered': props.refresherTriggered,
		'enable-flex': props.enableFlex,
		'scroll-anchoring': props.scrollAnchoring,
		'enhanced': props.enhanced,
		'bounce': props.bounce,
		'paging-enabled': props.pagingEnabled,
		'fast-deceleration': props.fastDeceleration
	};

	// 根据方向设置滚动属性
	if (props.direction === 'y') {
		return {
			...baseProps,
			'scroll-y': true,
			'scroll-top': props.position
		};
	} else {
		return {
			...baseProps,
			'scroll-x': true,
			'scroll-left': props.position
		};
	}
});

const scrollViewStyle = computed(() => ({
	width: props.width,
	height: props.height,
	backgroundColor: props.backgroundColor,
	borderRadius: props.borderRadius,
	border: props.border,
	padding: props.padding,
	boxShadow: props.boxShadow,
	...(props.direction === 'x' && { whiteSpace: 'nowrap' })
}));

const containerClass = computed(() => ({
	'zx-scroll-horizontal': props.direction === 'x',
	'zx-scroll-flex': props.enableFlex
}));

const virtualListClass = computed(() => ({
	'zx-scroll-virtual-list-vertical': props.direction === 'y',
	'zx-scroll-virtual-list-horizontal': props.direction === 'x'
}));

const virtualListStyle = computed(() => {
	if (!props.enableVirtualList || !props.virtualListSource.length) return {};
	
	if (props.direction === 'y') {
		return {
			height: props.virtualListSource.length * props.virtualItemHeight + 'px'
		};
	} else {
		return {
			width: props.virtualListSource.length * props.virtualItemWidth + 'px'
		};
	}
});

const loadingIconClass = computed(() => ({
	'zx-scroll-loading-spin': props.isLoading
}));

const backTopButtonStyle = computed(() => ({
	...props.backTopStyle,
	...(props.direction === 'y' && {
		position: 'fixed',
		right: '20rpx',
		bottom: '120rpx',
		zIndex: 9999
	})
}));

// 虚拟列表可见项计算
const visibleItems = computed(() => {
	if (!props.enableVirtualList || !props.virtualListSource.length) return [];
	
	const { scrollSize } = state;
	const isVertical = props.direction === 'y';
	const itemSize = isVertical ? props.virtualItemHeight : props.virtualItemWidth;
	const containerSize = isVertical ? scrollSize.height : scrollSize.width;
	
	// 计算可见范围
	const startIndex = Math.max(0, Math.floor(currentScrollPosition.value / itemSize) - props.virtualBuffer);
	const visibleCount = Math.ceil(containerSize / itemSize);
	const endIndex = Math.min(
		props.virtualListSource.length - 1,
		startIndex + visibleCount + props.virtualBuffer * 2
	);
	
	// 触发虚拟滚动事件
	if (isInitialized.value) {
		emit('virtualScroll', {
			visibleRange: { start: startIndex, end: endIndex + 1 },
			scrollPosition: currentScrollPosition.value
		});
	}
	
	return props.virtualListSource.slice(startIndex, endIndex + 1).map((item, i) => ({
		item,
		index: startIndex + i
	}));
});

// 工具函数
const throttle = (func, delay) => {
	let timeoutId = null;
	let lastExecTime = 0;
	return function (...args) {
		const currentTime = Date.now();
		
		if (currentTime - lastExecTime > delay) {
			func.apply(this, args);
			lastExecTime = currentTime;
		} else {
			if (timeoutId) clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				func.apply(this, args);
				lastExecTime = Date.now();
			}, delay - (currentTime - lastExecTime));
		}
	};
};

// 事件处理函数
const handleScroll = (e) => {
	if (props.throttle) {
		throttledScroll(e);
	} else if (props.debounce) {
		debouncedScroll(e);
	} else {
		processScrollEvent(e);
	}
};

const handleScrollToUpper = (e) => {
	emit('scrolltoupper', e);
};

const handleScrollToLower = (e) => {
	if (props.showLoadMore && !props.noMore && !props.isLoading) {
		emit('loadMore');
	}
	emit('scrolltolower', e);
};

const handleRefresherPulling = (e) => {
	emit('refresherpulling', e);
};

const handleRefresherRefresh = (e) => {
	emit('refresherrefresh', e);
};

const handleRefresherRestore = (e) => {
	emit('refresherrestore', e);
};

const handleRefresherAbort = (e) => {
	emit('refresherabort', e);
};

// 创建节流和防抖处理函数
const throttledScroll = throttle((e) => {
	processScrollEvent(e);
}, props.throttleTime);

const debouncedScroll = (e) => {
	if (debounceTimer) clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
		processScrollEvent(e);
	}, props.debounceTime);
};

const processScrollEvent = (e) => {
	if (!e?.detail) return;
	
	currentScrollPosition.value = props.direction === 'y' ? e.detail.scrollTop : e.detail.scrollLeft;
	
	// 检查是否显示返回顶部按钮
	if (props.showBackTop && props.direction === 'y') {
		showBackTopButton.value = currentScrollPosition.value > props.backTopThreshold;
	}
	
	// 虚拟列表尺寸检查
	if (props.enableVirtualList && props.virtualListSource.length > 0) {
		if (state.scrollSize.width === 0 || state.scrollSize.height === 0) {
			refreshSize();
		}
	}
	
	// 触发滚动事件
	emit('scroll', {
		scrollTop: e.detail.scrollTop || 0,
		scrollLeft: e.detail.scrollLeft || 0,
		scrollHeight: e.detail.scrollHeight || 0,
		scrollWidth: e.detail.scrollWidth || 0,
		deltaX: e.detail.deltaX || 0,
		deltaY: e.detail.deltaY || 0
	});
};

// 初始化滚动容器尺寸
const initScrollSize = () => {
	nextTick(() => {
		if (!scrollViewRef.value || !instance) return;
		
		try {
			const query = uni.createSelectorQuery().in(instance);
			query.select('.zx-scroll-container').boundingClientRect(data => {
				if (data) {
					state.scrollSize = {
						width: data.width,
						height: data.height
					};
					state.contentSize = {
						width: props.direction === 'x' ? data.scrollWidth : data.width,
						height: props.direction === 'y' ? data.scrollHeight : data.height
					};
				}
			}).exec();
		} catch (error) {
			console.error('初始化滚动容器尺寸失败:', error);
		}
	});
};

// 开始自动滚动
const startAutoScroll = () => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
	}
	
	if (props.autoScrollInterval > 0) {
		autoScrollTimer = setInterval(() => {
			scrollToNextPosition(props.direction);
		}, props.autoScrollInterval);
	}
};

// 滚动到下一个位置
const scrollToNextPosition = (direction) => {
	if (!scrollViewRef.value) return;
	
	const currentPos = currentScrollPosition.value;
	const maxSize = direction === 'y' ? state.contentSize.height : state.contentSize.width;
	const viewportSize = direction === 'y' ? state.scrollSize.height : state.scrollSize.width;
	
	// 如果已滚动到底部，则回到顶部
	if (currentPos + viewportSize >= maxSize) {
		scrollTo(0);
	} else {
		// 否则继续向下/向右滚动
		scrollTo(currentPos + props.autoScrollSpeed);
	}
};

// 停止自动滚动
const stopAutoScroll = () => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
};

// 触摸事件处理
const handleTouchStart = (e) => {
	if (!props.enableDrag) return;
	
	// 如果正在自动滚动，触摸时暂停
	if (props.autoScrollInterval > 0) {
		stopAutoScroll();
	}
	
	const touch = e.touches[0];
	state.dragState = {
		isDragging: true,
		startX: touch.clientX,
		startY: touch.clientY,
		lastX: touch.clientX,
		lastY: touch.clientY,
		deltaX: 0,
		deltaY: 0
	};
	
	emit('dragStart', {
		x: touch.clientX,
		y: touch.clientY
	});
};

const handleTouchMove = (e) => {
	if (!props.enableDrag || !state.dragState.isDragging) return;
	
	const touch = e.touches[0];
	state.dragState.deltaX = touch.clientX - state.dragState.lastX;
	state.dragState.deltaY = touch.clientY - state.dragState.lastY;
	state.dragState.lastX = touch.clientX;
	state.dragState.lastY = touch.clientY;
	
	// 根据方向更新滚动位置
	if (props.direction === 'x') {
		scrollTo(currentScrollPosition.value - state.dragState.deltaX);
	} else {
		scrollTo(currentScrollPosition.value - state.dragState.deltaY);
	}
	
	emit('dragMove', {
		x: touch.clientX,
		y: touch.clientY,
		deltaX: state.dragState.deltaX,
		deltaY: state.dragState.deltaY
	});
};

const handleTouchEnd = (e) => {
	if (!props.enableDrag || !state.dragState.isDragging) return;
	
	state.dragState.isDragging = false;
	
	// 计算滑动的总距离
	const totalDeltaX = state.dragState.lastX - state.dragState.startX;
	const totalDeltaY = state.dragState.lastY - state.dragState.startY;
	
	emit('dragEnd', {
		totalDeltaX,
		totalDeltaY
	});
	
	// 如果有自动滚动功能，触摸结束后恢复
	if (props.autoScrollInterval > 0) {
		startAutoScroll();
	}
};

// 滚动控制方法
const scrollToTop = () => {
	scrollTo(0);
};

const scrollToBottom = () => {
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (data) {
				const scrollHeight = props.direction === 'y' ? data.scrollHeight : data.scrollWidth;
				scrollTo(scrollHeight);
			}
		}).exec();
	});
};

const scrollTo = (position, duration) => {
	if (!scrollViewRef.value) return;
	
	const scrollParam = {};
	if (props.direction === 'y') {
		scrollParam.scrollTop = position;
	} else {
		scrollParam.scrollLeft = position;
	}
	
	scrollParam.duration = duration !== undefined ? duration : (props.scrollWithAnimation ? 300 : 0);
	
	// 使用uni-app scroll-view的scrollTo方法
	if (scrollViewRef.value.scrollTo) {
		scrollViewRef.value.scrollTo(scrollParam);
	} else {
		// 降级处理
		console.warn('scrollTo method not available, using fallback');
	}
};

const scrollIntoViewById = (elementId) => {
	if (!elementId || typeof elementId !== 'string') return;
	
	nextTick(() => {
		if (scrollViewRef.value && scrollViewRef.value.scrollIntoView) {
			scrollViewRef.value.scrollIntoView({
				id: elementId,
				animation: props.scrollWithAnimation
			});
		} else {
			// 兼容处理
			if (!instance) return;
			const selector = `#${elementId}`;
			uni.createSelectorQuery().in(instance).select(selector).boundingClientRect().exec(rects => {
				if (!rects || !rects[0]) return;
				
				const rect = rects[0];
				if (props.direction === 'y') {
					scrollTo(rect.top);
				} else {
					scrollTo(rect.left);
				}
			});
		}
	});
};

const refreshSize = () => {
	initScrollSize();
};

const scrollToPercent = (percent) => {
	if (percent < 0) percent = 0;
	if (percent > 100) percent = 100;
	
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (data) {
				const max = props.direction === 'y' ? 
					data.scrollHeight - data.height : 
					data.scrollWidth - data.width;
				const position = max * (percent / 100);
				scrollTo(position);
			}
		}).exec();
	});
};

const scrollToPage = (pageIndex) => {
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (!data) return;
			
			const size = props.direction === 'y' ? data.height : data.width;
			const position = pageIndex * size;
			scrollTo(position);
		}).exec();
	});
};

const getTotalPages = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (!data) {
				resolve(0);
				return;
			}
			
			const viewportSize = props.direction === 'y' ? data.height : data.width;
			const contentSize = props.direction === 'y' ? data.scrollHeight : data.scrollWidth;
			
			const pages = Math.ceil(contentSize / viewportSize);
			resolve(pages);
		}).exec();
	});
};

const getScrollableHeight = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (!data) {
				resolve(0);
				return;
			}
			
			const scrollHeight = props.direction === 'y' ? data.scrollHeight : data.scrollWidth;
			resolve(scrollHeight);
		}).exec();
	});
};

const getViewportHeight = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingRect(data => {
			if (!data) {
				resolve(0);
				return;
			}
			
			const viewportHeight = props.direction === 'y' ? data.height : data.width;
			resolve(viewportHeight);
		}).exec();
	});
};

const scrollToPosition = (position) => {
	// 如果是百分比字符串
	if (typeof position === 'string' && position.endsWith('%')) {
		const percent = parseFloat(position);
		if (!isNaN(percent)) {
			scrollToPercent(percent);
			return;
		}
	}
	
	// 数字位置
	if (typeof position === 'number' || !isNaN(parseFloat(position))) {
		scrollTo(parseFloat(position));
	}
};

const stopAnimation = () => {
	scrollTo(currentScrollPosition.value, 0);
};

const scrollToIndex = (index) => {
	if (!props.enableVirtualList) {
		console.warn('scrollToIndex 仅在虚拟列表模式下可用');
		return;
	}
	
	// 根据滚动方向计算要滚动到的位置
	if (props.direction === 'y') {
		const position = index * props.virtualItemHeight;
		scrollTo(position);
	} else {
		const position = index * props.virtualItemWidth;
		scrollTo(position);
	}
};

// 虚拟列表样式计算
const getVirtualItemStyle = (index) => {
	if (props.direction === 'y') {
		return {
			position: 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: props.virtualItemHeight + 'px',
			transform: `translateY(${index * props.virtualItemHeight}px)`
		};
	} else {
		return {
			position: 'absolute',
			top: '0',
			left: '0',
			height: '100%',
			width: props.virtualItemWidth + 'px',
			transform: `translateX(${index * props.virtualItemWidth}px)`
		};
	}
};

// 监听器
watch(() => props.autoScrollInterval, (newVal, oldVal) => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
	
	if (newVal > 0) {
		startAutoScroll();
	}
});

watch(() => props.virtualListSource, (newVal) => {
	if (props.enableVirtualList && newVal.length > 0) {
		nextTick(() => {
			refreshSize();
			// 触发一次滚动事件来更新可见项
			const event = { 
				detail: { 
					scrollTop: currentScrollPosition.value, 
					scrollLeft: currentScrollPosition.value 
				} 
			};
			processScrollEvent(event);
		});
	}
}, { deep: true });

// 生命周期
onMounted(() => {
	nextTick(() => {
		initScrollSize();
		
		if (props.autoScrollInterval > 0) {
			startAutoScroll();
		}
		
		// 如果启用了虚拟列表，初始化后强制更新一次可见区域
		if (props.enableVirtualList && props.virtualListSource.length > 0) {
			setTimeout(() => {
				const event = { detail: { scrollTop: 0, scrollLeft: 0 } };
				processScrollEvent(event);
				refreshSize(); // 刷新尺寸以确保计算正确
			}, 100);
		}
		
		// 标记为初始化完成
		isInitialized.value = true;
		emit('inited');
	});
});

onBeforeUnmount(() => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
	
	if (debounceTimer) {
		clearTimeout(debounceTimer);
		debounceTimer = null;
	}
	
	if (throttleTimer) {
		clearTimeout(throttleTimer);
		throttleTimer = null;
	}
});

// 暴露方法
defineExpose({
	scrollToTop,
	scrollToBottom,
	scrollTo,
	scrollIntoViewById,
	scrollToPercent,
	scrollToPage,
	getTotalPages,
	refreshSize,
	startAutoScroll,
	stopAutoScroll,
	stopAnimation,
	getScrollPosition: () => currentScrollPosition.value,
	scrollToIndex,
	getScrollableHeight,
	getViewportHeight,
	scrollToPosition
});
</script>

<style scoped>
.zx-scroll-outer {
	position: relative;
	width: 100%;
	height: 100%;
}

.zx-scroll-view {
	width: 100%;
	height: 100%;
}

.zx-scroll-container {
	box-sizing: border-box;
	width: 100%;
	min-height: 100%;
}

.zx-scroll-horizontal {
	display: inline-flex;
	white-space: nowrap;
	align-items: flex-start;
}

.zx-scroll-flex {
	display: flex;
	flex-direction: column;
}

/* 虚拟列表样式 */
.zx-scroll-virtual-list {
	position: relative;
	width: 100%;
}

.zx-scroll-virtual-list-vertical {
	width: 100%;
}

.zx-scroll-virtual-list-horizontal {
	height: 100%;
	display: inline-flex;
}

.zx-scroll-virtual-item {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	overflow: hidden;
	will-change: transform;
	contain: layout style paint;
}

/* 加载更多样式 */
.zx-scroll-load-more {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 80rpx;
	width: 100%;
	padding: 20rpx 0;
	box-sizing: border-box;
}

.zx-scroll-load-more-default {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
}

.zx-scroll-loading-icon {
	width: 40rpx;
	height: 40rpx;
	border: 4rpx solid #f3f3f3;
	border-top: 4rpx solid #3498db;
	border-radius: 50%;
	animation: zx-scroll-spin 1.2s linear infinite;
}

.zx-scroll-loading-spin {
	animation-duration: 0.8s;
}

@keyframes zx-scroll-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.zx-scroll-loading-text {
	font-size: 28rpx;
	color: #666;
	line-height: 1.5;
}

.zx-scroll-no-more {
	font-size: 28rpx;
	color: #999;
	text-align: center;
	padding: 20rpx 0;
	position: relative;
}

.zx-scroll-no-more::before {
	content: '';
	position: absolute;
	left: 20%;
	top: 50%;
	width: 25%;
	height: 1px;
	background-color: #e5e5e5;
	transform: translateY(-50%);
}

.zx-scroll-no-more::after {
	content: '';
	position: absolute;
	right: 20%;
	top: 50%;
	width: 25%;
	height: 1px;
	background-color: #e5e5e5;
	transform: translateY(-50%);
}

/* 空内容样式 */
.zx-scroll-empty {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 120rpx 40rpx;
	width: 100%;
	box-sizing: border-box;
}

.zx-scroll-empty-default {
	text-align: center;
	opacity: 0.6;
}

.zx-scroll-empty-text {
	font-size: 32rpx;
	color: #999;
	line-height: 1.6;
}

/* 返回顶部按钮样式 */
.zx-scroll-back-top {
	position: fixed;
	right: 30rpx;
	bottom: 120rpx;
	z-index: 9999;
	cursor: pointer;
	user-select: none;
}

.zx-scroll-back-top-default {
	width: 88rpx;
	height: 88rpx;
	background: rgba(0, 0, 0, 0.6);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(10rpx);
	transition: all 0.3s ease;
}

.zx-scroll-back-top-default:hover {
	background: rgba(0, 0, 0, 0.8);
	transform: scale(1.1);
}

.zx-scroll-back-top-default:active {
	transform: scale(0.95);
}

.zx-scroll-back-top-icon {
	color: #ffffff;
	font-size: 44rpx;
	font-weight: bold;
	line-height: 1;
}

/* 过渡动画 */
.zx-scroll-fade-enter-active,
.zx-scroll-fade-leave-active {
	transition: all 0.3s ease;
}

.zx-scroll-fade-enter-from,
.zx-scroll-fade-leave-to {
	opacity: 0;
	transform: scale(0.8) translateY(20rpx);
}

.zx-scroll-fade-enter-to,
.zx-scroll-fade-leave-from {
	opacity: 1;
	transform: scale(1) translateY(0);
}

/* 滚动条样式自定义 */
.zx-scroll-view::-webkit-scrollbar {
	width: 8rpx;
	height: 8rpx;
}

.zx-scroll-view::-webkit-scrollbar-track {
	background: rgba(0, 0, 0, 0.1);
	border-radius: 4rpx;
}

.zx-scroll-view::-webkit-scrollbar-thumb {
	background: rgba(0, 0, 0, 0.3);
	border-radius: 4rpx;
	transition: background 0.3s ease;
}

.zx-scroll-view::-webkit-scrollbar-thumb:hover {
	background: rgba(0, 0, 0, 0.5);
}

/* 水平滚动时的特殊样式 */
.zx-scroll-container.zx-scroll-horizontal .zx-scroll-virtual-item {
	position: relative;
	display: inline-block;
	vertical-align: top;
	white-space: normal;
}

/* 性能优化相关样式 */
.zx-scroll-container {
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
}

.zx-scroll-virtual-item {
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	perspective: 1000px;
	-webkit-perspective: 1000px;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.zx-scroll-back-top {
		right: 20rpx;
		bottom: 100rpx;
	}
	
	.zx-scroll-back-top-default {
		width: 80rpx;
		height: 80rpx;
	}
	
	.zx-scroll-back-top-icon {
		font-size: 40rpx;
	}
	
	.zx-scroll-loading-text {
		font-size: 26rpx;
	}
	
	.zx-scroll-empty-text {
		font-size: 30rpx;
	}
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
	.zx-scroll-loading-text {
		color: #999;
	}
	
	.zx-scroll-no-more {
		color: #666;
	}
	
	.zx-scroll-empty-text {
		color: #666;
	}
	
	.zx-scroll-back-top-default {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20rpx);
	}
	
	.zx-scroll-back-top-default:hover {
		background: rgba(255, 255, 255, 0.2);
	}
}

/* 可访问性支持 */
@media (prefers-reduced-motion: reduce) {
	.zx-scroll-loading-icon {
		animation: none;
	}
	
	.zx-scroll-fade-enter-active,
	.zx-scroll-fade-leave-active {
		transition: none;
	}
	
	.zx-scroll-back-top-default {
		transition: none;
	}
}

/* 高对比度模式 */
@media (prefers-contrast: high) {
	.zx-scroll-loading-text {
		color: #000;
		font-weight: bold;
	}
	
	.zx-scroll-no-more {
		color: #000;
		font-weight: bold;
	}
	
	.zx-scroll-empty-text {
		color: #000;
		font-weight: bold;
	}
	
	.zx-scroll-back-top-default {
		background: #000;
		border: 2px solid #fff;
	}
}
</style>
