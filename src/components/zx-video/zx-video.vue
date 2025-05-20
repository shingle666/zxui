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
			@bindcastinginterrupt="onCastingInterRupt"
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
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted } from 'vue';
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
		default: true
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
	// 当视频大小与 video 容器大小不一致时，视频的表现形式, contain 包含,fill 	填充,cover 覆盖
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
	// 是否展示后台音频播放按钮
	showSnapshotButton: {
		type: Boolean,
		default: false
	},
	// 	是否展示后台音频播放按钮
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
	}
});

const videoContext = ref(null);

onMounted(() => {
	videoContext.value = uni.createVideoContext(props.videoId);
});
// 播放视频
const play = () => {
	videoContext.value.play();
};
// 暂停视频
const pause = () => {
	videoContext.value.pause();
};
// 跳转到指定位置, 跳转到的位置，单位 s
const seek = (number) => {
	videoContext.value.seek(number);
};
// 停止视频
const stop = () => {
	videoContext.value.stop();
};
// 设置倍速播放
const playbackRate = (rate) => {
	videoContext.value.playbackRate(rate);
};
// 进入全屏。若有自定义内容需在全屏时展示，需将内容节点放置到 video 节点内。
const requestFullScreen = (direction = 0) => {
	videoContext.value.requestFullScreen({ direction: direction });
};
// 退出全屏
const exitFullScreen = () => {
	videoContext.value.exitFullScreen();
};
// 显示状态栏，仅在iOS全屏下有效
const showStatusBar = () => {
	videoContext.value.showStatusBar();
};
// 隐藏状态栏，仅在iOS全屏下有效
const hideStatusBar = () => {
	videoContext.value.hideStatusBar();
};
// 退出后台音频播放模式
const exitBackgroundPlayback = () => {
	videoContext.value.exitBackgroundPlayback();
};
// 退出投屏。仅支持在 tap 事件回调内调用。
const exitCasting = () => {
	videoContext.value.exitCasting();
};
// 退出小窗，该方法可在任意页面调用
const exitPictureInPicture = async () => {
	return new Promise((resolve, reject) => {
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
// 重连投屏设备。仅支持在 tap 事件回调内调用。
const reconnectCasting = () => {
	videoContext.value.reconnectCasting();
};
// 进入后台音频播放模式
const requestBackgroundPlayback = () => {
	videoContext.value.requestBackgroundPlayback();
};
// 发送弹幕
const sendDanmu = (text, color = '#ffffff') => {
	videoContext.value.sendDanmu({ text: text, color: color });
};
// 开始投屏, 拉起半屏搜索设备。仅支持在 tap 事件回调内调用。
const startCasting = () => {
	videoContext.value.startCasting();
};
// 切换投屏设备。仅支持在 tap 事件回调内调用。
const switchCasting = () => {
	videoContext.value.switchCasting();
};
// 当开始/继续播放时触发play事件
const onPlay = (e) => {
	//console.log('onPlay:'+JSON.stringify(e))
	proxy.$emit('onPlay');
};
// 当暂停播放时触发 pause 事件
const onPause = (e) => {
	//console.log('onPause:'+JSON.stringify(e))
	proxy.$emit('onPause');
};
// 当播放到末尾时触发 ended 事件
const onEnded = (e) => {
	//console.log('onEnded:'+JSON.stringify(e))
	proxy.$emit('onEnded');
};
// 播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
const onTimeUpdate = (e) => {
	//console.log('onTimeUpdate:'+JSON.stringify(e))
	proxy.$emit('onTimeUpdate', e.detail);
};
// 视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction 有效值为 vertical 或 horizontal
const onFullScreenChange = (e) => {
	//console.log('onFullScreenChange:' + JSON.stringify(e));
};
// 视频出现缓冲时触发
const onWaiting = (e) => {
	//console.log('onWaiting:' + JSON.stringify(e));
	proxy.$emit('onWaiting');
};
// 视频播放出错时触发
const onError = (e) => {
	//console.log('onError:' + JSON.stringify(e));
};
// 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比
const onProgress = (e) => {
	//console.log('onProgress:'+JSON.stringify(e))
	proxy.$emit('onProgress', e.detail.buffered);
};
// 视频元数据加载完成时触发。event.detail = {width, height, duration}
const onLoadedMetaData = (e) => {
	//console.log('onLoadedMetaData:'+JSON.stringify(e.detail))
	proxy.$emit('onLoadedMetaData', e.detail);
};
// 切换 controls 显示隐藏时触发。event.detail = {show}
const onControlsToggle = (e) => {
	//console.log('onControlsToggle:' + JSON.stringify(e));
};
// 播放器进入小窗
const onEnterPictureInPicture = (e) => {
	console.log('onEnterPictureInPicture:' + JSON.stringify(e));
};
// 播放器退出小窗
const onLeavePictureInPicture = (e) => {
	console.log('onLeavePictureInPicture:' + JSON.stringify(e));
};
// seek 完成时触发 (position iOS 单位 s, Android 单位 ms)
const onSeekComplete = (e) => {
	console.log('onSeekComplete:' + JSON.stringify(e));
};
// 用户选择投屏设备时触发 detail = { state: "success"/"fail" }
const onCastingUserSelect = (e) => {
	//console.log('onCastingUserSelect:' + JSON.stringify(e));
};
// 投屏成功/失败时触发 detail = { type, state: "success"/"fail" }
const onCastingStateChange = (e) => {
	//console.log('onCastingStateChange:' + JSON.stringify(e));
};
// 投屏被中断时触发
const onCastingInterRupt = (e) => {
	//console.log('onCastingInterRupt:' + JSON.stringify(e));
};

// 拖动进度条结束
const onSeeked = (e) => {
	console.log('onSeeked:' + JSON.stringify(e));
};
// 正在拖动进度条
const onSeeking = (e) => {
	console.log('onSeeking:' + JSON.stringify(e));
};

// 开始加载数据
const onLoadStart = (e) => {
	console.log('onLoadStart:' + JSON.stringify(e));
};
// 视频资源开始加载时触发
const onLoadedData = (e) => {
	console.log('onLoadedData:' + JSON.stringify(e));
};

// 视频播放全屏播放时点击事件
const onFullScreenClick = (e) => {
	console.log('onFullScreenClick:' + JSON.stringify(e));
};

// 获取视频详细信息
const getVideoInfo = async (url) => {
	return new Promise((resolve, reject) => {
		uni.getVideoInfo({
			src: url,
			success: (res) => {
				resolve(res);
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
};

defineExpose({ getVideoInfo, play, pause, seek, stop, playbackRate, requestFullScreen, exitFullScreen, exitPictureInPicture });
</script>

<style scoped>
.zx-video {
}
</style>
