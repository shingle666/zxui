<template>
  <view
    class="zx-swipe-cell"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
    ref="rootRef"
  >
    <view
      class="zx-swipe-cell__wrapper"
      :style="wrapperStyle"
      @click="onClick('cell', $event)"
    >
      <view
        v-if="state.computedLeftWidth > 0"
        ref="leftRef"
        class="zx-swipe-cell__left"
        :style="{ width: state.computedLeftWidth + 'px' }"
        @click.stop="onClick('left', $event)"
      >
        <slot name="left"></slot>
      </view>
      <slot></slot>
      <view
        v-if="state.computedRightWidth > 0"
        ref="rightRef"
        class="zx-swipe-cell__right"
        :style="{ width: state.computedRightWidth + 'px' }"
        @click.stop="onClick('right', $event)"
      >
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, reactive, watch, nextTick, onMounted } from 'vue';
// import { getRect } from '../../utils/utils'; // Assuming a utility function for getRect

const props = defineProps({
  name: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  leftWidth: {
    type: [String, Number],
    default: 'auto',
  },
  rightWidth: {
    type: [String, Number],
    default: 'auto',
  },
  beforeClose: {
    type: Function,
    default: null,
  },
  stopPropagation: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['open', 'close', 'click']);

const rootRef = ref(null);
const leftRef = ref(null);
const rightRef = ref(null);

const state = reactive({
  offset: 0,
  dragging: false,
  computedLeftWidth: 0,
  computedRightWidth: 0,
});

let openedSide = null; // 'left', 'right', or null
let lockClick = false;
let startOffset = 0;
let isInBeforeClosing = false;

const touchState = {
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
  direction: '',
};

const getComputedWidth = async (refInstance, propWidth) => {
  if (propWidth !== 'auto') {
    return Number(propWidth);
  }
  if (refInstance && refInstance.value) {
    // In uni-app, direct DOM access like refInstance.value.offsetWidth is not reliable across platforms.
    // We need to use uni.createSelectorQuery()
    try {
      const rect = await getRect(refInstance.value, {
        context: getCurrentInstanceInternal(),
      });
      return rect ? rect.width : 0;
    } catch (e) {
      return 0;
    }
  }
  return 0;
};

// Helper to get current instance for uni.createSelectorQuery
const getRect = (selector, options = {}) => {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery();
    // #ifdef VUE3
    if (options.context) {
      query.in(options.context);
    }
    // #endif
    query.select(selector).boundingClientRect().exec((res) => {
      resolve(res[0]);
    });
  });
};


// onMounted(async () => {
//   await nextTick(); // Ensure DOM is ready
//   state.computedLeftWidth = await getComputedWidth(leftRef, props.leftWidth);
//   state.computedRightWidth = await getComputedWidth(rightRef, props.rightWidth);
// });

// watch(() => [props.leftWidth, props.rightWidth], async () => {
//   state.computedLeftWidth = await getComputedWidth(leftRef, props.leftWidth);
//   state.computedRightWidth = await getComputedWidth(rightRef, props.rightWidth);
// }, { immediate: true });

// For uni-app, reliably getting slot content width is tricky.
// Default to 0 if 'auto' and recommend users to provide explicit widths.
state.computedLeftWidth = computed(() => props.leftWidth === 'auto' ? 0 : Number(props.leftWidth));
state.computedRightWidth = computed(() => props.rightWidth === 'auto' ? 0 : Number(props.rightWidth));

const wrapperStyle = computed(() => ({
  transform: `translate3d(${state.offset}px, 0, 0)`,
  transitionDuration: state.dragging ? '0s' : '0.6s',
}));

const open = (side) => {
  if (props.disabled) return;
  openedSide = side;
  state.offset = side === 'left' ? state.computedLeftWidth : -state.computedRightWidth;
  emit('open', { name: props.name, position: side });
};

const close = (position) => {
  state.offset = 0;
  if (openedSide) {
    const prevOpenedSide = openedSide;
    openedSide = null;
    emit('close', { name: props.name, position: position || prevOpenedSide });
  }
};

const toggle = (side) => {
  const offset = Math.abs(state.offset);
  const THRESHOLD = 0.15;
  const threshold = openedSide ? 1 - THRESHOLD : THRESHOLD;
  const width = side === 'left' ? state.computedLeftWidth : state.computedRightWidth;

  if (width && offset > width * threshold) {
    open(side);
  } else {
    close(side);
  }
};

const onTouchStart = (event) => {
  if (props.disabled || isInBeforeClosing) return;

  const touch = event.touches[0] || event.changedTouches[0];
  touchState.startX = touch.clientX;
  touchState.startY = touch.clientY;
  touchState.deltaX = 0;
  touchState.deltaY = 0;
  touchState.offsetX = 0;
  touchState.offsetY = 0;
  touchState.direction = '';
  startOffset = state.offset;
  state.dragging = false; // Reset dragging state
};

const onTouchMove = (event) => {
  if (props.disabled || isInBeforeClosing) return;

  const touch = event.touches[0] || event.changedTouches[0];
  touchState.deltaX = touch.clientX - touchState.startX;
  touchState.deltaY = touch.clientY - touchState.startY;
  touchState.offsetX = Math.abs(touchState.deltaX);
  touchState.offsetY = Math.abs(touchState.deltaY);

  if (!touchState.direction) {
    const LOCK_DIRECTION_DISTANCE = 10;
    if (touchState.offsetX > LOCK_DIRECTION_DISTANCE || touchState.offsetY > LOCK_DIRECTION_DISTANCE) {
      touchState.direction = touchState.offsetX > touchState.offsetY ? 'horizontal' : 'vertical';
    }
  }

  if (touchState.direction === 'horizontal') {
    state.dragging = true;
    lockClick = true;

    // Prevent default scrolling behavior if horizontal swipe
    // For uni-app, stopping propagation might be enough, or specific platform considerations might be needed.
    if (props.stopPropagation) {
        event.stopPropagation();
    }
    // In some cases, especially on web, you might want to prevent default browser scroll
    // if (event.cancelable) event.preventDefault(); 
    // However, be cautious with preventDefault as it can break scroll on certain platforms if not handled correctly.

    const newOffset = touchState.deltaX + startOffset;
    const minOffset = state.computedRightWidth > 0 ? -state.computedRightWidth : 0;
    const maxOffset = state.computedLeftWidth > 0 ? state.computedLeftWidth : 0;
    state.offset = Math.min(Math.max(newOffset, minOffset), maxOffset);
  }
};

const onTouchEnd = () => {
  if (props.disabled || isInBeforeClosing) return;

  if (state.dragging) {
    state.dragging = false;
    toggle(state.offset > 0 ? 'left' : 'right');
    // Use nextTick to ensure click lock is released after potential click event processing
    nextTick(() => {
      lockClick = false;
    });
  } else {
      lockClick = false; // Ensure lockClick is reset if no drag occurred
  }
};

const onClick = async (position, event) => {
  if (props.stopPropagation && position !== 'cell') {
    event.stopPropagation();
  }

  emit('click', position);

  if (openedSide && !lockClick && !isInBeforeClosing) {
    if (props.beforeClose) {
      isInBeforeClosing = true;
      try {
        const result = await props.beforeClose({ position, name: props.name, instance: { open, close } });
        if (result === false) {
          isInBeforeClosing = false;
          return;
        }
        close(position);
        isInBeforeClosing = false;
      } catch (e) {
        isInBeforeClosing = false;
        close(position); // Close by default on error
      }
    } else {
      close(position);
    }
  }
};

// Expose methods
defineExpose({
  open,
  close,
});

// Click away logic (simplified for uni-app, might need more robust solution for all platforms)
// Vant's useClickAway uses global event listeners. This is a simplified version.
// Consider if this is truly needed or if clicks on the cell itself should handle closing.
// For now, clicking the main cell content will trigger close if it's open.

</script>

<style lang="scss" scoped>
.zx-swipe-cell {
  position: relative;
  overflow: hidden; // Important to hide the overflowing left/right parts
  // cursor: grab; // Not applicable in mobile

  &__wrapper {
    position: relative;
    display: flex; // Helps if the default slot content needs to align with swipe actions
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1);
  }

  &__left,
  &__right {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center; // Vertically center content in swipe areas
  }

  &__left {
    left: 0;
    transform: translate3d(-100%, 0, 0); // Initially hidden to the left
    // The content inside slot name="left" will determine its width
  }

  &__right {
    right: 0;
    transform: translate3d(100%, 0, 0); // Initially hidden to the right
    // The content inside slot name="right" will determine its width
  }
}
</style>