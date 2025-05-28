<template>
	<view class="container">
		<view class="title">倒计时组件示例</view>
		
		<!-- 基础用法 -->
		<view class="example-section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<ZxCountdown :time="60" />
			</view>
			<view class="section-desc">默认显示时:分:秒格式</view>
		</view>
		
		<!-- 显示天数 -->
		<view class="example-section">
			<view class="section-title">显示天数</view>
			<view class="section-content">
				<ZxCountdown :time="86400" :days="true" />
			</view>
			<view class="section-desc">时间超过24小时时，可以显示天数</view>
		</view>
		
		<!-- 使用文字单位 -->
		<view class="example-section">
			<view class="section-title">使用文字单位</view>
			<view class="section-content">
				<ZxCountdown :time="3600" :isColon="false" />
			</view>
			<view class="section-desc">使用时分秒文字替代冒号</view>
		</view>
		
		<!-- 自定义样式 -->
		<view class="example-section">
			<view class="section-title">自定义样式</view>
			<view class="section-content">
				<ZxCountdown 
					:time="3600" 
					backgroundColor="#ff4757" 
					borderColor="#ff4757" 
					color="#ffffff" 
					colonColor="#ff4757" 
					:scale="true"
				/>
			</view>
			<view class="section-desc">自定义背景色、文字颜色等</view>
		</view>
		
		<!-- 预设主题 -->
		<view class="example-section">
			<view class="section-title">预设主题</view>
			<view class="section-content themes-showcase">
				<view class="theme-item">
					<view class="theme-label">默认</view>
					<ZxCountdown :time="3600" />
				</view>
				<view class="theme-item">
					<view class="theme-label">深色</view>
					<view class="zx-theme-dark">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">主色</view>
					<view class="zx-theme-primary">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">危险色</view>
					<view class="zx-theme-danger">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">成功色</view>
					<view class="zx-theme-success">
						<ZxCountdown :time="3600" />
					</view>
				</view>
			</view>
			<view class="section-desc">内置多种颜色主题</view>
		</view>
		
		<!-- 样式效果 -->
		<view class="example-section">
			<view class="section-title">样式效果</view>
			<view class="section-content themes-showcase">
				<view class="theme-item">
					<view class="theme-label">扁平化</view>
					<view class="zx-theme-primary zx-flat">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">圆角</view>
					<view class="zx-theme-danger zx-rounded">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">阴影</view>
					<view class="zx-theme-success zx-shadowed">
						<ZxCountdown :time="3600" />
					</view>
				</view>
				<view class="theme-item">
					<view class="theme-label">复合效果</view>
					<view class="zx-theme-dark zx-rounded zx-shadowed">
						<ZxCountdown :time="3600" />
					</view>
				</view>
			</view>
			<view class="section-desc">支持多种视觉效果，可组合使用</view>
		</view>
		
		<!-- 显示毫秒 -->
		<view class="example-section">
			<view class="section-title">显示毫秒</view>
			<view class="section-content">
				<ZxCountdown :time="60" :isMs="true" />
			</view>
			<view class="section-desc">支持显示毫秒动画效果</view>
		</view>
		
		<!-- 不显示前导零 -->
		<view class="example-section">
			<view class="section-title">不显示前导零</view>
			<view class="section-content">
				<ZxCountdown :time="3661" :showZero="false" />
			</view>
			<view class="section-desc">设置showZero为false可以不显示前导零</view>
		</view>
		
		<!-- 使用时间戳 -->
		<view class="example-section">
			<view class="section-title">使用时间戳</view>
			<view class="section-content">
				<ZxCountdown :timestamp="targetTimestamp" />
			</view>
			<view class="section-desc">使用目标时间戳，自动计算倒计时</view>
		</view>
		
		<!-- 不同的更新间隔 -->
		<view class="example-section">
			<view class="section-title">不同的更新间隔</view>
			<view class="section-content">
				<ZxCountdown :time="60" :interval="500" />
			</view>
			<view class="section-desc">设置不同的更新频率（例如500ms）</view>
		</view>
		
		<!-- 暂停和恢复 -->
		<view class="example-section">
			<view class="section-title">暂停和恢复</view>
			<view class="section-content control-panel">
				<view class="zx-theme-primary zx-rounded zx-shadowed">
					<ZxCountdown ref="countdownRef" :time="180" />
				</view>
				<view class="btn-group">
					<button class="btn" @click="handlePause">暂停</button>
					<button class="btn" @click="handleResume">恢复</button>
					<button class="btn" @click="handleStop">停止</button>
					<button class="btn" @click="handleRestart">重新开始</button>
				</view>
			</view>
			<view class="section-desc">支持暂停、恢复、停止和重新开始操作</view>
		</view>
		
		<!-- 自定义格式 -->
		<view class="example-section">
			<view class="section-title">自定义格式</view>
			<view class="section-content">
				<view class="zx-theme-dark zx-rounded">
					<ZxCountdown 
						:time="36000" 
						:isColon="false"
						:format="{day:'D',hour:'H',minute:'M',second:'S'}" 
						:days="true"
					/>
				</view>
			</view>
			<view class="section-desc">自定义单位文本</view>
		</view>
		
		<!-- 不自动开始 -->
		<view class="example-section">
			<view class="section-title">不自动开始</view>
			<view class="section-content control-panel">
				<view class="zx-theme-success zx-rounded">
					<ZxCountdown :time="60" :autoStart="false" ref="manualStartRef" />
				</view>
				<button class="btn start-btn" @click="handleStart">开始</button>
			</view>
			<view class="section-desc">手动控制开始时间</view>
		</view>
		
		<!-- 事件回调 -->
		<view class="example-section">
			<view class="section-title">事件回调</view>
			<view class="section-content control-panel">
				<view class="zx-theme-danger zx-rounded">
					<ZxCountdown 
						:time="10" 
						:returnTime="true" 
						@time="onTimeChange" 
						@end="onEnd"
						@start="onStart"
					/>
				</view>
				<view class="event-message">{{eventMessage}}</view>
			</view>
			<view class="section-desc">监听倒计时事件</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// 引用
const countdownRef = ref(null);
const manualStartRef = ref(null);
const eventMessage = ref('等待倒计时...');

// 计算目标时间戳（当前时间 + 2小时）
const targetTimestamp = computed(() => {
	return Date.now() + 2 * 60 * 60 * 1000;
});

// 控制方法
const handlePause = () => {
	countdownRef.value.pause();
};

const handleResume = () => {
	countdownRef.value.resume();
};

const handleStop = () => {
	countdownRef.value.stop();
};

const handleRestart = () => {
	countdownRef.value.restart();
};

const handleStart = () => {
	manualStartRef.value.start();
};

// 事件回调
const onTimeChange = (timeInfo) => {
	const { hour, minute, second, seconds } = timeInfo;
	eventMessage.value = `剩余: ${hour}:${minute}:${second} (总秒数:${seconds})`;
};

const onEnd = () => {
	eventMessage.value = '倒计时结束！';
};

const onStart = (timeInfo) => {
	eventMessage.value = '倒计时开始！';
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

.example-section {
	margin-bottom: 50rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #333;
	border-left: 8rpx solid #ff4757;
	padding-left: 15rpx;
}

.section-content {
	display: flex;
	justify-content: center;
	margin: 30rpx 0;
	min-height: 80rpx;
	align-items: center;
}

.section-desc {
	font-size: 24rpx;
	color: #666;
	line-height: 1.5;
}

.control-panel {
	flex-direction: column;
}

.btn-group {
	display: flex;
	margin-top: 20rpx;
	flex-wrap: wrap;
	justify-content: center;
}

.btn {
	margin: 10rpx;
	padding: 10rpx 20rpx;
	background-color: #3498db;
	color: white;
	border-radius: 8rpx;
	font-size: 24rpx;
	border: none;
}

.start-btn {
	background-color: #2ecc71;
	margin-top: 20rpx;
}

.event-message {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #333;
	padding: 10rpx;
	background-color: #ecf0f1;
	border-radius: 6rpx;
	min-width: 300rpx;
	text-align: center;
}

/* 主题和样式效果展示样式 */
.themes-showcase {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20rpx;
}

.theme-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10rpx;
}

.theme-label {
	font-size: 20rpx;
	color: #666;
	margin-bottom: 10rpx;
}
</style>
