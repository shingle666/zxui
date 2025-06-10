<template>
  <view class="zx-rolling-text" :style="rootStyle">
    <zx-rolling-text-item v-for="(itemFigures, index) in figuresMatrix" :key="index" :figure-arr="itemFigures"
      :duration="duration" :direction="direction" :is-start="isAnimating" :height="itemHeightPx"
      :delay="getDelay(index, figuresMatrix.length)" :random-offset="randomOffset" :style="getItemStyle(index)" />
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import zxRollingTextItem from './zx-rolling-text-item.vue';

const props = defineProps({
  startNum: {
    type: Number,
    default: 0,
  },
  targetNum: {
    type: Number,
    default: undefined, // undefined to distinguish from 0
  },
  // 用于翻转非数字内容
  textList: {
    type: Array,
    default: () => [],
  },
  duration: {
    type: Number, // 动画时长，单位秒
    default: 2,
  },
  autoStart: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String, // 'down' or 'up'
    default: 'down',
  },
  // 各个数位动画停止先后顺序，值为 'ltr' (从左到右) 和 'rtl' (从右到左)
  stopOrder: {
    type: String,
    default: 'ltr',
  },
  // 单个数字/字符的高度，单位px
  height: {
    type: [Number, String],
    default: 40,
  },
  // 字体大小，单位rpx或px。如果提供，会尝试影响item宽度
  fontSize: {
    type: [Number, String],
    default: 'inherit',
  },
  // 单个数位/字符的宽度，单位px。如果为0或auto，则自适应内容
  itemWidth: {
    type: [Number, String],
    default: 'auto',
  },
  // 数位之间的间隔，单位px
  gap: {
    type: [Number, String],
    default: 0,
  },
  // 是否在初始时随机偏移各个滚动项的位置，以增加视觉趣味性
  randomOffset: {
    type: Boolean,
    default: false,
  },
  // 自定义样式变量
  customStyle: {
    type: Object,
    default: () => ({}),
  }
});

const isAnimating = ref(false);
const figuresMatrix = ref([]); // 二维数组，存储每个item的滚动数字/字符列表

const CIRCLE_NUM_DEFAULT = 2; // 默认数字轮播几圈

const itemHeightPx = computed(() => parseInt(String(props.height), 10));
const itemGapPx = computed(() => {
  const parsed = parseInt(String(props.gap), 10);
  return isNaN(parsed) ? 0 : parsed; // Ensure it's a number, default to 0 if NaN
});

const rootStyle = computed(() => {
  return {
    fontSize: typeof props.fontSize === 'number' ? `${props.fontSize}rpx` : props.fontSize,
    ...props.customStyle
  };
});

const itemBaseStyle = computed(() => {
  const style = {};
  if (props.itemWidth && props.itemWidth !== 'auto') {
    style.width = typeof props.itemWidth === 'number' ? `${props.itemWidth}px` : props.itemWidth;
  }
  return style;
});

const getItemStyle = (index) => {
  const style = { ...itemBaseStyle.value };
  if (itemGapPx.value > 0 && index < figuresMatrix.value.length - 1) {
    style.marginRight = `${itemGapPx.value}px`;
  }
  return style;
};

// 将数字补零到指定长度
const padZero = (num, len) => {
  return String(num).padStart(len, '0');
};

const generateFigures = () => {
  let matrix = [];
  if (props.textList && props.textList.length > 0) {
    // 处理文本列表
    if (props.textList.some(text => typeof text !== 'string')) {
      console.error('[zx-rolling-text] textList items must be strings.');
      return;
    }
    const firstTextLength = props.textList[0].length;
    if (props.textList.some(text => text.length !== firstTextLength)) {
      console.error('[zx-rolling-text] All texts in textList must have the same length.');
      return;
    }
    for (let i = 0; i < firstTextLength; i++) {
      matrix.push(props.textList.map(text => text[i]));
    }
  } else if (props.targetNum !== undefined) {
    // 处理数字
    const startStr = String(props.startNum);
    const targetStr = String(props.targetNum);
    const maxLength = Math.max(startStr.length, targetStr.length);

    const paddedStartNum = padZero(props.startNum, maxLength);
    const paddedTargetNum = padZero(props.targetNum, maxLength);

    for (let i = 0; i < maxLength; i++) {
      const startDigit = parseInt(paddedStartNum[i], 10);
      const targetDigit = parseInt(paddedTargetNum[i], 10);
      const columnFigures = [];

      // 从开始数字滚动到9
      for (let d = startDigit; d <= 9; d++) {
        columnFigures.push(String(d));
      }
      // 中间滚动几轮0-9
      const circles = props.duration > 1 ? CIRCLE_NUM_DEFAULT : 1; // 时长短就少滚几圈
      for (let c = 0; c < circles; c++) {
        for (let d = 0; d <= 9; d++) {
          columnFigures.push(String(d));
        }
      }
      // 从0滚动到目标数字
      for (let d = 0; d <= targetDigit; d++) {
        columnFigures.push(String(d));
      }
      matrix.push(columnFigures);
    }
  } else {
    // console.warn('[zx-rolling-text] Either targetNum or textList must be provided.');
  }
  figuresMatrix.value = matrix;
};

const getDelay = (index, totalItems) => {
  // 根据 stopOrder 计算每个 item 的延迟时间
  if (props.stopOrder === 'rtl') {
    return (totalItems - 1 - index) * 0.15; // 延迟因子，可调整
  }
  return index * 0.15; // ltr
};

const start = () => {
  if (figuresMatrix.value.length === 0) generateFigures(); // 确保有数据
  isAnimating.value = false; // 先重置状态，确保动画能重新触发
  // 使用 setTimeout 确保状态更新后DOM响应
  setTimeout(() => {
    isAnimating.value = true;
  }, 20); // 短暂延迟
};

const reset = () => {
  isAnimating.value = false;
  // 如果需要，可以在这里重新生成 figuresMatrix，例如当 startNum 变化时
  // generateFigures(); 
  if (props.autoStart) {
    // autoStart 为 true 时，reset 后自动开始
    // 需要一个延迟以确保 reset 的状态先生效
    setTimeout(() => {
      start();
    }, 50);
  }
};

watch(() => [props.startNum, props.targetNum, props.textList, props.duration], () => {
  generateFigures();
  if (isAnimating.value || props.autoStart) {
    // 如果正在动画或需要自动开始，则重启动画
    reset(); // reset会根据autoStart决定是否立即start
  }
}, { deep: true });

watch(() => props.autoStart, (newVal) => {
  if (newVal && !isAnimating.value) {
    start();
  }
});

onMounted(() => {
  generateFigures();
  if (props.autoStart) {
    start();
  }
});

// 暴露方法给父组件调用
defineExpose({
  start,
  reset,
});

</script>

<style lang="scss" scoped>
.zx-rolling-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  /* 确保子项动画不溢出 */
  position: relative;
  // marginRight is now handled by itemContainerStyle for each item.
  // If specific :not(:last-child) behavior is absolutely needed without v-bind,
  // it would require either a wrapper div per item or more complex slotting.
  // For now, each item (except potentially the last, if handled by parent CSS) will have a marginRight if gap is set.
}

// To ensure the last item doesn't have a margin-right, the parent of zx-rolling-text
// or a direct style on the last zx-rolling-text-item (if accessible) would be needed.
// e.g., .parent-of-zx-rolling-text > .zx-rolling-text > .zx-rolling-text-item:last-child { margin-right: 0 !important; }
// Or, if zx-rolling-text-item itself could receive an isLast prop, it could conditionally apply the margin.</style>