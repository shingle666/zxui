<template>
	<view class="container">
		<view class="header">
			<text class="title">提示对话框</text>
			<text class="description">简洁的消息提示对话框</text>
		</view>
		
		<view class="demo-section">
			<view class="button-group">
				<zx-button @click="openTipsDialog">打开提示对话框</zx-button>
			</view>
		</view>
		
		<!-- 提示对话框 -->
		<zx-dialog
			v-model="tipsDialogVisible"
			title="Tips"
			width="80%"
			:show-close="true"
		>
			<view class="tips-content">
				This is a message
			</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="tipsDialogVisible = false">Cancel</zx-button>
					<zx-button type="primary" @click="handleConfirm">Confirm</zx-button>
				</view>
			</template>
		</zx-dialog>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 提示对话框状态
const tipsDialogVisible = ref(false);

// 打开提示对话框
const openTipsDialog = () => {
	tipsDialogVisible.value = true;
};

// 处理确认按钮点击
const handleConfirm = () => {
	// 这里可以添加确认操作的逻辑
	uni.showToast({
		title: '已确认',
		icon: 'success'
	});
	tipsDialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.header {
	margin-bottom: 40rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.description {
		font-size: 28rpx;
		color: #666;
		line-height: 1.5;
	}
}

.demo-section {
	margin-bottom: 40rpx;
	
	.button-group {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 40rpx 0;
	}
}

.tips-content {
	padding: 20rpx 0;
	font-size: 30rpx;
	color: #333;
}

/* 注意：以下样式会通过 zx-dialog 组件内部的样式处理 */
.dialog-footer {
	display: flex;
	justify-content: center;
	gap: 30rpx;
}
</style> 