<template>
	<view class="container">
		<zx-navbar title="Picker View 选择器视图"></zx-navbar>
		<zx-title title="基本用法" type="line"></zx-title>
		<view class="example-item">
			<zx-picker-view :columns="columns1" :value="value1" @change="onChange1"></zx-picker-view>
			<view class="selected-value">当前选中：{{ value1.join(',') }}</view>
		</view>

		<zx-title title="自定义高度和可见数量" type="line"></zx-title>
		<view class="example-item">
			<zx-picker-view
				:columns="columns2"
				:value="value2"
				itemHeight="100rpx"
				visibleItemCount="3"
				indicatorStyle="height: 100rpx; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"
				@change="onChange2"
			></zx-picker-view>
			<view class="selected-value">当前选中：{{ value2.join(',') }}</view>
		</view>

		<zx-title title="使用对象数组和 keyName" type="line"></zx-title>
		<view class="example-item">
			<zx-picker-view :columns="columns3" :value="value3" keyName="name" @change="onChange3"></zx-picker-view>
			<view class="selected-value">当前选中：{{ JSON.stringify(getSelectedObjectValues(columns3, value3, 'name')) }}</view>
		</view>

		<zx-title title="多列联动（省市区选择示例）" type="line"></zx-title>
		<view class="example-item">
			<zx-picker-view :columns="cityColumns" :value="cityValue" @change="onCityChange"></zx-picker-view>
			<view class="selected-value">当前选中：{{ getSelectedCityText() }}</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// 基本用法
const columns1 = ref([
	['春', '夏', '秋', '冬'],
	['2020', '2021', '2022', '2023', '2024']
]);
const value1 = ref([0, 2]);
const onChange1 = (val) => {
	value1.value = val;
	console.log('基本用法选中:', val);
};

// 自定义高度和可见数量
const columns2 = ref([
	['红', '橙', '黄', '绿', '青', '蓝', '紫'],
	['A', 'B', 'C', 'D', 'E']
]);
const value2 = ref([1, 0]);
const onChange2 = (val) => {
	value2.value = val;
	console.log('自定义高度选中:', val);
};

// 使用对象数组和 keyName
const columns3 = ref([
	[
		{ id: '1', name: '苹果' },
		{ id: '2', name: '香蕉' },
		{ id: '3', name: '橙子' }
	],
	[
		{ id: 'a', name: '猫' },
		{ id: 'b', name: '狗' },
		{ id: 'c', name: '鸟' }
	]
]);
const value3 = ref([0, 1]);
const onChange3 = (val) => {
	value3.value = val;
	console.log('对象数组选中:', val, getSelectedObjectValues(columns3.value, val, 'name'));
};

const getSelectedObjectValues = (cols, vals, key) => {
	return vals.map((v, i) => (cols[i] && cols[i][v] ? cols[i][v][key] : ''));
};

// 多列联动（省市区选择示例）
const provinces = reactive([
	{ name: '北京', cities: [{ name: '北京市' }] },
	{
		name: '浙江',
		cities: [
			{ name: '杭州市', areas: ['西湖区', '上城区', '滨江区'] },
			{ name: '宁波市', areas: ['海曙区', '鄞州区', '江北区'] },
			{ name: '温州市', areas: ['鹿城区', '龙湾区', '瓯海区'] }
		]
	},
	{
		name: '江苏',
		cities: [
			{ name: '南京市', areas: ['玄武区', '秦淮区', '建邺区'] },
			{ name: '苏州市', areas: ['姑苏区', '虎丘区', '吴中区'] }
		]
	}
]);

const cityValue = ref([0, 0, 0]);

const cityColumns = computed(() => {
	const provinceNames = provinces.map((p) => p.name);
	const selectedProvinceIndex = cityValue.value[0] || 0;
	const selectedProvince = provinces[selectedProvinceIndex] || provinces[0];
	const cityNames = selectedProvince.cities.map((c) => c.name);

	const selectedCityIndex = cityValue.value[1] || 0;
	const selectedCity = selectedProvince.cities[selectedCityIndex] || selectedProvince.cities[0];
	const areaNames = selectedCity && selectedCity.areas ? selectedCity.areas : [];

	return [provinceNames, cityNames, areaNames];
});

const onCityChange = (val) => {
	const oldProvinceIndex = cityValue.value[0];
	const newProvinceIndex = val[0];

	// 如果省份改变，重置市区索引
	if (oldProvinceIndex !== newProvinceIndex) {
		cityValue.value = [newProvinceIndex, 0, 0];
	} else {
		const oldCityIndex = cityValue.value[1];
		const newCityIndex = val[1];
		// 如果城市改变，重置区域索引
		if(oldCityIndex !== newCityIndex){
		    cityValue.value = [newProvinceIndex, newCityIndex, 0];
		} else {
		    cityValue.value = [...val];
		}
	}
	console.log('城市选择:', cityValue.value, getSelectedCityText());
};

const getSelectedCityText = () => {
    if (!provinces[cityValue.value[0]] || 
        !provinces[cityValue.value[0]].cities[cityValue.value[1]] || 
        (provinces[cityValue.value[0]].cities[cityValue.value[1]].areas && !provinces[cityValue.value[0]].cities[cityValue.value[1]].areas[cityValue.value[2]])
       ) {
        // 处理边界情况，例如当列数据为空时
        let prov = provinces[cityValue.value[0]] ? provinces[cityValue.value[0]].name : '';
        let city = '';
        if(provinces[cityValue.value[0]] && provinces[cityValue.value[0]].cities[cityValue.value[1]]){
            city = provinces[cityValue.value[0]].cities[cityValue.value[1]].name;
        }
        let area = '';
         if(provinces[cityValue.value[0]] && provinces[cityValue.value[0]].cities[cityValue.value[1]] && provinces[cityValue.value[0]].cities[cityValue.value[1]].areas && provinces[cityValue.value[0]].cities[cityValue.value[1]].areas[cityValue.value[2]]){
            area = provinces[cityValue.value[0]].cities[cityValue.value[1]].areas[cityValue.value[2]];
        }
        return `${prov} ${city} ${area}`.trim();
    }

	const province = provinces[cityValue.value[0]].name;
	const city = provinces[cityValue.value[0]].cities[cityValue.value[1]].name;
    let area = '';
    if(provinces[cityValue.value[0]].cities[cityValue.value[1]].areas && provinces[cityValue.value[0]].cities[cityValue.value[1]].areas.length > 0){
        area = provinces[cityValue.value[0]].cities[cityValue.value[1]].areas[cityValue.value[2]] || '';
    }
	return `${province} ${city} ${area}`.trim();
};
</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
	background-color: #f8f8f8;
}

.example-item {
	background-color: #fff;
	padding: 20rpx;
	margin-bottom: 20rpx;
	border-radius: 8rpx;
}

.selected-value {
	margin-top: 20rpx;
	font-size: 28rpx;
	color: #666;
}
</style>