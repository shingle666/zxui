<template>
	<view class="demo-page">
		<view class="demo-header">
			<text class="title">zx-recorder 录音组件演示</text>
			<text class="subtitle">基于uni-app录音管理器的高级录音组件</text>
		</view>

		<!-- 基础录音功能 -->
		<view class="demo-section">
			<view class="section-title">基础录音功能</view>
			<zx-recorder 
				ref="basicRecorder"
				:duration="60000"
				:sampleRate="16000"
				:format="'mp3'"
				:autoUpload="false"
				@start="onRecordStart"
				@stop="onRecordStop"
				@pause="onRecordPause"
				@resume="onRecordResume"
				@end="onRecordEnd"
				@error="onRecordError"
				@play="onPlay"
				@playEnd="onPlayEnd"
			/>
		</view>

		<!-- 高级配置录音 -->
		<view class="demo-section">
			<view class="section-title">高级配置录音</view>
			<view class="config-panel">
				<view class="config-row">
					<text>录音时长(秒):</text>
					<slider 
						:value="advancedConfig.duration / 1000" 
						:min="10" 
						:max="600" 
						:step="10"
						@change="onDurationChange"
						:show-value="true"
					/>
				</view>
				<view class="config-row">
					<text>采样率:</text>
					<picker 
						:range="sampleRates" 
						:value="sampleRateIndex"
						@change="onSampleRateChange"
					>
						<view class="picker-text">{{ sampleRates[sampleRateIndex] }}</view>
					</picker>
				</view>
				<view class="config-row">
					<text>音频格式:</text>
					<picker 
						:range="formats" 
						:value="formatIndex"
						@change="onFormatChange"
					>
						<view class="picker-text">{{ formats[formatIndex] }}</view>
					</picker>
				</view>
				<view class="config-row">
					<text>自动上传:</text>
					<switch 
						:checked="advancedConfig.autoUpload"
						@change="onAutoUploadChange"
					/>
				</view>
			</view>
			
			<zx-recorder 
				ref="advancedRecorder"
				:duration="advancedConfig.duration"
				:sampleRate="advancedConfig.sampleRate"
				:numberOfChannels="2"
				:encodeBitRate="128000"
				:format="advancedConfig.format"
				:autoUpload="advancedConfig.autoUpload"
				:detectDecibel="true"
				:cloudPathPrefix="'demo/'"
				@end="onAdvancedRecordEnd"
			/>
		</view>

		<!-- 录音记录列表 -->
		<view class="demo-section" v-if="recordList.length > 0">
			<view class="section-title">录音记录</view>
			<view class="record-list">
				<view 
					class="record-item" 
					v-for="(record, index) in recordList" 
					:key="index"
				>
					<view class="record-info">
						<text class="record-name">录音 {{ index + 1 }}</text>
						<text class="record-time">{{ formatTime(record.duration) }}</text>
						<text class="record-size">{{ formatFileSize(record.fileSize) }}</text>
						<text class="record-date">{{ formatDate(record.createTime) }}</text>
					</view>
					<view class="record-actions">
						<button 
							class="action-btn play-btn"
							@tap="playRecord(record)"
							:disabled="currentPlaying === record.tempFilePath"
						>
							{{ currentPlaying === record.tempFilePath ? '播放中' : '播放' }}
						</button>
						<button 
							class="action-btn delete-btn"
							@tap="deleteRecord(index)"
						>
							删除
						</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 操作日志 -->
		<view class="demo-section">
			<view class="section-title">操作日志</view>
			<view class="log-container">
				<view 
					class="log-item" 
					v-for="(log, index) in logs" 
					:key="index"
					:class="log.type"
				>
					<text class="log-time">{{ formatDateTime(log.time) }}</text>
					<text class="log-message">{{ log.message }}</text>
				</view>
			</view>
		</view>

		<!-- 功能测试区域 -->
		<view class="demo-section">
			<view class="section-title">功能测试</view>
			<view class="test-buttons">
				<button class="test-btn" @tap="resetRecorder">重置录音器</button>
				<button class="test-btn" @tap="getRecordInfo">获取录音信息</button>
				<button class="test-btn" @tap="clearLogs">清空日志</button>
				<button class="test-btn" @tap="clearRecords">清空记录</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import zxRecorder from './zx-recorder.vue';

// 组件引用
const basicRecorder = ref(null);
const advancedRecorder = ref(null);

// 高级配置
const advancedConfig = reactive({
	duration: 60000,
	sampleRate: 16000,
	format: 'mp3',
	autoUpload: true
});

// 配置选项
const sampleRates = [8000, 16000, 44100];
const sampleRateIndex = ref(1);
const formats = ['mp3', 'aac', 'wav'];
const formatIndex = ref(0);

// 录音记录
const recordList = ref([]);
// 当前播放的录音
const currentPlaying = ref('');
// 操作日志
const logs = ref([]);
// 音频播放器
const audioContext = ref(null);

// 录音事件处理
const onRecordStart = (res) => {
	addLog('开始录音', 'info');
	console.log('录音开始:', res);
};

const onRecordStop = (res) => {
	addLog('停止录音', 'info');
	console.log('录音停止:', res);
};

const onRecordPause = (res) => {
	addLog('暂停录音', 'warning');
	console.log('录音暂停:', res);
};

const onRecordResume = (res) => {
	addLog('继续录音', 'info');
	console.log('录音继续:', res);
};

const onRecordEnd = (recordFile) => {
	addLog(`录音完成: ${formatTime(recordFile.duration)}`, 'success');
	// 添加到记录列表
	recordList.value.push({
		...recordFile,
		createTime: Date.now()
	});
};

const onAdvancedRecordEnd = (recordFile) => {
	addLog(`高级录音完成: ${formatTime(recordFile.duration)}`, 'success');
	if (recordFile.url) {
		addLog('文件上传成功', 'success');
	}
};

const onRecordError = (error) => {
	addLog(`录音出错: ${error.errMsg || '未知错误'}`, 'error');
	console.error('录音出错:', error);
};

const onPlay = () => {
	addLog('开始播放录音', 'info');
};

const onPlayEnd = () => {
	addLog('播放结束', 'info');
};

// 配置变更处理
const onDurationChange = (e) => {
	advancedConfig.duration = e.detail.value * 1000;
	addLog(`录音时长设置为: ${e.detail.value}秒`, 'info');
};

const onSampleRateChange = (e) => {
	sampleRateIndex.value = e.detail.value;
	advancedConfig.sampleRate = sampleRates[e.detail.value];
	addLog(`采样率设置为: ${advancedConfig.sampleRate}Hz`, 'info');
};

const onFormatChange = (e) => {
	formatIndex.value = e.detail.value;
	advancedConfig.format = formats[e.detail.value];
	addLog(`音频格式设置为: ${advancedConfig.format}`, 'info');
};

const onAutoUploadChange = (e) => {
	advancedConfig.autoUpload = e.detail.value;
	addLog(`自动上传${e.detail.value ? '开启' : '关闭'}`, 'info');
};

// 播放录音记录
const playRecord = (record) => {
	try {
		if (!audioContext.value) {
			audioContext.value = uni.createInnerAudioContext();
			audioContext.value.onEnded(() => {
				currentPlaying.value = '';
			});
			audioContext.value.onError((error) => {
				currentPlaying.value = '';
				addLog('播放出错', 'error');
			});
		}
		
		currentPlaying.value = record.tempFilePath;
		audioContext.value.src = record.tempFilePath;
		audioContext.value.play();
		addLog(`播放录音: ${formatTime(record.duration)}`, 'info');
	} catch (error) {
		addLog('播放失败', 'error');
		currentPlaying.value = '';
	}
};

// 删除录音记录
const deleteRecord = (index) => {
	uni.showModal({
		title: '确认删除',
		content: '确定要删除这条录音记录吗？',
		success: (res) => {
			if (res.confirm) {
				recordList.value.splice(index, 1);
				addLog('删除录音记录', 'warning');
			}
		}
	});
};

// 功能测试
const resetRecorder = () => {
	if (basicRecorder.value) {
		basicRecorder.value.resetRecorder();
	}
	if (advancedRecorder.value) {
		advancedRecorder.value.resetRecorder();
	}
	addLog('重置录音器', 'info');
};

const getRecordInfo = () => {
	if (basicRecorder.value) {
		const info = basicRecorder.value.getRecordFile();
		console.log('录音信息:', info);
		addLog(`获取录音信息: ${JSON.stringify(info)}`, 'info');
	}
};

const clearLogs = () => {
	logs.value = [];
};

const clearRecords = () => {
	recordList.value = [];
	addLog('清空录音记录', 'warning');
};

// 添加日志
const addLog = (message, type = 'info') => {
	logs.value.unshift({
		time: Date.now(),
		message,
		type
	});
	// 保持最多100条日志
	if (logs.value.length > 100) {
		logs.value = logs.value.slice(0, 100);
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

const formatDate = (timestamp) => {
	const date = new Date(timestamp);
	return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const formatDateTime = (timestamp) => {
	const date = new Date(timestamp);
	return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

onMounted(() => {
	addLog('组件演示页面加载完成', 'success');
});
</script>

<style>
.demo-page {
	padding: 20rpx;
	background: #f5f5f5;
	min-height: 100vh;
}

.demo-header {
	text-align: center;
	margin-bottom: 40rpx;
	padding: 40rpx 20rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 16rpx;
	color: #fff;
}

.title {
	display: block;
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 12rpx;
}

.subtitle {
	display: block;
	font-size: 26rpx;
	opacity: 0.9;
}

.demo-section {
	margin-bottom: 32rpx;
	background: #fff;
	border-radius: 12rpx;
	padding: 24rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	padding-bottom: 12rpx;
	border-bottom: 2rpx solid #f0f0f0;
}

.config-panel {
	margin-bottom: 24rpx;
}

.config-row {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	font-size: 28rpx;
}

.config-row text {
	min-width: 200rpx;
	color: #666;
}

.picker-text {
	padding: 8rpx 16rpx;
	background: #f8f9fa;
	border-radius: 6rpx;
	color: #333;
}

.record-list {
	max-height: 600rpx;
	overflow-y: auto;
}

.record-item {
	display: flex;
	align-items: center;
	padding: 16rpx;
	background: #f8f9fa;
	border-radius: 8rpx;
	margin-bottom: 12rpx;
}

.record-info {
	flex: 1;
}

.record-name {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 8rpx;
}

.record-time, .record-size, .record-date {
	display: inline-block;
	font-size: 24rpx;
	color: #666;
	margin-right: 16rpx;
}

.record-actions {
	display: flex;
	gap: 12rpx;
}

.action-btn {
	padding: 8rpx 16rpx;
	border: none;
	border-radius: 6rpx;
	font-size: 24rpx;
}

.action-btn.play-btn {
	background: #007AFF;
	color: #fff;
}

.action-btn.delete-btn {
	background: #ff6b6b;
	color: #fff;
}

.log-container {
	max-height: 400rpx;
	overflow-y: auto;
	background: #f8f9fa;
	border-radius: 8rpx;
	padding: 16rpx;
}

.log-item {
	display: flex;
	margin-bottom: 8rpx;
	font-size: 24rpx;
	line-height: 1.5;
}

.log-time {
	min-width: 120rpx;
	color: #999;
	margin-right: 12rpx;
}

.log-message {
	flex: 1;
	color: #666;
}

.log-item.info .log-message {
	color: #333;
}

.log-item.success .log-message {
	color: #4cd964;
}

.log-item.warning .log-message {
	color: #ff9500;
}

.log-item.error .log-message {
	color: #ff6b6b;
}

.test-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.test-btn {
	flex: 1;
	min-width: 160rpx;
	padding: 16rpx 12rpx;
	border: none;
	border-radius: 8rpx;
	background: #667eea;
	color: #fff;
	font-size: 26rpx;
}

.test-btn:active {
	opacity: 0.8;
}
</style> 