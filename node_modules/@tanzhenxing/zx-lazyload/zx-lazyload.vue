<template>
  <view class="zx-lazyload" :style="[viewStyle]">
    <image v-if="isLoad" :class="['zx-lazyload__image', { 'zx-lazyload__image--fade-in': showImage && fadeIn }]"
      :src="currentSrc" :mode="mode" :webp="webp" :lazy-load="false" :show-menu-by-longpress="showMenuByLongpress"
      :draggable="draggable" @load="onImageLoad" @error="onImageError" :style="[imageStyle, imageCustomStyle]" />
    <view v-if="!isLoad && (loadingSrc || useLoadingSlot)" class="zx-lazyload__loading"
      :style="[imageStyle, imageCustomStyle]">
      <slot v-if="useLoadingSlot" name="loading"></slot>
      <image v-else-if="loadingSrc" :src="loadingSrc" :mode="mode" :webp="webp" class="zx-lazyload__loading-img"
        :style="[imageStyle, imageCustomStyle]" />
    </view>
    <view v-if="isError && !isLoad && (errorSrc || useErrorSlot)" class="zx-lazyload__error"
      :style="[imageStyle, imageCustomStyle]">
      <slot v-if="useErrorSlot" name="error"></slot>
      <image v-else-if="errorSrc" :src="errorSrc" :mode="mode" :webp="webp" class="zx-lazyload__error-img"
        :style="[imageStyle, imageCustomStyle]" />
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, getCurrentInstance, computed, nextTick } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: 'aspectFill', // UniApp image mode
  },
  webp: {
    type: Boolean,
    default: false,
  },
  showMenuByLongpress: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  loadingSrc: {
    type: String,
    default: '',
  },
  errorSrc: {
    type: String,
    default: '',
  },
  // 预加载阈值，0-1之间，表示元素顶部或底部进入视窗的百分比
  threshold: {
    type: Number,
    default: 0.1, // 元素将要进入视窗的10%时开始加载
  },
  // 视图区域的自定义样式
  viewStyle: {
    type: Object,
    default: () => ({}),
  },
  // 图片的自定义样式
  imageCustomStyle: {
    type: Object,
    default: () => ({}),
  },
  // 图片加载成功后是否启用淡入效果
  fadeIn: {
    type: Boolean,
    default: true,
  },
  // 是否使用 loading slot
  useLoadingSlot: {
    type: Boolean,
    default: false,
  },
  // 是否使用 error slot
  useErrorSlot: {
    type: Boolean,
    default: false,
  },
  // 宽度，单位rpx或px
  width: {
    type: [String, Number],
    default: '100%',
  },
  // 高度，单位rpx或px。如果设置了高度，则图片会按此高度显示，否则按图片原始比例显示（mode=widthFix时）
  height: {
    type: [String, Number],
    default: 'auto',
  },
  // 圆角，单位rpx或px
  radius: {
    type: [String, Number],
    default: 0,
  },
});

const emits = defineEmits(['load', 'error']);

const instance = getCurrentInstance();
const isLoad = ref(false); // 是否已开始加载真实图片
const isError = ref(false); // 是否加载失败
const currentSrc = ref('');
const showImage = ref(false); // 控制图片显示，用于淡入效果

let observer = null;

const imageStyle = computed(() => {
  const style = {};
  style.width = typeof props.width === 'number' ? `${props.width}rpx` : props.width;
  style.height = typeof props.height === 'number' ? `${props.height}rpx` : props.height;
  if (props.radius) {
    style.borderRadius = typeof props.radius === 'number' ? `${props.radius}rpx` : props.radius;
    // H5中，img标签的borderRadius不会裁剪内部图片，需要overflow:hidden
    // #ifdef H5
    style.overflow = 'hidden';
    // #endif
  }
  return style;
});

const init = () => {
  if (!props.src) return;
  // #ifndef APP-NVUE
  // nvue不支持IntersectionObserver
  // 在非nvue平台，如果已经加载过，或者已经在视窗内，则直接加载
  // 对于nvue，则直接尝试加载图片，因为它没有懒加载的概念，或者需要其他方式实现
  if (observer) {
    observer.disconnect();
  }
  nextTick(() => {
    // 确保 instance 和 DOM 元素可用
    if (!instance || !instance.proxy || !instance.proxy.$el) {
      // consolewarn("[zx-lazyload] Instance or element not ready for IntersectionObserver");
      return;
    }
    observer = uni.createIntersectionObserver(instance, {
      thresholds: [props.threshold > 1 ? 1 : props.threshold < 0 ? 0 : props.threshold, 1],
      initialRatio: 0, // 初始时不触发
    });

    observer.relativeToViewport({ bottom: '0px' }); // 0px表示视窗底部
    // 使用 class 选择器确保选择到当前组件内的元素
    const targetElement = instance.proxy.$el.querySelector('.zx-lazyload');
    if (targetElement) {
      observer.observe(targetElement, (res) => {
        if (res.intersectionRatio > 0 && !isLoad.value) {
          loadImage();
          if (observer) {
            observer.disconnect(); // 加载后停止观察
            observer = null;
          }
        }
      });
    } else {
      // consolewarn("[zx-lazyload] Target element .zx-lazyload not found for IntersectionObserver");
    }
  });
  // #endif

  // #ifdef APP-NVUE
  // NVUE环境直接加载
  loadImage();
  // #endif
};

const loadImage = () => {
  if (isLoad.value || !props.src) return;
  isError.value = false;
  currentSrc.value = props.src;
  // 标记开始加载，此时会显示真实图片，但可能还未加载完成
  // onImageLoad/onImageError会处理后续状态
};

const onImageLoad = (event) => {
  isLoad.value = true;
  isError.value = false;
  nextTick(() => {
    showImage.value = true; // 图片加载完成后，触发淡入
  });
  emits('load', event.detail);
};

const onImageError = (event) => {
  isLoad.value = false; // 标记未加载成功，这样错误占位图可以显示
  isError.value = true;
  currentSrc.value = ''; // 清空，避免显示损坏的图片图标
  emits('error', event.detail);
};

watch(() => props.src, (newSrc) => {
  if (newSrc) {
    isLoad.value = false;
    isError.value = false;
    showImage.value = false;
    currentSrc.value = props.loadingSrc || ''; // 重置时先显示loading
    // 在 src 变化时重新初始化观察器
    // 确保在 DOM 更新后执行 init
    nextTick(() => {
      init();
    });
  } else {
    // src被清空
    isLoad.value = false;
    isError.value = false;
    showImage.value = false;
    currentSrc.value = '';
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }
}); // 移除 immediate: true

onMounted(() => {
  if (props.src) { // 仅当初始 src 有值时才在 onMounted 中 init
    init();
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

// NVUE下，如果父组件是recycle-list，可能需要特殊处理
// 但IntersectionObserver在nvue下不可用，所以nvue是直接加载的

</script>

<style lang="scss" scoped>
.zx-lazyload {
  display: inline-block; // 默认行为，使其可以被IntersectionObserver观察到具体尺寸
  position: relative;
  overflow: hidden; // 配合图片圆角
}

.zx-lazyload__image {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
}

.zx-lazyload__image--fade-in {
  opacity: 1;
}

.zx-lazyload__loading,
.zx-lazyload__error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; // 默认的占位背景色
}

.zx-lazyload__loading-img,
.zx-lazyload__error-img {
  width: 100%;
  height: 100%;
}
</style>