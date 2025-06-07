<template>
  <view
    v-if="modelValue"
    class="zx-dialog-container"
    :class="{ 'zx-dialog-center': center || alignCenter }"
    :style="containerStyle"
    @click.stop="handleWrapperClick"
  >
    <view
      ref="dialogRef"
      class="zx-dialog"
      :class="[
        customClass,
        { 'is-fullscreen': fullscreen },
        { 'zx-dialog-center': center || alignCenter },
        headerClass,
        bodyClass,
        footerClass
      ]"
      :style="[dialogStyle, dragState.isDragging ? { 
        transform: `translate(${dragState.currentX}px, ${dragState.currentY}px)`,
        '-webkit-transform': `translate(${dragState.currentX}px, ${dragState.currentY}px)` 
      } : {}]"
      @click.stop
    >
      <!-- 可拖拽处理 -->
      <view 
        v-if="draggable" 
        class="zx-dialog-header-draggable"
        @touchstart="handleDragStart"
        @touchmove="handleDragMove"
        @touchend="handleDragEnd"
      ></view>

      <!-- 对话框头部 -->
      <slot name="header">
        <view class="zx-dialog-header" :class="headerClass">
          <text
            v-if="title"
            class="zx-dialog-title"
            :id="titleId"
          >{{ title }}</text>
          <view
            v-if="showClose"
            class="zx-dialog-close"
            @click="handleClose"
          >
            <text class="zx-dialog-close-icon">×</text>
          </view>
        </view>
      </slot>

      <!-- 对话框内容 -->
      <view class="zx-dialog-body" :class="bodyClass">
        <slot></slot>
      </view>

      <!-- 对话框底部 -->
      <slot name="footer">
        <view v-if="$slots.footer" class="zx-dialog-footer" :class="footerClass">
          <slot name="footer"></slot>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick, useSlots } from 'vue';

// 定义属性
const props = defineProps({
  // 是否显示对话框
  modelValue: {
    type: Boolean,
    default: false
  },
  // 对话框标题
  title: {
    type: String,
    default: ''
  },
  // 对话框宽度
  width: {
    type: [String, Number],
    default: '85%'
  },
  // 是否为全屏对话框
  fullscreen: {
    type: Boolean,
    default: false
  },
  // 对话框距离顶部的高度
  top: {
    type: String,
    default: '15vh'
  },
  // 是否需要遮罩层
  modal: {
    type: Boolean,
    default: true
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: {
    type: Boolean,
    default: true
  },
  // 打开延时
  openDelay: {
    type: Number,
    default: 0
  },
  // 关闭延时
  closeDelay: {
    type: Number,
    default: 0
  },
  // 是否可通过点击 modal 关闭 Dialog
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  // 是否可通过按下 ESC 关闭 Dialog
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  // 是否显示关闭按钮
  showClose: {
    type: Boolean,
    default: true
  },
  // 关闭前的回调
  beforeClose: {
    type: Function
  },
  // 是否可拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  // 是否允许拖拽范围超出可视区
  overflow: {
    type: Boolean,
    default: false
  },
  // 是否居中
  center: {
    type: Boolean,
    default: false
  },
  // 是否水平垂直对齐
  alignCenter: {
    type: Boolean,
    default: false
  },
  // 关闭时是否销毁元素
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  // z-index
  zIndex: {
    type: Number
  },
  // header 的 aria-level 属性
  headerAriaLevel: {
    type: String,
    default: '2'
  },
  // header 部分的自定义 class 名
  headerClass: {
    type: String,
    default: ''
  },
  // body 部分的自定义 class 名
  bodyClass: {
    type: String,
    default: ''
  },
  // footer 部分的自定义 class 名
  footerClass: {
    type: String,
    default: ''
  }
});

// 定义事件
const emit = defineEmits([
  'update:modelValue', 
  'open', 
  'opened', 
  'close', 
  'closed', 
  'openAutoFocus', 
  'closeAutoFocus'
]);

// 获取插槽
const slots = useSlots();

// 生成唯一ID
const titleId = computed(() => `zx-dialog-${Math.floor(Math.random() * 10000)}`);

// 对话框样式
const dialogStyle = computed(() => {
  let style = {};
  
  if (!props.fullscreen) {
    if (props.width) {
      style.width = typeof props.width === 'number' ? `${props.width}rpx` : props.width;
    }
    if (props.top) {
      style.marginTop = props.top;
    }
  }
  
  if (props.zIndex) {
    style.zIndex = props.zIndex;
  }
  
  return style;
});

// 容器样式
const containerStyle = computed(() => {
  let style = {};
  
  if (props.zIndex) {
    style.zIndex = props.zIndex;
  }
  
  return style;
});

// 环境检测
const isH5 = ref(false);
const checkEnvironment = () => {
  try {
    // 检测是否为H5环境
    isH5.value = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    // 输出诊断信息，便于调试
    if (process.env.NODE_ENV !== 'production') {
      console.info('[zx-dialog] 环境检测:', {
        isH5: isH5.value,
        hasWindow: typeof window !== 'undefined',
        hasDocument: typeof document !== 'undefined',
        hasUni: typeof uni !== 'undefined',
        platform: uni && uni.getDeviceInfo ? uni.getDeviceInfo().platform : 'unknown'
      });
    }
  } catch (e) {
    isH5.value = false;
    console.error('[zx-dialog] 环境检测失败:', e);
  }
};

// 初始化环境检测
checkEnvironment();

// 对话框引用
const dialogRef = ref(null);
// 拖拽相关状态
const dragState = ref({
  isDragging: false,
  startX: 0,
  startY: 0,
  startLeft: 0,
  startTop: 0,
  currentX: 0,
  currentY: 0
});

// 处理对话框关闭
const handleClose = () => {
  if (typeof props.beforeClose === 'function') {
    props.beforeClose(close);
  } else {
    close();
  }
};

// 关闭对话框
const close = () => {
  emit('update:modelValue', false);
  emit('close');
  
  // 延迟调用resetPosition，确保DOM更新完成
  setTimeout(() => {
    // 重置拖拽位置
    if (props.draggable) {
      resetPosition();
    }
    
    emit('closed');
    emit('closeAutoFocus');
  }, props.closeDelay || 50); // 确保有一个最小延迟
};

// 处理点击遮罩层
const handleWrapperClick = () => {
  if (props.closeOnClickModal) {
    handleClose();
  }
};

// 拖拽开始
const handleDragStart = (event) => {
  if (!props.draggable) return;
  
  // 确保 event 和 touches 存在
  if (!event || !event.touches || !event.touches[0]) return;
  
  const touch = event.touches[0];
  dragState.value.isDragging = true;
  dragState.value.startX = touch.clientX;
  dragState.value.startY = touch.clientY;
  
  // 从当前状态中获取拖拽起始位置，不再依赖DOM操作
  dragState.value.startLeft = dragState.value.currentX;
  dragState.value.startTop = dragState.value.currentY;
};

// 拖拽移动
const handleDragMove = (event) => {
  if (!props.draggable || !dragState.value.isDragging) return;
  
  // 确保 event 和 touches 存在
  if (!event || !event.touches || !event.touches[0]) return;
  
  const touch = event.touches[0];
  const moveX = touch.clientX - dragState.value.startX;
  const moveY = touch.clientY - dragState.value.startY;
  
  // 直接更新状态值，视图会自动更新
  dragState.value.currentX = dragState.value.startLeft + moveX;
  dragState.value.currentY = dragState.value.startTop + moveY;
  
  // 阻止默认行为，避免滑动冲突
  if (typeof event.preventDefault === 'function') {
    event.preventDefault();
  }
};

// 拖拽结束
const handleDragEnd = () => {
  if (!props.draggable) return;
  dragState.value.isDragging = false;
};

// 处理ESC按键关闭
const handleEscClose = (event) => {
  if (props.closeOnPressEscape && event && event.key === 'Escape') {
    handleClose();
  }
};

// 添加小程序键盘事件处理
const setupKeyboardListener = () => {
  // 仅在H5环境下且启用ESC关闭功能时添加键盘监听
  if (isH5.value && props.closeOnPressEscape) {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }
  
  // 其他环境不支持键盘事件
  return () => {};
};

// 清理函数
let cleanupKeyboardListener = () => {};

// 监听对话框显示状态
watch(() => props.modelValue, (val) => {
  if (val) {
    // 显示对话框
    emit('open');
    // 设置键盘监听
    cleanupKeyboardListener = setupKeyboardListener();
    setTimeout(() => {
      emit('opened');
      emit('openAutoFocus');
    }, props.openDelay);
  } else {
    // 关闭对话框
    emit('close');
    // 清理键盘监听
    cleanupKeyboardListener();
    setTimeout(() => {
      emit('closed');
      emit('closeAutoFocus');
    }, props.closeDelay);
  }
});

// 生命周期钩子
onMounted(() => {
  // 对话框初始显示时，设置键盘监听
  if (props.modelValue) {
    cleanupKeyboardListener = setupKeyboardListener();
  }
});

onUnmounted(() => {
  // 组件卸载时，清理键盘监听
  cleanupKeyboardListener();
});

// 重置对话框位置
const resetPosition = () => {
  // 直接重置状态，不再依赖DOM操作
  dragState.value.isDragging = false;
  dragState.value.currentX = 0;
  dragState.value.currentY = 0;
  dragState.value.startLeft = 0;
  dragState.value.startTop = 0;
};

// 暴露方法
defineExpose({
  resetPosition,
  handleClose: close
});
</script>

<style lang="scss">
.zx-dialog-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2000;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.zx-dialog-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.zx-dialog {
  position: relative;
  margin: 0 auto;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 5rpx 20rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 0.3s, opacity 0.3s;
  transform: translateY(0);
  opacity: 1;
  max-width: 650rpx;
  width: 85%;
  animation: dialogIn 0.25s ease;
  
  @keyframes dialogIn {
    0% {
      transform: translateY(30rpx);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  &.is-fullscreen {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
  
  &.zx-dialog-center {
    margin: 0;
  }
}

.zx-dialog-header-draggable {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80rpx;
  cursor: move;
  z-index: 10;
}

.zx-dialog-header {
  padding: 40rpx 30rpx 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none;
}

.zx-dialog-title {
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
  text-align: center;
}

.zx-dialog-close {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  width: 44rpx;
  height: 44rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .zx-dialog-close-icon {
    font-size: 36rpx;
    color: #909399;
    font-weight: 300;
  }
}

.zx-dialog-body {
  padding: 30rpx;
  color: #606266;
  font-size: 28rpx;
  word-break: break-all;
  text-align: center;
  min-height: 80rpx;
  box-sizing: border-box;
  
  /* 消息文本样式 */
  .zx-dialog-message {
    padding: 20rpx 0 30rpx;
    font-size: 30rpx;
    color: #333;
  }
}

.zx-dialog-footer {
  padding: 20rpx 30rpx 50rpx;
  display: flex;
  justify-content: center;
  gap: 40rpx;
  
  :deep(.zx-button) {
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 40rpx;
    border-radius: 8rpx;
    min-width: 160rpx;
    
    /* 取消按钮 */
    &:not([type="primary"]) {
      background-color: #f5f5f5;
      color: #666;
      border: none;
    }
    
    /* 确认按钮 */
    &[type="primary"] {
      background-color: #1989fa;
      color: #fff;
      border: none;
    }
  }
}
</style>
