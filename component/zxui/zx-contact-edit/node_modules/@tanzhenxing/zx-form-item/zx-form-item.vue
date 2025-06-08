<template>
	<view style="margin-bottom: 30rpx;" :class="[
		'zx-form-item',
		{
			'is-error': validateState === 'error',
			'is-success': validateState === 'success',
			'is-validating': validateState === 'validating',
			'is-required': isRequired || required,
			[`zx-form-item--${parentSize || ''}`]: parentSize
		}
	]">
		<view class="zx-form-item__content">
			<slot name="label">
				<view v-if="label || $slots.label" class="zx-form-item__label" :style="{
					width: labelStyle.width,
					textAlign: labelStyle.textAlign
				}">
					<text v-if="isRequired || required" class="zx-form-item__required">*</text>
					<text v-if="label">{{label}}</text>
					<slot v-else name="label"></slot>
				</view>
			</slot>
			<view class="zx-form-item__field">
				<slot></slot>
			</view>
		</view>
		<view v-if="validateState === 'error' && showMessage" class="zx-form-item__error" :style="{
			marginLeft: labelStyle.width ? (parseInt(labelStyle.width) + 20) + 'rpx' : '20rpx'
		}">
			{{validateMessage}}
		</view>
	</view>
</template>

<script setup>
import { getCurrentInstance, ref, inject, computed, watch, onMounted, onBeforeUnmount, nextTick, provide } from 'vue';
import { getPropByPath } from './utils'; // 需要实现这个工具函数

const {proxy} = getCurrentInstance();
const zxForm = inject('zxForm', {});

const props = defineProps({
	// 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
	prop: {
		type: String,
		default: ''
	},
	// 是否为必填项，如不设置，则会根据校验规则自动生成
	required: {
		type: Boolean,
		default: false
	},
	// 标签名称
	label: {
		type: String,
		default: ''
	},
	// label的宽度
	labelWidth: {
		type: [String, Number],
		default: ''
	},
	// label 对齐方式，默认 left 取值 left/center/right
	labelAlign: {
		type: String,
		default: ''
	},
	// 强制显示错误信息
	errorMessage: {
		type: [String, Boolean],
		default: ''
	},
	// 表单验证规则
	rules: {
		type: [Array, Object],
		default: () => []
	},
	// 是否显示校验错误信息
	showMessage: {
		type: Boolean,
		default: true
	},
	// 用于控制该表单域下组件的尺寸
	size: {
		type: String,
		values: ['large', 'default', 'small'],
		default: ''
	},
	// 验证状态，可选值：error/success/validating
	validateStatus: {
		type: String,
		values: ['error', 'success', 'validating'],
		default: ''
	},
	// 字段名称索引
	for: {
		type: String,
		default: ''
	},
	// 是否显示行内校验信息
	inlineMessage: {
		type: [String, Boolean],
		default: ''
	}
});

// 父级表单尺寸
const parentSize = computed(() => zxForm.size?.value);

// 验证状态
const validateState = ref('');
// 验证消息
const validateMessage = ref('');
// 原始值
const initialValue = ref(null);

// 表单项验证规则计算属性
const fieldRules = computed(() => {
	let rules = props.rules;
	const formRules = zxForm.rules?.value;
	
	if (formRules && props.prop) {
		const tempRules = formRules[props.prop];
		if (tempRules) {
			rules = Array.isArray(rules)
				? [...rules, ...tempRules]
				: [...[rules], ...tempRules];
		}
	}
	
	return rules;
});

// 是否必填判断
const isRequired = computed(() => {
	if (props.required) return true;
	
	if (!fieldRules.value) return false;
	
	return fieldRules.value.some(rule => {
		return rule.required === true;
	});
});

// 标签样式计算属性
const labelStyle = computed(() => {
	if (props.labelWidth) {
		return {
			width: isNaN(props.labelWidth) ? props.labelWidth : props.labelWidth + 'rpx',
			textAlign: props.labelAlign || (zxForm.labelPosition?.value === 'top' ? 'left' : 'right')
		};
	}
	
	if (zxForm.labelWidth?.value) {
		return {
			width: isNaN(zxForm.labelWidth.value) ? zxForm.labelWidth.value : zxForm.labelWidth.value + 'rpx',
			textAlign: props.labelAlign || (zxForm.labelPosition?.value === 'top' ? 'left' : 'right')
		};
	}
	
	return {
		width: '100rpx',
		textAlign: props.labelAlign || (zxForm.labelPosition?.value === 'top' ? 'left' : 'right')
	};
});

// 计算出表单值
const fieldValue = computed(() => {
	const model = zxForm.model?.value;
	if (!model || !props.prop) return;
	
	const path = props.prop;
	return getPropByPath(model, path).value;
});

// 验证方法
const validate = (trigger, callback = () => {}) => {
	// 没有验证规则
	if (!fieldRules.value || fieldRules.value.length === 0) {
		callback('');
		return true;
	}
	
	// 没有属性
	if (!props.prop) {
		callback('');
		return true;
	}
	
	// 处理验证规则
	const rules = fieldRules.value;
	const modelName = props.prop;
	const value = fieldValue.value;
	
	// 暂时不实现完整的异步验证器，仅作简单的必填和正则验证
	let valid = true;
	let errorMessage = '';
	
	// 设置验证状态为验证中
	validateState.value = 'validating';
	
	// 验证规则
	for (let i = 0; i < rules.length; i++) {
		const rule = rules[i];
		
		// 如果有触发器且不匹配，跳过此规则
		if (trigger && rule.trigger && rule.trigger !== trigger) {
			continue;
		}
		
		// 必填验证
		if (rule.required && (!value || (Array.isArray(value) && value.length === 0))) {
			valid = false;
			errorMessage = rule.message || `${props.label || props.prop}不能为空`;
			break;
		}
		
		// 正则验证
		if (rule.pattern && !rule.pattern.test(value)) {
			valid = false;
			errorMessage = rule.message || `${props.label || props.prop}格式不正确`;
			break;
		}
		
		// 自定义验证
		if (typeof rule.validator === 'function') {
			try {
				const result = rule.validator(rule, value, (error) => {
					if (error) {
						valid = false;
						errorMessage = error;
					}
				});
				
				if (result === false) {
					valid = false;
					errorMessage = rule.message || `${props.label || props.prop}验证失败`;
					break;
				}
			} catch (error) {
				valid = false;
				errorMessage = error.message || `${props.label || props.prop}验证出错`;
				break;
			}
		}
	}
	
	// 设置验证状态和消息
	validateState.value = valid ? 'success' : 'error';
	validateMessage.value = errorMessage;
	
	// 调用回调
	callback(errorMessage, {
		prop: props.prop,
		value: fieldValue.value
	});
	
	return valid;
};

// 重置表单项
const resetField = () => {
	validateState.value = '';
	validateMessage.value = '';
	
	if (!props.prop) return;
	
	const model = zxForm.model?.value;
	if (!model) return;
	
	const path = props.prop;
	const propPath = getPropByPath(model, path);
	
	// 恢复初始值
	if (Array.isArray(initialValue.value)) {
		propPath.target[propPath.key] = [...initialValue.value];
	} else {
		propPath.target[propPath.key] = initialValue.value;
	}
	
	nextTick(() => {
		validateState.value = '';
		validateMessage.value = '';
	});
};

// 清除验证
const clearValidate = () => {
	validateState.value = '';
	validateMessage.value = '';
};

// 组件挂载时
onMounted(() => {
	// 记录初始值
	if (props.prop) {
		const value = fieldValue.value;
		initialValue.value = Array.isArray(value) ? [...value] : value;
		
		// 注册表单项
		if (zxForm.registerField) {
			zxForm.registerField({
				prop: props.prop,
				validate,
				resetField,
				clearValidate
			});
		}
	}
	
	// 监听值变化
	watch(
		() => fieldValue.value,
		() => {
			if (validateState.value === 'error') {
				nextTick(() => {
					validate('change');
				});
			}
		}
	);
});

// 组件卸载前
onBeforeUnmount(() => {
	if (zxForm.unregisterField) {
		zxForm.unregisterField({
			prop: props.prop
		});
	}
});

// 强制显示错误信息监听
watch(
	() => props.errorMessage,
	(val) => {
		if (val) {
			validateState.value = 'error';
			validateMessage.value = val;
		} else {
			validateState.value = '';
			validateMessage.value = '';
		}
	},
	{ immediate: true }
);

// 提供上下文给子组件
provide('zxFormItem', {
	validate,
	resetField,
	clearValidate,
	prop: props.prop
});

defineExpose({
	validate,
	resetField,
	clearValidate,
	validateState,
	validateMessage,
	prop: props.prop
});
</script>

<style scoped>
.zx-form-item {
	margin-bottom: 30rpx;
}
.zx-form-item__content {
	display: flex;
	flex-direction: row;
}
.zx-form-item__label {
	display: inline-flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 30rpx;
	color: #333333;
	padding-right: 20rpx;
}
.zx-form-item__field {
	flex: 1;
}
.zx-form-item__error {
	margin-top: 10rpx;
	margin-left: 20rpx;
	color: #ff0000;
	font-size: 28rpx;
}
.zx-form-item__required {
	color: #dd524d;
	font-weight: bold;
	font-size: 34rpx;
	margin-top: 10rpx;
	margin-right: 10rpx;
}
.zx-form-item.is-error .zx-form-item__field {
	border-color: #ff0000;
}
.zx-form-item.is-success .zx-form-item__field {
	border-color: #4cd964;
}
.zx-form-item--large .zx-form-item__label {
	font-size: 32rpx;
}
.zx-form-item--small .zx-form-item__label {
	font-size: 24rpx;
}
</style>