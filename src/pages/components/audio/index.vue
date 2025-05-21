<template>
	<view class="container">
		<view class="page-header">
			<text class="page-title">音频播放器示例</text>
		</view>
		
		<view class="tabs">
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 0 }" 
				@click="switchTab(0)"
			>普通音频</view>
			<view 
				class="tab-item" 
				:class="{ active: activeTab === 1 }" 
				@click="switchTab(1)"
			>背景音频</view>
		</view>
		
		<!-- 普通音频播放器 -->
		<view v-if="activeTab === 0" class="audio-player">
			<zx-audio
				ref="audioRef"
				:src="audioInfo.src"
				:volume="volume"
				:playbackRate="playbackRate"
				:loop="loop"
				@onCanplay="onCanplay"
				@onPlay="onPlay"
				@onPause="onPause"
				@onTimeUpdate="onTimeUpdate"
				@onEnded="onEnded"
				@onError="onError"
				@onLoading="onLoading"
			/>
			
			<view class="audio-info">
				<view class="audio-title">{{audioInfo.title}}</view>
				<view class="audio-artist">{{audioInfo.artist}}</view>
			</view>
			
			<view class="player-controls">
				<view class="progress-container">
					<text class="time-text">{{formatTime(currentTime)}}</text>
					<slider 
						class="progress-slider"
						:value="progress" 
						:min="0" 
						:max="100" 
						:disabled="loading"
						@change="handleProgressChange" 
					/>
					<text class="time-text">{{formatTime(duration)}}</text>
				</view>
				
				<view class="control-buttons">
					<button class="control-btn" @click="handleLoop">
						<text :class="['btn-text', { 'active-text': loop }]">循环</text>
					</button>
					<button class="control-btn" @click="handlePlayPause">
						<text class="btn-text">{{ isPaused ? '播放' : '暂停' }}</text>
					</button>
					<button class="control-btn" @click="handleStop">
						<text class="btn-text">停止</text>
					</button>
				</view>
				
				<view class="audio-settings">
					<view class="setting-item">
						<text class="setting-label">音量:</text>
						<slider 
							class="setting-slider"
							:value="volume * 100" 
							:min="0" 
							:max="100" 
							@change="handleVolumeChange" 
						/>
						<text class="setting-value">{{Math.round(volume * 100)}}%</text>
					</view>
					
					<view class="setting-item">
						<text class="setting-label">速度:</text>
						<slider 
							class="setting-slider"
							:value="playbackRate * 50" 
							:min="25" 
							:max="100" 
							@change="handleRateChange" 
						/>
						<text class="setting-value">{{playbackRate}}x</text>
					</view>
				</view>
				
				<view class="track-selector">
					<text class="selector-label">选择音乐:</text>
					<view class="track-list">
						<view 
							v-for="(track, index) in trackList" 
							:key="index"
							class="track-item"
							:class="{ 'active-track': track.src === audioInfo.src }"
							@click="changeTrack(track)"
						>
							<text class="track-title">{{track.title}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view v-if="loading" class="loading-indicator">
				<text>加载中...</text>
			</view>
		</view>
		
		<!-- 背景音频播放器 -->
		<view v-if="activeTab === 1" class="bg-audio-player">
			<zx-audio
				ref="bgAudioRef"
				:src="bgAudioInfo.src"
				:title="bgAudioInfo.title"
				:coverImgUrl="bgAudioInfo.coverImgUrl"
				:singer="bgAudioInfo.artist"
				:useBackgroundAudio="true"
				@onCanplay="onBgCanplay"
				@onPlay="onBgPlay"
				@onPause="onBgPause"
				@onTimeUpdate="onBgTimeUpdate"
				@onEnded="onBgEnded"
				@onError="onBgError"
			/>
			
			<view class="bg-player-container">
				<image 
					:src="bgAudioInfo.coverImgUrl || defaultCover" 
					class="album-cover"
					mode="aspectFill"
				/>
				
				<view class="bg-player-info">
					<text class="bg-title">{{bgAudioInfo.title}}</text>
					<text class="bg-artist">{{bgAudioInfo.artist}}</text>
				</view>
				
				<view class="bg-progress">
					<text class="time-text">{{formatTime(bgCurrentTime)}}</text>
					<slider 
						class="progress-slider"
						:value="bgProgress" 
						:min="0" 
						:max="100" 
						@change="handleBgProgressChange" 
					/>
					<text class="time-text">{{formatTime(bgDuration)}}</text>
				</view>
				
				<view class="bg-controls">
					<button class="bg-control-btn" @click="playPrev">
						<text class="bg-btn-text">上一首</text>
					</button>
					<button class="bg-control-btn play-btn" @click="handleBgPlayPause">
						<text class="bg-btn-text">{{ bgIsPaused ? '播放' : '暂停' }}</text>
					</button>
					<button class="bg-control-btn" @click="playNext">
						<text class="bg-btn-text">下一首</text>
					</button>
				</view>
				
				<view class="bg-playlist">
					<text class="playlist-title">播放列表</text>
					<view class="playlist-items">
						<view 
							v-for="(item, index) in bgPlaylist" 
							:key="index"
							class="playlist-item"
							:class="{ 'active-playlist-item': currentBgIndex === index }"
							@click="changeBgTrack(index)"
						>
							<text class="playlist-item-title">{{item.title}}</text>
							<text class="playlist-item-artist">- {{item.artist}}</text>
						</view>
					</view>
				</view>
				
				<view class="bg-note">
					<text class="note-text">背景音频模式支持后台播放</text>
					<text class="note-text">请在manifest.json中配置相应权限</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import ZxAudio from '@/components/zx-audio/zx-audio.vue';

// 激活的选项卡
const activeTab = ref(0);

// =========== 普通音频模式相关变量 ===========
const audioRef = ref(null);
const isPaused = ref(true);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.8);
const playbackRate = ref(1.0);
const loop = ref(false);
const loading = ref(false);

// 音频曲目列表
const trackList = [
	{
		title: '示例音频1',
		artist: '艺术家1',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
	},
	{
		title: '示例音频2',
		artist: '艺术家2',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
	},
	{
		title: '示例音频3',
		artist: '艺术家3',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3'
	}
];

// 当前播放的音频信息
const audioInfo = reactive({
	title: trackList[0].title,
	artist: trackList[0].artist,
	src: trackList[0].src
});

// =========== 背景音频模式相关变量 ===========
const bgAudioRef = ref(null);
const bgIsPaused = ref(true);
const bgProgress = ref(0);
const bgCurrentTime = ref(0);
const bgDuration = ref(0);
const currentBgIndex = ref(0);
const defaultCover = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-8a36-ebb87efcf8c0.jpg';

// 背景音频播放列表
const bgPlaylist = [
	{
		title: '背景音乐1',
		artist: '歌手1',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
		coverImgUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/a876efc0-4f35-11eb-8a36-ebb87efcf8c0.jpg'
	},
	{
		title: '背景音乐2',
		artist: '歌手2',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
		coverImgUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7c301a20-4f35-11eb-8ff1-d5dcf8779628.jpg'
	},
	{
		title: '背景音乐3',
		artist: '歌手3',
		src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
		coverImgUrl: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/412b0030-4f35-11eb-8ff1-d5dcf8779628.jpg'
	}
];

// 当前背景音频信息
const bgAudioInfo = reactive({
	title: bgPlaylist[0].title,
	artist: bgPlaylist[0].artist,
	src: bgPlaylist[0].src,
	coverImgUrl: bgPlaylist[0].coverImgUrl
});

// 组件挂载
onMounted(() => {
	// 初始化音频
	if(audioRef.value) {
		setTimeout(() => {
			audioRef.value.change();
		}, 300);
	}
});

// 组件卸载前
onUnmounted(() => {
	// 销毁音频实例
	if(audioRef.value) {
		audioRef.value.destroy();
	}
	
	// 停止背景音频
	if(bgAudioRef.value) {
		bgAudioRef.value.stop();
	}
});

// 监听选项卡切换
watch(activeTab, (newValue) => {
	if(newValue === 0) {
		// 切换到普通音频模式
		if(bgAudioRef.value) {
			bgAudioRef.value.pause();
		}
	} else {
		// 切换到背景音频模式
		if(audioRef.value) {
			audioRef.value.pause();
		}
	}
});

// =========== 普通音频事件处理 ===========
const onCanplay = (dur) => {
	duration.value = dur || 0;
	loading.value = false;
};

const onPlay = () => {
	isPaused.value = false;
};

const onPause = () => {
	isPaused.value = true;
};

const onTimeUpdate = (data) => {
	currentTime.value = data.currentTime || 0;
	duration.value = data.duration || 0;
	progress.value = data.progress || 0;
};

const onEnded = () => {
	isPaused.value = true;
	if(!loop.value) {
		progress.value = 0;
		currentTime.value = 0;
	}
};

const onError = (err) => {
	uni.showToast({
		title: '音频播放出错',
		icon: 'none'
	});
	console.error('音频播放错误', err);
	loading.value = false;
};

const onLoading = (status) => {
	loading.value = status;
};

// 播放/暂停
const handlePlayPause = () => {
	if(isPaused.value) {
		audioRef.value.play();
	} else {
		audioRef.value.pause();
	}
};

// 停止播放
const handleStop = () => {
	audioRef.value.stop();
	isPaused.value = true;
	progress.value = 0;
	currentTime.value = 0;
};

// 进度条改变
const handleProgressChange = (e) => {
	const value = e.detail.value;
	audioRef.value.setProgress(value);
	loading.value = true;
};

// 音量改变
const handleVolumeChange = (e) => {
	const value = e.detail.value / 100;
	volume.value = value;
	audioRef.value.setVolume(value);
};

// 播放速率改变
const handleRateChange = (e) => {
	const value = e.detail.value / 50;
	playbackRate.value = parseFloat(value.toFixed(1));
};

// 循环播放切换
const handleLoop = () => {
	loop.value = !loop.value;
};

// 切换音频
const changeTrack = (track) => {
	Object.assign(audioInfo, track);
	isPaused.value = true;
	progress.value = 0;
	currentTime.value = 0;
	duration.value = 0;
	loading.value = true;
	
	setTimeout(() => {
		audioRef.value.change();
		audioRef.value.play();
	}, 300);
};

// =========== 背景音频事件处理 ===========
const onBgCanplay = (dur) => {
	bgDuration.value = dur || 0;
};

const onBgPlay = () => {
	bgIsPaused.value = false;
};

const onBgPause = () => {
	bgIsPaused.value = true;
};

const onBgTimeUpdate = (data) => {
	bgCurrentTime.value = data.currentTime || 0;
	bgDuration.value = data.duration || 0;
	bgProgress.value = data.progress || 0;
};

const onBgEnded = () => {
	playNext();
};

const onBgError = (err) => {
	uni.showToast({
		title: '背景音频播放出错',
		icon: 'none'
	});
	console.error('背景音频播放错误', err);
};

// 背景音频播放/暂停
const handleBgPlayPause = () => {
	if(bgIsPaused.value) {
		bgAudioRef.value.play();
	} else {
		bgAudioRef.value.pause();
	}
};

// 背景音频进度条改变
const handleBgProgressChange = (e) => {
	const value = e.detail.value;
	bgAudioRef.value.setProgress(value);
};

// 播放上一首
const playPrev = () => {
	currentBgIndex.value = (currentBgIndex.value - 1 + bgPlaylist.length) % bgPlaylist.length;
	changeBgTrack(currentBgIndex.value);
};

// 播放下一首
const playNext = () => {
	currentBgIndex.value = (currentBgIndex.value + 1) % bgPlaylist.length;
	changeBgTrack(currentBgIndex.value);
};

// 切换背景音频
const changeBgTrack = (index) => {
	if(typeof index === 'number') {
		currentBgIndex.value = index;
	}
	
	const track = bgPlaylist[currentBgIndex.value];
	Object.assign(bgAudioInfo, track);
	
	setTimeout(() => {
		bgAudioRef.value.change();
		bgAudioRef.value.play();
	}, 300);
};

// =========== 公共方法 ===========
// 切换选项卡
const switchTab = (index) => {
	activeTab.value = index;
};

// 格式化时间
const formatTime = (time) => {
	if (!time) return '00:00';
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
</script>

<style>
.container {
	padding: 20rpx;
}

.page-header {
	margin-bottom: 30rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
}

.tabs {
	display: flex;
	margin-bottom: 30rpx;
	border-bottom: 1px solid #eee;
}

.tab-item {
	flex: 1;
	text-align: center;
	padding: 20rpx 0;
	font-size: 30rpx;
}

.tab-item.active {
	color: #007AFF;
	border-bottom: 2px solid #007AFF;
}

/* 普通音频播放器样式 */
.audio-player {
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 30rpx;
	position: relative;
}

.audio-info {
	margin-bottom: 30rpx;
	text-align: center;
}

.audio-title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.audio-artist {
	font-size: 28rpx;
	color: #666;
}

.player-controls {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
}

.progress-container {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.time-text {
	font-size: 24rpx;
	color: #666;
	min-width: 80rpx;
}

.progress-slider {
	flex: 1;
	margin: 0 10rpx;
}

.control-buttons {
	display: flex;
	justify-content: space-around;
	margin-bottom: 30rpx;
}

.control-btn {
	background-color: #007AFF;
	color: #fff;
	border: none;
	border-radius: 8rpx;
	padding: 10rpx 30rpx;
	font-size: 28rpx;
}

.btn-text {
	color: #fff;
}

.active-text {
	color: #FFFF00;
}

.audio-settings {
	margin-top: 40rpx;
	border-top: 1px solid #eee;
	padding-top: 30rpx;
}

.setting-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.setting-label {
	width: 100rpx;
	font-size: 28rpx;
}

.setting-slider {
	flex: 1;
}

.setting-value {
	width: 80rpx;
	text-align: right;
	font-size: 24rpx;
	color: #666;
}

.track-selector {
	margin-top: 40rpx;
	border-top: 1px solid #eee;
	padding-top: 30rpx;
}

.selector-label {
	font-size: 28rpx;
	margin-bottom: 20rpx;
	display: block;
}

.track-list {
	display: flex;
	flex-direction: column;
}

.track-item {
	padding: 20rpx;
	border-bottom: 1px solid #eee;
}

.track-item:last-child {
	border-bottom: none;
}

.active-track {
	background-color: #f0f9ff;
	border-left: 4rpx solid #007AFF;
}

.track-title {
	font-size: 28rpx;
}

.loading-indicator {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	padding: 20rpx 40rpx;
	border-radius: 8rpx;
	z-index: 100;
}

/* 背景音频播放器样式 */
.bg-audio-player {
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 30rpx;
}

.bg-player-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.album-cover {
	width: 300rpx;
	height: 300rpx;
	border-radius: 150rpx;
	margin-bottom: 40rpx;
	box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
}

.bg-player-info {
	text-align: center;
	margin-bottom: 30rpx;
}

.bg-title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.bg-artist {
	font-size: 28rpx;
	color: #666;
}

.bg-progress {
	display: flex;
	align-items: center;
	width: 100%;
	margin-bottom: 40rpx;
}

.bg-controls {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 40rpx;
}

.bg-control-btn {
	margin: 0 20rpx;
	background-color: #007AFF;
	color: #fff;
	border: none;
	border-radius: 8rpx;
	padding: 10rpx 30rpx;
}

.play-btn {
	width: 160rpx;
}

.bg-btn-text {
	color: #fff;
	font-size: 28rpx;
}

.bg-playlist {
	width: 100%;
	margin-top: 40rpx;
	border-top: 1px solid #eee;
	padding-top: 30rpx;
}

.playlist-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	display: block;
}

.playlist-items {
	background-color: #fff;
	border-radius: 12rpx;
}

.playlist-item {
	padding: 20rpx;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
}

.playlist-item:last-child {
	border-bottom: none;
}

.active-playlist-item {
	background-color: #f0f9ff;
	border-left: 4rpx solid #007AFF;
}

.playlist-item-title {
	font-size: 28rpx;
	margin-right: 10rpx;
}

.playlist-item-artist {
	font-size: 24rpx;
	color: #666;
}

.bg-note {
	margin-top: 30rpx;
	padding: 20rpx;
	background-color: #fff8e1;
	border-left: 4rpx solid #ffc107;
	border-radius: 8rpx;
}

.note-text {
	font-size: 24rpx;
	color: #795548;
	display: block;
	line-height: 1.6;
}
</style>
