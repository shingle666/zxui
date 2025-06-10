<template>
	<view :class="['zx-category', customClass]" :style="[customStyle]">
		<!-- 左侧分类列表 -->
		<scroll-view class="zx-category__left" scroll-y :scroll-with-animation="scrollWithAnimation"
			:show-scrollbar="showScrollbar" :style="{ width: leftWidth + 'rpx' }">
			<view v-for="(item, index) in categories" :key="item[categoryKey] || index" :class="[
				'zx-category__left-item',
				{ 'zx-category__left-item--active': activeIndex === index }
			]" @tap="handleCategoryClick(item, index)">
				<!-- 自定义左侧项内容 -->
				<slot name="left-item" :item="item" :index="index" :active="activeIndex === index">
					<view class="zx-category__left-text">{{ item[categoryNameKey] }}</view>
					<view v-if="item.badge" class="zx-category__left-badge">{{ item.badge }}</view>
				</slot>
			</view>
		</scroll-view>

		<!-- 右侧内容区域 -->
		<scroll-view class="zx-category__right" scroll-y :scroll-with-animation="scrollWithAnimation"
			:show-scrollbar="showScrollbar" :scroll-top="rightScrollTop" @scroll="handleRightScroll">
			<!-- 右侧头部插槽 -->
			<slot name="right-header" :category="currentCategory"></slot>

			<!-- 右侧内容 -->
			<view class="zx-category__right-content">
				<!-- 分类标题 -->
				<view v-if="showCategoryTitle && currentCategory" class="zx-category__right-title">
					{{ currentCategory[categoryNameKey] }}
				</view>

				<!-- 子分类网格 -->
				<view v-if="currentSubCategories.length > 0" class="zx-category__grid">
					<view v-for="(subItem, subIndex) in currentSubCategories" :key="subItem[subCategoryKey] || subIndex"
						:class="[
							'zx-category__grid-item',
							{ 'zx-category__grid-item--border': showBorder }
						]" :style="{ width: gridItemWidth }" @tap="handleSubCategoryClick(subItem, subIndex)">
						<!-- 自定义子分类项内容 -->
						<slot name="sub-item" :item="subItem" :index="subIndex" :category="currentCategory">
							<!-- 图片 -->
							<view v-if="subItem[subImageKey]" class="zx-category__grid-image">
								<image :src="subItem[subImageKey]" mode="aspectFit" class="zx-category__grid-img"
									@error="handleImageError" />
							</view>
							<!-- 文字 -->
							<view class="zx-category__grid-text">{{ subItem[subNameKey] }}</view>
							<!-- 徽标 -->
							<view v-if="subItem.badge" class="zx-category__grid-badge">{{ subItem.badge }}</view>
						</slot>
					</view>
				</view>

				<!-- 空状态 -->
				<view v-else-if="showEmpty" class="zx-category__empty">
					<slot name="empty">
						<view class="zx-category__empty-text">{{ emptyText }}</view>
					</slot>
				</view>
			</view>

			<!-- 右侧底部插槽 -->
			<slot name="right-footer" :category="currentCategory"></slot>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
	// 分类数据
	categories: {
		type: Array,
		default: () => []
	},

	// 当前激活的分类索引
	activeIndex: {
		type: [Number, String],
		default: 0
	},

	// 数据字段映射
	categoryKey: {
		type: String,
		default: 'id'
	},
	categoryNameKey: {
		type: String,
		default: 'name'
	},
	subCategoriesKey: {
		type: String,
		default: 'children'
	},
	subCategoryKey: {
		type: String,
		default: 'id'
	},
	subNameKey: {
		type: String,
		default: 'name'
	},
	subImageKey: {
		type: String,
		default: 'image'
	},

	// 布局配置
	leftWidth: {
		type: [Number, String],
		default: 200
	},
	columns: {
		type: [Number, String],
		default: 3
	},

	// 显示控制
	showCategoryTitle: {
		type: Boolean,
		default: true
	},
	showBorder: {
		type: Boolean,
		default: true
	},
	showEmpty: {
		type: Boolean,
		default: true
	},
	showScrollbar: {
		type: Boolean,
		default: false
	},

	// 滚动配置
	scrollWithAnimation: {
		type: Boolean,
		default: true
	},

	// 文本配置
	emptyText: {
		type: String,
		default: '暂无数据'
	},

	// 自定义样式
	customClass: {
		type: String,
		default: ''
	},
	customStyle: {
		type: Object,
		default: () => ({})
	}
})

const emit = defineEmits(['category-click', 'sub-category-click', 'update:activeIndex'])

// 当前激活索引
const currentActiveIndex = ref(Number(props.activeIndex) || 0)

// 右侧滚动位置
const rightScrollTop = ref(0)

// 监听外部activeIndex变化
watch(() => props.activeIndex, (newVal) => {
	currentActiveIndex.value = Number(newVal) || 0
}, { immediate: true })

// 当前分类
const currentCategory = computed(() => {
	return props.categories[currentActiveIndex.value] || {}
})

// 当前子分类列表
const currentSubCategories = computed(() => {
	const category = currentCategory.value
	return category[props.subCategoriesKey] || []
})

// 网格项宽度
const gridItemWidth = computed(() => {
	const columns = Number(props.columns) || 3
	return `${100 / columns}%`
})

// 分类点击事件
const handleCategoryClick = (item, index) => {
	currentActiveIndex.value = index
	rightScrollTop.value = 0

	// 触发事件
	emit('update:activeIndex', index)
	emit('category-click', {
		item,
		index,
		category: item
	})
}

// 子分类点击事件
const handleSubCategoryClick = (item, index) => {
	emit('sub-category-click', {
		item,
		index,
		category: currentCategory.value,
		categoryIndex: currentActiveIndex.value
	})
}

// 右侧滚动事件
const handleRightScroll = (e) => {
	// 可以在这里处理滚动相关逻辑
}

// 图片加载错误处理
const handleImageError = (e) => {
	console.warn('Category image load error:', e)
}

// 暴露方法
defineExpose({
	// 设置激活分类
	setActiveIndex: (index) => {
		currentActiveIndex.value = Number(index) || 0
		emit('update:activeIndex', currentActiveIndex.value)
	},

	// 获取当前分类
	getCurrentCategory: () => currentCategory.value,

	// 获取当前子分类
	getCurrentSubCategories: () => currentSubCategories.value,

	// 滚动到顶部
	scrollToTop: () => {
		rightScrollTop.value = 0
	}
})
</script>

<style lang="scss" scoped>
.zx-category {
	display: flex;
	height: 100%;
	background-color: #f8f8f8;

	&__left {
		background-color: #fff;
		border-right: 2rpx solid #f0f0f0;

		&-item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 32rpx 24rpx;
			min-height: 100rpx;
			background-color: #fff;
			border-bottom: 2rpx solid #f0f0f0;
			transition: all 0.3s ease;

			&:active {
				background-color: #f5f5f5;
			}

			&--active {
				background-color: #f8f8f8;
				border-right: 6rpx solid #ff6900;

				.zx-category__left-text {
					color: #ff6900;
					font-weight: 600;
				}
			}
		}

		&-text {
			flex: 1;
			font-size: 28rpx;
			color: #323233;
			text-align: center;
			line-height: 1.4;
			word-break: break-all;
			transition: color 0.3s ease;
		}

		&-badge {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
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
	}

	&__right {
		flex: 1;
		background-color: #fff;

		&-content {
			padding: 32rpx;
		}

		&-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #323233;
			margin-bottom: 32rpx;
			text-align: center;
		}
	}

	&__grid {
		display: flex;
		flex-wrap: wrap;
		margin: -16rpx;

		&-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 32rpx 16rpx;
			margin: 16rpx;
			background-color: #fff;
			border-radius: 12rpx;
			transition: all 0.3s ease;
			position: relative;
			box-sizing: border-box;

			&:active {
				transform: scale(0.95);
				background-color: #f5f5f5;
			}

			&--border {
				border: 2rpx solid #f0f0f0;
			}
		}

		&-image {
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 16rpx;
			border-radius: 8rpx;
			overflow: hidden;
		}

		&-img {
			width: 100%;
			height: 100%;
		}

		&-text {
			font-size: 24rpx;
			color: #323233;
			text-align: center;
			line-height: 1.4;
			word-break: break-all;
			max-width: 100%;
		}

		&-badge {
			position: absolute;
			top: 16rpx;
			right: 16rpx;
			min-width: 28rpx;
			height: 28rpx;
			padding: 0 6rpx;
			background-color: #ff4444;
			color: #fff;
			font-size: 18rpx;
			line-height: 28rpx;
			text-align: center;
			border-radius: 14rpx;
			transform: scale(0.8);
		}
	}

	&__empty {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 120rpx 32rpx;

		&-text {
			font-size: 28rpx;
			color: #969799;
		}
	}
}
</style>