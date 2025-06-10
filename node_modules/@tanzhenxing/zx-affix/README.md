# zx-affix 固钉组件

将页面元素固定在特定可视区域，参考 Element Plus Affix 组件优化实现。

## 特性

- 🎯 支持顶部和底部固定
- 📦 可指定容器范围
- 🎨 平滑的过渡动画
- 📱 响应式支持
- 🔧 完整的 API 接口
- 💪 TypeScript 友好

## 基础用法

```vue
<template>
  <zx-affix :offset="120">
    <button>固定按钮</button>
  </zx-affix>
</template>
```

## 指定容器

```vue
<template>
  <view class="container" id="myContainer">
    <zx-affix target="#myContainer" :offset="80">
      <button>容器固钉</button>
    </zx-affix>
  </view>
</template>
```

## 底部固定

```vue
<template>
  <zx-affix position="bottom" :offset="20">
    <button>底部固定</button>
  </zx-affix>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|-------|
| offset | 偏移距离 | `number` | 0 |
| position | 固钉位置 | `'top' \| 'bottom'` | 'top' |
| target | 指定容器（CSS 选择器） | `string` | '' |
| zIndex | 层级 | `number` | 100 |
| customClass | 自定义类名 | `string` | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 固钉状态改变时触发 | `(fixed: boolean) => void` |
| scroll | 滚动时触发 | `(info: ScrollInfo) => void` |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| update | 手动更新固钉状态 | - |
| updateRoot | 手动更新根元素的盒模型信息 | - |

### ScrollInfo

```typescript
interface ScrollInfo {
  scrollTop: number;  // 滚动距离
  fixed: boolean;     // 是否固定
  rect: DOMRect;      // 元素位置信息
}
```

## 示例

### 完整示例

```vue
<template>
  <view class="demo">
    <!-- 基础用法 -->
    <zx-affix 
      :offset="120" 
      @change="handleChange"
      @scroll="handleScroll"
    >
      <view class="affix-button">
        固定按钮
      </view>
    </zx-affix>

    <!-- 指定容器 -->
    <view class="container" id="container">
      <zx-affix target="#container" :offset="80">
        <view class="affix-button">
          容器固钉
        </view>
      </zx-affix>
    </view>

    <!-- 底部固定 -->
    <zx-affix position="bottom" :offset="20">
      <view class="affix-button">
        底部固定
      </view>
    </zx-affix>
  </view>
</template>

<script setup>
const handleChange = (fixed) => {
  console.log('固钉状态:', fixed);
};

const handleScroll = (info) => {
  console.log('滚动信息:', info);
};
</script>

<style>
.affix-button {
  padding: 12px 24px;
  background: #409eff;
  color: white;
  border-radius: 4px;
  text-align: center;
}

.container {
  height: 400px;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;
}
</style>
```

## 注意事项

1. **容器滚动**: 指定容器时，容器应避免出现滚动条
2. **性能优化**: 内置防抖处理，避免频繁更新
3. **兼容性**: 支持 uni-app 全平台
4. **事件清理**: 组件卸载时自动清理事件监听

## 常见问题

### Q: 固钉不生效？
A: 请确保页面有足够的滚动空间，并检查 offset 值是否合理。

### Q: 指定容器模式下固钉异常？
A: 请确保 target 选择器正确，且容器有明确的高度和位置。

### Q: 如何自定义样式？
A: 使用 customClass 属性添加自定义类名，或直接在插槽内容中设置样式。

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础固钉功能
- ✨ 支持容器指定
- ✨ 支持顶部/底部固定
- ✨ 添加动画效果
