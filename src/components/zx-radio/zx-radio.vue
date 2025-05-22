<template>
	<view 
		class="zx-flex zx-row zx-nowrap zx-align-items-center" 
		@tap.stop="changeStatus"
		:class="{'zx-radio--disabled': disabled}"
	>
		<zx-icon 
			v-if="status" 
			name="checkbox-mark" 
			:class="checkedClass" 
			:style="checkedIconStyle"
		></zx-icon>
		<zx-icon
			v-else 
			name="circle"
			:class="defaultClass" 
			:style="uncheckedIconStyle"
		></zx-icon>
		<view class="zx-radio-label zx-flex1">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted, computed, defineProps, defineEmits, defineExpose, getCurrentInstance } from 'vue';

// 获取组件实例
const { proxy } = getCurrentInstance();

const props = defineProps({
	// 单选框的值，当使用radio-group时必须
	value: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 单选框的标签，如果没有提供value，则label作为value使用
	label: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 组件大小
	size: {
		type: Number,
		default: 38
	},
	// 未选中状态的样式类
	defaultClass: {
		type: Array,
		default: () => ['zx-color-gray']
	},
	// 是否选中
	checked: {
		type: Boolean,
		default: false
	},
	// 选中状态的样式类
	checkedClass: {
		type: Array,
		default: () => ['zx-bg-primary', 'zx-color-white']
	},
	// 传递给事件的额外参数
	parameter: {
		type: Array,
		default: () => []
	},
	// 组件id，用于zx-label组件的for属性
	id: {
		type: String,
		default: ''
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 选中状态下的背景颜色
	activeBackgroundColor: {
		type: String,
		default: ''
	},
	// 未选中状态下的背景颜色
	backgroundColor: {
		type: String,
		default: '#ffffff'
	},
	// 未选中状态下的边框颜色
	borderColor: {
		type: String,
		default: '#d1d1d1'
	},
	// 选中状态下的边框颜色
	activeBorderColor: {
		type: String,
		default: ''
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: '#ffffff'
	},
	// 组件名称，用于表单验证
	name: {
		type: String,
		default: ''
	}
});

const emit = defineEmits(['change', 'update:checked']);
const status = ref(false);

// 计算自定义背景色
const customBgColor = computed(() => {
	return props.activeBackgroundColor || '';
});

// 选中状态的图标样式
const checkedIconStyle = computed(() => {
	return {
		width: props.size + 'rpx',
		height: props.size + 'rpx',
		lineHeight: props.size + 'rpx',
		fontSize: (props.size - 15) + 'rpx',
		borderRadius: props.size + 'rpx',
		backgroundColor: customBgColor.value,
		color: props.iconColor,
		borderColor: props.activeBorderColor,
		textAlign: 'center'
	};
});

// 未选中状态的图标样式
const uncheckedIconStyle = computed(() => {
	return {
		width: props.size + 'rpx',
		height: props.size + 'rpx',
		lineHeight: (props.size + 2) + 'rpx',
		fontSize: (props.size - 8) + 'rpx',
		backgroundColor: props.backgroundColor,
		borderColor: props.borderColor,
		textAlign: 'center'
	};
});

// 监听checked属性的变化
watch(() => props.checked, (newVal) => {
	status.value = newVal;
});

// 相当于created生命周期
onMounted(() => {
	status.value = props.checked;
	
	// 如果父组件是zx-label，则需要将自己注册到父组件中
	const parent = getParent('zx-label');
	if (parent && parent.childrens) {
		parent.childrens.value.push(proxy);
	}
	
	// 如果父组件是zx-radio-group，则需要将自己注册到父组件中
	const radioGroup = getParent('zx-radio-group');
	if (radioGroup && radioGroup.registerChild) {
		radioGroup.registerChild(proxy);
	}
});

// 改变状态方法
const changeStatus = () => {
	if (props.disabled) return;
	
	status.value = !status.value;
	
	// 如果是在radio-group中，需要通知radio-group更新选中项
	const radioGroup = getParent('zx-radio-group');
	if (radioGroup && radioGroup.unCheckedOther) {
		radioGroup.unCheckedOther(proxy);
	} else {
		// 单独使用时，直接触发change事件
		emit('change', [status.value, props.parameter, getValue()]);
		emit('update:checked', status.value);
	}
};

// 获取值，优先使用value，其次使用label
const getValue = () => {
	return props.value !== '' ? props.value : props.label;
};

// 获取父组件
const getParent = (name) => {
	let parent = proxy.$parent;
	while (parent) {
		if (parent.$options && parent.$options.name === name) {
			return parent;
		}
		parent = parent.$parent;
	}
	return null;
};

// 提供给zx-label调用的方法
const labelClick = () => {
	changeStatus();
};

// 暴露给父组件的方法和属性
defineExpose({
	labelClick,
	name: props.name,
	checked: status,
	value: getValue()
});
</script>

<style scoped>
/* 基础布局样式 */
.zx-flex {
	display: flex;
}

.zx-row {
	flex-direction: row;
}

.zx-nowrap {
	flex-wrap: nowrap;
}

.zx-align-items-center {
	align-items: center;
}

.zx-flex1 {
	flex: 1;
}

/* 颜色相关样式 */
.zx-color-gray {
	color: #909399;
}

.zx-bg-primary {
	background-color: #2979ff;
}

.zx-color-white {
	color: #ffffff;
}

/* 组件特定样式 */
.zx-radio-label {
	margin-left: 15rpx;
	flex: 1;
}

.zx-radio--disabled {
	opacity: 0.6;
	cursor: not-allowed;
}
</style>