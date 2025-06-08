<template>
	<view
		@touchstart="onTouchStart"
		@touchmove="onTouchMove"
		@touchend="onTouchEnd"
		@touchcancel="onTouchCancel"
		:style="{ width: '100%', height: '100%' }"
	>
		<slot></slot>
	</view>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: true
	}
});

const emits = defineEmits([
	'start',
	'move',
	'scale',
	'tap',
	'end',
	'swipe'
]);

// 记录触摸起始时间
const touchStartTime = ref(0);
// 记录起始触点信息
const startTouches = ref([]);
// 记录缩放初始距离
const startDistance = ref(0);
// 是否为单击
const isTap = ref(false);
// 单击最大判定时间
const TAP_MAX_TIME = 200;
// 滑动最小距离
const SWIPE_MIN_DISTANCE = 50;

// 计算两点间距离
function getDistance(t1, t2) {
	const dx = t2.pageX - t1.pageX;
	const dy = t2.pageY - t1.pageY;
	return Math.sqrt(dx * dx + dy * dy);
}

function onTouchStart(e) {
	const touches = e.touches;
	touchStartTime.value = Date.now();
	startTouches.value = touches.map(t => ({ pageX: t.pageX, pageY: t.pageY }));
	isTap.value = true;
	if (touches.length === 2) {
		startDistance.value = getDistance(touches[0], touches[1]);
	}
	emits('start', startTouches.value);
}

function onTouchMove(e) {
	const touches = e.touches;
	if (touches.length === 1 && startTouches.value.length === 1) {
		const dx = touches[0].pageX - startTouches.value[0].pageX;
		const dy = touches[0].pageY - startTouches.value[0].pageY;
		// 只要有移动就不是 tap
		if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
			isTap.value = false;
		}
		emits('move', { dx, dy, touches });
	} else if (touches.length === 2 && startTouches.value.length === 2) {
		const newDistance = getDistance(touches[0], touches[1]);
		const scale = newDistance / startDistance.value;
		emits('scale', scale);
	}
}

function onTouchEnd(e) {
	const endTime = Date.now();
	const duration = endTime - touchStartTime.value;
	const changedTouches = e.changedTouches;
	// 单指
	if (startTouches.value.length === 1 && changedTouches.length === 1) {
		const dx = changedTouches[0].pageX - startTouches.value[0].pageX;
		const dy = changedTouches[0].pageY - startTouches.value[0].pageY;
		// 判断 tap
		if (isTap.value && duration < TAP_MAX_TIME && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
			emits('tap', changedTouches[0]);
		} else {
			// 判断 swipe
			if (duration < 300) {
				if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_MIN_DISTANCE) {
					emits('swipe', dx > 0 ? 'right' : 'left');
				} else if (Math.abs(dy) > SWIPE_MIN_DISTANCE) {
					emits('swipe', dy > 0 ? 'down' : 'up');
				}
			}
			emits('end', { dx, dy, duration, changedTouches });
		}
	} else if (startTouches.value.length === 2) {
		emits('end', { type: 'multi', changedTouches });
	}
	// 重置
	startTouches.value = [];
	startDistance.value = 0;
	isTap.value = false;
}

function onTouchCancel(e) {
	// 触摸被打断时的处理
	startTouches.value = [];
	startDistance.value = 0;
	isTap.value = false;
}
</script>
<style scoped>
view {
	display: block;
}
</style>
