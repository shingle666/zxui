# zx-html 富文本解析组件

基于 [mp-html](https://github.com/jin-yufeng/mp-html) 封装的 Vue 3 富文本解析组件，支持全端渲染（H5、小程序、App），功能强大且轻量化。

## 特性

- ✅ **全端支持** - 支持 H5、小程序、App 等多个平台
- ✅ **丰富标签** - 支持表格、视频、图片、链接等多种 HTML 标签
- ✅ **事件处理** - 支持图片预览、链接跳转、视频播放等事件
- ✅ **样式定制** - 支持自定义样式和标签样式
- ✅ **图片优化** - 支持懒加载、占位图、错误图片处理
- ✅ **高性能** - 高效轻量，容错性强
- ✅ **API 丰富** - 提供多种实用的 API 方法

## 安装

组件基于 mp-html v2.5.1，需要先安装依赖：

```bash
npm install mp-html@^2.5.1
```

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
`)

const onReady = (data) => {
  console.log('渲染完成', data)
}

const onImgTap = (data) => {
  console.log('图片被点击', data)
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
| copyLink | Boolean | true | 是否允许外部链接被点击时自动复制 |
| domain | String | '' | 主域名，用于自动拼接相对链接 |

### 图片处理

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| errorImg | String | '' | 图片出错时的占位图链接 |
| lazyLoad | Boolean | false | 是否开启图片懒加载 |
| loadingImg | String | '' | 图片加载中的占位图链接 |
| previewImg | Boolean | true | 是否允许图片被点击时自动预览 |
| showImgMenu | Boolean | true | 是否允许图片长按时显示菜单 |

### 媒体处理

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| pauseVideo | Boolean | true | 是否在播放视频时自动暂停其他视频 |

### 其他功能

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| scrollTable | Boolean | false | 是否给表格添加滚动层使其能单独横向滚动 |
| selectable | Boolean | false | 是否开启文本长按复制 |
| setTitle | Boolean | true | 是否将 title 标签的内容设置到页面标题 |
| useAnchor | Boolean | false | 是否使用锚点链接 |

## 事件 (Events)

| 事件名 | 说明 | 参数 |
|--------|------|------|
| load | DOM 树加载完毕时触发 | - |
| ready | 图片加载完毕时触发 | boundingClientRect 查询结果 |
| error | 发生渲染错误时触发 | { source, errMsg, target } |
| imgtap | 图片被点击时触发 | { src, ignore } |
| linktap | 链接被点击时触发 | { href, ignore, ... } |
| play | 音视频播放时触发 | { src, ... } |

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
const getText = () => {
  return htmlRef.value.getText()
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
  htmlRef.value.navigateTo(id, offset)
}

// 暂停媒体播放
const pauseMedia = () => {
  htmlRef.value.pauseMedia()
}
</script>
```

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
    @imgtap="handleImgTap"
  />
</template>

<script setup>
const handleImgTap = (data) => {
  console.log('点击图片:', data.src)
  // 可以调用 data.ignore() 阻止默认预览行为
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
  <zx-html ref="htmlRef" :content="content" />
  <button @click="loadMore">加载更多</button>
</template>

<script setup>
const htmlRef = ref(null)
const content = ref('<p>初始内容</p>')

const loadMore = () => {
  const moreContent = '<p>更多内容...</p>'
  // 追加内容
  htmlRef.value.setContent(moreContent, true)
}
</script>
```

## 注意事项

1. **内容安全**: 组件会解析并渲染 HTML 内容，请确保内容来源可信，避免 XSS 攻击
2. **性能优化**: 对于大量内容，建议开启图片懒加载以提升性能
3. **平台差异**: 不同平台对某些 HTML 标签和样式的支持可能存在差异
4. **事件处理**: 在事件回调中可调用 `ignore()` 方法阻止默认行为，实现自定义处理

## 更新日志

### v1.0.3
- 基于 mp-html v2.5.1
- 增加完整的属性和事件支持
- 优化组件结构和样式
- 完善文档和示例

## 协议

MIT License

## 相关链接

- [mp-html 官方文档](https://jin-yufeng.github.io/mp-html/)
- [mp-html GitHub](https://github.com/jin-yufeng/mp-html)
- [插件市场](https://ext.dcloud.net.cn/plugin?id=805) 