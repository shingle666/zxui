<template>
  <view class="zx-live-pusher-container">
    <live-pusher
      id="zxLivePusher"
      ref="livePusher"
      class="live-pusher"
      :url="url"
      :mode="mode"
      :aspect="aspect"
      :muted="muted"
      :enable-camera="enableCamera"
      :auto-focus="autoFocus"
      :beauty="beauty"
      :whiteness="whiteness"
      :orientation="orientation"
      :min-bitrate="minBitrate"
      :max-bitrate="maxBitrate"
      :audio-quality="audioQuality"
      :waiting-image="waitingImage"
      :waiting-image-hash="waitingImageHash"
      :zoom="zoom"
      :device-position="devicePosition"
      :background-mute="backgroundMute"
      :remote-mirror="remoteMirror"
      :local-mirror="localMirror"
      :audio-reverb-type="audioReverbType"
      :audio-volume-type="audioVolumeType"
      :enable-mic="enableMic"
      :enable-agc="enableAgc"
      :enable-ans="enableAns"
      :audio-volume-type-speaker="audioVolumeTypeSpeaker"
      @statechange="onStateChange"
      @netstatus="onNetStatus"
      @error="onError"
    >
      <slot></slot>
    </live-pusher>

    <view v-if="showControls" class="zx-controls">
      <view class="zx-controls-row">
        <button class="zx-btn" @click="startPush">开始推流</button>
        <button class="zx-btn" @click="stopPush">停止推流</button>
        <button class="zx-btn" @click="pausePush">暂停推流</button>
        <button class="zx-btn" @click="resumePush">恢复推流</button>
      </view>
      <view class="zx-controls-row">
        <button class="zx-btn" @click="startPreview">开启预览</button>
        <button class="zx-btn" @click="stopPreview">关闭预览</button>
        <button class="zx-btn" @click="switchCamera">切换摄像头</button>
        <button class="zx-btn" @click="snapshot">截图</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'zx-live-pusher',
  props: {
    url: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'SD',
      validator: value => ['SD', 'HD', 'FHD'].includes(value)
    },
    aspect: {
      type: String,
      default: '9:16'
    },
    muted: {
      type: Boolean,
      default: false
    },
    enableCamera: {
      type: Boolean,
      default: true
    },
    autoFocus: {
      type: Boolean,
      default: true
    },
    beauty: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 9
    },
    whiteness: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 9
    },
    orientation: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    },
    minBitrate: {
      type: Number,
      default: 200
    },
    maxBitrate: {
      type: Number,
      default: 1000
    },
    audioQuality: {
      type: String,
      default: 'high',
      validator: value => ['high', 'low'].includes(value)
    },
    waitingImage: {
      type: String,
      default: ''
    },
    waitingImageHash: {
      type: String,
      default: ''
    },
    zoom: {
      type: Boolean,
      default: false
    },
    devicePosition: {
      type: String,
      default: 'front',
      validator: value => ['front', 'back'].includes(value)
    },
    backgroundMute: {
      type: Boolean,
      default: false
    },
    remoteMirror: {
      type: Boolean,
      default: false
    },
    localMirror: {
      type: String,
      default: 'auto',
      validator: value => ['auto', 'enable', 'disable'].includes(value)
    },
    audioReverbType: {
      type: Number,
      default: 0,
      validator: value => [0, 1, 2, 3, 4, 5, 6, 7].includes(value)
    },
    audioVolumeType: {
      type: String,
      default: 'voicecall',
      validator: value => ['media', 'voicecall'].includes(value)
    },
    enableMic: {
      type: Boolean,
      default: true
    },
    enableAgc: {
      type: Boolean,
      default: false
    },
    enableAns: {
      type: Boolean,
      default: false
    },
    audioVolumeTypeSpeaker: {
      type: Boolean,
      default: false
    },
    showControls: {
      type: Boolean,
      default: false
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    autoPreview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      context: null,
      isPushing: false,
      isPreviewing: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.context = uni.createLivePusherContext('zxLivePusher', this);
      
      if (this.autoPreview) {
        this.startPreview();
      }
      
      if (this.autoStart && this.url) {
        this.startPush();
      }
    });
  },
  beforeDestroy() {
    if (this.isPushing) {
      this.stopPush();
    }
    if (this.isPreviewing) {
      this.stopPreview();
    }
  },
  methods: {
    // 状态变化事件
    onStateChange(e) {
      this.$emit('statechange', e);
      
      const detail = e.detail || {};
      if (detail.code === 1007) {
        this.isPushing = true;
      } else if (detail.code === 1008) {
        this.isPushing = false;
      }
    },
    
    // 网络状态事件
    onNetStatus(e) {
      this.$emit('netstatus', e);
    },
    
    // 错误事件
    onError(e) {
      this.$emit('error', e);
    },
    
    // 开始推流
    startPush() {
      if (!this.url) {
        uni.showToast({
          title: '推流地址不能为空',
          icon: 'none'
        });
        return;
      }
      
      return new Promise((resolve, reject) => {
        this.context.start({
          success: (res) => {
            this.isPushing = true;
            this.$emit('started', res);
            resolve(res);
          },
          fail: (err) => {
            this.$emit('failed', err);
            reject(err);
          }
        });
      });
    },
    
    // 停止推流
    stopPush() {
      return new Promise((resolve, reject) => {
        this.context.stop({
          success: (res) => {
            this.isPushing = false;
            this.$emit('stopped', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 暂停推流
    pausePush() {
      return new Promise((resolve, reject) => {
        this.context.pause({
          success: (res) => {
            this.$emit('paused', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 恢复推流
    resumePush() {
      return new Promise((resolve, reject) => {
        this.context.resume({
          success: (res) => {
            this.$emit('resumed', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 开启预览
    startPreview() {
      return new Promise((resolve, reject) => {
        this.context.startPreview({
          success: (res) => {
            this.isPreviewing = true;
            this.$emit('previewStarted', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 关闭预览
    stopPreview() {
      return new Promise((resolve, reject) => {
        this.context.stopPreview({
          success: (res) => {
            this.isPreviewing = false;
            this.$emit('previewStopped', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 切换摄像头
    switchCamera() {
      return new Promise((resolve, reject) => {
        this.context.switchCamera({
          success: (res) => {
            this.$emit('cameraSwitched', res);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 截图
    snapshot() {
      return new Promise((resolve, reject) => {
        this.context.snapshot({
          success: (res) => {
            this.$emit('snapshotTaken', {
              tempImagePath: res.tempImagePath
            });
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    
    // 获取推流上下文
    getContext() {
      return this.context;
    }
  }
}
</script>

<style lang="scss">
.zx-live-pusher-container {
  position: relative;
  width: 100%;
  height: 100%;
  
  .live-pusher {
    width: 100%;
    height: 100%;
  }
  
  .zx-controls {
    position: absolute;
    bottom: 20rpx;
    left: 0;
    right: 0;
    padding: 0 20rpx;
    
    .zx-controls-row {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 20rpx;
      
      .zx-btn {
        font-size: 24rpx;
        padding: 10rpx 20rpx;
        background-color: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        border-radius: 10rpx;
      }
    }
  }
}
</style>
