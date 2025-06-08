# ZxAnchor 锚点组件

通过锚点，您可以很快找到当前页面上信息内容的位置。

## 基础用法

最简单的用法。

```vue
<template>
  <zx-anchor :offset="70">
    <zx-anchor-link href="#part1">第一部分</zx-anchor-link>
    <zx-anchor-link href="#part2">第二部分</zx-anchor-link>
    <zx-anchor-link href="#part3">
      第三部分
      <template #sub-link>
        <zx-anchor-link href="#part3-1">子部分1</zx-anchor-link>
        <zx-anchor-link href="#part3-2">子部分2</zx-anchor-link>
      </template>
    </zx-anchor-link>
  </zx-anchor>
</template>
```

## 水平模式

水平排列的锚点（水平模式不支持子链接）

```vue
<template>
  <zx-anchor :offset="70" direction="horizontal">
    <zx-anchor-link href="#part1">第一部分</zx-anchor-link>
    <zx-anchor-link href="#part2">第二部分</zx-anchor-link>
    <zx-anchor-link href="#part3">第三部分</zx-anchor-link>
  </zx-anchor>
</template>
```

## 自定义滚动区域

自定义滚动区域，使用 `offset` 属性可以设置锚点滚动偏移。

```vue
<template>
  <div>
    <div ref="containerRef" style="height: 300px; overflow-y: auto">
      <div id="part1" style="height: 300px; background: rgba(255, 0, 0, 0.02)">part1</div>
      <div id="part2" style="height: 300px; background: rgba(0, 255, 0, 0.02)">part2</div>
      <div id="part3" style="height: 300px; background: rgba(0, 0, 255, 0.02)">part3</div>
    </div>
    <zx-anchor :container="containerRef" :offset="30" @click="handleClick">
      <zx-anchor-link href="#part1" title="part1" />
      <zx-anchor-link href="#part2" title="part2" />
      <zx-anchor-link href="#part3" title="part3" />
    </zx-anchor>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      // 阻止浏览器默认行为
      e.preventDefault()
    }
  }
}
</script>
```

## 下划线类型

设置 `type="underline"` 更改为下划线类型

```vue
<template>
  <zx-anchor type="underline" :offset="70">
    <zx-anchor-link href="#part1">第一部分</zx-anchor-link>
    <zx-anchor-link href="#part2">第二部分</zx-anchor-link>
    <zx-anchor-link href="#part3">第三部分</zx-anchor-link>
  </zx-anchor>
</template>
```

## 监听锚点变化

使用 `change` 事件可以监听当前活动锚点的变化

```vue
<template>
  <zx-anchor :offset="70" @change="handleChange">
    <zx-anchor-link href="#part1">第一部分</zx-anchor-link>
    <zx-anchor-link href="#part2">第二部分</zx-anchor-link>
    <zx-anchor-link href="#part3">第三部分</zx-anchor-link>
  </zx-anchor>
</template>

<script>
export default {
  methods: {
    handleChange(href) {
      console.log(`锚点变化: ${href}`)
    }
  }
}
</script>
```

## 属性

### ZxAnchor 属性

| 属性            | 说明                | 类型                    | 默认值      |
| --------------- | ------------------- | ----------------------- | ---------- |
| container       | 滚动的容器          | string \| HTMLElement   | Window     |
| offset          | 设置锚点滚动的偏移量 | number                  | 0          |
| bound           | 触发锚点的元素的位置偏移量 | number           | 15         |
| duration        | 设置容器滚动持续时间，单位为毫秒 | number     | 300        |
| marker          | 是否显示标记         | boolean                 | true       |
| type            | 设置锚点类型         | 'default' \| 'underline'| 'default'  |
| direction       | 设置锚点方向         | 'vertical' \| 'horizontal' | 'vertical' |
| selectScrollTop | 滚动时，链接是否选中位于顶部 | boolean      | false      |

### ZxAnchor 事件

| 事件名  | 说明                | 类型                  |
| ------- | ------------------- | --------------------- |
| change  | 锚点链接变化时的回调  | Function(href: string) |
| click   | 当用户点击链接时触发  | Function(event: Event) |

### ZxAnchor 方法

| 名称      | 说明             | 类型                  |
| --------- | ---------------- | --------------------- |
| scrollTo  | 手动滚动到特定位置 | Function(href: string) |

### ZxAnchorLink 属性

| 属性    | 说明       | 类型     | 默认值 |
| ------- | ---------- | -------- | ------ |
| title   | 链接的文本内容 | string   | ''     |
| href    | 链接的地址   | string   | '#'    |

### ZxAnchorLink 插槽

| 名称      | 说明          |
| --------- | ------------ |
| default   | 链接的内容     |
| sub-link  | 子链接的插槽   |
