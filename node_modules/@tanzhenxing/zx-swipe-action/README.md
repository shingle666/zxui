# zx-swipe-action 滑动操作组件

通过左右滑动触发选项的容器组件，常用于列表项的快捷操作。

## 介绍

zx-swipe-action 组件是一个可以通过左右滑动来触发操作选项的容器组件。在移动端的列表场景中，通过滑动显示操作按钮是一种常见的交互方式，比如删除、置顶、标记等操作。

本组件支持 H5、各家小程序和 App，提供了良好的跨平台体验。

## 基本用法

### 引入组件

```vue
<script setup>
import ZxSwipeAction from '@/components/zx-swipe-action/zx-swipe-action.vue'
import ZxSwipeActionItem from '@/components/zx-swipe-action/zx-swipe-action-item.vue'
</script>
```

### 基础示例

```vue
<template>
  <ZxSwipeAction>
    <ZxSwipeActionItem :right-options="options" @click="handleClick">
      <view class="content">
        <text>滑动显示操作按钮</text>
      </view>
    </ZxSwipeActionItem>
  </ZxSwipeAction>
</template>

<script setup>
import { ref } from 'vue'
import ZxSwipeAction from '@/components/zx-swipe-action/zx-swipe-action.vue'
import ZxSwipeActionItem from '@/components/zx-swipe-action/zx-swipe-action-item.vue'

// 右侧操作按钮配置
const options = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d'
    }
  },
  {
    text: '取消',
    style: {
      backgroundColor: '#007aff'
    }
  }
])

// 点击按钮的回调
function handleClick(e) {
  console.log('点击选项', e)
  // e 包含 {content, index, position} 三个属性
  // content: 按钮配置对象
  // index: 按钮索引
  // position: 按钮位置，'left' 或 'right'
}
</script>
```

## API

### ZxSwipeAction Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| - | - | - | - |

### ZxSwipeAction Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| resize | 重置组件大小，在动态内容场景下使用 | - |
| closeAll | 关闭所有已打开的滑动项 | - |

### ZxSwipeActionItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 控制开关，可选值：left / right / none | String | none |
| disabled | 是否禁用滑动 | Boolean | false |
| autoClose | 是否在滑动打开当前组件时自动关闭其他组件 | Boolean | true |
| threshold | 滑动阈值，超过该值会触发菜单展开 | Number | 20 |
| leftOptions | 左侧选项内容及样式 | Array | [] |
| rightOptions | 右侧选项内容及样式 | Array | [] |

### Options 数据结构

leftOptions 和 rightOptions 的结构定义如下：

```js
[
  {
    text: '按钮文字',
    style: {
      backgroundColor: '#007aff', // 背景颜色
      color: '#fff',              // 文字颜色
      fontSize: '16px'            // 文字大小
    }
  }
]
```

### ZxSwipeActionItem Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击选项按钮时触发 | {content, index, position} |
| change | 组件打开或关闭时触发 | left / right / none |

### ZxSwipeActionItem Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，显示内容 |
| left | 自定义左侧滑动区域 |
| right | 自定义右侧滑动区域 |

## 高级用法

### 使用插槽自定义按钮

除了通过配置 leftOptions 和 rightOptions 设置按钮外，还可以使用插槽自定义按钮内容：

```vue
<ZxSwipeActionItem>
  <template #left>
    <view class="custom-button">
      <text>置顶</text>
    </view>
  </template>
  
  <view class="content">
    <text>内容区域</text>
  </view>
  
  <template #right>
    <view class="custom-button">
      <text>删除</text>
    </view>
  </template>
</ZxSwipeActionItem>
```

### 使用变量控制开关状态

可以通过 show 属性和变量控制组件的开关状态：

```vue
<template>
  <view>
    <button @click="toggleSwipe">切换状态</button>
    
    <ZxSwipeAction>
      <ZxSwipeActionItem
        :show="isOpened ? 'right' : 'none'"
        :auto-close="false"
        @change="onChange"
      >
        <view class="content">
          <text>使用变量控制开关状态</text>
        </view>
      </ZxSwipeActionItem>
    </ZxSwipeAction>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const isOpened = ref(false)

function toggleSwipe() {
  isOpened.value = !isOpened.value
}

function onChange(e) {
  console.log('状态变化', e)
}
</script>
```

### 禁用滑动

通过设置 disabled 属性可以禁用滑动功能：

```vue
<ZxSwipeAction>
  <ZxSwipeActionItem :disabled="true">
    <view class="content">
      <text>禁止左右滑动</text>
    </view>
  </ZxSwipeActionItem>
</ZxSwipeAction>
```

### 在列表中使用

在列表中使用时，可以遍历数据渲染多个滑动项：

```vue
<ZxSwipeAction>
  <ZxSwipeActionItem
    v-for="(item, index) in list"
    :key="item.id"
    :right-options="item.options"
    @change="(e) => handleChange(e, index)"
    @click="(e) => handleClick(e, index)"
  >
    <view class="content">
      <text>{{ item.content }}</text>
    </view>
  </ZxSwipeActionItem>
</ZxSwipeAction>
```

## 注意事项

1. 为了性能考虑，不建议在长列表中使用 autoClose 属性，可能会导致性能下降。
2. 组件依赖于触摸事件，在一些特殊场景下可能会与页面的滚动事件冲突。
3. ZxSwipeAction 和 ZxSwipeActionItem 需要配套使用。
4. 不要在可滚动区域内嵌套使用该组件。
