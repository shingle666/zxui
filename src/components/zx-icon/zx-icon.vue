<template>
    <image
      v-if="isImg"
      :src="name"
      :mode="mode"
      :style="imgStyle"
      @click="onClick"
    ></image>
    <text
      v-else
      :style="iconStyle"
      :class="iconClass"
      @click="onClick"
    ></text>
</template>

<script setup>
/**
 * icon 图标
 * @description 可以同时使用字体图标和图片。
 * @tutorial https://zxui.org/components/icon
 * @property {String}			name			图标名称
 * @property {String}			color			图标颜色
 * @property {String | Number}	size			图标字体大小
 * @property {Boolean}			bold			是否显示粗体
 * @property {String}			customPrefix	自定义扩展前缀
 * @property {String}			mode			图片的mode
 * @property {String | Number}	width			显示图片小图标时的宽度
 * @property {String | Number}	height			显示图片小图标时的高度
 * @property {String | Number}	top				图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途
 * @event {Function}            onClick         点击图标时触发
 * @example
 * <zx-icon name="eye"></zx-icon>
 */
import { computed, ref, getCurrentInstance } from "vue";

const {proxy} = getCurrentInstance();

const props = defineProps({
  // 图标类名
  name: {
    type: String,
    default: "",
  },
  // 图标颜色，可接受主题色
  color: {
    type: String,
    default: "#b0b0b0",
  },
  // 字体大小
  size: {
    type: [String, Number],
    default: "34rpx",
  },
  // 是否显示粗体
  bold: {
    type: Boolean,
    default: false,
  },
  // 自定义扩展前缀，方便用户扩展自己的图标库
  customPrefix: {
    type: String,
    default: "zx-icon",
  },
  // 图片的mode
  mode: {
    type: String,
    default: "",
  },
  // 用于显示图片小图标时，图片的宽度
  width: {
    type: String,
    default: "",
  },
  // 用于显示图片小图标时，图片的高度
  height: {
    type: String,
    default: "",
  },
  // 用于解决某些情况下，让图标垂直居中的用途
  top: {
    type: String,
    default: "",
  },
});

// 图标样式
const iconStyle = computed(() => ({
  color: props.color,
  fontSize: props.size,
  fontWeight: props.bold ? "bold" : "normal",
  top: props.top,
}));

// 图标类名
const iconClass = computed(() => [
  props.customPrefix,
  `${props.customPrefix}-${props.name}`,
]);

// 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
const isImg = computed(() => props.name.indexOf("/") !== -1);

// 图片样式
const imgStyle = computed(() => ({
  width: props.width || props.size,
  height: props.height || props.size,
}));

// 点击事件处理
const onClick = (e) => {
  proxy.$emit("click", e);
};
</script>

<style scoped>
@import "./icon.css";
</style>
