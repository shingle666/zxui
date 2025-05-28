<template>
	<view class="example-container">
		<view class="header">
			<view class="title">zx-textarea 组件示例</view>
			<view class="subtitle">基于 uni-app 官方 textarea 组件封装的增强型文本域组件</view>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">基础用法</text>
				<text class="title-desc">支持 v-model 双向数据绑定</text>
			</view>
			<zx-textarea 
				v-model="basicValue" 
				placeholder="请输入内容"
				@input="onBasicInput"
				@change="onBasicChange"
			/>
			<view class="result-box">
				<text class="result-label">输入值：</text>
				<text class="result-value">{{ basicValue || '暂无输入' }}</text>
			</view>
		</view>
		
		<!-- 带字数统计 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">字数统计</text>
				<text class="title-desc">显示当前字数和最大限制</text>
			</view>
			<zx-textarea 
				v-model="countValue" 
				placeholder="最多输入100个字符"
				:count="true"
				:maxlength="100"
			/>
		</view>
		
		<!-- 清除按钮 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">清除按钮</text>
				<text class="title-desc">支持一键清空输入内容</text>
			</view>
			<zx-textarea 
				v-model="clearableValue" 
				placeholder="带清除按钮的输入框"
				:clearable="true"
				@clear="onClear"
			/>
		</view>
		
		<!-- 自适应高度 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">自适应高度</text>
				<text class="title-desc">输入区域高度自适应，不会出现滚动条</text>
			</view>
			<zx-textarea 
				v-model="autoHeightValue" 
				placeholder="输入区域高度自适应，试试输入多行内容"
				:auto-height="true"
			/>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">禁用状态</text>
				<text class="title-desc">不可编辑的禁用状态</text>
			</view>
			<zx-textarea 
				v-model="disabledValue" 
				placeholder="禁用状态"
				:disabled="true"
			/>
		</view>
		
		<!-- 不同边框样式 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">边框样式</text>
				<text class="title-desc">支持四周边框、底部边框、无边框三种样式</text>
			</view>
			<view class="border-examples">
				<view class="border-item">
					<text class="border-label">四周边框 (surround)</text>
					<zx-textarea 
						v-model="borderValue1" 
						placeholder="四周边框样式"
						border="surround"
					/>
				</view>
				<view class="border-item">
					<text class="border-label">底部边框 (bottom)</text>
					<zx-textarea 
						v-model="borderValue2" 
						placeholder="底部边框样式"
						border="bottom"
					/>
				</view>
				<view class="border-item">
					<text class="border-label">无边框 (none)</text>
					<zx-textarea 
						v-model="borderValue3" 
						placeholder="无边框样式"
						border="none"
						background-color="#f8f9fa"
					/>
				</view>
			</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">自定义样式</text>
				<text class="title-desc">支持自定义字体大小、颜色、背景色等样式</text>
			</view>
			<zx-textarea 
				v-model="customValue" 
				placeholder="自定义样式的输入框"
				:count="true"
				:maxlength="200"
				font-size="16px"
				color="#333"
				background-color="#f8f9fa"
				border-color="#007bff"
				border-radius="8px"
				padding="12px"
			/>
		</view>
		
		<!-- 不同输入模式 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">输入模式</text>
				<text class="title-desc">支持不同的虚拟键盘输入模式</text>
			</view>
			<view class="input-mode-examples">
				<view class="mode-item">
					<text class="mode-label">数字输入 (numeric)</text>
					<zx-textarea 
						v-model="numericValue" 
						placeholder="数字输入模式"
						inputmode="numeric"
						height="80rpx"
					/>
				</view>
				<view class="mode-item">
					<text class="mode-label">邮箱输入 (email)</text>
					<zx-textarea 
						v-model="emailValue" 
						placeholder="邮箱输入模式"
						inputmode="email"
						height="80rpx"
					/>
				</view>
				<view class="mode-item">
					<text class="mode-label">搜索输入 (search)</text>
					<zx-textarea 
						v-model="searchValue" 
						placeholder="搜索输入模式"
						inputmode="search"
						height="80rpx"
					/>
				</view>
			</view>
		</view>
		
		<!-- 键盘确认按钮类型 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">键盘确认按钮</text>
				<text class="title-desc">自定义键盘右下角按钮的文字</text>
			</view>
			<view class="confirm-examples">
				<view class="confirm-item">
					<text class="confirm-label">发送 (send)</text>
					<zx-textarea 
						v-model="sendValue" 
						placeholder="确认按钮显示：发送"
						confirm-type="send"
						height="80rpx"
						@confirm="onConfirm"
					/>
				</view>
				<view class="confirm-item">
					<text class="confirm-label">搜索 (search)</text>
					<zx-textarea 
						v-model="searchConfirmValue" 
						placeholder="确认按钮显示：搜索"
						confirm-type="search"
						height="80rpx"
						@confirm="onConfirm"
					/>
				</view>
				<view class="confirm-item">
					<text class="confirm-label">下一个 (next)</text>
					<zx-textarea 
						v-model="nextValue" 
						placeholder="确认按钮显示：下一个"
						confirm-type="next"
						height="80rpx"
						@confirm="onConfirm"
					/>
				</view>
			</view>
		</view>
		
		<!-- 自定义占位符样式 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">占位符样式</text>
				<text class="title-desc">自定义占位符的颜色和样式</text>
			</view>
			<view class="placeholder-examples">
				<view class="placeholder-item">
					<text class="placeholder-label">红色占位符</text>
					<zx-textarea 
						v-model="placeholderValue1" 
						placeholder="红色占位符文字"
						placeholder-style="color: #f56c6c; font-style: italic;"
						height="80rpx"
					/>
				</view>
				<view class="placeholder-item">
					<text class="placeholder-label">蓝色占位符</text>
					<zx-textarea 
						v-model="placeholderValue2" 
						placeholder="蓝色占位符文字"
						placeholder-style="color: #409eff; font-weight: bold;"
						height="80rpx"
					/>
				</view>
			</view>
		</view>
		
		<!-- 事件处理演示 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">事件处理</text>
				<text class="title-desc">演示各种事件的触发和处理</text>
			</view>
			<zx-textarea 
				v-model="eventValue" 
				placeholder="在这里测试各种事件（聚焦、失焦、输入、清除等）"
				:count="true"
				:clearable="true"
				:maxlength="300"
				@focus="onFocus"
				@blur="onBlur"
				@input="onInputEvent"
				@change="onChangeEvent"
				@confirm="onConfirmEvent"
				@clear="onClearEvent"
			/>
			<view class="event-log">
				<view class="log-header">
					<text class="log-title">事件日志</text>
					<text class="log-clear" @tap="clearEventLog">清空日志</text>
				</view>
				<scroll-view class="log-content" scroll-y="true">
					<text 
						v-for="(log, index) in eventLogs" 
						:key="index" 
						class="log-item"
					>
						{{ log }}
					</text>
					<text v-if="eventLogs.length === 0" class="log-empty">暂无事件日志</text>
				</scroll-view>
			</view>
		</view>
		
		<!-- 综合示例 -->
		<view class="section">
			<view class="section-title">
				<text class="title-text">综合示例</text>
				<text class="title-desc">集成多种功能的综合演示</text>
			</view>
			<zx-textarea 
				v-model="comprehensiveValue" 
				placeholder="这是一个集成了多种功能的综合示例"
				:count="true"
				:clearable="true"
				:maxlength="500"
				:auto-height="true"
				font-size="16px"
				color="#2c3e50"
				background-color="#ecf0f1"
				border-color="#3498db"
				border-radius="10px"
				padding="15px"
				confirm-type="done"
				@input="onComprehensiveInput"
				@change="onComprehensiveChange"
				@clear="onComprehensiveClear"
			/>
			<view class="comprehensive-info">
				<text class="info-item">当前字数：{{ comprehensiveValue.length }}</text>
				<text class="info-item">剩余字数：{{ 500 - comprehensiveValue.length }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const basicValue = ref('');

// 字数统计
const countValue = ref('这是一个带字数统计的示例');

// 清除按钮
const clearableValue = ref('Hello World! 点击右侧清除按钮可以清空内容');

// 自适应高度
const autoHeightValue = ref('这是自适应高度的示例\n试试输入多行内容\n高度会自动调整');

// 禁用状态
const disabledValue = ref('这是禁用状态的文本内容，无法编辑');

// 不同边框样式
const borderValue1 = ref('');
const borderValue2 = ref('');
const borderValue3 = ref('');

// 自定义样式
const customValue = ref('');

// 不同输入模式
const numericValue = ref('');
const emailValue = ref('');
const searchValue = ref('');

// 键盘确认按钮类型
const sendValue = ref('');
const searchConfirmValue = ref('');
const nextValue = ref('');

// 自定义占位符样式
const placeholderValue1 = ref('');
const placeholderValue2 = ref('');

// 事件处理
const eventValue = ref('');
const eventLogs = ref([]);

// 综合示例
const comprehensiveValue = ref('这是一个综合示例，集成了字数统计、清除按钮、自适应高度、自定义样式等多种功能。');

// 基础用法事件
const onBasicInput = (value) => {
	console.log('基础输入事件:', value);
};

const onBasicChange = (value) => {
	console.log('基础变化事件:', value);
};

// 清除事件
const onClear = () => {
	console.log('清除事件触发');
	uni.showToast({
		title: '内容已清除',
		icon: 'success',
		duration: 1500
	});
};

// 确认事件
const onConfirm = (e) => {
	console.log('确认事件:', e);
	uni.showToast({
		title: '确认按钮被点击',
		icon: 'success',
		duration: 1500
	});
};

// 事件处理相关方法
const onFocus = (e) => {
	console.log('聚焦事件:', e);
	addEventLog('📍 输入框获得焦点');
};

const onBlur = (e) => {
	console.log('失焦事件:', e);
	addEventLog('🔚 输入框失去焦点');
};

const onInputEvent = (value) => {
	addEventLog(`⌨️ 输入事件: "${value.slice(-10)}${value.length > 10 ? '...' : ''}"`);
};

const onChangeEvent = (value) => {
	addEventLog(`🔄 变化事件: 内容长度 ${value.length}`);
};

const onConfirmEvent = (e) => {
	console.log('确认事件:', e);
	addEventLog('✅ 确认按钮被点击');
};

const onClearEvent = () => {
	addEventLog('🗑️ 清除按钮被点击');
};

// 综合示例事件
const onComprehensiveInput = (value) => {
	console.log('综合示例输入:', value);
};

const onComprehensiveChange = (value) => {
	console.log('综合示例变化:', value);
};

const onComprehensiveClear = () => {
	uni.showToast({
		title: '综合示例内容已清除',
		icon: 'success',
		duration: 1500
	});
};

// 事件日志相关方法
const addEventLog = (message) => {
	const timestamp = new Date().toLocaleTimeString();
	eventLogs.value.unshift(`[${timestamp}] ${message}`);
	// 只保留最近20条日志
	if (eventLogs.value.length > 20) {
		eventLogs.value = eventLogs.value.slice(0, 20);
	}
};

const clearEventLog = () => {
	eventLogs.value = [];
	uni.showToast({
		title: '日志已清空',
		icon: 'success',
		duration: 1000
	});
};
</script>

<style lang="scss" scoped>
.example-container {
	padding: 20rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.header {
	text-align: center;
	margin-bottom: 40rpx;
	padding: 30rpx 20rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12rpx;
	color: white;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	
	.subtitle {
		font-size: 24rpx;
		opacity: 0.9;
		line-height: 1.4;
	}
}

.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.section-title {
	margin-bottom: 20rpx;
	
	.title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #2c3e50;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.title-desc {
		font-size: 24rpx;
		color: #7f8c8d;
		line-height: 1.4;
	}
}

.result-box {
	margin-top: 20rpx;
	padding: 20rpx;
	background-color: #f8f9fa;
	border-radius: 8rpx;
	border-left: 4rpx solid #3498db;
	
	.result-label {
		font-size: 24rpx;
		color: #7f8c8d;
	}
	
	.result-value {
		font-size: 28rpx;
		color: #2c3e50;
		font-weight: 500;
	}
}

.border-examples,
.input-mode-examples,
.confirm-examples,
.placeholder-examples {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.border-item,
.mode-item,
.confirm-item,
.placeholder-item {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.border-label,
.mode-label,
.confirm-label,
.placeholder-label {
	font-size: 24rpx;
	color: #7f8c8d;
	font-weight: 500;
}

.event-log {
	margin-top: 20rpx;
	border: 1rpx solid #e9ecef;
	border-radius: 8rpx;
	overflow: hidden;
	
	.log-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15rpx 20rpx;
		background-color: #f8f9fa;
		border-bottom: 1rpx solid #e9ecef;
		
		.log-title {
			font-size: 26rpx;
			font-weight: 600;
			color: #2c3e50;
		}
		
		.log-clear {
			font-size: 24rpx;
			color: #e74c3c;
			padding: 8rpx 16rpx;
			border-radius: 4rpx;
			background-color: #fff;
			border: 1rpx solid #e74c3c;
		}
	}
	
	.log-content {
		max-height: 300rpx;
		padding: 20rpx;
		
		.log-item {
			display: block;
			font-size: 22rpx;
			color: #34495e;
			margin-bottom: 8rpx;
			padding: 8rpx 12rpx;
			background-color: #f8f9fa;
			border-radius: 4rpx;
			border-left: 3rpx solid #3498db;
			line-height: 1.4;
		}
		
		.log-empty {
			font-size: 24rpx;
			color: #bdc3c7;
			text-align: center;
			padding: 40rpx 20rpx;
		}
	}
}

.comprehensive-info {
	margin-top: 20rpx;
	display: flex;
	justify-content: space-between;
	padding: 20rpx;
	background-color: #ecf0f1;
	border-radius: 8rpx;
	
	.info-item {
		font-size: 24rpx;
		color: #2c3e50;
		font-weight: 500;
	}
}

/* 响应式设计 */
@media (min-width: 750rpx) {
	.border-examples,
	.input-mode-examples,
	.confirm-examples,
	.placeholder-examples {
		flex-direction: row;
		gap: 30rpx;
	}
	
	.border-item,
	.mode-item,
	.confirm-item,
	.placeholder-item {
		flex: 1;
	}
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
	.example-container {
		background-color: #1a1a1a;
	}
	
	.section {
		background-color: #2d2d2d;
		
		.section-title .title-text {
			color: #ffffff;
		}
		
		.section-title .title-desc {
			color: #aaaaaa;
		}
	}
	
	.result-box {
		background-color: #404040;
		
		.result-value {
			color: #ffffff;
		}
	}
}
</style>
