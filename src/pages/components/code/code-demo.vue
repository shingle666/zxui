<template>
	<view class="code-demo-page">
		<view class="demo-header">
			<text class="header-title">zx-code 代码展示组件演示</text>
		</view>
		
		<!-- JavaScript 代码示例 -->
		<zx-code 
			:sourceCode="jsCode"
			language="javascript"
			title="JavaScript 示例"
			:showLineNumber="true"
			:enableCopy="true"
			:enableFullscreen="true"
			:wrapCode="false"
			:showStats="true"
		/>
		
		<!-- Vue 组件代码示例 -->
		<zx-code 
			:sourceCode="vueCode"
			language="vue"
			title="Vue 组件示例"
			:fontSize="24"
			:lineHeight="36"
		/>
		
		<!-- CSS 代码示例 -->
		<zx-code 
			:sourceCode="cssCode"
			language="css"
			title="CSS 样式示例"
			:showLineNumber="false"
		/>
		
		<!-- HTML 代码示例 -->
		<zx-code 
			:sourceCode="htmlCode"
			language="html"
			title="HTML 结构示例"
			:wrapCode="true"
		/>
		
		<!-- 控制面板 -->
		<view class="control-panel">
			<text class="panel-title">组件控制选项</text>
			<view class="control-options">
				<button class="control-btn" @click="toggleDemo">
					{{ showDemo ? '隐藏演示' : '显示演示' }}
				</button>
				<button class="control-btn" @click="changeLanguage">
					切换语言示例
				</button>
				<button class="control-btn" @click="changeTheme">
					切换主题
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import zxCode from '@/components/zx-code/zx-code.vue'

// 演示代码数据
const showDemo = ref(true)
const currentLanguage = ref(0)

const jsCode = ref(`// JavaScript 异步函数示例
async function fetchUserData(userId) {
    try {
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
            throw new Error('网络响应不正常');
        }
        
        const userData = await response.json();
        console.log('用户数据:', userData);
        
        return {
            success: true,
            data: userData
        };
    } catch (error) {
        console.error('获取用户数据失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// 使用示例
fetchUserData(123).then(result => {
    if (result.success) {
        // 处理成功的情况
        updateUserInterface(result.data);
    } else {
        // 处理错误的情况
        showErrorMessage(result.error);
    }
});`)

const vueCode = ref(`<template>
  <view class="user-card">
    <image :src="user.avatar" class="avatar" />
    <view class="user-info">
      <text class="username">{{ user.name }}</text>
      <text class="user-email">{{ user.email }}</text>
      <view class="user-actions">
        <button @click="editUser" class="edit-btn">编辑</button>
        <button @click="deleteUser" class="delete-btn">删除</button>
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

const emit = defineEmits(['edit', 'delete'])

const editUser = () => {
  emit('edit', props.user)
}

const deleteUser = () => {
  emit('delete', props.user.id)
}
<\/script>`)

const cssCode = ref(`.user-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 20rpx;
  transition: transform 0.3s ease;
}

.user-card:hover {
  transform: translateY(-2rpx);
}

.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 24rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.2);
}

.user-info {
  flex: 1;
  color: #fff;
}

.username {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 8rpx;
}

.user-email {
  font-size: 24rpx;
  opacity: 0.8;
  display: block;
  margin-bottom: 16rpx;
}

.user-actions {
  display: flex;
  gap: 16rpx;
}

.edit-btn, .delete-btn {
  padding: 12rpx 24rpx;
  border: none;
  border-radius: 6rpx;
  font-size: 24rpx;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.delete-btn {
  background-color: rgba(231, 76, 60, 0.8);
  color: #fff;
}`)

const htmlCode = ref(`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>响应式网页布局示例</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <nav class="navigation">
            <div class="logo">
                <img src="logo.svg" alt="网站Logo">
            </div>
            <ul class="nav-menu">
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于我们</a></li>
                <li><a href="#services">服务</a></li>
                <li><a href="#contact">联系我们</a></li>
            </ul>
        </nav>
    </header>
    
    <main class="main-content">
        <section class="hero-section">
            <h1 class="hero-title">欢迎来到我们的网站</h1>
            <p class="hero-description">这是一个现代化的响应式网页设计示例，展示了最佳的用户体验实践。</p>
            <button class="cta-button">开始探索</button>
        </section>
        
        <section class="features-section">
            <div class="container">
                <h2>我们的特色</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>高性能</h3>
                        <p>优化的代码结构确保快速加载和流畅的用户体验。</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>响应式设计</h3>
                        <p>完美适配各种设备屏幕，从手机到桌面电脑。</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">🔒</div>
                        <h3>安全可靠</h3>
                        <p>采用最新的安全标准，保护用户数据和隐私。</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 示例网站. 保留所有权利.</p>
        </div>
    </footer>
    
    <script src="script.js"></script>
</body>
</html>`)

const codeExamples = [
    { code: jsCode, language: 'javascript', title: 'JavaScript 示例' },
    { code: vueCode, language: 'vue', title: 'Vue 组件示例' },
    { code: cssCode, language: 'css', title: 'CSS 样式示例' },
    { code: htmlCode, language: 'html', title: 'HTML 结构示例' }
]

// 方法
const toggleDemo = () => {
    showDemo.value = !showDemo.value
}

const changeLanguage = () => {
    currentLanguage.value = (currentLanguage.value + 1) % codeExamples.length
    const example = codeExamples[currentLanguage.value]
    jsCode.value = example.code.value
}

const changeTheme = () => {
    uni.showToast({
        title: '主题切换功能开发中',
        icon: 'none'
    })
}
</script>

<style lang="scss" scoped>
.code-demo-page {
    padding: 20rpx;
    background-color: #f5f7fa;
    min-height: 100vh;
    
    .demo-header {
        text-align: center;
        padding: 40rpx 20rpx;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12rpx;
        margin-bottom: 40rpx;
        
        .header-title {
            font-size: 48rpx;
            font-weight: bold;
            color: #fff;
        }
    }
    
    .control-panel {
        background-color: #fff;
        border-radius: 12rpx;
        padding: 32rpx;
        margin-top: 40rpx;
        box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
        
        .panel-title {
            font-size: 36rpx;
            font-weight: bold;
            color: #333;
            display: block;
            margin-bottom: 24rpx;
        }
        
        .control-options {
            display: flex;
            gap: 20rpx;
            flex-wrap: wrap;
            
            .control-btn {
                padding: 16rpx 32rpx;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: #fff;
                border: none;
                border-radius: 8rpx;
                font-size: 28rpx;
                transition: transform 0.3s;
                
                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 750rpx) {
    .code-demo-page {
        padding: 10rpx;
        
        .demo-header {
            padding: 30rpx 15rpx;
            margin-bottom: 30rpx;
            
            .header-title {
                font-size: 36rpx;
            }
        }
        
        .control-panel {
            padding: 24rpx;
            
            .control-options {
                flex-direction: column;
                
                .control-btn {
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
}
</style> 