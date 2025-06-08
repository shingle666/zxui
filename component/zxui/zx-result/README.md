# zx-result 结果组件

## 介绍

`zx-result` 是一个结果反馈组件，用于对用户的操作结果或者异常状态做反馈。支持成功、警告、错误、信息等多种状态，提供丰富的自定义选项和插槽功能。

## 平台兼容性

全平台兼容（App、H5、微信小程序等）

## 基础用法

```vue
<template>
  <zx-result
    icon="success"
    title="Success Tip"
    sub-title="Please follow the instructions"
  >
    <template #extra>
      <zx-button type="primary">返回</zx-button>
    </template>
  </zx-result>
</template>
```

## 不同状态

组件内置了四种状态类型：`success`、`warning`、`error`、`info`

```vue
<template>
  <!-- 成功状态 -->
  <zx-result
    icon="success"
    title="操作成功"
    sub-title="您的操作已成功完成"
  ></zx-result>

  <!-- 警告状态 -->
  <zx-result
    icon="warning"
    title="警告提示"
    sub-title="请注意相关事项"
  ></zx-result>

  <!-- 错误状态 -->
  <zx-result
    icon="error"
    title="操作失败"
    sub-title="请检查网络连接后重试"
  ></zx-result>

  <!-- 信息状态 -->
  <zx-result
    icon="info"
    title="信息提示"
    sub-title="这是一条普通信息"
  ></zx-result>
</template>
```

## 自定义图标

可以使用自定义图标名称或图片路径

```vue
<template>
  <!-- 自定义图标 -->
  <zx-result
    icon="heart"
    title="感谢使用"
    sub-title="您的支持是我们前进的动力"
    icon-color="#ff5500"
  ></zx-result>

  <!-- 图片图标 -->
  <zx-result
    icon="https://example.com/custom-icon.png"
    title="自定义图片"
    sub-title="使用图片作为图标"
  ></zx-result>
</template>
```

## 自定义内容

使用插槽可以完全自定义各部分内容

```vue
<template>
  <zx-result title="404" sub-title="Sorry, request error">
    <template #icon>
      <image
        src="https://example.com/404.png"
        style="width: 200rpx; height: 200rpx;"
      />
    </template>
    <template #extra>
      <zx-button type="primary">返回首页</zx-button>
    </template>
  </zx-result>
</template>
```

## 使用插槽

支持多种插槽用法

```vue
<template>
  <zx-result icon="info">
    <!-- 自定义标题 -->
    <template #title>
      <zx-text text="自定义标题" size="44rpx" color="#3c9cff" bold></zx-text>
    </template>
    
    <!-- 自定义副标题 -->
    <template #sub-title>
      <view>
        <zx-text text="这是自定义的副标题" size="32rpx" color="#666"></zx-text>
      </view>
    </template>
    
    <!-- 自定义操作区域 -->
    <template #extra>
      <view style="display: flex; gap: 20rpx; justify-content: center;">
        <zx-button type="primary" size="mini">重试</zx-button>
        <zx-button size="mini">返回</zx-button>
      </view>
    </template>
  </zx-result>
</template>
```

## 自定义样式

可以自定义背景色、间距、字体等样式

```vue
<template>
  <zx-result
    icon="success"
    title="自定义样式"
    sub-title="可以自定义各种样式属性"
    background-color="#f8f9fa"
    padding="60rpx"
    :margin-top="20"
    :margin-bottom="20"
    title-color="#333"
    sub-title-color="#666"
    :icon-size="120"
  ></zx-result>
</template>
```

## API

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | true | 是否显示组件 |
| icon | String | info | 图标类型（success/error/warning/info）或自定义图标名称/图片路径 |
| title | String | - | 标题文字 |
| subTitle | String | - | 副标题文字 |
| titleSize | String/Number | 48rpx | 标题字体大小 |
| titleColor | String | #303133 | 标题文字颜色 |
| titleBold | Boolean | true | 标题是否加粗 |
| subTitleSize | String/Number | 32rpx | 副标题字体大小 |
| subTitleColor | String | #606266 | 副标题文字颜色 |
| iconSize | String/Number | 160rpx | 图标大小 |
| iconColor | String | - | 图标颜色（自定义图标时有效） |
| width | String/Number | 200rpx | 图片图标宽度 |
| height | String/Number | 200rpx | 图片图标高度 |
| marginTop | String/Number | 40rpx | 组件顶部间距 |
| marginBottom | String/Number | 40rpx | 组件底部间距 |
| padding | String | 40rpx | 组件内边距 |
| backgroundColor | String | transparent | 背景色 |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 额外内容插槽（等同于 extra 插槽） |
| icon | 自定义图标插槽 |
| title | 自定义标题插槽 |
| sub-title | 自定义副标题插槽 |
| extra | 额外内容插槽 |

## 内置图标类型

| 类型 | 图标 | 颜色 | 说明 |
| --- | --- | --- | --- |
| success | checkmark | #67C23A | 成功状态 |
| error | close | #F56C6C | 错误状态 |
| warning | warning | #E6A23C | 警告状态 |
| info | info | #909399 | 信息状态 |

## 注意事项

1. 组件依赖 `zx-icon` 和 `zx-text` 组件，请确保这些组件已正确引入
2. 使用图片作为图标时，图片路径需要包含 `/`、`http` 或 `data:` 
3. 自定义图标时，图标名称需要与引入的图标库名称一致
4. 组件使用 Vue 3 的 `<script setup>` 语法开发，不兼容 Vue 2 项目

## 示例

完整的使用示例请参考 `src/pages/components/result/index.vue` 文件。
