<template>
	<!-- 取景框 -->
	<view class="camera-container">
		<view class="camera-box">
			<camera device-position="back" :flash="flashMode" output-dimension="1080P" class="camera" @ready="cameraReady"
				@initdone="cameraInitdone" @stop="cameraStop" @error="handleError" ref="cameraRef">
				<view class="camera-bg">
					<view class="id-card-frame">
						<!-- 添加辅助线和提示 -->
						<view class="id-card-corners">
							<view class="corner top-left"></view>
							<view class="corner top-right"></view>
							<view class="corner bottom-left"></view>
							<view class="corner bottom-right"></view>
						</view>
						<text class="id-card-tip">请将证件放入框内</text>
					</view>
				</view>
				<!-- 控制区域 -->
				<view class="camera-controls">
					<view class="control-icon" @click="switchFlash">
						<zx-icon :name="flashIcons[flashMode]" size="22" color="#ffffff"></zx-icon>
					</view>
					<view class="control-icon" @click="switchCameraPosition">
						<zx-icon name="loop" size="22" color="#ffffff"></zx-icon>
					</view>
					<view class="control-icon close-icon" @click="close">
						<zx-icon name="closeempty" size="22" color="#ffffff"></zx-icon>
					</view>
				</view>
			</camera>
		</view>
	</view>
</template>

<script setup>
	import {
		getCurrentInstance,
		ref,
		watch,
		onMounted,
		onBeforeUnmount
	} from 'vue'

	const {
		proxy
	} = getCurrentInstance()
	
	const props = defineProps({
		// 模式
		mode: {
			type: String,
			default: 'photo', // photo, video, scan
			validator: (value) => ['photo', 'video', 'scan'].includes(value)
		},
		// 设备位置
		devicePosition: {
			type: String,
			default: 'back' // back, front
		},
		// 输出尺寸
		frameSize: {
			type: String,
			default: 'large' // small, medium, large
		},
		// 质量
		quality: {
			type: String,
			default: 'high' // low, normal, high
		}
	})

	const emit = defineEmits(['close', 'error', 'photo', 'video', 'scan'])

	// 状态变量
	const cameraRef = ref(null)
	const cameraContext = ref(null)
	const idCardInfo = ref(null)
	const idCardImg = ref('')
	const idCardPhoto = ref('')
	const checkIcon = ref('camera')
	const maxZoom = ref(1)
	const currentZoom = ref(1)
	const flashMode = ref('off') // off, auto, on, torch
	const devicePositionState = ref(props.devicePosition)
	const flashIcons = {
		'off': 'closeempty',
		'on': 'fire',
		'auto': 'fire-filled',
		'torch': 'flashlightfilled'
	}
	const isRecording = ref(false)
	
	onMounted(() => {
		// 组件挂载时初始化相机
		setTimeout(() => {
			initCamera()
		}, 300)
	})

	// 初始化相机
	const initCamera = () => {
		if (!cameraContext.value) {
			cameraContext.value = uni.createCameraContext()
		}
	}

	// 切换闪光灯
	const switchFlash = () => {
		const modes = ['off', 'auto', 'on', 'torch']
		const currentIndex = modes.indexOf(flashMode.value)
		const nextIndex = (currentIndex + 1) % modes.length
		flashMode.value = modes[nextIndex]
		
		uni.showToast({
			title: `闪光灯模式: ${flashMode.value}`,
			icon: 'none',
			duration: 1000
		})
	}
	
	// 切换前后摄像头
	const switchCameraPosition = () => {
		devicePositionState.value = devicePositionState.value === 'back' ? 'front' : 'back'
		
		uni.showToast({
			title: devicePositionState.value === 'back' ? '后置摄像头' : '前置摄像头',
			icon: 'none',
			duration: 1000
		})
	}

	// 设置缩放
	const setZoom = (zoom) => {
		if (!cameraContext.value) return
		
		if (zoom > maxZoom.value) zoom = maxZoom.value
		if (zoom < 1) zoom = 1
		
		cameraContext.value.setZoom({
			zoom: zoom,
			success: () => {
				currentZoom.value = zoom
			},
			fail: (err) => {
				console.error('设置缩放失败:', err)
			}
		})
	}

	// 关闭相机
	const close = () => {
		emit('close')
	}

	// 相机初始化成功时触发
	const cameraReady = (e) => {
		console.log('相机准备就绪:', e)
		initCamera()
	}

	// 摄像头在非正常终止时触发
	const cameraStop = (e) => {
		console.error('相机停止:', e)
		emit('error', e)
	}

	// 相机初始化完成时触发
	const cameraInitdone = (e) => {
		console.log('相机初始化完成:', e)
		if (e.detail && e.detail.maxZoom) {
			maxZoom.value = e.detail.maxZoom
		}
	}

	// 用户不允许使用摄像头时触发
	const handleError = (e) => {
		uni.showToast({
			title: '相机调用失败',
			icon: 'none'
		})
		console.error('相机错误:', e)
		emit('error', e)
	}

	// 拍照片
	const takePhoto = async () => {
		if (!cameraContext.value) {
			initCamera()
		}
		
		uni.showLoading({
			title: '识别中'
		})
		
		checkIcon.value = 'spinner-cycle'
		
		cameraContext.value.takePhoto({
			quality: props.quality,
			frameSize: props.frameSize,
			success: async (res) => {
				console.log('拍照成功:', res.tempImagePath)
				idCardPhoto.value = res.tempImagePath
				
				// 保存照片到本地或者进行处理
				try {
					// 这里可以添加图像识别或处理逻辑
					const result = await processImage(res.tempImagePath)
					idCardInfo.value = result
					emit('photo', {
						path: res.tempImagePath,
						info: result
					})
				} catch (error) {
					console.error("处理图片失败:", error)
				}
			},
			fail: (err) => {
				console.error("拍照失败:", err)
				uni.showToast({
					title: '拍照失败，请重试',
					icon: 'none',
					duration: 2000
				})
			},
			complete: () => {
				setTimeout(() => {
					uni.hideLoading()
					checkIcon.value = 'camera'
				}, 1000)
			}
		})
	}
	
	// 开始录制视频
	const startRecord = () => {
		if (!cameraContext.value) {
			initCamera()
		}
		
		isRecording.value = true
		checkIcon.value = 'spinner-cycle'
		
		cameraContext.value.startRecord({
			timeoutCallback: (res) => {
				console.log('录制超时自动结束:', res)
			},
			success: () => {
				uni.showToast({
					title: '开始录制',
					icon: 'none',
					duration: 1000
				})
			},
			fail: (err) => {
				console.error('开始录制失败:', err)
				isRecording.value = false
				checkIcon.value = 'videocam'
			}
		})
	}
	
	// 停止录制视频
	const stopRecord = () => {
		if (!cameraContext.value || !isRecording.value) return
		
		cameraContext.value.stopRecord({
			success: (res) => {
				console.log('录制成功:', res.tempVideoPath)
				isRecording.value = false
				checkIcon.value = 'videocam'
				
				emit('video', {
					path: res.tempVideoPath,
					thumbPath: res.tempThumbPath
				})
			},
			fail: (err) => {
				console.error('停止录制失败:', err)
			},
			complete: () => {
				isRecording.value = false
				checkIcon.value = 'videocam'
			}
		})
	}
	
	// 处理图片（可以添加OCR识别等功能）
	const processImage = async (imagePath) => {
		// 此处可集成OCR识别等功能
		// 模拟处理结果
		return '图片已保存'
	}
	
	// 暴露方法给父组件
	defineExpose({
		takePhoto,
		startRecord,
		stopRecord,
		setZoom,
		switchFlash,
		switchCameraPosition
	})
	
	// 组件卸载前清理
	onBeforeUnmount(() => {
		if (isRecording.value && cameraContext.value) {
			cameraContext.value.stopRecord({
				fail: () => {}
			})
		}
		cameraContext.value = null
	})
</script>

<style scoped>
	/* 相机容器 */
	.camera-container {
		width: 100%;
		background-color: #ffffff;
		border-radius: 20rpx;
		overflow: hidden;
		position: relative;
	}

	/* 相机区域样式 */
	.camera {
		width: 750rpx;
		height: 480rpx;
		position: relative;
	}

	.camera-box {
		width: 750rpx;
		height: 480rpx;
		background-color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
	}

	.camera-bg {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.id-card-frame {
		width: 600rpx;
		height: 380rpx;
		border: 2px solid rgba(255, 255, 255, 0.8);
		border-radius: 8rpx;
		box-shadow: 0 0 0 2000rpx rgba(0, 0, 0, 0.5);
		position: relative;
		/* 确保取景框居中 */
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.id-card-corners {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.corner {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		border-color: #67C23A;
		border-width: 4rpx;
	}

	.top-left {
		top: 0;
		left: 0;
		border-top-style: solid;
		border-left-style: solid;
	}

	.top-right {
		top: 0;
		right: 0;
		border-top-style: solid;
		border-right-style: solid;
	}

	.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom-style: solid;
		border-left-style: solid;
	}

	.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom-style: solid;
		border-right-style: solid;
	}

	.id-card-tip {
		position: absolute;
		bottom: -50rpx;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		font-size: 28rpx;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 6rpx 20rpx;
		border-radius: 20rpx;
		white-space: nowrap;
	}
	
	.camera-controls {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.control-icon {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.close-icon {
		background-color: rgba(255, 0, 0, 0.5);
	}

	/* 动画效果 */
	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.rotate-icon {
		animation: rotate 1s linear infinite;
	}
</style>