<template>
  <view class="zx-barrage" :style="barrageStyle">
    <slot></slot>
    <view
      v-for="(item,index) in visibleBarrages"
      :key="item.id+index+'barrage'"
      class="zx-barrage-item"
      :class="{ 'zx-barrage-item-active': item.isActive }"
      :style="item.style"
      @animationend="handleAnimationEnd(item)"
      @webkitAnimationEnd="handleAnimationEnd(item)"
    >
      {{ item.text }}
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick, getCurrentInstance } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [], // BarrageItem[]: { id: string | number, text: string, ...any }
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  rows: {
    type: [Number, String],
    default: 4,
  },
  top: {
    type: [Number, String],
    default: 10, // 单位px
  },
  duration: {
    type: [Number, String],
    default: 5000, // 单位ms
  },
  delay: {
    type: [Number, String],
    default: 300, // 每个弹幕之间的基础延迟 ms
  },
  // 是否循环播放，如果为true，弹幕到底后会重新从头开始，而不是被移除
  loop: {
    type: Boolean,
    default: false,
  },
  // 自定义弹幕颜色
  color: {
    type: String,
    default: '#ffffff',
  },
  fontSize: {
    type: [Number, String],
    default: 16, // 单位px
  },
  // 轨道高度，不设置则自动根据字体大小和行数计算
  trackHeight: {
    type: [Number, String],
    default: 0, // 单位px
  }
});

const emit = defineEmits(['update:modelValue', 'play', 'pause', 'ended']);

const instance = getCurrentInstance();
const barrageItems = ref([]); // 内部管理的弹幕队列，包含原始数据和运行时状态
const visibleBarrages = ref([]); // 当前在屏幕上渲染的弹幕
const isPlaying = ref(props.autoPlay);
const barrageWrapperWidth = ref(0);
const barrageStyle = computed(() => ({
  position: 'relative',
  overflow: 'hidden',
  height: props.trackHeight > 0 ? `${props.trackHeight}px` : `${(parseFloat(props.fontSize) + 10) * Number(props.rows)}px`,
}));

let uniqueIdCounter = 0;
const generateId = () => `zx-barrage-item-${Date.now()}-${uniqueIdCounter++}`;

const trackNextAvailableTime = ref([]); // 每个轨道的下一个可用时间

const initializeTracks = () => {
  trackNextAvailableTime.value = Array(Number(props.rows)).fill(0);
};

const getBarrageItemWidth = async (text) => {
  // 在uniapp中，动态计算文本宽度比较复杂，尤其是在小程序端。
  // H5可以使用canvas context.measureText(text).width
  // 小程序可以使用 uni.createSelectorQuery().select('.temp-text-measure').boundingClientRect()
  // 这里为了简化，我们先估算一个平均宽度，或者要求用户传入宽度，或者使用固定宽度模式
  // 暂时返回一个基于字数的估算值
  return String(text).length * parseFloat(props.fontSize) * 0.8; // 估算值，可能不准确
};

const scheduleBarrages = async () => {
  if (!isPlaying.value || !barrageItems.value.length || !barrageWrapperWidth.value) return;

  const currentTime = Date.now();

  for (let i = 0; i < barrageItems.value.length; i++) {
    const barrage = barrageItems.value[i];
    if (visibleBarrages.value.find(vb => vb._internalId === barrage._internalId)) {
      continue; // 已经在显示或等待显示
    }

    let assignedTrack = -1;
    // 尝试找到一个可用轨道
    for (let trackIdx = 0; trackIdx < Number(props.rows); trackIdx++) {
      if (trackNextAvailableTime.value[trackIdx] <= currentTime) {
        assignedTrack = trackIdx;
        break;
      }
    }

    if (assignedTrack !== -1) {
      const itemWidth = await getBarrageItemWidth(barrage.text);
      const itemFlyDuration = (itemWidth + barrageWrapperWidth.value) / barrageWrapperWidth.value * Number(props.duration);
      
      trackNextAvailableTime.value[assignedTrack] = currentTime + Number(props.delay) + Math.random() * 500; // 加上随机延迟避免同时出现

      const newVisibleItem = {
        ...barrage,
        _assignedTrack: assignedTrack,
        _startTime: currentTime,
        style: {
          top: `${assignedTrack * (parseFloat(props.fontSize) + 10) + parseFloat(props.top)}px`,
          left: `${barrageWrapperWidth.value}px`,
          color: barrage.color || props.color,
          fontSize: `${parseFloat(props.fontSize)}px`,
          animationDuration: `${itemFlyDuration}ms`,
          animationTimingFunction: 'linear',
          animationName: 'zx-barrage-move',
          animationPlayState: isPlaying.value ? 'running' : 'paused',
          transform: `translateX(-${barrageWrapperWidth.value + itemWidth + 20}px)`, // 确保完全移出
          transition: `transform ${itemFlyDuration}ms linear`,
          whiteSpace: 'nowrap',
          position: 'absolute',
          willChange: 'transform',
        },
      };
      visibleBarrages.value.push(newVisibleItem);
      // 激活CSS动画
      nextTick(() => {
        const idx = visibleBarrages.value.findIndex(vb => vb._internalId === newVisibleItem._internalId);
        if (idx > -1) {
          visibleBarrages.value[idx].isActive = true; // 通过class触发transform
        }
      });
    }
  }
  // 清理已完成的原始弹幕项，如果不是loop模式
  if (!props.loop) {
    const currentVisibleIds = new Set(visibleBarrages.value.map(vb => vb._internalId));
    barrageItems.value = barrageItems.value.filter(b => currentVisibleIds.has(b._internalId));
  }
};

// 初始化或更新弹幕数据
const updateBarrageData = (newData) => {
  const newItems = newData.map(item => ({
    ...item,
    id: item.id || generateId(), // 确保每个弹幕有唯一ID
    _internalId: item._internalId || generateId() + '_internal',
    isActive: false,
    style: {},
    _assignedTrack: -1, // 分配的轨道
    _startTime: 0, // 弹幕开始时间
  }));
  barrageItems.value = newItems;
  if (isPlaying.value) {
    scheduleBarrages();
  }
};

watch(() => props.modelValue, (newValue) => {
  updateBarrageData(newValue);
}, { deep: true, immediate: true });

watch(() => props.autoPlay, (newVal) => {
  if (newVal) {
    play();
  } else {
    pause();
  }
});

const handleAnimationEnd = (endedItem) => {
  const index = visibleBarrages.value.findIndex(item => item._internalId === endedItem._internalId);
  if (index !== -1) {
    const originalItem = props.modelValue.find(item => item.id === endedItem.id);
    emit('ended', originalItem);
    visibleBarrages.value.splice(index, 1);
  }

  if (!props.loop) {
    const modelValueIndex = props.modelValue.findIndex(item => item.id === endedItem.id);
    if (modelValueIndex !== -1) {
      const newModelValue = [...props.modelValue];
      newModelValue.splice(modelValueIndex, 1);
      emit('update:modelValue', newModelValue);
    }
  } else {
    // 如果是循环播放，则重新加入队列
    const itemToReadd = barrageItems.value.find(b => b._internalId === endedItem._internalId);
    if (itemToReadd) {
        // 重置状态并准备重新调度
        const readdedItem = { ...itemToReadd, isActive: false, style: {}, _assignedTrack: -1, _startTime: 0 };
        // 为了避免立即重新添加，可以将其从 barrageItems 中暂时移除再添加，或者标记为待处理
        // 这里简单地允许 scheduleBarrages 重新处理它
    }
  }
  // 尝试调度新的弹幕
  scheduleBarrages();
};

const play = () => {
  if (isPlaying.value) return;
  isPlaying.value = true;
  visibleBarrages.value.forEach(item => {
    item.style.animationPlayState = 'running';
  });
  scheduleBarrages();
  emit('play');
};

const pause = () => {
  if (!isPlaying.value) return;
  isPlaying.value = false;
  visibleBarrages.value.forEach(item => {
    item.style.animationPlayState = 'paused';
  });
  emit('pause');
};

const add = (barrage) => {
  if (!barrage || !barrage.text) {
    console.warn('[zx-barrage] Added item must have a text property.');
    return;
  }
  const newItem = {
    id: barrage.id || generateId(),
    _internalId: generateId() + '_internal_add',
    ...barrage,
    isActive: false,
    style: {},
    _assignedTrack: -1,
    _startTime: 0,
  };
  barrageItems.value.push(newItem);
  const newModelValue = [...props.modelValue, barrage];
  emit('update:modelValue', newModelValue);
  if (isPlaying.value) {
    scheduleBarrages();
  }
};

const clear = () => {
  visibleBarrages.value = [];
  barrageItems.value = [];
  emit('update:modelValue', []);
  initializeTracks();
};

let scheduleInterval = null;

onMounted(() => {
  initializeTracks();
  const query = uni.createSelectorQuery().in(instance);
  query.select('.zx-barrage').boundingClientRect(data => {
    if (data && data.width) {
      barrageWrapperWidth.value = data.width;
      if (props.autoPlay) {
        play();
      }
    } else {
        // Fallback if width is not immediately available, retry or use a default
        setTimeout(() => {
            query.select('.zx-barrage').boundingClientRect(dataRetry => {
                if (dataRetry && dataRetry.width) {
                    barrageWrapperWidth.value = dataRetry.width;
                    if (props.autoPlay) {
                        play();
                    }
                }
            }).exec();
        }, 200);
    }
  }).exec();

  // 定期调度，以防万一有新的弹幕或轨道空闲
  scheduleInterval = setInterval(() => {
    if (isPlaying.value) {
      scheduleBarrages();
    }
  }, 1000); // 检查频率
});

onUnmounted(() => {
  if (scheduleInterval) {
    clearInterval(scheduleInterval);
  }
  clear();
});

defineExpose({
  play,
  pause,
  add,
  clear,
});

</script>

<style lang="scss" scoped>
.zx-barrage {
  /* 在script中通过barrageStyle设置了 position: relative, overflow: hidden, height */
}

.zx-barrage-item {
  position: absolute; /* 由JS动态设置top, left, color, fontSize, animationDuration, etc. */
  white-space: nowrap;
  pointer-events: none; /* 避免遮挡视频操作 */
  will-change: transform;
  /* 初始状态在屏幕外右侧, 通过JS的left和transform控制动画 */
  /* transform: translateX(100%); */ 
}

/* 
  由于uniapp小程序端对 @keyframes animation-name 的支持以及动态修改 animation-name 可能存在问题，
  我们改为使用 transition 来实现动画。
  isActive class 会被添加到item上，然后JS修改其transform属性来触发动画。
*/
.zx-barrage-item-active {
  /* JS会动态设置 transform: translateX(-xxx px) 和 transition: transform xxx ms linear */
}

/* 如果坚持使用animation, keyframes需要定义在全局或组件内，但小程序兼容性需测试 */
/* @keyframes zx-barrage-move {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%); 
  }
} */
</style>