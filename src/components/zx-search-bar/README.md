# zx-search-bar 组件

自定义搜索栏组件，基于 `uni-app` + `vue3 setup` 实现，支持 H5、各类小程序、App 平台。参考官方 [uni-search-bar](https://uniapp.dcloud.net.cn/component/uniui/uni-search-bar.html) 组件，适合商品、文章等内容的搜索场景。

## 基本用法

```vue
<template>
  <zx-search-bar v-model="searchValue" @confirm="onSearch" />
</template>

<script setup>
import { ref } from 'vue'
const searchValue = ref('')
function onSearch(e) {
  // 处理搜索逻辑
  console.log('搜索内容：', e.value)
}
</script>
```

## 属性（Props）
| 属性名         | 类型             | 默认值     | 说明                                                         |
| -------------- | ---------------- | ---------- | ------------------------------------------------------------ |
| modelValue     | String/Number    | ''         | 搜索栏绑定值，支持 v-model                                   |
| placeholder    | String           | 搜索       | 占位符文字                                                   |
| radius         | Number/String    | 5          | 搜索栏圆角，单位 px                                          |
| clearButton    | String           | auto       | 清除按钮显示方式：always-一直显示、auto-输入框不为空时显示、none-不显示 |
| cancelButton   | String           | auto       | 取消按钮显示方式：always-一直显示、auto-输入框不为空时显示、none-不显示 |
| cancelText     | String           | 取消       | 取消按钮文字                                                 |
| bgColor        | String           | #F8F8F8    | 输入框背景色                                                 |
| textColor      | String           | #000000    | 输入文字颜色                                                 |
| maxlength      | Number/String    | 100        | 最大输入长度                                                 |
| focus          | Boolean          | false      | 是否自动聚焦                                                 |
| readonly       | Boolean          | false      | 是否只读，展示不可编辑                                       |

## 事件（Events）
| 事件名     | 说明                                 | 返回参数                |
| ---------- | ------------------------------------ | ----------------------- |
| input      | 输入内容变化时触发                   | value                   |
| update:modelValue | v-model 双向绑定                | value                   |
| confirm    | 点击键盘搜索/回车时触发              | { value }               |
| clear      | 点击清除按钮时触发                   | { value }               |
| cancel     | 点击取消按钮时触发                   | { value }               |
| blur       | 输入框失去焦点时触发                 | { value }               |
| focus      | 输入框获得焦点时触发                 | e.detail                |

## 插槽（Slots）
| 插槽名      | 说明             |
| ----------- | ---------------- |
| searchIcon  | 替换搜索图标     |
| clearIcon   | 替换清除图标     |

## 完整示例

详见：`src/pages/components/search-bar/index.vue`

```vue
<zx-search-bar
  v-model="searchValue"
  placeholder="请输入关键词"
  :radius="10"
  :clearButton="'auto'"
  :cancelButton="'auto'"
  cancelText="取消"
  bgColor="#f0f0f0"
  textColor="#333"
  :maxlength="50"
  @confirm="onSearch"
  @input="onInput"
  @clear="onClear"
  @cancel="onCancel"
  @blur="onBlur"
  @focus="onFocus"
>
  <template #searchIcon>
    <uni-icons color="#007aff" size="20" type="search" />
  </template>
  <template #clearIcon>
    <uni-icons color="#ff4d4f" size="20" type="closeempty" />
  </template>
</zx-search-bar>
```

## 注意事项
- 组件已适配 H5、各类小程序、App 平台。
- 不依赖浏览器特有 DOM。
- 国际化文案可通过 `src/components/zx-search-bar/i18n/` 目录自定义。
- 如需自定义图标，建议使用 `uni-icons` 组件。

---

如有问题或建议，欢迎反馈。
