<template>
	<view class="zx-toolbar" v-if="show" :style="[customStyle]">
		<view class="zx-toolbar__left" hover-class="zx-hover" hover-stay-time="150">
			<slot name="left">
				<text
					class="zx-toolbar__left__text"
					@tap="cancel"
					:style="{
						color: cancelColor
					}"
				>
					{{ cancelText }}
				</text>
			</slot>
		</view>
		<view class="zx-toolbar__center">
			<slot name="center">
				<text class="zx-toolbar__title zx-line-1" v-if="title">{{ title }}</text>
			</slot>
		</view>
		<view class="zx-toolbar__right" hover-class="zx-hover" hover-stay-time="150">
			<slot name="right">
				<text
					class="zx-toolbar__right__text"
					@tap="confirm"
					:style="{
						color: confirmColor
					}"
				>
					{{ confirmText }}
				</text>
			</slot>
		</view>
	</view>
</template>

<script setup>
/**
 * Toolbar 工具条
 * @description 页面顶部或底部的工具操作条
 * @tutorial https://zxui.org/components/toolbar
 * @property {Boolean}	show			是否展示工具条（默认 true ）
 * @property {String}	cancelText		取消按钮的文字（默认 '取消' ）
 * @property {String}	confirmText		确认按钮的文字（默认 '确认' ）
 * @property {String}	cancelColor		取消按钮的颜色（默认 '#2b85e4' ）
 * @property {String}	confirmColor	确认按钮的颜色（默认 '#2b85e4' ）
 * @property {String}	title			标题文字
 * @property {Object}	customStyle		自定义样式
 * @property {String}	bgColor			背景颜色（默认 '#ffffff' ）
 * @event {Function}	cancel			点击取消按钮时触发
 * @event {Function}	confirm			点击确认按钮时触发
 * @slot left			自定义左侧内容
 * @slot center			自定义中间内容
 * @slot right			自定义右侧内容
 * @example
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 是否展示工具条
	show: {
		type: Boolean,
		default: true
	},
	// 取消按钮的文字
	cancelText: {
		type: String,
		default: '取消'
	},
	// 确认按钮的文字
	confirmText: {
		type: String,
		default: '确认'
	},
	// 取消按钮的颜色
	cancelColor: {
		type: String,
		default: '#2b85e4'
	},
	// 确认按钮的颜色
	confirmColor: {
		type: String,
		default: '#2b85e4'
	},
	// 标题文字
	title: {
		type: String,
		default: ''
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	},
	// 背景颜色
	bgColor: {
		type: String,
		default: '#ffffff'
	}
});

const emit = defineEmits(['cancel', 'confirm']);

// 点击取消按钮
const cancel = () => {
	emit('cancel');
};
// 点击确定按钮
const confirm = () => {
	emit('confirm');
};
</script>

<style lang="scss" scoped>
$zx-primary: #2979ff;
$zx-main-color: #303133;

.zx-toolbar {
	height: 44px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #ffffff;
	box-sizing: border-box;
	position: relative;
	padding: 0 4px;
	
	&__left, &__right {
		min-width: 80rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px;
		position: relative;
		z-index: 1;
		
		&__text {
			font-size: 15px;
			line-height: 1;
		}
	}
	
	&__center {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 100rpx;
		right: 100rpx;
		height: 100%;
		z-index: 0;
	}
	
	&__title {
		color: $zx-main-color;
		font-size: 16px;
		font-weight: 500;
		line-height: 1;
		text-align: center;
	}
}

// 悬停效果
.zx-hover {
	opacity: 0.7;
	transition: opacity 0.2s ease;
}

// 单行省略
.zx-line-1 {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
