# zx-notify 顶部通知组件

`zx-notify` 是一个适用于 H5、小程序、App 的顶部通知提示组件，基于 `uniapp` + `vue3 setup` 实现，支持多端，无浏览器特有 DOM。

## 组件特性
- 支持多端（H5、微信/支付宝/百度/字节小程序、App）
- 支持多种主题（primary、success、warning、error）
- 支持自定义颜色、背景、字体大小
- 支持顶部安全区适配
- 支持自动/手动关闭
- 支持插槽自定义图标

## 基本用法
```vue
<template>
  <zx-notify ref="notifyRef" />
  <button @click="showNotify">显示通知</button>
</template>

<script setup>
import { ref } from 'vue'
import ZxNotify from '@/components/zx-notify/zx-notify.vue'

const notifyRef = ref()
const showNotify = () => {
  notifyRef.value?.show({
    type: 'success',
    message: '操作成功',
    duration: 2000
  })
}
</script>
```

## 属性 Props
| 属性名            | 说明                       | 类型            | 默认值      |
|-------------------|----------------------------|-----------------|------------|
| top               | 距离顶部距离               | String/Number   | 0          |
| type              | 主题类型                   | String          | primary    |
| color             | 字体颜色                   | String          | #fff       |
| bgColor           | 背景颜色                   | String          | 主题色      |
| message           | 展示的文字内容             | String          | ''         |
| duration          | 展示时长(ms)，0为不自动关闭| String/Number   | 3000       |
| fontSize          | 字体大小                   | String/Number   | 15         |
| safeAreaInsetTop  | 顶部安全区适配             | Boolean         | false      |
| customStyle       | 自定义样式                 | Object          | -          |

## 方法 Methods
- `show(options)`  显示通知，options同上属性
- `close()`        手动关闭通知

## 事件 Events
| 事件名 | 说明         |
|--------|--------------|
| open   | 通知打开时触发|
| close  | 通知关闭时触发|

## 插槽 Slots
| 名称 | 说明         |
|------|--------------|
| icon | 自定义图标   |

## 示例
详见 `src/pages/components/notify/index.vue`

## 注意事项
- 组件需通过 ref 调用 show 方法进行展示
- 支持多端，无浏览器特有 DOM
