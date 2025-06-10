<template>
	<view class="zx-sign">
		<view class="canvas-box">
			<!-- 画布 -->
			<view :style="getStyle">
				<canvas :id="canvasId" :canvas-id="canvasId" :style="getStyle" @touchstart="tstart"
					@touchmove="tmove"></canvas>
			</view>
			<!-- 操作按钮 -->
			<slot name="actions">
				<view class="sign-actions-default">
					<view class="sign-desc" :style="{ bottom: canvasHeight * 0.4 + 'px' }">
						<text class="rotated-desc">请在下方手写签名</text>
					</view>
					<view class="sign-button" :class="{ disabled: !isDrawed }" @click="confirm">
						<text class="rotated-text" :style="{ backgroundColor: isDrawed ? '#19be6b' : '#71d5a1' }">确认签名</text>
					</view>
					<view class="re-button" @click="canvasInit">
						<text class="rotated-text" style="background-color: #ff9900">重新签名</text>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>
<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';

const { proxy } = getCurrentInstance();
const emits = defineEmits(['change', 'confirm']);
const props = defineProps({
	// 屏幕方向： 竖屏 portrait，横屏 landscape
	orientation: {
		type: String,
		default: 'portrait'
	},
	canvasId: {
		type: String,
		default: 'mySign'
	},
	// 画布宽度
	width: {
		type: String,
		default: ''
	},
	// 画布高度
	height: {
		type: String,
		default: ''
	},
	// 画布背景色
	backgroundColor: {
		type: String,
		default: '#ececec'
	},
	// 画笔颜色
	lineColor: {
		type: String,
		default: '#333333'
	},
	// 画笔大小
	lineSize: {
		type: String,
		default: '5rpx'
	}
});

const ctx = ref(null); // 画布对象
const drawTimer = ref(null); // 定时器
const isDrawed = ref(false); // 是否已签名
const canvasWidth = ref(0); // px 宽度
const canvasHeight = ref(0); // px 高度
const lineSize = ref(2); // 画笔大小
const signImg = ref(''); // 签名图片

onMounted(() => {
	// 计算画笔大小
	lineSize.value = uni.upx2px(parseInt(props.lineSize));
	// 获取画布高宽
	let systemInfo = uni.getWindowInfo();
	if (props.width) {
		canvasWidth.value = uni.upx2px(parseInt(props.width));
	} else {
		canvasWidth.value = systemInfo.windowWidth;
	}
	if (props.height) {
		canvasHeight.value = uni.upx2px(parseInt(props.height));
	} else {
		canvasHeight.value = systemInfo.windowHeight;
	}
	setTimeout(() => {
		ctx.value = uni.createCanvasContext(props.canvasId);
		canvasInit();
	}, 300);
});

const getStyle = computed(() => {
	return {
		width: canvasWidth.value + 'px',
		height: canvasHeight.value + 'px'
	};
});

// 初始化画布
function canvasInit() {
	setTimeout(() => {
		ctx.value.setFillStyle(props.backgroundColor);
		ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
		ctx.value.draw(true);
		ctx.value.setStrokeStyle(props.lineColor);
		ctx.value.setLineWidth(lineSize.value);
		isDrawed.value = false;
		signImg.value = '';
	}, 100);
}

// 触摸开始
function tstart(e) {
	let x = e.touches[0].x;
	let y = e.touches[0].y;
	ctx.value.moveTo(x, y);
}
// 触摸移动
function tmove(e) {
	let x = e.touches[0].x;
	let y = e.touches[0].y;
	ctx.value.lineTo(x, y);
	ctx.value.stroke();
	ctx.value.draw(true, saveImg());
	ctx.value.moveTo(x, y);
}
// 保存签名图片
function saveImg() {
	isDrawed.value = true;
	if (drawTimer.value != null) {
		clearTimeout(drawTimer.value);
	}
	drawTimer.value = setTimeout(() => {
		uni.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: canvasWidth.value,
			height: canvasHeight.value,
			destWidth: canvasWidth.value,
			destHeight: canvasHeight.value,
			canvasId: props.canvasId,
			success: (res) => {
				signImg.value = res.tempFilePath;
				emits('change', res);
			}
		});
	}, 300);
}
// 确认签名
function confirm() {
	if (!isDrawed.value) {
		return;
	}
	emits('confirm', signImg.value);
}

defineExpose({ confirm, canvasInit });
</script>
<style scoped>
.zx-sign {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	flex: 1;
}

.canvas-box {
	position: absolute;
	top: 0;
	left: 0;
}

.sign-actions-default {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.sign-actions-default>.sign-desc,
.sign-actions-default>.sign-button,
.sign-actions-default>.re-button {
	pointer-events: auto;
}

.sign-desc {
	position: absolute;
	left: 10rpx;
}

.sign-button {
	position: absolute;
	top: 300rpx;
	right: -80rpx;
	opacity: 1;
	transition: opacity 0.2s;
}

.sign-button.disabled {
	opacity: 0.5;
	pointer-events: none;
}

.re-button {
	position: absolute;
	bottom: 100rpx;
	right: -80rpx;
}

.rotated-desc {
	transform: rotate(-90deg);
	/* 逆时针旋转90度 */
	display: inline-block;
	white-space: nowrap;
	transform-origin: left top 0;
	/* 设置旋转的基点 */
	color: #666666;
}

.rotated-text {
	transform: rotate(-90deg);
	/* 逆时针旋转90度 */
	display: inline-block;
	white-space: nowrap;
	transform-origin: left top 0;
	/* 设置旋转的基点 */
	color: #ffffff;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
}
</style>
