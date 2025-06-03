<template>
	<view class="content">
		<view class="title">zx-select 选择器组件</view>
		
		<view class="section">
			<view class="section-title">基础用法</view>
			<zx-select v-model="basicValue" :localdata="basicOptions" placeholder="请选择" />
			<view class="result" v-if="basicValue">
				<text>已选择：{{ basicValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">左侧标题</view>
			<zx-select v-model="labelValue" :localdata="basicOptions" label="选择项" placeholder="请选择" />
			<view class="result" v-if="labelValue">
				<text>已选择：{{ labelValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">禁用状态</view>
			<zx-select v-model="disabledValue" :localdata="basicOptions" disabled placeholder="禁用状态" />
		</view>
		
		<view class="section">
			<view class="section-title">可清空单选</view>
			<zx-select v-model="clearableValue" :localdata="basicOptions" :clear="true" placeholder="可清空" />
			<view class="result" v-if="clearableValue">
				<text>已选择：{{ clearableValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">基础多选</view>
			<zx-select v-model="multipleValue" :localdata="basicOptions" multiple placeholder="请选择多项" />
			<view class="result" v-if="multipleValue && multipleValue.length">
				<text>已选择：{{ multipleValue.join(', ') }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">可搜索</view>
			<zx-select v-model="searchValue" :localdata="searchOptions" filterable placeholder="请搜索选择" />
			<view class="result" v-if="searchValue">
				<text>已选择：{{ searchValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">选项分组</view>
			<zx-select v-model="groupValue" :localdata="groupOptions" placeholder="请选择城市" />
			<view class="result" v-if="groupValue">
				<text>已选择：{{ groupValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义格式化显示</view>
			<zx-select 
				v-model="formatValue" 
				:localdata="formatOptions" 
				format="{text} - {description}" 
				placeholder="请选择" 
			/>
			<view class="result" v-if="formatValue">
				<text>已选择：{{ formatValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义选项</view>
			<zx-select v-model="customValue" :localdata="customOptions" placeholder="请选择">
				<template #option="{ item }">
					<view class="custom-option">
						<image v-if="item.icon" :src="item.icon" class="custom-icon"></image>
						<text class="custom-label">{{ item.text }}</text>
						<text class="custom-desc">{{ item.description }}</text>
					</view>
				</template>
			</zx-select>
			<view class="result" v-if="customValue">
				<text>已选择：{{ customValue }}</text>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">向上弹出</view>
			<zx-select v-model="placementValue" :localdata="basicOptions" placement="top" placeholder="向上弹出" />
			<view class="result" v-if="placementValue">
				<text>已选择：{{ placementValue }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础选择器
const basicValue = ref('');
const basicOptions = ref([
	{ text: '选项一', value: '1' },
	{ text: '选项二', value: '2' },
	{ text: '选项三', value: '3' },
	{ text: '选项四', value: '4' },
	{ text: '选项五', value: '5' }
]);

// 带标题
const labelValue = ref('');

// 禁用状态
const disabledValue = ref('');

// 可清空单选
const clearableValue = ref('');

// 多选选择器
const multipleValue = ref([]);

// 可搜索
const searchValue = ref('');
const searchOptions = ref([
	{ text: '北京', value: 'Beijing' },
	{ text: '上海', value: 'Shanghai' },
	{ text: '广州', value: 'Guangzhou' },
	{ text: '深圳', value: 'Shenzhen' },
	{ text: '南京', value: 'Nanjing' },
	{ text: '西安', value: 'Xian' },
	{ text: '成都', value: 'Chengdu' },
	{ text: '重庆', value: 'Chongqing' },
	{ text: '杭州', value: 'Hangzhou' },
	{ text: '武汉', value: 'Wuhan' },
	{ text: '苏州', value: 'Suzhou' },
	{ text: '天津', value: 'Tianjin' },
	{ text: '长沙', value: 'Changsha' },
	{ text: '郑州', value: 'Zhengzhou' },
	{ text: '东莞', value: 'Dongguan' },
	{ text: '青岛', value: 'Qingdao' }
]);

// 分组
const groupValue = ref('');
const groupOptions = ref([
	{
		text: '热门城市',
		value: 'hot',
		group: '城市分类'
	},
	{
		text: '北京',
		value: 'Beijing',
		group: '直辖市'
	},
	{
		text: '上海',
		value: 'Shanghai',
		group: '直辖市'
	},
	{
		text: '天津',
		value: 'Tianjin',
		group: '直辖市'
	},
	{
		text: '重庆',
		value: 'Chongqing',
		group: '直辖市'
	},
	{
		text: '广州',
		value: 'Guangzhou',
		group: '广东省'
	},
	{
		text: '深圳',
		value: 'Shenzhen',
		group: '广东省'
	},
	{
		text: '杭州',
		value: 'Hangzhou',
		group: '浙江省'
	},
	{
		text: '南京',
		value: 'Nanjing',
		group: '江苏省'
	},
	{
		text: '苏州',
		value: 'Suzhou',
		group: '江苏省'
	}
]);

// 格式化显示
const formatValue = ref('');
const formatOptions = ref([
	{
		text: '微信支付',
		value: 'wxpay',
		description: '微信安全支付'
	},
	{
		text: '支付宝',
		value: 'alipay',
		description: '支付宝安全支付'
	},
	{
		text: '银联支付',
		value: 'unionpay',
		description: '银联安全支付'
	}
]);

// 自定义选项
const customValue = ref('');
const customOptions = ref([
	{
		text: '微信支付',
		value: 'wxpay',
		icon: 'https://zxui.org/logo.png',
		description: '微信安全支付'
	},
	{
		text: '支付宝',
		value: 'alipay',
		icon: 'https://zxui.org/logo.png',
		description: '支付宝安全支付'
	},
	{
		text: '银联支付',
		value: 'unionpay',
		icon: 'https://zxui.org/logo.png',
		description: '银联安全支付'
	}
]);

// 向上弹出
const placementValue = ref('');
</script>

<style>
.content {
	padding: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	text-align: center;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 32rpx;
	margin-bottom: 20rpx;
	font-weight: 500;
}

.result {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #666;
}

.custom-option {
	display: flex;
	align-items: center;
}

.custom-icon {
	width: 40rpx;
	height: 40rpx;
	margin-right: 10rpx;
}

.custom-label {
	font-size: 28rpx;
	margin-right: 10rpx;
}

.custom-desc {
	font-size: 24rpx;
	color: #999;
}
</style>
