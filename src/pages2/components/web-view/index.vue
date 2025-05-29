<template>
  <view class="content">
    <view class="header">
      <view class="title">zx-web-view 示例</view>
      <view class="actions">
        <button @click="reload" class="btn">刷新</button>
        <button @click="goBack" class="btn" :disabled="!canGoBack">返回</button>
        <button @click="sendMsg" class="btn">发送消息</button>
      </view>
    </view>
    
    <view class="webview-container">
      <zx-web-view
        ref="webview"
        :src="url"
        :scalable="true"
        @ready="onWebviewReady"
        @message="onMessage"
        @postMessage="onPostMessage"
        @error="onError"
        @pagestart="onPageStart"
        @pagefinish="onPageFinish"
        @timeout="onTimeout"
      ></zx-web-view>
    </view>
    
    <view class="logs">
      <view class="log-title">日志信息：</view>
      <scroll-view scroll-y class="log-content">
        <view v-for="(log, index) in logs" :key="index" class="log-item">
          <text class="log-time">{{log.time}}</text>
          <text class="log-type" :class="'log-type-' + log.type">{{log.type}}</text>
          <text class="log-msg">{{log.message}}</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const webview = ref(null)
const url = ref('https://zxui.org')
const logs = ref([])
const canGoBack = ref(false)

/**
 * 添加日志
 */
const addLog = (type, message) => {
  const now = new Date()
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  logs.value.unshift({
    time,
    type,
    message: typeof message === 'object' ? JSON.stringify(message) : message
  })
  
  // 最多保留50条日志
  if (logs.value.length > 50) {
    logs.value.pop()
  }
}

/**
 * web-view 准备就绪
 */
const onWebviewReady = (webviewContext) => {
  addLog('ready', '网页组件已准备就绪')
  updateBackStatus()
}

/**
 * 接收 web-view 发送的消息
 */
const onMessage = (data) => {
  addLog('message', data)
}

/**
 * 接收 web-view 通过 uni.postMessage 发送的消息
 */
const onPostMessage = (data) => {
  addLog('postMessage', data)
}

/**
 * web-view 加载出错
 */
const onError = (error) => {
  addLog('error', error)
}

/**
 * web-view 开始加载页面
 */
const onPageStart = (data) => {
  addLog('pagestart', `开始加载: ${data.url || '未知URL'}`)
}

/**
 * web-view 页面加载完成
 */
const onPageFinish = (data) => {
  addLog('pagefinish', `加载完成: ${data.url || '未知URL'}`)
  updateBackStatus()
}

/**
 * web-view 加载超时
 */
const onTimeout = (data) => {
  addLog('timeout', `加载超时: ${data.url}`)
}

/**
 * 更新后退按钮状态
 */
const updateBackStatus = () => {
  // #ifdef APP-PLUS
  if (webview.value) {
    canGoBack.value = webview.value.canBack()
  }
  // #endif
}

/**
 * 刷新网页
 */
const reload = () => {
  if (webview.value) {
    const result = webview.value.reload()
    addLog('action', `刷新页面: ${result ? '成功' : '失败'}`)
  }
}

/**
 * 网页后退
 */
const goBack = () => {
  if (webview.value) {
    const result = webview.value.back()
    addLog('action', `页面后退: ${result ? '成功' : '失败'}`)
    setTimeout(() => {
      updateBackStatus()
    }, 500)
  }
}

/**
 * 向网页发送消息
 */
const sendMsg = () => {
  if (webview.value) {
    const data = {
      type: 'test',
      content: '来自应用的消息',
      timestamp: Date.now()
    }
    const result = webview.value.postMessage(data)
    addLog('action', `发送消息: ${result ? '成功' : '失败'}, 内容: ${JSON.stringify(data)}`)
  }
}

/**
 * 拦截返回按钮事件
 */
const onBackPress = () => {
  // 拦截返回按钮事件
  if (webview.value && webview.value.canBack()) {
    // 如果web-view可以返回，则返回上一页
    webview.value.back()
    return true // 返回true表示已处理返回事件
  }
  // 返回false表示未处理返回事件，将继续执行默认的返回逻辑
  return false
}

// 暴露方法供页面调用
defineExpose({
  onBackPress
})
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  background-color: #2979ff;
  color: #fff;
  padding: 10px 15px;
  
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .actions {
    display: flex;
    justify-content: space-between;
    
    .btn {
      flex: 1;
      margin: 0 5px;
      font-size: 14px;
      padding: 6px 0;
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: none;
      
      &:disabled {
        opacity: 0.5;
      }
    }
  }
}

.webview-container {
  flex: 1;
}

.logs {
  height: 200px;
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
  
  .log-title {
    padding: 5px 10px;
    font-size: 14px;
    color: #666;
    background-color: #eee;
  }
  
  .log-content {
    height: 170px;
  }
  
  .log-item {
    padding: 5px 10px;
    font-size: 12px;
    border-bottom: 1px solid #eee;
    
    .log-time {
      color: #999;
      margin-right: 5px;
    }
    
    .log-type {
      margin-right: 5px;
      padding: 2px 4px;
      border-radius: 3px;
      color: #fff;
      
      &.log-type-ready {
        background-color: #67c23a;
      }
      
      &.log-type-message,
      &.log-type-postMessage {
        background-color: #409eff;
      }
      
      &.log-type-error,
      &.log-type-timeout {
        background-color: #f56c6c;
      }
      
      &.log-type-pagestart,
      &.log-type-pagefinish {
        background-color: #909399;
      }
      
      &.log-type-action {
        background-color: #e6a23c;
      }
    }
    
    .log-msg {
      color: #333;
      word-break: break-all;
    }
  }
}
</style> 