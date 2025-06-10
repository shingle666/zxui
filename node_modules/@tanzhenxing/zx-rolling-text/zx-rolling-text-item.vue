<template>
  <view class="zx-rolling-text-item" :style="rootStyle">
    <view class="zx-rolling-text-item__box" :class="{ 'zx-rolling-text-item__box--animate': isStart }"
      :style="boxStyle">
      <view v-for="(figure, index) in displayFigureArr" :key="index" class="zx-rolling-text-item__item"
        :style="itemStyleArr[index]">
        {{ figure }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';

const props = defineProps({
  figureArr: {
    type: Array,
    default: () => [],
  },
  duration: {
    type: Number,
    default: 2,
  },
  isStart: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: 'down', // 'down' or 'up'
  },
  height: {
    type: Number, // 单位 px
    default: 40,
  },
  delay: {
    type: Number, // 单位 s
    default: 0,
  },
  // 新增一个随机偏移的 prop，用于打乱初始位置，增加视觉效果
  randomOffset: {
    type: Boolean,
    default: false,
  }
});

const displayFigureArr = computed(() => {
  // 为了实现向上滚动，我们需要反转数组，并在动画时调整 translateY 的方向
  // 但这里我们保持 Vant 的逻辑，通过 transform 的方向来控制
  return props.figureArr;
});

const itemHeightPx = computed(() => props.height);

// 计算每个数字项的样式，主要是行高
const itemStyleArr = computed(() => {
  return displayFigureArr.value.map(() => ({
    height: `${itemHeightPx.value}px`,
    lineHeight: `${itemHeightPx.value}px`,
  }));
});

// 根元素样式，主要设置高度和动画变量
const rootStyle = computed(() => ({
  height: `${itemHeightPx.value}px`,
  overflow: 'hidden',
}));

// 滚动容器的样式
const boxStyle = computed(() => {
  let initialTranslateY = 0;
  let targetTranslateY = 0;

  const totalHeight = itemHeightPx.value * (displayFigureArr.value.length - 1); // 总滚动高度

  if (props.direction === 'down') {
    // 向下滚动：初始在顶部 (0)，目标在底部 (负值，因为是向上移动容器内容)
    initialTranslateY = props.randomOffset ? `-${Math.floor(Math.random() * (displayFigureArr.value.length - 1)) * itemHeightPx.value}px` : '0px';
    targetTranslateY = `-${totalHeight}px`;
  } else {
    // 向上滚动：初始在底部，目标在顶部
    initialTranslateY = props.randomOffset ? `-${Math.floor(Math.random() * (displayFigureArr.value.length - 1)) * itemHeightPx.value}px` : `-${totalHeight}px`;
    targetTranslateY = '0px';
  }

  return {
    transform: `translateY(${props.isStart ? targetTranslateY : initialTranslateY})`,
    transitionDuration: `${props.isStart ? props.duration : 0}s`,
    transitionDelay: `${props.isStart ? props.delay : 0}s`,
    transitionTimingFunction: 'ease-in-out',
  };
});

</script>

<style lang="scss" scoped>
.zx-rolling-text-item {
  display: inline-block;
  position: relative; // For potential absolute positioning inside if needed
}

.zx-rolling-text-item__box {
  display: flex;
  flex-direction: column;
  // transition-property: transform; // Managed by inline style for better control
}

.zx-rolling-text-item__item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  // 기본적으로 부모의 높이를 따름
}
</style>