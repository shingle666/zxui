import zxTabs from './zx-tabs.vue'
import zxTabPane from './zx-tab-pane.vue'

// 单独导出
export { zxTabs, zxTabPane }

// 默认导出
export default {
  zxTabs,
  zxTabPane
}

// 安装函数（如果需要全局注册）
export const install = (app) => {
  app.component('zx-tabs', zxTabs)
  app.component('zx-tab-pane', zxTabPane)
} 