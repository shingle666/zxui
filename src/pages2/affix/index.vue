<template>
	<view class="zx-affix-docs">
		<zx-navbar title="zx-affix 固钉" subtitle="将页面元素固定在特定可视区域" border />
		<!-- #ifdef MP-WEIXIN -->
		<view class="mp-tip">
			<text class="mp-tip-text">🔧 微信小程序优化版本</text>
		</view>
		<!-- #endif -->

		<!-- 状态信息 -->
		<view class="status-panel">
			<view class="status-item">
				<text class="status-label">基础固钉:</text>
				<text :class="['status-value', basicFixed ? 'active' : '']">{{ basicFixed ? '已固定' : '未固定' }}</text>
			</view>
			<view class="status-item">
				<text class="status-label">容器固钉:</text>
				<text :class="['status-value', containerFixed ? 'active' : '']">{{ containerFixed ? '已固定' : '未固定'
					}}</text>
			</view>
			<view class="status-item">
				<text class="status-label">底部固钉:</text>
				<text :class="['status-value', bottomFixed ? 'active' : '']">{{ bottomFixed ? '已固定' : '未固定' }}</text>
			</view>
			<view class="status-item">
				<text class="status-label">滚动位置:</text>
				<text class="status-value">{{ scrollTop }}px</text>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="status-item">
				<text class="status-label">环境:</text>
				<text class="status-value mp-env">微信小程序</text>
			</view>
			<!-- #endif -->
		</view>

		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">基础用法</text>
				<text class="title-desc">固钉默认固定在页面顶部</text>
			</view>

			<view class="demo-container">
				<text class="demo-label">通过设置 offset 属性来改变吸顶距离，默认值为 0</text>

				<!-- 动态调整 offset -->
				<view class="controls">
					<text class="control-label">Offset: {{ basicOffset }}px</text>
					<slider :value="basicOffset" min="0" max="200" step="10" @change="handleOffsetChange"
						class="offset-slider" activeColor="#3b82f6" />
				</view>

				<zx-affix :offset="basicOffset" @change="handleBasicChange" @scroll="handleBasicScroll">
					<view class="affix-button basic">
						<text>Offset top {{ basicOffset }}px</text>
						<text class="status-text">{{ basicFixed ? '固定中' : '跟随滚动' }}</text>
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

		<!-- Z-Index 设置 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">层级控制</text>
				<text class="title-desc">通过 z-index 属性控制固钉的层级</text>
			</view>

			<view class="demo-container">
				<text class="demo-label">设置不同的 z-index 值</text>

				<view class="controls">
					<text class="control-label">Z-Index: {{ zIndexValue }}</text>
					<slider :value="zIndexValue" min="1" max="1000" step="10" @change="handleZIndexChange"
						class="zindex-slider" activeColor="#10b981" />
				</view>

				<zx-affix :offset="60" :z-index="zIndexValue" @change="handleZIndexAffixChange">
					<view class="affix-button zindex">
						<text>Z-Index: {{ zIndexValue }}</text>
						<text class="status-text">层级演示</text>
					</view>
				</zx-affix>
			</view>

			<view class="code-example">
				<text class="code-title">示例代码</text>
				<view class="code-block">
					<text class="code-text">{{ zIndexCode }}</text>
				</view>
			</view>
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
							<text class="status-text">{{ containerFixed ? '容器内固定' : '正常状态' }}</text>
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

				<!-- 位置切换 -->
				<view class="controls">
					<text class="control-label">Position:</text>
					<view class="position-switch">
						<view :class="['switch-item', bottomPosition === 'top' ? 'active' : '']"
							@click="handlePositionChange('top')">
							<text>Top</text>
						</view>
						<view :class="['switch-item', bottomPosition === 'bottom' ? 'active' : '']"
							@click="handlePositionChange('bottom')">
							<text>Bottom</text>
						</view>
					</view>
				</view>

				<view class="controls">
					<text class="control-label">Offset: {{ bottomOffset }}px</text>
					<slider :value="bottomOffset" min="0" max="100" step="5" @change="handleBottomOffsetChange"
						class="offset-slider" activeColor="#f59e0b" />
				</view>

				<zx-affix :position="bottomPosition" :offset="bottomOffset" @change="handleBottomChange">
					<view class="affix-button bottom">
						<text>{{ bottomPosition === 'top' ? 'Top' : 'Bottom' }} {{ bottomOffset }}px</text>
						<text class="status-text">{{ bottomFixed ? '固定中' : '跟随滚动' }}</text>
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

		<!-- 方法调用演示 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">方法调用</text>
				<text class="title-desc">手动调用组件方法</text>
			</view>

			<view class="demo-container">
				<text class="demo-label">点击按钮手动更新固钉状态</text>

				<view class="method-buttons">
					<button class="method-btn" @click="handleUpdate" type="primary" size="mini">
						Update 更新状态
					</button>
					<button class="method-btn" @click="handleUpdateRoot" type="default" size="mini">
						UpdateRoot 更新盒模型
					</button>
				</view>

				<zx-affix ref="methodAffixRef" :offset="100" @change="handleMethodChange">
					<view class="affix-button method">
						<text>Method Demo</text>
						<text class="status-text">{{ methodFixed ? '已固定' : '未固定' }}</text>
					</view>
				</zx-affix>
			</view>

			<view class="code-example">
				<text class="code-title">示例代码</text>
				<view class="code-block">
					<text class="code-text">{{ methodCode }}</text>
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
						<text class="api-cell">固钉位置，可选值为 top、bottom</text>
						<text class="api-cell">string</text>
						<text class="api-cell">top</text>
					</view>
					<view class="api-row">
						<text class="api-cell">target</text>
						<text class="api-cell">指定容器（CSS 选择器）</text>
						<text class="api-cell">string</text>
						<text class="api-cell">—</text>
					</view>
					<view class="api-row">
						<text class="api-cell">zIndex</text>
						<text class="api-cell">固定时的 z-index</text>
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
						<text class="api-cell">回调参数</text>
					</view>
					<view class="api-row">
						<text class="api-cell">change</text>
						<text class="api-cell">固钉状态改变时触发</text>
						<text class="api-cell">fixed: boolean</text>
					</view>
					<view class="api-row">
						<text class="api-cell">scroll</text>
						<text class="api-cell">滚动时触发</text>
						<text class="api-cell">{ scrollTop, fixed, rect }</text>
					</view>
				</view>
			</view>

			<!-- 方法 -->
			<view class="api-section">
				<text class="api-title">方法</text>
				<view class="api-table">
					<view class="api-row header">
						<text class="api-cell">方法名</text>
						<text class="api-cell">说明</text>
						<text class="api-cell">参数</text>
					</view>
					<view class="api-row">
						<text class="api-cell">update</text>
						<text class="api-cell">手动更新固钉状态</text>
						<text class="api-cell">—</text>
					</view>
					<view class="api-row">
						<text class="api-cell">updateRoot</text>
						<text class="api-cell">手动更新根元素的盒模型信息</text>
						<text class="api-cell">—</text>
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
		</view>

		<!-- 额外内容 -->
		<view v-for="i in 15" :key="`extra-${i}`" class="content-item">
			<text>额外内容 {{ i }} - 滚动到底部查看底部固钉效果</text>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { onShow, onPageScroll } from '@dcloudio/uni-app';
import zxAffix from '@tanzhenxing/zx-affix/zx-affix.vue';
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue';


// 响应式状态
const basicFixed = ref(false);
const containerFixed = ref(false);
const bottomFixed = ref(false);
const methodFixed = ref(false);
const scrollTop = ref(0);

// 控制参数
const basicOffset = ref(120);
const zIndexValue = ref(100);
const bottomPosition = ref('bottom');
const bottomOffset = ref(20);

// 组件引用
const methodAffixRef = ref(null);

// #ifdef MP-WEIXIN
// 微信小程序页面显示时刷新固钉状态
onShow(() => {
	console.log('微信小程序页面显示，刷新固钉状态');
	setTimeout(() => {
		if (methodAffixRef.value) {
			methodAffixRef.value.update();
		}
	}, 100);
});

// 微信小程序页面滚动监听
onPageScroll((e) => {
	scrollTop.value = Math.round(e.scrollTop);
	console.log('微信小程序页面滚动:', e.scrollTop);
});
// #endif

// 代码示例
const basicCode = ref(`&lt;template>  <zx-affix :offset="120" @change="handleChange">    <button type="primary">Offset top 120px</button>  </zx-affix>&lt;/template>&lt;script setup>const handleChange = (fixed) => {  console.log('固钉状态:', fixed);};&lt;/script>`);

const containerCode = ref(`&lt;template>  <view class="affix-container" id="container">    <zx-affix target="#container" :offset="80">      <button type="primary">Target container</button>    </zx-affix>  </view>&lt;/template>&lt;style scoped>.affix-container {  height: 400px;  background: #f5f5f5;  border-radius: 4px;  overflow: hidden;}&lt;/style>`);

const bottomCode = ref(`&lt;template>  <zx-affix position="bottom" :offset="20">    <button type="primary">Offset bottom 20px</button>  </zx-affix>&lt;/template>`);

const zIndexCode = ref(`&lt;template>  <zx-affix :offset="60" :z-index="1000">    <button type="primary">High Z-Index</button>  </zx-affix>&lt;/template>`);

const methodCode = ref(`&lt;template>  <zx-affix ref="affixRef" :offset="100">    <button type="primary">Method Demo</button>  </zx-affix>  <button @click="handleUpdate">Update</button>&lt;/template>&lt;script setup>import { ref } from 'vue';const affixRef = ref(null);const handleUpdate = () => {  affixRef.value?.update();};&lt;/script>`);

// 事件处理
const handleBasicChange = (fixed) => {
	basicFixed.value = fixed;
	console.log('基础固钉状态:', fixed);

	// #ifdef MP-WEIXIN
	console.log('微信小程序环境 - 基础固钉状态:', fixed);
	// #endif

	uni.showToast({
		title: `基础固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};

const handleBasicScroll = (info) => {
	scrollTop.value = Math.round(info.scrollTop);

	// #ifdef MP-WEIXIN
	// 微信小程序滚动调试
	console.log('微信小程序滚动事件:', info);
	// #endif
};

const handleContainerChange = (fixed) => {
	containerFixed.value = fixed;
	console.log('容器固钉状态:', fixed);

	// #ifdef MP-WEIXIN
	console.log('微信小程序环境 - 容器固钉状态:', fixed);
	// #endif

	uni.showToast({
		title: `容器固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};

const handleBottomChange = (fixed) => {
	bottomFixed.value = fixed;
	console.log('底部固钉状态:', fixed);

	// #ifdef MP-WEIXIN
	console.log('微信小程序环境 - 底部固钉状态:', fixed);
	// #endif

	uni.showToast({
		title: `${bottomPosition.value === 'top' ? '顶部' : '底部'}固钉${fixed ? '已固定' : '已取消固定'}`,
		icon: 'none',
		duration: 1500
	});
};

const handleZIndexAffixChange = (fixed) => {
	console.log('Z-Index固钉状态:', fixed);
};

const handleMethodChange = (fixed) => {
	methodFixed.value = fixed;
	console.log('方法演示固钉状态:', fixed);
};

// 控制事件
const handleOffsetChange = (e) => {
	basicOffset.value = e.detail.value;
};

const handleZIndexChange = (e) => {
	zIndexValue.value = e.detail.value;
};

const handleBottomOffsetChange = (e) => {
	bottomOffset.value = e.detail.value;
};

const handlePositionChange = (position) => {
	bottomPosition.value = position;
};

// 方法调用
const handleUpdate = () => {
	if (methodAffixRef.value) {
		methodAffixRef.value.update();
		uni.showToast({
			title: '已调用 update 方法',
			icon: 'none',
			duration: 1500
		});
	}
};

const handleUpdateRoot = () => {
	if (methodAffixRef.value) {
		methodAffixRef.value.updateRoot();
		uni.showToast({
			title: '已调用 updateRoot 方法',
			icon: 'none',
			duration: 1500
		});
	}
};
</script>

<style lang="scss" scoped>
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

/* 状态面板 */
.status-panel {
	background: white;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-bottom: 40rpx;
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.05);
	display: flex;
	flex-wrap: wrap;
	gap: 24rpx;
}

/* 微信小程序提示 */
/* #ifdef MP-WEIXIN */
.mp-tip {
	margin-top: 16rpx;
	padding: 16rpx 24rpx;
	background: linear-gradient(135deg, #07c160, #38d9a9);
	border-radius: 8rpx;
	display: inline-block;
}

.mp-tip-text {
	color: white;
	font-size: 24rpx;
	font-weight: 500;
}

.status-value.mp-env {
	color: #07c160;
	font-weight: 700;
}

/* #endif */

.status-item {
	flex: 1;
	min-width: 160rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 16rpx;
	background: #f8fafc;
	border-radius: 8rpx;
}

.status-label {
	font-size: 24rpx;
	color: #6b7280;
	margin-bottom: 8rpx;
}

.status-value {
	font-size: 28rpx;
	font-weight: 600;
	color: #374151;
	transition: all 0.3s ease;
}

.status-value.active {
	color: #3b82f6;
	text-shadow: 0 0 8rpx rgba(59, 130, 246, 0.3);
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

/* 控制面板 */
.controls {
	margin-bottom: 30rpx;
	padding: 24rpx;
	background: #f8fafc;
	border-radius: 8rpx;
	border: 1rpx solid #e2e8f0;
}

.control-label {
	font-size: 28rpx;
	color: #374151;
	font-weight: 500;
	margin-bottom: 16rpx;
	display: block;
}

.offset-slider,
.zindex-slider {
	width: 100%;
}

/* 位置切换器 */
.position-switch {
	display: flex;
	gap: 12rpx;
	margin-top: 16rpx;
}

.switch-item {
	flex: 1;
	padding: 16rpx 24rpx;
	background: white;
	border: 2rpx solid #e2e8f0;
	border-radius: 6rpx;
	text-align: center;
	cursor: pointer;
	transition: all 0.3s ease;
}

.switch-item.active {
	background: #3b82f6;
	border-color: #3b82f6;
	color: white;
}

.switch-item text {
	font-size: 26rpx;
	font-weight: 500;
}

.switch-item.active text {
	color: white;
}

/* 方法按钮 */
.method-buttons {
	display: flex;
	gap: 16rpx;
	margin-bottom: 30rpx;
	flex-wrap: wrap;
}

.method-btn {
	flex: 1;
	min-width: 200rpx;
	height: 70rpx;
	font-size: 26rpx !important;
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
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
	min-height: 120rpx;
	gap: 8rpx;
}

.affix-button text {
	font-size: 28rpx;
	font-weight: 500;
	color: white;
	text-align: center;
}

.affix-button .status-text {
	font-size: 22rpx;
	opacity: 0.9;
	font-weight: 400;
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

.affix-button.zindex {
	background: linear-gradient(135deg, #8b5cf6, #a78bfa);
}

.affix-button.method {
	background: linear-gradient(135deg, #ef4444, #f87171);
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

/* 响应式设计 */
@media (max-width: 600rpx) {
	.status-panel {
		flex-direction: column;
	}

	.status-item {
		min-width: 100%;
	}

	.method-buttons {
		flex-direction: column;
	}

	.position-switch {
		flex-direction: column;
	}
}

/* 动画效果 */
.affix-button {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.affix-button:hover {
	transform: translateY(-2rpx);
	box-shadow: 0 8rpx 12rpx rgba(0, 0, 0, 0.15);
}

/* 滑块样式 */
.offset-slider,
.zindex-slider {
	margin-top: 16rpx;
}

/* 加载状态 */
.status-value {
	position: relative;
}

.status-value.active::after {
	content: '';
	position: absolute;
	top: 50%;
	right: -20rpx;
	width: 12rpx;
	height: 12rpx;
	background: #3b82f6;
	border-radius: 50%;
	transform: translateY(-50%);
	animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

	0%,
	100% {
		opacity: 1;
		transform: translateY(-50%) scale(1);
	}

	50% {
		opacity: 0.5;
		transform: translateY(-50%) scale(1.2);
	}
}
</style>