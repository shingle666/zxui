# zx-lucky-box 抽奖盒子组件

基于 uni-app + vue3 setup 语法开发，支持 H5、各类小程序、App（部分平台需兼容），不依赖浏览器特有 DOM。适用于大转盘抽奖等场景。

## 支持平台
- H5
- 微信/支付宝/百度/字节/QQ/快手小程序
- App（最新版暂不支持，建议 app 端用旧版）

## 属性（Props）
| 属性名         | 说明               | 类型    | 默认值     |
| -------------- | ------------------ | ------- | ---------- |
| width          | 盒子宽度           | String  | 600rpx     |
| height         | 盒子高度           | String  | 600rpx     |
| blocks         | 外围装饰块配置     | Array   | []         |
| prizes         | 奖品配置           | Array   | []         |
| buttons        | 按钮配置           | Array   | []         |
| defaultConfig  | 抽奖配置           | Object  | {}         |
| defaultStyle   | 样式配置           | Object  | {}         |

## 事件（Events）
| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| start  | 开始抽奖时触发 | ...args  |
| end    | 抽奖结束时触发 | ...args  |

## 方法（ref 调用）
| 方法名        | 说明           |
| ------------- | -------------- |
| init()        | 重新初始化     |
| play(...args) | 开始抽奖       |
| stop(...args) | 停止抽奖       |
| getLuckyImage() | 获取当前图片 |

## 使用示例
```vue
<template>
  <view>
    <zx-lucky-box
      ref="luckyRef"
      :width="'600rpx'"
      :height="'600rpx'"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :defaultConfig="defaultConfig"
      :defaultStyle="defaultStyle"
      @start="onStart"
      @end="onEnd"
    />
    <button @click="play">开始抽奖</button>
    <button @click="stop">停止</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxLuckyBox from '@/components/zx-lucky-box/zx-lucky-box.vue'

const luckyRef = ref()
const blocks = ref([
  { background: '#fff', imgs: [] }
])
const prizes = ref([
  { fonts: [{ text: '一等奖' }], imgs: [] },
  { fonts: [{ text: '二等奖' }], imgs: [] },
  { fonts: [{ text: '三等奖' }], imgs: [] },
])
const buttons = ref([
  { radius: '60px', background: '#f00', fonts: [{ text: '抽奖' }] }
])
const defaultConfig = ref({})
const defaultStyle = ref({})

function play() {
  luckyRef.value.play()
}
function stop() {
  luckyRef.value.stop()
}
function onStart(...args) {
  // 开始抽奖回调
}
function onEnd(...args) {
  // 结束抽奖回调
}
</script>
```

## 注意事项
- App 端如需兼容请使用旧版插件。
- blocks/prizes/buttons 配置请参考 lucky-canvas 官方文档。 