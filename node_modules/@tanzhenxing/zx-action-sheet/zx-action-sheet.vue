<template>
  <view class="zx-actionsheet-wrapper" @touchmove.stop.prevent>
    <view class="zx-actionsheet" :class="{
      'zx-actionsheet-show': isShow,
      'zx-actionsheet-radius': radius,
      [`zx-actionsheet-theme-${theme}`]: true,
    }" :style="[customStyle]">
      <!-- 提示文字 -->
      <view v-if="tips" class="zx-actionsheet-tips" :style="{ fontSize: size + 'rpx', color: color }">
        <slot name="tips">{{ tips }}</slot>
      </view>
      <view :class="[isCancel ? 'zx-operate-box' : '']">
        <!-- 菜单项 -->
        <block v-for="(item, index) in items" :key="index">
          <view class="zx-actionsheet-btn zx-actionsheet-divider" :class="{
            'zx-btn-last': !isCancel && index == items.length - 1,
            'zx-btn-disabled': item.disabled,
          }" hover-class="zx-actionsheet-hover" :hover-stay-time="150" :data-index="index" :style="{
            color: item.disabled ? disabledColor : item.color || '#2B2B2B',
            fontSize: item.fontSize || itemFontSize + 'rpx',
          }" @tap.stop="handleClickItem">
            <view class="zx-actionsheet-btn-content">
              <zx-icon v-if="item.icon" :name="item.icon" class="zx-actionsheet-icon"></zx-icon>
              <text class="zx-actionsheet-text">{{ item.text }}</text>
              <text v-if="item.badge" class="zx-actionsheet-badge">{{ item.badge }}</text>
            </view>
          </view>
        </block>
      </view>
      <view v-if="isCancel" class="zx-actionsheet-btn zx-actionsheet-cancel" hover-class="zx-actionsheet-hover"
        :hover-stay-time="150" @tap="handleClickCancel">
        <slot name="cancel-button">{{ cancelText }}</slot>
      </view>
      <!-- 安全区域适配 -->
      <view v-if="safeAreaInsetBottom" class="zx-actionsheet-safe-area"></view>
    </view>
    <view class="zx-actionsheet-mask" :class="{ 'zx-mask-show': isShow }" :style="{ backgroundColor: maskColor }"
      @tap="handleClickMask"></view>
  </view>
</template>

<script setup>
/**
 * zx-action-sheet 动作面板
 * @description 底部弹出的动作菜单面板，支持自定义样式、图标和主题
 * @property {Boolean} show - 显示操作菜单
 * @property {Boolean} maskClosable - 点击遮罩是否可关闭
 * @property {Array} items - 菜单按钮数组
 * @property {String} tips - 提示文字
 * @property {String} color - 提示文字颜色
 * @property {Number} size - 提示文字大小
 * @property {Boolean} radius - 是否需要圆角
 * @property {Boolean} isCancel - 是否需要取消按钮
 * @property {String} cancelText - 取消按钮文字
 * @property {String} theme - 主题样式，可选：light、dark
 * @property {Boolean} safeAreaInsetBottom - 是否适配底部安全区域
 * @property {String} maskColor - 遮罩颜色
 * @property {Object} customStyle - 自定义样式
 * @property {Number} itemFontSize - 菜单项字体大小
 * @property {String} disabledColor - 禁用状态的文字颜色
 * @property {Boolean} closeOnItemClick - 点击菜单项后是否自动关闭
 * @property {Number} zIndex - 组件z-index层级
 * @property {String} duration - 动画持续时间
 * @event {Function} change - 点击菜单项时触发
 * @event {Function} cancel - 点击取消按钮时触发
 * @event {Function} open - 面板打开时触发
 * @event {Function} close - 面板关闭时触发
 */
import { ref, getCurrentInstance, onMounted, watch, computed } from "vue";

const { proxy } = getCurrentInstance();
const emit = defineEmits(["change", "cancel", "open", "close", "update:show"]);

const props = defineProps({
  // 显示操作菜单
  show: {
    type: Boolean,
    default: false,
  },
  // 点击遮罩 是否可关闭
  maskClosable: {
    type: Boolean,
    default: true,
  },
  // 菜单按钮数组
  items: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // 提示文字
  tips: {
    type: String,
    default: "",
  },
  // 提示文字颜色
  color: {
    type: String,
    default: "#808080",
  },
  // 提示文字大小 rpx
  size: {
    type: Number,
    default: 26,
  },
  // 是否需要圆角
  radius: {
    type: Boolean,
    default: true,
  },
  // 是否需要取消按钮
  isCancel: {
    type: Boolean,
    default: true,
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: "取消",
  },
  // 主题样式
  theme: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  // 是否适配底部安全区域
  safeAreaInsetBottom: {
    type: Boolean,
    default: true,
  },
  // 遮罩颜色
  maskColor: {
    type: String,
    default: "rgba(0, 0, 0, 0.6)",
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
  // 菜单项字体大小
  itemFontSize: {
    type: Number,
    default: 34,
  },
  // 禁用状态的文字颜色
  disabledColor: {
    type: String,
    default: "#c8c9cc",
  },
  // 点击菜单项后是否自动关闭
  closeOnItemClick: {
    type: Boolean,
    default: true,
  },
  // 组件z-index层级
  zIndex: {
    type: Number,
    default: 9999,
  },
  // 动画持续时间，单位ms
  duration: {
    type: Number,
    default: 250,
  }
});

const isShow = ref(false);

// 监听show属性变化
watch(
  () => props.show,
  (val) => {
    isShow.value = val;
    if (val) {
      emit("open");
    } else {
      // 添加延迟，等待动画完成后再触发close事件
      setTimeout(() => {
        emit("close");
      }, props.duration);
    }
  },
  { immediate: true }
);

// 监听isShow变化，同步更新show属性
watch(
  () => isShow.value,
  (val) => {
    if (val !== props.show) {
      emit("update:show", val);
    }
  }
);

// 计算样式
const computedStyles = computed(() => {
  return {
    "--action-sheet-duration": `${props.duration}ms`,
    "--action-sheet-z-index": props.zIndex,
  };
});

// 点击蒙版
const handleClickMask = () => {
  if (!props.maskClosable) {
    return;
  }
  handleClickCancel();
};

// 点击菜单项
const handleClickItem = (e) => {
  const index = Number(e.currentTarget.dataset.index);
  const item = props.items[index];

  // 禁用状态不响应点击
  if (item && item.disabled) {
    return;
  }

  emit("change", {
    index: index,
    ...item,
  });

  // 点击后自动关闭
  if (props.closeOnItemClick) {
    isShow.value = false;
  }
};

// 取消
const handleClickCancel = () => {
  isShow.value = false;
  emit("cancel");
};

// 打开面板
const open = () => {
  isShow.value = true;
};

// 关闭面板
const close = () => {
  isShow.value = false;
};

// 暴露方法
defineExpose({
  open,
  close,
});
</script>

<style scoped>
.zx-actionsheet-wrapper {
  --action-sheet-duration: 250ms;
  --action-sheet-z-index: 9999;
}

.zx-actionsheet {
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--action-sheet-z-index);
  visibility: hidden;
  transform: translate3d(0, 100%, 0);
  transform-origin: center;
  transition: all var(--action-sheet-duration) ease-in-out;
  background-color: #f7f7f7;
  min-height: 100rpx;
}

.zx-actionsheet-radius {
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  overflow: hidden;
}

.zx-actionsheet-show {
  transform: translate3d(0, 0, 0);
  visibility: visible;
}

.zx-actionsheet-tips {
  width: 100%;
  padding: 40rpx 60rpx;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-operate-box {
  padding-bottom: 12rpx;
}

.zx-actionsheet-btn {
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 34rpx;
  position: relative;
}

.zx-actionsheet-btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-actionsheet-icon {
  margin-right: 10rpx;
}

.zx-actionsheet-badge {
  font-size: 24rpx;
  background-color: #ff5722;
  color: #fff;
  border-radius: 20rpx;
  padding: 0 10rpx;
  margin-left: 10rpx;
  min-width: 28rpx;
  height: 28rpx;
  line-height: 28rpx;
  text-align: center;
}

.zx-btn-last {
  padding-bottom: env(safe-area-inset-bottom);
}

.zx-btn-disabled {
  opacity: 0.6;
}

.zx-actionsheet-divider::before {
  content: "";
  width: 100%;
  border-top: 1rpx solid #e7e7e7;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.zx-actionsheet-cancel {
  color: #1a1a1a;
  margin-top: 12rpx;
}

.zx-actionsheet-hover {
  background-color: #f7f7f9;
}

.zx-actionsheet-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: calc(var(--action-sheet-z-index) - 3);
  transition: all var(--action-sheet-duration) ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.zx-mask-show {
  opacity: 1;
  visibility: visible;
}

.zx-actionsheet-safe-area {
  height: constant(safe-area-inset-bottom);
  height: env(safe-area-inset-bottom);
  width: 100%;
  background-color: #fff;
}

/* 主题样式 - 暗色 */
.zx-actionsheet-theme-dark {
  background-color: #1c1c1e;
}

.zx-actionsheet-theme-dark .zx-actionsheet-btn,
.zx-actionsheet-theme-dark .zx-actionsheet-tips,
.zx-actionsheet-theme-dark .zx-actionsheet-safe-area {
  background-color: #2c2c2e;
  color: #fff;
}

.zx-actionsheet-theme-dark .zx-actionsheet-tips {
  color: #a2a2a2;
}

.zx-actionsheet-theme-dark .zx-actionsheet-cancel {
  color: #fff;
}

.zx-actionsheet-theme-dark .zx-actionsheet-divider::before {
  border-top-color: #3a3a3c;
}

.zx-actionsheet-theme-dark .zx-actionsheet-hover {
  background-color: #3a3a3c;
}

/* 动画优化 */
@keyframes zx-actionsheet-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes zx-actionsheet-slide-up {
  from {
    transform: translate3d(0, 100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

/* 提高 H5 性能 */
/* #ifdef H5 */
.zx-actionsheet,
.zx-actionsheet-mask {
  will-change: transform, opacity;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* #endif */
</style>
