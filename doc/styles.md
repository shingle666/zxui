# CSS兼容性工具使用指南

## 概述

`compatibility.scss` 文件提供了一套CSS兼容性工具，专门用于解决uni-app多平台环境下的CSS transform兼容性问题。

## 主要功能

### 1. Transform混合器
提供了跨浏览器兼容的transform属性支持：

```scss
// 在组件中使用
@use '@/styles/compatibility.scss' as compat;

.my-element {
  @include compat.transform(rotate(45deg));
  @include compat.uni-transform(translateX(100px));
}
```

### 2. Scale功能
提供了安全的scale变换：

```scss
.my-element {
  @include compat.css-scale(0.95);
  @include compat.uni-scale(1.1);
}
```

### 3. 过渡动画
提供了transform过渡动画支持：

```scss
.my-element {
  @include compat.scale-transition(0.3s, ease-out);
}
```

### 4. 预定义工具类
直接在HTML中使用的CSS类：

```html
<!-- 直接应用scale效果 -->
<view class="scale-95">缩放到95%</view>
<view class="scale-hover">悬停时缩放</view>
<view class="btn-scale">按钮点击缩放</view>
<view class="card-scale">卡片悬停缩放</view>
```

## 使用方法

### 1. 在Vue组件中使用

```vue
<template>
  <view class="my-component">
    <view class="scalable-item">可缩放元素</view>
  </view>
</template>

<style lang="scss" scoped>
@use '@/styles/compatibility.scss' as compat;

.scalable-item {
  @include compat.scale-transition();
  
  &:active {
    @include compat.uni-scale(0.95);
  }
}
</style>
```

### 2. 针对不同平台的优化

`uni-transform` 和 `uni-scale` 混合器会根据编译平台自动应用合适的CSS前缀：

- **小程序平台**: 使用标准的transform属性
- **H5平台**: 添加完整的浏览器前缀
- **APP平台**: 使用标准的transform属性

## 解决的问题

1. **浏览器兼容性**: 自动添加-webkit-、-moz-等前缀
2. **uni-app平台差异**: 针对不同平台输出优化的CSS
3. **Sass函数冲突**: 避免与Sass内置scale()函数的命名冲突
4. **性能优化**: 使用will-change和GPU加速

## 注意事项

1. 使用现代的`@use`语法导入，避免弃用警告
2. 为混合器指定命名空间（如`compat`）
3. 优先使用`uni-*`系列混合器以获得最佳跨平台兼容性
4. 避免在同一个文件中重复导入 