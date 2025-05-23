<template>
	<view class="demo-page">
		<view class="demo-title">ZX-Upload 上传组件示例</view>
		
		<!-- 基础图片上传 -->
		<view class="demo-section">
			<view class="demo-section-title">基础图片上传</view>
			<zx-upload
				v-model:fileList="imageList"
				accept="image"
				:maxCount="9"
				:maxSize="5 * 1024 * 1024"
				:multiple="true"
				uploadText="上传图片"
				@change="onImageChange"
				@success="onUploadSuccess"
				@error="onUploadError"
			/>
		</view>

		<!-- 视频上传 -->
		<view class="demo-section">
			<view class="demo-section-title">视频上传</view>
			<zx-upload
				v-model:fileList="videoList"
				accept="video"
				:maxCount="3"
				:maxSize="50 * 1024 * 1024"
				uploadText="上传视频"
				@change="onVideoChange"
			/>
		</view>

		<!-- 文件上传（仅微信小程序） -->
		<view class="demo-section">
			<view class="demo-section-title">文件上传（仅微信小程序）</view>
			<zx-upload
				v-model:fileList="fileList"
				accept="file"
				:maxCount="5"
				:maxSize="10 * 1024 * 1024"
				uploadText="选择文件"
				listType="text"
				@change="onFileChange"
			/>
		</view>

		<!-- 自动上传 -->
		<view class="demo-section">
			<view class="demo-section-title">自动上传到服务器</view>
			<zx-upload
				v-model:fileList="uploadList"
				accept="image"
				:maxCount="6"
				:autoUpload="true"
				action="https://your-server.com/upload"
				:headers="uploadHeaders"
				:data="uploadData"
				name="file"
				uploadText="自动上传"
				@progress="onUploadProgress"
				@success="onUploadSuccess"
				@error="onUploadError"
			/>
		</view>

		<!-- 自定义样式 -->
		<view class="demo-section">
			<view class="demo-section-title">自定义样式</view>
			<zx-upload
				v-model:fileList="customList"
				accept="image"
				:size="120"
				uploadIcon="camera"
				uploadIconColor="#409EFF"
				uploadText="拍照"
				:customStyle="{ marginBottom: '20rpx' }"
				@change="onCustomChange"
			/>
		</view>

		<!-- 限制文件类型 -->
		<view class="demo-section">
			<view class="demo-section-title">限制文件扩展名</view>
			<zx-upload
				v-model:fileList="restrictList"
				accept="image"
				:extensions="['jpg', 'png', 'gif']"
				uploadText="仅支持 JPG/PNG/GIF"
				tips="只能上传 JPG、PNG、GIF 格式的图片"
				@change="onRestrictChange"
			/>
		</view>

		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="demo-section-title">禁用状态</view>
			<zx-upload
				v-model:fileList="disabledList"
				accept="image"
				:disabled="true"
				uploadText="已禁用"
			/>
		</view>

		<!-- 操作按钮 -->
		<view class="demo-actions">
			<button @tap="clearAllFiles" class="demo-button">清空所有文件</button>
			<button @tap="toggleDisabled" class="demo-button">切换禁用状态</button>
		</view>

		<!-- 文件信息展示 -->
		<view class="demo-info">
			<view class="demo-info-title">当前文件列表信息：</view>
			<view class="demo-info-content">
				<text>图片：{{ imageList.length }} 张</text>
				<text>视频：{{ videoList.length }} 个</text>
				<text>文件：{{ fileList.length }} 个</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const imageList = ref([])
const videoList = ref([])
const fileList = ref([])
const uploadList = ref([])
const customList = ref([])
const restrictList = ref([])
const disabledList = ref([
	{
		uid: 'demo1',
		url: 'https://via.placeholder.com/300x300',
		name: 'demo.jpg',
		size: 102400,
		type: 'image',
		status: 'success'
	}
])

// 上传配置
const uploadHeaders = ref({
	'Authorization': 'Bearer your-token'
})

const uploadData = ref({
	userId: '123',
	category: 'avatar'
})

// 事件处理
const onImageChange = (data) => {
	console.log('图片列表变化:', data)
}

const onVideoChange = (data) => {
	console.log('视频列表变化:', data)
}

const onFileChange = (data) => {
	console.log('文件列表变化:', data)
}

const onCustomChange = (data) => {
	console.log('自定义样式列表变化:', data)
}

const onRestrictChange = (data) => {
	console.log('限制类型列表变化:', data)
}

const onUploadProgress = (data) => {
	console.log('上传进度:', data)
	uni.showToast({
		title: `上传进度 ${data.progressEvent.progress}%`,
		icon: 'none',
		duration: 500
	})
}

const onUploadSuccess = (data) => {
	console.log('上传成功:', data)
	uni.showToast({
		title: '上传成功',
		icon: 'success'
	})
}

const onUploadError = (data) => {
	console.error('上传失败:', data)
	uni.showToast({
		title: '上传失败',
		icon: 'error'
	})
}

// 操作方法
const clearAllFiles = () => {
	imageList.value = []
	videoList.value = []
	fileList.value = []
	uploadList.value = []
	customList.value = []
	restrictList.value = []
	
	uni.showToast({
		title: '已清空所有文件',
		icon: 'success'
	})
}

const toggleDisabled = () => {
	// 这里可以切换组件的禁用状态
	uni.showToast({
		title: '功能演示',
		icon: 'none'
	})
}
</script>

<style lang="scss" scoped>
.demo-page {
	padding: 32rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 40rpx;
}

.demo-section {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-bottom: 32rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

	&-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 24rpx;
		padding-bottom: 12rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}
}

.demo-actions {
	display: flex;
	gap: 24rpx;
	margin-bottom: 32rpx;
}

.demo-button {
	flex: 1;
	height: 80rpx;
	background-color: #409EFF;
	color: #ffffff;
	border: none;
	border-radius: 8rpx;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;

	&:active {
		background-color: #337ecc;
	}
}

.demo-info {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

	&-title {
		font-size: 28rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 16rpx;
	}

	&-content {
		display: flex;
		flex-direction: column;
		gap: 12rpx;

		text {
			font-size: 24rpx;
			color: #666;
			padding: 8rpx 16rpx;
			background-color: #f8f9fa;
			border-radius: 8rpx;
		}
	}
}
</style> 