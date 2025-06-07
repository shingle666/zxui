# ZX-FAB 悬浮按钮组件

> 一个功能丰富、高度可定制的悬浮按钮组件，支持多种位置、方向和动画效果。

## 功能特点

- 支持四个角落定位（左上、右上、左下、右下）
- 支持水平和垂直方向展开
- 多种动画效果（缩放、淡入淡出、滑动）
- 高度可定制的样式
- 可自定义按钮大小、图标和颜色

## 基本用法

```html
<template>
  <zx-fab 
    :content="fabItems" 
    @trigger="handleTrigger" 
    @fabClick="handleFabClick"
  />
</template>

<script setup>
import { ref } from 'vue';

const fabItems = ref([
  {
    icon: 'star',
    text: '收藏',
    active: false
  },
  {
    icon: 'share',
    text: '分享',
    active: false
  },
  {
    icon: 'heart',
    text: '喜欢',
    active: false,
    selectedIcon: 'heart-fill'
  }
]);

const handleTrigger = ({ index, item }) => {
  console.log('点击了菜单项', index, item);
  // 可以在这里处理菜单项的激活状态
  fabItems.value[index].active = !fabItems.value[index].active;
};

const handleFabClick = () => {
  console.log('点击了主按钮');
};
</script>
```

## 属性说明

| 属性名              | 类型             | 默认值      | 说明                                      |
|---------------------|------------------|------------|-------------------------------------------|
| pattern             | Object           | {}         | 样式模式对象，包含颜色等样式配置          |
| horizontal          | String           | 'left'     | 水平位置，可选值: 'left', 'right'         |
| vertical            | String           | 'bottom'   | 垂直位置，可选值: 'top', 'bottom'         |
| direction           | String           | 'horizontal' | 展开方向，可选值: 'horizontal', 'vertical' |
| content             | Array            | []         | 菜单项数组                                |
| show                | Boolean          | false      | 初始是否展开菜单                          |
| popMenu             | Boolean          | true       | 是否显示弹出菜单                          |
| mainButtonSize      | Number/String    | 55         | 主按钮尺寸                                |
| itemButtonSize      | Number/String    | 45         | 菜单项按钮高度                            |
| shadow              | Boolean          | true       | 是否显示阴影                              |
| zIndex              | Number           | 10         | 组件z-index值                             |
| animationType       | String           | 'scale'    | 动画类型，可选值: 'scale', 'fade', 'slide' |
| animationDuration   | Number           | 300        | 动画持续时间(毫秒)                        |
| mainIcon            | String           | 'plus'     | 主按钮图标                                |
| closeOnClickOutside | Boolean          | true       | 点击外部是否关闭菜单                      |
| margin              | Number/String    | 15         | 边距                                      |
| bottom              | Number/String    | 30         | 底部距离                                  |
| borderRadius        | Number/String    | 45         | 圆角大小                                  |

### pattern 对象属性

| 属性名          | 类型    | 默认值     | 说明                    |
|----------------|---------|-----------|-------------------------|
| color          | String  | '#3c3e49' | 菜单项文字和图标颜色     |
| selectedColor  | String  | '#007AFF' | 菜单项选中时文字和图标颜色 |
| backgroundColor| String  | '#fff'    | 菜单背景色              |
| buttonColor    | String  | '#007AFF' | 主按钮背景色            |
| iconColor      | String  | '#fff'    | 主按钮图标颜色          |

### content 数组项属性

| 属性名       | 类型    | 必填  | 说明                            |
|-------------|---------|------|----------------------------------|
| icon        | String  | 是   | 菜单项图标名称                   |
| selectedIcon| String  | 否   | 菜单项选中时图标名称             |
| text        | String  | 否   | 菜单项文字                       |
| active      | Boolean | 否   | 菜单项是否激活                   |
| iconSize    | String  | 否   | 菜单项图标大小，默认为'55rpx'    |
| autoClose   | Boolean | 否   | 点击菜单项后是否自动关闭，默认true |

## 事件

| 事件名    | 说明                               | 回调参数                             |
|-----------|-----------------------------------|--------------------------------------|
| fabClick  | 点击主按钮时触发                   | -                                   |
| trigger   | 点击菜单项时触发                   | {index: 索引, item: 菜单项}         |
| open      | 菜单打开时触发                     | -                                   |
| close     | 菜单关闭时触发                     | -                                   |

## 方法

通过ref可以获取组件实例并调用以下方法：

| 方法名  | 说明       | 参数 |
|---------|-----------|------|
| open    | 打开菜单   | -    |
| close   | 关闭菜单   | -    |

## 示例

### 不同位置
```html
<!-- 左下角 (默认) -->
<zx-fab :content="items" horizontal="left" vertical="bottom" />

<!-- 右下角 -->
<zx-fab :content="items" horizontal="right" vertical="bottom" />

<!-- 左上角 -->
<zx-fab :content="items" horizontal="left" vertical="top" />

<!-- 右上角 -->
<zx-fab :content="items" horizontal="right" vertical="top" />
```

### 不同方向
```html
<!-- 水平方向展开 (默认) -->
<zx-fab :content="items" direction="horizontal" />

<!-- 垂直方向展开 -->
<zx-fab :content="items" direction="vertical" />
```

### 自定义样式
```html
<zx-fab 
  :content="items"
  :pattern="{
    color: '#333',
    selectedColor: '#ff6700',
    backgroundColor: '#f5f5f5',
    buttonColor: '#ff6700',
    iconColor: '#fff'
  }"
  :mainButtonSize="60"
  :itemButtonSize="50"
  :shadow="true"
  :borderRadius="30"
/>
```

### 不同动画效果
```html
<!-- 缩放动画 (默认) -->
<zx-fab :content="items" animationType="scale" />

<!-- 淡入淡出动画 -->
<zx-fab :content="items" animationType="fade" />

<!-- 滑动动画 -->
<zx-fab :content="items" animationType="slide" />
```

### 自定义图标
```html
<zx-fab :content="items" mainIcon="menu" />
```

### 禁用外部点击关闭
```html
<zx-fab :content="items" :closeOnClickOutside="false" />
```

### 程序控制打开关闭
```html
<template>
  <view>
    <button @click="openMenu">打开菜单</button>
    <button @click="closeMenu">关闭菜单</button>
    <zx-fab ref="fabRef" :content="items" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const fabRef = ref(null);

const openMenu = () => {
  fabRef.value.open();
};

const closeMenu = () => {
  fabRef.value.close();
};
</script>
```
