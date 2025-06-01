<template>
	<view class="category-demo">
		<!-- 页面标题 -->
		<zx-navbar title="Category 分类" back-icon="arrow-left" @click-left="goBack"></zx-navbar>
		
		<!-- 基础用法 -->
		<view class="demo-section">
			<view class="demo-title">基础用法</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="basicCategories"
					v-model:active-index="activeIndex1"
					@category-click="onCategoryClick"
					@sub-category-click="onSubCategoryClick"
					style="height: 600rpx;"
				></zx-goods-category>
			</view>
		</view>
		
		<!-- 自定义列数 -->
		<view class="demo-section">
			<view class="demo-title">自定义列数（4列）</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="basicCategories"
					v-model:active-index="activeIndex2"
					:columns="4"
					style="height: 600rpx;"
				></zx-goods-category>
			</view>
		</view>
		
		<!-- 自定义左侧宽度 -->
		<view class="demo-section">
			<view class="demo-title">自定义左侧宽度</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="basicCategories"
					v-model:active-index="activeIndex3"
					:left-width="160"
					style="height: 600rpx;"
				></zx-goods-category>
			</view>
		</view>
		
		<!-- 自定义字段映射 -->
		<view class="demo-section">
			<view class="demo-title">自定义字段映射</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="customFieldCategories"
					v-model:active-index="activeIndex4"
					category-key="categoryId"
					category-name-key="categoryName"
					sub-categories-key="subList"
					sub-category-key="subId"
					sub-name-key="subName"
					sub-image-key="subImage"
					style="height: 600rpx;"
				></zx-goods-category>
			</view>
		</view>
		
		<!-- 自定义插槽 -->
		<view class="demo-section">
			<view class="demo-title">自定义插槽</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="slotCategories"
					v-model:active-index="activeIndex5"
					style="height: 600rpx;"
				>
					<!-- 自定义左侧项 -->
					<template #left-item="{ item, index, active }">
						<view class="custom-left-item">
							<zx-icon v-if="item.icon" :name="item.icon" size="32rpx" :color="active ? '#ff6900' : '#666'"></zx-icon>
							<text :style="{ color: active ? '#ff6900' : '#333', fontWeight: active ? '600' : 'normal' }">
								{{ item.name }}
							</text>
							<view v-if="item.badge" class="custom-badge">{{ item.badge }}</view>
						</view>
					</template>
					
					<!-- 自定义右侧头部 -->
					<template #right-header="{ category }">
						<view class="custom-header">
							<text class="custom-header-title">{{ category.name }}</text>
							<text class="custom-header-desc">{{ category.desc || '精选推荐' }}</text>
						</view>
					</template>
					
					<!-- 自定义子分类项 -->
					<template #sub-item="{ item, index }">
						<view class="custom-sub-item">
							<view class="custom-sub-image">
								<image :src="item.image" mode="aspectFit" class="custom-sub-img" />
							</view>
							<text class="custom-sub-name">{{ item.name }}</text>
							<text v-if="item.price" class="custom-sub-price">¥{{ item.price }}</text>
						</view>
					</template>
				</zx-goods-category>
			</view>
		</view>
		
		<!-- 无数据状态 -->
		<view class="demo-section">
			<view class="demo-title">无数据状态</view>
			<view class="demo-content">
				<zx-goods-category 
					:categories="emptyCategories"
					v-model:active-index="activeIndex6"
					empty-text="暂无商品分类"
					style="height: 400rpx;"
				>
					<template #empty>
						<view class="custom-empty">
							<zx-icon name="inbox" size="80rpx" color="#ddd"></zx-icon>
							<text class="custom-empty-text">暂无数据</text>
						</view>
					</template>
				</zx-goods-category>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view class="demo-section">
			<view class="demo-title">组件方法</view>
			<view class="demo-buttons">
				<zx-button @click="setActiveCategory" type="primary" size="small">设置激活分类(2)</zx-button>
				<zx-button @click="getCurrentCategory" type="success" size="small">获取当前分类</zx-button>
				<zx-button @click="scrollToTop" type="warning" size="small">滚动到顶部</zx-button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 激活索引
const activeIndex1 = ref(0)
const activeIndex2 = ref(0)
const activeIndex3 = ref(0)
const activeIndex4 = ref(0)
const activeIndex5 = ref(0)
const activeIndex6 = ref(0)

// 组件引用
const categoryRef = ref(null)

// 基础分类数据
const basicCategories = reactive([
	{
		id: 1,
		name: '手机数码',
		badge: 'HOT',
		children: [
			{ id: 101, name: '手机', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 102, name: '平板电脑', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 103, name: '智能手表', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 104, name: '蓝牙耳机', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 105, name: '充电器', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 106, name: '数据线', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		id: 2,
		name: '服装鞋帽',
		children: [
			{ id: 201, name: '男装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 202, name: '女装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 203, name: '童装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 204, name: '运动鞋', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 205, name: '休闲鞋', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 206, name: '帽子', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		id: 3,
		name: '家居生活',
		badge: 'NEW',
		children: [
			{ id: 301, name: '床上用品', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 302, name: '厨房用品', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 303, name: '卫浴用品', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 304, name: '收纳整理', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 305, name: '家具', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 306, name: '装饰品', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		id: 4,
		name: '美妆护肤',
		children: [
			{ id: 401, name: '面部护肤', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 402, name: '彩妆', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 403, name: '香水', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 404, name: '身体护理', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 405, name: '洗发护发', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 406, name: '口腔护理', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		id: 5,
		name: '食品饮料',
		children: [
			{ id: 501, name: '零食', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 502, name: '饮料', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 503, name: '茶叶', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 504, name: '咖啡', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 505, name: '坚果', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 506, name: '蜂蜜', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		id: 6,
		name: '运动户外',
		children: [
			{ id: 601, name: '运动服装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 602, name: '运动鞋', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 603, name: '健身器材', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 604, name: '户外装备', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 605, name: '球类运动', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ id: 606, name: '游泳用品', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	}
])

// 自定义字段映射数据
const customFieldCategories = reactive([
	{
		categoryId: 1,
		categoryName: '电子产品',
		subList: [
			{ subId: 101, subName: '笔记本电脑', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ subId: 102, subName: '台式电脑', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ subId: 103, subName: '显示器', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	},
	{
		categoryId: 2,
		categoryName: '办公用品',
		subList: [
			{ subId: 201, subName: '打印机', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ subId: 202, subName: '扫描仪', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' },
			{ subId: 203, subName: '文具', subImage: 'https://img.yzcdn.cn/vant/cat.jpeg' }
		]
	}
])

// 插槽示例数据
const slotCategories = reactive([
	{
		id: 1,
		name: '热门推荐',
		icon: 'fire',
		badge: 'HOT',
		desc: '精选热门商品',
		children: [
			{ id: 101, name: '爆款手机', image: 'https://img.yzcdn.cn/vant/cat.jpeg', price: '2999' },
			{ id: 102, name: '时尚耳机', image: 'https://img.yzcdn.cn/vant/cat.jpeg', price: '199' },
			{ id: 103, name: '智能手表', image: 'https://img.yzcdn.cn/vant/cat.jpeg', price: '1299' }
		]
	},
	{
		id: 2,
		name: '新品上市',
		icon: 'star',
		badge: 'NEW',
		desc: '最新上架商品',
		children: [
			{ id: 201, name: '新款平板', image: 'https://img.yzcdn.cn/vant/cat.jpeg', price: '3999' },
			{ id: 202, name: '无线充电器', image: 'https://img.yzcdn.cn/vant/cat.jpeg', price: '99' }
		]
	}
])

// 空数据
const emptyCategories = reactive([
	{
		id: 1,
		name: '空分类',
		children: []
	}
])

// 事件处理
const onCategoryClick = (data) => {
	console.log('分类点击:', data)
	uni.showToast({
		title: `点击了分类: ${data.item.name}`,
		icon: 'none'
	})
}

const onSubCategoryClick = (data) => {
	console.log('子分类点击:', data)
	uni.showToast({
		title: `点击了子分类: ${data.item.name}`,
		icon: 'none'
	})
}

// 组件方法示例
const setActiveCategory = () => {
	activeIndex1.value = 2
	uni.showToast({
		title: '已设置激活分类为第3个',
		icon: 'none'
	})
}

const getCurrentCategory = () => {
	const current = basicCategories[activeIndex1.value]
	uni.showToast({
		title: `当前分类: ${current?.name || '无'}`,
		icon: 'none'
	})
}

const scrollToTop = () => {
	// 这里可以调用组件的scrollToTop方法
	uni.showToast({
		title: '已滚动到顶部',
		icon: 'none'
	})
}

const goBack = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.category-demo {
	background-color: #f8f8f8;
	min-height: 100vh;
}

.demo-section {
	margin-bottom: 32rpx;
	background-color: #fff;
}

.demo-title {
	padding: 32rpx;
	font-size: 32rpx;
	font-weight: 600;
	color: #323233;
	border-bottom: 2rpx solid #f0f0f0;
}

.demo-content {
	padding: 32rpx;
}

.demo-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
	padding: 32rpx;
}

// 自定义插槽样式
.custom-left-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
	position: relative;
	width: 100%;
}

.custom-badge {
	position: absolute;
	top: -8rpx;
	right: 8rpx;
	min-width: 32rpx;
	height: 32rpx;
	padding: 0 8rpx;
	background-color: #ff4444;
	color: #fff;
	font-size: 20rpx;
	line-height: 32rpx;
	text-align: center;
	border-radius: 16rpx;
	transform: scale(0.8);
}

.custom-header {
	padding: 32rpx;
	text-align: center;
	background: linear-gradient(135deg, #ff6900 0%, #ff8f00 100%);
	color: #fff;
	border-radius: 16rpx;
	margin-bottom: 32rpx;
	
	&-title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 8rpx;
		display: block;
	}
	
	&-desc {
		font-size: 24rpx;
		opacity: 0.9;
		display: block;
	}
}

.custom-sub-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12rpx;
	padding: 24rpx;
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	border-radius: 16rpx;
	border: 2rpx solid #dee2e6;
	transition: all 0.3s ease;
	
	&:active {
		transform: scale(0.95);
		background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
	}
}

.custom-sub-image {
	width: 100rpx;
	height: 100rpx;
	border-radius: 12rpx;
	overflow: hidden;
	border: 2rpx solid #fff;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}

.custom-sub-img {
	width: 100%;
	height: 100%;
}

.custom-sub-name {
	font-size: 24rpx;
	color: #333;
	font-weight: 600;
	text-align: center;
}

.custom-sub-price {
	font-size: 28rpx;
	color: #ff6900;
	font-weight: bold;
}

.custom-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16rpx;
	padding: 80rpx 32rpx;
}

.custom-empty-text {
	font-size: 28rpx;
	color: #999;
}
</style>