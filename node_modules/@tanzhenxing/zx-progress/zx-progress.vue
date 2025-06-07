<template>
	<view class="zx-progress__box">
		<view 
			class="zx-progressbar__bg"
			:style="progressBarBgStyle"
		>
			<view 
				class="zx-progress__bar"
				:class="{ 'zx-progress__bar--active': active }"
				:style="progressBarStyle"
			>
			</view>
		</view>
		<view 
			class="zx-progress__percent"
			:style="percentStyle" 
			v-if="showInfo"
		>
			{{ displayPercent }}%
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';

const props = defineProps({
	// 百分比 0-100
	percent: {
		type: [Number, String],
		default: 0
	},
	// 右侧是否显示百分比
	showInfo: {
		type: Boolean,
		default: false
	},
	// 圆角大小，支持 rpx 和 px
	borderRadius: {
		type: [Number, String],
		default: 0
	},
	// 右侧百分比字体大小，支持 rpx 和 px
	fontSize: {
		type: [Number, String],
		default: 16
	},
	// 右侧百分比颜色
	color: {
		type: String,
		default: '#333'
	},
	// 右侧百分比宽度
	percentWidth: {
		type: [Number, String],
		default: 96
	},
	// 进度条线条宽度，支持 rpx 和 px
	strokeWidth: {
		type: [Number, String],
		default: 6
	},
	// 已选进度条颜色，可渐变
	activeColor: {
		type: String,
		default: '#09BB07'
	},
	// 未选择的进度条的颜色
	backgroundColor: {
		type: String,
		default: '#EBEBEB'
	},
	// 进度条从左往右的动画
	active: {
		type: Boolean,
		default: false
	},
	// 动画模式：backwards(从头播) / forwards(从上次结束点接着播)
	activeMode: {
		type: String,
		default: 'backwards',
		validator: (value) => ['backwards', 'forwards'].includes(value)
	},
	// 进度增加1%所需毫秒数
	duration: {
		type: Number,
		default: 30
	}
});

const emits = defineEmits(['activeend']);

// 响应式数据
const currentPercent = ref(0);
const animating = ref(false);
const animationId = ref(null);

// 计算属性
const normalizedPercent = computed(() => {
	let percent = Number(props.percent);
	return Math.max(0, Math.min(100, percent));
});

const displayPercent = computed(() => {
	return Math.round(currentPercent.value);
});

const formatUnit = (value) => {
	if (typeof value === 'string') {
		return value;
	}
	return value + 'rpx';
};

const progressBarBgStyle = computed(() => ({
	height: formatUnit(props.strokeWidth),
	borderRadius: formatUnit(props.borderRadius),
	background: props.backgroundColor
}));

const progressBarStyle = computed(() => {
	const translateX = 100 - currentPercent.value;
	return {
		height: formatUnit(props.strokeWidth),
		background: props.activeColor,
		transform: `translateX(-${translateX}%)`,
		transition: animating.value ? `transform ${getAnimationDuration()}ms linear` : 'none'
	};
});

const percentStyle = computed(() => ({
	width: formatUnit(props.percentWidth),
	fontSize: formatUnit(props.fontSize),
	color: props.color
}));

// 获取动画持续时间
const getAnimationDuration = () => {
	if (!props.active) return 0;
	const diff = Math.abs(normalizedPercent.value - currentPercent.value);
	return props.duration * diff;
};

// 动画进度条
const animateProgress = async () => {
	if (animationId.value) {
		clearTimeout(animationId.value);
		animationId.value = null;
	}

	const targetPercent = normalizedPercent.value;
	const startPercent = props.activeMode === 'backwards' ? 0 : currentPercent.value;
	
	if (!props.active) {
		// 没有动画，直接设置
		currentPercent.value = targetPercent;
		emits('activeend', { percent: targetPercent });
		return;
	}

	if (startPercent === targetPercent) {
		emits('activeend', { percent: targetPercent });
		return;
	}

	// 重置起始位置（如果是backwards模式）
	if (props.activeMode === 'backwards') {
		currentPercent.value = 0;
		await nextTick();
	}

	// 开始动画
	animating.value = true;
	const duration = getAnimationDuration();
	
	// 设置目标值
	await nextTick();
	currentPercent.value = targetPercent;

	// 动画结束回调
	animationId.value = setTimeout(() => {
		animating.value = false;
		emits('activeend', { percent: targetPercent });
		animationId.value = null;
	}, duration);
};

// 监听百分比变化
watch(() => props.percent, () => {
	animateProgress();
}, { immediate: false });

// 监听动画模式变化
watch(() => [props.active, props.activeMode], () => {
	animateProgress();
});

onMounted(() => {
	// 初始化时根据 active 属性决定是否播放动画
	if (props.active && props.activeMode === 'backwards') {
		currentPercent.value = 0;
		nextTick(() => {
			animateProgress();
		});
	} else {
		currentPercent.value = normalizedPercent.value;
	}
});

// 兼容旧版本的属性名
const showInfo = computed(() => props.showInfo);

// 暴露方法供外部调用
defineExpose({
	// 手动触发动画
	startAnimation: animateProgress,
	// 重置进度
	reset: () => {
		if (animationId.value) {
			clearTimeout(animationId.value);
			animationId.value = null;
		}
		animating.value = false;
		currentPercent.value = 0;
	}
});
</script>

<style scoped>
.zx-progress__box {
	width: 100%;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}

.zx-progressbar__bg {
	flex: 1;
	position: relative;
	overflow: hidden;
	transform: translateZ(0);
	box-sizing: border-box;
}

.zx-progress__bar {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	transform: translateX(-100%);
	box-sizing: border-box;
}

.zx-progress__bar--active {
	transition-property: transform;
	transition-timing-function: linear;
}

.zx-progress__percent {
	margin-left: 10rpx;
	text-align: center;
	flex-shrink: 0;
	box-sizing: border-box;
}
</style>
