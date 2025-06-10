<template>
	<picker v-if="regionArr && !error" mode="multiSelector" :value="selectValue" :range="regionArr" :disabled="disabled || loading" @change="change" @columnchange="select" @cancel="cancel">
		<view @click="onSelect">
			<view :class="['picker-content', { 'picker-placeholder': !areaCode }]" :style="{ opacity: loading ? 0.6 : 1 }">
				<text :style="textStyle">{{ areaStr }}</text>
				<text v-if="loading" class="loading-text">加载中...</text>
			</view>
		</view>
	</picker>
	<view v-else-if="error" @click="reload" class="error-content">
		<text class="error-text">{{ error }}</text>
		<text class="reload-text">点击重试</text>
	</view>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref, watch, watchEffect, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 数据url
	url: {
		type: String,
		default: 'https://cdn.mp.ac.cn/json/region.json'
	},
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
	},
	// 占位文本
	placeholder: {
		type: String,
		default: '请选择地区'
	},
	// 是否默认选中第一项
	defaultFirst: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['change', 'select', 'cancel', 'error']);

const region = ref([]); // 地区列表数据
const regionArr = ref(null); // 当前地区列表
const areaStr = ref(''); // 地区字符串
const areaCode = ref(0); // 地区码
const textStyle = ref(null); // 文本样式
const selectValue = ref([0, 0, 0]); // 已选地区索引
const localLoading = ref(false); // 本地loading状态
const error = ref(''); // 错误信息

// 计算属性：是否在加载中
const loading = computed(() => localLoading.value || props.loading);

// 初始化样式和占位符
onMounted(async () => {
	// 字体样式
	textStyle.value = {
		fontSize: props.size,
		color: areaCode.value ? props.activeColor : props.color
	};
	
	areaStr.value = props.placeholder;
	
	// 加载地区数据
	await loadRegionData();
});



// 加载地区数据
const loadRegionData = async () => {
	if (region.value.length > 0) return;
	
	localLoading.value = true;
	error.value = '';
	
	try {
		const response = await uni.request({
			url: props.url,
			method: 'GET'
		});
		
		if (response.statusCode === 200 && response.data) {
			region.value = response.data;
			regionArr.value = getRegionList();
			
			// 如果设置了默认选中第一项且没有指定code
			if (props.defaultFirst && !props.code) {
				areaCode.value = region.value[0].children[0].children[0].code;
				updateAreaByCode();
			} else if (props.code) {
				updateAreaByCode();
			}
		} else {
			throw new Error('加载地区数据失败');
		}
	} catch (err) {
		error.value = '加载地区数据失败，请重试';
		emit('error', error.value);
	} finally {
		localLoading.value = false;
	}
};

// 重新加载数据
const reload = async () => {
	await loadRegionData();
};

// 根据地区码更新地区显示
const updateAreaByCode = () => {
	if (!region.value.length || !areaCode.value) return;
	
	const addressInfo = getAddressInfo(areaCode.value);
	if (!addressInfo.address) return;
	
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
	textStyle.value.color = props.activeColor;
};

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
			selectValue.value[2] = 0;
			break;
		case 2:
			selectValue.value[2] = e.detail.value;
			break;
	}
	regionArr.value = getRegionList();
	
	try {
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
		emit('select', changeData);
	} catch (err) {
		console.error('地区选择数据异常:', err);
	}
};

/**
 * 改变时触发
 */
const change = async (e) => {
	let arr = e.detail.value;
	try {
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
		
		emit('change', changeData);
	} catch (err) {
		console.error('地区选择数据异常:', err);
	}
};

// 取消选择
const cancel = (e) => {
	emit('cancel', e);
};

// 选择区域事件
const onSelect = () => {
	if (loading.value || error.value) return;
	
	// 设置当前选择的区域
	if (areaCode.value) {
		let addressInfo = getAddressInfo(areaCode.value);
		if (addressInfo.index && addressInfo.index.length === 3) {
			selectValue.value = addressInfo.index;
		}
	}
	regionArr.value = getRegionList();
};

/**
 * 获取省市区数据列表
 */
const getRegionList = () => {
	if (!region.value || !region.value.length) return null;
	
	let regions = [[], [], []];
	
	try {
		region.value.forEach((province, province_index) => {
			regions[0].push(province.name);
			if (province_index === selectValue.value[0]) {
				if (province.children && province.children.length) {
					province.children.forEach((city, city_index) => {
						regions[1].push(city.name);
						if (city_index === selectValue.value[1]) {
							if (city.children && city.children.length) {
								city.children.forEach((district) => {
									regions[2].push(district.name);
								});
							}
						}
					});
				}
			}
		});
		
		return regions;
	} catch (err) {
		console.error('获取地区列表失败:', err);
		return [[], [], []];
	}
};

/**
 * 获取指定code地区信息
 */
const getAddressInfo = (code) => {
	if (!region.value || !region.value.length) {
		return { index: [0, 0, 0], address: '', province: '', city: '', district: '' };
	}
	
	let indexArr = [0, 0, 0];
	let address = '';
	let province_str = '';
	let city_str = '';
	let district_str = '';
	let found = false;
	
	try {
		region.value.forEach((province, province_index) => {
			if (found) return;
			if (province.children && province.children.length) {
				province.children.forEach((city, city_index) => {
					if (found) return;
					if (city.children && city.children.length) {
						city.children.forEach((district, district_index) => {
							if (found) return;
							if (parseInt(district.code) === parseInt(code)) {
								indexArr = [province_index, city_index, district_index];
								address = province.name + city.name + district.name;
								province_str = province.name;
								city_str = city.name;
								district_str = district.name;
								found = true;
							}
						});
					}
				});
			}
		});
		
		return { 
			index: indexArr, 
			address: address, 
			province: province_str, 
			city: city_str, 
			district: district_str 
		};
	} catch (err) {
		console.error('获取地址信息失败:', err);
		return { index: [0, 0, 0], address: '', province: '', city: '', district: '' };
	}
};

// 监听code变化
watch(
	() => props.code,
	(newVal) => {
		if (newVal) {
			areaCode.value = parseInt(newVal);
			updateAreaByCode();
		}
	},
	{ immediate: true }
);

// 导出组件方法供父组件调用
defineExpose({
	reload, // 重新加载数据
	getAddressInfo, // 获取地址信息
	updateAreaByCode // 根据地区码更新选中状态
});
</script>

<style scoped>
.picker-content {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.picker-placeholder {
	opacity: 0.8;
}
.loading-text {
	margin-left: 10rpx;
	font-size: 24rpx;
	color: #999;
}
.error-content {
	padding: 20rpx 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.error-text {
	font-size: 28rpx;
	color: #ff4d4f;
}
.reload-text {
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #1890ff;
}
</style>
