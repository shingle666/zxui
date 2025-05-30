<template>
	<view class="container">
		<view class="header">
			<text class="title">中文风格对话框</text>
			<text class="description">完全符合截图样式的对话框</text>
		</view>
		
		<view class="demo-section">
			<view class="button-group">
				<zx-button @click="openChineseDialog">打开中文风格对话框</zx-button>
			</view>
		</view>
		
		<!-- 中文风格对话框 -->
		<zx-dialog
			v-model="chineseDialogVisible"
			title="居中对话框"
			width="80%"
			:show-close="true"
			center
		>
			<view class="chinese-content">
				这是居中对话框的内容
			</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="chineseDialogVisible = false">取消</zx-button>
					<zx-button type="primary" @click="handleConfirm">确定</zx-button>
				</view>
			</template>
		</zx-dialog>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 对话框状态
const chineseDialogVisible = ref(false);

// 打开对话框
const openChineseDialog = () => {
	chineseDialogVisible.value = true;
};

// 处理确认按钮点击
const handleConfirm = () => {
	// 这里可以添加确认操作的逻辑
	uni.showToast({
		title: '已确认',
		icon: 'success'
	});
	chineseDialogVisible.value = false;
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

.chinese-content {
	padding: 20rpx 0 30rpx;
	font-size: 30rpx;
	color: #333;
	text-align: center;
}

/* 自定义按钮样式，完全符合截图 */
:deep(.dialog-footer) {
	padding-bottom: 50rpx !important;
	
	.zx-button {
		width: 180rpx;
		height: 76rpx;
		font-size: 30rpx;
		border-radius: 6rpx;
		
		&:not([type="primary"]) {
			background-color: #f5f5f5;
			color: #333;
		}
		
		&[type="primary"] {
			background-color: #1989fa;
		}
	}
}
</style> 