<template>
  <zx-popup
    v-model:show="showPopup"
    type="bottom"
    :round="round"
    :duration="duration"
    :z-index="zIndex"
    :overlay="overlay"
    :overlay-style="overlayStyle"
    :close-on-click-overlay="closeOnClickOverlay"
    :safe-area="safeArea"
    @open="onOpen"
    @opened="onOpened"
    @close="onClose"
    @closed="onClosed"
  >
    <view class="zx-popup-share">
      <view v-if="title || description" class="zx-popup-share__header">
        <view v-if="title" class="zx-popup-share__title">{{ title }}</view>
        <view v-if="description" class="zx-popup-share__description">{{ description }}</view>
      </view>
      <view class="zx-popup-share__content">
        <scroll-view :scroll-y="true" class="zx-popup-share__scroll">
          <view class="zx-popup-share__options">
            <view
              v-for="(item, index) in shareOptions"
              :key="index"
              class="zx-popup-share__option"
              @click="onSelect(item, index)"
            >
              <view class="zx-popup-share__icon-wrapper" :style="iconWrapperStyle(item.icon)">
                <image v-if="isImageUrl(item.icon)" :src="item.icon" class="zx-popup-share__image-icon" />
                <text v-else class="zx-popup-share__icon-text" :style="{ color: iconColor(item.icon) }">{{ getIconText(item.icon) }}</text>
              </view>
              <view v-if="item.name" class="zx-popup-share__name">{{ item.name }}</view>
              <view v-if="item.description" class="zx-popup-share__option-description">{{ item.description }}</view>
            </view>
          </view>
        </scroll-view>
      </view>
      <view v-if="cancelText" class="zx-popup-share__cancel" @click="onCancel">
        {{ cancelText }}
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

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
    default: '分享到'
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
  safeArea: {
    type: Boolean,
    default: true
  },
  beforeClose: {
    type: Function,
    default: null
  }
});

const emit = defineEmits(['update:show', 'select', 'cancel', 'open', 'opened', 'close', 'closed']);

const showPopup = ref(props.show);

// 默认分享选项
const defaultOptions = [
  { name: '微信', icon: 'wechat', type: 'wechat' },
  { name: '朋友圈', icon: 'wechat-moments', type: 'wechat-moments' },
  { name: 'QQ', icon: 'qq', type: 'qq' },
  { name: '微博', icon: 'weibo', type: 'weibo' },
  { name: '复制链接', icon: 'link', type: 'copy' },
  { name: '更多', icon: 'more', type: 'more' }
];

const shareOptions = computed(() => {
  return props.options.length > 0 ? props.options : defaultOptions;
});

watch(() => props.show, (val) => {
  showPopup.value = val;
});

watch(showPopup, (val) => {
  emit('update:show', val);
});

const open = () => {
  showPopup.value = true;
};

const close = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('close');
    if (result === false) {
      return;
    }
  }
  showPopup.value = false;
};

const onOpen = () => {
  emit('open');
};

const onOpened = () => {
  emit('opened');
};

const onClose = () => {
  emit('close');
};

const onClosed = () => {
  emit('closed');
};

const onCancel = async () => {
  if (props.beforeClose) {
    const result = await props.beforeClose('cancel');
    if (result === false) {
      return;
    }
  }
  emit('cancel');
  close();
};

const onSelect = (option, index) => {
  emit('select', option, index);
  // 通常选择后关闭弹窗
  close();
};

// 暴露方法给父组件
defineExpose({
  open,
  close
});

const isImageUrl = (icon) => {
  return typeof icon === 'string' && (icon.includes('/') || icon.startsWith('data:image'));
};

const iconColor = (iconName) => {
  const coloredIcons = ['qq', 'weibo', 'wechat', 'wechat-moments'];
  if (coloredIcons.includes(iconName)) {
    return '#fff'; // 特定图标使用白色
  }
  return '#646566'; // 默认图标颜色
};

const getIconText = (iconName) => {
  const iconMap = {
    'wechat': '微',
    'wechat-moments': '圈',
    'qq': 'Q',
    'weibo': '微',
    'link': '链',
    'copy': '复',
    'more': '更',
    'photo': '图',
    'save': '存',
    'share': '享',
    'download': '载',
    'qrcode': '码',
    'poster': '海',
    'warning': '!',
    'heart': '♥',
    'star': '★'
  };
  return iconMap[iconName] || iconName.charAt(0).toUpperCase();
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
      // 其他图标使用默认背景
      break;
  }
  return styles;
};

</script>

<style lang="scss" scoped>
.zx-popup-share {
  background-color: #fff;

  &__header {
    padding: 24rpx 32rpx;
    text-align: center;
    border-bottom: 1px solid #ebedf0;
  }

  &__title {
    color: #323233;
    font-weight: 500;
    font-size: 32rpx;
    line-height: 44rpx;
  }

  &__description {
    display: block;
    margin-top: 16rpx;
    color: #969799;
    font-size: 28rpx;
    line-height: 32rpx;
  }

  &__content {
    max-height: 70vh;
    overflow: hidden;
  }

  &__scroll {
    box-sizing: border-box;
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    padding: 32rpx 16rpx;
    justify-content: flex-start;
  }

  &__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    user-select: none;
    padding: 20rpx;
    width: calc(25% - 20rpx);
    box-sizing: border-box;
    margin-right: 16rpx;
    margin-bottom: 16rpx;
    text-align: center;

    &:nth-child(4n) {
      margin-right: 0;
    }

    &:active {
      opacity: 0.7;
    }
  }

  &__image-icon {
    width: 96rpx;
    height: 96rpx;
    border-radius: 50%;
  }

  &__icon-wrapper {
    width: 96rpx;
    height: 96rpx;
    margin-bottom: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #f7f8fa;
  }

  &__icon-text {
    font-size: 36rpx;
    font-weight: 600;
    line-height: 1;
  }

  &__name {
    margin-top: 16rpx;
    padding: 0 8rpx;
    color: #646566;
    font-size: 24rpx;
    word-break: break-all;
  }

  &__option-description {
    padding: 0 8rpx;
    color: #c8c9cc;
    font-size: 24rpx;
    word-break: break-all;
  }

  &__cancel {
    display: block;
    width: 100%;
    padding: 0;
    font-size: 32rpx;
    line-height: 96rpx;
    text-align: center;
    background: #fff;
    border: none;
    cursor: pointer;

    &::before {
      display: block;
      height: 16rpx;
      background-color: #f7f8fa;
      content: ' ';
    }

    &:active {
      background-color: #f2f3f5;
    }
  }
}


</style>