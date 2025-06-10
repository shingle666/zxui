# zx-dropdown 下拉菜单组件

将动作或菜单折叠到下拉菜单中。

## 使用方式

```html
<zx-dropdown>
  <view class="dropdown-link">
    下拉菜单
    <text class="uni-icons" style="margin-left: 5px;">&#xe6e1;</text>
  </view>
  <template #dropdown>
    <zx-dropdown-menu>
      <zx-dropdown-item command="a">选项1</zx-dropdown-item>
      <zx-dropdown-item command="b">选项2</zx-dropdown-item>
      <zx-dropdown-item command="c">选项3</zx-dropdown-item>
      <zx-dropdown-item command="d" disabled>选项4</zx-dropdown-item>
      <zx-dropdown-item command="e" divided>选项5</zx-dropdown-item>
    </zx-dropdown-menu>
  </template>
</zx-dropdown>
```

## 属性说明

### zx-dropdown 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | '' | 菜单按钮类型 |
| size | String | '' | 菜单尺寸 |
| maxHeight | String / Number | '' | 菜单最大高度 |
| splitButton | Boolean | false | 下拉触发元素呈现为按钮组 |
| disabled | Boolean | false | 是否禁用 |
| placement | String | 'bottom' | 菜单弹出位置: top/top-start/top-end/bottom/bottom-start/bottom-end |
| trigger | String | 'hover' | 触发下拉的行为: hover/click |
| hideOnClick | Boolean | true | 是否在点击菜单项后隐藏菜单 |
| showTimeout | Number | 150 | 展开下拉菜单的延时 |
| hideTimeout | Number | 150 | 收起下拉菜单的延时 |
| popperClass | String | '' | 自定义浮层类名 |
| teleported | Boolean | true | 是否将下拉列表插入至 body 元素 |

### zx-dropdown 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 下拉菜单的触发元素 |
| dropdown | 下拉列表，通常是 `<zx-dropdown-menu>` 组件 |

### zx-dropdown 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | splitButton 为 true 时，点击左侧按钮的回调 | event |
| command | 点击菜单项触发的事件回调 | command 值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现为 true，隐藏为 false |

### zx-dropdown-item 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| command | String / Number / Object | '' | 指令，会传递给 command 回调函数 |
| disabled | Boolean | false | 是否禁用 |
| divided | Boolean | false | 是否显示分隔符 |
| icon | String | '' | 图标 |

### zx-dropdown-item 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 下拉项内容 |
| icon | 自定义图标 |
