# zx-area-picker 省市区选择器

## 简介

`zx-area-picker` 是一个基于 uni-app 的省市区三级联动选择器组件，支持自定义数据源，可用于各类需要选择地区的场景。

## 特性

- 支持省市区三级联动选择
- 可通过地区码回显地区数据
- 可自定义文本样式和颜色
- 可选择性展示省市区
- 支持加载状态和错误处理
- 支持默认选中首项

## 安装

在项目的 `src/components` 目录下创建 `zx-area-picker` 文件夹，并将组件文件复制到该文件夹中。

## 基础用法

```vue
<template>
  <view class="container">
    <view class="form-item">
      <view class="label">所在地区:</view>
      <view class="picker-wrapper">
        <zx-area-picker @change="onAreaChange" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const onAreaChange = (e) => {
  console.log('选择的地区:', e);
};
</script>

<style>
.container {
  padding: 20rpx;
}
.form-item {
  display: flex;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #eee;
}
.label {
  width: 180rpx;
  font-size: 28rpx;
  color: #333;
}
.picker-wrapper {
  flex: 1;
}
</style>
```

## 设置默认值

```vue
<template>
  <view class="container">
    <view class="form-item">
      <view class="label">所在地区:</view>
      <view class="picker-wrapper">
        <zx-area-picker :code="areaCode" @change="onAreaChange" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const areaCode = ref(330102); // 杭州市上城区的地区码

const onAreaChange = (e) => {
  console.log('选择的地区:', e);
};
</script>
```

## 自定义样式

```vue
<zx-area-picker
  :code="areaCode"
  size="32rpx"
  color="#999999"
  activeColor="#007aff"
  placeholder="点击选择地区"
  @change="onAreaChange"
/>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| url | String | 'https://cdn.mp.ac.cn/json/region.json' | 数据源URL |
| code | Number/String | 0 | 地区码，用于设置默认选中的地区 |
| rangeKey | String | '' | 指定显示的字段名 |
| size | String | '30rpx' | 文本字体大小 |
| color | String | '#666666' | 文本颜色 |
| activeColor | String | '#333333' | 已选文本颜色 |
| disabled | Boolean | false | 是否禁用选择 |
| showProvince | Boolean | true | 是否展示省份 |
| showCity | Boolean | true | 是否展示城市 |
| showDistrict | Boolean | true | 是否展示区县 |
| loading | Boolean | false | 是否显示加载状态 |
| placeholder | String | '请选择地区' | 占位文本 |
| defaultFirst | Boolean | false | 是否默认选中第一项 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选择完成后触发 | { code, province, city, district, address, index } |
| select | 选择某一项时触发 | { code, province, city, district, address, index } |
| cancel | 取消选择时触发 | event |
| error | 加载数据出错时触发 | errorMessage |

### 回调参数说明

- `code`：所选地区的地区码
- `province`：省份名称
- `city`：城市名称
- `district`：区县名称
- `address`：完整地址（省市区）
- `index`：所选地区在选择器中的索引数组 [省索引, 市索引, 区索引]

## 方法说明

通过 ref 可以获取到组件实例并调用组件方法：

```vue
<template>
  <zx-area-picker ref="areaPicker" />
  <button @click="reloadArea">重新加载</button>
</template>

<script setup>
import { ref } from 'vue';

const areaPicker = ref(null);

const reloadArea = () => {
  areaPicker.value.reload();
};
</script>
```

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| reload | 重新加载地区数据 | - |
| getAddressInfo | 根据地区码获取地址信息 | code: 地区码 |
| updateAreaByCode | 根据地区码更新选中状态 | - |

## 数据格式

组件默认使用 `https://cdn.mp.ac.cn/json/region.json` 作为数据源，数据格式如下：

```json
[
  {
    "code": "110000",
    "name": "北京市",
    "children": [
      {
        "code": "110100",
        "name": "北京市",
        "children": [
          {
            "code": "110101",
            "name": "东城区"
          },
          // 更多区县...
        ]
      }
    ]
  },
  // 更多省份...
]
```

## 注意事项

1. 组件内部会通过地区码自动回显地区信息，所以地区码必须是有效的
2. 如需自定义数据源，请确保数据格式与示例一致
3. 若数据加载失败，可点击重试按钮重新加载数据
