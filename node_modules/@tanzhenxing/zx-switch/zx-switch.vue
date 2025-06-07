<template>
	<view 
		:class="['zx-switch', { 'zx-switch--disabled': disabled, 'zx-switch--loading': loading }]"
		:style="getSwitchStyle()" 
		@click="handleClick"
		:aria-label="ariaLabel"
		:aria-checked="switchStatus"
		role="switch"
		:tabindex="disabled ? -1 : 0"
	>
		<!-- 滑块圆点 -->
		<view 
			:class="['zx-switch__core', { 'zx-switch__core--checked': switchStatus }]"
			:style="getCoreStyle()"
		>
			<!-- 加载图标 -->
			<view v-if="loading" class="zx-switch__loading">
				<view class="zx-switch__loading-icon"></view>
			</view>
		</view>
		
		<!-- 文本显示 -->
		<view v-if="showText" class="zx-switch__text" :style="getTextStyle()">
			<text :style="{ color: textColor }">
				{{ switchStatus ? activeText : inactiveText }}
			</text>
		</view>
	</view>
</template>

<script setup>
/**
 * zx-switch 开关选择器
 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
 * @tutorial https://zxui.org/components/switch
 * @property {Boolean} loading - 是否处于加载中（默认 false）
 * @property {Boolean} disabled - 是否禁用（默认 false）
 * @property {String|Number} size - 开关尺寸，可选值：large/default/small 或数字（默认 'default'）
 * @property {String} activeColor - 打开时的背景色（默认 '#2979ff'）
 * @property {String} inactiveColor - 关闭时的背景色（默认 '#dcdfe6'）
 * @property {Boolean|String|Number} modelValue - 双向绑定的值
 * @property {String|Number} activeValue - switch 打开时的值（默认 true）
 * @property {String|Number} inactiveValue - switch 关闭时的值（默认 false）
 * @property {String} activeText - switch 打开时显示的文字（默认 ''）
 * @property {String} inactiveText - switch 关闭时显示的文字（默认 ''）
 * @property {Boolean} showText - 是否显示文字（默认 false）
 * @property {String} textColor - 文字颜色（默认 '#ffffff'）
 * @property {Function} beforeChange - 切换前的钩子函数，返回 false 或 Promise reject 则阻止切换
 * @property {String} ariaLabel - 无障碍标签
 * @property {Object} customStyle - 自定义样式
 * @event {Function} change - 状态改变时触发
 * @event {Function} update:modelValue - v-model 更新事件
 */

import { ref, computed, getCurrentInstance, watch } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否为加载中状态
	loading: {
		type: Boolean,
		default: false
	},
	// 是否为禁用状态
	disabled: {
		type: Boolean,
		default: false
	},
	// 开关尺寸
	size: {
		type: [String, Number],
		default: 'default',
		validator: (value) => {
			return ['large', 'default', 'small'].includes(value) || typeof value === 'number';
		}
	},
	// 打开时的背景颜色
	activeColor: {
		type: String,
		default: '#2979ff'
	},
	// 关闭时的背景颜色
	inactiveColor: {
		type: String,
		default: '#dcdfe6'
	},
	// v-model 绑定值
	modelValue: {
		type: [Boolean, String, Number],
		default: false
	},
	// 兼容旧版本
	value: {
		type: [Boolean, String, Number],
		default: undefined
	},
	// switch 打开时的值
	activeValue: {
		type: [Boolean, String, Number],
		default: true
	},
	// switch 关闭时的值
	inactiveValue: {
		type: [Boolean, String, Number],
		default: false
	},
	// switch 打开时显示的文字
	activeText: {
		type: String,
		default: ''
	},
	// switch 关闭时显示的文字
	inactiveText: {
		type: String,
		default: ''
	},
	// 是否显示文字
	showText: {
		type: Boolean,
		default: false
	},
	// 文字颜色
	textColor: {
		type: String,
		default: '#ffffff'
	},
	// 切换前的钩子函数
	beforeChange: {
		type: Function,
		default: null
	},
	// 无障碍标签
	ariaLabel: {
		type: String,
		default: ''
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	}
});

const emit = defineEmits(['change', 'update:modelValue']);

// 当前开关状态
const switchStatus = ref(false);
// 是否正在处理切换
const isChanging = ref(false);

// 计算当前值
const currentValue = computed(() => {
	return props.value !== undefined ? props.value : props.modelValue;
});

// 监听值变化
watch(currentValue, (val) => {
	switchStatus.value = val === props.activeValue;
}, { immediate: true });

// 获取尺寸配置
const getSizeConfig = computed(() => {
	if (typeof props.size === 'number') {
		return {
			width: props.size * 2,
			height: props.size,
			coreSize: props.size - 4
		};
	}
	
	const sizeMap = {
		large: { width: 80, height: 40, coreSize: 36 },
		default: { width: 60, height: 30, coreSize: 26 },
		small: { width: 44, height: 22, coreSize: 18 }
	};
	
	return sizeMap[props.size] || sizeMap.default;
});

// 开关容器样式
const getSwitchStyle = () => {
	const sizeConfig = getSizeConfig.value;
	return {
		width: sizeConfig.width + 'rpx',
		height: sizeConfig.height + 'rpx',
		backgroundColor: switchStatus.value ? props.activeColor : props.inactiveColor,
		borderRadius: sizeConfig.height / 2 + 'rpx',
		position: 'relative',
		transition: 'all 0.3s ease',
		cursor: props.disabled ? 'not-allowed' : 'pointer',
		opacity: props.disabled ? 0.6 : 1,
		...props.customStyle
	};
};

// 滑块样式
const getCoreStyle = () => {
	const sizeConfig = getSizeConfig.value;
	const translateX = switchStatus.value ? 
		(sizeConfig.width - sizeConfig.coreSize - 4) : 2;
	
	return {
		width: sizeConfig.coreSize + 'rpx',
		height: sizeConfig.coreSize + 'rpx',
		backgroundColor: '#ffffff',
		borderRadius: '50%',
		position: 'absolute',
		top: '2rpx',
		left: '2rpx',
		transform: `translateX(${translateX}rpx)`,
		transition: 'transform 0.3s ease',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow: '0 2rpx 4rpx rgba(0, 0, 0, 0.12)'
	};
};

// 文字样式
const getTextStyle = () => {
	return {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		fontSize: '24rpx',
		fontWeight: '500',
		left: switchStatus.value ? '8rpx' : 'auto',
		right: switchStatus.value ? 'auto' : '8rpx'
	};
};

// 处理点击事件
const handleClick = async () => {
	if (props.disabled || props.loading || isChanging.value) return;
	
	const newValue = switchStatus.value ? props.inactiveValue : props.activeValue;
	
	// 执行 beforeChange 钩子
	if (props.beforeChange) {
		isChanging.value = true;
		try {
			const result = await props.beforeChange();
			if (result === false) {
				isChanging.value = false;
				return;
			}
		} catch (error) {
			isChanging.value = false;
			return;
		}
		isChanging.value = false;
	}
	
	// 更新状态
	switchStatus.value = !switchStatus.value;
	
	// 触发事件
	emit('update:modelValue', newValue);
	emit('change', newValue);
};

// 获取父组件
const getParent = () => {
	let parent = proxy.$parent;
	while (parent) {
		if (parent.$options && parent.$options.name === 'zx-label') {
			return parent;
		}
		parent = parent.$parent;
	}
	return null;
};

// 提供给 zx-label 调用的方法
const labelClick = () => {
	handleClick();
};

// 手动聚焦
const focus = () => {
	// 在小程序中可能需要特殊处理
};

// 暴露给父组件的方法
defineExpose({
	labelClick,
	focus
});

// 组件挂载时注册到父组件
const parent = getParent();
if (parent && parent.childrens) {
	parent.childrens.value.push(proxy);
}
</script>

<style scoped>
.zx-switch {
	display: inline-flex;
	align-items: center;
	position: relative;
	vertical-align: middle;
	outline: none;
}

.zx-switch--disabled {
	cursor: not-allowed !important;
}

.zx-switch--loading {
	cursor: default !important;
}

.zx-switch__core {
	position: relative;
}

.zx-switch__loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.zx-switch__loading-icon {
	width: 24rpx;
	height: 24rpx;
	border: 2rpx solid #409eff;
	border-top-color: transparent;
	border-radius: 50%;
	animation: zx-switch-loading 1s linear infinite;
}

.zx-switch__text {
	pointer-events: none;
	user-select: none;
}

@keyframes zx-switch-loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

/* 焦点状态 */
.zx-switch:focus {
	box-shadow: 0 0 0 4rpx rgba(41, 121, 255, 0.1);
}

/* 兼容暗色模式 */
@media (prefers-color-scheme: dark) {
	.zx-switch__core {
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
	}
}
</style>

