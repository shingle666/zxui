<template>
	<view class="container">
		<view class="title">zx-radio 单选框组件</view>
		
		<!-- 基本用法 -->
		<view class="section">
			<view class="section-title">基本用法</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked1">默认单选框</zx-radio>
			</view>
			<view class="demo-code">选中状态: {{ checked1 }}</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked2" disabled>禁用未选中</zx-radio>
			</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked3" disabled>禁用已选中</zx-radio>
			</view>
		</view>
		
		<!-- 不同大小 -->
		<view class="section">
			<view class="section-title">不同大小</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked4" size="28">小尺寸</zx-radio>
			</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked5" size="38">默认尺寸</zx-radio>
			</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked6" size="48">大尺寸</zx-radio>
			</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<view class="demo-item">
				<zx-radio 
					v-model:checked="checked7" 
					activeBackgroundColor="#ff5500"
					activeBorderColor="#ff5500"
					backgroundColor="#f5f5f5"
					borderColor="#dddddd"
				>自定义颜色</zx-radio>
			</view>
		</view>
		
		<!-- 配合radio-group使用 -->
		<view class="section">
			<view class="section-title">配合radio-group使用</view>
			<view class="demo-item">
				<zx-radio-group v-model="radioValue" @change="onChange">
					<zx-radio value="apple">苹果</zx-radio>
					<zx-radio value="banana">香蕉</zx-radio>
					<zx-radio value="orange">橙子</zx-radio>
					<zx-radio value="grape" disabled>葡萄 (禁用)</zx-radio>
				</zx-radio-group>
			</view>
			<view class="demo-code">选中值: {{ radioValue }}</view>
		</view>
		
		<!-- 配合label使用 -->
		<view class="section">
			<view class="section-title">配合label使用</view>
			<view class="demo-item">
				<zx-label for="myRadio" isFull>
					<view class="label-content">
						<view class="label-title">点击此区域也可选中单选框</view>
						<view class="label-desc">通过for属性关联radio的id</view>
					</view>
				</zx-label>
				<zx-radio id="myRadio" v-model:checked="checked8">单选框</zx-radio>
			</view>
		</view>
		
		<!-- 参数传递示例 -->
		<view class="section">
			<view class="section-title">参数传递示例</view>
			<view class="demo-item">
				<zx-radio v-model:checked="checked9" :parameter="['自定义数据', 100]" @change="onParamChange">
					携带参数
				</zx-radio>
			</view>
			<view class="demo-code" v-if="paramData.length">参数: {{ paramData }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基本用法
const checked1 = ref(false);

// 禁用状态
const checked2 = ref(false);
const checked3 = ref(true);

// 不同大小
const checked4 = ref(false);
const checked5 = ref(false);
const checked6 = ref(false);

// 自定义样式
const checked7 = ref(false);

// 配合label使用
const checked8 = ref(false);

// 参数传递
const checked9 = ref(false);
const paramData = ref([]);

// radio-group
const radioValue = ref('apple');

// 事件处理
const onChange = (value) => {
	console.log('radio-group 值变化:', value);
};

// 参数变化
const onParamChange = (data) => {
	console.log('参数变化:', data);
	paramData.value = data;
};
</script>

<style>
.container {
	padding: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 40rpx;
}

.section {
	margin-bottom: 40rpx;
	background-color: #ffffff;
	border-radius: 8rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #333333;
	border-left: 8rpx solid #2979ff;
	padding-left: 20rpx;
}

.demo-item {
	margin-bottom: 20rpx;
	padding: 20rpx;
	background-color: #f8f8f8;
	border-radius: 6rpx;
}

.demo-code {
	padding: 20rpx;
	background-color: #f5f7fa;
	border-radius: 6rpx;
	font-family: monospace;
	font-size: 24rpx;
	color: #606266;
}

.label-content {
	padding: 20rpx;
	background-color: #ecf5ff;
	border-radius: 6rpx;
	margin-bottom: 10rpx;
}

.label-title {
	font-size: 28rpx;
	font-weight: bold;
	color: #2979ff;
}

.label-desc {
	font-size: 24rpx;
	color: #909399;
	margin-top: 10rpx;
}
</style>
