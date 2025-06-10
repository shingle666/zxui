<template>
	<view class="zx-skeleton-item" :class="[`zx-skeleton-item--${variant}`, { 'zx-skeleton-item--animated': animated }]"
		:style="skeletonItemStyle"></view>
</template>

<script setup>
import { computed } from 'vue'

/**
 * zx-skeleton-item 骨架屏单元组件
 * @description 骨架屏的基础构建单元，支持多种样式
 * @property {String} variant - 当前渲染的骨架屏类型：text/h1/h3/p/image/circle/rect/button
 * @property {String|Number} width - 宽度，支持百分比和固定值
 * @property {String|Number} height - 高度，支持百分比和固定值
 * @property {String|Number} size - 尺寸（用于circle等正方形元素）
 * @property {Boolean} animated - 是否开启动画效果（继承父组件）
 */

// 定义 props
const props = defineProps({
	variant: {
		type: String,
		default: 'text',
		validator: (value) => {
			return ['text', 'h1', 'h3', 'p', 'image', 'circle', 'rect', 'button'].includes(value)
		}
	},
	width: {
		type: [String, Number],
		default: ''
	},
	height: {
		type: [String, Number],
		default: ''
	},
	size: {
		type: [String, Number],
		default: ''
	},
	animated: {
		type: Boolean,
		default: false
	}
})

// 计算样式
const skeletonItemStyle = computed(() => {
	const style = {}

	// 处理不同类型的默认样式
	switch (props.variant) {
		case 'text':
			style.height = props.height || '32rpx'
			style.borderRadius = '16rpx'
			break
		case 'h1':
			style.height = props.height || '40rpx'
			style.borderRadius = '20rpx'
			break
		case 'h3':
			style.height = props.height || '36rpx'
			style.borderRadius = '18rpx'
			break
		case 'p':
			style.height = props.height || '32rpx'
			style.borderRadius = '16rpx'
			break
		case 'image':
			style.height = props.height || '200rpx'
			style.borderRadius = '8rpx'
			break
		case 'circle':
			const circleSize = props.size || props.width || props.height || '60rpx'
			style.width = typeof circleSize === 'number' ? circleSize + 'rpx' : circleSize
			style.height = typeof circleSize === 'number' ? circleSize + 'rpx' : circleSize
			style.borderRadius = '50%'
			break
		case 'rect':
			style.height = props.height || '200rpx'
			style.borderRadius = '8rpx'
			break
		case 'button':
			style.height = props.height || '64rpx'
			style.borderRadius = '32rpx'
			break
	}

	// 自定义宽高覆盖默认值
	if (props.width) {
		style.width = typeof props.width === 'number' ? props.width + 'rpx' : props.width
	}
	if (props.height && props.variant !== 'circle') {
		style.height = typeof props.height === 'number' ? props.height + 'rpx' : props.height
	}

	return style
})
</script>

<style lang="scss" scoped>
.zx-skeleton-item {
	display: inline-block;
	width: 100%;
	background-color: #f2f2f2;
	vertical-align: top;
	position: relative;
	overflow: hidden;

	// 不同类型的默认样式
	&--text {
		width: 100%;
	}

	&--h1 {
		width: 50%;
	}

	&--h3 {
		width: 40%;
	}

	&--p {
		width: 100%;
	}

	&--image {
		width: 100%;
	}

	&--circle {
		flex-shrink: 0;
	}

	&--rect {
		width: 100%;
	}

	&--button {
		width: 120rpx;
	}

	// 动画效果（在父组件中控制）
	&--animated {
		background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
		background-size: 400% 100%;
		animation: zx-skeleton-loading 1.4s ease infinite;
	}
}

@keyframes zx-skeleton-loading {
	0% {
		background-position: 100% 50%;
	}

	100% {
		background-position: 0 50%;
	}
}
</style>