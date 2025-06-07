<template>
	<view 
		:class="[
			'zx-goods-card2', 
			customClass, 
			sizeClass, 
			layoutClass,
			{ 'zx-goods-card2--disabled': disabled }
		]"
		:style="[customStyle]"
		@tap="handleClick"
	>
		<!-- 商品图片区域 -->
		<view class="zx-goods-card2__image-wrapper">
			<slot name="image">
				<image 
					v-if="image" 
					:src="image" 
					:mode="imageMode"
					class="zx-goods-card2__image"
					:lazy-load="lazyLoad"
					@error="handleImageError"
					@load="handleImageLoad"
				/>
				<view v-else class="zx-goods-card2__image zx-goods-card2__image--placeholder">
					<text class="zx-goods-card2__placeholder-text">暂无图片</text>
				</view>
			</slot>
			
			<!-- 图片标签 -->
			<view 
				v-if="imageTag" 
				:class="[
					'zx-goods-card2__image-tag',
					`zx-goods-card2__image-tag--${imageTagPosition}`
				]"
				:style="{ backgroundColor: imageTagBgColor, color: imageTagColor }"
			>
				<slot name="imageTag">
					<text class="zx-goods-card2__image-tag-text">{{ imageTag }}</text>
				</slot>
			</view>
		</view>
		
		<!-- 商品信息区域 -->
		<view class="zx-goods-card2__content">
			<!-- 标题标签 -->
			<view v-if="titleTag" class="zx-goods-card2__title-tag" :style="{ backgroundColor: titleTagBgColor, color: titleTagColor }">
				<slot name="titleTag">
					<text class="zx-goods-card2__title-tag-text">{{ titleTag }}</text>
				</slot>
			</view>
			
			<!-- 商品标题 -->
			<view class="zx-goods-card2__title-wrapper">
				<slot name="title">
					<text 
						v-if="title" 
						:class="[
							'zx-goods-card2__title',
							titleLines === 1 ? 'zx-goods-card2__title--single' : 'zx-goods-card2__title--multiple'
						]"
						:style="{ '-webkit-line-clamp': titleLines, color: titleColor }"
					>
						{{ title }}
					</text>
				</slot>
			</view>
			
			<!-- 商品介绍 -->
			<view v-if="description || $slots.description" class="zx-goods-card2__description">
				<slot name="description">
					<text v-if="description" class="zx-goods-card2__description-text" :style="{ color: descriptionColor }">
						{{ description }}
					</text>
				</slot>
			</view>
			
			<!-- 商品标签列表 -->
			<view v-if="tags && tags.length > 0" class="zx-goods-card2__tags">
				<slot name="tags">
					<view 
						v-for="(tag, index) in tags" 
						:key="index" 
						class="zx-goods-card2__tag"
						:style="{ backgroundColor: tag.bgColor || tagBgColor, color: tag.color || tagColor }"
					>
						<text class="zx-goods-card2__tag-text">{{ tag.text || tag }}</text>
					</view>
				</slot>
			</view>
			
			<!-- 价格区域 -->
			<view v-if="showPrice" class="zx-goods-card2__price-wrapper">
				<slot name="price">
					<view class="zx-goods-card2__price">
						<text class="zx-goods-card2__price-symbol" :style="{ color: priceColor }">{{ currency }}</text>
						<text class="zx-goods-card2__price-integer" :style="{ color: priceColor }">{{ priceInteger }}</text>
						<text v-if="priceDecimal" class="zx-goods-card2__price-decimal" :style="{ color: priceColor }">.{{ priceDecimal }}</text>
					</view>
				</slot>
				
				<!-- 原价 -->
				<slot name="originPrice">
					<text v-if="originPrice" class="zx-goods-card2__origin-price" :style="{ color: originPriceColor }">
						{{ currency }}{{ originPrice }}
					</text>
				</slot>
				
				<!-- 价格后自定义内容 -->
				<slot name="priceAfter"></slot>
			</view>
			
			<!-- 店铺信息 -->
			<view v-if="shopName || $slots.shop" class="zx-goods-card2__shop" @tap.stop="handleShopClick">
				<slot name="shop">
					<view class="zx-goods-card2__shop-info">
						<text class="zx-goods-card2__shop-name" :style="{ color: shopNameColor }">{{ shopName }}</text>
						<text v-if="shopIcon" class="zx-goods-card2__shop-icon">{{ shopIcon }}</text>
					</view>
				</slot>
			</view>
			
			<!-- 底部自定义内容 -->
			<view v-if="$slots.bottom" class="zx-goods-card2__bottom">
				<slot name="bottom"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 定义组件属性
const props = defineProps({
	// 基础属性
	image: {
		type: String,
		default: ''
	},
	imageMode: {
		type: String,
		default: 'aspectFill'
	},
	lazyLoad: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		default: ''
	},
	titleLines: {
		type: [String, Number],
		default: 2
	},
	description: {
		type: String,
		default: ''
	},
	tags: {
		type: Array,
		default: () => []
	},
	
	// 价格相关
	price: {
		type: [String, Number],
		default: ''
	},
	originPrice: {
		type: [String, Number],
		default: ''
	},
	currency: {
		type: String,
		default: '¥'
	},
	showPrice: {
		type: Boolean,
		default: true
	},
	
	// 店铺信息
	shopName: {
		type: String,
		default: ''
	},
	shopIcon: {
		type: String,
		default: ''
	},
	
	// 标签相关
	imageTag: {
		type: String,
		default: ''
	},
	imageTagPosition: {
		type: String,
		default: 'top-left', // top-left, top-right, bottom-left, bottom-right
		validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value)
	},
	titleTag: {
		type: String,
		default: ''
	},
	
	// 布局相关
	layout: {
		type: String,
		default: 'vertical', // vertical, horizontal
		validator: (value) => ['vertical', 'horizontal'].includes(value)
	},
	size: {
		type: String,
		default: 'normal', // small, normal, large
		validator: (value) => ['small', 'normal', 'large'].includes(value)
	},
	
	// 状态
	disabled: {
		type: Boolean,
		default: false
	},
	
	// 自定义样式
	customClass: {
		type: String,
		default: ''
	},
	customStyle: {
		type: Object,
		default: () => ({})
	},
	
	// 颜色自定义
	titleColor: {
		type: String,
		default: '#333'
	},
	descriptionColor: {
		type: String,
		default: '#666'
	},
	priceColor: {
		type: String,
		default: '#ff6900'
	},
	originPriceColor: {
		type: String,
		default: '#999'
	},
	shopNameColor: {
		type: String,
		default: '#999'
	},
	tagColor: {
		type: String,
		default: '#fff'
	},
	tagBgColor: {
		type: String,
		default: '#ff6900'
	},
	imageTagColor: {
		type: String,
		default: '#fff'
	},
	imageTagBgColor: {
		type: String,
		default: '#ff6900'
	},
	titleTagColor: {
		type: String,
		default: '#fff'
	},
	titleTagBgColor: {
		type: String,
		default: '#ff6900'
	}
})

// 定义事件
const emit = defineEmits(['click', 'shopClick', 'imageError', 'imageLoad'])

// 计算样式类
const sizeClass = computed(() => `zx-goods-card2--${props.size}`)
const layoutClass = computed(() => `zx-goods-card2--${props.layout}`)

// 价格处理
const priceArray = computed(() => {
	if (!props.price) return []
	return String(props.price).split('.')
})

const priceInteger = computed(() => priceArray.value[0] || '')
const priceDecimal = computed(() => priceArray.value[1] || '')

// 事件处理
const handleClick = () => {
	if (props.disabled) return
	emit('click')
}

const handleShopClick = () => {
	if (props.disabled) return
	emit('shopClick')
}

const handleImageError = (e) => {
	emit('imageError', e)
}

const handleImageLoad = (e) => {
	emit('imageLoad', e)
}
</script>

<style lang="scss" scoped>
.zx-goods-card2 {
	position: relative;
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
	transition: all 0.3s;
	
	&:active {
		transform: scale(0.98);
	}
	
	&--disabled {
		opacity: 0.6;
		pointer-events: none;
	}
	
	// 垂直布局（默认）
	&--vertical {
		display: flex;
		flex-direction: column;
		
		.zx-goods-card2__image-wrapper {
			position: relative;
			width: 100%;
			padding-top: 100%; // 1:1 比例
		}
		
		.zx-goods-card2__image {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
		
		.zx-goods-card2__content {
			padding: 20rpx;
			flex: 1;
		}
	}
	
	// 水平布局
	&--horizontal {
		display: flex;
		flex-direction: row;
		
		.zx-goods-card2__image-wrapper {
			position: relative;
			width: 200rpx;
			height: 200rpx;
			flex-shrink: 0;
		}
		
		.zx-goods-card2__image {
			width: 100%;
			height: 100%;
		}
		
		.zx-goods-card2__content {
			padding: 20rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
	
	// 尺寸变体
	&--small {
		&.zx-goods-card2--vertical {
			.zx-goods-card2__content {
				padding: 16rpx;
			}
		}
		
		&.zx-goods-card2--horizontal {
			.zx-goods-card2__image-wrapper {
				width: 160rpx;
				height: 160rpx;
			}
			
			.zx-goods-card2__content {
				padding: 16rpx;
			}
		}
		
		.zx-goods-card2__title {
			font-size: 26rpx !important;
		}
		
		.zx-goods-card2__description-text {
			font-size: 22rpx !important;
		}
		
		.zx-goods-card2__price-integer {
			font-size: 32rpx !important;
		}
	}
	
	&--large {
		&.zx-goods-card2--vertical {
			.zx-goods-card2__content {
				padding: 24rpx;
			}
		}
		
		&.zx-goods-card2--horizontal {
			.zx-goods-card2__image-wrapper {
				width: 240rpx;
				height: 240rpx;
			}
			
			.zx-goods-card2__content {
				padding: 24rpx;
			}
		}
		
		.zx-goods-card2__title {
			font-size: 36rpx !important;
		}
		
		.zx-goods-card2__description-text {
			font-size: 28rpx !important;
		}
		
		.zx-goods-card2__price-integer {
			font-size: 44rpx !important;
		}
	}
	
	// 图片相关
	&__image {
		display: block;
		border-radius: 8rpx;
		
		&--placeholder {
			background: #f5f5f5;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	
	&__placeholder-text {
		font-size: 24rpx;
		color: #999;
	}
	
	&__image-tag {
		position: absolute;
		padding: 8rpx 12rpx;
		border-radius: 8rpx;
		font-size: 20rpx;
		font-weight: 500;
		line-height: 1;
		z-index: 2;
		
		&--top-left {
			top: 12rpx;
			left: 12rpx;
		}
		
		&--top-right {
			top: 12rpx;
			right: 12rpx;
		}
		
		&--bottom-left {
			bottom: 12rpx;
			left: 12rpx;
		}
		
		&--bottom-right {
			bottom: 12rpx;
			right: 12rpx;
		}
	}
	
	&__image-tag-text {
		font-size: 20rpx;
		font-weight: 500;
	}
	
	// 内容区域
	&__content {
		display: flex;
		flex-direction: column;
		gap: 12rpx;
	}
	
	&__title-tag {
		align-self: flex-start;
		padding: 4rpx 8rpx;
		border-radius: 4rpx;
		font-size: 18rpx;
		font-weight: 500;
		line-height: 1;
		margin-bottom: 8rpx;
	}
	
	&__title-tag-text {
		font-size: 18rpx;
		font-weight: 500;
	}
	
	&__title {
		font-size: 30rpx;
		font-weight: 500;
		line-height: 1.4;
		word-break: break-all;
		
		&--single {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		
		&--multiple {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	
	&__description-text {
		font-size: 24rpx;
		line-height: 1.4;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	&__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8rpx;
	}
	
	&__tag {
		padding: 4rpx 8rpx;
		border-radius: 4rpx;
		font-size: 20rpx;
		line-height: 1;
	}
	
	&__tag-text {
		font-size: 20rpx;
	}
	
	&__price-wrapper {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 12rpx;
	}
	
	&__price {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
	}
	
	&__price-symbol {
		font-size: 24rpx;
		font-weight: 500;
	}
	
	&__price-integer {
		font-size: 38rpx;
		font-weight: bold;
		line-height: 1;
	}
	
	&__price-decimal {
		font-size: 24rpx;
		font-weight: 500;
	}
	
	&__origin-price {
		font-size: 22rpx;
		text-decoration: line-through;
	}
	
	&__shop {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	&__shop-info {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	&__shop-name {
		font-size: 22rpx;
		line-height: 1.4;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		flex: 1;
	}
	
	&__shop-icon {
		font-size: 20rpx;
	}
	
	&__bottom {
		margin-top: auto;
	}
}
</style>