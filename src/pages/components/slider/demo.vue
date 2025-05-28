<template>
	<view class="demo-container">
		<view class="demo-title">zx-slider 组件演示</view>

		<!-- 基础用法 -->
		<view class="demo-section">
			v-model="value1"
			@change="onChange"
			/>
			<view class="result">当前值：{{ value1 }}</view>
		</view>

		<!-- 显示当前值 -->
		<view class="demo-section">
			<view class="section-title">显示当前值（不同位置）</view>

			<view class="sub-section">
				<text class="sub-title">原生显示：</text>
				<zx-slider v-model="value2" :show-value="true" value-position="native" />
			</view>

			<view class="sub-section">
				<text class="sub-title">左侧显示：</text>
				<zx-slider v-model="value2" :show-value="true" value-position="left" />
			</view>

			<view class="sub-section">
				<text class="sub-title">右侧显示：</text>
				<zx-slider v-model="value2" :show-value="true" value-position="right" />
			</view>

			<view class="sub-section">
				<text class="sub-title">底部显示：</text>
				<zx-slider v-model="value2" :show-value="true" value-position="bottom" />
			</view>
		</view>

		<!-- 设置步长和范围 -->
		<view class="demo-section">
			<view class="section-title">设置步长和范围</view>
			<zx-slider v-model="value3" :min="50" :max="200" :step="5" :show-value="true" :show-range="true"
				value-position="right" />
		</view>

		<!-- 自定义颜色和大小 -->
		<view class="demo-section">
			<view class="section-title">自定义颜色和大小</view>
			<zx-slider v-model="value4" active-color="#ff5722" background-color="#ffebee" block-color="#e91e63"
				:block-size="24" :show-value="true" value-position="right" />
		</view>

		<!-- 带标签和单位 -->
		<view class="demo-section">
			<view class="section-title">带标签和单位</view>
			<zx-slider v-model="value5" :show-label="true" label="音量" unit="%" :show-value="true"
				value-position="right" />
		</view>

		<!-- 精度和格式化 -->
		<view class="demo-section">
			<view class="section-title">精度和格式化</view>

			<view class="sub-section">
				<text class="sub-title">小数精度：</text>
				<zx-slider v-model="value6" :min="0" :max="10" :step="0.1" :precision="1" :show-value="true"
					value-position="right" />
			</view>

			<view class="sub-section">
				<text class="sub-title">自定义格式化：</text>
				<zx-slider v-model="value7" :min="0" :max="100" :formatter="percentFormatter" :show-value="true"
					value-position="right" />
			</view>

			<view class="sub-section">
				<text class="sub-title">格式化配置：</text>
				<zx-slider v-model="value8" :min="0" :max="1000"
					:formatter="{ prefix: '¥', suffix: '.00', decimals: 0 }" :show-value="true"
					value-position="right" />
			</view>
		</view>

		<!-- 显示刻度 -->
		<view class="demo-section">
			<view class="section-title">显示刻度</view>

			<view class="sub-section">
				<text class="sub-title">基础刻度：</text>
				<zx-slider v-model="value9" :show-ticks="true" :tick-count="4" :show-value="true"
					value-position="right" />
			</view>

			<view class="sub-section">
				<text class="sub-title">带刻度标签：</text>
				<zx-slider v-model="value9" :show-ticks="true" :show-tick-labels="true" :tick-count="5"
					:show-value="true" value-position="right" />
			</view>
		</view>

		<!-- 实时更新 -->
		<view class="demo-section">
			<view class="section-title">实时更新</view>
			<zx-slider v-model="value10" :update-on-changing="true" :show-value="true" value-position="right"
				@changing="onChanging" />
			<view class="result">实时值：{{ changingValue }}</view>
		</view>

		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="section-title">禁用状态</view>
			<zx-slider v-model="value11" :disabled="true" :show-value="true" value-position="right" />
		</view>

		<!-- 温度计示例 -->
		<view class="demo-section">
			<view class="section-title">温度计示例</view>
			<zx-slider v-model="temperature" :min="-10" :max="50" :step="1" :show-label="true" label="室内温度" unit="°C"
				:show-value="true" :show-range="true" :show-ticks="true" :show-tick-labels="true" :tick-count="6"
				value-position="right" active-color="#ff6b35" background-color="#e3f2fd"
				:formatter="temperatureFormatter" />
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';


// 基础值
const value1 = ref(30);
const value2 = ref(50);
const value3 = ref(100);
const value4 = ref(75);
const value5 = ref(60);
const value6 = ref(5.5);
const value7 = ref(80);
const value8 = ref(500);
const value9 = ref(60);
const value10 = ref(40);
const value11 = ref(70);
const temperature = ref(22);

// 实时变化的值
const changingValue = ref(value10.value);

// 事件处理
function onChange(e) {
	console.log('滑块值改变：', e);
}

function onChanging(e) {
	changingValue.value = e.value;
	console.log('滑块拖动中：', e);
}

// 自定义格式化函数
function percentFormatter(value) {
	return `${value}%`;
}

// 温度格式化
function temperatureFormatter(value) {
	if (value < 0) {
		return `${value}°C (冷)`;
	} else if (value < 10) {
		return `${value}°C (凉)`;
	} else if (value < 25) {
		return `${value}°C (适宜)`;
	} else if (value < 35) {
		return `${value}°C (温暖)`;
	} else {
		return `${value}°C (炎热)`;
	}
}
</script>

<style lang="scss" scoped>
.demo-container {
	padding: 32rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #2c3e50;
	text-align: center;
	margin-bottom: 40rpx;
}

.demo-section {
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
	margin-bottom: 24rpx;
	border-left: 8rpx solid #3498db;
	padding-left: 16rpx;
}

.sub-section {
	margin-bottom: 32rpx;

	&:last-child {
		margin-bottom: 0;
	}
}

.sub-title {
	display: block;
	font-size: 28rpx;
	color: #7f8c8d;
	margin-bottom: 16rpx;
}

.result {
	margin-top: 16rpx;
	padding: 16rpx;
	background-color: #ecf0f1;
	border-radius: 8rpx;
	font-size: 28rpx;
	color: #2c3e50;
	text-align: center;
}
</style>