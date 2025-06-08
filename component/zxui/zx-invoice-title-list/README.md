# zx-invoice-title-list

`zx-invoice-title-list` 是一个发票抬头列表组件，用于展示和管理用户的发票抬头信息，支持选择、编辑、删除等操作。

## 特性

- 支持单选和多选模式
- 支持发票抬头的增删改查操作
- 支持自定义标签和内容
- 支持默认发票抬头标识
- 支持禁用状态
- 支持空状态展示
- 完全兼容 H5、小程序、APP 多端

## 使用方法

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedId"
    :list="invoiceList"
    @add="handleAdd"
    @edit="handleEdit"
    @delete="handleDelete"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedId = ref('1')
const invoiceList = ref([
  {
    id: '1',
    title: '个人',
    type: 'normal',
    taxNumber: '',
    isDefault: true
  },
  {
    id: '2', 
    title: '北京某某科技有限公司',
    type: 'special',
    taxNumber: '91110000123456789X'
  }
])

const handleAdd = () => {
  console.log('添加发票抬头')
}

const handleEdit = (item, index) => {
  console.log('编辑发票抬头', item)
}

const handleDelete = (item, index) => {
  console.log('删除发票抬头', item)
}

const handleSelect = (item, index) => {
  console.log('选择发票抬头', item)
}
</script>
```

## 属性说明

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | String/Number/Array | '' | 当前选中的发票抬头ID，支持 v-model 双向绑定 |
| list | Array | [] | 发票抬头列表数据 |
| multiple | Boolean | false | 是否开启多选模式 |
| hideRadio | Boolean | false | 是否隐藏单选按钮 |
| hideEdit | Boolean | false | 是否隐藏编辑按钮 |
| hideDelete | Boolean | false | 是否隐藏删除按钮 |
| hideAdd | Boolean | false | 是否隐藏添加按钮 |

### 文本配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| addButtonText | String | '添加发票抬头' | 添加按钮的文字 |
| defaultTagText | String | '默认' | 默认标签的文字 |

### 样式配置

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checkedColor | String | '#1989fa' | 选中状态的颜色 |
| rightIcon | String | '' | 右侧自定义图标名称 |

## 数据结构

### 发票抬头对象

```javascript
{
  id: '1',                    // 唯一标识
  title: '个人',              // 发票抬头名称
  type: 'normal',             // 发票类型：'normal'普通发票 | 'special'专用发票 | 'electronic'电子发票
  taxNumber: '',              // 税号（可选）
  isDefault: true,            // 是否为默认发票抬头
  disabled: false             // 是否禁用（可选）
}
```

### 发票类型说明

| 类型值 | 数字值 | 说明 |
| --- | --- | --- |
| 'normal' | 2 | 增值税普通发票 |
| 'special' | 1 | 增值税专用发票 |
| 'electronic' | 3 | 增值税电子发票 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中状态改变时触发 | value: 当前选中的ID或ID数组 |
| select | 选择发票抬头时触发 | item: 发票抬头对象, index: 索引 |
| add | 点击添加按钮时触发 | - |
| edit | 点击编辑按钮时触发 | item: 发票抬头对象, index: 索引 |
| delete | 点击删除按钮时触发 | item: 发票抬头对象, index: 索引 |
| click-item | 点击发票抬头项时触发 | item: 发票抬头对象, index: 索引 |
| right-icon-click | 点击右侧自定义图标时触发 | item: 发票抬头对象, index: 索引 |

## 插槽说明

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| item-content | 自定义发票抬头内容 | item: 发票抬头对象, index: 索引 |
| tag | 自定义标签内容 | item: 发票抬头对象, index: 索引 |
| empty | 自定义空状态内容 | - |
| bottom | 自定义底部内容 | - |

## 使用示例

### 基础用法

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedId"
    :list="invoiceList"
    @select="onSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedId = ref('1')
const invoiceList = ref([
  {
    id: '1',
    title: '个人',
    type: 'normal',
    isDefault: true
  },
  {
    id: '2',
    title: '北京某某科技有限公司',
    type: 'special',
    taxNumber: '91110000123456789X'
  }
])

const onSelect = (item) => {
  console.log('选中了:', item.title)
}
</script>
```

### 多选模式

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedIds"
    :list="invoiceList"
    :multiple="true"
    add-button-text="批量操作"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedIds = ref(['1'])
const invoiceList = ref([
  // ... 发票列表数据
])
</script>
```

### 隐藏操作按钮

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedId"
    :list="invoiceList"
    :hide-edit="true"
    :hide-delete="true"
    :hide-add="true"
  />
</template>
```

### 自定义内容

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedId"
    :list="invoiceList"
  >
    <template #tag="{ item }">
      <zx-tag v-if="item.id === '1'" type="success" size="mini">企业</zx-tag>
    </template>
    
    <template #item-content="{ item }">
      <view style="font-size: 12px; color: #999; margin-top: 5px;">
        创建时间: {{ item.createTime }}
      </view>
    </template>
    
    <template #empty>
      <view style="text-align: center; padding: 40px; color: #999;">
        <zx-icon name="invoice" size="48" color="#ddd" />
        <view style="margin-top: 10px;">暂无发票抬头，请添加</view>
      </view>
    </template>
  </zx-invoice-title-list>
</template>
```

### 完整的增删改查示例

```vue
<template>
  <zx-invoice-title-list
    v-model="selectedId"
    :list="invoiceList"
    @add="handleAdd"
    @edit="handleEdit"
    @delete="handleDelete"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedId = ref('')
const invoiceList = ref([
  {
    id: '1',
    title: '个人',
    type: 'normal',
    isDefault: true
  },
  {
    id: '2',
    title: '北京某某科技有限公司',
    type: 'special',
    taxNumber: '91110000123456789X'
  }
])

const handleAdd = () => {
  // 跳转到添加发票抬头页面
  uni.navigateTo({
    url: '/pages/invoice/add'
  })
}

const handleEdit = (item) => {
  // 跳转到编辑发票抬头页面
  uni.navigateTo({
    url: `/pages/invoice/edit?id=${item.id}`
  })
}

const handleDelete = (item, index) => {
  uni.showModal({
    title: '确认删除',
    content: `确定要删除发票抬头"${item.title}"吗？`,
    success: (res) => {
      if (res.confirm) {
        invoiceList.value.splice(index, 1)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

const handleSelect = (item) => {
  uni.showToast({
    title: `已选择: ${item.title}`,
    icon: 'none'
  })
}
</script>
```

## 注意事项

1. 发票抬头列表数据中的 `id` 字段是必需的，用于唯一标识每个发票抬头
2. 在多选模式下，`modelValue` 应该是一个数组
3. 组件依赖 `zx-icon`、`zx-tag`、`zx-empty` 组件，请确保这些组件已正确引入
4. 发票类型支持字符串和数字两种格式，组件会自动转换显示文本
5. 建议在删除操作前添加确认提示，避免误删

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ QQ小程序
- ✅ App (Vue)
- ✅ App (Nvue)