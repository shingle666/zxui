# zx-progress 进度条组件

基于 uni-app 官方 progress 组件规范优化的进度条组件，支持动画效果和自定义样式。

## 特性

- ✅ 完全兼容 uni-app 官方 progress 组件属性
- ✅ 支持动画效果（active 模式）
- ✅ 支持两种动画模式：backwards（从头播放）和 forwards（从上次结束点继续）
- ✅ 支持 rpx 和 px 单位
- ✅ 支持渐变色
- ✅ 提供动画完成回调
- ✅ 向后兼容旧版本属性
- ✅ 暴露控制方法

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 | 
|--------|------|--------|------|
| percent | Number/String | 0 | 百分比 0-100 |
| showInfo | Boolean | false | 右侧是否显示百分比 |
| borderRadius | Number/String | 0 | 圆角大小，支持 rpx 和 px |
| fontSize | Number/String | 16 | 右侧百分比字体大小，支持 rpx 和 px |
| color | String | '#333' | 右侧百分比颜色 |
| percentWidth | Number/String | 96 | 右侧百分比宽度 |
| strokeWidth | Number/String | 6 | 进度条线条宽度，支持 rpx 和 px |
| activeColor | String | '#09BB07' | 已选进度条颜色，支持渐变 |
| backgroundColor | String | '#EBEBEB' | 未选择的进度条颜色 |
| active | Boolean | false | 进度条从左往右的动画 |
| activeMode | String | 'backwards' | 动画模式：'backwards'(从头播) / 'forwards'(从上次结束点接着播) |
| duration | Number | 30 | 进度增加1%所需毫秒数 |

## 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| @activeend | 动画完成事件 | { percent: Number } |

## 暴露方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| startAnimation | 手动触发动画 | - |
| reset | 重置进度条 | - |

## 基础用法

```vue
<template>
  <view>
    <!-- 基础进度条 -->
    <zx-progress :percent="30" />
    
    <!-- 显示百分比 -->
    <zx-progress :percent="50" :showInfo="true" />
    
    <!-- 自定义样式 -->
    <zx-progress 
      :percent="70" 
      :showInfo="true"
      strokeWidth="10"
      borderRadius="5rpx"
      activeColor="linear-gradient(to right, #4facfe, #00f2fe)"
      backgroundColor="#f0f0f0"
    />
    
    <!-- 动画效果 -->
    <zx-progress 
      :percent="80" 
      :active="true"
      :duration="50"
      @activeend="onAnimationEnd"
    />
  </view>
</template>

<script setup>
const onAnimationEnd = (e) => {
  console.log('动画完成，当前进度：', e.percent);
};
</script>
```

## 高级用法

```vue
<template>
  <view>
    <!-- 控制动画 -->
    <zx-progress 
      ref="progressRef"
      :percent="progressValue" 
      :active="true"
      activeMode="forwards"
    />
    
    <button @click="updateProgress">更新进度</button>
    <button @click="resetProgress">重置进度</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const progressRef = ref();
const progressValue = ref(0);

const updateProgress = () => {
  progressValue.value = Math.random() * 100;
};

const resetProgress = () => {
  progressRef.value?.reset();
  progressValue.value = 0;
};
</script>
```

## 渐变色用法

```vue
<template>
  <zx-progress 
    :percent="60"
    :showInfo="true"
    strokeWidth="12"
    borderRadius="6rpx"
    activeColor="linear-gradient(90deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)"
  />
</template>
```

## 兼容性说明

本组件完全兼容 uni-app 官方 progress 组件的属性，同时保持向后兼容：

- `showInfo` 属性保持支持（官方为 `show-info`）
- 新增了官方规范的 `borderRadius`、`fontSize`、`strokeWidth` 属性
- 新增了 `active`、`activeMode` 动画相关属性
- 保持原有的 `percentWidth` 自定义属性

## 注意事项

1. 单位支持：`Number` 类型默认为 rpx，`String` 类型需要带单位（如 '20px'）
2. 动画模式：
   - `backwards`：每次都从 0% 开始播放动画
   - `forwards`：从当前位置继续播放到目标位置
3. 渐变色：支持 CSS 渐变语法，如 `linear-gradient()` 等
