# zx-contact-edit 联系人编辑

## 组件介绍

`zx-contact-edit` 联系人编辑组件用于编辑并保存联系人信息，支持添加和编辑两种模式。该组件支持H5、小程序和App多端平台，采用Vue3 setup语法糖实现。

## 平台兼容性

- H5：✓
- 微信小程序：✓
- 支付宝小程序：✓
- 百度小程序：✓
- 头条小程序：✓
- QQ小程序：✓
- App（Vue）：✓

## 基础用法

### 添加联系人

```vue
<template>
  <zx-contact-edit 
    @save="onSave" 
  />
</template>

<script setup>
function onSave(contactInfo) {
  console.log('保存联系人:', contactInfo)
  // { name: '张三', tel: '13800138000', isDefault: false }
}
</script>
```

### 编辑联系人

```vue
<template>
  <zx-contact-edit 
    :is-edit="true"
    :contact-info="editingContact"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const editingContact = ref({
  name: '李四',
  tel: '13900139000',
  isDefault: true
})

function onSave(contactInfo) {
  console.log('保存联系人:', contactInfo)
}

function onDelete(contactInfo) {
  console.log('删除联系人:', contactInfo)
}
</script>
```

### 显示默认联系人开关

```vue
<template>
  <zx-contact-edit 
    :show-set-default="true"
    set-default-label="设为默认联系人"
    @save="onSave"
    @change-default="onChangeDefault"
  />
</template>

<script setup>
function onSave(contactInfo) {
  console.log('保存联系人:', contactInfo)
}

function onChangeDefault(isDefault) {
  console.log('默认联系人状态:', isDefault)
}
</script>
```

### 自定义验证

```vue
<template>
  <zx-contact-edit 
    :tel-validator="customTelValidator"
    @save="onSave"
  />
</template>

<script setup>
// 自定义手机号验证函数
function customTelValidator(tel) {
  // 支持座机号码
  const mobileReg = /^1[3-9]\d{9}$/
  const phoneReg = /^0\d{2,3}-?\d{7,8}$/
  return mobileReg.test(tel) || phoneReg.test(tel)
}

function onSave(contactInfo) {
  console.log('保存联系人:', contactInfo)
}
</script>
```

### 加载状态

```vue
<template>
  <zx-contact-edit 
    :is-edit="true"
    :is-saving="saving"
    :is-deleting="deleting"
    :contact-info="contact"
    @save="onSave"
    @delete="onDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const saving = ref(false)
const deleting = ref(false)
const contact = ref({
  name: '王五',
  tel: '13700137000'
})

async function onSave(contactInfo) {
  saving.value = true
  try {
    // 模拟保存操作
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('保存成功:', contactInfo)
  } finally {
    saving.value = false
  }
}

async function onDelete(contactInfo) {
  deleting.value = true
  try {
    // 模拟删除操作
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('删除成功:', contactInfo)
  } finally {
    deleting.value = false
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| contact-info | 联系人信息 | ContactInfo | `{name: '', tel: '', isDefault: false}` |
| is-edit | 是否为编辑模式 | Boolean | `false` |
| is-saving | 是否显示保存按钮加载状态 | Boolean | `false` |
| is-deleting | 是否显示删除按钮加载状态 | Boolean | `false` |
| show-set-default | 是否显示设为默认联系人开关 | Boolean | `false` |
| set-default-label | 默认联系人开关标签文本 | String | `'设为默认联系人'` |
| tel-validator | 手机号验证函数 | Function | 内置手机号验证 |
| disabled | 是否禁用 | Boolean | `false` |
| clearable | 是否显示清除按钮 | Boolean | `true` |
| hide-required-asterisk | 是否隐藏必填星号 | Boolean | `false` |
| name-placeholder | 姓名输入框占位符 | String | `'请输入姓名'` |
| tel-placeholder | 手机号输入框占位符 | String | `'请输入手机号'` |
| save-text | 保存按钮文本 | String | `'保存'` |
| delete-text | 删除按钮文本 | String | `'删除'` |
| custom-style | 自定义样式 | Object | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| save | 点击保存按钮时触发 | contactInfo: 表单内容 |
| delete | 点击删除按钮时触发 | contactInfo: 表单内容 |
| change-default | 切换默认联系人状态时触发 | isDefault: 是否默认 |

### ContactInfo 数据结构

| 键名 | 说明 | 类型 |
|------|------|------|
| name | 联系人姓名 | String |
| tel | 联系人手机号 | String |
| isDefault | 是否默认联系人 | Boolean |

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 描述 |
|------|--------|------|
| --zx-contact-edit-padding | 32rpx | 组件内边距 |
| --zx-contact-edit-field-padding | 24rpx 32rpx | 字段内边距 |
| --zx-contact-edit-field-font-size | 28rpx | 字段字体大小 |
| --zx-contact-edit-label-width | 164rpx | 标签宽度 |
| --zx-contact-edit-button-height | 88rpx | 按钮高度 |
| --zx-contact-edit-button-font-size | 32rpx | 按钮字体大小 |
| --zx-contact-edit-border-radius | 16rpx | 圆角大小 |
| --zx-contact-edit-primary-color | #07c160 | 主色调 |
| --zx-contact-edit-danger-color | #ee0a24 | 危险色 |

## 注意事项

1. **表单验证**：组件内置了基本的表单验证，包括必填验证和手机号格式验证
2. **手机号验证**：默认验证中国大陆手机号格式，可通过 `tel-validator` 自定义验证规则
3. **多端兼容**：使用原生 `input` 和 `switch` 组件，确保多端兼容性
4. **无障碍支持**：支持键盘导航和屏幕阅读器
5. **数据绑定**：组件内部维护表单数据，通过事件向外传递

## 更新日志

### v1.0.0

- 初始版本
- 支持联系人信息编辑
- 支持添加和编辑模式
- 支持表单验证
- 支持加载状态
- 支持多端平台