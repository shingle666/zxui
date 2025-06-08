<template>
	<block v-if="position === 'top'">
		<view
			class="zx-tips-class zx-toptips"
			:style="{ backgroundColor: backgroundColor, color: color, fontSize: size + 'rpx', ...customStyle }"
			:class="[show ? 'zx-top-show' : '']"
		>
			{{ msg }}
		</view>
	</block>
	<block v-else>
		<view
			class="zx-tips-class zx-toast"
			:class="[position === 'center' ? 'zx-centertips' : 'zx-bottomtips', show ? 'zx-toast-show' : '']"
		>
			<view class="zx-tips-content" :style="{ backgroundColor: backgroundColor, color: color, fontSize: size + 'rpx', ...customStyle }">
				{{ msg }}
			</view>
		</view>
	</block>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

/**
 * zx-tips 顶部/底部/中部消息提示组件
 * 支持 H5、小程序、App
 * @property {String} position 位置，top/center/bottom，默认 top
 * @property {String} backgroundColor 背景色，默认 'rgba(0,0,0,0.7)'
 * @property {String} color 文字颜色，默认 '#fff'
 * @property {Number} size 字体大小，默认 30
 * @property {Number} duration 显示时长，默认 2000ms
 * @property {Object} customStyle 自定义样式
 */
const props = defineProps({
	position: { type: String, default: 'top' },
	backgroundColor: { type: String, default: 'rgba(0,0,0,0.7)' },
	color: { type: String, default: '#fff' },
	size: { type: Number, default: 30 },
	duration: { type: Number, default: 2000 },
	customStyle: { type: Object, default: () => ({}) },
});

const show = ref(false);
const msg = ref('');
const timer = ref(null);
const queue = ref([]);

function clearTimer() {
	if (timer.value) {
		clearTimeout(timer.value);
		timer.value = null;
	}
}

function nextMsg() {
	if (queue.value.length > 0) {
		const { msg: m, duration } = queue.value.shift();
		showMsg(m, duration);
	}
}

function showMsg(message, duration = props.duration) {
	clearTimer();
	msg.value = message;
	show.value = true;
	timer.value = setTimeout(() => {
		show.value = false;
		clearTimer();
		nextTick(() => {
			nextMsg();
		});
	}, duration);
}

function showTips(options) {
	// options: string | { msg, duration }
	if (typeof options === 'string') {
		queue.value.push({ msg: options, duration: props.duration });
	} else if (options && typeof options === 'object') {
		queue.value.push({ msg: options.msg, duration: options.duration || props.duration });
	}
	if (!show.value) {
		nextMsg();
	}
}

defineExpose({ show: showTips });
</script>

<style scoped>
.zx-toptips {
	width: 100%;
	padding: 18rpx 30rpx;
	box-sizing: border-box;
	position: fixed;
	z-index: 9999;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	word-break: break-all;
	opacity: 0;
	transform: translateZ(0) translateY(-100%);
	transition: all 0.3s ease-in-out;
}

.zx-top-show {
	transform: translateZ(0) translateY(0);
	opacity: 1;
}

/*注意问题：
 1、fixed 元素宽度无法自适应，所以增加了子元素
 2、fixed 和 display冲突导致动画效果消失，暂时使用visibility替代
*/
.zx-toast {
	width: 80%;
	box-sizing: border-box;
	color: #fff;
	font-size: 28rpx;
	position: fixed;
	visibility: hidden;
	opacity: 0;
	left: 50%;
	transition: all 0.3s ease-in-out;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-toast-show {
	visibility: visible;
	opacity: 1;
}

.zx-tips-content {
	word-wrap: break-word;
	word-break: break-all;
	border-radius: 8rpx;
	padding: 18rpx 30rpx;
}

.zx-bottomtips {
	bottom: 120rpx;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}

.zx-centertips {
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
}
</style>
