<template>
	<view class="zx-step" :class="[
		isVertical ? 'is-vertical' : '',
		isSimple ? 'is-simple' : '',
		isLast ? 'is-last' : '',
		isCenter ? 'is-center' : '',
		isActive ? 'is-active' : '',
		status ? `is-${status}` : ''
	]" :style="style">
		<!-- 水平连接线 -->
		<view v-if="!isSimple && !isVertical && !isLast" class="zx-step__line" :style="lineStyle">
			<view class="zx-step__line-inner" :style="lineInnerStyle"></view>
		</view>

		<!-- 垂直连接线 -->
		<view v-if="!isSimple && isVertical && !isLast" class="zx-step__line">
			<view class="zx-step__line-inner" :style="lineInnerStyle"></view>
		</view>

		<!-- 图标部分 -->
		<view class="zx-step__icon" :class="`is-${currentIcon ? 'icon' : 'text'}`">
			<view v-if="currentIcon" class="zx-step__icon-inner">
				<!-- 自定义图标 -->
				<slot name="icon">
					<zx-icon :name="currentIcon" class="zx-step__icon-custom" :color="isActive ? activeColor : ''"></zx-icon>
				</slot>
			</view>
			<view v-else class="zx-step__icon-inner">
				<!-- 默认状态数字 -->
				<text v-if="!isSimple" class="zx-step__number">{{ index + 1 }}</text>
				<text v-else class="zx-step__number-simple">{{ index + 1 }}</text>
			</view>
		</view>

		<!-- 主要内容 -->
		<view class="zx-step__main">
			<view class="zx-step__title" :style="{ 'max-width': stepsCount > 1 ? 100 / stepsCount + '%' : '' }">
				<slot name="title">
					<text :style="{ color: isActive ? activeColor : '' }">{{ title }}</text>
				</slot>
			</view>

			<view v-if="!isSimple && description" class="zx-step__description">
				<slot name="description">
					<text>{{ description }}</text>
				</slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, inject, computed, onBeforeUnmount, getCurrentInstance } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

/**
 * zx-step 步骤组件
 * @description 步骤条的子组件，表示一个单独的步骤，必须配合 zx-steps 组件使用
 * @property {String} title - 步骤标题
 * @property {String} description - 步骤描述文案，简洁模式下不显示
 * @property {String} icon - 自定义图标，如果设置则覆盖默认的数字图标
 * @property {String} status - 设置当前步骤的状态，可选值为wait/process/finish/error/success，优先级高于 zx-steps 设置的状态
 */


// Props定义
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	icon: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		default: '',
		validator: (val) => !val || ['wait', 'process', 'finish', 'error', 'success'].includes(val)
	}
});

// 获取父组件提供的数据
const parent = inject('zxSteps', { props: {}, steps: [] });
const stepsCount = computed(() => parent.steps.length);

// 在组件实例创建时注册步骤
const index = ref(-1);
index.value = parent.registerStep({
	title: props.title,
	description: props.description,
	icon: props.icon,
	status: props.status
});

// 组件销毁时重置步骤
onBeforeUnmount(() => {
	parent.resetSteps();
});

// 计算样式
const style = computed(() => {
	const style = {};
	if (parent.props.space) {
		// 如果指定了间距
		const space = typeof parent.props.space === 'number'
			? parent.props.space + 'px'
			: parent.props.space;

		if (parent.props.direction === 'horizontal') {
			style.flexBasis = `calc((100% - ${space} * ${stepsCount.value - 1}) / ${stepsCount.value})`;
			if (index.value < stepsCount.value - 1) {
				style.marginRight = space;
			}
		} else if (index.value < stepsCount.value - 1) {
			style.marginBottom = space;
		}
	}
	return style;
});

// 计算线条样式
const lineStyle = computed(() => {
	return {
		marginRight: parent.props.space || 0
	};
});

// 当前步骤状态
const currentStatus = computed(() => {
	// 优先使用组件自身状态
	if (props.status) return props.status;

	// 根据激活索引计算状态
	if (parent.props.active > index.value) {
		// 已完成步骤
		return parent.props.finishStatus;
	} else if (parent.props.active === index.value) {
		// 当前激活步骤
		return parent.props.processStatus;
	}

	// 未开始步骤
	return 'wait';
});

// 当前图标
const currentIcon = computed(() => props.icon);

// 是否为活动状态
const isActive = computed(() =>
	currentStatus.value === 'process' ||
	currentStatus.value === 'finish' ||
	currentStatus.value === 'success'
);

// 是否为垂直模式
const isVertical = computed(() => parent.props.direction === 'vertical');

// 是否为简洁模式
const isSimple = computed(() => parent.props.simple);

// 是否居中
const isCenter = computed(() => parent.props.alignCenter && !isSimple.value);

// 是否为最后一个步骤
const isLast = computed(() => index.value === stepsCount.value - 1);

// 主题色
const activeColor = computed(() => '#409eff');

// 线条内部样式
const lineInnerStyle = computed(() => {
	const style = {
		transition: 'all 150ms ease-in-out'
	};

	// 如果步骤已完成，线条也显示完成状态
	if (currentStatus.value === 'finish' || currentStatus.value === 'success') {
		style.borderColor = activeColor.value;
		style.width = '100%';
	}

	return style;
});
</script>

<style lang="scss" scoped>
.zx-step {
	position: relative;
	flex: 1;
	overflow: hidden;
	padding: 16rpx 0;
}

.zx-step.is-vertical {
	display: flex;
	padding: 0 0 16rpx 0;
}

.zx-step.is-center {
	text-align: center;
}

.zx-step.is-active .zx-step__title,
.zx-step.is-active .zx-step__description {
	color: #409eff;
}

.zx-step.is-finish .zx-step__title,
.zx-step.is-finish .zx-step__description,
.zx-step.is-success .zx-step__title,
.zx-step.is-success .zx-step__description {
	color: #67c23a;
}

.zx-step.is-error .zx-step__title,
.zx-step.is-error .zx-step__description {
	color: #f56c6c;
}

/* 步骤线 */
.zx-step__line {
	position: absolute;
	border-color: #dcdfe6;
}

.zx-step.is-vertical .zx-step__line {
	left: 10px;
	top: 40rpx;
	height: calc(100% - 40rpx);
	width: 2rpx;
	border-left: 2rpx solid #dcdfe6;
}

.zx-step:not(.is-vertical) .zx-step__line {
	top: 16px;
	left: 36px;
	right: 0;
	height: 2rpx;
	border-top: 2rpx solid #dcdfe6;
}

.zx-step__line-inner {
	position: absolute;
	border-color: inherit;
	width: 0;
	height: 100%;
}

.zx-step.is-vertical .zx-step__line-inner {
	width: 2rpx;
	height: 0;
	top: 0;
	left: -2rpx;
	border-left: 2rpx solid #409eff;
}

.zx-step:not(.is-vertical) .zx-step__line-inner {
	height: 2rpx;
	width: 0;
	top: -2rpx;
	left: 0;
	border-top: 2rpx solid #409eff;
}

/* 图标 */
.zx-step__icon {
	position: relative;
	width: 32px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	vertical-align: top;
}

.zx-step.is-vertical .zx-step__icon {
	margin-right: 10px;
}

.zx-step.is-center .zx-step__icon {
	margin: 0 auto 8rpx;
	display: flex;
}

.zx-step__icon-inner {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #fff;
	border: 2rpx solid #c0c4cc;
}

.zx-step.is-active .zx-step__icon-inner {
	border-color: #409eff;
	background-color: #409eff;
}

.zx-step.is-finish .zx-step__icon-inner,
.zx-step.is-success .zx-step__icon-inner {
	border-color: #67c23a;
	background-color: #67c23a;
}

.zx-step.is-error .zx-step__icon-inner {
	border-color: #f56c6c;
	background-color: #f56c6c;
}

.zx-step__number,
.zx-step__number-simple {
	color: #c0c4cc;
	font-size: 14px;
}

.zx-step.is-active .zx-step__number,
.zx-step.is-active .zx-step__number-simple,
.zx-step.is-finish .zx-step__number,
.zx-step.is-finish .zx-step__number-simple,
.zx-step.is-success .zx-step__number,
.zx-step.is-success .zx-step__number-simple,
.zx-step.is-error .zx-step__number,
.zx-step.is-error .zx-step__number-simple {
	color: #fff;
}

.zx-step__icon-custom {
	font-size: 18px;
}

/* 主体内容 */
.zx-step__main {
	position: relative;
	padding-left: 10px;
	white-space: normal;
}

.zx-step.is-vertical .zx-step__main {
	flex: 1;
}

.zx-step.is-center .zx-step__main {
	text-align: center;
	padding-left: 0;
	padding-right: 0;
}

/* 标题 */
.zx-step__title {
	padding-right: 10px;
	line-height: 1.5;
	font-size: 16px;
	color: #303133;
	display: inline-block;
}

.zx-step.is-process .zx-step__title {
	font-weight: bold;
}

/* 描述 */
.zx-step__description {
	font-size: 14px;
	color: #909399;
	margin-top: 6rpx;
}

/* 简洁模式 */
.zx-step.is-simple {
	display: flex;
	align-items: center;
}

.zx-step.is-simple .zx-step__main {
	display: flex;
	align-items: center;
}

.zx-step.is-simple .zx-step__title {
	font-size: 14px;
	margin-right: 10px;
}

.zx-step.is-simple .zx-step__icon {
	width: 24px;
	height: 24px;
	line-height: 24px;
}

.zx-step.is-simple .zx-step__icon-inner {
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #c0c4cc;
	border: none;
}

.zx-step.is-simple.is-active .zx-step__icon-inner {
	background-color: #409eff;
}

.zx-step.is-simple.is-finish .zx-step__icon-inner,
.zx-step.is-simple.is-success .zx-step__icon-inner {
	background-color: #67c23a;
}

.zx-step.is-simple.is-error .zx-step__icon-inner {
	background-color: #f56c6c;
}

.zx-step.is-simple:not(:last-child)::after {
	content: '';
	display: inline-block;
	width: 60px;
	height: 1px;
	background-color: #dcdfe6;
	margin: 0 10px;
}

.zx-step.is-simple.is-finish::after,
.zx-step.is-simple.is-success::after {
	background-color: #67c23a;
}
</style>