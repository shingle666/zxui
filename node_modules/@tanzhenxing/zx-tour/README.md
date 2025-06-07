# zx-tour 漫游式引导组件

用于分步引导用户了解产品功能，兼容 H5、小程序、App。

## 特性
- 支持多步骤引导
- 支持遮罩、浮层自定义样式
- 支持多端 selector 查询
- 支持插槽自定义内容
- 支持 placement 定位
- 支持关闭、完成、步骤切换事件

## 属性
| 属性         | 说明                 | 类型                | 默认值   |
| ------------ | -------------------- | ------------------- | -------- |
| modelValue   | 是否显示引导         | Boolean             | false    |
| steps        | 步骤配置数组         | Array               | []       |
| current      | 当前步骤索引         | Number              | 0        |
| showClose    | 是否显示关闭按钮     | Boolean             | true     |
| maskStyle    | 遮罩自定义样式       | Object              | {}       |
| popupStyle   | 浮层自定义样式       | Object              | {}       |
| indicator    | 是否显示指示器/自定义| Boolean/Function    | true     |

### steps 配置项
| 字段        | 说明           | 类型     | 备注                         |
| ----------- | --------------| -------- | ---------------------------- |
| selector    | 目标选择器     | String   | 目标元素的 selector           |
| title       | 步骤标题       | String   |                              |
| description | 步骤描述       | String   |                              |
| mask        | 是否显示遮罩   | Boolean  |                              |
| placement   | 浮层位置       | String   | bottom/top/left/right/center |
| maskStyle   | 遮罩样式       | Object   | 单步自定义                   |
| popupStyle  | 浮层样式       | Object   | 单步自定义                   |

## 事件
| 事件名   | 说明           | 回调参数         |
| -------- | -------------- | --------------- |
| close    | 关闭引导时触发 | 无              |
| finish   | 完成引导时触发 | 无              |
| change   | 步骤切换时触发 | 当前步骤索引     |

## 插槽
| 插槽名   | 说明           | 作用域参数      |
| -------- | -------------- | --------------- |
| desc     | 步骤描述内容    | step            |

## 使用示例
```vue
<template>
  <button @tap="showTour = true">开始引导</button>
  <view>
    <button id="btn1">上传</button>
    <button id="btn2">保存</button>
    <button id="btn3">更多</button>
  </view>
  <zx-tour
    v-model="showTour"
    :steps="steps"
    :showClose="true"
    @close="onClose"
    @finish="onFinish"
    @change="onChange"
  >
    <template #desc="{ step }">
      <view v-if="step && step.description">
        <text>{{ step.description }}</text>
      </view>
    </template>
  </zx-tour>
</template>

<script setup>
import { ref } from 'vue'
import zxTour from '@/components/zx-tour/zx-tour.vue'

const showTour = ref(false)
const steps = [
  { selector: '#btn1', title: '上传', description: '上传文件', placement: 'bottom', mask: true },
  { selector: '#btn2', title: '保存', description: '保存更改', placement: 'right', mask: true },
  { selector: '#btn3', title: '更多', description: '查看更多', placement: 'top', mask: false },
  { title: '结束', description: '感谢体验', placement: 'center', mask: false },
]
function onClose() {}
function onFinish() {}
function onChange(idx) {}
</script>
```

## 注意事项
- selector 必须为页面上真实存在的元素 id 或 class
- 建议每个步骤 placement 合理设置，避免遮挡
- 兼容 uniapp H5、小程序、App

## 参考
- [Element Plus Tour 漫游式引导](https://element-plus.org/zh-CN/component/tour.html)
