<template>
  <view class="zx-sidebar" :style="sidebarStyle">
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * Sidebar 侧边导航
 * @description 垂直展示的导航栏，用于在不同的内容区域之间进行切换
 * @tutorial https://zxui.org/components/sidebar
 * @property {String | Number} modelValue 当前导航项的索引
 * @property {String} width 侧边栏宽度，默认 80px
 * @property {String} background 侧边栏背景色
 * @event {Function} change 切换导航项时触发
 */
import { ref, computed, provide, reactive } from 'vue';

// 定义组件名称和样式前缀
const SIDEBAR_KEY = Symbol('zx-sidebar');

// 定义props
const props = defineProps({
  // 当前选中项的索引
  modelValue: {
    type: [Number, String],
    default: 0
  },
  // 侧边栏宽度
  width: {
    type: String,
    default: '80px'
  },
  // 侧边栏背景色
  background: {
    type: String,
    default: ''
  }
});

// 定义事件
const emit = defineEmits(['change', 'update:modelValue']);

// 子组件列表
const _children = reactive([]);

// 计算样式
const sidebarStyle = computed(() => {
  const style = {};
  if (props.width) {
    style.width = props.width;
  }
  if (props.background) {
    style.background = props.background;
  }
  return style;
});

// 获取当前激活项
const getActive = () => +props.modelValue;

// 设置激活项
const setActive = (value) => {
  if (value !== getActive()) {
    emit('update:modelValue', value);
    emit('change', value);
  }
};

// 提供给子组件的上下文
provide(SIDEBAR_KEY, {
  getActive,
  setActive,
  _children
});

// 对外暴露方法和属性
defineExpose({
  getActive,
  setActive
});
</script>

<style>
.zx-sidebar {
  width: 80px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>