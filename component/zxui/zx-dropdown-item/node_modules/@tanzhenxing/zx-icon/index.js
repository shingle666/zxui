import ZxIcon from './zx-icon.vue'

// 为组件提供 install 安装方法，供按需引入
ZxIcon.install = function (Vue) {
  Vue.component(ZxIcon.name || 'ZxIcon', ZxIcon)
}

// 默认导出组件
export default ZxIcon