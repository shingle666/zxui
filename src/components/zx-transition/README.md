# ZxTransition 过渡动画组件

一个功能强大的过渡动画组件，支持多种内置动画效果，同时兼容 H5、小程序和 App 平台。

## 特性

- 🎨 **丰富的内置动画**：支持淡入淡出、滑动、缩放等多种动画效果
- 🔧 **高度可定制**：支持自定义动画时长、时间函数、延迟等参数
- 📱 **跨平台兼容**：完美支持 H5、小程序、App 三端
- 🎯 **事件丰富**：提供完整的动画生命周期事件
- 💡 **易于使用**：简洁的 API 设计，开箱即用
- 🚀 **性能优化**：使用 CSS3 动画，性能优异

## 安装使用

### 1. 引入组件

```vue
<template>
  <zx-transition :show="visible" name="fade">
    <view class="content">Hello World</view>
  </zx-transition>
</template>

<script setup>
import { ref } from 'vue'
import ZxTransition from '@/components/zx-transition/zx-transition.vue'

const visible = ref(false)
</script>
```

### 2. 全局注册（可选）

```javascript
// main.js
import ZxTransition from '@/components/zx-transition/zx-transition.vue'

app.component('ZxTransition', ZxTransition)
```

## API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | Boolean | false | 是否显示组件 |
| name | String | 'fade' | 动画名称，支持内置动画或自定义 |
| duration | Number | 300 | 动画持续时间（毫秒） |
| timingFunction | String | 'ease' | 动画时间函数 |
| delay | Number | 0 | 动画延迟时间（毫秒） |
| destroyOnClose | Boolean | false | 关闭时是否销毁元素 |
| enterFromClass | String | - | 自定义进入开始状态类名 |
| enterActiveClass | String | - | 自定义进入过程类名 |
| enterToClass | String | - | 自定义进入结束状态类名 |
| leaveFromClass | String | - | 自定义离开开始状态类名 |
| leaveActiveClass | String | - | 自定义离开过程类名 |
| leaveToClass | String | - | 自定义离开结束状态类名 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| beforeEnter | 进入动画开始前触发 | - |
| enter | 进入动画开始时触发 | - |
| afterEnter | 进入动画结束后触发 | - |
| beforeLeave | 离开动画开始前触发 | - |
| leave | 离开动画开始时触发 | - |
| afterLeave | 离开动画结束后触发 | - |
| click | 点击组件时触发 | event |

## 内置动画

### 淡入淡出系列

- `fade` - 淡入淡出
- `fade-up` - 上滑淡入
- `fade-down` - 下滑淡入
- `fade-left` - 左滑淡入
- `fade-right` - 右滑淡入

### 滑动系列

- `slide-up` - 上滑进入
- `slide-down` - 下滑进入
- `slide-left` - 左滑进入
- `slide-right` - 右滑进入

### 缩放系列

- `zoom` - 放大进入
- `zoom-out` - 缩小进入

## 使用示例

### 基础用法

```vue
<template>
  <view>
    <!-- 淡入淡出 -->
    <zx-transition :show="show1" name="fade">
      <view class="box">淡入淡出动画</view>
    </zx-transition>
    
    <!-- 滑动进入 -->
    <zx-transition :show="show2" name="slide-up">
      <view class="box">上滑进入动画</view>
    </zx-transition>
    
    <!-- 缩放进入 -->
    <zx-transition :show="show3" name="zoom">
      <view class="box">缩放进入动画</view>
    </zx-transition>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
</script>
```

### 自定义动画参数

```vue
<template>
  <zx-transition 
    :show="visible" 
    name="fade"
    :duration="1000"
    timing-function="ease-in-out"
    :delay="200"
  >
    <view class="box">自定义参数动画</view>
  </zx-transition>
</template>
```

### 事件监听

```vue
<template>
  <zx-transition 
    :show="visible" 
    name="slide-up"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
    @click="onClick"
  >
    <view class="box">事件监听示例</view>
  </zx-transition>
</template>

<script setup>
function onBeforeEnter() {
  console.log('进入动画开始前')
}

function onEnter() {
  console.log('进入动画开始')
}

function onAfterEnter() {
  console.log('进入动画结束')
}

function onBeforeLeave() {
  console.log('离开动画开始前')
}

function onLeave() {
  console.log('离开动画开始')
}

function onAfterLeave() {
  console.log('离开动画结束')
}

function onClick(event) {
  console.log('组件被点击', event)
}
</script>
```

### 自定义过渡类名

```vue
<template>
  <zx-transition 
    :show="visible" 
    name="custom"
    enter-from-class="my-enter-from"
    enter-active-class="my-enter-active"
    enter-to-class="my-enter-to"
    leave-from-class="my-leave-from"
    leave-active-class="my-leave-active"
    leave-to-class="my-leave-to"
  >
    <view class="box">自定义过渡效果</view>
  </zx-transition>
</template>

<style>
.my-enter-active,
.my-leave-active {
  transition: all 0.5s ease;
}

.my-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.my-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.my-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.my-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
```

### 销毁模式

```vue
<template>
  <!-- 关闭时销毁元素，适用于复杂组件优化性能 -->
  <zx-transition 
    :show="visible" 
    name="fade"
    :destroy-on-close="true"
  >
    <view class="complex-component">
      <!-- 复杂的组件内容 -->
    </view>
  </zx-transition>
</template>
```

## 动画时间函数

支持所有 CSS 标准的时间函数：

- `linear` - 线性
- `ease` - 缓入缓出（默认）
- `ease-in` - 缓入
- `ease-out` - 缓出
- `ease-in-out` - 缓入缓出
- `cubic-bezier(n,n,n,n)` - 自定义贝塞尔曲线

## 最佳实践

### 1. 性能优化

```vue
<!-- 对于复杂组件，建议开启销毁模式 -->
<zx-transition :show="visible" name="fade" :destroy-on-close="true">
  <heavy-component />
</zx-transition>
```

### 2. 动画组合

```vue
<!-- 可以通过嵌套实现复杂动画效果 -->
<zx-transition :show="visible" name="fade">
  <zx-transition :show="visible" name="slide-up" :delay="100">
    <view class="box">组合动画</view>
  </zx-transition>
</zx-transition>
```

### 3. 响应式设计

```vue
<template>
  <zx-transition 
    :show="visible" 
    name="slide-up"
    :duration="isMobile ? 200 : 300"
  >
    <view class="box">响应式动画</view>
  </zx-transition>
</template>

<script setup>
import { computed } from 'vue'

const isMobile = computed(() => {
  // 判断是否为移动端
  return uni.getSystemInfoSync().platform === 'ios' || 
         uni.getSystemInfoSync().platform === 'android'
})
</script>
```

## 注意事项

1. **兼容性**：组件使用 CSS3 动画，在低版本浏览器中可能不支持
2. **性能**：避免同时运行过多动画，建议控制在 10 个以内
3. **层级**：注意 z-index 层级关系，避免动画元素被遮挡
4. **内存**：对于复杂组件，建议使用 `destroyOnClose` 优化内存使用

## 常见问题

### Q: 动画不生效？
A: 请检查以下几点：
- 确保 `show` 属性正确绑定
- 检查动画名称是否正确
- 确认组件内容不为空

### Q: 如何实现自定义动画？
A: 使用自定义过渡类名：
```vue
<zx-transition 
  name="custom"
  enter-from-class="custom-enter-from"
  enter-active-class="custom-enter-active"
  enter-to-class="custom-enter-to"
>
  <!-- 内容 -->
</zx-transition>
```

### Q: 动画卡顿怎么办？
A: 尝试以下优化方案：
- 减少同时运行的动画数量
- 使用 `transform` 和 `opacity` 属性
- 避免在动画过程中修改布局

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础动画效果
- 支持自定义参数
- 支持事件监听
- 支持自定义过渡类名

## 许可证

MIT License