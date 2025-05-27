<template>
  <view
    class="zx-carousel-item"
    :class="[
      type === 'card' && 'zx-carousel-item--card',
      direction === 'vertical' && 'zx-carousel-item--vertical',
    ]"
    :style="itemStyle"
    @tap="handleClick"
  >
    <view
      class="zx-carousel-item__wrapper"
      :class="[type === 'card' && 'zx-carousel-item__wrapper--card']"
      :style="wrapperStyle"
    >
      <!-- 内容插槽 -->
      <slot>
        <!-- 默认图片展示 -->
        <image
          v-if="src && getItemType() === 'image'"
          class="zx-carousel-item__image"
          :src="src"
          :mode="imageMode"
          :lazy-load="lazyLoad"
          @load="handleImageLoad"
          @error="handleImageError"
        />
        <!-- 默认内容展示 -->
        <view v-else class="zx-carousel-item__content">
          <text class="zx-carousel-item__text">{{ label || name || "内容" }}</text>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * CarouselItem 走马灯项
 * @description 走马灯的子组件，用于包装轮播内容
 * @tutorial https://zxui.org/components/carousel
 */
import { computed, inject } from "vue";

// 定义组件名称
defineOptions({
  name: "zx-carousel-item",
});

// 定义属性
const props = defineProps({
  // 幻灯片的名字，可用作 setActiveItem 的参数
  name: {
    type: String,
    default: "",
  },
  // 该幻灯片所对应指示器的文本
  label: {
    type: [String, Number],
    default: "",
  },
  // 图片链接
  src: {
    type: String,
    default: "",
  },
  // 内容类型：image | text | custom
  type: {
    type: String,
    default: "custom",
  },
  // 图片的裁剪模式
  imageMode: {
    type: String,
    default: "aspectFill",
  },
  // 是否开启懒加载
  lazyLoad: {
    type: Boolean,
    default: true,
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: "",
  },
});

// 定义事件
const emit = defineEmits([
  "click", // 点击事件
  "imageLoad", // 图片加载成功
  "imageError", // 图片加载失败
]);

// 注入父组件提供的数据
const carouselType = inject("carouselType", "");
const carouselDirection = inject("carouselDirection", "horizontal");
const carouselHeight = inject("carouselHeight", "300rpx");

// 计算属性
const itemStyle = computed(() => {
  const style = {
    width: "100%",
    height: "100%",
  };

  // 合并自定义样式
  if (props.customStyle) {
    if (typeof props.customStyle === "string") {
      Object.assign(style, parseStyleString(props.customStyle));
    } else {
      Object.assign(style, props.customStyle);
    }
  }

  return style;
});

const wrapperStyle = computed(() => {
  return {
    width: "100%",
    height: "100%",
  };
});

// 工具函数
function parseStyleString(styleStr) {
  const styles = {};
  if (!styleStr) return styles;

  styleStr.split(";").forEach((item) => {
    const [key, value] = item.split(":");
    if (key && value) {
      const camelKey = key
        .trim()
        .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      styles[camelKey] = value.trim();
    }
  });

  return styles;
}

function getItemType() {
  if (props.type !== "custom") {
    return props.type;
  }

  if (props.src) {
    // 简单判断是否为图片链接
    const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const isImage = imageExts.some((ext) => props.src.toLowerCase().includes(ext));
    return isImage ? "image" : "text";
  }

  return "text";
}

// 事件处理
function handleClick() {
  emit("click", {
    name: props.name,
    label: props.label,
    src: props.src,
  });
}

function handleImageLoad(e) {
  emit("imageLoad", e);
}

function handleImageError(e) {
  emit("imageError", e);
}
</script>

<style lang="scss" scoped>
.zx-carousel-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  &--card {
    border-radius: 8rpx;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  }

  &--vertical {
    // 垂直模式特定样式
  }

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &--card {
      border-radius: 8rpx;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
  }

  &__text {
    font-size: 32rpx;
    color: #606266;
    text-align: center;
  }
}
</style>
