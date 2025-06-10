<template>
  <view class="zx-live-player-container">
    <live-player :id="id" :src="src" :mode="mode" :autoplay="autoplay" :muted="muted" :orientation="orientation"
      :object-fit="objectFit" :background-mute="backgroundMute" :sound-mode="soundMode" :min-cache="minCache"
      :max-cache="maxCache" :picture-in-picture-mode="pictureInPictureMode" @statechange="onStateChange"
      @netstatus="onNetStatus" @fullscreenchange="onFullScreenChange" @audiovolumenotify="onAudioVolumeNotify"
      @enterpictureinpicture="onEnterPictureInPicture" @leavepictureinpicture="onLeavePictureInPicture" @error="onError"
      :style="playerStyle" class="zx-live-player">
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

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'

// 定义组件名称
defineOptions({
  name: 'zx-live-player'
})

// 定义props
const props = defineProps({
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
})

// 定义emits
const emit = defineEmits([
  'update:muted',
  'statechange',
  'netstatus',
  'fullscreenchange',
  'audiovolumenotify',
  'enterpictureinpicture',
  'leavepictureinpicture',
  'error'
])

// 响应式数据
const context = ref(null)
const isPlaying = ref(false)
const isFullScreen = ref(false)
const loading = ref(false)
const errorMsg = ref('')
const networkStatus = ref(null)

// 获取当前实例
const instance = getCurrentInstance()

// 计算属性
const playerStyle = computed(() => {
  return `width: ${props.width}; height: ${props.height};`
})

// 监听器
watch(() => props.src, (newVal) => {
  if (newVal) {
    errorMsg.value = ''
    if (props.autoplay) {
      play()
    }
  }
})

// 初始化播放器上下文
const initPlayerContext = () => {
  context.value = uni.createLivePlayerContext(props.id, instance)
}

// 播放
const play = () => {
  if (!props.src) {
    errorMsg.value = '播放地址不能为空'
    return
  }

  loading.value = true
  errorMsg.value = ''

  if (context.value) {
    context.value.play({
      success: () => {
        isPlaying.value = true
      },
      fail: (err) => {
        errorMsg.value = '播放失败：' + (err.errMsg || '未知错误')
        isPlaying.value = false
      }
    })
  }
}

// 停止
const stop = () => {
  if (context.value) {
    context.value.stop({
      success: () => {
        isPlaying.value = false
      }
    })
  }
}

// 暂停/播放切换
const handlePlayPause = () => {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

// 静音切换
const handleMute = () => {
  emit('update:muted', !props.muted)
}

// 全屏切换
const handleFullScreen = () => {
  if (isFullScreen.value) {
    exitFullScreen()
  } else {
    requestFullScreen()
  }
}

// 请求全屏
const requestFullScreen = () => {
  if (context.value) {
    context.value.requestFullScreen({
      direction: props.orientation === 'vertical' ? 0 : 90,
      success: () => {
        isFullScreen.value = true
      },
      fail: (err) => {
        console.error('全屏失败：', err)
      }
    })
  }
}

// 退出全屏
const exitFullScreen = () => {
  if (context.value) {
    context.value.exitFullScreen({
      success: () => {
        isFullScreen.value = false
      },
      fail: (err) => {
        console.error('退出全屏失败：', err)
      }
    })
  }
}

// 重试
const retry = () => {
  errorMsg.value = ''
  play()
}

// 播放状态变化事件处理
const onStateChange = (e) => {
  const code = e.detail.code

  // 根据状态码处理不同的状态
  switch (code) {
    case 2001: // 已经连接服务器
      loading.value = true
      break

    case 2002: // 已经连接服务器,开始拉流
      loading.value = true
      break

    case 2003: // 网络接收到首个视频数据包(IDR)
      loading.value = true
      break

    case 2004: // 视频播放开始
      loading.value = false
      isPlaying.value = true
      break

    case 2007: // 视频播放Loading
      loading.value = true
      break

    case 2006: // 视频播放结束
      isPlaying.value = false
      loading.value = false
      break

    case -2301: // 网络断连，且经多次重连抢救无效
      errorMsg.value = '网络连接断开，请检查网络后重试'
      isPlaying.value = false
      loading.value = false
      break

    case 2103: // 网络断连, 已启动自动重连
      loading.value = true
      break
  }

  emit('statechange', e)
}

// 网络状态通知
const onNetStatus = (e) => {
  networkStatus.value = e.detail.info
  emit('netstatus', e)
}

// 全屏变化事件
const onFullScreenChange = (e) => {
  isFullScreen.value = e.detail.fullScreen
  emit('fullscreenchange', e)
}

// 播放音量大小通知
const onAudioVolumeNotify = (e) => {
  emit('audiovolumenotify', e)
}

// 播放器进入小窗
const onEnterPictureInPicture = (e) => {
  emit('enterpictureinpicture', e)
}

// 播放器退出小窗
const onLeavePictureInPicture = (e) => {
  emit('leavepictureinpicture', e)
}

// 错误事件
const onError = (e) => {
  errorMsg.value = '播放出错：' + (e.detail.errMsg || '未知错误')
  isPlaying.value = false
  loading.value = false
  emit('error', e)
}

// 暴露给父组件的方法
// 截图
const snapshot = () => {
  return new Promise((resolve, reject) => {
    if (context.value) {
      context.value.snapshot({
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
}

// 设置音量
const setVolume = (volume) => {
  if (context.value) {
    volume = Math.max(0, Math.min(1, volume))
    context.value.setVolume({
      volume: volume
    })
  }
}

// 重新加载
const reload = () => {
  if (context.value) {
    context.value.stop()
    setTimeout(() => {
      play()
    }, 300)
  }
}

// 生命周期钩子
onMounted(() => {
  initPlayerContext()
})

onBeforeUnmount(() => {
  stop()
})

// 暴露方法给父组件
defineExpose({
  play,
  stop,
  snapshot,
  setVolume,
  reload,
  requestFullScreen,
  exitFullScreen
})
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
