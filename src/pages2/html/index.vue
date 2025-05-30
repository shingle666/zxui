<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">zx-html 富文本组件</text>
      <text class="page-desc">基于 mp-html 封装的全端富文本解析组件</text>
    </view>

    <!-- 功能展示区域 -->
    <scroll-view class="content" scroll-y="true">
      
      <!-- 基础使用示例 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">🚀 基础使用</text>
          <text class="section-desc">支持各种 HTML 标签渲染</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="basicContent" 
            :preview-img="true"
            :selectable="true"
            @ready="onReady"
            @imgtap="onImgTap"
            @linktap="onLinkTap"
          />
        </view>
      </view>

      <!-- 自定义样式示例 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">🎨 自定义样式</text>
          <text class="section-desc">支持标签样式定制</text>
        </view>
        <view class="demo-container styled-demo">
          <zx-html 
            :content="styledContent"
            :tag-style="customTagStyle"
            container-style="padding: 15px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;"
          />
        </view>
      </view>

      <!-- 图片处理示例 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">🖼️ 图片处理</text>
          <text class="section-desc">懒加载、占位图、点击预览</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="imageContent"
            :lazy-load="enableLazyLoad"
            :loading-img="loadingPlaceholder"
            :error-img="errorPlaceholder"
            :preview-img="enablePreview"
            @imgtap="handleImageTap"
          />
          <view class="controls">
            <button 
              class="control-btn" 
              :class="{ active: enableLazyLoad }" 
              @click="toggleLazyLoad"
            >
              {{ enableLazyLoad ? '✅' : '❌' }} 懒加载
            </button>
            <button 
              class="control-btn" 
              :class="{ active: enablePreview }" 
              @click="togglePreview"
            >
              {{ enablePreview ? '✅' : '❌' }} 预览
            </button>
          </view>
        </view>
      </view>

      <!-- 表格展示 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">📊 表格展示</text>
          <text class="section-desc">支持复杂表格渲染</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="tableContent"
            :scroll-table="true"
          />
        </view>
      </view>

      <!-- 视频媒体 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">🎬 视频媒体</text>
          <text class="section-desc">视频播放控制</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="videoContent"
            :pause-video="true"
            @play="onVideoPlay"
          />
        </view>
      </view>

      <!-- 动态内容操作 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">⚡ 动态操作</text>
          <text class="section-desc">API 方法调用演示</text>
        </view>
        <view class="demo-container">
          <zx-html 
            ref="dynamicHtmlRef"
            :content="dynamicContent"
            :use-anchor="true"
          />
          
          <!-- 操作按钮组 -->
          <view class="action-buttons">
            <button class="action-btn primary" @click="getText">
              📄 获取文本
            </button>
            <button class="action-btn success" @click="addContent">
              ➕ 追加内容
            </button>
            <button class="action-btn warning" @click="setNewContent">
              🔄 替换内容
            </button>
            <button class="action-btn info" @click="getComponentInfo">
              📏 获取信息
            </button>
            <button class="action-btn danger" @click="clearContent">
              🗑️ 清空内容
            </button>
            <button class="action-btn default" @click="navigateToTop">
              ⬆️ 返回顶部
            </button>
          </view>
        </view>
      </view>

      <!-- 代码块展示 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">💻 代码展示</text>
          <text class="section-desc">代码块语法高亮</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="codeContent"
            :selectable="true"
          />
        </view>
      </view>

      <!-- 复杂布局 -->
      <view class="demo-section">
        <view class="section-header">
          <text class="section-title">🎯 复杂布局</text>
          <text class="section-desc">混合内容渲染</text>
        </view>
        <view class="demo-container">
          <zx-html 
            :content="complexContent"
            :tag-style="complexTagStyle"
          />
        </view>
      </view>

    </scroll-view>

    <!-- 统计信息 -->
    <view class="stats-bar">
      <text class="stats-text">事件触发次数: {{ eventCount }}</text>
      <text class="stats-text">当前内容长度: {{ contentLength }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// 响应式数据
const dynamicHtmlRef = ref(null)
const eventCount = ref(0)
const enableLazyLoad = ref(true)
const enablePreview = ref(true)

// 基础内容
const basicContent = ref(`
  <div id="top">
    <h1 style="color: #2c3e50; text-align: center; margin-bottom: 20px;">
      🎉 欢迎使用 zx-html 组件
    </h1>
    <p style="font-size: 16px; line-height: 1.8; color: #34495e;">
      这是一个基于 <strong style="color: #e74c3c;">mp-html</strong> 封装的 Vue 3 富文本解析组件，
      支持 <em style="color: #3498db;">全端渲染</em>（H5、小程序、App）。
    </p>
    
    <div style="border-left: 4px solid #3498db; padding: 10px 15px; background: #ecf0f1; margin: 15px 0;">
      <p>💡 支持丰富的 HTML 标签、自定义样式、事件处理等功能</p>
    </div>
    
    <h3>✨ 主要特性：</h3>
    <ul style="padding-left: 20px;">
      <li>🌐 全端支持（H5、小程序、App）</li>
      <li>🏷️ 丰富的 HTML 标签支持</li>
      <li>🖼️ 图片预览和懒加载</li>
      <li>🎬 视频播放控制</li>
      <li>🔗 链接跳转处理</li>
      <li>🎨 自定义样式设置</li>
    </ul>
    
    <p>
      <a href="https://github.com/jin-yufeng/mp-html" style="color: #e67e22; text-decoration: none;">
        📖 查看 mp-html 官方文档
      </a>
    </p>
  </div>
`)

// 自定义样式内容
const styledContent = ref(`
  <h2>🌈 炫彩样式展示</h2>
  <p class="highlight">这段文字使用了渐变背景样式</p>
  <div style="display: flex; align-items: center; gap: 10px; margin: 15px 0;">
    <span>🔥 热门标签</span>
    <code>Vue.js</code>
    <code>uni-app</code>
    <code>mp-html</code>
  </div>
  <p style="text-align: center; margin-top: 20px;">
    ⭐ 让富文本更加美观动人 ⭐
  </p>
`)

// 自定义标签样式
const customTagStyle = reactive({
  h2: 'color: #fff; font-size: 22px; margin: 15px 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
  p: 'color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.6;',
  code: 'background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 6px; color: #fff; font-weight: bold; margin: 0 5px;',
  span: 'color: #ffd700; font-weight: bold; font-size: 18px;'
})

// 图片内容
const imageContent = ref(`
  <h3>📸 图片展示廊</h3>
  <p>以下图片支持点击预览和懒加载：</p>
  <div style="text-align: center;">
    <img src="https://picsum.photos/300/200?random=1" alt="风景图片1" style="margin: 10px; border-radius: 8px;" />
    <img src="https://picsum.photos/300/200?random=2" alt="风景图片2" style="margin: 10px; border-radius: 8px;" />
    <img src="https://picsum.photos/300/200?random=3" alt="风景图片3" style="margin: 10px; border-radius: 8px;" />
  </div>
  <p style="color: #7f8c8d; font-size: 14px; text-align: center;">
    💡 点击图片可以预览，支持手势缩放
  </p>
`)

// 占位图（base64 编码的简单图标）
const loadingPlaceholder = ref('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmMGYwZjAiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjIwIiBmaWxsPSIjY2NjIj48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjE1OzI1OzE1IiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjwvY2lyY2xlPjx0ZXh0IHg9IjE1MCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LXNpemU9IjE0Ij7liqDovb3kuK08L3RleHQ+PC9zdmc+')
const errorPlaceholder = ref('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmViZWUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIxMDAiIHI9IjMwIiBzdHJva2U9IiNlNzRjM2MiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Im0xMzUgODVsMzAgMzBtMC0zMGwtMzAgMzAiIHN0cm9rZT0iI2U3NGMzYyIgc3Ryb2tlLXdpZHRoPSIzIi8+PHRleHQgeD0iMTUwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNlNzRjM2MiIGZvbnQtc2l6ZT0iMTQiPuWKoOi9veWksei0pTwvdGV4dD48L3N2Zz4=')

// 表格内容
const tableContent = ref(`
  <h3>📊 数据统计表</h3>
  <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse; margin: 15px 0;">
    <thead>
      <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <th>项目</th>
        <th>数量</th>
        <th>状态</th>
        <th>进度</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>🚀 功能模块</td>
        <td>15</td>
        <td><span style="color: #27ae60;">✅ 已完成</span></td>
        <td>100%</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td>🎨 UI 组件</td>
        <td>28</td>
        <td><span style="color: #f39c12;">⏳ 进行中</span></td>
        <td>85%</td>
      </tr>
      <tr>
        <td>📱 测试用例</td>
        <td>42</td>
        <td><span style="color: #27ae60;">✅ 已完成</span></td>
        <td>100%</td>
      </tr>
      <tr style="background: #f8f9fa;">
        <td>📚 文档编写</td>
        <td>8</td>
        <td><span style="color: #e74c3c;">🔄 待开始</span></td>
        <td>20%</td>
      </tr>
    </tbody>
  </table>
`)

// 视频内容
const videoContent = ref(`
  <h3>🎬 媒体播放</h3>
  <p>这里展示视频播放功能：</p>
  <video 
    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
    controls 
    width="100%" 
    height="200"
    poster="https://picsum.photos/640/360?random=video"
    style="border-radius: 8px; margin: 10px 0;"
  >
    您的浏览器不支持视频播放
  </video>
  <p style="color: #7f8c8d; font-size: 14px;">
    🎯 支持视频自动暂停功能，播放一个视频时会自动暂停其他视频
  </p>
`)

// 动态内容
const dynamicContent = ref(`
  <div style="padding: 20px; background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); border-radius: 12px; color: white; text-align: center;">
    <h3 style="margin: 0 0 15px 0;">🎯 动态内容区域</h3>
    <p style="margin: 0; opacity: 0.9;">这里的内容可以通过下方按钮进行动态操作</p>
  </div>
`)

// 代码内容
const codeContent = ref(`
  <h3>💻 代码示例</h3>
  <p>Vue 3 Composition API 使用示例：</p>
  <pre style="background: #2d3748; color: #e2e8f0; padding: 15px; border-radius: 8px; overflow-x: auto; font-size: 14px; line-height: 1.5;"><code>&lt;template&gt;
  &lt;zx-html 
    :content="htmlContent"
    :preview-img="true"
    @ready="onReady"
  /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue'

const htmlContent = ref('&lt;h1&gt;Hello World!&lt;/h1&gt;')

const onReady = (data) => {
  console.log('渲染完成', data)
}
&lt;/script&gt;</code></pre>
`)

// 复杂内容
const complexContent = ref(`
  <article style="max-width: 100%; margin: 0 auto;">
    <header style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #2c3e50; margin-bottom: 10px;">🌟 技术文章示例</h1>
      <p style="color: #7f8c8d; font-size: 14px;">
        <span>📅 2024-12-19</span> | 
        <span>👤 作者：开发者</span> | 
        <span>👁️ 阅读：1,234</span>
      </p>
    </header>
    
    <section style="margin-bottom: 25px;">
      <h2 style="color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px;">📖 前言</h2>
      <p style="line-height: 1.8; text-indent: 2em;">
        在现代 Web 开发中，富文本处理一直是一个重要且复杂的话题。
        本文将介绍如何使用 <strong>zx-html</strong> 组件来轻松处理各种富文本内容。
      </p>
    </section>
    
    <section style="margin-bottom: 25px;">
      <h2 style="color: #34495e; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">⚡ 快速开始</h2>
      <ol style="padding-left: 20px; line-height: 1.8;">
        <li>安装依赖：<code style="background: #f1f2f6; padding: 2px 6px; border-radius: 4px;">npm install mp-html</code></li>
        <li>引入组件到项目中</li>
        <li>在模板中使用 <code style="background: #f1f2f6; padding: 2px 6px; border-radius: 4px;">&lt;zx-html&gt;</code> 标签</li>
        <li>设置相关属性和事件</li>
      </ol>
    </section>
    
    <aside style="background: #e8f5e8; border: 1px solid #27ae60; border-radius: 8px; padding: 15px; margin: 20px 0;">
      <h4 style="color: #27ae60; margin: 0 0 10px 0;">💡 小贴士</h4>
      <p style="margin: 0; color: #2d5a2d;">
        使用 zx-html 组件时，建议开启图片懒加载以提升页面性能，
        特别是在内容较多的情况下。
      </p>
    </aside>
    
    <footer style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
      <p style="color: #95a5a6; font-size: 14px;">
        🎉 感谢阅读，希望这个组件对您有帮助！
      </p>
    </footer>
  </article>
`)

// 复杂样式
const complexTagStyle = reactive({
  article: 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
  h1: 'font-size: 28px; font-weight: 700;',
  h2: 'font-size: 22px; font-weight: 600; margin: 20px 0 15px 0;',
  h4: 'font-size: 16px; font-weight: 600;',
  p: 'font-size: 16px; color: #2c3e50; line-height: 1.6; margin: 10px 0;',
  code: 'font-family: "Fira Code", Consolas, monospace; font-size: 14px;'
})

// 计算属性
const contentLength = computed(() => {
  return dynamicContent.value.length
})

// 事件处理函数
const incrementEventCount = () => {
  eventCount.value++
}

const onReady = (data) => {
  incrementEventCount()
  console.log('zx-html: 渲染完成', data)
  uni.showToast({
    title: '渲染完成',
    icon: 'success',
    duration: 1500
  })
}

const onImgTap = (data) => {
  incrementEventCount()
  console.log('zx-html: 图片被点击', data.src)
  uni.showModal({
    title: '图片点击',
    content: `图片地址: ${data.src}`,
    showCancel: false
  })
}

const onLinkTap = (data) => {
  incrementEventCount()
  console.log('zx-html: 链接被点击', data.href)
  uni.showModal({
    title: '链接跳转',
    content: `即将跳转到: ${data.href}`,
    confirmText: '打开',
    success: (res) => {
      if (res.confirm) {
        // 这里可以添加自定义跳转逻辑
        console.log('确认跳转')
      } else {
        data.ignore() // 阻止默认跳转
      }
    }
  })
}

const handleImageTap = (data) => {
  incrementEventCount()
  console.log('zx-html: 图片懒加载点击', data.src)
}

const onVideoPlay = (data) => {
  incrementEventCount()
  console.log('zx-html: 视频开始播放', data)
  uni.showToast({
    title: '视频播放中',
    icon: 'none'
  })
}

// 控制方法
const toggleLazyLoad = () => {
  enableLazyLoad.value = !enableLazyLoad.value
  uni.showToast({
    title: `懒加载已${enableLazyLoad.value ? '开启' : '关闭'}`,
    icon: 'none'
  })
}

const togglePreview = () => {
  enablePreview.value = !enablePreview.value
  uni.showToast({
    title: `图片预览已${enablePreview.value ? '开启' : '关闭'}`,
    icon: 'none'
  })
}

// API 方法演示
const getText = () => {
  if (dynamicHtmlRef.value) {
    const text = dynamicHtmlRef.value.getText()
    uni.showModal({
      title: '提取的文本内容',
      content: text || '暂无文本内容',
      showCancel: false
    })
  }
}

const addContent = () => {
  if (dynamicHtmlRef.value) {
    const timestamp = new Date().toLocaleTimeString()
    const newContent = `
      <div style="margin: 15px 0; padding: 15px; background: rgba(52, 152, 219, 0.1); border-left: 4px solid #3498db; border-radius: 4px;">
        <p style="margin: 0; color: #2980b9;">
          📝 ${timestamp} - 新增内容项 #${eventCount.value + 1}
        </p>
      </div>
    `
    dynamicHtmlRef.value.setContent(newContent, true) // 追加内容
    incrementEventCount()
    
    uni.showToast({
      title: '内容已追加',
      icon: 'success'
    })
  }
}

const setNewContent = () => {
  const newContent = `
    <div style="padding: 20px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white; text-align: center;">
      <h3 style="margin: 0 0 15px 0;">🔄 内容已更新</h3>
      <p style="margin: 0; opacity: 0.9;">时间: ${new Date().toLocaleString()}</p>
    </div>
  `
  dynamicContent.value = newContent
  incrementEventCount()
  
  uni.showToast({
    title: '内容已替换',
    icon: 'success'
  })
}

const getComponentInfo = () => {
  if (dynamicHtmlRef.value) {
    dynamicHtmlRef.value.getRect().then(rect => {
      uni.showModal({
        title: '组件信息',
        content: `宽度: ${rect.width}px\n高度: ${rect.height}px\n位置: (${rect.left}, ${rect.top})`,
        showCancel: false
      })
    }).catch(() => {
      uni.showToast({
        title: '获取信息失败',
        icon: 'none'
      })
    })
  }
}

const clearContent = () => {
  dynamicContent.value = `
    <div style="padding: 20px; background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 12px; text-align: center; color: #6c757d;">
      <h3 style="margin: 0 0 10px 0;">🗑️ 内容已清空</h3>
      <p style="margin: 0;">点击"追加内容"或"替换内容"重新添加</p>
    </div>
  `
  incrementEventCount()
  
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

// 生命周期
onMounted(() => {
  console.log('zx-html 示例页面已加载')
})
</script>

<style scoped>
.container {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
}

.page-header {
  padding: 30px 20px 20px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.page-title {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
}

.page-desc {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.content {
  flex: 1;
  padding: 0 15px 20px 15px;
}

.demo-section {
  margin-bottom: 25px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-header {
  padding: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.section-title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.section-desc {
  display: block;
  font-size: 14px;
  opacity: 0.9;
}

.demo-container {
  padding: 20px;
}

.styled-demo {
  padding: 0;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: center;
}

.control-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #666;
  font-size: 14px;
  transition: all 0.3s ease;
}

.control-btn.active {
  background: #007aff;
  color: white;
  border-color: #007aff;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.action-btn {
  padding: 12px 8px;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-align: center;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn.primary { background: #007aff; }
.action-btn.success { background: #28a745; }
.action-btn.warning { background: #ffc107; color: #333; }
.action-btn.info { background: #17a2b8; }
.action-btn.danger { background: #dc3545; }
.action-btn.default { background: #6c757d; }

.stats-bar {
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .page-header {
    padding: 20px 15px 15px 15px;
  }
  
  .page-title {
    font-size: 20px;
  }
  
  .content {
    padding: 0 10px 15px 10px;
  }
  
  .demo-container {
    padding: 15px;
  }
  
  .action-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }
}
</style>
