<template>
  <view :class="bem()" :style="rootStyle">
    <svg :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`" :style="svgStyle">
      <defs v-if="isGradient">
        <linearGradient :id="gradientId" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop
            v-for="(item, index) in gradientColors"
            :key="index"
            :offset="item.offset"
            :stop-color="item.color"
          />
        </linearGradient>
      </defs>
      <path :class="bem('layer')" :style="layerStyle" :d="path" />
      <path
        :class="bem('hover')"
        :style="hoverStyle"
        :d="path"
        :stroke="currentColor"
      />
    </svg>
    <view v-if="!slots.default && text" :class="bem('text')">
      {{ text }}
    </view>
    <slot v-else />
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, getCurrentInstance, useSlots } from 'vue';
import { props as circleProps, bem } from './utils';

const props = defineProps(circleProps);
const emit = defineEmits(['update:currentRate']);
const slots = useSlots();

const instance = getCurrentInstance();
const gradientId = `zx-circle-gradient-${instance.uid}`;

const currentRateInner = ref(props.currentRate);

const rootStyle = computed(() => {
  const style = {};
  if (props.size) {
    // Ensure props.size is treated as a number for upx2px conversion if it's a string
    const sizeInPx = uni.upx2px(Number(props.size));
    style.width = sizeInPx + 'px';
    style.height = sizeInPx + 'px';
  }
  return style;
});

// Correct the style block for default width/height to use rpx via uni.upx2px
// This was previously a static '100px' which is not ideal for uniapp defaults.
// The actual width/height is set by rootStyle, so the CSS defaults are more of a fallback.
// However, to be consistent, if we were to set defaults in CSS, they should also consider rpx.
// For now, the JS `rootStyle` handles the `size` prop correctly.

const viewBoxSize = computed(() => Number(props.strokeWidth) + 1000);

const path = computed(() => {
  const half = viewBoxSize.value / 2;
  return `M ${half} ${half} m 0, -500 a 500, 500 0 1, ${props.clockwise ? 1 : 0} 0, 1000 a 500, 500 0 1, ${props.clockwise ? 1 : 0} 0, -1000`;
});

const svgStyle = computed(() => {
  const ROTATE_ANGLE_MAP = {
    top: 0,
    right: 90,
    bottom: 180,
    left: 270,
  };
  const angleValue = ROTATE_ANGLE_MAP[props.startPosition];
  if (angleValue) {
    return {
      transform: `rotate(${angleValue}deg)`,
    };
  }
  return {};
});

const format = (rate) => Math.min(Math.max(Number(rate), 0), 100);

let rafId = null;

watch(() => props.rate, (newRate) => {
  const startTime = Date.now();
  const startRate = currentRateInner.value;
  const endRate = format(newRate);
  const duration = Math.abs(((startRate - endRate) * 1000) / Number(props.speed));

  const animate = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    const rate = progress * (endRate - startRate) + startRate;
    currentRateInner.value = format(parseFloat(rate.toFixed(1)));
    emit('update:currentRate', currentRateInner.value);

    if (endRate > startRate ? currentRateInner.value < endRate : currentRateInner.value > endRate) {
      rafId = requestAnimationFrame(animate);
    } else {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };

  if (props.speed && Number(props.speed) > 0) {
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
    rafId = requestAnimationFrame(animate);
  } else {
    currentRateInner.value = endRate;
    emit('update:currentRate', currentRateInner.value);
  }
}, { immediate: true });

watch(() => props.currentRate, (newVal) => {
    if (newVal !== currentRateInner.value) {
        currentRateInner.value = format(newVal);
    }
});

const isGradient = computed(() => typeof props.color === 'object' && props.color !== null);

const gradientColors = computed(() => {
  if (!isGradient.value) return [];
  return Object.keys(props.color)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map(key => ({ offset: key, color: props.color[key] }));
});

const currentColor = computed(() => {
  return isGradient.value ? `url(#${gradientId})` : props.color;
});

const PERIMETER = 3140; // 2 * Math.PI * 500 (radius of the path)

const layerStyle = computed(() => ({
  fill: props.fill, // This should correctly apply 'none' by default
  stroke: props.layerColor,
  strokeWidth: `${props.strokeWidth}px`,
}));

const hoverStyle = computed(() => ({
  fill: props.fill, // Ensure hover layer also respects the fill prop
  stroke: currentColor.value,
  strokeWidth: `${Number(props.strokeWidth) + 1}px`,
  strokeLinecap: props.strokeLinecap,
  strokeDasharray: `${(PERIMETER * currentRateInner.value) / 100}px ${PERIMETER}px`,
}));

onMounted(() => {
  currentRateInner.value = format(props.currentRate);
});

onUnmounted(() => {
  if (rafId) {
    cancelAnimationFrame(rafId);
  }
});

</script>

<style lang="scss" scoped>
.zx-circle {
  position: relative;
  display: inline-block;
  text-align: center;
  /* Default size, will be overridden by size prop. Using rpx for consistency with uniapp */
  width: 100rpx; /* Default size in rpx, will be overridden by size prop via rootStyle */
  height: 100rpx; /* Default size in rpx, will be overridden by size prop via rootStyle */

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__layer {
    /* fill is controlled by layerStyle computed prop */
    /* stroke is controlled by layerStyle computed prop */
    /* stroke-width is controlled by layerStyle computed prop */
  }

  &__hover {
    /* fill is controlled by hoverStyle computed prop */
    /* stroke is controlled by hoverStyle computed prop */
    /* stroke-linecap is controlled by hoverStyle computed prop */
    /* stroke-width is implicitly controlled by hoverStyle computed prop, adding +1 to props.strokeWidth */
  }

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    width: 100%;
    padding: 0 5px;
    color: var(--zx-circle-text-color, #333); /* Darker text color */
    font-weight: var(--zx-circle-text-font-weight, normal); /* Normal font weight */
    font-size: var(--zx-circle-text-font-size, 28rpx); /* Adjusted font size */
    line-height: var(--zx-circle-text-line-height, 1.2);
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>