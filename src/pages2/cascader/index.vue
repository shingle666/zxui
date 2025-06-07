<template>
	<view class="demo-container">
		<view class="demo-header">
			<text class="demo-title">zx-cascader 级联选择器演示</text>
		</view>
		
		<scroll-view scroll-y class="demo-content">
			<!-- 基础用法 -->
			<view class="demo-section">
				<view class="demo-section-title">基础用法</view>
				<view class="demo-item" @tap="showDemo1 = true">
					<text class="demo-item-label">基础级联选择</text>
					<text class="demo-item-value">{{ demo1Text || '请选择' }}</text>
					<icon type="clear" color="#ccc" size="12" style="transform: rotate(-90deg);"></icon>
				</view>
			</view>
			
			<!-- 多选模式 -->
			<view class="demo-section">
				<view class="demo-section-title">多选模式</view>
				<view class="demo-item" @tap="showDemo2 = true">
					<text class="demo-item-label">多选级联</text>
					<text class="demo-item-value">{{ demo2Text || '请选择' }}</text>
					<icon type="clear" color="#ccc" size="12" style="transform: rotate(-90deg);"></icon>
				</view>
			</view>
			
			<!-- 严格模式 -->
			<view class="demo-section">
				<view class="demo-section-title">严格模式</view>
				<view class="demo-item" @tap="showDemo3 = true">
					<text class="demo-item-label">严格模式多选</text>
					<text class="demo-item-value">{{ demo3Text || '请选择' }}</text>
					<icon type="clear" color="#ccc" size="12" style="transform: rotate(-90deg);"></icon>
				</view>
			</view>
			
			<!-- 自定义字段名 -->
			<view class="demo-section">
				<view class="demo-section-title">自定义字段名</view>
				<view class="demo-item" @tap="showDemo4 = true">
					<text class="demo-item-label">自定义字段</text>
					<text class="demo-item-value">{{ demo4Text || '请选择' }}</text>
					<icon type="clear" color="#ccc" size="12" style="transform: rotate(-90deg);"></icon>
				</view>
			</view>
			
			<!-- 自定义样式 -->
			<view class="demo-section">
				<view class="demo-section-title">自定义样式</view>
				<view class="demo-item" @tap="showDemo5 = true">
					<text class="demo-item-label">自定义样式</text>
					<text class="demo-item-value">{{ demo5Text || '请选择' }}</text>
					<icon type="clear" color="#ccc" size="12" style="transform: rotate(-90deg);"></icon>
				</view>
			</view>
			
			<!-- 结果展示 -->
			<view class="demo-section">
				<view class="demo-section-title">选择结果</view>
				<view class="demo-result">
					<text class="demo-result-text">{{ resultText }}</text>
				</view>
			</view>
		</scroll-view>
		
		<!-- 基础用法演示 -->
		<zx-cascader
			v-model:value="demo1Value"
			:show="showDemo1"
			:options="basicOptions"
			title="请选择分类"
			@close="showDemo1 = false"
			@change="handleDemo1Change"
		/>
		
		<!-- 多选模式演示 -->
		<zx-cascader
			v-model:value="demo2Value"
			:show="showDemo2"
			:options="basicOptions"
			:multiple="true"
			title="多选分类"
			@close="showDemo2 = false"
			@change="handleDemo2Change"
		/>
		
		<!-- 严格模式演示 -->
		<zx-cascader
			v-model:value="demo3Value"
			:show="showDemo3"
			:options="basicOptions"
			:multiple="true"
			:check-strictly="true"
			title="严格模式选择"
			@close="showDemo3 = false"
			@change="handleDemo3Change"
		/>
		
		<!-- 自定义字段名演示 -->
		<zx-cascader
			v-model:value="demo4Value"
			:show="showDemo4"
			:options="customOptions"
			:props="customProps"
			title="自定义字段"
			@close="showDemo4 = false"
			@change="handleDemo4Change"
		/>
		
		<!-- 自定义样式演示 -->
		<zx-cascader
			v-model:value="demo5Value"
			:show="showDemo5"
			:options="basicOptions"
			:height="800"
			:radius="16"
			title="自定义样式演示"
			active-color="#ff6b35"
			confirm-background="#ff6b35"
			checkbox-color="#ff6b35"
			@close="showDemo5 = false"
			@change="handleDemo5Change"
		/>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import zxCascader from '@tanzhenxing/zx-cascader/zx-cascader.vue'

// 显示状态
const showDemo1 = ref(false)
const showDemo2 = ref(false)
const showDemo3 = ref(false)
const showDemo4 = ref(false)
const showDemo5 = ref(false)

// 选中值
const demo1Value = ref([])
const demo2Value = ref([])
const demo3Value = ref([])
const demo4Value = ref([])
const demo5Value = ref([])

// 结果展示
const resultData = ref({})

// 基础选项数据
const basicOptions = [
	{
		value: 'guide',
		label: 'Guide 指南',
		children: [
			{
				value: 'disciplines',
				label: 'Disciplines 原则',
				children: [
					{ value: 'consistency', label: 'Consistency 一致' },
					{ value: 'feedback', label: 'Feedback 反馈' },
					{ value: 'efficiency', label: 'Efficiency 效率' },
					{ value: 'controllability', label: 'Controllability 可控' }
				]
			},
			{
				value: 'navigation',
				label: 'Navigation 导航',
				children: [
					{ value: 'side-nav', label: 'Side Navigation 侧向导航' },
					{ value: 'top-nav', label: 'Top Navigation 顶部导航' }
				]
			}
		]
	},
	{
		value: 'component',
		label: 'Component 组件',
		children: [
			{
				value: 'basic',
				label: 'Basic 基础组件',
				children: [
					{ value: 'layout', label: 'Layout 布局' },
					{ value: 'color', label: 'Color 色彩' },
					{ value: 'typography', label: 'Typography 字体' },
					{ value: 'icon', label: 'Icon 图标' },
					{ value: 'button', label: 'Button 按钮' }
				]
			},
			{
				value: 'form',
				label: 'Form 表单组件',
				children: [
					{ value: 'radio', label: 'Radio 单选框' },
					{ value: 'checkbox', label: 'Checkbox 多选框' },
					{ value: 'input', label: 'Input 输入框' },
					{ value: 'input-number', label: 'InputNumber 计数器' },
					{ value: 'select', label: 'Select 选择器' },
					{ value: 'cascader', label: 'Cascader 级联选择器' }
				]
			},
			{
				value: 'data',
				label: 'Data 数据展示',
				children: [
					{ value: 'table', label: 'Table 表格' },
					{ value: 'tag', label: 'Tag 标签' },
					{ value: 'progress', label: 'Progress 进度条' },
					{ value: 'tree', label: 'Tree 树形控件' },
					{ value: 'pagination', label: 'Pagination 分页' }
				]
			}
		]
	},
	{
		value: 'resource',
		label: 'Resource 资源',
		children: [
			{
				value: 'axure',
				label: 'Axure Components',
				children: [
					{ value: 'axure-download', label: 'Download 下载' }
				]
			},
			{
				value: 'sketch',
				label: 'Sketch Templates',
				children: [
					{ value: 'sketch-download', label: 'Download 下载' }
				]
			}
		]
	}
]

// 自定义字段选项数据
const customOptions = [
	{
		id: 'region1',
		name: '华东地区',
		items: [
			{
				id: 'city1',
				name: '上海市',
				items: [
					{ id: 'district1', name: '黄浦区' },
					{ id: 'district2', name: '徐汇区' },
					{ id: 'district3', name: '长宁区' }
				]
			},
			{
				id: 'city2',
				name: '江苏省',
				items: [
					{ id: 'district4', name: '南京市' },
					{ id: 'district5', name: '苏州市' },
					{ id: 'district6', name: '无锡市' }
				]
			}
		]
	},
	{
		id: 'region2',
		name: '华南地区',
		items: [
			{
				id: 'city3',
				name: '广东省',
				items: [
					{ id: 'district7', name: '广州市' },
					{ id: 'district8', name: '深圳市' },
					{ id: 'district9', name: '珠海市' }
				]
			},
			{
				id: 'city4',
				name: '福建省',
				items: [
					{ id: 'district10', name: '福州市' },
					{ id: 'district11', name: '厦门市' }
				]
			}
		]
	}
]

// 自定义字段配置
const customProps = {
	value: 'id',
	label: 'name',
	children: 'items'
}

// 构建显示文本的通用函数
const buildDisplayText = (value, options, props = null) => {
	if (!value || value.length === 0) return ''
	
	const valueKey = props?.value || 'value'
	const labelKey = props?.label || 'label'
	const childrenKey = props?.children || 'children'
	
	let currentOptions = options
	let labels = []
	
	for (let i = 0; i < value.length; i++) {
		const val = value[i]
		const item = currentOptions.find(option => option[valueKey] === val)
		
		if (item) {
			labels.push(item[labelKey])
			if (item[childrenKey] && i < value.length - 1) {
				currentOptions = item[childrenKey]
			}
		}
	}
	
	return labels.join(' / ')
}

// 计算显示文本
const demo1Text = computed(() => buildDisplayText(demo1Value.value, basicOptions))
const demo2Text = computed(() => {
	if (!demo2Value.value || demo2Value.value.length === 0) return ''
	return `已选择 ${demo2Value.value.length} 项`
})
const demo3Text = computed(() => {
	if (!demo3Value.value || demo3Value.value.length === 0) return ''
	return `已选择 ${demo3Value.value.length} 项`
})
const demo4Text = computed(() => buildDisplayText(demo4Value.value, customOptions, customProps))
const demo5Text = computed(() => buildDisplayText(demo5Value.value, basicOptions))

// 结果显示文本
const resultText = computed(() => {
	return JSON.stringify(resultData.value, null, 2)
})

// 事件处理函数
const handleDemo1Change = (value) => {
	console.log('基础用法选择结果:', value)
	resultData.value = {
		type: '基础用法',
		value: value,
		text: demo1Text.value
	}
}

const handleDemo2Change = (value) => {
	console.log('多选模式选择结果:', value)
	resultData.value = {
		type: '多选模式',
		value: value,
		count: value.length
	}
}

const handleDemo3Change = (value) => {
	console.log('严格模式选择结果:', value)
	resultData.value = {
		type: '严格模式',
		value: value,
		count: value.length
	}
}

const handleDemo4Change = (value) => {
	console.log('自定义字段选择结果:', value)
	resultData.value = {
		type: '自定义字段',
		value: value,
		text: demo4Text.value
	}
}

const handleDemo5Change = (value) => {
	console.log('自定义样式选择结果:', value)
	resultData.value = {
		type: '自定义样式',
		value: value,
		text: demo5Text.value
	}
}
</script>

<style scoped>
.demo-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #f8f8f8;
}

.demo-header {
	background: #fff;
	padding: 32rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #333;
}

.demo-content {
	flex: 1;
	padding: 32rpx;
}

.demo-section {
	margin-bottom: 48rpx;
}

.demo-section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 24rpx;
}

.demo-item {
	background: #fff;
	border-radius: 16rpx;
	padding: 32rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	margin-bottom: 16rpx;
}

.demo-item-label {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
}

.demo-item-value {
	font-size: 28rpx;
	color: #666;
	flex: 1;
	text-align: right;
	margin: 0 16rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.demo-result {
	background: #fff;
	border-radius: 16rpx;
	padding: 32rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.demo-result-text {
	font-size: 24rpx;
	color: #666;
	line-height: 1.6;
	font-family: 'Courier New', monospace;
	white-space: pre-wrap;
	word-break: break-all;
}

/* 响应式 */
/* #ifdef H5 */
.demo-item:hover {
	background: #f8f9fa;
	cursor: pointer;
}
/* #endif */
</style> 