<template>
  <view class="demo-container">
    <view class="title">实时音视频播放组件示例</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <zx-live-player
        id="basic-player"
        :src="liveUrls.rtmp"
        :autoplay="true"
        @statechange="onStateChange"
        @error="onError"
      />
      <view class="status-info">
        <text>播放状态: {{ getStateDesc(playerState) }}</text>
      </view>
    </view>
    
    <!-- 高级用法 -->
    <view class="section">
      <view class="section-title">高级用法</view>
      <zx-live-player
        id="advanced-player"
        :src="currentUrl"
        :autoplay="autoplay"
        :muted="isMuted"
        :orientation="orientation"
        :object-fit="objectFit"
        :show-controls="showControls"
        :width="playerWidth"
        :height="playerHeight"
        @statechange="onAdvancedStateChange"
        @netstatus="onNetStatus"
        @fullscreenchange="onFullScreenChange"
        @error="onAdvancedError"
        ref="advancedPlayer"
      />
      
      <!-- 控制面板 -->
      <view class="control-panel">
        <view class="control-item">
          <text class="label">视频源:</text>
          <picker @change="onSourceChange" :value="currentSourceIndex" :range="sourceLabels">
            <view class="picker-value">{{ sourceLabels[currentSourceIndex] }}</view>
          </picker>
        </view>
        
        <view class="control-item">
          <text class="label">填充模式:</text>
          <picker @change="onFitModeChange" :value="fitModeIndex" :range="['contain', 'fillCrop']">
            <view class="picker-value">{{ objectFit }}</view>
          </picker>
        </view>
        
        <view class="control-row">
          <button class="control-btn" @click="handlePlayPause">{{ isPlaying ? '停止' : '播放' }}</button>
          <button class="control-btn" @click="toggleMute">{{ isMuted ? '取消静音' : '静音' }}</button>
          <button class="control-btn" @click="reload">重新加载</button>
        </view>
        
        <view class="control-row">
          <button class="control-btn" @click="takeSnapshot">截图</button>
          <button class="control-btn" @click="toggleControls">{{ showControls ? '隐藏控制栏' : '显示控制栏' }}</button>
          <button class="control-btn" @click="toggleOrientation">{{ orientation === 'vertical' ? '切换水平' : '切换垂直' }}</button>
        </view>
      </view>
      
      <!-- 网络状态信息 -->
      <view class="network-status" v-if="networkInfo">
        <view class="status-title">网络状态信息</view>
        <view class="status-item" v-if="networkInfo.videoBitrate !== undefined">
          <text class="status-label">视频比特率:</text>
          <text class="status-value">{{ networkInfo.videoBitrate }} kbps</text>
        </view>
        <view class="status-item" v-if="networkInfo.audioBitrate !== undefined">
          <text class="status-label">音频比特率:</text>
          <text class="status-value">{{ networkInfo.audioBitrate }} kbps</text>
        </view>
        <view class="status-item" v-if="networkInfo.videoFPS !== undefined">
          <text class="status-label">视频帧率:</text>
          <text class="status-value">{{ networkInfo.videoFPS }} fps</text>
        </view>
        <view class="status-item" v-if="networkInfo.netSpeed !== undefined">
          <text class="status-label">网络速度:</text>
          <text class="status-value">{{ networkInfo.netSpeed }} KB/s</text>
        </view>
        <view class="status-item" v-if="networkInfo.videoWidth !== undefined && networkInfo.videoHeight !== undefined">
          <text class="status-label">视频分辨率:</text>
          <text class="status-value">{{ networkInfo.videoWidth }}x{{ networkInfo.videoHeight }}</text>
        </view>
      </view>
      
      <!-- 截图预览 -->
      <view class="snapshot-preview" v-if="snapshotPath">
        <view class="preview-title">截图预览</view>
        <image class="snapshot-image" :src="snapshotPath" mode="aspectFit"></image>
      </view>
    </view>
    
    <!-- 状态码说明 -->
    <view class="section">
      <view class="section-title">状态码说明</view>
      <view class="code-list">
        <view class="code-item" v-for="(desc, code) in stateCodeMap" :key="code">
          <text class="code">{{ code }}:</text>
          <text class="desc">{{ desc }}</text>
        </view>
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
      // 直播地址
      liveUrls: {
        rtmp: 'rtmp://ns8.indexforce.com/home/mystream',  // RTMP 测试流
        flv: 'http://flv3948069e.live.126.net/live/1548036109332286876812.flv', // FLV 测试流
        hls: 'http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8'  // HLS 测试流
      },
      currentUrl: 'rtmp://ns8.indexforce.com/home/mystream',
      currentSourceIndex: 0,
      sourceLabels: ['RTMP 测试流', 'FLV 测试流', 'HLS 测试流'],
      
      // 播放状态
      playerState: 0,
      advancedPlayerState: 0,
      isPlaying: false,
      
      // 播放器设置
      autoplay: true,
      isMuted: false,
      orientation: 'vertical',
      objectFit: 'contain',
      fitModeIndex: 0,
      showControls: true,
      playerWidth: '100%',
      playerHeight: '400rpx',
      
      // 网络状态信息
      networkInfo: null,
      
      // 截图路径
      snapshotPath: '',
      
      // 状态码说明
      stateCodeMap: {
        2001: '已经连接服务器',
        2002: '已经连接服务器,开始拉流',
        2003: '网络接收到首个视频数据包(IDR)',
        2004: '视频播放开始',
        2005: '视频播放进度',
        2006: '视频播放结束',
        2007: '视频播放Loading',
        2008: '解码器启动',
        2009: '视频分辨率改变',
        '-2301': '网络断连，且经多次重连抢救无效',
        '-2302': '获取加速拉流地址失败',
        2101: '当前视频帧解码失败',
        2102: '当前音频帧解码失败',
        2103: '网络断连, 已启动自动重连',
        2104: '网络来包不稳：可能是下行带宽不足',
        2105: '当前视频播放出现卡顿',
        2106: '硬解启动失败，采用软解',
        2107: '当前视频帧不连续，可能丢帧',
        2108: '当前流硬解第一个I帧失败，SDK自动切软解'
      }
    }
  },
  methods: {
    // 基础播放器状态变化处理
    onStateChange(e) {
      console.log('基础播放器状态变化:', e.detail.code)
      this.playerState = e.detail.code
      
      if (e.detail.code === 2004) {
        uni.showToast({
          title: '视频开始播放',
          icon: 'none'
        })
      }
    },
    
    // 高级播放器状态变化处理
    onAdvancedStateChange(e) {
      console.log('高级播放器状态变化:', e.detail.code)
      this.advancedPlayerState = e.detail.code
      
      // 更新播放状态
      if (e.detail.code === 2004) {
        this.isPlaying = true
      } else if (e.detail.code === 2006) {
        this.isPlaying = false
      }
    },
    
    // 网络状态通知
    onNetStatus(e) {
      console.log('网络状态:', e.detail.info)
      this.networkInfo = e.detail.info
    },
    
    // 全屏变化事件
    onFullScreenChange(e) {
      console.log('全屏状态变化:', e.detail.fullScreen, '方向:', e.detail.direction)
      uni.showToast({
        title: e.detail.fullScreen ? '进入全屏' : '退出全屏',
        icon: 'none'
      })
    },
    
    // 错误事件处理
    onError(e) {
      console.error('基础播放器错误:', e.detail.errMsg)
      uni.showToast({
        title: '播放出错: ' + e.detail.errMsg,
        icon: 'none'
      })
    },
    
    // 高级播放器错误事件处理
    onAdvancedError(e) {
      console.error('高级播放器错误:', e.detail.errMsg)
      uni.showToast({
        title: '播放出错: ' + e.detail.errMsg,
        icon: 'none'
      })
    },
    
    // 获取状态描述
    getStateDesc(code) {
      return this.stateCodeMap[code] || `未知状态(${code})`
    },
    
    // 切换播放源
    onSourceChange(e) {
      const index = e.detail.value
      this.currentSourceIndex = index
      
      const sources = Object.values(this.liveUrls)
      this.currentUrl = sources[index]
      
      // 重新加载播放器
      this.$nextTick(() => {
        this.reload()
      })
    },
    
    // 切换填充模式
    onFitModeChange(e) {
      const index = e.detail.value
      this.fitModeIndex = index
      this.objectFit = ['contain', 'fillCrop'][index]
    },
    
    // 播放/暂停切换
    handlePlayPause() {
      if (this.isPlaying) {
        this.$refs.advancedPlayer.stop()
        this.isPlaying = false
      } else {
        this.$refs.advancedPlayer.play()
      }
    },
    
    // 切换静音状态
    toggleMute() {
      this.isMuted = !this.isMuted
    },
    
    // 重新加载直播
    reload() {
      if (this.$refs.advancedPlayer) {
        this.$refs.advancedPlayer.reload()
        uni.showToast({
          title: '重新加载',
          icon: 'none'
        })
      }
    },
    
    // 截图
    async takeSnapshot() {
      try {
        const imagePath = await this.$refs.advancedPlayer.snapshot()
        console.log('截图成功，临时路径:', imagePath)
        this.snapshotPath = imagePath
        
        uni.showToast({
          title: '截图成功',
          icon: 'success'
        })
      } catch (err) {
        console.error('截图失败:', err)
        uni.showToast({
          title: '截图失败: ' + (err.errMsg || err.message || '未知错误'),
          icon: 'none'
        })
      }
    },
    
    // 切换控制栏显示状态
    toggleControls() {
      this.showControls = !this.showControls
    },
    
    // 切换方向
    toggleOrientation() {
      this.orientation = this.orientation === 'vertical' ? 'horizontal' : 'vertical'
    }
  }
}
</script>

<style lang="scss">
.demo-container {
  padding: 20rpx;
  
  .title {
    font-size: 40rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
  }
  
  .section {
    margin-bottom: 40rpx;
    background-color: #fff;
    border-radius: 10rpx;
    padding: 20rpx;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
      color: #333;
      border-left: 8rpx solid #007AFF;
      padding-left: 20rpx;
    }
  }
  
  .status-info {
    margin-top: 20rpx;
    padding: 15rpx;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    font-size: 28rpx;
  }
  
  .control-panel {
    margin-top: 20rpx;
    
    .control-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 20rpx;
      
      .label {
        width: 150rpx;
        font-size: 28rpx;
        color: #666;
      }
      
      .picker-value {
        padding: 10rpx 20rpx;
        background-color: #f5f5f5;
        border-radius: 8rpx;
        font-size: 28rpx;
        flex: 1;
      }
    }
    
    .control-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 20rpx;
      
      .control-btn {
        flex: 1;
        margin: 0 10rpx;
        font-size: 28rpx;
        background-color: #007AFF;
        color: #fff;
        padding: 10rpx 0;
        height: 80rpx;
        line-height: 60rpx;
        
        &:first-child {
          margin-left: 0;
        }
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  
  .network-status {
    margin-top: 30rpx;
    padding: 20rpx;
    background-color: #f9f9f9;
    border-radius: 8rpx;
    
    .status-title {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: 15rpx;
      color: #333;
    }
    
    .status-item {
      display: flex;
      flex-direction: row;
      margin-bottom: 10rpx;
      font-size: 24rpx;
      
      .status-label {
        width: 200rpx;
        color: #666;
      }
      
      .status-value {
        flex: 1;
        color: #333;
      }
    }
  }
  
  .snapshot-preview {
    margin-top: 30rpx;
    
    .preview-title {
      font-size: 28rpx;
      font-weight: bold;
      margin-bottom: 15rpx;
      color: #333;
    }
    
    .snapshot-image {
      width: 100%;
      height: 400rpx;
      background-color: #f5f5f5;
      border-radius: 8rpx;
    }
  }
  
  .code-list {
    .code-item {
      display: flex;
      padding: 10rpx 0;
      font-size: 24rpx;
      border-bottom: 1rpx solid #f0f0f0;
      
      .code {
        width: 120rpx;
        color: #007AFF;
        font-weight: bold;
      }
      
      .desc {
        flex: 1;
        color: #666;
      }
    }
  }
}
</style> 