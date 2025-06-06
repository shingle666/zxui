<template>
  <view v-if="show" ref="rootRef" class="zx-floating-bubble" :style="rootStyle" @touchstart="onTouchStart"
    @touchmove.stop.prevent="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd" @click="onClick">
    <slot>
      <zx-icon :name="icon" :custom-style="{ fontSize: '28px' }" />
    </slot>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch, getCurrentInstance } from 'vue';

const props = defineProps({
  // 控制气泡位置, v-model:offset
  offset: {
    type: Object,
    default: () => ({
      x: -1,
      y: -1
    })
  },
  // 拖拽的方向，xy 代表自由拖拽，lock 代表禁止拖拽
  axis: {
    type: String,
    default: 'y', // 'x' | 'y' | 'xy' | 'lock'
    validator: (value) => ['x', 'y', 'xy', 'lock'].includes(value)
  },
  // 自动磁吸的方向
  magnetic: {
    type: String, // 'x' | 'y'
    validator: (value) => ['x', 'y'].includes(value)
  },
  // 气泡图标名称或图片链接
  icon: {
    type: String,
    default: 'chat-o'
  },
  // 气泡与窗口的最小间距，单位为 px
  gap: {
    type: [Number, Object],
    default: 24
  },
  // 是否在页面进入时自动打开
  modelValue: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['click', 'update:offset', 'offsetChange', 'update:modelValue']);

const instance = getCurrentInstance();
const rootRef = ref(null);
const state = ref({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const getWindowInfo = () => {
  const info = uni.getWindowInfo();
  return {
    windowWidth: info.windowWidth,
    windowHeight: info.windowHeight
  };
};

const windowInfo = ref(getWindowInfo());

const gapX = computed(() => (typeof props.gap === 'object' ? props.gap.x : props.gap));
const gapY = computed(() => (typeof props.gap === 'object' ? props.gap.y : props.gap));

const boundary = computed(() => ({
  top: gapY.value,
  right: windowInfo.value.windowWidth - state.value.width - gapX.value,
  bottom: windowInfo.value.windowHeight - state.value.height - gapY.value,
  left: gapX.value
}));

const dragging = ref(false);
let initialized = false;

const rootStyle = computed(() => {
  const style = {};
  const x = `${state.value.x}px`;
  const y = `${state.value.y}px`;
  style.transform = `translate3d(${x}, ${y}, 0)`;
  if (dragging.value || !initialized) {
    style.transition = 'none';
  }
  return style;
});

const updateState = async () => {
  if (!show.value) return;
  await nextTick();
  let rect = null;
  // #ifndef APP-NVUE
  rect = await new Promise(resolve => {
    uni.createSelectorQuery().in(instance).select('.zx-floating-bubble').boundingClientRect(data => {
      resolve(data)
    }).exec();
  })
  // #endif
  // #ifdef APP-NVUE
  // nvue 通过 ref 获取元素尺寸
  rect = await new Promise(resolve => {
    dom.getComponentRect(rootRef.value, data => {
      resolve(data.size);
    });
  });
  // #endif

  if (!rect) return;

  const { width, height } = rect;
  const { offset } = props;

  state.value = {
    x: offset.x > -1 ? offset.x : windowInfo.value.windowWidth - width - gapX.value,
    y: offset.y > -1 ? offset.y : windowInfo.value.windowHeight - height - gapY.value,
    width,
    height
  };
};

const touch = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isTap: true
};

let prevX = 0;
let prevY = 0;

const onTouchStart = (e) => {
  const touchInfo = e.touches[0] || e.changedTouches[0];
  touch.startX = touchInfo.clientX;
  touch.startY = touchInfo.clientY;
  touch.deltaX = 0;
  touch.deltaY = 0;
  touch.isTap = true;

  dragging.value = true;
  prevX = state.value.x;
  prevY = state.value.y;
};

const onTouchMove = (e) => {
  if (props.axis === 'lock') return;

  const touchInfo = e.touches[0] || e.changedTouches[0];
  touch.deltaX = touchInfo.clientX - touch.startX;
  touch.deltaY = touchInfo.clientY - touch.startY;

  if (Math.abs(touch.deltaX) > 5 || Math.abs(touch.deltaY) > 5) {
    touch.isTap = false;
  }

  if (!touch.isTap) {
    if (props.axis === 'x' || props.axis === 'xy') {
      let nextX = prevX + touch.deltaX;
      if (nextX < boundary.value.left) nextX = boundary.value.left;
      if (nextX > boundary.value.right) nextX = boundary.value.right;
      state.value.x = nextX;
    }
    if (props.axis === 'y' || props.axis === 'xy') {
      let nextY = prevY + touch.deltaY;
      if (nextY < boundary.value.top) nextY = boundary.value.top;
      if (nextY > boundary.value.bottom) nextY = boundary.value.bottom;
      state.value.y = nextY;
    }
    const currentOffset = { x: state.value.x, y: state.value.y };
    emit('update:offset', currentOffset);
  }
};

const closest = (arr, target) => arr.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev));

const onTouchEnd = () => {
  dragging.value = false;
  nextTick(() => {
    if (props.magnetic === 'x') {
      const nextX = closest([boundary.value.left, boundary.value.right], state.value.x);
      state.value.x = nextX;
    }
    if (props.magnetic === 'y') {
      const nextY = closest([boundary.value.top, boundary.value.bottom], state.value.y);
      state.value.y = nextY;
    }

    const currentOffset = { x: state.value.x, y: state.value.y };
    if (!touch.isTap) {
      emit('update:offset', currentOffset);
      if (prevX !== currentOffset.x || prevY !== currentOffset.y) {
        emit('offsetChange', currentOffset);
      }
    }
  });
};

const onClick = (e) => {
  if (touch.isTap) {
    emit('click', e);
  }
};

onMounted(() => {
  updateState();
  nextTick(() => {
    initialized = true;
  });
  uni.onWindowResize(() => {
    windowInfo.value = getWindowInfo();
    updateState();
  });
});

watch(() => [windowInfo.value.windowWidth, windowInfo.value.windowHeight, gapX.value, gapY.value, props.offset, props.modelValue], () => {
  if (props.modelValue) {
    updateState();
  }
}, {
  deep: true
});

// NVUE specific dom module
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif

defineExpose({
  show: () => show.value = true,
  hide: () => show.value = false,
  toggle: () => show.value = !show.value
})

</script>

<style lang="scss" scoped>
.zx-floating-bubble {
  position: fixed;
  left: 0;
  top: 0;
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  touch-action: none;
  background: var(--zx-primary-color, #007aff);
  color: var(--zx-white, #ffffff);
  border-radius: 50%;
  z-index: 999;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);

  &:active {
    opacity: 0.8;
  }
}
</style>