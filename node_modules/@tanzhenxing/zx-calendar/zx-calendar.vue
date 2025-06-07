<template>
	<view class="zx-calendar">
		<view v-if="!insert&&show" class="zx-calendar__mask" :class="{'zx-calendar--mask-show':aniMaskShow}" @click="clean"></view>
		<view v-if="insert || show" class="zx-calendar__content" :class="{'zx-calendar--fixed':!insert,'zx-calendar--ani-show':aniMaskShow}">
			<view v-if="!insert" class="zx-calendar__header zx-calendar--fixed-top">
				<view class="zx-calendar__header-btn-box" @click="close">
					<text class="zx-calendar__header-text zx-calendar--fixed-width">{{cancelText}}</text>
				</view>
				<view class="zx-calendar__header-btn-box" @click="confirm">
					<text class="zx-calendar__header-text zx-calendar--fixed-width">{{okText}}</text>
				</view>
			</view>
			<view class="zx-calendar__header">
				<view class="zx-calendar__header-btn-box" @click.stop="pre">
					<view class="zx-calendar__header-btn zx-calendar--left"></view>
				</view>
				<picker mode="date" :value="date" fields="month" @change="bindDateChange">
					<text class="zx-calendar__header-text">{{ `${nowDate.year || ''} / ${nowDate.month || ''}` }}</text>
				</picker>
				<view class="zx-calendar__header-btn-box" @click.stop="next">
					<view class="zx-calendar__header-btn zx-calendar--right"></view>
				</view>
				<text class="zx-calendar__backtoday" @click="backtoday">{{todayText}}</text>
			</view>
			<view class="zx-calendar__box">
				<view v-if="showMonth" class="zx-calendar__box-bg">
					<text class="zx-calendar__box-bg-text">{{nowDate.month}}</text>
				</view>
				<view class="zx-calendar__weeks">
					<view class="zx-calendar__weeks-day" v-for="(text, index) in weekTexts" :key="index">
						<text class="zx-calendar__weeks-day-text">{{text}}</text>
					</view>
				</view>
				<view class="zx-calendar__weeks" v-for="(item, weekIndex) in weeks" :key="weekIndex">
					<view class="zx-calendar__weeks-item" v-for="(weeks, weeksIndex) in item" :key="weeksIndex">
						<calendar-item class="zx-calendar-item--hook" :weeks="weeks" :calendar="calendar" :selected="selected" :lunar="lunar" @change="choiceDate"></calendar-item>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, shallowRef } from 'vue';
import { initVueI18n } from '@dcloudio/uni-i18n';
import Calendar from './util.js';
import calendarItem from './zx-calendar-item.vue';
import messages from './i18n/index.js';

const { t } = initVueI18n(messages);

// Define emits
const emit = defineEmits(['close', 'confirm', 'change', 'monthSwitch']);

/**
 * Calendar props
 * @typedef {Object} CalendarProps
 * @property {string} date - Custom date, defaults to today
 * @property {Array} selected - Array of selected dates with info
 * @property {boolean} lunar - Whether to show lunar calendar
 * @property {string} startDate - Date selection range start date
 * @property {string} endDate - Date selection range end date
 * @property {boolean} range - Whether to allow range selection
 * @property {boolean} insert - Whether to use insert mode (true) or popup mode (false)
 * @property {boolean} showMonth - Whether to show month as background
 * @property {boolean} clearDate - Whether to clear previous selection in popup mode
 */

// Define props with default values
const props = defineProps({
	date: {
		type: String,
		default: ''
	},
	selected: {
		type: Array,
		default: () => []
	},
	lunar: {
		type: Boolean,
		default: false
	},
	startDate: {
		type: String,
		default: ''
	},
	endDate: {
		type: String,
		default: ''
	},
	range: {
		type: Boolean,
		default: false
	},
	insert: {
		type: Boolean,
		default: true
	},
	showMonth: {
		type: Boolean,
		default: true
	},
	clearDate: {
		type: Boolean,
		default: true
	}
});

// Reactive state
const show = ref(false);
const weeks = shallowRef([]);
const calendar = reactive({});
const nowDate = reactive({});
const aniMaskShow = ref(false);
const cale = shallowRef(null);
const error = ref(null);

/**
 * Calendar i18n text composable
 * @returns {Object} Text translations for calendar
 */
const useCalendarI18n = () => {
	return {
		okText: computed(() => t("zx-calender.ok")),
		cancelText: computed(() => t("zx-calender.cancel")),
		todayText: computed(() => t("zx-calender.today")),
		weekTexts: computed(() => [
			t("zx-calender.SUN"),
			t("zx-calender.MON"),
			t("zx-calender.TUE"), 
			t("zx-calender.WED"), 
			t("zx-calender.THU"), 
			t("zx-calender.FRI"), 
			t("zx-calender.SAT")
		])
	};
};

// Extract i18n text from composable
const {
	okText,
	cancelText,
	todayText,
	weekTexts
} = useCalendarI18n();

/**
 * Safely execute a function and catch any errors
 * @param {Function} fn - Function to execute
 * @param {Array} args - Arguments to pass to the function
 * @returns {*} - Result of the function or undefined if error
 */
const safeExecute = (fn, ...args) => {
	try {
		return fn(...args);
	} catch (err) {
		error.value = err.message;
		console.error('[zx-calendar]', err);
		return undefined;
	}
};

// Initialize calendar
onMounted(() => {
	// Create calendar instance
	try {
		cale.value = new Calendar({
			selected: props.selected,
			startDate: props.startDate,
			endDate: props.endDate,
			range: props.range,
		});
		
		// Initialize with date
		const initialDate = props.date || cale.value.getDate(new Date()).fullDate;
		init(initialDate);
	} catch (err) {
		error.value = err.message;
		console.error('[zx-calendar] Failed to initialize calendar:', err);
	}
});

/**
 * Initialize date display
 * @param {string} date - Date string to initialize to
 */
const init = (date) => {
	if (!cale.value || !date) return;
	
	safeExecute(() => {
		cale.value.setDate(date);
		weeks.value = cale.value.weeks;
		Object.assign(nowDate, cale.value.getInfo(date));
		Object.assign(calendar, cale.value.getInfo(date));
	});
};

/**
 * Handle date change from picker
 * @param {Object} e - Event object
 */
const bindDateChange = (e) => {
	const value = e.detail.value + '-1';
	setDate(value);
};

/**
 * Set date and update view
 * @param {string} date - Date string to set
 */
const setDate = (date) => {
	if (!cale.value || !date) return;
	
	safeExecute(() => {
		cale.value.setDate(date);
		weeks.value = cale.value.weeks;
		Object.assign(nowDate, cale.value.getInfo(date));
	});
};

/**
 * Open calendar popup
 */
const open = () => {
	// Clean data in popup mode if needed
	if (props.clearDate && !props.insert && cale.value) {
		safeExecute(() => {
			cale.value.cleanMultipleStatus();
			init(props.date);
		});
	}
	
	show.value = true;
	setTimeout(() => {
		aniMaskShow.value = true;
	}, 50);
};

/**
 * Clean method to prevent click propagation
 */
const clean = () => {};

/**
 * Close calendar popup
 */
const close = () => {
	aniMaskShow.value = false;
	setTimeout(() => {
		show.value = false;
		emit('close');
	}, 300);
};

/**
 * Confirm button handler
 */
const confirm = () => {
	setEmit('confirm');
	close();
};

/**
 * Change event trigger
 */
const change = () => {
	if (!props.insert) return;
	setEmit('change');
};

/**
 * Switch month event
 */
const monthSwitch = () => {
	if (!nowDate.year || !nowDate.month) return;
	
	emit('monthSwitch', {
		year: nowDate.year,
		month: Number(nowDate.month)
	});
};

/**
 * Handle emitting events
 * @param {string} name - Event name to emit
 */
const setEmit = (name) => {
	if (!calendar || !cale.value) return;
	
	const { year, month, date, fullDate, lunar, extraInfo } = calendar;
	
	emit(name, {
		range: cale.value.multipleStatus,
		year,
		month,
		date,
		fulldate: fullDate,
		lunar,
		extraInfo: extraInfo || {}
	});
};

/**
 * Choose date handler
 * @param {Object} weeksData - Week data object
 */
const choiceDate = (weeksData) => {
	if (!weeksData || weeksData.disable || !cale.value) return;
	
	safeExecute(() => {
		Object.assign(calendar, weeksData);
		// Set multiple selection
		cale.value.setMultiple(calendar.fullDate);
		weeks.value = cale.value.weeks;
		change();
	});
};

/**
 * Go to today
 */
const backtoday = () => {
	if (!cale.value) return;
	
	safeExecute(() => {
		const date = cale.value.getDate(new Date()).fullDate;
		init(date);
		change();
	});
};

/**
 * Go to previous month
 */
const pre = () => {
	if (!cale.value || !nowDate.fullDate) return;
	
	safeExecute(() => {
		const preDate = cale.value.getDate(nowDate.fullDate, -1, 'month').fullDate;
		setDate(preDate);
		monthSwitch();
	});
};

/**
 * Go to next month
 */
const next = () => {
	if (!cale.value || !nowDate.fullDate) return;
	
	safeExecute(() => {
		const nextDate = cale.value.getDate(nowDate.fullDate, +1, 'month').fullDate;
		setDate(nextDate);
		monthSwitch();
	});
};

// Watch props for changes
watch(() => props.date, (newVal) => {
	if (newVal && cale.value) {
		init(newVal);
	}
});

watch(() => props.startDate, (val) => {
	if (!cale.value || !nowDate.fullDate) return;
	
	safeExecute(() => {
		cale.value.resetSatrtDate(val);
		cale.value.setDate(nowDate.fullDate);
		weeks.value = cale.value.weeks;
	});
});

watch(() => props.endDate, (val) => {
	if (!cale.value || !nowDate.fullDate) return;
	
	safeExecute(() => {
		cale.value.resetEndDate(val);
		cale.value.setDate(nowDate.fullDate);
		weeks.value = cale.value.weeks;
	});
});

watch(() => props.selected, (newVal) => {
	if (!cale.value || !nowDate.fullDate) return;
	
	safeExecute(() => {
		cale.value.setSelectInfo(nowDate.fullDate, newVal);
		weeks.value = cale.value.weeks;
	});
});

// Expose methods for external use
defineExpose({
	open,
	close,
	setDate
});
</script>

<style lang="scss" scoped>
	$zx-bg-color-mask: rgba($color: #000000, $alpha: 0.4);
	$zx-border-color: #EDEDED;
	$zx-text-color: #333;
	$zx-bg-color-hover:#f1f1f1;
	$zx-font-size-base:14px;
	$zx-text-color-placeholder: #808080;
	$zx-color-subtitle: #555555;
	$zx-text-color-grey:#999;
	.zx-calendar {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
	}

	.zx-calendar__mask {
		position: fixed;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		background-color: $zx-bg-color-mask;
		transition-property: opacity;
		transition-duration: 0.3s;
		opacity: 0;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
	}

	.zx-calendar--mask-show {
		opacity: 1
	}

	.zx-calendar--fixed {
		position: fixed;
		/* #ifdef APP-NVUE */
		bottom: 0;
		/* #endif */
		left: 0;
		right: 0;
		transition-property: transform;
		transition-duration: 0.3s;
		transform: translateY(460px);
		/* #ifndef APP-NVUE */
		bottom: calc(var(--window-bottom));
		z-index: 99;
		/* #endif */
	}

	.zx-calendar--ani-show {
		transform: translateY(0);
	}

	.zx-calendar__content {
		background-color: #fff;
	}

	.zx-calendar__header {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 50px;
		border-bottom-color: $zx-border-color;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.zx-calendar--fixed-top {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		border-top-color: $zx-border-color;
		border-top-style: solid;
		border-top-width: 1px;
	}

	.zx-calendar--fixed-width {
		width: 50px;
		// padding: 0 15px;
	}

	.zx-calendar__backtoday {
		position: absolute;
		right: 0;
		top: 25rpx;
		padding: 0 5px;
		padding-left: 10px;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		border-top-left-radius: 25px;
		border-bottom-left-radius: 25px;
		color: $zx-text-color;
		background-color: $zx-bg-color-hover;
	}

	.zx-calendar__header-text {
		text-align: center;
		width: 100px;
		font-size: $zx-font-size-base;
		color: $zx-text-color;
	}

	.zx-calendar__header-btn-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
	}

	.zx-calendar__header-btn {
		width: 10px;
		height: 10px;
		border-left-color: $zx-text-color-placeholder;
		border-left-style: solid;
		border-left-width: 2px;
		border-top-color: $zx-color-subtitle;
		border-top-style: solid;
		border-top-width: 2px;
	}

	.zx-calendar--left {
		transform: rotate(-45deg);
	}

	.zx-calendar--right {
		transform: rotate(135deg);
	}


	.zx-calendar__weeks {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.zx-calendar__weeks-item {
		flex: 1;
	}

	.zx-calendar__weeks-day {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 45px;
		border-bottom-color: #F5F5F5;
		border-bottom-style: solid;
		border-bottom-width: 1px;
	}

	.zx-calendar__weeks-day-text {
		font-size: 14px;
	}

	.zx-calendar__box {
		position: relative;
	}

	.zx-calendar__box-bg {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.zx-calendar__box-bg-text {
		font-size: 200px;
		font-weight: bold;
		color: $zx-text-color-grey;
		opacity: 0.1;
		text-align: center;
		/* #ifndef APP-NVUE */
		line-height: 1;
		/* #endif */
	}
</style>
