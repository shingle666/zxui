<template>
	<view class="zx-card" 
		:class="{ 
			'zx-card--full': isFull, 
			'zx-card--shadow': isShadow,
			'zx-card--border': border,
			'zx-card--clickable': clickable,
			[`zx-card--${mode}`]: mode
		}"
		:style="{
			'margin': isFull ? 0 : margin,
			'padding': spacing,
			'box-shadow': isShadow ? shadow : '',
			'border-radius': radius + 'rpx',
			'background-color': bgColor
		}"
		@click="onClick('card')"
		:hover-class="clickable ? 'zx-card--hover' : ''"
	>
		<!-- 封面 -->
		<slot name="cover">
			<view v-if="cover" class="zx-card__cover" :style="{'border-radius': coverRadius + 'rpx'}">
				<image class="zx-card__cover-image" 
					:mode="coverMode" 
					@click.stop="onClick('cover')" 
					:src="cover"
					:lazy-load="lazyLoad"
				></image>
			</view>
		</slot>
		<slot name="title">
			<view v-if="title || extra" class="zx-card__header">
				<!-- 卡片标题 -->
				<view class="zx-card__header-box" @click.stop="onClick('title')">
					<view v-if="thumbnail" class="zx-card__header-avatar" :style="{
						'border-radius': avatarCircle ? '50%' : '5px',
						'width': avatarSize + 'rpx',
						'height': avatarSize + 'rpx'
					}">
						<image class="zx-card__header-avatar-image" 
							:src="thumbnail" 
							:mode="avatarMode"
							:lazy-load="lazyLoad"
						/>
					</view>
					<view class="zx-card__header-content">
						<text class="zx-card__header-content-title zx-ellipsis" :style="{
							'font-size': titleSize + 'rpx',
							'font-weight': titleBold ? 'bold' : 'normal',
							'color': titleColor
						}">{{ title }}</text>
						<text v-if="title && subTitle"
							class="zx-card__header-content-subtitle zx-ellipsis"
							:style="{
								'font-size': subTitleSize + 'rpx',
								'color': subTitleColor
							}"
						>{{ subTitle }}</text>
					</view>
				</view>
				<view class="zx-card__header-extra" @click.stop="onClick('extra')">
					<slot name="extra">
						<text class="zx-card__header-extra-text" :style="{color: extraColor}">{{ extra }}</text>
					</slot>
				</view>
			</view>
		</slot>
		<!-- 卡片内容 -->
		<view class="zx-card__content" 
			:style="{
				padding: padding,
				'font-size': contentSize + 'rpx',
				'color': contentColor
			}" 
			@click.stop="onClick('content')"
		>
			<slot></slot>
		</view>
		<view v-if="$slots.actions" class="zx-card__actions" @click.stop="onClick('actions')">
			<slot name="actions"></slot>
		</view>
		<view v-if="$slots.footer" class="zx-card__footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script setup>
	/**
	 * Card 卡片
	 * @description 卡片视图组件，用于显示图文内容
	 * @tutorial 
	 * @property {String} title 标题文字
	 * @property {String} subTitle 副标题
	 * @property {String} titleColor 标题颜色
	 * @property {String} subTitleColor 副标题颜色
	 * @property {String} extraColor 额外信息颜色
	 * @property {String} contentColor 内容颜色
	 * @property {Number/String} titleSize 标题字体大小，单位rpx
	 * @property {Number/String} subTitleSize 副标题字体大小，单位rpx
	 * @property {Number/String} contentSize 内容字体大小，单位rpx
	 * @property {Boolean} titleBold 标题是否加粗
	 * @property {Number/String} padding 内容内边距
	 * @property {Number/String} margin 卡片外边距
	 * @property {Number/String} spacing 卡片内边距
	 * @property {String} extra 标题额外信息
	 * @property {String} cover 封面图（本地路径需要引入）
	 * @property {String} coverMode 封面图裁剪模式
	 * @property {Number/String} coverRadius 封面图圆角
	 * @property {String} thumbnail 标题左侧缩略图
	 * @property {String} avatarMode 头像裁剪模式
	 * @property {Number/String} avatarSize 头像大小，单位rpx
	 * @property {Boolean} avatarCircle 头像是否为圆形
	 * @property {Boolean} isFull 卡片内容是否通栏，为 true 时将去除padding值
	 * @property {Boolean} isShadow 卡片内容是否开启阴影
	 * @property {String} shadow 卡片阴影
	 * @property {Boolean} border 卡片边框
	 * @property {Number/String} radius 卡片圆角
	 * @property {String} bgColor 卡片背景色
	 * @property {String} mode 卡片模式，可选值：default/primary/success/warning/error/info
	 * @property {Boolean} clickable 卡片是否可点击
	 * @property {Boolean} lazyLoad 图片是否懒加载
	 * @event {Function} click 点击 Card 触发事件，返回点击区域
	 */

	// 定义组件名称
	defineOptions({
		name: 'zx-card'
	})

	// 定义事件
	const emit = defineEmits(['click'])

	// 定义 props
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		subTitle: {
			type: String,
			default: ''
		},
		titleColor: {
			type: String,
			default: '#3a3a3a'
		},
		subTitleColor: {
			type: String,
			default: '#909399'
		},
		extraColor: {
			type: String,
			default: '#909399'
		},
		contentColor: {
			type: String,
			default: '#6a6a6a'
		},
		titleSize: {
			type: [Number, String],
			default: 30
		},
		subTitleSize: {
			type: [Number, String],
			default: 24
		},
		contentSize: {
			type: [Number, String],
			default: 28
		},
		titleBold: {
			type: Boolean,
			default: false
		},
		padding: {
			type: String,
			default: '10rpx'
		},
		margin: {
			type: String,
			default: '15rpx'
		},
		spacing: {
			type: String,
			default: '0 10rpx'
		},
		extra: {
			type: String,
			default: ''
		},
		cover: {
			type: String,
			default: ''
		},
		coverMode: {
			type: String,
			default: 'widthFix'
		},
		coverRadius: {
			type: [Number, String],
			default: 4
		},
		thumbnail: {
			type: String,
			default: ''
		},
		avatarMode: {
			type: String,
			default: 'aspectFit'
		},
		avatarSize: {
			type: [Number, String],
			default: 80
		},
		avatarCircle: {
			type: Boolean,
			default: false
		},
		isFull: {
			// 内容区域是否通栏
			type: Boolean,
			default: false
		},
		isShadow: {
			// 是否开启阴影
			type: Boolean,
			default: true
		},
		shadow: {
			type: String,
			default: '0px 0px 6rpx 2rpx rgba(0, 0, 0, 0.08)'
		},
		border: {
			type: Boolean,
			default: true
		},
		radius: {
			type: [Number, String],
			default: 10
		},
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		mode: {
			type: String,
			default: 'default',
			validator: (value) => {
				return ['default', 'primary', 'success', 'warning', 'error', 'info'].includes(value)
			}
		},
		clickable: {
			type: Boolean,
			default: false
		},
		lazyLoad: {
			type: Boolean,
			default: true
		}
	})

	// 定义方法
	const onClick = (type) => {
		emit('click', type)
	}
</script>

<style lang="scss">
	$zx-border-3: #EBEEF5 !default;
	$zx-shadow-base:0 0px 6px 1px rgba($color: #a5a5a5, $alpha: 0.2) !default;
	$zx-main-color: #3a3a3a !default;
	$zx-base-color: #6a6a6a !default;
	$zx-secondary-color: #909399 !default;
	$zx-spacing-sm: 8px !default;
	$zx-border-color:$zx-border-3;
	$zx-shadow: $zx-shadow-base;
	$zx-card-title: 15px;
	$zx-cart-title-color:$zx-main-color;
	$zx-card-subtitle: 12px;
	$zx-cart-subtitle-color:$zx-secondary-color;
	$zx-card-spacing: 10px;
	$zx-card-content-color: $zx-base-color;
	
	// 主题颜色
	$zx-primary: #2979ff !default;
	$zx-success: #19be6b !default;
	$zx-warning: #ff9900 !default;
	$zx-error: #fa3534 !default;
	$zx-info: #909399 !default;

	.zx-card {
		margin: $zx-card-spacing;
		padding: 0 $zx-spacing-sm;
		border-radius: 10rpx;
		overflow: hidden;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
		background-color: #fff;
		flex: 1;
		position: relative;
		transition: all 0.3s ease;

		.zx-card__cover {
			position: relative;
			margin-top: $zx-card-spacing;
			flex-direction: row;
			overflow: hidden;
			border-radius: 4px;
			.zx-card__cover-image {
				flex: 1;
				width: 100%;
				/* #ifndef APP-PLUS */
				vertical-align: middle;
				/* #endif */
			}
		}

		.zx-card__header {
			display: flex;
			border-bottom: 1px $zx-border-color solid;
			flex-direction: row;
			align-items: center;
			padding: $zx-card-spacing;
			overflow: hidden;

			.zx-card__header-box {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex: 1;
				flex-direction: row;
				align-items: center;
				overflow: hidden;
			}

			.zx-card__header-avatar {
				width: 40px;
				height: 40px;
				overflow: hidden;
				border-radius: 5px;
				margin-right: $zx-card-spacing;
				.zx-card__header-avatar-image {
					flex: 1;
					width: 100%;
					height: 100%;
				}
			}

			.zx-card__header-content {
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: column;
				justify-content: center;
				flex: 1;
				overflow: hidden;

				.zx-card__header-content-title {
					font-size: $zx-card-title;
					color: $zx-cart-title-color;
				}

				.zx-card__header-content-subtitle {
					font-size: $zx-card-subtitle;
					margin-top: 5px;
					color: $zx-cart-subtitle-color;
				}
			}

			.zx-card__header-extra {
				line-height: 12px;

				.zx-card__header-extra-text {
					font-size: 12px;
					color: $zx-cart-subtitle-color;
				}
			}
		}

		.zx-card__content {
			padding: $zx-card-spacing;
			font-size: 14px;
			color: $zx-card-content-color;
			line-height: 22px;
		}

		.zx-card__actions {
			font-size: 12px;
			padding: 0 $zx-card-spacing $zx-card-spacing;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
		}
		
		.zx-card__footer {
			padding: $zx-card-spacing;
			border-top: 1px $zx-border-color solid;
		}
	}

	.zx-card--border {
		border: 1px solid $zx-border-color;
	}

	.zx-card--shadow {
		position: relative;
		/* #ifndef APP-NVUE */
		box-shadow: $zx-shadow;
		/* #endif */
	}

	.zx-card--full {
		margin: 0;
		border-left-width: 0;
		border-right-width: 0;
		border-radius: 0;
	}
	
	.zx-card--clickable {
		cursor: pointer;
	}
	
	.zx-card--hover {
		transform: scale(0.98);
		opacity: 0.9;
	}
	
	// 主题模式
	.zx-card--primary {
		background-color: rgba($zx-primary, 0.1);
		border-color: rgba($zx-primary, 0.2);
		.zx-card__header {
			border-bottom-color: rgba($zx-primary, 0.2);
		}
		.zx-card__footer {
			border-top-color: rgba($zx-primary, 0.2);
		}
	}
	
	.zx-card--success {
		background-color: rgba($zx-success, 0.1);
		border-color: rgba($zx-success, 0.2);
		.zx-card__header {
			border-bottom-color: rgba($zx-success, 0.2);
		}
		.zx-card__footer {
			border-top-color: rgba($zx-success, 0.2);
		}
	}
	
	.zx-card--warning {
		background-color: rgba($zx-warning, 0.1);
		border-color: rgba($zx-warning, 0.2);
		.zx-card__header {
			border-bottom-color: rgba($zx-warning, 0.2);
		}
		.zx-card__footer {
			border-top-color: rgba($zx-warning, 0.2);
		}
	}
	
	.zx-card--error {
		background-color: rgba($zx-error, 0.1);
		border-color: rgba($zx-error, 0.2);
		.zx-card__header {
			border-bottom-color: rgba($zx-error, 0.2);
		}
		.zx-card__footer {
			border-top-color: rgba($zx-error, 0.2);
		}
	}
	
	.zx-card--info {
		background-color: rgba($zx-info, 0.1);
		border-color: rgba($zx-info, 0.2);
		.zx-card__header {
			border-bottom-color: rgba($zx-info, 0.2);
		}
		.zx-card__footer {
			border-top-color: rgba($zx-info, 0.2);
		}
	}

	/* #ifndef APP-NVUE */
	.zx-card--full:after {
		border-radius: 0;
	}

	/* #endif */
	.zx-ellipsis {
		/* #ifndef APP-NVUE */
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* #endif */
		/* #ifdef APP-NVUE */
		lines: 1;
		/* #endif */
	}
</style>
