# zx-cascader 级联选择器

级联选择器，当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

## 基础用法

```vue
<template>
	<view>
		<!-- 触发器 -->
		<view @tap="showCascader = true">
			<text>{{ displayText || '请选择' }}</text>
		</view>
		
		<!-- 级联选择器 -->
		<zx-cascader
			v-model:value="selectedValue"
			:show="showCascader"
			:options="options"
			@close="showCascader = false"
			@change="handleChange"
		/>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const showCascader = ref(false)
const selectedValue = ref([])

const options = [
	{
		value: 'guide',
		label: 'Guide',
		children: [
			{
				value: 'disciplines',
				label: 'Disciplines',
				children: [
					{ value: 'consistency', label: 'Consistency' },
					{ value: 'feedback', label: 'Feedback' },
					{ value: 'efficiency', label: 'Efficiency' },
					{ value: 'controllability', label: 'Controllability' }
				]
			}
		]
	},
	{
		value: 'component',
		label: 'Component',
		children: [
			{
				value: 'basic',
				label: 'Basic',
				children: [
					{ value: 'layout', label: 'Layout' },
					{ value: 'color', label: 'Color' },
					{ value: 'typography', label: 'Typography' }
				]
			}
		]
	}
]

const displayText = computed(() => {
	// 构建显示文本逻辑
	return selectedValue.value.length > 0 ? '已选择' : ''
})

const handleChange = (value) => {
	console.log('选择结果:', value)
}
</script>
```

## 多选模式

```vue
<template>
	<zx-cascader
		v-model:value="selectedValues"
		:show="showCascader"
		:options="options"
		:multiple="true"
		@close="showCascader = false"
	/>
</template>

<script setup>
const selectedValues = ref([])
const showCascader = ref(false)
</script>
```

## 严格模式

在严格模式下，父子节点的选中状态不再相互关联，用户可以选择任意级别的选项。

```vue
<template>
	<zx-cascader
		v-model:value="selectedValue"
		:show="showCascader"
		:options="options"
		:multiple="true"
		:check-strictly="true"
		@close="showCascader = false"
	/>
</template>
```

## 自定义字段名

```vue
<template>
	<zx-cascader
		v-model:value="selectedValue"
		:show="showCascader"
		:options="options"
		:props="cascaderProps"
		@close="showCascader = false"
	/>
</template>

<script setup>
const cascaderProps = {
	value: 'id',
	label: 'name',
	children: 'items',
	disabled: 'isDisabled'
}

const options = [
	{
		id: 1,
		name: '选项1',
		items: [
			{ id: 11, name: '选项1-1' },
			{ id: 12, name: '选项1-2', isDisabled: true }
		]
	}
]
</script>
```

## 自定义样式

```vue
<template>
	<zx-cascader
		v-model:value="selectedValue"
		:show="showCascader"
		:options="options"
		:height="800"
		:radius="16"
		title="请选择地区"
		active-color="#ff6b35"
		confirm-background="#ff6b35"
		@close="showCascader = false"
	/>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示选择器 | Boolean | false |
| value / v-model | 绑定值 | Array | [] |
| options | 选项数据源 | Array | [] |
| multiple | 是否多选 | Boolean | false |
| check-strictly | 是否严格的遵守父子节点不互相关联 | Boolean | false |
| emit-path | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组 | Boolean | true |
| height | 选择器高度 | Number/String | 600 |
| radius | 圆角大小 | Number/String | 24 |
| title | 标题 | String | '请选择' |
| title-size | 标题字体大小 | Number/String | 32 |
| title-color | 标题颜色 | String | '#333' |
| font-weight | 标题字重 | Number/String | 400 |
| background | 背景色 | String | '#fff' |
| padding | 内边距 | String | '30rpx' |
| checkbox-color | 选择框选中后颜色 | String | '#5677fc' |
| border-color | 边框颜色 | String | '#ccc' |
| checkmark-color | 对勾颜色 | String | '#fff' |
| divider-line | 是否显示分割线 | Boolean | true |
| divider-color | 分割线颜色 | String | '#EEEEEE' |
| icon-size | 图标大小 | Number/String | 48 |
| size | 字体大小 | Number/String | 30 |
| color | 字体颜色 | String | '#333' |
| active-color | 激活颜色 | String | '#5677fc' |
| disabled-color | 禁用颜色 | String | '#c0c4cc' |
| tab-color | 标签页颜色 | String | '#666' |
| show-tabs | 是否显示标签页 | Boolean | true |
| cancel-text | 取消按钮文字 | String | '取消' |
| cancel-color | 取消按钮颜色 | String | '#666' |
| confirm-text | 确认按钮文字 | String | '确定' |
| confirm-background | 确认按钮背景色 | String | '#5677fc' |
| confirm-color | 确认按钮颜色 | String | '#fff' |
| mask-background | 遮罩背景 | String | 'rgba(0,0,0,.6)' |
| mask-closable | 点击遮罩是否关闭 | Boolean | false |
| z-index | 层级 | Number/String | 1000 |
| empty-text | 空状态文字 | String | '暂无数据' |
| props | 自定义字段名配置 | Object | 见下表 |

### props 配置

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 指定选项的值为选项对象的某个属性值 | String | 'value' |
| label | 指定选项标签为选项对象的某个属性值 | String | 'label' |
| children | 指定选项的子选项为选项对象的某个属性值 | String | 'children' |
| disabled | 指定选项的禁用为选项对象的某个属性值 | String | 'disabled' |
| icon | 指定选项图标为选项对象的某个属性值 | String | 'icon' |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中节点变化时触发 | (value) |
| close | 关闭时触发 | - |
| confirm | 确认选择时触发 | ({ value, selectedPath }) |
| cancel | 取消选择时触发 | - |

## 数据格式

选项数据应该是一个数组，每个选项包含以下字段：

```javascript
const options = [
	{
		value: 'option1',      // 选项值
		label: '选项1',        // 选项标签
		icon: 'icon-url',      // 选项图标（可选）
		disabled: false,       // 是否禁用（可选）
		children: [            // 子选项（可选）
			{
				value: 'option1-1',
				label: '选项1-1'
			}
		]
	}
]
```

## 注意事项

1. 组件基于 uniapp 开发，支持多端运行
2. 在多选模式下，如果不设置 `check-strictly` 为 true，父子节点的选中状态会相互关联
3. `emit-path` 为 true 时，返回的是路径数组；为 false 时，返回的是叶子节点的值
4. 组件内部使用了 `icon` 组件，请确保项目中已正确配置
5. 建议在使用前先设置合适的 `z-index` 值，避免层级问题

## 更新日志

### v1.0.0
- 初始版本
- 支持基础级联选择功能
- 支持多选模式
- 支持严格模式
- 支持自定义字段名
- 支持自定义样式配置
