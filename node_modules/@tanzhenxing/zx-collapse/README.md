# zx-collapse 折叠面板

折叠面板组件，可以将内容区域进行折叠和展开，支持手风琴模式，适用于展示层级结构信息。

## 功能特性

- ✅ 支持多个面板同时展开/折叠
- ✅ 支持手风琴模式（同时只能展开一个面板）
- ✅ 支持自定义图标位置（左侧/右侧）
- ✅ 支持禁用状态
- ✅ 支持自定义标题、内容和图标
- ✅ 支持动画效果
- ✅ 支持边框显示/隐藏
- ✅ 响应式设计，适配不同屏幕尺寸

## 平台兼容性

| App | H5 | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节小程序 | QQ小程序 |
| --- | --- | --- | --- | --- | --- | --- |
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## 基础用法

```vue
<template>
  <zx-collapse v-model="activeNames" :items="items" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

const items = ref([
  {
    name: '1',
    title: '一致性',
    content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念。'
  },
  {
    name: '2', 
    title: '反馈',
    content: '控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作。'
  },
  {
    name: '3',
    title: '效率',
    content: '简化流程：设计简洁直观的操作流程；清晰明确：语言表达清晰且表意明确。'
  }
])

const handleChange = (value) => {
  console.log('当前激活的面板:', value)
}
</script>
```

## 手风琴模式

设置 `accordion` 属性为 `true` 开启手风琴模式，每次只能展开一个面板。

```vue
<template>
  <zx-collapse 
    v-model="activeName" 
    :items="items" 
    accordion 
    @change="handleChange" 
  />
</template>

<script setup>
import { ref } from 'vue'

const activeName = ref('1')
// 手风琴模式下，v-model 绑定的是字符串或数字
</script>
```

## 自定义图标位置

通过 `expand-icon-position` 属性控制展开图标的位置。

```vue
<template>
  <!-- 图标在左侧 -->
  <zx-collapse 
    v-model="activeNames" 
    :items="items" 
    expand-icon-position="left" 
  />
  
  <!-- 图标在右侧（默认） -->
  <zx-collapse 
    v-model="activeNames" 
    :items="items" 
    expand-icon-position="right" 
  />
</template>
```

## 禁用状态

在数据项中设置 `disabled: true` 来禁用特定的面板。

```vue
<template>
  <zx-collapse v-model="activeNames" :items="items" />
</template>

<script setup>
import { ref } from 'vue'

const activeNames = ref([])

const items = ref([
  {
    name: '1',
    title: '可用面板',
    content: '这是一个可用的面板内容'
  },
  {
    name: '2',
    title: '禁用面板',
    content: '这是一个禁用的面板内容',
    disabled: true
  }
])
</script>
```

## 自定义标题和内容

使用具名插槽可以自定义标题和内容。

```vue
<template>
  <zx-collapse v-model="activeNames" :items="items">
    <!-- 自定义标题 -->
    <template #title="{ item, isActive }">
      <view class="custom-title">
        <text :style="{ color: isActive ? '#409EFF' : '#303133' }">
          {{ item.title }}
        </text>
        <zx-tag v-if="item.tag" :type="item.tagType">{{ item.tag }}</zx-tag>
      </view>
    </template>
    
    <!-- 自定义内容 -->
    <template #default="{ item }">
      <view class="custom-content">
        <text>{{ item.content }}</text>
        <zx-button v-if="item.showButton" size="small" type="primary">
          查看详情
        </zx-button>
      </view>
    </template>
  </zx-collapse>
</template>
```

## 自定义图标

使用 `icon` 插槽可以自定义展开图标。

```vue
<template>
  <zx-collapse v-model="activeNames" :items="items">
    <template #icon="{ item, isActive }">
      <zx-icon 
        :name="isActive ? 'arrow-down' : 'arrow-right'" 
        color="#409EFF" 
        size="20"
      />
    </template>
  </zx-collapse>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| v-model | 当前激活的面板，手风琴模式下为字符串/数字，否则为数组 | String / Number / Array | [] | - |
| items | 折叠面板数据数组 | Array | [] | - |
| accordion | 是否开启手风琴模式 | Boolean | false | true / false |
| border | 是否显示边框 | Boolean | true | true / false |
| expand-icon-position | 展开图标位置 | String | right | left / right |
| title-color | 标题颜色 | String | #303133 | - |
| content-color | 内容颜色 | String | #606266 | - |
| active-color | 激活状态颜色 | String | #409EFF | - |
| normal-color | 普通状态颜色 | String | #909399 | - |
| disabled-color | 禁用状态颜色 | String | #C0C4CC | - |
| extra-color | 额外信息颜色 | String | #909399 | - |
| title-size | 标题字体大小，单位rpx | Number / String | 28 | - |
| content-size | 内容字体大小，单位rpx | Number / String | 26 | - |
| icon-size | 图标大小，单位rpx | Number / String | 24 | - |
| title-bold | 标题是否加粗 | Boolean | false | true / false |
| content-padding | 内容内边距 | String | 20rpx | - |
| animation-duration | 动画持续时间，单位ms | Number | 300 | - |

### Items 数据结构

每个面板项支持以下属性：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 面板唯一标识符 | String / Number | - |
| title | 面板标题 | String | - |
| content | 面板内容 | String | - |
| icon | 自定义图标名称 | String | arrow-right |
| extra | 右侧额外信息 | String | - |
| disabled | 是否禁用 | Boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换面板时触发 | (value: String / Number / Array) 当前激活的面板标识 |
| item-click | 点击面板项时触发 | (item: Object, index: Number) 点击的面板项和索引 |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| title | 自定义标题内容 | { item: Object, isActive: Boolean } |
| icon | 自定义图标内容 | { item: Object, isActive: Boolean } |
| extra | 自定义额外信息内容 | { item: Object, isActive: Boolean } |
| default | 自定义面板内容 | { item: Object, index: Number } |
| content-[name] | 自定义特定面板的内容 | { item: Object, index: Number } |

## 样式变量

组件支持以下 CSS 变量自定义：

```scss
.zx-collapse {
  --zx-collapse-border-color: #EBEEF5;
  --zx-collapse-bg-color: #fff;
  --zx-collapse-hover-bg-color: #F5F7FA;
  --zx-collapse-border-radius: 8rpx;
  --zx-collapse-header-padding: 20rpx;
  --zx-collapse-header-min-height: 88rpx;
  --zx-collapse-content-padding: 20rpx;
  --zx-collapse-transition-duration: 0.3s;
}
```

## 注意事项

1. 数据项中的 `name` 字段应该是唯一的，如果不提供会使用数组索引作为标识符
2. 手风琴模式下，`v-model` 绑定的值应该是字符串或数字，普通模式下应该是数组
3. 组件依赖 `zx-icon` 组件，请确保项目中已经引入
4. 在小程序环境下，动画效果可能会有所差异
5. 内容区域的高度变化使用了 CSS 过渡动画，在某些情况下可能需要手动触发重新渲染

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的折叠展开功能
- 支持手风琴模式
- 支持自定义样式和图标
