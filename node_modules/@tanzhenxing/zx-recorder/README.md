# zx-recorder 录音组件

一个基于 uni-app 录音管理器的高级录音组件，支持录音、播放、暂停、继续、上传等功能。

## 特性

- ✅ **完整的录音控制**：开始、停止、暂停、继续
- ✅ **实时播放**：录音完成后可直接播放
- ✅ **自动上传**：支持自动上传到 uniCloud 云存储
- ✅ **状态管理**：完整的录音状态跟踪和显示
- ✅ **错误处理**：完善的错误提示和处理机制
- ✅ **进度显示**：录音时间计时和上传进度显示
- ✅ **灵活配置**：支持多种音频格式和参数配置
- ✅ **事件回调**：丰富的事件监听机制
- ✅ **美观UI**：现代化的用户界面设计

## 平台支持

| 平台 | 支持状态 | 说明 |
|------|---------|------|
| App | ✅ | 完全支持 |
| H5 | ✅ | 完全支持 |
| 微信小程序 | ✅ | 完全支持 |
| 百度小程序 | ✅ | 完全支持 |
| 支付宝小程序 | ❌ | 不支持 |
| HarmonyOS Next | ❌ | 不支持 |

## 安装使用

### 1. 复制组件文件

将 `zx-recorder.vue` 文件复制到您的项目中。

### 2. 基础使用

```vue
<template>
  <view>
    <zx-recorder 
      @end="onRecordEnd"
      @error="onRecordError"
    />
  </view>
</template>

<script setup>
import zxRecorder from '@/components/zx-recorder/zx-recorder.vue';

const onRecordEnd = (recordFile) => {
  console.log('录音完成:', recordFile);
};

const onRecordError = (error) => {
  console.error('录音出错:', error);
};
</script>
```

### 3. 高级配置

```vue
<template>
  <zx-recorder 
    :duration="120000"
    :sampleRate="44100"
    :format="'aac'"
    :autoUpload="true"
    :cloudPathPrefix="'my-audio/'"
    :detectDecibel="true"
    @start="onStart"
    @stop="onStop"
    @pause="onPause"
    @resume="onResume"
    @end="onEnd"
    @error="onError"
    @play="onPlay"
    @playEnd="onPlayEnd"
  />
</template>
```

## API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | Boolean | true | 是否显示录音控制按钮 |
| duration | Number | 60000 | 录音时长限制（毫秒），最大值 600000（10分钟） |
| sampleRate | Number | 16000 | 采样率，有效值：8000/16000/44100 |
| numberOfChannels | Number | 2 | 录音通道数，有效值：1、2 |
| encodeBitRate | Number | 64000 | 编码码率 |
| format | String | 'mp3' | 音频格式，有效值：aac/mp3/wav/PCM |
| frameSize | Number | 1 | 指定帧大小，单位 KB |
| hideTips | Boolean | false | 是否隐藏录音状态提示 |
| audioSource | String | '' | 录音的音频输入源 |
| detectDecibel | Boolean | false | 是否检测声音分贝数 |
| autoUpload | Boolean | true | 是否自动上传到云存储 |
| cloudPathPrefix | String | 'audio/' | 云存储路径前缀 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| start | res | 开始录音时触发 |
| stop | res | 停止录音时触发 |
| pause | res | 暂停录音时触发 |
| resume | res | 继续录音时触发 |
| end | recordFile | 录音结束时触发，包含完整的录音文件信息 |
| error | error | 录音出错时触发 |
| play | - | 开始播放录音时触发 |
| playEnd | - | 播放结束时触发 |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| startRecord | - | - | 开始录音 |
| stopRecord | - | - | 停止录音 |
| pauseRecord | - | - | 暂停录音 |
| resumeRecord | - | - | 继续录音 |
| playAudio | - | - | 播放录音 |
| stopAudio | - | - | 停止播放 |
| getRecordFile | - | Object | 获取录音文件信息 |
| resetRecorder | - | - | 重置录音器状态 |
| uploadFile | - | Promise | 手动上传文件 |

### 录音文件对象

```javascript
{
  duration: 30000,           // 录音时长（毫秒）
  tempFilePath: '...',       // 临时文件路径
  fileSize: 256000,          // 文件大小（字节）
  url: '...',                // 云存储文件 URL
  key: '...',                // 云存储文件 key
  cloudPath: '...'           // 云存储文件路径
}
```

## 完整示例

### 基础录音功能

```vue
<template>
  <view>
    <zx-recorder 
      ref="recorder"
      :autoUpload="false"
      @end="handleRecordEnd"
    />
    
    <button @click="handleReset">重置</button>
    <button @click="handleUpload">上传</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxRecorder from '@/components/zx-recorder/zx-recorder.vue';

const recorder = ref();

const handleRecordEnd = (recordFile) => {
  console.log('录音信息:', recordFile);
  uni.showToast({
    title: `录音完成: ${Math.round(recordFile.duration/1000)}秒`,
    duration: 2000
  });
};

const handleReset = () => {
  recorder.value.resetRecorder();
};

const handleUpload = async () => {
  try {
    await recorder.value.uploadFile();
    uni.showToast({ title: '上传成功' });
  } catch (error) {
    uni.showToast({ title: '上传失败', icon: 'error' });
  }
};
</script>
```

### 高级配置示例

```vue
<template>
  <view>
    <!-- 高音质录音 -->
    <zx-recorder 
      :duration="300000"
      :sampleRate="44100"
      :numberOfChannels="2"
      :encodeBitRate="128000"
      :format="'aac'"
      :detectDecibel="true"
      @end="handleHighQualityRecord"
    />
  </view>
</template>

<script setup>
const handleHighQualityRecord = (recordFile) => {
  console.log('高音质录音完成:', recordFile);
  // 处理高音质录音
};
</script>
```

## 错误处理

组件内置了完善的错误处理机制：

```javascript
// 录音权限错误
{
  errCode: 10001,
  errMsg: '未获得录音权限'
}

// 网络错误
{
  errCode: 10002,
  errMsg: '网络问题无法录音'
}

// 录音被占用
{
  errCode: 10003,
  errMsg: '录音功能被占用'
}

// 录音已暂停
{
  errCode: 10004,
  errMsg: '录音已经被暂停'
}
```

## 注意事项

1. **权限要求**：使用前请确保应用已获取录音权限
2. **平台限制**：部分平台可能不支持某些音频格式
3. **文件上传**：需要配置 uniCloud 云存储才能使用自动上传功能
4. **内存管理**：长时间录音请注意内存使用情况
5. **兼容性**：微信小程序建议使用 API 方式而不是 audio 组件

## 更新日志

### v1.0.0
- ✅ 初始版本发布
- ✅ 支持基础录音功能
- ✅ 支持音频播放
- ✅ 支持云存储上传
- ✅ 完善的状态管理
- ✅ 错误处理机制

## 参考文档

- [uni-app 录音管理器](https://uniapp.dcloud.net.cn/api/media/record-manager.html)
- [uni-app 音频上下文](https://uniapp.dcloud.net.cn/api/media/audio-context.html)
- [uni-app 背景音频管理](https://uniapp.dcloud.net.cn/api/media/background-audio-manager.html)
- [uni-app audio 组件](https://uniapp.dcloud.net.cn/component/audio.html)

## 许可证

MIT License
