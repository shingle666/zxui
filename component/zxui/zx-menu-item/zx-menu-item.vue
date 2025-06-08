<template>
  <view :class="[
    'zx-menu-item',
    {
      'is-active': active,
      'is-disabled': disabled
    }
  ]" :style="itemStyle" @tap="handleClick">
    <slot></slot>
  </view>
</template>

<script setup>
import { computed, inject, onMounted, onBeforeUnmount, ref } from 'vue';

// 组件名称
const name = 'ZxMenuItem';

const props = defineProps({
  // 菜单项的唯一标识
  index: {
    type: String,
    default: null
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 路由跳转对象
  route: {
    type: [String, Object],
    default: null
  }
});

const emit = defineEmits(['click']);

// 注入父级菜单信息
const zxMenu = inject('zxMenu');
const zxSubmenu = inject('zxSubmenu', null);

// 当前菜单项路径
const parentPath = computed(() => {
  return zxSubmenu ? [...zxSubmenu.indexPath.value] : [];
});

// 是否激活
const active = computed(() => {
  return props.index === zxMenu.activeIndex.value;
});

// 菜单项样式
const itemStyle = computed(() => {
  const style = {};
  if (active.value) {
    style.color = zxMenu.props.activeTextColor;
    style.borderBottomColor = zxMenu.props.activeTextColor;
  }
  return style;
});

// 处理点击事件
const handleClick = () => {
  if (props.disabled) return;

  // 设置激活菜单
  zxMenu.setActiveItem(props.index);

  // 触发点击事件
  emit('click', {
    index: props.index,
    indexPath: [...parentPath.value, props.index],
    route: props.route
  });

  // 如果有路由配置，则进行跳转
  if (props.route) {
    let routeObj = props.route;
    if (typeof props.route === 'string') {
      uni.navigateTo({
        url: props.route
      });
    } else {
      // 如果是对象形式，直接使用 uni 对应的路由方法
      const { url, type = 'navigateTo', ...params } = routeObj;
      if (uni[type] && typeof uni[type] === 'function') {
        uni[type]({
          url,
          ...params
        });
      }
    }
  }
};

// 组件挂载时注册到菜单
onMounted(() => {
  if (props.index) {
    zxMenu.addItem({
      index: props.index,
      parentPath: parentPath.value
    });
  }
});

// 组件卸载前从菜单注销
onBeforeUnmount(() => {
  if (props.index) {
    zxMenu.removeItem({ index: props.index });
  }
});

// 对外暴露组件名称
defineExpose({
  name
});
</script>

<style>
.zx-menu-item {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
}

.zx-menu--horizontal .zx-menu-item {
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
}

.zx-menu--horizontal .zx-menu-item.is-active {
  border-bottom: 2px solid currentColor;
}

.zx-menu--vertical .zx-menu-item {
  border-right: 2px solid transparent;
}

.zx-menu--vertical .zx-menu-item.is-active {
  border-right: 2px solid currentColor;
}

.zx-menu-item.is-disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.zx-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>