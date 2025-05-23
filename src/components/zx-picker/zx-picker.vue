<template>
	<view class="zx-picker-container">
		<!-- 普通选择器 -->
		<picker
			v-if="mode === 'selector'"
			:value="value"
			:range="range"
			:range-key="rangeKey"
			:disabled="disabled"
			:selector-type="selectorType"
			@change="onChange"
			@cancel="onCancel"
		>
			<slot></slot>
		</picker>
		
		<!-- 多列选择器 -->
		<picker
			v-else-if="mode === 'multiSelector'"
			:value="value"
			:range="range"
			:range-key="rangeKey"
			:disabled="disabled"
			mode="multiSelector"
			@change="onChange"
			@columnchange="onColumnChange"
			@cancel="onCancel"
		>
			<slot></slot>
		</picker>
		
		<!-- 时间选择器 -->
		<picker
			v-else-if="mode === 'time'"
			mode="time"
			:value="value"
			:start="start"
			:end="end"
			:disabled="disabled"
			@change="onChange"
			@cancel="onCancel"
		>
			<slot></slot>
		</picker>
		
		<!-- 日期选择器 -->
		<picker
			v-else-if="mode === 'date'"
			mode="date"
			:value="value"
			:start="start"
			:end="end"
			:fields="fields"
			:disabled="disabled"
			@change="onChange"
			@cancel="onCancel"
		>
			<slot></slot>
		</picker>
		
		<!-- 省市区选择器 -->
		<picker
			v-else-if="mode === 'region'"
			mode="region"
			:value="value"
			:custom-item="customItem"
			:disabled="disabled"
			@change="onChange"
			@cancel="onCancel"
		>
			<slot></slot>
		</picker>
		
		<!-- 自定义选择器弹窗 -->
		<view 
			v-if="customMode && displayCustomPicker"
			class="zx-picker-mask" 
			:class="{ 'zx-picker-mask--show': displayCustomPicker }" 
			@click="onClickMask"
		></view>
		<view 
			v-if="customMode && displayCustomPicker"
			class="zx-picker" 
			:class="{ 'zx-picker--show': displayCustomPicker }" 
			:style="{ bottom: displayCustomPicker ? 0 : `-${pickerHeight}px` }"
		>
			<!-- 工具栏 -->
			<view v-if="showToolbar" class="zx-picker__toolbar">
				<view 
					class="zx-picker__toolbar__cancel" 
					:style="{ color: cancelColor }" 
					@click="onCancelCustom"
				>{{ cancelText }}</view>
				<view class="zx-picker__toolbar__title">{{ title }}</view>
				<view 
					class="zx-picker__toolbar__confirm" 
					:style="{ color: confirmColor }" 
					@click="onConfirmCustom"
				>{{ confirmText }}</view>
			</view>
			
			<!-- 自定义选择器视图 -->
			<picker-view
				class="zx-picker__view"
				:value="customPickerValue"
				:indicator-style="indicatorStyle"
				:mask-style="maskStyle"
				@change="onCustomPickerChange"
				:immediate-change="immediateChange"
			>
				<block v-if="mode === 'customSelector'">
					<picker-view-column>
						<view
							v-for="(item, index) in customRange"
							:key="index"
							class="zx-picker__item"
						>
							{{ getDisplayValue(item, rangeKey) }}
						</view>
					</picker-view-column>
				</block>
				
				<block v-else-if="mode === 'customTime'">
					<picker-view-column>
						<view
							v-for="(hour, index) in hours"
							:key="index"
							class="zx-picker__item"
						>{{ hour }}时</view>
					</picker-view-column>
					<picker-view-column>
						<view
							v-for="(minute, index) in minutes"
							:key="index"
							class="zx-picker__item"
						>{{ minute }}分</view>
					</picker-view-column>
				</block>
			</picker-view>
			
			<!-- 加载中 -->
			<view v-if="loading" class="zx-picker__loading">
				<view class="zx-picker__loading-icon"></view>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * zx-picker 选择器组件
 * @description 基于官方picker组件的增强版选择器
 * @property {String} mode - 选择器类型，可选值为：selector/multiSelector/time/date/region
 * @property {Array} range - mode=selector或multiSelector时的数据源
 * @property {String} rangeKey - 当range是对象数组时，指定Object中key的值作为选择器显示内容
 * @property {Number/Array} value - 选择器的初始值
 * @property {Boolean} disabled - 是否禁用
 * @property {String} selectorType - 仅H5大屏时生效，可选值：picker/select/auto
 * @property {String} title - 自定义模式下的标题
 * @property {String} start - 时间/日期的开始值
 * @property {String} end - 时间/日期的结束值
 * @property {String} fields - 日期选择器的粒度，可选值：year/month/day
 * @property {String} customItem - 省市区选择器自定义项文字
 * @property {Boolean} immediateChange - 是否在手指松开时立即触发change事件
 * @property {Boolean} loading - 是否显示加载中状态
 * @event {Function} change - 选择器值变化时触发
 * @event {Function} cancel - 取消选择时触发
 */
import { ref, computed, watch, onMounted } from 'vue';

// Props 定义
const props = defineProps({
	// 选择器类型：selector、multiSelector、time、date、region
	mode: {
		type: String,
		default: 'selector',
		validator: (value) => {
			return ['selector', 'multiSelector', 'time', 'date', 'region', 'customSelector', 'customTime'].includes(value);
		}
	},
	// selector和multiSelector模式的数据源
	range: {
		type: Array,
		default: () => []
	},
	// 当range是对象数组时，指定Object中key的值作为选择器显示内容
	rangeKey: {
		type: String,
		default: ''
	},
	// 选择器的值(默认索引)
	value: {
		type: [Number, String, Array],
		default: 0
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 大屏时的UI类型
	selectorType: {
		type: String,
		default: 'auto'
	},
	
	// 自定义模式下是否显示
	show: {
		type: Boolean,
		default: false
	},
	// 自定义模式下是否显示顶部工具栏
	showToolbar: {
		type: Boolean,
		default: true
	},
	// 自定义模式下工具栏标题
	title: {
		type: String,
		default: ''
	},
	// 自定义模式下取消按钮文字
	cancelText: {
		type: String,
		default: '取消'
	},
	// 自定义模式下确认按钮文字
	confirmText: {
		type: String,
		default: '确定'
	},
	// 自定义模式下取消按钮颜色
	cancelColor: {
		type: String,
		default: '#909193'
	},
	// 自定义模式下确认按钮颜色
	confirmColor: {
		type: String,
		default: '#3c9cff'
	},
	// 自定义模式下是否在点击遮罩层后关闭
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 是否显示加载中
	loading: {
		type: Boolean,
		default: false
	},
	// 是否在手指松开时立即触发change事件
	immediateChange: {
		type: Boolean,
		default: false
	},
	
	// 时间选择器相关
	start: {
		type: String,
		default: ''
	},
	end: {
		type: String,
		default: ''
	},
	
	// 日期选择器相关
	fields: {
		type: String,
		default: 'day',
		validator: (value) => {
			return ['year', 'month', 'day'].includes(value);
		}
	},
	
	// 省市区选择器相关
	customItem: {
		type: String,
		default: ''
	}
});

// 事件定义
const emit = defineEmits(['change', 'cancel', 'columnchange', 'pickerchange']);

// 响应式状态
const pickerHeight = ref(300);
const displayCustomPicker = ref(false);
const customMode = ref(false);
const customRange = ref([]);
const customPickerValue = ref([]);
const hours = ref([]);
const minutes = ref([]);
const multiSelectorValues = ref([]);

// 计算属性
const indicatorStyle = computed(() => 'height: 40px;');
const maskStyle = computed(() => '');

// 监听属性变化
watch(() => props.mode, (val) => {
	customMode.value = val === 'customSelector' || val === 'customTime';
}, { immediate: true });

watch(() => props.show, (val) => {
	if (customMode.value) {
		displayCustomPicker.value = val;
		if (val) {
			initCustomPicker();
		}
	}
}, { immediate: true });

// 组件挂载时初始化
onMounted(() => {
	// 初始化多列选择器值记录
	if (props.mode === 'multiSelector' && Array.isArray(props.range)) {
		props.range.forEach((column) => {
			if (Array.isArray(column) && column.length > 0) {
				multiSelectorValues.value.push(column[0]);
			}
		});
	}
});

// 方法定义
// 初始化自定义选择器
const initCustomPicker = () => {
	if (props.mode === 'customSelector') {
		customRange.value = props.range;
		customPickerValue.value = Array.isArray(props.value) ? props.value : [props.value];
	} else if (props.mode === 'customTime') {
		initCustomTime();
	}
};

// 初始化自定义时间选择器
const initCustomTime = () => {
	// 生成小时和分钟数据
	hours.value = Array.from({length: 24}, (_, i) => i < 10 ? `0${i}` : String(i));
	minutes.value = Array.from({length: 60}, (_, i) => i < 10 ? `0${i}` : String(i));
	
	// 设置默认值
	let hourIndex = 0;
	let minuteIndex = 0;
	
	if (typeof props.value === 'string' && props.value) {
		const [hour, minute] = props.value.split(':');
		hourIndex = parseInt(hour) || 0;
		minuteIndex = parseInt(minute) || 0;
	} else {
		const now = new Date();
		hourIndex = now.getHours();
		minuteIndex = now.getMinutes();
	}
	
	customPickerValue.value = [hourIndex, minuteIndex];
};

// 获取显示值
const getDisplayValue = (item, key) => {
	if (typeof item === 'object' && item !== null) {
		return key ? item[key] : (item.text || JSON.stringify(item));
	}
	return item;
};

// 选择器值变化
const onChange = (e) => {
	// 准备事件对象
	const eventObj = {
		detail: {
			value: e.detail.value
		}
	};
	
	// 针对不同模式进行处理
	if (props.mode === 'selector') {
		// 记录当前选中项的值
		const selectedIndex = e.detail.value;
		const selectedValue = props.range[selectedIndex];
		eventObj.detail.selectedValue = selectedValue;
		
		if (props.rangeKey && typeof selectedValue === 'object') {
			eventObj.detail.selectedLabel = selectedValue[props.rangeKey];
		} else {
			eventObj.detail.selectedLabel = selectedValue;
		}
	} else if (props.mode === 'multiSelector') {
		// 记录每列选中项的值
		const valueArray = e.detail.value;
		const selectedValues = valueArray.map((value, index) => props.range[index][value]);
		eventObj.detail.selectedValues = selectedValues;
	}
	
	emit('change', eventObj);
};

// 多列选择器某一列变化
const onColumnChange = (e) => {
	const { column, value } = e.detail;
	
	// 更新多列选择器值记录
	if (Array.isArray(props.range) && Array.isArray(props.range[column])) {
		multiSelectorValues.value[column] = props.range[column][value];
	}
	
	emit('columnchange', e);
};

// 取消选择
const onCancel = (e) => {
	emit('cancel', e);
};

// 自定义选择器点击遮罩层
const onClickMask = () => {
	if (props.closeOnClickOverlay) {
		onCancelCustom();
	}
};

// 自定义选择器取消
const onCancelCustom = () => {
	displayCustomPicker.value = false;
	emit('cancel');
};

// 自定义选择器确认
const onConfirmCustom = () => {
	let result;
	
	if (props.mode === 'customSelector') {
		const index = customPickerValue.value[0];
		result = {
			value: index,
			detail: {
				value: index
			}
		};
		
		// 添加选中项的值
		const selectedValue = customRange.value[index];
		if (props.rangeKey && typeof selectedValue === 'object') {
			result.detail.selectedLabel = selectedValue[props.rangeKey];
		} else {
			result.detail.selectedLabel = selectedValue;
		}
		result.detail.selectedValue = selectedValue;
	} else if (props.mode === 'customTime') {
		const hour = hours.value[customPickerValue.value[0]];
		const minute = minutes.value[customPickerValue.value[1]];
		const timeStr = `${hour}:${minute}`;
		
		result = {
			value: timeStr,
			detail: {
				value: timeStr
			}
		};
	}
	
	displayCustomPicker.value = false;
	emit('change', result);
};

// 自定义选择器值变化
const onCustomPickerChange = (e) => {
	customPickerValue.value = e.detail.value;
	
	let result = { detail: { value: customPickerValue.value } };
	
	if (props.mode === 'customTime') {
		const hour = hours.value[customPickerValue.value[0]];
		const minute = minutes.value[customPickerValue.value[1]];
		result.detail.time = `${hour}:${minute}`;
	}
	
	emit('pickerchange', result);
};
</script>

<style lang="scss" scoped>
.zx-picker-container {
	position: relative;
}

/* 自定义选择器样式 */
.zx-picker-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	z-index: 999;
	opacity: 0;
	visibility: hidden;
	transition: all 0.3s;
	
	&--show {
		opacity: 1;
		visibility: visible;
	}
}

.zx-picker {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 1000;
	transition: all 0.3s;
	transform: translateY(100%);
	
	&--show {
		transform: translateY(0);
	}
	
	&__toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44px;
		padding: 0 15px;
		background-color: #f8f8f8;
		position: relative;
		
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;
			height: 1px;
			background-color: #eaeaea;
			transform: scaleY(0.5);
		}
		
		&__cancel, &__confirm {
			font-size: 14px;
			padding: 8px;
		}
		
		&__title {
			font-size: 16px;
			font-weight: 500;
			color: #333;
		}
	}
	
	&__view {
		width: 100%;
		height: 220px;
	}
	
	&__item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #333;
	}
	
	&__loading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(255, 255, 255, 0.8);
		
		&-icon {
			width: 30px;
			height: 30px;
			border: 2px solid #3c9cff;
			border-radius: 50%;
			border-top-color: transparent;
			animation: loading 0.8s linear infinite;
		}
	}
}

@keyframes loading {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
