<template>
	<view class="container">
		<view class="header">
			<text class="title">Dialog 对话框</text>
			<text class="description">在保留当前页面状态的情况下，告知用户并承载相关操作</text>
		</view>
		
		<view class="demo-section">
			<view class="section-title">基础用法</view>
			<view class="button-group">
				<zx-button @click="dialogVisible = true">打开对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">自定义内容</view>
			<view class="button-group">
				<zx-button @click="tableDialogVisible = true">打开表格对话框</zx-button>
				<zx-button @click="formDialogVisible = true">打开表单对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">自定义头部</view>
			<view class="button-group">
				<zx-button @click="customHeaderDialogVisible = true">自定义头部对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">嵌套对话框</view>
			<view class="button-group">
				<zx-button @click="outerDialogVisible = true">打开外层对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">居中对话框</view>
			<view class="button-group">
				<zx-button @click="centerDialogVisible = true">居中对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">可拖拽对话框</view>
			<view class="button-group">
				<zx-button @click="draggableDialogVisible = true">可拖拽对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">全屏对话框</view>
			<view class="button-group">
				<zx-button @click="fullscreenDialogVisible = true">全屏对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">提示对话框</view>
			<view class="button-group">
				<zx-button @click="tipsDialogVisible = true">提示对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">辅助函数</view>
			<view class="button-group">
				<zx-button @click="showConfirmDialog">显示确认对话框</zx-button>
				<zx-button @click="showAlertDialog">显示提示对话框</zx-button>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="section-title">中文风格对话框</view>
			<view class="button-group">
				<zx-button @click="chineseDialogVisible = true">中文风格对话框</zx-button>
			</view>
		</view>
		
		<!-- 基础对话框 -->
		<zx-dialog
			v-model="dialogVisible"
			title="提示"
			width="90%"
			:before-close="handleClose"
		>
			<view>这是一条消息提示</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="dialogVisible = false">取消</zx-button>
					<zx-button type="primary" @click="dialogVisible = false">确定</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 表格对话框 -->
		<zx-dialog
			v-model="tableDialogVisible"
			title="收货地址"
			width="90%"
		>
			<view class="table-container">
				<view class="table-header">
					<view class="table-cell" style="width: 150rpx;">日期</view>
					<view class="table-cell" style="width: 200rpx;">姓名</view>
					<view class="table-cell">地址</view>
				</view>
				<view class="table-row" v-for="(item, index) in tableData" :key="index">
					<view class="table-cell" style="width: 150rpx;">{{ item.date }}</view>
					<view class="table-cell" style="width: 200rpx;">{{ item.name }}</view>
					<view class="table-cell">{{ item.address }}</view>
				</view>
			</view>
		</zx-dialog>
		
		<!-- 表单对话框 -->
		<zx-dialog
			v-model="formDialogVisible"
			title="收货地址"
			width="90%"
		>
			<view class="form-container">
				<view class="form-item">
					<view class="form-label">活动名称</view>
					<input class="form-input" v-model="form.name" placeholder="请输入活动名称" />
				</view>
				<view class="form-item">
					<view class="form-label">活动区域</view>
					<picker class="form-picker" :range="regions" @change="handleRegionChange">
						<view class="picker-value">{{ form.region || '请选择活动区域' }}</view>
					</picker>
				</view>
			</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="formDialogVisible = false">取消</zx-button>
					<zx-button type="primary" @click="formDialogVisible = false">确定</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 自定义头部对话框 -->
		<zx-dialog
			v-model="customHeaderDialogVisible"
			:show-close="false"
			width="90%"
		>
			<template #header>
				<view class="custom-header">
					<text class="custom-title">自定义标题</text>
					<zx-button type="danger" size="small" @click="customHeaderDialogVisible = false">
						关闭
					</zx-button>
				</view>
			</template>
			<view>这是自定义头部的对话框内容</view>
		</zx-dialog>
		
		<!-- 嵌套对话框 -->
		<zx-dialog
			v-model="outerDialogVisible"
			title="外层对话框"
			width="90%"
		>
			<view>这是外层对话框的内容</view>
			<zx-button @click="innerDialogVisible = true">打开内层对话框</zx-button>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="outerDialogVisible = false">关闭</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<zx-dialog
			v-model="innerDialogVisible"
			title="内层对话框"
			width="70%"
		>
			<view>这是内层对话框的内容</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="innerDialogVisible = false">关闭</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 居中对话框 -->
		<zx-dialog
			v-model="centerDialogVisible"
			title="居中对话框"
			width="90%"
			center
		>
			<view>这是居中对话框的内容</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="centerDialogVisible = false">取消</zx-button>
					<zx-button type="primary" @click="centerDialogVisible = false">确定</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 可拖拽对话框 -->
		<zx-dialog
			v-model="draggableDialogVisible"
			title="可拖拽对话框"
			width="90%"
			draggable
		>
			<view>通过拖拽对话框头部可以移动对话框位置</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="draggableDialogVisible = false">关闭</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 全屏对话框 -->
		<zx-dialog
			v-model="fullscreenDialogVisible"
			title="全屏对话框"
			fullscreen
		>
			<view>这是全屏对话框的内容</view>
			<template #footer>
				<view class="dialog-footer">
					<zx-button @click="fullscreenDialogVisible = false">关闭</zx-button>
				</view>
			</template>
		</zx-dialog>
		
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
					<zx-button type="primary" @click="handleTipsConfirm">Confirm</zx-button>
				</view>
			</template>
		</zx-dialog>
		
		<!-- 中文风格对话框 -->
		<zx-dialog
			v-model="chineseDialogVisible"
			title="居中对话框"
			width="80%"
			center
		>
			<view class="chinese-content">
				这是居中对话框的内容
			</view>
			<template #footer>
				<view class="dialog-footer chinese-footer">
					<zx-button @click="chineseDialogVisible = false">取消</zx-button>
					<zx-button type="primary" @click="handleChineseConfirm">确定</zx-button>
				</view>
			</template>
		</zx-dialog>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { showConfirm, showAlert } from '../../../components/zx-dialog/showDialog.uni.js';

// 基础对话框
const dialogVisible = ref(false);

const handleClose = (done) => {
	// 模拟确认消息框
	uni.showModal({
		title: '提示',
		content: '确认关闭对话框吗？',
		success: (res) => {
			if (res.confirm) {
				done();
			}
		}
	});
};

// 表格对话框
const tableDialogVisible = ref(false);
const tableData = [
	{
		date: '2023-01-01',
		name: '张三',
		address: '上海市浦东新区陆家嘴'
	},
	{
		date: '2023-01-02',
		name: '李四',
		address: '北京市朝阳区望京'
	},
	{
		date: '2023-01-03',
		name: '王五',
		address: '广州市天河区珠江新城'
	},
	{
		date: '2023-01-04',
		name: '赵六',
		address: '深圳市南山区科技园'
	}
];

// 表单对话框
const formDialogVisible = ref(false);
const form = ref({
	name: '',
	region: ''
});
const regions = ['区域一', '区域二', '区域三'];

const handleRegionChange = (e) => {
	form.value.region = regions[e.detail.value];
};

// 自定义头部对话框
const customHeaderDialogVisible = ref(false);

// 嵌套对话框
const outerDialogVisible = ref(false);
const innerDialogVisible = ref(false);

// 居中对话框
const centerDialogVisible = ref(false);

// 可拖拽对话框
const draggableDialogVisible = ref(false);

// 全屏对话框
const fullscreenDialogVisible = ref(false);

// 提示对话框
const tipsDialogVisible = ref(false);

// 处理提示对话框确认
const handleTipsConfirm = () => {
	tipsDialogVisible.value = false;
	uni.showToast({
		title: '已确认',
		icon: 'success'
	});
};

// 使用工具函数显示确认对话框
const showConfirmDialog = async () => {
	try {
		const result = await showConfirm('您确定要执行此操作吗？', '确认操作');
		if (result) {
			uni.showToast({
				title: '已确认操作',
				icon: 'success'
			});
		} else {
			uni.showToast({
				title: '已取消操作',
				icon: 'none'
			});
		}
	} catch (error) {
		console.error('对话框出错:', error);
	}
};

// 使用工具函数显示提示对话框
const showAlertDialog = async () => {
	try {
		await showAlert('操作已完成！', '操作提示');
		uni.showToast({
			title: '已知晓',
			icon: 'success'
		});
	} catch (error) {
		console.error('对话框出错:', error);
	}
};

// 中文风格对话框
const chineseDialogVisible = ref(false);

// 处理中文风格对话框确认
const handleChineseConfirm = () => {
	chineseDialogVisible.value = false;
	uni.showToast({
		title: '已确认',
		icon: 'success'
	});
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
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		position: relative;
		padding-left: 20rpx;
		
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 10rpx;
			width: 8rpx;
			height: 32rpx;
			background-color: #2979ff;
			border-radius: 4rpx;
		}
	}
	
	.button-group {
		display: flex;
		flex-wrap: wrap;
		margin: 0 -10rpx;
		
		.zx-button {
			margin: 10rpx;
		}
	}
}

.dialog-footer {
	display: flex;
	justify-content: flex-end;
	gap: 20rpx;
}

.table-container {
	border: 1px solid #ebeef5;
	border-radius: 4px;
	overflow: hidden;
	
	.table-header {
		display: flex;
		background-color: #f5f7fa;
		border-bottom: 1px solid #ebeef5;
		
		.table-cell {
			padding: 20rpx;
			font-weight: bold;
		}
	}
	
	.table-row {
		display: flex;
		border-bottom: 1px solid #ebeef5;
		
		&:last-child {
			border-bottom: none;
		}
	}
	
	.table-cell {
		padding: 20rpx;
		flex: 1;
		text-align: left;
	}
}

.form-container {
	padding: 20rpx 0;
	
	.form-item {
		margin-bottom: 30rpx;
		
		.form-label {
			margin-bottom: 10rpx;
			font-size: 28rpx;
			color: #606266;
		}
		
		.form-input {
			width: 100%;
			height: 80rpx;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			padding: 0 20rpx;
			box-sizing: border-box;
		}
		
		.form-picker {
			width: 100%;
			height: 80rpx;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			padding: 0 20rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			
			.picker-value {
				font-size: 28rpx;
				color: #606266;
			}
		}
	}
}

.custom-header {
	padding: 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
	.custom-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #303133;
	}
}

.tips-content {
	padding: 20rpx;
}

.chinese-content {
	padding: 20rpx 0 30rpx;
	font-size: 30rpx;
	color: #333;
	text-align: center;
}

/* 中文风格对话框的按钮样式 */
:deep(.chinese-footer) {
	padding-bottom: 50rpx !important;
	
	.zx-button {
		width: 180rpx;
		height: 76rpx;
		font-size: 30rpx;
		border-radius: 6rpx;
		
		&:not([type="primary"]) {
			background-color: #f5f5f5;
			color: #333;
			border: none;
		}
		
		&[type="primary"] {
			background-color: #1989fa;
		}
	}
}
</style> 