# zx-address-list 地址列表

展示地址信息列表，用于选择或管理收货地址等场景。

## 平台兼容性

| H5  | App | 小程序 |
| :-: | :-: | :----: |
| √   | √   |   √    |

## 基本使用

```vue
<template>
  <zx-address-list
    v-model="chosenAddressId"
    :list="list"
    :disabled-list="disabledList"
    disabled-text="以下地址超出配送范围"
    default-tag-text="默认"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from 'vue';

const chosenAddressId = ref('1');
const list = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '13100000000',
    address: '浙江省杭州市拱墅区莫干山路 50 号',
  },
]);
const disabledList = ref([
  {
    id: '3',
    name: '王五',
    tel: '13200000000',
    address: '浙江省杭州市滨江区江南大道 15 号',
  },
]);

const onAdd = () => {
  console.log('新增地址');
};
const onEdit = (item, index) => {
  console.log('编辑地址:', item, index);
};
const onSelect = (item, index) => {
  console.log('选中地址:', item, index);
};
</script>
```

## API

### Props

| 参数             | 说明                                                       | 类型                           | 默认值   |
| ---------------- | ---------------------------------------------------------- | ------------------------------ | -------- |
| v-model          | 当前选中地址的 id，支持多选（类型为 `Array`）                | `String` \| `Number` \| `Array`  | -        |
| list             | 地址列表，数据结构见 `AddressItem`                           | `Array<AddressItem>`           | `[]`     |
| disabled-list    | 不可配送地址列表，数据结构见 `AddressItem`                   | `Array<AddressItem>`           | `[]`     |
| disabled-text    | 不可配送提示文案                                             | `String`                       | -        |
| switchable       | 是否允许切换地址                                             | `Boolean`                      | `true`   |
| show-add-button  | 是否显示底部按钮                                             | `Boolean`                      | `true`   |
| add-button-text  | 底部按钮文字                                                 | `String`                       | 新增地址 |
| default-tag-text | 默认地址标签文字                                             | `String`                       | -        |
| right-icon       | 右侧图标名称或图片链接，同 `zx-icon` 的 `name` 属性          | `String`                       | `edit-pen` |

### AddressItem 数据结构

| 键名      | 说明             | 类型              | 是否必填 |
| --------- | ---------------- | ----------------- | -------- |
| id        | 每条地址的唯一标识 | `String` \| `Number` | 是       |
| name      | 姓名             | `String`          | 是       |
| tel       | 手机号           | `String` \| `Number` | 是       |
| address   | 详细地址         | `String`          | 是       |
| isDefault | 是否为默认地址   | `Boolean`         | 否       |

### Events

| 事件名          | 说明                       | 回调参数                                  |
| --------------- | -------------------------- | ----------------------------------------- |
| add             | 点击新增按钮时触发         | -                                         |
| edit            | 点击编辑按钮时触发         | `item: AddressItem`, `index: Number`      |
| select          | 切换选中的地址时触发       | `item: AddressItem`, `index: Number`      |
| click-item      | 点击任意地址时触发         | `item: AddressItem`, `index: Number`, `event: EventObject` |
| edit-disabled   | 编辑不可配送的地址时触发   | `item: AddressItem`, `index: Number`      |
| select-disabled | 选中不可配送的地址时触发   | `item: AddressItem`, `index: Number`      |

### Slots

| 名称        | 说明                   | 插槽作用域参数（`scope`） |
| ----------- | ---------------------- | ----------------------- |
| top         | 在列表顶部插入内容       | -                       |
| default     | 在列表下方插入内容       | -                       |
| item-bottom | 在列表项底部插入内容     | `item: AddressItem`, `disabled: Boolean` |
| tag         | 自定义列表项标签内容     | `item: AddressItem`     |

## `zx-address-list-item` (内部组件)

`zx-address-list` 依赖内部组件 `zx-address-list-item` 来渲染每个地址项。通常你不需要直接使用 `zx-address-list-item`。

### Props (zx-address-list-item)

| 参数             | 说明                                                       | 类型                           | 默认值   |
| ---------------- | ---------------------------------------------------------- | ------------------------------ | -------- |
| address          | 地址对象，数据结构见 `AddressItem`                           | `Object`                       | - (必填) |
| disabled         | 是否禁用                                                   | `Boolean`                      | `false`  |
| switchable       | 是否允许切换（用于显示单选/复选框）                        | `Boolean`                      | `false`  |
| single-choice    | 是否为单选模式（`switchable` 为 `true` 时生效）             | `Boolean`                      | `false`  |
| default-tag-text | 默认地址标签文字                                             | `String`                       | -        |
| right-icon       | 右侧图标名称或图片链接                                       | `String`                       | `edit-pen` |
| model-value      | (内部使用) 当前选中的值，用于判断 `radio/checkbox` 的选中状态 | `String` \| `Number` \| `Array`  | -        |

### Events (zx-address-list-item)

| 事件名 | 说明                               | 回调参数         |
| ------ | ---------------------------------- | ---------------- |
| edit   | 点击编辑图标时触发                 | -                |
| click  | 点击整个列表项时触发               | `event: EventObject` |
| select | 当 `switchable` 为 `true` 时点击触发 | -                |

### Slots (zx-address-list-item)

| 名称    | 说明                   | 插槽作用域参数（`scope`） |
| ------- | ---------------------- | ----------------------- |
| tag     | 自定义列表项标签内容     | `item: AddressItem`     |
| bottom  | 在列表项底部插入内容     | `item: AddressItem`, `disabled: Boolean` |