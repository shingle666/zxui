# zx-rate 评分组件

参考 Element Plus Rate 组件设计的 uni-app 评分组件，支持多种功能特性。

## 特性

- ✅ 基础评分功能
- ✅ 多种尺寸支持 (large/default/small)
- ✅ 半星选择
- ✅ 辅助文字显示
- ✅ 分数显示
- ✅ 可清空功能
- ✅ 颜色分级
- ✅ 自定义图标
- ✅ 滑动手势支持
- ✅ 只读模式
- ✅ 编程式控制

## 基础用法

```vue
<template>
  <zx-rate v-model="value" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref(0);
</script>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
|-------|------|------|-------|
| modelValue | 绑定值 | number | 0 |
| max | 最大分值 | number | 5 |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | 'default' |
| disabled | 是否为只读 | boolean | false |
| allowHalf | 是否允许半选 | boolean | false |
| lowThreshold | 低分和中等分数的界限值 | number | 2 |
| highThreshold | 高分和中等分数的界限值 | number | 4 |
| colors | icon的颜色 | Array \| Object | ['#f7ba2a', '#f7ba2a', '#f7ba2a'] |
| voidColor | 未选中icon的颜色 | string | '#c6d1de' |
| disabledVoidColor | 只读时未选中icon的颜色 | string | '#eff2f7' |
| icons | 图标组件 | Array \| Object | ['star-fill', 'star-fill', 'star-fill'] |
| voidIcon | 未被选中的图标名 | string | 'star' |
| disabledVoidIcon | 禁用状态的未选择图标 | string | 'star' |
| showText | 是否显示辅助文字 | boolean | false |
| showScore | 是否显示当前分数 | boolean | false |
| textColor | 辅助文字的颜色 | string | '' |
| texts | 辅助文字数组 | Array | ['极差', '失望', '一般', '满意', '惊喜'] |
| scoreTemplate | 分数显示模板 | string | '{value}' |
| clearable | 是否可以重置值为0 | boolean | false |
| gutter | 图标之间的距离 | string \| number | '8rpx' |
| touchable | 是否可以通过滑动手势选择评分 | boolean | true |
| customStyle | 组件的样式，对象形式 | Object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|----------|
| change | 分值改变时触发 | (value: number) |

### Methods

| 方法名 | 说明 | 参数 |
|-------|------|------|
| setCurrentValue | 设置当前值 | (value: number) |
| resetCurrentValue | 重置当前值 | - |

## 使用示例

### 基础用法

```vue
<zx-rate v-model="value" />
```

### 颜色分级

```vue
<zx-rate 
  v-model="value" 
  :colors="['#99A9BF', '#F7BA2A', '#FF9900']" 
/>
```

### 允许半选

```vue
<zx-rate v-model="value" :allow-half="true" />
```

### 辅助文字

```vue
<zx-rate 
  v-model="value" 
  :show-text="true" 
  :texts="['极差', '失望', '一般', '满意', '惊喜']" 
/>
```

### 显示分数

```vue
<zx-rate 
  v-model="value" 
  :disabled="true"
  :show-score="true"
  :score-template="'{value} 分'"
/>
```

### 可清空

```vue
<zx-rate v-model="value" :clearable="true" />
```

### 自定义图标

```vue
<zx-rate 
  v-model="value" 
  :icons="['chat-dot-round', 'chat-line-round', 'chat-round']"
  void-icon="chat-line-round"
/>
```

### 编程式控制

```vue
<template>
  <zx-rate ref="rateRef" v-model="value" />
  <button @click="setRating(3)">设置为3分</button>
  <button @click="resetRating">重置</button>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(0);
const rateRef = ref();

const setRating = (val) => {
  rateRef.value.setCurrentValue(val);
};

const resetRating = () => {
  rateRef.value.resetCurrentValue();
};
</script>
```

## 注意事项

1. 组件依赖 `zx-icon` 图标组件
2. 颜色和图标配置支持数组和对象两种格式
3. 使用 `v-model` 进行双向数据绑定
4. 建议在项目中统一图标库，确保图标名称的一致性
5. 滑动手势在不同平台可能有细微差异，建议在真机上测试
