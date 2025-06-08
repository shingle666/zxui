<template>
  <view :class="['zx-menu', `zx-menu--${mode}`, { 'zx-menu--collapse': collapse }]" :style="menuStyle">
    <slot></slot>
  </view>
</template>

<script setup>
import { ref, provide, computed, reactive } from 'vue';

// 组件名称
const name = 'ZxMenu';

const props = defineProps({
  // 菜单显示模式，horizontal / vertical
  mode: {
    type: String,
    default: 'vertical'
  },
  // 默认激活菜单的index
  defaultActive: {
    type: String,
    default: ''
  },
  // 菜单背景色
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 菜单文字颜色
  textColor: {
    type: String,
    default: '#303133'
  },
  // 激活菜单文字颜色
  activeTextColor: {
    type: String,
    default: '#409EFF'
  },
  // 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
  collapse: {
    type: Boolean,
    default: false
  },
  // 子菜单打开的延时
  openDelay: {
    type: Number,
    default: 0
  },
  // 子菜单关闭的延时
  closeDelay: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['select', 'open', 'close']);

// 当前激活的菜单项
const activeIndex = ref(props.defaultActive);

// 菜单项列表
const items = reactive({});
// 子菜单列表
const submenus = reactive({});

// 菜单样式
const menuStyle = computed(() => {
  return {
    backgroundColor: props.backgroundColor,
    color: props.textColor
  };
});

// 注册菜单项
const addItem = (item) => {
  if (item.index) {
    items[item.index] = item;
  }
};

// 移除菜单项
const removeItem = (item) => {
  if (item.index) {
    delete items[item.index];
  }
};

// 注册子菜单
const addSubmenu = (submenu) => {
  if (submenu.index) {
    submenus[submenu.index] = submenu;
  }
};

// 移除子菜单
const removeSubmenu = (submenu) => {
  if (submenu.index) {
    delete submenus[submenu.index];
  }
};

// 设置激活菜单
const setActiveItem = (index) => {
  activeIndex.value = index;
  emit('select', index, getItemPath(index), items[index]);
};

// 获取菜单项路径
const getItemPath = (index) => {
  const path = [index];
  let current = index;
  
  Object.values(items).forEach(item => {
    if (item.index === index && item.parentPath) {
      path.unshift(...item.parentPath);
    }
  });
  
  return path;
};

// 打开子菜单
const openMenu = (index, indexPath) => {
  const openedMenus = Object.values(submenus).filter(submenu => submenu.opened);
  
  // 触发其他子菜单关闭
  if (props.mode === 'horizontal') {
    openedMenus.forEach(submenu => {
      if (submenu.index !== index && !indexPath.includes(submenu.index)) {
        submenu.close();
      }
    });
  }
  
  emit('open', index, indexPath);
};

// 关闭子菜单
const closeMenu = (index, indexPath) => {
  emit('close', index, indexPath);
};

// 提供给子组件的数据和方法
provide('zxMenu', {
  props,
  activeIndex,
  addItem,
  removeItem,
  addSubmenu,
  removeSubmenu,
  setActiveItem,
  openMenu,
  closeMenu
});

// 对外暴露方法
defineExpose({
  // 组件名称
  name,
  // 根据索引打开指定的子菜单
  open(index) {
    if (submenus[index]) {
      submenus[index].open();
    }
  },
  // 根据索引关闭指定的子菜单
  close(index) {
    if (submenus[index]) {
      submenus[index].close();
    }
  },
  // 根据索引激活菜单项
  updateActiveIndex(index) {
    setActiveItem(index);
  }
});
</script>

<style>
.zx-menu {
  display: flex;
  list-style: none;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 14px;
}

.zx-menu--horizontal {
  flex-direction: row;
  height: 60px;
  border-bottom: solid 1px #e6e6e6;
}

.zx-menu--vertical {
  flex-direction: column;
  width: 200px;
  border-right: solid 1px #e6e6e6;
}

.zx-menu--collapse {
  width: 64px;
}
</style>
