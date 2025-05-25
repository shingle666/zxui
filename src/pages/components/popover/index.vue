<template>
	<view class="container">
		<view class="header">
			<view class="title">Popover 弹出框</view>
			<view class="subtitle">弹出框是在元素旁边显示浮层，支持不同的触发方式和位置</view>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<view class="popover-item">
					<zx-popover
						content="这是弹出框内容"
						title="标题"
						placement="top"
					>
						<template #reference>
							<button class="popover-button">hover触发</button>
						</template>
					</zx-popover>
				</view>
				
				<view class="popover-item">
					<zx-popover
						content="这是弹出框内容"
						title="标题"
						placement="bottom"
						trigger="click"
					>
						<template #reference>
							<button class="popover-button">click触发</button>
						</template>
					</zx-popover>
				</view>
				
				<view class="popover-item">
					<zx-popover
						content="这是弹出框内容"
						title="标题"
						placement="right"
						trigger="focus"
					>
						<template #reference>
							<button class="popover-button">focus触发</button>
						</template>
					</zx-popover>
				</view>
				
				<view class="popover-item">
					<zx-popover
						content="这是弹出框内容"
						title="标题"
						placement="left"
						trigger="contextmenu"
					>
						<template #reference>
							<button class="popover-button">contextmenu触发</button>
						</template>
					</zx-popover>
				</view>
				
				<view class="popover-item">
					<zx-popover
						content="这是弹出框内容"
						title="标题"
						placement="top"
						trigger="manual"
						:show="showManual"
					>
						<template #reference>
							<button class="popover-button" @click="showManual = !showManual">
								手动触发 ({{ showManual ? '显示' : '隐藏' }})
							</button>
						</template>
					</zx-popover>
				</view>
			</view>
		</view>
		
		<!-- 不同位置 -->
		<view class="section">
			<view class="section-title">不同位置</view>
			<view class="section-content">
				<view class="positions-wrapper">
					<view class="positions-row">
						<zx-popover
							content="top-start"
							placement="top-start"
						>
							<template #reference>
								<button class="position-button">top-start</button>
							</template>
						</zx-popover>
						
						<zx-popover
							content="top"
							placement="top"
						>
							<template #reference>
								<button class="position-button">top</button>
							</template>
						</zx-popover>
						
						<zx-popover
							content="top-end"
							placement="top-end"
						>
							<template #reference>
								<button class="position-button">top-end</button>
							</template>
						</zx-popover>
					</view>
					
					<view class="positions-column">
						<view class="positions-left">
							<zx-popover
								content="left-start"
								placement="left-start"
							>
								<template #reference>
									<button class="position-button">left-start</button>
								</template>
							</zx-popover>
							
							<zx-popover
								content="left"
								placement="left"
							>
								<template #reference>
									<button class="position-button">left</button>
								</template>
							</zx-popover>
							
							<zx-popover
								content="left-end"
								placement="left-end"
							>
								<template #reference>
									<button class="position-button">left-end</button>
								</template>
							</zx-popover>
						</view>
						
						<view class="positions-right">
							<zx-popover
								content="right-start"
								placement="right-start"
							>
								<template #reference>
									<button class="position-button">right-start</button>
								</template>
							</zx-popover>
							
							<zx-popover
								content="right"
								placement="right"
							>
								<template #reference>
									<button class="position-button">right</button>
								</template>
							</zx-popover>
							
							<zx-popover
								content="right-end"
								placement="right-end"
							>
								<template #reference>
									<button class="position-button">right-end</button>
								</template>
							</zx-popover>
						</view>
					</view>
					
					<view class="positions-row">
						<zx-popover
							content="bottom-start"
							placement="bottom-start"
						>
							<template #reference>
								<button class="position-button">bottom-start</button>
							</template>
						</zx-popover>
						
						<zx-popover
							content="bottom"
							placement="bottom"
						>
							<template #reference>
								<button class="position-button">bottom</button>
							</template>
						</zx-popover>
						
						<zx-popover
							content="bottom-end"
							placement="bottom-end"
						>
							<template #reference>
								<button class="position-button">bottom-end</button>
							</template>
						</zx-popover>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 主题 -->
		<view class="section">
			<view class="section-title">主题</view>
			<view class="section-content">
				<view class="popover-item">
					<zx-popover
						content="浅色主题"
						title="Light"
						effect="light"
					>
						<template #reference>
							<button class="popover-button light">浅色主题</button>
						</template>
					</zx-popover>
				</view>
				
				<view class="popover-item">
					<zx-popover
						content="深色主题"
						title="Dark"
						effect="dark"
					>
						<template #reference>
							<button class="popover-button dark">深色主题</button>
						</template>
					</zx-popover>
				</view>
			</view>
		</view>
		
		<!-- 自定义内容 -->
		<view class="section">
			<view class="section-title">自定义内容</view>
			<view class="section-content">
				<zx-popover
					placement="right"
					trigger="click"
					width="400"
				>
					<template #reference>
						<button class="popover-button">自定义内容</button>
					</template>
					
					<view class="custom-content">
						<view class="custom-title">自定义标题</view>
						<view class="custom-body">
							<view class="custom-item">
								<text>可以自定义任意内容</text>
							</view>
							<view class="custom-item">
								<text>例如表单、按钮等</text>
							</view>
							<view class="custom-footer">
								<button class="custom-button confirm" @click="handleConfirm">确认</button>
								<button class="custom-button cancel" @click="handleCancel">取消</button>
							</view>
						</view>
					</view>
				</zx-popover>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * popover 示例
 */
import { ref } from 'vue';

// 手动控制显示
const showManual = ref(false);

// 自定义内容的操作
const handleConfirm = () => {
	uni.showToast({
		title: '点击了确认',
		icon: 'none'
	});
};

const handleCancel = () => {
	uni.showToast({
		title: '点击了取消',
		icon: 'none'
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
		font-size: 40rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #666;
	}
}

.section {
	margin-bottom: 60rpx;
	
	.section-title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
		position: relative;
		padding-left: 20rpx;
		
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 10rpx;
			width: 8rpx;
			height: 30rpx;
			background-color: #409eff;
		}
	}
	
	.section-content {
		padding: 20rpx;
		background-color: #f5f7fa;
		border-radius: 10rpx;
		display: flex;
		flex-wrap: wrap;
	}
}

.popover-item {
	margin: 20rpx;
}

.popover-button {
	min-width: 200rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #409eff;
	color: #fff;
	border-radius: 8rpx;
	font-size: 28rpx;
	
	&.light {
		background-color: #ecf5ff;
		color: #409eff;
		border: 1px solid #d9ecff;
	}
	
	&.dark {
		background-color: #303133;
	}
}

.positions-wrapper {
	width: 100%;
	padding: 20rpx;
	
	.positions-row {
		display: flex;
		justify-content: center;
		margin: 20rpx 0;
		
		.position-button {
			margin: 0 10rpx;
			min-width: 180rpx;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #67c23a;
			color: #fff;
			border-radius: 8rpx;
			font-size: 24rpx;
			text-align: center;
		}
	}
	
	.positions-column {
		display: flex;
		justify-content: space-between;
		margin: 100rpx 0;
		
		.positions-left, .positions-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 300rpx;
			
			.position-button {
				min-width: 180rpx;
				height: 70rpx;
				line-height: 70rpx;
				background-color: #67c23a;
				color: #fff;
				border-radius: 8rpx;
				font-size: 24rpx;
				text-align: center;
			}
		}
	}
}

.custom-content {
	padding: 10rpx;
	
	.custom-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		color: #303133;
	}
	
	.custom-body {
		.custom-item {
			padding: 10rpx 0;
			font-size: 28rpx;
			color: #606266;
		}
		
		.custom-footer {
			display: flex;
			justify-content: flex-end;
			margin-top: 20rpx;
			
			.custom-button {
				min-width: 120rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-size: 24rpx;
				border-radius: 6rpx;
				margin-left: 20rpx;
				
				&.confirm {
					background-color: #409eff;
					color: #fff;
				}
				
				&.cancel {
					background-color: #f5f7fa;
					color: #606266;
					border: 1px solid #dcdfe6;
				}
			}
		}
	}
}
</style> 