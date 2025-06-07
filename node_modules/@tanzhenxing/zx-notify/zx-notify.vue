<template>
  <zx-transition mode="slide-down" :customStyle="containerStyle" :show="open">
    <view
      class="zx-notify"
      :class="[`zx-notify--${tmpConfig.type}`]"
      :style="[backgroundColor, addStyle(customStyle)]"
    >
      <zx-status-bar v-if="tmpConfig.safeAreaInsetTop"></zx-status-bar>
      <view class="zx-notify__warpper">
        <slot name="icon">
          <zx-icon
            v-if="['success', 'warning', 'error'].includes(tmpConfig.type)"
            :name="icon"
            :color="tmpConfig.color"
            :size="1.3 * tmpConfig.fontSize"
            :customStyle="{ marginRight: '4px' }"
          ></zx-icon>
        </slot>
        <text
          class="zx-notify__warpper__text"
          :style="{
            fontSize: addUnit(tmpConfig.fontSize),
            color: tmpConfig.color,
          }"
          >{{ tmpConfig.message }}</text
        >
      </view>
    </view>
  </zx-transition>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import deepMerge from "@/utils/deepMerge.js";

const props = defineProps({
  // 到顶部的距离
  top: {
    type: [String, Number],
    default: 0,
  },
  // 是否展示组件
  // show: {
  // 	type: Boolean,
  // 	default: uni.$u.props.notify.show
  // },
  // type主题，primary，success，warning，error
  type: {
    type: String,
    default: "primary",
  },
  // 字体颜色
  color: {
    type: String,
    default: "#fff",
  },
  // 背景颜色
  bgColor: {
    type: String,
    default: "",
  },
  // 展示的文字内容
  message: {
    type: String,
    default: "",
  },
  // 展示时长，为0时不消失，单位ms
  duration: {
    type: [String, Number],
    default: 3000,
  },
  // 字体大小
  fontSize: {
    type: [String, Number],
    default: 15,
  },
  // 是否留出顶部安全距离（状态栏高度）
  safeAreaInsetTop: {
    type: Boolean,
    default: false,
  },
  customStyle: {
    type: Object,
    default: () => ({}),
  },
});

const open = ref(false);
const timer = ref(null);
const config = ref({
  // 到顶部的距离
  top: props.top,
  // type主题，primary，success，warning，error
  type: props.type,
  // 字体颜色
  color: props.color,
  // 背景颜色
  bgColor: props.bgColor,
  // 展示的文字内容
  message: props.message,
  // 展示时长，为0时不消失，单位ms
  duration: props.duration,
  // 字体大小
  fontSize: props.fontSize,
  // 是否留出顶部安全距离（状态栏高度）
  safeAreaInsetTop: props.safeAreaInsetTop,
});
const tmpConfig = ref({ ...config.value });

function addUnit(val) {
  if (val == null) return "";
  return typeof val === "number" ? `${val}px` : val;
}
function addStyle(style) {
  if (!style) return {};
  if (typeof style === "object") return style;
  // 字符串样式转对象
  return style.split(";").reduce((acc, cur) => {
    const [k, v] = cur.split(":");
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});
}

const containerStyle = computed(() => {
  let top = 0;
  if (tmpConfig.value.top === 0) {
    // #ifdef H5
    top = 44;
    // #endif
  }
  return {
    top: addUnit(tmpConfig.value.top === 0 ? top : tmpConfig.value.top),
    // 因为组件底层为zx-transition组件，必须将其设置为fixed定位
    // 让其出现在导航栏底部
    position: "fixed",
    left: 0,
    right: 0,
    zIndex: 10076,
  };
});
const backgroundColor = computed(() => {
  const style = {};
  if (tmpConfig.value.bgColor) {
    style.backgroundColor = tmpConfig.value.bgColor;
  }
  return style;
});
const icon = computed(() => {
  if (tmpConfig.value.type === "success") return "checkmark-circle";
  if (tmpConfig.value.type === "error") return "close-circle";
  if (tmpConfig.value.type === "warning") return "error-circle";
  return "";
});

function clearTimer() {
  open.value = false;
  // 清除定时器
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
}

function show(options = {}) {
  // 不将结果合并到this.config变量，避免多次调用zx-toast，前后的配置造成混乱
  tmpConfig.value = deepMerge(config.value, options);
  // 任何定时器初始化之前，都要执行清除操作，否则可能会造成混乱
  clearTimer();
  open.value = true;
  if (tmpConfig.value.duration > 0) {
    timer.value = setTimeout(() => {
      open.value = false;
      // 倒计时结束，清除定时器，隐藏toast组件
      clearTimer();
      // 判断是否存在callback方法，如果存在就执行
      typeof tmpConfig.value.complete === "function" && tmpConfig.value.complete();
    }, tmpConfig.value.duration);
  }
}

// 关闭notify
function close() {
  clearTimer();
}

defineExpose({ show, close });
</script>

<style lang="scss" scoped>

$zx-notify-padding: 8px 10px !default;
$zx-notify-text-font-size: 15px !default;
$zx-notify-primary-bgColor: #2979ff !default;
$zx-notify-success-bgColor: #4cd964 !default;
$zx-notify-error-bgColor: #f56c6c !default;
$zx-notify-warning-bgColor: #fbbd08 !default;

.zx-notify {
  padding: $zx-notify-padding;

  &__warpper {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    &__text {
      font-size: $zx-notify-text-font-size;
      text-align: center;
    }
  }

  &--primary {
    background-color: $zx-notify-primary-bgColor;
  }

  &--success {
    background-color: $zx-notify-success-bgColor;
  }

  &--error {
    background-color: $zx-notify-error-bgColor;
  }

  &--warning {
    background-color: $zx-notify-warning-bgColor;
  }
}
</style>
