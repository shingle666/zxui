<template>
	<view :class="show ? '' : 'stamp'">
		<canvas :style="{ width: size + 'px', height: size + 'px' }" type="2d" :canvas-id="stampId" :id="stampId" @touchstart.stop.prevent></canvas>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted, watch, ref, nextTick } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	stampId: {
		type: String,
		default: 'stamp'
	},
	color: {
		type: String,
		default: '#ff0000'
	},
	size: {
		type: Number,
		default: 200
	},
	lineWidth: {
		type: Number,
		default: 5
	},
	companyName: {
		type: String,
		default: 'XX科技有限公司'
	},
	stampName: {
		type: String,
		default: '印章'
	},
	starRadius: {
		type: Number,
		default: 25
	},
	fontFamily: {
		type: String,
		default: '宋体'
	},
	nameFontSize: {
		type: Number,
		default: 16
	},
	companyFontSize: {
		type: Number,
		default: 23
	}
});

const emits = defineEmits(['getImg', 'drawed']);

const drawStamp = () => {
	// 兼容多端canvasId
	let ctx = uni.createCanvasContext(props.stampId, proxy);
	let stampSize = props.size / 2;

	// 清空画布
	ctx.clearRect && ctx.clearRect(0, 0, props.size, props.size);

	// 绘制印章边框
	ctx.save();
	ctx.setLineWidth ? ctx.setLineWidth(props.lineWidth) : ctx.lineWidth = props.lineWidth;
	ctx.setStrokeStyle ? ctx.setStrokeStyle(props.color) : ctx.strokeStyle = props.color;
	ctx.beginPath();
	ctx.arc(stampSize, stampSize, stampSize - props.lineWidth, 0, Math.PI * 2);
	ctx.stroke();
	ctx.restore();

	// 画五角星
	createStar(ctx, stampSize, stampSize, props.starRadius, props.color, 0);

	// 绘制印章名称
	ctx.save();
	ctx.setFontSize ? ctx.setFontSize(props.nameFontSize) : ctx.font = `${props.nameFontSize}px ${props.fontFamily}`;
	ctx.setTextBaseline ? ctx.setTextBaseline('middle') : ctx.textBaseline = 'middle';
	ctx.setTextAlign ? ctx.setTextAlign('center') : ctx.textAlign = 'center';
	ctx.setLineWidth ? ctx.setLineWidth(1) : ctx.lineWidth = 1;
	ctx.setStrokeStyle ? ctx.setStrokeStyle(props.color) : ctx.strokeStyle = props.color;
	ctx.strokeText(props.stampName, stampSize, stampSize + props.starRadius + 35);
	ctx.restore();

	// 绘制印章单位（公司名）
	ctx.save();
	ctx.translate(stampSize, stampSize);
	ctx.setFontSize ? ctx.setFontSize(props.companyFontSize) : ctx.font = `${props.companyFontSize}px ${props.fontFamily}`;
	let count = props.companyName.length;
	let angle = (4 * Math.PI) / (3 * (count - 1));
	let chars = props.companyName.split('');
	for (let i = 0; i < count; i++) {
		if (i === 0) {
			ctx.rotate((5 * Math.PI) / 6);
		} else {
			ctx.rotate(angle);
		}
		ctx.save();
		ctx.translate(stampSize - props.companyFontSize - 20, 0);
		ctx.rotate(Math.PI / 2);
		ctx.strokeText(chars[i], 0, 0);
		ctx.restore();
	}
	ctx.restore();

	ctx.draw(false, () => {
		emits('drawed');
		getImg();
	});
};

const getImg = () => {
	// 兼容多端canvasId
	uni.canvasToTempFilePath({
		x: 0,
		y: 0,
		width: props.size,
		height: props.size,
		destWidth: props.size,
		destHeight: props.size,
		canvasId: props.stampId,
		success: (res) => {
			emits('getImg', res.tempFilePath);
		},
		fail: (err) => {
			// 兼容H5下canvasToTempFilePath异步问题
			setTimeout(() => {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: props.size,
					height: props.size,
					destWidth: props.size,
					destHeight: props.size,
					canvasId: props.stampId,
					success: (res) => {
						emits('getImg', res.tempFilePath);
					}
				}, proxy);
			}, 200);
		}
	}, proxy);
};

function createStar(ctx, sx, sy, radius, color, rotato) {
	ctx.save();
	ctx.setFillStyle ? ctx.setFillStyle(color) : ctx.fillStyle = color;
	ctx.translate(sx, sy);
	ctx.rotate(Math.PI + rotato);
	ctx.beginPath();
	let dig = (Math.PI / 5) * 4;
	for (let i = 0; i < 5; i++) {
		let x = Math.sin(i * dig);
		let y = Math.cos(i * dig);
		ctx.lineTo(x * radius, y * radius);
	}
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}

onMounted(() => {
	nextTick(() => {
		drawStamp();
	});
});

watch(() => [props.show, props.color, props.size, props.lineWidth, props.companyName, props.stampName, props.starRadius, props.fontFamily, props.nameFontSize, props.companyFontSize], () => {
	nextTick(() => {
		drawStamp();
	});
});

// 提供外部方法
const redraw = () => {
	drawStamp();
};

defineExpose({ redraw });
</script>

<style scoped>
.stamp {
	position: absolute;
	left: 1500rpx;
}
</style>
