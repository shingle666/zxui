<template>
	<view class="zx-upload" :style="[utils.addStyle(customStyle)]">
		<view class="zx-upload__wrap">
			<template v-if="previewImage">
				<view class="zx-upload__wrap__preview" v-for="(item, index) in lists" :key="index">
					<!-- 图片预览 -->
					<view v-if="item.isImage || (item.type && item.type === 'image')" class="zx-upload__preview-container">
						<image
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
						<!-- 图片加载失败占位 -->
						<view v-if="item.loadError" class="zx-upload__error-placeholder">
							<zx-icon name="image-off" size="24" color="#ccc"></zx-icon>
							<text class="zx-upload__error-text">加载失败</text>
						</view>
					</view>

					<!-- 视频预览 -->
					<view v-else-if="item.isVideo || (item.type && item.type === 'video')" class="zx-upload__preview-container">
						<image
							v-if="item.thumb"
							:src="item.thumb"
							:mode="imageMode"
							class="zx-upload__wrap__preview__image"
							@tap="onPreviewVideo(item)"
							:style="[
								{
									width: utils.addUnit(width),
									height: utils.addUnit(height)
								}
							]"
						/>
						<view v-else class="zx-upload__wrap__preview__other" @tap="onPreviewVideo(item)">
							<zx-icon color="#80CBF9" size="26" name="movie"></zx-icon>
							<text class="zx-upload__wrap__preview__other__text">视频</text>
						</view>
						<!-- 视频播放图标 -->
						<view class="zx-upload__video-play">
							<zx-icon name="play-circle" size="20" color="rgba(255,255,255,0.8)"></zx-icon>
						</view>
					</view>

					<!-- 其他文件预览 -->
					<view v-else class="zx-upload__wrap__preview__other" @tap="onPreviewFile(item)">
						<zx-icon color="#80CBF9" size="26" :name="getFileIcon(item)"></zx-icon>
						<text class="zx-upload__wrap__preview__other__text">{{ getFileTypeName(item) }}</text>
					</view>

					<!-- 上传状态覆盖层 -->
					<view class="zx-upload__status" v-if="item.status === 'uploading' || item.status === 'failed'">
						<view class="zx-upload__status__icon">
							<zx-icon v-if="item.status === 'failed'" name="close-circle" color="#ffffff" size="25" />
							<zx-loading-icon size="22" mode="circle" color="#ffffff" v-else />
						</view>
						<!-- 进度条 -->
						<view v-if="item.status === 'uploading' && showProgress && item.progress != null" class="zx-upload__progress">
							<view class="zx-upload__progress__bar">
								<view 
									class="zx-upload__progress__fill" 
									:style="{ width: getProgressWidth(item.progress) }"
								></view>
							</view>
							<text class="zx-upload__progress__text">{{ item.progress }}%</text>
						</view>
						<text v-else-if="item.message" class="zx-upload__status__message">{{ item.message }}</text>
					</view>

					<!-- 删除按钮 -->
					<view class="zx-upload__deletable" v-if="item.status !== 'uploading' && (deletable || item.deletable)" @tap="handleDeleteItem" :data-index="index">
						<view class="zx-upload__deletable__icon">
							<zx-icon name="close" color="#ffffff" size="10"></zx-icon>
						</view>
					</view>

					<!-- 成功状态图标 -->
					<view class="zx-upload__success" v-if="item.status === 'success'">
						<!-- #ifdef APP-NVUE -->
						<image :src="successIcon" class="zx-upload__success__icon"></image>
						<!-- #endif -->
						<!-- #ifndef APP-NVUE -->
						<view class="zx-upload__success__icon">
							<zx-icon name="checkmark" color="#ffffff" size="12"></zx-icon>
						</view>
						<!-- #endif -->
					</view>

					<!-- 重试按钮 -->
					<view v-if="item.status === 'failed' && showRetry" class="zx-upload__retry" @tap="handleRetryUpload" :data-index="index">
						<zx-icon name="refresh" color="#ffffff" size="16"></zx-icon>
					</view>
				</view>
			</template>

			<!-- 上传按钮 -->
			<template v-if="isInCount">
				<view @tap="chooseFile"><slot /></view>
				<view
					v-if="!hasSlot"
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

		<!-- 文件列表模式 -->
		<view v-if="listType === 'text'" class="zx-upload__list">
			<view v-for="(item, index) in lists" :key="index" class="zx-upload__list__item">
				<zx-icon :name="getFileIcon(item)" size="16" :color="getFileIconColor(item)"></zx-icon>
				<text class="zx-upload__list__name" @tap="onPreviewFile(item)">{{ item.name }}</text>
				<view class="zx-upload__list__status">
					<zx-loading-icon v-if="item.status === 'uploading'" size="16" mode="circle"></zx-loading-icon>
					<zx-icon v-else-if="item.status === 'success'" name="checkmark-circle" size="16" color="#00c777"></zx-icon>
					<zx-icon v-else-if="item.status === 'failed'" name="close-circle" size="16" color="#ff6b6b"></zx-icon>
				</view>
				<view v-if="deletable || item.deletable" class="zx-upload__list__delete" @tap="handleDeleteItem" :data-index="index">
					<zx-icon name="trash" size="14" color="#666"></zx-icon>
				</view>
			</view>
		</view>

		<!-- 上传提示信息 -->
		<view v-if="tips" class="zx-upload__tips">
			<text class="zx-upload__tips__text">{{ tips }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, computed, nextTick } from 'vue';

// 定义emits
const emit = defineEmits([
	'afterRead', 
	'beforeRead', 
	'oversize', 
	'clickPreview', 
	'delete', 
	'error',
	'progress',
	'retry'
]);

// 定义props
const props = defineProps({
	// 接受的文件类型
	accept: {
		type: String,
		default: 'image'
	},
	// 允许上传的文件扩展名
	extensions: {
		type: Array,
		default: () => []
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
	},
	// 文件列表展示类型 picture/text
	listType: {
		type: String,
		default: 'picture'
	},
	// 是否显示上传进度
	showProgress: {
		type: Boolean,
		default: true
	},
	// 是否显示重试按钮
	showRetry: {
		type: Boolean,
		default: true
	},
	// 自动上传
	autoUpload: {
		type: Boolean,
		default: true
	},
	// 上传地址
	action: {
		type: String,
		default: ''
	},
	// 上传请求头
	headers: {
		type: Object,
		default: () => ({})
	},
	// 上传参数
	data: {
		type: Object,
		default: () => ({})
	},
	// 上传文件字段名
	filename: {
		type: String,
		default: 'file'
	},
	// 提示信息
	tips: {
		type: String,
		default: ''
	},
	// 严格文件类型检查
	strict: {
		type: Boolean,
		default: false
	}
});

// 数据部分
const lists = ref([]);
const isInCount = ref(true);
// #ifdef APP-NVUE
const successIcon = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAACP0lEQVRYCc3YXygsURwH8K/dpcWyG3LF5u/6/+dKVylSypuUl6uUPMifKMWL8oKEB1EUT1KeUPdR3uTNUsSLxb2udG/cbvInNuvf2rVnazZ/ZndmZ87snjM1Z3zpzfp9+Z5mEAhlvjRtZgCKs+gnPAOcAkkMOR4jEHfItjDvgRxxSQD8cM0BuOCaAvXDBQ0oFRc0oFhcQIH+4gIKlIILGFAqLiBAOTjFgXJxigJp4BQD0sIpAqSJow6kjSNAFTnRaHJwLenD6Mud52VQAcrBfTd2oyq+HtGaGGWAcnAVcXWoM3bCZrdi+ncPfaAcXE5UKVpdW/vitGPqqAtn98d0gXJwX7Qp6MmegUYVhvmTIezdmHlxJCjpHRTCFerLkRRu4k0aqdajN3sWOo0BK//msHa+xDuPC/oNFMKRhTtM4xjIX0SCNpXL4+7VIaHuyiWEp2L7ahWLf8fejfPdqPmC3mJicORZUp1CQzm+GiphvljGk+PBvWRbxii+xVTj5M6CiZ/tsDufvaXyxEUDxeLIyvu3m0iOyEFWVAkydcVYdyFrE9tQk9iMq6f/GNlvwt3LjQfh60LUrw9/cFyyMJUW/XkLSNMV4Mi6C5ML+ui4x5ClAX9sB9w0wV6wglJwJCv5fOxcr6EstgbGiEw4XcfUry4cWrcEUW8n+ARKxXEJHhw2WG43UKSvwI/TSZgvl7kh0b3XLZaLEy0QmMgLZAVH7J+ALOE+AVnDvQOyiPMAWcW5gSzjCPAV+78S5WE0GrQAAAAASUVORK5CYII=');
// #endif

// 计算属性 - 检测是否有插槽内容
const hasSlot = computed(() => {
	// 在微信小程序中，我们默认显示上传按钮
	// 如果需要自定义内容，可以通过 props 控制
	return false;
});

// 工具函数 - 内联实现，避免依赖注入
const utils = {
	addUnit: (value, unit = 'rpx') => {
		if (value == null) return '';
		return !isNaN(Number(value)) ? `${value}${unit}` : value;
	},
	addStyle: (customStyle) => {
		if (!customStyle || typeof customStyle !== 'object') return '';
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
};

// 添加工具函数
const addUnit = (value, unit = 'rpx') => {
	if (value == null) return '';
	return !isNaN(Number(value)) ? `${value}${unit}` : value;
};

// 检查文件是否为视频
const isVideoFile = (item) => {
	return item.isVideo || (item.type && item.type === 'video');
};

// 获取文件图标
const getFileIcon = (item) => {
	if (item.isImage || (item.type && item.type === 'image')) {
		return 'image';
	}
	if (item.isVideo || (item.type && item.type === 'video')) {
		return 'movie';
	}
	
	// 根据文件扩展名或类型返回对应图标
	const extension = item.name ? item.name.split('.').pop().toLowerCase() : '';
	const iconMap = {
		'pdf': 'document-text',
		'doc': 'document-text',
		'docx': 'document-text',
		'xls': 'table',
		'xlsx': 'table',
		'ppt': 'presentation',
		'pptx': 'presentation',
		'txt': 'document-text',
		'zip': 'archive',
		'rar': 'archive',
		'7z': 'archive'
	};
	
	return iconMap[extension] || 'folder';
};

// 获取文件图标颜色
const getFileIconColor = (item) => {
	if (item.status === 'failed') return '#ff6b6b';
	if (item.status === 'success') return '#00c777';
	if (item.status === 'uploading') return '#80CBF9';
	return '#666';
};

// 获取文件类型名称
const getFileTypeName = (item) => {
	if (item.isImage || (item.type && item.type === 'image')) {
		return '图片';
	}
	if (item.isVideo || (item.type && item.type === 'video')) {
		return '视频';
	}
	
	const extension = item.name ? item.name.split('.').pop().toLowerCase() : '';
	const typeMap = {
		'pdf': 'PDF',
		'doc': 'Word',
		'docx': 'Word',
		'xls': 'Excel',
		'xlsx': 'Excel',
		'ppt': 'PPT',
		'pptx': 'PPT',
		'txt': '文本'
	};
	
	return typeMap[extension] || '文件';
};

// 获取进度条宽度
const getProgressWidth = (progress) => {
	return (progress || 0) + '%';
};

// 验证文件类型
const validateFileType = (file) => {
	if (!props.strict && !props.extensions.length) return true;
	
	// 如果设置了扩展名限制
	if (props.extensions.length) {
		const fileName = file.name || file.path || '';
		const extension = fileName.split('.').pop().toLowerCase();
		return props.extensions.includes(extension);
	}
	
	// 严格模式下检查 MIME 类型
	if (props.strict) {
		const acceptTypes = {
			'image': ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
			'video': ['video/mp4', 'video/avi', 'video/mov', 'video/rmvb', 'video/rm', 'video/flv', 'video/mkv', 'video/wmv'],
			'file': [] // 文件类型不限制
		};
		
		if (acceptTypes[props.accept]) {
			return acceptTypes[props.accept].length === 0 || acceptTypes[props.accept].includes(file.type);
		}
	}
	
	return true;
};

// 内联utils.js的辅助函数
const pickExclude = (obj, keys) => {
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
		status: 'ready',
		// #ifdef H5
		name: item.name || `image_${Date.now()}.jpg`
		// #endif
		// #ifndef H5
		name: `image_${Date.now()}.jpg`
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
			status: 'ready',
			// #ifdef H5
			name: res.name || `video_${Date.now()}.mp4`
			// #endif
			// #ifndef H5
			name: `video_${Date.now()}.mp4`
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
		size: item.size,
		status: 'ready',
		name: item.name || `${res.type}_${Date.now()}.${res.type === 'video' ? 'mp4' : 'jpg'}`
	}))
}

const formatFile = (res) => {
	return res.tempFiles.map((item) => ({ 
		...pickExclude(item, ['path']), 
		url: item.path, 
		size: item.size,
		status: 'ready',
		// #ifdef H5
		name: item.name,
		type: item.type
		// #endif 
		// #ifndef H5
		name: item.name || `file_${Date.now()}`,
		type: 'file'
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
			deletable: typeof item.deletable === 'boolean' ? item.deletable : deletable,
			status: item.status || 'success'
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
		// 文件类型验证
		const validFiles = res.filter(file => {
			if (!validateFileType(file)) {
				utils.toast(`不支持的文件类型: ${file.name}`);
				return false;
			}
			return true;
		});
		
		if (validFiles.length > 0) {
			onBeforeRead(multiple ? validFiles : validFiles[0]);
		}
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
	
	// 如果启用自动上传
	if (props.autoUpload && props.action) {
		if (Array.isArray(file)) {
			file.forEach(item => uploadFile(item));
		} else {
			uploadFile(file);
		}
	}
	
	if (typeof afterRead === 'function') {
		afterRead(file, getDetail());
	}
	
	emit('afterRead', Object.assign({
		file
	}, getDetail()));
};

// 上传文件
const uploadFile = (file) => {
	if (!props.action) return;
	
	// 添加到列表并设置状态
	const fileItem = {
		...file,
		status: 'uploading',
		progress: 0,
		message: '上传中'
	};
	
	lists.value.push(fileItem);
	const index = lists.value.length - 1;
	
	// 使用 uni.uploadFile 上传
	const uploadTask = uni.uploadFile({
		url: props.action,
		filePath: file.url,
		name: props.filename,
		header: props.headers,
		formData: props.data,
		success: (res) => {
			lists.value[index].status = 'success';
			lists.value[index].progress = 100;
			delete lists.value[index].message;
			
			// 尝试解析服务器返回的数据
			try {
				const responseData = JSON.parse(res.data);
				if (responseData.url) {
					lists.value[index].url = responseData.url;
				}
			} catch (e) {
				console.warn('无法解析服务器返回数据:', res.data);
			}
		},
		fail: (error) => {
			lists.value[index].status = 'failed';
			lists.value[index].message = '上传失败';
			emit('error', error);
		}
	});
	
	// 监听上传进度
	if (uploadTask && uploadTask.onProgressUpdate) {
		uploadTask.onProgressUpdate((res) => {
			lists.value[index].progress = res.progress;
			emit('progress', {
				...res,
				file: lists.value[index],
				index
			});
		});
	}
};

// 重试上传
const retryUpload = (index) => {
	const file = lists.value[index];
	if (file && file.status === 'failed') {
		uploadFile(file);
		emit('retry', { file, index });
	}
};

// 删除文件
const deleteItem = (index) => {
	emit('delete', Object.assign(
		Object.assign({}, getDetail(index)), {
			file: props.fileList[index]
		}
	));
};

// 处理删除按钮点击事件（兼容微信小程序）
const handleDeleteItem = (e) => {
	// 阻止事件冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	
	// 获取索引
	const index = e.currentTarget.dataset.index;
	if (index !== undefined) {
		deleteItem(parseInt(index));
	}
};

// 处理重试按钮点击事件（兼容微信小程序）
const handleRetryUpload = (e) => {
	// 阻止事件冒泡
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	
	// 获取索引
	const index = e.currentTarget.dataset.index;
	if (index !== undefined) {
		retryUpload(parseInt(index));
	}
};

// 预览图片
const onPreviewImage = (item) => {
	if (!item.isImage || !props.previewFullImage) return;
	
	emit('clickPreview', item);
	
	uni.previewImage({
		urls: lists.value.filter(item => props.accept === 'image' || utils.test.image(item.url || item.thumb))
			.map(item => item.url || item.thumb),
		current: item.url || item.thumb,
		fail() {
			utils.toast('预览图片失败');
		}
	});
};

// 预览视频
const onPreviewVideo = (item) => {
	if (!props.previewFullImage) return;
	
	emit('clickPreview', item);
	
	// #ifdef MP-WEIXIN
	wx.previewMedia({
		sources: [{
			url: item.url,
			type: 'video'
		}],
		current: 0,
		fail() {
			utils.toast('预览视频失败');
		}
	});
	// #endif
	
	// #ifndef MP-WEIXIN
	// 其他平台可以尝试打开视频
	if (item.url) {
		// 可以在这里添加自定义的视频预览逻辑
		utils.toast('点击播放视频');
	} else {
		utils.toast('视频文件不存在');
	}
	// #endif
};

// 预览文件
const onPreviewFile = (item) => {
	emit('clickPreview', item);
	
	// 可以在这里添加文件预览逻辑
	if (item.url) {
		// #ifdef H5
		window.open(item.url, '_blank');
		// #endif
		// #ifndef H5
		utils.toast('点击查看文件');
		// #endif
	}
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
		utils.toast('只有微信小程序和H5才支持把accept配置为file');
	}
	// #endif
}, { immediate: true });

// 向外部暴露方法
defineExpose({
	chooseFile,
	deleteItem,
	onPreviewImage,
	onPreviewVideo,
	onPreviewFile,
	uploadFile,
	retryUpload,
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
				cursor: pointer;

				&__text {
					font-size: $zx-upload-text-font-size;
					color: $zx-upload-text-color;
					margin-top: $zx-upload-text-margin-top;
				}
			}
		}
	}

	&__preview-container {
		position: relative;
	}

	&__error-placeholder {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		@include flex(column);
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;
	}

	&__error-text {
		font-size: 12px;
		color: #999;
		margin-top: 4px;
	}

	&__video-play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	&__progress {
		width: 100%;
		@include flex(column);
		align-items: center;
		gap: 4px;

		&__bar {
			width: 80%;
			height: 4px;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 2px;
			overflow: hidden;
		}

		&__fill {
			height: 100%;
			background-color: #ffffff;
			transition: width 0.3s ease;
		}

		&__text {
			font-size: 10px;
			color: #ffffff;
		}
	}

	&__retry {
		position: absolute;
		bottom: 4px;
		right: 4px;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		width: 24px;
		height: 24px;
		@include flex;
		align-items: center;
		justify-content: center;
		z-index: 4;
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

	&__list {
		width: 100%;

		&__item {
			@include flex;
			align-items: center;
			padding: 8px 0;
			border-bottom: 1px solid #f0f0f0;
			gap: 8px;

			&:last-child {
				border-bottom: none;
			}
		}

		&__name {
			flex: 1;
			font-size: 14px;
			color: #333;
			cursor: pointer;
			text-decoration: none;

			&:hover {
				color: #409eff;
			}
		}

		&__status {
			margin-right: 8px;
		}

		&__delete {
			cursor: pointer;
			padding: 4px;
			border-radius: 4px;

			&:hover {
				background-color: #f5f5f5;
			}
		}
	}

	&__tips {
		margin-top: 8px;

		&__text {
			font-size: 12px;
			color: #999;
			line-height: 1.5;
		}
	}
}
</style>
