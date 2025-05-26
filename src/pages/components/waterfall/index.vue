<template>
	<view class="waterfall-demo">
		<view class="header">
			<view class="title">瀑布流组件示例</view>
			<view class="tabs">
				<view 
					class="tab-item" 
					:class="{ active: activeTab === 1 }" 
					@click="switchTab(1)"
				>简单模式</view>
				<view 
					class="tab-item" 
					:class="{ active: activeTab === 2 }" 
					@click="switchTab(2)"
				>高度计算模式</view>
			</view>
		</view>
		
		<!-- 瀑布流组件 -->
		<zx-waterfall
			:listData="goodsList"
			:loading="loading"
			:finished="finished"
			:error="loadError"
			:type="activeTab"
			:delay="100"
			@retry="loadData"
			@change="onChange"
		>
			<template #left="{ entity, index }">
				<view class="goods-item">
					<image class="goods-image" :src="entity.image" mode="widthFix" @load="onImageLoad"></image>
					<view class="goods-content">
						<view class="goods-title">{{ entity.title }}</view>
						<view class="goods-price">¥{{ entity.price }}</view>
					</view>
				</view>
			</template>
			
			<template #right="{ entity, index }">
				<view class="goods-item">
					<image class="goods-image" :src="entity.image" mode="widthFix" @load="onImageLoad"></image>
					<view class="goods-content">
						<view class="goods-title">{{ entity.title }}</view>
						<view class="goods-price">¥{{ entity.price }}</view>
					</view>
				</view>
			</template>
			
			<template #loading>
				<view class="custom-loading">
					<text>加载中...</text>
				</view>
			</template>
			
			<template #finished>
				<view class="custom-finished">
					<text>没有更多数据了</text>
				</view>
			</template>
			
			<template #error>
				<view class="custom-error" @click="loadData">
					<text>加载失败，点击重试</text>
				</view>
			</template>
		</zx-waterfall>
		
		<!-- 顶部操作区 -->
		<view class="float-buttons">
			<button type="primary" size="mini" @click="refresh">刷新数据</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted  } from 'vue';
import { onLoad ,onReachBottom } from '@dcloudio/uni-app';

// 模拟商品数据
const mockGoods = [
	{
		id: 1,
		title: '2023新款时尚简约女士单肩包',
		price: 129.9,
		image: 'https://img.alicdn.com/imgextra/i4/2206686532409/O1CN01BgQMRd1TfMnEuoMKA_!!2206686532409-0-picasso.jpg'
	},
	{
		id: 2,
		title: '轻薄款羽绒服男士冬季保暖外套',
		price: 258.0,
		image: 'https://img.alicdn.com/imgextra/i3/2212780244239/O1CN01UiLV6r1YhisKpjSXI_!!0-item_pic.jpg'
	},
	{
		id: 3,
		title: '舒适棉质女士睡衣套装家居服',
		price: 89.9,
		image: 'https://img.alicdn.com/imgextra/i2/2214258415527/O1CN01TwoXtE1a1K0JKjIHL_!!2214258415527.jpg'
	},
	{
		id: 4,
		title: '智能手表运动健康监测多功能',
		price: 399.0,
		image: 'https://img.alicdn.com/imgextra/i1/2208012429663/O1CN01q1UzQ71KmCGCDvfhC_!!2208012429663-0-picasso.jpg'
	},
	{
		id: 5,
		title: '纯棉长袖T恤男士春秋打底衫',
		price: 79.0,
		image: 'https://img.alicdn.com/imgextra/i2/3655303985/O1CN01EPwN2q1c3YdUkMDBO_!!0-item_pic.jpg'
	},
	{
		id: 6,
		title: '超轻便携折叠雨伞晴雨两用',
		price: 49.9,
		image: 'https://img.alicdn.com/imgextra/i3/2214121250044/O1CN01HGPtGI1TNjCnqQdIa_!!2214121250044.jpg'
	},
	{
		id: 7,
		title: '无线蓝牙耳机入耳式降噪长续航',
		price: 129.0,
		image: 'https://img.alicdn.com/imgextra/i1/2200754440183/O1CN01ld9u1f1OFeYuuKQfJ_!!2200754440183-0-picasso.jpg'
	},
	{
		id: 8,
		title: '简约现代书桌学习桌办公桌',
		price: 299.0,
		image: 'https://img.alicdn.com/imgextra/i3/2214086002804/O1CN01cWCVSw1aCJWdZI7z9_!!2214086002804.jpg'
	},
	{
		id: 9,
		title: '多功能厨房置物架不锈钢收纳架',
		price: 89.0,
		image: 'https://img.alicdn.com/imgextra/i1/2209080485352/O1CN01jfkmMF1OJYtZLx11D_!!2209080485352-0-picasso.jpg'
	},
	{
		id: 10,
		title: '时尚休闲男士运动鞋轻便透气',
		price: 199.0,
		image: 'https://img.alicdn.com/imgextra/i1/2405947190/O1CN01ULmQ8V1d6cpxbEjlS_!!2405947190-0-picasso.jpg'
	}
];

// 随机生成不同高度图片的URL
const getRandomImage = (index) => {
	const height = 200 + Math.floor(Math.random() * 200); // 200-400的随机高度
	return `https://picsum.photos/400/${height}?random=${index}`;
};

// 数据状态
const goodsList = ref([]);
const loading = ref(false);
const finished = ref(false);
const loadError = ref(false);
const activeTab = ref(1);
const page = ref(1);

// 切换选项卡
const switchTab = (tabIndex) => {
	activeTab.value = tabIndex;
	refresh();
};

// 刷新数据
const refresh = () => {
	goodsList.value = [];
	page.value = 1;
	finished.value = false;
	loadError.value = false;
	loadData();
};

// 加载数据
const loadData = async () => {
	if (loading.value || finished.value) return;
	
	loading.value = true;
	
	try {
		// 模拟异步请求
		await new Promise(resolve => setTimeout(resolve, 1000));
		
		// 模拟获取数据
		const pageSize = 10;
		const newGoods = mockGoods.map((item, index) => {
			const newIndex = (page.value - 1) * pageSize + index;
			return {
				...item,
				id: newIndex + 1,
				title: `${item.title} - ${newIndex + 1}`,
				image: getRandomImage(newIndex),
				price: parseFloat((item.price + Math.random() * 100).toFixed(2))
			};
		});
		
		goodsList.value = [...goodsList.value, ...newGoods];
		
		// 模拟数据加载完成
		if (page.value >= 3) {
			finished.value = true;
		} else {
			page.value++;
		}
	} catch (error) {
		console.error(error);
		loadError.value = true;
	} finally {
		loading.value = false;
	}
};

// 图片加载完成
const onImageLoad = () => {
	// 可以在这里添加图片加载完成后的处理逻辑
};

// 数据变化回调
const onChange = (data) => {
	console.log('瀑布流数据变化:', data);
};

// 监听页面滚动到底部
onReachBottom(() => {
	loadData();
});

// 页面加载
onMounted(() => {
	loadData();
});
</script>

<style lang="scss">
.waterfall-demo {
	background-color: #f5f5f5;
	min-height: 100vh;
	
	.header {
		background-color: #ffffff;
		padding: 20rpx 30rpx;
		position: sticky;
		top: 0;
		z-index: 10;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
			text-align: center;
		}
		
		.tabs {
			display: flex;
			justify-content: center;
			border-bottom: 1px solid #eee;
			
			.tab-item {
				padding: 20rpx 30rpx;
				font-size: 28rpx;
				position: relative;
				
				&.active {
					color: #1989fa;
					
					&::after {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 40rpx;
						height: 4rpx;
						background-color: #1989fa;
						border-radius: 2rpx;
					}
				}
			}
		}
	}
	
	.goods-item {
		background-color: #ffffff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		
		.goods-image {
			width: 100%;
			height: auto;
		}
		
		.goods-content {
			padding: 16rpx;
			
			.goods-title {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 10rpx;
				line-height: 1.4;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}
			
			.goods-price {
				font-size: 32rpx;
				color: #ff4d4f;
				font-weight: bold;
			}
		}
	}
	
	.custom-loading,
	.custom-finished,
	.custom-error {
		text-align: center;
		padding: 30rpx 0;
		color: #969799;
		font-size: 28rpx;
	}
	
	.custom-error {
		color: #ff4d4f;
	}
	
	.float-buttons {
		position: fixed;
		right: 30rpx;
		bottom: 100rpx;
		z-index: 20;
	}
}
</style> 