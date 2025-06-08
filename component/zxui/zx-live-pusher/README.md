# zx-live-pusher 直播推流组件

`zx-live-pusher` 是基于 uni-app 官方 `live-pusher` 组件封装的增强版直播推流组件，提供了更简单的接口和更丰富的功能。

## 平台兼容性

| App                | H5 | 微信小程序 | 其他小程序 |
| ------------------ | -- | ----- | ------ |
| √(nvue)、vue 3.4.1+ | x  | √     | x      |

> 注意：App平台开发推荐使用nvue，相比vue有更好的性能和更多功能。

## 使用方法

### 1. 引入组件

```vue
<script>
import ZxLivePusher from '@/components/zx-live-pusher/zx-live-pusher.vue'

export default {
  components: {
    ZxLivePusher
  }
}
</script>
```

### 2. 基本用法

```vue
<template>
  <view class="content">
    <zx-live-pusher
      ref="livePusher"
      :url="pushUrl"
      mode="HD"
      aspect="9:16"
      :beauty="3"
      :whiteness="3"
      @statechange="onStateChange"
      @netstatus="onNetStatus"
      @error="onError"
    />
    
    <view class="controls">
      <button @click="startLive">开始直播</button>
      <button @click="stopLive">结束直播</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pushUrl: 'rtmp://your-rtmp-server/path'
    }
  },
  methods: {
    startLive() {
      this.$refs.livePusher.startPush();
    },
    stopLive() {
      this.$refs.livePusher.stopPush();
    },
    onStateChange(e) {
      console.log('推流状态变化:', e);
    },
    onNetStatus(e) {
      console.log('网络状态:', e);
    },
    onError(e) {
      console.log('推流错误:', e);
    }
  }
}
</script>
```

### 3. 使用内置控制按钮

```vue
<zx-live-pusher
  :url="pushUrl"
  :show-controls="true"
  :auto-preview="true"
/>
```

## 属性说明

| 属性名                   | 类型      | 默认值        | 说明                                         |
|------------------------|-----------|--------------|----------------------------------------------|
| url                    | String    | ''           | 推流地址，支持RTMP协议                          |
| mode                   | String    | 'SD'         | 推流视频模式，可选值：SD（标清）, HD（高清）, FHD（超清）|
| aspect                 | String    | '9:16'       | 视频宽高比例                                   |
| muted                  | Boolean   | false        | 是否静音                                       |
| enableCamera           | Boolean   | true         | 开启摄像头                                     |
| autoFocus              | Boolean   | true         | 自动聚焦                                       |
| beauty                 | Number    | 0            | 美颜，取值范围 0-9，0 表示关闭                    |
| whiteness              | Number    | 0            | 美白，取值范围 0-9，0 表示关闭                    |
| orientation            | String    | 'vertical'   | 画面方向，可选值：vertical, horizontal           |
| minBitrate             | Number    | 200          | 最小码率                                       |
| maxBitrate             | Number    | 1000         | 最大码率                                       |
| audioQuality           | String    | 'high'       | 音频质量，可选值：high（高音质）, low（低音质）      |
| waitingImage           | String    | ''           | 等待画面图片                                   |
| waitingImageHash       | String    | ''           | 等待画面图片的MD5值                             |
| zoom                   | Boolean   | false        | 是否启用双指缩放                                |
| devicePosition         | String    | 'front'      | 摄像头位置，可选值：front（前置）, back（后置）     |
| backgroundMute         | Boolean   | false        | 进入后台时是否静音                              |
| remoteMirror           | Boolean   | false        | 设置推流画面是否镜像                            |
| localMirror            | String    | 'auto'       | 设置本地预览画面是否镜像，可选值：auto, enable, disable |
| audioReverbType        | Number    | 0            | 音频混响类型，可取值：0 - 7                      |
| audioVolumeType        | String    | 'voicecall'  | 音量类型，可选值：media, voicecall               |
| enableMic              | Boolean   | true         | 开启麦克风                                     |
| enableAgc              | Boolean   | false        | 是否开启音频自动增益                            |
| enableAns              | Boolean   | false        | 是否开启音频噪声抑制                            |
| audioVolumeTypeSpeaker | Boolean   | false        | 扬声器类型                                     |
| showControls           | Boolean   | false        | 是否显示内置控制按钮                            |
| autoStart              | Boolean   | false        | 是否自动开始推流                                |
| autoPreview            | Boolean   | false        | 是否自动开启预览                                |

## 事件说明

| 事件名        | 说明                           | 返回参数                           |
|--------------|-------------------------------|-----------------------------------|
| statechange  | 推流状态变化事件                 | event.detail: {code, message}     |
| netstatus    | 网络状态通知事件                 | event.detail: 网络状态对象          |
| error        | 推流错误事件                    | event.detail: {errCode, errMsg}   |
| started      | 推流开始事件                    | 开始推流的结果                      |
| stopped      | 推流停止事件                    | 停止推流的结果                      |
| paused       | 推流暂停事件                    | 暂停推流的结果                      |
| resumed      | 推流恢复事件                    | 恢复推流的结果                      |
| previewStarted | 预览开始事件                  | 开始预览的结果                      |
| previewStopped | 预览停止事件                  | 停止预览的结果                      |
| cameraSwitched | 摄像头切换事件                | 切换摄像头的结果                    |
| snapshotTaken  | 截图完成事件                  | {tempImagePath: 临时图片路径}       |
| failed       | 推流失败事件                    | 失败信息                           |

### statechange 事件 code 值说明

| code  | 说明                                                 |
|-------|-----------------------------------------------------|
| 1001  | 已经连接推流服务器                                    |
| 1002  | 已经与服务器握手完毕，开始推流                         |
| 1003  | 打开摄像头成功                                       |
| 1004  | 录屏启动成功                                         |
| 1005  | 推流动态调整分辨率                                    |
| 1006  | 推流动态调整码率                                      |
| 1007  | 首帧画面采集完成                                      |
| 1008  | 编码器启动                                           |
| -1301 | 打开摄像头失败                                       |
| -1302 | 打开麦克风失败                                       |
| -1303 | 视频编码失败                                         |
| -1304 | 音频编码失败                                         |
| -1305 | 不支持的视频分辨率                                    |
| -1306 | 不支持的音频采样率                                    |
| -1307 | 网络断连，且经多次重连抢救无效                         |
| -1308 | 开始录屏失败，可能是被用户拒绝                         |
| -1309 | 录屏失败，不支持的Android系统版本，需要5.0以上的系统    |
| -1310 | 录屏被其他应用打断了                                  |
| -1311 | Android Mic打开成功，但是录不到音频数据                |
| -1312 | 录屏动态切横竖屏失败                                  |

## 方法说明

以下方法都返回Promise对象，可以使用async/await或then/catch处理结果。

| 方法名         | 说明              | 参数          | 返回值                       |
|---------------|------------------|--------------|----------------------------|
| startPush     | 开始推流           | 无            | Promise                    |
| stopPush      | 停止推流           | 无            | Promise                    |
| pausePush     | 暂停推流           | 无            | Promise                    |
| resumePush    | 恢复推流           | 无            | Promise                    |
| startPreview  | 开启预览           | 无            | Promise                    |
| stopPreview   | 关闭预览           | 无            | Promise                    |
| switchCamera  | 切换摄像头         | 无            | Promise                    |
| snapshot      | 截图              | 无            | Promise                    |
| getContext    | 获取推流上下文      | 无            | LivePusherContext对象       |

## 使用示例

### 直播页面示例

```vue
<template>
  <view class="live-page">
    <zx-live-pusher
      ref="livePusher"
      :url="pushUrl"
      mode="HD"
      aspect="9:16"
      :beauty="beautyLevel"
      :whiteness="whitenessLevel"
      @statechange="onStateChange"
      @netstatus="onNetStatus"
      @error="onError"
      @started="onStarted"
      @stopped="onStopped"
    />
    
    <view class="operation-bar">
      <view class="beauty-control">
        <slider :value="beautyLevel" :min="0" :max="9" :step="1" @change="onBeautyChange" show-value />
        <text>美颜</text>
      </view>
      
      <view class="whiteness-control">
        <slider :value="whitenessLevel" :min="0" :max="9" :step="1" @change="onWhitenessChange" show-value />
        <text>美白</text>
      </view>
      
      <view class="buttons">
        <button @click="toggleLive">{{ isLiving ? '结束直播' : '开始直播' }}</button>
        <button @click="takeSnapshot">截图</button>
        <button @click="switchCameraPosition">切换摄像头</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      pushUrl: 'rtmp://your-rtmp-server/path',
      beautyLevel: 5,
      whitenessLevel: 5,
      isLiving: false
    }
  },
  onReady() {
    // 页面加载完成后自动开启预览
    this.$refs.livePusher.startPreview();
  },
  methods: {
    async toggleLive() {
      if (this.isLiving) {
        await this.$refs.livePusher.stopPush();
        this.isLiving = false;
      } else {
        try {
          await this.$refs.livePusher.startPush();
          this.isLiving = true;
        } catch (err) {
          uni.showToast({
            title: '开始直播失败',
            icon: 'none'
          });
        }
      }
    },
    
    async takeSnapshot() {
      try {
        const result = await this.$refs.livePusher.snapshot();
        uni.showToast({
          title: '截图成功',
          icon: 'success'
        });
        // 可以在这里处理截图，比如上传或保存
      } catch (err) {
        uni.showToast({
          title: '截图失败',
          icon: 'none'
        });
      }
    },
    
    switchCameraPosition() {
      this.$refs.livePusher.switchCamera();
    },
    
    onBeautyChange(e) {
      this.beautyLevel = e.detail.value;
    },
    
    onWhitenessChange(e) {
      this.whitenessLevel = e.detail.value;
    },
    
    onStateChange(e) {
      const { code, message } = e.detail;
      console.log(`[推流状态] code: ${code}, message: ${message}`);
      
      // 处理特定状态码
      if (code < 0) {
        uni.showToast({
          title: `推流异常: ${message}`,
          icon: 'none'
        });
      }
    },
    
    onNetStatus(e) {
      console.log('[网络状态]', e.detail);
    },
    
    onError(e) {
      console.error('[推流错误]', e.detail);
      uni.showModal({
        title: '推流错误',
        content: `错误码: ${e.detail.errCode}, 错误信息: ${e.detail.errMsg}`,
        showCancel: false
      });
    },
    
    onStarted() {
      uni.showToast({
        title: '开始推流成功',
        icon: 'success'
      });
    },
    
    onStopped() {
      uni.showToast({
        title: '已停止推流',
        icon: 'none'
      });
    }
  }
}
</script>

<style lang="scss">
.live-page {
  position: relative;
  width: 100%;
  height: 100vh;
  
  .operation-bar {
    position: absolute;
    bottom: 40rpx;
    left: 0;
    right: 0;
    padding: 20rpx;
    background-color: rgba(0, 0, 0, 0.3);
    
    .beauty-control,
    .whiteness-control {
      margin-bottom: 20rpx;
      
      text {
        color: #fff;
        font-size: 24rpx;
        margin-left: 10rpx;
      }
    }
    
    .buttons {
      display: flex;
      justify-content: space-around;
      
      button {
        flex: 1;
        margin: 0 10rpx;
        font-size: 28rpx;
        height: 70rpx;
        line-height: 70rpx;
      }
    }
  }
}
</style>
```

## 注意事项

1. 在App平台使用本组件，需要在 `manifest.json` 中勾选 `LivePusher(直播推流)` 模块。
2. `live-pusher` 是原生组件，在小程序中层级最高，需要使用 `cover-view` 覆盖。
3. 在App端的nvue页面中使用时没有层级限制。
4. 推流前需要确保有可用的网络连接，且用户已授予相机和麦克风权限。
5. 如需在安卓后台继续推流，请配置应用为前台服务。

## 常见问题

### 1. 推流地址格式

推流地址一般为RTMP格式，例如：`rtmp://domain/app/stream`。

### 2. 获取不到摄像头/麦克风权限

确保已经在应用中申请了相机和麦克风权限，可以在组件挂载前先调用权限申请API：

```js
onLoad() {
  // 请求相机权限
  uni.authorize({
    scope: 'scope.camera',
    success() {
      console.log('相机权限已获取');
    },
    fail() {
      uni.showModal({
        title: '提示',
        content: '请允许使用摄像头权限',
        showCancel: false
      });
    }
  });
  
  // 请求麦克风权限
  uni.authorize({
    scope: 'scope.record',
    success() {
      console.log('麦克风权限已获取');
    },
    fail() {
      uni.showModal({
        title: '提示',
        content: '请允许使用麦克风权限',
        showCancel: false
      });
    }
  });
}
```

### 3. 如何处理网络异常

可以在`netstatus`事件中监控网络状态，当检测到网络异常时，可以尝试重新连接或提示用户：

```js
onNetStatus(e) {
  const info = e.detail;
  
  // 检测网络质量
  if (info.netSpeed < 100) { // 网速过低
    uni.showToast({
      title: '网络状况不佳，请检查网络连接',
      icon: 'none'
    });
  }
  
  // 也可以根据videoBitrate等参数动态调整画质
  if (info.videoBitrate < 200) {
    // 可以考虑降低画质
    // this.mode = 'SD';
  }
}
```

## 更多资源

- [uni-app官方文档 - live-pusher组件](https://uniapp.dcloud.net.cn/component/live-pusher.html)
- [uni.createLivePusherContext API文档](https://uniapp.dcloud.net.cn/api/media/live-player-context.html)
