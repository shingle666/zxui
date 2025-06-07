<template>
	<view class="zx-breadcrumb-item">
		<view :class="[
			'zx-breadcrumb-item__content',
			to && currentPage !== getRoutePath(to) && 'zx-breadcrumb-item__content--link',
			disabled && 'zx-breadcrumb-item__content--disabled'
		]" :style="contentStyle" @click="handleClick">
			<text v-if="text">{{ text }}</text>
			<slot v-else></slot>
		</view>
		<view v-if="!isLast" class="zx-breadcrumb-item__separator" :style="separatorStyle">
			<text v-if="!config.separatorIcon">{{ config.separator }}</text>
			<zx-icon v-else :name="config.separatorIcon" size="24rpx"
				:color="config.separatorColor || '#6a6a6a'"></zx-icon>
		</view>
	</view>
</template>

<script setup>
/**
 * BreadcrumbItem 面包屑导航子组件
 * @property {String} to 路由跳转页面路径
 * @property {String} text 面包屑项文本内容
 * @property {Boolean} replace 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
 * @property {Boolean} disabled 是否禁用该项
 * @example <zx-breadcrumb-item to="/home" text="首页"></zx-breadcrumb-item>
 */
import { ref, inject, computed, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const props = defineProps({
	// 路由跳转页面路径
	to: {
		type: String,
		default: ''
	},
	// 文本内容
	text: {
		type: String,
		default: ''
	},
	// 替换路由历史
	replace: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	}
});

// 组件实例
const instance = getCurrentInstance();

// 当前页面路径
const currentPage = ref('');

// 获取父组件
const parent = ref(null);

// 是否为最后一个项
const isLast = ref(false);

// 获取父组件提供的配置
const config = inject('breadcrumbConfig', {
	separator: '/',
	separatorIcon: '',
	size: 'default',
	disabled: false,
	color: '',
	activeColor: '',
	separatorColor: ''
});

// 查找父组件
const getParent = () => {
	let parent = instance.parent;
	while (parent) {
		// 检查是否是面包屑组件
		if (parent.type && parent.type.name === 'zx-breadcrumb') {
			return parent.proxy;
		}
		parent = parent.parent;
	}
	return null;
};

// 获取当前页面路径
const getCurrentPagePath = () => {
	const pages = getCurrentPages();
	const page = pages[pages.length - 1];

	if (page) {
		currentPage.value = `/${page.route}`;
	}
};

// 解析 to 属性 (只处理字符串路径)
const getRoutePath = (to) => {
	if (!to) return '/';
	return to.trim();
};

// 内容样式
const contentStyle = computed(() => {
	const style = {};
	if (props.to && currentPage.value !== getRoutePath(props.to) && config.activeColor) {
		style.color = config.activeColor;
	} else if (config.color) {
		style.color = config.color;
	}
	return style;
});

// 分隔符样式
const separatorStyle = computed(() => {
	const style = {};
	if (config.separatorColor) {
		style.color = config.separatorColor;
	}
	return style;
});

// 路由跳转
const handleClick = () => {
	if (config.disabled || props.disabled || !props.to) {
		return;
	}

	const path = getRoutePath(props.to);
	if (!path || currentPage.value === path) {
		return;
	}

	// 检查路径格式，确保开头有 '/'
	const url = path.startsWith('/') ? path : `/${path}`;

	try {
		if (props.replace) {
			uni.redirectTo({
				url: url,
				fail: (err) => {
					console.error('跳转失败:', err);
					// 尝试使用 switchTab 跳转到 tabBar 页面
					uni.switchTab({
						url: url,
						fail: () => {
							console.error('switchTab也失败');
						}
					});
				}
			});
		} else {
			uni.navigateTo({
				url: url,
				fail: (err) => {
					console.error('跳转失败:', err);
					// 尝试使用 switchTab 跳转到 tabBar 页面
					uni.switchTab({
						url: url,
						fail: () => {
							console.error('switchTab也失败');
						}
					});
				}
			});
		}
	} catch (e) {
		console.error('跳转异常:', e);
	}
};

// 设置最后一个元素标志
const setLast = (value) => {
	isLast.value = value;
};

// 向父组件暴露方法
defineExpose({
	setLast
});

// 组件挂载时
onMounted(() => {
	// 获取当前页面路径
	getCurrentPagePath();

	// 查找并记录父组件
	parent.value = getParent();

	// 注册到父组件
	if (parent.value && typeof parent.value.addItem === 'function') {
		parent.value.addItem(instance.proxy);
	}
});

// 组件卸载前
onBeforeUnmount(() => {
	// 从父组件中移除
	if (parent.value && typeof parent.value.removeItem === 'function') {
		parent.value.removeItem(instance.proxy);
	}
});
</script>

<style lang="scss" scoped>
.zx-breadcrumb-item {
	display: flex;
	align-items: center;
	white-space: nowrap;

	&__content {
		padding: 0 8px;
		color: #6a6a6a;

		&--link {
			color: #3a3a3a;
			font-weight: bold;
			cursor: pointer;

			&:hover {
				color: #2979ff;
			}
		}

		&--disabled {
			opacity: 0.6;
			pointer-events: none;
		}
	}

	&__separator {
		color: #6a6a6a;
		font-size: 12px;
		margin: 0 2px;
	}

	&:first-child &__content {
		padding-left: 0;
	}
}
</style>