<template>
  <view class="zx-section">
    <view class="zx-section-header" @click="handleClick">
      <view class="zx-section-header__decoration" v-if="type" :class="type" />
      <slot v-else name="decoration"></slot>

      <view class="zx-section-header__content">
        <text 
          :style="{'font-size': titleFontSize, 'color': titleColor}" 
          class="zx-section__content-title" 
          :class="{'distraction': !subTitle}"
        >{{ title }}</text>
        <text 
          v-if="subTitle" 
          :style="{'font-size': subTitleFontSize, 'color': subTitleColor}" 
          class="zx-section-header__content-sub"
        >{{ subTitle }}</text>
      </view>

      <view class="zx-section-header__slot-right">
        <slot name="right"></slot>
      </view>
    </view>

    <view class="zx-section-content" :style="{ padding: padding ? (typeof padding === 'string' ? padding : '10px') : '' }">
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
 * @property {Boolean|String} padding - 默认插槽容器的padding值，传入类型为Boolean时，设置为10px或0
 */

// 定义组件名称
defineOptions({
  name: 'ZxSection'
});

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  titleFontSize: {
    type: String,
    default: '14px'
  },
  titleColor: {
    type: String,
    default: '#333'
  },
  subTitle: {
    type: String,
    default: ''
  },
  subTitleFontSize: {
    type: String,
    default: '12px'
  },
  subTitleColor: {
    type: String,
    default: '#999'
  },
  padding: {
    type: [Boolean, String],
    default: false
  }
});

const emit = defineEmits(['click']);

// 监听标题变化，用于统计
if (props.title && uni.report) {
  uni.report('title', props.title);
}

// 点击事件处理
const handleClick = () => {
  emit('click');
};
</script>

<style lang="scss">
$zx-primary: #2979ff !default;

.zx-section {
  background-color: #fff;
  
  .zx-section-header {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: row;
    align-items: center;
    padding: 12px 10px;
    font-weight: normal;

    &__decoration {
      margin-right: 6px;
      background-color: $zx-primary;
      
      &.line {
        width: 4px;
        height: 12px;
        border-radius: 10px;
      }

      &.circle {
        width: 8px;
        height: 8px;
        border-radius: 50px;
      }

      &.square {
        width: 8px;
        height: 8px;
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
      margin-top: 2px;
    }

    &__slot-right {
      font-size: 14px;
    }
  }

  .zx-section-content {
    font-size: 14px;
  }
}
</style>
