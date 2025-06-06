<template>
	<view class="zx-landscape__box">
		<view class="zx-landscape__inner" :style="{zIndex:zIndex}" v-if="show">
			<slot></slot>
			<view class="zx-icon__close"
				:style="iconStyle"
				:class="{'zx-icon__bottom':positionNum===1}" v-if="closeIcon" @tap.stop="onClose">
				<icon type="clear" :color="iconColor" :size="iconSize"></icon>
			</view>
		</view>
		<view :style="{backgroundColor:maskBgColor,zIndex:maskZIndex}" @tap.stop="onMaskClose" class="zx-landscape__mask"
			:class="{'zx-mask_hidden':!show}" v-if="mask"></view>
	</view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	//是否显示
	show: {
		type: Boolean,
		default: false
	},
	//显示内容区z-index
	zIndex: {
		type: Number,
		default: 1001
	},
	//是否需要关闭图标
	closeIcon: {
		type: Boolean,
		default: true
	},
	//关闭图标颜色
	iconColor: {
		type: String,
		default: '#fff'
	},
	//关闭图标大小 px
	iconSize: {
		type: Number,
		default: 25
	},
	//icon位置：1-底部 2-右上角 3-左上角
	position: {
		type: [Number, String],
		default: 1
	},
	//关闭图标top值，position为2或3的时候生效
	iconTop: {
		type: String,
		default: '-120rpx'
	},
	//关闭图标bottom值，position为1的时候生效
	iconBottom: {
		type: String,
		default: '-120rpx'
	},
	//关闭图标left值，position为3的时候生效
	iconLeft: {
		type: String,
		default: '0'
	},
	//关闭图标right值，position为2的时候生效
	iconRight: {
		type: String,
		default: '0'
	},
	//点击遮罩是否可以关闭
	maskClosable: {
		type: Boolean,
		default: true
	},
	//是否需要遮罩
	mask: {
		type: Boolean,
		default: true
	},
	//遮罩背景色
	maskBgColor: {
		type: String,
		default: 'rgba(0,0,0,.6)'
	},
	//遮罩z-index值
	maskZIndex: {
		type: Number,
		default: 1000
	},
	//自定义参数
	params: {
		type: [Number, String],
		default: 0
	},
});

const emit = defineEmits(['close']);

const positionNum = computed(() => Number(props.position));

const iconStyle = computed(() => {
	return {
		top: positionNum.value !== 1 ? props.iconTop : 'auto',
		bottom: positionNum.value === 1 ? props.iconBottom : 'auto',
		left:
			positionNum.value === 3
				? props.iconLeft
				: positionNum.value === 1
				? '50%'
				: 'auto',
		right: positionNum.value === 2 ? props.iconRight : 'auto',
	};
});

function onClose() {
	emit('close', { params: props.params });
}

function onMaskClose() {
	if (!props.maskClosable) return;
	emit('close', { params: props.params });
}
</script>

<style scoped>
	.zx-landscape__box {
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}

	.zx-landscape__inner {
		max-width: 100%;
		position: fixed;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.zx-icon__close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: absolute;
		z-index: 10;
	}

	.zx-icon__bottom {
		left: 50% !important;
		transform: translateX(-50%);
	}

	.zx-landscape__mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		opacity: 1;
		transform: scale3d(1, 1, 1);
		transition: all .2s ease-in
	}

	.zx-mask_hidden {
		opacity: 0 !important;
		transform: scale3d(1, 1, 0) !important;
	}
</style>
