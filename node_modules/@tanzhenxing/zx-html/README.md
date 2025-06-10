# zx-html 富文本解析组件

uniapp 富文本解析组件，支持全端渲染（H5、小程序、App），功能强大且轻量化。基于 zx-node 构建，提供完整的 HTML 解析和渲染能力。

## 特性

- ✅ **全端支持** - 支持 H5、小程序、App 等多个平台，App 端使用 web-view 渲染
- ✅ **丰富标签** - 支持表格、视频、图片、链接等多种 HTML 标签
- ✅ **事件处理** - 支持图片预览、链接跳转、视频播放等交互事件
- ✅ **样式定制** - 支持自定义容器样式和标签样式
- ✅ **图片优化** - 支持懒加载、占位图、错误图片处理
- ✅ **媒体控制** - 支持视频播放控制、播放速率设置
- ✅ **锚点跳转** - 支持页面内锚点导航
- ✅ **文本选择** - 支持长按复制文本内容
- ✅ **高性能** - 高效轻量，容错性强
- ✅ **API 丰富** - 提供多种实用的 API 方法

## 安装

组件基于 zx-node，确保项目中已包含相关依赖：

```bash
# 如果使用 npm 包管理
npm install zx-node
```

或直接将组件文件复制到项目中使用。

## 基本使用

```vue
<template>
  <view>
    <zx-html 
      :content="htmlContent" 
      :preview-img="true"
      :selectable="true"
      @ready="onReady"
      @imgtap="onImgTap"
      @load="onLoad"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxHtml from '@/components/zx-html/zx-html.vue'

const htmlContent = ref(`
  <h1>标题</h1>
  <p>这是一段测试文本，包含<strong>粗体</strong>和<em>斜体</em>。</p>
  <img src="https://example.com/image.jpg" alt="示例图片" />
  <a href="https://example.com">链接</a>
  <table>
    <tr><th>表头1</th><th>表头2</th></tr>
    <tr><td>内容1</td><td>内容2</td></tr>
  </table>
`)

const onLoad = () => {
  console.log('DOM 结构加载完毕')
}

const onReady = (rect) => {
  console.log('所有图片加载完毕', rect)
}

const onImgTap = (data) => {
  console.log('图片被点击', data)
  // 可以调用 data.ignore() 阻止默认预览行为
}
</script>
```

## 属性 (Props)

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | String | '' | 要渲染的 HTML 字符串（必填） |
| containerStyle | String | '' | 容器的自定义样式 |
| tagStyle | Object | {} | 设置标签的默认样式 |

### 链接处理

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| copyLink | Boolean \| String | true | 是否允许外部链接被点击时自动复制或打开 |
| domain | String | '' | 主域名，用于自动拼接相对链接 |

### 图片处理

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| errorImg | String | '' | 图片出错时的占位图链接 |
| lazyLoad | Boolean \| String | false | 是否开启图片懒加载 |
| loadingImg | String | '' | 图片加载中的占位图链接 |
| previewImg | Boolean \| String | true | 是否允许图片被点击时自动预览 |
| showImgMenu | Boolean \| String | true | 是否允许图片长按时显示菜单 |

### 媒体处理

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| pauseVideo | Boolean \| String | true | 是否在播放一个视频时自动暂停其他视频 |

### 其他功能

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| scrollTable | Boolean \| String | false | 是否给每个表格添加一个滚动层使其能单独横向滚动 |
| selectable | Boolean \| String | false | 是否开启长按复制文本 |
| setTitle | Boolean \| String | true | 是否将 title 标签的内容设置到页面标题 |
| useAnchor | Boolean \| Number | false | 是否使用锚点链接，可设置数字作为偏移量 |

## 事件 (Events)

| 事件名 | 说明 | 参数 |
|--------|------|------|
| load | DOM 结构加载完毕时触发 | - |
| ready | 所有图片加载完毕时触发 | boundingClientRect 查询结果 |
| error | 媒体加载出错时触发 | { source, attrs } |
| imgtap | 图片被点击时触发 | { src, i, ignore, ... } |
| linktap | 链接被点击时触发 | { href, ignore, ... } |
| play | 音视频播放时触发 | { src, ... } |
| tap | 组件被点击时触发 | - |
| click | 组件被点击时触发（同 tap） | - |

## 方法 (Methods)

通过 ref 可以调用组件的方法：

```vue
<template>
  <zx-html ref="htmlRef" :content="content" />
</template>

<script setup>
import { ref } from 'vue'

const htmlRef = ref(null)

// 获取文本内容
const getText = (nodeList) => {
  return htmlRef.value.getText(nodeList)
}

// 获取组件位置和大小
const getRect = () => {
  return htmlRef.value.getRect()
}

// 设置内容
const setContent = (newContent, append = false) => {
  htmlRef.value.setContent(newContent, append)
}

// 锚点跳转
const navigateTo = (id, offset = 0) => {
  return htmlRef.value.navigateTo(id, offset)
}

// 暂停媒体播放
const pauseMedia = () => {
  htmlRef.value.pauseMedia()
}

// 设置媒体播放速率
const setPlaybackRate = (rate) => {
  htmlRef.value.setPlaybackRate(rate)
}

// 将锚点跳转限定在 scroll-view 内
const inScrollView = (page, selector, scrollTop) => {
  htmlRef.value.in(page, selector, scrollTop)
}
</script>
```

### 方法详细说明

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getText | nodeList? | String | 获取文本内容，可传入节点列表 |
| getRect | - | Promise | 获取组件位置和大小信息 |
| setContent | content, append? | - | 设置内容，append 为 true 时追加内容 |
| navigateTo | id, offset? | Promise | 锚点跳转，需开启 useAnchor |
| pauseMedia | - | - | 暂停所有正在播放的媒体 |
| setPlaybackRate | rate | - | 设置媒体播放速率 |
| in | page, selector, scrollTop | - | 将锚点跳转限定在 scroll-view 内 |

## 高级用法

### 自定义样式

```vue
<template>
  <zx-html 
    :content="content"
    :tag-style="tagStyle"
    container-style="padding: 20px; background: #f5f5f5;"
  />
</template>

<script setup>
const tagStyle = {
  p: 'color: #666; font-size: 16px; line-height: 1.8;',
  h1: 'color: #333; font-size: 24px; font-weight: bold;',
  img: 'border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'
}
</script>
```

### 图片懒加载和占位图

```vue
<template>
  <zx-html 
    :content="content"
    :lazy-load="true"
    loading-img="/static/loading.gif"
    error-img="/static/error.png"
    :show-img-menu="true"
    @imgtap="handleImgTap"
  />
</template>

<script setup>
const handleImgTap = (data) => {
  console.log('点击图片:', data.src, '索引:', data.i)
  // 可以调用 data.ignore() 阻止默认预览行为
  if (data.src.includes('private')) {
    data.ignore() // 阻止预览私有图片
    uni.showToast({ title: '无法预览此图片', icon: 'none' })
  }
}
</script>
```

### 处理链接点击

```vue
<template>
  <zx-html 
    :content="content"
    @linktap="handleLinkTap"
  />
</template>

<script setup>
const handleLinkTap = (data) => {
  console.log('点击链接:', data.href)
  
  // 自定义处理逻辑
  if (data.href.includes('custom://')) {
    // 处理自定义协议
    data.ignore() // 阻止默认行为
    handleCustomProtocol(data.href)
  }
}
</script>
```

### 动态设置内容

```vue
<template>
  <zx-html ref="htmlRef" :content="content" @ready="onReady" />
  <button @click="loadMore">加载更多</button>
  <button @click="replaceContent">替换内容</button>
</template>

<script setup>
const htmlRef = ref(null)
const content = ref('<p>初始内容</p>')

const onReady = (rect) => {
  console.log('内容渲染完成，高度:', rect.height)
}

const loadMore = () => {
  const moreContent = '<p>更多内容...</p>'
  // 追加内容
  htmlRef.value.setContent(moreContent, true)
}

const replaceContent = () => {
  const newContent = '<h2>新标题</h2><p>完全替换的内容</p>'
  // 替换内容
  htmlRef.value.setContent(newContent, false)
}
</script>
```

### 锚点跳转

```vue
<template>
  <zx-html 
    ref="htmlRef" 
    :content="content" 
    :use-anchor="50"
    @linktap="handleLinkTap"
  />
  <button @click="jumpToSection">跳转到章节2</button>
</template>

<script setup>
const htmlRef = ref(null)
const content = ref(`
  <h1 id="section1">章节1</h1>
  <p>这是第一章节的内容...</p>
  <h1 id="section2">章节2</h1>
  <p>这是第二章节的内容...</p>
  <a href="#section1">返回章节1</a>
`)

const handleLinkTap = (data) => {
  console.log('点击链接:', data.href)
}

const jumpToSection = () => {
  htmlRef.value.navigateTo('section2', 20)
    .then(() => {
      console.log('跳转成功')
    })
    .catch(err => {
      console.error('跳转失败:', err)
    })
}
</script>
```

### 媒体控制

```vue
<template>
  <zx-html 
    ref="htmlRef" 
    :content="videoContent" 
    :pause-video="true"
    @play="onPlay"
  />
  <button @click="pauseAll">暂停所有视频</button>
  <button @click="setSpeed">设置2倍速</button>
</template>

<script setup>
const htmlRef = ref(null)
const videoContent = ref(`
  <video src="video1.mp4" controls></video>
  <video src="video2.mp4" controls></video>
`)

const onPlay = (data) => {
  console.log('开始播放:', data.src)
}

const pauseAll = () => {
  htmlRef.value.pauseMedia()
}

const setSpeed = () => {
  htmlRef.value.setPlaybackRate(2)
}
</script>
```

## 平台差异说明

| 平台 | 渲染方式 | 特殊说明 |
|------|----------|----------|
| H5 | 原生渲染 | 完整支持所有功能 |
| 小程序 | zx-node 渲染 | 部分 HTML 标签和样式受限 |
| App (非 NVUE) | zx-node 渲染 | 支持大部分功能 |
| App (NVUE) | web-view 渲染 | 通过 web-view 实现，功能最完整 |

## 注意事项

1. **内容安全**: 组件会解析并渲染 HTML 内容，请确保内容来源可信，避免 XSS 攻击
2. **性能优化**: 
   - 对于大量内容，建议开启图片懒加载以提升性能
   - 图片较多时，组件会自动检测加载状态并触发 ready 事件
3. **平台差异**: 
   - App NVUE 端使用 web-view 渲染，功能最完整
   - 小程序端部分 HTML 标签和样式可能不支持
   - 不同平台的事件处理可能存在细微差异
4. **事件处理**: 
   - 在事件回调中可调用 `ignore()` 方法阻止默认行为
   - 图片点击事件包含图片索引信息，便于自定义预览逻辑
5. **锚点功能**: 
   - 需要设置 `use-anchor` 为 true 才能使用锚点跳转
   - 可以通过 `in` 方法将锚点跳转限定在 scroll-view 内
6. **媒体播放**: 
   - 支持视频播放控制和播放速率设置
   - 可以设置播放一个视频时自动暂停其他视频

## 常见问题

### Q: 图片不显示或显示异常？
A: 检查图片链接是否有效，可以设置 `error-img` 作为错误占位图。

### Q: 表格在小屏幕上显示不全？
A: 设置 `scroll-table` 为 true，为表格添加横向滚动。

### Q: 如何自定义链接点击行为？
A: 监听 `linktap` 事件，在回调中调用 `data.ignore()` 阻止默认行为。

### Q: 锚点跳转不生效？
A: 确保设置了 `use-anchor` 属性，并且目标元素有正确的 id。

## 更新日志

### v1.0.4
- 完善文档说明和使用示例
- 增加平台差异说明
- 添加常见问题解答

### v1.0.3
- 增加完整的属性和事件支持
- 优化组件结构和样式
- 完善文档和示例

## 协议

MIT License
