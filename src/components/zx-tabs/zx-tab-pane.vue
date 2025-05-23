<template>
	<view 
		v-if="shouldRender" 
		v-show="isActive"
		class="zx-tab-pane" 
		:class="paneClass"
		:style="paneStyle"
	>
		<slot></slot>
	</view>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted } from 'vue';

// Props 定义
const props = defineProps({
	// 选项卡标题
	label: {
		type: String,
		default: ''
	},
	// 标签唯一标识符
	name: {
		type: [String, Number],
		default: ''
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 标签是否可关闭
	closable: {
		type: Boolean,
		default: undefined
	},
	// 标签是否延迟渲染
	lazy: {
		type: Boolean,
		default: false
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	}
});

// 注入父组件数据
const tabsContext = inject('zx-tabs', {});

// 计算属性
const paneName = computed(() => {
	return props.name || tabsContext.tabPaneIndex || '';
});

const isActive = computed(() => {
	return tabsContext.currentName === paneName.value;
});

const shouldRender = computed(() => {
	if (!props.lazy) return true;
	// 延迟渲染：只有激活过的标签页才渲染
	return tabsContext.renderedPanes?.includes(paneName.value);
});

const paneClass = computed(() => {
	return {
		'is-active': isActive.value,
		'is-disabled': props.disabled
	};
});

const paneStyle = computed(() => {
	return {
		...props.customStyle
	};
});

// 标签页信息
const paneInfo = computed(() => ({
	name: paneName.value,
	label: props.label,
	disabled: props.disabled,
	closable: props.closable
}));

// 生命周期
onMounted(() => {
	if (tabsContext.registerPane) {
		tabsContext.registerPane(paneInfo.value);
	}
});

onUnmounted(() => {
	if (tabsContext.unregisterPane) {
		tabsContext.unregisterPane(paneName.value);
	}
});
</script>

<style scoped>
.zx-tab-pane {
	width: 100%;
	height: 100%;
	overflow: auto;
}

.zx-tab-pane.is-disabled {
	opacity: 0.6;
	pointer-events: none;
}
</style> 