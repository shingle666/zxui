# ZxLoading 加载组件

加载数据时显示动效，基于uni.showLoading API实现的简单封装。

## 基础使用

```vue
<template>
  <zx-loading :show="loading" text="加载中..." :mask="true"></zx-loading>
  <button @click="toggleLoading">切换加载状态</button>
</template>

<script setup>
import { ref } from 'vue'
import ZxLoading from '@/components/zx-loading/zx-loading.vue'

const loading = ref(false)

const toggleLoading = () => {
  loading.value = !loading.value
  
  // 3秒后自动关闭
  if (loading.value) {
    setTimeout(() => {
      loading.value = false
    }, 3000)
  }
}
</script>
```

## 直接使用uni API

也可以直接使用uni.showLoading和uni.hideLoading API：

```js
// 显示加载
uni.showLoading({
  title: '加载中...',
  mask: true
})

// 隐藏加载
uni.hideLoading()
```

## 参数说明

| 参数  | 说明                           | 类型     | 默认值        |
|------|--------------------------------|---------|--------------|
| show | 是否显示加载组件                  | Boolean | false        |
| text | 显示的文本                       | String  | '正在加载...' |
| mask | 是否显示透明蒙层，防止触摸穿透      | Boolean | false        |

## 事件

| 事件名        | 说明                |
|--------------|---------------------|
| update:show  | 加载状态更新时触发     |

## 方法

| 方法名 | 说明        |
|-------|-------------|
| open  | 显示加载组件 |
| close | 关闭加载组件 |