# zx-transition 组件

基于 uni.createAnimation 动画API实现的过渡动画组件，提供丰富的动画效果，适用于各种过渡场景。

## 特性

- 多种内置动画模式
- 基于uni.createAnimation实现，性能更好
- 支持自定义动画参数
- 完善的事件机制
- 简单易用的API

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 是否显示组件 |
| mode | String | 'fade' | 使用的动画模式 |
| duration | Number/String | 500 | 动画持续时间，单位ms |
| timingFunction | String | 'ease-out' | 动画过渡函数 |
| delay | Number/String | 0 | 动画延迟时间，单位ms |
| transformOrigin | String | '50% 50% 0' | 变换的原点 |

## 动画模式

组件内置以下动画模式：

- fade：淡入淡出
- fade-up：上滑淡入淡出
- fade-down：下滑淡入淡出
- fade-left：左滑淡入淡出
- fade-right：右滑淡入淡出
- slide-up：上滑进入
- slide-down：下滑进入
- slide-left：左滑进入
- slide-right：右滑进入
- zoom：缩放
- fade-zoom：缩放淡入淡出
- rotate：旋转
- rotate-zoom：旋转缩放淡入淡出

## 事件说明

| 事件名称 | 说明 |
| --- | --- |
| click | 点击组件时触发 |
| beforeEnter | 进入动画开始前触发 |
| enter | 进入动画开始时触发 |
| afterEnter | 进入动画结束后触发 |
| beforeLeave | 离开动画开始前触发 |
| leave | 离开动画开始时触发 |
| afterLeave | 离开动画结束后触发 |

## 方法说明

通过`ref`方式可以获取到组件实例并调用实例方法

| 方法名 | 参数 | 说明 |
| --- | --- | --- |
| trigger | show (可选) | 手动触发过渡效果，不传参数时会根据当前状态自动切换 |

## 基础用法

```vue
<template>
  <view>
    <button @click="show = !show">切换显示</button>
    
    <zx-transition :show="show" mode="fade">
      <view class="content-box">淡入淡出效果</view>
    </zx-transition>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
</script>

<style>
.content-box {
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}
</style>
```

## 不同的动画模式

```vue
<template>
  <view>
    <button @click="show = !show">切换显示</button>
    
    <zx-transition :show="show" mode="fade-zoom" :duration="800">
      <view class="content-box">缩放淡入淡出效果</view>
    </zx-transition>
  </view>
</template>
```

## 监听动画事件

```vue
<template>
  <view>
    <button @click="show = !show">切换显示</button>
    
    <zx-transition 
      :show="show" 
      mode="slide-up"
      @beforeEnter="onBeforeEnter"
      @enter="onEnter"
      @afterEnter="onAfterEnter"
      @beforeLeave="onBeforeLeave"
      @leave="onLeave"
      @afterLeave="onAfterLeave"
    >
      <view class="content-box">监听动画事件</view>
    </zx-transition>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

function onBeforeEnter() {
  console.log('beforeEnter');
}

function onEnter() {
  console.log('enter');
}

function onAfterEnter() {
  console.log('afterEnter');
}

function onBeforeLeave() {
  console.log('beforeLeave');
}

function onLeave() {
  console.log('leave');
}

function onAfterLeave() {
  console.log('afterLeave');
}
</script>
```

## 手动触发动画

```vue
<template>
  <view>
    <button @click="triggerTransition">手动触发动画</button>
    
    <zx-transition ref="transitionRef" mode="rotate-zoom">
      <view class="content-box">手动触发动画</view>
    </zx-transition>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const transitionRef = ref(null);

function triggerTransition() {
  // 调用组件的trigger方法
  transitionRef.value.trigger();
}
</script>
```

## 注意事项

1. 组件默认是隐藏的，需要通过`show`属性来控制显示
2. 动画模式需要匹配组件中已定义的模式，否则会显示错误信息
3. 动画时间单位均为毫秒
4. 基于uni.createAnimation实现，兼容性取决于平台对该API的支持情况
