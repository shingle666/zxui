# zx-radio 单选框组件

符合 uni-app 官方标准的单选框组件，支持单独使用或配合 `zx-radio-group` 使用。

## 特性

- ✅ 符合 uni-app 官方 radio 组件 API 标准
- ✅ 支持单独使用和 radio-group 组合使用
- ✅ 支持自定义颜色、大小、样式
- ✅ 支持禁用状态
- ✅ 标准的圆形 radio 样式
- ✅ 良好的无障碍访问支持
- ✅ TypeScript 类型支持

## 基本用法

### 单独使用

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <zx-radio v-model:checked="checked1" value="option1">
      选项1
    </zx-radio>
    
    <!-- 设置初始选中状态 -->
    <zx-radio :checked="true" value="option2">
      默认选中
    </zx-radio>
    
    <!-- 禁用状态 -->
    <zx-radio :disabled="true" value="option3">
      禁用选项
    </zx-radio>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const checked1 = ref(false)
</script>
```

### 配合 radio-group 使用（推荐）

```vue
<template>
  <view>
    <zx-radio-group v-model="radioValue" @change="handleChange">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
      <zx-radio value="3">选项3</zx-radio>
    </zx-radio-group>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const radioValue = ref('1')

const handleChange = (e) => {
  console.log('选中值:', e.value)
}
</script>
```

### 自定义样式

```vue
<template>
  <view>
    <zx-radio-group v-model="radioValue">
      <!-- 自定义颜色 -->
      <zx-radio 
        value="1" 
        color="#ff4757"
        active-background-color="#ff4757"
        active-border-color="#ff4757"
      >
        红色主题
      </zx-radio>
      
      <!-- 自定义大小 -->
      <zx-radio 
        value="2"
        :size="24"
        color="#2ed573"
      >
        大号尺寸
      </zx-radio>
      
      <!-- 自定义边框和背景 -->
      <zx-radio 
        value="3"
        background-color="#f1f2f6"
        border-color="#57606f"
        icon-color="#2f3542"
      >
        自定义样式
      </zx-radio>
    </zx-radio-group>
  </view>
</template>
```

### 水平布局

```vue
<template>
  <view>
    <zx-radio-group v-model="radioValue" placement="row">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
      <zx-radio value="3">选项3</zx-radio>
    </zx-radio-group>
  </view>
</template>
```

## API

### zx-radio Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | String / Number / Boolean | '' | radio 标识，当 radio 选中时，radio-group 的 change 事件会携带 radio 的 value |
| checked | Boolean | false | 当前是否选中 |
| disabled | Boolean | false | 是否禁用 |
| color | String | '#007AFF' | radio 的颜色，同 css 的 color |
| backgroundColor | String | '#ffffff' | radio 默认的背景颜色 |
| borderColor | String | '#d1d1d1' | radio 默认的边框颜色 |
| activeBackgroundColor | String | '' | radio 选中时的背景颜色，优先级大于 color 属性 |
| activeBorderColor | String | '' | radio 选中时的边框颜色 |
| iconColor | String | '#ffffff' | radio 的图标颜色 |
| size | String / Number | 20 | 组件大小，单位 px |
| name | String | '' | 组件名称，用于表单验证 |

### zx-radio Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中状态改变时触发（仅在单独使用时） | { value: 当前值, checked: 是否选中 } |

### zx-radio-group Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | String / Number / Boolean | '' | 绑定的值 |
| disabled | Boolean | false | 是否禁用所有 radio |
| name | String | '' | 标识符，用于表单验证 |
| placement | String | 'column' | 布局方式，'row'-横向，'column'-纵向 |
| customStyle | Object | {} | 组件的样式，对象形式 |
| validateEvent | Boolean | true | 输入时是否触发表单验证 |
| ariaLabel | String | '' | 无障碍访问标签 |

### zx-radio-group Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中项发生变化时触发 | { value: 选中项 radio 的 value } |

## 注意事项

1. **单选逻辑**：在 radio-group 中，已选中的 radio 不能通过点击取消选中，这符合单选框的标准行为
2. **值绑定**：推荐为每个 radio 设置不同的 value 值，用于标识选中项
3. **样式优先级**：activeBackgroundColor 的优先级高于 color 属性
4. **表单验证**：可以通过 name 属性配合表单验证使用
5. **无障碍访问**：组件支持 ARIA 标签，提升可访问性

## 最佳实践

1. **推荐使用 radio-group**：除非特殊需求，建议使用 radio-group 包裹 radio 组件
2. **明确的 value 值**：为每个 radio 设置清晰、唯一的 value 值
3. **合理的布局**：根据内容长度选择合适的 placement（row/column）
4. **一致的样式**：在同一组 radio 中保持一致的样式风格
5. **适当的间距**：利用 radio-group 的自动间距，或通过 customStyle 调整

## 兼容性

- ✅ H5
- ✅ 小程序（微信、支付宝、百度、抖音等）
- ✅ App（nvue）
- ✅ HarmonyOS

## 版本历史

### v2.0.0
- 重构组件，符合 uni-app 官方标准
- 优化样式和交互逻辑
- 改进 radio-group 通信机制
- 添加更多自定义样式选项
- 改进无障碍访问支持
