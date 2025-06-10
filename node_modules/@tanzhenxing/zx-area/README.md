# zx-area 省市区选择器

省市区三级联动选择组件，通常与弹出层组件配合使用。

## 平台兼容性

本组件理论上支持 uni-app 全平台，但主要在 H5、微信小程序、App 端进行了测试和优化。

## 引入方式

```vue
<template>
  <zx-area
    :show="showAreaPicker"
    v-model="selectedAreaCode"
    :area-list="areaListData"
    title="选择所在地区"
    @confirm="handleAreaConfirm"
    @cancel="handleAreaCancel"
    @change="handleAreaChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import zxArea from '@/components/zx-area/zx-area.vue'; // 请根据实际路径修改
// 如果您没有全局安装 @vant/area-data，可以在这里引入或自行准备数据
// import { areaList } from '@vant/area-data'; // npm i @vant/area-data

const showAreaPicker = ref(false);
const selectedAreaCode = ref(''); // 选中的地区码，例如：'330102'

// 示例省市区数据 (areaList 格式)
// 建议从 @vant/area-data 获取最新数据，或自行维护
const areaListData = ref({
  province_list: {
    110000: '北京市',
    120000: '天津市',
    310000: '上海市',
    330000: '浙江省',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
    310100: '上海市',
    330100: '杭州市',
    330200: '宁波市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    310101: '黄浦区',
    330102: '上城区',
    330103: '下城区',
    330203: '海曙区',
  },
});

const handleAreaConfirm = (data) => {
  console.log('Area confirmed:', data);
  // data: { selectedValues, selectedOptions, selectedIndexes }
  // selectedValues: ['110000', '110100', '110101'] (地区码数组)
  // selectedOptions: [{text: '北京市', value: '110000'}, ...] (选中项对象数组)
  // selectedIndexes: [0, 0, 0] (各列选中索引)
  selectedAreaCode.value = data.selectedValues[data.selectedValues.length - 1];
  showAreaPicker.value = false;
};

const handleAreaCancel = (data) => {
  console.log('Area canceled:', data);
  showAreaPicker.value = false;
};

const handleAreaChange = (data) => {
  console.log('Area changed:', data);
  // data: { selectedValues, selectedOptions, selectedIndexes, columnIndex }
  // columnIndex: 发生改变的列的索引
};

const openAreaPicker = () => {
  showAreaPicker.value = true;
};
</script>
```

## API

### Props

| 参数                | 说明                                                                 | 类型                  | 默认值        |
| ------------------- | -------------------------------------------------------------------- | --------------------- | ------------- |
| `show`              | 是否显示弹出层                                                       | `Boolean`             | `false`       |
| `v-model`           | 当前选中项对应的地区码 (最后一级的地区码)                            | `String`              | -             |
| `title`             | 顶部栏标题                                                           | `String`              | `选择地区`    |
| `area-list`         | 省市区数据，格式见下方                                                 | `Object`              | `{}`          |
| `columns-num`       | 显示列数，可选值为 `1` (省)、`2` (省市)、`3` (省市区)                 | `Number` \| `String`  | `3`           |
| `columns-placeholder` | 列占位提示文字，例如 `['请选择省', '请选择市', '请选择区']`            | `Array`               | `[]`          |
| `confirm-button-text` | 确认按钮文字                                                         | `String`              | `确认`        |
| `cancel-button-text`  | 取消按钮文字                                                         | `String`              | `取消`        |
| `loading`           | 是否显示加载状态 (暂未完全实现，预留)                                  | `Boolean`             | `false`       |
| `readonly`          | 是否为只读状态，只读状态下无法切换选项                                 | `Boolean`             | `false`       |
| `item-height`       | 选项高度 (单位 px)                                                   | `Number` \| `String`  | `44`          |
| `visible-item-count`| 可见的选项个数 (暂未直接控制 `picker-view` 的 `visible-item-count`)    | `Number` \| `String`  | `5`           |

### areaList 格式

`areaList` 为对象结构，包含 `province_list`、`city_list`、`county_list` 三个 key。
每项以地区码作为 key，省市区名字作为 value。地区码为 6 位数字，前两位代表省份，中间两位代表城市，后两位代表区县，以 `0` 补足 6 位。比如北京的地区码为 `11`，以 `0` 补足 6 位，为 `110000`。

示例数据如下：

```javascript
const areaList = {
  province_list: {
    110000: '北京市',
    120000: '天津市',
  },
  city_list: {
    110100: '北京市',
    120100: '天津市',
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    // ....
  },
};
```

**强烈建议使用 `@vant/area-data` 包来获取最新的中国省市区数据：**

```bash
# 通过 npm
npm i @vant/area-data

# 通过 yarn
yarn add @vant/area-data

# 通过 pnpm
pnpm add @vant/area-data
```

然后在代码中引入：

```javascript
import { areaList } from '@vant/area-data';
```

### Events

| 事件名    | 说明                                                                 | 回调参数                                                                                                |
| --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `confirm` | 点击完成按钮时触发                                                   | `{ selectedValues, selectedOptions, selectedIndexes }`                                                  |
| `cancel`  | 点击取消按钮时触发                                                   | `{ selectedValues, selectedOptions, selectedIndexes }` (返回当前选中项，即使未确认)                       |
| `change`  | 选项改变时触发                                                       | `{ selectedValues, selectedOptions, selectedIndexes, columnIndex }` (columnIndex: 发生改变的列的索引) |

#### 回调参数说明

- `selectedValues`: 选中项的地区码数组，例如 `['330000', '330100', '330102']`
- `selectedOptions`: 选中项的对象数组，例如 `[{ text: '浙江省', value: '330000' }, { text: '杭州市', value: '330100' }, { text: '上城区', value: '330102' }]`
- `selectedIndexes`: 各列选中项的索引数组，例如 `[2, 0, 1]`

### Methods

通过 `ref` 可以获取到 Area 实例并调用实例方法。

| 方法名             | 说明                   | 参数 | 返回值         |
| ------------------ | ---------------------- | ---- | -------------- |
| `confirm`          | 主动触发确认事件       | -    | -              |
| `getSelectedOptions` | 获取当前选中的完整选项 | -    | `PickerOption[]` |

```vue
<template>
  <zx-area ref="areaRef" ... />
  <button @click="getOpts">获取选中项</button>
</template>

<script setup>
import { ref } from 'vue';
const areaRef = ref(null);

const getOpts = () => {
  const options = areaRef.value?.getSelectedOptions();
  console.log(options);
};
</script>
```

## 注意事项

- 本组件依赖 `zx-popup` 组件，请确保已正确引入或全局注册 `zx-popup`。
- 省市区数据 (`areaList`) 需要用户自行提供，推荐使用 `@vant/area-data`。如果数据量较大，请注意小程序的包体积限制。
- `picker-view` 在不同平台的表现可能存在细微差异，样式调整可能需要针对性处理。
- `loading` 和 `visible-item-count` 属性目前为预留，其在 `picker-view` 上的直接控制较为复杂，后续可能会进一步完善。