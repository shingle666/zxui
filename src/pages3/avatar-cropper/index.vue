<template>
	<view class="page">
		<view class="page-title">头像裁剪 AvatarCropper</view>
		
		<!-- 当前头像展示 -->
		<view class="section-title">当前头像</view>
		<view class="section-content">
			<view class="avatar-display">
				<zx-avatar 
					:src="currentAvatar" 
					size="200rpx"
					shape="circle"
					preview
				></zx-avatar>
				<text class="avatar-tip">{{ currentAvatar ? '点击头像可预览' : '暂无头像' }}</text>
			</view>
		</view>
		
		<!-- 基础用法 -->
		<view class="section-title">基础用法</view>
		<view class="section-content">
			<view class="demo-item">
				<zx-button 
					type="primary" 
					@click="openCropper('basic')"
					:loading="loading"
				>
					选择并裁剪头像
				</zx-button>
				<text class="demo-desc">默认圆形裁剪，400rpx裁剪框</text>
			</view>
		</view>
		
		<!-- 不同形状 -->
		<view class="section-title">不同形状</view>
		<view class="section-content">
			<view class="demo-row">
				<view class="demo-item">
					<zx-button 
						type="primary" 
						size="small"
						@click="openCropper('circle')"
					>
						圆形裁剪
					</zx-button>
					<text class="demo-desc">适合头像</text>
				</view>
				<view class="demo-item">
					<zx-button 
						type="success" 
						size="small"
						@click="openCropper('square')"
					>
						方形裁剪
					</zx-button>
					<text class="demo-desc">适合封面图</text>
				</view>
			</view>
		</view>
		
		<!-- 不同尺寸 -->
		<view class="section-title">不同尺寸</view>
		<view class="section-content">
			<view class="demo-row">
				<view class="demo-item">
					<zx-button 
						type="warning" 
						size="small"
						@click="openCropper('small')"
					>
						小尺寸
					</zx-button>
					<text class="demo-desc">300rpx</text>
				</view>
				<view class="demo-item">
					<zx-button 
						type="info" 
						size="small"
						@click="openCropper('large')"
					>
						大尺寸
					</zx-button>
					<text class="demo-desc">500rpx</text>
				</view>
			</view>
		</view>
		
		<!-- 高质量输出 -->
		<view class="section-title">高质量输出</view>
		<view class="section-content">
			<view class="demo-item">
				<zx-button 
					type="primary" 
					@click="openCropper('hd')"
				>
					高清裁剪
				</zx-button>
				<text class="demo-desc">输出400px，质量0.95</text>
			</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section-title">自定义样式</view>
		<view class="section-content">
			<view class="demo-row">
				<view class="demo-item">
					<zx-button 
						type="default" 
						size="small"
						@click="openCropper('custom1')"
					>
						橙色边框
					</zx-button>
					<text class="demo-desc">自定义边框颜色</text>
				</view>
				<view class="demo-item">
					<zx-button 
						type="default" 
						size="small"
						@click="openCropper('custom2')"
					>
						深色遮罩
					</zx-button>
					<text class="demo-desc">自定义遮罩颜色</text>
				</view>
			</view>
		</view>
		
		<!-- 功能限制 -->
		<view class="section-title">功能限制</view>
		<view class="section-content">
			<view class="demo-row">
				<view class="demo-item">
					<zx-button 
						type="default" 
						size="small"
						@click="openCropper('noResize')"
					>
						禁用调整
					</zx-button>
					<text class="demo-desc">不可调整大小</text>
				</view>
				<view class="demo-item">
					<zx-button 
						type="default" 
						size="small"
						@click="openCropper('noRotate')"
					>
						禁用旋转
					</zx-button>
					<text class="demo-desc">隐藏旋转按钮</text>
				</view>
			</view>
		</view>
		
		<!-- 预设图片 -->
		<view class="section-title">预设图片</view>
		<view class="section-content">
			<view class="demo-item">
				<zx-button 
					type="primary" 
					@click="openCropper('preset')"
				>
					裁剪预设图片
				</zx-button>
				<text class="demo-desc">直接裁剪指定图片</text>
			</view>
		</view>
		
		<!-- 操作历史 -->
		<view class="section-title">操作历史</view>
		<view class="section-content">
			<view class="history-list">
				<view 
					v-for="(item, index) in operationHistory" 
					:key="index" 
					class="history-item"
				>
					<text class="history-time">{{ item.time }}</text>
					<text class="history-action">{{ item.action }}</text>
					<text class="history-result" :class="item.success ? 'success' : 'error'">
						{{ item.success ? '成功' : '失败' }}
					</text>
				</view>
				<view v-if="operationHistory.length === 0" class="history-empty">
					<text>暂无操作记录</text>
				</view>
			</view>
		</view>
		
		<!-- 头像裁剪组件 -->
		<zx-avatar-cropper 
			v-if="showCropper"
			:src="cropperConfig.src"
			:shape="cropperConfig.shape"
			:crop-size="cropperConfig.cropSize"
			:output-size="cropperConfig.outputSize"
			:quality="cropperConfig.quality"
			:resizable="cropperConfig.resizable"
			:show-rotate-btn="cropperConfig.showRotateBtn"
			:show-reset-btn="cropperConfig.showResetBtn"
			:mask-color="cropperConfig.maskColor"
			:border-color="cropperConfig.borderColor"
			:border-width="cropperConfig.borderWidth"
			:min-crop-size="cropperConfig.minCropSize"
			:max-crop-size="cropperConfig.maxCropSize"
			@confirm="onCropConfirm"
			@cancel="onCropCancel"
			@error="onCropError"
		></zx-avatar-cropper>
		
		<!-- 隐藏的canvas用于裁剪 -->
		<canvas 
			canvas-id="cropCanvas" 
			class="crop-canvas"
			:style="{ width: outputCanvasSize + 'px', height: outputCanvasSize + 'px' }"
		></canvas>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 响应式数据
const currentAvatar = ref('');
const showCropper = ref(false);
const loading = ref(false);
const outputCanvasSize = ref(200);
const operationHistory = ref([]);

// 裁剪器配置
const cropperConfig = reactive({
	src: '',
	shape: 'circle',
	cropSize: 400,
	outputSize: 200,
	quality: 0.8,
	resizable: true,
	showRotateBtn: true,
	showResetBtn: true,
	maskColor: 'rgba(0, 0, 0, 0.5)',
	borderColor: '#ffffff',
	borderWidth: 2,
	minCropSize: 100,
	maxCropSize: 600
});

// 预设图片URL（示例）
const presetImageUrl = 'https://cdn.uviewui.com/uview/common/logo.png';

// 打开裁剪器
const openCropper = (type) => {
	// 重置配置为默认值
	Object.assign(cropperConfig, {
		src: '',
		shape: 'circle',
		cropSize: 400,
		outputSize: 200,
		quality: 0.8,
		resizable: true,
		showRotateBtn: true,
		showResetBtn: true,
		maskColor: 'rgba(0, 0, 0, 0.5)',
		borderColor: '#ffffff',
		borderWidth: 2,
		minCropSize: 100,
		maxCropSize: 600
	});
	
	// 根据类型设置不同配置
	switch (type) {
		case 'basic':
			// 默认配置
			break;
		case 'circle':
			cropperConfig.shape = 'circle';
			break;
		case 'square':
			cropperConfig.shape = 'square';
			break;
		case 'small':
			cropperConfig.cropSize = 300;
			cropperConfig.outputSize = 150;
			break;
		case 'large':
			cropperConfig.cropSize = 500;
			cropperConfig.outputSize = 300;
			break;
		case 'hd':
			cropperConfig.outputSize = 400;
			cropperConfig.quality = 0.95;
			break;
		case 'custom1':
			cropperConfig.borderColor = '#ff6600';
			cropperConfig.borderWidth = 3;
			break;
		case 'custom2':
			cropperConfig.maskColor = 'rgba(0, 0, 0, 0.8)';
			break;
		case 'noResize':
			cropperConfig.resizable = false;
			break;
		case 'noRotate':
			cropperConfig.showRotateBtn = false;
			cropperConfig.showResetBtn = false;
			break;
		case 'preset':
			cropperConfig.src = presetImageUrl;
			showCropper.value = true;
			addOperationHistory('打开预设图片裁剪', true);
			return;
	}
	
	// 选择图片
	if (type !== 'preset') {
		chooseImage(type);
	}
};

// 选择图片
const chooseImage = (type) => {
	loading.value = true;
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			cropperConfig.src = res.tempFilePaths[0];
			showCropper.value = true;
			addOperationHistory(`选择图片 (${type})`, true);
		},
		fail: (err) => {
			uni.showToast({
				title: '选择图片失败',
				icon: 'none'
			});
			addOperationHistory(`选择图片 (${type})`, false);
		},
		complete: () => {
			loading.value = false;
		}
	});
};

// 裁剪确认
const onCropConfirm = (filePath) => {
	currentAvatar.value = filePath;
	showCropper.value = false;
	
	uni.showToast({
		title: '裁剪成功',
		icon: 'success'
	});
	
	addOperationHistory('裁剪图片', true);
	
	// 这里可以上传到服务器
	// uploadToServer(filePath);
};

// 裁剪取消
const onCropCancel = () => {
	showCropper.value = false;
	addOperationHistory('取消裁剪', true);
};

// 裁剪错误
const onCropError = (error) => {
	console.error('裁剪错误:', error);
	uni.showToast({
		title: '裁剪失败',
		icon: 'none'
	});
	addOperationHistory('裁剪图片', false);
};

// 添加操作历史
const addOperationHistory = (action, success) => {
	const now = new Date();
	const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
	
	operationHistory.value.unshift({
		time,
		action,
		success
	});
	
	// 只保留最近10条记录
	if (operationHistory.value.length > 10) {
		operationHistory.value = operationHistory.value.slice(0, 10);
	}
};

// 上传到服务器的示例函数
const uploadToServer = (filePath) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'https://your-server.com/upload',
			filePath: filePath,
			name: 'avatar',
			formData: {
				userId: 'user123'
			},
			success: (res) => {
				try {
					const data = JSON.parse(res.data);
					if (data.success) {
						resolve(data.url);
						addOperationHistory('上传头像', true);
					} else {
						reject(new Error(data.message));
						addOperationHistory('上传头像', false);
					}
				} catch (e) {
					reject(e);
					addOperationHistory('上传头像', false);
				}
			},
			fail: (err) => {
				reject(err);
				addOperationHistory('上传头像', false);
			}
		});
	});
};
</script>

<style lang="scss" scoped>
.page {
	padding: 40rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.page-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #333333;
	text-align: center;
	margin-bottom: 60rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
	margin: 60rpx 0 30rpx 0;
	padding-left: 20rpx;
	border-left: 8rpx solid #007aff;
}

.section-content {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 40rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.avatar-display {
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.avatar-tip {
		margin-top: 20rpx;
		font-size: 28rpx;
		color: #666666;
	}
}

.demo-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
	
	.demo-desc {
		margin-top: 15rpx;
		font-size: 24rpx;
		color: #999999;
		text-align: center;
	}
}

.demo-row {
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	
	.demo-item {
		flex: 1;
		margin: 0 10rpx;
	}
}

.history-list {
	max-height: 400rpx;
	overflow-y: auto;
}

.history-item {
	display: flex;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
	
	&:last-child {
		border-bottom: none;
	}
	
	.history-time {
		font-size: 24rpx;
		color: #999999;
		width: 120rpx;
		flex-shrink: 0;
	}
	
	.history-action {
		font-size: 28rpx;
		color: #333333;
		flex: 1;
		margin: 0 20rpx;
	}
	
	.history-result {
		font-size: 24rpx;
		padding: 4rpx 12rpx;
		border-radius: 8rpx;
		
		&.success {
			color: #52c41a;
			background-color: #f6ffed;
		}
		
		&.error {
			color: #ff4d4f;
			background-color: #fff2f0;
		}
	}
}

.history-empty {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 120rpx;
	color: #999999;
	font-size: 28rpx;
}

/* 隐藏的canvas */
.crop-canvas {
	position: fixed;
	top: -9999px;
	left: -9999px;
	opacity: 0;
	pointer-events: none;
}
</style>