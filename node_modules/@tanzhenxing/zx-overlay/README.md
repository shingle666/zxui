# zx-overlay 遮罩层组件

创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景。

## 特性

- 支持自定义透明度
- 支持自定义z-index层级
- 支持定制动画时长
- 支持添加自定义内容
- 支持控制点击行为

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 是否显示遮罩 |
| zIndex | String/Number | 10070 | z-index 层级 |
| duration | String/Number | 500 | 动画时长，单位毫秒 |
| opacity | String/Number | 0.5 | 不透明度值，当做rgba的第四个参数 |
| customStyle | Object | {} | 定义需要用到的外部样式 |
| closeOnClickOverlay | Boolean | true | 点击遮罩是否关闭 |
| lockScroll | Boolean | true | 是否锁定背景滚动 |

## 事件说明

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击遮罩发送事件 | - |
| open | 遮罩打开动画结束时触发 | - |
| close | 遮罩关闭动画结束时触发 | - |

## 插槽说明

| 名称 | 说明 |
| --- | --- |
| default | 遮罩层内容 |

## 基础用法

```vue
<template>
  <zx-overlay :show="show" @click="show = false"></zx-overlay>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>
```

## 自定义内容

```vue
<template>
  <zx-overlay :show="show" @click="show = false">
    <view class="content">
      <text>自定义内容</text>
    </view>
  </zx-overlay>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
```

## 自定义透明度

```vue
<template>
  <zx-overlay :show="show" :opacity="0.8" @click="show = false"></zx-overlay>
</template>
```

## 禁止点击遮罩关闭

```vue
<template>
  <zx-overlay :show="show" :close-on-click-overlay="false" @click="clickHandler"></zx-overlay>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const clickHandler = () => {
  // 自定义点击处理
  console.log('遮罩被点击');
};
</script>
```

## 锁定背景滚动

```vue
<template>
  <zx-overlay :show="show" :lock-scroll="true" @click="show = false"></zx-overlay>
</template>
```
