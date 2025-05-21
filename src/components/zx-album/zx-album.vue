<template>
	<view class="zx-album">
		<view class="zx-album__row" ref="zx-album__row" v-for="(arr, index) in showUrls" :forComputedUse="albumWidth" :key="index">
			<view
				class="zx-album__row__wrapper"
				v-for="(item, index1) in arr"
				:key="index1"
				:style="[imageStyle(index + 1, index1 + 1)]"
				@tap="previewFullImage ? onPreviewTap(getSrc(item)) : ''"
			>
				<view v-if="loading" class="zx-album__row__wrapper__loading">
					<view class="loading-circle"></view>
				</view>
				<image
					:src="getSrc(item)"
					:mode="urls.length === 1 ? (imageHeight > 0 ? singleMode : 'widthFix') : multipleMode"
					:style="[{ width: imageWidth, height: imageHeight }]"
					@error="onImageError(index, index1)"
					@load="onImageLoad(index, index1)"
					:lazy-load="lazyLoad"
				></image>
				<view v-if="showError && imageLoadStatus[`${index}-${index1}`] === 'error'" class="zx-album__row__wrapper__error">
					<zx-text text="加载失败" color="#ffffff" size="24rpx" align="center" customStyle="justify-content: center"></zx-text>
				</view>
				<view
					v-if="showMore && urls.length > rowCount * showUrls.length && index === showUrls.length - 1 && index1 === showUrls[showUrls.length - 1].length - 1"
					class="zx-album__row__wrapper__text"
				>
					<zx-text :text="`+${urls.length - maxCount}`" color="#ffffff" size="70rpx" align="center" customStyle="justify-content: center"></zx-text>
				</view>
				<view v-if="deletable" class="zx-album__row__wrapper__delete" @tap.stop="onDeleteTap(index, index1)">
					<text class="delete-icon">×</text>
				</view>
			</view>
		</view>
		<view v-if="urls.length === 0 && showEmpty" class="zx-album__empty">
			<zx-text :text="emptyText" color="#999999" size="28rpx"></zx-text>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, watch, computed, reactive } from 'vue';

const { proxy } = getCurrentInstance();

// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom');
// #endif

/**
 * Album 相册
 * @description 相册的功能
 * @tutorial https://zxui.org/components/album
 * @property {Array}           urls             图片地址列表 Array<String>|Array<Object>形式
 * @property {String}          keyName          指定从数组的对象元素中读取哪个属性作为图片地址
 * @property {String | Number} singleSize       单图时，图片长边的长度  （默认 180 ）
 * @property {String | Number} multipleSize     多图时，图片边长 （默认 70 ）
 * @property {String | Number} space            多图时，图片水平和垂直之间的间隔 （默认 6 ）
 * @property {String}          singleMode       单图时，图片缩放裁剪的模式 （默认 'scaleToFill' ）
 * @property {String}          multipleMode     多图时，图片缩放裁剪的模式 （默认 'aspectFill' ）
 * @property {String | Number} maxCount         取消按钮的提示文字 （默认 9 ）
 * @property {Boolean}         previewFullImage 是否可以预览图片 （默认 true ）
 * @property {String | Number} rowCount         每行展示图片数量，如设置，singleSize和multipleSize将会无效	（默认 3 ）
 * @property {Boolean}         showMore         超出maxCount时是否显示查看更多的提示 （默认 true ）
 * @property {Boolean}         deletable        是否可以删除图片 （默认 false ）
 * @property {Boolean}         lazyLoad         是否开启图片懒加载 （默认 true ）
 * @property {Boolean}         loading          是否显示加载状态 （默认 false ）
 * @property {Boolean}         showError        是否显示加载失败的提示 （默认 true ）
 * @property {Boolean}         showEmpty        是否显示空状态提示 （默认 true ）
 * @property {String}          emptyText        空状态提示文字 （默认 '暂无图片' ）
 *
 * @event    {Function}        albumWidth       某些特殊的情况下，需要让文字与相册的宽度相等，这里事件的形式对外发送  （回调参数 width ）
 * @event    {Function}        delete           删除图片时触发 （回调参数 index ）
 * @event    {Function}        error            图片加载失败时触发 （回调参数 {rowIndex, colIndex, src} ）
 * @example <zx-album :urls="urls" @albumWidth="width => albumWidth = width" multipleSize="68" ></zx-album>
 */

const props = defineProps({
	// 图片地址，Array<String>|Array<Object>形式
	urls: {
		type: Array,
		default: function () {
			return [];
		}
	},
	// 指定从数组的对象元素中读取哪个属性作为图片地址
	keyName: {
		type: String,
		default: ''
	},
	// 单图时，图片长边的长度
	singleSize: {
		type: [String, Number],
		default: '360rpx'
	},
	// 多图时，图片边长
	multipleSize: {
		type: [String, Number],
		default: '140rpx'
	},
	// 多图时，图片水平和垂直之间的间隔
	space: {
		type: [String, Number],
		default: '12rpx'
	},
	// 单图时，图片缩放裁剪的模式
	singleMode: {
		type: String,
		default: 'scaleToFill'
	},
	// 多图时，图片缩放裁剪的模式
	multipleMode: {
		type: String,
		default: 'aspectFill'
	},
	// 最多展示的图片数量，超出时最后一个位置将会显示剩余图片数量
	maxCount: {
		type: [String, Number],
		default: 9
	},
	// 是否可以预览图片
	previewFullImage: {
		type: Boolean,
		default: true
	},
	// 每行展示图片数量，如设置，singleSize和multipleSize将会无效
	rowCount: {
		type: [String, Number],
		default: 3
	},
	// 超出maxCount时是否显示查看更多的提示
	showMore: {
		type: Boolean,
		default: true
	},
	// 是否可以删除图片
	deletable: {
		type: Boolean,
		default: false
	},
	// 是否开启图片懒加载
	lazyLoad: {
		type: Boolean,
		default: true
	},
	// 是否显示加载状态
	loading: {
		type: Boolean,
		default: false
	},
	// 是否显示加载失败的提示
	showError: {
		type: Boolean,
		default: true
	},
	// 是否显示空状态提示
	showEmpty: {
		type: Boolean,
		default: true
	},
	// 空状态提示文字
	emptyText: {
		type: String,
		default: '暂无图片'
	}
});

const emit = defineEmits(['albumWidth', 'delete', 'error']);

// 单图的宽度
const singleWidth = ref(0);
// 单图的高度
const singleHeight = ref(0);
// 单图时，如果无法获取图片的尺寸信息，让图片宽度默认为容器的一定百分比
const singlePercent = ref(0.6);
// 图片加载状态
const imageLoadStatus = reactive({});

const imageStyle = computed(() => {
	return (index1, index2) => {
		let rowLen = showUrls.value.length;
		let allLen = props.urls.length;
		const style = {
			marginRight: props.space,
			marginBottom: props.space
		};
		// 如果为最后一行，则每个图片都无需下边框
		if (index1 === rowLen) {
			style.marginBottom = 0;
		}
		// 每行的最右边一张和总长度的最后一张无需右边框
		if (index2 === props.rowCount || (index1 === rowLen && index2 === showUrls.value[index1 - 1].length)) {
			style.marginRight = 0;
		}
		return style;
	};
});

// 将数组划分为二维数组
const showUrls = computed(() => {
	const arr = [];
	props.urls.map((item, index) => {
		// 限制最大展示数量
		if (index + 1 <= props.maxCount) {
			// 计算该元素为第几个素组内
			const itemIndex = Math.floor(index / props.rowCount);
			// 判断对应的索引是否存在
			if (!arr[itemIndex]) {
				arr[itemIndex] = [];
			}
			arr[itemIndex].push(item);
		}
	});
	return arr;
});

const imageWidth = computed(() => {
	return props.urls.length === 1 ? singleWidth.value : props.multipleSize;
});

const imageHeight = computed(() => {
	return props.urls.length === 1 ? singleHeight.value : props.multipleSize;
});

// 此变量无实际用途，仅仅是为了利用computed特性，让其在urls长度等变化时，重新计算图片的宽度
// 因为用户在某些特殊的情况下，需要让文字与相册的宽度相等，所以这里事件的形式对外发送
const albumWidth = computed(() => {
	let width = 0;
	if (props.urls.length === 1) {
		width = singleWidth.value;
	} else if (props.urls.length > 0) {
		// 考虑可能没有完整一行的情况
		const rowItemCount = showUrls.value[0]?.length || 0;
		width = rowItemCount > 0 ? rowItemCount * props.multipleSize + props.space * (rowItemCount - 1) : 0;
	}
	emit('albumWidth', width);
	return width;
});



// 预览图片
const onPreviewTap = (url) => {
	const urls = props.urls.map((item) => {
		return getSrc(item);
	});
	uni.previewImage({
		current: url,
		urls
	});
};

// 删除图片
const onDeleteTap = (rowIndex, colIndex) => {
	// 计算真实索引
	const realIndex = rowIndex * Number(props.rowCount) + colIndex;
	emit('delete', realIndex);
};

// 图片加载失败
const onImageError = (rowIndex, colIndex) => {
	imageLoadStatus[`${rowIndex}-${colIndex}`] = 'error';
	const src = getSrc(props.urls[rowIndex * Number(props.rowCount) + colIndex]);
	emit('error', { rowIndex, colIndex, src });
};

// 图片加载成功
const onImageLoad = (rowIndex, colIndex) => {
	imageLoadStatus[`${rowIndex}-${colIndex}`] = 'success';
};

// 获取图片的路径
const getSrc = (item) => {
	return testObject(item) ? (props.keyName && item[props.keyName]) || item.src : item;
};

// 单图时，获取图片的尺寸
// 在小程序中，需要将网络图片的的域名添加到小程序的download域名才可能获取尺寸
// 在没有添加的情况下，让单图宽度默认为盒子的一定宽度(singlePercent)
const getImageRect = () => {
	const src = getSrc(props.urls[0]);
	uni.getImageInfo({
		src,
		success: (res) => {
			// 判断图片横向还是竖向展示方式
			const isHorizotal = res.width >= res.height;
			singleWidth.value = isHorizotal ? props.singleSize : (res.width / res.height) * props.singleSize;
			singleHeight.value = !isHorizotal ? props.singleSize : (res.height / res.width) * singleWidth.value;
		},
		fail: () => {
			getComponentWidth();
		}
	});
};

// 获取组件的宽度
const getComponentWidth = async () => {
	// 延时一定时间，以获取dom尺寸
	await sleep(30);
	// #ifndef APP-NVUE
	$uGetRect('.zx-album__row').then((size) => {
		singleWidth.value = size.width * singlePercent.value;
	});
	// #endif

	// #ifdef APP-NVUE
	// 这里ref="zx-album__row"所在的标签为通过for循环出来，导致$refs['zx-album__row']是一个数组
	const ref = proxy.$refs['zx-album__row'][0];
	ref &&
		dom.getComponentRect(ref, (res) => {
			singleWidth.value = res.size.width * singlePercent.value;
		});
	// #endif
};

const sleep = (value = 30) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, value);
	});
};

const testObject = (value) => {
	return Object.prototype.toString.call(value) === '[object Object]';
};

// uniapp 未提供获取元素尺寸的 hook，需要自己封装
const $uGetRect = (selector, all) => {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.in(proxy)
			[all ? 'selectAll' : 'select'](selector)
			.boundingClientRect((rect) => {
				if (all && Array.isArray(rect) && rect.length) {
					resolve(rect);
				}
				if (!all && rect) {
					resolve(rect);
				}
			})
			.exec();
	});
};

watch(
	() => props.urls,
	(newVal) => {
		if (newVal.length === 1) {
			getImageRect();
		}
	},
	{ immediate: true, deep: true }
);

</script>

<style lang="scss" scoped>
.zx-album {
	display: flex;
	flex-direction: column;
	width: 100%;

	&__row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;

		&__wrapper {
			position: relative;
			overflow: hidden;
			
			&__loading {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.1);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 1;
				
				.loading-circle {
					width: 30rpx;
					height: 30rpx;
					border: 2rpx solid #f5f5f5;
					border-top-color: #2979ff;
					border-radius: 50%;
					animation: loading-rotate 0.8s linear infinite;
				}
			}
			
			&__error {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.2);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 1;
			}

			&__text {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, 0.3);
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				z-index: 1;
			}
			
			&__delete {
				position: absolute;
				top: 0;
				right: 0;
				width: 36rpx;
				height: 36rpx;
				background-color: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 2;
				
				.delete-icon {
					color: #fff;
					font-size: 24rpx;
					font-weight: bold;
					line-height: 1;
				}
			}
		}
	}
	
	&__empty {
		width: 100%;
		padding: 40rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

@keyframes loading-rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
