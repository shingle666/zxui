<template>
	<view class="content">
		<view class="title">
			<text>zx-map 地图组件示例</text>
		</view>
		
		<view class="section">
			<view class="section-title">基本用法</view>
			<view class="section-content">
				<zx-map :mapData="basicMapData"></zx-map>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义大小和控制</view>
			<view class="section-content">
				<zx-map 
					:mapData="basicMapData" 
					width="700rpx" 
					height="400rpx"
					:enableZoom="true"
					:enableScroll="true"
					:showCompass="true"
					:showScale="true"
					:scale="14"
				></zx-map>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">多标记点</view>
			<view class="section-content">
				<zx-map 
					:mapData="multipleMapData"
					:externalMarkers="branchMarkers"
					@markertap="onMarkerTap"
				></zx-map>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">路线和区域</view>
			<view class="section-content">
				<zx-map 
					:mapData="routeMapData"
					:polyline="routes"
					:circles="serviceAreas"
					height="500rpx"
				></zx-map>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">无信息展示区</view>
			<view class="section-content">
				<zx-map 
					:mapData="basicMapData"
					:showInfo="false"
					height="300rpx"
				></zx-map>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">地址自动解析</view>
			<view class="section-content">
				<view class="input-group">
					<input 
						type="text" 
						v-model="addressInput" 
						placeholder="输入地址"
						class="address-input"
					/>
					<button @tap="parseAddress" class="parse-btn">解析</button>
				</view>
				<zx-map 
					:mapData="geocodeMapData"
					ref="geocodeMapRef"
					height="350rpx"
				></zx-map>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 基本地图数据
const basicMapData = ref({
	name: '示例公司总部',
	address: '北京市朝阳区建国路88号',
	phone: '010-12345678',
	latitude: 39.9042,
	longitude: 116.4074
});

// 多标记点地图数据
const multipleMapData = ref({
	name: '总部',
	address: '北京市朝阳区建国路88号',
	phone: '010-12345678',
	latitude: 39.9042,
	longitude: 116.4074
});

// 分支机构标记点
const branchMarkers = ref([
	{
		id: 'branch1',
		title: '分支机构1',
		latitude: 39.9142,
		longitude: 116.4174,
		width: 30,
		height: 30,
		callout: {
			content: '分支机构1',
			color: '#333333',
			fontSize: 14,
			borderRadius: 5,
			padding: 10,
			display: 'BYCLICK',
			textAlign: 'center'
		}
	},
	{
		id: 'branch2',
		title: '分支机构2',
		latitude: 39.8942,
		longitude: 116.3974,
		width: 30,
		height: 30,
		callout: {
			content: '分支机构2',
			color: '#333333',
			fontSize: 14,
			borderRadius: 5,
			padding: 10,
			display: 'BYCLICK',
			textAlign: 'center'
		}
	}
]);

// 路线地图数据
const routeMapData = ref({
	name: '起点',
	address: '北京市朝阳区建国路88号',
	phone: '010-12345678',
	latitude: 39.9042,
	longitude: 116.4074
});

// 路线数据
const routes = ref([
	{
		points: [
			{
				latitude: 39.9042,
				longitude: 116.4074
			},
			{
				latitude: 39.9142,
				longitude: 116.4174
			},
			{
				latitude: 39.9242,
				longitude: 116.4274
			}
		],
		color: '#FF0000',
		width: 4,
		arrowLine: true
	}
]);

// 服务区域
const serviceAreas = ref([
	{
		latitude: 39.9042,
		longitude: 116.4074,
		color: '#FF000033',
		radius: 1000,
		strokeWidth: 2,
		strokeColor: '#FF0000'
	}
]);

// 地址解析相关
const addressInput = ref('');
const geocodeMapData = ref({
	name: '搜索位置',
	address: '',
	phone: '',
	latitude: 39.9042,
	longitude: 116.4074
});
const geocodeMapRef = ref(null);

// 解析地址
const parseAddress = () => {
	if (!addressInput.value) {
		uni.showToast({
			title: '请输入地址',
			icon: 'none'
		});
		return;
	}
	
	// 更新地图数据
	geocodeMapData.value = {
		name: '搜索位置',
		address: addressInput.value,
		phone: '',
		// 不设置经纬度，让组件自动解析
	};
	
	// 如果地图组件已挂载，手动触发地址解析
	if (geocodeMapRef.value) {
		setTimeout(() => {
			geocodeMapRef.value.geocodeAddress();
		}, 100);
	}
};

// 标记点点击事件
const onMarkerTap = (e) => {
	uni.showToast({
		title: `点击了标记点: ${e.markerId}`,
		icon: 'none'
	});
};

// 页面加载完成
onMounted(() => {
	uni.setNavigationBarTitle({
		title: 'zx-map 地图组件示例'
	});
});
</script>

<style lang="scss">
.content {
	padding: 20rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 30rpx;
	}
	
	.section {
		margin-bottom: 40rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.1);
		overflow: hidden;
		
		.section-title {
			font-size: 32rpx;
			font-weight: bold;
			padding: 20rpx;
			background-color: #f8f8f8;
			border-bottom: 1px solid #eeeeee;
		}
		
		.section-content {
			padding: 0;
		}
		
		.input-group {
			display: flex;
			padding: 20rpx;
			
			.address-input {
				flex: 1;
				height: 70rpx;
				border: 1rpx solid #dddddd;
				border-radius: 8rpx;
				padding: 0 20rpx;
				margin-right: 20rpx;
			}
			
			.parse-btn {
				width: 150rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				padding: 0;
			}
		}
	}
}
</style>
