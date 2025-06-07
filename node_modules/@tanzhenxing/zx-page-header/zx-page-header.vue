<template>
	<view class="zx-page-header" :class="[`zx-page-header--${size}`]">
		<!-- 面包屑导航区域 -->
		<view v-if="$slots.breadcrumb" class="zx-page-header__breadcrumb">
			<slot name="breadcrumb"></slot>
		</view>
		
		<!-- 标题区域 -->
		<view class="zx-page-header__header">
			<!-- 返回按钮/图标 -->
			<view v-if="icon !== ''" class="zx-page-header__back" @click="handleBack">
				<slot name="icon">
					<zx-icon v-if="icon" :name="icon" size="36rpx" color="#606266"></zx-icon>
					<zx-icon v-else name="arrow-left" size="36rpx" color="#606266"></zx-icon>
				</slot>
				<text v-if="title" class="zx-page-header__title">{{ title }}</text>
			</view>
			
			<!-- 内容区域 -->
			<view class="zx-page-header__content">
				<template v-if="$slots.content">
					<slot name="content"></slot>
				</template>
				<template v-else-if="content">
					<text>{{ content }}</text>
				</template>
			</view>
			
			<!-- 额外操作区域 -->
			<view v-if="$slots.extra" class="zx-page-header__extra">
				<slot name="extra"></slot>
			</view>
		</view>
		
		<!-- 主体内容区域 -->
		<view v-if="$slots.default" class="zx-page-header__main">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
/**
 * PageHeader 页头
 * @description 如果页面的路径比较简单，推荐使用页头组件而非面包屑组件
 * @property {String|Component} icon - 页头的图标，可以是图标名称或组件（默认为 'arrow-left'）
 * @property {String} title - 页头的主标题（默认为 '返回'）
 * @property {String} content - 页头的内容
 * @property {String} size - 页头尺寸：large、default、small（默认为 'default'）
 * @event {Function} back - 点击左侧区域触发
 * @slot icon - 图标内容
 * @slot title - 标题内容
 * @slot content - 内容
 * @slot extra - 扩展设置
 * @slot breadcrumb - 面包屑导航内容
 * @slot default - 默认内容
 * @example <zx-page-header @back="goBack"><template #content><text>标题</text></template></zx-page-header>
 */
import { computed } from 'vue';

const emit = defineEmits(['back']);

const props = defineProps({
	// 图标
	icon: {
		type: String,
		default: 'arrow-left'
	},
	// 标题
	title: {
		type: String,
		default: '返回'
	},
	// 内容
	content: {
		type: String,
		default: ''
	},
	// 尺寸
	size: {
		type: String,
		default: 'default',
		validator: (value) => ['large', 'default', 'small'].includes(value)
	}
});

// 返回事件处理
const handleBack = () => {
	emit('back');
};
</script>

<style lang="scss" scoped>
.zx-page-header {
	padding: 24rpx;
	background-color: #fff;
	
	&__breadcrumb {
		margin-bottom: 16rpx;
	}
	
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	&__back {
		display: flex;
		align-items: center;
		cursor: pointer;
		
		&:active {
			opacity: 0.8;
		}
	}
	
	&__title {
		margin-left: 8rpx;
		font-size: 28rpx;
		color: #606266;
	}
	
	&__content {
		flex: 1;
		display: flex;
		align-items: center;
		margin: 0 20rpx;
		min-width: 0;
		font-size: 32rpx;
		font-weight: bold;
		color: #303133;
	}
	
	&__extra {
		display: flex;
		align-items: center;
	}
	
	&__main {
		margin-top: 24rpx;
	}
	
	&--small {
		.zx-page-header__title {
			font-size: 24rpx;
		}
		
		.zx-page-header__content {
			font-size: 28rpx;
		}
	}
	
	&--default {
		.zx-page-header__title {
			font-size: 28rpx;
		}
		
		.zx-page-header__content {
			font-size: 32rpx;
		}
	}
	
	&--large {
		.zx-page-header__title {
			font-size: 32rpx;
		}
		
		.zx-page-header__content {
			font-size: 36rpx;
		}
	}
}
</style>
