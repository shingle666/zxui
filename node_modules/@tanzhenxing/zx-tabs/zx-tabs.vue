<template>
	<view class="zx-tabs" :class="tabsClass" :style="tabsStyle">
		<!-- 标签导航区域 -->
		<view class="zx-tabs__header" :class="headerClass">
			<slot name="left"></slot>

			<!-- 标签容器 -->
			<view class="zx-tabs__nav-wrap" :class="navWrapClass">
				<scroll-view class="zx-tabs__nav-scroll" :scroll-x="isHorizontal" :scroll-y="!isHorizontal"
					:scroll-left="scrollLeft" :scroll-top="scrollTop" :scroll-with-animation="true">
					<view class="zx-tabs__nav" :class="navClass">
						<!-- 标签项 -->
						<view v-for="(item, index) in tabList" :key="item.name || index"
							:class="['zx-tabs__item', getTabItemClass(item, index)]"
							:style="getTabItemStyle(item, index)" @click="handleTabClick(item, index)">
							<!-- 自定义标签内容插槽 -->
							<view class="zx-tabs__item-content">
								<slot :name="`tab-${item.name || index}`" :tab="item" :index="index">
									<text class="zx-tabs__item-text">{{ item[labelKey] }}</text>
								</slot>

								<!-- 关闭按钮 -->
								<view v-if="(item.closable !== false && closable) || item.closable"
									class="zx-tabs__close" @click.stop="handleTabRemove(item, index)">
									<text class="zx-tabs__close-icon">×</text>
								</view>
							</view>
						</view>

						<!-- 新增按钮 -->
						<view v-if="addable || editable" class="zx-tabs__new-tab" @click="handleTabAdd">
							<slot name="add-icon">
								<text class="zx-tabs__add-icon">+</text>
							</slot>
						</view>

						<!-- 指示线/背景 -->
						<view v-if="type === '' && showIndicator" class="zx-tabs__active-bar" :style="activeBarStyle">
						</view>
					</view>
				</scroll-view>
			</view>

			<slot name="right"></slot>
		</view>

		<!-- 内容区域 -->
		<view class="zx-tabs__content" :class="contentClass" :style="contentStyle">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch, onMounted, getCurrentInstance, nextTick, provide } from 'vue';

const { proxy } = getCurrentInstance();

// Props 定义
const props = defineProps({
	// 绑定值，选中选项卡的 name
	modelValue: {
		type: [String, Number],
		default: ''
	},
	// 风格类型
	type: {
		type: String,
		default: '', // '', 'card', 'border-card'
		validator: (value) => ['', 'card', 'border-card'].includes(value)
	},
	// 标签位置
	tabPosition: {
		type: String,
		default: 'top', // 'top', 'right', 'bottom', 'left'
		validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value)
	},
	// 标签数据
	tabs: {
		type: Array,
		default: () => []
	},
	// 标签文本的键名
	labelKey: {
		type: String,
		default: 'label'
	},
	// 标签唯一标识的键名
	nameKey: {
		type: String,
		default: 'name'
	},
	// 标签是否可关闭
	closable: {
		type: Boolean,
		default: false
	},
	// 标签是否可增加
	addable: {
		type: Boolean,
		default: false
	},
	// 标签是否同时可增加和关闭
	editable: {
		type: Boolean,
		default: false
	},
	// 标签的宽度是否自撑开
	stretch: {
		type: Boolean,
		default: false
	},
	// 切换标签之前的钩子函数
	beforeLeave: {
		type: Function,
		default: () => true
	},
	// 组件尺寸
	size: {
		type: String,
		default: 'default', // 'large', 'default', 'small'
		validator: (value) => ['large', 'default', 'small'].includes(value)
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 激活状态颜色
	activeColor: {
		type: String,
		default: '#409eff'
	},
	// 普通状态颜色
	inactiveColor: {
		type: String,
		default: '#303133'
	},
	// 禁用状态颜色
	disabledColor: {
		type: String,
		default: '#c0c4cc'
	}
});

// Emits 定义
const emits = defineEmits([
	'update:modelValue',
	'tab-click',
	'tab-change',
	'tab-remove',
	'tab-add',
	'edit'
]);

// 响应式数据
const currentName = ref(props.modelValue);
const scrollLeft = ref(0);
const scrollTop = ref(0);
const activeBarStyle = ref({});
const tabList = ref([]);
const panes = ref(new Map()); // 存储标签页面板
const renderedPanes = ref(new Set()); // 已渲染的面板
const tabPaneIndex = ref(0); // 面板索引计数器

// 计算属性
const isHorizontal = computed(() => ['top', 'bottom'].includes(props.tabPosition));

const tabsClass = computed(() => {
	return [
		`zx-tabs--${props.tabPosition}`,
		`zx-tabs--${props.size}`,
		{
			'zx-tabs--card': props.type === 'card',
			'zx-tabs--border-card': props.type === 'border-card',
			'zx-tabs--stretch': props.stretch
		}
	];
});

const headerClass = computed(() => {
	return `zx-tabs__header--${props.tabPosition}`;
});

const navWrapClass = computed(() => {
	return `zx-tabs__nav-wrap--${props.tabPosition}`;
});

const navClass = computed(() => {
	return [
		`zx-tabs__nav--${props.tabPosition}`,
		`zx-tabs__nav--${props.type || 'line'}`
	];
});

const contentClass = computed(() => {
	return `zx-tabs__content--${props.tabPosition}`;
});

const tabsStyle = computed(() => {
	return {
		...props.customStyle
	};
});

const contentStyle = computed(() => {
	const style = {};
	if (!isHorizontal.value) {
		style.height = '100%';
	}
	return style;
});

const showIndicator = computed(() => {
	return props.type === '' && tabList.value.length > 0;
});


// 方法
const initTabs = () => {
	// 如果有外部传入的 tabs 数据，使用外部数据
	if (props.tabs && props.tabs.length > 0) {
		tabList.value = props.tabs.map((tab, index) => ({
			...tab,
			name: tab[props.nameKey] || tab.name || index.toString(),
			label: tab[props.labelKey] || tab.label || `Tab ${index + 1}`,
			disabled: tab.disabled || false,
			closable: tab.closable
		}));
	} else {
		// 否则使用从 panes 收集的数据
		tabList.value = Array.from(panes.value.values());
	}

	// 设置初始选中项
	if (!currentName.value && tabList.value.length > 0) {
		currentName.value = tabList.value[0].name;
	}

	// 添加初始选中项到已渲染列表
	if (currentName.value && !renderedPanes.value.has(currentName.value)) {
		renderedPanes.value.add(currentName.value);
	}

	nextTick(() => {
		updateActiveBar();
	});
};

const getTabItemClass = (item, index) => {
	return {
		'is-active': currentName.value === item.name,
		'is-disabled': item.disabled,
		'is-closable': (item.closable !== false && props.closable) || item.closable
	};
};

const getTabItemStyle = (item, index) => {
	const style = {};

	if (item.disabled) {
		style.color = props.disabledColor;
	} else if (currentName.value === item.name) {
		style.color = props.activeColor;
	} else {
		style.color = props.inactiveColor;
	}

	return style;
};

const handleTabClick = async (item, index) => {
	if (item.disabled) return;

	// 执行 before-leave 钩子
	const beforeLeaveResult = await props.beforeLeave(item.name, currentName.value);
	if (beforeLeaveResult === false) return;

	const oldName = currentName.value;
	currentName.value = item.name;

	emits('tab-click', {
		tab: item,
		index,
		name: item.name
	});

	// 滚动到当前标签
	scrollToActiveTab(index);
};

const handleTabRemove = (item, index) => {
	emits('tab-remove', item.name, item, index);
	emits('edit', item.name, 'remove');
};

const handleTabAdd = () => {
	emits('tab-add');
	emits('edit', '', 'add');
};

const scrollToActiveTab = async (index) => {
	await nextTick();

	try {
		const tabItemSelector = `.zx-tabs__item:nth-child(${index + 1})`;
		const tabRect = await getRect(tabItemSelector);
		const navRect = await getRect('.zx-tabs__nav-scroll');

		if (!tabRect || !navRect) return;

		if (isHorizontal.value) {
			const tabCenter = tabRect.left + tabRect.width / 2;
			const navCenter = navRect.width / 2;
			scrollLeft.value = Math.max(0, tabCenter - navCenter);
		} else {
			const tabCenter = tabRect.top + tabRect.height / 2;
			const navCenter = navRect.height / 2;
			scrollTop.value = Math.max(0, tabCenter - navCenter);
		}
	} catch (error) {
		console.warn('滚动到当前标签失败:', error);
	}
};

const updateActiveBar = async () => {
	if (!showIndicator.value) return;

	await nextTick();

	try {
		const activeIndex = tabList.value.findIndex(tab => tab.name === currentName.value);
		if (activeIndex === -1) return;

		const activeTabSelector = `.zx-tabs__item:nth-child(${activeIndex + 1})`;
		const tabRect = await getRect(activeTabSelector);
		const navRect = await getRect('.zx-tabs__nav');

		if (!tabRect || !navRect) return;

		const style = {};

		if (isHorizontal.value) {
			style.width = `${tabRect.width}px`;
			style.height = '2px';
			style.transform = `translateX(${tabRect.left - navRect.left}px)`;
			style.bottom = '0';
		} else {
			style.width = '2px';
			style.height = `${tabRect.height}px`;
			style.transform = `translateY(${tabRect.top - navRect.top}px)`;
			style.right = '0';
		}

		style.backgroundColor = props.activeColor;
		style.transition = 'all 0.3s ease';

		activeBarStyle.value = style;
	} catch (error) {
		console.warn('更新指示器失败:', error);
	}
};

const getRect = (selector) => {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.in(proxy)
			.select(selector)
			.boundingClientRect((res) => {
				resolve(res);
			})
			.exec();
	});
};

// 注册标签页面板
const registerPane = (paneInfo) => {
	// 如果没有指定 name，自动生成
	if (!paneInfo.name) {
		paneInfo.name = `tab-pane-${tabPaneIndex.value++}`;
	}

	panes.value.set(paneInfo.name, paneInfo);

	// 如果没有外部传入的 tabs 数据，则重新初始化
	if (!props.tabs || props.tabs.length === 0) {
		initTabs();
	}
};

// 注销标签页面板
const unregisterPane = (paneName) => {
	panes.value.delete(paneName);
	renderedPanes.value.delete(paneName);

	// 如果删除的是当前选中的标签页，切换到其他标签页
	if (currentName.value === paneName) {
		const remainingPanes = Array.from(panes.value.keys());
		if (remainingPanes.length > 0) {
			currentName.value = remainingPanes[0];
		} else {
			currentName.value = '';
		}
	}

	// 如果没有外部传入的 tabs 数据，则重新初始化
	if (!props.tabs || props.tabs.length === 0) {
		initTabs();
	}
};

// 提供给子组件的上下文
provide('zx-tabs', {
	currentName: computed(() => currentName.value),
	renderedPanes: computed(() => Array.from(renderedPanes.value)),
	tabPaneIndex: computed(() => tabPaneIndex.value),
	registerPane,
	unregisterPane
});

// 生命周期
onMounted(() => {
	initTabs();
});


// 监听器
watch(() => props.modelValue, (newVal) => {
	currentName.value = newVal;
	updateActiveBar();
	// 添加到已渲染列表
	if (newVal && !renderedPanes.value.has(newVal)) {
		renderedPanes.value.add(newVal);
	}
});

watch(() => props.tabs, (newTabs) => {
	initTabs();
}, { deep: true, immediate: true });

watch(currentName, (newName, oldName) => {
	if (newName !== oldName) {
		emits('update:modelValue', newName);
		emits('tab-change', newName, oldName);
		updateActiveBar();
		// 添加到已渲染列表
		if (newName && !renderedPanes.value.has(newName)) {
			renderedPanes.value.add(newName);
		}
	}
});

// 暴露方法
defineExpose({
	currentName,
	scrollToActiveTab,
	updateActiveBar,
	registerPane,
	unregisterPane
});
</script>

<style scoped>
.zx-tabs {
	display: flex;
	color: #303133;
}

/* 基础布局 */
.zx-tabs--top,
.zx-tabs--bottom {
	flex-direction: column;
}

.zx-tabs--left,
.zx-tabs--right {
	flex-direction: row;
}

.zx-tabs--right {
	flex-direction: row-reverse;
}

.zx-tabs--bottom {
	flex-direction: column-reverse;
}

/* 头部容器 */
.zx-tabs__header {
	display: flex;
	align-items: center;
	position: relative;
}

.zx-tabs__header--top,
.zx-tabs__header--bottom {
	flex-direction: row;
	border-bottom: 1px solid #e4e7ed;
}

.zx-tabs__header--bottom {
	border-bottom: none;
	border-top: 1px solid #e4e7ed;
}

.zx-tabs__header--left,
.zx-tabs__header--right {
	flex-direction: column;
	border-right: 1px solid #e4e7ed;
}

.zx-tabs__header--right {
	border-right: none;
	border-left: 1px solid #e4e7ed;
}

/* 导航包装器 */
.zx-tabs__nav-wrap {
	flex: 1;
	overflow: hidden;
	position: relative;
}

.zx-tabs__nav-wrap--top,
.zx-tabs__nav-wrap--bottom {
	width: 100%;
}

.zx-tabs__nav-wrap--left,
.zx-tabs__nav-wrap--right {
	height: 100%;
}

/* 滚动容器 */
.zx-tabs__nav-scroll {
	overflow: hidden;
}

.zx-tabs__nav-scroll::-webkit-scrollbar {
	display: none;
}

/* 导航容器 */
.zx-tabs__nav {
	position: relative;
	display: flex;
	white-space: nowrap;
}

.zx-tabs__nav--top,
.zx-tabs__nav--bottom {
	flex-direction: row;
}

.zx-tabs__nav--left,
.zx-tabs__nav--right {
	flex-direction: column;
}

/* 标签项 */
.zx-tabs__item {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20rpx;
	height: 80rpx;
	line-height: 80rpx;
	cursor: pointer;
	transition: all 0.3s ease;
	font-size: 28rpx;
}

.zx-tabs__item:hover {
	color: #409eff;
}

.zx-tabs__item.is-active {
	color: #409eff;
	font-weight: 500;
}

.zx-tabs__item.is-disabled {
	color: #c0c4cc !important;
	cursor: not-allowed;
}

.zx-tabs__item-content {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.zx-tabs__item-text {
	white-space: nowrap;
}

/* 关闭按钮 */
.zx-tabs__close {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	font-size: 24rpx;
	transition: all 0.3s ease;
}

.zx-tabs__close:hover {
	background-color: #f5f7fa;
	color: #606266;
}

.zx-tabs__close-icon {
	line-height: 1;
}

/* 新增按钮 */
.zx-tabs__new-tab {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20rpx;
	height: 80rpx;
	color: #909399;
	cursor: pointer;
	transition: all 0.3s ease;
}

.zx-tabs__new-tab:hover {
	color: #409eff;
}

.zx-tabs__add-icon {
	font-size: 32rpx;
	line-height: 1;
}

/* 激活指示器 */
.zx-tabs__active-bar {
	position: absolute;
	background-color: #409eff;
	z-index: 1;
}

/* 卡片风格 */
.zx-tabs--card .zx-tabs__header {
	border-bottom: none;
}

.zx-tabs--card .zx-tabs__item {
	border: 1px solid #e4e7ed;
	border-bottom: none;
	border-radius: 8rpx 8rpx 0 0;
	margin-right: 4rpx;
	background-color: #f5f7fa;
}

.zx-tabs--card .zx-tabs__item.is-active {
	background-color: #fff;
	border-bottom-color: #fff;
}

/* 边框卡片风格 */
.zx-tabs--border-card {
	border: 1px solid #dcdfe6;
	border-radius: 8rpx;
	overflow: hidden;
}

.zx-tabs--border-card .zx-tabs__header {
	background-color: #f5f7fa;
	border-bottom: 1px solid #dcdfe6;
	margin: 0;
}

.zx-tabs--border-card .zx-tabs__item {
	border-right: 1px solid #dcdfe6;
}

.zx-tabs--border-card .zx-tabs__item:last-child {
	border-right: none;
}

.zx-tabs--border-card .zx-tabs__item.is-active {
	background-color: #fff;
	border-bottom: 1px solid #fff;
	margin-bottom: -1px;
}

/* 拉伸模式 */
.zx-tabs--stretch .zx-tabs__item {
	flex: 1;
}

/* 尺寸 */
.zx-tabs--large .zx-tabs__item {
	height: 100rpx;
	line-height: 100rpx;
	font-size: 32rpx;
	padding: 0 32rpx;
}

.zx-tabs--small .zx-tabs__item {
	height: 64rpx;
	line-height: 64rpx;
	font-size: 24rpx;
	padding: 0 16rpx;
}

/* 内容区域 */
.zx-tabs__content {
	flex: 1;
	overflow: hidden;
}

.zx-tabs__content--top,
.zx-tabs__content--bottom {
	width: 100%;
}

.zx-tabs__content--left,
.zx-tabs__content--right {
	height: 100%;
}
</style>
