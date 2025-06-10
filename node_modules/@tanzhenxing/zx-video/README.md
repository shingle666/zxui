# zx-video 视频组件

## 介绍

`zx-video` 是一个基于 uni-app 视频组件封装的增强版视频播放器组件，支持视频播放、弹幕、全屏、小窗口、投屏等丰富功能，适用于各种视频播放场景。

## 特性

- 支持基础视频播放控制：播放、暂停、停止、快进、快退等
- 支持视频全屏切换和屏幕方向控制
- 支持弹幕功能
- 支持视频小窗口播放
- 支持投屏功能
- 支持视频截图
- 支持倍速播放
- 支持 DRM 视频播放

## 安装使用

### 导入组件

```vue
<script>
import zxVideo from '@/components/zx-video/zx-video.vue'

export default {
  components: {
    zxVideo
  }
}
</script>
```

或在 `script setup` 中使用：

```vue
<script setup>
import zxVideo from '@/components/zx-video/zx-video.vue'
</script>
```

### 基本使用

```vue
<template>
  <view class="container">
    <zx-video
      ref="videoRef"
      videoId="myVideo"
      :src="videoSrc"
      :poster="videoPoster"
      :autoplay="false"
      @onPlay="handlePlay"
      @onTimeUpdate="handleTimeUpdate"
    ></zx-video>
    
    <button @click="playVideo">播放</button>
    <button @click="pauseVideo">暂停</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxVideo from '@/components/zx-video/zx-video.vue'

const videoRef = ref(null)
const videoSrc = ref('https://red-education.wufu-app.com/upload/20211129/a5ba754c1700d0394a45cbc68dd4a5d8.mp4')
const videoPoster = ref('https://red-education.wufu-app.com/upload/20211129/2a92a8376dc42d0f79eed7d7c40b599d.png')

// 控制视频播放
const playVideo = () => {
  videoRef.value.play()
}

// 控制视频暂停
const pauseVideo = () => {
  videoRef.value.pause()
}

// 播放事件处理
const handlePlay = () => {
  console.log('视频开始播放')
}

// 播放进度更新
const handleTimeUpdate = (detail) => {
  console.log('当前播放进度:', detail.currentTime)
  console.log('视频总时长:', detail.duration)
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| videoId | String | 'myVideo' | 视频播放器id |
| width | String | '750rpx' | 视频宽度 |
| height | String | '420rpx' | 视频高度 |
| src | String | '' | 要播放视频的资源地址，支持网络路径、本地临时路径、云文件ID |
| title | String | '' | 视频的标题，全屏时在顶部展示 |
| poster | String | '' | 视频封面的图片网络资源地址或云文件ID |
| autoplay | Boolean | false | 是否自动播放 |
| loop | Boolean | false | 是否循环播放 |
| muted | Boolean | false | 是否静音播放 |
| showMuteBtn | Boolean | false | 是否显示静音按钮 |
| duration | Number | 0 | 指定视频时长 |
| initialTime | Number | 0 | 指定视频初始播放位置 |
| controls | Boolean | true | 是否显示默认播放控件 |
| enableDanmu | Boolean | false | 是否展示弹幕 |
| danmuList | Array/Object | [] | 弹幕列表 |
| danmuBtn | Boolean | false | 是否显示弹幕按钮 |
| pageGesture | Boolean | false | 非全屏模式下，是否开启亮度与音量调节手势 |
| direction | Number | 0 | 设置全屏时视频的方向(0:正常竖向,90:屏幕逆时针90度,-90:顺时针90度) |
| showProgress | Boolean | true | 是否显示进度条 |
| showFullscreenBtn | Boolean | true | 是否显示全屏按钮 |
| showPlayBtn | Boolean | true | 是否显示视频底部控制栏的播放按钮 |
| showCenterPlayBtn | Boolean | true | 是否显示视频中间的播放按钮 |
| enableProgressGesture | Boolean | true | 是否开启控制进度的手势 |
| objectFit | String | 'contain' | 当视频大小与容器不一致时的表现形式(contain:包含,fill:填充,cover:覆盖) |
| playBtnPosition | String | 'center' | 播放按钮的位置(bottom:底部控制条上,center:视频中间) |
| enablePlayGesture | Boolean | false | 是否开启播放手势，即双击切换播放/暂停 |
| pictureInPictureMode | String/Array | ['push', 'pop'] | 小窗模式 |
| codec | String | 'auto' | 解码器选择(hardware:硬解码,software:软解码,auto:自动选择) |

> 更多属性请参考组件代码中的 defineProps 部分。

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| onPlay | 视频开始/继续播放时触发 | event |
| onPause | 视频暂停播放时触发 | event |
| onEnded | 视频播放结束时触发 | event |
| onTimeUpdate | 播放进度变化时触发，触发频率 250ms 一次 | {currentTime, duration} |
| onLoadedMetaData | 视频元数据加载完成时触发 | {width, height, duration} |
| onFullScreenChange | 视频进入和退出全屏时触发 | {fullScreen, direction} |
| onWaiting | 视频出现缓冲时触发 | event |
| onError | 视频播放出错时触发 | event |
| onProgress | 加载进度变化时触发 | buffered (百分比) |
| onSeeked | 拖动进度条结束时触发 | event |
| onSeeking | 正在拖动进度条时触发 | event |
| onControlsToggle | 切换 controls 显示隐藏时触发 | {show} |
| onEnterPictureInPicture | 播放器进入小窗时触发 | event |
| onLeavePictureInPicture | 播放器退出小窗时触发 | event |

## 方法说明

通过 ref 可以调用组件内部方法：

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| play | 无 | 播放视频 |
| pause | 无 | 暂停视频 |
| stop | 无 | 停止视频 |
| seek | (position: Number) | 跳转到指定位置，单位为秒(s) |
| sendDanmu | (text: String, color: String) | 发送弹幕，color默认白色 |
| playbackRate | (rate: Number) | 设置倍速播放，如0.5、1.0、1.5、2.0 |
| requestFullScreen | (direction: Number) | 进入全屏，direction为方向 |
| exitFullScreen | 无 | 退出全屏 |
| snapshot | 无 | 视频截图，返回Promise，成功回调参数为截图路径 |
| volume | (value: Number) | 设置音量，范围0-1 |
| exitPictureInPicture | 无 | 退出小窗模式，返回Promise |
| getVideoInfo | (url: String) | 获取视频信息，返回Promise |
| getVideoContext | 无 | 获取原生视频上下文对象 |

## 使用示例

### 发送弹幕

```vue
<template>
  <view class="container">
    <zx-video ref="videoRef" videoId="danmuVideo" :src="videoSrc" 
      enableDanmu danmuBtn :danmuList="danmuList"></zx-video>
    
    <view class="danmu-input">
      <input v-model="danmuText" placeholder="请输入弹幕内容" />
      <button @click="sendDanmu">发送弹幕</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxVideo from '@/components/zx-video/zx-video.vue'

const videoRef = ref(null)
const videoSrc = ref('https://red-education.wufu-app.com/upload/20211129/a5ba754c1700d0394a45cbc68dd4a5d8.mp4')
const danmuText = ref('')
const danmuList = ref([
  { text: '第 1s 出现的弹幕', color: '#ff0000', time: 1 },
  { text: '第 3s 出现的弹幕', color: '#00ff00', time: 3 },
])

const sendDanmu = () => {
  videoRef.value.sendDanmu(danmuText.value, '#ffffff')
  danmuText.value = ''
}
</script>
```

### 视频截图

```vue
<template>
  <view class="container">
    <zx-video ref="videoRef" videoId="snapshotVideo" :src="videoSrc"></zx-video>
    
    <button @click="takeSnapshot">截图</button>
    <image v-if="snapshotPath" :src="snapshotPath" mode="widthFix"></image>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxVideo from '@/components/zx-video/zx-video.vue'

const videoRef = ref(null)
const videoSrc = ref('https://red-education.wufu-app.com/upload/20211129/a5ba754c1700d0394a45cbc68dd4a5d8.mp4')
const snapshotPath = ref('')

const takeSnapshot = async () => {
  try {
    const path = await videoRef.value.snapshot()
    snapshotPath.value = path
    uni.showToast({ title: '截图成功' })
  } catch (error) {
    uni.showToast({ title: '截图失败', icon: 'none' })
    console.error('截图失败:', error)
  }
}
</script>
```

截图功能说明：
- 截图会临时暂停视频并在截图完成后恢复播放状态
- 在H5环境中，返回的是Base64格式的图片数据
- 在App和小程序中，返回的是临时文件路径
- 截图前确保视频已加载并开始播放，否则可能截取空白画面

## 注意事项

1. **平台差异**：
   - H5平台支持的视频格式由浏览器决定，一般支持mp4、webm和ogg
   - 小程序平台各家支持不同，详见相应文档
   - App平台支持本地视频(mp4/flv)、网络视频(mp4/flv/m3u8)及流媒体(rtmp/hls/rtsp)

2. **全屏处理**：
   - 进入全屏后绘制界面，可使用cover-view覆盖
   - 微信基础库2.4.0以上和App端nvue页面支持cover-view

3. **层级问题**：
   - 视频组件在非H5端为原生组件，层级高于普通前端组件
   - 覆盖需使用cover-view或plus.nativeObj.view

4. **App注意事项**：
   - 使用此组件需在manifest.json中勾选VideoPlayer模块
   - 若使用本地视频路径，需配置资源为释放模式
   - 在manifest.json文件内 app-plus 节点下添加 runmode 配置，设置值为liberate

5. **视频自动播放**：
   - 大多数移动端浏览器不允许自动播放视频，需用户交互后触发

6. **截图功能**：
   - 截图功能使用canvas实现，依赖uni-app的canvas API
   - 在不同平台上截图结果格式可能不同
   - 若在截图过程中出现问题，请确保视频已正确加载，且组件有足够权限访问视频内容

7. **iOS全屏问题**：
   - iOS 16及以上版本中的视频全屏需要配置应用支持横屏
   - 在manifest.json文件内app-plus节点下添加screenOrientation配置
   - 设置值为["portrait-primary","portrait-secondary","landscape-primary","landscape-secondary"]

## 示例效果

![zx-video组件效果](https://red-education.wufu-app.com/images/1652670210303553)

## 兼容性

| 平台 | 支持情况 |
| --- | --- |
| APP-VUE | ✓ |
| APP-NVUE | ✓ |
| H5 | ✓ |
| 微信小程序 | ✓ |
| 支付宝小程序 | ✓ |
| 百度小程序 | ✓ |
| 抖音小程序 | ✓ |
| QQ小程序 | ✓ |

## 最近更新

- **v1.1.0** (2025-05-21):
  - 优化视频截图功能，支持H5/App/小程序多平台
  - 改进事件处理机制，使用Vue3 defineEmits
  - 修复方法调用前检查videoContext是否存在
  - 增加组件样式，确保正确显示
