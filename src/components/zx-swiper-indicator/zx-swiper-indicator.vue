<template>
	<view class="zx-swiper-indicator">
		<view
			class="zx-swiper-indicator__wrapper"
			v-if="indicatorMode === 'line'"
			:class="[`zx-swiper-indicator__wrapper--${indicatorMode}`]"
			:style="{
				width: lineWidth * length,
				backgroundColor: indicatorInactiveColor
			}"
		>
			<view class="zx-swiper-indicator__wrapper--line__bar" :style="[lineStyle]"></view>
		</view>
		<view class="zx-swiper-indicator__wrapper" v-if="indicatorMode === 'dot'">
			<view
				class="zx-swiper-indicator__wrapper__dot"
				v-for="(item, index) in length"
				:key="index"
				:class="[index === current && 'zx-swiper-indicator__wrapper__dot--active']"
				:style="[dotStyle(index)]"
			></view>
		</view>
	</view>
</template>

<script setup>
/**
 * SwiperIndicator 轮播图指示器
 * @description 该组件一般用于导航轮播，广告展示等场景,可开箱即用，
 * @tutorial https://zxui.org/components/swiper
 * @property {String | Number}	length					轮播的长度（默认 0 ）
 * @property {String | Number}	current					当前处于活动状态的轮播的索引（默认 0 ）
 * @property {String}			indicatorActiveColor	指示器非激活颜色
 * @property {String}			indicatorInactiveColor	指示器的激活颜色
 * @property {String}			indicatorMode			指示器模式（默认 'line' ）
 * @example	<zx-swiper :list="list4" indicator keyName="url" :autoplay="false"></zx-swiper>
 */
import { computed, ref } from 'vue';

// 定义组件名称
defineOptions({
	name: 'zx-swiper-indicator'
});

// 定义props
const props = defineProps({
	// 轮播的长度
	length: {
		type: [String, Number],
		default: 0
	},
	// 当前处于活动状态的轮播的索引
	current: {
		type: [String, Number],
		default: 0
	},
	// 指示器非激活颜色
	indicatorActiveColor: {
		type: String,
		default: '#FFFFFF'
	},
	// 指示器的激活颜色
	indicatorInactiveColor: {
		type: String,
		default: 'rgba(255, 255, 255, 0.35)'
	},
	// 指示器模式，line-线型，dot-点型
	indicatorMode: {
		type: String,
		default: 'line'
	}
});

// 数据
const lineWidth = ref(22);

// 计算属性
// 指示器为线型的样式
const lineStyle = computed(() => {
	const style = {};
	style.width = lineWidth.value;
	style.transform = `translateX(${props.current * lineWidth.value})`;
	style.backgroundColor = props.indicatorActiveColor;
	return style;
});

// 指示器为点型的样式
const dotStyle = (index) => {
	const style = {};
	style.backgroundColor = index === props.current ? props.indicatorActiveColor : props.indicatorInactiveColor;
	return style;
};
</script>

<style lang="scss" scoped>
.zx-swiper-indicator {
	&__wrapper {
		display: flex;

		&--line {
			border-radius: 100px;
			height: 4px;

			&__bar {
				width: 22px;
				height: 4px;
				border-radius: 100px;
				background-color: #ffffff;
				transition: transform 0.3s;
			}
		}

		&__dot {
			width: 5px;
			height: 5px;
			border-radius: 100px;
			margin: 0 4px;

			&--active {
				width: 12px;
			}
		}
	}
}
</style>
