<template>
	<view class="zx-fav" :class="[circle ? 'zx-fav--circle' : '', disabled ? 'zx-fav--disabled' : '']"
		:style="[{ backgroundColor: checked ? bgColorChecked : bgColor }]" @click="!disabled && onClick()">
		<!-- #ifdef MP-ALIPAY -->
		<view v-if="star && !checked" class="zx-fav__star">
			<zx-icon :color="fgColor" :style="{ color: checked ? fgColorChecked : fgColor }" :size="iconSize"
				:name="iconName"></zx-icon>
		</view>
		<!-- #endif -->

		<!-- #ifndef MP-ALIPAY -->
		<zx-icon v-if="star && !checked" :color="fgColor" :style="{ color: checked ? fgColorChecked : fgColor }"
			class="zx-fav__star" :size="iconSize" :name="iconName"></zx-icon>
		<!-- #endif -->

		<text :style="{ color: checked ? fgColorChecked : fgColor }" class="zx-fav__text">
			{{ checked ? contentText.contentFav || '已收藏' : contentText.contentDefault || '收藏' }}
		</text>
	</view>
</template>

<script setup>
/**
 * Fav 收藏按钮
 * @description 用于收藏功能，可点击切换选中、不选中的状态
 * @tutorial
 * @property {Boolean}     star             按钮是否带星星图标，默认为true
 * @property {String}      bgColor          未收藏时的背景色，默认为#eeeeee
 * @property {String}      bgColorChecked   已收藏时的背景色，默认为#007aff
 * @property {String}      fgColor          未收藏时的文字颜色，默认为#666666
 * @property {String}      fgColorChecked   已收藏时的文字颜色，默认为#FFFFFF
 * @property {Boolean}     circle           是否为圆角，默认为false
 * @property {Boolean}     checked          是否为已收藏，默认为false
 * @property {Boolean}     disabled         是否禁用按钮，默认为false
 * @property {Object}      contentText      收藏按钮文字，{contentDefault: '收藏', contentFav: '已收藏'}
 * @property {String}      iconName         自定义图标名称，默认为star-fill
 * @property {String}      iconSize         图标大小，默认为14
 * @property {String}      width            按钮宽度，默认为80px
 * @event {Function}       click            点击 fav按钮触发事件
 * @example                <zx-fav :checked="true"></zx-fav>
 */
import { computed } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

// 定义组件属性
const props = defineProps({
	star: {
		type: [Boolean, String],
		default: true
	},
	bgColor: {
		type: String,
		default: '#eeeeee'
	},
	fgColor: {
		type: String,
		default: '#666666'
	},
	bgColorChecked: {
		type: String,
		default: '#007aff'
	},
	fgColorChecked: {
		type: String,
		default: '#FFFFFF'
	},
	circle: {
		type: [Boolean, String],
		default: false
	},
	checked: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	contentText: {
		type: Object,
		default: () => ({
			contentDefault: '',
			contentFav: ''
		})
	},
	iconName: {
		type: String,
		default: 'star-fill'
	},
	iconSize: {
		type: [Number, String],
		default: 14
	},
	width: {
		type: String,
		default: '80px'
	}
});

// 定义组件事件
const emit = defineEmits(['click']);

// 点击事件处理函数
const onClick = () => {
	emit('click');
};
</script>

<style lang="scss" scoped>
$fav-height: 25px;

.zx-fav {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: v-bind(width);
	height: $fav-height;
	line-height: $fav-height;
	text-align: center;
	border-radius: 3px;
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
	transition: all 0.2s ease;

	&--circle {
		border-radius: 30px;
	}

	&--disabled {
		opacity: 0.6;
		/* #ifdef H5 */
		cursor: not-allowed;
		/* #endif */
	}

	&__star {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: 24px;
		margin-right: 3px;
		align-items: center;
		justify-content: center;
	}

	&__text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: $fav-height;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
