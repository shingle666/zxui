<template>
  <view class="zx-date-picker" :class="[`zx-date-picker--${type}`, { 'zx-date-picker--disabled': disabled }]">
    <!-- 输入框部分 -->
    <view class="zx-date-picker__input-wrapper" @click="handleOpen">
      <view class="zx-date-picker__input" :class="{ 'zx-date-picker__input--focus': visible }">
        <!-- 前缀图标 -->
        <view v-if="prefixIcon" class="zx-date-picker__prefix-icon">
          <zx-icon :name="prefixIcon" />
        </view>

        <!-- 输入值显示 -->
        <view class="zx-date-picker__inner">
          <text v-if="displayValue" class="zx-date-picker__text" :style="{ color: textColor }">{{ displayValue }}</text>
          <text v-else class="zx-date-picker__placeholder">{{ placeholder }}</text>
        </view>

        <!-- 清除图标 -->
        <view v-if="clearable && displayValue && !disabled" class="zx-date-picker__clear-icon"
          @click.stop="handleClear">
          <zx-icon name="close-circle" />
        </view>

        <!-- 后缀图标 -->
        <view v-else class="zx-date-picker__suffix-icon">
          <zx-icon :name="suffixIcon" />
        </view>
      </view>
    </view>

    <!-- 弹窗选择器 -->
    <view v-if="visible" class="zx-date-picker__mask" :class="{ 'zx-date-picker__mask--show': visible }"
      @click="handleMaskClick"></view>

    <view v-if="visible" class="zx-date-picker__popup" :class="{ 'zx-date-picker__popup--show': visible }"
      :style="{ height: popupHeight + 'px' }">
      <!-- 工具栏 -->
      <view class="zx-date-picker__toolbar">
        <view class="zx-date-picker__toolbar-btn" @click="handleCancel">
          <text class="zx-date-picker__toolbar-text">{{ cancelText }}</text>
        </view>
        <view class="zx-date-picker__toolbar-title">
          <text>{{ title }}</text>
        </view>
        <view class="zx-date-picker__toolbar-btn" @click="handleConfirm">
          <text class="zx-date-picker__toolbar-text zx-date-picker__toolbar-text--confirm">{{ confirmText }}</text>
        </view>
      </view>

      <!-- 快捷选项 -->
      <view v-if="shortcuts.length > 0" class="zx-date-picker__shortcuts">
        <view v-for="(shortcut, index) in shortcuts" :key="index" class="zx-date-picker__shortcut"
          @click="handleShortcut(shortcut)">
          <text class="zx-date-picker__shortcut-text">{{ shortcut.text }}</text>
        </view>
      </view>

      <!-- 日期选择器主体 -->
      <view class="zx-date-picker__main">
        <!-- 单个日期选择 -->
        <template v-if="type === 'date' || type === 'datetime'">
          <view class="zx-date-picker__header">
            <view class="zx-date-picker__nav" @click="prevYear">
              <zx-icon name="arrow-left-double" />
            </view>
            <view class="zx-date-picker__nav" @click="prevMonth">
              <zx-icon name="arrow-left" />
            </view>
            <view class="zx-date-picker__current">
              <text>{{ currentYear }}年{{ currentMonth }}月</text>
            </view>
            <view class="zx-date-picker__nav" @click="nextMonth">
              <zx-icon name="arrow-right" />
            </view>
            <view class="zx-date-picker__nav" @click="nextYear">
              <zx-icon name="arrow-right-double" />
            </view>
          </view>

          <!-- 星期标题 -->
          <view class="zx-date-picker__week-header">
            <view v-for="(week, index) in weekdays" :key="index" class="zx-date-picker__week-title">
              <text>{{ week }}</text>
            </view>
          </view>

          <!-- 日期网格 -->
          <view class="zx-date-picker__dates">
            <view v-for="(date, index) in dates" :key="index" class="zx-date-picker__date" :class="getDateClass(date)"
              @click="handleDateClick(date)">
              <text class="zx-date-picker__date-text">{{ date.day }}</text>
            </view>
          </view>

          <!-- 时间选择（datetime类型） -->
          <view v-if="type === 'datetime'" class="zx-date-picker__time">
            <picker-view class="zx-date-picker__time-picker" :value="timeValue" @change="handleTimeChange">
              <picker-view-column>
                <view v-for="hour in hours" :key="hour" class="zx-date-picker__time-item">{{ hour.toString().padStart(2,
                  "0") }}时</view>
              </picker-view-column>
              <picker-view-column>
                <view v-for="minute in minutes" :key="minute" class="zx-date-picker__time-item">{{
                  minute.toString().padStart(2, "0") }}分</view>
              </picker-view-column>
              <picker-view-column v-if="showSeconds">
                <view v-for="second in seconds" :key="second" class="zx-date-picker__time-item">{{
                  second.toString().padStart(2, "0") }}秒</view>
              </picker-view-column>
            </picker-view>
          </view>
        </template>

        <!-- 日期范围选择 -->
        <template v-else-if="type === 'daterange' || type === 'datetimerange'">
          <view class="zx-date-picker__range">
            <!-- 左侧日历 -->
            <view class="zx-date-picker__panel zx-date-picker__panel--left">
              <view class="zx-date-picker__header">
                <view class="zx-date-picker__nav" @click="prevYear('left')">
                  <zx-icon name="arrow-left-double" />
                </view>
                <view class="zx-date-picker__nav" @click="prevMonth('left')">
                  <zx-icon name="arrow-left" />
                </view>
                <view class="zx-date-picker__current">
                  <text>{{ leftYear }}年{{ leftMonth }}月</text>
                </view>
                <view class="zx-date-picker__nav" @click="nextMonth('left')">
                  <zx-icon name="arrow-right" />
                </view>
                <view class="zx-date-picker__nav" @click="nextYear('left')">
                  <zx-icon name="arrow-right-double" />
                </view>
              </view>

              <view class="zx-date-picker__week-header">
                <view v-for="(week, index) in weekdays" :key="index" class="zx-date-picker__week-title">
                  <text>{{ week }}</text>
                </view>
              </view>

              <view class="zx-date-picker__dates">
                <view v-for="(date, index) in leftDates" :key="index" class="zx-date-picker__date"
                  :class="getRangeDateClass(date, 'left')" @click="handleRangeDateClick(date, 'left')">
                  <text class="zx-date-picker__date-text">{{ date.day }}</text>
                </view>
              </view>
            </view>

            <!-- 右侧日历 -->
            <view class="zx-date-picker__panel zx-date-picker__panel--right">
              <view class="zx-date-picker__header">
                <view class="zx-date-picker__nav" @click="prevYear('right')">
                  <zx-icon name="arrow-left-double" />
                </view>
                <view class="zx-date-picker__nav" @click="prevMonth('right')">
                  <zx-icon name="arrow-left" />
                </view>
                <view class="zx-date-picker__current">
                  <text>{{ rightYear }}年{{ rightMonth }}月</text>
                </view>
                <view class="zx-date-picker__nav" @click="nextMonth('right')">
                  <zx-icon name="arrow-right" />
                </view>
                <view class="zx-date-picker__nav" @click="nextYear('right')">
                  <zx-icon name="arrow-right-double" />
                </view>
              </view>

              <view class="zx-date-picker__week-header">
                <view v-for="(week, index) in weekdays" :key="index" class="zx-date-picker__week-title">
                  <text>{{ week }}</text>
                </view>
              </view>

              <view class="zx-date-picker__dates">
                <view v-for="(date, index) in rightDates" :key="index" class="zx-date-picker__date"
                  :class="getRangeDateClass(date, 'right')" @click="handleRangeDateClick(date, 'right')">
                  <text class="zx-date-picker__date-text">{{ date.day }}</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 时间选择（datetimerange类型） -->
          <view v-if="type === 'datetimerange'" class="zx-date-picker__time-range">
            <view class="zx-date-picker__time-panel">
              <text class="zx-date-picker__time-title">开始时间</text>
              <picker-view class="zx-date-picker__time-picker" :value="startTimeValue" @change="handleStartTimeChange">
                <picker-view-column>
                  <view v-for="hour in hours" :key="hour" class="zx-date-picker__time-item">{{
                    hour.toString().padStart(2, "0") }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view v-for="minute in minutes" :key="minute" class="zx-date-picker__time-item">{{
                    minute.toString().padStart(2, "0") }}</view>
                </picker-view-column>
              </picker-view>
            </view>

            <view class="zx-date-picker__time-panel">
              <text class="zx-date-picker__time-title">结束时间</text>
              <picker-view class="zx-date-picker__time-picker" :value="endTimeValue" @change="handleEndTimeChange">
                <picker-view-column>
                  <view v-for="hour in hours" :key="hour" class="zx-date-picker__time-item">{{
                    hour.toString().padStart(2, "0") }}</view>
                </picker-view-column>
                <picker-view-column>
                  <view v-for="minute in minutes" :key="minute" class="zx-date-picker__time-item">{{
                    minute.toString().padStart(2, "0") }}</view>
                </picker-view-column>
              </picker-view>
            </view>
          </view>
        </template>

        <!-- 月份选择 -->
        <template v-else-if="type === 'month'">
          <view class="zx-date-picker__header">
            <view class="zx-date-picker__nav" @click="prevYear">
              <zx-icon name="arrow-left-double" />
            </view>
            <view class="zx-date-picker__current">
              <text>{{ currentYear }}年</text>
            </view>
            <view class="zx-date-picker__nav" @click="nextYear">
              <zx-icon name="arrow-right-double" />
            </view>
          </view>

          <view class="zx-date-picker__months">
            <view v-for="(month, index) in months" :key="index" class="zx-date-picker__month"
              :class="getMonthClass(month)" @click="handleMonthClick(month)">
              <text class="zx-date-picker__month-text">{{ month.text }}</text>
            </view>
          </view>
        </template>

        <!-- 年份选择 -->
        <template v-else-if="type === 'year'">
          <view class="zx-date-picker__header">
            <view class="zx-date-picker__nav" @click="prevDecade">
              <zx-icon name="arrow-left-double" />
            </view>
            <view class="zx-date-picker__current">
              <text>{{ startYear }}-{{ endYear }}</text>
            </view>
            <view class="zx-date-picker__nav" @click="nextDecade">
              <zx-icon name="arrow-right-double" />
            </view>
          </view>

          <view class="zx-date-picker__years">
            <view v-for="(year, index) in years" :key="index" class="zx-date-picker__year" :class="getYearClass(year)"
              @click="handleYearClick(year)">
              <text class="zx-date-picker__year-text">{{ year.text }}</text>
            </view>
          </view>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";

/**
 * zx-date-picker 日期选择器组件
 * @description 日期选择器组件，支持单个日期、日期范围、年月等多种选择模式
 */

// Define emits
const emit = defineEmits([
  "update:modelValue",
  "change",
  "blur",
  "focus",
  "clear",
  "calendar-change",
  "panel-change",
  "visible-change",
]);

// Define props
const props = defineProps({
  // v-model绑定值
  modelValue: {
    type: [String, Array, Date],
    default: "",
  },
  // 选择器类型
  type: {
    type: String,
    default: "date",
    validator: (value) => {
      return ["year", "month", "date", "datetime", "daterange", "datetimerange"].includes(
        value
      );
    },
  },
  // 输入框占位文本
  placeholder: {
    type: String,
    default: "",
  },
  // 开始日期占位文本
  startPlaceholder: {
    type: String,
    default: "开始日期",
  },
  // 结束日期占位文本
  endPlaceholder: {
    type: String,
    default: "结束日期",
  },
  // 显示格式
  format: {
    type: String,
    default: "",
  },
  // 值格式
  valueFormat: {
    type: String,
    default: "",
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // 输入框尺寸
  size: {
    type: String,
    default: "default",
    validator: (value) => {
      return ["large", "default", "small"].includes(value);
    },
  },
  // 是否显示清除按钮
  clearable: {
    type: Boolean,
    default: true,
  },
  // 输入框样式类名
  className: {
    type: String,
    default: "",
  },
  // 输入框名称
  name: {
    type: String,
    default: "",
  },
  // 前缀图标
  prefixIcon: {
    type: String,
    default: "",
  },
  // 后缀图标
  suffixIcon: {
    type: String,
    default: "calendar",
  },
  // 清除图标
  clearIcon: {
    type: String,
    default: "close-circle",
  },
  // 是否触发表单验证
  validateEvent: {
    type: Boolean,
    default: true,
  },
  // 禁用日期的函数
  disabledDate: {
    type: Function,
    default: null,
  },
  // 快捷选项
  shortcuts: {
    type: Array,
    default: () => [],
  },
  // 单元格自定义类名
  cellClassName: {
    type: Function,
    default: null,
  },
  // 范围分隔符
  rangeSeparator: {
    type: String,
    default: " 至 ",
  },
  // 默认值
  defaultValue: {
    type: [String, Date, Array],
    default: null,
  },
  // 默认时间
  defaultTime: {
    type: [String, Array],
    default: null,
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: "取消",
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: "确认",
  },
  // 弹窗标题
  title: {
    type: String,
    default: "选择日期",
  },
  // 弹窗高度
  popupHeight: {
    type: Number,
    default: 500,
  },
  // 是否显示秒
  showSeconds: {
    type: Boolean,
    default: false,
  },
  // 是否取消两个日期面板的联动
  unlinkPanels: {
    type: Boolean,
    default: false,
  },
});

// 响应式数据
const visible = ref(false);
const currentValue = ref("");
const rangeValue = ref([]);
const currentDate = ref(new Date());
const leftPanelDate = ref(new Date());
const rightPanelDate = ref(new Date());
const tempValue = ref("");
const tempRangeValue = ref([]);
const rangeState = reactive({
  selecting: false,
  start: null,
  end: null,
});

// 时间相关
const timeValue = ref([0, 0, 0]);
const startTimeValue = ref([0, 0]);
const endTimeValue = ref([0, 0]);

// 计算属性
const isRange = computed(() => {
  return props.type.includes("range");
});

const textColor = computed(() => {
  return props.disabled ? "#c0c4cc" : "#606266";
});

const weekdays = computed(() => {
  return ["日", "一", "二", "三", "四", "五", "六"];
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const currentMonth = computed(() => {
  return currentDate.value.getMonth() + 1;
});

const leftYear = computed(() => {
  return leftPanelDate.value.getFullYear();
});

const leftMonth = computed(() => {
  return leftPanelDate.value.getMonth() + 1;
});

const rightYear = computed(() => {
  return rightPanelDate.value.getFullYear();
});

const rightMonth = computed(() => {
  return rightPanelDate.value.getMonth() + 1;
});

const startYear = computed(() => {
  const year = currentDate.value.getFullYear();
  return Math.floor(year / 10) * 10;
});

const endYear = computed(() => {
  return startYear.value + 9;
});

// 小时分钟秒选项
const hours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => i);
});

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, i) => i);
});

const seconds = computed(() => {
  return Array.from({ length: 60 }, (_, i) => i);
});

// 月份选项
const months = computed(() => {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    text: `${i + 1}月`,
    date: new Date(currentYear.value, i, 1),
  }));
});

// 年份选项
const years = computed(() => {
  return Array.from({ length: 10 }, (_, i) => ({
    value: startYear.value + i,
    text: `${startYear.value + i}年`,
    date: new Date(startYear.value + i, 0, 1),
  }));
});

// 日期网格数据
const dates = computed(() => {
  return generateDates(currentDate.value);
});

const leftDates = computed(() => {
  return generateDates(leftPanelDate.value);
});

const rightDates = computed(() => {
  return generateDates(rightPanelDate.value);
});

// 显示值
const displayValue = computed(() => {
  if (isRange.value) {
    if (rangeValue.value.length === 2) {
      const start = formatDate(rangeValue.value[0], getDisplayFormat());
      const end = formatDate(rangeValue.value[1], getDisplayFormat());
      return `${start}${props.rangeSeparator}${end}`;
    }
    return "";
  } else {
    return currentValue.value ? formatDate(currentValue.value, getDisplayFormat()) : "";
  }
});

// 获取默认占位符
const getPlaceholder = () => {
  if (props.placeholder) return props.placeholder;

  const placeholders = {
    year: "选择年",
    month: "选择月",
    date: "选择日期",
    datetime: "选择日期时间",
    daterange: "选择日期范围",
    datetimerange: "选择日期时间范围",
  };

  return placeholders[props.type] || "请选择";
};

const placeholder = computed(() => getPlaceholder());

// 获取显示格式
const getDisplayFormat = () => {
  if (props.format) return props.format;

  const formats = {
    year: "YYYY年",
    month: "YYYY年MM月",
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD HH:mm:ss",
    daterange: "YYYY-MM-DD",
    datetimerange: "YYYY-MM-DD HH:mm:ss",
  };

  return formats[props.type] || "YYYY-MM-DD";
};

// 获取值格式
const getValueFormat = () => {
  if (props.valueFormat) return props.valueFormat;

  const formats = {
    year: "YYYY",
    month: "YYYY-MM",
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD HH:mm:ss",
    daterange: "YYYY-MM-DD",
    datetimerange: "YYYY-MM-DD HH:mm:ss",
  };

  return formats[props.type] || "YYYY-MM-DD";
};

// 生成日期网格
const generateDates = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const dates = [];

  // 添加上个月的日期
  const prevMonth = new Date(year, month - 1, 0);
  const prevMonthDays = prevMonth.getDate();
  for (let i = firstDayWeek - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      date: new Date(year, month - 1, prevMonthDays - i),
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  // 添加当月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      day: i,
      date: new Date(year, month, i),
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  // 添加下个月的日期
  const remainingDays = 42 - dates.length;
  for (let i = 1; i <= remainingDays; i++) {
    dates.push({
      day: i,
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  return dates;
};

// 格式化日期
const formatDate = (date, format) => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  return format
    .replace("YYYY", year)
    .replace("MM", month.toString().padStart(2, "0"))
    .replace("DD", day.toString().padStart(2, "0"))
    .replace("HH", hour.toString().padStart(2, "0"))
    .replace("mm", minute.toString().padStart(2, "0"))
    .replace("ss", second.toString().padStart(2, "0"));
};

// 解析日期字符串
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  return new Date(dateStr);
};

// 判断两个日期是否是同一天
const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// 判断日期是否在范围内
const isInRange = (date, start, end) => {
  if (!date || !start || !end) return false;
  const d = new Date(date);
  const s = new Date(start);
  const e = new Date(end);
  return d >= s && d <= e;
};

// 获取日期样式类
const getDateClass = (dateItem) => {
  const classes = [];

  if (!dateItem.isCurrentMonth) {
    classes.push("zx-date-picker__date--disabled");
  }

  if (isSameDay(dateItem.date, new Date())) {
    classes.push("zx-date-picker__date--today");
  }

  if (isSameDay(dateItem.date, currentValue.value)) {
    classes.push("zx-date-picker__date--selected");
  }

  if (props.disabledDate && props.disabledDate(dateItem.date)) {
    classes.push("zx-date-picker__date--disabled");
  }

  return classes;
};

// 获取范围日期样式类
const getRangeDateClass = (dateItem, panel) => {
  const classes = [];

  if (!dateItem.isCurrentMonth) {
    classes.push("zx-date-picker__date--disabled");
  }

  if (isSameDay(dateItem.date, new Date())) {
    classes.push("zx-date-picker__date--today");
  }

  if (rangeValue.value.length > 0) {
    if (isSameDay(dateItem.date, rangeValue.value[0])) {
      classes.push("zx-date-picker__date--start");
    }
    if (rangeValue.value.length === 2 && isSameDay(dateItem.date, rangeValue.value[1])) {
      classes.push("zx-date-picker__date--end");
    }
    if (
      rangeValue.value.length === 2 &&
      isInRange(dateItem.date, rangeValue.value[0], rangeValue.value[1])
    ) {
      classes.push("zx-date-picker__date--in-range");
    }
  }

  if (rangeState.selecting && rangeState.start) {
    if (isSameDay(dateItem.date, rangeState.start)) {
      classes.push("zx-date-picker__date--range-start");
    }
    if (dateItem.date > rangeState.start && dateItem.date < new Date()) {
      classes.push("zx-date-picker__date--range-hover");
    }
  }

  if (props.disabledDate && props.disabledDate(dateItem.date)) {
    classes.push("zx-date-picker__date--disabled");
  }

  return classes;
};

// 获取月份样式类
const getMonthClass = (monthItem) => {
  const classes = [];

  if (
    monthItem.value === new Date().getMonth() + 1 &&
    currentYear.value === new Date().getFullYear()
  ) {
    classes.push("zx-date-picker__month--current");
  }

  const selectedDate = parseDate(currentValue.value);
  if (
    selectedDate &&
    monthItem.value === selectedDate.getMonth() + 1 &&
    currentYear.value === selectedDate.getFullYear()
  ) {
    classes.push("zx-date-picker__month--selected");
  }

  return classes;
};

// 获取年份样式类
const getYearClass = (yearItem) => {
  const classes = [];

  if (yearItem.value === new Date().getFullYear()) {
    classes.push("zx-date-picker__year--current");
  }

  const selectedDate = parseDate(currentValue.value);
  if (selectedDate && yearItem.value === selectedDate.getFullYear()) {
    classes.push("zx-date-picker__year--selected");
  }

  return classes;
};

// 事件处理
const handleOpen = () => {
  if (props.disabled || props.readonly) return;

  visible.value = true;

  // 初始化临时值
  if (isRange.value) {
    tempRangeValue.value = [...rangeValue.value];
    if (!props.unlinkPanels && rangeValue.value.length === 2) {
      leftPanelDate.value = new Date(rangeValue.value[0]);
      rightPanelDate.value = new Date(rangeValue.value[1]);
    }
  } else {
    tempValue.value = currentValue.value;
    if (currentValue.value) {
      currentDate.value = new Date(currentValue.value);
    }
  }

  emit("visible-change", true);
  emit("focus");
};

const handleClose = () => {
  visible.value = false;
  rangeState.selecting = false;
  rangeState.start = null;
  rangeState.end = null;
  emit("visible-change", false);
  emit("blur");
};

const handleMaskClick = () => {
  handleClose();
};

const handleCancel = () => {
  handleClose();
};

const handleConfirm = () => {
  if (isRange.value) {
    if (tempRangeValue.value.length === 2) {
      rangeValue.value = [...tempRangeValue.value];
      const formattedValue = tempRangeValue.value.map((date) =>
        formatDate(date, getValueFormat())
      );
      emit("update:modelValue", formattedValue);
      emit("change", formattedValue);
    }
  } else {
    if (tempValue.value) {
      currentValue.value = tempValue.value;
      const formattedValue = formatDate(tempValue.value, getValueFormat());
      emit("update:modelValue", formattedValue);
      emit("change", formattedValue);
    }
  }

  handleClose();
};

const handleClear = () => {
  if (isRange.value) {
    rangeValue.value = [];
    emit("update:modelValue", []);
  } else {
    currentValue.value = "";
    emit("update:modelValue", "");
  }

  emit("clear");
  emit("change", isRange.value ? [] : "");
};

const handleShortcut = (shortcut) => {
  if (typeof shortcut.value === "function") {
    const value = shortcut.value();
    if (isRange.value && Array.isArray(value)) {
      tempRangeValue.value = value;
    } else if (!isRange.value) {
      tempValue.value = value;
    }
  } else {
    if (isRange.value && Array.isArray(shortcut.value)) {
      tempRangeValue.value = shortcut.value;
    } else if (!isRange.value) {
      tempValue.value = shortcut.value;
    }
  }

  handleConfirm();
};

// 日期点击事件
const handleDateClick = (dateItem) => {
  if (
    !dateItem.isCurrentMonth ||
    (props.disabledDate && props.disabledDate(dateItem.date))
  ) {
    return;
  }

  if (props.type === "datetime") {
    // 设置日期，保持时间
    const newDate = new Date(dateItem.date);
    if (tempValue.value) {
      const currentTime = new Date(tempValue.value);
      newDate.setHours(currentTime.getHours());
      newDate.setMinutes(currentTime.getMinutes());
      newDate.setSeconds(currentTime.getSeconds());
    }
    tempValue.value = newDate;
  } else {
    tempValue.value = dateItem.date;
    handleConfirm();
  }
};

const handleRangeDateClick = (dateItem, panel) => {
  if (
    !dateItem.isCurrentMonth ||
    (props.disabledDate && props.disabledDate(dateItem.date))
  ) {
    return;
  }

  if (!rangeState.selecting) {
    // 开始选择
    rangeState.selecting = true;
    rangeState.start = dateItem.date;
    tempRangeValue.value = [dateItem.date];
  } else {
    // 结束选择
    if (dateItem.date >= rangeState.start) {
      rangeState.end = dateItem.date;
      tempRangeValue.value = [rangeState.start, dateItem.date];

      if (props.type === "daterange") {
        handleConfirm();
      }
    } else {
      // 重新开始选择
      rangeState.start = dateItem.date;
      tempRangeValue.value = [dateItem.date];
    }
  }
};

const handleMonthClick = (monthItem) => {
  const newDate = new Date(currentYear.value, monthItem.value - 1, 1);
  tempValue.value = newDate;
  handleConfirm();
};

const handleYearClick = (yearItem) => {
  const newDate = new Date(yearItem.value, 0, 1);
  tempValue.value = newDate;
  handleConfirm();
};

// 时间变化事件
const handleTimeChange = (e) => {
  const [hourIndex, minuteIndex, secondIndex] = e.detail.value;
  timeValue.value = e.detail.value;

  if (tempValue.value) {
    const newDate = new Date(tempValue.value);
    newDate.setHours(hourIndex);
    newDate.setMinutes(minuteIndex);
    if (props.showSeconds) {
      newDate.setSeconds(secondIndex || 0);
    }
    tempValue.value = newDate;
  }
};

const handleStartTimeChange = (e) => {
  startTimeValue.value = e.detail.value;

  if (tempRangeValue.value.length > 0) {
    const newDate = new Date(tempRangeValue.value[0]);
    newDate.setHours(e.detail.value[0]);
    newDate.setMinutes(e.detail.value[1]);
    tempRangeValue.value[0] = newDate;
  }
};

const handleEndTimeChange = (e) => {
  endTimeValue.value = e.detail.value;

  if (tempRangeValue.value.length > 1) {
    const newDate = new Date(tempRangeValue.value[1]);
    newDate.setHours(e.detail.value[0]);
    newDate.setMinutes(e.detail.value[1]);
    tempRangeValue.value[1] = newDate;
  }
};

// 导航事件
const prevYear = (panel = "single") => {
  if (panel === "single") {
    currentDate.value = new Date(
      currentDate.value.getFullYear() - 1,
      currentDate.value.getMonth(),
      1
    );
  } else if (panel === "left") {
    leftPanelDate.value = new Date(
      leftPanelDate.value.getFullYear() - 1,
      leftPanelDate.value.getMonth(),
      1
    );
  } else if (panel === "right") {
    rightPanelDate.value = new Date(
      rightPanelDate.value.getFullYear() - 1,
      rightPanelDate.value.getMonth(),
      1
    );
  }

  emit("panel-change", { panel, type: "year", direction: "prev" });
};

const nextYear = (panel = "single") => {
  if (panel === "single") {
    currentDate.value = new Date(
      currentDate.value.getFullYear() + 1,
      currentDate.value.getMonth(),
      1
    );
  } else if (panel === "left") {
    leftPanelDate.value = new Date(
      leftPanelDate.value.getFullYear() + 1,
      leftPanelDate.value.getMonth(),
      1
    );
  } else if (panel === "right") {
    rightPanelDate.value = new Date(
      rightPanelDate.value.getFullYear() + 1,
      rightPanelDate.value.getMonth(),
      1
    );
  }

  emit("panel-change", { panel, type: "year", direction: "next" });
};

const prevMonth = (panel = "single") => {
  if (panel === "single") {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  } else if (panel === "left") {
    leftPanelDate.value = new Date(
      leftPanelDate.value.getFullYear(),
      leftPanelDate.value.getMonth() - 1,
      1
    );
  } else if (panel === "right") {
    rightPanelDate.value = new Date(
      rightPanelDate.value.getFullYear(),
      rightPanelDate.value.getMonth() - 1,
      1
    );
  }

  emit("panel-change", { panel, type: "month", direction: "prev" });
};

const nextMonth = (panel = "single") => {
  if (panel === "single") {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  } else if (panel === "left") {
    leftPanelDate.value = new Date(
      leftPanelDate.value.getFullYear(),
      leftPanelDate.value.getMonth() + 1,
      1
    );
  } else if (panel === "right") {
    rightPanelDate.value = new Date(
      rightPanelDate.value.getFullYear(),
      rightPanelDate.value.getMonth() + 1,
      1
    );
  }

  emit("panel-change", { panel, type: "month", direction: "next" });
};

const prevDecade = () => {
  currentDate.value = new Date(currentDate.value.getFullYear() - 10, 0, 1);
  emit("panel-change", { type: "decade", direction: "prev" });
};

const nextDecade = () => {
  currentDate.value = new Date(currentDate.value.getFullYear() + 10, 0, 1);
  emit("panel-change", { type: "decade", direction: "next" });
};

// 初始化
const init = () => {
  if (props.modelValue) {
    if (isRange.value && Array.isArray(props.modelValue)) {
      rangeValue.value = props.modelValue.map((v) => parseDate(v)).filter(Boolean);
      if (rangeValue.value.length > 0) {
        leftPanelDate.value = new Date(rangeValue.value[0]);
        if (rangeValue.value.length > 1) {
          rightPanelDate.value = new Date(rangeValue.value[1]);
        } else {
          rightPanelDate.value = new Date(
            leftPanelDate.value.getFullYear(),
            leftPanelDate.value.getMonth() + 1,
            1
          );
        }
      }
    } else if (!isRange.value) {
      const parsedDate = parseDate(props.modelValue);
      if (parsedDate) {
        currentValue.value = parsedDate;
        currentDate.value = new Date(parsedDate);
      }
    }
  }

  // 设置默认值
  if (props.defaultValue) {
    if (isRange.value && Array.isArray(props.defaultValue)) {
      if (rangeValue.value.length === 0) {
        rangeValue.value = props.defaultValue.map((v) => parseDate(v)).filter(Boolean);
      }
    } else if (!isRange.value && !currentValue.value) {
      const parsedDate = parseDate(props.defaultValue);
      if (parsedDate) {
        currentValue.value = parsedDate;
        currentDate.value = new Date(parsedDate);
      }
    }
  }

  // 设置右侧面板日期（范围选择）
  if (isRange.value && !props.unlinkPanels) {
    rightPanelDate.value = new Date(
      leftPanelDate.value.getFullYear(),
      leftPanelDate.value.getMonth() + 1,
      1
    );
  }
};

// 监听modelValue变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (isRange.value && Array.isArray(newValue)) {
      rangeValue.value = newValue.map((v) => parseDate(v)).filter(Boolean);
    } else if (!isRange.value) {
      const parsedDate = parseDate(newValue);
      currentValue.value = parsedDate || "";
      if (parsedDate) {
        currentDate.value = new Date(parsedDate);
      }
    }
  },
  { immediate: true }
);

// 监听visible变化
watch(visible, (newVisible) => {
  if (newVisible) {
    nextTick(() => {
      // 可以在这里做一些打开后的初始化工作
    });
  }
});

// 组件挂载
onMounted(() => {
  init();
});

// 暴露方法
defineExpose({
  focus: handleOpen,
  blur: handleClose,
  handleOpen,
  handleClose,
});
</script>

<style lang="scss" scoped>
.zx-date-picker {
  position: relative;
  display: inline-block;
  width: 100%;
}

.zx-date-picker__input-wrapper {
  position: relative;
  cursor: pointer;
}

.zx-date-picker__input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80rpx;
  padding: 0 24rpx;
  border: 2rpx solid #dcdfe6;
  border-radius: 8rpx;
  background-color: #fff;
  font-size: 28rpx;
  color: #606266;
  transition: border-color 0.3s;

  &--focus {
    border-color: #409eff;
  }
}

.zx-date-picker__prefix-icon {
  margin-right: 16rpx;
  color: #c0c4cc;
}

.zx-date-picker__inner {
  flex: 1;
  overflow: hidden;
}

.zx-date-picker__text {
  color: #606266;
}

.zx-date-picker__placeholder {
  color: #c0c4cc;
}

.zx-date-picker__clear-icon,
.zx-date-picker__suffix-icon {
  margin-left: 16rpx;
  color: #c0c4cc;
  cursor: pointer;

  &:hover {
    color: #909399;
  }
}

.zx-date-picker--disabled {
  .zx-date-picker__input {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
}

.zx-date-picker__mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s;

  &--show {
    opacity: 1;
  }
}

.zx-date-picker__popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 24rpx 24rpx 0 0;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.3s;

  &--show {
    transform: translateY(0);
  }
}

.zx-date-picker__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  border-bottom: 2rpx solid #f0f2f5;
}

.zx-date-picker__toolbar-btn {
  padding: 16rpx 24rpx;
  cursor: pointer;
}

.zx-date-picker__toolbar-text {
  font-size: 28rpx;
  color: #606266;

  &--confirm {
    color: #409eff;
    font-weight: 500;
  }
}

.zx-date-picker__toolbar-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #303133;
}

.zx-date-picker__shortcuts {
  display: flex;
  flex-wrap: wrap;
  padding: 24rpx 32rpx;
  border-bottom: 2rpx solid #f0f2f5;
}

.zx-date-picker__shortcut {
  margin: 8rpx 16rpx 8rpx 0;
  padding: 12rpx 24rpx;
  border: 2rpx solid #dcdfe6;
  border-radius: 8rpx;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    border-color: #409eff;
    color: #409eff;
  }
}

.zx-date-picker__shortcut-text {
  font-size: 24rpx;
  color: #606266;
}

.zx-date-picker__main {
  padding: 32rpx;
  max-height: 600rpx;
  overflow-y: auto;
}

.zx-date-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32rpx;
}

.zx-date-picker__nav {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }
}

.zx-date-picker__current {
  font-size: 32rpx;
  font-weight: 500;
  color: #303133;
}

.zx-date-picker__week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 16rpx;
}

.zx-date-picker__week-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  font-size: 24rpx;
  color: #909399;
  font-weight: 500;
}

.zx-date-picker__dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8rpx;
}

.zx-date-picker__date {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  border-radius: 8rpx;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f2f6fc;
  }

  &--disabled {
    color: #c0c4cc;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
    }
  }

  &--today {
    color: #409eff;
    font-weight: 500;
  }

  &--selected {
    background-color: #409eff;
    color: #fff;

    &:hover {
      background-color: #409eff;
    }
  }

  &--start {
    background-color: #409eff;
    color: #fff;
    border-radius: 8rpx 0 0 8rpx;
  }

  &--end {
    background-color: #409eff;
    color: #fff;
    border-radius: 0 8rpx 8rpx 0;
  }

  &--in-range {
    background-color: #ecf5ff;
    color: #409eff;
    border-radius: 0;
  }

  &--range-start {
    background-color: #409eff;
    color: #fff;
  }

  &--range-hover {
    background-color: #ecf5ff;
  }
}

.zx-date-picker__date-text {
  font-size: 24rpx;
}

.zx-date-picker__months {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}

.zx-date-picker__month {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 8rpx;
  cursor: pointer;

  &:hover {
    background-color: #f2f6fc;
  }

  &--current {
    color: #409eff;
    font-weight: 500;
  }

  &--selected {
    background-color: #409eff;
    color: #fff;

    &:hover {
      background-color: #409eff;
    }
  }
}

.zx-date-picker__month-text {
  font-size: 28rpx;
}

.zx-date-picker__years {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16rpx;
}

.zx-date-picker__year {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  border-radius: 8rpx;
  cursor: pointer;

  &:hover {
    background-color: #f2f6fc;
  }

  &--current {
    color: #409eff;
    font-weight: 500;
  }

  &--selected {
    background-color: #409eff;
    color: #fff;

    &:hover {
      background-color: #409eff;
    }
  }
}

.zx-date-picker__year-text {
  font-size: 28rpx;
}

.zx-date-picker__range {
  display: flex;
  gap: 32rpx;
}

.zx-date-picker__panel {
  flex: 1;

  &--left {
    border-right: 2rpx solid #f0f2f5;
    padding-right: 16rpx;
  }

  &--right {
    padding-left: 16rpx;
  }
}

.zx-date-picker__time {
  margin-top: 32rpx;
  border-top: 2rpx solid #f0f2f5;
  padding-top: 32rpx;
}

.zx-date-picker__time-range {
  display: flex;
  margin-top: 32rpx;
  border-top: 2rpx solid #f0f2f5;
  padding-top: 32rpx;
}

.zx-date-picker__time-panel {
  flex: 1;

  &:first-child {
    border-right: 2rpx solid #f0f2f5;
    padding-right: 16rpx;
  }

  &:last-child {
    padding-left: 16rpx;
  }
}

.zx-date-picker__time-title {
  display: block;
  margin-bottom: 16rpx;
  font-size: 24rpx;
  color: #909399;
  text-align: center;
}

.zx-date-picker__time-picker {
  height: 300rpx;
}

.zx-date-picker__time-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  font-size: 24rpx;
  color: #606266;
}
</style>
