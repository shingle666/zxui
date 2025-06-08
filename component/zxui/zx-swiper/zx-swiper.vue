<template>
	<view class="zx-swiper" :style="{backgroundColor: bgColor, height: imageHeight, borderRadius: radius}">
		<view v-if="loading" class="zx-swiper__loading">
			<zx-loading-icon mode="circle"></zx-loading-icon>
		</view>
		<swiper v-else
			class="zx-swiper__wrapper"
			:style="{height: imageHeight}"
			:circular="circular"
			:interval="interval"
			:duration="duration"
			:autoplay="autoplay"
			:current="current"
			:current-item-id="currentItemId"
			:previous-margin="previousMargin"
			:next-margin="nextMargin"
			:acceleration="acceleration"
			:display-multiple-items="displayMultipleItems"
			:easing-function="easingFunction"
			:vertical="vertical"
			:disable-touch="disableTouch"
			:touchable="touchable"
			:indicator-dots="false"
			@change="change"
			@transition="transition"
			@animationfinish="animationfinish">
			<swiper-item class="zx-swiper__wrapper__item" v-for="(item, index) in list" :key="index" :item-id="getItemId(item, index)">
				<view class="zx-swiper__wrapper__item__wrapper" :style="[itemStyle(index)]" @tap="clickHandler(index)">
					<!-- 图片展示 -->
					<image v-if="getItemType(item) === 'image'"
						class="zx-swiper__wrapper__item__wrapper__image"
						:src="getSource(item)"
						:mode="imgMode"
						:style="{height: imageHeight, borderRadius: radius, width: '100%'}"
						:lazy-load="lazyLoad"
						@load="imageLoad"
						@error="imageError"
					/>
					
					<!-- 视频展示 -->
					<video v-else-if="getItemType(item) === 'video'"
						class="zx-swiper__wrapper__item__wrapper__video"
						:id="`zx-video-${index}`"
						:enable-progress-gesture="false"
						:src="getSource(item)"
						:poster="getPoster(item)"
						:title="showTitle && item.title ? item.title : ''"
						:style="{height: imageHeight, borderRadius: radius}"
						:controls="videoControls"
						:autoplay="videoAutoplay"
						:loop="videoLoop"
						:muted="videoMuted"
						@play="videoPlay"
						@pause="videoPause"
						@ended="videoEnded"
						@error="videoError"
					/>
					
					<!-- 自定义内容插槽 -->
					<slot v-else :item="item" :index="index" name="item">
						<view class="zx-swiper__wrapper__item__wrapper__custom">
							{{ item }}
						</view>
					</slot>
					
					<!-- 标题显示 -->
					<text v-if="showTitle && item.title" class="zx-swiper__wrapper__item__wrapper__title zx-line-1">
						{{ item.title }}
					</text>
					
					<!-- 遮罩层 -->
					<view v-if="showMask" class="zx-swiper__wrapper__item__wrapper__mask" :style="maskStyle"></view>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 指示器 -->
		<view v-if="!loading && indicator" class="zx-swiper__indicator" :style="[indicatorStyle]">
			<slot name="indicator" :current="currentIndex" :total="list.length">
				<zx-swiper-indicator
					v-if="!showTitle"
					:indicatorActiveColor="indicatorActiveColor"
					:indicatorInactiveColor="indicatorInactiveColor"
					:length="list.length"
					:current="currentIndex"
					:indicatorMode="indicatorMode"
				/>
			</slot>
		</view>
		
		<!-- 自定义覆盖层 -->
		<slot name="overlay" :current="currentIndex" :total="list.length"></slot>
	</view>
</template>

<script setup>
/**
 * Swiper 轮播图
 * @description 该组件一般用于导航轮播，广告展示等场景,可开箱即用，支持图片、视频、自定义内容
 * @tutorial https://zxui.org/components/swiper
 */
import { ref, computed, watch, onMounted, nextTick } from 'vue';

// 定义属性
const props = defineProps({
	// 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
	list: {
		type: Array,
		default: () => []
	},
	// 是否显示面板指示器
	indicator: {
		type: Boolean,
		default: true
	},
	// 指示器非激活颜色
	indicatorActiveColor: {
		type: String,
		default: '#FFFFFF'
	},
	// 指示器的激活颜色
	indicatorInactiveColor: {
		type: String,
		default: 'rgba(255, 255, 255, 0.35)'
	},
	// 指示器样式，可通过bottom，left，right进行定位
	indicatorStyle: {
		type: [String, Object],
		default: ''
	},
	// 指示器模式，line-线型，dot-点型
	indicatorMode: {
		type: String,
		default: 'dot'
	},
	// 是否自动切换
	autoplay: {
		type: Boolean,
		default: true
	},
	// 当前所在滑块的 index
	current: {
		type: [String, Number],
		default: 0
	},
	// 当前所在滑块的 item-id ，不能与 current 被同时指定
	currentItemId: {
		type: String,
		default: ''
	},
	// 滑块自动切换时间间隔
	interval: {
		type: [String, Number],
		default: 3000
	},
	// 滑块切换过程所需时间
	duration: {
		type: [String, Number],
		default: 500
	},
	// 播放到末尾后是否重新回到开头
	circular: {
		type: Boolean,
		default: true
	},
	// 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
	previousMargin: {
		type: [String, Number],
		default: '0rpx'
	},
	// 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
	nextMargin: {
		type: [String, Number],
		default: '0rpx'
	},
	// 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
	acceleration: {
		type: Boolean,
		default: false
	},
	// 同时显示的滑块数量，nvue、支付宝小程序不支持
	displayMultipleItems: {
		type: Number,
		default: 1
	},
	// 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
	// 只对微信小程序有效
	easingFunction: {
		type: String,
		default: 'default'
	},
	// 滑动方向是否为纵向
	vertical: {
		type: Boolean,
		default: false
	},
	// 是否禁止用户 touch 操作
	disableTouch: {
		type: Boolean,
		default: false
	},
	// 是否监听用户的触摸事件，只在初始化时有效，不能动态变更
	touchable: {
		type: Boolean,
		default: true
	},
	// list数组中指定对象的目标属性名
	keyName: {
		type: String,
		default: 'url'
	},
	// 图片的裁剪模式
	imgMode: {
		type: String,
		default: 'aspectFill'
	},
	// 组件宽度
	width: {
		type: [String, Number],
		default: '750rpx'
	},
	// 组件高度
	height: {
		type: [String, Number],
		default: '320rpx'
	},
	// 是否开启自适应高度，开启之后轮播图的高度，为图片的最大高度
	autoHeight: {
		type: Boolean,
		default: false
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: '#f3f4f6'
	},
	// 组件圆角，数值或带单位的字符串
	radius: {
		type: [String, Number],
		default: '10rpx'
	},
	// 是否加载中
	loading: {
		type: Boolean,
		default: false
	},
	// 是否显示标题，要求数组对象中有title属性
	showTitle: {
		type: Boolean,
		default: false
	},
	// 是否显示遮罩层
	showMask: {
		type: Boolean,
		default: false
	},
	// 遮罩层样式
	maskStyle: {
		type: [String, Object],
		default: ''
	},
	// 是否开启懒加载
	lazyLoad: {
		type: Boolean,
		default: true
	},
	// 视频控制相关
	videoControls: {
		type: Boolean,
		default: true
	},
	videoAutoplay: {
		type: Boolean,
		default: false
	},
	videoLoop: {
		type: Boolean,
		default: false
	},
	videoMuted: {
		type: Boolean,
		default: false
	}
});

// 定义事件
const emit = defineEmits(['change', 'click', 'transition', 'animationfinish', 'imageLoad', 'imageError', 'videoPlay', 'videoPause', 'videoEnded', 'videoError']);

// 响应式状态
const currentIndex = ref(0);
const imageHeight = ref('');

// 初始化组件
onMounted(() => {
	imageHeight.value = props.height;
	currentIndex.value = Number(props.current) || 0;
	// 获取最大的图片高度
	if (props.autoHeight && props.list.length > 0) {
		updateImageHeight(props.list);
	}
});

// 监听属性变化
watch(() => props.current, (val, preVal) => {
	if (val === preVal) return;
	currentIndex.value = Number(val) || 0;
});

watch(() => props.list, (val) => {
	// 重置当前索引
	if (val.length === 0) {
		currentIndex.value = 0;
	} else if (currentIndex.value >= val.length) {
		currentIndex.value = val.length - 1;
	}
	
	// 获取最大的图片高度
	if (props.autoHeight && val.length > 0) {
		nextTick(() => {
			updateImageHeight(val);
		});
	}
});

// 计算属性
const itemStyle = computed(() => {
	return (index) => {
		const style = {};
		// #ifndef APP-NVUE || MP-TOUTIAO
		// 左右流出空间的写法不支持nvue和头条
		// 只有配置了此二值，才加上对应的圆角，以及缩放
		if (props.nextMargin && props.previousMargin) {
			style.borderRadius = props.radius;
			if (index !== currentIndex.value) {
				style.transform = 'scale(0.92)';
			}
		}
		// #endif
		return style;
	};
});

// 更新图片高度的函数
function updateImageHeight(list) {
	let maxHeight = 0;
	let loadedCount = 0;
	const totalImages = list.filter(item => getItemType(item) === 'image').length;
	
	if (totalImages === 0) return;
	
	list.forEach((item, index) => {
		if (getItemType(item) === 'image') {
			const imgUrl = getSource(item);
			if (imgUrl) {
				uni.getImageInfo({
					src: imgUrl,
					success: (res) => {
						const rate = 750 / res.width;
						const height = res.height * rate;
						maxHeight = Math.max(maxHeight, height);
						loadedCount++;
						
						if (loadedCount === totalImages) {
							imageHeight.value = maxHeight + 'rpx';
						}
					},
					fail: () => {
						loadedCount++;
						if (loadedCount === totalImages && maxHeight > 0) {
							imageHeight.value = maxHeight + 'rpx';
						}
					}
				});
			}
		}
	});
}

// 获取项目类型
function getItemType(item) {
	if (typeof item === 'string') {
		// 简单的视频格式判断
		const videoExts = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.m4v'];
		const isVideo = videoExts.some(ext => item.toLowerCase().includes(ext));
		return isVideo ? 'video' : 'image';
	}
	
	if (typeof item === 'object' && item !== null) {
		if (item.type) {
			return ['image', 'video', 'custom'].includes(item.type) ? item.type : 'image';
		}
		// 检查是否有视频相关属性
		if (item.video || item.videoUrl) {
			return 'video';
		}
		// 只判断字段，不再调用 getSource
		const url = item[props.keyName] || item.url || item.image || item.src || '';
		if (url) {
			const videoExts = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.m4v'];
			const isVideo = videoExts.some(ext => url.toLowerCase().includes(ext));
			return isVideo ? 'video' : 'image';
		}
	}
	return 'custom';
}

// 获取item-id
function getItemId(item, index) {
	if (typeof item === 'object' && item !== null && item.id) {
		return String(item.id);
	}
	return String(index);
}

// 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
function getSource(item) {
	if (typeof item === 'string') {
		return item;
	}
	if (typeof item === 'object' && item !== null) {
		// 只根据字段直接返回，不再调用 getItemType
		return item.video || item.videoUrl || item[props.keyName] || item.url || item.image || item.src || '';
	}
	return '';
}

// 轮播切换事件
function change(e) {
	const { current, source } = e.detail;
	
	// 暂停之前的视频
	pauseVideo(currentIndex.value);
	
	// 更新当前索引
	currentIndex.value = current;
	
	emit('change', { current, source, currentItem: props.list[current] });
}

// transition事件
function transition(e) {
	emit('transition', e.detail);
}

// animationfinish事件
function animationfinish(e) {
	emit('animationfinish', e.detail);
}

// 切换轮播时，暂停视频播放
function pauseVideo(index) {
	if (index >= 0 && index < props.list.length) {
		const item = props.list[index];
		if (getItemType(item) === 'video') {
			try {
				const videoContext = uni.createVideoContext(`zx-video-${index}`);
				videoContext && videoContext.pause();
			} catch (error) {
				console.warn('暂停视频失败:', error);
			}
		}
	}
}

// 当一个轮播item为视频时，获取它的视频海报
function getPoster(item) {
	if (typeof item === 'object' && item !== null) {
		return item.poster || item.cover || '';
	}
	return '';
}

// 点击某个item
function clickHandler(index) {
	const item = props.list[index];
	emit('click', { index, item });
}

// 图片加载成功
function imageLoad(e) {
	emit('imageLoad', e);
}

// 图片加载失败
function imageError(e) {
	emit('imageError', e);
}

// 视频事件处理
function videoPlay(e) {
	emit('videoPlay', e);
}

function videoPause(e) {
	emit('videoPause', e);
}

function videoEnded(e) {
	emit('videoEnded', e);
}

function videoError(e) {
	emit('videoError', e);
}

// 暴露方法给外部调用
defineExpose({
	// 切换到指定索引
	switchTo(index) {
		if (index >= 0 && index < props.list.length) {
			currentIndex.value = index;
		}
	},
	// 下一张
	next() {
		const nextIndex = props.circular ? (currentIndex.value + 1) % props.list.length : Math.min(currentIndex.value + 1, props.list.length - 1);
		this.switchTo(nextIndex);
	},
	// 上一张
	prev() {
		const prevIndex = props.circular ? (currentIndex.value - 1 + props.list.length) % props.list.length : Math.max(currentIndex.value - 1, 0);
		this.switchTo(prevIndex);
	},
	// 获取当前项
	getCurrentItem() {
		return props.list[currentIndex.value];
	},
	// 暂停所有视频
	pauseAllVideos() {
		props.list.forEach((item, index) => {
			if (getItemType(item) === 'video') {
				pauseVideo(index);
			}
		});
	}
});
</script>

<style lang="scss" scoped>
.zx-swiper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;

	&__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	&__wrapper {
		flex: 1;
		width: 100%;

		&__item {
			flex: 1;
			width: 100%;

			&__wrapper {
				display: flex;
				position: relative;
				overflow: hidden;
				transition: transform 0.3s;
				flex: 1;
				width: 100%;
				height: 100%;

				&__image,
				&__video {
					flex: 1;
					width: 100%;
					height: 100%;
					object-fit: cover;
				}

				&__custom {
					flex: 1;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f5f5f5;
					color: #666;
					font-size: 28rpx;
				}

				&__title {
					position: absolute;
					background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
					bottom: 0;
					left: 0;
					right: 0;
					font-size: 28rpx;
					padding: 20rpx 24rpx 12rpx;
					color: #ffffff;
					z-index: 2;
				}

				&__mask {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.3);
					z-index: 1;
				}
			}
		}
	}

	&__indicator {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
		z-index: 3;
	}
}

/* 工具类 */
.zx-line-1 {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
