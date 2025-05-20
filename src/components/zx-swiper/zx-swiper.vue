<template>
	<view class="zx-swiper" :style="{backgroundColor: bgColor,height: imageHeight,borderRadius: radius}">
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
			:currentItemId="currentItemId"
			:previousMargin="previousMargin"
			:nextMargin="nextMargin"
			:acceleration="acceleration"
			:displayMultipleItems="displayMultipleItems"
			:easingFunction="easingFunction"
			@change="change">
			<swiper-item class="zx-swiper__wrapper__item" v-for="(item, index) in list" :key="index">
				<view class="zx-swiper__wrapper__item__wrapper" :style="[itemStyle(index)]">
					<!-- 在nvue中，image图片的宽度默认为屏幕宽度，需要通过flex:1撑开，另外必须设置高度才能显示图片 -->
					<zx-image :src="getSource(item)" :mode="imgMode" :width="width" height="auto"></zx-image>
				<!-- 	<image class="zx-swiper__wrapper__item__wrapper__image"
						:src="getSource(item)"
						:mode="imgMode"
						:style="{height: imageHeight,borderRadius: radius}"
						@tap="clickHandler(index)"
					></image> -->
					<!-- <image v-if="getItemType(item) === 'image'"
						class="zx-swiper__wrapper__item__wrapper__image"
						:src="getSource(item)"
						:mode="imgMode"
						:style="{height: height,borderRadius: radius}"
						@tap="clickHandler(index)"
					></image> -->
					<!-- <video v-if="getItemType(item) === 'video'"
						class="zx-swiper__wrapper__item__wrapper__video"
						:id="`video-${index}`"
						:enable-progress-gesture="false"
						:src="getSource(item)"
						:poster="getPoster(item)"
						:title="showTitle && item.title ? item.title : ''"
						:style="{height: height}"
						controls
						@tap="clickHandler(index)"
					></video> -->
					<text v-if="showTitle && item.title" class="zx-swiper__wrapper__item__wrapper__title zx-line-1">
						{{ item.title }}
					</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="zx-swiper__indicator" :style="[indicatorStyle]">
			<slot name="indicator">
				<zx-swiper-indicator
					v-if="!loading && indicator && !showTitle"
					:indicatorActiveColor="indicatorActiveColor"
					:indicatorInactiveColor="indicatorInactiveColor"
					:length="list.length"
					:current="currentIndex"
					:indicatorMode="indicatorMode"
				></zx-swiper-indicator>
			</slot>
		</view>
	</view>
</template>

<script setup>
/**
 * Swiper 轮播图
 * @description 该组件一般用于导航轮播，广告展示等场景,可开箱即用，
 * @tutorial https://zxui.org/components/swiper
 */
import { ref, computed, watch, onMounted } from 'vue';

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
		default: '0prx'
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
	// list数组中指定对象的目标属性名
	keyName: {
		type: String,
		default: 'url'
	},
	// 图片的裁剪模式
	imgMode: {
		type: String,
		default: 'widthFix'
	},
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
	}
});

// 定义事件
const emit = defineEmits(['change', 'click']);

// 响应式状态
const currentIndex = ref(0);
const imageHeight = ref('');

// 初始化组件
onMounted(() => {
	imageHeight.value = props.height;
	// 获取最大的图片高度
	if (props.autoHeight) {
		updateImageHeight(props.list);
	}
});

// 监听属性变化
watch(() => props.current, (val, preVal) => {
	if (val === preVal) return;
	currentIndex.value = val; // 和上游数据关联上
});

watch(() => props.list, (val) => {
	// 获取最大的图片高度
	if (props.autoHeight) {
		updateImageHeight(val);
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
			if (index !== currentIndex.value) style.transform = 'scale(0.92)';
		}
		// #endif
		return style;
	};
});

// 更新图片高度的函数
function updateImageHeight(list) {
	list.forEach((item, index) => {
		let imgUrl = getSource(list[index]);
		uni.getImageInfo({
			src: imgUrl,
			success: (res) => {
				let rate = 750 / res.width;
				let height = res.height * rate;
				let image_height = parseInt(imageHeight.value);
				if (height > image_height) {
					imageHeight.value = height + 'rpx';
				}
			}
		});
	});
}

// 获取项目类型
function getItemType(item) {
	if (typeof item === 'string') return uni.$u.test.video(getSource(item)) ? 'video' : 'image';
	if (typeof item === 'object' && props.keyName) {
		if (!item.type) return uni.$u.test.video(getSource(item)) ? 'video' : 'image';
		if (item.type === 'image') return 'image';
		if (item.type === 'video') return 'video';
		return 'image';
	}
}

// 获取目标路径，可能数组中为字符串，对象的形式，额外可指定对象的目标属性名keyName
function getSource(item) {
	if (typeof item === 'string') {
		return item;
	}
	if (typeof item === 'object' && props.keyName) {
		return item[props.keyName];
	}
	return '';
}

// 轮播切换事件
function change(e) {
	// 当前的激活索引
	const { current } = e.detail;
	pauseVideo(currentIndex.value);
	currentIndex.value = current;
	emit('change', e.detail);
}

// 切换轮播时，暂停视频播放
function pauseVideo(index) {
	const lastItem = getSource(props.list[index]);
	/* if (uni.$u.test.video(lastItem)) {
		// 当视频隐藏时，暂停播放
		const video = uni.createVideoContext(`video-${index}`);
		video.pause();
	} */
}

// 当一个轮播item为视频时，获取它的视频海报
function getPoster(item) {
	return typeof item === 'object' && item.poster ? item.poster : '';
}

// 点击某个item
function clickHandler(index) {
	emit('click', index);
}
</script>

<style lang="scss" scoped>
.zx-swiper {
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;

	&__wrapper {
		flex: 1;

		&__item {
			flex: 1;

			&__wrapper {
				display: flex;
				position: relative;
				overflow: hidden;
				transition: transform 0.3s;
				flex: 1;

				&__image {
					flex: 1;
				}

				&__video {
					flex: 1;
				}

				&__title {
					position: absolute;
					background-color: rgba(0, 0, 0, 0.3);
					bottom: 0;
					left: 0;
					right: 0;
					font-size: 28rpx;
					padding: 12rpx 24rpx;
					color: #ffffff;
					flex: 1;
				}
			}
		}
	}

	&__indicator {
		position: absolute;
		bottom: 10px;
	}
}
</style>
