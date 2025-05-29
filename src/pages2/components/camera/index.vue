<template>
	<view class="content">
		<view class="header">
			<view class="title">相机组件示例</view>
		</view>
		
		<!-- 功能区 -->
		<view class="function-area">
			<view class="function-title">基本功能</view>
			<view class="function-buttons">
				<button type="primary" @click="showCamera('photo')">拍照模式</button>
				<button type="primary" @click="showCamera('video')">视频模式</button>
			</view>
			
			<view class="function-title">相机控制</view>
			<view class="function-buttons">
				<button type="default" @click="takePhoto" :disabled="!cameraVisible">拍照</button>
				<button type="default" @click="toggleRecord" :disabled="!cameraVisible || mode !== 'video'">
					{{ isRecording ? '停止录制' : '开始录制' }}
				</button>
				<button type="default" @click="switchCamera" :disabled="!cameraVisible">切换摄像头</button>
				<button type="default" @click="toggleFlash" :disabled="!cameraVisible">切换闪光灯</button>
			</view>
		</view>
		
		<!-- 预览区 -->
		<view class="preview-area" v-if="mediaUrl">
			<view class="preview-title">预览</view>
			<image v-if="mode === 'photo'" class="preview-image" :src="mediaUrl" mode="aspectFit"></image>
			<video v-else-if="mode === 'video'" class="preview-video" :src="mediaUrl" controls></video>
			<view class="preview-info">
				<text>{{ mediaInfo }}</text>
			</view>
		</view>
		
		<!-- 相机组件 -->
		<zx-camera 
			ref="cameraRef"
			:mode="mode"
			:devicePosition="devicePosition"
			:frameSize="frameSize"
			:quality="quality"
			v-if="cameraVisible"
			@close="handleCameraClose"
			@photo="handlePhotoTaken"
			@video="handleVideoRecorded"
			@error="handleCameraError"
		></zx-camera>
		
		<!-- 提示信息 -->
		<view class="tips">
			<view class="tip-item">
				<text class="tip-title">拍照模式：</text>
				<text class="tip-content">点击"拍照模式"按钮打开相机，点击"拍照"按钮拍摄照片</text>
			</view>
			<view class="tip-item">
				<text class="tip-title">视频模式：</text>
				<text class="tip-content">点击"视频模式"按钮打开相机，点击"开始录制"开始视频录制，点击"停止录制"完成录制</text>
			</view>
			<view class="tip-item">
				<text class="tip-title">切换功能：</text>
				<text class="tip-content">可使用"切换摄像头"在前后置摄像头间切换，使用"切换闪光灯"切换闪光灯模式</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, getCurrentInstance } from 'vue';
	
	// 引用相机组件
	const cameraRef = ref(null);
	const { proxy } = getCurrentInstance();
	
	// 相机状态
	const cameraVisible = ref(false);
	const mode = ref('photo'); // photo, video
	const devicePosition = ref('back');
	const frameSize = ref('large');
	const quality = ref('high');
	const isRecording = ref(false);
	
	// 媒体信息
	const mediaUrl = ref('');
	const mediaInfo = ref('');
	
	// 显示相机
	const showCamera = (cameraMode) => {
		mode.value = cameraMode;
		cameraVisible.value = true;
		// 打开相机时重置状态
		mediaUrl.value = '';
		mediaInfo.value = '';
		isRecording.value = false;
	};
	
	// 拍照
	const takePhoto = () => {
		if (cameraRef.value) {
			cameraRef.value.takePhoto();
		} else {
			uni.showToast({
				title: '相机未初始化',
				icon: 'none'
			});
		}
	};
	
	// 切换录制状态
	const toggleRecord = () => {
		if (!cameraRef.value) {
			uni.showToast({
				title: '相机未初始化',
				icon: 'none'
			});
			return;
		}
		
		if (isRecording.value) {
			// 停止录制
			cameraRef.value.stopRecord();
		} else {
			// 开始录制
			cameraRef.value.startRecord();
			isRecording.value = true;
		}
	};
	
	// 切换摄像头
	const switchCamera = () => {
		if (cameraRef.value) {
			cameraRef.value.switchCameraPosition();
			
			// 更新当前摄像头方向
			devicePosition.value = devicePosition.value === 'back' ? 'front' : 'back';
		}
	};
	
	// 切换闪光灯
	const toggleFlash = () => {
		if (cameraRef.value) {
			cameraRef.value.switchFlash();
		}
	};
	
	// 相机关闭事件
	const handleCameraClose = () => {
		cameraVisible.value = false;
		console.log('相机已关闭');
	};
	
	// 拍照完成事件
	const handlePhotoTaken = (result) => {
		console.log('拍照成功:', result);
		mediaUrl.value = result.path;
		mediaInfo.value = result.info || '照片已保存';
		cameraVisible.value = false;
	};
	
	// 录像完成事件
	const handleVideoRecorded = (result) => {
		console.log('录制成功:', result);
		mediaUrl.value = result.path;
		mediaInfo.value = '视频已保存';
		isRecording.value = false;
		cameraVisible.value = false;
	};
	
	// 相机错误事件
	const handleCameraError = (error) => {
		console.error('相机错误:', error);
		uni.showToast({
			title: '相机出现错误',
			icon: 'none'
		});
		cameraVisible.value = false;
	};
</script>

<style scoped>
	.content {
		padding: 30rpx;
	}
	
	.header {
		margin-bottom: 40rpx;
	}
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
	}
	
	.function-area, .preview-area {
		margin-bottom: 40rpx;
		background-color: #f8f8f8;
		border-radius: 12rpx;
		padding: 20rpx;
	}
	
	.function-title, .preview-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.function-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 30rpx;
	}
	
	.function-buttons button {
		margin: 0;
		min-width: 180rpx;
		font-size: 28rpx;
	}
	
	.preview-image, .preview-video {
		width: 100%;
		height: 400rpx;
		background-color: #eaeaea;
		border-radius: 8rpx;
		margin-bottom: 20rpx;
	}
	
	.preview-info {
		padding: 20rpx;
		background-color: #e6f7ff;
		border-radius: 8rpx;
		border: 1px solid #91d5ff;
	}
	
	.tips {
		background-color: #fff7e6;
		border-radius: 12rpx;
		padding: 20rpx;
		border: 1px solid #ffd591;
	}
	
	.tip-item {
		margin-bottom: 10rpx;
	}
	
	.tip-title {
		font-weight: bold;
	}
	
	.tip-content {
		font-size: 28rpx;
		color: #666;
	}
</style>
