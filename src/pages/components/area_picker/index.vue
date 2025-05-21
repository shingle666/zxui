<template>
	<view class="container">
		<view class="title">省市区选择器示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker @change="onAreaChange" />
				</view>
			</view>
			<view class="result" v-if="basicResult">
				<view class="result-item">选择结果: {{ basicResult.address }}</view>
				<view class="result-item">地区码: {{ basicResult.code }}</view>
			</view>
		</view>
		
		<!-- 设置默认值 -->
		<view class="section">
			<view class="section-title">设置默认值</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker :code="defaultAreaCode" @change="onDefaultAreaChange" />
				</view>
			</view>
			<view class="result" v-if="defaultResult">
				<view class="result-item">选择结果: {{ defaultResult.address }}</view>
				<view class="result-item">地区码: {{ defaultResult.code }}</view>
			</view>
			<button class="btn" @click="resetDefaultArea">重置为浙江省杭州市上城区</button>
		</view>
		
		<!-- 自定义样式 -->
		<view class="section">
			<view class="section-title">自定义样式</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						:code="customAreaCode"
						size="32rpx"
						color="#999999"
						activeColor="#007aff"
						placeholder="点击选择地区"
						@change="onCustomAreaChange"
					/>
				</view>
			</view>
		</view>
		
		<!-- 自定义显示项 -->
		<view class="section">
			<view class="section-title">自定义显示项</view>
			
			<view class="form-item">
				<view class="label">仅省市:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						:showDistrict="false"
						@change="onProCityChange"
					/>
				</view>
			</view>
			<view class="result" v-if="proCityResult">
				<view class="result-item">选择结果: {{ proCityResult.province + proCityResult.city }}</view>
			</view>
			
			<view class="form-item">
				<view class="label">仅省份:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						:showCity="false"
						:showDistrict="false"
						@change="onProvinceChange"
					/>
				</view>
			</view>
			<view class="result" v-if="provinceResult">
				<view class="result-item">选择结果: {{ provinceResult.province }}</view>
			</view>
		</view>
		
		<!-- 禁用状态 -->
		<view class="section">
			<view class="section-title">禁用状态</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						:disabled="true"
						:code="330102"
					/>
				</view>
			</view>
		</view>
		
		<!-- 默认选择第一项 -->
		<view class="section">
			<view class="section-title">默认选择第一项</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						:defaultFirst="true"
						@change="onFirstItemChange"
					/>
				</view>
			</view>
			<view class="result" v-if="firstItemResult">
				<view class="result-item">选择结果: {{ firstItemResult.address }}</view>
			</view>
		</view>
		
		<!-- 事件监听 -->
		<view class="section">
			<view class="section-title">事件监听</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker
						@change="onEventChange"
						@select="onEventSelect"
						@cancel="onEventCancel"
						@error="onEventError"
					/>
				</view>
			</view>
			<view class="logs">
				<view class="log-title">事件日志:</view>
				<scroll-view scroll-y class="log-content">
					<view class="log-item" v-for="(log, index) in eventLogs" :key="index">
						{{ log }}
					</view>
				</scroll-view>
				<button class="btn btn-small" @click="clearLogs">清空日志</button>
			</view>
		</view>
		
		<!-- 方法调用 -->
		<view class="section">
			<view class="section-title">方法调用</view>
			<view class="form-item">
				<view class="label">所在地区:</view>
				<view class="picker-wrapper">
					<zx-area-picker ref="areaPicker" @change="onMethodAreaChange" />
				</view>
			</view>
			<view class="btn-group">
				<button class="btn btn-small" @click="reloadAreaData">重新加载数据</button>
				<button class="btn btn-small" @click="getAreaInfo">获取地区信息</button>
				<button class="btn btn-small" @click="updateArea">更新为广州市</button>
			</view>
			<view class="result" v-if="methodResult">
				<view class="result-item">{{ methodResult }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import ZxAreaPicker from '@/components/zx-area-picker/zx-area-picker.vue';

// 基础用法
const basicResult = ref(null);
const onAreaChange = (e) => {
	basicResult.value = e;
	console.log('基础用法选择结果:', e);
};

// 设置默认值
const defaultAreaCode = ref(330102); // 浙江省杭州市上城区
const defaultResult = ref(null);
const onDefaultAreaChange = (e) => {
	defaultResult.value = e;
	console.log('默认值选择结果:', e);
};
const resetDefaultArea = () => {
	defaultAreaCode.value = 330102;
};

// 自定义样式
const customAreaCode = ref(440100); // 广东省广州市
const onCustomAreaChange = (e) => {
	console.log('自定义样式选择结果:', e);
};

// 仅省市
const proCityResult = ref(null);
const onProCityChange = (e) => {
	proCityResult.value = e;
};

// 仅省份
const provinceResult = ref(null);
const onProvinceChange = (e) => {
	provinceResult.value = e;
};

// 默认选择第一项
const firstItemResult = ref(null);
const onFirstItemChange = (e) => {
	firstItemResult.value = e;
};

// 事件监听
const eventLogs = ref([]);
const onEventChange = (e) => {
	eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] change事件: 地区码 ${e.code}, 地址 ${e.address}`);
};
const onEventSelect = (e) => {
	eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] select事件: 地区码 ${e.code}, 地址 ${e.address}`);
};
const onEventCancel = (e) => {
	eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] cancel事件: 取消选择`);
};
const onEventError = (errMsg) => {
	eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] error事件: ${errMsg}`);
};
const clearLogs = () => {
	eventLogs.value = [];
};

// 方法调用
const areaPicker = ref(null);
const methodResult = ref('');
const onMethodAreaChange = (e) => {
	methodResult.value = `选择结果: ${e.address}, 地区码: ${e.code}`;
};
const reloadAreaData = () => {
	if (areaPicker.value) {
		areaPicker.value.reload();
		methodResult.value = '正在重新加载数据...';
	}
};
const getAreaInfo = () => {
	if (areaPicker.value) {
		const areaInfo = areaPicker.value.getAddressInfo(440106); // 广东省广州市天河区
		methodResult.value = `地区信息: ${areaInfo.province}${areaInfo.city}${areaInfo.district}, 地区码: 440106`;
	}
};
const updateArea = () => {
	if (areaPicker.value) {
		areaPicker.value?.updateAreaByCode(440100); // 广东省广州市
		methodResult.value = '已更新为广州市';
	}
};
</script>

<style>
.container {
	padding: 20rpx;
}
.title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	padding: 20rpx 0;
	color: #333;
}
.section {
	margin-bottom: 40rpx;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}
.section-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	padding-bottom: 10rpx;
	border-bottom: 1px solid #f5f5f5;
	color: #333;
}
.form-item {
	display: flex;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #eee;
}
.label {
	width: 180rpx;
	font-size: 28rpx;
	color: #333;
}
.picker-wrapper {
	flex: 1;
}
.result {
	margin-top: 10rpx;
	background-color: #f8f8f8;
	padding: 10rpx;
	border-radius: 8rpx;
}
.result-item {
	font-size: 26rpx;
	color: #666;
	line-height: 1.6;
}
.btn {
	margin-top: 20rpx;
	font-size: 28rpx;
	background-color: #007aff;
	color: #fff;
}
.btn-small {
	margin: 10rpx;
	padding: 0 20rpx;
	height: 70rpx;
	line-height: 70rpx;
	font-size: 26rpx;
}
.btn-group {
	display: flex;
	flex-wrap: wrap;
	margin-top: 10rpx;
}
.logs {
	margin-top: 20rpx;
	background-color: #f8f8f8;
	padding: 10rpx;
	border-radius: 8rpx;
}
.log-title {
	font-size: 26rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}
.log-content {
	height: 300rpx;
	padding: 10rpx;
	background-color: #fff;
	border: 1rpx solid #eee;
	border-radius: 4rpx;
}
.log-item {
	font-size: 24rpx;
	color: #666;
	border-bottom: 1rpx dashed #eee;
	padding: 10rpx 0;
}
</style>
