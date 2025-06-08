<template>
  <view class="zx-sidebar-item" :class="{
    'zx-sidebar-item--select': selected,
    'zx-sidebar-item--disabled': disabled
  }" @click="onClick">
    <view class="zx-sidebar-item__text">
      <view v-if="badge || dot" class="zx-badge">
        <slot name="title">
          {{ title }}
        </slot>
        <text v-if="dot" class="zx-badge__dot"></text>
        <text v-else-if="badge" class="zx-badge__content">{{ badge }}</text>
      </view>
      <slot v-else name="title">
        {{ title }}
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * SidebarItem 侧边导航项
 * @description 侧边导航的子组件，用于展示可点击的导航项
 * @tutorial https://zxui.org/components/sidebar
 * @property {String} title 内容
 * @property {Boolean} dot 是否显示右上角小红点
 * @property {String | Number} badge 图标右上角徽标的内容
 * @property {Boolean} disabled 是否禁用该项
 * @event {Function} click 点击时触发
 */
import { ref, inject, computed, getCurrentInstance } from 'vue';

// 获取组件实例
const instance = getCurrentInstance();

// 定义props
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 是否显示小红点
  dot: {
    type: Boolean,
    default: false
  },
  // 徽标内容
  badge: {
    type: [String, Number],
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  }
});

// 定义事件
const emit = defineEmits(['click']);

// 获取父组件提供的上下文
const SIDEBAR_KEY = Symbol('zx-sidebar');
const parent = inject(SIDEBAR_KEY, null);

// 如果没有父组件，输出警告
if (!parent && instance) {
  console.warn('[zx-sidebar-item] 必须是 zx-sidebar 的子组件');
}

// 获取当前组件在父组件中的索引
const index = ref(-1);
if (parent && instance) {
  const children = parent._children || [];
  index.value = children.indexOf(instance);
  if (index.value === -1) {
    // 将当前组件添加到父组件的子组件列表中
    parent._children = [...(parent._children || []), instance];
    index.value = parent._children.length - 1;
  }
}

// 计算当前项是否被选中
const selected = computed(() => {
  if (parent) {
    return index.value === parent.getActive();
  }
  return false;
});

// 点击事件处理
const onClick = () => {
  if (props.disabled) {
    return;
  }

  emit('click', index.value);

  if (parent) {
    parent.setActive(index.value);
  }
};
</script>

<style>
.zx-sidebar-item {
  position: relative;
  display: block;
  box-sizing: border-box;
  padding: 20px 12px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 1.4;
  background: #f7f8fa;
  cursor: pointer;
  user-select: none;
}

.zx-sidebar-item:active {
  background-color: #f2f3f5;
}

.zx-sidebar-item:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #ebedf0;
  transform: scaleY(0.5);
}

.zx-sidebar-item__text {
  position: relative;
  word-break: break-all;
}

.zx-sidebar-item--select {
  color: #323233;
  font-weight: 500;
  background-color: #fff;
}

.zx-sidebar-item--select,
.zx-sidebar-item--select:active {
  background-color: #fff;
}

.zx-sidebar-item--select::before {
  position: absolute;
  top: 50%;
  left: 0;
  width: 4px;
  height: 16px;
  background-color: #1989fa;
  transform: translateY(-50%);
  content: "";
}

.zx-sidebar-item--disabled {
  color: #c8c9cc;
  cursor: not-allowed;
}

.zx-sidebar-item--disabled:active {
  background-color: #f7f8fa;
}

/* 徽标样式 */
.zx-badge {
  position: relative;
  display: inline-block;
}

.zx-badge__dot {
  position: absolute;
  top: 0;
  right: -6px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: #ee0a24;
}

.zx-badge__content {
  position: absolute;
  top: 0;
  right: -10px;
  min-width: 16px;
  padding: 0 3px;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 10px;
}
</style>