import ZxMovable from './zx-movable.vue'

// 为组件提供 install 安装方法，供按需引入
ZxMovable.install = function (app) {
  app.component(ZxMovable.name || 'zx-movable', ZxMovable)
}

export default ZxMovable 