<template>
	<view class="zx-affix-docs">
		<view class="header">
			<text class="title">zx-affix 固钉</text>
			<text class="description">将页面元素固定在特定可视区域</text>
		</view>

		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">基础用法</text>
				<text class="title-desc">固钉默认固定在页面顶部</text>
			</view>
			
			<view class="demo-container">
				<text class="demo-label">通过设置 offset 属性来改变吸顶距离，默认值为 0</text>
				
				<zx-affix :offset="120" @change="handleBasicChange">
					<view class="affix-button basic">
						<text>Offset top 120px</text>
					</view>
				</zx-affix>
			</view>

			<view class="code-example">
				<text class="code-title">示例代码</text>
				<view class="code-block">
					<text class="code-text">{{ basicCode }}</text>
				</view>
			</view>
		</view>

		<!-- 滚动内容 -->
		<view v-for="i in 8" :key="`scroll-${i}`" class="content-item">
			<text>示例内容 {{ i }} - 向下滚动查看固钉效果</text>
		</view>

		<!-- 指定容器 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">指定容器</text>
				<text class="title-desc">通过设置 target 属性，让固钉始终保持在容器内</text>
			</view>
			
			<view class="demo-container">
				<text class="demo-label">超过范围则隐藏，请注意容器避免出现滚动条</text>
				
				<view class="container-demo" id="containerDemo">
					<zx-affix target="#containerDemo" :offset="80" @change="handleContainerChange">
						<view class="affix-button container">
							<text>Target container</text>
						</view>
					</zx-affix>
					
					<view v-for="i in 6" :key="`container-${i}`" class="container-content">
						<text>容器内容 {{ i }}</text>
					</view>
				</view>
			</view>

			<view class="code-example">
				<text class="code-title">示例代码</text>
				<view class="code-block">
					<text class="code-text">{{ containerCode }}</text>
				</view>
			</view>
		</view>

		<!-- 更多内容 -->
		<view v-for="i in 12" :key="`more-${i}`" class="content-item">
			<text>更多内容 {{ i }} - 继续向下滚动</text>
		</view>

		<!-- 固定位置 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">固定位置</text>
				<text class="title-desc">Affix 组件提供 2 个固定的位置参数 top 和 bottom</text>
			</view>
			
			<view class="demo-container">
				<text class="demo-label">通过设置 position 属性来改变固定位置，默认值为 top</text>
				
				<zx-affix position="bottom" :offset="20" @change="handleBottomChange">
					<view class="affix-button bottom">
						<text>Offset bottom 20px</text>
					</view>
				</zx-affix>
			</view>

			<view class="code-example">
				<text class="code-title">示例代码</text>
				<view class="code-block">
					<text class="code-text">{{ bottomCode }}</text>
				</view>
			</view>
		</view>

		<!-- API 文档 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">API</text>
			</view>

			<!-- 属性 -->
			<view class="api-section">
				<text class="api-title">属性</text>
				<view class="api-table">
					<view class="api-row header">
						<text class="api-cell">名称</text>
						<text class="api-cell">说明</text>
						<text class="api-cell">类型</text>
						<text class="api-cell">默认值</text>
					</view>
					<view class="api-row">
						<text class="api-cell">offset</text>
						<text class="api-cell">偏移距离</text>
						<text class="api-cell">number</text>
						<text class="api-cell">0</text>
					</view>
					<view class="api-row">
						<text class="api-cell">position</text>
						<text class="api-cell">固钉位置</text>
						<text class="api-cell">enum</text>
						<text class="api-cell">top</text>
					</view>
					<view class="api-row">
						<text class="api-cell">target</text>
						<text class="api-cell">指定容器（CSS 选择器）</text>
						<text class="api-cell">string</text>
						<text class="api-cell">—</text>
					</view>
					<view class="api-row">
						<text class="api-cell">z-index</text>
						<text class="api-cell">z-index</text>
						<text class="api-cell">number</text>
						<text class="api-cell">100</text>
					</view>
				</view>
			</view>

			<!-- 事件 -->
			<view class="api-section">
				<text class="api-title">事件</text>
				<view class="api-table">
					<view class="api-row header">
						<text class="api-cell">名称</text>
						<text class="api-cell">说明</text>
						<text class="api-cell">类型</text>
					</view>
					<view class="api-row">
						<text class="api-cell">change</text>
						<text class="api-cell">固钉状态改变时触发的事件</text>
						<text class="api-cell">Function</text>
					</view>
					<view class="api-row">
						<text class="api-cell">scroll</text>
						<text class="api-cell">滚动时触发的事件</text>
						<text class="api-cell">Function</text>
					</view>
				</view>
			</view>

			<!-- 插槽 -->
			<view class="api-section">
				<text class="api-title">插槽</text>
				<view class="api-table">
					<view class="api-row header">
						<text class="api-cell">插槽名</text>
						<text class="api-cell">说明</text>
					</view>
					<view class="api-row">
						<text class="api-cell">default</text>
						<text class="api-cell">自定义默认内容</text>
					</view>
				</view>
			</view>

			<!-- 暴露 -->
			<view class="api-section">
				<text class="api-title">暴露</text>
				<view class="api-table">
					<view class="api-row header">
						<text class="api-cell">名称</text>
						<text class="api-cell">说明</text>
						<text class="api-cell">类型</text>
					</view>
					<view class="api-row">
						<text class="api-cell">update</text>
						<text class="api-cell">手动更新固钉状态</text>
						<text class="api-cell">Function</text>
					</view>
					<view class="api-row">
						<text class="api-cell">updateRoot</text>
						<text class="api-cell">手动更新根元素的盒模型信息</text>
						<text class="api-cell">Function</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 额外内容 -->
		<view v-for="i in 15" :key="`extra-${i}`" class="content-item">
			<text>额外内容 {{ i }} - 滚动到底部查看底部固钉效果</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 代码示例
const basicCode = ref(`<template>
  <zx-affix :offset="120">
    <button type="primary">Offset top 120px</button>
  </zx-affix>
</template>`);

const containerCode = ref(`<template>
  <view class="affix-container">
    <zx-affix target=".affix-container" :offset="80">
      <button type="primary">Target container</button>
    </zx-affix>
  </view>
</template>

<style scoped>
.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>`);

const bottomCode = ref(`<template>
  <zx-affix position="bottom" :offset="20">
    <button type="primary">Offset bottom 20px</button>
  </zx-affix>
</template>`);

// 事件处理
const handleBasicChange = (fixed) => {
	console.log('基础固钉状态:', fixed);
	uni.showToast({
		title: `基础固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};

const handleContainerChange = (fixed) => {
	console.log('容器固钉状态:', fixed);
	uni.showToast({
		title: `容器固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};

const handleBottomChange = (fixed) => {
	console.log('底部固钉状态:', fixed);
	uni.showToast({
		title: `底部固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};
</script>

<style scoped>
.zx-affix-docs {
	min-height: 300vh;
	background-color: #f8f9fa;
	padding: 40rpx;
}

.header {
	margin-bottom: 60rpx;
	text-align: center;
}

.header .title {
	font-size: 64rpx;
	font-weight: bold;
	color: #1f2937;
	display: block;
	margin-bottom: 20rpx;
}

.header .description {
	font-size: 32rpx;
	color: #6b7280;
	display: block;
}

.section {
	margin-bottom: 80rpx;
	background: white;
	border-radius: 16rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	margin-bottom: 40rpx;
	border-bottom: 2rpx solid #e5e7eb;
	padding-bottom: 24rpx;
}

.title-text {
	font-size: 44rpx;
	font-weight: 600;
	color: #1f2937;
	display: block;
	margin-bottom: 12rpx;
}

.title-desc {
	font-size: 28rpx;
	color: #6b7280;
	display: block;
}

.demo-container {
	margin-bottom: 40rpx;
}

.demo-label {
	font-size: 28rpx;
	color: #374151;
	display: block;
	margin-bottom: 30rpx;
	line-height: 1.6;
}

.container-demo {
	position: relative;
	height: 600rpx;
	padding: 40rpx;
	background: linear-gradient(135deg, #dbeafe, #bfdbfe);
	border-radius: 12rpx;
	border: 2rpx dashed #3b82f6;
	overflow: hidden;
}

.container-content {
	padding: 24rpx;
	margin-bottom: 16rpx;
	background: rgba(255, 255, 255, 0.9);
	border-radius: 8rpx;
}

.container-content text {
	font-size: 28rpx;
	color: #374151;
}

.affix-button {
	padding: 24rpx 48rpx;
	border-radius: 8rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
}

.affix-button text {
	font-size: 28rpx;
	font-weight: 500;
	color: white;
}

.affix-button.basic {
	background: linear-gradient(135deg, #3b82f6, #60a5fa);
}

.affix-button.container {
	background: linear-gradient(135deg, #10b981, #34d399);
}

.affix-button.bottom {
	background: linear-gradient(135deg, #f59e0b, #fbbf24);
}

.content-item {
	padding: 32rpx;
	margin-bottom: 24rpx;
	background: white;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
}

.content-item text {
	font-size: 28rpx;
	color: #374151;
}

.code-example {
	border-top: 2rpx solid #e5e7eb;
	padding-top: 32rpx;
}

.code-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #374151;
	display: block;
	margin-bottom: 20rpx;
}

.code-block {
	background: #f8fafc;
	border: 2rpx solid #e2e8f0;
	border-radius: 8rpx;
	padding: 32rpx;
}

.code-text {
	font-family: 'Monaco', 'Consolas', monospace;
	font-size: 24rpx;
	color: #475569;
	white-space: pre-wrap;
	line-height: 1.6;
}

/* API 文档样式 */
.api-section {
	margin-bottom: 40rpx;
}

.api-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #1f2937;
	display: block;
	margin-bottom: 24rpx;
}

.api-table {
	border: 2rpx solid #e5e7eb;
	border-radius: 8rpx;
	overflow: hidden;
}

.api-row {
	display: flex;
	border-bottom: 2rpx solid #e5e7eb;
}

.api-row:last-child {
	border-bottom: none;
}

.api-row.header {
	background-color: #f9fafb;
}

.api-cell {
	flex: 1;
	padding: 24rpx;
	font-size: 26rpx;
	border-right: 2rpx solid #e5e7eb;
	min-height: 80rpx;
	display: flex;
	align-items: center;
}

.api-cell:last-child {
	border-right: none;
}

.api-row.header .api-cell {
	font-weight: 600;
	color: #374151;
}

.api-row:not(.header) .api-cell {
	color: #6b7280;
}
</style> 