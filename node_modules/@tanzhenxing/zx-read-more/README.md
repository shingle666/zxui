# zx-read-more 阅读更多组件

一个用于内容收起/展开的通用组件，支持 H5、小程序、APP，基于 Vue3 setup 语法，兼容多端。

## 基本用法

```vue
<zx-read-more :showHeight="80">
  <text>很长的内容...</text>
</zx-read-more>
```

## 属性说明
| 属性名      | 说明                       | 类型            | 默认值         |
| ----------- | -------------------------- | --------------- | -------------- |
| showHeight  | 内容超出此高度才显示展开按钮 | String/Number   | 400            |
| toggle      | 展开后是否显示收起按钮      | Boolean         | false          |
| closeText   | 关闭时的提示文字           | String          | 展开阅读全文    |
| openText    | 展开时的提示文字           | String          | 收起           |
| color       | 提示文字颜色               | String          | #2979ff        |
| fontSize    | 提示文字大小(px)           | String/Number   | 14             |
| shadowStyle | 阴影样式对象               | Object          | 见下方         |
| textIndent  | 段落首行缩进               | String          | 2em            |
| name        | 事件回调参数               | String/Number   | ''             |

### shadowStyle 默认值
```js
{
  backgroundImage: 'linear-gradient(-180deg, rgba(255,255,255,0) 0%, #fff 80%)',
  paddingTop: '100px',
  marginTop: '-100px',
}
```

## 事件说明
| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| open   | 内容被展开时触发 | name     |
| close  | 内容被收起时触发 | name     |

## 插槽
| 名称   | 说明                 |
| ------ | -------------------- |
| 默认   | 展示的内容           |
| toggle | 自定义展开/收起区域  |

## 进阶用法

### 自定义展开/收起文字
```vue
<zx-read-more closeText="查看更多" openText="收起内容">
  <text>内容...</text>
</zx-read-more>
```

### 自定义插槽
```vue
<zx-read-more>
  <text>内容...</text>
  <template #toggle>
    <view style="color: #4caf50; font-weight: bold; text-align: center;">点我展开/收起</view>
  </template>
</zx-read-more>
```

### 事件监听
```vue
<zx-read-more @open="onOpen" @close="onClose">
  <text>内容...</text>
</zx-read-more>
```

## 注意事项
- 组件已兼容 H5、各类小程序、APP（nvue），无需关心平台差异。
- 内容高度计算基于 uniapp 官方 API，无浏览器特有 DOM。
- 如需自定义样式，可通过外部 class 或 style 覆盖。

## 完整示例
详见 `src/pages/components/read-more/index.vue`。
