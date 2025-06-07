<template>
	<view class="zx-video">
		<video
			:ref="videoId"
			:id="videoId"
			:style="{ width: width, height: height }"
			:title="title"
			:src="src"
			:poster="poster"
			:duration="duration"
			:initial-time="initialTime"
			:controls="controls"
			:danmu-list="danmuList"
			:danmu-btn="danmuBtn"
			:enable-danmu="enableDanmu"
			:autoplay="autoplay"
			:loop="loop"
			:muted="muted"
			:show-mute-btn="showMuteBtn"
			:page-gesture="pageGesture"
			:direction="direction"
			:show-progress="showProgress"
			:show-fullscreen-btn="showFullscreenBtn"
			:show-play-btn="showPlayBtn"
			:show-center-play-btn="showCenterPlayBtn"
			:enable-progress-gesture="enableProgressGesture"
			:object-fit="objectFit"
			:play-btn-position="playBtnPosition"
			:enable-play-gesture="enablePlayGesture"
			:auto-pause-if-navigate="autoPauseIfNavigate"
			:auto-pause-if-open-native="autoPauseIfOpenNative"
			:vslide-gesture="vslideGesture"
			:vslide-gesture-in-fullscreen="vslideGestureInFullscreen"
			:show-bottom-progress="showBottomProgress"
			:ad-unit-id="adUnitId"
			:poster-for-crawler="posterForCrawler"
			:show-casting-button="showCastingButton"
			:picture-in-picture-mode="pictureInPictureMode"
			:picture-in-picture-show-progress="pictureInPictureShowProgress"
			:picture-in-picture-init-position="pictureInPictureInitPosition"
			:enable-auto-rotation="enableAutoRotation"
			:show-screen-lock-button="showScreenLockButton"
			:show-snapshot-button="showSnapshotButton"
			:show-background-playback-button="showBackgroundPlaybackButton"
			:background-poster="backgroundPoster"
			:referrer-policy="referrerPolicy"
			:is-drm="isDrm"
			:is-live="isLive"
			:provision-url="provisionUrl"
			:certificate-url="certificateUrl"
			:license-url="licenseUrl"
			:preferred-peak-bit-rate="preferredPeakBitRate"
			:codec="codec"
			@bindplay="onPlay"
			@bindpause="onPause"
			@bindended="onEnded"
			@bindtimeupdate="onTimeUpdate"
			@bindfullscreenchange="onFullScreenChange"
			@bindwaiting="onWaiting"
			@binderror="onError"
			@bindprogress="onProgress"
			@bindloadedmetadata="onLoadedMetaData"
			@bindcontrolstoggle="onControlsToggle"
			@bindenterpictureinpicture="onEnterPictureInPicture"
			@bindleavepictureinpicture="onLeavePictureInPicture"
			@bindseekcomplete="onSeekComplete"
			@bindcastinguserselect="onCastingUserSelect"
			@bindcastingstatechange="onCastingStateChange"
			@bindcastinginterrupt="onCastingInterrupt"
			@play="onPlay"
			@pause="onPause"
			@ended="onEnded"
			@timeupdate="onTimeUpdate"
			@progress="onProgress"
			@waiting="onWaiting"
			@loadedmetadata="onLoadedMetaData"
			@loadstart="onLoadStart"
			@loadeddata="onLoadedData"
			@seeked="onSeeked"
			@seeking="onSeeking"
			@fullscreenchange="onFullScreenChange"
			@fullscreenclick="onFullScreenClick"
			@controlstoggle="onControlsToggle"
			@error="onError"
		></video>
		
		<!-- 截图专用canvas，默认隐藏 -->
		<canvas 
			v-show="false"
			:canvas-id="canvasId" 
			:id="canvasId" 
			:style="{ 
				position: 'absolute', 
				left: '-9999px', 
				width: snapshotWidth + 'px', 
				height: snapshotHeight + 'px'
			}"
		></canvas>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, nextTick } from 'vue';
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 视频播放器id
	videoId: {
		type: String,
		default: 'myVideo'
	},
	// 视频宽度
	width: {
		type: String,
		default: '750rpx'
	},
	// 视频高度
	height: {
		type: String,
		default: '420rpx'
	},
	// 必填， 要播放视频的资源地址，支持网络路径、本地临时路径、云文件ID
	src: {
		type: String,
		default: ''
	},
	// 视频的标题，全屏时在顶部展示
	title: {
		type: String,
		default: ''
	},
	// 视频封面的图片网络资源地址或云文件ID。若 controls 属性值为 false 则设置 poster 无效
	poster: {
		type: String,
		default: ''
	},
	// 是否自动播放
	autoplay: {
		type: Boolean,
		default: false
	},
	// 是否循环播放
	loop: {
		type: Boolean,
		default: false
	},
	// 是否静音播放
	muted: {
		type: Boolean,
		default: false
	},
	// 是否显示静音按钮
	showMuteBtn: {
		type: Boolean,
		default: false
	},
	// 指定视频时长
	duration: {
		type: Number,
		default: 0
	},
	// 指定视频初始播放位置
	initialTime: {
		type: Number,
		default: 0
	},
	// 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
	controls: {
		type: Boolean,
		default: true
	},
	// 是否展示弹幕，只在初始化时有效，不能动态变更
	enableDanmu: {
		type: Boolean,
		default: false
	},
	// 弹幕列表
	danmuList: {
		type: [Array, Object],
		default: () => {
			return [];
		}
	},
	// 是否显示弹幕按钮，只在初始化时有效，不能动态变更
	danmuBtn: {
		type: Boolean,
		default: false
	},
	// 在非全屏模式下，是否开启亮度与音量调节手势
	pageGesture: {
		type: Boolean,
		default: false
	},
	// 设置全屏时视频的方向，不指定则根据宽高比自动判断, 0正常竖向, 90屏幕逆时针90度,	-90 屏幕顺时针90度
	direction: {
		type: Number,
		default: 0
	},
	// 是否显示进度条, 若不设置，宽度大于240时才会显示
	showProgress: {
		type: Boolean,
		default: true
	},
	// 是否显示全屏按钮
	showFullscreenBtn: {
		type: Boolean,
		default: true
	},
	// 是否显示视频底部控制栏的播放按钮
	showPlayBtn: {
		type: Boolean,
		default: true
	},
	// 是否显示视频中间的播放按钮
	showCenterPlayBtn: {
		type: Boolean,
		default: true
	},
	// 是否开启控制进度的手势
	enableProgressGesture: {
		type: Boolean,
		default: true
	},
	// 当视频大小与 video 容器大小不一致时，视频的表现形式, contain 包含,fill 填充,cover 覆盖
	objectFit: {
		type: String,
		default: 'contain'
	},
	// 播放按钮的位置, bottom 底部控制条上, center 视频中间
	playBtnPosition: {
		type: String,
		default: 'center'
	},
	// 是否开启播放手势，即双击切换播放/暂停
	enablePlayGesture: {
		type: Boolean,
		default: false
	},
	// 当跳转到本小程序的其他页面时，是否自动暂停本页面的视频播放
	autoPauseIfNavigate: {
		type: Boolean,
		default: true
	},
	// 当跳转到其它微信原生页面时，是否自动暂停本页面的视频
	autoPauseIfOpenNative: {
		type: Boolean,
		default: true
	},
	// 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
	vslideGesture: {
		type: Boolean,
		default: false
	},
	// 在全屏模式下，是否开启亮度与音量调节手势
	vslideGestureInFullscreen: {
		type: Boolean,
		default: true
	},
	// 是否展示底部进度条
	showBottomProgress: {
		type: Boolean,
		default: true
	},
	// 视频前贴广告单元ID
	adUnitId: {
		type: String,
		default: ''
	},
	// 用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址
	posterForCrawler: {
		type: String,
		default: ''
	},
	// 显示投屏按钮。安卓在同层渲染下生效，支持 DLNA 协议；iOS 支持 AirPlay 和 DLNA 协议。可以通过VideoContext的相关方法进行操作。
	showCastingButton: {
		type: Boolean,
		default: false
	},
	// 设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： ["push", "pop"]）
	pictureInPictureMode: {
		type: [String, Array],
		default: () => {
			return ['push', 'pop'];
		}
	},
	// 是否在小窗模式下显示播放进度
	pictureInPictureShowProgress: {
		type: Boolean,
		default: false
	},
	// 小窗模式下小窗的初始显示位置，格式为 (alignment, y)，其中 alignment 表示小窗吸附屏幕左侧还是右侧，可选值为 left、right，y 代表小窗最顶部所在的屏幕高度百分比
	pictureInPictureInitPosition: {
		type: String,
		default: ''
	},
	// 是否开启手机横屏时自动全屏，当系统设置开启自动旋转时生效
	enableAutoRotation: {
		type: Boolean,
		default: true
	},
	// 是否显示锁屏按钮，仅在全屏时显示，锁屏后控制栏的操作
	showScreenLockButton: {
		type: Boolean,
		default: false
	},
	// 是否展示截屏按钮
	showSnapshotButton: {
		type: Boolean,
		default: false
	},
	// 是否展示后台音频播放按钮
	showBackgroundPlaybackButton: {
		type: Boolean,
		default: false
	},
	// 进入后台音频播放后的通知栏图标（Android 独有）
	backgroundPoster: {
		type: String,
		default: ''
	},
	// 格式固定为 https://servicewechat.com/{appid}/{version}/page-frame.html，其中 {appid} 为小程序的 appid，{version} 为小程序的版本号，版本号为 0 表示为开发版、体验版以及审核版本，版本号为 devtools 表示为开发者工具，其余为正式版本；
	referrerPolicy: {
		type: String,
		default: 'no-referrer'
	},
	// 是否为 DRM 视频源
	isDrm: {
		type: Boolean,
		default: false
	},
	// 是否为直播源
	isLive: {
		type: Boolean,
		default: false
	},
	// DRM 设备身份认证 url，仅 is-drm 为 true 时生效 (Android)
	provisionUrl: {
		type: String,
		default: ''
	},
	// DRM 设备身份认证 url，仅 is-drm 为 true 时生效 (iOS)
	certificateUrl: {
		type: String,
		default: ''
	},
	// DRM 获取加密信息 url，仅 is-drm 为 true 时生效
	licenseUrl: {
		type: String,
		default: ''
	},
	// 指定码率上限，单位为比特每秒
	preferredPeakBitRate: {
		type: Number,
		default: 6000
	},
	// 解码器选择，hardware：硬解码（硬件解码），software：软解码（软件解码），auto：自动选择
	codec: {
		type: String,
		default: 'auto'
	}
});

const emits = defineEmits([
	'onPlay',
	'onPause',
	'onEnded',
	'onTimeUpdate',
	'onFullScreenChange',
	'onWaiting',
	'onError',
	'onProgress',
	'onLoadedMetaData',
	'onControlsToggle',
	'onEnterPictureInPicture',
	'onLeavePictureInPicture',
	'onSeekComplete',
	'onSeeked',
	'onSeeking',
	'onLoadStart',
	'onLoadedData',
	'onFullScreenClick'
]);

const videoContext = ref(null);

// 截图相关
const canvasId = ref(`${props.videoId}_canvas`);
const snapshotWidth = ref(300);
const snapshotHeight = ref(200);

onMounted(() => {
	nextTick(() => {
		videoContext.value = uni.createVideoContext(props.videoId, proxy);
	});
});

const play = () => {
	videoContext.value && videoContext.value.play();
};

const pause = () => {
	videoContext.value && videoContext.value.pause();
};

const seek = (number) => {
	videoContext.value && videoContext.value.seek(number);
};

const stop = () => {
	videoContext.value && videoContext.value.stop();
};

const playbackRate = (rate) => {
	videoContext.value && videoContext.value.playbackRate(rate);
};

const requestFullScreen = (direction = 0) => {
	videoContext.value && videoContext.value.requestFullScreen({ direction: direction });
};

const exitFullScreen = () => {
	videoContext.value && videoContext.value.exitFullScreen();
};

const showStatusBar = () => {
	videoContext.value && videoContext.value.showStatusBar();
};

const hideStatusBar = () => {
	videoContext.value && videoContext.value.hideStatusBar();
};

const exitBackgroundPlayback = () => {
	videoContext.value && videoContext.value.exitBackgroundPlayback();
};

const exitCasting = () => {
	videoContext.value && videoContext.value.exitCasting();
};

const exitPictureInPicture = async () => {
	return new Promise((resolve, reject) => {
		if (!videoContext.value) return reject(new Error('视频上下文未创建'));
		
		videoContext.value.exitPictureInPicture({
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
};

const reconnectCasting = () => {
	videoContext.value && videoContext.value.reconnectCasting();
};

const requestBackgroundPlayback = () => {
	videoContext.value && videoContext.value.requestBackgroundPlayback();
};

const sendDanmu = (text, color = '#ffffff') => {
	videoContext.value && videoContext.value.sendDanmu({ text: text, color: color });
};

const startCasting = () => {
	videoContext.value && videoContext.value.startCasting();
};

const switchCasting = () => {
	videoContext.value && videoContext.value.switchCasting();
};

const snapshot = async () => {
	return new Promise((resolve, reject) => {
		try {
			if (!videoContext.value) {
				return reject(new Error('视频上下文未创建'));
			}
			
			// 暂停视频以获取清晰的截图
			const isPlaying = !videoContext.value.paused;
			
			if (isPlaying) {
				videoContext.value.pause();
			}
			
			// 延迟一点让视频完全暂停
			setTimeout(() => {
				// 获取视频信息以设置canvas大小
				uni.getVideoInfo({
					src: props.src,
					success: (videoInfo) => {
						// 更新canvas尺寸
						if (videoInfo.width && videoInfo.height) {
							snapshotWidth.value = videoInfo.width;
							snapshotHeight.value = videoInfo.height;
						}
						
						// 确保canvas尺寸已更新
						nextTick(() => {
							// 创建canvas上下文
							const context = uni.createCanvasContext(canvasId.value, proxy);
							
							// 将视频当前帧绘制到canvas上
							context.drawImage(props.videoId, 0, 0, snapshotWidth.value, snapshotHeight.value);
							context.draw(false, () => {
								// 导出图片
								uni.canvasToTempFilePath({
									canvasId: canvasId.value,
									x: 0,
									y: 0,
									width: snapshotWidth.value,
									height: snapshotHeight.value,
									destWidth: snapshotWidth.value,
									destHeight: snapshotHeight.value,
									quality: 1,
									success: (res) => {
										// 如果之前是播放状态，则恢复播放
										if (isPlaying) {
											videoContext.value.play();
										}
										resolve(res.tempFilePath);
									},
									fail: (err) => {
										// 如果之前是播放状态，则恢复播放
										if (isPlaying) {
											videoContext.value.play();
										}
										reject(err);
									}
								}, proxy);
							});
						});
					},
					fail: (err) => {
						// 获取视频信息失败，使用默认尺寸
						const context = uni.createCanvasContext(canvasId.value, proxy);
						
						context.drawImage(props.videoId, 0, 0, snapshotWidth.value, snapshotHeight.value);
						context.draw(false, () => {
							uni.canvasToTempFilePath({
								canvasId: canvasId.value,
								success: (res) => {
									// 如果之前是播放状态，则恢复播放
									if (isPlaying) {
										videoContext.value.play();
									}
									resolve(res.tempFilePath);
								},
								fail: (error) => {
									// 如果之前是播放状态，则恢复播放
									if (isPlaying) {
										videoContext.value.play();
									}
									reject(error);
								}
							}, proxy);
						});
					}
				});
			}, 100);
		} catch (err) {
			reject(err);
		}
	});
};

const onPlay = (e) => {
	emits('onPlay', e);
};

const onPause = (e) => {
	emits('onPause', e);
};

const onEnded = (e) => {
	emits('onEnded', e);
};

const onTimeUpdate = (e) => {
	emits('onTimeUpdate', e.detail);
};

const onFullScreenChange = (e) => {
	emits('onFullScreenChange', e.detail);
};

const onWaiting = (e) => {
	emits('onWaiting', e);
};

const onError = (e) => {
	emits('onError', e);
};

const onProgress = (e) => {
	emits('onProgress', e.detail ? e.detail.buffered : e);
};

const onLoadedMetaData = (e) => {
	emits('onLoadedMetaData', e.detail);
};

const onControlsToggle = (e) => {
	emits('onControlsToggle', e.detail);
};

const onEnterPictureInPicture = (e) => {
	emits('onEnterPictureInPicture', e);
};

const onLeavePictureInPicture = (e) => {
	emits('onLeavePictureInPicture', e);
};

const onSeekComplete = (e) => {
	emits('onSeekComplete', e);
};

const onCastingUserSelect = (e) => {
	emits('onCastingUserSelect', e);
};

const onCastingStateChange = (e) => {
	emits('onCastingStateChange', e);
};

const onCastingInterrupt = (e) => {
	emits('onCastingInterrupt', e);
};

const onSeeked = (e) => {
	emits('onSeeked', e);
};

const onSeeking = (e) => {
	emits('onSeeking', e);
};

const onLoadStart = (e) => {
	emits('onLoadStart', e);
};

const onLoadedData = (e) => {
	emits('onLoadedData', e);
};

const onFullScreenClick = (e) => {
	emits('onFullScreenClick', e);
};

const getVideoInfo = async (url) => {
	return new Promise((resolve, reject) => {
		uni.getVideoInfo({
			src: url || props.src,
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
};

const volume = (value) => {
	if (videoContext.value && typeof videoContext.value.volume === 'function') {
		videoContext.value.volume(value);
	}
};

defineExpose({
	getVideoInfo,
	play,
	pause,
	seek,
	stop,
	playbackRate,
	requestFullScreen,
	exitFullScreen,
	exitPictureInPicture,
	sendDanmu,
	showStatusBar,
	hideStatusBar,
	startCasting,
	switchCasting,
	exitCasting,
	reconnectCasting,
	requestBackgroundPlayback,
	exitBackgroundPlayback,
	snapshot,
	volume,
	getVideoContext: () => videoContext.value
});
</script>

<style scoped>
.zx-video {
	width: 100%;
	position: relative;
}
</style>
