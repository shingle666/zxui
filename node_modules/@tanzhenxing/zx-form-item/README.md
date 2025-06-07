# zx-form-item 表单项组件

表单项组件用于为表单控件提供容器，包含标签、验证和错误提示功能。

## 基础用法

表单项组件需要在 zx-form 组件内使用。

```html
<zx-form :model="form" :rules="rules">
  <zx-form-item label="用户名" prop="username">
    <zx-input v-model="form.username"></zx-input>
  </zx-form-item>
</zx-form>
```

## 必填项

通过 `required` 属性可以将表单项设置为必填，也可以通过表单验证规则自动生成必填标识。

```html
<zx-form-item label="用户名" required>
  <zx-input v-model="form.username"></zx-input>
</zx-form-item>

<!-- 或者通过验证规则自动显示必填标识 -->
<zx-form-item label="用户名" prop="username">
  <zx-input v-model="form.username"></zx-input>
</zx-form-item>

<script setup>
import { reactive } from 'vue';

const form = reactive({ username: '' });
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
};
</script>
```

## 自定义标签

使用 `label` 插槽可以自定义标签内容。

```html
<zx-form-item prop="username">
  <template #label>
    <view class="custom-label">
      <text>用户名</text>
      <text class="custom-tip">（必填）</text>
    </view>
  </template>
  <zx-input v-model="form.username"></zx-input>
</zx-form-item>
```

## 标签对齐方式

通过 `label-align` 属性可以设置标签的对齐方式，可选值为：`left`、`center`、`right`。

```html
<zx-form-item label="用户名" label-align="left" prop="username">
  <zx-input v-model="form.username"></zx-input>
</zx-form-item>
```

## 标签宽度

通过 `label-width` 属性可以设置标签的宽度，优先级高于 zx-form 上的 label-width 属性。

```html
<zx-form-item label="长标签文本" label-width="200rpx" prop="field">
  <zx-input v-model="form.field"></zx-input>
</zx-form-item>
```

## 表单项验证

表单项验证是通过 `prop` 属性和 zx-form 的 `rules` 属性配合使用，也可以单独在表单项上设置 `rules` 属性。

```html
<zx-form-item 
  label="邮箱" 
  prop="email" 
  :rules="[
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确', trigger: 'blur' }
  ]"
>
  <zx-input v-model="form.email"></zx-input>
</zx-form-item>
```

## 显示错误信息

当验证失败时，会自动显示错误信息，也可以通过 `error-message` 属性手动设置错误信息。

```html
<zx-form-item label="用户名" error-message="用户名不能为空">
  <zx-input v-model="form.username"></zx-input>
</zx-form-item>
```

## 表单项尺寸

可以通过 `size` 属性设置表单项的尺寸，可选值为：`large`、`default`、`small`。

```html
<zx-form-item label="大尺寸" size="large">
  <zx-input v-model="form.field1"></zx-input>
</zx-form-item>

<zx-form-item label="默认尺寸">
  <zx-input v-model="form.field2"></zx-input>
</zx-form-item>

<zx-form-item label="小尺寸" size="small">
  <zx-input v-model="form.field3"></zx-input>
</zx-form-item>
```

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 表单域 model 字段 | String | - |
| label | 标签文本 | String | - |
| label-width | 标签宽度 | String/Number | - |
| label-align | 标签对齐方式，可选值：left/center/right | String | - |
| required | 是否必填，如不设置，则会根据校验规则自动生成 | Boolean | false |
| rules | 表单验证规则 | Array/Object | [] |
| error-message | 表单域验证错误信息 | String | - |
| show-message | 是否显示校验错误信息 | Boolean | true |
| size | 用于控制该表单域下组件的尺寸，可选值：large/default/small | String | - |
| validate-status | 验证状态，可选值：error/success/validating | String | - |
| for | 原生 label 标签的 for 属性 | String | - |
| inline-message | 是否显示行内校验信息 | Boolean/String | - |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 表单项内容 |
| label | 自定义标签内容 |

## 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 对该表单项进行校验 | callback: 回调函数，参数为(error, field) |
| resetField | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | - |
| clearValidate | 移除该表单项的校验结果 | - |
