# zx-charts-bar 横向柱状图组件

一个灵活的横向柱状图组件，支持 H5、小程序和 App 平台。

## 特性

- 跨平台兼容性（H5、微信小程序、App）
- 可自定义样式和动画
- 支持堆叠式柱状图
- 交互式点击事件和工具提示
- 值格式化
- 动态颜色支持
- 不依赖浏览器特有的 DOM API

## 安装

在 UniApp 项目中引入组件：

```js
// 在 pages.json 中注册组件
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "zx-charts-bar": "@/components/zx-charts-bar/zx-charts-bar.vue"
    }
  }
}

// 或者直接在页面中导入
import zxChartsBar from '@/components/zx-charts-bar/zx-charts-bar.vue'
```

## 基本用法

```vue
<template>
  <view class="chart-container">
    <zx-charts-bar 
      :width="600" 
      :yAxis="yAxisData" 
      :min="0" 
      :max="100"
      ref="barChart"
    />
    <button @click="loadChart">加载图表</button>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const barChart = ref(null);
const yAxisData = ['类别1', '类别2', '类别3', '类别4'];

const loadChart = () => {
  barChart.value.draw([
    {
      name: '系列1',
      color: '#007AFF',
      source: [45, 65, 78, 32]
    },
    {
      name: '系列2',
      color: '#FF6B22',
      source: [30, 55, 28, 70]
    }
  ]);
};

onMounted(() => {
  loadChart();
});
</script>
```

## API 参考

### 属性

| 属性 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------- | ----------- |
| width | Number/String | 600 | 图表宽度（rpx） |
| legend | Object | { show: false, size: 24, color: '#333' } | 图例配置 |
| tooltip | Boolean | false | 是否在点击时显示工具提示 |
| xAxis | Array | [] | X轴数据，可自定义标签和颜色 |
| min | Number | 0 | X轴最小值 |
| max | Number | 100 | X轴最大值 |
| splitNumber | Number | 20 | X轴分段递增数值 |
| splitLine | Object | { color: '#e3e3e3', type: 'dashed' } | 分割线配置 |
| xAxisLineColor | String | '#e3e3e3' | X轴线颜色 |
| xAxisLabel | Object | { show: true, color: '#333', size: 24 } | X轴标签配置 |
| yAxis | Array | [] | Y轴标签数组 |
| columnBarHeight | Number/String | 32 | 柱状条高度（rpx） |
| yAxisTick | Object | { width: '12rpx', color: '#e3e3e3' } | Y轴刻度线配置 |
| yAxisLine | Object | { color: '#e3e3e3', itemPadding: '30rpx 0' } | Y轴线配置 |
| yAxisLabel | Object | { show: true, color: '#333', size: 24 } | Y轴标签配置 |
| yAxisVal | Object | { show: true, color: '#333', size: 24 } | Y轴值显示配置 |
| currentIndex | Number | -1 | 默认选中的Y轴索引 |
| isStack | Boolean | false | 是否堆叠显示（适用于多系列） |
| clickEffect | Number | 1 | 点击效果：1-背景变色，2-高亮显示(其他变暗)，3-无效果 |
| columnCap | String | 'square' | 柱状条端点样式：'round'（圆形）或'square'（方形） |

### 事件

| 事件 | 参数 | 说明 |
| ----- | ---------- | ----------- |
| click | { datasetIndex, sourceIndex, ...item } | 当点击柱状条时触发 |

### 方法

| 方法 | 参数 | 说明 |
| ------ | ---------- | ----------- |
| draw | (dataset, yAxisValFormatter) | 使用指定的数据集绘制图表 |

### 数据集格式

数据集应该是一个系列对象的数组：

```js
[
  {
    name: '系列名称',         // 图例显示名称
    color: '#007AFF',        // 柱状条颜色（可被colorFormatter覆盖）
    source: [45, 65, 78, 32], // 对应Y轴项的值
    colorFormatter: (val) => { // 可选函数，动态设置颜色
      return val > 50 ? '#FF6B22' : '#007AFF';
    }
  },
  // 其他系列...
]
```

## 高级示例

### 堆叠柱状图

```vue
<template>
  <zx-charts-bar
    :width="600"
    :yAxis="['Q1', 'Q2', 'Q3', 'Q4']"
    :isStack="true"
    :min="0"
    :max="100"
    :legend="{ show: true, size: 26, color: '#666' }"
    ref="stackedBarChart"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const stackedBarChart = ref(null);

onMounted(() => {
  stackedBarChart.value.draw([
    {
      name: '产品A',
      color: '#007AFF',
      source: [20, 15, 25, 30]
    },
    {
      name: '产品B',
      color: '#FF6B22',
      source: [15, 20, 10, 25]
    },
    {
      name: '产品C',
      color: '#8E44AD',
      source: [10, 15, 20, 15]
    }
  ]);
});
</script>
```

### 动态颜色格式化

```vue
<template>
  <zx-charts-bar
    :width="600"
    :yAxis="departments"
    :min="0"
    :max="100"
    :tooltip="true"
    ref="dynamicColorChart"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dynamicColorChart = ref(null);
const departments = ['人力资源', '销售', '市场营销', '工程', '支持'];

onMounted(() => {
  dynamicColorChart.value.draw([
    {
      name: '绩效',
      color: '#007AFF',
      source: [65, 82, 45, 90, 72],
      colorFormatter: (val) => {
        if (val >= 80) return '#34C759'; // 绿色表示高绩效
        if (val >= 60) return '#007AFF'; // 蓝色表示良好绩效
        return '#FF3B30'; // 红色表示低绩效
      }
    }
  ]);
});
</script>
```

## 跨平台注意事项

该组件适用于所有平台（H5、微信小程序和App），无需任何平台特定的修改。以下是一些额外的提示：

- 组件使用 Vue 3 的 Composition API（setup 语法），提供更好的性能和代码组织
- 所有样式使用 rpx 单位，确保在不同设备上正确缩放
- 使用 UniApp 的条件编译指令处理不同平台的细微差异（如 H5 的鼠标指针样式）
- 不使用任何浏览器特有的 DOM API，确保在小程序和 App 中正常运行