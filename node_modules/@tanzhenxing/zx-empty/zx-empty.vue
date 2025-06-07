<template>
	<view v-if="show" class="zx-empty" :style="[emptyStyle]">
		<view class="zx-empty-image">
			<slot name="image">
				<image :src="isImage?icon:iconUrl[icon]" mode="widthFix" :style="{ width: emptyWidth, height: emptyHeight }"></image>
			</slot>
		</view>
		<view class="zx-empty-description">
			<slot name="description">
				<zx-text :text="text" :color="textColor" :size="formattedTextSize"></zx-text>
			</slot>
		</view>
		<view class="zx-empty-bottom" v-if="$slots.default || $slots.$default">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
/**
 * empty 内容为空
 * @description 该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景
 * @tutorial https://zxui.org/components/empty
 * @property {Boolean}			show		是否显示组件
 * @property {String}			icon		内置图标名称，或图片路径
 * @property {String}			text		提示文字
 * @property {String}			textColor	文字颜色
 * @property {String | Number}	textSize	文字大小
 * @property {String}			iconColor	图标的颜色
 * @property {String | Number}	iconSize	图标的大小
 * @property {String | Number}	width		图标宽度
 * @property {String | Number}	height		图标高度
 * @property {String | Number}	marginTop	组件距离上一个元素之间的距离
 * @property {String | Number}	imageSize	图片尺寸，会同时设置宽度和高度
 * @slot {default}				-			底部内容插槽
 * @slot {image}				-			自定义图片插槽
 * @slot {description}			-			自定义描述插槽
 * @example <zx-empty text="无数据" icon="data"></zx-empty>
 */

import { ref, computed, watchEffect } from 'vue';

const props = defineProps({
	// 是否显示组件
	show: {
		type: Boolean,
		default: true
	},
	// 组件距离上一个元素之间的距离，默认rpx单位
	marginTop: {
		type: String,
		default: '10rpx'
	},
	// 内置图标名称，或图片路径，建议绝对路径
	icon: {
		type: String,
		default: 'data'
	},
	// 提示文字
	text: {
		type: String,
		default: '数据为空'
	},
	// 文字颜色
	textColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 文字大小
	textSize: {
		type: [String, Number],
		default: '32rpx'
	},
	// 图标的颜色
	iconColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 图标的大小
	iconSize: {
		type: String,
		default: '180rpx'
	},
	// 图片尺寸，会同时设置宽度和高度
	imageSize: {
		type: [String, Number],
		default: ''
	},
	//  图标宽度，单位px
	width: {
		type: [String, Number],
		default: '320rpx'
	},
	// 图标高度，单位px
	height: {
		type: [String, Number],
		default: '320rpx'
	}
});

// 默认图标
const iconUrl = ref({
	address: 'https://files.wufu-app.com/images/empty/address.png',
	auth: 'https://files.wufu-app.com/images/empty/auth.png',
	cart: 'https://files.wufu-app.com/images/empty/cart.png',
	collection: 'https://files.wufu-app.com/images/empty/collection.png',
	comment: 'https://files.wufu-app.com/images/empty/comment.png',
	coupon: 'https://files.wufu-app.com/images/empty/coupon.png',
	data: 'https://files.wufu-app.com/images/empty/data.png',
	message: 'https://files.wufu-app.com/images/empty/message.png',
	message_list: 'https://files.wufu-app.com/images/empty/message_list.png',
	news: 'https://files.wufu-app.com/images/empty/news.png',
	orders: 'https://files.wufu-app.com/images/empty/orders.png',
	page: 'https://files.wufu-app.com/images/empty/page.png',
	record: 'https://files.wufu-app.com/images/empty/record.png',
	search: 'https://files.wufu-app.com/images/empty/search.png',
	wifi: 'https://files.wufu-app.com/images/empty/wifi.png'
});

// 空状态的宽度和高度
const emptyWidth = ref(props.width);
const emptyHeight = ref(props.height);

// 处理textSize参数，确保是字符串类型
const formattedTextSize = computed(() => {
	if (typeof props.textSize === 'number') {
		return props.textSize + 'rpx';
	}
	return props.textSize;
});

// 组件样式
const emptyStyle = computed(() => {
	const style = {};
	style.marginTop = props.marginTop;
	return style;
});

// 判断icon是否图片路径
const isImage = computed(() => {
	return props.icon.indexOf('/') >= 0;
});

// 监听imageSize变化，同时修改width和height
watchEffect(() => {
	if (props.imageSize) {
		let size = props.imageSize;
		// 如果是数字，添加rpx单位
		if (!isNaN(size)) {
			size = `${size}rpx`;
		}
		emptyWidth.value = size;
		emptyHeight.value = size;
	}
});

// 导出属性供其他组件使用
defineExpose({
	iconUrl
});
</script>

<style lang="scss" scoped>
.zx-empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 40rpx 0;
	box-sizing: border-box;
	
	&-image {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	&-description {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	&-bottom {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20rpx;
	}
}
</style>
