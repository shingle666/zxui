# zx-navbar 组件优化说明

## 🎉 优化内容

### 1. 功能增强
- ✅ 新增副标题支持 (`subtitle`)
- ✅ 新增透明背景模式 (`transparent`)
- ✅ 新增沉浸式模式 (`immersive`)
- ✅ 新增阴影效果 (`shadow`)
- ✅ 新增加载状态显示 (`loading`)
- ✅ 新增主题模式支持 (`theme`: light/dark/auto)
- ✅ 新增禁用状态 (`leftDisabled`, `rightDisabled`)
- ✅ 新增右侧图标大小和颜色控制
- ✅ 新增层级控制 (`zIndex`)
- ✅ 新增按钮交互时间控制 (`hoverTime`)

### 2. 样式改进
- ✅ 移除硬编码的背景色 `#9acafc`
- ✅ 改进布局逻辑，支持更灵活的中央区域定位
- ✅ 新增过渡动画效果
- ✅ 新增响应式设计支持
- ✅ 新增暗色模式适配
- ✅ 改进图标和文字的间距

### 3. 用户体验优化
- ✅ 增加无障碍支持 (`aria-label`, `role`)
- ✅ 改进错误处理和容错机制
- ✅ 优化点击反馈效果
- ✅ 新增加载状态动画

### 4. 代码质量提升
- ✅ 使用 Composition API 重构
- ✅ 改进 TypeScript 支持
- ✅ 优化性能，减少不必要的计算
- ✅ 改进事件处理机制
- ✅ 增强属性验证

## 📖 使用指南

### 基础用法

```vue
<template>
  <zx-navbar 
    title="页面标题"
    left-text="返回"
    right-text="更多"
    @left-click="onBack"
    @right-click="onMore"
  />
</template>
```

### 高级功能

#### 1. 副标题支持
```vue
<zx-navbar 
  title="主标题"
  subtitle="副标题说明"
/>
```

#### 2. 透明背景
```vue
<zx-navbar 
  title="透明导航栏"
  :transparent="true"
  left-icon="arrow-left"
/>
```

#### 3. 沉浸式模式
```vue
<zx-navbar 
  title="沉浸式导航栏"
  :immersive="true"
  :shadow="true"
/>
```

#### 4. 主题模式
```vue
<!-- 暗色主题 -->
<zx-navbar 
  title="暗色主题"
  theme="dark"
  bg-color="#1f1f1f"
/>

<!-- 自动主题（跟随系统） -->
<zx-navbar 
  title="自动主题"
  theme="auto"
/>
```

#### 5. 加载状态
```vue
<zx-navbar 
  title="正在加载..."
  :loading="true"
  :left-disabled="true"
/>
```

#### 6. 自定义插槽
```vue
<zx-navbar>
  <template #left>
    <view class="custom-left">
      <zx-icon name="home" />
      <text>首页</text>
    </view>
  </template>
  
  <template #center>
    <view class="custom-center">
      <image src="/logo.png" />
      <text>品牌名称</text>
    </view>
  </template>
  
  <template #right>
    <view class="custom-right">
      <zx-icon name="search" />
      <zx-icon name="cart" />
    </view>
  </template>
</zx-navbar>
```

## 🔧 API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | String/Number | '' | 导航栏标题 |
| subtitle | String | '' | 导航栏副标题 |
| bgColor | String | '#ffffff' | 背景颜色 |
| theme | String | 'light' | 主题模式：light/dark/auto |
| transparent | Boolean | false | 是否透明背景 |
| immersive | Boolean | false | 是否沉浸式模式 |
| shadow | Boolean | false | 是否显示阴影 |
| loading | Boolean | false | 是否显示加载状态 |
| fixed | Boolean | false | 是否固定在顶部 |
| placeholder | Boolean | true | 固定时是否生成占位元素 |
| safeAreaInsetTop | Boolean | true | 是否开启顶部安全区适配 |
| border | Boolean | false | 是否显示底部边框 |
| borderColor | String | '#ececec' | 边框颜色 |
| height | String/Number | '44px' | 导航栏高度 |
| zIndex | Number | 980 | 层级 |
| autoBack | Boolean | true | 是否自动返回 |
| leftIcon | String | 'arrow-left' | 左侧图标 |
| leftText | String | '' | 左侧文字 |
| leftIconSize | String/Number | '36rpx' | 左侧图标大小 |
| leftIconColor | String | '#303133' | 左侧图标颜色 |
| leftDisabled | Boolean | false | 是否禁用左侧 |
| rightIcon | String | '' | 右侧图标 |
| rightText | String | '' | 右侧文字 |
| rightIconSize | String/Number | '36rpx' | 右侧图标大小 |
| rightIconColor | String | '#303133' | 右侧图标颜色 |
| rightDisabled | Boolean | false | 是否禁用右侧 |
| titleWidth | String/Number | '400rpx' | 标题最大宽度 |
| titleStyle | Object/String | null | 标题样式 |
| subtitleStyle | Object/String | null | 副标题样式 |
| hoverTime | Number | 150 | 按钮按下时间 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| left-click | 点击左侧区域 | - |
| right-click | 点击右侧区域 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| left | 左侧内容 |
| center | 中央内容 |
| right | 右侧内容 |

## 🎨 样式定制

### CSS 变量
```css
.zx-navbar {
  --navbar-height: 44px;
  --navbar-bg-color: #ffffff;
  --navbar-text-color: #303133;
  --navbar-icon-size: 36rpx;
  --navbar-padding: 32rpx;
}
```

### 主题定制
```vue
<template>
  <zx-navbar 
    :title-style="customTitleStyle"
    :subtitle-style="customSubtitleStyle"
  />
</template>

<script setup>
const customTitleStyle = {
  fontSize: '40rpx',
  fontWeight: 'bold',
  color: '#333333'
};

const customSubtitleStyle = {
  fontSize: '24rpx',
  color: '#999999'
};
</script>
```

## 🔍 最佳实践

### 1. 响应式使用
```vue
<zx-navbar 
  :title="title"
  :loading="isLoading"
  :left-disabled="isLoading"
  @left-click="handleBack"
/>
```

### 2. 主题适配
```vue
<zx-navbar 
  theme="auto"
  :bg-color="isDark ? '#1f1f1f' : '#ffffff'"
  :left-icon-color="isDark ? '#ffffff' : '#333333'"
/>
```

### 3. 错误处理
```vue
<script setup>
const handleBack = () => {
  try {
    if (canGoBack) {
      uni.navigateBack();
    } else {
      uni.reLaunch({ url: '/pages/index/index' });
    }
  } catch (error) {
    console.error('导航失败:', error);
  }
};
</script>
```

## 🚀 迁移指南

### 从旧版本迁移

1. **事件名称变更**
   ```vue
   <!-- 旧版本 -->
   @click-left="onBack"
   @click-right="onMore"
   
   <!-- 新版本 -->
   @left-click="onBack"
   @right-click="onMore"
   ```

2. **默认值变更**
   - `placeholder` 默认值从 `false` 改为 `true`
   - `autoBack` 默认值从 `false` 改为 `true`

3. **样式更新**
   - 移除了硬编码的蓝色背景
   - 改进了图标和文字的间距

## 🐛 注意事项

1. 使用 `immersive` 模式时，需要确保系统支持 `backdrop-filter`
2. `auto` 主题模式需要浏览器支持 `prefers-color-scheme`
3. 固定导航栏时建议开启 `placeholder` 避免内容被遮挡
4. 自定义插槽时需要注意样式兼容性

## 📝 更新日志

### v2.0.0 (最新)
- 🎉 全面重构，使用 Composition API
- ✨ 新增副标题、透明背景、沉浸式等功能
- 🎨 改进样式系统，支持主题切换
- 🔧 优化性能和用户体验
- 📱 增强响应式和无障碍支持

### v1.0.0 (原版本)
- 基础导航栏功能
- 支持标题、左右按钮
- 固定定位和安全区适配
