# zx-sign 电子签名组件

基于 uniapp 的多端（H5/小程序/App）手写签名组件，支持自定义画布大小、颜色、线宽，支持签名确认、重置、图片导出。

## 组件特性
- 支持 H5、微信/支付宝/百度/QQ/抖音小程序、App（vue3）
- 纯 uniapp API 实现，无浏览器特有 DOM
- 支持自定义画布宽高、背景色、线条颜色、线宽
- 支持签名确认、重置、图片导出
- 事件回调丰富

## 属性（Props）
| 属性名           | 类型    | 默认值      | 说明             |
|------------------|---------|-------------|------------------|
| orientation      | String  | portrait    | 屏幕方向         |
| canvas-id        | String  | mySign      | 画布 id          |
| width            | String  | ''          | 画布宽度（rpx）  |
| height           | String  | ''          | 画布高度（rpx）  |
| background-color | String  | #ececec     | 画布背景色       |
| line-color       | String  | #333333     | 画笔颜色         |
| line-size        | String  | 5rpx        | 画笔大小         |

## 事件（Events）
| 事件名   | 说明                 | 回调参数                |
|----------|----------------------|------------------------|
| change   | 签名内容变更时触发   | { tempFilePath }       |
| confirm  | 点击确认签名时触发   | 签名图片临时路径 string |

## 方法（ref 调用）
| 方法名      | 说明         |
|-------------|--------------|
| confirm     | 触发确认签名 |
| canvasInit  | 重置签名     |

## 基本用法
```vue
<template>
  <zx-sign
    ref="signRef"
    :canvas-id="'mySignDemo'"
    :width="'600rpx'"
    :height="'300rpx'"
    :background-color="'#fff'"
    :line-color="'#007AFF'"
    :line-size="'8rpx'"
    @change="onSignChange"
    @confirm="onSignConfirm"
  />
</template>

<script setup>
import { ref } from 'vue'
import zxSign from '@/components/zx-sign/zx-sign.vue'

const signRef = ref(null)
function onSignChange(e) {
  // e.tempFilePath 为签名图片临时路径
}
function onSignConfirm(img) {
  // img 为签名图片临时路径
}
</script>
```

## 完整示例
详见 `src/pages/components/sign/index.vue`

## 注意事项
- 组件内部不使用浏览器特有 DOM，兼容主流 uniapp 端。
- 画布宽高建议传递 rpx 单位，适配不同屏幕。
- 组件需在页面 onReady 后再调用 ref 方法。
