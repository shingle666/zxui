# zx-richtext 富文本组件

基于 uni-app 原生 rich-text 组件封装的增强型富文本显示组件，支持丰富的样式定制和内容处理功能。

## 特性

- ✅ 完全基于官方 rich-text 组件，保证兼容性和性能
- ✅ 支持字符串和数组两种内容格式
- ✅ 内置 HTML 内容清理和安全处理
- ✅ 智能图片处理和外部代理支持
- ✅ 丰富的样式定制选项
- ✅ 完整的事件支持（itemclick）
- ✅ 视频内容智能转换

## 安装使用

```vue
<template>
  <zx-richtext 
    :content="htmlContent"
    :selectable="true"
    :preview="true"
    @itemclick="handleItemClick"
  />
</template>

<script setup>
import zxRichtext from '@/components/zx-richtext/zx-richtext.vue'

const htmlContent = `
  <div>
    <h2>标题</h2>
    <p>这是一段包含<strong>粗体</strong>和<em>斜体</em>的文本。</p>
    <img src="https://example.com/image.jpg" alt="示例图片">
    <a href="https://uniapp.dcloud.net.cn">uni-app官网</a>
  </div>
`

const handleItemClick = (e) => {
  console.log('点击事件:', e.detail)
}
</script>
```

## Props 属性

### 内容属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| content | String \| Array | '' | 富文本内容，支持HTML字符串或nodes数组 |

### rich-text 原生属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| space | String | '' | 显示连续空格，可选值：ensp/emsp/nbsp |
| selectable | Boolean | true | 富文本是否可以长按选中 |
| imageMenuPrevent | Boolean | false | 阻止长按图片时弹起默认菜单 |
| preview | Boolean | true | 富文本中的图片是否可点击预览 |

### 样式属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fontFamily | String | 'PingFangSC-Regular' | 字体族 |
| fontSize | String | '28rpx' | 字体大小 |
| color | String | '#333333' | 文字颜色 |
| lineHeight | String | '1.6' | 行高 |
| textAlign | String | 'left' | 文本对齐方式：left/center/right/justify |
| textIndent | Boolean \| String | false | 首行缩进，true为2em，也可自定义值 |

### 图片处理属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| imgMaxWidth | String | '100%' | 图片最大宽度 |
| imgWidth | String | 'auto' | 图片宽度 |
| imgBorderRadius | String | '0' | 图片圆角 |

### 内容处理属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| autoProcess | Boolean | true | 是否自动处理内容 |
| httpToHttps | Boolean | true | 是否将HTTP链接转换为HTTPS |
| removeScript | Boolean | true | 是否移除script标签（安全考虑） |
| removeStyle | Boolean | false | 是否移除style标签 |
| externalImageProxy | String | '' | 外部图片代理地址 |

### 自定义样式

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| customStyle | Object | {} | 自定义容器样式对象 |

## Events 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| itemclick | 拦截点击事件（支持a、img标签） | event.detail={node} |
| ready | 组件准备完成 | - |
| error | 组件错误 | error |

## Methods 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getRichTextRef | 获取内部rich-text组件实例 | - |
| refresh | 刷新组件内容 | - |
| getProcessedContent | 获取处理后的内容 | - |

## 使用示例

### 基础用法

```vue
<template>
  <zx-richtext :content="htmlContent" />
</template>

<script setup>
const htmlContent = '<p>Hello <strong>World</strong>!</p>'
</script>
```

### 自定义样式

```vue
<template>
  <zx-richtext 
    :content="htmlContent"
    font-size="32rpx"
    color="#666666"
    line-height="1.8"
    text-align="center"
    :text-indent="true"
    :custom-style="{ padding: '20rpx', backgroundColor: '#f5f5f5' }"
  />
</template>
```

### 处理点击事件

```vue
<template>
  <zx-richtext 
    :content="htmlContent"
    @itemclick="handleClick"
  />
</template>

<script setup>
const htmlContent = `
  <div>
    <a href="https://uniapp.dcloud.net.cn">访问uni-app官网</a>
    <img src="https://example.com/image.jpg" alt="点击查看大图">
  </div>
`

const handleClick = (e) => {
  const { node } = e.detail
  
  if (node.name === 'a') {
    // 处理链接点击
    uni.navigateTo({
      url: `/pages/webview/webview?url=${encodeURIComponent(node.attrs.href)}`
    })
  } else if (node.name === 'img') {
    // 处理图片点击
    uni.previewImage({
      urls: [node.attrs.src],
      current: node.attrs.src
    })
  }
}
</script>
```

### 使用外部图片代理

```vue
<template>
  <zx-richtext 
    :content="htmlContent"
    external-image-proxy="https://your-proxy.com/image?url="
  />
</template>
```

### 使用数组格式内容（推荐，性能更好）

```vue
<template>
  <zx-richtext :content="nodesContent" />
</template>

<script setup>
const nodesContent = [
  {
    name: 'div',
    attrs: {
      class: 'container'
    },
    children: [
      {
        name: 'h2',
        children: [{
          type: 'text',
          text: '标题'
        }]
      },
      {
        name: 'p',
        children: [
          { type: 'text', text: '这是一段文本，包含' },
          {
            name: 'strong',
            children: [{ type: 'text', text: '粗体' }]
          },
          { type: 'text', text: '内容。' }
        ]
      }
    ]
  }
]
</script>
```

## 注意事项

1. **性能优化**：推荐使用数组格式的 nodes 而不是 HTML 字符串，可以获得更好的性能。

2. **事件限制**：rich-text 组件内部屏蔽了所有节点的事件，只有 `@itemclick` 事件可以捕获 a 和 img 标签的点击。

3. **标签支持**：只支持官方文档中列出的受信任HTML标签，不支持的标签会被移除。

4. **属性限制**：不支持 `id` 属性，支持 `class` 和 `style` 属性。

5. **视频处理**：rich-text 不支持 video 标签，组件会自动将视频标签转换为提示文本。

6. **图片显示**：非 App 平台的 img 标签仅支持网络图片。

7. **样式作用域**：如果在自定义组件中使用，只有自定义组件的 CSS 样式对 rich-text 中的 class 生效。

## 平台兼容性

| 平台 | 支持程度 | 备注 |
|------|----------|------|
| H5 | ✅ 完全支持 | 支持 @itemclick 事件 |
| App | ✅ 完全支持 | 支持 @itemclick 事件 |
| 微信小程序 | ✅ 完全支持 | 基础库2.4.1+ |
| 支付宝小程序 | ✅ 支持 | 不支持 HTML String 方式 |
| 百度小程序 | ✅ 支持 | 支持额外的 selectable 等属性 |
| 抖音小程序 | ✅ 支持 | - |
| QQ小程序 | ✅ 支持 | - |
| 快手小程序 | ✅ 支持 | - |

更多平台兼容性信息请参考 [uni-app官方文档](https://uniapp.dcloud.net.cn/component/rich-text.html)。

## 最佳实践

### 1. 性能优化

```vue
<!-- 推荐：使用数组格式 -->
<zx-richtext :content="nodesArray" />

<!-- 不推荐：大量HTML字符串 -->
<zx-richtext :content="largeHtmlString" />
```

### 2. 内容安全

```vue
<!-- 启用内容过滤 -->
<zx-richtext 
  :content="userContent"
  :remove-script="true"
  :auto-process="true"
/>
```

### 3. 图片处理

```vue
<!-- 使用图片代理处理外部图片 -->
<zx-richtext 
  :content="htmlContent"
  external-image-proxy="https://your-proxy.com/image?url="
  img-max-width="100%"
  img-border-radius="8rpx"
/>
```

### 4. 事件处理

```vue
<template>
  <zx-richtext 
    :content="content"
    @itemclick="handleClick"
  />
</template>

<script setup>
const handleClick = (e) => {
  const { node } = e.detail
  
  switch (node.name) {
    case 'a':
      // 处理链接点击
      handleLinkClick(node.attrs.href)
      break
    case 'img':
      // 处理图片点击
      handleImageClick(node.attrs.src)
      break
  }
}
</script>
```

## 常见问题

### Q: 为什么某些HTML标签不显示？
A: rich-text 组件只支持受信任的HTML标签，不受信任的标签会被自动移除。请参考官方文档中的受信任标签列表。

### Q: 如何实现视频播放？
A: rich-text 组件不支持 video 标签。建议使用专门的视频播放组件，或者将视频转换为封面图片显示。

### Q: 样式不生效怎么办？
A: 请检查：
1. 是否使用了 `id` 属性（不支持）
2. 样式是否在自定义组件的作用域内
3. 是否使用了不支持的CSS属性

### Q: 如何处理长按选择？
A: 使用 `selectable` 属性控制文本是否可以长按选择复制。

## 更新日志

### v2.0.0 (当前版本)
- ✅ 完全重构，基于官方 rich-text 组件
- ✅ 新增完整的事件支持（itemclick）
- ✅ 新增数组格式内容支持
- ✅ 优化图片处理逻辑
- ✅ 改进安全性和性能
- ✅ 完善文档和示例

### v1.x
- 基于第三方插件实现
- 功能复杂但兼容性较差

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个组件。

在提交代码前请确保：
1. 代码符合项目的编码规范
2. 添加适当的测试用例
3. 更新相关文档

## 相关链接

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [rich-text 组件文档](https://uniapp.dcloud.net.cn/component/rich-text.html)
- [Vue 3 官方文档](https://v3.vuejs.org/)

---

如果这个组件对你有帮助，请给个 ⭐️ Star 支持一下！
