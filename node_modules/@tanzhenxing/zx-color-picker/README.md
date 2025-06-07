# ZX Color Picker 颜色选择器

一个功能完整的 Vue 3 颜色选择器组件，参考 Element Plus 设计规范实现。

## 特性

- 🎨 支持多种颜色格式输出（HEX、RGB、HSL、HSV）
- 🌈 支持透明度（Alpha）选择
- 📦 预定义颜色快速选择
- 📐 多种尺寸支持（large、default、small）
- 🔧 完整的事件系统
- ♿ 无障碍访问支持
- 🖱️ 键盘导航支持
- 📱 响应式设计

## 基础用法

```vue
<template>
  <div>
    <!-- 基础用法 -->
    <zx-color-picker v-model="color" />
    
    <!-- 支持透明度 -->
    <zx-color-picker v-model="colorWithAlpha" show-alpha />
    
    <!-- 预定义颜色 -->
    <zx-color-picker 
      v-model="color" 
      :predefine="predefineColors" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ZxColorPicker from './zx-color-picker.vue'

const color = ref('#409EFF')
const colorWithAlpha = ref('rgba(64, 158, 255, 0.8)')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585'
]
</script>
```

## API

### Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|-------|------|------|--------|--------|
| model-value / v-model | 绑定值 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| size | 尺寸 | string | large / default / small | default |
| show-alpha | 是否支持透明度选择 | boolean | — | false |
| color-format | 写入 v-model 的颜色格式 | string | hsl / hsv / hex / rgb | rgb |
| popper-class | ColorPicker 下拉框的类名 | string | — | — |
| predefine | 预定义颜色 | array | — | — |
| validate-event | 输入时是否触发表单的校验 | boolean | — | true |
| tabindex | ColorPicker 的 tabindex | string / number | — | 0 |
| aria-label | ColorPicker 的 aria-label | string | — | — |
| id | ColorPicker 的 id | string | — | — |
| teleported | 是否将弹出框内容渲染至 body 下 | boolean | — | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当绑定值变化时触发 | 当前值 |
| active-change | 面板中当前显示的颜色发生改变时触发 | 当前值 |
| focus | 当获得焦点时触发 | event |
| blur | 当失去焦点时触发 | event |

### Exposes

| 方法名 | 说明 | 参数 |
|--------|------|------|
| color | 当前色彩对象 | — |
| show | 手动显示颜色选择器 | — |
| hide | 手动隐藏颜色选择器 | — |
| focus | 使 picker 获得焦点 | — |
| blur | 使 picker 失去焦点 | — |

## 详细示例

### 基础用法

```vue
<template>
  <div class="demo-basic">
    <span class="demonstration">有默认值</span>
    <zx-color-picker v-model="color1" />
    
    <span class="demonstration">无默认值</span>
    <zx-color-picker v-model="color2" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color1 = ref('#409EFF')
const color2 = ref('')
</script>
```

### 透明度选择

```vue
<template>
  <zx-color-picker v-model="color" show-alpha />
</template>

<script setup>
import { ref } from 'vue'

const color = ref('rgba(19, 206, 102, 0.8)')
</script>
```

### 预定义颜色

```vue
<template>
  <zx-color-picker 
    v-model="color" 
    show-alpha 
    :predefine="predefineColors" 
  />
</template>

<script setup>
import { ref } from 'vue'

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]
</script>
```

### 不同尺寸

```vue
<template>
  <div class="demo-sizes">
    <zx-color-picker v-model="color" size="large" />
    <zx-color-picker v-model="color" />
    <zx-color-picker v-model="color" size="small" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#409EFF')
</script>

<style>
.demo-sizes .zx-color-picker:not(:last-child) {
  margin-right: 16px;
}
</style>
```

### 颜色格式

```vue
<template>
  <div class="demo-formats">
    <div class="demo-item">
      <span>HEX:</span>
      <zx-color-picker v-model="colorHex" color-format="hex" />
    </div>
    <div class="demo-item">
      <span>RGB:</span>
      <zx-color-picker v-model="colorRgb" color-format="rgb" />
    </div>
    <div class="demo-item">
      <span>HSL:</span>
      <zx-color-picker v-model="colorHsl" color-format="hsl" />
    </div>
    <div class="demo-item">
      <span>HSV:</span>
      <zx-color-picker v-model="colorHsv" color-format="hsv" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colorHex = ref('#ff4500')
const colorRgb = ref('rgb(255, 120, 0)')
const colorHsl = ref('hsl(181, 100%, 37%)')
const colorHsv = ref('hsv(51, 100, 98)')
</script>
```

### 事件监听

```vue
<template>
  <zx-color-picker 
    v-model="color" 
    show-alpha
    @change="handleChange"
    @active-change="handleActiveChange"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#409EFF')

const handleChange = (value) => {
  console.log('颜色改变:', value)
}

const handleActiveChange = (value) => {
  console.log('活动颜色改变:', value)
}

const handleFocus = () => {
  console.log('获得焦点')
}

const handleBlur = () => {
  console.log('失去焦点')
}
</script>
```

### 方法调用

```vue
<template>
  <div>
    <zx-color-picker ref="colorPickerRef" v-model="color" />
    <button @click="showPicker">显示选择器</button>
    <button @click="hidePicker">隐藏选择器</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const color = ref('#409EFF')
const colorPickerRef = ref()

const showPicker = () => {
  colorPickerRef.value?.show()
}

const hidePicker = () => {
  colorPickerRef.value?.hide()
}
</script>
```

## 样式定制

组件使用 CSS 变量，可以通过覆盖这些变量来定制样式：

```css
.zx-color-picker {
  --zx-color-picker-border-color: #dcdfe6;
  --zx-color-picker-hover-border-color: #409eff;
  --zx-color-picker-focus-border-color: #409eff;
  --zx-color-picker-disabled-opacity: 0.5;
}
```

## 无障碍访问

组件完全支持无障碍访问，包括：

- 键盘导航支持
- ARIA 标签支持
- 焦点管理
- 屏幕阅读器支持

### 键盘快捷键

- `Enter` / `Space`: 打开/关闭颜色选择器
- `Esc`: 关闭颜色选择器
- `Tab`: 在交互元素之间导航

## 兼容性

- Vue 3.0+
- 现代浏览器（IE11+）

## 注意事项

1. 组件需要在支持 Teleport 的 Vue 3 环境中使用
2. 颜色解析使用了简化算法，对于复杂颜色格式可能需要额外的颜色解析库
3. 透明度支持需要开启 `show-alpha` 属性
4. 预定义颜色支持多种格式，但建议使用标准格式

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础颜色选择功能
- 支持透明度选择
- 支持预定义颜色
- 支持多种颜色格式输出
- 支持多种尺寸
- 完整的事件系统
- 无障碍访问支持
