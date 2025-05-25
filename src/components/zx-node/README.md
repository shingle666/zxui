# zx-node 组件

## 组件简介

`zx-node` 是一个基于 uni-app 的递归组件，用于渲染富文本内容和多媒体元素。该组件支持图片、视频、音频、表格、链接等多种 HTML 元素的渲染，并提供了图片懒加载、预览、长按保存等丰富功能。

## 主要功能

### 📸 图片处理
- **懒加载**：支持图片懒加载，优化页面性能
- **占位图**：支持加载中和错误占位图
- **预览功能**：支持图片点击预览
- **长按保存**：支持长按保存图片到相册
- **多种模式**：支持 widthFix、heightFix、scaleToFill 等显示模式

### 🎬 多媒体支持
- **视频播放**：支持视频播放，自动暂停其他视频
- **音频播放**：支持音频播放
- **iframe 嵌入**：支持 iframe 和 embed 元素（H5、APP-PLUS）

### 🔗 交互功能
- **链接跳转**：支持页面跳转、锚点定位、外部链接复制
- **文本选择**：支持文本选择和复制
- **表格渲染**：支持复杂表格结构渲染

### 🎨 样式渲染
- **行内元素识别**：自动识别行内和块级元素
- **富文本渲染**：使用 rich-text 组件渲染复杂样式
- **递归渲染**：支持嵌套结构的递归渲染

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| name | String | - | 当前节点的标签名 |
| attrs | Object | {} | 当前节点的属性对象 |
| childs | Array | - | 子节点数组 |
| opts | Array | - | 配置选项数组 |

### opts 配置说明

`opts` 是一个数组，包含以下配置项：

- `opts[0]` (Boolean): 是否启用图片懒加载
- `opts[1]` (String): 图片加载中的占位图 URL
- `opts[2]` (String): 图片加载失败的占位图 URL  
- `opts[3]` (Boolean): 是否显示图片长按菜单
- `opts[4]` (String): 文本选择模式 ('force' 表示强制选择)

## 使用示例

### 基础用法

```vue
<template>
  <view>
    <zx-node 
      name="div"
      :attrs="nodeAttrs"
      :childs="nodeChilds"
      :opts="options"
      @imgtap="handleImageTap"
      @linktap="handleLinkTap"
      @play="handleMediaPlay"
      @error="handleError"
      @ready="handleReady"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const nodeAttrs = ref({
  id: 'container',
  class: 'content',
  style: 'padding: 20px;'
})

const nodeChilds = ref([
  {
    name: 'img',
    attrs: {
      src: 'https://example.com/image.jpg',
      style: 'width: 100%;'
    }
  },
  {
    text: '这是一段文本内容'
  }
])

const options = ref([
  true,  // 启用懒加载
  '/static/loading.png',  // 加载中占位图
  '/static/error.png',    // 错误占位图
  true,  // 显示长按菜单
  'auto' // 文本选择模式
])

// 事件处理
const handleImageTap = (attrs) => {
  console.log('图片被点击:', attrs)
}

const handleLinkTap = (attrs) => {
  console.log('链接被点击:', attrs)
}

const handleMediaPlay = (data) => {
  console.log('媒体开始播放:', data)
}

const handleError = (error) => {
  console.log('加载错误:', error)
}

const handleReady = (rect) => {
  console.log('组件渲染完成:', rect)
}
</script>
```

### 表格渲染

```vue
<template>
  <zx-node 
    name="table"
    :attrs="{ class: 'data-table' }"
    :childs="tableChilds"
    :opts="options"
  />
</template>

<script setup>
const tableChilds = ref([
  {
    name: 'thead',
    attrs: { class: 'table-header' },
    children: [
      {
        name: 'tr',
        attrs: {},
        children: [
          {
            name: 'th',
            attrs: {},
            children: [{ text: '姓名' }]
          },
          {
            name: 'th', 
            attrs: {},
            children: [{ text: '年龄' }]
          }
        ]
      }
    ]
  },
  {
    name: 'tbody',
    attrs: {},
    children: [
      {
        name: 'tr',
        attrs: {},
        children: [
          {
            name: 'td',
            attrs: {},
            children: [{ text: '张三' }]
          },
          {
            name: 'td',
            attrs: {},
            children: [{ text: '25' }]
          }
        ]
      }
    ]
  }
])
</script>
```

### 视频播放

```vue
<template>
  <zx-node 
    name="video"
    :attrs="videoAttrs"
    :childs="[]"
    :opts="options"
    @play="handleVideoPlay"
  />
</template>

<script setup>
const videoAttrs = ref({
  id: 'video1',
  src: 'https://example.com/video.mp4',
  controls: true,
  autoplay: false,
  style: 'width: 100%; height: 200px;'
})

const handleVideoPlay = (data) => {
  console.log('视频开始播放:', data)
}
</script>
```

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| imgtap | 图片点击事件 | attrs - 图片属性对象 |
| linktap | 链接点击事件 | { innerText, href, ...attrs } |
| play | 媒体播放事件 | { source, attrs } |
| error | 加载错误事件 | { source, attrs, errMsg } |
| ready | 组件渲染完成事件 | rect - 组件位置信息 |

## 平台兼容性

| 平台 | 支持情况 | 特殊说明 |
|------|----------|----------|
| H5 | ✅ 完全支持 | 支持 iframe、embed 等 |
| APP-PLUS | ✅ 完全支持 | 支持原生视频播放 |
| 微信小程序 | ✅ 支持 | 部分功能受限 |
| 支付宝小程序 | ✅ 支持 | 部分功能受限 |
| 百度小程序 | ✅ 支持 | 部分功能受限 |
| 头条小程序 | ✅ 支持 | 音频功能受限 |
| QQ小程序 | ✅ 支持 | 部分功能受限 |
| 快手小程序 | ✅ 支持 | 图片功能简化 |
| 360小程序 | ✅ 支持 | 部分功能受限 |
| 鸿蒙 | ✅ 支持 | 图片模式特殊处理 |

## 注意事项

### 图片处理
1. **懒加载**：启用懒加载时，图片会在进入可视区域时才开始加载
2. **占位图**：建议设置合适的占位图来优化用户体验
3. **长按保存**：仅在 APP-PLUS 平台支持图片长按保存功能

### 视频播放
1. **自动暂停**：当播放新视频时，会自动暂停其他正在播放的视频
2. **多源支持**：支持多个视频源，加载失败时自动切换到下一个源
3. **播放速率**：支持设置播放速率（需要根组件支持）

### 链接处理
1. **锚点跳转**：以 `#` 开头的链接会被识别为锚点
2. **外部链接**：包含 `://` 的链接会被识别为外部链接
3. **页面跳转**：其他链接会尝试页面跳转或切换 tab

### 性能优化
1. **递归深度**：避免过深的嵌套结构，可能影响性能
2. **图片数量**：大量图片时建议启用懒加载
3. **rich-text 使用**：复杂样式会自动使用 rich-text 组件渲染

## 常见问题

### Q: 图片不显示怎么办？
A: 检查图片 URL 是否正确，网络是否正常，是否设置了错误占位图。

### Q: 视频无法播放？
A: 确认视频格式是否被平台支持，检查视频 URL 是否有效。

### Q: 表格样式不正确？
A: 确保表格结构完整，检查 CSS 样式是否正确设置。

### Q: 链接点击无响应？
A: 检查链接格式是否正确，确认是否正确监听了 linktap 事件。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础 HTML 元素渲染
- 支持图片懒加载和预览
- 支持视频音频播放
- 支持表格和链接

---

如有其他问题，请查看源码或联系开发者。
