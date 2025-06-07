# zx-audio 音频播放组件

## 介绍

`zx-audio` 是一个功能强大的uni-app音频播放组件，支持普通音频播放和背景音频播放模式。该组件提供了丰富的配置选项和事件，使音频播放功能的实现变得简单高效。

## 特性

- 支持普通音频播放和背景音频播放
- 提供完善的音频控制API
- 自动处理音频状态和生命周期
- 支持音频加载状态监听
- 支持播放进度控制
- 支持音量和播放速率调节
- 错误处理机制完善

## 安装和引入

### 在项目中引入组件

将组件复制到您的项目组件目录下，然后在需要使用的页面中引入：

```vue
<script setup>
import ZxAudio from '@/components/zx-audio/zx-audio.vue';
</script>

<template>
  <ZxAudio ref="audioRef" :src="audioSrc" />
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | String | '' | 音频资源地址 |
| startTime | Number | 0 | 开始播放的位置（单位：秒） |
| autoplay | Boolean | false | 是否自动播放 |
| loop | Boolean | false | 是否循环播放 |
| obeyMuteSwitch | Boolean | true | 是否遵循系统静音开关 |
| volume | Number | 0.8 | 音量，范围0-1 |
| sessionCategory | String | 'playback' | 音频会话类别，可选值：'ambient'、'soloAmbient'、'playback' |
| playbackRate | Number | 1.0 | 播放速率，范围0.5-2.0 |
| title | String | '' | 音频标题，在背景音频模式下使用 |
| coverImgUrl | String | '' | 封面图片URL，在背景音频模式下使用 |
| singer | String | '' | 歌手名称，在背景音频模式下使用 |
| useBackgroundAudio | Boolean | false | 是否使用背景音频播放模式（允许后台播放） |

### sessionCategory 说明
- `ambient`: 不中止其他声音播放，不能后台播放，静音后无声音
- `soloAmbient`: 中止其他声音播放，不能后台播放，静音后无声音 
- `playback`: 中止其他声音，可以后台播放，静音后有声音

## 事件说明

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| onCanplay | 音频可以播放时触发 | duration (音频时长) |
| onPlay | 音频开始/继续播放时触发 | - |
| onPause | 音频暂停时触发 | - |
| onStop | 音频停止时触发 | - |
| onEnded | 音频自然播放结束时触发 | - |
| onTimeUpdate | 播放进度变化时触发 | { duration, currentTime, progress } |
| onError | 播放错误时触发 | error对象 |
| onWaiting | 音频加载中时触发 | - |
| onSeeking | 音频跳转中时触发 | - |
| onSeeked | 音频跳转完成时触发 | - |
| onLoading | 音频加载状态变化时触发 | loading状态(Boolean) |
| onNext | 背景音频播放下一首时触发（仅背景音频模式） | - |
| onPrev | 背景音频播放上一首时触发（仅背景音频模式） | - |

## 方法说明

通过ref获取组件实例，可以调用以下方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| play | 开始播放 | - |
| pause | 暂停播放 | - |
| stop | 停止播放 | - |
| seek | 跳转到指定时间 | time (单位：秒) |
| destroy | 销毁音频实例 | - |
| change | 更改音频源并应用设置 | - |
| setProgress | 设置播放进度 | progress (0-100的数值) |
| togglePlay | 切换播放/暂停状态 | - |
| getAudioData | 获取当前音频数据 | - |
| setVolume | 设置音量 | volume (0-1的数值) |
| setSrc | 切换音频源 | src (音频地址), autoplay (是否自动播放) |

## 使用示例

### 基本使用

```vue
<template>
  <view class="container">
    <zx-audio
      ref="audioRef"
      :src="audioSrc"
      :autoplay="false"
      :loop="false"
      :volume="0.8"
      @onCanplay="onCanplay"
      @onPlay="onPlay"
      @onPause="onPause"
      @onTimeUpdate="onTimeUpdate"
      @onEnded="onEnded"
      @onError="onError"
    />
    
    <view class="controls">
      <button @click="handlePlay">{{ isPaused ? '播放' : '暂停' }}</button>
      <button @click="handleStop">停止</button>
      
      <view class="progress-bar">
        <slider 
          :value="progress" 
          :min="0" 
          :max="100" 
          @change="handleProgressChange" 
        />
        <text>{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</text>
      </view>
      
      <view class="volume-control">
        <text>音量：</text>
        <slider 
          :value="volume * 100" 
          :min="0" 
          :max="100" 
          @change="handleVolumeChange" 
        />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ZxAudio from '@/components/zx-audio/zx-audio.vue';

const audioRef = ref(null);
const audioSrc = ref('https://red-education.wufu-app.com/upload/20211123/481d6b654e52961d43c454336a775145.mp3');
const isPaused = ref(true);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(0.8);

// 事件处理
const onCanplay = (dur) => {
  duration.value = dur;
  console.log('音频可以播放，时长：', dur);
};

const onPlay = () => {
  isPaused.value = false;
  console.log('音频开始播放');
};

const onPause = () => {
  isPaused.value = true;
  console.log('音频暂停');
};

const onTimeUpdate = (data) => {
  currentTime.value = data.currentTime;
  duration.value = data.duration;
  progress.value = data.progress;
};

const onEnded = () => {
  isPaused.value = true;
  console.log('播放结束');
};

const onError = (err) => {
  console.error('播放错误', err);
};

// 控制方法
const handlePlay = () => {
  if (isPaused.value) {
    audioRef.value.play();
  } else {
    audioRef.value.pause();
  }
};

const handleStop = () => {
  audioRef.value.stop();
  isPaused.value = true;
};

const handleProgressChange = (e) => {
  const value = e.detail.value;
  audioRef.value.setProgress(value);
};

const handleVolumeChange = (e) => {
  const value = e.detail.value / 100;
  volume.value = value;
  audioRef.value.setVolume(value);
};

// 格式化时间
const formatTime = (time) => {
  if (!time) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
</script>
```

### 背景音频播放示例

```vue
<template>
  <view class="container">
    <zx-audio
      ref="bgAudioRef"
      :src="audioInfo.src"
      :title="audioInfo.title"
      :coverImgUrl="audioInfo.coverImgUrl"
      :singer="audioInfo.singer"
      :useBackgroundAudio="true"
      @onPlay="onPlay"
      @onPause="onPause"
      @onTimeUpdate="onTimeUpdate"
      @onEnded="onEnded"
    />
    
    <view class="music-player">
      <image :src="audioInfo.coverImgUrl" class="cover-image" />
      <view class="info">
        <text class="title">{{ audioInfo.title }}</text>
        <text class="singer">{{ audioInfo.singer }}</text>
      </view>
      
      <view class="progress-bar">
        <text>{{ formatTime(currentTime) }}</text>
        <slider 
          :value="progress" 
          :min="0" 
          :max="100" 
          @change="handleProgressChange" 
        />
        <text>{{ formatTime(duration) }}</text>
      </view>
      
      <view class="controls">
        <button @click="playPrev">上一首</button>
        <button @click="handlePlay" class="play-btn">
          {{ isPaused ? '播放' : '暂停' }}
        </button>
        <button @click="playNext">下一首</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ZxAudio from '@/components/zx-audio/zx-audio.vue';

const bgAudioRef = ref(null);
const isPaused = ref(true);
const progress = ref(0);
const currentTime = ref(0);
const duration = ref(0);
const currentIndex = ref(0);

// 播放列表
const playlist = [
  {
    src: 'https://red-education.wufu-app.com/upload/20211123/481d6b654e52961d43c454336a775145.mp3',
    title: '走进新时代',
    singer: '群星',
    coverImgUrl: 'https://red-education.wufu-app.com/upload/20211123/da546a455fe35fd0c510a332f245e201.png'
  },
  {
    src: 'https://red-education.wufu-app.com/upload/20211123/5abc7bc76fb3958e22e2906d206f7c3a.mp3',
    title: '游击队之歌',
    singer: '群星',
    coverImgUrl: 'https://red-education.wufu-app.com/upload/20211123/0cb8673254484ee7d90cd9598eadd2ac.png'
  },
  {
    src: 'https://red-education.wufu-app.com/upload/20211123/e32d0fcda506700a94e23ec9dff7fee9.mp3',
    title: '咱当兵的人',
    singer: '群星',
    coverImgUrl: 'https://red-education.wufu-app.com/upload/20211123/da546a455fe35fd0c510a332f245e201.png'
  }
];

const audioInfo = reactive(playlist[currentIndex.value]);

// 事件处理
const onPlay = () => {
  isPaused.value = false;
};

const onPause = () => {
  isPaused.value = true;
};

const onTimeUpdate = (data) => {
  currentTime.value = data.currentTime;
  duration.value = data.duration;
  progress.value = data.progress;
};

const onEnded = () => {
  playNext();
};

// 控制方法
const handlePlay = () => {
  if (isPaused.value) {
    bgAudioRef.value.play();
  } else {
    bgAudioRef.value.pause();
  }
};

const handleProgressChange = (e) => {
  const value = e.detail.value;
  bgAudioRef.value.setProgress(value);
};

const playNext = () => {
  currentIndex.value = (currentIndex.value + 1) % playlist.length;
  changeMusic();
};

const playPrev = () => {
  currentIndex.value = (currentIndex.value - 1 + playlist.length) % playlist.length;
  changeMusic();
};

const changeMusic = () => {
  Object.assign(audioInfo, playlist[currentIndex.value]);
  setTimeout(() => {
    bgAudioRef.value.change();
    bgAudioRef.value.play();
  }, 50);
};

// 格式化时间
const formatTime = (time) => {
  if (!time) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
</script>

<style>
.music-player {
  padding: 20px;
}
.cover-image {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin: 0 auto 20px;
  display: block;
}
.info {
  text-align: center;
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.singer {
  font-size: 14px;
  color: #666;
}
.progress-bar {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.progress-bar slider {
  flex: 1;
  margin: 0 10px;
}
.controls {
  display: flex;
  justify-content: space-around;
}
.play-btn {
  width: 100px;
}
</style>
```

## 注意事项

1. 在App平台使用背景音频模式时，需要在 `manifest.json` 中配置：
   - iOS：在 `app-plus -> distribute -> ios` 节点下添加 `"UIBackgroundModes":["audio"]`
   - Android：默认不会在通知栏显示音量控制，需要在插件市场下载相关插件

2. 在小程序平台使用背景音频模式时，需要在 `manifest.json` 中对应小程序节点下添加 `"requiredBackgroundModes": ["audio"]`

3. 不同平台可能存在部分API差异，请根据实际情况调整使用方式

## API参考

- [uni-app 音频组件文档](https://uniapp.dcloud.net.cn/component/audio.html)
- [uni-app 背景音频管理器](https://uniapp.dcloud.net.cn/api/media/background-audio-manager.html)
- [uni-app 音频上下文](https://uniapp.dcloud.net.cn/api/media/audio-context.html)
