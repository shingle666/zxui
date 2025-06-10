# zx-canvas 组件

一个跨平台的 canvas 组件，支持多端使用，优化了触摸事件和绘图 API，提供统一的接口和更好的性能。

## 特性

- 跨平台支持：H5、App、微信小程序、支付宝小程序等
- 统一的 Canvas API 封装，抹平各平台差异
- 支持触摸和鼠标事件处理
- 提供高清显示支持（hidpi）
- 支持自定义画布尺寸
- 错误处理机制
- 渐变支持

## 安装与使用

### 引入组件

```vue
<script>
import ZxCanvas from '@/components/zx-canvas/zx-canvas.vue';

export default {
  components: {
    ZxCanvas
  }
}
</script>
```

### 基本用法

```vue
<template>
  <view class="container">
    <zx-canvas 
      ref="canvas" 
      :is-use="true" 
      :width="300" 
      :height="200"
      @ready="onCanvasReady"
    />
  </view>
</template>

<script>
export default {
  methods: {
    onCanvasReady(canvas) {
      const ctx = canvas.context;
      
      // 绘制矩形
      ctx.setFillStyle('#007AFF');
      ctx.fillRect(20, 20, 100, 100);
      
      // 绘制文字
      ctx.setFillStyle('#333333');
      ctx.setFontSize(16);
      ctx.fillText('Hello Canvas', 150, 60);
      
      // 应用绘制
      ctx.draw();
    }
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| isUse | Boolean | false | 是否使用组件。设置为 true 可关闭控制台提示和演示 |
| disableScroll | Boolean | false | 是否在触摸时禁止页面滚动 |
| hidpi | Boolean | true | 是否启用高清处理（在 H5 和 App-vue 中有效） |
| width | Number/String | 300 | 画布宽度 |
| height | Number/String | 225 | 画布高度 |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| ready | 组件准备就绪，可以开始绘制 | canvas 上下文对象 |
| touch_start | 触摸开始事件 | 触摸事件对象 |
| touch_move | 触摸移动事件 | 触摸事件对象 |
| touch_end | 触摸结束事件 | 触摸事件对象 |
| touch_cancel | 触摸取消事件 | - |
| error | 发生错误时触发 | 错误信息对象 {errMsg: string} |

## 方法说明

通过 ref 获取组件实例后，可以调用以下方法：

### canvasToTempFilePath(options)

将画布内容保存为临时文件。

**参数**：

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| x | Number | 0 | 指定的画布区域的左上角横坐标 |
| y | Number | 0 | 指定的画布区域的左上角纵坐标 |
| width | Number | 画布宽度 | 指定的画布区域的宽度 |
| height | Number | 画布高度 | 指定的画布区域的高度 |
| destWidth | Number | width * 屏幕像素比 | 输出的图片的宽度 |
| destHeight | Number | height * 屏幕像素比 | 输出的图片的高度 |
| fileType | String | 'png' | 目标文件的类型，支持 'jpg' 或 'png' |
| quality | Number | 1.0 | 图片的质量，取值范围为 (0, 1]，不支持 png 格式 |
| success | Function |  | 接口调用成功的回调函数 |
| fail | Function |  | 接口调用失败的回调函数 |
| complete | Function |  | 接口调用结束的回调函数（调用成功、失败都会执行） |

### canvasGetImageData(options)

获取画布指定区域的像素数据。

**参数**：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| x | Number | 将要被提取的图像数据矩形区域的左上角 x 坐标 |
| y | Number | 将要被提取的图像数据矩形区域的左上角 y 坐标 |
| width | Number | 将要被提取的图像数据矩形区域的宽度 |
| height | Number | 将要被提取的图像数据矩形区域的高度 |
| success | Function | 接口调用成功的回调函数，返回像素数据 |
| fail | Function | 接口调用失败的回调函数 |
| complete | Function | 接口调用结束的回调函数 |

### canvasPutImageData(options)

将像素数据设置到画布。

**参数**：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| data | Uint8ClampedArray | 图像像素点数据，一维数组，每四项表示一个像素点的 rgba |
| x | Number | 源图像数据在目标画布中的位置 x 坐标 |
| y | Number | 源图像数据在目标画布中的位置 y 坐标 |
| width | Number | 源图像数据矩形区域的宽度 |
| height | Number | 源图像数据矩形区域的高度 |
| success | Function | 接口调用成功的回调函数 |
| fail | Function | 接口调用失败的回调函数 |
| complete | Function | 接口调用结束的回调函数 |

### createLinearGradient(x0, y0, x1, y1)

创建线性渐变。

**参数**：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| x0 | Number | 起点的 x 坐标 |
| y0 | Number | 起点的 y 坐标 |
| x1 | Number | 终点的 x 坐标 |
| y1 | Number | 终点的 y 坐标 |

**返回值**：CanvasGradient 对象，可以通过 addColorStop() 方法添加渐变色。

### createCircularGradient(x, y, r)

创建圆形渐变。

**参数**：

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| x | Number | 圆心的 x 坐标 |
| y | Number | 圆心的 y 坐标 |
| r | Number | 圆的半径 |

**返回值**：CanvasGradient 对象，可以通过 addColorStop() 方法添加渐变色。

## 使用示例

### 绘制渐变矩形

```vue
<template>
  <view class="container">
    <zx-canvas ref="canvas" :is-use="true" @ready="onCanvasReady" />
  </view>
</template>

<script>
export default {
  methods: {
    onCanvasReady(canvas) {
      const ctx = canvas.context;
      
      // 创建线性渐变
      const gradient = ctx.createLinearGradient(0, 0, 200, 0);
      gradient.addColorStop(0, '#ff6b81');
      gradient.addColorStop(1, '#5352ed');
      
      // 设置填充样式为渐变
      ctx.fillStyle = gradient;
      ctx.fillRect(20, 20, 200, 100);
      
      // 应用绘制
      ctx.draw();
    }
  }
}
</script>
```

### 触摸绘制

```vue
<template>
  <view class="container">
    <zx-canvas
      ref="canvas"
      :is-use="true"
      @ready="onCanvasReady"
      @touch_start="onTouchStart"
      @touch_move="onTouchMove"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      lastX: 0,
      lastY: 0
    }
  },
  methods: {
    onCanvasReady(canvas) {
      this.ctx = canvas.context;
      this.ctx.setLineWidth(5);
      this.ctx.setLineCap('round');
      this.ctx.setStrokeStyle('#3498db');
    },
    onTouchStart(e) {
      const touch = e.touches[0];
      this.lastX = touch.x;
      this.lastY = touch.y;
    },
    onTouchMove(e) {
      const touch = e.touches[0];
      const ctx = this.ctx;
      
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(touch.x, touch.y);
      ctx.stroke();
      
      // 应用绘制，保留之前的绘制内容
      ctx.draw(true);
      
      // 更新最后的触摸位置
      this.lastX = touch.x;
      this.lastY = touch.y;
    }
  }
}
</script>
```

## 平台兼容性

| 平台 | 支持情况 | 动画流畅度 |
| --- | --- | --- |
| H5 | 完全支持 | 流畅 |
| App-vue | 完全支持 | 可能掉帧 |
| 微信小程序 | 完全支持 | 流畅 |
| 支付宝小程序 | 支持 | 中等 |
| 百度小程序 | 支持 | 中等 |
| 抖音小程序 | 支持 | 中等 |
| QQ小程序 | 支持 | 中等 |
| 快手小程序 | 支持 | 中等 |
| 京东小程序 | 支持 | 中等 |

## 注意事项

1. 不同平台的 Canvas 性能有差异，H5 和微信小程序表现最佳。
2. 在 App-vue 中，为获得更流畅的动画，建议使用 renderjs 技术。
3. 涉及大量频繁绘制操作时，尽量优化绘制次数，减少不必要的重绘。
4. 对于大尺寸画布，请注意性能消耗。
5. 在小程序中，canvas 为原生组件，层级高于前端组件，需注意与其他组件的层级关系。

## 许可证

MIT
