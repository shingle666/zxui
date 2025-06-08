<template>
	<view class="zx-calendar-item__weeks-box" :class="classObject" @click="choiceDate(weeks)">
		<view class="zx-calendar-item__weeks-box-item">
			<text v-if="selected && weeks.extraInfo" class="zx-calendar-item__weeks-box-circle"></text>
			<text class="zx-calendar-item__weeks-box-text" :class="classObject">{{ weeks.date }}</text>

			<!-- 今日文本显示 -->
			<text v-if="!lunar && !weeks.extraInfo && weeks.isDay" class="zx-calendar-item__weeks-lunar-text"
				:class="classObject">{{ todayText }}</text>

			<!-- 农历显示 -->
			<text v-if="lunar && !weeks.extraInfo" class="zx-calendar-item__weeks-lunar-text" :class="classObject">
				{{ weeks.isDay ? todayText : (weeks.lunar.IDayCn === '初一' ? weeks.lunar.IMonthCn : weeks.lunar.IDayCn) }}
			</text>

			<!-- 额外信息显示 -->
			<text v-if="weeks.extraInfo && weeks.extraInfo.info" class="zx-calendar-item__weeks-lunar-text"
				:class="{ ...classObject, 'zx-calendar-item--extra': weeks.extraInfo.info }">
				{{ weeks.extraInfo.info }}
			</text>
		</view>
	</view>
</template>

<script setup>
import { computed } from 'vue';
import { initVueI18n } from '@dcloudio/uni-i18n';
import messages from './i18n/index.js';

const { t } = initVueI18n(messages);

// 定义事件
const emit = defineEmits(['change']);

// 定义属性
const props = defineProps({
	weeks: {
		type: Object,
		default: () => ({})
	},
	calendar: {
		type: Object,
		default: () => ({})
	},
	selected: {
		type: Array,
		default: () => []
	},
	lunar: {
		type: Boolean,
		default: false
	}
});

// 计算属性 - 今天文本
const todayText = computed(() => t("zx-calender.today"));

// 计算属性 - 样式类对象
const classObject = computed(() => {
	const isToday = props.calendar.fullDate === props.weeks.fullDate;

	return {
		'zx-calendar-item--disable': props.weeks.disable,
		'zx-calendar-item--isDay': isToday && props.weeks.isDay,
		'zx-calendar-item--checked': isToday && !props.weeks.isDay,
		'zx-calendar-item--before-checked': props.weeks.beforeMultiple,
		'zx-calendar-item--multiple': props.weeks.multiple,
		'zx-calendar-item--after-checked': props.weeks.afterMultiple,
		'zx-calendar-item--isDay-text': props.weeks.isDay
	};
});

// 方法 - 选择日期
const choiceDate = (weeks) => {
	emit('change', weeks);
};
</script>

<style lang="scss" scoped>
$zx-font-size-base: 14px;
$zx-text-color: #333;
$zx-font-size-sm: 12px;
$zx-color-error: #e43d33;
$zx-opacity-disabled: 0.3;
$zx-text-color-disable: #c0c0c0;
$zx-primary: #2979ff !default;

.zx-calendar-item__weeks-box {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.zx-calendar-item__weeks-box-text {
	font-size: $zx-font-size-base;
	color: $zx-text-color;
}

.zx-calendar-item__weeks-lunar-text {
	font-size: $zx-font-size-sm;
	color: $zx-text-color;
}

.zx-calendar-item__weeks-box-item {
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100rpx;
	height: 100rpx;
}

.zx-calendar-item__weeks-box-circle {
	position: absolute;
	top: 5px;
	right: 5px;
	width: 8px;
	height: 8px;
	border-radius: 8px;
	background-color: $zx-color-error;
}

.zx-calendar-item--disable {
	background-color: rgba(249, 249, 249, $zx-opacity-disabled);
	color: $zx-text-color-disable;
}

.zx-calendar-item--isDay-text {
	color: $zx-primary;
}

.zx-calendar-item--isDay {
	background-color: $zx-primary;
	opacity: 0.8;
	color: #fff;
}

.zx-calendar-item--extra {
	color: $zx-color-error;
	opacity: 0.8;
}

.zx-calendar-item--checked {
	background-color: $zx-primary;
	color: #fff;
	opacity: 0.8;
}

.zx-calendar-item--multiple {
	background-color: $zx-primary;
	color: #fff;
	opacity: 0.8;
}

.zx-calendar-item--before-checked {
	background-color: #ff5a5f;
	color: #fff;
}

.zx-calendar-item--after-checked {
	background-color: #ff5a5f;
	color: #fff;
}
</style>
