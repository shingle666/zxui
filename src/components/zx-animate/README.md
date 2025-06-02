# zx-animate 动画组件

`zx-animate` 是一个功能强大的 uni-app 动画组件，为子元素添加丰富的动画效果。支持多种动画类型、触发方式和自定义配置，兼容 H5、小程序和 App 平台。

## 特性

- 🎯 **多种动画类型**：支持 11 种内置动画效果
- 🔄 **灵活触发方式**：支持点击触发、初始化触发、手动控制
- ⚙️ **高度可配置**：支持动画时长、循环播放等自定义配置
- 📱 **跨平台兼容**：完美支持 H5、小程序、App 平台
- 🎨 **CSS3 动画**：基于 CSS3 动画，性能优异
- 🔧 **Vue3 Composition API**：使用最新的 Vue3 语法

## 安装使用

### 基础用法

```vue
<template>
  <zx-animate type="shake" action="click">
    <zx-button type="primary">点击抖动</zx-button>
  </zx-animate>
</template>

<script setup>
import ZxAnimate from '@/components/zx-animate/zx-animate.vue'
import ZxButton from '@/components/zx-button/zx-button.vue'
</script>
```

### 通过 show 控制动画

```vue
<template>
  <view>
    <zx-button @click="triggerAnimation">触发动画</zx-button>
    <zx-animate :show="showAnimation" type="ripple">
      <zx-button type="success">动画元素</zx-button>
    </zx-animate>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showAnimation = ref(false)

const triggerAnimation = () => {
  showAnimation.value = false
  setTimeout(() => {
    showAnimation.value = true
  }, 100)
}
</script>
```

### 循环动画

```vue
<template>
  <zx-animate type="breath" :loop="true" action="initial">
    <zx-button type="warning">呼吸灯效果</zx-button>
  </zx-animate>
</template>
```

### 滑入动画

```vue
<template>
  <view>
    <zx-animate type="slide-right" action="click">
      <zx-button type="primary">从右滑入</zx-button>
    </zx-animate>
    
    <zx-animate type="slide-left" action="click">
      <zx-button type="primary">从左滑入</zx-button>
    </zx-animate>
    
    <zx-animate type="slide-top" action="click">
      <zx-button type="primary">从上滑入</zx-button>
    </zx-animate>
    
    <zx-animate type="slide-bottom" action="click">
      <zx-button type="primary">从下滑入</zx-button>
    </zx-animate>
  </view>
</template>
```

## API 文档

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 控制动画，当值从 false 变为 true 时会触发一次动画 |
| type | String | 'shake' | 动画类型，见下方 type 值说明 |
| loop | Boolean | false | 是否循环执行。true-循环执行; false-执行一次 |
| duration | Number/String | 1000 | 动画时长，单位 ms |
| action | String | '' | 触发方式，initial-初始化执行; click-点击执行 |

### Events 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| animate | 动画触发时的回调 | - |
| click | 点击元素时触发 | event: Event |

### type 动画类型说明

| 序号 | 参数名称 | 参数说明 | 建议配置 |
| --- | --- | --- | --- |
| 1 | shake | 抖动效果 | 建议 loop 为 false |
| 2 | ripple | 不循环则是放大后缩小，循环则是心跳 | - |
| 3 | breath | 呼吸灯效果 | 建议 loop 为 true |
| 4 | float | 漂浮效果 | 建议 loop 为 true |
| 5 | slide-right | 由右向左划入 | 建议 loop 为 false |
| 6 | slide-left | 由左向右划入 | 建议 loop 为 false |
| 7 | slide-top | 由上至下划入 | 建议 loop 为 false |
| 8 | slide-bottom | 由下至上划入 | 建议 loop 为 false |
| 9 | jump | 跳跃效果 | 建议 loop 为 true |
| 10 | twinkle | 水波效果 | 建议 loop 为 true |
| 11 | flicker | 擦亮按钮效果 | 建议 loop 为 true |

## 使用场景

### 1. 按钮交互反馈

```vue
<zx-animate type="shake" action="click">
  <zx-button type="danger">删除按钮</zx-button>
</zx-animate>
```

### 2. 页面元素入场动画

```vue
<zx-animate type="slide-bottom" action="initial">
  <view class="content-card">
    <!-- 卡片内容 -->
  </view>
</zx-animate>
```

### 3. 状态指示器

```vue
<zx-animate type="breath" :loop="true" action="initial">
  <view class="status-indicator online"></view>
</zx-animate>
```

### 4. 吸引注意力

```vue
<zx-animate type="twinkle" :loop="true" action="initial">
  <zx-badge :value="99">
    <zx-icon name="message"></zx-icon>
  </zx-badge>
</zx-animate>
```

## 注意事项

1. **性能考虑**：循环动画会持续消耗性能，建议在适当时机停止
2. **动画时长**：建议根据动画类型调整合适的时长，过长或过短都会影响用户体验
3. **平台兼容**：所有动画基于 CSS3，在低版本浏览器可能不支持
4. **触发方式**：`show` 和 `action` 不能同时使用，`action` 优先级更高

## 完整示例

查看 [示例页面](../../pages3/animate/index.vue) 了解更多用法。

## 更新日志

### v1.0.0
- 初始版本发布
- 支持 11 种动画类型
- 支持多种触发方式
- 支持循环播放和自定义时长