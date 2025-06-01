# ZxTransition 过渡动画组件

## 简介

ZxTransition 是一个基于 Vue 3 Composition API 的过渡动画组件，支持多种内置动画效果，兼容 H5、小程序、App 等多个平台。

## 特性

- 🎯 支持多种内置动画效果
- 🔧 基于 Vue 3 Composition API
- 📱 兼容 H5、小程序、App 平台
- 🎨 支持自定义动画样式
- ⚡ 高性能动画实现
- 🛠 支持动画队列和自定义动画

## 安装使用

### 基本用法

```vue
<template>
  <view>
    <zx-transition :show="show" mode-class="fade">
      <view class="content">淡入淡出动画</view>
    </zx-transition>
    
    <button @click="toggle">切换显示</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)

const toggle = () => {
  show.value = !show.value
}
</script>
```

### 多种动画效果

```vue
<template>
  <view>
    <!-- 滑动动画 -->
    <zx-transition :show="show1" mode-class="slide-top">
      <view class="box">从上滑入</view>
    </zx-transition>
    
    <!-- 缩放动画 -->
    <zx-transition :show="show2" mode-class="zoom-in">
      <view class="box">缩放进入</view>
    </zx-transition>
    
    <!-- 组合动画 -->
    <zx-transition :show="show3" :mode-class="['fade', 'slide-top']">
      <view class="box">组合动画</view>
    </zx-transition>
  </view>
</template>
```

### 自定义动画

```vue
<template>
  <zx-transition ref="transitionRef" :show="false">
    <view class="box">自定义动画</view>
  </zx-transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const transitionRef = ref(null)

onMounted(() => {
  // 初始化动画配置
  transitionRef.value.init({
    duration: 500,
    timingFunction: 'ease-in-out'
  })
  
  // 执行自定义动画
  transitionRef.value
    .step({
      translateX: [100],
      opacity: [0.5]
    })
    .step({
      translateX: [0],
      opacity: [1]
    })
    .run(() => {
      console.log('动画执行完成')
    })
})
</script>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | Boolean | false | 控制组件显示或隐藏 |
| mode-class | String/Array | 'fade' | 内置过渡动画类型 |
| duration | Number | 300 | 过渡动画持续时间(ms) |
| styles | Object | {} | 组件样式，注意驼峰命名 |
| custom-class | String | '' | 自定义类名 |
| once-render | Boolean | false | 是否只渲染一次 |

### 内置动画类型 (mode-class)

| 值 | 说明 |
|----|------|
| fade | 渐隐渐出过渡 |
| slide-top | 由上至下过渡 |
| slide-right | 由右至左过渡 |
| slide-bottom | 由下至上过渡 |
| slide-left | 由左至右过渡 |
| zoom-in | 由小到大过渡 |
| zoom-out | 由大到小过渡 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击组件时触发 | {detail: Boolean} |
| change | 过渡动画结束时触发 | {detail: Boolean} |

### Methods

通过 ref 调用组件方法：

#### init(config)

手动初始化动画配置

**参数：**
- config (Object): 动画配置对象

```javascript
transitionRef.value.init({
  duration: 500,
  timingFunction: 'ease-in-out',
  delay: 100,
  transformOrigin: 'center center'
})
```

#### step(animations, config)

添加动画步骤到队列

**参数：**
- animations (Object): 动画属性对象
- config (Object): 可选，当前步骤的配置

```javascript
transitionRef.value.step({
  translateX: [100],
  opacity: [0.5],
  rotate: [45]
}, {
  duration: 300
})
```

#### run(callback)

执行动画队列

**参数：**
- callback (Function): 可选，动画完成后的回调函数

```javascript
transitionRef.value.run(() => {
  console.log('动画执行完成')
})
```

## 动画配置

### 配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| duration | Number | 300 | 动画持续时间(ms) |
| timingFunction | String | 'ease' | 动画缓动函数 |
| delay | Number | 0 | 动画延迟时间(ms) |
| transformOrigin | String | '50% 50%' | 变换原点 |

### 缓动函数 (timingFunction)

| 值 | 说明 |
|----|------|
| linear | 匀速动画 |
| ease | 慢速开始，然后变快，然后慢速结束 |
| ease-in | 慢速开始的动画 |
| ease-out | 慢速结束的动画 |
| ease-in-out | 慢速开始和结束的动画 |

### 支持的动画属性

#### 变换动画
- opacity: 透明度
- translateX/translateY/translateZ: 平移
- scaleX/scaleY/scale: 缩放
- rotateX/rotateY/rotateZ/rotate: 旋转
- skewX/skewY: 倾斜

#### 样式动画
- width/height: 宽高
- backgroundColor: 背景色
- left/right/top/bottom: 定位

## 注意事项

1. **平台兼容性**：组件已针对不同平台进行适配，在 NVUE 环境下使用原生动画
2. **性能优化**：避免在动画执行过程中频繁修改 props
3. **动画队列**：使用 step() 方法时，需要调用 run() 才能执行动画
4. **样式命名**：styles 属性中的 CSS 属性需要使用驼峰命名法
5. **旋转动画**：rotate 相关动画不需要添加 deg 单位

## 示例场景

### 弹窗动画

```vue
<zx-transition :show="showModal" mode-class="fade">
  <view class="modal-overlay" @click="closeModal">
    <zx-transition :show="showModal" mode-class="zoom-in">
      <view class="modal-content" @click.stop>
        <!-- 弹窗内容 -->
      </view>
    </zx-transition>
  </view>
</zx-transition>
```

### 列表项动画

```vue
<view v-for="(item, index) in list" :key="item.id">
  <zx-transition 
    :show="item.visible" 
    mode-class="slide-left"
    :duration="200 + index * 50"
  >
    <view class="list-item">{{ item.title }}</view>
  </zx-transition>
</view>
```

### 页面切换动画

```vue
<zx-transition :show="currentPage === 'home'" mode-class="slide-right">
  <HomePage />
</zx-transition>
<zx-transition :show="currentPage === 'profile'" mode-class="slide-left">
  <ProfilePage />
</zx-transition>
```