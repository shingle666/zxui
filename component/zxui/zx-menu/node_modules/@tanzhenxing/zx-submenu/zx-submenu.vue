<template>
  <view :class="['zx-submenu', { 'is-active': active, 'is-opened': opened, 'is-disabled': disabled }]">
    <!-- 子菜单标题 -->
    <view class="zx-submenu__title" @tap="handleClick" :style="titleStyle">
      <slot name="title"></slot>
      <view class="zx-submenu__icon-arrow" :style="{ transform: opened ? 'rotateZ(180deg)' : '' }">
        <text class="uni-icons" :class="[isHorizontal ? 'uni-icons-bottom' : 'uni-icons-right']"></text>
      </view>
    </view>
    
    <!-- 垂直模式子菜单内容 -->
    <view v-if="!isHorizontal" 
      class="zx-menu zx-submenu__menu" 
      :style="{ height: opened ? contentHeight + 'px' : '0px' }">
      <slot></slot>
    </view>
    
    <!-- 水平模式子菜单内容（弹出形式） -->
    <view v-else-if="opened" 
      class="zx-submenu__popup" 
      :style="popupStyle">
      <view class="zx-menu zx-submenu__menu">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, inject, onMounted, onBeforeUnmount, provide, ref, watch, nextTick } from 'vue';

// 组件名称
const name = 'ZxSubmenu';

const props = defineProps({
  // 子菜单唯一标识
  index: {
    type: String,
    required: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 弹出菜单的自定义类名
  popperClass: {
    type: String,
    default: ''
  }
});

// 注入父级菜单信息
const zxMenu = inject('zxMenu');
const zxParentSubmenu = inject('zxSubmenu', null);

// 子菜单打开状态
const opened = ref(false);
// 子菜单内容高度（用于垂直模式的动画）
const contentHeight = ref(0);
// 弹出菜单位置（水平模式）
const popupLeft = ref(0);
const popupTop = ref(0);

// 计算索引路径
const indexPath = computed(() => {
  const path = [props.index];
  if (zxParentSubmenu) {
    path.unshift(...zxParentSubmenu.indexPath.value);
  }
  return path;
});

// 是否是水平模式
const isHorizontal = computed(() => {
  return zxMenu.props.mode === 'horizontal';
});

// 子菜单是否激活
const active = computed(() => {
  const active = zxMenu.activeIndex.value;
  const items = Object.values(zxMenu.items || {});
  
  return items.some(item => {
    if (item.index === active) {
      const path = item.parentPath || [];
      return path.includes(props.index);
    }
    return false;
  });
});

// 标题样式
const titleStyle = computed(() => {
  const style = {};
  if (active.value) {
    style.color = zxMenu.props.activeTextColor;
  }
  return style;
});

// 弹出菜单样式
const popupStyle = computed(() => {
  return {
    left: popupLeft.value + 'px',
    top: popupTop.value + 'px',
    backgroundColor: zxMenu.props.backgroundColor
  };
});

// 打开子菜单
const open = () => {
  if (props.disabled) return;
  
  const openTimer = setTimeout(() => {
    opened.value = true;
    // 子菜单打开后，计算内容高度（垂直模式）
    if (!isHorizontal.value) {
      nextTick(() => {
        const submenuEl = document.querySelector('.zx-submenu__menu');
        if (submenuEl) {
          contentHeight.value = submenuEl.children.length * 56; // 假设每个菜单项高度为56px
        }
      });
    } else {
      // 水平模式，计算弹出位置
      nextTick(() => {
        const titleEl = document.querySelector('.zx-submenu__title');
        if (titleEl) {
          const rect = titleEl.getBoundingClientRect();
          popupLeft.value = 0;
          popupTop.value = rect.height;
        }
      });
    }
    
    // 通知父菜单子菜单已打开
    zxMenu.openMenu(props.index, indexPath.value);
  }, zxMenu.props.openDelay);
  
  return openTimer;
};

// 关闭子菜单
const close = () => {
  const closeTimer = setTimeout(() => {
    opened.value = false;
    contentHeight.value = 0;
    
    // 通知父菜单子菜单已关闭
    zxMenu.closeMenu(props.index, indexPath.value);
  }, zxMenu.props.closeDelay);
  
  return closeTimer;
};

// 处理点击事件
const handleClick = () => {
  if (props.disabled) return;
  
  if (opened.value) {
    close();
  } else {
    open();
  }
};

// 提供给子组件的数据和方法
provide('zxSubmenu', {
  indexPath,
  isHorizontal
});

// 组件挂载时注册到菜单
onMounted(() => {
  zxMenu.addSubmenu({
    index: props.index,
    indexPath: indexPath.value,
    open,
    close,
    opened
  });
  
  // 如果默认激活的菜单在该子菜单内，则自动打开该子菜单
  if (active.value) {
    opened.value = true;
  }
});

// 组件卸载前从菜单注销
onBeforeUnmount(() => {
  zxMenu.removeSubmenu({ index: props.index });
});

// 如果是折叠模式，监听折叠状态变化
watch(() => zxMenu.props.collapse, (value) => {
  if (value) {
    close();
  }
});

// 对外暴露方法
defineExpose({
  name,
  open,
  close
});
</script>

<style>
.zx-submenu {
  position: relative;
}

.zx-submenu__title {
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.zx-submenu__icon-arrow {
  margin-left: 5px;
  transition: transform .3s;
}

.zx-menu--horizontal .zx-submenu__title {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid transparent;
}

.zx-menu--horizontal .zx-submenu.is-active .zx-submenu__title {
  border-bottom: 2px solid currentColor;
}

.zx-submenu.is-disabled .zx-submenu__title {
  opacity: 0.25;
  cursor: not-allowed;
}

.zx-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.zx-submenu__menu {
  background-color: inherit;
  overflow: hidden;
  transition: height .3s ease;
  padding-left: 20px;
}

.zx-menu--horizontal .zx-submenu__menu {
  padding-left: 0;
}

.zx-submenu__popup {
  position: absolute;
  z-index: 2000;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
  min-width: 200px;
}
</style> 