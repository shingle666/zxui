# zx-goods-nav 商品导航组件

基于 [uni-goods-nav](https://uniapp.dcloud.net.cn/component/uniui/uni-goods-nav.html) 实现，适用于 H5、各类小程序、App，无浏览器特有 DOM 依赖。

## 组件说明

商品底部操作导航，常用于电商场景，支持自定义左侧操作（如客服、店铺、购物车等）和右侧按钮组（如加入购物车、立即购买等）。

## 基本用法

```vue
<template>
  <zx-goods-nav
    :options="options"
    :button-group="buttonGroup"
    :fill="true"
    @click="onNavClick"
    @buttonClick="onButtonClick"
  />
</template>

<script setup>
import { ref } from 'vue'
import zxGoodsNav from '@/components/zx-goods-nav/zx-goods-nav.vue'

const options = ref([
  { icon: 'headphones', text: '客服' },
  { icon: 'shop', text: '店铺', info: 2, infoBackgroundColor: '#007aff', infoColor: 'red' },
  { icon: 'cart', text: '购物车', info: 2 }
])

const buttonGroup = ref([
  { text: '加入购物车', backgroundColor: '#ff0000', color: '#fff' },
  { text: '立即购买', backgroundColor: '#ffa200', color: '#fff' }
])

function onNavClick(e) {
  uni.showToast({ title: `点击${e.content.text}`, icon: 'none' })
}
function onButtonClick(e) {
  options.value[2].info++
}
</script>
```

## 属性（Props）

| 属性名        | 类型    | 默认值 | 说明                 |
| ------------- | ------- | ------ | -------------------- |
| options       | Array   | 见下   | 左侧操作项配置       |
| buttonGroup   | Array   | 见下   | 右侧按钮组配置       |
| fill          | Boolean | false  | 右侧按钮是否平铺      |
| stat          | Boolean | false  | 是否开启 uni.report  |

### options 配置项

| 属性名               | 类型    | 说明               |
| -------------------- | ------- | ------------------ |
| icon                 | String  | 图标名（uni-icons）|
| text                 | String  | 显示文字           |
| info                 | Number  | 右上角数字角标      |
| infoBackgroundColor  | String  | 角标背景色         |
| infoColor            | String  | 角标文字颜色       |

### buttonGroup 配置项

| 属性名         | 类型   | 说明         |
| -------------- | ------ | ------------ |
| text           | String | 按钮文字     |
| backgroundColor| String | 按钮背景色   |
| color          | String | 按钮文字颜色 |

## 事件（Events）

| 事件名         | 说明               | 回调参数                  |
| -------------- | ------------------ | ------------------------- |
| click          | 左侧操作项点击事件 | { index, content }        |
| buttonClick    | 右侧按钮点击事件   | { index, content }        |

## 插槽（Slots）

无

## 注意事项
- 依赖 `uni-icons` 组件，请确保项目已集成。
- 适配 H5、各类小程序、App，无浏览器特有 DOM。
- 如需国际化可自行扩展。

## 参考
- [uni-goods-nav 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-goods-nav.html)
