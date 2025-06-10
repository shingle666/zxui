<template>
	<view class="zx-turntable" :animation="animationData">
		<view class="zx-turntable-item" v-for="(item, index) in rewardNames" :key="index"
			:style="{ transform: 'rotate(' + (initialRotation - averageRotate * index) + 'deg)' }">
			<view class="zx-turntable-inner" :style="{
				transform: 'translateX(-300rpx) rotate(' + averageRotate + 'deg)',
				background: safeRewardBGColors[index]
			}">
				<text class="zx-turntable-text" :style="{
					transform: 'translateY(120rpx) translateX(' + textTrX + ') rotate(' + textRotate + ')',
					fontSize: fontSize,
					color: safeRewardColors[index]
				}">
					{{ item }}
				</text>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
	// 奖品名称
	rewardNames: {
		type: Array,
		default: () => ['', '', '', '', '', '']
	},
	// 奖品展示区背景颜色
	rewardBGColors: {
		type: Array,
		default: () => []
	},
	// 奖品展示区文本颜色
	rewardColors: {
		type: Array,
		default: () => []
	},
	// 文本尺寸
	fontSize: {
		type: String,
		default: '32rpx'
	},
	// 转动圈数
	turns: {
		type: Number,
		default: 6
	},
	// 转动时间 (ms)
	duration: {
		type: Number,
		default: 5000
	}
});

const emit = defineEmits(['end']);

// 是否正在抽奖
const isSpinning = ref(false);
// 动画对象
const animationData = ref({});

// 角度计算
const numRewards = computed(() => props.rewardNames.length);
const averageRotate = computed(() => numRewards.value > 0 ? 360 / numRewards.value : 0);
const initialRotation = computed(() => numRewards.value > 0 ? (averageRotate.value / 2) * -1 : 0);

// 文本定位调整
const textPosition = computed(() => {
	let trX = '43rpx'; // Default for 6 items
	let rot = '55deg';  // Default for 6 items
	if (numRewards.value > 0) {
		switch (numRewards.value) {
			case 4:
				trX = '0rpx';
				rot = '-45deg';
				break;
			case 6:
				trX = '43rpx';
				rot = '55deg';
				break;
			case 8:
				trX = '72rpx';
				rot = '65deg';
				break;
			// Default for other counts will use the 6-item settings
		}
	}
	return { x: trX, rotation: rot };
});

const textTrX = computed(() => textPosition.value.x);
const textRotate = computed(() => textPosition.value.rotation);

// Default colors if not provided or insufficient
const getSafeColor = (colorsArray, index, defaultColor) => {
	return colorsArray && colorsArray.length > index ? colorsArray[index] : defaultColor;
};

const safeRewardBGColors = computed(() => {
	const defaultColors = ['#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4'];
	if (numRewards.value === 0) return [];
	return props.rewardNames.map((_, i) => getSafeColor(props.rewardBGColors, i, defaultColors[i % defaultColors.length]));
});

const safeRewardColors = computed(() => {
	const defaultColors = ['#C70000', '#8C0000', '#C70000', '#8C0000', '#C70000', '#8C0000', '#C70000', '#8C0000'];
	if (numRewards.value === 0) return [];
	return props.rewardNames.map((_, i) => getSafeColor(props.rewardColors, i, defaultColors[i % defaultColors.length]));
});

const initTurntable = () => {
	if (numRewards.value === 0) {
		animationData.value = {}; // Clear animation if no rewards
		return;
	}

	const animation = uni.createAnimation({
		duration: 0,
		timingFunction: 'ease'
	});
	animation.rotateZ(averageRotate.value / 2).step();
	animationData.value = animation.export();
};

const spinTo = (targetIndex) => {
	if (isSpinning.value || numRewards.value === 0) {
		return;
	}
	if (targetIndex < 0 || targetIndex >= numRewards.value) {
		console.error('Invalid targetIndex for turntable spin:', targetIndex);
		return;
	}

	isSpinning.value = true;

	let resetAnimation = uni.createAnimation({
		duration: 0,
		timingFunction: 'ease'
	});
	resetAnimation.rotateZ(averageRotate.value / 2).step();
	animationData.value = resetAnimation.export();

	const finalRotationValue = (averageRotate.value / 2) + (360 * props.turns) + (averageRotate.value * targetIndex);

	setTimeout(() => {
		const spinAnimation = uni.createAnimation({
			duration: props.duration,
			timingFunction: 'ease-out'
		});
		spinAnimation.rotateZ(finalRotationValue).step();
		animationData.value = spinAnimation.export();
	}, 50);

	setTimeout(() => {
		isSpinning.value = false;
		emit('end', targetIndex);
	}, props.duration + 100);
};

onMounted(() => {
	initTurntable();
});

defineExpose({
	init: initTurntable,
	spinTo,
	isSpinning
});
</script>

<style scoped>
.zx-turntable {
	position: relative;
	transform-origin: center;
	width: 600rpx;
	height: 600rpx;
}

.zx-turntable-item {
	position: absolute;
	left: 50%;
	width: 300rpx;
	height: 600rpx;
	border-radius: 0px 300rpx 300rpx 0;
	overflow: hidden;
	transform-origin: left center;
}

.zx-turntable-inner {
	text-align: center;
	width: 300rpx;
	height: 600rpx;
	transform-origin: right center;
	border-radius: 300rpx 0 0 300rpx;
}

.zx-turntable-text {
	display: block;
	transform-origin: center;
}
</style>
