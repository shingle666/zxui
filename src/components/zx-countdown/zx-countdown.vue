<template>
	<view class="zx-countdown-box">
		<view class="zx-countdown-item"
			:style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(d, width) + 'rpx', height: height + 'rpx' }"
			v-if="days">
			<view class="zx-countdown-time" :class="[scale ? 'zx-countdown-scale' : '']"
				:style="{ fontSize: size + 'rpx', color: color, lineHeight: size + 'rpx' }">
				{{ d }}
			</view>
		</view>
		<view class="zx-countdown-colon" :class="{ 'zx-colon-pad': borderColor == 'transparent' }"
			:style="{ lineHeight: colonSize + 'rpx', fontSize: colonSize + 'rpx', color: colonColor }" v-if="days">
			{{ isColon ? ':' : format.day || '天' }}
		</view>
		<view class="zx-countdown-item"
			:style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(h, width) + 'rpx', height: height + 'rpx' }"
			v-if="hours">
			<view class="zx-countdown-time" :class="[scale ? 'zx-countdown-scale' : '']"
				:style="{ fontSize: size + 'rpx', color: color, lineHeight: size + 'rpx' }">
				{{ h }}
			</view>
		</view>
		<view class="zx-countdown-colon" :class="{ 'zx-colon-pad': borderColor == 'transparent' }"
			:style="{ lineHeight: colonSize + 'rpx', fontSize: colonSize + 'rpx', color: colonColor }" v-if="hours">
			{{ isColon ? ':' : format.hour || '时' }}
		</view>
		<view class="zx-countdown-item"
			:style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(i, width) + 'rpx', height: height + 'rpx' }"
			v-if="minutes">
			<view class="zx-countdown-time" :class="[scale ? 'zx-countdown-scale' : '']"
				:style="{ fontSize: size + 'rpx', color: color, lineHeight: size + 'rpx' }">
				{{ i }}
			</view>
		</view>
		<view class="zx-countdown-colon" :class="{ 'zx-colon-pad': borderColor == 'transparent' }"
			:style="{ lineHeight: colonSize + 'rpx', fontSize: colonSize + 'rpx', color: colonColor }" v-if="minutes">
			{{ isColon ? ':' : format.minute || '分' }}
		</view>
		<view class="zx-countdown-item"
			:style="{ background: backgroundColor, borderColor: borderColor, width: getWidth(s, width) + 'rpx', height: height + 'rpx' }"
			v-if="seconds">
			<view class="zx-countdown-time" :class="[scale ? 'zx-countdown-scale' : '']"
				:style="{ fontSize: size + 'rpx', color: color, lineHeight: size + 'rpx' }">
				{{ s }}
			</view>
		</view>
		<view class="zx-countdown-colon" :class="{ 'zx-colon-pad': borderColor == 'transparent' }"
			:style="{ lineHeight: colonSize + 'rpx', fontSize: colonSize + 'rpx', color: colonColor }"
			v-if="seconds && !isColon">
			{{ unitEn ? 's' : (format.second || '秒') }}
		</view>

		<view class="zx-countdown-colon"
			:style="{ lineHeight: colonSize + 'rpx', fontSize: colonSize + 'rpx', color: colonColor }"
			v-if="seconds && isMs && isColon">.</view>
		<view class="zx-countdown__ms" :style="{
				background: backgroundColor,
				borderColor: borderColor,
				fontSize: msSize + 'rpx',
				color: msColor,
				height: height + 'rpx',
				width: msWidth > 0 ? msWidth + 'rpx' : 'auto'
			}" v-if="seconds && isMs">
			<view :class="{ 'zx-ms__list': ani }">
				<view class="zx-ms__item" :style="{ height: height + 'rpx' }" v-for="(item, index) in ms" :key="index">
					<view :class="[scale ? 'zx-countdown-scale' : '']">{{item}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed, reactive } from 'vue';

// 定义组件属性
const props = defineProps({
	//数字框宽度
	width: {
		type: Number,
		default: 32
	},
	//数字框高度
	height: {
		type: Number,
		default: 32
	},
	//数字框border颜色
	borderColor: {
		type: String,
		default: '#333'
	},
	//数字框背景颜色
	backgroundColor: {
		type: String,
		default: '#fff'
	},
	//数字框字体大小
	size: {
		type: Number,
		default: 24
	},
	//数字框字体颜色
	color: {
		type: String,
		default: '#333'
	},
	//是否缩放 0.9
	scale: {
		type: Boolean,
		default: false
	},
	//冒号大小
	colonSize: {
		type: Number,
		default: 28
	},
	//冒号颜色
	colonColor: {
		type: String,
		default: '#333'
	},
	//剩余时间 (单位：秒)
	time: {
		type: [Number, String],
		default: 0
	},
	//是否包含天
	days: {
		type: Boolean,
		default: false
	},
	//是否包含小时
	hours: {
		type: Boolean,
		default: true
	},
	//是否包含分钟
	minutes: {
		type: Boolean,
		default: true
	},
	//是否包含秒
	seconds: {
		type: Boolean,
		default: true
	},
	//单位用英文缩写表示 仅seconds秒数有效
	unitEn: {
		type: Boolean,
		default: false
	},
	//是否展示为冒号,false为文字
	isColon: {
		type: Boolean,
		default: true
	},
	//是否返回剩余时间
	returnTime: {
		type: Boolean,
		default: false
	},
	//是否显示毫秒
	isMs: {
		type: Boolean,
		default: false
	},
	//毫秒框宽度
	msWidth: {
		type: Number,
		default: 32
	},
	//毫秒字体大小
	msSize: {
		type: Number,
		default: 24
	},
	//毫秒字体颜色
	msColor: {
		type: String,
		default: '#333'
	},
	//是否自动开始
	autoStart: {
		type: Boolean,
		default: true
	},
	//自定义格式化文本
	format: {
		type: Object,
		default: () => ({})
	},
	//是否显示前导零 (如：01小时)
	showZero: {
		type: Boolean,
		default: true
	},
	//更新频率(毫秒)
	interval: {
		type: Number,
		default: 1000
	},
	//时间戳 (优先级高于time)
	timestamp: {
		type: [Number, String],
		default: 0
	}
});

// 定义事件
const emit = defineEmits(['end', 'time', 'start', 'pause', 'resume']);

// 响应式数据
const countdown = ref(null);
const d = ref('0');
const h = ref('00');
const i = ref('00');
const s = ref('00');
const ms = ref([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const ani = ref(false);
const isPaused = ref(false);
const remainingTime = ref(0);
const startTime = ref(0);

// 计算数字框宽度
const getWidth = (num, width) => {
	return num > 99 ? (width / 2) * num.toString().length : width;
};

// 清除定时器
const clearTimer = () => {
	clearInterval(countdown.value);
	countdown.value = null;
};

// 倒计时结束
const endOfTime = (isStop = false) => {
	ani.value = false;
	clearTimer();
	if (!isStop) {
		emit('end', {});
	}
};

// 计算倒计时
const countDown = (seconds) => {
	let [day, hour, minute, second] = [0, 0, 0, 0];
	if (seconds > 0) {
		day = props.days ? Math.floor(seconds / (60 * 60 * 24)) : 0;
		hour = props.hours ? Math.floor(seconds / (60 * 60)) - day * 24 : 0;
		minute = props.minutes ? Math.floor(seconds / 60) - hour * 60 - day * 24 * 60 : 0;
		second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
	}
	
	if (props.showZero) {
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		second = second < 10 ? '0' + second : second;
		day = day < 10 ? '0' + day : day;
	} else {
		hour = hour.toString();
		minute = minute.toString();
		second = second.toString();
		day = day.toString();
	}
	
	d.value = day;
	h.value = hour;
	i.value = minute;
	s.value = second;
	
	return { day, hour, minute, second, seconds };
};

// 开始倒计时循环
const doLoop = () => {
	let seconds = calculateRemainingSeconds();
	startTime.value = Date.now();
	remainingTime.value = seconds;
	ani.value = true;
	isPaused.value = false;
	
	const timeInfo = countDown(seconds);
	emit('start', timeInfo);
	
	countdown.value = setInterval(() => {
		if (isPaused.value) return;
		
		seconds = Math.max(0, remainingTime.value - Math.floor((Date.now() - startTime.value) / props.interval));
		remainingTime.value = seconds;
		
		if (seconds <= 0) {
			endOfTime();
			return;
		}
		
		const timeInfo = countDown(seconds);
		if (props.returnTime) {
			emit('time', timeInfo);
		}
	}, props.interval);
};

// 计算剩余秒数
const calculateRemainingSeconds = () => {
	if (props.timestamp && Number(props.timestamp) > 0) {
		// 如果提供了时间戳，计算与当前时间的差值
		const now = Math.floor(Date.now() / 1000);
		const target = Math.floor(Number(props.timestamp) / 1000);
		return Math.max(0, target - now);
	}
	return Number(props.time || 0);
};

// 监听time和timestamp属性变化
watch([() => props.time, () => props.timestamp], () => {
	restart();
});

// 提供给外部的方法
const pause = () => {
	if (countdown.value && !isPaused.value) {
		isPaused.value = true;
		ani.value = false;
		emit('pause', { seconds: remainingTime.value });
	}
};

const resume = () => {
	if (countdown.value && isPaused.value) {
		isPaused.value = false;
		startTime.value = Date.now();
		ani.value = true;
		emit('resume', { seconds: remainingTime.value });
	}
};

const stop = () => {
	endOfTime(true);
};

const restart = () => {
	clearTimer();
	if (props.autoStart) {
		doLoop();
	}
};

const start = () => {
	if (!countdown.value) {
		doLoop();
	} else if (isPaused.value) {
		resume();
	}
};

// 向父组件暴露方法
defineExpose({
	pause,
	resume,
	stop,
	restart,
	start
});

// 组件挂载时启动倒计时
onMounted(() => {
	clearTimer();
	if (props.autoStart) {
		const seconds = calculateRemainingSeconds();
		if (seconds > 0) {
			doLoop();
		}
	}
});

// 组件卸载前清除定时器
onBeforeUnmount(() => {
	clearTimer();
});
</script>

<style lang="scss" scoped>
	.zx-countdown-box {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: 0; // 可以通过间距属性控制元素间距
	}

	.zx-countdown-item {
		border: 1rpx solid;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6rpx;
		white-space: nowrap;
		transform: translateZ(0);
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		transition: all 0.3s;
		
		// 数字变化的渐变效果
		&.zx-number-change {
			animation: numberChange 0.3s ease-out;
		}
		
		// 可以添加涟漪效果
		&.zx-ripple::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 50%;
			transform: scale(0);
			animation: ripple 1s ease-out forwards;
		}
	}

	.zx-countdown-time {
		margin: 0;
		padding: 0;
		transition: all 0.3s;
		user-select: none;
		-webkit-user-select: none;
		text-align: center;
	}

	.zx-countdown-colon {
		display: flex;
		justify-content: center;
		padding: 0 5rpx;
		transition: all 0.3s;
		user-select: none;
		-webkit-user-select: none;
		
		// 闪烁动画
		&.zx-blink {
			animation: blink 1s infinite;
		}
	}

	.zx-colon-pad {
		padding: 0 !important;
	}

	.zx-countdown-scale {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.zx-countdown__ms {
		border: 1rpx solid;
		overflow: hidden;
		border-radius: 6rpx;
		position: relative;
		box-sizing: border-box;
		transition: all 0.3s;
	}

	/*ms使用css3代替js频繁更新操作，性能优化*/
	.zx-ms__list {
		animation: loop 1s steps(10) infinite;
		will-change: transform; // 优化动画性能
	}

	@keyframes loop {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-100%);
		}
	}

	.zx-ms__item {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	// 数字变化动画
	@keyframes numberChange {
		0% {
			opacity: 0.8;
			transform: translateY(5rpx) scale(0.95);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
	
	// 涟漪效果动画
	@keyframes ripple {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		100% {
			transform: scale(2.5);
			opacity: 0;
		}
	}
	
	// 闪烁动画
	@keyframes blink {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
	
	// 主题样式 - 可以扩展更多预设主题
	.zx-theme-dark {
		.zx-countdown-item {
			background: #333 !important;
			border-color: #444 !important;
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
		}
		
		.zx-countdown-time {
			color: #fff !important;
		}
		
		.zx-countdown-colon {
			color: #aaa !important;
		}
	}
	
	.zx-theme-primary {
		.zx-countdown-item {
			background: #007bff !important;
			border-color: #007bff !important;
			box-shadow: 0 2rpx 8rpx rgba(0, 123, 255, 0.3);
		}
		
		.zx-countdown-time {
			color: #fff !important;
		}
		
		.zx-countdown-colon {
			color: #007bff !important;
		}
	}
	
	.zx-theme-danger {
		.zx-countdown-item {
			background: #dc3545 !important;
			border-color: #dc3545 !important;
			box-shadow: 0 2rpx 8rpx rgba(220, 53, 69, 0.3);
		}
		
		.zx-countdown-time {
			color: #fff !important;
		}
		
		.zx-countdown-colon {
			color: #dc3545 !important;
		}
	}
	
	.zx-theme-success {
		.zx-countdown-item {
			background: #28a745 !important;
			border-color: #28a745 !important;
			box-shadow: 0 2rpx 8rpx rgba(40, 167, 69, 0.3);
		}
		
		.zx-countdown-time {
			color: #fff !important;
		}
		
		.zx-countdown-colon {
			color: #28a745 !important;
		}
	}
	
	// 扁平化风格
	.zx-flat {
		.zx-countdown-item {
			border: none !important;
			border-radius: 2rpx;
			box-shadow: none !important;
		}
	}
	
	// 圆角风格
	.zx-rounded {
		.zx-countdown-item {
			border-radius: 12rpx !important;
		}
		
		.zx-countdown__ms {
			border-radius: 12rpx !important;
		}
	}
	
	// 投影效果
	.zx-shadowed {
		.zx-countdown-item {
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.15) !important;
		}
		
		.zx-countdown__ms {
			box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.15) !important;
		}
	}
</style>
