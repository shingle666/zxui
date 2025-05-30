<template>
  <view v-if="visible" class="zx-image-preview" @touchmove.prevent="preventMove">
    <swiper
      class="zx-image-preview__swiper"
      :current="currentIndex"
      :circular="loop"
      :indicator-dots="showIndicators"
      :autoplay="false"
      :duration="swipeDuration"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(item, index) in images" :key="index" class="zx-image-preview__swiper-item">
        <movable-area class="zx-image-preview__movable-area">
          <movable-view
            class="zx-image-preview__movable-view"
            direction="all"
            :scale="true"
            :scale-min="minZoom"
            :scale-max="maxZoom"
            :scale-value="currentScale[index] || 1"
            @scale="(e) => onScale(e, index)"
            @change="(e) => onMove(e, index)"
            @touchstart="(e) => onTouchStart(e, index)"
            @touchend="(e) => onTouchEnd(e, index)"
          >
            <image
              :src="item"
              class="zx-image-preview__image"
              mode="widthFix"
              @load="(e) => onImageLoad(e, index)"
              @error="(e) => onImageError(e, index)"
              @click="() => onImageClick(index)"
              :style="getImageStyle(index)"
            />
          </movable-view>
        </movable-area>
      </swiper-item>
    </swiper>

    <view v-if="showIndex && images.length > 0" class="zx-image-preview__index">
      {{ currentIndex + 1 }} / {{ images.length }}
    </view>

    <view v-if="closeable" class="zx-image-preview__close-icon" :class="['zx-image-preview__close-icon--' + closeIconPosition]" @click="close">
      <zx-icon name="close" color="#fff" size="22px"></zx-icon>
    </view>

    <slot name="cover"></slot>
  </view>
</template>

<script setup>
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from 'vue';
import zxIcon from '../zx-icon/zx-icon.vue'; // Assuming zx-icon component exists

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  show: {
    type: Boolean,
    default: false
  },
  startPosition: {
    type: Number,
    default: 0
  },
  loop: {
    type: Boolean,
    default: true
  },
  minZoom: {
    type: Number,
    default: 0.5
  },
  maxZoom: {
    type: Number,
    default: 3
  },
  swipeDuration: {
    type: Number,
    default: 300
  },
  showIndex: {
    type: Boolean,
    default: true
  },
  closeable: {
    type: Boolean,
    default: false
  },
  closeIcon: {
    type: String,
    default: 'close'
  },
  closeIconPosition: {
    type: String,
    default: 'top-right' // top-left, top-right, bottom-left, bottom-right
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  closeOnClickImage: {
    type: Boolean,
    default: true
  },
  showIndicators: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['change', 'close', 'scale', 'longPress', 'update:show']);

const visible = ref(false);
const currentIndex = ref(0);
const currentScale = ref({}); // Store scale for each image: {0: 1.2, 1: 0.8}
const imageLoaded = ref({}); // Store loaded status for each image
const imageError = ref({}); // Store error status for each image
const imageNaturalSize = ref({}); // Store natural size { index: {width, height}}

// Double tap detection
let lastTapTime = 0;
let tapTimeout = null;
const TAP_INTERVAL = 300;

watch(() => props.show, (newVal) => {
  if (newVal) {
    open();
  } else {
    closeInternal();
  }
});

watch(() => props.startPosition, (newVal) => {
  if (visible.value) {
    currentIndex.value = newVal;
  }
});

watch(() => props.images, () => {
  currentScale.value = {};
  imageLoaded.value = {};
  imageError.value = {};
  imageNaturalSize.value = {};
  if (visible.value && props.images.length > 0) {
    currentIndex.value = Math.min(currentIndex.value, props.images.length - 1);
  } else if (props.images.length === 0) {
    closeInternal();
  }
});

const getImageStyle = (index) => {
  // This is a placeholder. Actual dynamic styling for zoom/pan might be complex
  // with just <image> and might need more advanced handling if <movable-view> is not enough.
  // For now, we rely on movable-view's scaling.
  return {};
};

const open = () => {
  if (props.images.length === 0) return;
  currentIndex.value = props.startPosition;
  currentScale.value = {}; // Reset scales
  visible.value = true;
  emit('update:show', true);
};

const closeInternal = (isAction) => {
  visible.value = false;
  emit('update:show', false);
  emit('close', { index: currentIndex.value, fromAction: !!isAction });
};

const close = () => {
  if (props.beforeClose) {
    props.beforeClose(() => {
      closeInternal(true);
    });
  } else {
    closeInternal(true);
  }
};

const onSwiperChange = (e) => {
  const newIndex = e.detail.current;
  if (currentIndex.value !== newIndex) {
    currentIndex.value = newIndex;
    emit('change', newIndex);
  }
};

const onScale = (e, index) => {
  currentScale.value[index] = e.detail.scale;
  emit('scale', { scale: e.detail.scale, index });
};

const onMove = (e, index) => {
  // console.log('move', index, e.detail);
};

const onImageLoad = (e, index) => {
  imageLoaded.value[index] = true;
  imageNaturalSize.value[index] = { width: e.detail.width, height: e.detail.height };
};

const onImageError = (e, index) => {
  imageError.value[index] = true;
  // console.error(`Image load error at index ${index}:`, e.detail.errMsg);
};

const onImageClick = (index) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastTapTime < TAP_INTERVAL) {
    clearTimeout(tapTimeout);
    // Double tap
    // Implement zoom toggle or use movable-view's double tap if available
    // For now, we can reset scale or toggle to a predefined zoom level
    const targetScale = (currentScale.value[index] || 1) > 1 ? 1 : props.maxZoom / 2;
    // movable-view scale-value is one-way, need to force update if possible or rely on user interaction
    // This is tricky with uniapp's movable-view. For true double-tap zoom, might need custom gesture handling.
    // console.log('Double tap on image', index, 'targetScale', targetScale);
    // currentScale.value[index] = targetScale; // This won't directly set movable-view scale if it's controlled by user gesture
    lastTapTime = 0; // Reset for next tap sequence
  } else {
    // Single tap
    tapTimeout = setTimeout(() => {
      if (props.closeOnClickImage) {
        close();
      }
    }, TAP_INTERVAL);
  }
  lastTapTime = currentTime;
};

const onTouchStart = (e, index) => {
  // For long press or other custom gestures
  // console.log('Touch start on image', index, e.touches.length);
  if (e.touches.length === 1) {
    // Potential long press
  }
};

const onTouchEnd = (e, index) => {
  // console.log('Touch end on image', index);
};

const preventMove = (event) => {
  // To prevent page scroll when swiping images
  // event.preventDefault(); // This might be too aggressive, uniapp handles swiper scroll
};

// Expose methods if needed via defineExpose
defineExpose({
  open,
  close,
  getCurrentIndex: () => currentIndex.value,
  swipeTo: (index, duration = props.swipeDuration) => {
    if (index >= 0 && index < props.images.length) {
      // Swiper's current prop should handle this if changed directly
      // Forcing swiper to change might need more direct control if available
      currentIndex.value = index;
    }
  }
});

// Initialize on mount if show is true
onMounted(() => {
  if (props.show) {
    open();
  }
});

</script>

<style lang="scss" scoped>
.zx-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 10075; // Higher than most elements
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__swiper {
    width: 100%;
    height: 100%;
  }

  &__swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; // Important for movable-view
    width: 100%;
    height: 100%;
  }

  &__movable-area {
    width: 100%;
    height: 100%;
  }

  &__movable-view {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden; // Ensure image stays within bounds
  }

  &__image {
    max-width: 100%;
    max-height: 100%;
    // width: auto; // Let mode=widthFix handle aspect ratio
    // height: auto;
    // mode="widthFix" is generally good for preview
    // For pinch-zoom, the image itself might need to be larger than viewport
    // but movable-view handles the viewport and scaling of its child.
  }

  &__index {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 2px 8px;
    border-radius: 12px;
    z-index: 1;
  }

  &__close-icon {
    position: absolute;
    z-index: 2;
    // Default is top-right
    &--top-right {
      top: 20px; // Adjust as per safe area considerations if needed
      right: 15px;
    }
    &--top-left {
      top: 20px;
      left: 15px;
    }
    &--bottom-left {
      bottom: 20px;
      left: 15px;
    }
    &--bottom-right {
      bottom: 20px;
      right: 15px;
    }
  }
}
</style>