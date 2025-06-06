<template>
  <view :id="attrs.id" :class="'_block _'+name+' '+attrs.class" :style="attrs.style">
    <block v-for="(n, i) in childs" v-bind:key="i">
      <!-- 图片 -->
      <!-- 占位图 -->
      <image v-if="n.name==='img'&&!n.t&&((opts[1]&&!ctrl[i])||ctrl[i]<0)" class="_img" :style="n.attrs.style" :src="ctrl[i]<0?opts[2]:opts[1]" mode="widthFix" />
      <!-- 显示图片 -->
      <!-- #ifdef H5 || (APP-PLUS && VUE2) -->
      <img v-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || (APP-PLUS && VUE2) -->
      <!-- 表格中的图片，使用 rich-text 防止大小不正确 -->
      <rich-text v-if="n.name==='img'&&n.t" :style="'display:'+n.t" :nodes="[{attrs:{style:n.attrs.style||'',src:n.attrs.src},name:'img'}]" :data-i="i" @tap.stop="imgTap" />
      <!-- #endif -->
      <!-- #ifdef APP-HARMONY -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+ctrl[i]+'px;'+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||'scaleToFill'))" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifndef H5 || APP-PLUS || MP-KUAISHOU -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;height:1px;'+n.attrs.style" :src="n.attrs.src" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||'scaleToFill'))" :lazy-load="opts[0]" :webp="n.webp" :show-menu-by-longpress="opts[3]&&!n.attrs.ignore" :image-menu-prevent="!opts[3]||n.attrs.ignore" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- #ifdef MP-KUAISHOU -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+n.attrs.style" :src="n.attrs.src" :lazy-load="opts[0]" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap"></image>
      <!-- #endif -->
      <!-- #ifdef APP-PLUS && VUE3 -->
      <image v-else-if="n.name==='img'" :id="n.attrs.id" :class="'_img '+n.attrs.class" :style="(ctrl[i]===-1?'display:none;':'')+'width:'+(ctrl[i]||1)+'px;'+n.attrs.style" :src="n.attrs.src||(ctrl.load?n.attrs['data-src']:'')" :mode="!n.h?'widthFix':(!n.w?'heightFix':(n.m||''))" :data-i="i" @load="imgLoad" @error="mediaError" @tap.stop="imgTap" @longpress="imgLongTap" />
      <!-- #endif -->
      <!-- 文本 -->
      <!-- #ifdef MP-WEIXIN -->
      <text v-else-if="n.text" :user-select="opts[4]=='force'&&isiOS" decode>{{n.text}}</text>
      <!-- #endif -->
      <!-- #ifndef MP-WEIXIN || MP-BAIDU || MP-ALIPAY || MP-TOUTIAO -->
      <text v-else-if="n.text" decode>{{n.text}}</text>
      <!-- #endif -->
      <text v-else-if="n.name==='br'">\n</text>
      <!-- 链接 -->
      <view v-else-if="n.name==='a'" :id="n.attrs.id" :class="(n.attrs.href?'_a ':'')+n.attrs.class" hover-class="_hover" :style="'display:inline;'+n.attrs.style" :data-i="i" @tap.stop="linkTap">
        <zx-node name="span" :childs="n.children" :opts="opts" style="display:inherit" />
      </view>
      <!-- 视频 -->
      <!-- #ifdef APP-PLUS -->
      <view v-else-if="n.html" :id="n.attrs.id" :class="'_video '+n.attrs.class" :style="n.attrs.style" v-html="n.html" :data-i="i" @vplay.stop="play" />
      <!-- #endif -->
      <!-- #ifndef APP-PLUS -->
      <video v-else-if="n.name==='video'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :autoplay="n.attrs.autoplay" :controls="n.attrs.controls" :loop="n.attrs.loop" :muted="n.attrs.muted" :object-fit="n.attrs['object-fit']" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <!-- #ifdef H5 || APP-PLUS -->
      <iframe v-else-if="n.name==='iframe'" :style="n.attrs.style" :allowfullscreen="n.attrs.allowfullscreen" :frameborder="n.attrs.frameborder" :src="n.attrs.src" />
      <embed v-else-if="n.name==='embed'" :style="n.attrs.style" :src="n.attrs.src" />
      <!-- #endif -->
      <!-- #ifndef MP-TOUTIAO || ((H5 || APP-PLUS) && VUE3) -->
      <!-- 音频 -->
      <audio v-else-if="n.name==='audio'" :id="n.attrs.id" :class="n.attrs.class" :style="n.attrs.style" :author="n.attrs.author" :controls="n.attrs.controls" :loop="n.attrs.loop" :name="n.attrs.name" :poster="n.attrs.poster" :src="n.src[ctrl[i]||0]" :data-i="i" @play="play" @error="mediaError" />
      <!-- #endif -->
      <view v-else-if="(n.name==='table'&&n.c)||n.name==='li'" :id="n.attrs.id" :class="'_'+n.name+' '+n.attrs.class" :style="n.attrs.style">
        <zx-node v-if="n.name==='li'" :childs="n.children" :opts="opts" />
        <view v-else v-for="(tbody, x) in n.children" v-bind:key="x" :class="'_'+tbody.name+' '+tbody.attrs.class" :style="tbody.attrs.style">
          <zx-node v-if="tbody.name==='td'||tbody.name==='th'" :childs="tbody.children" :opts="opts" />
          <block v-else v-for="(tr, y) in tbody.children" v-bind:key="y">
            <view v-if="tr.name==='td'||tr.name==='th'" :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <zx-node :childs="tr.children" :opts="opts" />
            </view>
            <view v-else :class="'_'+tr.name+' '+tr.attrs.class" :style="tr.attrs.style">
              <view v-for="(td, z) in tr.children" v-bind:key="z" :class="'_'+td.name+' '+td.attrs.class" :style="td.attrs.style">
                <zx-node :childs="td.children" :opts="opts" />
              </view>
            </view>
          </block>
        </view>
      </view>
      
      <!-- 富文本 -->
      <!-- #ifdef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!n.c&&!handler.isInline(n.name, n.attrs.style)" :id="n.attrs.id" :style="n.f" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- #ifndef H5 || ((MP-WEIXIN || MP-QQ || APP-PLUS || MP-360) && VUE2) -->
      <rich-text v-else-if="!n.c" :id="n.attrs.id" :style="'display:inline;'+n.f" :preview="false" :selectable="opts[4]" :user-select="opts[4]" :nodes="[n]" />
      <!-- #endif -->
      <!-- 继续递归 -->
      <view v-else-if="n.c===2" :id="n.attrs.id" :class="'_block _'+n.name+' '+n.attrs.class" :style="n.f+';'+n.attrs.style">
        <zx-node v-for="(n2, j) in n.children" v-bind:key="j" :style="n2.f" :name="n2.name" :attrs="n2.attrs" :childs="n2.children" :opts="opts" />
      </view>
      <zx-node v-else :style="n.f" :name="n.name" :attrs="n.attrs" :childs="n.children" :opts="opts" />
    </block>
  </view>
</template>
<script module="handler" lang="wxs">
// 行内标签列表
var inlineTags = {
  abbr: true,
  b: true,
  big: true,
  code: true,
  del: true,
  em: true,
  i: true,
  ins: true,
  label: true,
  q: true,
  small: true,
  span: true,
  strong: true,
  sub: true,
  sup: true
}
/**
 * @description 判断是否为行内标签
 */
module.exports = {
  isInline: function (tagName, style) {
    return inlineTags[tagName] || (style || '').indexOf('display:inline') !== -1
  }
}
</script>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'

// 定义 props
const props = defineProps({
  name: String,
  attrs: {
    type: Object,
    default() {
      return {}
    }
  },
  childs: Array,
  opts: Array
})

// 获取当前实例
const instance = getCurrentInstance()

// 响应式数据
const ctrl = ref({})

const isiOS = false
// #ifdef MP-WEIXIN
isiOS = uni.getSystemInfoSync().system.includes('iOS')
// #endif

// 内部变量
let root = null
let observer = null

/**
 * @description 播放视频事件
 * @param {Event} e
 */
const play = (e) => {
  const i = e.currentTarget.dataset.i
  const node = props.childs[i]
  root.$emit('play', {
    source: node.name,
    attrs: {
      ...node.attrs,
      src: node.src[ctrl.value[i] || 0]
    }
  })
  // #ifndef APP-PLUS
  if (root.pauseVideo) {
    let flag = false
    const id = e.target.id
    for (let i = root._videos.length; i--;) {
      if (root._videos[i].id === id) {
        flag = true
      } else {
        root._videos[i].pause() // 自动暂停其他视频
      }
    }
    // 将自己加入列表
    if (!flag) {
      const ctx = uni.createVideoContext(id
        // #ifndef MP-BAIDU
        , instance
        // #endif
      )
      ctx.id = id
      if (root.playbackRate) {
        ctx.playbackRate(root.playbackRate)
      }
      root._videos.push(ctx)
    }
  }
  // #endif
}

/**
 * @description 图片点击事件
 * @param {Event} e
 */
const imgTap = (e) => {
  const node = props.childs[e.currentTarget.dataset.i]
  if (node.a) {
    linkTap(node.a)
    return
  }
  if (node.attrs.ignore) return
  // #ifdef H5 || APP-PLUS
  node.attrs.src = node.attrs.src || node.attrs['data-src']
  // #endif
  // #ifndef APP-HARMONY
  root.$emit('imgtap', node.attrs)
  // #endif
  // #ifdef APP-HARMONY
  root.$emit('imgtap', {
    ...node.attrs
  })
  // #endif
  // 自动预览图片
  if (root.previewImg) {
    uni.previewImage({
      // #ifdef MP-WEIXIN
      showmenu: root.showImgMenu,
      // #endif
      // #ifdef MP-ALIPAY
      enablesavephoto: root.showImgMenu,
      enableShowPhotoDownload: root.showImgMenu,
      // #endif
      current: parseInt(node.attrs.i),
      urls: root.imgList
    })
  }
}

/**
 * @description 图片长按
 */
const imgLongTap = (e) => {
  // #ifdef APP-PLUS
  const attrs = props.childs[e.currentTarget.dataset.i].attrs
  if (props.opts[3] && !attrs.ignore) {
    uni.showActionSheet({
      itemList: ['保存图片'],
      success: () => {
        const save = path => {
          uni.saveImageToPhotosAlbum({
            filePath: path,
            success() {
              uni.showToast({
                title: '保存成功'
              })
            }
          })
        }
        if (root.imgList[attrs.i].startsWith('http')) {
          uni.downloadFile({
            url: root.imgList[attrs.i],
            success: res => save(res.tempFilePath)
          })
        } else {
          save(root.imgList[attrs.i])
        }
      }
    })
  }
  // #endif
}

/**
 * @description 图片加载完成事件
 * @param {Event} e
 */
const imgLoad = (e) => {
  const i = e.currentTarget.dataset.i
  /* #ifndef H5 || (APP-PLUS && VUE2) */
  if (!props.childs[i].w) {
    // 设置原宽度
    ctrl.value = { ...ctrl.value, [i]: e.detail.width }
  } else /* #endif */ if ((props.opts[1] && !ctrl.value[i]) || ctrl.value[i] === -1) {
    // 加载完毕，取消加载中占位图
    ctrl.value = { ...ctrl.value, [i]: 1 }
  }
  checkReady()
}

/**
 * @description 检查是否所有图片加载完毕
 */
const checkReady = () => {
  if (root && !root.lazyLoad) {
    root._unloadimgs -= 1
    if (!root._unloadimgs) {
      setTimeout(() => {
        root.getRect().then(rect => {
          root.$emit('ready', rect)
        }).catch(() => {
          root.$emit('ready', {})
        })
      }, 350)
    }
  }
}

/**
 * @description 链接点击事件
 * @param {Event} e
 */
const linkTap = (e) => {
  const node = e.currentTarget ? props.childs[e.currentTarget.dataset.i] : {}
  const attrs = node.attrs || e
  const href = attrs.href
  root.$emit('linktap', Object.assign({
    innerText: root.getText(node.children || []) // 链接内的文本内容
  }, attrs))
  if (href) {
    if (href[0] === '#') {
      // 跳转锚点
      root.navigateTo(href.substring(1)).catch(() => { })
    } else if (href.split('?')[0].includes('://')) {
      // 复制外部链接
      if (root.copyLink) {
        // #ifdef H5
        window.open(href)
        // #endif
        // #ifdef MP
        uni.setClipboardData({
          data: href,
          success: () =>
            uni.showToast({
              title: '链接已复制'
            })
        })
        // #endif
        // #ifdef APP-PLUS
        plus.runtime.openWeb(href)
        // #endif
      }
    } else {
      // 跳转页面
      uni.navigateTo({
        url: href,
        fail() {
          uni.switchTab({
            url: href,
            fail() { }
          })
        }
      })
    }
  }
}

/**
 * @description 错误事件
 * @param {Event} e
 */
const mediaError = (e) => {
  const i = e.currentTarget.dataset.i
  const node = props.childs[i]
  // 加载其他源
  if (node.name === 'video' || node.name === 'audio') {
    let index = (ctrl.value[i] || 0) + 1
    if (index > node.src.length) {
      index = 0
    }
    if (index < node.src.length) {
      ctrl.value = { ...ctrl.value, [i]: index }
      return
    }
  } else if (node.name === 'img') {
    // #ifdef H5 && VUE3
    if (props.opts[0] && !ctrl.value.load) return
    // #endif
    // 显示错误占位图
    if (props.opts[2]) {
      ctrl.value = { ...ctrl.value, [i]: -1 }
    }
    checkReady()
  }
  if (root) {
    root.$emit('error', {
      source: node.name,
      attrs: node.attrs,
      // #ifndef H5 && VUE3
      errMsg: e.detail.errMsg
      // #endif
    })
  }
}

// #ifdef MP-WEIXIN
const toJSON = () => instance
// #endif

// 组件挂载
onMounted(() => {
  nextTick(() => {
    // 查找根组件，现在查找 componentName 为 'zx-html' 的组件
    let parent = instance.parent
    while (parent && (!parent.exposed || parent.exposed.componentName !== 'zx-html')) {
      parent = parent.parent
    }
    root = parent ? parent.exposed : null
    
    // 如果没找到，回退到直接使用父组件
    if (!root) {
      parent = instance.parent
      while (parent && !parent.exposed) {
        parent = parent.parent
      }
      root = parent ? parent.exposed : null
    }
  })
  // #ifdef H5 || APP-PLUS
  if (props.opts[0]) {
    let i
    for (i = props.childs.length; i--;) {
      if (props.childs[i].name === 'img') break
    }
    if (i !== -1) {
      observer = uni.createIntersectionObserver(instance).relativeToViewport({
        top: 500,
        bottom: 500
      })
      observer.observe('._img', res => {
        if (res.intersectionRatio) {
          ctrl.value = { ...ctrl.value, load: 1 }
          observer.disconnect()
        }
      })
    }
  }
  // #endif
})

// 组件卸载前
onBeforeUnmount(() => {
  // #ifdef H5 || APP-PLUS
  if (observer) {
    observer.disconnect()
  }
  // #endif
})

// 暴露给模板使用的数据和方法
defineExpose({
  ctrl,
  // #ifdef MP-WEIXIN
  isiOS,
  // #endif
  play,
  imgTap,
  imgLongTap,
  imgLoad,
  linkTap,
  mediaError,
  // #ifdef MP-WEIXIN
  toJSON
  // #endif
})
</script>
<style>
/* a 标签默认效果 */
._a {
  padding: 1.5px 0 1.5px 0;
  color: #366092;
  word-break: break-all;
}

/* a 标签点击态效果 */
._hover {
  text-decoration: underline;
  opacity: 0.7;
}

/* 图片默认效果 */
._img {
  max-width: 100%;
  -webkit-touch-callout: none;
}

/* 内部样式 */

._block {
  display: block;
}

._b,
._strong {
  font-weight: bold;
}

._code {
  font-family: monospace;
}

._del {
  text-decoration: line-through;
}

._em,
._i {
  font-style: italic;
}

._h1 {
  font-size: 2em;
}

._h2 {
  font-size: 1.5em;
}

._h3 {
  font-size: 1.17em;
}

._h5 {
  font-size: 0.83em;
}

._h6 {
  font-size: 0.67em;
}

._h1,
._h2,
._h3,
._h4,
._h5,
._h6 {
  display: block;
  font-weight: bold;
}

._image {
  height: 1px;
}

._ins {
  text-decoration: underline;
}

._li {
  display: list-item;
}

._ol {
  list-style-type: decimal;
}

._ol,
._ul {
  display: block;
  padding-left: 40px;
  margin: 1em 0;
}

._q::before {
  content: '"';
}

._q::after {
  content: '"';
}

._sub {
  font-size: smaller;
  vertical-align: sub;
}

._sup {
  font-size: smaller;
  vertical-align: super;
}

._thead,
._tbody,
._tfoot {
  display: table-row-group;
}

._tr {
  display: table-row;
}

._td,
._th {
  display: table-cell;
  vertical-align: middle;
}

._th {
  font-weight: bold;
  text-align: center;
}

._ul {
  list-style-type: disc;
}

._ul ._ul {
  margin: 0;
  list-style-type: circle;
}

._ul ._ul ._ul {
  list-style-type: square;
}

._abbr,
._b,
._code,
._del,
._em,
._i,
._ins,
._label,
._q,
._span,
._strong,
._sub,
._sup {
  display: inline;
}

/* #ifdef APP-PLUS */
._video {
  width: 300px;
  height: 225px;
}
/* #endif */
</style>
