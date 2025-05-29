<template>
	<view class="demo-container">
		<view class="page-header">
			<text class="page-title">zx-tabs 标签页组件</text>
			<text class="page-desc">基于 Element Plus Tabs 组件设计的 uni-app 标签页组件</text>
		</view>

		<view class="demo-section">
			<view class="demo-title">基础用法</view>
			<view class="demo-desc">基础的、简洁的标签页。默认选中第一个标签页。</view>
			<zx-tabs v-model="activeTab1" @tab-click="handleTabClick">
				<zx-tab-pane label="用户管理" name="user">
					<view class="pane-content">
						<text class="content-title">用户管理</text>
						<text class="content-text">这里是用户管理的内容，包含用户列表、权限设置等功能。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="配置管理" name="config">
					<view class="pane-content">
						<text class="content-title">配置管理</text>
						<text class="content-text">这里是配置管理的内容，包含系统配置、参数设置等功能。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="角色管理" name="role">
					<view class="pane-content">
						<text class="content-title">角色管理</text>
						<text class="content-text">这里是角色管理的内容，包含角色分配、权限管理等功能。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="任务管理" name="task" disabled>
					<view class="pane-content">
						<text class="content-title">任务管理</text>
						<text class="content-text">此标签页已禁用，无法选中。</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">卡片风格</view>
			<view class="demo-desc">设置 type 属性为 card 就可以使选项卡改变为标签风格。</view>
			<zx-tabs v-model="activeTab2" type="card" @tab-click="handleTabClick">
				<zx-tab-pane label="首页" name="home">
					<view class="pane-content">
						<text class="content-title">首页内容</text>
						<text class="content-text">欢迎来到首页，这里展示了系统的概览信息。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="产品" name="product">
					<view class="pane-content">
						<text class="content-title">产品列表</text>
						<text class="content-text">这里展示了所有的产品信息和管理功能。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="关于" name="about">
					<view class="pane-content">
						<text class="content-title">关于我们</text>
						<text class="content-text">了解更多关于我们公司和产品的信息。</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">边框卡片风格</view>
			<view class="demo-desc">设置 type 属性为 border-card。</view>
			<zx-tabs v-model="activeTab3" type="border-card">
				<zx-tab-pane label="订单管理" name="order">
					<view class="pane-content">
						<text class="content-title">订单管理</text>
						<text class="content-text">查看和管理所有订单信息，包括订单状态、配送等。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="商品管理" name="goods">
					<view class="pane-content">
						<text class="content-title">商品管理</text>
						<text class="content-text">管理商品信息，包括商品添加、编辑、删除等操作。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="库存管理" name="stock">
					<view class="pane-content">
						<text class="content-title">库存管理</text>
						<text class="content-text">实时查看库存状态，进行库存调整和预警设置。</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">标签位置设置</view>
			<view class="demo-desc">可以通过 tab-position 设置标签的位置。</view>
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
			<view class="tabs-container" :class="'position-' + tabPosition">
				<zx-tabs v-model="activeTab4" :tab-position="tabPosition">
					<zx-tab-pane label="标签一" name="tab1">
						<view class="pane-content">
							<text class="content-title">标签一</text>
							<text class="content-text">这是标签一的内容，当前位置：{{ tabPosition }}</text>
						</view>
					</zx-tab-pane>
					<zx-tab-pane label="标签二" name="tab2">
						<view class="pane-content">
							<text class="content-title">标签二</text>
							<text class="content-text">这是标签二的内容，当前位置：{{ tabPosition }}</text>
						</view>
					</zx-tab-pane>
					<zx-tab-pane label="标签三" name="tab3">
						<view class="pane-content">
							<text class="content-title">标签三</text>
							<text class="content-text">这是标签三的内容，当前位置：{{ tabPosition }}</text>
						</view>
					</zx-tab-pane>
				</zx-tabs>
			</view>
		</view>

		<view class="demo-section">
			<view class="demo-title">动态增减标签页</view>
			<view class="demo-desc">增减标签页按钮只能在选项卡样式的标签页下使用。</view>
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
					<view class="pane-content">
						<text class="content-title">{{ tab.title }}</text>
						<text class="content-text">{{ tab.content }}</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">自定义标签内容</view>
			<view class="demo-desc">可以通过具名插槽来实现自定义标签页的内容。</view>
			<zx-tabs v-model="activeTab6" type="border-card">
				<template #tab-calendar>
					<view class="custom-tab">
						<text class="tab-icon">📅</text>
						<text>日历</text>
					</view>
				</template>
				<template #tab-setting>
					<view class="custom-tab">
						<text class="tab-icon">⚙️</text>
						<text>设置</text>
					</view>
				</template>
				
				<zx-tab-pane label="日历" name="calendar">
					<view class="pane-content">
						<text class="content-title">📅 日历管理</text>
						<text class="content-text">这是一个带有自定义图标的日历标签页。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="设置" name="setting">
					<view class="pane-content">
						<text class="content-title">⚙️ 系统设置</text>
						<text class="content-text">这是一个带有自定义图标的设置标签页。</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="帮助" name="help">
					<view class="pane-content">
						<text class="content-title">帮助文档</text>
						<text class="content-text">这是一个普通的帮助标签页。</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">数据驱动模式</view>
			<view class="demo-desc">通过 tabs 属性传入标签数据，适合动态生成标签页的场景。</view>
			<zx-tabs v-model="activeTab7" :tabs="tabsData" @tab-click="handleTabClick">
				<view class="pane-content">
					<text class="content-title">当前选中：{{ activeTab7 }}</text>
					<text class="content-text">
						在数据驱动模式下，标签页的内容可以根据当前选中的标签动态显示。
						当前选中的标签信息：{{ getCurrentTabInfo(activeTab7) }}
					</text>
				</view>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">延迟渲染</view>
			<view class="demo-desc">标签页内容可以设置为延迟渲染，提升性能。</view>
			<zx-tabs v-model="activeTab8">
				<zx-tab-pane label="即时渲染" name="instant">
					<view class="pane-content">
						<text class="content-title">即时渲染</text>
						<text class="content-text">这个标签页会立即渲染，渲染时间：{{ renderTime.instant }}</text>
					</view>
				</zx-tab-pane>
				<zx-tab-pane label="延迟渲染" name="lazy" lazy>
					<view class="pane-content">
						<text class="content-title">延迟渲染</text>
						<text class="content-text">这个标签页只有在激活时才会渲染，渲染时间：{{ renderTime.lazy }}</text>
					</view>
				</zx-tab-pane>
			</zx-tabs>
		</view>

		<view class="demo-section">
			<view class="demo-title">尺寸设置</view>
			<view class="demo-desc">支持三种尺寸：large、default、small。</view>
			
			<view class="size-demo">
				<text class="size-label">大尺寸 (large)</text>
				<zx-tabs v-model="activeTab9" size="large" type="card">
					<zx-tab-pane label="标签一" name="tab1">
						<view class="pane-content size-content">大尺寸标签页内容</view>
					</zx-tab-pane>
					<zx-tab-pane label="标签二" name="tab2">
						<view class="pane-content size-content">大尺寸标签页内容</view>
					</zx-tab-pane>
				</zx-tabs>
			</view>

			<view class="size-demo">
				<text class="size-label">默认尺寸 (default)</text>
				<zx-tabs v-model="activeTab10" size="default" type="card">
					<zx-tab-pane label="标签一" name="tab1">
						<view class="pane-content size-content">默认尺寸标签页内容</view>
					</zx-tab-pane>
					<zx-tab-pane label="标签二" name="tab2">
						<view class="pane-content size-content">默认尺寸标签页内容</view>
					</zx-tab-pane>
				</zx-tabs>
			</view>

			<view class="size-demo">
				<text class="size-label">小尺寸 (small)</text>
				<zx-tabs v-model="activeTab11" size="small" type="card">
					<zx-tab-pane label="标签一" name="tab1">
						<view class="pane-content size-content">小尺寸标签页内容</view>
					</zx-tab-pane>
					<zx-tab-pane label="标签二" name="tab2">
						<view class="pane-content size-content">小尺寸标签页内容</view>
					</zx-tab-pane>
				</zx-tabs>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

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
		content: '标签页 1 的内容，可以关闭此标签页。',
		closable: true
	},
	{
		title: '标签页 2',
		name: '2',
		content: '标签页 2 的内容，可以关闭此标签页。',
		closable: true
	}
]);

// 自定义标签内容
const activeTab6 = ref('calendar');

// 数据驱动
const activeTab7 = ref('option1');
const tabsData = reactive([
	{ name: 'option1', label: '选项一', disabled: false, desc: '第一个选项' },
	{ name: 'option2', label: '选项二', disabled: false, desc: '第二个选项' },
	{ name: 'option3', label: '选项三', disabled: true, desc: '第三个选项（已禁用）' },
	{ name: 'option4', label: '选项四', disabled: false, desc: '第四个选项' }
]);

// 延迟渲染
const activeTab8 = ref('instant');
const renderTime = reactive({
	instant: '',
	lazy: ''
});

// 尺寸设置
const activeTab9 = ref('tab1');
const activeTab10 = ref('tab1');
const activeTab11 = ref('tab1');

// 生命周期
onMounted(() => {
	renderTime.instant = new Date().toLocaleTimeString();
});

// 监听延迟渲染标签页的激活
watch(activeTab8, (newValue) => {
	if (newValue === 'lazy' && !renderTime.lazy) {
		renderTime.lazy = new Date().toLocaleTimeString();
	}
});

// 事件处理
const handleTabClick = (data) => {
	console.log('标签页点击:', data);
	uni.showToast({
		title: `切换到: ${data.tab.label || data.tab.name}`,
		icon: 'none',
		duration: 1500
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
	const index = editableTabs.findIndex(tab => tab.name === targetName);
	if (index > -1) {
		editableTabs.splice(index, 1);
	}
	
	uni.showToast({
		title: '标签页已删除',
		icon: 'success',
		duration: 1500
	});
};

const handleTabAdd = () => {
	const newTabName = `${++tabIndex}`;
	editableTabs.push({
		title: `新标签页 ${tabIndex}`,
		name: newTabName,
		content: `这是新添加的标签页 ${tabIndex} 的内容。`,
		closable: true
	});
	activeTab5.value = newTabName;
	
	uni.showToast({
		title: '标签页已添加',
		icon: 'success',
		duration: 1500
	});
};

const getCurrentTabInfo = (tabName) => {
	const tab = tabsData.find(t => t.name === tabName);
	return tab ? tab.desc : '';
};
</script>

<style scoped>
.demo-container {
	padding: 40rpx 30rpx;
	background-color: #f5f7fa;
	min-height: 100vh;
}

.page-header {
	text-align: center;
	margin-bottom: 60rpx;
	padding: 40rpx 20rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 20rpx;
	color: #fff;
}

.page-title {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.page-desc {
	display: block;
	font-size: 28rpx;
	opacity: 0.9;
}

.demo-section {
	margin-bottom: 60rpx;
	background-color: #fff;
	border-radius: 16rpx;
	padding: 40rpx 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	border: 1rpx solid #f0f0f0;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 16rpx;
}

.demo-desc {
	font-size: 28rpx;
	color: #606266;
	margin-bottom: 30rpx;
	line-height: 1.5;
}

.pane-content {
	padding: 30rpx;
	background-color: #fafbfc;
	border-radius: 12rpx;
	margin: 20rpx 0;
}

.content-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 16rpx;
}

.content-text {
	display: block;
	font-size: 28rpx;
	color: #606266;
	line-height: 1.6;
}

.position-controls {
	display: flex;
	gap: 20rpx;
	margin-bottom: 30rpx;
	flex-wrap: wrap;
}

.position-btn {
	padding: 16rpx 32rpx;
	border: 2rpx solid #dcdfe6;
	border-radius: 8rpx;
	background-color: #fff;
	color: #606266;
	font-size: 28rpx;
	transition: all 0.3s ease;
	cursor: pointer;
}

.position-btn.active {
	border-color: #409eff;
	color: #409eff;
	background-color: #ecf5ff;
}

.position-btn:hover {
	border-color: #c6e2ff;
	background-color: #ecf5ff;
}

.tabs-container {
	border: 1rpx solid #e4e7ed;
	border-radius: 8rpx;
	overflow: hidden;
}

.tabs-container.position-left,
.tabs-container.position-right {
	height: 400rpx;
}

.custom-tab {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.tab-icon {
	font-size: 32rpx;
}

.size-demo {
	margin-bottom: 40rpx;
}

.size-label {
	display: block;
	font-size: 30rpx;
	font-weight: bold;
	color: #409eff;
	margin-bottom: 20rpx;
}

.size-content {
	padding: 20rpx;
	text-align: center;
	font-size: 26rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.demo-container {
		padding: 30rpx 20rpx;
	}
	
	.demo-section {
		padding: 30rpx 20rpx;
	}
	
	.position-controls {
		justify-content: center;
	}
	
	.position-btn {
		flex: 1;
		min-width: 120rpx;
		text-align: center;
	}
}
</style>
