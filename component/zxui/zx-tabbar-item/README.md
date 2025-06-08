# zx-tabbar-item 底部导航栏子项

用于 zx-tabbar 组件的子项，支持图标、文本、徽标、圆点等。

## 基本用法
```vue
<zx-tabbar-item text="首页" icon="home" :active="true" />
```

## 属性说明
| 属性名      | 说明                                   | 类型                | 默认值      |
|-------------|----------------------------------------|---------------------|-------------|
| name        | 唯一标识，作为与 zx-tabbar 的 value 匹配 | String/Number       | -           |
| icon        | 图标名/图片                            | String              | -           |
| text        | 描述文本                               | String              | -           |
| badge       | 右上角角标提示信息                      | String/Number       | -           |
| dot         | 是否显示圆点（覆盖 badge）              | Boolean             | false       |
| badgeStyle  | 徽标自定义样式（对象或字符串）           | Object/String       | -           |
| active      | 是否激活（高亮）                        | Boolean             | false       |
| activeColor | 激活时颜色                              | String              | #ff0000     |
| inactiveColor| 未激活时颜色                           | String              | #7d7e80     |
| customStyle | 外部自定义样式                          | Object              | {}          |

## 事件说明
| 事件名 | 说明         | 回调参数      |
|--------|--------------|---------------|
| click  | 点击时触发   | name          |

## 示例
```vue
<zx-tabbar-item text="首页" icon="home" :active="true" badge="5" />
<zx-tabbar-item text="消息" icon="message" dot />
```

## 注意事项
- 建议配合 zx-tabbar 组件使用
- 支持多端（H5/小程序/APP）

## 参考文档
- [uView tabbar 官方文档](https://uviewui.com/components/tabbar.html) 