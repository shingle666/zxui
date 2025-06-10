<template>
	<view class="zx-camera" :style="{ backgroundColor: backgroundColor }">
		<view class="camera-box" :style="{ width: width, height: height, backgroundColor: backgroundColor }">
			<camera ref="cameraRef" class="camera" :mode="mode" :resolution="resolution"
				:device-position="devicePositionState" :flash="flashMode" :frame-size="frameSize"
				:output-dimension="outputDimension" @ready="cameraReady" @initdone="cameraInitdone" @stop="cameraStop"
				@error="handleError" @scancode="handleScanCode">
				<!-- 相机背景 -->
				<slot>
					<view class="camera-bg">
						<view class="camera-frame">
							<!-- 添加辅助线和提示 -->
							<view class="camera-corners">
								<view class="corner top-left"></view>
								<view class="corner top-right"></view>
								<view class="corner bottom-left"></view>
								<view class="corner bottom-right"></view>
							</view>
							<view v-if="mode === 'scanCode'" class="scan-line"></view>
							<text class="tip">{{ tip }}</text>
						</view>
					</view>
				</slot>
				<!-- 相机控制区域 -->
				<slot v-if="controls" name="controls">
					<view class="camera-controls">
						<view class="control-icon" @click="switchFlash">
							<zx-icon :name="flashIcons[flashMode]" size="34rpx" color="#ffffff"></zx-icon>
						</view>
						<view class="control-icon" @click="switchCameraPosition">
							<zx-icon name="arrow-left-double" size="34rpx" color="#ffffff"></zx-icon>
						</view>
						<view class="control-icon" @click="takePhoto">
							<zx-icon name="camera" size="34rpx" color="#ffffff"></zx-icon>
						</view>
						<view class="control-icon" @click="switchRecord">
							<zx-icon name="pause-circle" size="34rpx" color="#ffffff"></zx-icon>
						</view>
					</view>
				</slot>
			</camera>
		</view>
	</view>
</template>

<script setup>
import {
	ref,
	onMounted,
	onBeforeUnmount
} from "vue";
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const props = defineProps({
	// 应用模式，有效值为 normal(相机模式), scanCode(扫码模式)，不支持动态修改
	mode: {
		type: String,
		default: "normal"
	},
	// 分辨率，有效值为low, medium, high，不支持动态修改
	resolution: {
		type: String,
		default: "high"
	},
	// 设备位置: back, front
	devicePosition: {
		type: String,
		default: "back"
	},
	// 闪光灯，值为auto, on, off, torch
	flash: {
		type: String,
		default: "auto"
	},
	// 指定期望的相机帧数据尺寸，值为small, medium, large
	frameSize: {
		type: String,
		default: "large"
	},
	// 输出尺寸： 相机拍照，录制的分辨率。有效值为 360P、540P、720P、1080P、max。
	outputDimension: {
		type: String,
		default: "1080P"
	},
	// 成像质量，值为high（高质量）、normal（普通质量）、low（低质量），默认normal
	quality: {
		type: String,
		default: "high"
	},
	// 是否开启镜像，默认true。仅微信小程序 2.22.0+ 支持
	selfieMirror: {
		type: Boolean,
		default: true
	},
	// 缩放级别，范围[1, maxZoom]。zoom 可取小数，精确到小数后一位。maxZoom 可在 @initdone 返回值中获取。
	zoom: {
		type: Number,
		default: 1
	},
	// 录制时长上限，单位为秒，默认30s。微信小程序最长不能超过 5 分钟，支付宝小程序最大录制时长 10 分钟。仅微信2.22.0+ 、支付宝1.11.0+小程序支持
	timeout: {
		type: Number,
		default: 30
	},
	// 录制视频是否启用压缩
	compressed: {
		type: Boolean,
		default: false
	},
	// 相机宽度
	width: {
		type: String,
		default: "100%"
	},
	// 相机高度
	height: {
		type: String,
		default: "480rpx"
	},
	// 是否显示控制区域
	controls: {
		type: Boolean,
		default: true
	},
	// 提示语
	tip: {
		type: String,
		default: "请放入提示框内"
	},
	// 背景色
	backgroundColor: {
		type: String,
		default: "#000000"
	}
});

const emit = defineEmits(["close", "error", "photo", "video", "scan"]);

// 状态变量
const cameraRef = ref(null);
const cameraContext = ref(null);
// 最大 缩放级别
const maxZoom = ref(1);
// 当前 缩放级别
const currentZoom = ref(1);
const flashMode = ref("off"); // off, auto, on, torch
const devicePositionState = ref(props.devicePosition);
const flashIcons = {
	off: "cut",
	on: "star",
	auto: "star-filled",
	torch: "photo",
};
const isRecording = ref(false);
const placeholderText = ref('点击调用相机');

onMounted(() => {
	// 请求相机权限
	uni.getSetting({
		success: (res) => {
			if (!res.authSetting['scope.camera']) {
				uni.authorize({
					scope: 'scope.camera',
					success: () => {
						// 用户同意授权
						initCamera();
					},
					fail: () => {
						// 用户拒绝授权
						emit('error', { errMsg: '用户拒绝相机授权' });
						uni.showModal({
							title: '提示',
							content: '需要相机权限才能使用此功能，请在设置中开启相机权限。',
							showCancel: false,
							confirmText: '知道了',
							success: () => {
								emit('close');
							}
						});
					}
				});
			} else {
				// 已授权
				initCamera();
			}
		},
		fail: () => {
			emit('error', { errMsg: '获取权限设置失败' });
			uni.showToast({
				title: '获取权限设置失败',
				icon: 'none'
			});
			emit('close');
		}
	});


	/* 
	if (props.mode === 'scanCode') {
		placeholderText.value = '扫码功能仅限小程序使用';
	} else if (props.mode === 'video') {
		placeholderText.value = '点击开始录像';
	} else {
		placeholderText.value = '点击拍照';
	} */

});

// 初始化相机
const initCamera = () => {
	// 组件挂载时初始化相机
	setTimeout(() => {
		if (!cameraContext.value) {
			cameraContext.value = uni.createCameraContext();
		}
	}, 300);
};

// 处理占位区域点击事件 (App/Web)
const handlePlaceholderClick = () => {
	if (props.mode === 'scanCode') {
		uni.showToast({
			title: '请在小程序中使用扫码功能',
			icon: 'none'
		});
		return;
	}
	if (props.mode === 'normal' || props.mode === 'photo') {
		uni.chooseImage({
			count: 1,
			sourceType: ['camera'],
			success: (res) => {
				emit('photo', { path: res.tempFilePaths[0] });
			},
			fail: (err) => {
				console.error('chooseImage fail:', err);
				emit('error', { errMsg: '选择图片失败' });
			}
		});
	} else if (props.mode === 'video') {
		uni.chooseVideo({
			sourceType: ['camera'],
			compressed: props.compressed,
			maxDuration: props.timeout,
			camera: props.devicePosition,
			success: (res) => {
				emit('video', {
					path: res.tempFilePath,
					duration: res.duration,
					size: res.size,
					height: res.height,
					width: res.width
				});
			},
			fail: (err) => {
				console.error('chooseVideo fail:', err);
				emit('error', { errMsg: '选择视频失败' });
			}
		});
	}
};

// 切换闪光灯
const switchFlash = () => {
	const modes = ["off", "auto", "on", "torch"];
	const currentIndex = modes.indexOf(flashMode.value);
	const nextIndex = (currentIndex + 1) % modes.length;
	flashMode.value = modes[nextIndex];

	uni.showToast({
		title: `闪光灯模式: ${flashMode.value}`,
		icon: "none",
		duration: 1000,
	});
};

// 切换前后摄像头
const switchCameraPosition = () => {
	devicePositionState.value = devicePositionState.value === "back" ? "front" : "back";

	uni.showToast({
		title: devicePositionState.value === "back" ? "后置摄像头" : "前置摄像头",
		icon: "none",
		duration: 1000,
	});
};

// 设置缩放
const setZoom = (zoom) => {
	if (!cameraContext.value) return;

	if (zoom > maxZoom.value) zoom = maxZoom.value;
	if (zoom < 1) zoom = 1;

	cameraContext.value.setZoom({
		zoom: zoom,
		success: () => {
			currentZoom.value = zoom;
		},
		fail: (err) => {
			console.error("设置缩放失败:", err);
		},
	});
};

// 关闭相机
const close = () => {
	emit("close");
};

// 相机初始化成功时触发
const cameraReady = (e) => {
	console.log("相机准备就绪:", e);
	initCamera();
};

// 摄像头在非正常终止时触发
const cameraStop = (e) => {
	console.error("相机停止:", e);
	emit("error", e);
};

// 相机初始化完成时触发
const cameraInitdone = (e) => {
	console.log("相机初始化完成:", JSON.stringify(e));
	if (e && e.detail && e.detail.maxZoom) {
		maxZoom.value = e.detail.maxZoom;
	}
};

// 用户不允许使用摄像头时触发
const handleError = (e) => {
	uni.showToast({
		title: "相机调用失败",
		icon: "none",
	});
	console.error("相机错误:", e);
	emit("error", e);
};

// 扫码成功时触发
const handleScanCode = (e) => {
	console.log('扫码成功:', e.detail);
	emit('scan', e.detail);
};

// 拍照片
const takePhoto = async () => {
	// #ifdef MP
	if (!cameraContext.value) {
		initCamera();
	}

	uni.showLoading({
		title: "识别中",
	});

	cameraContext.value.takePhoto({
		quality: props.quality,
		frameSize: props.frameSize,
		success: async (res) => {
			console.log("拍照成功:", res.tempImagePath);
			emit("photo", {
				path: res.tempImagePath
			});
		},
		fail: (err) => {
			console.error("拍照失败:", err);
			uni.showToast({
				title: "拍照失败，请重试",
				icon: "none",
				duration: 2000,
			});
		},
		complete: () => {
			setTimeout(() => {
				uni.hideLoading();

			}, 1000);
		},
	});
};

// 开始录制视频
const startRecord = () => {
	if (!cameraContext.value) {
		initCamera();
	}

	isRecording.value = true;

	cameraContext.value.startRecord({
		timeoutCallback: (res) => {
			console.log("录制超时自动结束:", res);
		},
		success: () => {
			uni.showToast({
				title: "开始录制",
				icon: "none",
				duration: 1000,
			});
		},
		fail: (err) => {
			console.error("开始录制失败:", err);
			isRecording.value = false;
		},
	});
};

// 停止录制视频
const stopRecord = () => {
	if (!cameraContext.value || !isRecording.value) return;

	cameraContext.value.stopRecord({
		success: (res) => {
			console.log("录制成功:", res.tempVideoPath);
			isRecording.value = false;

			emit("video", {
				path: res.tempVideoPath,
				thumbPath: res.tempThumbPath,
			});
		},
		fail: (err) => {
			console.error("停止录制失败:", err);
		},
		complete: () => {
			isRecording.value = false;
		},
	});
};

// 录制视频
const switchRecord = () => {
	if (isRecording.value) {
		stopRecord()
	} else {
		startRecord()
	}
}

// 获取 Camera 实时帧数据。
const onCameraFrame = () => {
	cameraContext.value.onCameraFrame()
}

// 组件卸载前清理
onBeforeUnmount(() => {
	if (isRecording.value && cameraContext.value) {
		cameraContext.value.stopRecord({
			fail: () => { },
		});
	}
	cameraContext.value = null;
});

// 暴露方法给父组件
defineExpose({
	takePhoto,
	startRecord,
	stopRecord,
	setZoom,
	switchFlash,
	switchCameraPosition,
	close
});
</script>

<style scoped>
.zx-camera {
	width: 100%;
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

.camera-frame {
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

.scan-line {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 4rpx;
	background: linear-gradient(to right, transparent, #67c23a, transparent);
	animation: scan-animation 2s infinite linear;
}

@keyframes scan-animation {
	0% {
		top: 0;
	}

	50% {
		top: calc(100% - 4rpx);
	}

	100% {
		top: 0;
	}
}

.camera-corners {
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
	border-color: #67c23a;
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

.tip {
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