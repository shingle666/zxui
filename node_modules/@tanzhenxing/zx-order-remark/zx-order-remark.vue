<template>
	<view class="zx-order-remark" :class="remarkClass" :style="[remarkStyle]">
		<!-- 标题区域 -->
		<view v-if="title" class="remark-title">
			<text class="title-text">{{ title }}</text>
			<text v-if="required" class="required-mark">*</text>
		</view>
		
		<!-- 输入区域 -->
		<view class="remark-input-wrapper">
			<textarea
				class="remark-field"
				:class="{ disabled: disabled, 'has-error': hasError }"
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
			
			<!-- 清除按钮 -->
			<view 
				v-if="clearable && innerValue && !disabled" 
				class="clear-icon" 
				@tap="onClear"
			>
				<text class="clear-text">×</text>
			</view>
		</view>
		
		<!-- 底部信息区域 -->
		<view class="remark-footer">
			<!-- 错误提示 -->
			<text v-if="errorMessage" class="error-message">{{ errorMessage }}</text>
			
			<!-- 字数统计 -->
			<text 
				v-if="showCount" 
				class="count-text" 
				:class="{ 'count-exceed': isExceedMaxlength, 'count-disabled': disabled }"
			>
				{{ innerValue.length }}{{ showMaxlengthInCount ? `/${computedMaxlength}` : '' }}
			</text>
		</view>
		
		<!-- 快捷短语 -->
		<view v-if="quickPhrases && quickPhrases.length > 0" class="quick-phrases">
			<text class="phrases-title">{{ phrasesTitle }}</text>
			<view class="phrases-list">
				<view 
					v-for="(phrase, index) in quickPhrases" 
					:key="index"
					class="phrase-item"
					:class="{ disabled: disabled }"
					@tap="selectPhrase(phrase)"
				>
					<text class="phrase-text">{{ phrase }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
/**
 * OrderRemark 订单备注
 * @description 订单备注组件，专门用于订单备注场景，支持字数限制、快捷短语、清除功能等
 * @tutorial https://zxui.org/components/order-remark
 *
 * @property {String | Number} 	value					输入框的内容
 * @property {String} 			title					标题文本
 * @property {Boolean} 			required				是否必填，显示红色星号（默认 false）
 * @property {String | Number}	placeholder				输入框为空时占位符（默认 '请输入订单备注'）
 * @property {String}			placeholderClass		指定placeholder的样式类（默认 'textarea-placeholder'）
 * @property {String | Object}	placeholderStyle		指定placeholder的样式
 * @property {String | Number}	height					输入框高度（默认 '120rpx'）
 * @property {String}			confirmType				设置键盘右下角按钮的文字（默认 'done'）
 * @property {Boolean}			confirmHold				点击键盘右下角按钮时是否保持键盘不收起（默认 false）
 * @property {Boolean}			disabled				是否禁用（默认 false）
 * @property {Boolean}			showCount				是否显示字数统计（默认 true）
 * @property {Boolean}			showMaxlengthInCount	字数统计是否显示最大长度（默认 true）
 * @property {Boolean}			clearable				是否显示清除按钮（默认 true）
 * @property {Boolean}			focus					是否自动获取焦点（默认 false）
 * @property {Boolean}			autoFocus				自动聚焦，拉起键盘（默认 false）
 * @property {Boolean}			autoHeight				是否自动增加高度（默认 true）
 * @property {Boolean}			fixed					如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true（默认 false）
 * @property {Number}			cursorSpacing			指定光标与键盘的距离（默认 0）
 * @property {String | Number}	cursor					指定focus时的光标位置
 * @property {Boolean}			showConfirmBar			是否显示键盘上方带有"完成"按钮那一栏（默认 true）
 * @property {Number}			selectionStart			光标起始位置（默认 -1）
 * @property {Number}			selectionEnd			光标结束位置（默认 -1）
 * @property {Boolean}			adjustPosition			键盘弹起时，是否自动上推页面（默认 true）
 * @property {Boolean}			disableDefaultPadding	是否去掉 iOS 下的默认内边距（默认 false）
 * @property {Boolean}			holdKeyboard			focus时，点击页面的时候不收起键盘（默认 false）
 * @property {Boolean}			autoBlur				键盘收起时，是否自动失去焦点（默认 false）
 * @property {String | Number}	maxlength				最大输入长度，设置为 -1 的时候不限制最大长度（默认 200）
 * @property {String}			border					边框类型，surround-四周边框，none-无边框，bottom-底部边框（默认 'surround'）
 * @property {Boolean}			ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理（默认 true）
 * @property {String}			inputmode				用户在编辑元素或其内容时可能输入的数据类型的提示（默认 'text'）
 * @property {String}			fontSize				字体大小（默认 '15px'）
 * @property {String}			color					字体颜色（默认 '#606266'）
 * @property {String}			backgroundColor			背景色（默认 '#fff'）
 * @property {String | Number}	borderRadius			边框圆角（默认 '8rpx'）
 * @property {String}			borderColor				边框颜色（默认 '#e4e7ed'）
 * @property {String | Number}	padding					内边距（默认 '24rpx'）
 * @property {Array}			quickPhrases			快捷短语列表
 * @property {String}			phrasesTitle			快捷短语标题（默认 '常用短语'）
 * @property {String}			errorMessage			错误提示信息
 * @property {Boolean}			validateOnBlur			失焦时是否验证（默认 true）
 * @property {Number}			minLength				最小输入长度（默认 0）
 *
 * @event {Function(e)} focus					输入框聚焦时触发
 * @event {Function(e)} blur					输入框失去焦点时触发
 * @event {Function(e)} linechange				输入框行数变化时调用
 * @event {Function(e)} input					当键盘输入时，触发 input 事件
 * @event {Function(e)} change					输入框内容变化时触发
 * @event {Function(e)} confirm				点击完成时，触发 confirm 事件
 * @event {Function(e)} keyboardheightchange	键盘高度发生变化的时候触发此事件
 * @event {Function(e)} clear					点击清除按钮时触发
 * @event {Function(e)} phraseSelect			选择快捷短语时触发
 * @event {Function(e)} validate				验证时触发
 * @example <zx-order-remark v-model="remark" title="订单备注" :quick-phrases="phrases" />
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
	'clear',
	'phraseSelect',
	'validate'
]);

const props = defineProps({
	// 输入框的内容
	value: {
		type: [String, Number],
		default: ''
	},
	// 标题文本
	title: {
		type: String,
		default: ''
	},
	// 是否必填
	required: {
		type: Boolean,
		default: false
	},
	// 输入框为空时占位符
	placeholder: {
		type: [String, Number],
		default: '请输入订单备注'
	},
	// 指定placeholder的样式类
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
		default: '120rpx'
	},
	// 设置键盘右下角按钮的文字
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
	// 是否显示字数统计
	showCount: {
		type: Boolean,
		default: true
	},
	// 字数统计是否显示最大长度
	showMaxlengthInCount: {
		type: Boolean,
		default: true
	},
	// 是否显示清除按钮
	clearable: {
		type: Boolean,
		default: true
	},
	// 是否自动获取焦点
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
		default: true
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
	// 是否显示键盘上方带有"完成"按钮那一栏
	showConfirmBar: {
		type: Boolean,
		default: true
	},
	// 光标起始位置
	selectionStart: {
		type: Number,
		default: -1
	},
	// 光标结束位置
	selectionEnd: {
		type: Number,
		default: -1
	},
	// 键盘弹起时，是否自动上推页面
	adjustPosition: {
		type: Boolean,
		default: true
	},
	// 是否去掉 iOS 下的默认内边距
	disableDefaultPadding: {
		type: Boolean,
		default: false
	},
	// focus时，点击页面的时候不收起键盘
	holdKeyboard: {
		type: Boolean,
		default: false
	},
	// 键盘收起时，是否自动失去焦点
	autoBlur: {
		type: Boolean,
		default: false
	},
	// 最大输入长度
	maxlength: {
		type: [String, Number],
		default: 200
	},
	// 边框类型
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
		default: '8rpx'
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: '#e4e7ed'
	},
	// 内边距
	padding: {
		type: [String, Number],
		default: '24rpx'
	},
	// 快捷短语列表
	quickPhrases: {
		type: Array,
		default: () => []
	},
	// 快捷短语标题
	phrasesTitle: {
		type: String,
		default: '常用短语'
	},
	// 错误提示信息
	errorMessage: {
		type: String,
		default: ''
	},
	// 失焦时是否验证
	validateOnBlur: {
		type: Boolean,
		default: true
	},
	// 最小输入长度
	minLength: {
		type: Number,
		default: 0
	}
});

// 输入框的值
const innerValue = ref('');
// 是否处于获得焦点状态
const focused = ref(false);
// value是否第一次变化
const firstChange = ref(true);
// value绑定值的变化是由内部还是外部引起的
const changeFromInner = ref(false);
// 是否有错误
const hasError = ref(false);

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
	return style;
});

// 组件的类名
const remarkClass = computed(() => {
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
	if (hasError.value) {
		classStr += ' error';
	}
	return classStr;
});

// 组件的样式
const remarkStyle = computed(() => {
	const style = {
		backgroundColor: props.backgroundColor,
		borderRadius: props.border === 'surround' ? props.borderRadius : '0',
		borderColor: hasError.value ? '#f56c6c' : props.borderColor
	};
	return style;
});

// 方法：聚焦事件
const onFocus = (e) => {
	focused.value = true;
	hasError.value = false;
	emit('focus', e);
};

// 方法：失焦事件
const onBlur = (e) => {
	focused.value = false;
	if (props.validateOnBlur) {
		validateInput();
	}
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
	hasError.value = false;
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
	hasError.value = false;
	nextTick(() => {
		valueChange();
		emit('clear');
	});
};

// 方法：选择快捷短语
const selectPhrase = (phrase) => {
	if (props.disabled) return;
	
	innerValue.value = phrase;
	hasError.value = false;
	nextTick(() => {
		valueChange();
		emit('phraseSelect', phrase);
	});
};

// 方法：验证输入
const validateInput = () => {
	const value = innerValue.value;
	let isValid = true;
	let message = '';
	
	// 必填验证
	if (props.required && !value.trim()) {
		isValid = false;
		message = '请输入订单备注';
	}
	
	// 最小长度验证
	if (props.minLength > 0 && value.length < props.minLength) {
		isValid = false;
		message = `至少输入${props.minLength}个字符`;
	}
	
	// 最大长度验证
	if (props.maxlength !== -1 && value.length > Number(props.maxlength)) {
		isValid = false;
		message = `最多输入${props.maxlength}个字符`;
	}
	
	hasError.value = !isValid;
	
	emit('validate', {
		valid: isValid,
		message: message,
		value: value
	});
	
	return isValid;
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

// 监听错误信息变化
watch(
	() => props.errorMessage,
	(newVal) => {
		hasError.value = !!newVal;
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

// 暴露方法给父组件
defineExpose({
	validate: validateInput,
	clear: onClear,
	focus: () => {
		// 由于无法直接操作textarea的focus，这里只是触发focus状态
		focused.value = true;
	},
	blur: () => {
		// 由于无法直接操作textarea的blur，这里只是触发blur状态
		focused.value = false;
	}
});
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

.zx-order-remark {
	background-color: v-bind(backgroundColor);
	position: relative;
	display: flex;
	flex-direction: column;
	transition: border-color 0.2s ease;
	padding: v-bind(padding);

	.radius {
		border-radius: v-bind(borderRadius);
	}

	.no-radius {
		border-radius: 0;
	}

	&.disabled {
		background-color: #f5f7fa;
		opacity: 0.6;
		
		.remark-field {
			color: #c0c4cc;
		}
	}

	&.error {
		border-color: #f56c6c !important;
	}

	&:hover:not(.disabled) {
		filter: brightness(1.02);
	}

	.remark-title {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
		
		.title-text {
			font-size: 28rpx;
			font-weight: 500;
			color: #303133;
		}
		
		.required-mark {
			color: #f56c6c;
			font-size: 28rpx;
			margin-left: 4rpx;
		}
	}

	.remark-input-wrapper {
		position: relative;
		flex: 1;
		
		.remark-field {
			width: 100%;
			height: 100%;
			font-size: v-bind(fontSize);
			color: v-bind(color);
			background: transparent;
			border: none;
			outline: none;
			resize: none;
			line-height: 1.5;
			word-break: break-all;
			word-wrap: break-word;
			box-sizing: border-box;

			&.disabled {
				cursor: not-allowed;
			}
			
			&.has-error {
				color: #f56c6c;
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

		.clear-icon {
			position: absolute;
			right: 8rpx;
			top: 8rpx;
			width: 40rpx;
			height: 40rpx;
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
				font-size: 28rpx;
				line-height: 1;
			}
		}
	}

	.remark-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16rpx;
		min-height: 32rpx;
		
		.error-message {
			font-size: 24rpx;
			color: #f56c6c;
			flex: 1;
		}
		
		.count-text {
			font-size: 24rpx;
			color: #909193;
			margin-left: auto;
			
			&.count-disabled {
				color: #c0c4cc;
			}
			
			&.count-exceed {
				color: #f56c6c;
			}
		}
	}

	.quick-phrases {
		margin-top: 24rpx;
		
		.phrases-title {
			font-size: 24rpx;
			color: #909193;
			margin-bottom: 16rpx;
			display: block;
		}
		
		.phrases-list {
			display: flex;
			flex-wrap: wrap;
			gap: 16rpx;
			
			.phrase-item {
				padding: 12rpx 24rpx;
				background-color: #f8f9fa;
				border: 1px solid #e4e7ed;
				border-radius: 32rpx;
				cursor: pointer;
				transition: all 0.2s ease;
				
				&:hover:not(.disabled) {
					background-color: #ecf5ff;
					border-color: #b3d8ff;
					transform: translateY(-1px);
				}
				
				&:active:not(.disabled) {
					transform: translateY(0);
				}
				
				&.disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
				
				.phrase-text {
					font-size: 24rpx;
					color: #606266;
					white-space: nowrap;
				}
			}
		}
	}
}

/* 小程序兼容性样式 */
/* #ifdef MP */
.zx-order-remark {
	.remark-field {
		word-break: break-word;
	}
}
/* #endif */

/* App-nvue 特殊样式 */
/* #ifdef APP-NVUE */
.zx-order-remark {
	.remark-field {
		word-wrap: normal;
	}
}
/* #endif */
</style>