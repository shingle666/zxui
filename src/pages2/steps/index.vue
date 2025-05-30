<template>
	<view class="demo-container">
		<view class="page-header">
			<text class="page-title">zx-steps 步骤条组件</text>
			<text class="page-desc">基于 Element Plus Steps 组件设计的 uni-app 步骤条组件</text>
		</view>

		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="demo-title">基础用法</view>
			<view class="demo-desc">简单的步骤条。</view>
			<zx-steps :active="active1" finish-status="success">
				<zx-step title="步骤 1"></zx-step>
				<zx-step title="步骤 2"></zx-step>
				<zx-step title="步骤 3"></zx-step>
			</zx-steps>
			<view class="demo-controls">
				<button @click="next1" class="demo-btn">下一步</button>
			</view>
		</view>

		<!-- 含状态的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">含状态的步骤条</view>
			<view class="demo-desc">每一步骤显示出该步骤的状态。</view>
			<zx-steps :active="1" :space="200" finish-status="success">
				<zx-step title="已完成"></zx-step>
				<zx-step title="处理中"></zx-step>
				<zx-step title="步骤 3"></zx-step>
			</zx-steps>
		</view>

		<!-- 居中的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">居中的步骤条</view>
			<view class="demo-desc">标题和描述可以居中。</view>
			<zx-steps :active="2" align-center>
				<zx-step title="步骤 1" description="这是一段描述文字"></zx-step>
				<zx-step title="步骤 2" description="这是一段描述文字"></zx-step>
				<zx-step title="步骤 3" description="这是一段描述文字"></zx-step>
			</zx-steps>
		</view>

		<!-- 带描述的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">带描述的步骤条</view>
			<view class="demo-desc">每个步骤都有详细的描述。</view>
			<zx-steps :active="1">
				<zx-step title="步骤 1" description="这里是步骤 1 的详细描述，可以很长很长"></zx-step>
				<zx-step title="步骤 2" description="这里是步骤 2 的详细描述，可以很长很长"></zx-step>
				<zx-step title="步骤 3" description="这里是步骤 3 的详细描述，可以很长很长"></zx-step>
			</zx-steps>
		</view>

		<!-- 带图标的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">带图标的步骤条</view>
			<view class="demo-desc">可以在步骤栏中使用自定义图标。</view>
			<zx-steps :active="1">
				<zx-step title="步骤 1" icon="✏️"></zx-step>
				<zx-step title="步骤 2" icon="⬆️"></zx-step>
				<zx-step title="步骤 3" icon="🖼️"></zx-step>
			</zx-steps>
		</view>

		<!-- 垂直的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">垂直的步骤条</view>
			<view class="demo-desc">垂直方向的步骤条。</view>
			<view style="height: 300px;">
				<zx-steps direction="vertical" :active="active2">
					<zx-step title="步骤 1" description="这是一段描述文字"></zx-step>
					<zx-step title="步骤 2" description="这是一段描述文字"></zx-step>
					<zx-step title="步骤 3" description="这是一段描述文字"></zx-step>
				</zx-steps>
			</view>
			<view class="demo-controls">
				<button @click="next2" class="demo-btn">下一步</button>
			</view>
		</view>

		<!-- 简洁风格的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">简洁风格的步骤条</view>
			<view class="demo-desc">简洁风格的步骤条。</view>
			<zx-steps :active="active3" simple>
				<zx-step title="步骤 1"></zx-step>
				<zx-step title="步骤 2"></zx-step>
				<zx-step title="步骤 3"></zx-step>
			</zx-steps>
			<view class="demo-controls">
				<button @click="next3" class="demo-btn">下一步</button>
			</view>
		</view>

		<!-- 可控制的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">可控制的步骤条</view>
			<view class="demo-desc">可以手动控制步骤的跳转。</view>
			<zx-steps :active="active4" finish-status="success">
				<zx-step title="步骤 1"></zx-step>
				<zx-step title="步骤 2"></zx-step>
				<zx-step title="步骤 3"></zx-step>
				<zx-step title="步骤 4"></zx-step>
			</zx-steps>
			<view class="demo-controls">
				<button @click="prev4" class="demo-btn" :disabled="active4 <= 0">上一步</button>
				<button @click="next4" class="demo-btn" :disabled="active4 >= 3">下一步</button>
				<button @click="reset4" class="demo-btn">重置</button>
			</view>
		</view>

		<!-- 不同状态的步骤条 -->
		<view class="demo-section">
			<view class="demo-title">不同状态的步骤条</view>
			<view class="demo-desc">展示不同状态的步骤。</view>
			<zx-steps :active="2">
				<zx-step title="成功" status="success"></zx-step>
				<zx-step title="错误" status="error"></zx-step>
				<zx-step title="处理中" status="process"></zx-step>
				<zx-step title="等待中" status="wait"></zx-step>
			</zx-steps>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const active1 = ref(0);
const next1 = () => {
	active1.value = (active1.value + 1) % 4;
};

// 垂直步骤条
const active2 = ref(0);
const next2 = () => {
	active2.value = (active2.value + 1) % 4;
};

// 简洁模式
const active3 = ref(0);
const next3 = () => {
	active3.value = (active3.value + 1) % 4;
};

// 可控制的步骤条
const active4 = ref(0);
const next4 = () => {
	if (active4.value < 3) {
		active4.value++;
	}
};
const prev4 = () => {
	if (active4.value > 0) {
		active4.value--;
	}
};
const reset4 = () => {
	active4.value = 0;
};
</script>

<style>
.demo-container {
	padding: 20rpx;
}

.page-header {
	margin-bottom: 40rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 8rpx;
	display: block;
}

.page-desc {
	font-size: 28rpx;
	color: #606266;
	display: block;
}

.demo-section {
	margin-bottom: 50rpx;
	border-bottom: 1px solid #ebeef5;
	padding-bottom: 30rpx;
}

.demo-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 8rpx;
}

.demo-desc {
	font-size: 26rpx;
	color: #606266;
	margin-bottom: 20rpx;
}

.demo-controls {
	margin-top: 30rpx;
	display: flex;
	flex-wrap: wrap;
}

.demo-btn {
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	font-size: 26rpx;
	padding: 8rpx 16rpx;
}

.demo-btn[disabled] {
	opacity: 0.6;
}
</style> 