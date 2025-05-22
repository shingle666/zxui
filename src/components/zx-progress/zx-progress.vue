<template>
	<view class="zx-progress__box">
		<view class="zx-progressbar__bg"
			:style="{ height: width + 'rpx', borderRadius: radius, background: backgroundColor }">
			<view class="zx-progress__bar"
				:style="{ height: width + 'rpx', background: activeColor, transform: `translate3d(-${translateX},0,0)`, transitionDuration: `${time}s` }">
			</view>
		</view>
		<view class="zx-progress__percent"
			:style="{ width: percentWidth + 'rpx', fontSize: size + 'rpx', color: color }" v-if="showInfo">
			{{ percentage }}%
		</view>
	</view>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
	//百分比 0-100
	percent: {
		type: [Number, String],
		default: 0
	},
	//右侧是否显示百分比
	showInfo: {
		type: Boolean,
		default: false
	},
	//圆角大小
	radius: {
		type: String,
		default: '8rpx'
	},
	//右侧百分比字体大小 rpx
	size: {
		type: Number,
		default: 28
	},
	//右侧百分比颜色
	color: {
		type: String,
		default: '#333'
	},
	//右侧百分比宽度
	percentWidth: {
		type: Number,
		default: 96
	},
	//进度条线条宽度 rpx
	width: {
		type: Number,
		default: 8
	},
	//已选进度条颜色,可渐变
	activeColor: {
		type: String,
		default: '#5677fc'
	},
	//未选择的进度条的颜色
	backgroundColor: {
		type: String,
		default: '#EBEBEB'
	},
	//进度增加1%所需毫秒数
	duration: {
		type: Number,
		default: 15
	}
});

const emits = defineEmits(['activeend']);

const percentage = ref(0);
const translateX = ref('-100%');
const time = ref(0);

const darwProgress = () => {
	let percent = Number(props.percent);
	percent = percent > 100 ? 100 : percent;
	time.value = props.duration * Math.abs(percent - percentage.value) / 1000;
	if (percent < percentage.value && (percentage.value - percent) > 30) {
		//后百分比数大于30时 时间缩短
		time.value = time.value / 2;
	}
	setTimeout(() => {
		emits('activeend', {});
	}, time.value * 1000);
	percentage.value = percent;
	translateX.value = (100 - percent) + '%';
};

watch(() => props.percent, () => {
	darwProgress();
});

onMounted(() => {
	darwProgress();
});

</script>

<style scoped>
.zx-progress__box {
	width: 100%;
	display: flex;
	align-items: center;
}

.zx-progressbar__bg {
	width: 100%;
	position: relative;
	overflow: hidden;
	transform: translateZ(0);
}

.zx-progress__bar {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
	transform: translateX(-100%);
	transition-delay: 0s;
	transition-property: transform;
	transition-timing-function: linear;
}

.zx-progress__percent {
	text-align: center;
}
</style>
