<template>
	<view class="zx-scroll-outer">
		<!-- 垂直滚动 -->
		<scroll-view
			v-if="direction === 'y'"
			ref="scrollViewRef"
			:scroll-into-view="scrollIntoView"
			scroll-y
			:scroll-top="position"
			:upper-threshold="upperThreshold"
			:lower-threshold="lowerThreshold"
			:scroll-with-animation="scrollWithAnimation"
			:enable-back-to-top="enableBackToTop"
			:show-scrollbar="showScrollbar"
			:refresher-enabled="refresherEnabled"
			:refresher-threshold="refresherThreshold"
			:refresher-default-style="refresherDefaultStyle"
			:refresher-background="refresherBackground"
			:refresher-triggered="refresherTriggered"
			:enable-flex="enableFlex"
			:scroll-anchoring="scrollAnchoring"
			:style="getStyle()"
			:enhanced="enhanced"
			:bounce="bounce"
			:paging-enabled="pagingEnabled"
			:fast-deceleration="fastDeceleration"
			:class="customClass"
			@scroll="scroll"
			@scrolltoupper="scrolltoupper"
			@scrolltolower="scrolltolower"
			@refresherpulling="refresherpulling"
			@refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore"
			@refresherabort="refresherabort"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<!-- 自定义下拉刷新器 -->
			<slot name="refresher" v-if="refresherEnabled && customRefresher"></slot>
			
			<!-- 主内容 -->
			<view :class="['zx-scroll-container', {'zx-scroll-horizontal': direction === 'x'}]">
				<template v-if="enableVirtualList">
					<view 
						:class="direction === 'y' ? 'zx-scroll-virtual-list' : 'zx-scroll-virtual-list-h'" 
						:style="direction === 'y' 
							? {height: virtualListSource.length * virtualItemHeight + 'px'}
							: {width: virtualListSource.length * virtualItemWidth + 'px'}"
					>
						<view 
							v-for="(vItem, index) in visibleItems" 
							:key="vItem.index"
							class="zx-scroll-virtual-item"
							:style="getVirtualItemStyle(vItem.index)"
						>
							<slot name="vertical-item" :item="vItem.item" :index="vItem.index"></slot>
						</view>
					</view>
				</template>
				<slot></slot>
			</view>
			
			<!-- 加载更多区域 -->
			<view class="zx-scroll-load-more" v-if="showLoadMore">
				<slot name="loadMore">
					<view class="zx-scroll-load-more-default" v-if="isLoading">
						<view class="zx-scroll-loading-icon"></view>
						<text class="zx-scroll-loading-text">{{loadingText}}</text>
					</view>
					<view class="zx-scroll-no-more" v-else-if="noMore">
						<text>{{noMoreText}}</text>
					</view>
				</slot>
			</view>
			
			<!-- 空内容提示 -->
			<view class="zx-scroll-empty" v-if="isEmpty">
				<slot name="empty">
					<view class="zx-scroll-empty-default">
						<text class="zx-scroll-empty-text">{{emptyText}}</text>
					</view>
				</slot>
			</view>
			
			<!-- 返回顶部按钮 -->
			<view v-if="showBackTop && showBackTopButton" 
				class="zx-scroll-back-top" 
				:style="backTopStyle" 
				@tap="scrollToTop">
				<slot name="backTop">
					<view class="zx-scroll-back-top-default">
						<text class="zx-scroll-back-top-icon">↑</text>
					</view>
				</slot>
			</view>
		</scroll-view>
		
		<!-- 水平滚动 -->
		<scroll-view
			v-else
			ref="scrollViewRef"
			:scroll-into-view="scrollIntoView"
			scroll-x
			:scroll-left="position"
			:upper-threshold="upperThreshold"
			:lower-threshold="lowerThreshold"
			:scroll-with-animation="scrollWithAnimation"
			:enable-back-to-top="enableBackToTop"
			:show-scrollbar="showScrollbar"
			:refresher-enabled="refresherEnabled"
			:refresher-threshold="refresherThreshold"
			:refresher-default-style="refresherDefaultStyle"
			:refresher-background="refresherBackground"
			:refresher-triggered="refresherTriggered"
			:enable-flex="enableFlex"
			:scroll-anchoring="scrollAnchoring"
			:style="getStyle()"
			:enhanced="enhanced"
			:bounce="bounce"
			:paging-enabled="pagingEnabled"
			:fast-deceleration="fastDeceleration"
			:class="customClass"
			@scroll="scroll"
			@scrolltoupper="scrolltoupper"
			@scrolltolower="scrolltolower"
			@refresherpulling="refresherpulling"
			@refresherrefresh="refresherrefresh"
			@refresherrestore="refresherrestore"
			@refresherabort="refresherabort"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
		>
			<!-- 自定义下拉刷新器 -->
			<slot name="refresher" v-if="refresherEnabled && customRefresher"></slot>
			
			<!-- 主内容 -->
			<view :class="['zx-scroll-container', {'zx-scroll-horizontal': direction === 'x'}]">
				<template v-if="enableVirtualList">
					<view 
						:class="direction === 'y' ? 'zx-scroll-virtual-list' : 'zx-scroll-virtual-list-h'" 
						:style="direction === 'y' 
							? {height: virtualListSource.length * virtualItemHeight + 'px'}
							: {width: virtualListSource.length * virtualItemWidth + 'px'}"
					>
						<view 
							v-for="(vItem, index) in visibleItems" 
							:key="vItem.index"
							class="zx-scroll-virtual-item"
							:style="getVirtualItemStyle(vItem.index)"
						>
							<slot name="horizontal-item" :item="vItem.item" :index="vItem.index"></slot>
						</view>
					</view>
				</template>
				<slot></slot>
			</view>
			
			<!-- 加载更多区域 -->
			<view class="zx-scroll-load-more" v-if="showLoadMore">
				<slot name="loadMore">
					<view class="zx-scroll-load-more-default" v-if="isLoading">
						<view class="zx-scroll-loading-icon"></view>
						<text class="zx-scroll-loading-text">{{loadingText}}</text>
					</view>
					<view class="zx-scroll-no-more" v-else-if="noMore">
						<text>{{noMoreText}}</text>
					</view>
				</slot>
			</view>
			
			<!-- 空内容提示 -->
			<view class="zx-scroll-empty" v-if="isEmpty">
				<slot name="empty">
					<view class="zx-scroll-empty-default">
						<text class="zx-scroll-empty-text">{{emptyText}}</text>
					</view>
				</slot>
			</view>
			
			<!-- 返回顶部按钮 -->
			<view v-if="showBackTop && showBackTopButton" 
				class="zx-scroll-back-top" 
				:style="backTopStyle" 
				@tap="scrollToTop">
				<slot name="backTop">
					<view class="zx-scroll-back-top-default">
						<text class="zx-scroll-back-top-icon">↑</text>
					</view>
				</slot>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { onMounted, ref, computed, nextTick, watch, getCurrentInstance, onBeforeUnmount } from 'vue';

/**
 * zx-scroll 增强滚动组件
 * @description 基于uni-app的scroll-view的增强组件，支持更多自定义功能
 * @author tzx
 * @version 2.0.0
 */
const props = defineProps({
	/** 滚动方向：x-横向滚动, y-纵向滚动 */
	direction: {
		type: String,
		default: 'y'
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
		default: 'black'
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

// 滚动视图引用
const scrollViewRef = ref(null);
// 是否显示返回顶部按钮
const showBackTopButton = ref(false);
// 当前滚动位置
const currentScrollPosition = ref(0);
// 滚动容器尺寸
const scrollSize = ref({ width: 0, height: 0 });
// 内容尺寸
const contentSize = ref({ width: 0, height: 0 });
// 是否已初始化完成
const isInitialized = ref(false);
// 自动滚动定时器
let autoScrollTimer = null;
// 拖拽状态
const dragState = ref({
	isDragging: false,
	startX: 0,
	startY: 0,
	lastX: 0,
	lastY: 0,
	deltaX: 0,
	deltaY: 0
});
// 防抖定时器
let debounceTimer = null;

// 获取当前组件实例
const instance = getCurrentInstance();

// 使用计算属性代替动态绑定
const directionProps = computed(() => {
	if (props.direction === 'y') {
		return {
			'scroll-y': true,
			'scroll-top': props.position
		};
	} else {
		return {
			'scroll-x': true,
			'scroll-left': props.position
		};
	}
});

// 初始化组件
onMounted(() => {
	// 延迟初始化，确保DOM已经渲染
	nextTick(() => {
		initScrollSize();
		
		if (props.autoScrollInterval > 0) {
			startAutoScroll();
		}
		
		// 如果启用了虚拟列表，初始化后强制更新一次可见区域
		if (props.enableVirtualList && props.virtualListSource.length > 0) {
			// 初始时计算一次可见项
			setTimeout(() => {
				const event = { detail: { scrollTop: 0, scrollLeft: 0 } };
				handleScrollEvent(event);
				refreshSize(); // 刷新尺寸以确保计算正确
			}, 100);
		}
		
		// 标记为初始化完成
		isInitialized.value = true;
		emit('inited');
	});
});

// 监听自动滚动间隔变化
watch(() => props.autoScrollInterval, (newVal, oldVal) => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
	
	if (newVal > 0) {
		startAutoScroll();
	}
});

// 监听虚拟列表数据源变化
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
			handleScrollEvent(event);
		});
	}
}, { deep: true });

/**
 * 初始化滚动容器尺寸
 */
const initScrollSize = () => {
	nextTick(() => {
		if (!scrollViewRef.value || !instance) return;
		
		try {
			const query = uni.createSelectorQuery().in(instance);
			query.select('.zx-scroll-container').boundingClientRect(data => {
				if (data) {
					scrollSize.value = {
						width: data.width,
						height: data.height
					};
					contentSize.value = {
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

/**
 * 开始自动滚动
 */
const startAutoScroll = () => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
	}
	
	autoScrollTimer = setInterval(() => {
		if (props.direction === 'y') {
			scrollToNextPosition('y');
		} else {
			scrollToNextPosition('x');
		}
	}, props.autoScrollInterval);
};

/**
 * 滚动到下一个位置
 * @param {String} direction 滚动方向
 */
const scrollToNextPosition = (direction) => {
	if (!scrollViewRef.value) return;
	
	const currentPos = currentScrollPosition.value;
	const maxSize = direction === 'y' ? contentSize.value.height : contentSize.value.width;
	const viewportSize = direction === 'y' ? scrollSize.value.height : scrollSize.value.width;
	
	// 如果已滚动到底部，则回到顶部
	if (currentPos + viewportSize >= maxSize) {
		scrollTo(0);
	} else {
		// 否则继续向下/向右滚动
		scrollTo(currentPos + props.autoScrollSpeed);
	}
};

/**
 * 停止自动滚动
 */
const stopAutoScroll = () => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
};

/**
 * 获取组件样式
 * @returns {Object} 样式对象
 */
const getStyle = () => {
	let style = { 
		width: props.width, 
		height: props.height,
		backgroundColor: props.backgroundColor,
		borderRadius: props.borderRadius,
		border: props.border,
		padding: props.padding,
		boxShadow: props.boxShadow
	};
	
	if (props.direction === 'x') {
		style.whiteSpace = 'nowrap';
	}
	
	return style;
};

/**
 * 滚动事件处理
 * @param {Object} e 事件对象
 */
const scroll = (e) => {
	if (!e || !e.detail) return; // 确保事件对象存在
	
	// 使用防抖处理滚动事件
	if (props.debounce) {
		if (debounceTimer) clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			handleScrollEvent(e);
		}, props.debounceTime);
	} else {
		handleScrollEvent(e);
	}
};

/**
 * 处理滚动事件
 * @param {Object} e 事件对象
 */
const handleScrollEvent = (e) => {
	if (!e || !e.detail) return; // 再次检查以确保安全
	
	currentScrollPosition.value = props.direction === 'y' ? e.detail.scrollTop : e.detail.scrollLeft;
	
	// 检查是否显示返回顶部按钮
	if (props.showBackTop && props.direction === 'y') {
		showBackTopButton.value = currentScrollPosition.value > props.backTopThreshold;
	}
	
	// 如果启用了虚拟列表，滚动时会通过计算属性自动更新可见项
	// 但是需要确保scrollSize已经被正确初始化
	if (props.enableVirtualList && props.virtualListSource.length > 0) {
		if (scrollSize.value.width === 0 || scrollSize.value.height === 0) {
			refreshSize();
		}
	}
	
	// 安全地触发事件
	emit('scroll', {
		scrollTop: e.detail.scrollTop || 0,
		scrollLeft: e.detail.scrollLeft || 0,
		current: currentScrollPosition.value,
		direction: props.direction
	});
};

/**
 * 滚动到顶部事件
 * @param {Object} e 事件对象
 */
const scrolltoupper = (e) => {
	emit('scrolltoupper', e);
};

/**
 * 滚动到底部事件
 * @param {Object} e 事件对象
 */
const scrolltolower = (e) => {
	if (props.showLoadMore && !props.noMore && !props.isLoading) {
		emit('loadMore');
	}
	emit('scrolltolower', e);
};

/**
 * 自定义下拉刷新控件被下拉事件
 * @param {Object} e 事件对象
 */
const refresherpulling = (e) => {
	emit('refresherpulling', e);
};

/**
 * 自定义下拉刷新被触发事件
 * @param {Object} e 事件对象
 */
const refresherrefresh = (e) => {
	emit('refresherrefresh', e);
};

/**
 * 自定义下拉刷新被复位事件
 * @param {Object} e 事件对象
 */
const refresherrestore = (e) => {
	emit('refresherrestore', e);
};

/**
 * 自定义下拉刷新被中止事件
 * @param {Object} e 事件对象
 */
const refresherabort = (e) => {
	emit('refresherabort', e);
};

/**
 * 处理触摸开始事件
 * @param {Object} e 事件对象
 */
const handleTouchStart = (e) => {
	if (!props.enableDrag) return;
	
	// 如果正在自动滚动，触摸时暂停
	if (props.autoScrollInterval > 0) {
		stopAutoScroll();
	}
	
	const touch = e.touches[0];
	dragState.value = {
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

/**
 * 处理触摸移动事件
 * @param {Object} e 事件对象
 */
const handleTouchMove = (e) => {
	if (!props.enableDrag || !dragState.value.isDragging) return;
	
	const touch = e.touches[0];
	dragState.value.deltaX = touch.clientX - dragState.value.lastX;
	dragState.value.deltaY = touch.clientY - dragState.value.lastY;
	dragState.value.lastX = touch.clientX;
	dragState.value.lastY = touch.clientY;
	
	// 根据方向更新滚动位置
	if (props.direction === 'x') {
		scrollTo(currentScrollPosition.value - dragState.value.deltaX);
	} else {
		scrollTo(currentScrollPosition.value - dragState.value.deltaY);
	}
	
	emit('dragMove', {
		x: touch.clientX,
		y: touch.clientY,
		deltaX: dragState.value.deltaX,
		deltaY: dragState.value.deltaY
	});
};

/**
 * 处理触摸结束事件
 * @param {Object} e 事件对象
 */
const handleTouchEnd = (e) => {
	if (!props.enableDrag || !dragState.value.isDragging) return;
	
	dragState.value.isDragging = false;
	
	// 计算滑动的总距离
	const totalDeltaX = dragState.value.lastX - dragState.value.startX;
	const totalDeltaY = dragState.value.lastY - dragState.value.startY;
	
	emit('dragEnd', {
		totalDeltaX,
		totalDeltaY
	});
	
	// 如果有自动滚动功能，触摸结束后恢复
	if (props.autoScrollInterval > 0) {
		startAutoScroll();
	}
};

/**
 * 滚动到顶部
 */
const scrollToTop = () => {
	scrollTo(0);
};

/**
 * 滚动到底部
 */
const scrollToBottom = () => {
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
			if (data) {
				const scrollHeight = props.direction === 'y' ? data.scrollHeight : data.scrollWidth;
				scrollTo(scrollHeight);
			}
		}).exec();
	});
};

/**
 * 滚动到指定位置
 * @param {Number} position 滚动位置
 * @param {Number} duration 动画持续时间，为0时无动画
 */
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
		try {
			if (!instance) return;
			const selectorQuery = uni.createSelectorQuery().in(instance);
			
			selectorQuery.select('.zx-scroll-container').node(data => {
				if (data && data.node) {
					data.node.scrollTo(scrollParam);
				}
			}).exec();
		} catch (error) {
			console.error('scroll-view scrollTo error:', error);
		}
	}
};

/**
 * 滚动到指定元素
 * @param {String} elementId 元素ID
 */
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

/**
 * 刷新滚动区域大小
 */
const refreshSize = () => {
	initScrollSize();
};

/**
 * 滚动到指定百分比位置
 * @param {Number} percent 百分比值(0-100)
 */
const scrollToPercent = (percent) => {
	if (percent < 0) percent = 0;
	if (percent > 100) percent = 100;
	
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
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

/**
 * 滚动到指定页
 * @param {Number} pageIndex 页索引，从0开始
 */
const scrollToPage = (pageIndex) => {
	nextTick(() => {
		if (!instance) return;
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
			if (!data) return;
			
			const size = props.direction === 'y' ? data.height : data.width;
			const position = pageIndex * size;
			scrollTo(position);
		}).exec();
	});
};

/**
 * 获取总页数
 * @returns {Promise<Number>} 总页数
 */
const getTotalPages = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
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

/**
 * 获取可滚动区域的高度
 * @returns {Promise<Number>} 可滚动高度
 */
const getScrollableHeight = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
			if (!data) {
				resolve(0);
				return;
			}
			
			const scrollHeight = props.direction === 'y' ? data.scrollHeight : data.scrollWidth;
			resolve(scrollHeight);
		}).exec();
	});
};

/**
 * 获取可视区域高度
 * @returns {Promise<Number>} 可视区域高度
 */
const getViewportHeight = () => {
	return new Promise((resolve) => {
		if (!instance) {
			resolve(0);
			return;
		}
		const query = uni.createSelectorQuery().in(instance);
		
		query.select('.zx-scroll-container').boundingClientRect(data => {
			if (!data) {
				resolve(0);
				return;
			}
			
			const viewportHeight = props.direction === 'y' ? data.height : data.width;
			resolve(viewportHeight);
		}).exec();
	});
};

/**
 * 滚动到指定位置（支持百分比）
 * @param {Number|String} position 滚动位置，可以是数字或百分比字符串，如 '50%'
 */
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

/**
 * 立即停止滚动动画
 */
const stopAnimation = () => {
	scrollTo(currentScrollPosition.value, 0);
};

/**
 * 滚动到虚拟列表的指定索引位置
 * @param {Number} index 要滚动到的项目索引
 */
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

// 计算虚拟列表可见项
const visibleItems = computed(() => {
	if (!props.enableVirtualList || !props.virtualListSource.length) return [];
	
	if (props.direction === 'y') {
		const startIndex = Math.max(0, Math.floor(currentScrollPosition.value / props.virtualItemHeight) - props.virtualBuffer);
		const endIndex = Math.min(
			props.virtualListSource.length - 1,
			Math.ceil((currentScrollPosition.value + scrollSize.value.height) / props.virtualItemHeight) + props.virtualBuffer
		);
		
		// 更新可见范围并触发事件
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
	} else {
		// 水平方向的计算
		const startIndex = Math.max(0, Math.floor(currentScrollPosition.value / props.virtualItemWidth) - props.virtualBuffer);
		const endIndex = Math.min(
			props.virtualListSource.length - 1,
			Math.ceil((currentScrollPosition.value + scrollSize.value.width) / props.virtualItemWidth) + props.virtualBuffer
		);
		
		// 更新可见范围并触发事件
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
	}
});

/**
 * 获取虚拟列表项的样式
 */
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

// 确保将方法暴露出去
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

// 确保手势事件处理有适当的空值检查
const onGestureChange = (e) => {
	if (!e) return;
	
	gestureInfo.value = {
		status: '手势变化',
		direction: e.direction || '',
		scale: e.scale ? e.scale.toFixed(2) : null,
		fingers: e.touches ? e.touches.length : 1
	};
};

// 检测当前运行环境是否为微信小程序
const isMpWeixin = () => {
	// #ifdef MP-WEIXIN
	return true;
	// #endif
	return false;
};

// 使用平台特定的方法
const safeCreateSelectorQuery = () => {
	if (!instance) return uni.createSelectorQuery();
	
	try {
		return uni.createSelectorQuery().in(instance);
	} catch (error) {
		console.warn('选择器创建失败，降级处理:', error);
		return uni.createSelectorQuery();
	}
};

// 在组件卸载前清除定时器
onBeforeUnmount(() => {
	if (autoScrollTimer) {
		clearInterval(autoScrollTimer);
		autoScrollTimer = null;
	}
	
	if (debounceTimer) {
		clearTimeout(debounceTimer);
		debounceTimer = null;
	}
});
</script>

<style scoped>
.zx-scroll-outer {
	width: 100%;
	height: 100%;
}

.zx-scroll-container {
	box-sizing: border-box;
	width: 100%;
}

.zx-scroll-horizontal {
	display: inline-flex;
	white-space: nowrap;
}

.zx-scroll-virtual-list {
	position: relative;
	width: 100%;
}

.zx-scroll-virtual-list-h {
	position: relative;
	height: 100%;
}

.zx-scroll-virtual-item {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	overflow: hidden;
	will-change: transform;
}

.zx-scroll-load-more {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80rpx;
	width: 100%;
}

.zx-scroll-load-more-default {
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-scroll-loading-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 12rpx;
	border: 4rpx solid #f3f3f3;
	border-top: 4rpx solid #3498db;
	border-radius: 50%;
	animation: zx-scroll-spin 1.2s linear infinite;
}

@keyframes zx-scroll-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

.zx-scroll-loading-text {
	font-size: 24rpx;
	color: #666;
}

.zx-scroll-no-more {
	font-size: 24rpx;
	color: #999;
	text-align: center;
}

.zx-scroll-empty {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 60rpx 0;
}

.zx-scroll-empty-default {
	text-align: center;
}

.zx-scroll-empty-text {
	font-size: 28rpx;
	color: #999;
}

.zx-scroll-back-top {
	position: fixed;
	right: 20rpx;
	bottom: 120rpx;
	z-index: 9999;
}

.zx-scroll-back-top-default {
	width: 80rpx;
	height: 80rpx;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.zx-scroll-back-top-icon {
	color: #ffffff;
	font-size: 40rpx;
}
</style>
