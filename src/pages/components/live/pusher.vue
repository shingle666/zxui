<template>
  <view class="live-pusher-demo">
    <view class="status-bar">
      <view class="status-item">
        <text class="label">推流状态:</text>
        <text class="value" :class="{'status-active': isPushing}">{{ isPushing ? '推流中' : '未推流' }}</text>
      </view>
      <view class="status-item">
        <text class="label">预览状态:</text>
        <text class="value" :class="{'status-active': isPreviewing}">{{ isPreviewing ? '预览中' : '未预览' }}</text>
      </view>
    </view>

    <view class="pusher-container">
      <zx-live-pusher
        ref="livePusher"
        :url="pushUrl"
        :mode="mode"
        :aspect="aspect"
        :beauty="beauty"
        :whiteness="whiteness"
        :device-position="devicePosition"
        :muted="muted"
        :enable-camera="enableCamera"
        :orientation="orientation"
        :local-mirror="localMirror"
        :auto-focus="autoFocus"
        @statechange="onStateChange"
        @netstatus="onNetStatus"
        @error="onError"
        @started="onStarted"
        @stopped="onStopped"
        @paused="onPaused"
        @resumed="onResumed"
        @previewStarted="onPreviewStarted"
        @previewStopped="onPreviewStopped"
        @cameraSwitched="onCameraSwitched"
        @snapshotTaken="onSnapshotTaken"
      />
    </view>

    <view class="control-panels">
      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">推流控制</text>
        </view>
        <view class="panel-body">
          <view class="button-group">
            <button class="btn" :disabled="isPushing" @click="startPush">开始推流</button>
            <button class="btn" :disabled="!isPushing" @click="stopPush">停止推流</button>
            <button class="btn" :disabled="!isPushing" @click="pausePush">暂停推流</button>
            <button class="btn" :disabled="!isPushing" @click="resumePush">恢复推流</button>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">预览控制</text>
        </view>
        <view class="panel-body">
          <view class="button-group">
            <button class="btn" :disabled="isPreviewing" @click="startPreview">开启预览</button>
            <button class="btn" :disabled="!isPreviewing" @click="stopPreview">关闭预览</button>
            <button class="btn" :disabled="!enableCamera" @click="switchCamera">切换摄像头</button>
            <button class="btn" :disabled="!isPreviewing" @click="takeSnapshot">截图</button>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">美颜调节</text>
        </view>
        <view class="panel-body">
          <view class="slider-group">
            <text class="slider-label">美颜 ({{beauty}})</text>
            <slider :value="beauty" :min="0" :max="9" :step="1" @change="onBeautyChange" show-value />
          </view>
          <view class="slider-group">
            <text class="slider-label">美白 ({{whiteness}})</text>
            <slider :value="whiteness" :min="0" :max="9" :step="1" @change="onWhitenessChange" show-value />
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">设置</text>
        </view>
        <view class="panel-body">
          <view class="setting-item">
            <text class="setting-label">视频模式</text>
            <radio-group @change="onModeChange">
              <label class="radio-item" v-for="item in modes" :key="item.value">
                <radio :value="item.value" :checked="mode === item.value" />
                <text>{{item.name}}</text>
              </label>
            </radio-group>
          </view>

          <view class="setting-item">
            <text class="setting-label">镜像模式</text>
            <radio-group @change="onMirrorChange">
              <label class="radio-item" v-for="item in mirrors" :key="item.value">
                <radio :value="item.value" :checked="localMirror === item.value" />
                <text>{{item.name}}</text>
              </label>
            </radio-group>
          </view>

          <view class="setting-item">
            <switch :checked="muted" @change="onMutedChange" />
            <text class="setting-label">静音</text>
          </view>

          <view class="setting-item">
            <switch :checked="enableCamera" @change="onCameraChange" />
            <text class="setting-label">启用摄像头</text>
          </view>

          <view class="setting-item">
            <switch :checked="autoFocus" @change="onAutoFocusChange" />
            <text class="setting-label">自动对焦</text>
          </view>

          <view class="setting-item">
            <text class="setting-label">摄像头位置: {{devicePosition === 'front' ? '前置' : '后置'}}</text>
          </view>

          <view class="setting-item">
            <text class="setting-label">推流地址</text>
            <input class="input" v-model="pushUrl" placeholder="请输入推流地址" />
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">网络状态</text>
        </view>
        <view class="panel-body">
          <view class="log-content">
            <view class="log-item" v-if="netStatus">
              <text>视频码率: {{netStatus.videoBitrate}} kbps</text>
              <text>音频码率: {{netStatus.audioBitrate}} kbps</text>
              <text>视频帧率: {{netStatus.videoFPS}}</text>
              <text>网络速度: {{netStatus.netSpeed}} kb/s</text>
              <text>视频宽高: {{netStatus.videoWidth}}x{{netStatus.videoHeight}}</text>
            </view>
            <view class="log-item" v-else>
              <text>暂无网络状态数据</text>
            </view>
          </view>
        </view>
      </view>

      <view class="panel">
        <view class="panel-header">
          <text class="panel-title">事件日志</text>
        </view>
        <view class="panel-body">
          <scroll-view class="log-content" scroll-y>
            <view class="log-item" v-for="(log, index) in logs" :key="index">
              <text>[{{log.time}}] {{log.message}}</text>
            </view>
            <view class="log-item" v-if="logs.length === 0">
              <text>暂无日志</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ZxLivePusher from '@/components/zx-live-pusher/zx-live-pusher.vue'

export default {
  components: {
    ZxLivePusher
  },
  data() {
    return {
      // 推流参数
      pushUrl: 'rtmp://live.example.com/live/stream123', // 推流地址，实际使用时需要替换
      mode: 'SD', // 视频模式: SD(标清), HD(高清), FHD(超清)
      aspect: '9:16', // 视频宽高比例
      beauty: 5, // 美颜程度，范围 0-9
      whiteness: 5, // 美白程度，范围 0-9
      devicePosition: 'front', // 摄像头朝向，front(前置)，back(后置)
      muted: false, // 是否静音
      enableCamera: true, // 是否启用摄像头
      orientation: 'vertical', // 画面方向
      localMirror: 'auto', // 本地镜像设置
      autoFocus: true, // 自动对焦
      
      // 状态
      isPushing: false, // 是否正在推流
      isPreviewing: false, // 是否正在预览
      netStatus: null, // 网络状态
      logs: [], // 日志记录
      
      // 选项数据
      modes: [
        { name: '标清', value: 'SD' },
        { name: '高清', value: 'HD' },
        { name: '超清', value: 'FHD' }
      ],
      mirrors: [
        { name: '自动', value: 'auto' },
        { name: '启用', value: 'enable' },
        { name: '禁用', value: 'disable' }
      ]
    }
  },
  onReady() {
    // 页面加载完成后自动开启预览
    this.startPreview();
  },
  methods: {
    // 开始推流
    async startPush() {
      if (!this.pushUrl) {
        uni.showToast({
          title: '推流地址不能为空',
          icon: 'none'
        });
        return;
      }
      
      try {
        await this.$refs.livePusher.startPush();
        this.addLog('开始推流请求已发送');
      } catch (err) {
        this.addLog(`开始推流失败: ${err.errMsg || JSON.stringify(err)}`);
        uni.showToast({
          title: '开始推流失败',
          icon: 'none'
        });
      }
    },
    
    // 停止推流
    async stopPush() {
      try {
        await this.$refs.livePusher.stopPush();
        this.addLog('停止推流请求已发送');
      } catch (err) {
        this.addLog(`停止推流失败: ${err.errMsg || JSON.stringify(err)}`);
      }
    },
    
    // 暂停推流
    async pausePush() {
      try {
        await this.$refs.livePusher.pausePush();
        this.addLog('暂停推流请求已发送');
      } catch (err) {
        this.addLog(`暂停推流失败: ${err.errMsg || JSON.stringify(err)}`);
      }
    },
    
    // 恢复推流
    async resumePush() {
      try {
        await this.$refs.livePusher.resumePush();
        this.addLog('恢复推流请求已发送');
      } catch (err) {
        this.addLog(`恢复推流失败: ${err.errMsg || JSON.stringify(err)}`);
      }
    },
    
    // 开启预览
    async startPreview() {
      try {
        await this.$refs.livePusher.startPreview();
        this.addLog('开启预览请求已发送');
      } catch (err) {
        this.addLog(`开启预览失败: ${err.errMsg || JSON.stringify(err)}`);
        uni.showToast({
          title: '开启预览失败',
          icon: 'none'
        });
      }
    },
    
    // 关闭预览
    async stopPreview() {
      try {
        await this.$refs.livePusher.stopPreview();
        this.addLog('关闭预览请求已发送');
      } catch (err) {
        this.addLog(`关闭预览失败: ${err.errMsg || JSON.stringify(err)}`);
      }
    },
    
    // 切换摄像头
    async switchCamera() {
      try {
        await this.$refs.livePusher.switchCamera();
        this.devicePosition = this.devicePosition === 'front' ? 'back' : 'front';
        this.addLog(`切换到${this.devicePosition === 'front' ? '前置' : '后置'}摄像头`);
      } catch (err) {
        this.addLog(`切换摄像头失败: ${err.errMsg || JSON.stringify(err)}`);
      }
    },
    
    // 截图
    async takeSnapshot() {
      try {
        const result = await this.$refs.livePusher.snapshot();
        this.addLog('截图成功');
        uni.showToast({
          title: '截图成功',
          icon: 'success'
        });
      } catch (err) {
        this.addLog(`截图失败: ${err.errMsg || JSON.stringify(err)}`);
        uni.showToast({
          title: '截图失败',
          icon: 'none'
        });
      }
    },
    
    // 美颜调节
    onBeautyChange(e) {
      this.beauty = e.detail.value;
      this.addLog(`美颜调整为: ${this.beauty}`);
    },
    
    // 美白调节
    onWhitenessChange(e) {
      this.whiteness = e.detail.value;
      this.addLog(`美白调整为: ${this.whiteness}`);
    },
    
    // 模式切换
    onModeChange(e) {
      this.mode = e.detail.value;
      this.addLog(`视频模式切换为: ${this.mode}`);
    },
    
    // 镜像设置
    onMirrorChange(e) {
      this.localMirror = e.detail.value;
      this.addLog(`镜像模式切换为: ${this.localMirror}`);
    },
    
    // 静音切换
    onMutedChange(e) {
      this.muted = e.detail.value;
      this.addLog(`${this.muted ? '开启' : '关闭'}静音`);
    },
    
    // 摄像头开关
    onCameraChange(e) {
      this.enableCamera = e.detail.value;
      this.addLog(`${this.enableCamera ? '启用' : '禁用'}摄像头`);
    },
    
    // 自动对焦开关
    onAutoFocusChange(e) {
      this.autoFocus = e.detail.value;
      this.addLog(`${this.autoFocus ? '启用' : '禁用'}自动对焦`);
    },
    
    // 状态变化事件
    onStateChange(e) {
      const { code, message } = e.detail;
      this.addLog(`状态变化: code=${code}, message=${message || '无'}`);
      
      // 处理特定状态码
      if (code === 1007) {
        this.isPushing = true;
        this.addLog('首帧画面采集完成，推流已开始');
      } else if (code === 1008) {
        this.isPushing = true;
        this.addLog('编码器启动，推流进行中');
      } else if (code < 0) {
        this.isPushing = false;
        uni.showToast({
          title: `推流异常: ${code}`,
          icon: 'none'
        });
      }
    },
    
    // 网络状态事件
    onNetStatus(e) {
      this.netStatus = e.detail;
    },
    
    // 错误事件
    onError(e) {
      const { errCode, errMsg } = e.detail;
      this.addLog(`推流错误: code=${errCode}, msg=${errMsg}`);
      uni.showModal({
        title: '推流错误',
        content: `错误码: ${errCode}, 错误信息: ${errMsg}`,
        showCancel: false
      });
    },
    
    // 推流开始事件
    onStarted(res) {
      this.isPushing = true;
      this.addLog('推流已开始');
    },
    
    // 推流停止事件
    onStopped(res) {
      this.isPushing = false;
      this.addLog('推流已停止');
    },
    
    // 推流暂停事件
    onPaused(res) {
      this.addLog('推流已暂停');
    },
    
    // 推流恢复事件
    onResumed(res) {
      this.addLog('推流已恢复');
    },
    
    // 预览开始事件
    onPreviewStarted(res) {
      this.isPreviewing = true;
      this.addLog('预览已开始');
    },
    
    // 预览停止事件
    onPreviewStopped(res) {
      this.isPreviewing = false;
      this.addLog('预览已停止');
    },
    
    // 摄像头切换事件
    onCameraSwitched(res) {
      this.addLog('摄像头已切换');
    },
    
    // 截图完成事件
    onSnapshotTaken(res) {
      const { tempImagePath } = res;
      this.addLog(`截图完成: ${tempImagePath}`);
      
      // 可以在这里处理截图，比如上传或预览
      uni.previewImage({
        urls: [tempImagePath]
      });
    },
    
    // 添加日志
    addLog(message) {
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      this.logs.unshift({
        time,
        message
      });
      
      // 最多保留50条日志
      if (this.logs.length > 50) {
        this.logs = this.logs.slice(0, 50);
      }
    }
  }
}
</script>

<style lang="scss">
.live-pusher-demo {
  padding: 20rpx;
  
  .status-bar {
    display: flex;
    justify-content: space-around;
    background-color: #f8f8f8;
    padding: 20rpx;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    
    .status-item {
      display: flex;
      align-items: center;
      
      .label {
        margin-right: 10rpx;
        font-size: 28rpx;
      }
      
      .value {
        font-size: 28rpx;
        color: #999;
        
        &.status-active {
          color: #07c160;
          font-weight: bold;
        }
      }
    }
  }
  
  .pusher-container {
    width: 100%;
    height: 400rpx;
    background-color: #000;
    margin-bottom: 20rpx;
    
    // zx-live-pusher组件会自动填充容器
    /deep/ .zx-live-pusher-container {
      width: 100%;
      height: 100%;
    }
  }
  
  .control-panels {
    .panel {
      margin-bottom: 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
      overflow: hidden;
      
      .panel-header {
        background-color: #f8f8f8;
        padding: 20rpx;
        border-bottom: 1rpx solid #eee;
        
        .panel-title {
          font-size: 30rpx;
          font-weight: bold;
        }
      }
      
      .panel-body {
        padding: 20rpx;
      }
    }
  }
  
  .button-group {
    display: flex;
    flex-wrap: wrap;
    
    .btn {
      flex: 1;
      min-width: 160rpx;
      margin: 10rpx;
      font-size: 28rpx;
      padding: 10rpx 0;
    }
  }
  
  .slider-group {
    margin-bottom: 20rpx;
    
    .slider-label {
      font-size: 28rpx;
      margin-bottom: 10rpx;
      display: block;
    }
  }
  
  .setting-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .setting-label {
      font-size: 28rpx;
      margin-left: 20rpx;
    }
    
    .input {
      border: 1rpx solid #eee;
      padding: 10rpx;
      border-radius: 6rpx;
      flex: 1;
      font-size: 28rpx;
    }
    
    .radio-item {
      margin-right: 30rpx;
      font-size: 28rpx;
    }
  }
  
  .log-content {
    max-height: 400rpx;
    
    .log-item {
      font-size: 24rpx;
      margin-bottom: 10rpx;
      word-break: break-all;
      
      text {
        display: block;
      }
    }
  }
}
</style>
