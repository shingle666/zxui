# zx-textarea 文本域组件

基于 uni-app 官方 textarea 组件封装的增强型文本域组件，提供了丰富的功能和良好的跨平台兼容性。

## 功能特性

- ✅ 完全兼容 uni-app 官方 textarea 组件的所有功能
- ✅ 支持 v-model 双向数据绑定
- ✅ 字数统计功能，支持自定义显示格式
- ✅ 清除按钮功能
- ✅ 多种边框样式（四周边框、底部边框、无边框）
- ✅ 自适应高度
- ✅ 丰富的自定义样式选项
- ✅ 完整的事件支持
- ✅ 输入长度限制
- ✅ 多种输入模式支持
- ✅ 平台兼容性优化（H5、小程序、App）
- ✅ 禁用状态支持
- ✅ 自定义占位符样式

## 基础用法

```vue
<template>
  <zx-textarea 
    v-model="value" 
    placeholder="请输入内容"
    @input="onInput"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import zxTextarea from '@/components/zx-textarea/zx-textarea.vue';

const value = ref('');

const onInput = (val) => {
  console.log('输入值:', val);
};

const onChange = (val) => {
  console.log('变化值:', val);
};
</script>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 | 平台差异说明 |
|-------|------|--------|------|-------------|
| value | String \| Number | '' | 输入框的内容 | |
| placeholder | String \| Number | '' | 输入框为空时占位符 | |
| placeholder-class | String | 'textarea-placeholder' | 指定 placeholder 的样式类 | |
| placeholder-style | String \| Object | '' | 指定 placeholder 的样式 | |
| height | String \| Number | '140rpx' | 输入框高度 | |
| disabled | Boolean | false | 是否禁用 | |
| maxlength | String \| Number | 140 | 最大输入长度，-1 为不限制 | |
| focus | Boolean | false | 是否自动获取焦点 | H5 取决于浏览器实现，nvue 不支持 |
| auto-focus | Boolean | false | 自动聚焦，拉起键盘 | |
| auto-height | Boolean | false | 是否自动增加高度 | |
| confirm-type | String | 'done' | 键盘右下角按钮文字 | 仅微信小程序、App-vue 和 H5 有效 |
| confirm-hold | Boolean | false | 点击键盘右下角按钮时是否保持键盘不收起 | |
| cursor-spacing | Number | 0 | 指定光标与键盘的距离 | |
| cursor | String \| Number | -1 | 指定 focus 时的光标位置 | |
| show-confirm-bar | Boolean | true | 是否显示键盘上方带有"完成"按钮那一栏 | |
| selection-start | Number | -1 | 光标起始位置 | |
| selection-end | Number | -1 | 光标结束位置 | |
| adjust-position | Boolean | true | 键盘弹起时，是否自动上推页面 | |
| disable-default-padding | Boolean | false | 是否去掉 iOS 下的默认内边距 | 仅微信小程序有效 |
| hold-keyboard | Boolean | false | focus 时，点击页面的时候不收起键盘 | 仅微信小程序有效 |
| auto-blur | Boolean | false | 键盘收起时，是否自动失去焦点 | |
| fixed | Boolean | false | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | |
| ignore-composition-event | Boolean | true | 是否忽略组件内对文本合成系统事件的处理 | |
| inputmode | String | 'text' | 输入模式提示 | 仅 H5 和 App-vue 平台支持 |

#### 扩展属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|--------|------|
| count | Boolean | false | 是否显示字数统计 |
| show-maxlength-in-count | Boolean | true | 字数统计是否显示最大长度 |
| clearable | Boolean | false | 是否显示清除按钮 |
| border | String | 'surround' | 边框类型：surround-四周边框，bottom-底部边框，none-无边框 |
| font-size | String \| Number | '15px' | 字体大小 |
| color | String | '#606266' | 字体颜色 |
| background-color | String | '#fff' | 背景色 |
| border-radius | String \| Number | '4px' | 边框圆角 |
| border-color | String | '#dadbde' | 边框颜色 |
| padding | String \| Number | '9px' | 内边距 |

### confirm-type 有效值

| 值 | 说明 |
|----|------|
| send | 右下角按钮为"发送" |
| search | 右下角按钮为"搜索" |
| next | 右下角按钮为"下一个" |
| go | 右下角按钮为"前往" |
| done | 右下角按钮为"完成" |

### inputmode 有效值

| 值 | 说明 |
|----|------|
| none | 无虚拟键盘 |
| text | 标准文本输入键盘 |
| decimal | 小数输入键盘 |
| numeric | 数字输入键盘 |
| tel | 电话输入键盘 |
| search | 搜索输入键盘 |
| email | 邮件输入键盘 |
| url | URL 输入键盘 |

### Events

| 事件名 | 说明 | 回调参数 |
|-------|------|----------|
| input | 当键盘输入时触发 | value: 输入框当前值 |
| change | 输入框内容变化时触发 | value: 输入框当前值 |
| focus | 输入框聚焦时触发 | event: {detail: {value, height}} |
| blur | 输入框失去焦点时触发 | event: {detail: {value, cursor}} |
| confirm | 点击完成按钮时触发 | event: {detail: {value}} |
| linechange | 输入框行数变化时触发 | event: {detail: {height, heightRpx, lineCount}} |
| keyboardheightchange | 键盘高度发生变化时触发 | event: {detail: {height, duration}} |
| clear | 点击清除按钮时触发 | - |

## 使用示例

### 基础用法

```vue
<zx-textarea 
  v-model="value" 
  placeholder="请输入内容"
/>
```

### 带字数统计

```vue
<zx-textarea 
  v-model="value" 
  placeholder="最多输入100个字符"
  :count="true"
  :maxlength="100"
/>
```

### 清除按钮

```vue
<zx-textarea 
  v-model="value" 
  placeholder="带清除按钮的输入框"
  :clearable="true"
  @clear="onClear"
/>
```

### 自适应高度

```vue
<zx-textarea 
  v-model="value" 
  placeholder="输入区域高度自适应"
  :auto-height="true"
/>
```

### 不同边框样式

```vue
<!-- 四周边框 -->
<zx-textarea 
  v-model="value1" 
  border="surround"
/>

<!-- 底部边框 -->
<zx-textarea 
  v-model="value2" 
  border="bottom"
/>

<!-- 无边框 -->
<zx-textarea 
  v-model="value3" 
  border="none"
/>
```

### 自定义样式

```vue
<zx-textarea 
  v-model="value" 
  placeholder="自定义样式"
  font-size="16px"
  color="#333"
  background-color="#f8f9fa"
  border-color="#007bff"
  border-radius="8px"
  padding="12px"
/>
```

### 不同输入模式

```vue
<!-- 数字输入 -->
<zx-textarea 
  v-model="numericValue" 
  placeholder="数字输入模式"
  inputmode="numeric"
/>

<!-- 邮箱输入 -->
<zx-textarea 
  v-model="emailValue" 
  placeholder="邮箱输入模式"
  inputmode="email"
/>
```

### 自定义占位符样式

```vue
<zx-textarea 
  v-model="value" 
  placeholder="红色占位符文字"
  placeholder-style="color: #f56c6c; font-style: italic;"
/>
```

## 注意事项

1. **平台兼容性**：
   - 微信小程序、百度小程序、抖音小程序等平台中，textarea 是原生组件，层级高于前端组件
   - 小程序端 CSS 动画对 textarea 组件无效
   - H5 平台只能在用户交互时修改 focus 生效

2. **输入限制**：
   - 当设置 `maxlength` 时，超出长度的输入会被自动截断
   - 字数统计会根据输入长度实时更新，超出时会显示红色警告

3. **键盘处理**：
   - 软键盘的弹出和收起逻辑遵循各平台的默认行为
   - 如需禁止点击其他位置收起键盘，可以监听 `touch` 事件并使用 `prevent` 修饰符

4. **样式定制**：
   - 组件支持通过 props 定制大部分样式
   - 如需更复杂的样式定制，可以通过 CSS 变量或深度选择器实现

5. **事件处理**：
   - `blur` 事件会晚于页面上的 `tap` 事件执行
   - 如果需要在按钮点击事件中获取 textarea 的值，建议使用 form 的 `@submit` 事件

## 更新日志

### v1.0.0
- 初始版本发布
- 完整实现 uni-app textarea 组件的所有功能
- 添加字数统计、清除按钮等增强功能
- 支持多种边框样式和自定义样式
- 完善的平台兼容性处理
