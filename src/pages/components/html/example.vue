<template>
  <view class="example-container">
    <view class="header">
      <text class="title">zx-html 组件示例</text>
    </view>
    
    <!-- 基础示例 -->
    <view class="section">
      <text class="section-title">基础使用</text>
      <zx-html 
        :content="basicContent" 
        :preview-img="true"
        :selectable="true"
        @ready="onReady"
        @imgtap="onImgTap"
        @linktap="onLinkTap"
      />
    </view>

    <!-- 自定义样式示例 -->
    <view class="section">
      <text class="section-title">自定义样式</text>
      <zx-html 
        :content="styledContent"
        :tag-style="customTagStyle"
        container-style="padding: 15px; background: #f8f9fa; border-radius: 8px;"
      />
    </view>

    <!-- 图片处理示例 -->
    <view class="section">
      <text class="section-title">图片处理（懒加载、占位图）</text>
      <zx-html 
        :content="imageContent"
        :lazy-load="true"
        :loading-img="loadingImage"
        :error-img="errorImage"
        @imgtap="handleImageTap"
      />
    </view>

    <!-- 表格示例 -->
    <view class="section">
      <text class="section-title">表格展示</text>
      <zx-html 
        :content="tableContent"
        :scroll-table="true"
      />
    </view>

    <!-- 媒体内容示例 -->
    <view class="section">
      <text class="section-title">视频内容</text>
      <zx-html 
        :content="videoContent"
        :pause-video="true"
        @play="onVideoPlay"
      />
    </view>

    <!-- 控制按钮 -->
    <view class="controls">
      <button class="btn" @click="getText">获取文本</button>
      <button class="btn" @click="addContent">追加内容</button>
      <button class="btn" @click="clearContent">清空内容</button>
      <button class="btn" @click="navigateToTop">返回顶部</button>
    </view>

    <!-- 动态内容展示 -->
    <view class="section">
      <text class="section-title">动态内容</text>
      <zx-html 
        ref="dynamicHtmlRef"
        :content="dynamicContent"
        :use-anchor="true"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 组件引用
const dynamicHtmlRef = ref(null)

// 基础内容
const basicContent = ref(`
  <h1>欢迎使用 zx-html 组件</h1>
  <p>这是一个基于 <strong>mp-html</strong> 封装的 Vue 3 富文本解析组件。</p>
  <p>支持以下特性：</p>
  <ul>
    <li>丰富的 HTML 标签支持</li>
    <li>图片预览和懒加载</li>
    <li>视频播放控制</li>
    <li>链接跳转处理</li>
    <li>自定义样式设置</li>
  </ul>
  <p>点击下方链接了解更多：<a href="https://github.com/jin-yufeng/mp-html">mp-html 官方文档</a></p>
`)

// 自定义样式内容
const styledContent = ref(`
  <h2>自定义样式示例</h2>
  <p class="highlight">这段文字使用了自定义样式</p>
  <div>
    <span>行内元素</span>
    <code>代码片段</code>
  </div>
`)

// 自定义标签样式
const customTagStyle = reactive({
  h2: 'color: #007aff; font-size: 20px; margin: 10px 0;',
  p: 'color: #666; font-size: 16px; line-height: 1.6;',
  code: 'background: #f1f3f4; padding: 2px 6px; border-radius: 4px; color: #e83e8c;',
  span: 'color: #28a745; font-weight: bold;'
})

// 图片内容
const imageContent = ref(`
  <h3>图片展示</h3>
  <p>以下是一些示例图片：</p>
  <img src="https://picsum.photos/300/200?random=1" alt="随机图片1" />
  <img src="https://picsum.photos/300/200?random=2" alt="随机图片2" />
  <p>支持图片点击预览和懒加载功能。</p>
`)

// 占位图
const loadingImage = ref('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iNzUiIHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIGZpbGw9IiNEREREREQiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMiAyWk0xMyAxN0gxMVYxNUgxM1YxN1pNMTMgMTNIMTFWN0gxM1YxM1oiIGZpbGw9IiM5Njk2OTYiLz4KPC9zdmc+Cjwvc3ZnPgo=')
const errorImage = ref('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkY2B0I4Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPuWbvueJh+WKoOi9veWksei0pTwvdGV4dD4KPC9zdmc+')

// 表格内容
const tableContent = ref(`
  <h3>数据表格</h3>
  <table border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>职业</th>
        <th>城市</th>
        <th>评分</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>张三</td>
        <td>28</td>
        <td>前端工程师</td>
        <td>北京</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
      <tr>
        <td>李四</td>
        <td>32</td>
        <td>后端工程师</td>
        <td>上海</td>
        <td>⭐⭐⭐⭐</td>
      </tr>
      <tr>
        <td>王五</td>
        <td>26</td>
        <td>UI设计师</td>
        <td>深圳</td>
        <td>⭐⭐⭐⭐⭐</td>
      </tr>
    </tbody>
  </table>
`)

// 视频内容
const videoContent = ref(`
  <h3>视频演示</h3>
  <p>这里是一个示例视频：</p>
  <video 
    src="https://www.w3schools.com/html/mov_bbb.mp4" 
    controls 
    width="100%" 
    height="200"
    poster="https://picsum.photos/320/180?random=video"
  >
    您的浏览器不支持视频播放
  </video>
  <p>视频支持自动暂停功能，播放一个视频时会自动暂停其他视频。</p>
`)

// 动态内容
const dynamicContent = ref(`
  <div id="top">
    <h3>动态内容操作</h3>
    <p>这部分内容可以通过按钮进行动态操作。</p>
  </div>
`)

// 事件处理函数
const onReady = (data) => {
  console.log('HTML 渲染完成:', data)
  uni.showToast({
    title: '渲染完成',
    icon: 'success'
  })
}

const onImgTap = (data) => {
  console.log('图片被点击:', data.src)
  uni.showModal({
    title: '图片点击',
    content: `点击了图片: ${data.src}`,
    showCancel: false
  })
}

const onLinkTap = (data) => {
  console.log('链接被点击:', data.href)
  uni.showModal({
    title: '链接点击',
    content: `即将跳转到: ${data.href}`,
    confirmText: '跳转',
    success: (res) => {
      if (res.confirm) {
        // 在这里处理链接跳转逻辑
        console.log('确认跳转')
      } else {
        data.ignore() // 阻止默认跳转
      }
    }
  })
}

const handleImageTap = (data) => {
  console.log('图片懒加载点击:', data.src)
}

const onVideoPlay = (data) => {
  console.log('视频开始播放:', data)
  uni.showToast({
    title: '视频播放中',
    icon: 'none'
  })
}

// 控制方法
const getText = () => {
  if (dynamicHtmlRef.value) {
    const text = dynamicHtmlRef.value.getText()
    uni.showModal({
      title: '文本内容',
      content: text || '暂无文本内容',
      showCancel: false
    })
  }
}

const addContent = () => {
  if (dynamicHtmlRef.value) {
    const timestamp = new Date().toLocaleTimeString()
    const newContent = `<p>📝 ${timestamp} - 新增的内容项</p>`
    dynamicHtmlRef.value.setContent(newContent, true) // 追加内容
    
    uni.showToast({
      title: '内容已追加',
      icon: 'success'
    })
  }
}

const clearContent = () => {
  dynamicContent.value = '<p style="color: #999;">内容已清空，点击"追加内容"重新添加</p>'
  uni.showToast({
    title: '内容已清空',
    icon: 'none'
  })
}

const navigateToTop = () => {
  if (dynamicHtmlRef.value) {
    dynamicHtmlRef.value.navigateTo('top')
    uni.showToast({
      title: '已跳转到顶部',
      icon: 'none'
    })
  }
}
</script>

<style scoped>
.example-container {
  padding: 20px;
  background: #fff;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
}

.section-title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #007aff;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #007aff;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
  justify-content: center;
}

.btn {
  background: #007aff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  min-width: 120px;
}

.btn:active {
  background: #0056cc;
  transform: scale(0.98);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .example-container {
    padding: 15px;
  }
  
  .section {
    padding: 15px;
    margin-bottom: 20px;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 80%;
    max-width: 200px;
  }
}
</style> 