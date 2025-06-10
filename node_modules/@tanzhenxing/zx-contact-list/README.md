# zx-contact-list 联系人列表

展示联系人列表，通常与 `zx-contact-edit` 组件配合使用。

## 平台兼容性

| H5  | 小程序 | App |
| --- | ---- | --- |
| ✔️  | ✔️   | ✔️  |

## 基本用法

```vue
<template>
  <zx-contact-list
    :list="contactList"
    v-model="chosenContactId"
    default-tag-text="默认"
    @add="handleAdd"
    @edit="handleEdit"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue';

const chosenContactId = ref('1');
const contactList = ref([
  {
    id: '1',
    name: '张三',
    tel: '13000000000',
    isDefault: true,
  },
  {
    id: '2',
    name: '李四',
    tel: '13100000000',
  },
]);

const handleAdd = () => {
  console.log('新增联系人');
  // uni.navigateTo({ url: '/pages/contact-edit/index' });
};

const handleEdit = (contact, index) => {
  console.log('编辑联系人:', contact, '索引:', index);
  // uni.navigateTo({ url: `/pages/contact-edit/index?id=${contact.id}` });
};

const handleSelect = (contact, index) => {
  console.log('选择联系人:', contact, '索引:', index);
  chosenContactId.value = contact.id;
};
</script>
```

## API

### Props

| 参数             | 说明                     | 类型             | 默认值 | 版本 |
| ---------------- | ------------------------ | ---------------- | ------ | ---- |
| `v-model`        | 当前选中联系人的 id        | `String` `Number`  | -      |      |
| `list`           | 联系人列表               | `ContactListItem[]` | `[]`   |      |
| `add-text`       | 新建按钮文案             | `String`         | 新建联系人 |      |
| `default-tag-text` | 默认联系人标签文案       | `String`         | -      |      |

### ContactListItem 数据结构

| 键名      | 说明                 | 类型              | 版本 |
| --------- | -------------------- | ----------------- | ---- |
| `id`      | 每位联系人的唯一标识 | `String` `Number` |      |
| `name`    | 联系人姓名           | `String`          |      |
| `tel`     | 联系人手机号         | `String` `Number` |      |
| `isDefault` | 是否为默认联系人     | `Boolean`         |      |

### Events

| 事件名   | 说明                     | 回调参数                               | 版本 |
| -------- | ------------------------ | -------------------------------------- | ---- |
| `add`    | 点击新增按钮时触发       | -                                      |      |
| `edit`   | 点击编辑按钮时触发       | `contact: ContactListItem`, `index: Number` |      |
| `select` | 切换选中的联系人时触发   | `contact: ContactListItem`, `index: Number` |      |
| `update:modelValue` | `v-model`绑定的值变化时触发 | `id: String | Number`                 |      |

## 主题定制

###样式变量

组件提供了下列 SCSS 变量，可用于自定义样式，使用方法请参考 [SCSS 变量](https://uniapp.dcloud.io/frame?id=scss)。

| 名称                               | 默认值                        | 描述 |
| ---------------------------------- | ----------------------------- | ---- |
| `$zx-contact-list-padding`         | `$uni-spacing-sm $uni-spacing-sm 80px` | -    |
| `$zx-contact-list-edit-icon-size`  | `16px`                        | -    |
| `$zx-contact-list-add-button-z-index` | `999`                         | -    |
| `$zx-contact-list-radio-color`     | `$uni-color-primary`          | -    |
| `$zx-contact-list-item-padding`    | `$uni-spacing-md`             | -    |

**注意：**

- 组件内部依赖 `zx-radio-group`, `zx-radio`, `zx-cell`, `zx-icon`, `zx-tag`, `zx-button` 组件。
- 为了在 App 和小程序端有更好的滚动体验，建议将 `zx-contact-list` 放置在可滚动的页面或 `scroll-view` 中，并自行处理滚动逻辑，而不是依赖组件内部的 `overflow-y: scroll`。
- 安全区域 (`van-safe-area-bottom`) 的处理在 UniApp 中通常通过 `safe-area-inset-bottom` CSS 变量或相关组件实现，组件已尝试兼容。