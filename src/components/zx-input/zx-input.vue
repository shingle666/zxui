<template>
	<input class="zx-input" :style="getStyle" :value="modelValue" :type="type" :name="name" :disabled="disabled"
		:password="password" :placeholder="placeholder" :placeholderStyle='placeholderStyle'
		:placeholderClass="placeholderClass" :maxlength="maxlength" :cursorSpacing="cursorSpacing"
		:cursorColor="cursorColor" :autoFocus="autoFocus" :focus="focus" :cursor="cursor" :confirmType="confirmType"
		:alwaysEmbed="alwaysEmbed" :confirmHold="confirmHold" :selectionStart="selectionStart"
		:selectionEnd="selectionEnd" :adjustPosition="adjustPosition" :holdKeyboard="holdKeyboard"
		:safePasswordCertPath="safePasswordCertPath" :safePasswordLength="safePasswordLength"
		:safePasswordTimeStamp="safePasswordTimeStamp" :safePasswordNonce="safePasswordNonce"
		:safePasswordSalt="safePasswordSalt" :safePasswordCustomHash="safePasswordCustomHash"
		@keyboardheightchange="keyBoardHeightChange" @confirm="confirm" @nicknamereview="nicknameReview"
		@input="onInput" @focus="onFocus" @blur="blur" />
</template>

<script setup>
	import {
		ref,
		getCurrentInstance,
		computed
	} from 'vue';
	import validator from 'validator';

	const {
		proxy
	} = getCurrentInstance();

	const props = defineProps({
		modelValue: {
			type: [String,Number],
			default: ''
		},
		// 输入框大小 large,default,small
		size: {
			type: String,
			default: ''
		},
		// 表单的控件名称，作为键值对的一部分与表单(form组件)一同提交
		name: {
			type: String,
			default: ''
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		// input的类型 text | number | idcard | digit | tel | safe-password | nickname
		type: {
			type: String,
			default: 'text'
		},
		// 是否是密码类型
		password: {
			type: Boolean,
			default: false
		},
		// 输入框为空时占位符
		placeholder: {
			type: String,
			default: ''
		},
		// 指定 placeholder 的样式
		placeholderStyle: {
			type: String,
			default: ''
		},
		// 指定 placeholder 的样式类
		placeholderClass: {
			type: String,
			default: ''
		},
		// 最大输入长度
		maxlength: {
			type: Number,
			default: 300
		},
		// 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
		cursorSpacing: {
			type: [String, Number],
			default: 0
		},
		// 指定光标颜色
		cursorColor: {
			type: String,
			default: ''
		},
		// 自动获取焦点，与focus属性对比，此属性只会首次生效。
		autoFocus: {
			type: Boolean,
			default: false
		},
		// 获取焦点
		focus: {
			type: Boolean,
			default: false
		},
		// 指定focus时的光标位置
		cursor: {
			type: Number,
			default: 0
		},
		// 设置键盘右下角按钮的文字，仅在 type为text 时生效。 send | search | next | go | done
		confirmType: {
			type: String,
			default: 'done'
		},
		// 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
		alwaysEmbed: {
			type: Boolean,
			default: false
		},
		// 点击键盘右下角按钮时是否保持键盘不收起
		confirmHold: {
			type: Boolean,
			default: false
		},
		// 光标起始位置，自动聚集时有效，需与selection-end搭配使用
		selectionStart: {
			type: Number,
			default: -1
		},
		// 光标结束位置，自动聚集时有效，需与selection-satrt搭配使用
		selectionEnd: {
			type: Number,
			default: -1
		},
		// 键盘弹起时，是否自动上推页面
		adjustPosition: {
			type: Boolean,
			default: true
		},
		// focus时，点击页面的时候不收起键盘
		holdKeyboard: {
			type: Boolean,
			default: false
		},
		// 安全键盘加密公钥的路径，只支持包内路径
		safePasswordCertPath: {
			type: String,
			default: ''
		},
		// 安全键盘输入密码长度
		safePasswordLength: {
			type: Number,
			default: 0
		},
		// 安全键盘加密时间戳
		safePasswordTimeStamp: {
			type: Number,
			default: 0
		},
		// 安全键盘加密盐值
		safePasswordNonce: {
			type: String,
			default: ''
		},
		// 安全键盘计算 hash 盐值，若指定custom-hash 则无效
		safePasswordSalt: {
			type: String,
			default: ''
		},
		// 安全键盘计算 hash 的算法表达式
		safePasswordCustomHash: {
			type: String,
			default: ''
		},
		// 数据验证规则
		validate: {
			type: String,
			default: ''
		},
		// 边框线条大小
		borderSize: {
			type: String,
			default: '1rpx'
		},
		// 边框线条颜色
		borderColor: {
			type: String,
			default: '#ececec'
		},
		borderActiveColor: {
			type: String,
			default: '#2979ff'
		},
		borderErrorColor: {
			type: String,
			default: '#ff0000'
		},
		// 边框样式
		borderStyle:{
			type: String,
			default: 'solid'
		},
		// 边框圆角
		borderRadius: {
			type: String,
			default: '10rpx'
		}
	});

	const isActive = ref(false);
	const isError = ref(false);

	const getStyle = computed(() => {
		let style = {
			border: `${props.borderSize} ${props.borderStyle} ${props.borderColor}`
		};
		if (isActive.value) {
			style = {
				border: `${props.borderSize} ${props.borderStyle} ${props.borderActiveColor}`
			};
		}
		if (isError.value) {
			style = {
				border: `${props.borderSize} ${props.borderStyle} ${props.borderErrorColor}`
			};
		}
		// 输入框大小
		style.borderRadius = props.borderRadius;
		
		switch (props.size) {
			case 'small':
				style.height = '45rpx';
				style.fontSize = '28rpx';
				style.padding = '15rpx 20rpx';
				break;
			case 'large':
				style.height = '80rpx';
				style.fontSize = '34rpx';
				style.padding = '10rpx 20rpx';
				break;
			default:
				style.height = '55rpx';
				style.fontSize = '30rpx';
				style.padding = '15rpx 20rpx';
				break;
		}
		return style;
	});

	function onInput(e) {
		proxy.$emit('update:modelValue', e.detail.value)
	}

	function onFocus(e) {
		isActive.value = true;
		//console.log('focus:'+JSON.stringify(e))
	}
	// 输入框失去焦点时触发，event.detail = {value: value}
	function blur(e) {
		isActive.value = false;
		if (props.validate && !validator[props.validate](e.detail.value)) {
			isError.value = true;
		} else {
			isError.value = false;
		}
	}

	function keyBoardHeightChange(e) {
		//console.log('keyBoardHeightChange:'+JSON.stringify(e))
	}

	// 点击完成按钮时触发，event.detail = {value: value}
	function confirm(e) {
		// console.log('confirm:' + JSON.stringify(e))
	}

	function nicknameReview(e) {
		//console.log('nicknameReview:'+JJSON.stringify(e))
	}
</script>

<style scoped>
	.zx-input {
		
	}
</style>