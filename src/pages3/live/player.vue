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

<script setup>
import { ref, reactive, computed } from 'vue';

const liveUrl = ref('https://domain.example/live/stream.flv'); // 替换为实际的直播流地址
const playerOptions = reactive({
  mode: 'live',
  autoplay: false,
  muted: false,
  objectFit: 'contain',
  orientation: 'vertical',
  width: '100%',
  height: '200px',
  showControls: true
});
const playerStatus = ref('未播放');
const networkStatus = ref(null);
const snapshotPath = ref('');
const isFullScreen = ref(false);

const advancedPlayer = ref(null); // 用于模板引用

const networkStatusText = computed(() => {
  if (!networkStatus.value) return '未知';
  return `码率: ${networkStatus.value.videoBitrate}kbps, 帧率: ${networkStatus.value.videoFPS}fps`;
});

// 基本播放器事件处理
const onStateChange = (e) => {
  const code = e.detail.code;
  // 状态码参考 uni.createLivePlayerContext 文档
  switch (code) {
    case 2004: // 视频播放开始
      playerStatus.value = '正在播放';
      break;
    case 2006: // 视频播放结束
      playerStatus.value = '播放结束';
      break;
    case -2301: // 网络断连，且经多次重连抢救无效
      playerStatus.value = '网络错误';
      break;
    default:
      break;
  }
};

const onError = (e) => {
  playerStatus.value = `播放错误: ${e.detail.errMsg || '未知错误'}`;
};

// 高级播放器事件处理 (如果模板中 @statechange 仍然指向 onAdvancedStateChange，则保留此函数名，否则可以直接使用 onStateChange)
const onAdvancedStateChange = (e) => {
  onStateChange(e);
};

const onNetStatus = (e) => {
  networkStatus.value = e.detail.info;
};

const onFullScreenChange = (e) => {
  isFullScreen.value = e.detail.fullScreen;
};

// 控制方法
const playVideo = () => {
  if (advancedPlayer.value) {
    advancedPlayer.value.play();
  }
};

const stopVideo = () => {
  if (advancedPlayer.value) {
    advancedPlayer.value.stop();
    playerStatus.value = '已停止';
  }
};

const reloadVideo = () => {
  if (advancedPlayer.value) {
    advancedPlayer.value.reload();
    playerStatus.value = '重新加载中';
  }
};

const changeObjectFit = (mode) => {
  playerOptions.objectFit = mode;
};

const toggleMute = (e) => {
  // 假设 e.detail.value 是 uni-app switch 组件事件的标准格式
  // 如果直接传递布尔值，则 playerOptions.muted = e (或传入的参数名)
  playerOptions.muted = typeof e.detail !== 'undefined' ? e.detail.value : e;
};

const toggleControls = (e) => {
  playerOptions.showControls = typeof e.detail !== 'undefined' ? e.detail.value : e;
};

const toggleOrientation = () => {
  playerOptions.orientation = playerOptions.orientation === 'vertical' ? 'horizontal' : 'vertical';
};

const takeSnapshot = () => {
  if (advancedPlayer.value) {
    advancedPlayer.value.snapshot()
      .then(path => {
        snapshotPath.value = path;
        uni.showToast({
          title: '截图成功',
          icon: 'success'
        });
      })
      .catch(err => {
        uni.showToast({
          title: '截图失败',
          icon: 'error'
        });
        console.error('截图失败:', err);
      });
  }
};

// 如果需要在模板中暴露这些方法和状态，<script setup> 默认会暴露顶层绑定
// 如果有特定的 props 或 emits，需要使用 defineProps 和 defineEmits

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
