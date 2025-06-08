# zx-tips 顶部/底部/中部消息提示组件

## 组件简介
`zx-tips` 是一个适用于 uni-app 的多端消息提示组件，支持 H5、小程序、App。支持顶部、底部、中部三种位置，支持多条消息队列，支持自定义样式。

## 支持平台
- H5
- 微信/支付宝/百度/字节/QQ/快手小程序
- App（Android/iOS）

## 属性（Props）
| 属性名           | 类型            | 默认值                | 说明                 |
|------------------|-----------------|----------------------|----------------------|
| position         | String          | 'top'                | 显示位置：top/center/bottom |
| backgroundColor  | String          | 'rgba(0,0,0,0.7)'    | 背景色               |
| color            | String          | '#fff'               | 文字颜色             |
| size             | Number          | 30                   | 字体大小（rpx）      |
| duration         | Number          | 2000                 | 显示时长（ms）       |
| customStyle      | Object          | {}                   | 自定义样式           |

## 方法（Methods）
| 方法名 | 说明 | 参数 |
|--------|------|------|
| show   | 显示消息提示，可传字符串或对象 | string 或 { msg, duration } |

## 事件（Events）
无

## 用法示例

### 1. 基本用法
```vue
<template>
  <zx-tips ref="tipsRef" />
  <button @click="showTips">显示提示</button>
</template>

<script setup>
import { ref } from 'vue';
import ZxTips from '@/components/zx-tips/zx-tips.vue';

const tipsRef = ref();
function showTips() {
  tipsRef.value.show('这是一个顶部提示');
}
</script>
```

### 2. 传递对象参数
```vue
<template>
  <zx-tips ref="tipsRef" position="bottom" color="#333" background-color="#ffe" />
  <button @click="showTips">显示底部提示</button>
</template>

<script setup>
import { ref } from 'vue';
import ZxTips from '@/components/zx-tips/zx-tips.vue';

const tipsRef = ref();
function showTips() {
  tipsRef.value.show({ msg: '底部提示，3秒后消失', duration: 3000 });
}
</script>
```

### 3. 多条消息队列
```vue
<template>
  <zx-tips ref="tipsRef" />
  <button @click="showQueue">连续提示</button>
</template>

<script setup>
import { ref } from 'vue';
import ZxTips from '@/components/zx-tips/zx-tips.vue';

const tipsRef = ref();
function showQueue() {
  tipsRef.value.show('第一条提示');
  tipsRef.value.show('第二条提示');
  tipsRef.value.show({ msg: '第三条，2秒', duration: 2000 });
}
</script>
```

## 注意事项
- 组件不依赖 window/document，兼容多端。
- 建议通过 ref 调用 show 方法。
- 支持多条消息自动排队依次显示。
- 可通过 customStyle 自定义样式。

## 相关文档
无
