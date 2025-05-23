<template>
	<view class="demo-container">
		<view class="demo-section">
			<text class="demo-title">基础用法</text>
			<zx-carousel height="300rpx" :list="basicList">
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">指示器位置 - 外部</text>
			<zx-carousel 
				:list="basicList" 
				indicator-position="outside"
				height="300rpx"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">切换箭头 - 始终显示</text>
			<zx-carousel 
				:list="basicList" 
				arrow="always"
				:interval="5000"
				height="300rpx"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">卡片模式</text>
			<zx-carousel 
				:list="cardList" 
				type="card"
				height="200rpx"
				:interval="4000"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">垂直排列</text>
			<zx-carousel 
				:list="basicList" 
				direction="vertical"
				height="400rpx"
				:autoplay="false"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">动态模糊</text>
			<zx-carousel 
				:list="basicList" 
				:motion-blur="true"
				height="200rpx"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">点击触发指示器</text>
			<zx-carousel 
				:list="basicList" 
				trigger="click"
				height="300rpx"
			>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">自定义内容</text>
			<zx-carousel height="300rpx" @change="handleChange" @click="handleClick">
				<zx-carousel-item 
					v-for="(item, index) in customList" 
					:key="index"
					:name="`item-${index}`"
					:label="item.label"
				>
					<view class="custom-item" :style="`background: ${item.color}`">
						<text class="custom-title">{{ item.title }}</text>
						<text class="custom-desc">{{ item.desc }}</text>
					</view>
				</zx-carousel-item>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">混合内容</text>
			<zx-carousel 
				:list="mixedList" 
				height="300rpx"
				border-radius="20rpx"
				background-color="#f5f5f5"
			>
				<template #item="{ item, index }">
					<view v-if="item.type === 'image'" class="image-item">
						<image :src="item.src" mode="aspectFill" class="item-image" />
						<view class="image-overlay">
							<text class="image-title">{{ item.title }}</text>
						</view>
					</view>
					<view v-else-if="item.type === 'text'" class="text-item">
						<text class="text-content">{{ item.content }}</text>
					</view>
					<view v-else class="default-item">
						<text>{{ index + 1 }}</text>
					</view>
				</template>
			</zx-carousel>
		</view>

		<view class="demo-section">
			<text class="demo-title">控制按钮</text>
			<view class="control-buttons">
				<button @tap="prevSlide" size="mini" type="primary">上一张</button>
				<button @tap="nextSlide" size="mini" type="primary">下一张</button>
				<button @tap="goToSlide(2)" size="mini" type="primary">跳转到第3张</button>
			</view>
			<zx-carousel 
				ref="carouselRef"
				:list="basicList" 
				height="300rpx"
				:autoplay="false"
			>
			</zx-carousel>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 轮播引用
const carouselRef = ref(null);

// 基础数据
const basicList = reactive([
	'https://picsum.photos/400/300?random=1',
	'https://picsum.photos/400/300?random=2',
	'https://picsum.photos/400/300?random=3',
	'https://picsum.photos/400/300?random=4'
]);

// 卡片数据
const cardList = reactive([
	{
		src: 'https://picsum.photos/400/200?random=5',
		title: '卡片1'
	},
	{
		src: 'https://picsum.photos/400/200?random=6',
		title: '卡片2'
	},
	{
		src: 'https://picsum.photos/400/200?random=7',
		title: '卡片3'
	},
	{
		src: 'https://picsum.photos/400/200?random=8',
		title: '卡片4'
	},
	{
		src: 'https://picsum.photos/400/200?random=9',
		title: '卡片5'
	},
	{
		src: 'https://picsum.photos/400/200?random=10',
		title: '卡片6'
	}
]);

// 自定义内容数据
const customList = reactive([
	{
		title: '春天',
		desc: '万物复苏的季节',
		color: '#e8f5e8',
		label: '春'
	},
	{
		title: '夏天',
		desc: '热情似火的季节',
		color: '#fff2e8',
		label: '夏'
	},
	{
		title: '秋天',
		desc: '收获满满的季节',
		color: '#f5f2e8',
		label: '秋'
	},
	{
		title: '冬天',
		desc: '银装素裹的季节',
		color: '#e8f2f5',
		label: '冬'
	}
]);

// 混合内容数据
const mixedList = reactive([
	{
		type: 'image',
		src: 'https://picsum.photos/400/300?random=11',
		title: '美丽风景'
	},
	{
		type: 'text',
		content: '这是一段文本内容，展示了文本类型的轮播项。'
	},
	{
		type: 'image',
		src: 'https://picsum.photos/400/300?random=12',
		title: '城市夜景'
	},
	{
		type: 'custom',
		data: { message: '自定义内容' }
	}
]);

// 事件处理
const handleChange = (e) => {
	console.log('轮播切换:', e);
	uni.showToast({
		title: `切换到第${e.current + 1}张`,
		icon: 'none',
		duration: 1000
	});
};

const handleClick = (e) => {
	console.log('点击轮播项:', e);
	uni.showToast({
		title: `点击了第${e.index + 1}张`,
		icon: 'none',
		duration: 1000
	});
};

// 控制方法
const prevSlide = () => {
	carouselRef.value?.prev();
};

const nextSlide = () => {
	carouselRef.value?.next();
};

const goToSlide = (index) => {
	carouselRef.value?.setActiveItem(index);
};
</script>

<style lang="scss" scoped>
.demo-container {
	padding: 40rpx;
	background-color: #f8f9fa;
}

.demo-section {
	margin-bottom: 60rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 40rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 30rpx;
	padding-bottom: 20rpx;
	border-bottom: 2rpx solid #ebeef5;
}

.custom-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	border-radius: 12rpx;
	padding: 40rpx;
}

.custom-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #303133;
	margin-bottom: 16rpx;
}

.custom-desc {
	font-size: 28rpx;
	color: #606266;
	text-align: center;
	line-height: 1.6;
}

.image-item {
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 12rpx;
	overflow: hidden;
}

.item-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.image-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
	padding: 30rpx 20rpx 20rpx;
}

.image-title {
	color: #ffffff;
	font-size: 28rpx;
	font-weight: bold;
}

.text-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	border-radius: 12rpx;
	padding: 40rpx;
}

.text-content {
	color: #ffffff;
	font-size: 30rpx;
	text-align: center;
	line-height: 1.6;
}

.default-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
	border-radius: 12rpx;
	
	text {
		color: #ffffff;
		font-size: 48rpx;
		font-weight: bold;
	}
}

.control-buttons {
	display: flex;
	justify-content: space-around;
	margin-bottom: 30rpx;
	
	button {
		margin: 0 10rpx;
	}
}
</style> 