# zx-elevator 电梯楼层

电梯楼层组件，用于列表快速定位以及索引的显示，支持 H5、小程序、App 多端。

## 特性

- 🚀 支持 H5、小程序、App 多端
- 📱 触摸滑动快速定位
- 🎯 索引吸顶显示
- 🎨 自定义内容插槽
- ⚡ 流畅的滚动动画
- 🔧 丰富的配置选项

## 基础用法

```vue
<template>
  <zx-elevator
    :index-list="indexList"
    height="400px"
    @click-item="onClickItem"
    @click-index="onClickIndex"
    @change="onChange"
  />
</template>

<script setup>
const indexList = [
  {
    title: 'A',
    list: [
      { id: 1, name: 'Apple' },
      { id: 2, name: 'Android' }
    ]
  },
  {
    title: 'B',
    list: [
      { id: 3, name: 'Banana' },
      { id: 4, name: 'Book' }
    ]
  }
]

const onClickItem = (key, item) => {
  console.log('点击项目:', key, item)
}

const onClickIndex = (key) => {
  console.log('点击索引:', key)
}

const onChange = (index) => {
  console.log('索引改变:', index)
}
</script>
```

## 自定义内容

```vue
<template>
  <zx-elevator :index-list="indexList" height="400px">
    <template #default="{ item }">
      <view class="custom-item">
        <image :src="item.avatar" class="avatar" />
        <text class="name">{{ item.name }}</text>
      </view>
    </template>
  </zx-elevator>
</template>
```

## 索引吸顶

```vue
<template>
  <zx-elevator
    :index-list="indexList"
    :is-sticky="true"
    height="400px"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | 电梯区域的高度 | String \| Number | '200px' |
| accept-key | 索引 key 值 | String | 'title' |
| index-list | 索引列表 | Array | [] |
| is-sticky | 索引是否吸顶 | Boolean | false |
| space-height | 右侧锚点的上下间距 | Number | 23 |
| title-height | 左侧索引的高度 | Number | 35 |
| custom-style | 自定义样式 | String \| Object | '' |

### IndexList 数据结构

```javascript
[
  {
    title: 'A',  // 索引标题
    list: [      // 该索引下的数据列表
      {
        id: 1,     // 唯一标识
        name: 'Apple'  // 显示名称
      }
    ]
  }
]
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click-item | 点击内容项 | (key: string, item: object) |
| click-index | 点击索引 | (key: string) |
| change | 索引改变 | (index: number) |

### Slots

| 名称 | 说明 | 参数 |
|------|------|------|
| default | 自定义左侧索引下每条数据的内容 | { item } |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| scrollTo | 滚动到对应索引的位置 | (index: number) |

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
// 主要颜色
--zx-elevator-primary-color: #007aff;

// 标题样式
--zx-elevator-title-height: 35px;
--zx-elevator-title-padding: 0 20px;
--zx-elevator-title-font-size: 14px;
--zx-elevator-title-font-weight: 500;
--zx-elevator-title-color: #1a1a1a;
--zx-elevator-title-bg-color: #f5f5f5;

// 内容样式
--zx-elevator-content-height: 30px;
--zx-elevator-content-padding: 0 20px;
--zx-elevator-content-font-size: 12px;
--zx-elevator-content-color: #333;
--zx-elevator-content-border-color: #f5f5f5;

// 侧边栏样式
--zx-elevator-sidebar-bg-color: #eeeff2;
--zx-elevator-sidebar-border-radius: 6px;
--zx-elevator-sidebar-item-font-size: 10px;
--zx-elevator-sidebar-item-color: #666;
--zx-elevator-sidebar-item-active-color: #007aff;

// 当前索引提示
--zx-elevator-current-bg-color: #fff;
--zx-elevator-current-size: 45px;
--zx-elevator-current-font-size: 16px;
--zx-elevator-current-color: #333;
--zx-elevator-current-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);

// 吸顶标题
--zx-elevator-sticky-bg-color: #fff;
--zx-elevator-sticky-color: #007aff;
--zx-elevator-sticky-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
```

## 注意事项

1. **数据格式**：`index-list` 中的每个对象必须包含 `accept-key` 指定的字段（默认为 `title`）和 `list` 数组
2. **高度设置**：建议设置合适的 `height` 值，确保组件能够正常滚动
3. **性能优化**：大量数据时建议使用虚拟滚动或分页加载
4. **兼容性**：组件使用 uni-app 标准 API，兼容所有 uni-app 支持的平台

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础电梯楼层功能
- ✨ 支持索引吸顶
- ✨ 支持自定义内容插槽
- ✨ 支持触摸滑动快速定位
- ✨ 支持多端兼容（H5、小程序、App）