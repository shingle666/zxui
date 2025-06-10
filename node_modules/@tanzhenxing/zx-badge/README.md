# zx-badge 数字角标

数字角标一般和其它控件配合使用，用于数量提示。

## 基础用法

可以用来展示新消息的数量。数量值可接受 Number 或 String。

```html
<zx-badge text="12">
  <button>评论</button>
</zx-badge>

<zx-badge text="3">
  <button>回复</button>
</zx-badge>

<zx-badge text="1" type="primary">
  <button>评论</button>
</zx-badge>

<zx-badge text="2" type="warning">
  <button>回复</button>
</zx-badge>

<zx-badge text="1" bgColor="green">
  <button>自定义背景色</button>
</zx-badge>
```

## 最大值

可以自定义最大值，当超过最大值时会显示 {maxNum}+。

```html
<zx-badge text="200" :maxNum="99">
  <button>评论</button>
</zx-badge>

<zx-badge text="100" :maxNum="10">
  <button>回复</button>
</zx-badge>
```

## 自定义显示内容

可以显示数字以外的文本内容。

```html
<zx-badge text="new">
  <button>评论</button>
</zx-badge>

<zx-badge text="hot">
  <button>回复</button>
</zx-badge>
```

## 小红点

通过一个小红点标记来告知用户有新内容。

```html
<zx-badge isDot>
  <button>提醒</button>
</zx-badge>
```

## 位置偏移

设置徽章点的偏移，通过 offset 属性设置偏移量，格式是 [左，顶部]。

```html
<zx-badge text="1" :offset="[10, 5]">
  <button>偏移</button>
</zx-badge>
```

## 自定义样式

可以通过 badgeStyle 和 badgeClass 自定义徽章样式。

```html
<zx-badge text="99+" :badgeStyle="{ backgroundColor: '#ff6600', padding: '0 15rpx' }">
  <button>自定义样式</button>
</zx-badge>

<zx-badge text="VIP" badgeClass="custom-badge">
  <button>自定义类名</button>
</zx-badge>
```

## 显示控制

可以通过 hidden 和 showZero 控制徽章的显示。

```html
<zx-badge text="1" :hidden="isHidden">
  <button>显示/隐藏</button>
</zx-badge>

<zx-badge text="0" :showZero="false">
  <button>零值不显示</button>
</zx-badge>
```

## API

### 属性

| 属性名      | 说明                                      | 类型             | 默认值    |
| ----------- | ----------------------------------------- | ---------------- | --------- |
| text        | 显示值                                    | string / number  | ''        |
| type        | 颜色类型                                  | string           | 'error'   |
| bgColor     | 背景颜色，优先级比type高                  | string           | ''        |
| color       | 字体颜色                                  | string           | '#ffffff' |
| size        | 字体大小                                  | string           | '22rpx'   |
| scale       | 角标缩放比率                              | number           | 0.8       |
| maxNum      | 最大值，超过最大值会显示 {maxNum}+        | number           | 99        |
| isDot       | 是否显示为一个小点                        | boolean          | false     |
| hidden      | 是否隐藏Badge                             | boolean          | false     |
| showZero    | 值为零时是否显示Badge                     | boolean          | true      |
| absolute    | 开启绝对定位，角标将定位到包裹标签的四角上| string           | 'rightTop'|
| offset      | 距定位角中心点的偏移量                    | Array[number]    | [0, 0]    |
| badgeStyle  | 自定义badge样式                           | object           | {}        |
| badgeClass  | 自定义badge类名                           | string           | ''        |

### 事件

| 事件名      | 说明                                      | 回调参数         |
| ----------- | ----------------------------------------- | ---------------- |
| @click      | 点击Badge时触发                           | -                |

### 插槽

| 插槽名      | 说明                                      |
| ----------- | ----------------------------------------- |
| default     | 自定义默认内容                            |
