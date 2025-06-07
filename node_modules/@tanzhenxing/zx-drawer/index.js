import ZxDrawer from './zx-drawer.vue';

// 注册组件
ZxDrawer.install = function(app) {
  app.component(ZxDrawer.name || 'zx-drawer', ZxDrawer);
};

export default ZxDrawer; 