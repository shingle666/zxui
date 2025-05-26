# zx-lucky-grid 抽奖九宫格组件

基于 uni-app + Vue3 setup 语法的跨端抽奖九宫格组件，支持 H5、小程序、App（App 端建议使用旧版，详见下方说明）。

## 平台兼容性
- H5：完全支持
- 小程序：完全支持
- App：最新版暂不支持，建议使用 `uni-luck-draw@1.3.9`

## 属性（Props）
| 属性名         | 类型            | 默认值      | 说明                       |
| -------------- | --------------- | ----------- | -------------------------- |
| width          | String          | '600rpx'    | 组件宽度                   |
| height         | String          | '600rpx'    | 组件高度                   |
| cols           | String/Number   | 3           | 列数                       |
| rows           | String/Number   | 3           | 行数                       |
| blocks         | Array           | []          | 背景区块配置               |
| prizes         | Array           | []          | 奖品配置                   |
| buttons        | Array           | []          | 按钮配置（多个按钮）       |
| button         | Object          | undefined   | 单个按钮配置               |
| defaultConfig  | Object          | {}          | 九宫格全局配置             |
| defaultStyle   | Object          | {}          | 默认样式                   |
| activeStyle    | Object          | {}          | 选中样式                   |

## 事件（Events）
| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| start  | 抽奖开始时触发 | ...args  |
| end    | 抽奖结束时触发 | ...args  |

## 方法（ref 暴露）
通过 `ref` 获取组件实例，可调用以下方法：

- `init()`：重新初始化九宫格
- `play(...args)`：开始抽奖
- `stop(...args)`：停止抽奖
- `getImage()`：获取当前 canvas 图片（Promise）

## 使用示例
详见 `src/pages/components/lucky-grid/index.vue`

## 注意事项
- 组件内部不使用任何浏览器特有 DOM API，适配多端。
- App 端如需使用请安装旧版：`npm i uni-luck-draw@1.3.9`
- 图片需通过 `imgs` 字段传递，详见示例。

## 配置说明
- blocks、prizes、buttons、button 的详细配置请参考 [uni-luck-draw 官方文档](https://ext.dcloud.net.cn/plugin?id=3928) 或示例。
