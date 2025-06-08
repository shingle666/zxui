<template>
  <view class="zx-popconfirm" :style="{ width: (width ? width + 'px' : '150px') }">
    <view ref="referenceRef" class="zx-popconfirm__reference" @click="togglePopover">
      <slot name="reference"></slot>
    </view>

    <view v-if="visible" class="zx-popconfirm__popper" :class="[`zx-popconfirm__popper--${placement}`]">
      <view class="zx-popconfirm__arrow" :class="[`zx-popconfirm__arrow--${placement}`]"></view>
      <view class="zx-popconfirm__content">
        <view class="zx-popconfirm__title">
          <view v-if="!hideIcon" class="zx-popconfirm__icon" :style="{ color: iconColor }">
            <text class="uni-icons" :class="iconClass">{{ iconUnicode }}</text>
          </view>
          <text>{{ title }}</text>
        </view>

        <view class="zx-popconfirm__action">
          <slot name="actions" :confirm="confirmHandler" :cancel="cancelHandler">
            <zx-button type="danger" @click="cancelHandler">
              {{ cancelButtonText || '取消' }}
            </zx-button>
            <zx-button type="primary" @click="confirmHandler">
              {{ confirmButtonText || '确认' }}
            </zx-button>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  confirmButtonText: {
    type: String,
    default: '确认'
  },
  cancelButtonText: {
    type: String,
    default: '取消'
  },
  confirmButtonType: {
    type: String,
    default: 'primary'
  },
  cancelButtonType: {
    type: String,
    default: 'default'
  },
  icon: {
    type: String,
    default: 'help-filled'
  },
  iconColor: {
    type: String,
    default: '#f90'
  },
  hideIcon: {
    type: Boolean,
    default: false
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  width: {
    type: [String, Number],
    default: 150
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => {
      return [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ].includes(value);
    }
  }
});

// 定义事件
const emit = defineEmits(['confirm', 'cancel']);

// 内部状态
const visible = ref(false);
const referenceRef = ref(null);
let hideTimer = null;

// 计算属性
const iconClass = computed(() => {
  return `uni-${props.icon}`;
});

const iconUnicode = computed(() => {
  // 映射图标名称到 Unicode
  const iconMap = {
    'help-filled': '\ue67c',
    'question-filled': '\ue67c',
    'info-filled': '\ue649',
    'warning-filled': '\ue64f',
    'error-filled': '\ue64d'
  };

  return iconMap[props.icon] || '\ue67c'; // 默认使用问号图标
});

// 方法
const togglePopover = () => {
  visible.value = !visible.value;
};

const confirmHandler = () => {
  emit('confirm');
  close();
};

const cancelHandler = () => {
  emit('cancel');
  close();
};

const close = () => {
  if (hideTimer) clearTimeout(hideTimer);

  hideTimer = setTimeout(() => {
    visible.value = false;
  }, props.hideAfter);
};

// 处理点击外部关闭
const handleClickOutside = (event) => {
  // 在UniApp中使用getSelectorQuery方法检测点击位置
  if (visible.value) {
    // 使用延时确保视图已更新
    setTimeout(() => {
      const query = uni.createSelectorQuery();

      // 分别获取参考元素和弹出框的位置信息
      query.select('.zx-popconfirm__reference').boundingClientRect(refData => {
        query.select('.zx-popconfirm__popper').boundingClientRect(popperData => {
          if (refData && popperData) {
            // 根据不同平台获取点击坐标
            let x, y;

            // H5环境
            if (event.clientX !== undefined && event.clientY !== undefined) {
              x = event.clientX;
              y = event.clientY;
            }
            // 小程序环境 - changedTouches
            else if (event.changedTouches && event.changedTouches[0]) {
              x = event.changedTouches[0].clientX || event.changedTouches[0].x;
              y = event.changedTouches[0].clientY || event.changedTouches[0].y;
            }
            // 小程序环境 - touches
            else if (event.touches && event.touches[0]) {
              x = event.touches[0].clientX || event.touches[0].x;
              y = event.touches[0].clientY || event.touches[0].y;
            }
            // 无法获取坐标的情况，不处理
            else {
              return;
            }

            // 检查点击是否在参考元素和弹出框外部
            const isClickInRef = x >= refData.left && x <= refData.right &&
              y >= refData.top && y <= refData.bottom;

            const isClickInPopper = x >= popperData.left && x <= popperData.right &&
              y >= popperData.top && y <= popperData.bottom;

            // 如果点击既不在参考元素内也不在弹出框内，则关闭弹出框
            if (!isClickInRef && !isClickInPopper) {
              close();
            }
          }
        });
      }).exec();
    }, 50);
  }
};

// 生命周期钩子
onMounted(() => {
  // 根据平台选择合适的事件监听方式
  // #ifdef H5
  document.addEventListener('click', handleClickOutside);
  // #endif

  // #ifdef MP
  // 小程序环境统一使用uni.$on，因为Vue3中页面实例不再支持$on方法
  uni.$on('touchstart', handleClickOutside);
  // #endif

  // #ifndef H5 || MP
  // 其他平台的兜底方案
  uni.$on('touchstart', handleClickOutside);
  // #endif
});

onBeforeUnmount(() => {
  // 根据平台选择合适的事件移除方式
  // #ifdef H5
  document.removeEventListener('click', handleClickOutside);
  // #endif

  // #ifdef MP
  // 小程序环境统一使用uni.$off
  uni.$off('touchstart', handleClickOutside);
  // #endif

  // #ifndef H5 || MP
  // 其他平台的兜底方案
  uni.$off('touchstart', handleClickOutside);
  // #endif

  if (hideTimer) clearTimeout(hideTimer);
});

// 监听属性变化
watch(
  () => props.hideAfter,
  (val) => {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }
);
</script>

<style>
.zx-popconfirm {
  position: relative;
  display: inline-block;
}

.zx-popconfirm__reference {
  display: inline-flex;
}

.zx-popconfirm__popper {
  position: absolute;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 2000;
  padding: 12px;
  min-width: 150px;
}

/* 放置位置样式 */
.zx-popconfirm__popper--top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
}

.zx-popconfirm__popper--top-start {
  bottom: 100%;
  left: 0;
  transform: translateY(-10px);
}

.zx-popconfirm__popper--top-end {
  bottom: 100%;
  right: 0;
  transform: translateY(-10px);
}

.zx-popconfirm__popper--bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
}

.zx-popconfirm__popper--bottom-start {
  top: 100%;
  left: 0;
  transform: translateY(10px);
}

.zx-popconfirm__popper--bottom-end {
  top: 100%;
  right: 0;
  transform: translateY(10px);
}

.zx-popconfirm__popper--left {
  right: 100%;
  top: 50%;
  transform: translateX(-10px) translateY(-50%);
}

.zx-popconfirm__popper--left-start {
  right: 100%;
  top: 0;
  transform: translateX(-10px);
}

.zx-popconfirm__popper--left-end {
  right: 100%;
  bottom: 0;
  transform: translateX(-10px);
}

.zx-popconfirm__popper--right {
  left: 100%;
  top: 50%;
  transform: translateX(10px) translateY(-50%);
}

.zx-popconfirm__popper--right-start {
  left: 100%;
  top: 0;
  transform: translateX(10px);
}

.zx-popconfirm__popper--right-end {
  left: 100%;
  bottom: 0;
  transform: translateX(10px);
}

/* 箭头样式 */
.zx-popconfirm__arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 6px solid transparent;
}

.zx-popconfirm__arrow--top,
.zx-popconfirm__arrow--top-start,
.zx-popconfirm__arrow--top-end {
  bottom: -12px;
  border-top-color: #fff;
}

.zx-popconfirm__arrow--top {
  left: 50%;
  transform: translateX(-50%);
}

.zx-popconfirm__arrow--top-start {
  left: 16px;
}

.zx-popconfirm__arrow--top-end {
  right: 16px;
}

.zx-popconfirm__arrow--bottom,
.zx-popconfirm__arrow--bottom-start,
.zx-popconfirm__arrow--bottom-end {
  top: -12px;
  border-bottom-color: #fff;
}

.zx-popconfirm__arrow--bottom {
  left: 50%;
  transform: translateX(-50%);
}

.zx-popconfirm__arrow--bottom-start {
  left: 16px;
}

.zx-popconfirm__arrow--bottom-end {
  right: 16px;
}

.zx-popconfirm__arrow--left,
.zx-popconfirm__arrow--left-start,
.zx-popconfirm__arrow--left-end {
  right: -12px;
  border-left-color: #fff;
}

.zx-popconfirm__arrow--left {
  top: 50%;
  transform: translateY(-50%);
}

.zx-popconfirm__arrow--left-start {
  top: 16px;
}

.zx-popconfirm__arrow--left-end {
  bottom: 16px;
}

.zx-popconfirm__arrow--right,
.zx-popconfirm__arrow--right-start,
.zx-popconfirm__arrow--right-end {
  left: -12px;
  border-right-color: #fff;
}

.zx-popconfirm__arrow--right {
  top: 50%;
  transform: translateY(-50%);
}

.zx-popconfirm__arrow--right-start {
  top: 16px;
}

.zx-popconfirm__arrow--right-end {
  bottom: 16px;
}

/* 内容样式 */
.zx-popconfirm__content {
  font-size: 14px;
}

.zx-popconfirm__title {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 500;
}

.zx-popconfirm__icon {
  margin-right: 8px;
  font-size: 16px;
}

.zx-popconfirm__action {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

/* 按钮样式 */
.zx-popconfirm__button {
  height: 32px;
  padding: 0 12px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  margin-left: 8px;
}

.zx-popconfirm__button--default {
  color: #606266;
}

.zx-popconfirm__button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.zx-popconfirm__button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.zx-popconfirm__button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.zx-popconfirm__button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.zx-popconfirm__button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}

.zx-popconfirm__button--text {
  border-color: transparent;
  color: #409eff;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}
</style>
