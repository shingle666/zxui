<template>
  <view class="zx-statistic">
    <view class="zx-statistic__title" v-if="$slots.title || title">
      <slot name="title">{{ title }}</slot>
    </view>
    <view class="zx-statistic__content" :style="valueStyle">
      <view class="zx-statistic__prefix" v-if="$slots.prefix || prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </view>
      <view class="zx-statistic__value">
        {{ displayValue }}
      </view>
      <view class="zx-statistic__suffix" v-if="$slots.suffix || suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

// 组件属性定义
const props = defineProps({
  // 数字内容
  value: {
    type: [Number, String, Date, Object],
    default: 0
  },
  // 设置小数点符号
  decimalSeparator: {
    type: String,
    default: '.'
  },
  // 自定义数字格式化
  formatter: {
    type: Function,
    default: null
  },
  // 设置千分位标识符
  groupSeparator: {
    type: String,
    default: ','
  },
  // 数字精度
  precision: {
    type: Number,
    default: 0
  },
  // 设置数字的前缀
  prefix: {
    type: String,
    default: ''
  },
  // 设置数字的后缀
  suffix: {
    type: String,
    default: ''
  },
  // 数字标题
  title: {
    type: String,
    default: ''
  },
  // 数字样式
  valueStyle: {
    type: [String, Object],
    default: ''
  },
  // 是否为倒计时模式
  isCountdown: {
    type: Boolean,
    default: false
  },
  // 倒计时格式
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
});

// 定义事件
const emit = defineEmits(['change', 'finish']);

// 响应式数据
const remainingTime = ref(0);
const countdownValue = ref('');
const timer = ref(null);

// 格式化数字
const formatNumber = (value) => {
  if (props.formatter) {
    return props.formatter(value);
  }
  
  const stringValue = value.toFixed(props.precision);
  const parts = stringValue.split('.');
  
  // 处理整数部分，添加千分位分隔符
  let integerPart = parts[0];
  if (integerPart.length > 3) {
    const regex = new RegExp(`\\B(?=(\\d{3})+(?!\\d))`, 'g');
    integerPart = integerPart.replace(regex, props.groupSeparator);
  }
  
  // 重新组合整数和小数部分
  let result = integerPart;
  if (parts.length > 1) {
    result += props.decimalSeparator + parts[1];
  }
  
  return result;
};

// 格式化倒计时
const formatTime = (time) => {
  const seconds = Math.floor(time / 1000);
  if (seconds <= 0) {
    return '00:00:00';
  }
  
  const [DD, HH, mm, ss] = [
    Math.floor(seconds / 86400), // 天数
    Math.floor(seconds / 3600) % 24, // 小时
    Math.floor(seconds / 60) % 60, // 分钟
    seconds % 60 // 秒
  ];
  
  const formatMap = {
    'DD': DD.toString().padStart(2, '0'),
    'D': DD.toString(),
    'HH': HH.toString().padStart(2, '0'),
    'H': HH.toString(),
    'mm': mm.toString().padStart(2, '0'),
    'm': mm.toString(),
    'ss': ss.toString().padStart(2, '0'),
    's': ss.toString(),
    // 支持 DD [days] HH:mm:ss 格式
    '[days]': '天'
  };
  
  let result = props.format;
  Object.keys(formatMap).forEach(key => {
    if (result.includes(key)) {
      result = result.replace(key, formatMap[key]);
    }
  });
  
  return result;
};

// 计算目标时间与当前时间的差值
const calculateDiff = () => {
  let target = 0;
  
  // 处理不同类型的值
  if (typeof props.value === 'number' || typeof props.value === 'string') {
    target = Number(props.value);
  } else if (props.value instanceof Date) {
    target = props.value.getTime();
  } else if (props.value && typeof props.value.valueOf === 'function') {
    // 处理 dayjs 等对象
    target = props.value.valueOf();
  }
  
  const now = Date.now();
  return Math.max(target - now, 0);
};

// 启动倒计时
const startCountdown = () => {
  clearInterval(timer.value);
  countdown();
  
  timer.value = setInterval(() => {
    countdown();
  }, 1000);
};

// 倒计时逻辑
const countdown = () => {
  const diff = calculateDiff();
  remainingTime.value = diff;
  countdownValue.value = formatTime(diff);
  
  emit('change', remainingTime.value);
  
  if (diff <= 0) {
    stopCountdown();
    emit('finish');
  }
};

// 停止倒计时
const stopCountdown = () => {
  clearInterval(timer.value);
  timer.value = null;
};

// 计算并格式化要显示的值
const displayValue = computed(() => {
  if (props.isCountdown) {
    return countdownValue.value;
  }
  
  const value = Number(props.value);
  return formatNumber(value);
});

// 监听目标时间变化（倒计时模式）
watch(() => props.value, () => {
  if (props.isCountdown) {
    startCountdown();
  }
});

// 组件挂载时
onMounted(() => {
  if (props.isCountdown) {
    startCountdown();
  }
});

// 组件卸载前清除计时器
onBeforeUnmount(() => {
  if (timer.value) {
    stopCountdown();
  }
});

// 暴露给父组件的属性
defineExpose({
  displayValue,
  remainingTime
});
</script>

<style>
.zx-statistic {
  display: flex;
  flex-direction: column;
}

.zx-statistic__title {
  color: #909399;
  font-size: 14px;
  margin-bottom: 8px;
}

.zx-statistic__content {
  display: flex;
  align-items: baseline;
}

.zx-statistic__prefix {
  margin-right: 4px;
}

.zx-statistic__value {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.zx-statistic__suffix {
  margin-left: 4px;
  color: #606266;
}
</style>
