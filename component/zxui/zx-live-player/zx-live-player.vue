<template>
  <view class="zx-live-player-container">
    <live-player
      :id="id"
      :src="src"
      :mode="mode"
      :autoplay="autoplay"
      :muted="muted"
      :orientation="orientation"
      :object-fit="objectFit"
      :background-mute="backgroundMute"
      :sound-mode="soundMode"
      :min-cache="minCache"
      :max-cache="maxCache"
      :picture-in-picture-mode="pictureInPictureMode"
      @statechange="onStateChange"
      @netstatus="onNetStatus"
      @fullscreenchange="onFullScreenChange"
      @audiovolumenotify="onAudioVolumeNotify"
      @enterpictureinpicture="onEnterPictureInPicture"
      @leavepictureinpicture="onLeavePictureInPicture"
      @error="onError"
      :style="playerStyle"
      class="zx-live-player"
    >
      <slot></slot>
    </live-player>
    <view v-if="showControls" class="zx-live-player-controls">
      <view class="zx-live-player-control-item" @click="handleFullScreen">
        <text class="zx-live-player-control-icon">{{ isFullScreen ? '退出全屏' : '全屏' }}</text>
      </view>
      <view class="zx-live-player-control-item" @click="handleMute">
        <text class="zx-live-player-control-icon">{{ muted ? '取消静音' : '静音' }}</text>
      </view>
      <view class="zx-live-player-control-item" @click="handlePlayPause">
        <text class="zx-live-player-control-icon">{{ isPlaying ? '暂停' : '播放' }}</text>
      </view>
    </view>
    <view v-if="loading" class="zx-live-player-loading">
      <view class="zx-live-player-loading-indicator"></view>
      <text class="zx-live-player-loading-text">加载中...</text>
    </view>
    <view v-if="errorMsg" class="zx-live-player-error">
      <text class="zx-live-player-error-text">{{ errorMsg }}</text>
      <view class="zx-live-player-error-retry" @click="retry">重试</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'zx-live-player',
  props: {
    // 播放器唯一标识
    id: {
      type: String,
      default: 'zx-live-player'
    },
    // 直播地址
    src: {
      type: String,
      default: ''
    },
    // 模式 live（直播）, RTC（实时通话，延迟更低）
    mode: {
      type: String,
      default: 'live',
      validator: (value) => ['live', 'RTC'].includes(value)
    },
    // 自动播放
    autoplay: {
      type: Boolean,
      default: false
    },
    // 是否静音
    muted: {
      type: Boolean,
      default: false
    },
    // 画面方向 vertical（竖直）, horizontal（水平）
    orientation: {
      type: String,
      default: 'vertical',
      validator: (value) => ['vertical', 'horizontal'].includes(value)
    },
    // 填充模式 contain（图像长边填满屏幕，短边区域会被填充黑色）, fillCrop（图像铺满屏幕，超出显示区域的部分将被截掉）
    objectFit: {
      type: String,
      default: 'contain',
      validator: (value) => ['contain', 'fillCrop'].includes(value)
    },
    // 进入后台时是否静音
    backgroundMute: {
      type: Boolean,
      default: false
    },
    // 声音输出方式 speaker（扬声器）, ear（听筒）
    soundMode: {
      type: String,
      default: 'speaker',
      validator: (value) => ['speaker', 'ear'].includes(value)
    },
    // 最小缓冲区，单位s
    minCache: {
      type: Number,
      default: 1
    },
    // 最大缓冲区，单位s
    maxCache: {
      type: Number,
      default: 3
    },
    // 小窗模式
    pictureInPictureMode: {
      type: [String, Array],
      default: ''
    },
    // 宽度
    width: {
      type: [String, Number],
      default: '100%'
    },
    // 高度
    height: {
      type: [String, Number],
      default: '225px'
    },
    // 是否显示控制栏
    showControls: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      context: null,
      isPlaying: false,
      isFullScreen: false,
      loading: false,
      errorMsg: '',
      networkStatus: null
    }
  },
  computed: {
    playerStyle() {
      return `width: ${this.width}; height: ${this.height};`
    }
  },
  watch: {
    src(newVal) {
      if (newVal) {
        this.errorMsg = ''
        if (this.autoplay) {
          this.play()
        }
      }
    }
  },
  mounted() {
    this.initPlayerContext()
  },
  beforeDestroy() {
    this.stop()
  },
  methods: {
    // 初始化播放器上下文
    initPlayerContext() {
      this.context = uni.createLivePlayerContext(this.id, this)
    },
    
    // 播放
    play() {
      if (!this.src) {
        this.errorMsg = '播放地址不能为空'
        return
      }
      
      this.loading = true
      this.errorMsg = ''
      
      if (this.context) {
        this.context.play({
          success: () => {
            this.isPlaying = true
          },
          fail: (err) => {
            this.errorMsg = '播放失败：' + (err.errMsg || '未知错误')
            this.isPlaying = false
          }
        })
      }
    },
    
    // 停止
    stop() {
      if (this.context) {
        this.context.stop({
          success: () => {
            this.isPlaying = false
          }
        })
      }
    },
    
    // 暂停/播放切换
    handlePlayPause() {
      if (this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
    },
    
    // 静音切换
    handleMute() {
      this.$emit('update:muted', !this.muted)
    },
    
    // 全屏切换
    handleFullScreen() {
      if (this.isFullScreen) {
        this.exitFullScreen()
      } else {
        this.requestFullScreen()
      }
    },
    
    // 请求全屏
    requestFullScreen() {
      if (this.context) {
        this.context.requestFullScreen({
          direction: this.orientation === 'vertical' ? 0 : 90,
          success: () => {
            this.isFullScreen = true
          },
          fail: (err) => {
            console.error('全屏失败：', err)
          }
        })
      }
    },
    
    // 退出全屏
    exitFullScreen() {
      if (this.context) {
        this.context.exitFullScreen({
          success: () => {
            this.isFullScreen = false
          },
          fail: (err) => {
            console.error('退出全屏失败：', err)
          }
        })
      }
    },
    
    // 重试
    retry() {
      this.errorMsg = ''
      this.play()
    },
    
    // 播放状态变化事件处理
    onStateChange(e) {
      const code = e.detail.code
      
      // 根据状态码处理不同的状态
      switch(code) {
        case 2001: // 已经连接服务器
          this.loading = true
          break
          
        case 2002: // 已经连接服务器,开始拉流
          this.loading = true
          break
          
        case 2003: // 网络接收到首个视频数据包(IDR)
          this.loading = true
          break
          
        case 2004: // 视频播放开始
          this.loading = false
          this.isPlaying = true
          break
          
        case 2007: // 视频播放Loading
          this.loading = true
          break
          
        case 2006: // 视频播放结束
          this.isPlaying = false
          this.loading = false
          break
          
        case -2301: // 网络断连，且经多次重连抢救无效
          this.errorMsg = '网络连接断开，请检查网络后重试'
          this.isPlaying = false
          this.loading = false
          break
          
        case 2103: // 网络断连, 已启动自动重连
          this.loading = true
          break
      }
      
      this.$emit('statechange', e)
    },
    
    // 网络状态通知
    onNetStatus(e) {
      this.networkStatus = e.detail.info
      this.$emit('netstatus', e)
    },
    
    // 全屏变化事件
    onFullScreenChange(e) {
      this.isFullScreen = e.detail.fullScreen
      this.$emit('fullscreenchange', e)
    },
    
    // 播放音量大小通知
    onAudioVolumeNotify(e) {
      this.$emit('audiovolumenotify', e)
    },
    
    // 播放器进入小窗
    onEnterPictureInPicture(e) {
      this.$emit('enterpictureinpicture', e)
    },
    
    // 播放器退出小窗
    onLeavePictureInPicture(e) {
      this.$emit('leavepictureinpicture', e)
    },
    
    // 错误事件
    onError(e) {
      this.errorMsg = '播放出错：' + (e.detail.errMsg || '未知错误')
      this.isPlaying = false
      this.loading = false
      this.$emit('error', e)
    },
    
    // 暴露给父组件的方法
    // 截图
    snapshot() {
      return new Promise((resolve, reject) => {
        if (this.context) {
          this.context.snapshot({
            success: (res) => {
              resolve(res.tempImagePath)
            },
            fail: (err) => {
              reject(err)
            }
          })
        } else {
          reject(new Error('播放器上下文不存在'))
        }
      })
    },
    
    // 设置音量
    setVolume(volume) {
      if (this.context) {
        volume = Math.max(0, Math.min(1, volume))
        this.context.setVolume({
          volume: volume
        })
      }
    },
    
    // 重新加载
    reload() {
      if (this.context) {
        this.context.stop()
        setTimeout(() => {
          this.play()
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss">
.zx-live-player-container {
  position: relative;
  width: 100%;
  
  .zx-live-player {
    width: 100%;
    height: 225px;
  }
  
  .zx-live-player-controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 10px;
    
    .zx-live-player-control-item {
      margin-left: 15px;
      
      .zx-live-player-control-icon {
        color: #FFFFFF;
        font-size: 14px;
      }
    }
  }
  
  .zx-live-player-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .zx-live-player-loading-indicator {
      width: 30px;
      height: 30px;
      border: 2px solid #FFFFFF;
      border-radius: 50%;
      border-top-color: transparent;
      animation: loading 1s linear infinite;
    }
    
    .zx-live-player-loading-text {
      color: #FFFFFF;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  
  .zx-live-player-error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .zx-live-player-error-text {
      color: #FFFFFF;
      font-size: 14px;
      text-align: center;
      padding: 0 20px;
    }
    
    .zx-live-player-error-retry {
      margin-top: 15px;
      padding: 5px 15px;
      background-color: #FF5A5F;
      color: #FFFFFF;
      font-size: 14px;
      border-radius: 4px;
    }
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
