# zx-label 组件

> 该组件主要用于zx-radio、zx-checkbox、zx-switch、zx-button组件外层，实现类似uni-app的label功能。

## 介绍

`zx-label` 用于改进表单组件的可用性。使用 `for` 属性找到对应 id 的控件，或者将控件放在该标签下，当点击时，就会触发对应的控件。

**注意事项：**
- `for` 属性优先级高于内部控件
- 内部有多个控件时默认触发第一个控件
- 目前可以绑定的控件有：`zx-button`、`zx-checkbox`、`zx-radio`、`zx-switch`

## 属性说明

| 属性名   | 类型    | 默认值 | 说明                     |
|---------|---------|--------|-------------------------|
| for     | String  | ''     | 绑定控件的 id            |
| padding | String  | '0'    | 内边距，CSS语法           |
| margin  | String  | '0'    | 外边距，CSS语法           |
| isFull  | Boolean | false  | 是否宽度100%，自动撑满父元素 |

## 使用示例

### 1. 直接包裹控件（默认触发第一个控件）

```html
<zx-label>
  <zx-checkbox v-model="value1">选项1</zx-checkbox>
</zx-label>
```

### 2. 使用for属性指定控件ID

```html
<zx-label for="myCheckbox">
  <text>点我选中</text>
</zx-label>
<zx-checkbox v-model="value1" id="myCheckbox">选项1</zx-checkbox>
```

### 3. 多个控件包裹（触发第一个控件）

```html
<zx-label>
  <!-- 默认触发第一个控件，此例中会触发zx-checkbox -->
  <zx-checkbox v-model="value1">选项1</zx-checkbox>
  <zx-radio v-model="value2">选项2</zx-radio>
</zx-label>
```

### 4. 设置样式

```html
<zx-label padding="20rpx" margin="10rpx" isFull>
  <zx-switch v-model="switchValue"></zx-switch>
  <text>开启/关闭</text>
</zx-label>
```

### 5. 配合按钮使用

```html
<zx-label for="submitBtn">
  <text>点击提交</text>
</zx-label>
<zx-button id="submitBtn" type="primary" @click="submit">提交</zx-button>
```

## 实现原理

`zx-label` 组件通过以下方式工作：

1. **包裹控件方式**：将子组件注册到 `childrens` 数组中，点击时调用第一个子组件的 `labelClick` 方法。

2. **for属性方式**：通过 `uni.createSelectorQuery()` 查找指定 id 的元素，并模拟点击事件。

## 参考

该组件实现参考了uni-app的[label组件](https://uniapp.dcloud.net.cn/component/label.html)。