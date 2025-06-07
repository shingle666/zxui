<template>
	<view class="zx-textarea" :class="textareaClass" :style="[textareaStyle]">
		<textarea
			class="field"
			:class="{ disabled: disabled }"
			:value="innerValue"
			:style="textareaFieldStyle"
			:placeholder="placeholder"
			:placeholder-style="computedPlaceholderStyle"
			:placeholder-class="placeholderClass"
			:disabled="disabled"
			:focus="focus"
			:auto-height="autoHeight"
			:fixed="fixed"
			:cursor-spacing="cursorSpacing"
			:cursor="cursor"
			:auto-focus="autoFocus"
			:confirm-type="confirmType"
			:confirm-hold="confirmHold"
			:show-confirm-bar="showConfirmBar"
			:selection-start="selectionStart"
			:selection-end="selectionEnd"
			:adjust-position="adjustPosition"
			:disable-default-padding="disableDefaultPadding"
			:hold-keyboard="holdKeyboard"
			:auto-blur="autoBlur"
			:maxlength="computedMaxlength"
			:ignore-composition-event="ignoreCompositionEvent"
			:inputmode="inputmode"
			@focus="onFocus"
			@blur="onBlur"
			@linechange="onLinechange"
			@input="onInput"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange"
		></textarea>
		<!-- 字数统计 -->
		<text 
			v-if="count" 
			class="count" 
			:class="{ 'count-disabled': disabled, 'count-exceed': isExceedMaxlength }"
			:style="{ 'background-color': disabled ? 'transparent' : '#ffffff' }"
		>
			{{ innerValue.length }}{{ showMaxlengthInCount ? `/${computedMaxlength}` : '' }}
		</text>
		<!-- 清除按钮 -->
		<view 
			v-if="clearable && innerValue && !disabled" 
			class="clear-icon" 
			@tap="onClear"
		>
			<text class="clear-text">×</text>
		</view>
	</view>
</template>

<script setup>
/**
 * Textarea 文本域
 * @description 文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等
 * @tutorial https://zxui.org/components/textarea
 *
 * @property {String | Number} 		value					输入框的内容
 * @property {String | Number}		placeholder				输入框为空时占位符
 * @property {String}			    placeholderClass		指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'textarea-placeholder' ）
 * @property {String | Object}	    placeholderStyle		指定placeholder的样式，字符串/对象形式，如"color: red;"
 * @property {String | Number}		height					输入框高度（默认 140rpx ）
 * @property {String}				confirmType				设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效（默认 'done' ）
 * @property {Boolean}				confirmHold				点击键盘右下角按钮时是否保持键盘不收起（默认 false ）
 * @property {Boolean}				disabled				是否禁用（默认 false ）
 * @property {Boolean}				count					是否显示统计字数（默认 false ）
 * @property {Boolean}				showMaxlengthInCount	字数统计是否显示最大长度（默认 true ）
 * @property {Boolean}				clearable				是否显示清除按钮（默认 false ）
 * @property {Boolean}				focus					是否自动获取焦点，nvue不支持，H5取决于浏览器的实现（默认 false ）
 * @property {Boolean}				autoFocus				自动聚焦，拉起键盘（默认 false ）
 * @property {Boolean}				autoHeight				是否自动增加高度（默认 false ）
 * @property {Boolean}				fixed					如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true（默认 false ）
 * @property {Number}				cursorSpacing			指定光标与键盘的距离（默认 0 ）
 * @property {String | Number}		cursor					指定focus时的光标位置
 * @property {Boolean}				showConfirmBar			是否显示键盘上方带有"完成"按钮那一栏，（默认 true ）
 * @property {Number}				selectionStart			光标起始位置，自动聚焦时有效，需与selection-end搭配使用，（默认 -1 ）
 * @property {Number}				selectionEnd			光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认 -1 ）
 * @property {Boolean}				adjustPosition			键盘弹起时，是否自动上推页面（默认 true ）
 * @property {Boolean}				disableDefaultPadding	是否去掉 iOS 下的默认内边距，只微信小程序有效（默认 false ）
 * @property {Boolean}				holdKeyboard			focus时，点击页面的时候不收起键盘，只微信小程序有效（默认 false ）
 * @property {Boolean}				autoBlur				键盘收起时，是否自动失去焦点（默认 false ）
 * @property {String | Number}		maxlength				最大输入长度，设置为 -1 的时候不限制最大长度（默认 140 ）
 * @property {String}				border					边框类型，surround-四周边框，none-无边框，bottom-底部边框（默认 'surround' ）
 * @property {Boolean}				ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理（默认 true ）
 * @property {String}				inputmode				用户在编辑元素或其内容时可能输入的数据类型的提示
 * @property {String}				fontSize				字体大小（默认 '15px' ）
 * @property {String}				color					字体颜色（默认 '#606266' ）
 * @property {String}				backgroundColor			背景色（默认 '#fff' ）
 * @property {String | Number}		borderRadius			边框圆角（默认 '4px' ）
 * @property {String}				borderColor				边框颜色（默认 '#dadbde' ）
 * @property {String | Number}		padding					内边距（默认 '9px' ）
 *
 * @event {Function(e)} focus					输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
 * @event {Function(e)} blur					输入框失去焦点时触发，event.detail = {value, cursor}
 * @event {Function(e)} linechange				输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
 * @event {Function(e)} input					当键盘输入时，触发 input 事件
 * @event {Function(e)} change					输入框内容变化时触发
 * @event {Function(e)} confirm					点击完成时， 触发 confirm 事件
 * @event {Function(e)} keyboardheightchange	键盘高度发生变化的时候触发此事件
 * @event {Function(e)} clear					点击清除按钮时触发
 * @example <zx-textarea v-model="value" placeholder="请输入内容" ></zx-textarea>
 */

import { ref, getCurrentInstance, computed, watch, nextTick } from 'vue';

// 获取组件实例
const { proxy } = getCurrentInstance();

// 定义 emits
const emit = defineEmits([
	'update:value',
	'input', 
	'change', 
	'focus', 
	'blur', 
	'linechange', 
	'confirm', 
	'keyboardheightchange',
	'clear'
]);

const props = defineProps({
	// 输入框的内容
	value: {
		type: [String, Number],
		default: ''
	},
	// 输入框为空时占位符
	placeholder: {
		type: [String, Number],
		default: ''
	},
	// 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
	placeholderClass: {
		type: String,
		default: 'textarea-placeholder'
	},
	// 指定placeholder的样式
	placeholderStyle: {
		type: [String, Object],
		default: ''
	},
	// 输入框高度
	height: {
		type: [String, Number],
		default: '140rpx'
	},
	// 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
	confirmType: {
		type: String,
		default: 'done',
		validator: (value) => ['send', 'search', 'next', 'go', 'done'].includes(value)
	},
	// 点击键盘右下角按钮时是否保持键盘不收起
	confirmHold: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 是否显示统计字数
	count: {
		type: Boolean,
		default: false
	},
	// 字数统计是否显示最大长度
	showMaxlengthInCount: {
		type: Boolean,
		default: true
	},
	// 是否显示清除按钮
	clearable: {
		type: Boolean,
		default: false
	},
	// 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
	focus: {
		type: Boolean,
		default: false
	},
	// 自动聚焦，拉起键盘
	autoFocus: {
		type: Boolean,
		default: false
	},
	// 是否自动增加高度
	autoHeight: {
		type: Boolean,
		default: false
	},
	// 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
	fixed: {
		type: Boolean,
		default: false
	},
	// 指定光标与键盘的距离
	cursorSpacing: {
		type: Number,
		default: 0
	},
	// 指定focus时的光标位置
	cursor: {
		type: [String, Number],
		default: -1
	},
	// 是否显示键盘上方带有"完成"按钮那一栏，
	showConfirmBar: {
		type: Boolean,
		default: true
	},
	// 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
	selectionStart: {
		type: Number,
		default: -1
	},
	// 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
	selectionEnd: {
		type: Number,
		default: -1
	},
	// 键盘弹起时，是否自动上推页面
	adjustPosition: {
		type: Boolean,
		default: true
	},
	// 是否去掉 iOS 下的默认内边距，只微信小程序有效
	disableDefaultPadding: {
		type: Boolean,
		default: false
	},
	// focus时，点击页面的时候不收起键盘，只微信小程序有效
	holdKeyboard: {
		type: Boolean,
		default: false
	},
	// 键盘收起时，是否自动失去焦点
	autoBlur: {
		type: Boolean,
		default: false
	},
	// 最大输入长度，设置为 -1 的时候不限制最大长度
	maxlength: {
		type: [String, Number],
		default: 140
	},
	// 边框类型，surround-四周边框，none-无边框，bottom-底部边框
	border: {
		type: String,
		default: 'surround',
		validator: (value) => ['surround', 'none', 'bottom'].includes(value)
	},
	// 是否忽略组件内对文本合成系统事件的处理
	ignoreCompositionEvent: {
		type: Boolean,
		default: true
	},
	// 用户在编辑元素或其内容时可能输入的数据类型的提示
	inputmode: {
		type: String,
		default: 'text',
		validator: (value) => ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(value)
	},
	// 字体大小
	fontSize: {
		type: [String, Number],
		default: '15px'
	},
	// 字体颜色
	color: {
		type: String,
		default: '#606266'
	},
	// 背景色
	backgroundColor: {
		type: String,
		default: '#fff'
	},
	// 边框圆角
	borderRadius: {
		type: [String, Number],
		default: '4px'
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: '#dadbde'
	},
	// 内边距
	padding: {
		type: [String, Number],
		default: '9px'
	}
});

// 输入框的值
const innerValue = ref('');
// 是否处于获得焦点状态
const focused = ref(false);
// value是否第一次变化，在watch中，由于加入immediate属性，会在第一次触发，此时不应该认为value发生了变化
const firstChange = ref(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref(false);

// 计算属性：处理 maxlength
const computedMaxlength = computed(() => {
	const max = Number(props.maxlength);
	return max === -1 ? 999999 : max;
});

// 计算属性：是否超出最大长度
const isExceedMaxlength = computed(() => {
	if (props.maxlength === -1) return false;
	return innerValue.value.length > Number(props.maxlength);
});

// 计算属性：placeholder 样式
const computedPlaceholderStyle = computed(() => {
	if (typeof props.placeholderStyle === 'string') {
		return props.placeholderStyle;
	} else if (typeof props.placeholderStyle === 'object') {
		return Object.keys(props.placeholderStyle)
			.map(key => `${key}: ${props.placeholderStyle[key]}`)
			.join('; ');
	}
	return 'color: #c0c4cc';
});

// 计算属性：textarea 字段样式
const textareaFieldStyle = computed(() => {
	const style = {
		height: props.height,
		fontSize: props.fontSize,
		color: props.color
	};

	// #ifdef APP-NVUE
	// 由于textarea在安卓nvue上的差异性，需要额外再调整其内边距
	if (uni.getDeviceInfo && uni.getDeviceInfo().platform && uni.getDeviceInfo().platform.toLowerCase() === 'android') {
		style.paddingTop = '6px';
		style.paddingLeft = '9px';
		style.paddingBottom = '3px';
		style.paddingRight = '6px';
	}
	// #endif

	return style;
});

// 组件的类名
const textareaClass = computed(() => {
	let classStr = '';
	switch (props.border) {
		case 'surround':
			classStr = 'zx-border radius';
			break;
		case 'bottom':
			classStr = 'zx-border-bottom no-radius';
			break;
		case 'none':
			classStr = 'no-border no-radius';
			break;
	}
	if (props.disabled) {
		classStr += ' disabled';
	}
	return classStr;
});

// 组件的样式
const textareaStyle = computed(() => {
	const style = {
		backgroundColor: props.backgroundColor,
		borderRadius: props.border === 'surround' ? props.borderRadius : '0',
		padding: props.padding,
		borderColor: props.borderColor
	};

	// #ifdef APP-NVUE
	// nvue 特殊处理
	if (uni.getDeviceInfo && uni.getDeviceInfo().platform && uni.getDeviceInfo().platform.toLowerCase() === 'android') {
		style.paddingTop = '6px';
		style.paddingLeft = '9px';
		style.paddingBottom = '3px';
		style.paddingRight = '6px';
	}
	// #endif

	return style;
});

// 方法：聚焦事件
const onFocus = (e) => {
	focused.value = true;
	emit('focus', e);
};

// 方法：失焦事件
const onBlur = (e) => {
	focused.value = false;
	emit('blur', e);
};

// 方法：行数变化事件
const onLinechange = (e) => {
	emit('linechange', e);
};

// 方法：输入事件
const onInput = (e) => {
	let { value = '' } = e.detail || {};
	
	// 限制输入长度
	if (props.maxlength !== -1 && value.length > Number(props.maxlength)) {
		value = value.slice(0, Number(props.maxlength));
	}
	
	innerValue.value = value;
	nextTick(() => {
		valueChange();
	});
};

// 内容发生变化，进行处理
const valueChange = () => {
	const value = innerValue.value;
	nextTick(() => {
		emit('update:value', value);
		emit('input', value);
		// 标识value值的变化是由内部引起的
		changeFromInner.value = true;
		emit('change', value);
	});
};

// 方法：确认事件
const onConfirm = (e) => {
	emit('confirm', e);
};

// 方法：键盘高度变化事件
const onKeyboardheightchange = (e) => {
	emit('keyboardheightchange', e);
};

// 方法：清除内容
const onClear = () => {
	innerValue.value = '';
	nextTick(() => {
		valueChange();
		emit('clear');
	});
};

// 监听外部 value 变化
watch(
	() => props.value,
	(newVal) => {
		if (changeFromInner.value) {
			changeFromInner.value = false;
			return;
		}
		innerValue.value = String(newVal || '');
	},
	{ immediate: true }
);

// 监听内部值变化（用于处理 H5 兼容性）
watch(
	innerValue,
	(newVal, oldVal) => {
		/* #ifdef H5 */
		// 在H5中，外部value变化后，修改input中的值，不会触发@input事件，此时手动调用值变化方法
		if (firstChange.value === false && changeFromInner.value === false) {
			valueChange();
		}
		/* #endif */
		firstChange.value = false;
	}
);
</script>

<style lang="scss" scoped>
.zx-border {
	border-width: 0.5px !important;
	border-color: v-bind(borderColor) !important;
	border-style: solid;
}

.zx-border-bottom {
	border-bottom-width: 0.5px !important;
	border-color: v-bind(borderColor) !important;
	border-bottom-style: solid;
}

.no-border {
	border: none !important;
}

.zx-textarea {
	background-color: v-bind(backgroundColor);
	position: relative;
	display: flex;
	flex: 1;
	transition: border-color 0.2s ease;

	.radius {
		border-radius: v-bind(borderRadius);
	}

	.no-radius {
		border-radius: 0;
	}

	&.disabled {
		background-color: #f5f7fa;
		opacity: 0.6;
		
		.field {
			color: #c0c4cc;
		}
	}

	&:hover:not(.disabled) {
		filter: brightness(1.05);
		transform: scale(1.001);
	}

	.field {
		flex: 1;
		font-size: v-bind(fontSize);
		color: v-bind(color);
		width: 100%;
		background: transparent;
		border: none;
		outline: none;
		resize: none;
		line-height: 1.4;
		word-break: break-all;
		word-wrap: break-word;

		&.disabled {
			cursor: not-allowed;
		}

		/* #ifdef H5 */
		&::-webkit-scrollbar {
			width: 4px;
		}

		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 2px;
		}

		&::-webkit-scrollbar-thumb {
			background: #c1c1c1;
			border-radius: 2px;
		}

		&::-webkit-scrollbar-thumb:hover {
			background: #a8a8a8;
		}
		/* #endif */
	}

	.count {
		position: absolute;
		right: 5px;
		bottom: 2px;
		font-size: 12px;
		color: #909193;
		background-color: v-bind(backgroundColor);
		padding: 1px 4px;
		border-radius: 2px;
		pointer-events: none;
		z-index: 1;

		&.count-disabled {
			color: #c0c4cc;
		}

		&.count-exceed {
			color: #f56c6c;
		}
	}

	.clear-icon {
		position: absolute;
		right: 8px;
		top: 8px;
		width: 20px;
		height: 20px;
		background-color: #c0c4cc;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 2;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: #a8abb2;
		}

		.clear-text {
			color: #ffffff;
			font-size: 14px;
			line-height: 1;
		}
	}
}

/* 小程序兼容性样式 */
/* #ifdef MP */
.zx-textarea {
	.field {
		word-break: break-word;
	}
}
/* #endif */

/* App-nvue 特殊样式 */
/* #ifdef APP-NVUE */
.zx-textarea {
	.field {
		word-wrap: normal;
	}
}
/* #endif */
</style>
