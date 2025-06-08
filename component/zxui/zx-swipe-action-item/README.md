# ZX滑动操作项组件

一个功能强大的滑动操作组件，支持左右滑动显示自定义按钮，适用于列表项的快捷操作。

## 使用示例

```html
<template>
  <view>
    <zx-swipe-action-item
      :leftOptions="leftOptions"
      :rightOptions="rightOptions"
      :show="show"
      @click="handleClick"
      @change="handleChange"
    >
      <view class="content">
        <text>滑动显示操作按钮</text>
      </view>
    </zx-swipe-action-item>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref('none')
const leftOptions = ref([
  {
    text: '置顶',
    style: {
      backgroundColor: '#007aff',
      color: '#FFFFFF',
      fontSize: '14px'
    }
  }
])

const rightOptions = ref([
  {
    text: '删除',
    style: {
      backgroundColor: '#dd524d',
      color: '#FFFFFF',
      fontSize: '14px'
    }
  },
  {
    text: '编辑',
    style: {
      backgroundColor: '#F56C6C',
      color: '#FFFFFF',
      fontSize: '14px'
    }
  }
])

function handleClick(e) {
  console.log('点击了按钮', e)
  // e.content 按钮内容
  // e.index 按钮索引
  // e.position 按钮位置 'left' 或 'right'
}

function handleChange(state) {
  console.log('组件状态变化', state) // 'left', 'right' 或 'none'
}
</script>

<style>
.content {
  padding: 15px;
  background-color: #ffffff;
}
</style>
```

## 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | String | 'none' | 控制开关状态，可选值为 'left'、'right' 或 'none' |
| disabled | Boolean | false | 是否禁用滑动 |
| autoClose | Boolean | true | 是否自动关闭其他打开的组件 |
| threshold | Number | 20 | 滑动缺省距离，超过此距离时会触发打开操作 |
| leftOptions | Array | [] | 左侧按钮配置，每个按钮为一个对象 |
| rightOptions | Array | [] | 右侧按钮配置，每个按钮为一个对象 |

### 按钮配置项

```js
{
  text: '按钮文本',
  style: {
    backgroundColor: '#颜色值', // 按钮背景色
    color: '#颜色值', // 文字颜色
    fontSize: '14px' // 文字大小
  }
}
```

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | {content, index, position} content: 按钮配置对象, index: 按钮索引, position: 按钮位置('left'或'right') |
| change | 组件状态变化时触发 | state: 当前状态，可能的值为 'left'、'right' 或 'none' |

## 方法

组件实例方法，可通过 ref 调用：

```js
const swipeRef = ref(null)

// 打开组件
swipeRef.value.open('left') // 或 'right'

// 关闭组件
swipeRef.value.close()
```

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 主内容 |
| left | 自定义左侧按钮，会覆盖 leftOptions |
| right | 自定义右侧按钮，会覆盖 rightOptions |

## 自定义按钮插槽示例

```html
<zx-swipe-action-item>
  <template #left>
    <view class="custom-button" @click="handleCustomClick">
      <text>自定义按钮</text>
    </view>
  </template>
  
  <view class="content">滑动显示操作按钮</view>
  
  <template #right>
    <view class="custom-button" @click="handleCustomClick">
      <text>自定义按钮</text>
    </view>
  </template>
</zx-swipe-action-item>
```
