<template>
	<view class="zx-recorder">
		<!-- 录音状态显示 -->
		<view class="recorder-status" v-if="!hideTips">
			<view class="status-icon" :class="recordingStatus">
				<text class="icon">🎤</text>
			</view>
			<view class="status-text">
				<text>{{ statusText }}</text>
				<text v-if="recordingTime > 0" class="time">{{ formatTime(recordingTime) }}</text>
			</view>
		</view>

		<!-- 控制按钮 -->
		<view class="recorder-controls" v-if="show">
			<zx-button class="control-btn start-btn" :class="{ active: recordingStatus === 'recording' }"
				:disabled="recordingStatus === 'recording' || recordingStatus === 'paused'" @click="startRecord">
				<text class="btn-icon">▶</text>
				<text>开始录音</text>
			</zx-button>

			<zx-button class="control-btn stop-btn" :disabled="recordingStatus === 'idle'" @click="stopRecord">
				<text class="btn-icon">⏹</text>
				<text>停止录音</text>
			</zx-button>

			<zx-button class="control-btn pause-btn" :disabled="recordingStatus !== 'recording'" @click="pauseRecord">
				<text class="btn-icon">⏸</text>
				<text>暂停录音</text>
			</zx-button>

			<zx-button class="control-btn resume-btn" :disabled="recordingStatus !== 'paused'" @click="resumeRecord">
				<text class="btn-icon">▶</text>
				<text>继续录音</text>
			</zx-button>
		</view>

		<!-- 录音文件播放区域 -->
		<view class="audio-player" v-if="recordFile.tempFilePath && !playing">
			<view class="audio-info">
				<text class="filename">录音文件</text>
				<text class="duration">{{ formatTime(recordFile.duration) }}</text>
				<text class="size">{{ formatFileSize(recordFile.fileSize) }}</text>
			</view>
			<zx-button class="play-btn" @click="playAudio">
				<text class="btn-icon">▶</text>
				<text>播放录音</text>
			</zx-button>
		</view>

		<!-- 播放控制 -->
		<view class="audio-playing" v-if="playing">
			<view class="playing-info">
				<text>正在播放...</text>
				<progress :percent="playProgress" :show-info="true" stroke-width="4" activeColor="#007AFF" />
			</view>
			<zx-button class="stop-play-btn" @click="stopAudio">
				<text class="btn-icon">⏹</text>
				<text>停止播放</text>
			</zx-button>
		</view>

		<!-- 上传进度 -->
		<view class="upload-progress" v-if="uploading">
			<text>正在上传...</text>
			<progress :percent="uploadProgress" :show-info="true" stroke-width="6" activeColor="#4CD964" />
		</view>

		<!-- 错误信息 -->
		<view class="error-message" v-if="errorMessage">
			<text class="error-text">{{ errorMessage }}</text>
			<zx-button class="clear-error-btn" @click="clearError">清除</zx-button>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted, onUnmounted } from 'vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';
const { proxy } = getCurrentInstance();

// 定义事件
const emit = defineEmits(['start', 'stop', 'pause', 'resume', 'end', 'error', 'play', 'playEnd']);

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	},
	// 指定录音的时长，单位 ms ，如果传入了合法的 duration ，在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
	duration: {
		type: Number,
		default: 60000
	},
	// 采样率，有效值 8000/16000/44100
	sampleRate: {
		type: Number,
		default: 16000
	},
	// 录音通道数，有效值 1、2
	numberOfChannels: {
		type: Number,
		default: 2
	},
	// 编码码率
	encodeBitRate: {
		type: Number,
		default: 64000
	},
	// 音频格式，有效值 aac/mp3/wav/PCM
	format: {
		type: String,
		default: 'mp3'
	},
	// 指定帧大小，单位 KB。
	frameSize: {
		type: Number,
		default: 1
	},
	// 隐藏录音图标
	hideTips: {
		type: Boolean,
		default: false
	},
	// 指定录音的音频输入源。
	audioSource: {
		type: String,
		default: ''
	},
	// 检测声音分贝数
	detectDecibel: {
		type: Boolean,
		default: false
	},
	// 是否自动上传
	autoUpload: {
		type: Boolean,
		default: true
	},
	// 云存储路径前缀
	cloudPathPrefix: {
		type: String,
		default: 'audio/'
	}
});

// 录音管理器
const recorder = ref(null);
// 音频上下文管理器
const innerAudioContext = ref(null);

// 录音状态：idle(空闲), recording(录音中), paused(暂停), stopped(已停止)
const recordingStatus = ref('idle');
// 录音时间计时器
const recordingTime = ref(0);
const recordTimer = ref(null);
// 播放状态
const playing = ref(false);
const playProgress = ref(0);
// 上传状态
const uploading = ref(false);
const uploadProgress = ref(0);
// 错误信息
const errorMessage = ref('');

// 录音文件信息
const recordFile = ref({
	duration: 0,
	tempFilePath: '',
	fileSize: 0,
	url: '',
	key: '',
	cloudPath: ''
});

// 状态文本
const statusText = computed(() => {
	switch (recordingStatus.value) {
		case 'recording':
			return '录音中...';
		case 'paused':
			return '录音已暂停';
		case 'stopped':
			return '录音已完成';
		default:
			return '准备录音';
	}
});

// 初始化录音管理器
const initRecorderManager = () => {
	try {
		recorder.value = uni.getRecorderManager();

		// 绑定事件监听器
		recorder.value.onStart(onRecordStart);
		recorder.value.onStop(onRecordStop);
		recorder.value.onPause(onRecordPause);
		recorder.value.onResume(onRecordResume);
		recorder.value.onError(onRecordError);

		// 监听分贝数变化（如果开启）
		if (props.detectDecibel) {
			recorder.value.onFrameRecorded(onFrameRecorded);
		}

		console.log('录音管理器初始化成功');
	} catch (error) {
		console.error('录音管理器初始化失败：', error);
		setError('录音管理器初始化失败');
	}
};

// 初始化音频播放器
const initAudioContext = () => {
	try {
		innerAudioContext.value = uni.createInnerAudioContext();

		// 绑定播放事件
		innerAudioContext.value.onPlay(() => {
			playing.value = true;
			emit('play');
		});

		innerAudioContext.value.onTimeUpdate(() => {
			if (innerAudioContext.value.duration > 0) {
				playProgress.value = (innerAudioContext.value.currentTime / innerAudioContext.value.duration) * 100;
			}
		});

		innerAudioContext.value.onEnded(() => {
			playing.value = false;
			playProgress.value = 0;
			emit('playEnd');
		});

		innerAudioContext.value.onError((error) => {
			console.error('音频播放出错：', error);
			playing.value = false;
			playProgress.value = 0;
			setError('音频播放失败');
		});

		console.log('音频播放器初始化成功');
	} catch (error) {
		console.error('音频播放器初始化失败：', error);
		setError('音频播放器初始化失败');
	}
};

// 开始录音
const startRecord = () => {
	try {
		if (!recorder.value) {
			initRecorderManager();
		}

		clearError();

		const options = {
			duration: props.duration,
			sampleRate: props.sampleRate,
			numberOfChannels: props.numberOfChannels,
			encodeBitRate: props.encodeBitRate,
			format: props.format
		};

		// 添加可选参数
		if (props.frameSize) {
			options.frameSize = props.frameSize;
		}
		if (props.audioSource) {
			options.audioSource = props.audioSource;
		}

		recorder.value.start(options);
		startTimer();

	} catch (error) {
		console.error('开始录音失败：', error);
		setError('开始录音失败');
	}
};

// 停止录音
const stopRecord = () => {
	try {
		if (recorder.value && recordingStatus.value !== 'idle') {
			recorder.value.stop();
			stopTimer();
		}
	} catch (error) {
		console.error('停止录音失败：', error);
		setError('停止录音失败');
	}
};

// 暂停录音
const pauseRecord = () => {
	try {
		if (recorder.value && recordingStatus.value === 'recording') {
			recorder.value.pause();
			stopTimer();
		}
	} catch (error) {
		console.error('暂停录音失败：', error);
		setError('暂停录音失败');
	}
};

// 继续录音
const resumeRecord = () => {
	try {
		if (recorder.value && recordingStatus.value === 'paused') {
			recorder.value.resume();
			startTimer();
		}
	} catch (error) {
		console.error('继续录音失败：', error);
		setError('继续录音失败');
	}
};

// 播放音频
const playAudio = () => {
	try {
		if (!innerAudioContext.value) {
			initAudioContext();
		}

		if (recordFile.value.tempFilePath) {
			innerAudioContext.value.src = recordFile.value.tempFilePath;
			innerAudioContext.value.play();
		}
	} catch (error) {
		console.error('播放音频失败：', error);
		setError('播放音频失败');
	}
};

// 停止播放
const stopAudio = () => {
	try {
		if (innerAudioContext.value) {
			innerAudioContext.value.stop();
			playing.value = false;
			playProgress.value = 0;
		}
	} catch (error) {
		console.error('停止播放失败：', error);
	}
};

// 录音事件处理
const onRecordStart = (res) => {
	recordingStatus.value = 'recording';
	emit('start', res);
	console.log('录音开始');
};

const onRecordStop = async (res) => {
	recordingStatus.value = 'stopped';
	recordingTime.value = 0;

	// 更新录音文件信息
	recordFile.value.duration = res.duration;
	recordFile.value.tempFilePath = res.tempFilePath;
	recordFile.value.fileSize = res.fileSize;

	console.log('录音结束', res);

	// 自动上传（如果开启）
	if (props.autoUpload) {
		await uploadFile();
	}

	emit('stop', res);
	emit('end', recordFile.value);
};

const onRecordPause = (res) => {
	recordingStatus.value = 'paused';
	emit('pause', res);
	console.log('录音暂停');
};

const onRecordResume = (res) => {
	recordingStatus.value = 'recording';
	emit('resume', res);
	console.log('录音继续');
};

const onRecordError = (error) => {
	recordingStatus.value = 'idle';
	recordingTime.value = 0;
	stopTimer();

	let errorMsg = '录音出错';
	if (error.errCode) {
		switch (error.errCode) {
			case 10001:
				errorMsg = '未获得录音权限';
				break;
			case 10002:
				errorMsg = '网络问题无法录音';
				break;
			case 10003:
				errorMsg = '录音功能被占用';
				break;
			case 10004:
				errorMsg = '录音已经被暂停';
				break;
			default:
				errorMsg = `录音出错：${error.errMsg || '未知错误'}`;
		}
	}

	setError(errorMsg);
	emit('error', error);
	console.error('录音出错：', error);
};

const onFrameRecorded = (res) => {
	// 处理分贝数据
	console.log('分贝数：', res.frameBuffer);
};

// 计时器管理
const startTimer = () => {
	recordTimer.value = setInterval(() => {
		recordingTime.value += 1000;
	}, 1000);
};

const stopTimer = () => {
	if (recordTimer.value) {
		clearInterval(recordTimer.value);
		recordTimer.value = null;
	}
};

// 上传文件
const uploadFile = async () => {
	if (!recordFile.value.tempFilePath) {
		return;
	}

	try {
		uploading.value = true;
		uploadProgress.value = 0;

		const cloudPath = `${props.cloudPathPrefix}${Date.now()}.${props.format}`;

		const result = await uniCloud.uploadFile({
			filePath: recordFile.value.tempFilePath,
			cloudPath: cloudPath,
			onUploadProgress: (progressEvent) => {
				uploadProgress.value = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total
				);
			}
		});

		// 更新文件信息
		recordFile.value.url = result.fileID;
		recordFile.value.key = result.fileID;
		recordFile.value.cloudPath = cloudPath;

		console.log('文件上传成功：', result);

	} catch (error) {
		console.error('文件上传失败：', error);
		setError('文件上传失败');
	} finally {
		uploading.value = false;
		uploadProgress.value = 0;
	}
};

// 工具函数
const formatTime = (ms) => {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const formatFileSize = (bytes) => {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const setError = (message) => {
	errorMessage.value = message;
	setTimeout(() => {
		errorMessage.value = '';
	}, 5000); // 5秒后自动清除错误信息
};

const clearError = () => {
	errorMessage.value = '';
};

// 暴露方法给父组件
const getRecordFile = () => {
	return recordFile.value;
};

const resetRecorder = () => {
	recordingStatus.value = 'idle';
	recordingTime.value = 0;
	recordFile.value = {
		duration: 0,
		tempFilePath: '',
		fileSize: 0,
		url: '',
		key: '',
		cloudPath: ''
	};
	playing.value = false;
	playProgress.value = 0;
	clearError();
	stopTimer();
};

// 生命周期
onMounted(() => {
	initRecorderManager();
	initAudioContext();
});

onUnmounted(() => {
	// 清理资源
	if (recorder.value) {
		recorder.value.stop();
	}
	if (innerAudioContext.value) {
		innerAudioContext.value.destroy();
	}
	stopTimer();
});

// 暴露给父组件的方法
defineExpose({
	startRecord,
	stopRecord,
	pauseRecord,
	resumeRecord,
	playAudio,
	stopAudio,
	getRecordFile,
	resetRecorder,
	uploadFile
});
</script>

<style>
.zx-recorder {
	padding: 20rpx;
	border-radius: 12rpx;
	background: #fff;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.recorder-status {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	padding: 16rpx;
	background: #f8f9fa;
	border-radius: 8rpx;
}

.status-icon {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 16rpx;
	background: #e9ecef;
	transition: all 0.3s ease;
}

.status-icon.recording {
	background: #ff6b6b;
	animation: pulse 1s infinite;
}

.status-icon.paused {
	background: #ffd93d;
}

.status-icon.stopped {
	background: #4cd964;
}

@keyframes pulse {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

.icon {
	font-size: 32rpx;
}

.status-text {
	flex: 1;
}

.time {
	font-size: 28rpx;
	color: #666;
	margin-left: 16rpx;
}

.recorder-controls {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
	margin-bottom: 20rpx;
}

.control-btn {
	flex: 1;
	min-width: 160rpx;
	padding: 16rpx 12rpx;
	border: none;
	border-radius: 8rpx;
	background: #f8f9fa;
	color: #333;
	font-size: 28rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
	transition: all 0.3s ease;
}

.control-btn:disabled {
	opacity: 0.5;
}

.control-btn:not(:disabled):active {
	transform: scale(0.95);
}

.start-btn:not(:disabled) {
	background: #007AFF;
	color: #fff;
}

.start-btn.active {
	background: #ff6b6b;
}

.stop-btn:not(:disabled) {
	background: #ff6b6b;
	color: #fff;
}

.pause-btn:not(:disabled) {
	background: #ffd93d;
	color: #333;
}

.resume-btn:not(:disabled) {
	background: #4cd964;
	color: #fff;
}

.btn-icon {
	font-size: 32rpx;
	font-weight: bold;
}

.audio-player,
.audio-playing {
	padding: 16rpx;
	background: #f8f9fa;
	border-radius: 8rpx;
	margin-bottom: 16rpx;
}

.audio-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12rpx;
	font-size: 26rpx;
	color: #666;
}

.filename {
	font-weight: bold;
	color: #333;
}

.play-btn,
.stop-play-btn {
	width: 100%;
	padding: 12rpx;
	border: none;
	border-radius: 6rpx;
	background: #007AFF;
	color: #fff;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8rpx;
}

.stop-play-btn {
	background: #ff6b6b;
}

.playing-info {
	margin-bottom: 12rpx;
}

.upload-progress {
	padding: 16rpx;
	background: #e8f5e8;
	border-radius: 8rpx;
	margin-bottom: 16rpx;
	text-align: center;
	font-size: 28rpx;
	color: #4cd964;
}

.error-message {
	padding: 16rpx;
	background: #ffe6e6;
	border-radius: 8rpx;
	border-left: 4rpx solid #ff6b6b;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.error-text {
	flex: 1;
	color: #d63031;
	font-size: 26rpx;
}

.clear-error-btn {
	padding: 4rpx 12rpx;
	border: none;
	border-radius: 4rpx;
	background: #ff6b6b;
	color: #fff;
	font-size: 24rpx;
}
</style>
