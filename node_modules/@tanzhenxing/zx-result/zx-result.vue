<template>
  <view v-if="show" class="zx-result" :style="[resultStyle]">
    <!-- 图标区域 -->
    <view class="zx-result__icon">
      <slot name="icon">
        <!-- 默认图标 -->
        <view v-if="!customIcon" class="zx-result__icon--default" :class="[`zx-result__icon--${icon}`]">
          <zx-icon :name="iconName" :size="iconSize" :color="iconColor"></zx-icon>
        </view>
        <!-- 自定义图标/图片 -->
        <view v-else class="zx-result__icon--custom">
          <image v-if="isImageIcon" :src="icon" :style="imageStyle" mode="aspectFit"></image>
          <zx-icon v-else :name="icon" :size="iconSize" :color="iconColor"></zx-icon>
        </view>
      </slot>
    </view>

    <!-- 标题区域 -->
    <view class="zx-result__title" v-if="title || $slots.title">
      <slot name="title">
        <zx-text :text="title" :size="titleSize" :color="titleColor" :bold="titleBold"></zx-text>
      </slot>
    </view>

    <!-- 副标题区域 -->
    <view class="zx-result__subtitle" v-if="subTitle || $slots['sub-title']">
      <slot name="sub-title">
        <zx-text :text="subTitle" :size="subTitleSize" :color="subTitleColor"></zx-text>
      </slot>
    </view>

    <!-- 额外内容区域 -->
    <view class="zx-result__extra" v-if="$slots.extra || $slots.default">
      <slot name="extra">
        <slot></slot>
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * result 结果
 * @description 用于对用户的操作结果或者异常状态做反馈
 * @tutorial https://zxui.org/components/result
 * @property {Boolean}			show			是否显示组件
 * @property {String}			icon			图标类型或自定义图标名称，可选值：success、error、warning、info
 * @property {String}			title			标题文字
 * @property {String}			subTitle		副标题文字
 * @property {String}			titleSize		标题字体大小
 * @property {String}			titleColor		标题文字颜色
 * @property {Boolean}			titleBold		标题是否加粗
 * @property {String}			subTitleSize	副标题字体大小
 * @property {String}			subTitleColor	副标题文字颜色
 * @property {String | Number}	iconSize		图标大小
 * @property {String}			iconColor		图标颜色
 * @property {String | Number}	width			图片图标宽度
 * @property {String | Number}	height			图片图标高度
 * @property {String | Number}	marginTop		组件顶部间距
 * @property {String | Number}	marginBottom	组件底部间距
 * @property {String}			padding			组件内边距
 * @property {String}			backgroundColor	背景色
 * @slot {default}				-				额外内容插槽
 * @slot {icon}					-				自定义图标插槽
 * @slot {title}				-				自定义标题插槽
 * @slot {sub-title}			-				自定义副标题插槽
 * @slot {extra}				-				额外内容插槽
 * @example <zx-result icon="success" title="Success Tip" sub-title="Please follow the instructions"></zx-result>
 */

import { computed } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'


const props = defineProps({
  // 是否显示组件
  show: {
    type: Boolean,
    default: true
  },
  // 图标类型：success、error、warning、info，或自定义图标名称/图片路径
  icon: {
    type: String,
    default: 'info'
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 副标题
  subTitle: {
    type: String,
    default: ''
  },
  // 标题字体大小
  titleSize: {
    type: [String, Number],
    default: '48rpx'
  },
  // 标题颜色
  titleColor: {
    type: String,
    default: '#303133'
  },
  // 标题是否加粗
  titleBold: {
    type: Boolean,
    default: true
  },
  // 副标题字体大小
  subTitleSize: {
    type: [String, Number],
    default: '32rpx'
  },
  // 副标题颜色
  subTitleColor: {
    type: String,
    default: '#606266'
  },
  // 图标大小
  iconSize: {
    type: [String, Number],
    default: '160rpx'
  },
  // 图标颜色（自定义图标时有效）
  iconColor: {
    type: String,
    default: ''
  },
  // 图片图标宽度
  width: {
    type: [String, Number],
    default: '200rpx'
  },
  // 图片图标高度
  height: {
    type: [String, Number],
    default: '200rpx'
  },
  // 组件顶部间距
  marginTop: {
    type: [String, Number],
    default: '40rpx'
  },
  // 组件底部间距
  marginBottom: {
    type: [String, Number],
    default: '40rpx'
  },
  // 组件内边距
  padding: {
    type: String,
    default: '40rpx'
  },
  // 背景色
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
});

// 内置图标映射
const iconMap = {
  success: {
    name: 'checkmark',
    color: '#67C23A'
  },
  error: {
    name: 'close',
    color: '#F56C6C'
  },
  warning: {
    name: 'warning',
    color: '#E6A23C'
  },
  info: {
    name: 'info',
    color: '#909399'
  }
};

// 是否为自定义图标（非内置类型）
const customIcon = computed(() => {
  return !iconMap[props.icon];
});

// 是否为图片图标
const isImageIcon = computed(() => {
  return props.icon.includes('/') || props.icon.includes('http') || props.icon.includes('data:');
});

// 图标名称
const iconName = computed(() => {
  if (customIcon.value) {
    return props.icon;
  }
  return iconMap[props.icon]?.name || 'info';
});

// 图标颜色
const iconColorComputed = computed(() => {
  if (props.iconColor) {
    return props.iconColor;
  }
  if (customIcon.value) {
    return '#909399';
  }
  return iconMap[props.icon]?.color || '#909399';
});

// 最终图标颜色
const iconColor = computed(() => {
  return iconColorComputed.value;
});

// 图片样式
const imageStyle = computed(() => {
  return {
    width: props.width,
    height: props.height
  };
});

// 组件整体样式
const resultStyle = computed(() => {
  return {
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    padding: props.padding,
    backgroundColor: props.backgroundColor
  };
});
</script>

<style scoped lang="scss">
.zx-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__icon {
    margin-bottom: 40rpx;

    &--default {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;

      &.zx-result__icon--success {
        background-color: rgba(103, 194, 58, 0.1);
      }

      &.zx-result__icon--error {
        background-color: rgba(245, 108, 108, 0.1);
      }

      &.zx-result__icon--warning {
        background-color: rgba(230, 162, 60, 0.1);
      }

      &.zx-result__icon--info {
        background-color: rgba(144, 147, 153, 0.1);
      }
    }

    &--custom {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__title {
    margin-bottom: 20rpx;
  }

  &__subtitle {
    margin-bottom: 40rpx;
  }

  &__extra {
    width: 100%;
  }
}
</style>
