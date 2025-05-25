<template>
  <view id="_root" :class="(selectable?'_select ':'')+'_root'" :style="containerStyle">
    <slot v-if="!nodes[0]" />
    <!-- #ifndef APP-PLUS-NVUE -->
    <zx-node v-else :childs="nodes" :opts="[lazyLoad,loadingImg,errorImg,showImgMenu,selectable]" name="span" />
    <!-- #endif -->
    <!-- #ifdef APP-PLUS-NVUE -->
    <web-view ref="web" src="https://cdn.mp.ac.cn/zx-html/local.html" :style="'margin-top:-2px;height:' + height + 'px'" @onPostMessage="_onMessage" />
    <!-- #endif -->
  </view>
</template>

<script setup>
/**
 * @description 富文本组件
 * @tutorial https://zxui.org/components/html
 * @property {String} container-style 容器的样式
 * @property {String} content 用于渲染的 html 字符串
 * @property {Boolean} copy-link 是否允许外部链接被点击时自动复制
 * @property {String} domain 主域名，用于拼接链接
 * @property {String} error-img 图片出错时的占位图链接
 * @property {Boolean} lazy-load 是否开启图片懒加载
 * @property {string} loading-img 图片加载过程中的占位图链接
 * @property {Boolean} pause-video 是否在播放一个视频时自动暂停其他视频
 * @property {Boolean} preview-img 是否允许图片被点击时自动预览
 * @property {Boolean} scroll-table 是否给每个表格添加一个滚动层使其能单独横向滚动
 * @property {Boolean | String} selectable 是否开启长按复制
 * @property {Boolean} set-title 是否将 title 标签的内容设置到页面标题
 * @property {Boolean} show-img-menu 是否允许图片被长按时显示菜单
 * @property {Object} tag-style 标签的默认样式
 * @property {Boolean | Number} use-anchor 是否使用锚点链接
 * @event {Function} load dom 结构加载完毕时触发
 * @event {Function} ready 所有图片加载完毕时触发
 * @event {Function} imgtap 图片被点击时触发
 * @event {Function} linktap 链接被点击时触发
 * @event {Function} play 音视频播放时触发
 * @event {Function} error 媒体加载出错时触发
 */
import { ref, reactive, watch, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'

import Parser from './parser'

const plugins = []
// #ifdef APP-PLUS-NVUE
const dom = weex.requireModule('dom')
// #endif

// 设置组件名称（用于子组件识别）
const componentName = 'zx-html'

// 定义 props
const props = defineProps({
  containerStyle: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  copyLink: {
    type: [Boolean, String],
    default: true
  },
  domain: String,
  errorImg: {
    type: String,
    default: ''
  },
  lazyLoad: {
    type: [Boolean, String],
    default: false
  },
  loadingImg: {
    type: String,
    default: ''
  },
  pauseVideo: {
    type: [Boolean, String],
    default: true
  },
  previewImg: {
    type: [Boolean, String],
    default: true
  },
  scrollTable: [Boolean, String],
  selectable: [Boolean, String],
  setTitle: {
    type: [Boolean, String],
    default: true
  },
  showImgMenu: {
    type: [Boolean, String],
    default: true
  },
  tagStyle: Object,
  useAnchor: [Boolean, Number]
})

// 定义 emits
const emit = defineEmits(['load', 'ready', 'imgtap', 'linktap', 'play', 'error', 'tap', 'click'])

// 响应式数据
const nodes = ref([])
// #ifdef APP-PLUS-NVUE
const height = ref(3)
// #endif

// 获取当前实例
const instance = getCurrentInstance()

// #ifdef APP-PLUS-NVUE
const web = ref(null)
// #endif

// 内部变量
let pluginInstances = []
let imgList = []
let _videos = []
let _in = null
let playbackRate = 1
let _ready = false
let _navigateTo = null

/**
 * @description 将锚点跳转的范围限定在一个 scroll-view 内
 * @param {Object} page scroll-view 所在页面的示例
 * @param {String} selector scroll-view 的选择器
 * @param {String} scrollTop scroll-view scroll-top 属性绑定的变量名
 */
const inFunction = (page, selector, scrollTop) => {
  // #ifndef APP-PLUS-NVUE
  if (page && selector && scrollTop) {
    _in = {
      page,
      selector,
      scrollTop
    }
  }
  // #endif
}

/**
 * @description 锚点跳转
 * @param {String} id 要跳转的锚点 id
 * @param {Number} offset 跳转位置的偏移量
 * @returns {Promise}
 */
const navigateTo = (id, offset) => {
  return new Promise((resolve, reject) => {
    if (!props.useAnchor) {
      reject(Error('Anchor is disabled'))
      return
    }
    offset = offset || parseInt(props.useAnchor) || 0
    // #ifdef APP-PLUS-NVUE
    if (!id) {
      dom.scrollToElement(web.value, {
        offset
      })
      resolve()
    } else {
      _navigateTo = {
        resolve,
        reject,
        offset
      }
      web.value.evalJs('uni.postMessage({data:{action:"getOffset",offset:(document.getElementById(' + id + ')||{}).offsetTop}})')
    }
    // #endif
    // #ifndef APP-PLUS-NVUE
    let deep = ' '
    // #ifdef MP-WEIXIN || MP-QQ || MP-TOUTIAO
    deep = '>>>'
    // #endif
    const selector = uni.createSelectorQuery()
      // #ifndef MP-ALIPAY
      .in(_in ? _in.page : instance)
      // #endif
      .select((_in ? _in.selector : '._root') + (id ? `${deep}#${id}` : '')).boundingClientRect()
    if (_in) {
      selector.select(_in.selector).scrollOffset()
        .select(_in.selector).boundingClientRect()
    } else {
      // 获取 scroll-view 的位置和滚动距离
      selector.selectViewport().scrollOffset() // 获取窗口的滚动距离
    }
    selector.exec(res => {
      if (!res[0]) {
        reject(Error('Label not found'))
        return
      }
      const scrollTop = res[1].scrollTop + res[0].top - (res[2] ? res[2].top : 0) + offset
      if (_in) {
        // scroll-view 跳转
        _in.page[_in.scrollTop] = scrollTop
      } else {
        // 页面跳转
        uni.pageScrollTo({
          scrollTop,
          duration: 300
        })
      }
      resolve()
    })
    // #endif
  })
}

/**
 * @description 获取文本内容
 * @return {String}
 */
const getText = (nodeList) => {
  let text = '';
  (function traversal (nodeList) {
    for (let i = 0; i < nodeList.length; i++) {
      const node = nodeList[i]
      if (node.type === 'text') {
        text += node.text.replace(/&amp;/g, '&')
      } else if (node.name === 'br') {
        text += '\n'
      } else {
        // 块级标签前后加换行
        const isBlock = node.name === 'p' || node.name === 'div' || node.name === 'tr' || node.name === 'li' || (node.name[0] === 'h' && node.name[1] > '0' && node.name[1] < '7')
        if (isBlock && text && text[text.length - 1] !== '\n') {
          text += '\n'
        }
        // 递归获取子节点的文本
        if (node.children) {
          traversal(node.children)
        }
        if (isBlock && text[text.length - 1] !== '\n') {
          text += '\n'
        } else if (node.name === 'td' || node.name === 'th') {
          text += '\t'
        }
      }
    }
  })(nodeList || nodes.value)
  return text
}

/**
 * @description 获取内容大小和位置
 * @return {Promise}
 */
const getRect = () => {
  return new Promise((resolve, reject) => {
    uni.createSelectorQuery()
      // #ifndef MP-ALIPAY
      .in(instance)
      // #endif
      .select('#_root').boundingClientRect().exec(res => res[0] ? resolve(res[0]) : reject(Error('Root label not found')))
  })
}

/**
 * @description 暂停播放媒体
 */
const pauseMedia = () => {
  for (let i = (_videos || []).length; i--;) {
    _videos[i].pause()
  }
  // #ifdef APP-PLUS
  const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].pause()'
  // #ifndef APP-PLUS-NVUE
  let page = instance.parent
  while (!page.$scope) page = page.parent
  page.$scope.$getAppWebview().evalJS(command)
  // #endif
  // #ifdef APP-PLUS-NVUE
  web.value.evalJs(command)
  // #endif
  // #endif
}

/**
 * @description 设置媒体播放速率
 * @param {Number} rate 播放速率
 */
const setPlaybackRate = (rate) => {
  playbackRate = rate
  for (let i = (_videos || []).length; i--;) {
    _videos[i].playbackRate(rate)
  }
  // #ifdef APP-PLUS
  const command = 'for(var e=document.getElementsByTagName("video"),i=e.length;i--;)e[i].playbackRate=' + rate
  // #ifndef APP-PLUS-NVUE
  let page = instance.parent
  while (!page.$scope) page = page.parent
  page.$scope.$getAppWebview().evalJS(command)
  // #endif
  // #ifdef APP-PLUS-NVUE
  web.value.evalJs(command)
  // #endif
  // #endif
}

/**
 * @description 设置内容
 * @param {String} content html 内容
 * @param {Boolean} append 是否在尾部追加
 */
const setContent = (content, append) => {
  if (!append || !imgList) {
    imgList = []
  }
  // 构造一个兼容 Parser 的实例对象
  const vmInstance = {
    ...props,
    imgList: imgList,
    plugins: pluginInstances,
    nodes: nodes.value
  }
  const nodeList = new Parser(vmInstance).parse(content)
  // #ifdef APP-PLUS-NVUE
  if (_ready) {
    _set(nodeList, append)
  }
  // #endif
  nodes.value = append ? (nodes.value || []).concat(nodeList) : nodeList

  // #ifndef APP-PLUS-NVUE
  _videos = []
  nextTick(() => {
    _hook('onLoad')
    emit('load')
  })

  if (props.lazyLoad || imgList._unloadimgs < imgList.length / 2) {
    // 设置懒加载，每 350ms 获取高度，不变则认为加载完毕
    let heightValue = 0
    const callback = rect => {
      if (!rect || !rect.height) rect = {}
      // 350ms 总高度无变化就触发 ready 事件
      if (rect.height === heightValue) {
        emit('ready', rect)
      } else {
        heightValue = rect.height
        setTimeout(() => {
          getRect().then(callback).catch(callback)
        }, 350)
      }
    }
    getRect().then(callback).catch(callback)
  } else {
    // 未设置懒加载，等待所有图片加载完毕
    if (!imgList._unloadimgs) {
      getRect().then(rect => {
        emit('ready', rect)
      }).catch(() => {
        emit('ready', {})
      })
    }
  }
  // #endif
}

/**
 * @description 调用插件钩子函数
 */
const _hook = (name) => {
  for (let i = plugins.length; i--;) {
    if (pluginInstances[i][name]) {
      pluginInstances[i][name]()
    }
  }
}

// #ifdef APP-PLUS-NVUE
/**
 * @description 设置内容
 */
const _set = (nodeList, append) => {
  web.value.evalJs('setContent(' + JSON.stringify(nodeList).replace(/%22/g, '') + ',' + JSON.stringify([props.containerStyle.replace(/(?:margin|padding)[^;]+/g, ''), props.errorImg, props.loadingImg, props.pauseVideo, props.scrollTable, props.selectable]) + ',' + append + ')')
}

/**
 * @description 接收到 web-view 消息
 */
const _onMessage = (e) => {
  const message = e.detail.data[0]
  switch (message.action) {
    // web-view 初始化完毕
    case 'onJSBridgeReady':
      _ready = true
      if (nodes.value) {
        _set(nodes.value)
      }
      break
    // 内容 dom 加载完毕
    case 'onLoad':
      height.value = message.height
      _hook('onLoad')
      emit('load')
      break
    // 所有图片加载完毕
    case 'onReady':
      getRect().then(res => {
        emit('ready', res)
      }).catch(() => {
        emit('ready', {})
      })
      break
    // 总高度发生变化
    case 'onHeightChange':
      height.value = message.height
      break
    // 图片点击
    case 'onImgTap':
      emit('imgtap', message.attrs)
      if (props.previewImg) {
        uni.previewImage({
          current: parseInt(message.attrs.i),
          urls: imgList
        })
      }
      break
    // 链接点击
    case 'onLinkTap': {
      const href = message.attrs.href
      emit('linktap', message.attrs)
      if (href) {
        // 锚点跳转
        if (href[0] === '#') {
          if (props.useAnchor) {
            dom.scrollToElement(web.value, {
              offset: message.offset
            })
          }
        } else if (href.includes('://')) {
          // 打开外链
          if (props.copyLink) {
            plus.runtime.openWeb(href)
          }
        } else {
          uni.navigateTo({
            url: href,
            fail () {
              uni.switchTab({
                url: href
              })
            }
          })
        }
      }
      break
    }
    case 'onPlay':
      emit('play')
      break
    // 获取到锚点的偏移量
    case 'getOffset':
      if (typeof message.offset === 'number') {
        dom.scrollToElement(web.value, {
          offset: message.offset + _navigateTo.offset
        })
        _navigateTo.resolve()
      } else {
        _navigateTo.reject(Error('Label not found'))
      }
      break
    // 点击
    case 'onClick':
      emit('tap')
      emit('click')
      break
    // 出错
    case 'onError':
      emit('error', {
        source: message.source,
        attrs: message.attrs
      })
  }
}
// #endif

// 监听 content 变化
watch(() => props.content, (content) => {
  setContent(content)
})

// 初始化插件
pluginInstances = []
for (let i = plugins.length; i--;) {
  pluginInstances.push(new plugins[i](instance.proxy))
}

// 组件挂载
onMounted(() => {
  if (props.content && !nodes.value.length) {
    setContent(props.content)
  }
})

// 组件卸载前
onBeforeUnmount(() => {
  _hook('onDetached')
})

// 暴露方法给外部使用
defineExpose({
  componentName,
  in: inFunction,
  navigateTo,
  getText,
  getRect,
  pauseMedia,
  setPlaybackRate,
  setContent,
  imgList,
  _videos,
  lazyLoad: props.lazyLoad,
  previewImg: props.previewImg,
  showImgMenu: props.showImgMenu,
  copyLink: props.copyLink,
  pauseVideo: props.pauseVideo,
  playbackRate,
  _unloadimgs: () => imgList._unloadimgs,
  $emit: emit
})
</script>

<style scoped>
/* #ifndef APP-PLUS-NVUE */
/* 根节点样式 */
._root {
  padding: 1px 0;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
}

/* 长按复制 */
._select {
  user-select: text;
}
/* #endif */
</style>
