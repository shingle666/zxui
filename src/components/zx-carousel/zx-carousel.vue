<template>
	<view class="zx-carousel" :style="carouselStyle">
		<!-- 轮播容器 -->
		<swiper
			class="zx-carousel__container"
			:style="containerStyle"
			:circular="circular"
			:interval="autoplay ? interval : 0"
			:duration="duration"
			:current="currentIndex"
			:current-item-id="currentItemId"
			:previous-margin="previousMargin"
			:next-margin="nextMargin"
			:display-multiple-items="displayMultipleItems"
			:vertical="direction === 'vertical'"
			:disable-touch="disableTouch"
			:touchable="touchable"
			:indicator-dots="false"
			:autoplay="autoplay"
			:easing-function="easingFunction"
			@change="handleSwiperChange"
			@transition="handleTransition"
			@animationfinish="handleAnimationFinish"
			@touchstart="handleTouchStart"
			@touchend="handleTouchEnd"
		>
			<swiper-item
				v-for="(item, index) in list"
				:key="getItemKey(item, index)"
				:item-id="getItemId(item, index)"
				class="zx-carousel__item"
				:class="[
					type === 'card' && 'zx-carousel__item--card',
					direction === 'vertical' && 'zx-carousel__item--vertical'
				]"
				:style="getItemStyle(index)"
			>
				<view 
					class="zx-carousel__item-wrapper"
					:class="[
						type === 'card' && 'zx-carousel__item-wrapper--card',
						direction === 'vertical' && 'zx-carousel__item-wrapper--vertical',
						motionBlur && isTransitioning && 'zx-carousel__item-wrapper--blur'
					]"
					:style="getItemWrapperStyle(index)"
					@tap="handleItemClick(index)"
				>
					<!-- 内容插槽 -->
					<slot name="item" :item="item" :index="index">
						<!-- 默认图片展示 -->
						<image
							v-if="getItemType(item) === 'image'"
							class="zx-carousel__item-image"
							:src="getItemSrc(item)"
							:mode="imageMode"
							:lazy-load="lazyLoad"
							@load="handleImageLoad"
							@error="handleImageError"
						/>
						<!-- 默认内容展示 -->
						<view v-else class="zx-carousel__item-content">
							<text class="zx-carousel__item-text">{{ getItemLabel(item) }}</text>
						</view>
					</slot>
				</view>
			</swiper-item>
		</swiper>

		<!-- 指示器 -->
		<view
			v-if="showIndicator && indicatorPosition !== 'none'"
			class="zx-carousel__indicators"
			:class="[
				`zx-carousel__indicators--${indicatorPosition}`,
				direction === 'vertical' && 'zx-carousel__indicators--vertical'
			]"
			:style="indicatorStyle"
		>
			<slot name="indicator" :current="currentIndex" :total="list.length">
				<view
					v-for="(item, index) in list"
					:key="`indicator-${index}`"
					class="zx-carousel__indicator"
					:class="[
						index === currentIndex && 'zx-carousel__indicator--active',
						`zx-carousel__indicator--${trigger}`
					]"
					:style="getIndicatorStyle(index)"
					@tap="handleIndicatorClick(index)"
					@mouseenter="handleIndicatorHover(index)"
				>
					<text v-if="item.label" class="zx-carousel__indicator-label">{{ item.label }}</text>
				</view>
			</slot>
		</view>

		<!-- 切换箭头 -->
		<view
			v-if="showArrow && arrow !== 'never'"
			class="zx-carousel__arrow zx-carousel__arrow--left"
			:class="[
				arrow === 'always' && 'zx-carousel__arrow--always',
				direction === 'vertical' && 'zx-carousel__arrow--vertical'
			]"
			:style="arrowStyle"
			@tap="handlePrev"
		>
			<slot name="arrow-left">
				<text class="zx-carousel__arrow-icon">‹</text>
			</slot>
		</view>
		<view
			v-if="showArrow && arrow !== 'never'"
			class="zx-carousel__arrow zx-carousel__arrow--right"
			:class="[
				arrow === 'always' && 'zx-carousel__arrow--always',
				direction === 'vertical' && 'zx-carousel__arrow--vertical'
			]"
			:style="arrowStyle"
			@tap="handleNext"
		>
			<slot name="arrow-right">
				<text class="zx-carousel__arrow-icon">›</text>
			</slot>
		</view>
	</view>
</template>

<script setup>
/**
 * Carousel 走马灯
 * @description 在有限空间内，循环播放同一类型的图片、文字等内容
 * @tutorial https://zxui.org/components/carousel
 */
import { ref, computed, watch, onMounted, nextTick, provide } from 'vue';

// 定义组件名称
defineOptions({
	name: 'zx-carousel'
});

// 定义属性
const props = defineProps({
	// 轮播数据列表
	list: {
		type: Array,
		default: () => []
	},
	// carousel 的高度
	height: {
		type: [String, Number],
		default: '300rpx'
	},
	// 初始状态激活的幻灯片的索引，从 0 开始
	initialIndex: {
		type: Number,
		default: 0
	},
	// 指示器的触发方式：hover | click
	trigger: {
		type: String,
		default: 'hover'
	},
	// 是否自动切换
	autoplay: {
		type: Boolean,
		default: true
	},
	// 自动切换的时间间隔，单位为毫秒
	interval: {
		type: Number,
		default: 3000
	},
	// 指示器的位置：'' | 'outside' | 'none'
	indicatorPosition: {
		type: String,
		default: ''
	},
	// 切换箭头的显示时机：hover | always | never
	arrow: {
		type: String,
		default: 'hover'
	},
	// carousel 的类型：'' | 'card'
	type: {
		type: String,
		default: ''
	},
	// 当 type 为 card 时，二级卡的缩放大小
	cardScale: {
		type: Number,
		default: 0.83
	},
	// 是否循环显示
	loop: {
		type: Boolean,
		default: true
	},
	// 展示的方向：horizontal | vertical
	direction: {
		type: String,
		default: 'horizontal'
	},
	// 鼠标悬浮时暂停自动切换
	pauseOnHover: {
		type: Boolean,
		default: true
	},
	// 添加动态模糊以给走马灯注入活力和流畅性
	motionBlur: {
		type: Boolean,
		default: false
	},
	// 图片的裁剪模式
	imageMode: {
		type: String,
		default: 'aspectFill'
	},
	// 是否开启懒加载
	lazyLoad: {
		type: Boolean,
		default: true
	},
	// 当前所在滑块的 item-id，不能与 current 被同时指定
	currentItemId: {
		type: String,
		default: ''
	},
	// 滑块切换过程所需时间
	duration: {
		type: Number,
		default: 500
	},
	// 前边距，可用于露出前一项的一小部分
	previousMargin: {
		type: [String, Number],
		default: '0rpx'
	},
	// 后边距，可用于露出后一项的一小部分
	nextMargin: {
		type: [String, Number],
		default: '0rpx'
	},
	// 同时显示的滑块数量
	displayMultipleItems: {
		type: Number,
		default: 1
	},
	// 是否禁止用户 touch 操作
	disableTouch: {
		type: Boolean,
		default: false
	},
	// 是否监听用户的触摸事件
	touchable: {
		type: Boolean,
		default: true
	},
	// 指定swiper切换缓动动画类型
	easingFunction: {
		type: String,
		default: 'default'
	},
	// 是否循环播放
	circular: {
		type: Boolean,
		default: true
	},
	// 背景色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	// 圆角
	borderRadius: {
		type: [String, Number],
		default: '0rpx'
	},
	// 自定义样式
	customStyle: {
		type: [String, Object],
		default: ''
	},
	// 指示器样式
	indicatorStyle: {
		type: [String, Object],
		default: ''
	},
	// 箭头样式
	arrowStyle: {
		type: [String, Object],
		default: ''
	}
});

// 定义事件
const emit = defineEmits([
	'change',      // 当前展示的幻灯片切换时触发
	'click',       // 点击轮播项时触发
	'transition',  // 过渡动画事件
	'animationfinish', // 动画结束事件
	'imageLoad',   // 图片加载成功
	'imageError'   // 图片加载失败
]);

// 响应式状态
const currentIndex = ref(0);
const isTransitioning = ref(false);
const isPaused = ref(false);

// 计算属性
const carouselStyle = computed(() => {
	const style = {
		height: typeof props.height === 'number' ? `${props.height}rpx` : props.height,
		backgroundColor: props.backgroundColor,
		borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius
	};
	
	// 合并自定义样式
	if (props.customStyle) {
		if (typeof props.customStyle === 'string') {
			Object.assign(style, parseStyleString(props.customStyle));
		} else {
			Object.assign(style, props.customStyle);
		}
	}
	
	return style;
});

const containerStyle = computed(() => {
	return {
		height: '100%',
		width: '100%'
	};
});

const showIndicator = computed(() => {
	return props.list.length > 1 && props.indicatorPosition !== 'none';
});

const showArrow = computed(() => {
	return props.list.length > 1;
});

// 初始化
onMounted(() => {
	currentIndex.value = props.initialIndex;
	
	// 为子组件提供数据
	provide('carouselType', props.type);
	provide('carouselDirection', props.direction);
	provide('carouselHeight', props.height);
});

// 监听属性变化
watch(() => props.initialIndex, (val) => {
	currentIndex.value = val;
});

watch(() => props.list, (newList, oldList) => {
	if (newList.length !== oldList.length) {
		// 列表长度变化时，检查当前索引是否有效
		if (currentIndex.value >= newList.length) {
			currentIndex.value = Math.max(0, newList.length - 1);
		}
	}
});

// 工具函数
function parseStyleString(styleStr) {
	const styles = {};
	if (!styleStr) return styles;
	
	styleStr.split(';').forEach(item => {
		const [key, value] = item.split(':');
		if (key && value) {
			const camelKey = key.trim().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
			styles[camelKey] = value.trim();
		}
	});
	
	return styles;
}

function getItemKey(item, index) {
	if (typeof item === 'object' && item !== null && item.id) {
		return `item-${item.id}`;
	}
	return `item-${index}`;
}

function getItemId(item, index) {
	if (typeof item === 'object' && item !== null && item.id) {
		return String(item.id);
	}
	return String(index);
}

function getItemType(item) {
	if (typeof item === 'object' && item !== null && item.type) {
		return item.type;
	}
	
	if (typeof item === 'string') {
		// 简单判断是否为图片链接
		const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
		const isImage = imageExts.some(ext => item.toLowerCase().includes(ext));
		return isImage ? 'image' : 'text';
	}
	
	return 'text';
}

function getItemSrc(item) {
	if (typeof item === 'string') {
		return item;
	}
	
	if (typeof item === 'object' && item !== null) {
		return item.src || item.url || item.image || '';
	}
	
	return '';
}

function getItemLabel(item) {
	if (typeof item === 'string') {
		return item;
	}
	
	if (typeof item === 'object' && item !== null) {
		return item.label || item.title || item.text || String(item);
	}
	
	return String(item);
}

function getItemStyle(index) {
	const style = {};
	
	if (props.type === 'card') {
		const isActive = index === currentIndex.value;
		if (!isActive) {
			style.transform = `scale(${props.cardScale})`;
			style.opacity = '0.7';
		}
		style.transition = 'all 0.3s ease';
	}
	
	return style;
}

function getItemWrapperStyle(index) {
	const style = {
		width: '100%',
		height: '100%',
		borderRadius: typeof props.borderRadius === 'number' ? `${props.borderRadius}rpx` : props.borderRadius
	};
	
	return style;
}

function getIndicatorStyle(index) {
	const style = {};
	
	if (index === currentIndex.value) {
		style.backgroundColor = '#409eff';
		style.opacity = '1';
	} else {
		style.backgroundColor = '#c0c4cc';
		style.opacity = '0.7';
	}
	
	return style;
}

// 事件处理
function handleSwiperChange(e) {
	const { current, source } = e.detail;
	const oldIndex = currentIndex.value;
	currentIndex.value = current;
	
	emit('change', {
		current,
		old: oldIndex,
		source,
		item: props.list[current]
	});
}

function handleTransition(e) {
	isTransitioning.value = true;
	emit('transition', e.detail);
}

function handleAnimationFinish(e) {
	isTransitioning.value = false;
	emit('animationfinish', e.detail);
}

function handleTouchStart(e) {
	if (props.pauseOnHover && props.autoplay) {
		isPaused.value = true;
	}
}

function handleTouchEnd(e) {
	if (props.pauseOnHover && props.autoplay) {
		isPaused.value = false;
	}
}

function handleItemClick(index) {
	const item = props.list[index];
	emit('click', {
		index,
		item
	});
}

function handleIndicatorClick(index) {
	if (props.trigger === 'click') {
		setActiveItem(index);
	}
}

function handleIndicatorHover(index) {
	if (props.trigger === 'hover') {
		setActiveItem(index);
	}
}

function handlePrev() {
	prev();
}

function handleNext() {
	next();
}

function handleImageLoad(e) {
	emit('imageLoad', e);
}

function handleImageError(e) {
	emit('imageError', e);
}

// 公开方法
function setActiveItem(index) {
	if (typeof index === 'string') {
		// 通过 name 查找
		const targetIndex = props.list.findIndex(item => 
			(typeof item === 'object' && item !== null && item.name === index)
		);
		if (targetIndex !== -1) {
			currentIndex.value = targetIndex;
		}
	} else if (typeof index === 'number') {
		if (index >= 0 && index < props.list.length) {
			currentIndex.value = index;
		}
	}
}

function prev() {
	if (props.list.length === 0) return;
	
	let newIndex;
	if (props.loop) {
		newIndex = currentIndex.value === 0 ? props.list.length - 1 : currentIndex.value - 1;
	} else {
		newIndex = Math.max(0, currentIndex.value - 1);
	}
	
	setActiveItem(newIndex);
}

function next() {
	if (props.list.length === 0) return;
	
	let newIndex;
	if (props.loop) {
		newIndex = currentIndex.value === props.list.length - 1 ? 0 : currentIndex.value + 1;
	} else {
		newIndex = Math.min(props.list.length - 1, currentIndex.value + 1);
	}
	
	setActiveItem(newIndex);
}

// 暴露属性和方法
defineExpose({
	activeIndex: computed(() => currentIndex.value),
	setActiveItem,
	prev,
	next,
	// 添加一些便捷方法
	getCurrentIndex: () => currentIndex.value,
	getListLength: () => props.list.length,
	pauseAutoplay: () => {
		isPaused.value = true;
	},
	resumeAutoplay: () => {
		isPaused.value = false;
	}
});
</script>

<style lang="scss" scoped>
.zx-carousel {
	position: relative;
	overflow: hidden;

	&__container {
		width: 100%;
		height: 100%;
	}

	&__item {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;

		&--card {
			width: 80%;
			margin: 0 auto;
		}

		&--vertical {
			height: 80%;
		}

		&-wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			overflow: hidden;

			&--card {
				border-radius: 8rpx;
				box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
			}

			&--blur {
				filter: blur(2px);
				transition: filter 0.3s ease;
			}
		}

		&-image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		&-content {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #f5f7fa;
		}

		&-text {
			font-size: 32rpx;
			color: #606266;
			text-align: center;
		}
	}

	&__indicators {
		position: absolute;
		display: flex;
		align-items: center;
		z-index: 10;

		&--outside {
			position: static;
			margin-top: 20rpx;
			justify-content: center;
		}

		&:not(&--outside) {
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		&--vertical {
			flex-direction: column;
			right: 20rpx;
			top: 50%;
			left: auto;
			transform: translateY(-50%);

			.zx-carousel__indicator {
				margin: 8rpx 0;
			}
		}
	}

	&__indicator {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50%;
		margin: 0 8rpx;
		cursor: pointer;
		transition: all 0.3s ease;
		background-color: #c0c4cc;
		opacity: 0.7;

		&--active {
			background-color: #409eff !important;
			opacity: 1 !important;
			transform: scale(1.2);
		}

		&--click {
			cursor: pointer;
		}

		&-label {
			font-size: 24rpx;
			color: #ffffff;
			line-height: 1;
			margin-left: 8rpx;
		}
	}

	&__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: rgba(31, 45, 61, 0.11);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		transition: all 0.3s ease;
		opacity: 0;

		&:hover {
			background-color: rgba(31, 45, 61, 0.23);
		}

		&--left {
			left: 32rpx;
		}

		&--right {
			right: 32rpx;
		}

		&--always {
			opacity: 1;
		}

		&--vertical {
			&.zx-carousel__arrow--left {
				top: 32rpx;
				left: 50%;
				transform: translateX(-50%) rotate(90deg);
			}

			&.zx-carousel__arrow--right {
				bottom: 32rpx;
				top: auto;
				right: auto;
				left: 50%;
				transform: translateX(-50%) rotate(90deg);
			}
		}

		&-icon {
			font-size: 32rpx;
			color: #ffffff;
			font-weight: bold;
		}
	}

	// 鼠标悬停时显示箭头
	&:hover &__arrow:not(&__arrow--always) {
		opacity: 1;
	}

	// 卡片模式样式
	&--card {
		.zx-carousel__item {
			perspective: 1000px;
		}
	}

	// 垂直模式样式
	&--vertical {
		.zx-carousel__container {
			flex-direction: column;
		}
	}
}

/* 动画效果 */
@keyframes carouselBlur {
	0% {
		filter: blur(0px);
	}
	50% {
		filter: blur(2px);
	}
	100% {
		filter: blur(0px);
	}
}

.zx-carousel__item-wrapper--blur {
	animation: carouselBlur 0.5s ease-in-out;
}
</style>
