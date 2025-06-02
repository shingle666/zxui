<template>
  <zx-popup :show="show" type="bottom" :z-index="zIndex" :duration="duration * 1000" :mask-click="closeOnClickOverlay"
    :overlay="overlay" :border-radius="round ? '20rpx 20rpx 0 0' : '0'" background-color="#fff"
    @update:show="$emit('update:show', $event)" @open="$emit('open')" @opened="$emit('opened')" @close="$emit('close')"
    @closed="$emit('closed')" @mask-click="onClickOverlay">
    <view class="zx-share-sheet">
      <view v-if="title || description" class="zx-share-sheet__header">
        <view v-if="title" class="zx-share-sheet__title">{{ title }}</view>
        <view v-if="description" class="zx-share-sheet__description">{{ description }}</view>
      </view>
      <view class="zx-share-sheet__options-wrapper">
        <scroll-view :scroll-y="true" class="zx-share-sheet__options-scroll">
          <template v-if="Array.isArray(options[0])">
            <view v-for="(row, rowIndex) in options" :key="rowIndex" class="zx-share-sheet__options"
              :class="{ 'zx-share-sheet__options--border': rowIndex !== 0 }">
              <view v-for="(option, index) in row" :key="index" class="zx-share-sheet__option"
                @click="onSelect(option, index, rowIndex)">
                <view class="zx-share-sheet__icon-wrapper" :style="iconWrapperStyle(option.icon)">
                  <zx-icon :name="option.icon" :custom-prefix="option.customPrefix" :color="iconColor(option.icon)"
                    size="60rpx"></zx-icon>
                </view>
                <view v-if="option.name" class="zx-share-sheet__name">{{ option.name }}</view>
                <view v-if="option.description" class="zx-share-sheet__option-description">{{ option.description }}
                </view>
              </view>
            </view>
          </template>
          <template v-else>
            <view class="zx-share-sheet__options">
              <view v-for="(option, index) in options" :key="index" class="zx-share-sheet__option"
                @click="onSelect(option, index)">
                <view class="zx-share-sheet__icon-wrapper" :style="iconWrapperStyle(option.icon)">
                  <zx-icon :name="option.icon" :custom-prefix="option.customPrefix" :color="iconColor(option.icon)"
                    size="60rpx"></zx-icon>
                </view>
                <view v-if="option.name" class="zx-share-sheet__name">{{ option.name }}</view>
                <view v-if="option.description" class="zx-share-sheet__option-description">{{ option.description }}
                </view>
              </view>
            </view>
          </template>
        </scroll-view>
      </view>
      <view v-if="cancelText" class="zx-share-sheet__cancel" @click="onCancel">
        {{ cancelText }}
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  description: {
    type: String,
    default: ''
  },
  duration: {
    type: [Number, String],
    default: 0.3
  },
  zIndex: {
    type: [Number, String],
    default: 2000
  },
  round: {
    type: Boolean,
    default: true
  },
  overlay: {
    type: Boolean,
    default: true
  },
  overlayStyle: {
    type: Object,
    default: () => ({})
  },
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: null
  },
  customPrefix: {
    type: String,
    default: "zx-icon",
  }
});

const emit = defineEmits(['update:show', 'select', 'cancel', 'open', 'opened', 'close', 'closed']);

const onClickOverlay = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('overlay');
    if (result === false) {
      return;
    }
  }
  // zx-popup 会自动处理关闭逻辑
};

const onCancel = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('cancel');
    if (result === false) {
      return;
    }
  }
  emit('cancel');
  emit('update:show', false);
};

const onSelect = (option, index, rowIndex) => {
  emit('select', option, rowIndex !== undefined ? `${rowIndex}-${index}` : index);
  // close(); // Vant closes by default, you might want to control this via a prop or event
};

const isImageUrl = (icon) => {
  return typeof icon === 'string' && (icon.includes('/') || icon.startsWith('data:image'));
};

const iconColor = (iconName) => {
  const coloredIcons = ['qq', 'weibo', 'wechat', 'wechat-moments'];
  if (coloredIcons.includes(iconName)) {
    return '#fff'; // White color for specific icons with background
  }
  return '#646566'; // Default icon color
};

const iconWrapperStyle = (iconName) => {
  const styles = {};
  switch (iconName) {
    case 'qq':
      styles.backgroundColor = '#38b9fa';
      break;
    case 'wechat':
      styles.backgroundColor = '#0bc15f';
      break;
    case 'weibo':
      styles.backgroundColor = '#ee575e';
      break;
    case 'wechat-moments':
      styles.backgroundColor = '#7bc845';
      break;
    default:
      // For other icons, the default background from CSS will apply
      break;
  }
  return styles;
};

</script>

<style lang="scss" scoped>
.zx-share-sheet {

  &__header {
    padding: 24rpx 32rpx;
    text-align: center;
  }

  &__title {
    margin-top: 16rpx;
    color: #323233; // $van-text-color
    font-weight: normal; // 400
    font-size: 32rpx; // $van-font-size-md
    line-height: 44rpx; // $van-line-height-md
  }

  &__description {
    display: block;
    margin-top: 16rpx;
    color: #969799; // $van-text-color-2
    font-size: 28rpx; // $van-font-size-sm
    line-height: 32rpx;
  }

  &__options-wrapper {
    max-height: 70vh; // Limit height to prevent full screen takeover
    overflow: hidden;
  }

  &__options-scroll {
    // The scroll-view needs a defined height to work correctly
    // This will be implicitly handled by max-height on wrapper if content overflows
    // Or you can set a specific height here if needed.
    box-sizing: border-box;
  }

  &__options {
    position: relative;
    display: flex;
    flex-wrap: wrap; // Allow items to wrap to the next line
    padding: 32rpx 0 32rpx 16rpx;
    // overflow-x: auto; // For horizontal scrolling if not wrapping
    // overflow-y: visible;

    &--border {
      position: relative;

      &::before {
        content: ' ';
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        top: 0;
        left: 32rpx;
        right: 0;
        border-top: 1px solid #ebedf0; // $van-border-color
        transform: scaleY(0.5);
      }
    }
  }

  &__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    padding: 20rpx;
    width: calc(25% - 20rpx); // Example for 4 items per row, adjust as needed
    box-sizing: border-box;
    margin-right: 16rpx; // Spacing between items
    margin-bottom: 16rpx;
    text-align: center;

    &:active {
      opacity: 0.7;
    }
  }

  &__image-icon,
  &__icon {
    width: 96rpx; // $van-share-sheet-icon-size
    height: 96rpx;
    margin: 0 32rpx;
    margin-bottom: 16rpx;
  }

  &__icon-wrapper {
    width: 96rpx; // $van-share-sheet-icon-size
    height: 96rpx;
    margin: 0 32rpx;
    margin-bottom: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f7f8fa; // $van-gray-2

    // Specific background colors for certain icons
    &.zx-icon--qq,
    // This class won't be directly on wrapper anymore, but logic is in script
    &.zx-icon--weibo,
    &.zx-icon--wechat,
    &.zx-icon--wechat-moments {
      // These specific background colors will be applied based on icon name via :style or a computed class if preferred
    }
  }

  // Apply specific background colors using dynamic classes or styles if needed based on option.icon
  // For simplicity, the script now handles icon color, and background is generic for wrapper
  // Or, you can add dynamic classes to the wrapper based on option.icon for specific backgrounds:
  // e.g., :class="{ 'zx-share-sheet__icon-wrapper--wechat': option.icon === 'wechat' }"
  // And then define .zx-share-sheet__icon-wrapper--wechat { background-color: #0bc15f; }

  // Example for direct background styling (can be moved to a computed style for cleanliness)
  .zx-share-sheet__icon-wrapper[style*="--custom-bg-color"] {
    background-color: var(--custom-bg-color);
  }

  // Styling for zx-icon component if needed, though it should be self-contained
  // .zx-icon {
  //   font-size: 60rpx !important; // Example to ensure size, but prefer props
  // }


  &__name {
    margin-top: 16rpx;
    padding: 0 8rpx;
    color: #646566; // $van-share-sheet-option-name-color
    font-size: 24rpx; // $van-share-sheet-option-name-font-size
    word-break: break-all;
  }

  &__option-description {
    padding: 0 8rpx;
    color: #c8c9cc; // $van-share-sheet-option-description-color
    font-size: 24rpx; // $van-share-sheet-option-description-font-size
    word-break: break-all;
  }

  &__cancel {
    display: block;
    width: 100%;
    padding: 0;
    font-size: 32rpx; // $van-share-sheet-cancel-button-font-size
    line-height: 96rpx; // $van-share-sheet-cancel-button-height
    text-align: center;
    background: #fff; // $van-share-sheet-cancel-button-background
    border: none;
    cursor: pointer;

    &::before {
      display: block;
      height: 16rpx; // $van-padding-xs
      background-color: #f7f8fa; // $van-background
      content: ' ';
    }

    &:active {
      background-color: #f2f3f5; // $van-active-color
    }
  }
}
</style>