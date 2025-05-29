<template>
	<view class="calendar-demo">
		<view class="title">zx-calendar 日历组件示例</view>
		
		<!-- 选项卡 -->
		<view class="tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index" 
				class="tab-item" 
				:class="{ active: currentTab === index }"
				@click="changeTab(index)"
			>
				{{ tab.title }}
			</view>
		</view>
		
		<!-- 示例内容 -->
		<view class="tab-content">
			<!-- 基础用法 -->
			<view v-if="currentTab === 0" class="demo-box">
				<view class="demo-title">基础用法</view>
				<view class="demo-desc">默认插入模式，选择单个日期</view>
				<zx-calendar 
					:insert="true"
					@change="dateChange"
				/>
				<view class="result-box" v-if="basicResult">
					<view class="result-title">选择结果：</view>
					<view class="result-item">日期：{{ basicResult.fulldate }}</view>
					<view class="result-item">年份：{{ basicResult.year }}</view>
					<view class="result-item">月份：{{ basicResult.month }}</view>
					<view class="result-item">日：{{ basicResult.date }}</view>
				</view>
			</view>
			
			<!-- 弹出模式 -->
			<view v-if="currentTab === 1" class="demo-box">
				<view class="demo-title">弹出模式</view>
				<view class="demo-desc">点击按钮打开日历，选择后点击确认</view>
				<button class="btn" @click="openCalendar">打开日历</button>
				<zx-calendar 
					ref="calendar"
					:insert="false"
					:clearDate="true"
					@confirm="confirm"
				/>
				<view class="result-box" v-if="popupResult">
					<view class="result-title">选择结果：</view>
					<view class="result-item">日期：{{ popupResult.fulldate }}</view>
				</view>
			</view>
			
			<!-- 范围选择 -->
			<view v-if="currentTab === 2" class="demo-box">
				<view class="demo-title">日期范围选择</view>
				<view class="demo-desc">开启range后可选择日期范围，可设置可选范围</view>
				<zx-calendar 
					:insert="true"
					:range="true"
					:start-date="'2023-01-01'"
					:end-date="'2023-12-31'"
					@change="rangeChange"
				/>
				<view class="result-box" v-if="rangeResult && rangeResult.range && rangeResult.range.data.length">
					<view class="result-title">选择结果：</view>
					<view class="result-item">开始日期：{{ rangeResult.range.before }}</view>
					<view class="result-item">结束日期：{{ rangeResult.range.after }}</view>
					<view class="result-item">共选择 {{ rangeResult.range.data.length }} 天</view>
				</view>
			</view>
			
			<!-- 自定义信息 -->
			<view v-if="currentTab === 3" class="demo-box">
				<view class="demo-title">自定义日期信息</view>
				<view class="demo-desc">可为特定日期添加标记和信息</view>
				<zx-calendar 
					:insert="true"
					:selected="selectedInfo"
				/>
				<view class="selected-info">
					<view class="result-title">已标记日期：</view>
					<view class="result-item" v-for="(item, index) in selectedInfo" :key="index">
						{{ item.date }}: {{ item.info }}
					</view>
				</view>
			</view>
			
			<!-- 农历模式 -->
			<view v-if="currentTab === 4" class="demo-box">
				<view class="demo-title">农历显示</view>
				<view class="demo-desc">开启lunar可显示农历信息</view>
				<zx-calendar 
					:insert="true"
					:lunar="true"
					@change="lunarChange"
				/>
				<view class="result-box" v-if="lunarResult">
					<view class="result-title">选择结果：</view>
					<view class="result-item">公历：{{ lunarResult.fulldate }}</view>
					<view class="result-item">农历：{{ lunarResult.lunar ? `${lunarResult.lunar.IMonthCn}${lunarResult.lunar.IDayCn}` : '' }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 选项卡数据
const tabs = [
	{ title: '基础用法' },
	{ title: '弹出模式' },
	{ title: '范围选择' },
	{ title: '自定义信息' },
	{ title: '农历显示' }
];

// 当前选项卡
const currentTab = ref(0);

// 日历弹窗引用
const calendar = ref(null);

// 各种结果
const basicResult = ref(null);
const popupResult = ref(null);
const rangeResult = ref(null);
const lunarResult = ref(null);

// 自定义日期信息
const selectedInfo = reactive([
	{
		date: new Date().toISOString().slice(0, 10), // 今日
		info: '今日'
	},
	{
		date: getDateString(1), // 明日
		info: '会议'
	},
	{
		date: getDateString(2), // 后天
		info: '出差'
	},
	{
		date: getDateString(7), // 一周后
		info: '休假'
	}
]);

// 获取指定天数后的日期字符串
function getDateString(days) {
	const date = new Date();
	date.setDate(date.getDate() + days);
	return date.toISOString().slice(0, 10);
}

// 切换选项卡
const changeTab = (index) => {
	currentTab.value = index;
};

// 打开日历弹窗
const openCalendar = () => {
	calendar.value.open();
};

// 基础用法回调
const dateChange = (e) => {
	basicResult.value = e;
	console.log('基础用法-日期变化:', e);
};

// 弹出模式回调
const confirm = (e) => {
	popupResult.value = e;
	console.log('弹出模式-确认选择:', e);
};

// 范围选择回调
const rangeChange = (e) => {
	rangeResult.value = e;
	console.log('范围选择-日期变化:', e);
};

// 农历模式回调
const lunarChange = (e) => {
	lunarResult.value = e;
	console.log('农历模式-日期变化:', e);
};
</script>

<style lang="scss" scoped>
.calendar-demo {
	padding: 20rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 30rpx;
	text-align: center;
}

.tabs {
	display: flex;
	border-bottom: 1px solid #ddd;
	margin-bottom: 20rpx;
	overflow-x: auto;
}

.tab-item {
	flex-shrink: 0;
	padding: 20rpx 30rpx;
	font-size: 28rpx;
	position: relative;
	
	&.active {
		color: #2979ff;
		
		&:after {
			content: '';
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 0;
			height: 4rpx;
			background-color: #2979ff;
		}
	}
}

.tab-content {
	margin-top: 20rpx;
}

.demo-box {
	background-color: #fff;
	border-radius: 10rpx;
	padding: 20rpx;
	margin-bottom: 20rpx;
}

.demo-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.demo-desc {
	font-size: 24rpx;
	color: #666;
	margin-bottom: 20rpx;
}

.btn {
	background-color: #2979ff;
	color: #fff;
	border-radius: 8rpx;
	font-size: 28rpx;
	margin: 20rpx 0;
}

.result-box, .selected-info {
	margin-top: 20rpx;
	border-top: 1px solid #eee;
	padding-top: 20rpx;
}

.result-title {
	font-size: 26rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.result-item {
	font-size: 26rpx;
	color: #333;
	margin-bottom: 5rpx;
}
</style>
