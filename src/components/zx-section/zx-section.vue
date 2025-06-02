<template>
  <view class="zx-section" :style="{ borderRadius: borderRadius }">
    <view class="zx-section-header" @click="handleClick">
      <view class="zx-section-header__decoration" v-if="type" :class="type" />
      <slot v-else name="decoration"></slot>

      <view class="zx-section-header__content">
        <text :style="{ 'font-size': titleFontSize, 'color': titleColor }" class="zx-section__content-title"
          :class="{ 'distraction': !subTitle }">{{ title }}</text>
        <text v-if="subTitle" :style="{ 'font-size': subTitleFontSize, 'color': subTitleColor }"
          class="zx-section-header__content-sub">{{ subTitle }}</text>
      </view>

      <view class="zx-section-header__slot-right">
        <slot name="right"></slot>
      </view>
    </view>

    <view class="zx-section-content" :style="{ padding: contentPadding }">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

/**
 * zx-section 标题栏
 * @description 标题栏组件，主要用于文章、列表详情等标题展示
 * @property {String} type - 标题装饰类型，可选值：line（竖线）、circle（圆形）、square（方形）
 * @property {String} title - 主标题
 * @property {String} titleFontSize - 主标题字体大小
 * @property {String} titleColor - 主标题字体颜色
 * @property {String} subTitle - 副标题
 * @property {String} subTitleFontSize - 副标题字体大小
 * @property {String} subTitleColor - 副标题字体颜色
 * @property {String} contentPadding - 默认插槽容器的padding值
 * @property {String} borderRadius - 圆角值
 * @example
 * <zx-section title="标题">
 *   <view>内容</view>
 * </zx-section>
 */

const props = defineProps({
  // 标题装饰类型，可选值：line（竖线）、circle（圆形）、square（方形）
  type: {
    type: String,
    default: ''
  },
  // 主标题
  title: {
    type: String,
    required: true,
    default: ''
  },
  // 主标题字体大小
  titleFontSize: {
    type: String,
    default: '36rpx'
  },
  // 主标题字体颜色
  titleColor: {
    type: String,
    default: '#333'
  },
  // 副标题
  subTitle: {
    type: String,
    default: ''
  },
  // 副标题字体大小
  subTitleFontSize: {
    type: String,
    default: '30rpx'
  },
  // 副标题字体颜色
  subTitleColor: {
    type: String,
    default: '#999'
  },
  // 插槽容器的padding值
  contentPadding: {
    type: String,
    default: '30rpx'
  },
  // 圆角值
  borderRadius: {
    type: String,
    default: '10rpx'
  }
});

const emit = defineEmits(['click']);

// 点击事件处理
const handleClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
$zx-primary: #2979ff !default;

.zx-section {
  background-color: #fff;
  margin-bottom: 20rpx;

  .zx-section-header {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    padding: 25rpx 20rpx;
    font-weight: normal;
    border-bottom: 1rpx solid #ececec;

    &__decoration {
      margin-right: 10rpx;
      background-color: $zx-primary;

      &.line {
        width: 8rpx;
        height: 36rpx;
        border-radius: 10rpx;
      }

      &.circle {
        width: 16rpx;
        height: 18rpx;
        border-radius: 50rpx;
      }

      &.square {
        width: 16rpx;
        height: 16rpx;
      }
    }

    &__content {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-direction: column;
      flex: 1;
      color: #333;

      .distraction {
        flex-direction: row;
        align-items: center;
      }
    }

    &__content-sub {
      margin-top: 5rpx;
    }

    &__slot-right {
      font-size: 28rpx;
    }
  }

  .zx-section-content {
    font-size: 28rpx;
  }
}
</style>
