# zx-movable 可拖拽组件

基于uni-app官方`movable-area`和`movable-view`组件封装的高性能可拖拽组件。

## 特性

- 🚀 高性能拖拽，基于原生组件实现
- 🎯 支持多种拖拽方向（全方向、水平、垂直、禁用）
- 🔄 支持双指缩放手势
- 🎨 丰富的样式自定义选项
- 📱 跨平台兼容（App、H5、各小程序平台）
- 🎮 支持惯性滑动和边界回弹
- 💫 流畅的动画效果
- 🎛️ 灵活的API接口

## 平台兼容性

| App | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 抖音小程序 | QQ小程序 | 快应用 | 360小程序 | 快手小程序 | 京东小程序 | HarmonyOS |
|-----|----|---------|-----------|---------|---------|---------|----|--------|-----------|----------|-----------|
| ✅ | ✅ | ✅       | ✅         | ✅       | ✅       | ✅       | ✅  | ✅      | ✅         | ✅        | ✅        |

## 安装使用

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <zx-movable />
    
    <!-- 自定义大小和内容 -->
    <zx-movable 
      :width="300" 
      :height="200"
      :view-width="80"
      :view-height="80"
      content="拖我试试"
    />
    
    <!-- 支持缩放 -->
    <zx-movable 
      :scale="true"
      :scale-min="0.5"
      :scale-max="3"
    />
    
    <!-- 水平方向拖拽 -->
    <zx-movable direction="horizontal" />
    
    <!-- 使用插槽自定义内容 -->
    <zx-movable>
      <view class="custom-content">
        <text>自定义内容</text>
      </view>
    </zx-movable>
  </view>
</template>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| width | String/Number | 200 | 容器宽度（rpx） |
| height | String/Number | 200 | 容器高度（rpx） |
| viewWidth | String/Number | 50 | 可拖拽元素宽度（rpx） |
| viewHeight | String/Number | 50 | 可拖拽元素高度（rpx） |
| content | String | '' | 默认显示文本 |
| direction | String | 'all' | 移动方向：all/vertical/horizontal/none |
| inertia | Boolean | false | 是否带有惯性 |
| outOfBounds | Boolean | false | 超过边界后是否还可以移动 |
| x | String/Number | 0 | x轴方向偏移 |
| y | String/Number | 0 | y轴方向偏移 |
| damping | Number | 20 | 阻尼系数，控制动画和回弹 |
| friction | Number | 2 | 摩擦系数，控制惯性滑动 |
| disabled | Boolean | false | 是否禁用 |
| scale | Boolean | false | 是否支持双指缩放 |
| scaleMin | Number | 0.5 | 最小缩放倍数 |
| scaleMax | Number | 10 | 最大缩放倍数 |
| scaleValue | Number | 1 | 当前缩放倍数 |
| animation | Boolean | true | 是否使用动画 |
| scaleArea | Boolean | false | 缩放手势生效区域是否为整个movable-area |
| customClass | String | '' | 自定义容器样式类 |
| customStyle | Object/String | {} | 自定义容器样式 |
| viewClass | String | '' | 自定义可拖拽元素样式类 |
| viewCustomStyle | Object/String | {} | 自定义可拖拽元素样式 |
| backgroundColor | String | '#f5f5f5' | 容器背景颜色 |
| viewBackgroundColor | String | '#007aff' | 拖拽元素背景颜色 |
| textColor | String | '#ffffff' | 文字颜色 |
| border | Boolean | true | 是否显示边框 |
| borderRadius | String/Number | 8 | 圆角大小（rpx） |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| change | 拖拽过程中触发 | event对象，包含x、y、source |
| scale | 缩放过程中触发 | event对象 |
| htouchmove | 水平拖拽时触发 | event对象 |
| vtouchmove | 垂直拖拽时触发 | event对象 |
| update:x | x坐标更新时触发（支持v-model:x） | x坐标值 |
| update:y | y坐标更新时触发（支持v-model:y） | y坐标值 |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| moveTo | 移动到指定位置 | (x, y, animated = true) |
| reset | 重置到初始位置 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义拖拽元素内容 |

## 使用示例

### 基础拖拽

```vue
<template>
  <zx-movable 
    :width="300"
    :height="200"
    content="拖拽我"
    @change="handleChange"
  />
</template>

<script setup>
const handleChange = (e) => {
  console.log('位置变化:', e.detail);
};
</script>
```

### 支持缩放

```vue
<template>
  <zx-movable 
    :scale="true"
    :scale-min="0.5"
    :scale-max="4"
    scale-area
    @scale="handleScale"
  />
</template>

<script setup>
const handleScale = (e) => {
  console.log('缩放倍数:', e.detail.scale);
};
</script>
```

### 双向绑定坐标

```vue
<template>
  <view>
    <zx-movable 
      v-model:x="posX"
      v-model:y="posY"
    />
    <text>当前位置: ({{ posX }}, {{ posY }})</text>
    <button @click="moveToCenter">移动到中心</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const posX = ref(0);
const posY = ref(0);
const movableRef = ref();

const moveToCenter = () => {
  movableRef.value.moveTo(75, 75);
};
</script>
```

### 自定义样式

```vue
<template>
  <zx-movable 
    :width="300"
    :height="200"
    :view-width="80"
    :view-height="80"
    background-color="#f0f0f0"
    view-background-color="#ff4757"
    text-color="#ffffff"
    :border-radius="20"
  >
    <view class="custom-drag-item">
      <text class="drag-text">🚀</text>
    </view>
  </zx-movable>
</template>

<style>
.custom-drag-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.drag-text {
  font-size: 30rpx;
}
</style>
```

### 限制拖拽方向

```vue
<template>
  <view>
    <!-- 只能水平拖拽 -->
    <zx-movable 
      direction="horizontal"
      content="水平拖拽"
    />
    
    <!-- 只能垂直拖拽 -->
    <zx-movable 
      direction="vertical"
      content="垂直拖拽"
    />
    
    <!-- 禁用拖拽 -->
    <zx-movable 
      direction="none"
      content="禁用拖拽"
    />
  </view>
</template>
```

### 惯性滑动

```vue
<template>
  <zx-movable 
    :inertia="true"
    :friction="3"
    :damping="15"
    content="惯性滑动"
  />
</template>
```

## 注意事项

1. `movable-area` 必须设置 `width` 和 `height` 属性，不设置默认为 10px
2. 在 app-nvue 平台暂不支持手势缩放，并且和滚动冲突
3. 微信小程序基础库 2.4.4 起支持原生组件在可拖拽组件中的使用
4. 缩放功能仅在支持双指手势的设备上有效
5. 建议在使用时根据实际需求调整 `damping` 和 `friction` 参数以获得最佳体验

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础拖拽功能
- ✨ 支持双指缩放
- ✨ 支持多种拖拽方向
- ✨ 支持样式自定义
- ✨ 支持事件监听和方法调用
