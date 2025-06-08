# ZX-Sticky 吸顶组件

一个功能强大的 Vue 3 吸顶组件，适用于 uni-app 项目。

## 功能特性

- ✅ 支持自定义吸顶位置和偏移量
- ✅ 自动添加占位元素，防止页面跳动
- ✅ 内置过渡动画效果
- ✅ 防抖处理，优化性能
- ✅ 支持多平台兼容（微信小程序、H5、APP等）
- ✅ 丰富的配置选项和事件回调
- ✅ 支持动态禁用/启用

## 基础用法

```vue
<template>
  <scroll-view 
    scroll-y 
    @scroll="onScroll"
    style="height: 100vh;"
  >
    <!-- 其他内容 -->
    <view style="height: 500rpx; background: #f0f0f0;">
      滚动内容区域
    </view>
    
    <!-- 吸顶组件 -->
    <zx-sticky 
      :scroll-top="scrollTop"
      @sticky-change="onStickyChange"
    >
      <view style="text-align: center; padding: 20rpx;">
        这是吸顶内容
      </view>
    </zx-sticky>
    
    <!-- 更多内容 -->
    <view style="height: 1000rpx; background: #e0e0e0;">
      更多滚动内容
    </view>
  </scroll-view>
</template>

<script setup>
import { ref } from 'vue'

const scrollTop = ref(0)

const onScroll = (e) => {
  scrollTop.value = e.detail.scrollTop
}

const onStickyChange = (data) => {
  console.log('吸顶状态改变:', data)
}
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| scrollTop | Number | 0 | 当前滚动距离 |
| offsetTop | Number | 0 | 吸顶时与顶部的距离 |
| backgroundColor | String | '#ffffff' | 背景颜色 |
| zIndex | Number | 9999 | 层级 |
| width | String | '750rpx' | 组件宽度 |
| height | String | '120rpx' | 组件高度 |
| enableTransition | Boolean | true | 是否启用过渡动画 |
| debounceDelay | Number | 16 | 防抖延迟时间（毫秒） |
| includeStatusBar | Boolean | true | 是否包含状态栏高度 |
| includeCapsule | Boolean | true | 是否包含胶囊高度 |
| threshold | Number | 0 | 自定义吸顶触发阈值 |
| disabled | Boolean | false | 是否禁用组件 |

## Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| sticky-change | { isSticky, scrollTop, triggerPoint } | 吸顶状态改变时触发 |
| ready | { topHeight, elementHeight, statusBarHeight, capsuleHeight } | 组件初始化完成时触发 |
| error | Error | 组件初始化失败时触发 |

## Methods 方法

通过 ref 可以调用以下方法：

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| refresh | - | Promise | 重新初始化组件 |

## 计算属性

通过 ref 可以访问以下计算属性：

| 属性名 | 类型 | 说明 |
|--------|------|------|
| isSticky | Boolean | 当前是否处于吸顶状态 |
| isReady | Boolean | 组件是否准备就绪 |
| topHeight | Number | 组件距离顶部的高度 |
| elementHeight | Number | 组件实际高度 |

## 高级用法

### 1. 自定义样式和动画

```vue
<template>
  <zx-sticky 
    :scroll-top="scrollTop"
    :enable-transition="true"
    background-color="#ff6b6b"
    z-index="10000"
  >
    <view class="custom-content">
      自定义样式内容
    </view>
  </zx-sticky>
</template>

<style>
.custom-content {
  padding: 30rpx;
  color: white;
  font-weight: bold;
  text-align: center;
}
</style>
```

### 2. 监听组件状态

```vue
<template>
  <zx-sticky 
    ref="stickyRef"
    :scroll-top="scrollTop"
    @ready="onReady"
    @sticky-change="onStickyChange"
    @error="onError"
  >
    <view>内容</view>
  </zx-sticky>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stickyRef = ref()

const onReady = (data) => {
  console.log('组件就绪:', data)
}

const onStickyChange = ({ isSticky, scrollTop, triggerPoint }) => {
  console.log(`吸顶状态: ${isSticky}, 滚动位置: ${scrollTop}, 触发点: ${triggerPoint}`)
}

const onError = (error) => {
  console.error('组件错误:', error)
}

onMounted(() => {
  // 访问组件状态
  console.log('是否吸顶:', stickyRef.value.isSticky)
  console.log('是否就绪:', stickyRef.value.isReady)
})
</script>
```

### 3. 动态控制

```vue
<template>
  <view>
    <button @click="toggleDisabled">
      {{ isDisabled ? '启用' : '禁用' }} 吸顶
    </button>
    
    <button @click="refreshComponent">
      刷新组件
    </button>
    
    <zx-sticky 
      ref="stickyRef"
      :scroll-top="scrollTop"
      :disabled="isDisabled"
      :threshold="50"
    >
      <view>可控制的吸顶内容</view>
    </zx-sticky>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const stickyRef = ref()
const isDisabled = ref(false)

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
}

const refreshComponent = async () => {
  await stickyRef.value.refresh()
  console.log('组件已刷新')
}
</script>
```

### 4. 多个吸顶组件

```vue
<template>
  <scroll-view @scroll="onScroll">
    <!-- 第一个吸顶区域 -->
    <zx-sticky 
      :scroll-top="scrollTop"
      :offset-top="0"
      background-color="#ff6b6b"
    >
      <view>顶部导航</view>
    </zx-sticky>
    
    <!-- 第二个吸顶区域 -->
    <zx-sticky 
      :scroll-top="scrollTop"
      :offset-top="80"
      background-color="#4ecdc4"
    >
      <view>子导航</view>
    </zx-sticky>
    
    <!-- 内容区域 -->
    <view style="height: 2000rpx;">
      长内容区域
    </view>
  </scroll-view>
</template>
```

## 注意事项

1. **滚动容器**: 确保将 `scrollTop` 正确传递给组件
2. **性能优化**: 组件内置了防抖处理，默认 16ms 延迟
3. **平台兼容**: 自动处理不同平台的状态栏和胶囊高度差异
4. **样式覆盖**: 可以通过 CSS 变量或深度选择器自定义样式
5. **动态内容**: 如果内容高度会动态变化，调用 `refresh()` 方法重新计算

## 浏览器兼容性

- ✅ 微信小程序
- ✅ 支付宝小程序  
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ H5
- ✅ App (iOS/Android)

## 更新日志

### v2.0.0
- 新增占位元素，防止页面跳动
- 新增过渡动画效果
- 新增防抖处理优化性能
- 新增丰富的配置选项
- 新增事件回调和方法暴露
- 改进错误处理和兼容性
