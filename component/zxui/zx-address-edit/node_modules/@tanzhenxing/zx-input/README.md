# zx-input 输入框组件

基于uni-app的增强输入框组件，支持各种表单输入场景，提供了丰富的功能和样式定制选项。

## 引入方式

```js
// 在页面中导入
import zxInput from '@/components/zx-input/zx-input.vue'

// 注册组件
export default {
  components: {
    zxInput
  }
}
```

## 基础用法

### 基础输入框

```html
<zx-input v-model="inputValue" placeholder="请输入内容"></zx-input>
```

### 禁用状态

```html
<zx-input v-model="inputValue" disabled placeholder="禁用状态"></zx-input>
```

### 可清空输入框

```html
<zx-input v-model="inputValue" clearable placeholder="可清空"></zx-input>
```

### 密码输入框

```html
<zx-input v-model="password" password placeholder="请输入密码"></zx-input>
```

### 带图标的输入框

```html
<zx-input v-model="inputValue" prefix-icon="uni-icon-search" placeholder="搜索内容"></zx-input>
<zx-input v-model="inputValue" suffix-icon="uni-icon-calendar" placeholder="选择日期"></zx-input>
```

### 不同尺寸

```html
<zx-input v-model="inputValue" size="large" placeholder="大尺寸输入框"></zx-input>
<zx-input v-model="inputValue" placeholder="默认尺寸输入框"></zx-input>
<zx-input v-model="inputValue" size="small" placeholder="小尺寸输入框"></zx-input>
```

### 数据验证

```html
<zx-input v-model="email" validate="isEmail" placeholder="请输入邮箱"></zx-input>
```

## 属性说明

| 属性名                   | 类型           | 默认值    | 说明                                                        |
| ----------------------- | -------------- | -------- | ----------------------------------------------------------- |
| modelValue              | String/Number  | ''       | 输入框的值，可使用v-model双向绑定                            |
| size                    | String         | ''       | 输入框大小，可选值：large/small                              |
| name                    | String         | ''       | 表单控件名称                                                 |
| disabled                | Boolean        | false    | 是否禁用                                                     |
| type                    | String         | 'text'   | 输入框类型，可选值：text/number/idcard/digit/tel/safe-password/nickname |
| password                | Boolean        | false    | 是否是密码类型                                               |
| placeholder             | String         | ''       | 输入框占位文本                                               |
| placeholderStyle        | String         | ''       | 指定placeholder的样式                                        |
| placeholderClass        | String         | ''       | 指定placeholder的样式类                                      |
| maxlength               | Number         | 300      | 最大输入长度                                                 |
| cursorSpacing           | Number/String  | 0        | 指定光标与键盘的距离                                         |
| cursorColor             | String         | ''       | 指定光标颜色                                                 |
| autoFocus               | Boolean        | false    | 自动获取焦点                                                 |
| focus                   | Boolean        | false    | 获取焦点                                                     |
| confirmType             | String         | 'done'   | 设置键盘右下角按钮的文字，可选值：send/search/next/go/done   |
| confirmHold             | Boolean        | false    | 点击键盘右下角按钮时是否保持键盘不收起                       |
| adjustPosition          | Boolean        | true     | 键盘弹起时，是否自动上推页面                                 |
| holdKeyboard            | Boolean        | false    | focus时，点击页面的时候不收起键盘                            |
| validate                | String         | ''       | 数据验证规则，使用validator库中的方法名                      |
| borderSize              | String         | '1rpx'   | 边框线条大小                                                 |
| borderColor             | String         | '#ececec'| 边框线条颜色                                                 |
| borderActiveColor       | String         | '#2979ff'| 聚焦时边框颜色                                               |
| borderErrorColor        | String         | '#ff0000'| 验证错误时边框颜色                                           |
| borderStyle             | String         | 'solid'  | 边框样式                                                     |
| borderRadius            | String         | '10rpx'  | 边框圆角                                                     |
| clearable               | Boolean        | false    | 是否可清空                                                   |
| prefixIcon              | String         | ''       | 前缀图标类名                                                 |
| suffixIcon              | String         | ''       | 后缀图标类名                                                 |

## 事件说明

| 事件名            | 说明                 | 返回值                     |
| ----------------- | -------------------- | -------------------------- |
| @update:modelValue | 输入值变化时触发     | 输入框当前值                |
| @input            | 输入时触发           | event = {detail: {value: 值}} |
| @focus            | 输入框聚焦时触发     | event 对象                  |
| @blur             | 输入框失去焦点时触发 | event 对象                  |
| @confirm          | 点击完成按钮时触发   | event 对象                  |
| @clear            | 点击清除按钮时触发   | -                          |
| @click-prefix-icon | 点击前缀图标时触发   | event 对象                  |
| @click-suffix-icon | 点击后缀图标时触发   | event 对象                  |

## 代码示例

### 完整表单示例

```html
<template>
  <view class="form-container">
    <zx-input
      v-model="formData.username"
      placeholder="用户名"
      prefix-icon="uni-icon-person"
      clearable
      :maxlength="20"
      @confirm="submitForm"
    ></zx-input>
    
    <zx-input
      v-model="formData.password"
      placeholder="密码"
      password
      prefix-icon="uni-icon-locked"
      :maxlength="16"
      @confirm="submitForm"
    ></zx-input>
    
    <zx-input
      v-model="formData.email"
      placeholder="邮箱"
      validate="isEmail"
      prefix-icon="uni-icon-email"
      clearable
      @blur="checkEmail"
    ></zx-input>
    
    <button type="primary" @click="submitForm">提交</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  username: '',
  password: '',
  email: ''
});

function checkEmail() {
  // 邮箱验证逻辑
}

function submitForm() {
  // 表单提交逻辑
}
</script>
```

## 注意事项

1. validate 属性使用的是 validator 库中的方法名，确保项目中已引入该库
2. 使用图标需要确保项目中已引入相应的图标库
3. 在使用密码输入框时，组件内置了显示/隐藏密码的切换功能
