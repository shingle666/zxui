<template>
  <zx-transition :show="visible" name="fade">
    <view
      :class="[
        'zx-alert',
        `zx-alert--${type}`,
        {
          'zx-alert--center': center,
          'zx-alert--with-description': !!description,
          'zx-alert--with-icon': showIcon,
          [`zx-alert--${effect}`]: effect,
        },
      ]"
      :style="alertStyle"
      role="alert"
    >
      <!-- 图标 -->
      <view v-if="showIcon" class="zx-alert__icon" :class="iconClass">
        <slot name="icon">
          <zx-icon :name="iconName" :size="iconSize" :color="iconColor" />
        </slot>
      </view>

      <!-- 内容区域 -->
      <view class="zx-alert__content">
        <!-- 标题 -->
        <view v-if="title || $slots.title" class="zx-alert__title" :class="titleClass">
          <slot name="title">{{ title }}</slot>
        </view>

        <!-- 描述 -->
        <view v-if="description || $slots.default" class="zx-alert__description">
          <slot>{{ description }}</slot>
        </view>
      </view>

      <!-- 关闭按钮 -->
      <view v-if="closable" class="zx-alert__close-btn" @click="handleClose">
        <template v-if="closeText">
          <text class="zx-alert__close-text">{{ closeText }}</text>
        </template>
        <template v-else>
          <zx-icon name="close" size="24" :color="closeIconColor" />
        </template>
      </view>
    </view>
  </zx-transition>
</template>

<script setup>
import { getCurrentInstance, ref, computed } from "vue";

const { proxy } = getCurrentInstance();

// 设置组件名称
proxy.$options = proxy.$options || {};
proxy.$options.name = "zx-alert";

const emit = defineEmits(["close"]);

const props = defineProps({
  // 标题
  title: {
    type: String,
    default: "",
  },
  // 类型: primary, success, warning, info, error
  type: {
    type: String,
    default: "info",
    validator: (value) =>
      ["primary", "success", "warning", "info", "error"].includes(value),
  },
  // 描述性文本
  description: {
    type: String,
    default: "",
  },
  // 是否可以关闭
  closable: {
    type: Boolean,
    default: true,
  },
  // 文字是否居中
  center: {
    type: Boolean,
    default: false,
  },
  // 自定义关闭按钮文本
  closeText: {
    type: String,
    default: "",
  },
  // 是否显示类型图标
  showIcon: {
    type: Boolean,
    default: false,
  },
  // 主题样式: light, dark
  effect: {
    type: String,
    default: "light",
    validator: (value) => ["light", "dark"].includes(value),
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({}),
  },
});

// 组件可见性
const visible = ref(true);

// 类型对应的图标
const typeIconMap = {
  primary: "checkmark-circle-fill",
  success: "checkmark-circle-fill",
  warning: "warning-fill",
  info: "information-circle-fill",
  error: "close-circle-fill",
};

// 计算属性
const iconName = computed(() => typeIconMap[props.type]);

const iconSize = computed(() => {
  return props.description ? "32" : "28";
});

const iconClass = computed(() => {
  return {
    "is-big": !!props.description,
  };
});

const titleClass = computed(() => {
  return {
    "is-bold": !!props.description,
  };
});

const iconColor = computed(() => {
  if (props.effect === "dark") {
    return "#fff";
  }

  const colorMap = {
    primary: "#409eff",
    success: "#67c23a",
    warning: "#e6a23c",
    info: "#909399",
    error: "#f56c6c",
  };

  return colorMap[props.type];
});

const closeIconColor = computed(() => {
  return props.effect === "dark" ? "#fff" : "#909399";
});

const alertStyle = computed(() => {
  return {
    ...props.customStyle,
  };
});

// 处理关闭
const handleClose = (event) => {
  visible.value = false;
  emit("close", event);
};

// 暴露方法
defineExpose({
  close: handleClose,
});
</script>

<style lang="scss" scoped>
.zx-alert {
  width: 100%;
  padding: 24rpx 32rpx;
  margin: 0;
  box-sizing: border-box;
  border-radius: 8rpx;
  position: relative;
  background-color: #fff;
  overflow: hidden;
  opacity: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: opacity 0.2s;

  &--primary {
    background-color: #ecf5ff;
    border-left: 6rpx solid #409eff;

    &.zx-alert--dark {
      background-color: #409eff;
      border-left: none;
    }
  }

  &--success {
    background-color: #f0f9eb;
    border-left: 6rpx solid #67c23a;

    &.zx-alert--dark {
      background-color: #67c23a;
      border-left: none;
    }
  }

  &--info {
    background-color: #f4f4f5;
    border-left: 6rpx solid #909399;

    &.zx-alert--dark {
      background-color: #909399;
      border-left: none;
    }
  }

  &--warning {
    background-color: #fdf6ec;
    border-left: 6rpx solid #e6a23c;

    &.zx-alert--dark {
      background-color: #e6a23c;
      border-left: none;
    }
  }

  &--error {
    background-color: #fef0f0;
    border-left: 6rpx solid #f56c6c;

    &.zx-alert--dark {
      background-color: #f56c6c;
      border-left: none;
    }
  }

  &--center {
    justify-content: center;
    text-align: center;
  }

  &--with-description {
    align-items: center;
    padding: 32rpx;

    .zx-alert__icon {
      margin-right: 20rpx;
      margin-top: 4rpx;

      &.is-big {
        font-size: 56rpx;
      }
    }
  }

  &--dark {
    color: #fff;

    .zx-alert__title,
    .zx-alert__description {
      color: #fff;
    }

    .zx-alert__close-text {
      color: #fff;
    }
  }

  &--with-icon {
    padding-left: 32rpx;
  }
}

.zx-alert__icon {
  font-size: 48rpx;
  width: 48rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-big {
    font-size: 56rpx;
    width: 56rpx;
  }
}

.zx-alert__content {
  flex: 1;
  min-width: 0;
}

.zx-alert__title {
  font-size: 28rpx;
  line-height: 36rpx;
  color: #303133;
  margin: 0;

  &.is-bold {
    font-weight: bold;
    margin-bottom: 18rpx;
  }
}

.zx-alert__description {
  font-size: 24rpx;
  line-height: 32rpx;
  color: #606266;
  margin: 10rpx 0 0 0;
}

.zx-alert__close-btn {
  position: absolute;
  top: 24rpx;
  right: 32rpx;
  cursor: pointer;
  flex-shrink: 0;

  .zx-alert--with-description & {
    top: 32rpx;
  }
}

.zx-alert__close-text {
  color: #c0c4cc;
  font-size: 24rpx;
  line-height: 1;

  .zx-alert--dark & {
    color: #fff;
  }
}
</style>
