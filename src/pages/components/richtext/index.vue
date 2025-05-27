<template>
	<view class="page-container">
		<!-- 页面头部 -->
		<view class="page-header">
			<text class="page-title">zx-richtext 富文本组件</text>
			<text class="page-desc">基于 uni-app 原生 rich-text 组件封装</text>
		</view>
		
		<scroll-view class="page-content" scroll-y>
			<!-- 基础使用 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">基础使用</text>
					<text class="section-desc">最简单的富文本显示</text>
				</view>
				<view class="demo-content">
					<zx-richtext :content="basicContent" />
				</view>
				<view class="code-example">
					<text class="code-title">示例代码：</text>
					<text class="code-text">
&lt;zx-richtext :content="htmlContent" /&gt;
					</text>
				</view>
			</view>
			
			<!-- 样式定制 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">样式定制</text>
					<text class="section-desc">自定义字体、颜色、对齐等样式</text>
				</view>
				<view class="demo-content">
					<zx-richtext 
						:content="styledContent"
						font-size="32rpx"
						color="#2979ff"
						line-height="1.8"
						text-align="center"
						:text-indent="true"
						:custom-style="{ 
							padding: '30rpx', 
							backgroundColor: '#f8f9ff',
							borderRadius: '12rpx',
							border: '2rpx solid #e3f2fd'
						}"
					/>
				</view>
				<view class="code-example">
					<text class="code-title">示例代码：</text>
					<text class="code-text">
&lt;zx-richtext 
  :content="content"
  font-size="32rpx"
  color="#2979ff"
  line-height="1.8"
  text-align="center"
  :text-indent="true"
  :custom-style="styleObject"
/&gt;
					</text>
				</view>
			</view>
			
			<!-- 图片处理 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">图片处理</text>
					<text class="section-desc">自动调整图片尺寸和样式</text>
				</view>
				<view class="demo-content">
					<zx-richtext 
						:content="imageContent"
						img-max-width="280rpx"
						img-border-radius="16rpx"
						@itemclick="handleImageClick"
					/>
				</view>
				<view class="code-example">
					<text class="code-title">示例代码：</text>
					<text class="code-text">
&lt;zx-richtext 
  :content="imageContent"
  img-max-width="280rpx"
  img-border-radius="16rpx"
  @itemclick="handleImageClick"
/&gt;
					</text>
				</view>
			</view>
			
			<!-- 交互事件 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">交互事件</text>
					<text class="section-desc">处理链接和图片点击事件</text>
				</view>
				<view class="demo-content">
					<zx-richtext 
						:content="interactiveContent"
						@itemclick="handleItemClick"
					/>
				</view>
				<view class="code-example">
					<text class="code-title">事件处理：</text>
					<text class="code-text">
const handleItemClick = (e) => {
  const { node } = e.detail
  if (node.name === 'a') {
    // 处理链接点击
  } else if (node.name === 'img') {
    // 处理图片点击
  }
}
					</text>
				</view>
			</view>
			
			<!-- 配置选项 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">配置选项</text>
					<text class="section-desc">动态调整组件行为</text>
				</view>
				
				<!-- 配置开关 -->
				<view class="config-panel">
					<view class="config-row">
						<text class="config-label">文本可选择</text>
						<switch :checked="selectable" @change="onSelectableChange" color="#2979ff" />
					</view>
					<view class="config-row">
						<text class="config-label">图片预览</text>
						<switch :checked="preview" @change="onPreviewChange" color="#2979ff" />
					</view>
					<view class="config-row">
						<text class="config-label">HTTP转HTTPS</text>
						<switch :checked="httpToHttps" @change="onHttpToHttpsChange" color="#2979ff" />
					</view>
					<view class="config-row">
						<text class="config-label">移除脚本</text>
						<switch :checked="removeScript" @change="onRemoveScriptChange" color="#2979ff" />
					</view>
				</view>
				
				<view class="demo-content">
					<zx-richtext 
						:content="configContent"
						:selectable="selectable"
						:preview="preview"
						:http-to-https="httpToHttps"
						:remove-script="removeScript"
					/>
				</view>
			</view>
			
			<!-- 复杂内容 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">复杂内容</text>
					<text class="section-desc">支持各种HTML标签和结构</text>
				</view>
				<view class="demo-content">
					<zx-richtext 
						:content="complexContent"
						:selectable="true"
						@itemclick="handleComplexClick"
					/>
				</view>
			</view>
			
			<!-- 数组格式 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">数组格式（推荐）</text>
					<text class="section-desc">使用nodes数组格式获得更好性能</text>
				</view>
				<view class="demo-content">
					<zx-richtext :content="nodesContent" />
				</view>
				<view class="code-example">
					<text class="code-title">数组格式示例：</text>
					<text class="code-text">
const nodes = [{
  name: 'div',
  children: [
    { name: 'h3', children: [{ type: 'text', text: '标题' }] },
    { name: 'p', children: [{ type: 'text', text: '内容' }] }
  ]
}]
					</text>
				</view>
			</view>
			
			<!-- 属性说明 -->
			<view class="demo-section">
				<view class="section-header">
					<text class="section-title">主要属性</text>
					<text class="section-desc">组件支持的主要配置属性</text>
				</view>
				<view class="props-table">
					<view class="props-row props-header">
						<text class="props-cell">属性名</text>
						<text class="props-cell">类型</text>
						<text class="props-cell">说明</text>
					</view>
					<view class="props-row" v-for="prop in mainProps" :key="prop.name">
						<text class="props-cell">{{ prop.name }}</text>
						<text class="props-cell">{{ prop.type }}</text>
						<text class="props-cell">{{ prop.desc }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<!-- 底部操作栏 -->
		<view class="page-footer">
			<button class="footer-btn primary" @click="showDocumentation">查看完整文档</button>
			<button class="footer-btn" @click="refreshDemo">刷新演示</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

// 基础内容
const basicContent = ref(`
	<div>
		<h2 style="color: #333; margin-bottom: 16px;">欢迎使用 zx-richtext</h2>
		<p>这是一个基于 uni-app 官方 <strong>rich-text</strong> 组件封装的增强型富文本组件。</p>
		<p>支持丰富的样式定制和内容处理功能，完全兼容各个平台。</p>
	</div>
`)

// 样式内容
const styledContent = ref(`
	<div>
		<h3>自定义样式演示</h3>
		<p>这段文本展示了自定义字体大小、颜色、行高和首行缩进的效果。</p>
		<p>支持 <strong>粗体</strong>、<em>斜体</em> 等基础格式。</p>
	</div>
`)

// 图片内容
const imageContent = ref(`
	<div>
		<h4>图片自适应</h4>
		<p>点击图片可以预览：</p>
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" alt="uni-app logo" />
		<p>图片会自动调整尺寸并应用圆角样式。</p>
	</div>
`)

// 交互内容
const interactiveContent = ref(`
	<div>
		<h4>点击交互测试</h4>
		<p>点击链接：<a href="https://uniapp.dcloud.net.cn" style="color: #2979ff;">uni-app 官方网站</a></p>
		<p>点击图片预览：</p>
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/component.png" alt="组件示例" style="max-width: 200px;" />
	</div>
`)

// 配置内容
const configContent = ref(`
	<div>
		<h4>配置测试内容</h4>
		<p>长按文本测试选择功能，点击图片测试预览功能。</p>
		<img src="http://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" alt="HTTP图片测试" />
		<p>注意观察HTTP链接是否转换为HTTPS。</p>
		<script>alert('这是测试脚本')</script>
	</div>
`)

// 复杂内容
const complexContent = ref(`
	<div>
		<h2>富文本完整功能演示</h2>
		
		<blockquote style="border-left: 4px solid #ddd; padding-left: 16px; color: #666; font-style: italic; margin: 16px 0;">
			这是一个引用块，展示复杂HTML结构的渲染效果。
		</blockquote>
		
		<h3>列表功能</h3>
		<ul>
			<li>无序列表项目 1</li>
			<li>无序列表项目 2</li>
			<li>无序列表项目 3</li>
		</ul>
		
		<ol>
			<li>有序列表项目 1</li>
			<li>有序列表项目 2</li>
			<li>有序列表项目 3</li>
		</ol>
		
		<h3>表格展示</h3>
		<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
			<tr>
				<th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5;">姓名</th>
				<th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5;">职位</th>
			</tr>
			<tr>
				<td style="border: 1px solid #ddd; padding: 8px;">张三</td>
				<td style="border: 1px solid #ddd; padding: 8px;">前端工程师</td>
			</tr>
			<tr>
				<td style="border: 1px solid #ddd; padding: 8px;">李四</td>
				<td style="border: 1px solid #ddd; padding: 8px;">UI设计师</td>
			</tr>
		</table>
		
		<h3>格式化文本</h3>
		<p>支持 <strong>粗体</strong>、<em>斜体</em>、<del>删除线</del>、<ins>下划线</ins> 等格式。</p>
		<p>内联代码：<code style="background: #f5f5f5; padding: 2px 4px; border-radius: 4px;">console.log('Hello')</code></p>
		
		<p>更多信息请访问：<a href="https://uniapp.dcloud.net.cn/component/rich-text.html" style="color: #2979ff;">rich-text官方文档</a></p>
	</div>
`)

// 数组格式内容
const nodesContent = ref([
	{
		name: 'div',
		children: [
			{
				name: 'h3',
				attrs: { style: 'color: #2979ff; margin-bottom: 12px;' },
				children: [{ type: 'text', text: '数组格式演示' }]
			},
			{
				name: 'p',
				children: [
					{ type: 'text', text: '这个内容使用了 ' },
					{
						name: 'strong',
						attrs: { style: 'color: #ff6b35;' },
						children: [{ type: 'text', text: 'nodes数组格式' }]
					},
					{ type: 'text', text: '，具有更好的性能表现。' }
				]
			},
			{
				name: 'p',
				attrs: { style: 'color: #666; font-style: italic; margin-top: 12px;' },
				children: [
					{ type: 'text', text: '推荐在生产环境中使用数组格式以获得最佳性能。' }
				]
			}
		]
	}
])

// 配置状态
const selectable = ref(true)
const preview = ref(true)
const httpToHttps = ref(true)
const removeScript = ref(true)

// 属性说明数据
const mainProps = ref([
	{ name: 'content', type: 'String|Array', desc: '富文本内容' },
	{ name: 'selectable', type: 'Boolean', desc: '是否可选择文本' },
	{ name: 'preview', type: 'Boolean', desc: '是否支持图片预览' },
	{ name: 'fontSize', type: 'String', desc: '字体大小' },
	{ name: 'color', type: 'String', desc: '文字颜色' },
	{ name: 'textAlign', type: 'String', desc: '文本对齐方式' },
	{ name: 'imgMaxWidth', type: 'String', desc: '图片最大宽度' },
	{ name: 'customStyle', type: 'Object', desc: '自定义容器样式' }
])

// 事件处理
const handleImageClick = (e) => {
	if (e.detail.node?.name === 'img') {
		uni.showToast({
			title: '图片点击事件触发',
			icon: 'none',
			duration: 2000
		})
	}
}

const handleItemClick = (e) => {
	const { node } = e.detail
	
	if (node.name === 'a' && node.attrs?.href) {
		uni.showModal({
			title: '链接点击',
			content: `即将跳转到：${node.attrs.href}`,
			confirmText: '确定',
			cancelText: '取消',
			success: (res) => {
				if (res.confirm) {
					uni.showToast({
						title: '实际项目中在此处理跳转',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	} else if (node.name === 'img' && node.attrs?.src) {
		uni.previewImage({
			urls: [node.attrs.src],
			current: node.attrs.src
		})
	}
}

const handleComplexClick = (e) => {
	handleItemClick(e)
}

// 配置变更
const onSelectableChange = (e) => {
	selectable.value = e.detail.value
}

const onPreviewChange = (e) => {
	preview.value = e.detail.value
}

const onHttpToHttpsChange = (e) => {
	httpToHttps.value = e.detail.value
}

const onRemoveScriptChange = (e) => {
	removeScript.value = e.detail.value
}

// 操作方法
const showDocumentation = () => {
	uni.showModal({
		title: '完整文档',
		content: '请查看组件目录下的 README.md 文件获取完整的使用文档和API说明。',
		showCancel: false
	})
}

const refreshDemo = () => {
	const timestamp = new Date().getTime()
	basicContent.value += `<!-- 刷新时间: ${timestamp} -->`
	
	uni.showToast({
		title: '演示已刷新',
		icon: 'success',
		duration: 1500
	})
}

// 页面标题
uni.setNavigationBarTitle({
	title: 'zx-richtext 使用说明'
})
</script>

<style scoped>
.page-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
}

.page-header {
	padding: 40rpx 30rpx 30rpx;
	text-align: center;
	background: #fff;
	border-bottom: 1rpx solid #eee;
}

.page-title {
	display: block;
	font-size: 40rpx;
	font-weight: bold;
	color: #2979ff;
	margin-bottom: 12rpx;
}

.page-desc {
	display: block;
	font-size: 26rpx;
	color: #666;
}

.page-content {
	flex: 1;
	padding: 0 30rpx;
}

.demo-section {
	margin: 40rpx 0;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
}

.section-header {
	padding: 30rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: #fff;
}

.section-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.section-desc {
	display: block;
	font-size: 24rpx;
	opacity: 0.9;
}

.demo-content {
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.code-example {
	padding: 24rpx 30rpx;
	background: #f8f9fa;
}

.code-title {
	display: block;
	font-size: 24rpx;
	color: #666;
	margin-bottom: 12rpx;
}

.code-text {
	display: block;
	font-size: 22rpx;
	font-family: 'Courier New', monospace;
	color: #333;
	background: #fff;
	padding: 16rpx;
	border-radius: 8rpx;
	border: 1rpx solid #e0e0e0;
	white-space: pre-wrap;
	word-break: break-all;
}

.config-panel {
	padding: 30rpx;
	background: #f8f9fa;
	border-bottom: 1rpx solid #e0e0e0;
}

.config-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 24rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
}

.config-row:last-child {
	margin-bottom: 0;
}

.config-label {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.props-table {
	padding: 30rpx;
}

.props-row {
	display: flex;
	border-bottom: 1rpx solid #e0e0e0;
}

.props-header {
	background: #f8f9fa;
	font-weight: bold;
}

.props-cell {
	flex: 1;
	padding: 20rpx 16rpx;
	font-size: 24rpx;
	color: #333;
	word-break: break-all;
}

.props-header .props-cell {
	color: #666;
	font-weight: bold;
}

.page-footer {
	padding: 30rpx;
	background: #fff;
	border-top: 1rpx solid #eee;
	display: flex;
	gap: 20rpx;
}

.footer-btn {
	flex: 1;
	height: 88rpx;
	border-radius: 44rpx;
	font-size: 28rpx;
	border: 2rpx solid #2979ff;
	background: #fff;
	color: #2979ff;
}

.footer-btn.primary {
	background: #2979ff;
	color: #fff;
}

.footer-btn:active {
	opacity: 0.8;
}

/* 富文本内容优化 */
:deep(rich-text) {
	line-height: 1.6;
}

/* 响应式适配 */
@media (max-width: 750rpx) {
	.page-header {
		padding: 30rpx 20rpx 20rpx;
	}
	
	.page-content {
		padding: 0 20rpx;
	}
	
	.demo-section {
		margin: 30rpx 0;
	}
	
	.section-header,
	.demo-content,
	.code-example,
	.config-panel,
	.props-table {
		padding: 20rpx;
	}
	
	.page-footer {
		flex-direction: column;
		padding: 20rpx;
	}
	
	.footer-btn {
		width: 100%;
		margin-bottom: 20rpx;
	}
	
	.footer-btn:last-child {
		margin-bottom: 0;
	}
}
</style>
