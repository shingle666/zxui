<template>
	<view class="container">
		<zx-navbar title="zx-code 源代码展示组件" :border="false"></zx-navbar>
		
		<scroll-view scroll-y class="content">
			<!-- 基础用法 -->
			<view class="demo-section">
				<view class="demo-title">基础用法</view>
				<view class="demo-description">展示基础的 JavaScript 代码示例</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="basicJsCode"
						language="javascript"
						title="JavaScript 基础示例"
					/>
				</view>
			</view>
			
			<!-- Vue 组件代码展示 -->
			<view class="demo-section">
				<view class="demo-title">Vue 组件代码</view>
				<view class="demo-description">展示 Vue 组件的模板和脚本</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="vueComponentCode"
						language="vue"
						title="Vue 组件示例"
						:showLineNumber="true"
					/>
				</view>
			</view>
			
			<!-- CSS 样式代码 -->
			<view class="demo-section">
				<view class="demo-title">CSS 样式代码</view>
				<view class="demo-description">展示 CSS/SCSS 样式代码</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="cssCode"
						language="css"
						title="CSS 样式示例"
						:showLineNumber="false"
						:wrapCode="true"
					/>
				</view>
			</view>

			<!-- HTML 结构代码 -->
			<view class="demo-section">
				<view class="demo-title">HTML 结构代码</view>
				<view class="demo-description">展示 HTML 标签结构</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="htmlCode"
						language="html"
						title="HTML 结构示例"
						:fontSize="24"
						:lineHeight="36"
					/>
				</view>
			</view>

			<!-- 功能演示 -->
			<view class="demo-section">
				<view class="demo-title">功能演示</view>
				<view class="demo-description">展示组件的各种功能特性</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="featureCode"
						language="javascript"
						title="功能特性展示"
						:showLineNumber="true"
						:enableCopy="true"
						:enableFullscreen="true"
						:showStats="true"
					/>
				</view>
			</view>

			<!-- 自定义配置 -->
			<view class="demo-section">
				<view class="demo-title">自定义配置</view>
				<view class="demo-description">自定义字体大小、行高等样式</view>
				<view class="demo-wrapper">
					<zx-code 
						:sourceCode="customConfigCode"
						language="vue"
						title="自定义配置示例"
						fontSize="28rpx"
						lineHeight="44rpx"
						:showStats="false"
					/>
				</view>
			</view>

			<!-- 仅展示效果 -->
			<view class="demo-section">
				<view class="demo-title">仅展示效果</view>
				<view class="demo-description">隐藏代码块，只显示文本样式效果</view>
				<view class="demo-wrapper">
					<zx-text-display />
				</view>
			</view>

			<!-- 操作控制 -->
			<view class="demo-section">
				<view class="demo-title">操作控制</view>
				<view class="demo-description">通过按钮控制组件功能</view>
				<view class="button-group">
					<button class="control-btn primary" @click="toggleLanguage">
						切换语言: {{ currentLanguage }}
					</button>
					<button class="control-btn success" @click="toggleLineNumber">
						{{ showLineNumbers ? '隐藏' : '显示' }}行号
					</button>
					<button class="control-btn info" @click="copyCurrentCode">
						复制当前代码
					</button>
				</view>
				<view class="demo-wrapper">
					<zx-code 
						ref="controlCodeRef"
						:sourceCode="currentCode"
						:language="currentLanguage"
						title="可控制的代码示例"
						:showLineNumber="showLineNumbers"
						:enableCopy="true"
					/>
				</view>
			</view>

			<!-- 组件特性说明 -->
			<view class="demo-section">
				<view class="demo-title">组件特性</view>
				<view class="feature-list">
					<view class="feature-item">
						<text class="feature-icon">🎨</text>
						<view class="feature-content">
							<text class="feature-title">语法高亮</text>
							<text class="feature-desc">支持 JavaScript、Vue、CSS、HTML 等多种语言</text>
						</view>
					</view>
					<view class="feature-item">
						<text class="feature-icon">📝</text>
						<view class="feature-content">
							<text class="feature-title">行号显示</text>
							<text class="feature-desc">可动态切换显示/隐藏行号</text>
						</view>
					</view>
					<view class="feature-item">
						<text class="feature-icon">📋</text>
						<view class="feature-content">
							<text class="feature-title">一键复制</text>
							<text class="feature-desc">跨平台的代码复制功能</text>
						</view>
					</view>
					<view class="feature-item">
						<text class="feature-icon">🔍</text>
						<view class="feature-content">
							<text class="feature-title">全屏模式</text>
							<text class="feature-desc">支持全屏查看长代码</text>
						</view>
					</view>
					<view class="feature-item">
						<text class="feature-icon">📱</text>
						<view class="feature-content">
							<text class="feature-title">响应式设计</text>
							<text class="feature-desc">完美适配各种屏幕尺寸</text>
						</view>
					</view>
					<view class="feature-item">
						<text class="feature-icon">⚙️</text>
						<view class="feature-content">
							<text class="feature-title">高度可配置</text>
							<text class="feature-desc">支持自定义样式和功能</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import zxCode from '@/components/zx-code/zx-code.vue'

// 页面标题
uni.setNavigationBarTitle({
	title: 'zx-code 源代码展示组件'
})

// 控制状态
const showLineNumbers = ref(true)
const currentLanguageIndex = ref(0)
const controlCodeRef = ref()

// 支持的语言列表
const languages = ['javascript', 'vue', 'css', 'html']
const currentLanguage = computed(() => languages[currentLanguageIndex.value])

// 代码示例
const basicJsCode = ref(`// JavaScript 基础示例
function greetUser(name, age) {
    // 参数验证
    if (!name || typeof name !== 'string') {
        throw new Error('姓名必须是非空字符串');
    }
    
    if (age < 0 || age > 150) {
        throw new Error('年龄必须在 0-150 之间');
    }
    
    // 生成问候语
    const greeting = \`你好，\${name}！你今年 \${age} 岁了。\`;
    console.log(greeting);
    
    return {
        message: greeting,
        timestamp: new Date().toISOString(),
        user: { name, age }
    };
}

// 使用示例
try {
    const result = greetUser('张三', 25);
    console.log('结果:', result);
} catch (error) {
    console.error('错误:', error.message);
}`)

const vueComponentCode = ref(`<template>
  <view class="user-profile">
    <view class="avatar-section">
      <image 
        :src="user.avatar || defaultAvatar" 
        class="avatar"
        @error="handleAvatarError"
      />
      <view class="upload-btn" @click="uploadAvatar">
        <zx-icon name="camera" size="20" color="#fff" />
      </view>
    </view>
    
    <view class="info-section">
      <text class="username">{{ user.name }}</text>
      <text class="email">{{ user.email }}</text>
      <text class="bio">{{ user.bio || '这个人很懒，什么都没写~' }}</text>
      
      <view class="action-buttons">
        <button @click="editProfile" class="btn primary">编辑资料</button>
        <button @click="logout" class="btn secondary">退出登录</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const defaultAvatar = ref('/static/images/default-avatar.png')

const emit = defineEmits(['edit', 'logout', 'uploadAvatar'])

const editProfile = () => {
  emit('edit', props.user)
}

const logout = () => {
  emit('logout')
}

const uploadAvatar = () => {
  emit('uploadAvatar')
}

const handleAvatarError = () => {
  console.log('头像加载失败，使用默认头像')
}
<\/script>`)

const cssCode = ref(`.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  margin: 20rpx;
  transition: transform 0.3s ease;
}

.user-profile:hover {
  transform: translateY(-4rpx);
}

.avatar-section {
  position: relative;
  margin-bottom: 30rpx;
}

.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease;
}

.avatar:hover {
  transform: scale(1.05);
}

.upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36rpx;
  height: 36rpx;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid #fff;
  cursor: pointer;
}

.info-section {
  text-align: center;
  color: #fff;
}

.username {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.email {
  display: block;
  font-size: 24rpx;
  opacity: 0.8;
  margin-bottom: 16rpx;
}

.bio {
  display: block;
  font-size: 26rpx;
  opacity: 0.9;
  margin-bottom: 30rpx;
  max-width: 400rpx;
  line-height: 1.5;
}

.action-buttons {
  display: flex;
  gap: 16rpx;
}

.btn {
  padding: 16rpx 32rpx;
  border: none;
  border-radius: 25rpx;
  font-size: 26rpx;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn.primary {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.btn.secondary {
  background: transparent;
  color: #fff;
  border: 1rpx solid rgba(255, 255, 255, 0.5);
}

.btn:hover {
  transform: translateY(-2rpx);
  opacity: 0.9;
}`)

const htmlCode = ref(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>现代化用户界面</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navigation">
            <div class="logo">
                <img src="logo.svg" alt="网站Logo" />
                <span class="brand-name">UniApp组件库</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#components">组件</a></li>
                <li><a href="#docs">文档</a></li>
                <li><a href="#examples">示例</a></li>
                <li><a href="#about">关于</a></li>
            </ul>
            <button class="theme-toggle" aria-label="切换主题">
                <span class="theme-icon">🌙</span>
            </button>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero-section">
            <div class="hero-content">
                <h1 class="hero-title">现代化的 UniApp 组件库</h1>
                <p class="hero-description">
                    提供丰富的 UI 组件，助力快速开发跨平台应用
                </p>
                <div class="hero-actions">
                    <button class="btn btn-primary">开始使用</button>
                    <button class="btn btn-secondary">查看文档</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="hero-illustration.svg" alt="插图" />
            </div>
        </section>
        
        <section class="features-section">
            <div class="container">
                <h2 class="section-title">核心特性</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>高性能</h3>
                        <p>优化的组件架构，确保应用流畅运行</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>跨平台</h3>
                        <p>一套代码，多端运行，覆盖所有主流平台</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🎨</div>
                        <h3>美观设计</h3>
                        <p>精美的 UI 设计，提升用户体验</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 UniApp 组件库. MIT License.</p>
        </div>
    </footer>
</body>
</html>`)

const featureCode = ref(`// zx-code 组件功能演示
import { ref } from 'vue'

// 组件特性展示
const codeFeatures = {
    syntaxHighlight: {
        name: '语法高亮',
        description: '支持多种编程语言的语法高亮',
        languages: ['javascript', 'vue', 'css', 'html', 'typescript'],
        example: 'language="javascript"'
    },
    
    lineNumbers: {
        name: '行号显示',
        description: '可切换的行号显示功能',
        options: [true, false],
        example: ':showLineNumber="true"'
    },
    
    copyToClipboard: {
        name: '复制功能',
        description: '一键复制代码到剪贴板',
        platforms: ['H5', '小程序', 'App'],
        example: ':enableCopy="true"'
    },
    
    fullscreenMode: {
        name: '全屏模式',
        description: '支持全屏查看长代码',
        shortcut: 'F11 或点击全屏按钮',
        example: ':enableFullscreen="true"'
    },
    
    customization: {
        name: '自定义配置',
        description: '丰富的样式和功能配置选项',
        options: {
            fontSize: '26rpx',
            lineHeight: '40rpx',
            theme: 'light',
            wrapCode: false
        }
    }
}

// 使用示例
function createCodeExample() {
    return {
        component: 'zx-code',
        props: {
            sourceCode: 'const hello = "World!";',
            language: 'javascript',
            title: '示例代码',
            showLineNumber: true,
            enableCopy: true,
            enableFullscreen: true
        }
    }
}

export { codeFeatures, createCodeExample }`)

const customConfigCode = ref(`<template>
  <!-- 自定义配置的 zx-code 组件 -->
  <zx-code 
    :sourceCode="myCode"
    language="vue"
    title="自定义样式示例"
    fontSize="28rpx"
    lineHeight="44rpx"
    :showLineNumber="false"
    :wrapCode="true"
    :showStats="false"
    :enableCopy="true"
  />
</template>

<script setup>
const myCode = \`// 这是自定义配置的代码示例
function customFunction() {
    console.log('自定义字体大小和行高');
    console.log('关闭行号显示');
    console.log('启用代码换行');
}\`;
<\/script>`)

// 可切换的代码示例
const codeExamples = [
    {
        language: 'javascript',
        code: `// JavaScript 示例
const greeting = 'Hello, World!';
console.log(greeting);`
    },
    {
        language: 'vue',
        code: `<template>
  <view>Hello Vue!</view>
</template>`
    },
    {
        language: 'css',
        code: `.example {
  color: #333;
  font-size: 16px;
}`
    },
    {
        language: 'html',
        code: `<div class="container">
  <h1>Hello HTML!</h1>
</div>`
    }
]

const currentCode = computed(() => {
    const example = codeExamples[currentLanguageIndex.value]
    return example.code
})

// 方法
const toggleLanguage = () => {
    currentLanguageIndex.value = (currentLanguageIndex.value + 1) % languages.length
    uni.showToast({
        title: `切换到 ${currentLanguage.value}`,
        icon: 'none'
    })
}

const toggleLineNumber = () => {
    showLineNumbers.value = !showLineNumbers.value
    uni.showToast({
        title: showLineNumbers.value ? '显示行号' : '隐藏行号',
        icon: 'none'
    })
}

const copyCurrentCode = () => {
    if (controlCodeRef.value) {
        controlCodeRef.value.copyCode()
    }
}
</script>

<style lang="scss" scoped>
.container {
	min-height: 100vh;
	background-color: #f5f7fa;
}

.content {
	height: calc(100vh - 88rpx);
	padding: 20rpx;
}

.demo-section {
	margin-bottom: 40rpx;
	
	.demo-title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 16rpx;
	}
	
	.demo-description {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 20rpx;
		line-height: 1.5;
	}
	
	.demo-wrapper {
		background-color: #fff;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
	}
}

.button-group {
	display: flex;
	gap: 16rpx;
	margin-bottom: 20rpx;
	flex-wrap: wrap;
}

.control-btn {
	padding: 16rpx 24rpx;
	border: none;
	border-radius: 8rpx;
	font-size: 26rpx;
	color: #fff;
	cursor: pointer;
	transition: all 0.3s ease;
	
	&.primary {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}
	
	&.success {
		background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
	}
	
	&.info {
		background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%);
	}
	
	&:active {
		transform: scale(0.98);
		opacity: 0.9;
	}
}

.feature-list {
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.feature-item {
	display: flex;
	align-items: flex-start;
	gap: 20rpx;
	padding: 24rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
	transition: transform 0.3s ease;
	
	&:hover {
		transform: translateY(-2rpx);
	}
}

.feature-icon {
	font-size: 48rpx;
	min-width: 60rpx;
	text-align: center;
}

.feature-content {
	flex: 1;
}

.feature-title {
	display: block;
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 8rpx;
}

.feature-desc {
	display: block;
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

/* 响应式设计 */
@media screen and (max-width: 750rpx) {
	.button-group {
		flex-direction: column;
	}
	
	.control-btn {
		width: 100%;
		text-align: center;
	}
	
	.feature-item {
		padding: 20rpx;
	}
	
	.feature-icon {
		font-size: 40rpx;
		min-width: 50rpx;
	}
}
</style> 