<template>
	<view class="map-box">
		<view v-if="showInfo" class="map-info">
			<view class="info-item" v-if="mapData.phone">
				<view class="dot"></view>
				<view class="info-content"><zx-text :text="'联系电话：' + mapData.phone" size="32rpx"
						color="#313131"></zx-text></view>
			</view>
			<view class="info-item" v-if="mapData.address">
				<view class="dot"></view>
				<view class="info-content"><zx-text :text="'地址：' + mapData.address" size="32rpx"
						color="#313131"></zx-text></view>
			</view>
		</view>
		<view :style="{ 'margin-top': showInfo ? '20rpx' : '0' }">
			<map :style="mapStyle" :latitude="latitude" :longitude="longitude" :scale="scale"
				:show-location="showLocation" :markers="markers" :polyline="polyline" :circles="circles"
				:enable-zoom="enableZoom" :enable-scroll="enableScroll" :enable-rotate="enableRotate"
				:enable-satellite="enableSatellite" :enable-traffic="enableTraffic" :enable-poi="enablePoi"
				:enable-building="enableBuilding" :show-compass="showCompass" :show-scale="showScale"
				:min-scale="minScale" :max-scale="maxScale" @tap="mapTap" @markertap="onMarkerTap"
				@callouttap="onCalloutTap" @regionchange="onRegionChange" @updated="onMapUpdated"></map>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, computed, onMounted, watch } from 'vue';
import zxText from '@tanzhenxing/zx-text/zx-text.vue';

const { proxy } = getCurrentInstance();

// 地图属性
const props = defineProps({
	mapData: {
		type: Object,
		default: () => {
			return {};
		}
	},
	width: {
		type: String,
		default: '690rpx'
	},
	height: {
		type: String,
		default: '350rpx'
	},
	scale: {
		type: Number,
		default: 15
	},
	minScale: {
		type: Number,
		default: 3
	},
	maxScale: {
		type: Number,
		default: 20
	},
	showLocation: {
		type: Boolean,
		default: false
	},
	enableZoom: {
		type: Boolean,
		default: true
	},
	enableScroll: {
		type: Boolean,
		default: true
	},
	enableRotate: {
		type: Boolean,
		default: false
	},
	enableSatellite: {
		type: Boolean,
		default: false
	},
	enableTraffic: {
		type: Boolean,
		default: false
	},
	enablePoi: {
		type: Boolean,
		default: true
	},
	enableBuilding: {
		type: Boolean,
		default: true
	},
	showCompass: {
		type: Boolean,
		default: false
	},
	showScale: {
		type: Boolean,
		default: false
	},
	showInfo: {
		type: Boolean,
		default: true
	},
	markerIcons: {
		type: Array,
		default: () => []
	},
	externalMarkers: {
		type: Array,
		default: () => []
	},
	polyline: {
		type: Array,
		default: () => []
	},
	circles: {
		type: Array,
		default: () => []
	}
});

// 事件
const emit = defineEmits([
	'markertap',
	'callouttap',
	'regionchange',
	'updated',
	'tap'
]);

// 计算属性
const mapStyle = computed(() => {
	return `width: ${props.width}; height: ${props.height};`;
});

// 定义响应式数据
const latitude = ref(0);
const longitude = ref(0);
const markers = ref([]);

// 生命周期钩子
onMounted(() => {
	// 初始化地图数据
	initMapData();
});

// 监听mapData变化
watch(() => props.mapData, (newVal) => {
	initMapData();
}, { deep: true });

// 监听外部markers变化
watch(() => props.externalMarkers, (newVal) => {
	updateMarkers();
}, { deep: true });

// 初始化地图数据
const initMapData = () => {
	if (props.mapData.latitude && props.mapData.longitude) {
		latitude.value = props.mapData.latitude;
		longitude.value = props.mapData.longitude;
		updateMarkers();
	} else if (props.mapData.address) {
		// 如果没有经纬度但有地址，则尝试进行地理编码
		geocodeAddress();
	}
};

// 更新标记点
const updateMarkers = () => {
	// 合并外部标记点和主标记点
	let allMarkers = [...props.externalMarkers];

	// 如果有主要地点数据，添加到标记点中
	if (props.mapData.name) {
		const mainMarker = {
			id: 'main',
			title: props.mapData.name,
			latitude: latitude.value,
			longitude: longitude.value,
			iconPath: props.mapData.logo || 'https://files.wufu-app.com/images/other/map.png',
			width: 35,
			height: 35,
			callout: {
				content: props.mapData.name,
				color: '#333333',
				fontSize: 14,
				borderRadius: 5,
				padding: 10,
				display: 'BYCLICK',
				textAlign: 'center'
			},
			label: {
				content: props.mapData.name,
				color: '#333333',
				fontSize: 14,
				padding: 5,
				anchorX: 20,
				anchorY: -35,
				textAlign: 'center'
			}
		};
		allMarkers.push(mainMarker);
	}

	// 应用自定义图标
	if (props.markerIcons.length > 0) {
		allMarkers = allMarkers.map((marker, index) => {
			if (props.markerIcons[index]) {
				return { ...marker, iconPath: props.markerIcons[index] };
			}
			return marker;
		});
	}

	markers.value = allMarkers;
};

// 地理编码（地址转坐标）
const geocodeAddress = async () => {
	try {
		const geocoder = uniCloud.importObject('geocoder');
		const res = await geocoder.get(props.mapData.address);

		if (res.data && res.data.result && res.data.result.location) {
			latitude.value = res.data.result.location.lat;
			longitude.value = res.data.result.location.lng;
			updateMarkers();
		} else {
			console.error('地理编码返回数据格式不正确:', res);
			uni.showToast({
				title: '地址解析失败',
				icon: 'none'
			});
		}
	} catch (e) {
		console.error('地理编码失败:', e);
		uni.showToast({
			title: '地址解析失败',
			icon: 'none'
		});
	}
};

// 点击地图事件
const mapTap = (e) => {
	emit('tap', e);
	// 默认行为：跳转到详情页
	if (props.mapData.name) {
		uni.navigateTo({
			url: '/package02/map/index?latitude=' + longitude.value + '&longitude=' + latitude.value + '&title=' + encodeURIComponent(props.mapData.name) + '&address=' + encodeURIComponent(props.mapData.address || '')
		});
	}
};

// 点击标记点事件
const onMarkerTap = (e) => {
	emit('markertap', e);
};

// 点击气泡事件
const onCalloutTap = (e) => {
	emit('callouttap', e);
};

// 地图视野变化事件
const onRegionChange = (e) => {
	emit('regionchange', e);
};

// 地图更新完成事件
const onMapUpdated = (e) => {
	emit('updated', e);
};

// 暴露方法供父组件调用
defineExpose({
	geocodeAddress,
	updateMarkers
});
</script>

<style lang="scss">
.map-box {
	font-size: 30rpx;
	line-height: 50rpx;
	text-align: justify;

	.map-info {
		padding: 30rpx 30rpx 0 30rpx;

		.info-item {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			margin-bottom: 20rpx;

			.dot {
				width: 10rpx;
				height: 10rpx;
				background-color: #ff0000;
				margin-top: 20rpx;
				margin-right: 20rpx;
			}

			.info-content {
				flex: 1;
			}
		}
	}
}
</style>
