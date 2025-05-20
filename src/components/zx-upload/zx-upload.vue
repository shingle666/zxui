<template>
	<view class="zx-upload" :style="[utils.addStyle(customStyle)]">
		<view class="zx-upload__wrap">
			<template v-if="previewImage">
				<view class="zx-upload__wrap__preview" v-for="(item, index) in lists" :key="index">
					<image
						v-if="item.isImage || (item.type && item.type === 'image')"
						:src="item.thumb || item.url"
						:mode="imageMode"
						class="zx-upload__wrap__preview__image"
						@tap="onPreviewImage(item)"
						:style="[
							{
								width: utils.addUnit(width),
								height: utils.addUnit(height)
							}
						]"
					/>
					<view v-else class="zx-upload__wrap__preview__other">
						<zx-icon color="#80CBF9" size="26" :name="item.isVideo || (item.type && item.type === 'video') ? 'movie' : 'folder'"></zx-icon>
						<text class="zx-upload__wrap__preview__other__text">{{ item.isVideo || (item.type && item.type === 'video') ? '视频' : '文件' }}</text>
					</view>
					<view class="zx-upload__status" v-if="item.status === 'uploading' || item.status === 'failed'">
						<view class="zx-upload__status__icon">
							<zx-icon v-if="item.status === 'failed'" name="close-circle" color="#ffffff" size="25" />
							<zx-loading-icon size="22" mode="circle" color="#ffffff" v-else />
						</view>
						<text v-if="item.message" class="zx-upload__status__message">{{ item.message }}</text>
					</view>
					<view class="zx-upload__deletable" v-if="item.status !== 'uploading' && (deletable || item.deletable)" @tap.stop="deleteItem(index)">
						<view class="zx-upload__deletable__icon"><zx-icon name="close" color="#ffffff" size="10"></zx-icon></view>
					</view>
					<view class="zx-upload__success" v-if="item.status === 'success'">
						<!-- #ifdef APP-NVUE -->
						<image :src="successIcon" class="zx-upload__success__icon"></image>
						<!-- #endif -->
						<!-- #ifndef APP-NVUE -->
						<view class="zx-upload__success__icon"><zx-icon name="checkmark" color="#ffffff" size="12"></zx-icon></view>
						<!-- #endif -->
					</view>
				</view>
			</template>

			<template v-if="isInCount">
				<view v-if="$slots.default" @tap="chooseFile"><slot /></view>
				<view
					v-else
					class="zx-upload__button"
					:hover-class="!disabled ? 'zx-upload__button--hover' : ''"
					hover-stay-time="150"
					@tap="chooseFile"
					:class="[disabled && 'zx-upload__button--disabled']"
					:style="[
						{
							width: utils.addUnit(width),
							height: utils.addUnit(height)
						}
					]"
				>
					<zx-icon :name="uploadIcon" size="26" :color="uploadIconColor"></zx-icon>
					<text v-if="uploadText" class="zx-upload__button__text">{{ uploadText }}</text>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, computed, useSlots, inject } from 'vue';

// 定义emits
const emit = defineEmits(['afterRead', 'beforeRead', 'oversize', 'clickPreview', 'delete', 'error']);

// 定义props
const props = defineProps({
	// 接受的文件类型
	accept: {
		type: String,
		default: 'image'
	},
	// 图片或视频拾取模式
	capture: {
		type: [String, Array],
		default: () => ['album', 'camera']
	},
	// 当accept为video时生效，是否压缩视频
	compressed: {
		type: Boolean,
		default: true
	},
	// 当accept为video时生效，可选值为back或front
	camera: {
		type: String,
		default: 'back'
	},
	// 当accept为video时生效，拍摄视频最长时间
	maxDuration: {
		type: Number,
		default: 60
	},
	// 上传区域的图标
	uploadIcon: {
		type: String,
		default: 'camera-fill'
	},
	// 上传区域的图标的颜色
	uploadIconColor: {
		type: String,
		default: '#D3D4D6'
	},
	// 是否开启文件读取前事件
	useBeforeRead: {
		type: Boolean,
		default: false
	},
	// 是否显示组件自带的图片预览功能
	previewFullImage: {
		type: Boolean,
		default: true
	},
	// 最大上传数量
	maxCount: {
		type: [String, Number],
		default: 52
	},
	// 是否启用
	disabled: {
		type: Boolean,
		default: false
	},
	// 预览图片的裁剪模式
	imageMode: {
		type: String,
		default: 'aspectFill'
	},
	// 标识符
	name: {
		type: String,
		default: ''
	},
	// 所选图片的尺寸
	sizeType: {
		type: Array,
		default: () => ['original', 'compressed']
	},
	// 是否开启图片多选
	multiple: {
		type: Boolean,
		default: false
	},
	// 是否展示删除按钮
	deletable: {
		type: Boolean,
		default: true
	},
	// 文件大小限制
	maxSize: {
		type: [String, Number],
		default: Number.MAX_VALUE
	},
	// 显示已上传的文件列表
	fileList: {
		type: Array,
		default: () => []
	},
	// 上传区域的提示文字
	uploadText: {
		type: String,
		default: ''
	},
	// 内部预览和选择按钮的区域宽度
	width: {
		type: [String, Number],
		default: 80
	},
	// 内部预览和选择按钮的区域高度
	height: {
		type: [String, Number],
		default: 80
	},
	// 组件的样式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 是否显示预览
	previewImage: {
		type: Boolean,
		default: true
	},
	// 文件读取前的回调
	beforeRead: {
		type: Function,
		default: null
	},
	// 文件读取后的回调
	afterRead: {
		type: Function,
		default: null
	}
});

// 数据部分
const lists = ref([]);
const isInCount = ref(true);
// #ifdef APP-NVUE
const successIcon = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAACP0lEQVRYCc3YXygsURwH8K/dpcWyG3LF5u/6/+dKVylSypuUl6uUPMifKMWL8oKEB1EUT1KeUPdR3uTNUsSLxb2udG/cbvInNuvf2rVnazZ/ZndmZ87snjM1Z3zpzfp9+Z5mEAhlvjRtZgCKs+gnPAOcAkkMOR4jEHfItjDvgRxxSQD8cM0BuOCaAvXDBQ0oFRc0oFhcQIH+4gIKlIILGFAqLiBAOTjFgXJxigJp4BQD0sIpAqSJow6kjSNAFTnRaHJwLenD6Mud52VQAcrBfTd2oyq+HtGaGGWAcnAVcXWoM3bCZrdi+ncPfaAcXE5UKVpdW/vitGPqqAtn98d0gXJwX7Qp6MmegUYVhvmTIezdmHlxJCjpHRTCFerLkRRu4k0aqdajN3sWOo0BK//msHa+xDuPC/oNFMKRhTtM4xjIX0SCNpXL4+7VIaHuyiWEp2L7ahWLf8fejfPdqPmC3mJicORZUp1CQzm+GiphvljGk+PBvWRbxii+xVTj5M6CiZ/tsDufvaXyxEUDxeLIyvu3m0iOyEFWVAkydcVYdyFrE9tQk9iMq6f/GNlvwt3LjQfh60LUrw9/cFyyMJUW/XkLSNMV4Mi6C5ML+ui4x5ClAX9sB9w0wV6wglJwJCv5fOxcr6EstgbGiEw4XcfUry4cWrcEUW8n+ARKxXEJHhw2WG43UKSvwI/TSZgvl7kh0b3XLZaLEy0QmMgLZAVH7J+ALOE+AVnDvQOyiPMAWcW5gSzjCPAV+78S5WE0GrQAAAAASUVORK5CYII=');
// #endif

// Slots
const slots = useSlots();

// 注入外部提供的工具函数，如果没有提供则使用默认函数
const utils = inject('formatUtils', {
	addUnit: (value, unit = 'rpx') => {
		if (value == null) return '';
		return !isNaN(Number(value)) ? `${value}${unit}` : value;
	},
	addStyle: (customStyle) => {
		return Object.keys(customStyle).map(key => `${key}:${customStyle[key]}`).join(';');
	},
	toast: (message) => uni.showToast({ title: message, icon: 'none' }),
	test: {
		array: (val) => Array.isArray(val),
		func: (val) => typeof val === 'function',
		promise: (val) => val && typeof val.then === 'function',
		image: (url) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url),
		video: (url) => /\.(mp4|avi|mov|rmvb|rm|flv|mkv|wmv)$/i.test(url)
	}
});

// 添加工具函数
const addUnit = (value, unit = 'rpx') => {
	if (value == null) return '';
	return !isNaN(Number(value)) ? `${value}${unit}` : value;
};

// 添加isVideoFile方法
const isVideoFile = (item) => {
	return item.isVideo || (item.type && item.type === 'video');
};

// 内联utils.js的辅助函数
const pickExclude = (obj, keys) => {
	// 某些情况下，type可能会为
	if (!['[object Object]', '[object File]'].includes(Object.prototype.toString.call(obj))) {
		return {}
	}
	return Object.keys(obj).reduce((prev, key) => {
		if (!keys.includes(key)) {
			prev[key] = obj[key]
		}
		return prev
	}, {})
}

const formatImage = (res) => {
	return res.tempFiles.map((item) => ({
		...pickExclude(item, ['path']),
		type: 'image',
		url: item.path,
		thumb: item.path,
		size: item.size,
		// #ifdef H5
		name: item.name
		// #endif
	}))
}

const formatVideo = (res) => {
	return [
		{
			...pickExclude(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
			type: 'video',
			url: res.tempFilePath,
			thumb: res.thumbTempFilePath,
			size: res.size,
			// #ifdef H5
			name: res.name
			// #endif
		}
	]
}

const formatMedia = (res) => {
	return res.tempFiles.map((item) => ({
		...pickExclude(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
		type: res.type,
		url: item.tempFilePath,
		thumb: res.type === 'video' ? item.thumbTempFilePath : item.tempFilePath,
		size: item.size
	}))
}

const formatFile = (res) => {
	return res.tempFiles.map((item) => ({ 
		...pickExclude(item, ['path']), 
		url: item.path, 
		size: item.size,
		// #ifdef H5
		name: item.name,
		type: item.type
		// #endif 
	}))
}

// 内联utils.js的chooseFile函数
const chooseFileFunc = ({
	accept,
	multiple,
	capture,
	compressed,
	maxDuration,
	sizeType,
	camera,
	maxCount
}) => {
	return new Promise((resolve, reject) => {
		switch (accept) {
		case 'image':
			uni.chooseImage({
				count: multiple ? Math.min(maxCount, 9) : 1,
				sourceType: capture,
				sizeType,
				success: (res) => resolve(formatImage(res)),
				fail: reject
			})
			break
			// #ifdef MP-WEIXIN
			// 只有微信小程序才支持chooseMedia接口
		case 'media':
			wx.chooseMedia({
				count: multiple ? Math.min(maxCount, 9) : 1,
				sourceType: capture,
				maxDuration,
				sizeType,
				camera,
				success: (res) => resolve(formatMedia(res)),
				fail: reject
			})
			break
			// #endif
		case 'video':
			uni.chooseVideo({
				sourceType: capture,
				compressed,
				maxDuration,
				camera,
				success: (res) => resolve(formatVideo(res)),
				fail: reject
			})
			break
			// #ifdef MP-WEIXIN || H5
			// 只有微信小程序和H5支持文件类型选择器
		case 'file':
			// #ifdef MP-WEIXIN
			wx.chooseMessageFile({
				count: multiple ? maxCount : 1,
				type: accept,
				success: (res) => resolve(formatFile(res)),
				fail: reject
			})
			// #endif
			// #ifdef H5
			// 需要hx2.9.9以上才支持uni.chooseFile
			uni.chooseFile({
				count: multiple ? maxCount : 1,
				type: accept,
				success: (res) => resolve(formatFile(res)),
				fail: reject
			})
			// #endif
			break
			// #endif
		default:
			// #ifdef MP-WEIXIN || H5
			// 在其他平台，使用通用的chooseImage作为fallback
			// #endif
			// #ifndef MP-WEIXIN || H5
			if (accept === 'file' || accept === 'media' || accept === 'all') {
				uni.chooseImage({
					count: multiple ? Math.min(maxCount, 9) : 1,
					sourceType: capture,
					sizeType,
					success: (res) => resolve(formatImage(res)),
					fail: reject
				});
			} else {
			// #endif
				// 其他情况，通过reject返回错误信息
				reject({
					errMsg: `暂不支持${accept}类型的文件`
				});
			// #ifndef MP-WEIXIN || H5
			}
			// #endif
		}
	})
}

// 方法部分
// 格式化文件列表
const formatFileList = () => {
	const { fileList = [], maxCount, accept, deletable } = props;
	const formatList = fileList.map(item => 
		Object.assign(Object.assign({}, item), {
			isImage: accept === 'image' || utils.test.image(item.url || item.thumb),
			isVideo: accept === 'video' || utils.test.video(item.url || item.thumb),
			deletable: typeof item.deletable === 'boolean' ? item.deletable : deletable
		})
	);
	lists.value = formatList;
	isInCount.value = formatList.length < maxCount;
};

// 选择文件
const chooseFile = () => {
	const { maxCount, multiple, disabled } = props;
	if (disabled) return;
	
	// 如果用户传入的是字符串，需要格式化成数组
	let capture;
	try {
		capture = utils.test.array(props.capture) ? props.capture : props.capture.split(',');
	} catch (e) {
		capture = [];
	}
	
	chooseFileFunc(
		Object.assign({
			accept: props.accept,
			multiple: props.multiple,
			capture: capture,
			compressed: props.compressed,
			maxDuration: props.maxDuration,
			sizeType: props.sizeType,
			camera: props.camera
		}, {
			maxCount: maxCount - lists.value.length
		})
	)
	.then(res => {
		onBeforeRead(multiple ? res : res[0]);
	})
	.catch(error => {
		emit('error', error);
	});
};

// 获取详情
const getDetail = (index) => {
	return {
		name: props.name,
		index: index == null ? props.fileList.length : index
	};
};

// 文件读取之前
const onBeforeRead = (file) => {
	const { beforeRead, useBeforeRead } = props;
	let res = true;
	
	// beforeRead是否为一个方法
	if (utils.test.func(beforeRead)) {
		// 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
		res = beforeRead(file, getDetail());
	}
	
	if (useBeforeRead) {
		res = new Promise((resolve, reject) => {
			emit('beforeRead', Object.assign(
				Object.assign({
					file
				}, getDetail()),
				{
					callback: ok => {
						ok ? resolve() : reject();
					}
				}
			));
		});
	}
	
	if (!res) {
		return;
	}
	
	if (utils.test.promise(res)) {
		res.then(data => onAfterRead(data || file));
	} else {
		onAfterRead(file);
	}
};

// 文件读取之后
const onAfterRead = (file) => {
	const { maxSize, afterRead } = props;
	const oversize = Array.isArray(file) ? file.some(item => item.size > maxSize) : file.size > maxSize;
	
	if (oversize) {
		emit('oversize', Object.assign({
			file
		}, getDetail()));
		return;
	}
	
	if (typeof afterRead === 'function') {
		afterRead(file, getDetail());
	}
	
	emit('afterRead', Object.assign({
		file
	}, getDetail()));
};

// 删除文件
const deleteItem = (index) => {
	emit('delete', Object.assign(
		Object.assign({}, getDetail(index)), {
			file: props.fileList[index]
		}
	));
};

// 预览图片
const onPreviewImage = (item) => {
	if (!item.isImage || !props.previewFullImage) return;
	
	uni.previewImage({
		// 先filter找出为图片的item，再返回filter结果中的图片url
		urls: lists.value.filter(item => props.accept === 'image' || utils.test.image(item.url || item.thumb))
			.map(item => item.url || item.thumb),
		current: item.url || item.thumb,
		fail() {
			utils.toast('预览图片失败');
		}
	});
};

// 预览视频
const onPreviewVideo = (event) => {
	if (!props.previewFullImage) return;
	
	const { index } = event.currentTarget.dataset;
	
	// #ifdef MP-WEIXIN
	wx.previewMedia({
		sources: lists.value
			.filter(item => isVideoFile(item))
			.map(item => Object.assign(Object.assign({}, item), {
				type: 'video'
			})),
		current: index,
		fail() {
			utils.toast('预览视频失败');
		}
	});
	// #endif
	
	// #ifndef MP-WEIXIN
	// 其他平台可以用系统自带的视频播放器
	const videoItem = lists.value.filter(item => isVideoFile(item))[index];
	if (videoItem) {
		uni.navigateTo({
			url: `/pages/video/video?url=${encodeURIComponent(videoItem.url)}`
		});
	} else {
		utils.toast('视频文件不存在');
	}
	// #endif
};

// 点击预览
const onClickPreview = (event) => {
	const { index } = event.currentTarget.dataset;
	const item = lists.value[index];
	emit('clickPreview', Object.assign(Object.assign({}, item), getDetail(index)));
};

// 监听文件列表变化
watch(() => props.fileList, () => {
	formatFileList();
}, { immediate: true });

// 监听accept的变化，判断是否符合各平台要求
watch(() => props.accept, (val) => {
	// #ifndef MP-WEIXIN
	if (val === 'all' || val === 'media') {
		utils.toast('只有微信小程序才支持把accept配置为all、media之一');
	}
	// #endif
	
	// #ifndef H5 || MP-WEIXIN
	if (val === 'file') {
		utils.toast('只有微信小程序和H5(HX2.9.9)才支持把accept配置为file');
	}
	// #endif
}, { immediate: true });

// 向外部暴露方法
defineExpose({
	chooseFile,
	deleteItem,
	onPreviewImage,
	onPreviewVideo,
	lists
});
</script>

<style lang="scss" scoped>
// 定义缺少的颜色变量
$zx-tips-color: #909399 !default;
$zx-success: #00c777 !default;

// 添加flex相关mixin
@mixin flex($direction: row) {
	display: flex;
	flex-direction: $direction;
}

$zx-upload-preview-border-radius: 2px !default;
$zx-upload-preview-margin: 0 8px 8px 0 !default;
$zx-upload-image-width: 80px !default;
$zx-upload-image-height: $zx-upload-image-width;
$zx-upload-other-bgColor: rgb(242, 242, 242) !default;
$zx-upload-other-flex: 1 !default;
$zx-upload-text-font-size: 11px !default;
$zx-upload-text-color: $zx-tips-color !default;
$zx-upload-text-margin-top: 2px !default;
$zx-upload-deletable-right: 0 !default;
$zx-upload-deletable-top: 0 !default;
$zx-upload-deletable-bgColor: rgb(55, 55, 55) !default;
$zx-upload-deletable-height: 14px !default;
$zx-upload-deletable-width: $zx-upload-deletable-height;
$zx-upload-deletable-boder-bottom-left-radius: 100px !default;
$zx-upload-deletable-zIndex: 3 !default;
$zx-upload-success-bottom: 0 !default;
$zx-upload-success-right: 0 !default;
$zx-upload-success-border-style: solid !default;
$zx-upload-success-border-top-color: transparent !default;
$zx-upload-success-border-left-color: transparent !default;
$zx-upload-success-border-bottom-color: $zx-success !default;
$zx-upload-success-border-right-color: $zx-upload-success-border-bottom-color;
$zx-upload-success-border-width: 9px !default;
$zx-upload-icon-top: 0px !default;
$zx-upload-icon-right: 0px !default;
$zx-upload-icon-h5-top: 1px !default;
$zx-upload-icon-h5-right: 0 !default;
$zx-upload-icon-width: 16px !default;
$zx-upload-icon-height: $zx-upload-icon-width;
$zx-upload-success-icon-bottom: -10px !default;
$zx-upload-success-icon-right: -10px !default;
$zx-upload-status-right: 0 !default;
$zx-upload-status-left: 0 !default;
$zx-upload-status-bottom: 0 !default;
$zx-upload-status-top: 0 !default;
$zx-upload-status-bgColor: rgba(0, 0, 0, 0.5) !default;
$zx-upload-status-icon-Zindex: 1 !default;
$zx-upload-message-font-size: 12px !default;
$zx-upload-message-color: #ffffff !default;
$zx-upload-message-margin-top: 5px !default;
$zx-upload-button-width: 80px !default;
$zx-upload-button-height: $zx-upload-button-width;
$zx-upload-button-bgColor: rgb(244, 245, 247) !default;
$zx-upload-button-border-radius: 2px !default;
$zx-upload-botton-margin: 0 8px 8px 0 !default;
$zx-upload-text-font-size: 11px !default;
$zx-upload-text-color: $zx-tips-color !default;
$zx-upload-text-margin-top: 2px !default;
$zx-upload-hover-bgColor: rgb(230, 231, 233) !default;
$zx-upload-disabled-opacity: 0.5 !default;

.zx-upload {
	@include flex(column);
	flex: 1;

	&__wrap {
		@include flex;
		flex-wrap: wrap;
		flex: 1;

		&__preview {
			border-radius: $zx-upload-preview-border-radius;
			margin: $zx-upload-preview-margin;
			position: relative;
			overflow: hidden;
			@include flex;

			&__image {
				width: $zx-upload-image-width;
				height: $zx-upload-image-height;
			}

			&__other {
				width: $zx-upload-image-width;
				height: $zx-upload-image-height;
				background-color: $zx-upload-other-bgColor;
				flex: $zx-upload-other-flex;
				@include flex(column);
				justify-content: center;
				align-items: center;

				&__text {
					font-size: $zx-upload-text-font-size;
					color: $zx-upload-text-color;
					margin-top: $zx-upload-text-margin-top;
				}
			}
		}
	}

	&__deletable {
		position: absolute;
		top: $zx-upload-deletable-top;
		right: $zx-upload-deletable-right;
		background-color: $zx-upload-deletable-bgColor;
		height: $zx-upload-deletable-height;
		width: $zx-upload-deletable-width;
		@include flex;
		border-bottom-left-radius: $zx-upload-deletable-boder-bottom-left-radius;
		align-items: center;
		justify-content: center;
		z-index: $zx-upload-deletable-zIndex;

		&__icon {
			position: absolute;
			transform: scale(0.7);
			top: $zx-upload-icon-top;
			right: $zx-upload-icon-right;
			/* #ifdef H5 */
			top: $zx-upload-icon-h5-top;
			right: $zx-upload-icon-h5-right;
			/* #endif */
		}
	}

	&__success {
		position: absolute;
		bottom: $zx-upload-success-bottom;
		right: $zx-upload-success-right;
		@include flex;
		/* #ifndef APP-NVUE */
		border-style: $zx-upload-success-border-style;
		border-top-color: $zx-upload-success-border-top-color;
		border-left-color: $zx-upload-success-border-left-color;
		border-bottom-color: $zx-upload-success-border-bottom-color;
		border-right-color: $zx-upload-success-border-right-color;
		border-width: $zx-upload-success-border-width;
		align-items: center;
		justify-content: center;
		/* #endif */

		&__icon {
			/* #ifndef APP-NVUE */
			position: absolute;
			transform: scale(0.7);
			bottom: $zx-upload-success-icon-bottom;
			right: $zx-upload-success-icon-right;
			/* #endif */
			/* #ifdef APP-NVUE */
			width: $zx-upload-icon-width;
			height: $zx-upload-icon-height;
			/* #endif */
		}
	}

	&__status {
		position: absolute;
		top: $zx-upload-status-top;
		bottom: $zx-upload-status-bottom;
		left: $zx-upload-status-left;
		right: $zx-upload-status-right;
		background-color: $zx-upload-status-bgColor;
		@include flex(column);
		align-items: center;
		justify-content: center;

		&__icon {
			position: relative;
			z-index: $zx-upload-status-icon-Zindex;
		}

		&__message {
			font-size: $zx-upload-message-font-size;
			color: $zx-upload-message-color;
			margin-top: $zx-upload-message-margin-top;
		}
	}

	&__button {
		@include flex(column);
		align-items: center;
		justify-content: center;
		width: $zx-upload-button-width;
		height: $zx-upload-button-height;
		background-color: $zx-upload-button-bgColor;
		border-radius: $zx-upload-button-border-radius;
		margin: $zx-upload-botton-margin;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */

		&__text {
			font-size: $zx-upload-text-font-size;
			color: $zx-upload-text-color;
			margin-top: $zx-upload-text-margin-top;
		}

		&--hover {
			background-color: $zx-upload-hover-bgColor;
		}

		&--disabled {
			opacity: $zx-upload-disabled-opacity;
		}
	}
}
</style>
