import ZxWaterfall from './zx-waterfall.vue';

// 导出组件
export default ZxWaterfall;

// 安装方法
ZxWaterfall.install = function(app) {
  app.component(ZxWaterfall.name || 'zx-waterfall', ZxWaterfall);
  return app;
};

// 导出单独引入的方式
export { ZxWaterfall }; 