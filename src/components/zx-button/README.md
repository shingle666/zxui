# zx-button 按钮组件

`zx-button` 是一个扩展自 uni-app 官方 button 组件的增强型按钮组件，提供了更多的自定义样式和功能选项。

## 特性

- 完全兼容官方 button 组件的所有属性和事件
- 支持更多按钮类型：default、primary、warn、success、warning、danger、info
- 支持多种形式：普通按钮、镂空按钮、文本按钮、链接按钮
- 支持形状定制：方形、圆角、圆形
- 支持图标按钮
- 支持多种尺寸：大、中、小，以及自定义尺寸
- 支持命名插槽，更灵活的内容定制

## 使用方法

```vue
<template>
  <zx-button type="primary">确认</zx-button>
</template>

<script>
import ZxButton from '@/components/zx-button/zx-button.vue'

export default {
  components: {
    ZxButton
  }
}
</script>
```

## 属性说明

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | 'default' | 按钮类型，可选值：default、primary、warn、success、warning、danger、info |
| size | String | 'default' | 按钮大小，可选值：default、mini、large，也可传入自定义高度值如 '90rpx' |
| plain | Boolean | false | 按钮是否镂空，背景色透明 |
| text | Boolean | false | 是否为文本按钮，无边框和背景色 |
| link | Boolean | false | 是否为链接按钮，类似于文本按钮，但有链接样式 |
| round | Boolean | false | 是否为圆角按钮 |
| circle | Boolean | false | 是否为圆形按钮 |
| disabled | Boolean | false | 是否禁用 |
| loading | Boolean | false | 名称前是否带 loading 图标 |

### 样式相关属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| shape | String | '' | 按钮形状，已弃用，请使用 round 和 circle 属性代替 |
| color | String | '' | 文字颜色 |
| backgroundColor | String | '' | 按钮背景色 |
| bg | Boolean | false | 文本按钮是否显示背景色 |

### 图标相关属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | String | '' | 图标名称 |
| iconColor | String | '' | 图标颜色 |
| iconSize | String | '36rpx' | 图标大小 |

### 行为属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| formType | String | '' | 用于 form 组件，可选值：submit、reset |
| openType | String | '' | 开放能力，详见下方说明 |
| hoverClass | String | 'button-hover' | 指定按钮按下去的样式类 |
| hoverStartTime | Number | 20 | 按住后多久出现点击态，单位毫秒 |
| hoverStayTime | Number | 70 | 手指松开后点击态保留时间，单位毫秒 |
| hoverStopPropagation | Boolean | false | 是否阻止本节点的祖先节点出现点击态 |

### 开放能力相关属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| appParameter | String | '' | 打开 APP 时，向 APP 传递的参数 |
| lang | String | 'zh_CN' | 指定返回用户信息的语言，可选值：zh_CN、zh_TW、en |
| sessionFrom | String | '' | 会话来源 |
| sendMessageTitle | String | '' | 会话内消息卡片标题 |
| sendMessagePath | String | '' | 会话内消息卡片点击跳转小程序路径 |
| sendMessageImg | String | '' | 会话内消息卡片图片 |
| showMessageCard | Boolean | false | 是否显示会话内消息卡片 |
| groupId | String | '' | 打开群资料卡时，传递的群号 |
| guildId | String | '' | 打开频道页面时，传递的频道号 |
| publicId | String | '' | 打开公众号资料卡时，传递的号码 |
| dataImId | String | '' | 客服的抖音号 |
| dataImType | String | '' | IM卡片类型 |
| dataGoodsId | String | '' | 商品的id |
| dataOrderId | String | '' | 订单的id |
| dataBizLine | String | '' | 商品类型，"1"代表生活服务，"2"代表泛知识 |

## 插槽

| 名称 | 说明 |
| --- | --- |
| 默认插槽 | 按钮的文本内容 |
| icon | 自定义图标区域内容 |
| loading | 自定义加载中图标 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | event |
| getPhoneNumber | 获取用户手机号回调 | event |
| getUserInfo | 获取用户信息回调 | event |
| error | 当使用开放能力时，发生错误的回调 | event |
| openSetting | 在打开授权设置页后回调 | event |
| launchApp | 打开 APP 成功的回调 | event |
| contact | 客服消息回调 | event |
| chooseAvatar | 获取用户头像回调 | event |
| agreePrivacyAuthorization | 用户同意隐私协议事件回调 | event |
| addGroupApp | 添加群应用回调 | event |
| chooseAddress | 选择收货地址回调 | event |
| chooseInvoiceTitle | 选择发票抬头回调 | event |
| subscribe | 订阅消息回调 | event |
| login | 登录回调 | event |
| im | IM事件回调 | event |

## 示例

### 基础用法

```vue
<zx-button>默认按钮</zx-button>
<zx-button type="primary">主要按钮</zx-button>
<zx-button type="warn">警告按钮</zx-button>
<zx-button type="success">成功按钮</zx-button>
<zx-button type="danger">危险按钮</zx-button>
```

### 镂空按钮

```vue
<zx-button plain>镂空按钮</zx-button>
<zx-button type="primary" plain>镂空主要按钮</zx-button>
```

### 文本按钮和链接按钮

```vue
<zx-button text>文本按钮</zx-button>
<zx-button type="primary" text>主要文本按钮</zx-button>
<zx-button type="primary" link>链接按钮</zx-button>
```

### 禁用状态

```vue
<zx-button disabled>禁用按钮</zx-button>
<zx-button type="primary" disabled>禁用主要按钮</zx-button>
```

### 加载状态

```vue
<zx-button loading>加载中</zx-button>
<zx-button type="primary" loading>加载中</zx-button>
```

### 不同尺寸

```vue
<zx-button>默认尺寸</zx-button>
<zx-button size="mini">小尺寸</zx-button>
<zx-button size="large">大尺寸</zx-button>
<zx-button size="120rpx">自定义尺寸</zx-button>
```

### 不同形状

```vue
<zx-button type="primary">默认形状</zx-button>
<zx-button type="primary" round>圆角按钮</zx-button>
<zx-button type="primary" circle icon="plus"></zx-button>
```

### 带图标的按钮

```vue
<zx-button type="primary" icon="search">搜索</zx-button>
<zx-button type="success" icon="check">确认</zx-button>
```

### 自定义样式

```vue
<zx-button 
  color="#fff" 
  backgroundColor="#8a2be2"
  :style="{ boxShadow: '0 4rpx 8rpx rgba(0, 0, 0, 0.2)' }"
>自定义样式</zx-button>
```

### 使用插槽

```vue
<zx-button type="primary">
  <template #icon>
    <view class="custom-icon">🔍</view>
  </template>
  自定义内容
</zx-button>

<zx-button type="primary" loading>
  <template #loading>
    <view class="custom-loading">🔄</view>
  </template>
  自定义加载图标
</zx-button>
```

### 表单提交按钮

```vue
<form @submit="submitForm">
  <!-- 表单内容 -->
  <zx-button form-type="submit" type="primary">提交</zx-button>
  <zx-button form-type="reset">重置</zx-button>
</form>
```

### 使用开放能力

```vue
<zx-button 
  open-type="getPhoneNumber" 
  @getPhoneNumber="onGetPhoneNumber"
  type="primary"
>获取手机号</zx-button>

<zx-button 
  open-type="contact" 
  type="success"
>联系客服</zx-button>
```
