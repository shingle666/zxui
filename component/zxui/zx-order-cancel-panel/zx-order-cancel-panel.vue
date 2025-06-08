<template>
  <view class="zx-order-cancel-panel">
    <!-- 遮罩层 -->
    <view v-if="modelValue" class="zx-order-cancel-panel__overlay" :style="{ zIndex: zIndex - 1 }"
      @click="handleOverlayClick"></view>

    <!-- 面板内容 -->
    <view v-if="modelValue" class="zx-order-cancel-panel__content" :class="{
      'zx-order-cancel-panel__content--show': showPanel
    }" :style="{ zIndex: zIndex }">
      <!-- 头部 -->
      <view class="zx-order-cancel-panel__header">
        <view class="zx-order-cancel-panel__title">{{ title }}</view>
        <view class="zx-order-cancel-panel__close" @click="handleClose">
          <zx-icon name="close" size="32rpx" color="#999"></zx-icon>
        </view>
      </view>

      <!-- 取消原因列表 -->
      <view class="zx-order-cancel-panel__body">
        <view class="zx-order-cancel-panel__subtitle">{{ subtitle }}</view>

        <view class="zx-order-cancel-panel__reasons">
          <view v-for="(reason, index) in reasonList" :key="index" class="zx-order-cancel-panel__reason-item" :class="{
            'zx-order-cancel-panel__reason-item--active': selectedIndex === index
          }" @click="handleReasonSelect(index)">
            <view class="zx-order-cancel-panel__reason-text">{{ reason.text }}</view>
            <view class="zx-order-cancel-panel__reason-icon">
              <zx-icon :name="selectedIndex === index ? 'radio-checked' : 'radio-unchecked'" size="32rpx"
                :color="selectedIndex === index ? primaryColor : '#ddd'"></zx-icon>
            </view>
          </view>
        </view>

        <!-- 其他原因输入框 -->
        <view v-if="showOtherInput" class="zx-order-cancel-panel__other-input">
          <zx-textarea v-model="otherReason" :placeholder="otherPlaceholder" :maxlength="maxLength"
            :show-count="showCount" :rows="3" @input="handleOtherInput"></zx-textarea>
        </view>
      </view>

      <!-- 底部按钮 -->
      <view class="zx-order-cancel-panel__footer">
        <zx-button class="zx-order-cancel-panel__cancel-btn" @click="handleCancel">
          {{ cancelText }}
        </zx-button>
        <zx-button class="zx-order-cancel-panel__confirm-btn" type="primary" :disabled="!canConfirm" :loading="loading"
          @click="handleConfirm">
          {{ confirmText }}
        </zx-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref, computed, watch, nextTick } from "vue";
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxTextarea from '@tanzhenxing/zx-textarea/zx-textarea.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'


const { proxy } = getCurrentInstance();

// 设置组件名称
proxy.$options = proxy.$options || {};
proxy.$options.name = 'zx-order-cancel-panel';

const emit = defineEmits([
  'update:modelValue',
  'confirm',
  'cancel',
  'close',
  'reason-change'
]);

const props = defineProps({
  // 是否显示面板
  modelValue: {
    type: Boolean,
    default: false
  },
  // 面板标题
  title: {
    type: String,
    default: '取消订单'
  },
  // 副标题
  subtitle: {
    type: String,
    default: '请选择取消原因'
  },
  // 取消原因列表
  reasonList: {
    type: Array,
    default: () => [
      { text: '我不想要了', value: 'dont_want' },
      { text: '信息填写错误，重新拍', value: 'info_error' },
      { text: '卖家缺货', value: 'out_of_stock' },
      { text: '同城买到更便宜的', value: 'cheaper_local' },
      { text: '其他原因', value: 'other' }
    ]
  },
  // 其他原因占位符
  otherPlaceholder: {
    type: String,
    default: '请输入其他取消原因...'
  },
  // 其他原因最大长度
  maxLength: {
    type: Number,
    default: 200
  },
  // 是否显示字数统计
  showCount: {
    type: Boolean,
    default: true
  },
  // 取消按钮文字
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文字
  confirmText: {
    type: String,
    default: '确认取消'
  },
  // 是否显示加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 点击遮罩是否关闭
  closeOnClickOverlay: {
    type: Boolean,
    default: true
  },
  // 层级
  zIndex: {
    type: Number,
    default: 1000
  },
  // 主题色
  primaryColor: {
    type: String,
    default: '#007aff'
  }
});

// 响应式数据
const selectedIndex = ref(-1);
const otherReason = ref('');
const showPanel = ref(false);

// 计算属性
const showOtherInput = computed(() => {
  const selectedReason = props.reasonList[selectedIndex.value];
  return selectedReason && selectedReason.value === 'other';
});

const canConfirm = computed(() => {
  if (selectedIndex.value === -1) return false;

  const selectedReason = props.reasonList[selectedIndex.value];
  if (selectedReason && selectedReason.value === 'other') {
    return otherReason.value.trim().length > 0;
  }

  return true;
});

// 监听显示状态
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    nextTick(() => {
      showPanel.value = true;
    });
  } else {
    showPanel.value = false;
    // 重置状态
    setTimeout(() => {
      selectedIndex.value = -1;
      otherReason.value = '';
    }, 300);
  }
});

// 方法
const handleReasonSelect = (index) => {
  selectedIndex.value = index;
  const reason = props.reasonList[index];

  emit('reason-change', {
    index,
    reason,
    otherReason: reason.value === 'other' ? otherReason.value : ''
  });
};

const handleOtherInput = (value) => {
  otherReason.value = value;

  if (selectedIndex.value !== -1) {
    const reason = props.reasonList[selectedIndex.value];
    emit('reason-change', {
      index: selectedIndex.value,
      reason,
      otherReason: value
    });
  }
};

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    handleClose();
  }
};

const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};

const handleCancel = () => {
  emit('update:modelValue', false);
  emit('cancel');
};

const handleConfirm = () => {
  if (!canConfirm.value) return;

  const selectedReason = props.reasonList[selectedIndex.value];
  const result = {
    index: selectedIndex.value,
    reason: selectedReason,
    otherReason: selectedReason.value === 'other' ? otherReason.value : ''
  };

  emit('confirm', result);
};
</script>

<style lang="scss" scoped>
.zx-order-cancel-panel {
  position: relative;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  &__content {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    border-radius: 24rpx 24rpx 0 0;
    max-height: 80vh;
    transform: translateY(100%);
    transition: transform 0.3s ease;

    &--show {
      transform: translateY(0);
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx 32rpx 0;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 24rpx;
  }

  &__title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }

  &__close {
    padding: 8rpx;
    cursor: pointer;
  }

  &__body {
    padding: 32rpx;
    max-height: 60vh;
    overflow-y: auto;
  }

  &__subtitle {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 32rpx;
  }

  &__reasons {
    margin-bottom: 32rpx;
  }

  &__reason-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24rpx 0;
    border-bottom: 1px solid #f5f5f5;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: #f8f8f8;
    }

    &--active {
      .zx-order-cancel-panel__reason-text {
        color: var(--primary-color, #007aff);
      }
    }
  }

  &__reason-text {
    font-size: 28rpx;
    color: #333;
    flex: 1;
    transition: color 0.2s ease;
  }

  &__reason-icon {
    margin-left: 16rpx;
  }

  &__other-input {
    margin-top: 24rpx;
  }

  &__footer {
    display: flex;
    gap: 24rpx;
    padding: 24rpx 32rpx;
    padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
    border-top: 1px solid #f5f5f5;
    background-color: #fff;
  }

  &__cancel-btn {
    flex: 1;
    height: 88rpx;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #666;
  }

  &__confirm-btn {
    flex: 1;
    height: 88rpx;
  }
}

/* 适配暗黑模式 */
@media (prefers-color-scheme: dark) {
  .zx-order-cancel-panel {
    &__content {
      background-color: #1c1c1e;
    }

    &__title {
      color: #fff;
    }

    &__subtitle {
      color: #999;
    }

    &__reason-text {
      color: #fff;
    }

    &__reason-item {
      border-bottom-color: #2c2c2e;

      &:active {
        background-color: #2c2c2e;
      }
    }

    &__header {
      border-bottom-color: #2c2c2e;
    }

    &__footer {
      background-color: #1c1c1e;
      border-top-color: #2c2c2e;
    }

    &__cancel-btn {
      background-color: #2c2c2e;
      border-color: #444;
      color: #999;
    }
  }
}
</style>