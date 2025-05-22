# zx-web-view 组件

基于 uni-app 的 web-view 组件封装，提供了更方便的接口和方法，支持 H5、App 和小程序平台。使用Vue 3的setup语法开发。

## 使用方法

### 基础用法

```vue
<template>
  <zx-web-view 
    :src="url" 
    @message="handleMessage"
    @postMessage="handlePostMessage"
    @ready="handleReady"
  ></zx-web-view>
</template>

<script setup>
import ZxWebView from '@/components/zx-web-view/zx-web-view.vue'
import { ref } from 'vue'

const url = ref('https://example.com')

// web-view 准备就绪
const handleReady = (webviewContext) => {
  console.log('web-view 已准备就绪', webviewContext)
  // 可以在这里获取 webviewContext 进行操作
}

// 接收 web-view 发送的消息
const handleMessage = (data) => {
  console.log('收到 web-view 发送的消息', data)
}

// 接收 web-view 通过 uni.postMessage 发送的消息
const handlePostMessage = (data) => {
  console.log('收到 postMessage 消息', data)
}
</script>
```

### 在网页中与组件通信

在 web-view 加载的网页中，需要引入 uni SDK，然后可以使用 `uni.postMessage` 方法发送消息给宿主应用。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>网页标题</title>
</head>
<body>
  <div id="app">
    <button onclick="sendMessage()">发送消息给宿主应用</button>
  </div>
  
  <!-- 引入 uni SDK -->
  <script type="text/javascript" src="https://gitcode.net/dcloud/uni-app/-/raw/dev/dist/uni.webview.1.5.6.js"></script>
  <script>
    // 监听页面准备完成事件
    document.addEventListener('UniAppJSBridgeReady', function() {
      // 获取当前环境
      uni.webView.getEnv(function(res) {
        console.log('当前环境：' + JSON.stringify(res))
      })
    })
    
    // 发送消息给宿主应用
    function sendMessage() {
      uni.webView.postMessage({
        data: {
          action: 'submit',
          params: {
            name: 'test',
            value: 123
          }
        }
      })
    }
  </script>
</body>
</html>
```

### 自定义浏览器返回按钮处理

```vue
<template>
  <zx-web-view 
    ref="webview"
    :src="url" 
    @ready="handleReady"
  ></zx-web-view>
</template>

<script setup>
import ZxWebView from '@/components/zx-web-view/zx-web-view.vue'
import { ref } from 'vue'

const webview = ref(null)
const url = ref('https://example.com')

const handleReady = () => {
  console.log('web-view已准备就绪')
}

// 在页面中定义onBackPress方法
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

// 将onBackPress方法暴露给页面
defineExpose({
  onBackPress
})
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| src | String | '' | web-view 指向网页的链接 |
| webviewStyles | Object | {} | web-view 的样式，仅 App 端支持 |
| fullscreen | Boolean | true | 是否铺满整个页面 |
| sandbox | String | '' | 对呈现在 iframe 框架中的内容启用一些额外的限制条件，仅 H5 平台支持 |
| allow | String | '' | 用于为 iframe 指定其特征策略，仅 H5 平台支持 |
| scalable | Boolean | false | 是否启用双指缩放，仅 App 端支持 |
| autoGetContext | Boolean | true | 是否自动获取 webview 上下文对象 |
| timeout | Number | 15000 | 网页加载超时时间(毫秒)，0 表示不检测超时 |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| ready | web-view 准备就绪 | webviewContext: 组件的上下文对象 |
| message | 接收 web-view 发送的消息 | detail: 消息数据 |
| postMessage | 接收 web-view 通过 uni.postMessage 发送的消息 | detail: 消息数据 |
| error | web-view 加载出错 | detail: 错误信息 |
| pagestart | web-view 开始加载页面 | detail: 相关信息 |
| pagefinish | web-view 页面加载完成 | detail: 相关信息 |
| timeout | web-view 加载超时 | { url: 当前加载的URL } |

## 方法说明

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| evalJS | 向 web-view 注入并执行 JS 代码 | jsCode: 要执行的 JS 代码 | Boolean: 是否执行成功 |
| setStyle | 设置 web-view 的样式 (仅 App 端支持) | styles: 样式对象 | Boolean: 是否设置成功 |
| reload | 重新加载 web-view | - | Boolean: 是否重载成功 |
| forward | 前进 (仅 App 端支持) | - | Boolean: 是否前进成功 |
| back | 后退 (仅 App 端支持) | - | Boolean: 是否后退成功 |
| canBack | 判断是否可后退 (仅 App 端支持) | - | Boolean: 是否可后退 |
| postMessage | 向网页发送消息 | data: 要发送的数据 | Boolean: 是否发送成功 |

## 注意事项

1. 各小程序平台，web-view 加载的 url 需要在后台配置域名白名单，包括内部再次 iframe 内嵌的其他 url。
2. App 端，web-view 组件默认铺满全屏并且层级高于前端组件，如需调整大小或在其上覆盖内容，需要使用 plus 规范。
3. App-vue 的 web-view 加载的 html 页面可以运行 plus 的 api，但需注意避免 back 按键监听冲突。
4. 小程序平台，个人类型与海外类型的小程序使用 web-view 组件，提交审核时需注意平台是否允许使用。
5. 为了提高兼容性，在网页中接收消息可以同时监听 uni.postMessage 和自定义事件 'uniPostMessage'。
6. 在 APP 环境中使用 scalable 属性可以启用双指缩放功能。
