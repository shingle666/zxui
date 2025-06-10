<template>
  <view class="zx-web-view-container">
    <web-view :src="src" :webview-styles="webviewStyles" :fullscreen="fullscreen" @message="handleMessage"
      @onPostMessage="handlePostMessage" @error="handleError" @pagestart="handlePageStart"
      @pagefinish="handlePageFinish" :sandbox="sandbox" :allow="allow"></web-view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  // web-view 指向网页的链接
  src: {
    type: String,
    default: ''
  },
  // web-view 的样式
  webviewStyles: {
    type: Object,
    default: () => ({})
  },
  // 是否铺满整个页面
  fullscreen: {
    type: Boolean,
    default: true
  },
  // H5平台 iframe的sandbox属性
  sandbox: {
    type: String,
    default: ''
  },
  // H5平台 iframe的allow属性
  allow: {
    type: String,
    default: ''
  },
  // 是否启用双指缩放
  scalable: {
    type: Boolean,
    default: false
  },
  // 是否自动获取webview上下文
  autoGetContext: {
    type: Boolean,
    default: true
  },
  // 网页加载超时时间(毫秒)
  timeout: {
    type: Number,
    default: 15000
  }
})

const webviewContext = ref(null)
const isLoading = ref(false)
const timeoutTimer = ref(null)
const isReady = ref(false)
const emit = defineEmits(['ready', 'message', 'postMessage', 'error', 'pagestart', 'pagefinish', 'timeout'])

/**
 * 设置超时检测
 */
const setupTimeoutCheck = () => {
  clearTimeoutTimer()
  if (props.timeout > 0) {
    timeoutTimer.value = setTimeout(() => {
      if (isLoading.value) {
        emit('timeout', { url: props.src })
      }
    }, props.timeout)
  }
}

/**
 * 清除超时计时器
 */
const clearTimeoutTimer = () => {
  if (timeoutTimer.value) {
    clearTimeout(timeoutTimer.value)
    timeoutTimer.value = null
  }
}

/**
 * 获取web-view组件上下文
 */
const getWebviewContext = () => {
  // #ifdef APP-PLUS
  const currentWebview = uni.getCurrentSubNVue() ? uni.getCurrentSubNVue() :
    (uni.$scope && uni.$scope.$getAppWebview ? uni.$scope.$getAppWebview() : null)

  if (currentWebview) {
    setTimeout(() => {
      if (currentWebview.children && currentWebview.children() && currentWebview.children().length > 0) {
        webviewContext.value = currentWebview.children()[0]

        // 设置是否可缩放
        if (props.scalable) {
          webviewContext.value.setStyle({
            scalable: true
          })
        }

        isReady.value = true
        emit('ready', webviewContext.value)
      }
    }, 1000)
  }
  // #endif

  // #ifdef H5 || MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
  // 通过uni API创建web-view上下文
  try {
    webviewContext.value = uni.createWebviewContext('webview')
    isReady.value = true
    emit('ready', webviewContext.value)
  } catch (e) {
    console.error('创建web-view上下文失败', e)
  }
  // #endif
}

/**
 * 处理web-view发送的消息
 */
const handleMessage = (event) => {
  emit('message', event.detail)
}

/**
 * 处理web-view通过uni.postMessage发送的消息
 */
const handlePostMessage = (event) => {
  emit('postMessage', event.detail)
}

/**
 * 处理web-view加载错误
 */
const handleError = (event) => {
  isLoading.value = false
  clearTimeoutTimer()
  emit('error', event.detail)
}

/**
 * 处理web-view开始加载页面
 */
const handlePageStart = (event) => {
  isLoading.value = true
  setupTimeoutCheck()
  emit('pagestart', event.detail)
}

/**
 * 处理web-view页面加载完成
 */
const handlePageFinish = (event) => {
  isLoading.value = false
  clearTimeoutTimer()
  emit('pagefinish', event.detail)
}

/**
 * 向web-view注入并执行JS代码
 * @param {String} jsCode 要执行的JS代码
 */
const evalJS = (jsCode) => {
  if (!webviewContext.value) {
    console.warn('webview上下文未初始化，无法执行evalJS')
    return false
  }

  try {
    // #ifdef APP-PLUS
    webviewContext.value.evalJS(jsCode)
    // #endif

    // #ifdef H5 || MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    if (webviewContext.value.evalJS) {
      webviewContext.value.evalJS(jsCode)
    }
    // #endif

    return true
  } catch (e) {
    console.error('执行evalJS失败', e)
    return false
  }
}

/**
 * 设置web-view的样式
 * @param {Object} styles 样式对象
 */
const setStyle = (styles) => {
  // #ifdef APP-PLUS
  if (webviewContext.value) {
    try {
      webviewContext.value.setStyle(styles)
      return true
    } catch (e) {
      console.error('设置样式失败', e)
      return false
    }
  }
  // #endif

  return false
}

/**
 * 重新加载web-view
 */
const reload = () => {
  if (!webviewContext.value) {
    console.warn('webview上下文未初始化，无法执行reload')
    return false
  }

  try {
    // #ifdef APP-PLUS
    webviewContext.value.reload()
    // #endif

    // #ifdef H5 || MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    if (webviewContext.value.reload) {
      webviewContext.value.reload()
    }
    // #endif

    return true
  } catch (e) {
    console.error('执行reload失败', e)
    return false
  }
}

/**
 * 前进
 */
const forward = () => {
  // #ifdef APP-PLUS
  if (webviewContext.value) {
    try {
      webviewContext.value.forward()
      return true
    } catch (e) {
      console.error('执行forward失败', e)
      return false
    }
  }
  // #endif

  return false
}

/**
 * 后退
 */
const back = () => {
  // #ifdef APP-PLUS
  if (webviewContext.value) {
    try {
      webviewContext.value.back()
      return true
    } catch (e) {
      console.error('执行back失败', e)
      return false
    }
  }
  // #endif

  return false
}

/**
 * 判断是否可后退
 */
const canBack = () => {
  // #ifdef APP-PLUS
  if (webviewContext.value) {
    try {
      return webviewContext.value.canBack()
    } catch (e) {
      console.error('执行canBack失败', e)
      return false
    }
  }
  // #endif

  return false
}

/**
 * 向网页发送消息
 * @param {Object} data 要发送的数据
 */
const postMessage = (data) => {
  if (!isReady.value) {
    console.warn('webview未准备就绪，无法发送消息')
    return false
  }

  // 使用uni API向网页发送消息
  try {
    evalJS(`
      if (window.uni && window.uni.postMessage) {
        window.uni.postMessage({
          data: ${JSON.stringify(data)}
        });
      } else if (document.dispatchEvent) {
        document.dispatchEvent(new CustomEvent('uniPostMessage', {
          detail: {
            data: ${JSON.stringify(data)}
          }
        }));
      }
    `)
    return true
  } catch (e) {
    console.error('发送消息失败', e)
    return false
  }
}

// 生命周期钩子
onMounted(() => {
  if (props.autoGetContext) {
    getWebviewContext()
  }

  // 设置超时检测
  setupTimeoutCheck()
})

onBeforeUnmount(() => {
  // 清除超时计时器
  clearTimeoutTimer()
})

// 导出方法供父组件调用
defineExpose({
  evalJS,
  setStyle,
  reload,
  forward,
  back,
  canBack,
  postMessage
})
</script>

<style lang="scss">
.zx-web-view-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
