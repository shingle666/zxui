<template>
  <view class="player-container">
    <view class="section-title">基本用法</view>
    <zx-live-player
      id="basic-player"
      :src="liveUrl"
      :autoplay="true"
      @statechange="onStateChange"
      @error="onError"
    ></zx-live-player>
    
    <view class="section-title">进阶配置</view>
    <zx-live-player
      id="advanced-player"
      :src="liveUrl"
      :mode="playerOptions.mode"
      :autoplay="playerOptions.autoplay"
      :muted="playerOptions.muted"
      :object-fit="playerOptions.objectFit"
      :orientation="playerOptions.orientation"
      :width="playerOptions.width"
      :height="playerOptions.height"
      :show-controls="playerOptions.showControls"
      @statechange="onAdvancedStateChange"
      @netstatus="onNetStatus"
      @fullscreenchange="onFullScreenChange"
      ref="advancedPlayer"
    ></zx-live-player>
    
    <view class="control-panel">
      <view class="control-group">
        <view class="control-title">播放控制</view>
        <view class="button-group">
          <button @click="playVideo" type="primary" size="mini">播放</button>
          <button @click="stopVideo" type="warn" size="mini">停止</button>
          <button @click="reloadVideo" type="default" size="mini">重新加载</button>
        </view>
      </view>
      
      <view class="control-group">
        <view class="control-title">填充模式</view>
        <view class="button-group">
          <button 
            @click="changeObjectFit('contain')" 
            :type="playerOptions.objectFit === 'contain' ? 'primary' : 'default'"
            size="mini"
          >包含</button>
          <button 
            @click="changeObjectFit('fillCrop')" 
            :type="playerOptions.objectFit === 'fillCrop' ? 'primary' : 'default'"
            size="mini"
          >裁剪</button>
        </view>
      </view>
      
      <view class="control-group">
        <view class="control-title">静音控制</view>
        <switch :checked="playerOptions.muted" @change="toggleMute" />
      </view>
      
      <view class="control-group">
        <view class="control-title">控制栏显示</view>
        <switch :checked="playerOptions.showControls" @change="toggleControls" />
      </view>
      
      <view class="control-group">
        <view class="control-title">高级功能</view>
        <view class="button-group">
          <button @click="takeSnapshot" type="primary" size="mini">截图</button>
          <button @click="toggleOrientation" type="default" size="mini">
            切换方向 ({{ playerOptions.orientation === 'vertical' ? '竖直' : '水平' }})
          </button>
        </view>
      </view>
    </view>
    
    <view class="status-panel">
      <view class="status-title">播放器状态</view>
      <view class="status-item">
        <text class="status-label">播放状态:</text>
        <text class="status-value">{{ playerStatus }}</text>
      </view>
      <view class="status-item">
        <text class="status-label">网络状态:</text>
        <text class="status-value">{{ networkStatusText }}</text>
      </view>
      <view v-if="snapshotPath" class="snapshot-preview">
        <view class="status-title">截图预览</view>
        <image :src="snapshotPath" mode="aspectFit" class="snapshot-image"></image>
      </view>
    </view>
  </view>
</template>

<script>
import zxLivePlayer from '@/components/zx-live-player/zx-live-player.vue'

export default {
  components: {
    zxLivePlayer
  },
  data() {
    return {
      liveUrl: 'https://domain.example/live/stream.flv', // 替换为实际的直播流地址
      playerOptions: {
        mode: 'live',
        autoplay: false,
        muted: false,
        objectFit: 'contain',
        orientation: 'vertical',
        width: '100%',
        height: '200px',
        showControls: true
      },
      playerStatus: '未播放',
      networkStatus: null,
      snapshotPath: '',
      isFullScreen: false
    }
  },
  computed: {
    networkStatusText() {
      if (!this.networkStatus) return '未知'
      
      return `码率: ${this.networkStatus.videoBitrate}kbps, 帧率: ${this.networkStatus.videoFPS}fps`
    }
  },
  methods: {
    // 基本播放器事件处理
    onStateChange(e) {
      const code = e.detail.code
      
      // 状态码参考 uni.createLivePlayerContext 文档
      switch(code) {
        case 2004: // 视频播放开始
          this.playerStatus = '正在播放'
          break
        case 2006: // 视频播放结束
          this.playerStatus = '播放结束'
          break
        case -2301: // 网络断连，且经多次重连抢救无效
          this.playerStatus = '网络错误'
          break
        default:
          break
      }
    },
    
    onError(e) {
      this.playerStatus = `播放错误: ${e.detail.errMsg || '未知错误'}`
    },
    
    // 高级播放器事件处理
    onAdvancedStateChange(e) {
      this.onStateChange(e)
    },
    
    onNetStatus(e) {
      this.networkStatus = e.detail.info
    },
    
    onFullScreenChange(e) {
      this.isFullScreen = e.detail.fullScreen
    },
    
    // 控制方法
    playVideo() {
      this.$refs.advancedPlayer.play()
    },
    
    stopVideo() {
      this.$refs.advancedPlayer.stop()
      this.playerStatus = '已停止'
    },
    
    reloadVideo() {
      this.$refs.advancedPlayer.reload()
      this.playerStatus = '重新加载中'
    },
    
    changeObjectFit(mode) {
      this.playerOptions.objectFit = mode
    },
    
    toggleMute(e) {
      this.playerOptions.muted = e.detail.value
    },
    
    toggleControls(e) {
      this.playerOptions.showControls = e.detail.value
    },
    
    toggleOrientation() {
      this.playerOptions.orientation = this.playerOptions.orientation === 'vertical' ? 'horizontal' : 'vertical'
    },
    
    takeSnapshot() {
      if (this.$refs.advancedPlayer) {
        this.$refs.advancedPlayer.snapshot()
          .then(path => {
            this.snapshotPath = path
            uni.showToast({
              title: '截图成功',
              icon: 'success'
            })
          })
          .catch(err => {
            uni.showToast({
              title: '截图失败',
              icon: 'error'
            })
            console.error('截图失败:', err)
          })
      }
    }
  }
}
</script>

<style lang="scss">
.player-container {
  padding: 15px;
  
  .section-title {
    font-size: 16px;
    font-weight: bold;
    margin: 15px 0 10px 0;
    color: #333;
  }
  
  .control-panel {
    margin-top: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 10px;
    
    .control-group {
      margin-bottom: 15px;
      
      .control-title {
        font-size: 14px;
        color: #666;
        margin-bottom: 5px;
      }
      
      .button-group {
        display: flex;
        flex-wrap: wrap;
        
        button {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
  
  .status-panel {
    margin-top: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 10px;
    
    .status-title {
      font-size: 14px;
      font-weight: bold;
      color: #666;
      margin-bottom: 10px;
    }
    
    .status-item {
      display: flex;
      margin-bottom: 5px;
      
      .status-label {
        font-size: 13px;
        color: #666;
        width: 80px;
      }
      
      .status-value {
        font-size: 13px;
        color: #333;
        flex: 1;
      }
    }
    
    .snapshot-preview {
      margin-top: 15px;
      
      .snapshot-image {
        width: 100%;
        height: 150px;
        margin-top: 10px;
        background-color: #e0e0e0;
        border-radius: 4px;
      }
    }
  }
}
</style>
