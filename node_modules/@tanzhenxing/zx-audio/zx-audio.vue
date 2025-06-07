<template>
	<view class="zx-audio-container">
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted, watch, onBeforeUnmount } from 'vue';
const { proxy } = getCurrentInstance();

// 获取音频上下文
const audioContext = uni.createInnerAudioContext();

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	startTime: {
		type: Number,
		default: 0
	},
	autoplay: {
		type: Boolean,
		default: false
	},
	loop: {
		type: Boolean,
		default: false
	},
	obeyMuteSwitch: {
		type: Boolean,
		default: true
	},
	volume: {
		type: Number,
		default: 0.8
	},
	// "ambient" - 不中止其他声音播放，不能后台播放，静音后无声音； 
	// "soloAmbient" - 中止其他声音播放，不能后台播放，静音后无声音； 
	// "playback" - 中止其他声音，可以后台播放，静音后有声音。
	sessionCategory: {
		type: String,
		default: 'playback'
	},
	playbackRate: {
		type: Number,
		default: 1.0
	},
	// 新增属性
	title: {
		type: String,
		default: ''
	},
	coverImgUrl: {
		type: String,
		default: ''
	},
	singer: {
		type: String,
		default: ''
	},
	// 是否使用背景音频模式（允许后台播放）
	useBackgroundAudio: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits([
	'onCanplay', 
	'onPlay', 
	'onPause', 
	'onStop', 
	'onEnded', 
	'onTimeUpdate', 
	'onError', 
	'onWaiting', 
	'onSeeking', 
	'onSeeked',
	'onLoading'
]);

const audioData = ref({
	duration: 0,
	currentTime: 0,
	progress: 0,
	paused: true,
	buffered: 0,
	loading: false
});

// 背景音频管理器
let backgroundAudioManager = null;

// 获取活跃的音频上下文
const getActiveAudio = () => {
	return props.useBackgroundAudio ? backgroundAudioManager : audioContext;
};

onMounted(() => {
	// 如果使用背景音频，初始化背景音频管理器
	if (props.useBackgroundAudio) {
		backgroundAudioManager = uni.getBackgroundAudioManager();
		initBackgroundAudioEvents();
	}
	
	// 初始化音频事件
	initAudioEvents();
	
	// 设置音频配置
	setConfig();
	
	// 是否自动播放
	if (props.autoplay && props.src) {
		change();
	}
});

onBeforeUnmount(() => {
	// 组件销毁前释放资源
	destroy();
});

// 监听源地址变化
watch(
	() => props.src,
	(newVal, oldVal) => {
		if (newVal && newVal !== oldVal) {
			change();
		}
	}
);

// 监听音量变化
watch(
	() => props.volume,
	(newVal) => {
		if (!props.useBackgroundAudio) {
			audioContext.volume = newVal;
		}
	}
);

// 监听播放速率变化
watch(
	() => props.playbackRate,
	(newVal) => {
		const activeAudio = getActiveAudio();
		if (activeAudio && activeAudio.playbackRate !== undefined) {
			activeAudio.playbackRate = newVal;
		}
	}
);

// 初始化普通音频事件监听
const initAudioEvents = () => {
	audioContext.onCanplay(() => {
		emit('onCanplay', audioContext.duration);
	});

	audioContext.onPlay(() => {
		audioData.value.paused = false;
		emit('onPlay');
	});

	audioContext.onWaiting(() => {
		audioData.value.loading = true;
		emit('onWaiting');
		emit('onLoading', true);
	});

	audioContext.onTimeUpdate(() => {
		audioData.value.duration = audioContext.duration;
		audioData.value.currentTime = audioContext.currentTime;
		audioData.value.progress = parseInt((audioData.value.currentTime / audioData.value.duration) * 100);
		
		// 计算缓冲进度
		if (audioContext.buffered) {
			audioData.value.buffered = (audioContext.buffered / audioData.value.duration) * 100;
		}
		
		audioData.value.loading = false;
		emit('onTimeUpdate', audioData.value);
		emit('onLoading', false);
	});

	audioContext.onSeeking(() => {
		audioData.value.loading = true;
		emit('onSeeking');
		emit('onLoading', true);
	});

	audioContext.onSeeked(() => {
		audioData.value.loading = false;
		emit('onSeeked');
		emit('onLoading', false);
	});

	audioContext.onPause(() => {
		audioData.value.paused = true;
		emit('onPause');
	});

	audioContext.onStop(() => {
		audioData.value.paused = true;
		emit('onStop');
	});

	audioContext.onEnded(() => {
		audioData.value.paused = true;
		emit('onEnded');
	});

	audioContext.onError((e) => {
		audioData.value.paused = true;
		console.error('Audio error:', e);
		emit('onError', e);
	});
};

// 初始化背景音频事件监听
const initBackgroundAudioEvents = () => {
	if (!backgroundAudioManager) return;
	
	backgroundAudioManager.onCanplay(() => {
		emit('onCanplay', backgroundAudioManager.duration);
	});
	
	backgroundAudioManager.onPlay(() => {
		audioData.value.paused = false;
		emit('onPlay');
	});
	
	backgroundAudioManager.onTimeUpdate(() => {
		audioData.value.duration = backgroundAudioManager.duration;
		audioData.value.currentTime = backgroundAudioManager.currentTime;
		audioData.value.progress = parseInt((audioData.value.currentTime / audioData.value.duration) * 100);
		emit('onTimeUpdate', audioData.value);
	});
	
	backgroundAudioManager.onPause(() => {
		audioData.value.paused = true;
		emit('onPause');
	});
	
	backgroundAudioManager.onStop(() => {
		audioData.value.paused = true;
		emit('onStop');
	});
	
	backgroundAudioManager.onEnded(() => {
		audioData.value.paused = true;
		emit('onEnded');
	});
	
	backgroundAudioManager.onError((e) => {
		audioData.value.paused = true;
		console.error('Background audio error:', e);
		emit('onError', e);
	});
	
	backgroundAudioManager.onWaiting(() => {
		audioData.value.loading = true;
		emit('onWaiting');
		emit('onLoading', true);
	});
	
	backgroundAudioManager.onNext(() => {
		emit('onNext');
	});
	
	backgroundAudioManager.onPrev(() => {
		emit('onPrev');
	});
};

const change = () => {
	if (!props.src) return;
	
	if (props.useBackgroundAudio && backgroundAudioManager) {
		// 配置背景音频
		backgroundAudioManager.title = props.title || '未知音频';
		backgroundAudioManager.epname = props.title || '未知音频';
		backgroundAudioManager.singer = props.singer || '未知歌手';
		backgroundAudioManager.coverImgUrl = props.coverImgUrl || '';
		backgroundAudioManager.src = props.src;
	} else {
		// 配置普通音频
		audioContext.src = props.src;
	}
};

// 设置属性
const setConfig = () => {
	if (props.useBackgroundAudio && backgroundAudioManager) {
		// 背景音频配置受限，只能设置部分属性
		if (props.playbackRate && backgroundAudioManager.playbackRate !== undefined) {
			backgroundAudioManager.playbackRate = props.playbackRate;
		}
	} else {
		// 普通音频配置
		audioContext.startTime = props.startTime;
		audioContext.autoplay = props.autoplay;
		audioContext.loop = props.loop;
		audioContext.obeyMuteSwitch = props.obeyMuteSwitch;
		audioContext.volume = props.volume;
		
		// 有些平台可能不支持这些属性
		if (audioContext.sessionCategory !== undefined) {
			audioContext.sessionCategory = props.sessionCategory;
		}
		
		if (audioContext.playbackRate !== undefined) {
			audioContext.playbackRate = props.playbackRate;
		}
	}
};

// 开始播放
const play = () => {
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	setTimeout(() => {
		try {
			activeAudio.play();
			audioData.value.paused = false;
		} catch (error) {
			console.error('播放失败:', error);
			emit('onError', error);
		}
	}, 300);
};

// 暂停播放
const pause = () => {
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	try {
		activeAudio.pause();
		audioData.value.paused = true;
	} catch (error) {
		console.error('暂停失败:', error);
		emit('onError', error);
	}
};

// 停止播放
const stop = () => {
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	try {
		activeAudio.stop();
		audioData.value.paused = true;
	} catch (error) {
		console.error('停止失败:', error);
		emit('onError', error);
	}
};

// 跳转到指定时间
const seek = (time) => {
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	try {
		activeAudio.seek(time);
	} catch (error) {
		console.error('跳转失败:', error);
		emit('onError', error);
	}
};

// 销毁音频实例
const destroy = () => {
	try {
		if (audioContext) {
			audioContext.destroy();
		}
	} catch (error) {
		console.error('销毁失败:', error);
	}
	
	// 背景音频管理器不能被销毁，只能停止
	if (backgroundAudioManager) {
		try {
			backgroundAudioManager.stop();
		} catch (error) {
			console.error('停止背景音频失败:', error);
		}
	}
};

// 设置进度
const setProgress = (progress) => {
	if (!props.src) return;
	
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	try {
		audioData.value.progress = progress;
		const duration = audioData.value.duration || 0;
		const time = Math.round((duration * progress) / 100);
		
		setTimeout(() => {
			activeAudio.seek(time);
			activeAudio.play();
			audioData.value.paused = false;
		});
	} catch (error) {
		console.error('设置进度失败:', error);
		emit('onError', error);
	}
};

// 切换播放状态
const togglePlay = () => {
	if (audioData.value.paused) {
		play();
	} else {
		pause();
	}
};

// 获取当前音频数据
const getAudioData = () => {
	return audioData.value;
};

// 设置音量
const setVolume = (volume) => {
	if (!props.useBackgroundAudio && audioContext) {
		audioContext.volume = Math.max(0, Math.min(1, volume));
	}
};

// 切换音频源
const setSrc = (src, autoplay = false) => {
	if (!src) return;
	
	const activeAudio = getActiveAudio();
	if (!activeAudio) return;
	
	try {
		if (props.useBackgroundAudio && backgroundAudioManager) {
			backgroundAudioManager.title = props.title || '未知音频';
			backgroundAudioManager.epname = props.title || '未知音频';
			backgroundAudioManager.singer = props.singer || '未知歌手';
			backgroundAudioManager.coverImgUrl = props.coverImgUrl || '';
			backgroundAudioManager.src = src;
		} else {
			audioContext.src = src;
		}
		
		if (autoplay) {
			setTimeout(() => {
				activeAudio.play();
				audioData.value.paused = false;
			}, 300);
		}
	} catch (error) {
		console.error('设置音频源失败:', error);
		emit('onError', error);
	}
};

defineExpose({ 
	play, 
	pause, 
	seek, 
	stop, 
	destroy, 
	change, 
	setProgress, 
	togglePlay, 
	getAudioData, 
	setVolume, 
	setSrc,
	audioData
});
</script>

<style lang="scss" scoped>
.zx-audio-container {
	position: relative;
	width: 100%;
}
</style>
