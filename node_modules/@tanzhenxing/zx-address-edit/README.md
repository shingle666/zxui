# zx-address-edit 地址编辑

地址编辑组件，用于新建、更新、删除地址信息。

## 引入

```javascript
import ZxAddressEdit from '@/components/zx-address-edit/zx-address-edit.vue';
```

## 代码演示

### 基础用法

```vue
<template>
  <view>
    <zx-address-edit
      :area-list="areaList" 
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const areaList = ref({
  province_list: {
    110000: '北京市',
    120000: '天津市'
  },
  city_list: {
    110100: '北京市',
    120100: '天津市'
  },
  county_list: {
    110101: '东城区',
    110102: '西城区',
    120101: '和平区',
    120102: '河东区'
  }
});
const searchResult = ref([]);

const onSave = (data) => {
  console.log('save', data);
  uni.showToast({ title: '保存' });
};

const onDelete = (data) => {
  console.log('delete', data);
  uni.showToast({ title: '删除' });
};

const onChangeDetail = (val) => {
  if (val) {
    searchResult.value = [
      {
        name: '黄龙万科中心',
        address: '杭州市西湖区',
      },
    ];
  } else {
    searchResult.value = [];
  }
};
</script>
```

## API

### Props

| 参数                   | 说明                                   | 类型                      | 默认值    |
| ---------------------- | -------------------------------------- | ------------------------- | --------- |
| area-list              | 地区列表                               | Object                    | -         |
| area-columns-placeholder | 地区选择列占位提示文字                 | String[]                  | `[]`      |
| area-placeholder       | 地区输入框占位提示文字                 | String                    | `选择省 / 市 / 区` |
| address-info           | 地址信息初始值                         | Object                    | `{}`      |
| search-result          | 详细地址搜索结果                       | Array                     | `[]`      |
| show-delete            | 是否显示删除按钮                       | Boolean                   | `false`   |
| show-set-default       | 是否显示默认地址栏                     | Boolean                   | `false`   |
| show-search-result     | 是否显示搜索结果                       | Boolean                   | `false`   |
| show-area              | 是否显示地区                           | Boolean                   | `true`    |
| show-detail            | 是否显示详细地址                       | Boolean                   | `true`    |
| disable-area           | 是否禁用地区选择                       | Boolean                   | `false`   |
| save-button-text       | 保存按钮文字                           | String                    | `保存`    |
| delete-button-text     | 删除按钮文字                           | String                    | `删除`    |
| detail-rows            | 详细地址输入框行数                     | Number | String           | `1`       |
| detail-maxlength       | 详细地址最大长度                       | Number | String           | `200`     |
| is-saving              | 是否显示保存按钮加载动画               | Boolean                   | `false`   |
| is-deleting            | 是否显示删除按钮加载动画               | Boolean                   | `false`   |
| tel-validator          | 手机号格式校验函数                     | Function                  | -         |
| tel-maxlength          | 手机号最大长度                         | Number | String           | -         |
| validator              | 自定义校验函数 `(key, value) => string` | Function                  | -         |

### Events

| 事件名         | 说明                             | 回调参数                                |
| -------------- | -------------------------------- | --------------------------------------- |
| save           | 点击保存按钮时触发               | `info: AddressEditInfo`                 |
| focus          | 输入框聚焦时触发                 | `key: string`                           |
| change         | 仅 name 和 tel 输入框值改变触发    | `{key: string, value: string}`          |
| delete         | 确认删除地址时触发               | `info: AddressEditInfo`                 |
| select-search  | 选中搜索结果时触发               | `value: AddressEditSearchItem`          |
| click-area     | 点击收件地区时触发               | -                                       |
| change-area    | 修改收件地区时触发               | `selectedOptions: PickerOption[]`       |
| change-detail  | 修改详细地址时触发               | `value: string`                         |
| change-default | 切换是否使用默认地址时触发       | `checked: boolean`                      |

### Slots

| 名称    | 说明                   |
| ------- | ---------------------- |
| default | 在邮政编码下方插入内容 |

### Methods

通过 `ref` 可以获取到 AddressEdit 实例并调用实例方法。

| 方法名           | 说明             | 参数                      | 返回值 |
| ---------------- | ---------------- | ------------------------- | ------ |
| setAddressDetail | 设置详细地址     | `addressDetail: string`   | -      |
| setAreaCode      | 设置地区编号     | `code: string`            | -      |

### 类型定义

#### AddressEditInfo

| key           | 说明                                     | 类型    |
| ------------- | ---------------------------------------- | ------- |
| name          | 姓名                                     | String  |
| tel           | 手机号                                   | String  |
| province      | 省份                                     | String  |
| city          | 城市                                     | String  |
| county        | 区县                                     | String  |
| addressDetail | 详细地址                                 | String  |
| areaCode      | 地区编码，通过 省市区选择 获取（必填）   | String  |
| isDefault     | 是否为默认地址                           | Boolean |

#### AddressEditSearchItem

| key     | 说明       | 类型   |
| ------- | ---------- | ------ |
| name    | 地名       | String |
| address | 详细地址   | String |

## 省市县列表数据格式

请参考 `zx-area` 组件或 `uni-data-picker` 的数据格式。