<template>
	<view class="demo-container">
		<view class="demo-title">zx-switch 开关组件示例</view>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="demo-item">
				<text>默认开关：</text>
				<zx-switch v-model="basicValue" @change="handleChange" />
			</view>
			<view class="demo-item">
				<text>预设开启：</text>
				<zx-switch v-model="basicValue2" />
			</view>
		</view>
		
		<!-- 不同尺寸 -->
		<view class="demo-section">
			<view class="section-title">不同尺寸</view>
			<view class="demo-item">
				<text>大尺寸：</text>
				<zx-switch v-model="sizeValue" size="large" />
			</view>
			<view class="demo-item">
				<text>默认尺寸：</text>
				<zx-switch v-model="sizeValue" size="default" />
			</view>
			<view class="demo-item">
				<text>小尺寸：</text>
				<zx-switch v-model="sizeValue" size="small" />
			</view>
			<view class="demo-item">
				<text>自定义尺寸：</text>
				<zx-switch v-model="sizeValue" :size="35" />
			</view>
		</view>
		
		<!-- 自定义颜色 -->
		<view class="demo-section">
			<view class="section-title">自定义颜色</view>
			<view class="demo-item">
				<text>绿色主题：</text>
				<zx-switch v-model="colorValue" active-color="#13ce66" inactive-color="#ff4949" />
			</view>
			<view class="demo-item">
				<text>紫色主题：</text>
				<zx-switch v-model="colorValue2" active-color="#8e44ad" inactive-color="#ecf0f1" />
			</view>
		</view>
		
		<!-- 文字显示 -->
		<view class="demo-section">
			<view class="section-title">文字显示</view>
			<view class="demo-item">
				<text>显示文字：</text>
				<zx-switch 
					v-model="textValue" 
					:show-text="true"
					active-text="开"
					inactive-text="关"
					size="large"
				/>
			</view>
			<view class="demo-item">
				<text>英文文字：</text>
				<zx-switch 
					v-model="textValue2" 
					:show-text="true"
					active-text="ON"
					inactive-text="OFF"
					size="large"
					text-color="#333"
				/>
			</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="demo-section">
			<view class="section-title">禁用状态</view>
			<view class="demo-item">
				<text>禁用关闭：</text>
				<zx-switch v-model="disabledValue1" :disabled="true" />
			</view>
			<view class="demo-item">
				<text>禁用开启：</text>
				<zx-switch v-model="disabledValue2" :disabled="true" />
			</view>
		</view>
		
		<!-- 加载状态 -->
		<view class="demo-section">
			<view class="section-title">加载状态</view>
			<view class="demo-item">
				<text>加载中：</text>
				<zx-switch v-model="loadingValue" :loading="true" />
			</view>
			<view class="demo-item">
				<text>模拟异步切换：</text>
				<zx-switch v-model="asyncValue" :loading="asyncLoading" @change="handleAsyncChange" />
			</view>
		</view>
		
		<!-- 自定义值 -->
		<view class="demo-section">
			<view class="section-title">自定义值</view>
			<view class="demo-item">
				<text>数字值（当前：{{ customValue }}）：</text>
				<zx-switch v-model="customValue" :active-value="1" :inactive-value="0" />
			</view>
			<view class="demo-item">
				<text>字符串值（当前：{{ stringValue }}）：</text>
				<zx-switch v-model="stringValue" active-value="yes" inactive-value="no" />
			</view>
		</view>
		
		<!-- 切换前确认 -->
		<view class="demo-section">
			<view class="section-title">切换前确认</view>
			<view class="demo-item">
				<text>需要确认切换：</text>
				<zx-switch v-model="confirmValue" :before-change="beforeChange" />
			</view>
		</view>
		
		<!-- 无障碍支持 -->
		<view class="demo-section">
			<view class="section-title">无障碍支持</view>
			<view class="demo-item">
				<text>带标签：</text>
				<zx-switch v-model="a11yValue" aria-label="启用通知开关" />
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const basicValue = ref(false);
const basicValue2 = ref(true);

// 不同尺寸
const sizeValue = ref(true);

// 自定义颜色
const colorValue = ref(true);
const colorValue2 = ref(false);

// 文字显示
const textValue = ref(true);
const textValue2 = ref(false);

// 禁用状态
const disabledValue1 = ref(false);
const disabledValue2 = ref(true);

// 加载状态
const loadingValue = ref(true);
const asyncValue = ref(false);
const asyncLoading = ref(false);

// 自定义值
const customValue = ref(0);
const stringValue = ref('no');

// 切换前确认
const confirmValue = ref(false);

// 无障碍支持
const a11yValue = ref(false);

// 处理基础change事件
const handleChange = (value) => {
	console.log('开关状态改变：', value);
	uni.showToast({
		title: `开关${value ? '开启' : '关闭'}`,
		icon: 'none'
	});
};

// 处理异步切换
const handleAsyncChange = async (value) => {
	asyncLoading.value = true;
	
	// 模拟异步请求
	setTimeout(() => {
		asyncLoading.value = false;
		uni.showToast({
			title: '切换成功',
			icon: 'success'
		});
	}, 2000);
};

// 切换前确认
const beforeChange = () => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '确认',
			content: '确定要切换开关状态吗？',
			success: (res) => {
				if (res.confirm) {
					resolve(true);
				} else {
					reject(false);
				}
			}
		});
	});
};
</script>

<style scoped>
.demo-container {
	padding: 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
	text-align: center;
	margin-bottom: 40rpx;
}

.demo-section {
	background-color: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
	margin-bottom: 30rpx;
	border-left: 8rpx solid #3498db;
	padding-left: 20rpx;
}

.demo-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}

.demo-item:last-child {
	border-bottom: none;
}

.demo-item text {
	font-size: 28rpx;
	color: #666;
}
</style> 