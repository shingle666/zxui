# zx-address 地址选择

地址选择组件，支持自定义地址选择和已有地址选择两种模式。

## 平台兼容性

| H5  | App | 小程序 |
| :-: | :-: | :----: |
| √   | √   |   √    |

## 引入

```javascript
import ZxAddress from '@/components/zx-address/zx-address.vue';
```

## 代码演示

### 基础用法

```vue
<template>
  <view>
    <zx-button @click="showAddress = true">选择地址</zx-button>
    
    <zx-address
      v-model="showAddress"
      :province="province"
      :city="city"
      :country="country"
      :town="town"
      custom-address-title="请选择所在地区"
      @change="onChange"
      @close="onClose"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showAddress = ref(false)

const province = ref([
  { id: 1, name: '北京' },
  { id: 2, name: '广西' },
  { id: 3, name: '江西' },
  { id: 4, name: '四川' }
])

const city = ref([
  { id: 7, name: '朝阳区' },
  { id: 8, name: '崇文区' },
  { id: 9, name: '昌平区' },
  { id: 6, name: '石景山区' }
])

const country = ref([
  { id: 3, name: '八里庄街道' },
  { id: 9, name: '北苑' },
  { id: 4, name: '常营乡' }
])

const town = ref([])

const onChange = (data) => {
  console.log('地址改变:', data)
  // 根据选择的层级动态加载下一级数据
  if (data.next && data.next.length > 0) {
    // 可以在这里请求下一级数据
  } else {
    // 选择完成，关闭弹窗
    showAddress.value = false
  }
}

const onClose = (data) => {
  console.log('关闭弹窗:', data)
  if (data.type === 'custom') {
    console.log('选择的地址:', data.data.addressStr)
  }
}
</script>
```

### 选择已有地址

```vue
<template>
  <view>
    <zx-button @click="showExistAddress = true">选择已有地址</zx-button>
    
    <zx-address
      v-model="showExistAddress"
      type="exist"
      :exist-address="existAddress"
      exist-address-title="配送至"
      :is-show-custom-address="false"
      @selected="onSelected"
      @close="onClose"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showExistAddress = ref(false)

const existAddress = ref([
  {
    id: 1,
    name: '张三',
    tel: '13800138000',
    addressDetail: 'xx小区xx号楼xx单元xx室',
    cityName: '石景山区',
    countyName: '城区',
    provinceName: '北京',
    townName: '',
    selectedAddress: true
  },
  {
    id: 2,
    name: '李四',
    tel: '13900139000',
    addressDetail: 'yy大厦yy层yy室',
    cityName: '朝阳区',
    countyName: '建外街道',
    provinceName: '北京',
    townName: '',
    selectedAddress: false
  }
])

const onSelected = (item, index, list) => {
  console.log('选中地址:', item)
  console.log('地址索引:', index)
  console.log('地址列表:', list)
}

const onClose = (data) => {
  console.log('关闭弹窗:', data)
}
</script>
```

### 自定义图标

```vue
<template>
  <zx-address
    v-model="showAddress"
    type="exist"
    :exist-address="existAddress"
    :default-icon="defaultIcon"
    :selected-icon="selectedIcon"
    @selected="onSelected"
  />
</template>

<script setup>
import { ref } from 'vue'

const showAddress = ref(false)
const defaultIcon = ref('circle')
const selectedIcon = ref('success')

const existAddress = ref([
  // ... 地址数据
])

const onSelected = (item, index, list) => {
  console.log('选中地址:', item)
}
</script>
```

### 自定义地址与已有地址切换

```vue
<template>
  <zx-address
    v-model="showAddress"
    type="all"
    :province="province"
    :city="city"
    :country="country"
    :town="town"
    :exist-address="existAddress"
    :show-tabs="true"
    @change="onChange"
    @selected="onSelected"
    @close="onClose"
  />
</template>

<script setup>
import { ref } from 'vue'

const showAddress = ref(false)

// 省市区数据
const province = ref([...])
const city = ref([...])
const country = ref([...])
const town = ref([])

// 已有地址数据
const existAddress = ref([...])

const onChange = (data) => {
  // 处理自定义地址选择
}

const onSelected = (item, index, list) => {
  // 处理已有地址选择
}

const onClose = (data) => {
  // 处理关闭事件
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|--|--|--|--|
| v-model | 控制弹窗显示隐藏 | `Boolean` | `false` |
| title | 弹窗标题 | `String` | `选择地址` |
| show-tabs | 是否显示标签栏 | `Boolean` | `true` |
| custom-address-title | 自定义地址标题 | `String` | `请选择所在地区` |
| exist-address-title | 已有地址标题 | `String` | `配送至` |
| province | 省份数据 | `Array` | `[]` |
| city | 城市数据 | `Array` | `[]` |
| country | 区县数据 | `Array` | `[]` |
| town | 乡镇数据 | `Array` | `[]` |
| exist-address | 已有地址列表 | `Array` | `[]` |
| is-show-custom-address | 是否显示自定义地址 | `Boolean` | `true` |
| close-on-click-overlay | 点击遮罩是否关闭 | `Boolean` | `true` |
| default-icon | 默认选中的图标 | `String` | `''` |
| selected-icon | 选中状态的图标 | `String` | `''` |
| type | 组件类型 | `String` | `all` |

### type 可选值

| 值 | 说明 |
|--|--|
| all | 显示自定义地址和已有地址两个标签页 |
| exist | 只显示已有地址 |
| custom | 只显示自定义地址 |

### Events

| 事件名 | 说明 | 回调参数 |
|--|--|--|
| change | 自定义地址选择改变时触发 | `data: { next: string, value: Array, selectedData: Object }` |
| close | 弹窗关闭时触发 | `data: { type: string, data: Object }` |
| selected | 选中已有地址时触发 | `item: Object, index: Number, list: Array` |

### 数据结构

#### 省市区数据格式

```javascript
[
  {
    id: 1, // 唯一标识
    name: '北京' // 显示名称
  }
]
```

#### 已有地址数据格式

```javascript
[
  {
    id: 1, // 唯一标识
    name: '张三', // 姓名
    tel: '13800138000', // 电话
    provinceName: '北京', // 省份名称
    cityName: '朝阳区', // 城市名称
    countyName: '建外街道', // 区县名称
    townName: '', // 乡镇名称
    addressDetail: 'xx小区xx号楼', // 详细地址
    selectedAddress: true // 是否选中
  }
]
```

### change 事件回调参数

| 参数 | 说明 | 类型 |
|--|--|--|
| next | 下一级数据类型 | `String` |
| value | 当前选中的值数组 | `Array` |
| selectedData | 当前选中的数据对象 | `Object` |

#### next 可能的值

| 值 | 说明 |
|--|--|
| city | 需要加载城市数据 |
| country | 需要加载区县数据 |
| town | 需要加载乡镇数据 |
| '' | 选择完成 |

### close 事件回调参数

| 参数 | 说明 | 类型 |
|--|--|--|
| type | 关闭时的类型 | `String` |
| data | 相关数据 | `Object` |

#### type 可能的值

| 值 | 说明 |
|--|--|
| custom | 自定义地址选择 |
| exist | 已有地址选择 |

## 注意事项

1. 省市区数据需要按照指定格式提供，包含 `id` 和 `name` 字段
2. 已有地址数据需要包含完整的地址信息字段
3. 组件内部会根据 `change` 事件的 `next` 参数来判断是否需要加载下一级数据
4. 当 `next` 为空字符串时，表示选择完成，建议关闭弹窗
5. 组件支持 H5、小程序、App 三端，使用了 uni-app 的跨平台特性