<template>
	<view class="example-container">
		<view class="example-header">
			<text class="title">zx-richtext 组件示例</text>
		</view>
		
		<scroll-view class="example-content" scroll-y>
			<!-- 基础用法 -->
			<view class="example-section">
				<view class="section-title">基础用法</view>
				<view class="example-item">
					<zx-richtext :content="basicContent" />
				</view>
			</view>
			
			<!-- 自定义样式 -->
			<view class="example-section">
				<view class="section-title">自定义样式</view>
				<view class="example-item">
					<zx-richtext 
						:content="styledContent"
						font-size="30rpx"
						color="#2979ff"
						line-height="1.8"
						text-align="center"
						:text-indent="true"
						:custom-style="{ 
							padding: '20rpx', 
							backgroundColor: '#f5f5f5',
							borderRadius: '8rpx'
						}"
					/>
				</view>
			</view>
			
			<!-- 图片处理 -->
			<view class="example-section">
				<view class="section-title">图片处理</view>
				<view class="example-item">
					<zx-richtext 
						:content="imageContent"
						img-max-width="300rpx"
						img-border-radius="8rpx"
						@itemclick="handleImageClick"
					/>
				</view>
			</view>
			
			<!-- 交互事件 -->
			<view class="example-section">
				<view class="section-title">交互事件（点击链接和图片）</view>
				<view class="example-item">
					<zx-richtext 
						:content="interactiveContent"
						@itemclick="handleItemClick"
					/>
				</view>
			</view>
			
			<!-- 复杂内容 -->
			<view class="example-section">
				<view class="section-title">复杂内容</view>
				<view class="example-item">
					<zx-richtext 
						:content="complexContent"
						:selectable="true"
						:preview="true"
						@itemclick="handleComplexClick"
					/>
				</view>
			</view>
			
			<!-- 数组格式（推荐） -->
			<view class="example-section">
				<view class="section-title">数组格式（性能更佳）</view>
				<view class="example-item">
					<zx-richtext :content="nodesContent" />
				</view>
			</view>
			
			<!-- 配置选项 -->
			<view class="example-section">
				<view class="section-title">配置选项</view>
				<view class="config-options">
					<label class="config-item">
						<switch :checked="configSelectable" @change="onSelectableChange" />
						<text>可选择文本</text>
					</label>
					<label class="config-item">
						<switch :checked="configPreview" @change="onPreviewChange" />
						<text>图片预览</text>
					</label>
					<label class="config-item">
						<switch :checked="configHttpToHttps" @change="onHttpToHttpsChange" />
						<text>HTTP转HTTPS</text>
					</label>
				</view>
				<view class="example-item">
					<zx-richtext 
						:content="configContent"
						:selectable="configSelectable"
						:preview="configPreview"
						:http-to-https="configHttpToHttps"
					/>
				</view>
			</view>
		</scroll-view>
		
		<!-- 操作按钮 -->
		<view class="example-actions">
			<button class="action-btn" @click="refreshContent">刷新内容</button>
			<button class="action-btn" @click="showProcessedContent">查看处理后内容</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 基础内容
const basicContent = ref(`
	<div>
		<h2>欢迎使用 zx-richtext 组件</h2>
		<p>这是一个基于 uni-app 官方 <code>rich-text</code> 组件封装的增强型富文本显示组件。</p>
		<p>支持丰富的样式定制和内容处理功能。</p>
	</div>
`)

// 样式化内容
const styledContent = ref(`
	<div>
		<h3>自定义样式示例</h3>
		<p>这段文本使用了自定义的字体大小、颜色、行高和首行缩进。</p>
		<p><strong>粗体文本</strong> 和 <em>斜体文本</em> 的展示效果。</p>
	</div>
`)

// 图片内容
const imageContent = ref(`
	<div>
		<h4>图片处理示例</h4>
		<p>点击下面的图片可以预览：</p>
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" alt="uni-app logo" />
		<p>图片会自动适配容器宽度并添加圆角效果。</p>
	</div>
`)

// 交互内容
const interactiveContent = ref(`
	<div>
		<h4>点击交互</h4>
		<p>点击下面的链接：<a href="https://uniapp.dcloud.net.cn">uni-app 官网</a></p>
		<p>点击图片查看大图：</p>
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/component.png" alt="组件示例" />
	</div>
`)

// 复杂内容
const complexContent = ref(`
	<div>
		<h2>功能完整的富文本示例</h2>
		<div>
			<p>这是一个引用块，展示复杂的HTML结构渲染效果。</p>
		</div>
		
		<h3>列表示例</h3>
		<ul>
			<li>无序列表项 1</li>
			<li>无序列表项 2
				<ul>
					<li>嵌套列表项 2.1</li>
					<li>嵌套列表项 2.2</li>
				</ul>
			</li>
			<li>无序列表项 3</li>
		</ul>
		
		<ol>
			<li>有序列表项 1</li>
			<li>有序列表项 2</li>
			<li>有序列表项 3</li>
		</ol>
		
		<h3>表格示例</h3>
		<table>
			<thead>
				<tr>
					<th>姓名</th>
					<th>年龄</th>
					<th>职业</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>张三</td>
					<td>25</td>
					<td>工程师</td>
				</tr>
				<tr>
					<td>李四</td>
					<td>30</td>
					<td>设计师</td>
				</tr>
			</tbody>
		</table>
		
		<h3>代码示例</h3>
		<p>内联代码：<code>console.log('Hello World')</code></p>
		
		<h3>格式化文本</h3>
		<p>这里有 <strong>粗体</strong>、<em>斜体</em>、<del>删除线</del> 和 <ins>下划线</ins> 文本。</p>
		
		<h3>链接和图片</h3>
		<p>访问 <a href="https://uniapp.dcloud.net.cn/component/rich-text.html">rich-text官方文档</a> 了解更多。</p>
		<img src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" alt="uni-app" />
	</div>
`)

// 数组格式内容（推荐使用，性能更好）
const nodesContent = ref([
	{
		name: 'div',
		children: [
			{
				name: 'h3',
				children: [{ type: 'text', text: '数组格式内容' }]
			},
			{
				name: 'p',
				children: [
					{ type: 'text', text: '这个内容使用了 ' },
					{
						name: 'strong',
						children: [{ type: 'text', text: '数组格式' }]
					},
					{ type: 'text', text: ' 的 nodes，性能更佳。' }
				]
			},
			{
				name: 'p',
				attrs: { style: 'color: #666; font-style: italic;' },
				children: [
					{ type: 'text', text: '推荐在生产环境中使用此格式。' }
				]
			}
		]
	}
])

// 配置选项
const configSelectable = ref(true)
const configPreview = ref(true)
const configHttpToHttps = ref(true)

const configContent = ref(`
	<div>
		<h4>配置测试</h4>
		<p>这段文本可以测试各种配置选项的效果。</p>
		<p>尝试长按文本看是否可以选择，点击图片看是否可以预览。</p>
		<img src="http://qiniu-web-assets.dcloud.net.cn/unidoc/zh/uni-app.png" alt="测试图片" />
		<p>注意：图片链接是 HTTP 协议，观察是否会转换为 HTTPS。</p>
	</div>
`)

// 富文本组件引用
const richTextRefs = ref([])

// 事件处理
const handleImageClick = (e) => {
	console.log('图片点击事件:', e.detail)
	if (e.detail.node?.name === 'img') {
		uni.showToast({
			title: '图片点击',
			icon: 'none'
		})
	}
}

const handleItemClick = (e) => {
	console.log('项目点击事件:', e.detail)
	const { node } = e.detail
	
	if (node.name === 'a' && node.attrs?.href) {
		uni.showModal({
			title: '链接点击',
			content: `将要跳转到：${node.attrs.href}`,
			confirmText: '确定跳转',
			success: (res) => {
				if (res.confirm) {
					// 这里可以实现实际的跳转逻辑
					uni.showToast({
						title: '跳转功能需要自行实现',
						icon: 'none',
						duration: 2000
					})
				}
			}
		})
	} else if (node.name === 'img' && node.attrs?.src) {
		// 图片预览
		uni.previewImage({
			urls: [node.attrs.src],
			current: node.attrs.src
		})
	}
}

const handleComplexClick = (e) => {
	console.log('复杂内容点击:', e.detail)
	handleItemClick(e)
}

// 配置变更事件
const onSelectableChange = (e) => {
	configSelectable.value = e.detail.value
}

const onPreviewChange = (e) => {
	configPreview.value = e.detail.value
}

const onHttpToHttpsChange = (e) => {
	configHttpToHttps.value = e.detail.value
}

// 操作方法
const refreshContent = () => {
	// 刷新所有富文本内容
	basicContent.value += ' <!-- 刷新时间: ' + new Date().toLocaleTimeString() + ' -->'
	uni.showToast({
		title: '内容已刷新',
		icon: 'success'
	})
}

const showProcessedContent = () => {
	// 这里应该获取组件实例并调用方法
	// 由于示例的限制，这里只是显示提示
	uni.showModal({
		title: '处理后的内容',
		content: '请查看控制台输出，实际项目中可以通过组件 ref 获取处理后的内容。',
		showCancel: false
	})
	console.log('基础内容:', basicContent.value)
}

// 页面加载完成
onMounted(() => {
	console.log('zx-richtext 示例页面加载完成')
})
</script>

<style scoped>
.example-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
}

.example-header {
	padding: 20rpx;
	background-color: #fff;
	border-bottom: 1px solid #eee;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
}

.example-content {
	flex: 1;
	padding: 0 20rpx;
}

.example-section {
	margin: 20rpx 0;
	background-color: #fff;
	border-radius: 8rpx;
	overflow: hidden;
}

.section-title {
	padding: 20rpx;
	background-color: #f8f9fa;
	border-bottom: 1px solid #eee;
	font-size: 28rpx;
	font-weight: bold;
	color: #333;
}

.example-item {
	padding: 20rpx;
}

.config-options {
	padding: 20rpx;
	background-color: #f8f9fa;
	border-bottom: 1px solid #eee;
}

.config-item {
	display: flex;
	align-items: center;
	margin-bottom: 16rpx;
}

.config-item:last-child {
	margin-bottom: 0;
}

.config-item switch {
	margin-right: 20rpx;
}

.config-item text {
	font-size: 26rpx;
	color: #666;
}

.example-actions {
	padding: 20rpx;
	background-color: #fff;
	border-top: 1px solid #eee;
	display: flex;
	gap: 20rpx;
}

.action-btn {
	flex: 1;
	height: 80rpx;
	background-color: #007aff;
	color: #fff;
	border: none;
	border-radius: 8rpx;
	font-size: 28rpx;
}

.action-btn:active {
	background-color: #0056b3;
}

/* 富文本内容的额外样式 */
:deep(.rich-text) {
	word-break: break-all;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.example-actions {
		flex-direction: column;
	}
	
	.action-btn {
		width: 100%;
		margin-bottom: 20rpx;
	}
	
	.action-btn:last-child {
		margin-bottom: 0;
	}
}
</style> 