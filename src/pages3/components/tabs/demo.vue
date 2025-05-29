<template>
	<view class="demo-container">
		<view class="demo-section">
			<view class="demo-title">基础用法</view>
			<zx-tabs v-model="activeTab1" @tab-click="handleTabClick">
				<zx-tab-pane label="用户管理" name="user">
					<view class="pane-content">用户管理内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="配置管理" name="config">
					<view class="pane-content">配置管理内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="角色管理" name="role">
					<view class="pane-content">角色管理内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="任务管理" name="task" disabled>
					<view class="pane-content">任务管理内容</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">卡片风格</view>
			<zx-tabs v-model="activeTab2" type="card">
				<zx-tab-pane label="首页" name="home">
					<view class="pane-content">首页内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="产品" name="product">
					<view class="pane-content">产品内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="关于" name="about">
					<view class="pane-content">关于内容</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">边框卡片风格</view>
			<zx-tabs v-model="activeTab3" type="border-card">
				<zx-tab-pane label="订单" name="order">
					<view class="pane-content">订单管理</view>
				</zx-tab-pane>
				<zx-tab-pane label="商品" name="goods">
					<view class="pane-content">商品管理</view>
				</zx-tab-pane>
				<zx-tab-pane label="库存" name="stock">
					<view class="pane-content">库存管理</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">位置设置</view>
			<view class="position-controls">
				<button 
					v-for="pos in positions" 
					:key="pos" 
					@click="tabPosition = pos"
					:class="{ active: tabPosition === pos }"
					class="position-btn"
				>
					{{ pos }}
				</button>
			</view>
			<zx-tabs v-model="activeTab4" :tab-position="tabPosition" style="height: 300px;">
				<zx-tab-pane label="标签一" name="tab1">
					<view class="pane-content">标签一的内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="标签二" name="tab2">
					<view class="pane-content">标签二的内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="标签三" name="tab3">
					<view class="pane-content">标签三的内容</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">动态增减标签页</view>
			<zx-tabs 
				v-model="activeTab5" 
				type="card" 
				editable
				@tab-remove="handleTabRemove"
				@tab-add="handleTabAdd"
			>
				<zx-tab-pane 
					v-for="tab in editableTabs" 
					:key="tab.name"
					:label="tab.title" 
					:name="tab.name"
					:closable="tab.closable"
				>
					<view class="pane-content">{{ tab.content }}</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">自定义标签内容</view>
			<zx-tabs v-model="activeTab6" type="border-card">
				<template #tab-calendar>
					<view class="custom-tab">
						<text class="iconfont">📅</text>
						<text>日历</text>
					</view>
				</template>
				<zx-tab-pane label="配置" name="calendar">
					<view class="pane-content">日历内容</view>
				</zx-tab-pane>
				<zx-tab-pane label="设置" name="setting">
					<view class="pane-content">设置内容</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">使用数据驱动</view>
			<zx-tabs v-model="activeTab7" :tabs="tabsData" @tab-click="handleTabClick">
				<view class="pane-content">
					当前选中：{{ activeTab7 }}
				</view>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">延迟渲染</view>
			<zx-tabs v-model="activeTab8">
				<zx-tab-pane label="即时渲染" name="instant">
					<view class="pane-content">这个标签页会立即渲染</view>
				</zx-tab-pane>
				<zx-tab-pane label="延迟渲染" name="lazy" lazy>
					<view class="pane-content">这个标签页只有在激活时才会渲染</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 基础用法
const activeTab1 = ref('user');

// 卡片风格
const activeTab2 = ref('home');

// 边框卡片
const activeTab3 = ref('order');

// 位置设置
const activeTab4 = ref('tab1');
const tabPosition = ref('top');
const positions = ['top', 'right', 'bottom', 'left'];

// 动态增减
const activeTab5 = ref('2');
let tabIndex = 2;
const editableTabs = reactive([
	{
		title: '标签页 1',
		name: '1',
		content: '标签页 1 的内容',
		closable: true
	},
	{
		title: '标签页 2',
		name: '2',
		content: '标签页 2 的内容',
		closable: true
	}
]);

// 自定义标签内容
const activeTab6 = ref('calendar');

// 数据驱动
const activeTab7 = ref('option1');
const tabsData = reactive([
	{ name: 'option1', label: '选项一', disabled: false },
	{ name: 'option2', label: '选项二', disabled: false },
	{ name: 'option3', label: '选项三', disabled: true },
	{ name: 'option4', label: '选项四', disabled: false }
]);

// 延迟渲染
const activeTab8 = ref('instant');

// 事件处理
const handleTabClick = (data) => {
	console.log('标签页点击:', data);
	uni.showToast({
		title: `切换到: ${data.tab.label || data.tab.name}`,
		icon: 'none'
	});
};

const handleTabRemove = (targetName) => {
	const tabs = editableTabs;
	let activeName = activeTab5.value;
	
	if (activeName === targetName) {
		tabs.forEach((tab, index) => {
			if (tab.name === targetName) {
				const nextTab = tabs[index + 1] || tabs[index - 1];
				if (nextTab) {
					activeName = nextTab.name;
				}
			}
		});
	}
	
	activeTab5.value = activeName;
	editableTabs.splice(editableTabs.findIndex(tab => tab.name === targetName), 1);
};

const handleTabAdd = () => {
	const newTabName = `${++tabIndex}`;
	editableTabs.push({
		title: `新标签页 ${tabIndex}`,
		name: newTabName,
		content: `新标签页 ${tabIndex} 的内容`,
		closable: true
	});
	activeTab5.value = newTabName;
};
</script>

<style scoped>
.demo-container {
	padding: 40rpx;
	background-color: #f5f7fa;
	min-height: 100vh;
}

.demo-section {
	margin-bottom: 60rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 30rpx;
	padding-bottom: 20rpx;
	border-bottom: 2rpx solid #e4e7ed;
}

.pane-content {
	padding: 40rpx;
	font-size: 28rpx;
	color: #606266;
	text-align: center;
	background-color: #f9f9f9;
	border-radius: 8rpx;
	margin: 20rpx 0;
}

.position-controls {
	display: flex;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.position-btn {
	padding: 16rpx 32rpx;
	border: 2rpx solid #dcdfe6;
	border-radius: 8rpx;
	background-color: #fff;
	color: #606266;
	font-size: 24rpx;
	transition: all 0.3s ease;
}

.position-btn.active {
	border-color: #409eff;
	color: #409eff;
	background-color: #ecf5ff;
}

.custom-tab {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.custom-tab .iconfont {
	font-size: 32rpx;
}
</style> 