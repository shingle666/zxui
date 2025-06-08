# zx-popover 弹出框

弹出框是在元素旁边显示浮层，支持不同的触发方式和位置，常用于展示详细信息或操作菜单。

## 基础用法

弹出框组件基于 `slot` 插槽和 `reference` 插槽实现，通过 `trigger` 属性指定触发方式，支持 `hover`、`click`、`focus`、`contextmenu` 和 `manual` 五种触发方式。

```vue
<zx-popover content="这是弹出框内容" title="标题" placement="top">
  <template #reference>
    <button>hover触发</button>
  </template>
</zx-popover>

<zx-popover content="这是弹出框内容" title="标题" placement="bottom" trigger="click">
  <template #reference>
    <button>click触发</button>
  </template>
</zx-popover>
```

## 弹出位置

通过 `placement` 属性控制弹出位置，支持12个不同方向：

- `top`、`top-start`、`top-end`
- `bottom`、`bottom-start`、`bottom-end`
- `left`、`left-start`、`left-end`
- `right`、`right-start`、`right-end`

```vue
<zx-popover content="top-start" placement="top-start">
  <template #reference>
    <button>top-start</button>
  </template>
</zx-popover>
```

## 主题

通过 `effect` 属性控制主题，支持 `light` 和 `dark` 两种主题：

```vue
<zx-popover content="浅色主题" title="Light" effect="light">
  <template #reference>
    <button>浅色主题</button>
  </template>
</zx-popover>

<zx-popover content="深色主题" title="Dark" effect="dark">
  <template #reference>
    <button>深色主题</button>
  </template>
</zx-popover>
```

## 自定义内容

除了使用 `content` 属性设置简单文本内容外，还可以使用默认插槽自定义复杂内容：

```vue
<zx-popover placement="right" trigger="click" width="400">
  <template #reference>
    <button>自定义内容</button>
  </template>
  
  <view class="custom-content">
    <view class="custom-title">自定义标题</view>
    <view class="custom-body">
      <view class="custom-item">
        <text>可以自定义任意内容</text>
      </view>
      <view class="custom-footer">
        <button @click="handleConfirm">确认</button>
        <button @click="handleCancel">取消</button>
      </view>
    </view>
  </view>
</zx-popover>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否显示弹出框 | Boolean | false |
| trigger | 触发方式 | String | hover |
| title | 标题 | String | - |
| content | 显示的内容 | String | - |
| placement | 出现位置 | String | top |
| showArrow | 是否显示箭头 | Boolean | true |
| width | 宽度 | Number/String | 300 |
| disabled | 是否禁用 | Boolean | false |
| offset | 出现位置的偏移量 | Number/String | 0 |
| zIndex | 层级 | Number/String | 10090 |
| closeOnClickOutside | 点击外部是否关闭 | Boolean | true |
| closeOnClickOverlay | 点击遮罩是否关闭 | Boolean | true |
| showAfter | 延迟出现，单位毫秒 | Number/String | 0 |
| hideAfter | 延迟消失，单位毫秒 | Number/String | 200 |
| effect | 主题 | String | light |
| overlay | 是否显示遮罩 | Boolean | false |
| duration | 动画时长，单位ms | Number/String | 300 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| show | 显示时触发 | - |
| hide | 隐藏时触发 | - |
| beforeEnter | 显示动画播放前触发 | - |
| afterEnter | 显示动画播放完毕后触发 | - |
| beforeLeave | 隐藏动画播放前触发 | - |
| afterLeave | 隐藏动画播放完毕后触发 | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 弹出框内容 |
| reference | 触发弹出框显示的元素 |

### 方法

通过ref调用实例方法：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| show | 显示弹出框 | - |
| hide | 隐藏弹出框 | - |

```vue
<template>
  <zx-popover ref="popoverRef">
    <!-- 内容 -->
  </zx-popover>
</template>

<script setup>
import { ref } from 'vue';

const popoverRef = ref(null);

function showPopover() {
  popoverRef.value.show();
}

function hidePopover() {
  popoverRef.value.hide();
}
</script>
```
