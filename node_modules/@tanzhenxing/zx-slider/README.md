# zx-slider 滑动选择器组件

基于 uni-app 原生 slider 组件的增强版本，提供更多自定义功能和更好的用户体验。

## 特性

- ✅ 完全兼容 uni-app 官方 slider 组件
- ✅ 支持 Vue 3 Composition API
- ✅ 支持双向绑定 (v-model)
- ✅ 多种值显示位置（左侧、右侧、底部、原生）
- ✅ 自定义格式化函数和配置
- ✅ 刻度显示和标签
- ✅ 范围值显示
- ✅ 标签和单位支持
- ✅ 实时更新选项
- ✅ 完整的属性验证
- ✅ TypeScript 友好
- ✅ 兼容旧版本属性

## 安装使用

```vue
<template>
  <zx-slider v-model="value" :show-value="true" />
</template>

<script setup>
import { ref } from 'vue'
import zxSlider from '@/components/zx-slider/zx-slider.vue'

const value = ref(50)
</script>
```

## 属性说明

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Number/String | 0 | 当前取值（v-model） |
| min | Number/String | 0 | 最小可选值 |
| max | Number/String | 100 | 最大可选值 |
| step | Number/String | 1 | 步长，必须大于 0 |
| disabled | Boolean | false | 是否禁用 |

### 样式属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| activeColor | String | '#007aff' | 滑块左侧已选择部分的线条颜色 |
| backgroundColor | String | '#e9e9e9' | 滑块右侧背景条的颜色 |
| inactiveColor | String | '' | 兼容旧版本，等同于 backgroundColor |
| blockColor | String | '#ffffff' | 滑块的颜色 |
| blockSize | Number/String | 18 | 滑块大小，范围 12-28 |
| customStyle | Object | {} | 自定义样式对象 |

### 显示属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showValue | Boolean | false | 是否显示当前值 |
| valuePosition | String | 'native' | 值显示位置：left/right/bottom/native |
| showLabel | Boolean | false | 是否显示标签 |
| label | String | '' | 标签文本 |
| showRange | Boolean | false | 是否显示范围值 |

### 刻度属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| showTicks | Boolean | false | 是否显示刻度 |
| showTickLabels | Boolean | false | 是否显示刻度标签 |
| tickCount | Number/String | 5 | 刻度数量 |

### 格式化属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| formatter | Function/Object | null | 值格式化函数或配置对象 |
| unit | String | '' | 单位 |
| precision | Number/String | 0 | 小数位数 |

### 行为属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| updateOnChanging | Boolean | false | 是否在拖动时实时更新 modelValue |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | v-model 值更新 | value: 新值 |
| change | 滑动结束时触发 | { value, formattedValue } |
| changing | 拖动过程中触发 | { value, formattedValue } |

## 使用示例

### 基础用法

```vue
<template>
  <zx-slider v-model="value" />
</template>

<script setup>
import { ref } from 'vue'
const value = ref(30)
</script>
```

### 显示当前值

```vue
<template>
  <!-- 原生显示 -->
  <zx-slider v-model="value" :show-value="true" />
  
  <!-- 右侧显示 -->
  <zx-slider v-model="value" :show-value="true" value-position="right" />
  
  <!-- 底部显示 -->
  <zx-slider v-model="value" :show-value="true" value-position="bottom" />
</template>
```

### 设置范围和步长

```vue
<template>
  <zx-slider 
    v-model="value"
    :min="10"
    :max="90"
    :step="5"
    :show-value="true"
    :show-range="true"
  />
</template>
```

### 自定义颜色

```vue
<template>
  <zx-slider 
    v-model="value"
    active-color="#ff5722"
    background-color="#ffebee"
    block-color="#e91e63"
    :block-size="24"
  />
</template>
```

### 带标签和单位

```vue
<template>
  <zx-slider 
    v-model="volume"
    :show-label="true"
    label="音量"
    unit="%"
    :show-value="true"
  />
</template>
```

### 自定义格式化

```vue
<template>
  <!-- 使用格式化函数 -->
  <zx-slider 
    v-model="percent"
    :formatter="percentFormatter"
    :show-value="true"
  />
  
  <!-- 使用格式化配置 -->
  <zx-slider 
    v-model="price"
    :formatter="{ prefix: '¥', suffix: '.00', decimals: 0 }"
    :show-value="true"
  />
</template>

<script setup>
function percentFormatter(value) {
  return `${value}%`
}
</script>
```

### 显示刻度

```vue
<template>
  <zx-slider 
    v-model="value"
    :show-ticks="true"
    :show-tick-labels="true"
    :tick-count="5"
    :show-value="true"
  />
</template>
```

### 小数精度

```vue
<template>
  <zx-slider 
    v-model="decimal"
    :min="0"
    :max="10"
    :step="0.1"
    :precision="1"
    :show-value="true"
  />
</template>
```

### 实时更新

```vue
<template>
  <zx-slider 
    v-model="value"
    :update-on-changing="true"
    @changing="onChanging"
    :show-value="true"
  />
</template>

<script setup>
function onChanging(e) {
  console.log('实时值：', e.value, e.formattedValue)
}
</script>
```

## 高级示例

### 温度控制器

```vue
<template>
  <zx-slider 
    v-model="temperature"
    :min="-10"
    :max="50"
    :step="1"
    :show-label="true"
    label="室内温度"
    :show-value="true"
    :show-range="true"
    :show-ticks="true"
    :show-tick-labels="true"
    :tick-count="6"
    active-color="#ff6b35"
    :formatter="temperatureFormatter"
  />
</template>

<script setup>
import { ref } from 'vue'

const temperature = ref(22)

function temperatureFormatter(value) {
  if (value < 0) return `${value}°C (冷)`
  if (value < 10) return `${value}°C (凉)`
  if (value < 25) return `${value}°C (适宜)`
  if (value < 35) return `${value}°C (温暖)`
  return `${value}°C (炎热)`
}
</script>
```

## 组件方法

通过 ref 可以访问组件的方法：

```vue
<template>
  <zx-slider ref="sliderRef" v-model="value" />
</template>

<script setup>
import { ref } from 'vue'

const sliderRef = ref()
const value = ref(50)

// 获取格式化后的值
const formatted = sliderRef.value?.formatValue(value.value)

// 验证并修正值
const validated = sliderRef.value?.validateValue(75)

// 获取当前值
const current = sliderRef.value?.currentValue
</script>
```

## 兼容性说明

- 支持 uni-app 全平台
- 兼容 Vue 3 Composition API
- 向下兼容旧版本属性命名
- 支持 HBuilderX 4.23+ 的 HarmonyOS 编译

## 注意事项

1. `step` 值必须大于 0
2. `blockSize` 范围为 12-28
3. 使用 `backgroundColor` 替代 `inactiveColor`（保持兼容）
4. 格式化函数的优先级高于其他格式化配置
5. 在拖动过程中，默认不更新 modelValue，可通过 `updateOnChanging` 开启

## 更新日志

### v1.0.0
- 基础功能实现
- 支持 Vue 3 Composition API
- 完整的属性验证
- 多种显示模式
- 自定义格式化
- 刻度显示功能
