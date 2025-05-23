<template>
	<view class="demo-container">
		<view class="demo-title">zx-rate 评分组件示例</view>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="demo-block">
				<view class="block-title">默认</view>
				<zx-rate v-model="value1" />
				<text class="value-text">当前值: {{ value1 }}</text>
			</view>
			<view class="demo-block">
				<view class="block-title">颜色分级</view>
				<zx-rate v-model="value2" :colors="colors" />
				<text class="value-text">当前值: {{ value2 }}</text>
			</view>
		</view>
		
		<!-- 尺寸 -->
		<view class="demo-section">
			<view class="section-title">尺寸</view>
			<view class="demo-block">
				<view class="block-title">Large</view>
				<zx-rate v-model="value3" size="large" />
			</view>
			<view class="demo-block">
				<view class="block-title">Default</view>
				<zx-rate v-model="value3" />
			</view>
			<view class="demo-block">
				<view class="block-title">Small</view>
				<zx-rate v-model="value3" size="small" />
			</view>
		</view>
		
		<!-- 允许半选 -->
		<view class="demo-section">
			<view class="section-title">允许半选</view>
			<view class="demo-block">
				<zx-rate v-model="value4" :allow-half="true" />
				<text class="value-text">当前值: {{ value4 }}</text>
			</view>
		</view>
		
		<!-- 辅助文字 -->
		<view class="demo-section">
			<view class="section-title">辅助文字</view>
			<view class="demo-block">
				<zx-rate 
					v-model="value5" 
					:show-text="true" 
					:texts="['极差', '失望', '一般', '满意', '惊喜']" 
				/>
				<text class="value-text">当前值: {{ value5 }}</text>
			</view>
		</view>
		
		<!-- 可清空 -->
		<view class="demo-section">
			<view class="section-title">可清空</view>
			<view class="demo-block">
				<view class="block-title">点击相同值可重置为0</view>
				<zx-rate v-model="value6" :clearable="true" />
				<text class="value-text">当前值: {{ value6 }}</text>
			</view>
		</view>
		
		<!-- 只读显示分数 -->
		<view class="demo-section">
			<view class="section-title">只读显示分数</view>
			<view class="demo-block">
				<zx-rate 
					v-model="value7" 
					:disabled="true"
					:show-score="true"
					:score-template="'{value} 分'"
					text-color="#ff9900"
				/>
			</view>
		</view>
		
		<!-- 自定义图标 -->
		<view class="demo-section">
			<view class="section-title">更多种类的图标</view>
			<view class="demo-block">
				<zx-rate 
					v-model="value8" 
					:icons="iconTypes"
					:colors="['#409eff', '#67c23a', '#FF9900']"
					void-icon="chat-line-round"
				/>
				<text class="value-text">当前值: {{ value8 }}</text>
			</view>
		</view>
		
		<!-- 自定义阈值和颜色 -->
		<view class="demo-section">
			<view class="section-title">自定义阈值和颜色</view>
			<view class="demo-block">
				<zx-rate 
					v-model="value9" 
					:low-threshold="2"
					:high-threshold="4"
					:colors="colorConfig"
				/>
				<text class="value-text">当前值: {{ value9 }}</text>
			</view>
		</view>
		
		<!-- 禁用滑动 -->
		<view class="demo-section">
			<view class="section-title">禁用滑动手势</view>
			<view class="demo-block">
				<zx-rate v-model="value10" :touchable="false" />
				<text class="value-text">当前值: {{ value10 }} (只能点击选择)</text>
			</view>
		</view>
		
		<!-- 编程式控制 -->
		<view class="demo-section">
			<view class="section-title">编程式控制</view>
			<view class="demo-block">
				<zx-rate ref="rateRef" v-model="value11" />
				<view class="button-group">
					<button @tap="setRateValue(3)" class="demo-button">设置为3分</button>
					<button @tap="resetRate" class="demo-button">重置</button>
				</view>
				<text class="value-text">当前值: {{ value11 }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const value1 = ref(0);
const value2 = ref(0);
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);

// 尺寸
const value3 = ref(0);

// 半选
const value4 = ref(0);

// 辅助文字
const value5 = ref(0);

// 可清空
const value6 = ref(3);

// 只读显示分数
const value7 = ref(3.7);

// 自定义图标
const value8 = ref(0);
const iconTypes = ref(['chat-dot-round', 'chat-line-round', 'chat-round']);

// 自定义阈值和颜色
const value9 = ref(0);
const colorConfig = ref({
	2: '#99A9BF',
	4: '#F7BA2A',
	5: '#FF9900'
});

// 禁用滑动
const value10 = ref(0);

// 编程式控制
const value11 = ref(0);
const rateRef = ref(null);

const setRateValue = (val) => {
	if (rateRef.value) {
		rateRef.value.setCurrentValue(val);
	}
};

const resetRate = () => {
	if (rateRef.value) {
		rateRef.value.resetCurrentValue();
	}
};
</script>

<style lang="scss" scoped>
.demo-container {
	padding: 40rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.demo-title {
	font-size: 48rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 60rpx;
	color: #333;
}

.demo-section {
	background-color: #fff;
	margin-bottom: 40rpx;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
}

.section-title {
	font-size: 36rpx;
	font-weight: bold;
	padding: 30rpx;
	background-color: #f8f9fa;
	border-bottom: 2rpx solid #e9ecef;
	color: #495057;
}

.demo-block {
	padding: 30rpx;
	border-bottom: 2rpx solid #f0f0f0;
	
	&:last-child {
		border-bottom: none;
	}
}

.block-title {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 20rpx;
}

.value-text {
	display: block;
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #888;
}

.button-group {
	display: flex;
	gap: 20rpx;
	margin: 20rpx 0;
}

.demo-button {
	padding: 16rpx 32rpx;
	font-size: 28rpx;
	background-color: #007aff;
	color: white;
	border: none;
	border-radius: 8rpx;
	
	&:active {
		opacity: 0.8;
	}
}
</style> 