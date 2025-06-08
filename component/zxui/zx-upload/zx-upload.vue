<template>
	<view class="zx-upload" :style="[addStyle(customStyle)]">
		<view class="zx-upload__wrap">
			<!-- 文件预览列表 -->
			<template v-if="previewImage">
				<view 
					class="zx-upload__item" 
					v-for="(item, index) in fileList" 
					:key="item.uid || index"
					:style="itemStyle"
				>
					<!-- 图片预览 -->
					<view v-if="isImageFile(item)" class="zx-upload__preview">
						<image
							:src="item.thumb || item.url"
							:mode="imageMode"
							class="zx-upload__image"
							@tap="onPreviewImage(index)"
							@error="onImageError(index)"
						/>
						<!-- 图片加载失败占位 -->
						<view v-if="item.loadError" class="zx-upload__error">
							<zx-icon name="image-off" size="20" color="#ccc"></zx-icon>
							<text class="zx-upload__error-text">加载失败</text>
						</view>
					</view>

					<!-- 视频预览 -->
					<view v-else-if="isVideoFile(item)" class="zx-upload__preview">
						<image
							v-if="item.thumb"
							:src="item.thumb"
							:mode="imageMode"
							class="zx-upload__image"
							@tap="onPreviewVideo(index)"
						/>
						<view v-else class="zx-upload__file-icon" @tap="onPreviewVideo(index)">
							<zx-icon name="movie" size="24" color="#409EFF"></zx-icon>
							<text class="zx-upload__file-name">视频</text>
						</view>
						<!-- 视频播放图标 -->
						<view class="zx-upload__play-icon">
							<zx-icon name="play-circle" size="16" color="rgba(255,255,255,0.8)"></zx-icon>
						</view>
					</view>

					<!-- 其他文件预览 -->
					<view v-else class="zx-upload__file-icon" @tap="onPreviewFile(index)">
						<zx-icon :name="getFileIcon(item)" size="24" color="#409EFF"></zx-icon>
						<text class="zx-upload__file-name">{{ getFileName(item) }}</text>
					</view>

					<!-- 上传状态覆盖层 -->
					<view 
						class="zx-upload__status" 
						v-if="item.status === 'uploading' || item.status === 'error'"
					>
						<view class="zx-upload__status-content">
							<zx-loading-icon 
								v-if="item.status === 'uploading'" 
								size="20" 
								mode="circle" 
								color="#ffffff" 
							/>
							<zx-icon 
								v-else 
								name="close-circle" 
								color="#ffffff" 
								size="20" 
							/>
							
							<!-- 上传进度 -->
							<view v-if="item.status === 'uploading' && showProgress" class="zx-upload__progress">
								<view class="zx-upload__progress-bar">
									<view 
										class="zx-upload__progress-fill" 
										:style="{ width: (item.progress || 0) + '%' }"
									></view>
								</view>
								<text class="zx-upload__progress-text">{{ item.progress || 0 }}%</text>
							</view>

							<!-- 错误信息 -->
							<text v-if="item.status === 'error'" class="zx-upload__error-message">
								{{ item.message || '上传失败' }}
							</text>
						</view>
					</view>

					<!-- 删除按钮 -->
					<view 
						v-if="deletable && item.status !== 'uploading'" 
						class="zx-upload__delete"
						@tap.stop="deleteFile(index)"
					>
						<zx-icon name="close" color="#ffffff" size="10"></zx-icon>
					</view>

					<!-- 成功状态图标 -->
					<view v-if="item.status === 'success'" class="zx-upload__success">
						<zx-icon name="checkmark" color="#ffffff" size="10"></zx-icon>
					</view>

					<!-- 重试按钮 -->
					<view 
						v-if="item.status === 'error' && showRetry" 
						class="zx-upload__retry"
						@tap.stop="retryUpload(index)"
					>
						<zx-icon name="refresh" color="#ffffff" size="14"></zx-icon>
					</view>
				</view>
			</template>

			<!-- 上传按钮 -->
			<view 
				v-if="showUploadButton"
				class="zx-upload__button"
				:class="{ 'zx-upload__button--disabled': disabled }"
				:style="itemStyle"
				@tap="chooseFile"
			>
				<slot>
					<view class="zx-upload__button-content">
						<zx-icon :name="uploadIcon" size="24" :color="uploadIconColor"></zx-icon>
						<text v-if="uploadText" class="zx-upload__button-text">{{ uploadText }}</text>
					</view>
				</slot>
			</view>
		</view>

		<!-- 文件列表模式 -->
		<view v-if="listType === 'text'" class="zx-upload__text-list">
			<view 
				v-for="(item, index) in fileList" 
				:key="item.uid || index" 
				class="zx-upload__text-item"
			>
				<zx-icon :name="getFileIcon(item)" size="16" :color="getStatusColor(item.status)"></zx-icon>
				<text class="zx-upload__text-name" @tap="onPreviewFile(index)">
					{{ item.name || '未知文件' }}
				</text>
				<view class="zx-upload__text-status">
					<zx-loading-icon v-if="item.status === 'uploading'" size="14" mode="circle"></zx-loading-icon>
					<zx-icon v-else-if="item.status === 'success'" name="checkmark-circle" size="14" color="#67C23A"></zx-icon>
					<zx-icon v-else-if="item.status === 'error'" name="close-circle" size="14" color="#F56C6C"></zx-icon>
				</view>
				<view 
					v-if="deletable" 
					class="zx-upload__text-delete" 
					@tap.stop="deleteFile(index)"
				>
					<zx-icon name="trash" size="12" color="#909399"></zx-icon>
				</view>
			</view>
		</view>

		<!-- 提示信息 -->
		<view v-if="tips" class="zx-upload__tips">
			<text class="zx-upload__tips-text">{{ tips }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

// 定义 emits
const emit = defineEmits([
	'update:fileList',
	'change',
	'progress',
	'success',
	'error',
	'remove',
	'preview',
	'exceed'
])

// 定义 props
const props = defineProps({
	// 文件列表
	fileList: {
		type: Array,
		default: () => []
	},
	// 接受的文件类型：image/video/file/media
	accept: {
		type: String,
		default: 'image'
	},
	// 允许的文件扩展名
	extensions: {
		type: Array,
		default: () => []
	},
	// 最大上传数量
	maxCount: {
		type: Number,
		default: 9
	},
	// 文件大小限制（字节）
	maxSize: {
		type: Number,
		default: 10 * 1024 * 1024 // 10MB
	},
	// 是否多选
	multiple: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否可删除
	deletable: {
		type: Boolean,
		default: true
	},
	// 是否预览
	previewImage: {
		type: Boolean,
		default: true
	},
	// 图片裁剪模式
	imageMode: {
		type: String,
		default: 'aspectFill'
	},
	// 上传图标
	uploadIcon: {
		type: String,
		default: 'plus'
	},
	// 上传图标颜色
	uploadIconColor: {
		type: String,
		default: '#C0C4CC'
	},
	// 上传按钮文字
	uploadText: {
		type: String,
		default: ''
	},
	// 组件尺寸
	size: {
		type: [String, Number],
		default: 80
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 列表类型：picture/text
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
	// 上传表单数据
	data: {
		type: Object,
		default: () => ({})
	},
	// 上传文件字段名
	name: {
		type: String,
		default: 'file'
	},
	// 提示信息
	tips: {
		type: String,
		default: ''
	},
	// 图片质量
	sizeType: {
		type: Array,
		default: () => ['original', 'compressed']
	},
	// 图片来源
	sourceType: {
		type: Array,
		default: () => ['album', 'camera']
	}
})

// 响应式数据
const uploadTasks = ref(new Map()) // 存储上传任务

// 计算属性
const showUploadButton = computed(() => {
	return !props.disabled && props.fileList.length < props.maxCount
})

const itemStyle = computed(() => {
	const size = addUnit(props.size)
	return {
		width: size,
		height: size
	}
})

// 工具函数
const addUnit = (value, unit = 'rpx') => {
	if (value == null) return ''
	return !isNaN(Number(value)) ? `${value}${unit}` : value
}

const addStyle = (customStyle) => {
	if (!customStyle || typeof customStyle !== 'object') return ''
	return Object.keys(customStyle).map(key => `${key}:${customStyle[key]}`).join(';')
}

const generateUID = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 文件类型判断
const isImageFile = (file) => {
	return file.type === 'image' || /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file.url || file.name || '')
}

const isVideoFile = (file) => {
	return file.type === 'video' || /\.(mp4|avi|mov|wmv|flv|mkv)$/i.test(file.url || file.name || '')
}

const getFileIcon = (file) => {
	if (isImageFile(file)) return 'image'
	if (isVideoFile(file)) return 'movie'
	
	const extension = getFileExtension(file.name || '')
	const iconMap = {
		pdf: 'document-text',
		doc: 'document-text',
		docx: 'document-text',
		xls: 'table',
		xlsx: 'table',
		ppt: 'presentation',
		pptx: 'presentation',
		txt: 'document-text',
		zip: 'archive',
		rar: 'archive'
	}
	
	return iconMap[extension] || 'folder'
}

const getFileName = (file) => {
	if (isImageFile(file)) return '图片'
	if (isVideoFile(file)) return '视频'
	return file.name || '文件'
}

const getFileExtension = (filename) => {
	return filename.split('.').pop()?.toLowerCase() || ''
}

const getStatusColor = (status) => {
	const colorMap = {
		uploading: '#409EFF',
		success: '#67C23A',
		error: '#F56C6C'
	}
	return colorMap[status] || '#909399'
}

// 选择文件
const chooseFile = async () => {
	if (props.disabled) return
	
	try {
		let result
		const maxCount = Math.min(props.maxCount - props.fileList.length, props.multiple ? 9 : 1)
		
		switch (props.accept) {
			case 'image':
				result = await chooseImage(maxCount)
				break
			case 'video':
				result = await chooseVideo()
				break
			case 'file':
				result = await chooseMessageFile(maxCount)
				break
			case 'media':
				// #ifdef MP-WEIXIN
				result = await chooseMedia(maxCount)
				// #endif
				// #ifndef MP-WEIXIN
				result = await chooseImage(maxCount)
				// #endif
				break
			default:
				result = await chooseImage(maxCount)
		}
		
		if (result && result.length > 0) {
			handleFiles(result)
		}
	} catch (error) {
		console.error('选择文件失败:', error)
		emit('error', { error, type: 'choose' })
		uni.showToast({
			title: '选择文件失败',
			icon: 'none'
		})
	}
}

// 选择图片
const chooseImage = (count) => {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count,
			sizeType: props.sizeType,
			sourceType: props.sourceType,
			success: (res) => {
				const files = res.tempFiles.map(file => ({
					uid: generateUID(),
					url: file.path,
					name: `image_${Date.now()}.jpg`,
					size: file.size,
					type: 'image',
					status: 'ready'
				}))
				resolve(files)
			},
			fail: reject
		})
	})
}

// 选择视频
const chooseVideo = () => {
	return new Promise((resolve, reject) => {
		uni.chooseVideo({
			sourceType: props.sourceType,
			maxDuration: 60,
			camera: 'back',
			success: (res) => {
				const file = {
					uid: generateUID(),
					url: res.tempFilePath,
					thumb: res.thumbTempFilePath,
					name: `video_${Date.now()}.mp4`,
					size: res.size,
					duration: res.duration,
					type: 'video',
					status: 'ready'
				}
				resolve([file])
			},
			fail: reject
		})
	})
}

// 选择文件（微信小程序）
const chooseMessageFile = (count) => {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		wx.chooseMessageFile({
			count,
			type: 'file',
			success: (res) => {
				const files = res.tempFiles.map(file => ({
					uid: generateUID(),
					url: file.path,
					name: file.name,
					size: file.size,
					type: 'file',
					status: 'ready'
				}))
				resolve(files)
			},
			fail: reject
		})
		// #endif
		// #ifndef MP-WEIXIN
		reject(new Error('当前平台不支持选择文件'))
		// #endif
	})
}

// 选择媒体文件（微信小程序）
const chooseMedia = (count) => {
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		wx.chooseMedia({
			count,
			mediaType: ['image', 'video'],
			sourceType: props.sourceType,
			sizeType: props.sizeType,
			success: (res) => {
				const files = res.tempFiles.map(file => ({
					uid: generateUID(),
					url: file.tempFilePath,
					thumb: file.thumbTempFilePath || file.tempFilePath,
					name: `${file.fileType}_${Date.now()}.${file.fileType === 'video' ? 'mp4' : 'jpg'}`,
					size: file.size,
					type: file.fileType,
					status: 'ready'
				}))
				resolve(files)
			},
			fail: reject
		})
		// #endif
		// #ifndef MP-WEIXIN
		reject(new Error('当前平台不支持选择媒体文件'))
		// #endif
	})
}

// 处理选择的文件
const handleFiles = (files) => {
	// 检查数量限制
	if (props.fileList.length + files.length > props.maxCount) {
		emit('exceed', { files, limit: props.maxCount })
		uni.showToast({
			title: `最多只能选择${props.maxCount}个文件`,
			icon: 'none'
		})
		return
	}
	
	// 检查文件大小
	const oversizeFiles = files.filter(file => file.size > props.maxSize)
	if (oversizeFiles.length > 0) {
		uni.showToast({
			title: `文件大小不能超过${formatFileSize(props.maxSize)}`,
			icon: 'none'
		})
		return
	}
	
	// 检查文件扩展名
	if (props.extensions.length > 0) {
		const invalidFiles = files.filter(file => {
			const extension = getFileExtension(file.name)
			return !props.extensions.includes(extension)
		})
		
		if (invalidFiles.length > 0) {
			uni.showToast({
				title: `只支持${props.extensions.join(', ')}格式`,
				icon: 'none'
			})
			return
		}
	}
	
	// 添加到文件列表
	const newFileList = [...props.fileList, ...files]
	emit('update:fileList', newFileList)
	emit('change', { fileList: newFileList, file: files })
	
	// 自动上传
	if (props.autoUpload && props.action) {
		files.forEach(file => {
			uploadFile(file)
		})
	}
}

// 上传文件
const uploadFile = (file) => {
	if (!props.action) return
	
	// 更新文件状态为上传中
	updateFileStatus(file.uid, 'uploading', { progress: 0 })
	
	const uploadTask = uni.uploadFile({
		url: props.action,
		filePath: file.url,
		name: props.name,
		header: props.headers,
		formData: props.data,
		success: (res) => {
			try {
				// 尝试解析返回数据
				let responseData = res.data
				if (typeof responseData === 'string') {
					responseData = JSON.parse(responseData)
				}
				
				// 更新文件状态为成功
				updateFileStatus(file.uid, 'success', {
					response: responseData,
					url: responseData.url || file.url
				})
				
				emit('success', { file, response: responseData })
			} catch (error) {
				updateFileStatus(file.uid, 'error', { message: '响应数据解析失败' })
				emit('error', { file, error })
			}
		},
		fail: (error) => {
			updateFileStatus(file.uid, 'error', { message: error.errMsg || '上传失败' })
			emit('error', { file, error })
		}
	})
	
	// 监听上传进度
	if (uploadTask && uploadTask.onProgressUpdate) {
		uploadTask.onProgressUpdate((progressEvent) => {
			updateFileStatus(file.uid, 'uploading', { progress: progressEvent.progress })
			emit('progress', { file, progressEvent })
		})
	}
	
	// 保存上传任务
	uploadTasks.value.set(file.uid, uploadTask)
}

// 更新文件状态
const updateFileStatus = (uid, status, updates = {}) => {
	const fileList = [...props.fileList]
	const index = fileList.findIndex(file => file.uid === uid)
	
	if (index !== -1) {
		fileList[index] = {
			...fileList[index],
			status,
			...updates
		}
		emit('update:fileList', fileList)
	}
}

// 删除文件
const deleteFile = (index) => {
	const file = props.fileList[index]
	if (!file) return
	
	// 取消上传任务
	const task = uploadTasks.value.get(file.uid)
	if (task && task.abort) {
		task.abort()
		uploadTasks.value.delete(file.uid)
	}
	
	// 从列表中移除
	const newFileList = props.fileList.filter((_, i) => i !== index)
	emit('update:fileList', newFileList)
	emit('remove', { file, fileList: newFileList })
}

// 重试上传
const retryUpload = (index) => {
	const file = props.fileList[index]
	if (file && file.status === 'error') {
		uploadFile(file)
	}
}

// 预览图片
const onPreviewImage = (index) => {
	const file = props.fileList[index]
	emit('preview', { file, index })
	
	if (!isImageFile(file)) return
	
	const urls = props.fileList
		.filter(item => isImageFile(item))
		.map(item => item.url)
	
	uni.previewImage({
		urls,
		current: file.url,
		fail: () => {
			uni.showToast({
				title: '预览失败',
				icon: 'none'
			})
		}
	})
}

// 预览视频
const onPreviewVideo = (index) => {
	const file = props.fileList[index]
	emit('preview', { file, index })
	
	// #ifdef MP-WEIXIN
	if (file.url) {
		wx.previewMedia({
			sources: [{
				url: file.url,
				type: 'video'
			}],
			fail: () => {
				uni.showToast({
					title: '预览失败',
					icon: 'none'
				})
			}
		})
	}
	// #endif
	
	// #ifndef MP-WEIXIN
	uni.showToast({
		title: '当前平台不支持视频预览',
		icon: 'none'
	})
	// #endif
}

// 预览文件
const onPreviewFile = (index) => {
	const file = props.fileList[index]
	emit('preview', { file, index })
	
	// 可以在这里添加文件预览逻辑
	uni.showToast({
		title: '文件预览功能待实现',
		icon: 'none'
	})
}

// 图片加载错误
const onImageError = (index) => {
	updateFileStatus(props.fileList[index].uid, props.fileList[index].status, { loadError: true })
}

// 格式化文件大小
const formatFileSize = (size) => {
	const units = ['B', 'KB', 'MB', 'GB']
	let index = 0
	while (size >= 1024 && index < units.length - 1) {
		size /= 1024
		index++
	}
	return `${size.toFixed(1)}${units[index]}`
}

// 暴露方法给父组件
defineExpose({
	chooseFile,
	uploadFile,
	deleteFile,
	retryUpload
})
</script>

<style lang="scss" scoped>
.zx-upload {
	width: 100%;

	&__wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 8rpx;
	}

	&__item {
		position: relative;
		border-radius: 8rpx;
		overflow: hidden;
		background-color: #f8f9fa;
	}

	&__preview {
		width: 100%;
		height: 100%;
		position: relative;
	}

	&__image {
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
	}

	&__file-icon {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f9fa;
	}

	&__file-name {
		font-size: 20rpx;
		color: #666;
		margin-top: 8rpx;
		text-align: center;
	}

	&__error {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f5f5f5;

		&-text {
			font-size: 20rpx;
			color: #999;
			margin-top: 8rpx;
		}
	}

	&__play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	&__status {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 8rpx;

		&-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8rpx;
		}
	}

	&__progress {
		width: 80%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;

		&-bar {
			width: 100%;
			height: 6rpx;
			background-color: rgba(255, 255, 255, 0.3);
			border-radius: 3rpx;
			overflow: hidden;
		}

		&-fill {
			height: 100%;
			background-color: #ffffff;
			transition: width 0.3s ease;
		}

		&-text {
			font-size: 20rpx;
			color: #ffffff;
		}
	}

	&__error-message {
		font-size: 20rpx;
		color: #ffffff;
		text-align: center;
	}

	&__delete {
		position: absolute;
		top: -6rpx;
		right: -6rpx;
		width: 32rpx;
		height: 32rpx;
		background-color: #ff4757;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	&__success {
		position: absolute;
		bottom: -6rpx;
		right: -6rpx;
		width: 32rpx;
		height: 32rpx;
		background-color: #67C23A;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	&__retry {
		position: absolute;
		bottom: 8rpx;
		right: 8rpx;
		width: 48rpx;
		height: 48rpx;
		background-color: rgba(0, 0, 0, 0.6);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}

	&__button {
		border: 2rpx dashed #d9d9d9;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fafafa;
		transition: all 0.3s ease;

		&:active {
			background-color: #f0f0f0;
		}

		&--disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&-content {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8rpx;
		}

		&-text {
			font-size: 24rpx;
			color: #666;
		}
	}

	&__text-list {
		margin-top: 16rpx;
	}

	&__text-item {
		display: flex;
		align-items: center;
		padding: 16rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
		gap: 16rpx;

		&:last-child {
			border-bottom: none;
		}
	}

	&__text-name {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}

	&__text-status {
		margin-right: 16rpx;
	}

	&__text-delete {
		padding: 8rpx;
	}

	&__tips {
		margin-top: 16rpx;

		&-text {
			font-size: 24rpx;
			color: #999;
			line-height: 1.5;
		}
	}
}
</style> 