<template>
  <view class="zx-check-tag" :class="[
    `zx-check-tag--${normalizedType}`,
    `zx-check-tag--${normalizedSize}`,
    checked && `zx-check-tag--checked`,
    disabled && `zx-check-tag--disabled`,
  ]" @tap.stop="handleClick" :style="[customStyle]">
    <slot>
      <text class="zx-check-tag__text" :class="[
        `zx-check-tag__text--${normalizedType}`,
        `zx-check-tag__text--${normalizedSize}`,
        checked && `zx-check-tag__text--checked`,
      ]">
        {{ text }}
      </text>
    </slot>
  </view>
</template>

<script setup>
/**
 * CheckTag 可选中标签
 * @description 可选中的标签组件，类似复选框但是按钮式的样式
 * @property {Boolean}			checked / v-model:checked	是否选中（默认 false ）
 * @property {Boolean}			disabled					是否禁用（默认 false ）
 * @property {String}			type						CheckTag 类型：primary、success、info、warning、danger （默认 'primary' ）
 * @property {String}			size						标签的大小：large、default、small （默认 'default' ）
 * @property {String | Number}	text						标签的文字内容
 * @property {String}			bgColor						背景颜色，默认为空字符串，即不处理
 * @property {String}			color						标签字体颜色，默认为空字符串，即不处理
 * @property {String}			borderColor					边框颜色
 * @event {Function(checked)} change 点击 Check Tag 时触发的事件
 * @example <zx-check-tag v-model:checked="checked" text="可选标签" type="primary"></zx-check-tag>
 */
import { computed, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  // 是否选中
  checked: {
    type: Boolean,
    default: false,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
  // CheckTag 类型
  type: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "success", "info", "warning", "danger"].includes(value),
  },
  // 标签的大小
  size: {
    type: String,
    default: "default",
    validator: (value) => ["large", "default", "small", "medium", "mini"].includes(value),
  },
  // 标签文字
  text: {
    type: [String, Number],
    default: "",
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: "",
  },
  // 标签字体颜色
  color: {
    type: String,
    default: "",
  },
  // 边框颜色
  borderColor: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["change", "update:checked"]);

// 规范化类型
const normalizedType = computed(() => {
  return props.type;
});

// 规范化尺寸（支持旧版本尺寸）
const normalizedSize = computed(() => {
  const sizeMap = {
    mini: "small",
    medium: "default",
    default: "default",
    small: "small",
    large: "large",
  };
  return sizeMap[props.size] || "default";
});

// 自定义样式
const customStyle = computed(() => {
  const style = {};
  if (props.bgColor) {
    style.backgroundColor = props.bgColor;
  }
  if (props.color) {
    style.color = props.color;
  }
  if (props.borderColor) {
    style.borderColor = props.borderColor;
  }
  return style;
});

// 点击处理
const handleClick = () => {
  if (props.disabled) return;
  const newChecked = !props.checked;
  emit("update:checked", newChecked);
  emit("change", newChecked);
};
</script>

<style lang="scss" scoped>
// 颜色变量定义
$zx-primary: #2979ff !default;
$zx-success: #07c160 !default;
$zx-info: #909399 !default;
$zx-warning: #ff9900 !default;
$zx-error: #fa3534 !default;

.zx-check-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  // 尺寸样式
  &--small {
    height: 24px;
    line-height: 22px;
    padding: 0 7px;
  }

  &--default {
    height: 28px;
    line-height: 26px;
    padding: 0 10px;
  }

  &--large {
    height: 32px;
    line-height: 30px;
    padding: 0 12px;
  }

  // Primary 主色
  &--primary {
    background-color: transparent;
    border-color: #dcdfe6;
    color: #606266;

    &.zx-check-tag--checked {
      background-color: $zx-primary;
      border-color: $zx-primary;
      color: #ffffff;
    }
  }

  // Success 成功
  &--success {
    background-color: transparent;
    border-color: #dcdfe6;
    color: #606266;

    &.zx-check-tag--checked {
      background-color: $zx-success;
      border-color: $zx-success;
      color: #ffffff;
    }
  }

  // Info 信息
  &--info {
    background-color: transparent;
    border-color: #dcdfe6;
    color: #606266;

    &.zx-check-tag--checked {
      background-color: $zx-info;
      border-color: $zx-info;
      color: #ffffff;
    }
  }

  // Warning 警告
  &--warning {
    background-color: transparent;
    border-color: #dcdfe6;
    color: #606266;

    &.zx-check-tag--checked {
      background-color: $zx-warning;
      border-color: $zx-warning;
      color: #ffffff;
    }
  }

  // Danger 危险
  &--danger {
    background-color: transparent;
    border-color: #dcdfe6;
    color: #606266;

    &.zx-check-tag--checked {
      background-color: $zx-error;
      border-color: $zx-error;
      color: #ffffff;
    }
  }

  &__text {
    &--small {
      font-size: 12px;
      line-height: 12px;
    }

    &--default {
      font-size: 13px;
      line-height: 13px;
    }

    &--large {
      font-size: 14px;
      line-height: 14px;
    }
  }
}
</style>
