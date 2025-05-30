<template>
	<view class="page">
		<view class="page-title">多选框组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="demo-row">
				<zx-checkbox v-model="checked1" label="选项 1" />
				<zx-checkbox v-model="checked2" label="选项 2" />
			</view>
			<view class="state-desc">选中状态: {{ checked1 ? '选项1已选中' : '选项1未选中' }}, {{ checked2 ? '选项2已选中' : '选项2未选中' }}</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<view class="demo-row">
				<zx-checkbox v-model="checkedDisabled1" disabled label="禁用且选中" />
				<zx-checkbox v-model="checkedDisabled2" disabled label="禁用且未选中" />
			</view>
		</view>
		
		<!-- 不同尺寸 -->
		<view class="section">
			<view class="section-title">不同尺寸</view>
			<view class="demo-row">
				<zx-checkbox v-model="sizeDemo1" label="默认尺寸" />
				<zx-checkbox v-model="sizeDemo2" size="50rpx" label="中等尺寸" />
				<zx-checkbox v-model="sizeDemo3" size="60rpx" label="大尺寸" />
			</view>
		</view>
		
		<!-- 自定义颜色 -->
		<view class="section">
			<view class="section-title">自定义颜色</view>
			<view class="demo-row">
				<zx-checkbox v-model="colorDemo1" active-color="#ff4500" label="自定义选中颜色" />
				<zx-checkbox v-model="colorDemo2" active-color="#4CAF50" label="另一种颜色" />
				<zx-checkbox v-model="colorDemo3" active-color="#9C27B0" label="再一种颜色" />
			</view>
		</view>
		
		<!-- 不同形状 -->
		<view class="section">
			<view class="section-title">不同形状</view>
			<view class="demo-row">
				<zx-checkbox v-model="shapeDemo1" shape="square" label="方形" />
				<zx-checkbox v-model="shapeDemo2" shape="circle" label="圆形" />
			</view>
		</view>
		
		<!-- 带边框 -->
		<view class="section">
			<view class="section-title">带边框</view>
			<view class="demo-row">
				<zx-checkbox v-model="borderDemo1" border label="边框选项1" />
				<zx-checkbox v-model="borderDemo2" border label="边框选项2" />
			</view>
		</view>
		
		<!-- 多选框组 -->
		<view class="section">
			<view class="section-title">多选框组</view>
			<zx-checkbox-group v-model="checkboxGroup1" @change="onGroupChange">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
				<zx-checkbox label="禁用" value="D" disabled />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ checkboxGroup1.join(', ') }}</view>
		</view>
		
		<!-- 配置最小/最大可选数量 -->
		<view class="section">
			<view class="section-title">限制可选数量(最少1个，最多2个)</view>
			<zx-checkbox-group v-model="limitedGroup" :min="1" :max="2">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
				<zx-checkbox label="选项 D" value="D" />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ limitedGroup.join(', ') }}</view>
		</view>
		
		<!-- 中间状态-全选 -->
		<view class="section">
			<view class="section-title">中间状态-全选</view>
			<zx-checkbox
				v-model="checkAll" 
				:indeterminate="isIndeterminate"
				@change="handleCheckAllChange"
				label="全选" 
			/>
			<zx-checkbox-group 
				v-model="checkedCities" 
				@change="handleCheckedCitiesChange"
			>
				<zx-checkbox v-for="city in cities" :key="city" :label="city" :value="city" />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ checkedCities.join(', ') }}</view>
		</view>
		
		<!-- 使用true-value和false-value -->
		<view class="section">
			<view class="section-title">自定义选中值(true-value/false-value)</view>
			<zx-checkbox 
				v-model="customValue" 
				:true-value="1" 
				:false-value="0" 
				label="同意协议" 
			/>
			<view class="state-desc">当前值: {{ customValue }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const checked1 = ref(true);
const checked2 = ref(false);

// 禁用状态
const checkedDisabled1 = ref(true);
const checkedDisabled2 = ref(false);

// 不同尺寸
const sizeDemo1 = ref(false);
const sizeDemo2 = ref(false);
const sizeDemo3 = ref(false);

// 自定义颜色
const colorDemo1 = ref(true);
const colorDemo2 = ref(true);
const colorDemo3 = ref(true);

// 不同形状
const shapeDemo1 = ref(false);
const shapeDemo2 = ref(false);

// 带边框
const borderDemo1 = ref(true);
const borderDemo2 = ref(false);

// 多选框组
const checkboxGroup1 = ref(['A', 'B']);
const onGroupChange = (val) => {
	console.log('checkbox group change:', val);
	uni.showToast({
		title: '选中值: ' + val.join(','),
		icon: 'none'
	});
};

// 限制选择数量
const limitedGroup = ref(['A']);

// 中间状态-全选
const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(['上海', '北京']);
const cities = ['上海', '北京', '广州', '深圳'];

const handleCheckAllChange = (val) => {
	checkedCities.value = val ? cities : [];
	isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value) => {
	const checkedCount = value.length;
	checkAll.value = checkedCount === cities.length;
	isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

// 自定义选中值
const customValue = ref(1);
</script>

<style lang="scss">
.page {
	padding: 20rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
	
	.page-title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin: 20rpx 0 40rpx;
		color: #333;
	}
	
	.section {
		margin-bottom: 40rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 8rpx;
		
		.section-title {
			font-size: 30rpx;
			color: #666;
			margin-bottom: 20rpx;
			position: relative;
			padding-left: 20rpx;
			
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 6rpx;
				height: 30rpx;
				background-color: #2979ff;
				border-radius: 3rpx;
			}
		}
	}
	
	.demo-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 20rpx;
		
		.zx-checkbox {
			margin-right: 30rpx;
			margin-bottom: 20rpx;
		}
	}
	
	.state-desc {
		font-size: 26rpx;
		color: #999;
		margin-top: 10rpx;
	}
}
</style>
