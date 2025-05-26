# zx-indexed-list 组件

基于 uni-app 的索引列表组件，支持 H5、App、各类小程序，适用于联系人、城市、机场等分组索引场景。

## 组件特性
- 支持分组索引、字母导航
- 支持多平台（H5、App、微信/支付宝/百度/抖音/QQ/快手等小程序）
- 可选选择模式，支持多选
- 无浏览器特有 DOM 依赖

## 属性（Props）
| 属性名      | 类型    | 默认值   | 说明                       |
| ----------- | ------- | -------- | -------------------------- |
| options     | Array   | []       | 索引列表数据，见下方格式   |
| showSelect  | Boolean | false    | 是否为选择模式（多选）     |

### options 数据格式
```js
[
  {
    letter: 'A',
    data: [
      '阿克苏机场',
      '阿拉山口机场',
      // ...
    ]
  },
  {
    letter: 'B',
    data: [
      '保山机场',
      '包头机场',
      // ...
    ]
  }
]
```

## 事件（Events）
| 事件名 | 说明                     | 回调参数                      |
| ------ | ------------------------ | ----------------------------- |
| click  | 点击列表项时触发         | { item, select }              |

- `item`：当前点击的项对象
- `select`：当前已选中的所有项（仅在 showSelect=true 时）

## 使用示例
详见 `src/pages/components/indexed-list/index.vue`

## 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序

## 参考文档
- [uni-indexed-list 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-indexed-list.html)
