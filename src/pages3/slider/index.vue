<template>
	<view class="container">
		<view class="header">
			<view class="title">zx-slider 滑动选择器</view>
			<view class="subtitle">增强版滑块组件演示</view>
		</view>

		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="demo-item">
				<zx-slider v-model="basicValue" @change="onBasicChange" />
				<view class="result">当前值：{{ basicValue }}</view>
			</view>
		</view>

		<!-- 显示当前值 -->
		<view class="section">
			<view class="section-title">显示当前值</view>

			<view class="demo-item">
				<text class="demo-label">原生显示：</text>
				<zx-slider v-model="valueShowDemo" :show-value="true" value-position="native" />
			</view>

			<view class="demo-item">
				<text class="demo-label">左侧显示：</text>
				<zx-slider v-model="valueShowDemo" :show-value="true" value-position="left" />
			</view>

			<view class="demo-item">
				<text class="demo-label">右侧显示：</text>
				<zx-slider v-model="valueShowDemo" :show-value="true" value-position="right" />
			</view>

			<view class="demo-item">
				<text class="demo-label">底部显示：</text>
				<zx-slider v-model="valueShowDemo" :show-value="true" value-position="bottom" />
			</view>
		</view>

		<!-- 设置范围和步长 -->
		<view class="section">
			<view class="section-title">设置范围和步长</view>
			<view class="demo-item">
				<text class="demo-label">范围 50-200，步长 5：</text>
				<zx-slider v-model="rangeValue" :min="50" :max="200" :step="5" :show-value="true" :show-range="true"
					value-position="right" />
			</view>
		</view>

		<!-- 自定义颜色和大小 -->
		<view class="section">
			<view class="section-title">自定义颜色和大小</view>
			<view class="demo-item">
				<text class="demo-label">自定义主题色：</text>
				<zx-slider v-model="colorValue" active-color="#ff5722" background-color="#ffebee" block-color="#e91e63"
					:block-size="24" :show-value="true" value-position="right" />
			</view>
		</view>

		<!-- 带标签和单位 -->
		<view class="section">
			<view class="section-title">带标签和单位</view>
			<view class="demo-item">
				<zx-slider v-model="volumeValue" :show-label="true" label="音量控制" unit="%" :show-value="true"
					value-position="right" active-color="#4caf50" />
			</view>
		</view>

		<!-- 精度控制 -->
		<view class="section">
			<view class="section-title">精度控制</view>

			<view class="demo-item">
				<text class="demo-label">小数精度 (0.1 步长)：</text>
				<zx-slider v-model="decimalValue" :min="0" :max="10" :step="0.1" :precision="1" :show-value="true"
					value-position="right" />
			</view>

			<view class="demo-item">
				<text class="demo-label">百分比格式：</text>
				<zx-slider v-model="percentValue" :min="0" :max="100" :formatter="percentFormatter" :show-value="true"
					value-position="right" active-color="#2196f3" />
			</view>

			<view class="demo-item">
				<text class="demo-label">价格格式：</text>
				<zx-slider v-model="priceValue" :min="0" :max="1000"
					:formatter="{ prefix: '¥', suffix: '.00', decimals: 0 }" :show-value="true" value-position="right"
					active-color="#ff9800" />
			</view>
		</view>

		<!-- 刻度显示 -->
		<view class="section">
			<view class="section-title">刻度显示</view>

			<view class="demo-item">
				<text class="demo-label">基础刻度：</text>
				<zx-slider v-model="tickValue1" :show-ticks="true" :tick-count="4" :show-value="true"
					value-position="right" />
			</view>

			<view class="demo-item">
				<text class="demo-label">带刻度标签：</text>
				<zx-slider v-model="tickValue2" :show-ticks="true" :show-tick-labels="true" :tick-count="5"
					:show-value="true" value-position="right" active-color="#9c27b0" />
			</view>
		</view>

		<!-- 实时更新 -->
		<view class="section">
			<view class="section-title">实时更新</view>
			<view class="demo-item">
				<text class="demo-label">拖动时实时更新：</text>
				<zx-slider v-model="realtimeValue" :update-on-changing="true" :show-value="true" value-position="right"
					@changing="onRealtimeChange" active-color="#607d8b" />
				<view class="result">实时值：{{ realtimeDisplayValue }}</view>
			</view>
		</view>

		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<view class="demo-item">
				<text class="demo-label">禁用滑块：</text>
				<zx-slider v-model="disabledValue" :disabled="true" :show-value="true" value-position="right" />
			</view>
		</view>

		<!-- 综合示例 -->
		<view class="section">
			<view class="section-title">综合示例 - 温度控制器</view>
			<view class="demo-item">
				<zx-slider v-model="temperature" :min="-10" :max="50" :step="1" :show-label="true" label="室内温度调节"
					:show-value="true" :show-range="true" :show-ticks="true" :show-tick-labels="true" :tick-count="6"
					value-position="right" active-color="#ff6b35" background-color="#e3f2fd"
					:formatter="temperatureFormatter" :custom-style="{ marginBottom: '20rpx' }" />
				<view class="temperature-status">
					<text class="status-text">{{ getTemperatureStatus(temperature) }}</text>
				</view>
			</view>
		</view>

		<!-- 亮度控制示例 -->
		<view class="section">
			<view class="section-title">亮度控制示例</view>
			<view class="demo-item">
				<view class="brightness-demo" :style="{ backgroundColor: `rgba(255, 255, 255, ${brightness / 100})` }">
					<zx-slider v-model="brightness" :min="10" :max="100" :show-label="true" label="屏幕亮度" unit="%"
						:show-value="true" value-position="right" active-color="#ffc107" :update-on-changing="true" />
					<view class="brightness-text">当前亮度：{{ brightness }}%</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 页面标题
uni.setNavigationBarTitle({
	title: 'zx-slider 组件示例'
});

// 基础值
const basicValue = ref(30);
const valueShowDemo = ref(50);
const rangeValue = ref(100);
const colorValue = ref(75);
const volumeValue = ref(60);
const decimalValue = ref(5.5);
const percentValue = ref(80);
const priceValue = ref(500);
const tickValue1 = ref(60);
const tickValue2 = ref(40);
const realtimeValue = ref(45);
const disabledValue = ref(70);
const temperature = ref(22);
const brightness = ref(80);

// 实时显示值
const realtimeDisplayValue = ref(realtimeValue.value);

// 事件处理
function onBasicChange(e) {
	console.log('基础滑块值改变：', e);
	uni.showToast({
		title: `值变为：${e.value}`,
		icon: 'none',
		duration: 1000
	});
}

function onRealtimeChange(e) {
	realtimeDisplayValue.value = e.value;
	console.log('实时滑块拖动中：', e);
}

// 自定义格式化函数
function percentFormatter(value) {
	return `${value}%`;
}

// 温度格式化
function temperatureFormatter(value) {
	if (value < 0) {
		return `${value}°C 寒冷`;
	} else if (value < 10) {
		return `${value}°C 较冷`;
	} else if (value < 25) {
		return `${value}°C 舒适`;
	} else if (value < 35) {
		return `${value}°C 温暖`;
	} else {
		return `${value}°C 炎热`;
	}
}

// 获取温度状态描述
function getTemperatureStatus(temp) {
	if (temp < 0) return '🥶 非常寒冷，建议开启暖气';
	if (temp < 10) return '❄️ 比较寒冷，注意保暖';
	if (temp < 18) return '😊 稍微凉爽，很舒适';
	if (temp < 26) return '😄 温度适宜，非常舒适';
	if (temp < 30) return '😅 稍微温暖，可以开空调';
	if (temp < 35) return '🌡️ 比较炎热，建议降温';
	return '🔥 非常炎热，强烈建议开空调';
}
</script>

<style lang="scss" scoped>
.container {
	padding: 32rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.header {
	text-align: center;
	margin-bottom: 40rpx;

	.title {
		font-size: 40rpx;
		font-weight: bold;
		color: #2c3e50;
		margin-bottom: 16rpx;
	}

	.subtitle {
		font-size: 28rpx;
		color: #7f8c8d;
	}
}

.section {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	margin-bottom: 32rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #34495e;
	margin-bottom: 32rpx;
	border-left: 8rpx solid #3498db;
	padding-left: 16rpx;
}

.demo-item {
	margin-bottom: 40rpx;

	&:last-child {
		margin-bottom: 0;
	}
}

.demo-label {
	display: block;
	font-size: 28rpx;
	color: #7f8c8d;
	margin-bottom: 20rpx;
	font-weight: 500;
}

.result {
	margin-top: 20rpx;
	padding: 20rpx;
	background-color: #ecf0f1;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #2c3e50;
	text-align: center;
	font-weight: 500;
}

.temperature-status {
	margin-top: 20rpx;
	padding: 24rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12rpx;
	text-align: center;

	.status-text {
		color: #ffffff;
		font-size: 30rpx;
		font-weight: 500;
	}
}

.brightness-demo {
	padding: 32rpx;
	border-radius: 12rpx;
	background-color: #333333;
	transition: background-color 0.3s ease;

	.brightness-text {
		margin-top: 20rpx;
		text-align: center;
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
	}
}

// 页面滚动优化
:deep(.zx-slider) {
	.zx-slider__value {
		font-weight: 500;
	}
}
</style>
