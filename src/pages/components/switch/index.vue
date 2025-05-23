<template>
	<view class="container">
		<zx-nav-bar title="Switch 开关" :border="false"></zx-nav-bar>
		
		<view class="demo-wrap">
			<!-- 基础用法 -->
			<view class="demo-section">
				<view class="demo-title">基础用法</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">默认开关</view>
						<zx-switch v-model="basicValue" @change="handleBasicChange" />
					</view>
					<view class="demo-item">
						<view class="item-label">预设开启</view>
						<zx-switch v-model="basicValue2" />
					</view>
				</view>
			</view>
			
			<!-- 不同尺寸 -->
			<view class="demo-section">
				<view class="demo-title">不同尺寸</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">大尺寸</view>
						<zx-switch v-model="sizeValue" size="large" />
					</view>
					<view class="demo-item">
						<view class="item-label">默认尺寸</view>
						<zx-switch v-model="sizeValue" size="default" />
					</view>
					<view class="demo-item">
						<view class="item-label">小尺寸</view>
						<zx-switch v-model="sizeValue" size="small" />
					</view>
					<view class="demo-item">
						<view class="item-label">自定义尺寸 (35rpx)</view>
						<zx-switch v-model="sizeValue" :size="35" />
					</view>
				</view>
			</view>
			
			<!-- 自定义颜色 -->
			<view class="demo-section">
				<view class="demo-title">自定义颜色</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">绿色主题</view>
						<zx-switch v-model="colorValue1" active-color="#13ce66" inactive-color="#ff4949" />
					</view>
					<view class="demo-item">
						<view class="item-label">紫色主题</view>
						<zx-switch v-model="colorValue2" active-color="#8e44ad" inactive-color="#ecf0f1" />
					</view>
					<view class="demo-item">
						<view class="item-label">橙色主题</view>
						<zx-switch v-model="colorValue3" active-color="#f39c12" inactive-color="#bdc3c7" />
					</view>
				</view>
			</view>
			
			<!-- 文字显示 -->
			<view class="demo-section">
				<view class="demo-title">文字显示</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">中文文字</view>
						<zx-switch 
							v-model="textValue1" 
							:show-text="true"
							active-text="开"
							inactive-text="关"
							size="large"
						/>
					</view>
					<view class="demo-item">
						<view class="item-label">英文文字</view>
						<zx-switch 
							v-model="textValue2" 
							:show-text="true"
							active-text="ON"
							inactive-text="OFF"
							size="large"
							text-color="#333"
						/>
					</view>
					<view class="demo-item">
						<view class="item-label">自定义文字</view>
						<zx-switch 
							v-model="textValue3" 
							:show-text="true"
							active-text="✓"
							inactive-text="✗"
							size="large"
							active-color="#27ae60"
							inactive-color="#e74c3c"
						/>
					</view>
				</view>
			</view>
			
			<!-- 禁用状态 -->
			<view class="demo-section">
				<view class="demo-title">禁用状态</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">禁用关闭</view>
						<zx-switch v-model="disabledValue1" :disabled="true" />
					</view>
					<view class="demo-item">
						<view class="item-label">禁用开启</view>
						<zx-switch v-model="disabledValue2" :disabled="true" />
					</view>
				</view>
			</view>
			
			<!-- 加载状态 -->
			<view class="demo-section">
				<view class="demo-title">加载状态</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">加载中</view>
						<zx-switch v-model="loadingValue" :loading="true" />
					</view>
					<view class="demo-item">
						<view class="item-label">异步切换 {{ asyncLoading ? '(请等待...)' : '' }}</view>
						<zx-switch v-model="asyncValue" :loading="asyncLoading" @change="handleAsyncChange" />
					</view>
				</view>
			</view>
			
			<!-- 自定义值 -->
			<view class="demo-section">
				<view class="demo-title">自定义值</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">数字值 (当前: {{ customNumberValue }})</view>
						<zx-switch v-model="customNumberValue" :active-value="1" :inactive-value="0" />
					</view>
					<view class="demo-item">
						<view class="item-label">字符串值 (当前: {{ customStringValue }})</view>
						<zx-switch v-model="customStringValue" active-value="yes" inactive-value="no" />
					</view>
					<view class="demo-item">
						<view class="item-label">状态值 (当前: {{ statusValue }})</view>
						<zx-switch v-model="statusValue" active-value="enabled" inactive-value="disabled" />
					</view>
				</view>
			</view>
			
			<!-- 切换前确认 -->
			<view class="demo-section">
				<view class="demo-title">切换前确认</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">需要确认</view>
						<zx-switch v-model="confirmValue" :before-change="beforeChange" />
					</view>
					<view class="demo-item">
						<view class="item-label">异步确认</view>
						<zx-switch v-model="asyncConfirmValue" :before-change="asyncBeforeChange" />
					</view>
				</view>
			</view>
			
			<!-- 组合示例 -->
			<view class="demo-section">
				<view class="demo-title">组合示例</view>
				<view class="demo-content">
					<view class="demo-item">
						<view class="item-label">通知推送</view>
						<zx-switch 
							v-model="notificationValue" 
							size="large"
							:show-text="true"
							active-text="开启"
							inactive-text="关闭"
							active-color="#07c160"
							:before-change="notificationBeforeChange"
							aria-label="通知推送开关"
						/>
					</view>
					<view class="demo-item">
						<view class="item-label">深色模式</view>
						<zx-switch 
							v-model="darkModeValue" 
							size="large"
							active-color="#2c3e50"
							inactive-color="#ecf0f1"
						/>
					</view>
					<view class="demo-item">
						<view class="item-label">数据同步 {{ syncLoading ? '(同步中...)' : '' }}</view>
						<zx-switch 
							v-model="syncValue" 
							:loading="syncLoading"
							@change="handleSyncChange"
							active-color="#3498db"
						/>
					</view>
				</view>
			</view>
			
			<!-- 状态展示 -->
			<view class="demo-section">
				<view class="demo-title">当前状态</view>
				<view class="demo-content">
					<view class="status-grid">
						<view class="status-item">
							<text class="status-label">基础开关:</text>
							<text class="status-value">{{ basicValue ? '开启' : '关闭' }}</text>
						</view>
						<view class="status-item">
							<text class="status-label">自定义值:</text>
							<text class="status-value">{{ customNumberValue }}</text>
						</view>
						<view class="status-item">
							<text class="status-label">字符串值:</text>
							<text class="status-value">{{ customStringValue }}</text>
						</view>
						<view class="status-item">
							<text class="status-label">通知状态:</text>
							<text class="status-value">{{ notificationValue ? '已开启' : '已关闭' }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 页面标题
uni.setNavigationBarTitle({
	title: 'Switch 开关'
});

// 基础用法
const basicValue = ref(false);
const basicValue2 = ref(true);

// 不同尺寸
const sizeValue = ref(true);

// 自定义颜色
const colorValue1 = ref(true);
const colorValue2 = ref(false);
const colorValue3 = ref(true);

// 文字显示
const textValue1 = ref(true);
const textValue2 = ref(false);
const textValue3 = ref(true);

// 禁用状态
const disabledValue1 = ref(false);
const disabledValue2 = ref(true);

// 加载状态
const loadingValue = ref(true);
const asyncValue = ref(false);
const asyncLoading = ref(false);

// 自定义值
const customNumberValue = ref(0);
const customStringValue = ref('no');
const statusValue = ref('disabled');

// 切换前确认
const confirmValue = ref(false);
const asyncConfirmValue = ref(false);

// 组合示例
const notificationValue = ref(false);
const darkModeValue = ref(false);
const syncValue = ref(false);
const syncLoading = ref(false);

// 处理基础change事件
const handleBasicChange = (value) => {
	console.log('基础开关状态改变：', value);
	uni.showToast({
		title: `开关${value ? '开启' : '关闭'}`,
		icon: 'none',
		duration: 1500
	});
};

// 处理异步切换
const handleAsyncChange = async (value) => {
	asyncLoading.value = true;
	
	// 模拟异步请求
	try {
		await new Promise(resolve => setTimeout(resolve, 2000));
		uni.showToast({
			title: '切换成功',
			icon: 'success'
		});
	} catch (error) {
		uni.showToast({
			title: '切换失败',
			icon: 'error'
		});
	} finally {
		asyncLoading.value = false;
	}
};

// 切换前确认
const beforeChange = () => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '确认操作',
			content: '确定要切换开关状态吗？',
			confirmText: '确定',
			cancelText: '取消',
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

// 异步切换前确认
const asyncBeforeChange = () => {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '异步确认',
			content: '这是一个异步确认示例，将模拟网络请求...',
			confirmText: '确定',
			cancelText: '取消',
			success: async (res) => {
				if (res.confirm) {
					uni.showLoading({
						title: '验证中...'
					});
					
					// 模拟异步验证
					try {
						await new Promise(resolve => setTimeout(resolve, 1500));
						uni.hideLoading();
						resolve(true);
					} catch (error) {
						uni.hideLoading();
						uni.showToast({
							title: '验证失败',
							icon: 'error'
						});
						reject(false);
					}
				} else {
					reject(false);
				}
			}
		});
	});
};

// 通知推送切换前确认
const notificationBeforeChange = () => {
	return new Promise((resolve, reject) => {
		if (!notificationValue.value) {
			// 开启通知时需要确认
			uni.showModal({
				title: '开启通知',
				content: '开启后将接收到推送通知，是否继续？',
				confirmText: '开启',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						resolve(true);
					} else {
						reject(false);
					}
				}
			});
		} else {
			// 关闭时直接允许
			resolve(true);
		}
	});
};

// 处理数据同步
const handleSyncChange = async (value) => {
	syncLoading.value = true;
	
	try {
		// 模拟同步操作
		await new Promise(resolve => setTimeout(resolve, 3000));
		
		uni.showToast({
			title: value ? '同步已开启' : '同步已关闭',
			icon: 'success'
		});
	} catch (error) {
		uni.showToast({
			title: '操作失败',
			icon: 'error'
		});
	} finally {
		syncLoading.value = false;
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f8f9fa;
	min-height: 100vh;
}

.demo-wrap {
	padding: 30rpx;
}

.demo-section {
	background-color: #ffffff;
	border-radius: 20rpx;
	margin-bottom: 30rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 20rpx rgba(0, 0, 0, 0.06);
}

.demo-title {
	padding: 30rpx 30rpx 20rpx;
	font-size: 32rpx;
	font-weight: 600;
	color: #2c3e50;
	border-bottom: 1rpx solid #f0f2f5;
	position: relative;
	
	&::before {
		content: '';
		position: absolute;
		left: 30rpx;
		bottom: 0;
		width: 60rpx;
		height: 4rpx;
		background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
		border-radius: 2rpx;
	}
}

.demo-content {
	padding: 20rpx 30rpx 30rpx;
}

.demo-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 25rpx 0;
	border-bottom: 1rpx solid #f5f7fa;
	
	&:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
}

.item-label {
	font-size: 28rpx;
	color: #606266;
	font-weight: 500;
}

.status-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.status-item {
	padding: 20rpx;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	border-radius: 12rpx;
	text-align: center;
}

.status-label {
	display: block;
	font-size: 24rpx;
	color: #909399;
	margin-bottom: 8rpx;
}

.status-value {
	display: block;
	font-size: 28rpx;
	color: #303133;
	font-weight: 600;
}

/* 响应式布局 */
@media (max-width: 750rpx) {
	.demo-wrap {
		padding: 20rpx;
	}
	
	.demo-title {
		font-size: 30rpx;
		padding: 25rpx 25rpx 15rpx;
	}
	
	.demo-content {
		padding: 15rpx 25rpx 25rpx;
	}
	
	.status-grid {
		grid-template-columns: 1fr;
	}
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	.container {
		background-color: #1a1a1a;
	}
	
	.demo-section {
		background-color: #2d2d2d;
		border: 1rpx solid #404040;
	}
	
	.demo-title {
		color: #e5e5e5;
		border-bottom-color: #404040;
	}
	
	.item-label {
		color: #c0c4cc;
	}
	
	.demo-item {
		border-bottom-color: #404040;
	}
	
	.status-item {
		background: linear-gradient(135deg, #404040 0%, #2d2d2d 100%);
	}
	
	.status-label {
		color: #909399;
	}
	
	.status-value {
		color: #e5e5e5;
	}
}
</style>
