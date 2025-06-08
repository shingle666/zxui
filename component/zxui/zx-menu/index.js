import ZxMenu from './zx-menu.vue';
import ZxMenuItem from './zx-menu-item.vue';
import ZxSubmenu from './zx-submenu.vue';
import ZxMenuItemGroup from './zx-menu-item-group.vue';

// 组件安装函数
const install = (app) => {
  app.component(ZxMenu.name || 'ZxMenu', ZxMenu);
  app.component(ZxMenuItem.name || 'ZxMenuItem', ZxMenuItem);
  app.component(ZxSubmenu.name || 'ZxSubmenu', ZxSubmenu);
  app.component(ZxMenuItemGroup.name || 'ZxMenuItemGroup', ZxMenuItemGroup);
};

// 默认导出，用于全局安装
export default {
  install
};

// 单独导出组件，用于按需引入
export {
  ZxMenu,
  ZxMenuItem,
  ZxSubmenu,
  ZxMenuItemGroup
}; 