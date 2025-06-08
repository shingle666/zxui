<template>
	<view class="zx-radio-container" @tap.stop="onRadioTap" :class="{ 'zx-radio--disabled': disabled }">
		<!-- 单选框图标 -->
		<view class="zx-radio-icon" :style="radioIconStyle">
			<view v-if="isChecked" class="zx-radio-dot" :style="radioDotStyle"></view>
		</view>

		<!-- 标签内容 -->
		<view class="zx-radio-label" v-if="$slots.default">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted, computed, getCurrentInstance, inject, onUnmounted } from 'vue';

// 定义组件名称
const componentName = 'zx-radio';

// 获取组件实例
const { proxy } = getCurrentInstance();

// 从 radio-group 注入数据
const radioGroup = inject('radioGroup', null);

const emit = defineEmits(['change']);

const props = defineProps({
	// radio 标识，当 radio 选中时，radio-group 的 change 事件会携带 radio 的 value
	value: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 当前是否选中
	checked: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// radio 的颜色，同 css 的 color
	color: {
		type: String,
		default: '#007AFF'
	},
	// radio 默认的背景颜色
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	// radio 默认的边框颜色
	borderColor: {
		type: String,
		default: '#d1d1d1'
	},
	// radio 选中时的背景颜色，优先级大于 color 属性
	activeBackgroundColor: {
		type: String,
		default: ''
	},
	// radio 选中时的边框颜色
	activeBorderColor: {
		type: String,
		default: ''
	},
	// radio 的图标颜色
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	// 组件大小
	size: {
		type: [String, Number],
		default: 20
	},
	// 组件名称，用于表单验证
	name: {
		type: String,
		default: ''
	}
});

// 内部选中状态
const innerChecked = ref(false);

// 计算是否选中
const isChecked = computed(() => {
	if (radioGroup) {
		// 在 radio-group 中，通过比较 value 来判断是否选中
		return radioGroup.modelValue === getValue();
	}
	return innerChecked.value;
});

// 获取当前 radio 的值
const getValue = () => {
	return props.value !== '' ? props.value : '';
};

// 计算单选框图标样式
const radioIconStyle = computed(() => {
	const size = typeof props.size === 'number' ? props.size + 'px' : props.size;
	const bgColor = isChecked.value
		? (props.activeBackgroundColor || props.color)
		: props.backgroundColor;
	const borderColor = isChecked.value
		? (props.activeBorderColor || props.color)
		: props.borderColor;

	return {
		width: size,
		height: size,
		backgroundColor: bgColor,
		borderColor: borderColor,
		borderWidth: '1px',
		borderStyle: 'solid',
		borderRadius: '50%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		boxSizing: 'border-box'
	};
});

// 计算选中点的样式
const radioDotStyle = computed(() => {
	const size = typeof props.size === 'number' ? props.size : parseInt(props.size);
	const dotSize = Math.max(4, size * 0.4) + 'px';

	return {
		width: dotSize,
		height: dotSize,
		backgroundColor: props.iconColor,
		borderRadius: '50%'
	};
});

// 监听 checked 属性变化
watch(() => props.checked, (newVal) => {
	if (!radioGroup) {
		innerChecked.value = newVal;
	}
}, { immediate: true });

// 点击处理
const onRadioTap = () => {
	if (props.disabled) return;

	if (radioGroup) {
		// 在 radio-group 中，只能选中，不能取消选中
		if (!isChecked.value) {
			radioGroup.changeValue(getValue());
		}
	} else {
		// 单独使用时，允许切换
		innerChecked.value = !innerChecked.value;
		emit('change', { value: getValue(), checked: innerChecked.value });
	}
};

// 组件挂载时注册到 radio-group
onMounted(() => {
	if (radioGroup && radioGroup.addChild) {
		radioGroup.addChild(proxy);
	}
});

// 组件卸载时从 radio-group 中移除
onUnmounted(() => {
	if (radioGroup && radioGroup.removeChild) {
		radioGroup.removeChild(proxy);
	}
});

// 暴露给父组件的方法和属性
defineExpose({
	name: props.name,
	value: getValue(),
	checked: isChecked,
	// 提供给 radio-group 调用的方法
	updateChecked: (checked) => {
		if (!radioGroup) {
			innerChecked.value = checked;
		}
	}
});
</script>

<style scoped>
.zx-radio-container {
	display: flex;
	align-items: center;
	cursor: pointer;
	user-select: none;
}

.zx-radio-container.zx-radio--disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.zx-radio-icon {
	flex-shrink: 0;
	transition: all 0.2s ease;
}

.zx-radio-label {
	margin-left: 8px;
	flex: 1;
	font-size: 14px;
	line-height: 1.4;
}

.zx-radio-dot {
	transition: all 0.2s ease;
}

/* 禁用状态下的指针事件 */
.zx-radio--disabled .zx-radio-icon,
.zx-radio--disabled .zx-radio-label {
	pointer-events: none;
}
</style>