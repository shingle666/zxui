<template>
  <view class="zx-badge">
    <slot></slot>
    <text
      v-if="!hidden && (text || (isDot && !text))"
      class="badge"
      :class="classNames"
      :style="[positionStyle, getStyle, dotStyle]"
      @click="onClick()"
      >{{ displayValue }}</text
    >
  </view>
</template>

<script setup>
/**
 * Badge 数字角标
 * @description 数字角标一般和其它控件配合使用，用于数量提示
 * @tutorial https://zxui.org/component/badge
 * @property {String}         text     角标内容
 * @property {String}         type     颜色类型  info|primary|success|warning|error
 * @property {String}         bgColor  背景颜色 ，优先级比type高，如设置，type参数会失效
 * @property {String}         color    字体颜色
 * @property {String}         size     字体大小
 * @property {Number}         maxNum   最大值，超过 99 显示 99+
 * @property {String}         isDot    是否显示为一个小点[true|false]
 * @property {Boolean}        hidden   是否隐藏Badge
 * @property {Boolean}        showZero 值为零时是否显示Badge
 * @property {String}         absolute 开启绝对定位, 角标将定位到其包裹的标签的四角上 [rightTop|rightBottom|leftBottom|leftTop]
 * @property {Array[number]}  offset   距定位角中心点的偏移量，只有存在 absolute 属性时有效
 * @property {Object}         badgeStyle 自定义badge样式
 * @property {String}         badgeClass 自定义badge类名
 * @event {Function}          click    点击 Badge 触发事件
 * @example <zx-badge text="1"></zx-badge>
 */
import { ref, getCurrentInstance, computed } from "vue";
const { proxy } = getCurrentInstance();

const props = defineProps({
  // 角标内容
  text: {
    type: [String, Number],
    default: "",
  },
  // 颜色类型
  type: {
    type: String,
    default: "error",
  },
  // 背景颜色，优先级比type高，如设置，type参数会失效
  bgColor: {
    type: String,
    default: "",
  },
  // 字体颜色
  color: {
    type: String,
    default: "#ffffff",
  },
  // 字体大小
  size: {
    type: String,
    default: "22rpx",
  },
  // 角标缩放比率
  scale: {
    type: Number,
    default: 0.8,
  },
  // 最大值
  maxNum: {
    type: Number,
    default: 99,
  },
  // 是否显示为一个小点
  isDot: {
    type: Boolean,
    default: false,
  },
  // 是否隐藏Badge
  hidden: {
    type: Boolean,
    default: false,
  },
  // 值为零时是否显示Badge
  showZero: {
    type: Boolean,
    default: true,
  },
  // 开启绝对定位
  absolute: {
    type: String,
    default: "rightTop",
  },
  // 距定位角中心点的偏移量
  offset: {
    type: Array,
    default() {
      return [0, 0];
    },
  },
  // 自定义badge样式
  badgeStyle: {
    type: Object,
    default() {
      return {};
    },
  },
  // 自定义badge类名
  badgeClass: {
    type: String,
    default: "",
  },
});

const width = computed(() => {
  return String(props.text).length * 8 + 12;
});
const classNames = computed(() => {
  let classArr = [];
  classArr.push(props.type);
  if (props.absolute) {
    classArr.push("absolute");
  }
  if (props.badgeClass) {
    classArr.push(props.badgeClass);
  }
  return classArr;
});
const positionStyle = computed(() => {
  if (!props.absolute) {
    return {};
  }
  let w = width.value / 2,
    h = 10;
  if (props.isDot) {
    w = 5;
    h = 5;
  }
  const x = `${-w + props.offset[0]}px`;
  const y = `${-h + props.offset[1]}px`;

  const whiteList = {
    rightTop: {
      right: x,
      top: y,
    },
    rightBottom: {
      right: x,
      bottom: y,
    },
    leftBottom: {
      left: x,
      bottom: y,
    },
    leftTop: {
      left: x,
      top: y,
    },
  };
  
  const match = whiteList[props.absolute];
  return match ? match : whiteList["rightTop"];
});

const dotStyle = computed(() => {
  if (!props.isDot) return {};
  return {
    width: "20rpx",
    minWidth: "0",
    height: "20rpx",
    padding: "0",
    borderRadius: "20rpx",
  };
});
const getStyle = computed(() => {
  let style = {
    fontSize: props.size,
    transform: `scale(${props.scale})`,
    transformOrigin: "center center",
    ...props.badgeStyle,
  };
  if (props.bgColor) {
    style.backgroundColor = props.bgColor;
  }
  if (props.color) {
    style.color = props.color;
  }
  return style;
});
// 显示内容
const displayValue = computed(() => {
  const { isDot, text, maxNum, showZero } = props;
  if (isDot) return "";
  
  // 处理值为零的情况
  if (text === 0 || text === "0") {
    return showZero ? "0" : "";
  }

  // 处理数字类型
  if (!isNaN(Number(text)) && text !== "") {
    return Number(text) > maxNum ? `${maxNum}+` : text;
  }

  // 文本类型直接返回
  return text;
});
const onClick = () => {
  proxy.$emit("click");
};
</script>

<style lang="scss" scoped>
/* 定义颜色变量 */
$zx-info: #909399;
$zx-primary: #2979ff;
$zx-success: #07c160;
$zx-warning: #ff9900;
$zx-error: #fa3534;

.zx-badge {
  /* #ifndef APP-NVUE */
  display: inline-block;
  /* #endif */

  position: relative;

  .absolute {
    position: absolute;
  }

  .badge {
    /* #ifndef APP-NVUE */
    display: flex;
    overflow: hidden;
    box-sizing: border-box;
    font-feature-settings: "tnum";
    min-width: 40rpx;
    /* #endif */

    /* #ifdef H5 */
    z-index: 999;
    cursor: pointer;
    /* #endif */

    justify-content: center;
    flex-direction: row;
    height: 40rpx;
    padding: 0 10rpx;
    min-width: 40rpx;
    line-height: 40rpx;
    color: #fff;
    border-radius: 100px;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    font-feature-settings: "tnum";
  }
}

.info {
  color: #ffffff;
  background-color: $zx-info;
}

.primary {
  background-color: $zx-primary;
}

.success {
  background-color: $zx-success;
}

.warning {
  background-color: $zx-warning;
}

.error {
  background-color: $zx-error;
}
</style>
