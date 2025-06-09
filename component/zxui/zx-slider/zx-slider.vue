<template>
	<view class="zx-slider" :class="{ 'zx-slider--disabled': disabled }" :style="[customStyle]">
		<!-- 自定义标签显示 -->
		<view v-if="showLabel && label" class="zx-slider__label">
			{{ label }}
		</view>

		<!-- 值范围显示 -->
		<view v-if="showRange" class="zx-slider__range">
			<text class="zx-slider__range-min">{{ formatValue(min) }}</text>
			<text class="zx-slider__range-max">{{ formatValue(max) }}</text>
		</view>

		<!-- 滑块容器 -->
		<view class="zx-slider__container">
			<!-- 左侧显示当前值 -->
			<view v-if="showValue && valuePosition === 'left'" class="zx-slider__value zx-slider__value--left">
				{{ formatValue(currentValue) }}
			</view>

			<!-- 原生滑块 -->
			<view class="zx-slider__slider">
				<slider :min="Number(min)" :max="Number(max)" :step="Number(step)" :value="Number(currentValue)"
					:activeColor="activeColor" :backgroundColor="effectiveBackgroundColor" :block-size="validBlockSize"
					:block-color="blockColor" :show-value="nativeShowValue" :disabled="disabled"
					@changing="changingHandler" @change="changeHandler"></slider>
			</view>

			<!-- 右侧显示当前值 -->
			<view v-if="showValue && valuePosition === 'right'" class="zx-slider__value zx-slider__value--right">
				{{ formatValue(currentValue) }}
			</view>
		</view>

		<!-- 底部显示当前值 -->
		<view v-if="showValue && valuePosition === 'bottom'" class="zx-slider__value zx-slider__value--bottom">
			{{ formatValue(currentValue) }}
		</view>

		<!-- 刻度显示 -->
		<view v-if="showTicks" class="zx-slider__ticks">
			<view v-for="tick in tickMarks" :key="tick.value" class="zx-slider__tick"
				:style="{ left: tick.position + '%' }">
				<view class="zx-slider__tick-mark"></view>
				<text v-if="showTickLabels" class="zx-slider__tick-label">{{ formatValue(tick.value) }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

/**
 * zx-slider 滑动选择器组件
 * @description 基于 uni-app slider 的增强组件，支持更多自定义功能
 */

// 导入属性定义
const props = defineProps({
	// 最小可选值
	min: {
		type: [Number, String],
		default: 0
	},
	// 最大可选值
	max: {
		type: [Number, String],
		default: 100
	},
	// 步长，取值必须大于 0，并且可被(max - min)整除
	step: {
		type: [Number, String],
		default: 1,
		validator: (value) => {
			const num = Number(value);
			return num > 0;
		}
	},
	// 当前取值（v-model）
	modelValue: {
		type: [Number, String],
		default: 0
	},
	// 滑块左侧已选择部分的线条颜色（与官方文档保持一致）
	activeColor: {
		type: String,
		default: '#007aff'
	},
	// 滑块右侧背景条的颜色（与官方文档保持一致的命名）
	backgroundColor: {
		type: String,
		default: '#e9e9e9'
	},
	// 兼容旧版本的 inactiveColor 属性
	inactiveColor: {
		type: String,
		default: ''
	},
	// 滑块的大小，取值范围为 12 - 28
	blockSize: {
		type: [Number, String],
		default: 18,
		validator: (value) => {
			const num = Number(value);
			return num >= 12 && num <= 28;
		}
	},
	// 滑块的颜色
	blockColor: {
		type: String,
		default: '#ffffff'
	},
	// 禁用状态
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否显示当前的选择值
	showValue: {
		type: Boolean,
		default: false
	},
	// 值显示位置：left、right、bottom、native
	valuePosition: {
		type: String,
		default: 'native',
		validator: (value) => ['left', 'right', 'bottom', 'native'].includes(value)
	},
	// 是否显示标签
	showLabel: {
		type: Boolean,
		default: false
	},
	// 标签文本
	label: {
		type: String,
		default: ''
	},
	// 是否显示范围值
	showRange: {
		type: Boolean,
		default: false
	},
	// 是否显示刻度
	showTicks: {
		type: Boolean,
		default: false
	},
	// 是否显示刻度标签
	showTickLabels: {
		type: Boolean,
		default: false
	},
	// 刻度数量
	tickCount: {
		type: [Number, String],
		default: 5
	},
	// 值格式化函数或格式化配置
	formatter: {
		type: [Function, Object],
		default: null
	},
	// 单位
	unit: {
		type: String,
		default: ''
	},
	// 小数位数
	precision: {
		type: [Number, String],
		default: 0
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 是否在拖动时实时更新modelValue
	updateOnChanging: {
		type: Boolean,
		default: false
	}
});

// 定义事件
const emit = defineEmits(['update:modelValue', 'changing', 'change']);

// 当前值
const currentValue = ref(Number(props.modelValue));

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
	currentValue.value = Number(newVal);
}, { immediate: true });

// 计算有效的背景色（兼容旧版本）
const effectiveBackgroundColor = computed(() => {
	return props.inactiveColor || props.backgroundColor;
});

// 计算有效的滑块大小
const validBlockSize = computed(() => {
	const size = Number(props.blockSize);
	return Math.max(12, Math.min(28, size));
});

// 是否使用原生显示值
const nativeShowValue = computed(() => {
	return props.showValue && props.valuePosition === 'native';
});

// 生成刻度标记
const tickMarks = computed(() => {
	if (!props.showTicks) return [];

	const ticks = [];
	const count = Number(props.tickCount);
	const minVal = Number(props.min);
	const maxVal = Number(props.max);
	const range = maxVal - minVal;

	for (let i = 0; i <= count; i++) {
		const value = minVal + (range * i / count);
		const position = (value - minVal) / range * 100;
		ticks.push({ value, position });
	}

	return ticks;
});

// 格式化显示值
function formatValue(value) {
	const numValue = Number(value);

	// 如果有自定义格式化函数
	if (typeof props.formatter === 'function') {
		return props.formatter(numValue);
	}

	// 如果有格式化配置对象
	if (props.formatter && typeof props.formatter === 'object') {
		const { prefix = '', suffix = '', decimals } = props.formatter;
		const precision = decimals !== undefined ? decimals : Number(props.precision);
		return `${prefix}${numValue.toFixed(precision)}${suffix}`;
	}

	// 默认格式化
	const precision = Number(props.precision);
	let formatted = numValue.toFixed(precision);

	// 添加单位
	if (props.unit) {
		formatted += props.unit;
	}

	return formatted;
}

// 验证并修正值
function validateValue(value) {
	const numValue = Number(value);
	const minVal = Number(props.min);
	const maxVal = Number(props.max);
	const stepVal = Number(props.step);

	// 确保值在范围内
	let validValue = Math.max(minVal, Math.min(maxVal, numValue));

	// 确保值符合步长
	const steps = Math.round((validValue - minVal) / stepVal);
	validValue = minVal + steps * stepVal;

	return validValue;
}

// 拖动过程中触发
function changingHandler(e) {
	const { value } = e.detail;
	const validValue = validateValue(value);

	currentValue.value = validValue;

	// 如果启用实时更新
	if (props.updateOnChanging) {
		emit('update:modelValue', validValue);
	}

	// 触发事件
	emit('changing', {
		value: validValue,
		formattedValue: formatValue(validValue)
	});
}

// 滑动结束时触发
function changeHandler(e) {
	const { value } = e.detail;
	const validValue = validateValue(value);

	currentValue.value = validValue;

	// 更新v-model的值（Vue3使用update:modelValue）
	emit('update:modelValue', validValue);

	// 触发事件
	emit('change', {
		value: validValue,
		formattedValue: formatValue(validValue)
	});
}

// 暴露方法给父组件
defineExpose({
	formatValue,
	validateValue,
	currentValue: computed(() => currentValue.value)
});
</script>

<style lang="scss" scoped>
.zx-slider {
	width: 100%;

	&--disabled {
		opacity: 0.6;
	}

	&__label {
		margin-bottom: 16rpx;
		font-size: 28rpx;
		color: #303133;
		line-height: 1.4;
	}

	&__range {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16rpx;
		font-size: 24rpx;
		color: #909399;

		&-min,
		&-max {
			line-height: 1;
		}
	}

	&__container {
		display: flex;
		align-items: center;
		width: 100%;
	}

	&__slider {
		flex: 1;
		margin: 0 16rpx;
	}

	&__value {
		font-size: 28rpx;
		color: #303133;
		line-height: 1;
		white-space: nowrap;

		&--left {
			margin-right: 16rpx;
			min-width: 60rpx;
			text-align: right;
		}

		&--right {
			margin-left: 16rpx;
			min-width: 60rpx;
			text-align: left;
		}

		&--bottom {
			margin-top: 16rpx;
			text-align: center;
		}
	}

	&__ticks {
		position: relative;
		margin-top: 12rpx;
		height: 40rpx;
	}

	&__tick {
		position: absolute;
		transform: translateX(-50%);

		&-mark {
			width: 2rpx;
			height: 16rpx;
			background-color: #c0c4cc;
			margin: 0 auto;
		}

		&-label {
			display: block;
			margin-top: 8rpx;
			font-size: 20rpx;
			color: #909399;
			text-align: center;
			line-height: 1;
			white-space: nowrap;
			transform: translateX(-50%);
		}
	}
}
</style>
