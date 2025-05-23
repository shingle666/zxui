<template>
	<view class="zx-code">
		<!-- 提供默认的UI界面，用户也可以通过插槽自定义 -->
		<slot :text="currentText" :canGetCode="canGetCode" :start="start" :reset="reset">
			<button 
				:disabled="!canGetCode" 
				@click="start"
				:class="['zx-code-btn', { 'zx-code-btn--disabled': !canGetCode }]"
			>
				{{ currentText }}
			</button>
		</slot>
	</view>
</template>

<script setup>
/**
 * Code 验证码倒计时组件
 * @description 验证码倒计时组件，支持自定义UI、页面刷新继续倒计时等功能
 * @tutorial https://zxui.org/components/code
 * @property {String | Number}	seconds			倒计时所需的秒数（默认 60）
 * @property {String}			startText		开始前的提示语（默认 '获取验证码'）
 * @property {String}			changeText		倒计时期间的提示语，用X占位秒数（默认 'X秒后重试'）
 * @property {String}			endText			倒计结束的提示语（默认 '重新获取'）
 * @property {Boolean}			keepRunning		是否在页面刷新或返回时继续倒计时（默认 false）
 * @property {String}			uniqueKey		本地存储的唯一标识（默认 'zx_code_timer'）
 * @property {Boolean}			autoStart		是否自动开始倒计时（默认 false）
 * @property {Boolean}			disabled		是否禁用组件（默认 false）
 *
 * @event {Function}	change		倒计时文字变化时触发
 * @event {Function}	start		开始倒计时时触发
 * @event {Function}	end			结束倒计时时触发
 * @event {Function}	tick		每秒倒计时触发，返回剩余秒数
 * @example <zx-code ref="codeRef" @start="handleStart" @end="handleEnd" />
 */
import { ref, getCurrentInstance, onMounted, onBeforeUnmount, computed, watch } from 'vue';

const { proxy } = getCurrentInstance();

// Props 定义
const props = defineProps({
	// 倒计时总秒数
	seconds: {
		type: [String, Number],
		default: 60,
		validator: (value) => Number(value) > 0
	},
	// 开始前的提示文字
	startText: {
		type: String,
		default: '获取验证码'
	},
	// 倒计时中的提示文字模板
	changeText: {
		type: String,
		default: 'X秒后重试'
	},
	// 倒计时结束的提示文字
	endText: {
		type: String,
		default: '重新获取'
	},
	// 是否保持运行状态
	keepRunning: {
		type: Boolean,
		default: false
	},
	// 本地存储唯一标识
	uniqueKey: {
		type: String,
		default: 'zx_code_timer'
	},
	// 是否自动开始
	autoStart: {
		type: Boolean,
		default: false
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	}
});

// 响应式数据
const secNum = ref(0);
const timer = ref(null);
const canGetCode = ref(true);
const currentText = ref('');

// 计算属性
const totalSeconds = computed(() => {
	const num = Number(props.seconds);
	return num > 0 ? num : 60;
});

// 存储键名
const storageKey = computed(() => {
	return `${props.uniqueKey}_countdown_timestamp`;
});

// 监听禁用状态
watch(() => props.disabled, (newVal) => {
	if (newVal && timer.value) {
		pause();
	}
}, { immediate: true });

// 生命周期钩子
onMounted(() => {
	init();
});

onBeforeUnmount(() => {
	cleanup();
});

// 初始化
const init = () => {
	secNum.value = totalSeconds.value;
	
	if (props.keepRunning) {
		checkKeepRunning();
	} else {
		updateText(props.startText);
	}
	
	if (props.autoStart && canGetCode.value && !props.disabled) {
		start();
	}
};

// 检查是否需要继续之前的倒计时
const checkKeepRunning = () => {
	try {
		const lastTimestamp = Number(uni.getStorageSync(storageKey.value));
		
		if (!lastTimestamp) {
			updateText(props.startText);
			return;
		}
		
		const nowTimestamp = Math.floor(Date.now() / 1000);
		
		// 如果保存的时间戳大于当前时间，说明倒计时还未结束
		if (lastTimestamp > nowTimestamp) {
			secNum.value = lastTimestamp - nowTimestamp;
			// 清除存储
			uni.removeStorageSync(storageKey.value);
			// 继续倒计时
			startCountdown();
		} else {
			// 倒计时已过期，清除存储
			uni.removeStorageSync(storageKey.value);
			updateText(props.startText);
		}
	} catch (error) {
		console.warn('zx-code: 检查keepRunning状态失败', error);
		updateText(props.startText);
	}
};

// 开始倒计时
const start = () => {
	if (props.disabled || !canGetCode.value) {
		return false;
	}
	
	try {
		secNum.value = totalSeconds.value;
		startCountdown();
		proxy.$emit('start');
		return true;
	} catch (error) {
		console.error('zx-code: 启动倒计时失败', error);
		return false;
	}
};

// 开始倒计时逻辑
const startCountdown = () => {
	// 清除现有定时器
	clearTimer();
	
	canGetCode.value = false;
	
	// 立即更新显示
	updateCountdownText();
	
	// 设置定时器
	timer.value = setInterval(() => {
		secNum.value--;
		
		if (secNum.value > 0) {
			updateCountdownText();
			proxy.$emit('tick', secNum.value);
		} else {
			end();
		}
	}, 1000);
	
	// 保存时间戳
	saveTimestamp();
};

// 更新倒计时文字
const updateCountdownText = () => {
	const text = props.changeText.replace(/[xX]/g, secNum.value);
	updateText(text);
};

// 结束倒计时
const end = () => {
	clearTimer();
	canGetCode.value = true;
	secNum.value = totalSeconds.value;
	updateText(props.endText);
	
	// 清除本地存储
	if (props.keepRunning) {
		try {
			uni.removeStorageSync(storageKey.value);
		} catch (error) {
			console.warn('zx-code: 清除本地存储失败', error);
		}
	}
	
	proxy.$emit('end');
};

// 重置倒计时
const reset = () => {
	clearTimer();
	canGetCode.value = true;
	secNum.value = totalSeconds.value;
	updateText(props.startText);
	
	// 清除本地存储
	if (props.keepRunning) {
		try {
			uni.removeStorageSync(storageKey.value);
		} catch (error) {
			console.warn('zx-code: 重置时清除本地存储失败', error);
		}
	}
};

// 暂停倒计时
const pause = () => {
	if (timer.value) {
		clearTimer();
		// 保存当前状态到本地存储
		saveTimestamp();
	}
};

// 恢复倒计时
const resume = () => {
	if (!canGetCode.value && secNum.value > 0 && !props.disabled) {
		startCountdown();
	}
};

// 更新文字显示
const updateText = (text) => {
	currentText.value = text;
	proxy.$emit('change', text);
};

// 清除定时器
const clearTimer = () => {
	if (timer.value) {
		clearInterval(timer.value);
		timer.value = null;
	}
};

// 保存时间戳到本地存储
const saveTimestamp = () => {
	if (!props.keepRunning || !timer.value || secNum.value <= 0) {
		return;
	}
	
	try {
		const nowTimestamp = Math.floor(Date.now() / 1000);
		const endTimestamp = nowTimestamp + secNum.value;
		
		uni.setStorageSync(storageKey.value, endTimestamp);
	} catch (error) {
		console.warn('zx-code: 保存时间戳失败', error);
	}
};

// 清理资源
const cleanup = () => {
	clearTimer();
	saveTimestamp();
};

// 获取当前状态
const getStatus = () => {
	return {
		canGetCode: canGetCode.value,
		remainingTime: secNum.value,
		currentText: currentText.value,
		isRunning: !!timer.value
	};
};

// 暴露给父组件的方法和属性
defineExpose({
	start,
	reset,
	pause,
	resume,
	end,
	getStatus,
	canGetCode,
	currentText,
	remainingTime: secNum
});
</script>

<style lang="scss" scoped>
.zx-code {
	display: inline-block;
}

.zx-code-btn {
	padding: 8px 16px;
	background-color: #007aff;
	color: #ffffff;
	border: none;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.3s ease;
	
	&:hover:not(.zx-code-btn--disabled) {
		background-color: #0056cc;
	}
	
	&--disabled {
		background-color: #cccccc;
		color: #999999;
		cursor: not-allowed;
	}
}
</style>
