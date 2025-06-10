# zx-picker 选择器

## 简介

`zx-picker` 是一个基于 uni-app 的选择器组件，完全兼容官方 picker 组件的所有功能，并提供更好的跨平台一致性和自定义选择器功能。支持五种选择器模式：普通选择器、多列选择器、时间选择器、日期选择器和省市区选择器。

## 特性

- 完全兼容 uni-app 官方 picker 组件 API
- 提供原生实现和自定义实现两种方式
- 支持五种选择器模式
- 更好的跨平台兼容性
- 自定义工具栏和样式

## 安装

在项目中引入组件：

```js
// 在页面中引入
import zxPicker from '@/components/zx-picker/zx-picker.vue'

export default {
  components: {
    zxPicker
  }
}
```

## 基本用法

### 普通选择器

```html
<template>
  <view>
    <zx-picker
      mode="selector"
      :range="range"
      :value="index"
      @change="bindPickerChange"
    >
      <view class="uni-input">{{range[index]}}</view>
    </zx-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      range: ['选项1', '选项2', '选项3', '选项4', '选项5']
    }
  },
  methods: {
    bindPickerChange(e) {
      this.index = e.detail.value
    }
  }
}
</script>
```

### 多列选择器

```html
<template>
  <view>
    <zx-picker
      mode="multiSelector"
      :range="range"
      :value="value"
      @change="bindMultiPickerChange"
      @columnchange="bindMultiPickerColumnChange"
    >
      <view class="uni-input">{{range[0][value[0]]}}，{{range[1][value[1]]}}</view>
    </zx-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: [0, 0],
      range: [
        ['北京', '上海', '广州', '深圳'],
        ['春', '夏', '秋', '冬']
      ]
    }
  },
  methods: {
    bindMultiPickerChange(e) {
      this.value = e.detail.value
    },
    bindMultiPickerColumnChange(e) {
      // 当某一列变化时触发
      console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    }
  }
}
</script>
```

### 时间选择器

```html
<template>
  <view>
    <zx-picker
      mode="time"
      :value="time"
      start="09:00"
      end="21:00"
      @change="bindTimeChange"
    >
      <view class="uni-input">{{time}}</view>
    </zx-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      time: '12:30'
    }
  },
  methods: {
    bindTimeChange(e) {
      this.time = e.detail.value
    }
  }
}
</script>
```

### 日期选择器

```html
<template>
  <view>
    <zx-picker
      mode="date"
      :value="date"
      :start="startDate"
      :end="endDate"
      @change="bindDateChange"
    >
      <view class="uni-input">{{date}}</view>
    </zx-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      date: '2023-05-15',
      startDate: '2020-01-01',
      endDate: '2025-12-31'
    }
  },
  methods: {
    bindDateChange(e) {
      this.date = e.detail.value
    }
  }
}
</script>
```

### 省市区选择器

```html
<template>
  <view>
    <zx-picker
      mode="region"
      :value="region"
      @change="bindRegionChange"
    >
      <view class="uni-input">{{region[0]}} {{region[1]}} {{region[2]}}</view>
    </zx-picker>
  </view>
</template>

<script>
export default {
  data() {
    return {
      region: ['广东省', '广州市', '海珠区']
    }
  },
  methods: {
    bindRegionChange(e) {
      this.region = e.detail.value
    }
  }
}
</script>
```

### 自定义选择器（显示为弹窗）

```html
<template>
  <view>
    <view @click="showPicker = true">点击选择</view>
    <zx-picker
      mode="customSelector"
      :show="showPicker"
      :range="range"
      :value="index"
      @change="onCustomPickerChange"
      @cancel="onCustomPickerCancel"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      showPicker: false,
      index: 0,
      range: ['选项1', '选项2', '选项3', '选项4', '选项5']
    }
  },
  methods: {
    onCustomPickerChange(e) {
      this.index = e.detail.value
      this.showPicker = false
    },
    onCustomPickerCancel() {
      this.showPicker = false
    }
  }
}
</script>
```

## API 参考

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| mode | String | 'selector' | 选择器类型，可选值：selector、multiSelector、time、date、region、customSelector、customTime |
| range | Array | [] | selector 和 multiSelector 模式的数据源 |
| rangeKey | String | '' | 当 range 是对象数组时，指定 Object 中 key 的值作为选择器显示内容 |
| value | Number/String/Array | 0 | 选择器的值 |
| disabled | Boolean | false | 是否禁用 |
| selectorType | String | 'auto' | 大屏时的UI类型，可选值：picker、select、auto |

#### 自定义弹窗模式特有属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 是否显示选择器弹窗 |
| showToolbar | Boolean | true | 是否显示顶部工具栏 |
| title | String | '' | 工具栏标题 |
| cancelText | String | '取消' | 取消按钮文字 |
| confirmText | String | '确定' | 确认按钮文字 |
| cancelColor | String | '#909193' | 取消按钮颜色 |
| confirmColor | String | '#3c9cff' | 确认按钮颜色 |
| closeOnClickOverlay | Boolean | true | 是否在点击遮罩层后关闭 |
| loading | Boolean | false | 是否显示加载中 |
| immediateChange | Boolean | false | 是否在手指松开时立即触发 change 事件 |

#### 时间和日期选择器特有属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| start | String | '' | 开始日期/时间 |
| end | String | '' | 结束日期/时间 |
| fields | String | 'day' | 日期颗粒度，可选值：year、month、day |

#### 省市区选择器特有属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| customItem | String | '' | 可为每一列的顶部添加一个自定义的项 |

### Events

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| change | 选择器值改变时触发 | event.detail = { value } |
| cancel | 取消选择时触发 | - |
| columnchange | 多列选择器某一列的值改变时触发 | event.detail = { column, value } |
| pickerchange | 自定义选择器的值改变时触发 | event.detail = { value } |

## 平台差异说明

- **省市区选择器**：App、H5、快手小程序不支持，其他平台支持
- **自定义模式**：所有平台都支持

## 注意事项

1. 基本用法中，需要将选择器内容包裹在插槽内
2. 自定义弹窗模式下，推荐使用 `customSelector` 或 `customTime` 模式
3. 在不同平台下，原生选择器的外观和交互可能有所不同
4. 使用自定义模式可以获得更一致的跨平台体验
