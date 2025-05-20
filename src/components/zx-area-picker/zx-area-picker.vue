<template>
	<picker v-if="regionArr" mode="multiSelector" :value="selectValue" :range="regionArr" :disabled="disabled" @change="change" @columnchange="select" @cancel="cancel">
		<view @click="onSelect">
			<text :style="textStyle">{{ areaStr }}</text>
		</view>
	</picker>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watch, watchEffect } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 地区码
	code: {
		type: [Number, String],
		default: 0
	},
	// key 的值作为选择器显示内容
	rangeKey: {
		type: String,
		default: ''
	},
	// 文本字体大小
	size: {
		type: String,
		default: '30rpx'
	},
	// 文本颜色
	color: {
		type: String,
		default: '#666666'
	},
	// 已选文本颜色
	activeColor: {
		type: String,
		default: '#333333'
	},
	// 是否禁用选择
	disabled: {
		type: Boolean,
		default: false
	},
	// 展示省
	showProvince: {
		type: Boolean,
		default: true
	},
	// 展示市
	showCity: {
		type: Boolean,
		default: true
	},
	// 展示区县
	showDistrict: {
		type: Boolean,
		default: true
	},
	// 是否显示loading
	loading: {
		type: Boolean,
		default: false
	}
});

const region = ref([]); // 地区列表数据
const regionArr = ref(null); 
	// 当前地区列表
const areaStr = ref('请选择地区'); // 地区字符串
const areaCode = ref(0); // 地区码
const textStyle = ref(null); // 文本样式
const selectValue = ref([0, 0, 0]); // 已选地区索引

onMounted(() => {
	// 字体样式
	textStyle.value = {
		fontSize: props.size,
		color: props.color
	};
	regionArr.value = getRegionList();
});

watchEffect(() => {
	if (props.code) {
		areaCode.value = parseInt(props.code);
		setTimeout(() => {
			let addressInfo = getAddressInfo(areaCode.value);
			selectValue.value = addressInfo.index;
			if (addressInfo.address) {
				let area_str = '';
				if (props.showProvince) {
					area_str += addressInfo.province;
				}
				if (props.showCity) {
					area_str += addressInfo.city;
				}
				if (props.showDistrict) {
					area_str += addressInfo.district;
				}
				areaStr.value = area_str;
			}
		}, 500);
	}
});

/**
 * 某一列的值改变时触发
 */
const select = (e) => {
	switch (e.detail.column) {
		case 0:
			selectValue.value = [e.detail.value, 0, 0];
			break;
		case 1:
			selectValue.value[1] = e.detail.value;
			break;
		case 2:
			selectValue.value[2] = e.detail.value;
			break;
	}
	regionArr.value = getRegionList();
	let code = region.value[selectValue.value[0]].children[selectValue.value[1]].children[selectValue.value[2]].code;
	let addressInfo = getAddressInfo(code);
	textStyle.value.color = props.activeColor;
	let changeData = {
		code: code,
		province: addressInfo.province,
		city: addressInfo.city,
		district: addressInfo.district,
		address: addressInfo.address,
		index: addressInfo.index
	};
	//console.log('select:' + JSON.stringify(changeData));
	proxy.$emit('select', changeData);
};

/**
 * 改变时触发
 */
const change = async (e) => {
	let arr = e.detail.value;
	if (!arr[0] && !arr[1] && !arr[2]) {
		areaCode.value = region.value[0].children[0].children[0].code;
	} else {
		areaCode.value = region.value[arr[0]].children[arr[1]].children[arr[2]].code;
	}
	let addressInfo = getAddressInfo(areaCode.value);
	selectValue.value = addressInfo.index;
	let area_str = '';
	if (props.showProvince) {
		area_str += addressInfo.province;
	}
	if (props.showCity) {
		area_str += addressInfo.city;
	}
	if (props.showDistrict) {
		area_str += addressInfo.district;
	}
	areaStr.value = area_str;
	let changeData = {
		code: areaCode.value,
		province: addressInfo.province,
		city: addressInfo.city,
		district: addressInfo.district,
		address: addressInfo.address,
		index: addressInfo.index
	};
	//console.log('change:' + JSON.stringify(changeData));
	proxy.$emit('change', changeData);
};

// 取消选择
const cancel = (e) => {
	//console.log('cancel:' + JSON.stringify(e));
	proxy.$emit('cancel', e);
};

// 选择区域事件
const onSelect = () => {
	// 设置当前选择的区域
	if (areaCode.value) {
		let addressInfo = getAddressInfo(areaCode.value);
		selectValue.value = addressInfo.index;
	}
	regionArr.value = getRegionList();
};

/**
 * 获取省市区数据列表
 */
const getRegionList = () => {
	let regions = [[], [], []];
	region.value.forEach((province, province_index) => {
		regions[0].push(province.name);
		if (province_index === selectValue.value[0]) {
			province.children.forEach((city, city_index) => {
				regions[1].push(city.name);
				if (city_index === selectValue.value[1]) {
					city.children.forEach((district, district_index) => {
						regions[2].push(district.name);
					});
				}
			});
		}
	});
	return regions;
};

/**
 * 获取指定code地区信息
 */
const getAddressInfo = (code) => {
	let indexArr = [];
	let address = '';
	let province_str = '';
	let city_str = '';
	let district_str = '';
	region.value.forEach((province, province_index) => {
		province.children.forEach((city, city_index) => {
			city.children.forEach((district, district_index) => {
				if (code == parseInt(district.code)) {
					indexArr = [province_index, city_index, district_index];
					address = province.name + city.name + district.name;
					province_str = province.name;
					city_str = city.name;
					district_str = district.name;
				}
			});
		});
	});
	return { index: indexArr, address: address, province: province_str, city: city_str, district: district_str };
};

</script>

<style scoped>

</style>
