# zx-form 表单组件

表单包含输入框、单选框、下拉选择、多选框等用户输入的组件，用于收集、校验和提交数据。

## 基础用法

```html
<zx-form :model="form" :rules="rules" label-width="150rpx">
  <zx-form-item label="姓名" prop="name">
    <zx-input v-model="form.name" placeholder="请输入姓名"></zx-input>
  </zx-form-item>
  <zx-form-item label="邮箱" prop="email">
    <zx-input v-model="form.email" placeholder="请输入邮箱"></zx-input>
  </zx-form-item>
  <zx-form-item>
    <zx-button type="primary" @click="submitForm">提交</zx-button>
    <zx-button @click="resetForm">重置</zx-button>
  </zx-form-item>
</zx-form>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: ''
});

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
};

const formRef = ref(null);

function submitForm() {
  formRef.value.validate((valid, invalidFields) => {
    if (valid) {
      console.log('表单验证通过');
    } else {
      console.log('表单验证失败', invalidFields);
    }
  });
}

function resetForm() {
  formRef.value.resetFields();
}
</script>
```

## 行内表单

将 `inline` 属性设置为 `true` 可以让表单域变为行内的表单域。

```html
<zx-form :model="form" :rules="rules" inline>
  <zx-form-item label="姓名" prop="name">
    <zx-input v-model="form.name"></zx-input>
  </zx-form-item>
  <zx-form-item label="邮箱" prop="email">
    <zx-input v-model="form.email"></zx-input>
  </zx-form-item>
  <zx-form-item>
    <zx-button type="primary">查询</zx-button>
  </zx-form-item>
</zx-form>
```

## 对齐方式

通过设置 `label-position` 属性可以改变表单域标签的位置，可选值为：`top`、`left`、`right`。

```html
<zx-form :model="form" label-position="top">
  <!-- 表单项 -->
</zx-form>
```

## 表单验证

`zx-form` 组件提供了表单验证功能，通过 `rules` 属性传入验证规则。

```javascript
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  age: [
    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
  ]
};
```

## zx-form 属性

| 属性名                 | 说明                                  | 类型      | 默认值    |
| -------------------- | ------------------------------------ | --------- | --------- |
| model                | 表单数据对象                           | Object    | —         |
| rules                | 表单验证规则                           | Object    | —         |
| inline               | 行内表单模式                           | Boolean   | false     |
| label-position       | 表单域标签的位置，可选值：right/left/top  | String    | left      |
| label-width          | 表单域标签的宽度                       | String/Number | 100rpx    |
| disabled             | 是否禁用该表单内的所有组件              | Boolean   | false     |
| size                 | 用于控制该表单内组件的尺寸，可选值：large/default/small | String | default |
| hide-required-asterisk | 是否隐藏必填字段的标签旁边的红色星号    | Boolean   | false     |
| validate-on-rule-change | 是否在 rules 属性改变后立即触发一次验证 | Boolean   | true      |
| scroll-to-error      | 当校验失败时，是否滚动到第一个错误表单项 | Boolean   | false     |

## zx-form 事件

| 事件名   | 说明                   | 回调参数                                  |
| ------- | --------------------- | ---------------------------------------- |
| submit  | 表单提交时触发         | event: Event                             |
| reset   | 表单重置时触发         | event: Event                             |
| validate | 任一表单项被校验后触发 | prop: 被校验的表单项名称, valid: 校验是否通过, message: 错误消息 |

## zx-form 方法

| 方法名        | 说明                     | 参数                            |
| ------------ | ----------------------- | ------------------------------- |
| validate     | 对整个表单进行校验       | callback: 回调函数，参数为(valid, invalidFields) |
| validateField | 对部分表单字段进行校验   | props: 字段名称数组, callback: 回调函数 |
| resetFields  | 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果 | - |
| clearValidate | 移除表单项的校验结果     | props: 字段名称数组，不传则移除所有 |

## zx-form-item 属性

| 属性名        | 说明                            | 类型           | 默认值  |
| ------------ | ------------------------------- | -------------- | ------ |
| prop         | 表单域 model 字段               | String         | —      |
| label        | 标签文本                        | String         | —      |
| label-width  | 表单域标签的的宽度              | String/Number  | —      |
| required     | 是否必填，如不设置，则会根据校验规则自动生成 | Boolean | false  |
| rules        | 表单验证规则                    | Object/Array   | —      |
| error        | 表单域验证错误信息              | String         | —      |
| show-message | 是否显示校验错误信息             | Boolean        | true   |
| size         | 用于控制该表单域下组件的尺寸     | String         | —      |

## zx-form-item 方法

| 方法名        | 说明                   | 参数 |
| ------------ | --------------------- | ---- |
| validate     | 对该表单项进行校验     | callback: 回调函数，参数为(error, field) |
| resetField   | 对该表单项进行重置，将其值重置为初始值并移除校验结果 | - |
| clearValidate | 移除该表单项的校验结果  | - |
