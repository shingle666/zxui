# zx-line 线条

## 介绍

`zx-line` 组件用于显示一根线条，常用于内容分隔、装饰等场景。支持横向和竖向两种模式，可自定义线条的颜色、粗细、样式等属性。

## 平台兼容性

- [x] APP
- [x] H5
- [x] 微信小程序
- [x] 支付宝小程序
- [x] 其他小程序平台

## 基本用法

### 基础用法

```html
<zx-line></zx-line>
```

### 自定义颜色

```html
<zx-line color="#2979ff"></zx-line>
<zx-line color="red"></zx-line>
```

### 自定义长度

```html
<zx-line length="50px"></zx-line>
<zx-line length="50%"></zx-line>
```

### 虚线样式

```html
<zx-line dashed></zx-line>
```

### 竖向线条

```html
<zx-line direction="col" length="100px"></zx-line>
```

### 线条粗细

```html
<zx-line width="3px"></zx-line>
```

### 圆角线条

```html
<zx-line radius="3px"></zx-line>
```

### 线条样式

```html
<zx-line borderStyle="dotted"></zx-line>
```

### 渐变色线条

```html
<zx-line color="linear-gradient(to right, #ff3366, #ff6633)" :hairline="false"></zx-line>
```

### 带动画效果

```html
<zx-line animation color="#2979ff"></zx-line>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 线条的颜色 | String | #d6d7d9 |
| length | 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等 | String / Number | 100% |
| direction | 线条的方向，row-横向，col-竖向 | String | row |
| hairline | 是否显示细线条 | Boolean | true |
| margin | 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px" | String / Number | 0 |
| dashed | 是否虚线，true-虚线，false-实线 | Boolean | false |
| width | 线条的粗细，带单位的值，如"2px" | String / Number | 1px |
| radius | 线条的圆角，带单位的值，如"3px" | String / Number | 0 |
| borderStyle | 线条的样式，可选值为 solid、dashed、dotted | String | solid |
| animation | 是否有过渡动画效果 | Boolean | false |

## 常见问题

### 如何实现完全自定义的线条？

如果需要完全自定义线条，可以通过组合设置color、width、borderStyle等属性来实现。例如：

```html
<!-- 彩色渐变线条 -->
<zx-line 
  color="linear-gradient(45deg, #f43f3b, #ec008c)" 
  :hairline="false" 
  width="4px"
  radius="2px"
  animation
></zx-line>

<!-- 虚线分隔线 -->
<zx-line 
  dashed 
  color="#2979ff" 
  margin="20px 0"
></zx-line>

<!-- 竖向装饰线 -->
<zx-line 
  direction="col" 
  length="40px" 
  color="#f56c6c"
  width="3px"
  radius="3px"
></zx-line>
```

### 关于hairline属性

`hairline` 属性为true时，会通过CSS的transform: scale()方法将线条缩小为0.5px，实现更细的线条效果，适合用于分隔线等场景。

当需要使用渐变色等特殊效果时，建议将hairline设置为false。
