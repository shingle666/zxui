<template>
	<view class="content">
		<view class="title">视频组件示例</view>
		
		<!-- 视频播放器 -->
		<view class="video-container">
			<zx-video 
				ref="videoRef"
				videoId="demoVideo"
				:src="videoSrc"
				:poster="videoPoster"
				:title="videoTitle"
				:autoplay="false"
				:controls="true"
				:loop="isLoop"
				:muted="isMuted"
				:enable-danmu="enableDanmu"
				:danmu-btn="enableDanmu"
				:danmu-list="danmuList"
				:show-mute-btn="true"
				:show-fullscreen-btn="true"
				:object-fit="objectFit"
				:initial-time="initialTime"
				@onPlay="handlePlay"
				@onPause="handlePause"
				@onEnded="handleEnded"
				@onTimeUpdate="handleTimeUpdate"
				@onFullScreenChange="handleFullScreenChange"
				@onLoadedMetaData="handleLoadedMetaData"
				@onError="handleError"
			></zx-video>
		</view>
		
		<!-- 基本控制 -->
		<view class="control-section">
			<view class="section-title">基本控制</view>
			<view class="control-btns">
				<button class="btn" @click="playVideo">播放</button>
				<button class="btn" @click="pauseVideo">暂停</button>
				<button class="btn" @click="stopVideo">停止</button>
				<button class="btn" @click="toggleMute">{{ isMuted ? '取消静音' : '静音' }}</button>
				<button class="btn" @click="toggleLoop">{{ isLoop ? '关闭循环' : '开启循环' }}</button>
				<button class="btn" @click="enterFullScreen">全屏</button>
			</view>
		</view>
		
		<!-- 进度控制 -->
		<view class="control-section">
			<view class="section-title">进度控制</view>
			<view class="progress-bar">
				<text>{{ formatTime(currentTime) }}</text>
				<slider 
					class="slider" 
					:min="0" 
					:max="duration" 
					:value="currentTime" 
					:step="1" 
					show-value 
					@change="handleSliderChange" 
				/>
				<text>{{ formatTime(duration) }}</text>
			</view>
		</view>
		
		<!-- 倍速控制 -->
		<view class="control-section">
			<view class="section-title">倍速控制</view>
			<view class="control-btns">
				<button class="btn" :class="{ active: playbackRate === 0.5 }" @click="setPlaybackRate(0.5)">0.5x</button>
				<button class="btn" :class="{ active: playbackRate === 1.0 }" @click="setPlaybackRate(1.0)">1.0x</button>
				<button class="btn" :class="{ active: playbackRate === 1.5 }" @click="setPlaybackRate(1.5)">1.5x</button>
				<button class="btn" :class="{ active: playbackRate === 2.0 }" @click="setPlaybackRate(2.0)">2.0x</button>
			</view>
		</view>
		
		<!-- 弹幕发送 -->
		<view v-if="enableDanmu" class="control-section">
			<view class="section-title">弹幕功能</view>
			<view class="danmu-input">
				<input 
					type="text" 
					v-model="danmuText" 
					placeholder="请输入弹幕内容" 
					:disabled="!isPlaying"
				/>
				<view class="color-picker">
					<view 
						v-for="(color, index) in danmuColors" 
						:key="index" 
						:style="{ backgroundColor: color }" 
						:class="{ active: danmuColor === color }"
						@click="danmuColor = color"
						class="color-item"
					></view>
				</view>
				<button class="btn" @click="sendDanmu" :disabled="!isPlaying || !danmuText">发送弹幕</button>
			</view>
		</view>
		
		<!-- 视频截图 -->
		<view class="control-section">
			<view class="section-title">视频截图</view>
			<view class="snapshot-container">
				<button class="btn" @click="takeSnapshot" :disabled="!isPlaying">截图</button>
				<image v-if="snapshotPath" class="snapshot-image" :src="snapshotPath" mode="aspectFit"></image>
			</view>
		</view>
		
		<!-- 视频信息 -->
		<view class="control-section">
			<view class="section-title">视频信息</view>
			<view class="video-info">
				<view class="info-item">
					<text class="info-label">视频尺寸:</text>
					<text class="info-value">{{ videoWidth }} x {{ videoHeight }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">视频时长:</text>
					<text class="info-value">{{ formatTime(duration) }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">当前时间:</text>
					<text class="info-value">{{ formatTime(currentTime) }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">播放状态:</text>
					<text class="info-value">{{ playStatus }}</text>
				</view>
				<view class="info-item">
					<text class="info-label">全屏状态:</text>
					<text class="info-value">{{ isFullScreen ? '全屏' : '非全屏' }}</text>
				</view>
			</view>
		</view>
		
		<!-- 切换视频源 -->
		<view class="control-section">
			<view class="section-title">切换视频源</view>
			<view class="video-sources">
				<view 
					v-for="(source, index) in videoSources" 
					:key="index" 
					class="source-item"
					:class="{ active: videoSrc === source.src }"
					@click="changeVideoSource(source)"
				>
					<text>{{ source.title }}</text>
				</view>
			</view>
		</view>
		
		<!-- 设置 -->
		<view class="control-section">
			<view class="section-title">设置</view>
			<view class="settings">
				<view class="setting-item">
					<text>启用弹幕</text>
					<switch :checked="enableDanmu" @change="toggleDanmu" />
				</view>
				<view class="setting-item">
					<text>视频填充模式</text>
					<picker :value="objectFitIndex" :range="objectFitOptions" @change="handleObjectFitChange">
						<view class="picker-value">{{ objectFitOptions[objectFitIndex] }}</view>
					</picker>
				</view>
				<view class="setting-item">
					<text>初始播放位置 (秒)</text>
					<input type="number" v-model="initialTime" class="time-input" />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import zxVideo from '@/components/zx-video/zx-video.vue';

// 视频参数
const videoRef = ref(null);
const videoSrc = ref('https://red-education.wufu-app.com/upload/20211129/a5ba754c1700d0394a45cbc68dd4a5d8.mp4');
const videoPoster = ref('https://red-education.wufu-app.com/upload/20211129/2a92a8376dc42d0f79eed7d7c40b599d.png');
const videoTitle = ref('英雄儿女');
const isLoop = ref(false);
const isMuted = ref(false);
const initialTime = ref(0);
const isPlaying = ref(false);
const playStatus = ref('未播放');
const isFullScreen = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const videoWidth = ref(0);
const videoHeight = ref(0);
const playbackRate = ref(1.0);

// 弹幕相关
const enableDanmu = ref(true);
const danmuText = ref('');
const danmuColor = ref('#ffffff');
const danmuColors = ['#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
const danmuList = ref([
	{ text: 'uni-app 真棒!', color: '#ff0000', time: 1 },
	{ text: '这是一个演示弹幕', color: '#00ff00', time: 3 },
	{ text: '支持多端开发', color: '#0000ff', time: 5 },
	{ text: '一次编写，多端运行', color: '#ffff00', time: 7 }
]);

// 截图相关
const snapshotPath = ref('');

// 视频填充模式
const objectFitOptions = ['contain', 'fill', 'cover'];
const objectFitIndex = ref(0);
const objectFit = computed(() => objectFitOptions[objectFitIndex.value]);

// 视频源列表
const videoSources = [
	{
		title: '英雄儿女',
		src: 'https://red-education.wufu-app.com/upload/20211129/a5ba754c1700d0394a45cbc68dd4a5d8.mp4',
		poster: 'https://red-education.wufu-app.com/upload/20211129/2a92a8376dc42d0f79eed7d7c40b599d.png'
	},
	{
		title: '古田军号',
		src: 'https://red-education.wufu-app.com/upload/20211129/7dade57d8142fdf79bf7a895ec831a8f.mp4',
		poster: 'https://red-education.wufu-app.com/upload/20211129/8dc32c659c4b04ad245d6d9251892a7b.png'
	},
	{
		title: '建国大业',
		src: 'https://red-education.wufu-app.com/upload/20211125/097b5bfecfbfc1c8f89c850d652f1ddf.mp4',
		poster: 'https://red-education.wufu-app.com/upload/20211103/8af9d5daa7af98425f976b83fb76b3d1.jpg'
	}
];

// 生命周期
onMounted(() => {
	// 初始化操作
	console.log('组件已挂载');
});

// 播放控制方法
const playVideo = () => {
	videoRef.value.play();
};

const pauseVideo = () => {
	videoRef.value.pause();
};

const stopVideo = () => {
	videoRef.value.stop();
};

const toggleMute = () => {
	isMuted.value = !isMuted.value;
};

const toggleLoop = () => {
	isLoop.value = !isLoop.value;
};

const toggleDanmu = (e) => {
	enableDanmu.value = e.detail.value;
};

const enterFullScreen = () => {
	videoRef.value.requestFullScreen();
};

const handleSliderChange = (e) => {
	const value = e.detail.value;
	videoRef.value.seek(value);
};

const setPlaybackRate = (rate) => {
	playbackRate.value = rate;
	videoRef.value.playbackRate(rate);
};

const sendDanmu = () => {
	if (!danmuText.value) return;
	videoRef.value.sendDanmu(danmuText.value, danmuColor.value);
	danmuText.value = '';
};

const takeSnapshot = async () => {
	try {
		const path = await videoRef.value.snapshot();
		snapshotPath.value = path;
		uni.showToast({
			title: '截图成功',
			icon: 'success'
		});
	} catch (error) {
		uni.showToast({
			title: '截图失败',
			icon: 'error'
		});
		console.error('截图失败', error);
	}
};

const changeVideoSource = (source) => {
	if (isPlaying.value) {
		videoRef.value.pause();
	}
	videoSrc.value = source.src;
	videoPoster.value = source.poster;
	videoTitle.value = source.title;
	currentTime.value = 0;
};

const handleObjectFitChange = (e) => {
	objectFitIndex.value = Number(e.detail.value);
};

// 格式化时间
const formatTime = (seconds) => {
	if (!seconds || isNaN(seconds)) return '00:00';
	
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	
	return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 事件监听
const handlePlay = () => {
	isPlaying.value = true;
	playStatus.value = '播放中';
};

const handlePause = () => {
	isPlaying.value = false;
	playStatus.value = '已暂停';
};

const handleEnded = () => {
	isPlaying.value = false;
	playStatus.value = '已结束';
};

const handleTimeUpdate = (detail) => {
	currentTime.value = detail.currentTime;
};

const handleFullScreenChange = (detail) => {
	isFullScreen.value = detail.fullScreen;
};

const handleLoadedMetaData = (detail) => {
	videoWidth.value = detail.width;
	videoHeight.value = detail.height;
	duration.value = detail.duration;
};

const handleError = (e) => {
	console.error('视频播放错误', e);
	uni.showToast({
		title: '视频播放出错',
		icon: 'error'
	});
};
</script>

<style scoped>
.content {
	padding: 24rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 20rpx;
}

.video-container {
	width: 100%;
	height: 420rpx;
	margin-bottom: 20rpx;
}

.control-section {
	margin-bottom: 30rpx;
	border: 1px solid #eee;
	border-radius: 10rpx;
	padding: 20rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 15rpx;
	border-bottom: 1px solid #eee;
	padding-bottom: 10rpx;
}

.control-btns {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.btn {
	font-size: 26rpx;
	padding: 10rpx 20rpx;
	border-radius: 5rpx;
	margin-right: 10rpx;
	margin-bottom: 10rpx;
	background-color: #007aff;
	color: #fff;
}

.btn.active {
	background-color: #ff6b00;
}

.progress-bar {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.slider {
	flex: 1;
}

.danmu-input {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
	align-items: center;
}

.danmu-input input {
	flex: 1;
	padding: 10rpx;
	border: 1px solid #eee;
	border-radius: 5rpx;
	height: 60rpx;
}

.color-picker {
	display: flex;
	gap: 5rpx;
}

.color-item {
	width: 30rpx;
	height: 30rpx;
	border-radius: 50%;
	border: 1px solid #ddd;
}

.color-item.active {
	transform: scale(1.2);
	border: 2px solid #007aff;
}

.snapshot-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20rpx;
}

.snapshot-image {
	width: 100%;
	height: 300rpx;
	border: 1px solid #eee;
}

.video-info {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.info-item {
	display: flex;
	align-items: center;
}

.info-label {
	width: 160rpx;
	font-weight: bold;
}

.info-value {
	flex: 1;
}

.video-sources {
	display: flex;
	flex-wrap: wrap;
	gap: 10rpx;
}

.source-item {
	padding: 10rpx 20rpx;
	background-color: #f5f5f5;
	border-radius: 5rpx;
}

.source-item.active {
	background-color: #007aff;
	color: #fff;
}

.settings {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.setting-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.picker-value {
	padding: 10rpx 20rpx;
	background-color: #f5f5f5;
	border-radius: 5rpx;
}

.time-input {
	width: 100rpx;
	text-align: center;
	padding: 5rpx;
	border: 1px solid #eee;
	border-radius: 5rpx;
}
</style>
