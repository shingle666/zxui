<template>
	<view class="byt-startup">
		<view class="byt-startup__box">
			<view class="byt-startup__assistant" :class="{ 'is-active': show }">
				<view class="byt-startup__assistant-left is-tip"
					:style="{ color: colorIcon.textMainColor ? colorIcon.textMainColor : '#1890ff' }">
					<view class="byt-startup__assistant-left__title">
						{{descriptionTitle}}
					</view>
					<view class="byt-startup__assistant-left__description">
						{{description}}
					</view>
				</view>


				<view class="byt-startup__assistant-right">
					<basic-icon size="140rpx" :name="icon"></basic-icon>
					<view class="byt-startup__assistant-right__tag" :style="{
                            background: `url(${rotateIcon ? rotateIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png'})`,
                            'background-size': '100% 100%'
                        }"></view>
				</view>
				<!--    <view
                    class="byt-startup__assistant-right is-active"
                    :style="{ background: `-webkit-linear-gradient(left, ${colorIcon.linearColor ? colorIcon.linearColor : '#a8ecff, #27c9ff'})` }"
                    v-if="show"
                >
                    努力解答中...
                </view> -->
				<!--     <view
                    class="byt-startup__assistant-right is-tip"
                    v-else
                    :style="{ color: colorIcon.textMainColor ? colorIcon.textMainColor : '#1890ff', borderColor: colorIcon.assistColor ? colorIcon.assistColor : '#a8ecff' }"
                >
                    {{ description }}
                </view> -->
				<!--     <basic-image
                    class="byt-startup__assistant-banner"
                    width="268rpx"
                    height="206rpx"
                    :src="rightIcon ? rightIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'"
                ></basic-image> -->
			</view>
		</view>
	</view>
</template>

<script>
	// import { BasicIcon, BasicImage } from '../../basic';
	// 图标
	import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
	// 图片
	import BasicImage from '../../basic/basic-image/basic-image.vue';
	export default {
		name: 'Welcome',
		components: {
			BasicIcon,
			BasicImage
		},
		props: {
			// AI头像思考动画显示
			show: {
				type: Boolean,
				default: false
			},
			descriptionTitle: {
				type: String,
				default: '你好，我是红商AI助手'
			},

			// 描述
			description: {
				type: String,
				default: '您有任何关于红商集团的问题，我可以随时帮您解答。'
			},
			// 头像
			icon: {
				type: String,
				default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg'
			},
			// 右侧图标
			rightIcon: {
				type: String,
				default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'
			},
			// 头像回答旋转动效图标
			rotateIcon: {
				type: String,
				default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png'
			},
			// 主题色对象
			colorIcon: {
				type: Object,
				default: () => {
					return {
						// 主题色
						mainColor: '#448ef7',
						// 辅助色
						assistColor: '#a8ecff',
						// 字体主色
						textMainColor: '#1890ff',
						// 渐变色
						linearColor: '#a8ecff, #27c9ff'
					};
				}
			}
		},
		computed: {},
		data() {
			return {};
		}
	};
</script>

<style lang="scss" scoped>
	@keyframes rotateAnimation {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	@include b(startup) {
		position: relative;
		display: flex;
		align-items: center;
		// padding: 0 16rpx;
		height: 204rpx;
		box-sizing: border-box;
		overflow-y: visible;

		@include e(box) {
			display: flex;
			align-items: center;
			width: 100%;
			max-width: 1800rpx;
			height: 204rpx;
			margin: 0 auto;
			position: relative;
		}

		@include e(assistant) {
			position: relative;
			height: 204rpx;
			flex-grow: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 16rpx;
			border-radius: 16px;
			// background: linear-gradient(180deg, rgba(241, 250, 255, 0.8) 0%, rgba(243, 246, 255, 0.8) 100%);
			// backdrop-filter: blur(8px);

			@include eb(banner) {
				position: absolute;
				right: 0;
				top: 0;
				z-index: 1;
			}

			@include eb(right) {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 156rpx;
				height: 156rpx;
				z-index: 3;
				transition: all 0.3s;

				@include e(tag) {
					position: absolute;
					width: 156rpx;
					height: 156rpx;
					background: url('https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png');
					background-size: 100% 100%;
					left: 0;
					top: 0;
					z-index: 4;
				}
			}

			@include eb(left) {
				z-index: 2;

				@include e(title) {
					font-size: 32rpx;
					font-weight: 500;
					padding-bottom: 16rpx;
					color: #010103;
				}

				@include e(description) {
					font-size: 24rpx;
					color: #666666;
				}

				&.is-active {
					// position: absolute;
					// left: 62rpx;
					// top: 26rpx;
					// width: 0;
					// height: 82rpx;
					// line-height: 82rpx;
					// padding-left: 48rpx;
					// border-top-right-radius: 82rpx;
					// border-bottom-right-radius: 82rpx;
					// background: -webkit-linear-gradient(left, #a8ecff, #27c9ff);
					// opacity: 0;
					// transition: all 0.3s;
					// color: white;
					// white-space: nowrap;
					// overflow: hidden;
				}

				&.is-tip {
					box-sizing: content-box;
					min-width: 400rpx;
					width: auto !important;
					max-width: calc(100% - 240rpx);
					// margin-left: 14rpx;
					font-size: 24rpx;
					font-weight: 400;
					padding: 16rpx 14rpx;
					text-align: justify;
					color: #1890ff;
					// background: rgba(255, 255, 255, 0.7);
					backdrop-filter: blur(4px);
					box-sizing: border-box;
					// border: 1px solid #b5edff;
					border-radius: 0 12rpx 12rpx 12rpx;
					// background: url('https://img.yummall.cn/wxapp/study/img/ai-assistant-chat-box.png') no-repeat;
					background-size: 100% 100%;
					line-height: 1.5;
				}
			}

			$selector: &;

			&.is-active {
				#{$selector + '-right'} {
					transform: scale(1.1) translateX(0%);

					&__tag {
						animation: rotateAnimation 3s infinite linear;
					}
				}

				#{$selector + '-right'} {
					// left: 144rpx;
					// width: 232rpx;
					// opacity: 1;
				}
			}
		}

		// &:after {
		// 	content: '';
		// 	position: absolute;
		// 	right: 0;
		// 	bottom: -28rpx;
		// 	left: 0;
		// 	height: 28rpx;
		// 	border-top-right-radius: 20rpx;
		// 	border-top-left-radius: 20rpx;
		// 	background: -webkit-linear-gradient(top, #fff, #ffffff00);
		// 	z-index: 9;
		// }
	}
</style>