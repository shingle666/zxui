# zx-live-player 组件

`zx-live-player` 是基于uni-app官方 `live-player` 组件的增强版封装，提供了更加易用的接口和更完善的功能。

## 平台支持

| App   | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 抖音小程序 | 飞书小程序 | QQ小程序 | 快应用 | 360小程序 | 京东小程序 | 元服务 | 小红书小程序 |
| ----- | -- | ----- | ------ | ----- | ----- | ----- | ----- | --- | ------ | ----- | --- | ------ |
| x(见下) | x  | √     | x      | √     | √     | x     | √     | x   | x      | x     | x   | x      |

* App的实时音视频播放，不是使用 live-player，而是直接使用 video 组件。
* H5 下可用 video 播放符合 HTML5 规范的流媒体，rtmp 等非 HTML5 标准的流媒体格式，仅在部分支持 flash 的国内手机浏览器上可播放。

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-live-player
      id="myPlayer"
      :src="liveUrl"
      :autoplay="true"
      @statechange="onStateChange"
      @error="onError"
    />
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
      liveUrl: 'rtmp://your-rtmp-url'
    }
  },
  methods: {
    onStateChange(e) {
      console.log('播放状态变化:', e.detail.code)
    },
    onError(e) {
      console.error('播放错误:', e.detail.errMsg)
    }
  }
}
</script>
```

### 完整示例

```vue
<template>
  <view>
    <zx-live-player
      id="myPlayer"
      :src="liveUrl"
      :autoplay="true"
      :muted="isMuted"
      :orientation="orientation"
      :object-fit="objectFit"
      :show-controls="true"
      :width="playerWidth"
      :height="playerHeight"
      @statechange="onStateChange"
      @netstatus="onNetStatus"
      @fullscreenchange="onFullScreenChange"
      @error="onError"
      ref="livePlayer"
    />
    
    <view class="control-panel">
      <button @click="takeSnapshot">截图</button>
      <button @click="toggleMute">{{ isMuted ? '取消静音' : '静音' }}</button>
      <button @click="reload">重新加载</button>
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
      liveUrl: 'rtmp://your-rtmp-url',
      isMuted: false,
      orientation: 'vertical', // 'vertical' 或 'horizontal'
      objectFit: 'contain', // 'contain' 或 'fillCrop'
      playerWidth: '100%',
      playerHeight: '400rpx'
    }
  },
  methods: {
    onStateChange(e) {
      console.log('播放状态变化:', e.detail.code)
      // 状态码说明:
      // 2001: 已经连接服务器
      // 2002: 已经连接服务器,开始拉流
      // 2003: 网络接收到首个视频数据包(IDR)
      // 2004: 视频播放开始
      // 2005: 视频播放进度
      // 2006: 视频播放结束
      // 2007: 视频播放Loading
      // 2008: 解码器启动
      // 2009: 视频分辨率改变
      // -2301: 网络断连，且经多次重连抢救无效，更多重试请自行重启播放
      // -2302: 获取加速拉流地址失败
      // 2101: 当前视频帧解码失败
      // 2102: 当前音频帧解码失败
      // 2103: 网络断连, 已启动自动重连
      // 2104: 网络来包不稳：可能是下行带宽不足，或由于主播端出流不均匀
      // 2105: 当前视频播放出现卡顿
      // 2106: 硬解启动失败，采用软解
      // 2107: 当前视频帧不连续，可能丢帧
      // 2108: 当前流硬解第一个I帧失败，SDK自动切软解
    },
    onNetStatus(e) {
      console.log('网络状态:', e.detail.info)
      // 网络状态信息包含:
      // videoBitrate: 当前视频编/码器输出的比特率，单位 kbps
      // audioBitrate: 当前音频编/码器输出的比特率，单位 kbps
      // videoFPS: 当前视频帧率
      // videoGOP: 当前视频 GOP,也就是每两个关键帧(I帧)间隔时长，单位 s
      // netSpeed: 当前的发送/接收速度
      // netJitter: 网络抖动情况，抖动越大，网络越不稳定
      // videoWidth: 视频画面的宽度
      // videoHeight: 视频画面的高度
    },
    onFullScreenChange(e) {
      console.log('全屏状态变化:', e.detail.fullScreen, '方向:', e.detail.direction)
    },
    onError(e) {
      console.error('播放错误:', e.detail.errMsg)
    },
    // 截图
    async takeSnapshot() {
      try {
        const imagePath = await this.$refs.livePlayer.snapshot()
        console.log('截图成功，临时路径:', imagePath)
        // 这里可以进一步处理截图，例如上传或保存
      } catch (err) {
        console.error('截图失败:', err)
      }
    },
    // 切换静音状态
    toggleMute() {
      this.isMuted = !this.isMuted
    },
    // 重新加载直播
    reload() {
      this.$refs.livePlayer.reload()
    }
  }
}
</script>

<style>
.control-panel {
  display: flex;
  justify-content: space-around;
  margin-top: 20rpx;
}
</style>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| id | String | zx-live-player | 播放器唯一标识 |
| src | String | '' | 直播地址，支持rtmp、flv格式（具体支持的格式取决于小程序平台） |
| mode | String | live | live（直播），RTC（实时通话，该模式时延更低） |
| autoplay | Boolean | false | 是否自动播放 |
| muted | Boolean | false | 是否静音 |
| orientation | String | vertical | 画面方向，可选值：vertical（竖直）、horizontal（水平） |
| objectFit | String | contain | 填充模式，可选值：contain（图像长边填满屏幕，短边区域会被填充黑色）、fillCrop（图像铺满屏幕，超出显示区域的部分将被截掉） |
| backgroundMute | Boolean | false | 进入后台时是否静音 |
| soundMode | String | speaker | 声音输出方式，可选值：speaker（扬声器）、ear（听筒） |
| minCache | Number | 1 | 最小缓冲区，单位s |
| maxCache | Number | 3 | 最大缓冲区，单位s |
| pictureInPictureMode | String/Array | '' | 小窗模式，可选值：push、pop，或通过数组形式设置多种模式（如：["push", "pop"]） |
| width | String/Number | 100% | 播放器宽度，支持像素值或百分比 |
| height | String/Number | 225px | 播放器高度，支持像素值或百分比 |
| showControls | Boolean | true | 是否显示控制栏 |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| @statechange | 播放状态变化事件 | e.detail.code |
| @netstatus | 网络状态通知 | e.detail.info |
| @fullscreenchange | 全屏变化事件 | e.detail.direction, e.detail.fullScreen |
| @audiovolumenotify | 播放音量大小通知 | e.detail |
| @enterpictureinpicture | 播放器进入小窗 | e |
| @leavepictureinpicture | 播放器退出小窗 | e |
| @error | 错误事件 | e.detail.errMsg |

## 方法说明

通过 ref 可以调用组件的以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| play | 开始播放 | 无 |
| stop | 停止播放 | 无 |
| snapshot | 截图，返回临时文件路径 | 无，返回Promise |
| setVolume | 设置音量 | volume: 音量大小，范围0-1 |
| reload | 重新加载 | 无 |
| requestFullScreen | 进入全屏 | 无 |
| exitFullScreen | 退出全屏 | 无 |

## 注意事项

1. 微信小程序、百度小程序等平台使用live-player组件需要符合平台规定的类目，并且通过审核，请参考各平台规定。
2. 在实际应用中，建议处理好网络异常、播放出错等情况，提供友好的用户体验。
3. App端不支持live-player，请使用video组件代替。
4. 小程序中如需在live-player上覆盖内容，请使用cover-view和cover-image组件。
