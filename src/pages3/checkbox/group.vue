<template>
	<view class="page">
		<view class="page-title">多选框组组件示例</view>
		
		<!-- 基础多选框组 -->
		<view class="section">
			<view class="section-title">基础多选框组</view>
			<zx-checkbox-group v-model="checkList1">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
				<zx-checkbox label="选项 D" value="D" />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ checkList1.join(', ') }}</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<zx-checkbox-group v-model="checkList2" disabled>
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
			</zx-checkbox-group>
			<view class="state-desc">整个组禁用</view>
		</view>
		
		<!-- 自定义尺寸 -->
		<view class="section">
			<view class="section-title">自定义尺寸</view>
			<zx-checkbox-group v-model="checkList3" size="50rpx">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
			</zx-checkbox-group>
		</view>
		
		<!-- 限制可选数量 -->
		<view class="section">
			<view class="section-title">限制可选数量 (最少1个，最多2个)</view>
			<zx-checkbox-group v-model="checkList4" :min="1" :max="2" @change="onChange">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
				<zx-checkbox label="选项 D" value="D" />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ checkList4.join(', ') }}</view>
		</view>
		
		<!-- 纵向排列 -->
		<view class="section">
			<view class="section-title">纵向排列</view>
			<zx-checkbox-group v-model="checkList5" placement="column">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
			</zx-checkbox-group>
		</view>
		
		<!-- 带边框的纵向排列 -->
		<view class="section">
			<view class="section-title">带边框的纵向排列</view>
			<zx-checkbox-group v-model="checkList6" placement="column" border-bottom>
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
			</zx-checkbox-group>
		</view>
		
		<!-- 自定义图标位置 -->
		<view class="section">
			<view class="section-title">图标在右侧</view>
			<zx-checkbox-group v-model="checkList7" icon-placement="right">
				<zx-checkbox label="选项 A" value="A" />
				<zx-checkbox label="选项 B" value="B" />
				<zx-checkbox label="选项 C" value="C" />
			</zx-checkbox-group>
		</view>
		
		<!-- 全选/反选 -->
		<view class="section">
			<view class="section-title">全选/反选功能</view>
			<view class="action-row">
				<zx-checkbox 
					v-model="checkAll" 
					:indeterminate="isIndeterminate" 
					@change="handleCheckAllChange"
					label="全选"
				/>
				<text class="action-btn" @tap="toggleAll">反选</text>
			</view>
			<zx-checkbox-group 
				v-model="checkListAll" 
				@change="handleCheckedChange"
			>
				<zx-checkbox v-for="fruit in fruits" :key="fruit" :label="fruit" :value="fruit" />
			</zx-checkbox-group>
			<view class="state-desc">当前选中: {{ checkListAll.join(', ') }}</view>
		</view>
		
		<!-- 使用示例：收货地址 -->
		<view class="section">
			<view class="section-title">实例：收货地址</view>
			<view class="address-form">
				<view class="address-item" v-for="(address, index) in addresses" :key="index">
					<zx-checkbox v-model="address.isDefault" :true-value="1" :false-value="0" @change="setDefault(index)">
						{{ address.name }} {{ address.phone }}
						<view class="address-detail">{{ address.province }} {{ address.city }} {{ address.detail }}</view>
						<view class="address-tag" v-if="address.isDefault === 1">默认</view>
					</zx-checkbox>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础多选框组
const checkList1 = ref(['A', 'B']);

// 禁用状态
const checkList2 = ref(['A']);

// 自定义尺寸
const checkList3 = ref(['A']);

// 限制可选数量
const checkList4 = ref(['A']);
const onChange = (val) => {
	uni.showToast({
		title: '选中值: ' + val.join(','),
		icon: 'none'
	});
};

// 纵向排列
const checkList5 = ref(['A']);

// 带边框的纵向排列
const checkList6 = ref(['A']);

// 自定义图标位置
const checkList7 = ref(['A']);

// 全选/反选
const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜'];
const checkListAll = ref(['苹果', '香蕉']);
const checkAll = ref(false);
const isIndeterminate = ref(true);

const handleCheckAllChange = (val) => {
	checkListAll.value = val ? [...fruits] : [];
	isIndeterminate.value = false;
};
const handleCheckedChange = (value) => {
	const checkedCount = value.length;
	checkAll.value = checkedCount === fruits.length;
	isIndeterminate.value = checkedCount > 0 && checkedCount < fruits.length;
};
const toggleAll = () => {
	const unchecked = fruits.filter(item => !checkListAll.value.includes(item));
	checkListAll.value = unchecked;
	checkAll.value = unchecked.length === fruits.length;
	isIndeterminate.value = unchecked.length > 0 && unchecked.length < fruits.length;
};

// 收货地址示例
const addresses = ref([
	{
		name: '张三',
		phone: '13800138000',
		province: '广东省',
		city: '深圳市',
		detail: '南山区科技园1号楼',
		isDefault: 1
	},
	{
		name: '李四',
		phone: '13900139000',
		province: '北京市',
		city: '海淀区',
		detail: '中关村科技园8号楼',
		isDefault: 0
	},
	{
		name: '王五',
		phone: '13700137000',
		province: '上海市',
		city: '浦东新区',
		detail: '张江高科技园区',
		isDefault: 0
	}
]);

const setDefault = (index) => {
	if (addresses.value[index].isDefault === 1) {
		// 设置当前为默认地址，其他取消默认
		addresses.value.forEach((item, idx) => {
			if (idx !== index) {
				item.isDefault = 0;
			}
		});
	}
};
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
	
	.state-desc {
		font-size: 26rpx;
		color: #999;
		margin-top: 10rpx;
	}
	
	.action-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		
		.action-btn {
			font-size: 28rpx;
			color: #2979ff;
			padding: 10rpx 20rpx;
		}
	}
	
	.address-form {
		.address-item {
			padding: 20rpx 0;
			border-bottom: 1px solid #eee;
			
			&:last-child {
				border-bottom: none;
			}
			
			.address-detail {
				font-size: 26rpx;
				color: #666;
				margin-top: 10rpx;
			}
			
			.address-tag {
				display: inline-block;
				font-size: 22rpx;
				color: #fff;
				background-color: #ff5500;
				border-radius: 4rpx;
				padding: 4rpx 10rpx;
				margin-left: 10rpx;
			}
		}
	}
}
</style>
