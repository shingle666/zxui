# zx-switch 开关组件

一个功能完善的开关选择器组件，适用于 uni-app 项目。

## 特性

- 🎨 多种尺寸支持（large/default/small 或自定义数值）
- 🎯 完整的 v-model 双向绑定
- 🎪 丰富的自定义选项（颜色、文字、值等）
- ⚡ 加载状态支持
- 🔒 禁用状态支持
- 🎣 切换前钩子函数
- ♿ 无障碍访问支持
- 🎭 平滑的动画过渡
- 📱 全平台兼容

## 基础用法

```vue
<template>
  <zx-switch v-model="value" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'
import zxSwitch from '@/components/zx-switch/zx-switch.vue'

const value = ref(false)

const handleChange = (val) => {
  console.log('开关状态：', val)
}
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Boolean/String/Number | false | v-model 绑定值 |
| value | Boolean/String/Number | undefined | 兼容旧版本的绑定值 |
| size | String/Number | 'default' | 尺寸，可选 large/default/small 或数字 |
| disabled | Boolean | false | 是否禁用 |
| loading | Boolean | false | 是否显示加载状态 |
| activeColor | String | '#2979ff' | 开启时的背景色 |
| inactiveColor | String | '#dcdfe6' | 关闭时的背景色 |
| activeValue | Boolean/String/Number | true | 开启时的值 |
| inactiveValue | Boolean/String/Number | false | 关闭时的值 |
| activeText | String | '' | 开启时显示的文字 |
| inactiveText | String | '' | 关闭时显示的文字 |
| showText | Boolean | false | 是否显示文字 |
| textColor | String | '#ffffff' | 文字颜色 |
| beforeChange | Function | null | 切换前的钩子函数 |
| ariaLabel | String | '' | 无障碍标签 |
| customStyle | Object | {} | 自定义样式 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 开关状态改变时触发 | (value: Boolean/String/Number) |
| update:modelValue | v-model 更新事件 | (value: Boolean/String/Number) |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| focus | 手动聚焦 | - |
| labelClick | 提供给 zx-label 调用 | - |

## 示例

### 不同尺寸

```vue
<template>
  <zx-switch v-model="value" size="large" />
  <zx-switch v-model="value" size="default" />
  <zx-switch v-model="value" size="small" />
  <zx-switch v-model="value" :size="35" />
</template>
```

### 自定义颜色

```vue
<template>
  <zx-switch 
    v-model="value" 
    active-color="#13ce66" 
    inactive-color="#ff4949" 
  />
</template>
```

### 显示文字

```vue
<template>
  <zx-switch 
    v-model="value" 
    :show-text="true"
    active-text="开启"
    inactive-text="关闭"
    size="large"
  />
</template>
```

### 自定义值

```vue
<template>
  <zx-switch 
    v-model="status" 
    active-value="yes" 
    inactive-value="no" 
  />
</template>

<script setup>
import { ref } from 'vue'

const status = ref('no') // 'yes' 或 'no'
</script>
```

### 加载状态

```vue
<template>
  <zx-switch 
    v-model="value" 
    :loading="loading" 
    @change="handleAsyncChange" 
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)
const loading = ref(false)

const handleAsyncChange = async (val) => {
  loading.value = true
  
  try {
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('切换成功')
  } finally {
    loading.value = false
  }
}
</script>
```

### 切换前确认

```vue
<template>
  <zx-switch 
    v-model="value" 
    :before-change="beforeChange" 
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(false)

const beforeChange = () => {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '确认',
      content: '确定要切换开关状态吗？',
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          reject(false)
        }
      }
    })
  })
}
</script>
```

### 禁用状态

```vue
<template>
  <zx-switch v-model="value" :disabled="true" />
</template>
```

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.zx-switch {
  /* 自定义焦点颜色 */
  --focus-color: rgba(41, 121, 255, 0.1);
}
```

## 注意事项

1. **兼容性**：支持所有 uni-app 平台
2. **v-model**：优先使用 `modelValue`，向下兼容 `value` 属性
3. **尺寸单位**：使用 rpx 作为单位，自动适配不同屏幕
4. **动画**：内置平滑过渡动画，提升用户体验
5. **无障碍**：支持 ARIA 标签和键盘操作

## 更新日志

### v2.0.0
- 重构组件架构
- 新增 loading 状态支持
- 新增 beforeChange 钩子
- 新增多种尺寸选项
- 新增文字显示功能
- 新增无障碍支持
- 优化动画效果
- 完善类型定义

### v1.0.0
- 基础开关功能
- 自定义颜色支持
- 禁用状态支持
