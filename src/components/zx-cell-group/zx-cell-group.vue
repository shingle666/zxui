<template>
	<view class="zx-cell-group" :style="[customStyle]">
		<view v-if="title" class="zx-cell-group__title">
			<slot name="title">
				<text class="zx-cell-group__title__text">{{ title }}</text>
			</slot>
		</view>
		<view class="zx-cell-group__wrapper" :class="{ 'zx-cell-group--border': border }">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
/**
 * cellGroup  单元格组
 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
 * @tutorial https://zxui.org/components/cellGroup
 *
 * @property {String} title 分组标题
 * @property {Boolean} border 是否显示外边框 (默认 true )
 * @property {Object} customStyle 定义需要用到的外部样式
 *
 * @example <zx-cell-group title="设置喜好"></zx-cell-group>
 */

const props = defineProps({
	// 分组标题
	title: {
		type: String,
		default: ''
	},
	// 是否显示外边框
	border: {
		type: Boolean,
		default: true
	},
  customStyle: {
		type: [Object, String],
		default: () => ({})
	}
});

</script>

<style lang="scss" scoped>
$zx-main-color: #333;
$zx-cell-group-title-padding: 16px 16px 8px !default;
$zx-cell-group-title-font-size: 15px !default;
$zx-cell-group-title-line-height: 16px !default;
$zx-cell-group-title-color: $zx-main-color !default;
$zx-cell-group-border-color: #e5e5e5 !default; // 新增边框颜色变量

.zx-cell-group {
	flex: 1;

	&__title {
		padding: $zx-cell-group-title-padding;

		&__text {
			font-size: $zx-cell-group-title-font-size;
			line-height: $zx-cell-group-title-line-height;
			color: $zx-cell-group-title-color;
		}
	}

	&__wrapper {
		position: relative;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
  
  // 新增边框样式
  &--border {
    &::before {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      left: 0;
      top: 0;
      border-top: 1px solid $zx-cell-group-border-color;
      /* #ifdef APP-NVUE */
      // nvue中线条的实现方式略有不同
      border-top-width: 0.5px;
      /* #endif */
      transform: scaleY(0.5);
    }
    &::after {
      position: absolute;
      box-sizing: border-box;
      content: ' ';
      pointer-events: none;
      right: 0;
      left: 0;
      bottom: 0;
      border-bottom: 1px solid $zx-cell-group-border-color;
      /* #ifdef APP-NVUE */
      border-bottom-width: 0.5px;
      /* #endif */
      transform: scaleY(0.5);
    }
  }
}
</style>
