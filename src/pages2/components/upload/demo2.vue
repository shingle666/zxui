<template>
	<view class="upload-demo">
		<zx-nav-bar title="上传组件演示" :border="false" bg-color="#f8f9fa"></zx-nav-bar>
		
		<scroll-view scroll-y class="scroll-content">
			<!-- 基础图片上传 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">基础图片上传</text>
					<text class="subtitle-text">支持多选、预览、删除</text>
				</view>
				<zx-upload 
					:file-list="imageList"
					accept="image"
					:max-count="9"
					:max-size="5 * 1024 * 1024"
					:multiple="true"
					upload-text="选择图片"
					@afterRead="handleImageRead"
					@oversize="handleOversize"
					@delete="handleImageDelete"
					@clickPreview="handlePreview"
				/>
			</view>

			<!-- 文件列表模式 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">文件列表模式</text>
					<text class="subtitle-text">以列表形式展示文件</text>
				</view>
				<zx-upload 
					:file-list="fileList"
					list-type="text"
					accept="file"
					:extensions="['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt']"
					tips="支持 PDF、Word、Excel、文本文件，单个文件不超过 5MB"
					:max-size="5 * 1024 * 1024"
					@afterRead="handleFileRead"
					@clickPreview="handleFilePreview"
					@delete="handleFileDelete"
				/>
			</view>

			<!-- 视频上传 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">视频上传</text>
					<text class="subtitle-text">支持视频选择和预览</text>
				</view>
				<zx-upload 
					:file-list="videoList"
					accept="video"
					:compressed="true"
					:max-duration="30"
					:max-count="3"
					camera="back"
					upload-text="选择视频"
					@afterRead="handleVideoRead"
					@delete="handleVideoDelete"
				/>
			</view>

			<!-- 自动上传演示 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">自动上传演示</text>
					<text class="subtitle-text">模拟自动上传到服务器</text>
				</view>
				<zx-upload 
					:file-list="autoUploadList"
					:auto-upload="true"
					action="/api/upload"
					:headers="uploadHeaders"
					:data="uploadData"
					filename="file"
					:show-progress="true"
					:show-retry="true"
					@afterRead="handleAutoUploadRead"
					@progress="handleProgress"
					@error="handleUploadError"
					@retry="handleRetry"
				/>
			</view>

			<!-- 严格类型检查 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">严格类型检查</text>
					<text class="subtitle-text">只允许 JPG、PNG 格式图片</text>
				</view>
				<zx-upload 
					:file-list="strictList"
					accept="image"
					:strict="true"
					:extensions="['jpg', 'jpeg', 'png']"
					tips="严格模式：只允许 JPG、PNG 格式的图片文件"
					@afterRead="handleStrictRead"
					@error="handleStrictError"
				/>
			</view>

			<!-- 自定义样式 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">自定义上传按钮</text>
					<text class="subtitle-text">使用插槽自定义上传区域</text>
				</view>
				<zx-upload 
					:file-list="customList"
					@afterRead="handleCustomRead"
					@delete="handleCustomDelete"
				>
					<view class="custom-upload-btn">
						<zx-icon name="plus-circle" size="32" color="#409eff"></zx-icon>
						<text class="custom-upload-text">点击上传</text>
						<text class="custom-upload-tip">支持多种格式</text>
					</view>
				</zx-upload>
			</view>

			<!-- 操作按钮 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">手动控制</text>
				</view>
				<view class="button-group">
					<button class="demo-button" @click="clearAll">清空所有</button>
					<button class="demo-button" @click="addMockFiles">添加模拟文件</button>
					<button class="demo-button" @click="getAllFiles">获取所有文件</button>
				</view>
			</view>

			<!-- 状态显示 -->
			<view class="demo-section">
				<view class="demo-title">
					<text class="title-text">组件状态</text>
				</view>
				<view class="status-info">
					<text class="status-item">图片数量: {{ imageList.length }}</text>
					<text class="status-item">文件数量: {{ fileList.length }}</text>
					<text class="status-item">视频数量: {{ videoList.length }}</text>
					<text class="status-item">自动上传: {{ autoUploadList.length }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 各种文件列表
const imageList = ref([]);
const fileList = ref([]);
const videoList = ref([]);
const autoUploadList = ref([]);
const strictList = ref([]);
const customList = ref([]);

// 上传配置
const uploadHeaders = ref({
	'Authorization': 'Bearer demo-token',
	'Content-Type': 'multipart/form-data'
});

const uploadData = ref({
	userId: 123,
	category: 'demo'
});

// 事件处理函数
const handleImageRead = (event) => {
	console.log('图片读取:', event);
	const { file } = event;
	
	if (Array.isArray(file)) {
		file.forEach(item => {
			imageList.value.push({
				...item,
				status: 'success',
				id: Date.now() + Math.random()
			});
		});
	} else {
		imageList.value.push({
			...file,
			status: 'success',
			id: Date.now()
		});
	}
};

const handleImageDelete = (event) => {
	console.log('删除图片:', event);
	imageList.value.splice(event.index, 1);
};

const handleFileRead = (event) => {
	console.log('文件读取:', event);
	const { file } = event;
	
	fileList.value.push({
		...file,
		status: 'success',
		id: Date.now()
	});
};

const handleFileDelete = (event) => {
	console.log('删除文件:', event);
	fileList.value.splice(event.index, 1);
};

const handleVideoRead = (event) => {
	console.log('视频读取:', event);
	const { file } = event;
	
	videoList.value.push({
		...file,
		status: 'success',
		id: Date.now()
	});
};

const handleVideoDelete = (event) => {
	console.log('删除视频:', event);
	videoList.value.splice(event.index, 1);
};

const handleAutoUploadRead = (event) => {
	console.log('自动上传读取:', event);
	const { file } = event;
	
	// 模拟自动上传
	const fileItem = {
		...file,
		status: 'uploading',
		progress: 0,
		message: '上传中',
		id: Date.now()
	};
	
	autoUploadList.value.push(fileItem);
	
	// 模拟上传进度
	simulateUpload(autoUploadList.value.length - 1);
};

const handleStrictRead = (event) => {
	console.log('严格模式读取:', event);
	const { file } = event;
	
	strictList.value.push({
		...file,
		status: 'success',
		id: Date.now()
	});
};

const handleCustomRead = (event) => {
	console.log('自定义读取:', event);
	const { file } = event;
	
	customList.value.push({
		...file,
		status: 'success',
		id: Date.now()
	});
};

const handleCustomDelete = (event) => {
	console.log('删除自定义文件:', event);
	customList.value.splice(event.index, 1);
};

const handleProgress = (event) => {
	console.log('上传进度:', event);
	const { progress, index } = event;
	
	if (autoUploadList.value[index]) {
		autoUploadList.value[index].progress = progress;
	}
};

const handleUploadError = (error) => {
	console.error('上传错误:', error);
	uni.showToast({
		title: '上传失败',
		icon: 'error'
	});
};

const handleRetry = (event) => {
	console.log('重试上传:', event);
	const { index } = event;
	
	if (autoUploadList.value[index]) {
		autoUploadList.value[index].status = 'uploading';
		autoUploadList.value[index].progress = 0;
		autoUploadList.value[index].message = '重新上传中';
		
		// 重新模拟上传
		simulateUpload(index);
	}
};

const handleOversize = (event) => {
	console.log('文件超出大小限制:', event);
	uni.showToast({
		title: '文件大小超出限制',
		icon: 'error'
	});
};

const handlePreview = (event) => {
	console.log('预览文件:', event);
};

const handleFilePreview = (event) => {
	console.log('预览文件:', event);
	uni.showToast({
		title: `预览文件: ${event.name}`,
		icon: 'none'
	});
};

const handleStrictError = (error) => {
	console.error('严格模式错误:', error);
	uni.showToast({
		title: '文件类型不符合要求',
		icon: 'error'
	});
};

// 工具函数
const simulateUpload = (index) => {
	let progress = 0;
	const timer = setInterval(() => {
		progress += Math.random() * 20;
		
		if (progress >= 100) {
			progress = 100;
			clearInterval(timer);
			
			// 随机成功或失败
			const isSuccess = Math.random() > 0.2; // 80% 成功率
			
			if (isSuccess) {
				autoUploadList.value[index].status = 'success';
				autoUploadList.value[index].progress = 100;
				delete autoUploadList.value[index].message;
			} else {
				autoUploadList.value[index].status = 'failed';
				autoUploadList.value[index].message = '上传失败';
			}
		} else {
			autoUploadList.value[index].progress = Math.floor(progress);
		}
	}, 200);
};

const clearAll = () => {
	imageList.value = [];
	fileList.value = [];
	videoList.value = [];
	autoUploadList.value = [];
	strictList.value = [];
	customList.value = [];
	
	uni.showToast({
		title: '已清空所有文件',
		icon: 'success'
	});
};

const addMockFiles = () => {
	// 添加模拟图片
	imageList.value.push({
		url: 'https://via.placeholder.com/200x200/4CAF50/white?text=Mock+Image',
		thumb: 'https://via.placeholder.com/200x200/4CAF50/white?text=Mock+Image',
		name: 'mock-image.jpg',
		size: 1024 * 200,
		type: 'image',
		status: 'success',
		id: Date.now() + 1
	});
	
	// 添加模拟文件
	fileList.value.push({
		url: 'https://example.com/mock-document.pdf',
		name: 'mock-document.pdf',
		size: 1024 * 1024 * 2,
		type: 'file',
		status: 'success',
		id: Date.now() + 2
	});
	
	uni.showToast({
		title: '已添加模拟文件',
		icon: 'success'
	});
};

const getAllFiles = () => {
	const allFiles = [
		...imageList.value,
		...fileList.value,
		...videoList.value,
		...autoUploadList.value,
		...strictList.value,
		...customList.value
	];
	
	console.log('所有文件:', allFiles);
	
	uni.showModal({
		title: '文件统计',
		content: `共 ${allFiles.length} 个文件\n图片: ${imageList.value.length}\n文件: ${fileList.value.length}\n视频: ${videoList.value.length}\n自动上传: ${autoUploadList.value.length}`,
		showCancel: false
	});
};
</script>

<style lang="scss" scoped>
.upload-demo {
	height: 100vh;
	background-color: #f8f9fa;
}

.scroll-content {
	height: calc(100vh - 88rpx);
	padding: 20rpx;
}

.demo-section {
	background: white;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.demo-title {
	margin-bottom: 20rpx;
	
	.title-text {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		color: #1a1a1a;
		margin-bottom: 8rpx;
	}
	
	.subtitle-text {
		display: block;
		font-size: 24rpx;
		color: #666;
		line-height: 1.4;
	}
}

.custom-upload-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 160rpx;
	height: 160rpx;
	border: 2rpx dashed #409eff;
	border-radius: 12rpx;
	background-color: rgba(64, 158, 255, 0.05);
	transition: all 0.3s ease;
	
	&:hover {
		border-color: #66b3ff;
		background-color: rgba(64, 158, 255, 0.1);
	}
}

.custom-upload-text {
	font-size: 24rpx;
	color: #409eff;
	margin-top: 8rpx;
	font-weight: 500;
}

.custom-upload-tip {
	font-size: 20rpx;
	color: #999;
	margin-top: 4rpx;
}

.button-group {
	display: flex;
	gap: 20rpx;
	flex-wrap: wrap;
}

.demo-button {
	flex: 1;
	min-width: 200rpx;
	height: 80rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border: none;
	border-radius: 40rpx;
	font-size: 28rpx;
	font-weight: 500;
	
	&:active {
		transform: scale(0.98);
		opacity: 0.9;
	}
}

.status-info {
	background-color: #f8f9fa;
	border-radius: 12rpx;
	padding: 20rpx;
	border-left: 6rpx solid #409eff;
}

.status-item {
	display: block;
	font-size: 26rpx;
	color: #333;
	margin-bottom: 8rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

/* 响应式设计 */
@media screen and (max-width: 750px) {
	.demo-section {
		padding: 20rpx;
		margin-bottom: 16rpx;
	}
	
	.button-group {
		flex-direction: column;
		gap: 16rpx;
	}
	
	.demo-button {
		width: 100%;
		min-width: auto;
	}
}
</style> 