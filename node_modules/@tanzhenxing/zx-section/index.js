import ZxSection from './zx-section.vue';

// 注册组件
ZxSection.install = function(Vue) {
  Vue.component(ZxSection.name, ZxSection);
};

export default ZxSection; 