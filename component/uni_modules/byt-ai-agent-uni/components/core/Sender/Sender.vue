<template>
	<!-- #ifndef H5 -->
	<view class="byt-aidialogue-tabbar byt-aidialogue-bg--float"
		:style="{ height: `calc(120rpx + env(safe-area-inset-bottom) + ${moreShow ? '100px' : '0px'})`, transition: 'all 0.2s linear' }">
	<!--  #endif -->
		<!--  #ifdef H5 -->
		<view class="byt-aidialogue-tabbar byt-aidialogue-bg--float"
			:style="{ height: `calc(160rpx + ${moreShow ? '100px' : '0px'})`, transition: 'all 0.2s linear' }">
		<!--  #endif -->

			<!-- 快速提问 -->
			<!-- #ifdef VUE2 -->
			<QuickQuestion @itemClick="quickItemClick"
				:closeIcon="colorIcon.sendQuickCloseIcon ? colorIcon.sendQuickCloseIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg'"
				:contentLeftIcon="colorIcon.sendQuickContentLeftIcon ? colorIcon.sendQuickContentLeftIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'"
				:items="quickQuestionList" :show.sync="quickQuestionShow" style="z-index: 999;"></QuickQuestion>
			<!-- #endif -->
			<!-- #ifdef VUE3-->
			<QuickQuestion @itemClick="quickItemClick"
				:closeIcon="colorIcon.sendQuickCloseIcon ? colorIcon.sendQuickCloseIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg'"
				:contentLeftIcon="colorIcon.sendQuickContentLeftIcon ? colorIcon.sendQuickContentLeftIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'"
				:items="quickQuestionList" v-model:show="quickQuestionShow"></QuickQuestion>
			<!-- #endif -->

			<!-- <view class="byt-aidialogue-tabbar__box" :style="{
                    bottom: inputOffsetBottom > 0 ? inputOffsetBottom + 32 + 'px' : '32px'
                }"> -->
			<view class="byt-aidialogue-tabbar__box">
				<view class="byt-aidialogue-tabbar__contain">
					<view class="byt-aidialogue-tabbar__content">
						<view v-if="slotTopShow" class="byt-aidialogue-tabbar-top">
							<slot name="top"></slot>
						</view>
						<view class="byt-aidialogue-tabbar__content-input">
							<template v-if="audioShow">
								<view class="byt-aidialogue-tabbar__content-input__textarea"
									:style="{ display: microphoneAgent ? 'flex' : 'none', borderRadius: moreShow ? '28rpx 28rpx 0 0' : '28rpx',justifyContent: 'space-between', alignItems: 'center'}">
									<view v-if="quickShow" @click="quickQuestionShow = true"
										class="byt-aidialogue-tabbar__content-input__textarea__confirm"
										style="background-color: transparent; display: flex; justify-content: center; align-items: center;padding:16rpx 0 6rpx 24rpx;">
										<basic-icon size="56rpx"
											:name="colorIcon.sendLeftIcon ? colorIcon.sendLeftIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft.svg'"></basic-icon>
									</view>
									<!-- 	<view v-else class="byt-aidialogue-tabbar__content-input__textarea__confirm"
										style="background-color: transparent; margin-left: 18rpx"></view> -->
									<Audio :microphone="microphoneAgent" :message="messageAgent"
										:startCount="startCount"></Audio>

									<view
										style="display: flex; flex-direction: row; align-items: center; padding-right:12rpx ;">
										<view  style="width:80rpx; height: 86rpx;display: flex; justify-content: center; align-items: center; margin-top: 2rpx;">
											<basic-icon size="56rpx" style="margin-top: 6rpx;"
												name="https://img.yummall.cn/baiyetong/byt-uni-ui/jianpan.svg"
												@click="microphoneAgent = false"></basic-icon>
										</view>

										<block v-if="moreListShow">
											<view style="width:80rpx; height: 86rpx;display: flex; justify-content: center; align-items: center; margin-top: 2rpx;" @click="moreShowAgent = true"
												v-if="!moreShowAgent">
												<basic-icon size="56rpx" style="margin-top: 6rpx;"
													name="https://img.yummall.cn/baiyetong/byt-uni-ui/gengduo.svg"></basic-icon>
											</view>
											<view style="width:80rpx; height: 86rpx;display: flex; justify-content: center; align-items: center; margin-top: 2rpx;" @click="moreShowAgentClose"
												v-else>
												<basic-icon size="56rpx" style="margin-top: 6rpx;"
													name="https://img.yummall.cn/baiyetong/byt-uni-ui/gengclose.svg"></basic-icon>
											</view>


										</block>
									</view>
								</view>
							</template>

							<view class="byt-aidialogue-tabbar__content-input__textarea"
								:style="{ display: !microphoneAgent ? 'flex' : 'none', alignItems: 'center'}">
								<view v-if="quickShow" @click="openQuick"
									class="byt-aidialogue-tabbar__content-input__textarea__confirm"
									style="background-color: transparent; display: flex; justify-content: center; align-items: center;padding-left: 24rpx; padding-top: 16rpx; padding-bottom: 16rpx; padding-right: 18rpx;">
									<basic-icon size="56rpx"
										style="display: flex; justify-content: center; align-items: center;"
										:name="colorIcon.sendLeftIcon ? colorIcon.sendLeftIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft.svg'"></basic-icon>
								</view>
								<!-- :adjust-position="true" 是否键盘弹起上推页面 -->
								<textarea class="byt-aidialogue-tabbar__content-input__textarea__inner" auto-height
									:style="!messageAgent ? 'height: 48rpx;' : 'height:auto;'"
									style="margin-left: 10rpx;" v-model="messageAgent" maxlength="-1"
									:cursor-spacing="17" placeholder=" " :adjust-position="true" @focus="onFocus" />
								<view v-if="messageAgent || (!audioShow && !moreListShow)"
									class="byt-aidialogue-tabbar__content-input__textarea__confirm "
									:style="{ background: 'transparent', position: 'relative',marginRight:'24rpx',marginLift:'12rpx'}">
									<zeroLoading v-if="loading"
										:color="colorIcon.mainColor ? colorIcon.mainColor : '#448ef7'" textGap="0rpx"
										type="atom" position="absolute"></zeroLoading>
									<view class="width:108rpx, height: 88rpx;">
										<basic-icon :style="{ opacity: messageAgent ? 1 : 0.5 }" size="56rpx"
											style="display: flex; justify-content: center; align-items: center;"
											:name="colorIcon.sendRightIcon ? colorIcon.sendRightIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg'"
											@click="setMessage"></basic-icon>
									</view>

								</view>
								<view v-else
									style="display: flex; flex-direction: row; align-items: center;height: 88rpx; margin-right:12rpx;">
									<view v-if="audioShow" @click="openAudio" style="width:80rpx; height: 88rpx; display: flex; justify-content: center;align-items: center;">
										<basic-icon size="56rpx"
											style="display: flex; justify-content: center; align-items: center; "
											name="https://img.yummall.cn/baiyetong/byt-uni-ui/yuyin-2.svg"
											></basic-icon>
									</view>


									<block v-if="moreListShow">
										<view @click="moreShowAgent = true" style="width:80rpx; height: 88rpx; display: flex; justify-content: center;align-items: center;" v-if="!moreShowAgent">
											<basic-icon  size="56rpx"
												style="display: flex; justify-content: center; align-items: center;"
												name="https://img.yummall.cn/baiyetong/byt-uni-ui/gengduo.svg"></basic-icon>
										</view>

										<view  @click="moreShowAgentClose" style="width:80rpx; height: 88rpx; display: flex; justify-content: center;align-items: center;" v-else>
											<basic-icon size="56rpx"
												style="display: flex; justify-content: center; align-items: center;"
												name="https://img.yummall.cn/baiyetong/byt-uni-ui/gengclose.svg"></basic-icon>
										</view>

									</block>
								</view>
							</view>
						</view>
					</view>
					<!-- 更多工具 -->
					<view
						:style="{ height: `calc(${moreShow ? '120px' : '0px'})`, transition: 'all 0.2s linear', overflow: 'hidden' }">
						<MoreList :items="moreList"></MoreList>
					</view>
				</view>


				<view class="safe-bottom"></view>
			</view>
		<!-- #ifndef H5 -->
		</view>
		<!--  #endif -->
	<!--  #ifdef H5 -->
	</view>
	<!--  #endif -->
</template>

<script>
	import {
		getQuickQuestionList
	} from '../../../common/demoMook.js';
	// 图标
	import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
	import Audio from './components/Audio/Audio.vue';
	import zeroLoading from './components/zero-loading/components/zero-loading/zero-loading.vue';
	import MoreList from '../MoreList/MoreList.vue';
	import QuickQuestion from '../QuickQuestion/QuickQuestion.vue';
	export default {
		components: {
			Audio,
			BasicIcon,
			zeroLoading,
			MoreList,
			QuickQuestion
		},
		name: 'Sender',
		emits: ['update:message', 'update:microphone', 'focus', 'submit'],
		props: {
			// 主题色和图标
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
						// 发送框左边图标
						sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft.svg',
						// 发送框右边发送按钮
						sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg',
						// 发送框快速提问关闭图标
						sendQuickCloseIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg',
						// 发送框快速提问内容左侧图标
						sendQuickContentLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'
					};
				}
			},
			// 是否开启语音功能
			audioShow: {
				type: Boolean,
				default: true
			},
			// 是否切换到语音输入
			microphone: {
				type: Boolean,
				default: false
			},
			// 消息内容
			message: {
				type: String,
				default: ''
			},
			// 消息回答等待loading
			loading: {
				type: Boolean,
				default: false
			},
			// 是否显示顶部插槽
			slotTopShow: {
				type: Boolean,
				default: false
			},
			// 更多工具图标按钮显示开关
			moreListShow: {
				type: Boolean,
				default: false
			},
			// 快速提问显示开关
			quickShow: {
				type: Boolean,
				default: false
			},
			// 更多组件显示
			moreShow: {
				type: Boolean,
				default: false
			},
			// 更多列表
			moreList: {
				type: Array,
				default: () => {
					return [{
							id: 1,
							icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe.svg',
							name: '拍摄'
						},
						{
							id: 1,
							icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce.svg',
							name: '相册'
						},
						{
							id: 2,
							icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin.svg',
							name: '录音'
						},

						{
							id: 2,
							icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang.svg',
							name: '文档'
						}
					];
				}
			}
		},
		data() {
			return {
				// 快速提问
				quickQuestionShow: false,
				// 快速提问数据
				quickQuestionList: [],
				inputOffsetBottom: 0,
				startCount: 0
			};
		},
		computed: {
			// 更多
			moreShowAgent: {
				get() {
					return this.moreShow;
				},
				set(val) {
					console.log(val, "jisuanshuxingfashenggaibian")
					this.$emit('update:moreShow', val);
				}
			},

			// 消息代理
			messageAgent: {
				get() {
					return this.message;
				},
				set(val) {
					this.$emit('update:message', val);
				}
			},
			// 语音和文字输入切换
			microphoneAgent: {
				get() {
					return this.microphone;
				},
				set(val) {
					this.$emit('update:microphone', val);
				}
			}
		},
		watch: {
			"moreShowAgent": {
				handle(val) {
					console.log("查看面板是否收起", val)
				}
			}
		},
		async mounted() {
			if (this.quickShow) {
				// 请求快速提问数据
				this.getQuickList();
			}

			// 监听语音切换
			uni.$on('updateMicrophone', (data) => {
				this.microphoneAgent = data;
			});
			// 监听消息数据变化
			uni.$on('updateMessage', (data) => {
				this.messageAgent = data;
			});

			let _this = this;
			// 监听键盘高度变化，以便设置输入框的高度
			//  #ifndef H5
			uni.onKeyboardHeightChange((res) => {
				console.log('获取高度', res);
				_this.inputOffsetBottom = res.height;
				_this.toBottom();
				if (res.height === 0) {
					_this.focus = false;
				}
			});
			// #endif
		},
		// #ifdef VUE2
		beforeDestroy() {
			uni.$off('updateMicrophone');
		},
		// #endif
		// #ifdef VUE3
		beforeUnmount() {
			uni.$off('updateMicrophone');
		},
		// #endif
		methods: {
			moreShowAgentClose() {
				this.moreShowAgent = false;
			},
			// 获取快速提问数据
			async getQuickList() {
				this.quickQuestionList = await getQuickQuestionList();
			},
			onFocus() {
				this.$emit('focus');
			},
			quickItemClick(content) {
				this.messageAgent = content;
				this.quickQuestionShow = false;
				this.setMessage();
			},
			setMessage() {
				this.$emit('submit');
			},
      openAudio() {
				this.startCount += 1
        this.moreShowAgent = false;
			},
      openQuick(){
        this.quickQuestionShow = true
        this.moreShowAgent = false;
      }
		}
	};
</script>

<style lang="scss" scoped>
	.byt-aidialogue-tabbar {
		padding: 32rpx 32rpx;
		border-radius: 28rpx;
		// background: #fff;
	}

	.byt-aidialogue-tabbar-top {
		width: 100%;
		height: 40px;
		position: absolute;
		z-index: 99;

		// #ifndef H5
		top: -70rpx;
		// #endif
		// #ifdef H5
		top: -70rpx;
		// #endif

		padding: 10rpx 0rpx;
		left: 34rpx;
		display: flex;
		flex-direction: row;
		gap: 16rpx;
		align-items: center;
	}

	view {
		box-sizing: border-box;
	}

	@include b(aidialogue-tabbar) {
		// #ifndef H5
		height: calc(120rpx + env(safe-area-inset-bottom));
		// #endif
		// #ifdef H5
		height: calc(160rpx);
		// #endif
		position: relative;

		@include e(box) {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 99;
			border-radius: 28rpx 28rpx;
			padding: 16rpx 32rpx;
			box-sizing: border-box;
			// box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			// background: #fff;
			// padding-bottom: 16rpx;



			// &.is-min {
			//     background: rgba(255, 255, 255, 0.7);
			// }
		}

		@include e(contain) {
			background: #fff;
			box-shadow: 0rpx 4rpx 20rpx 0rpx rgba(0, 0, 0, 0.05);
			box-sizing: border-box;
			border-radius: 28rpx 28rpx;


			@include e(content) {
				position: relative;
				max-width: 1800rpx;
				margin: 0 auto;
				padding: 10px 12px;
				box-sizing: border-box;

				@include eb(input) {
					display: flex;
					align-items: center;
					padding: 16rpx 0rpx 0rpx 0rpx;

					@include e(audio) {
						margin-right: 28rpx;
					}

					@include e(textarea) {
						flex-grow: 1;
						// min-height: 80rpx;
						// border-radius: 88rpx;
						border: 4rpx solid transparent;
						// background-clip: padding-box, border-box;
						// background-origin: padding-box, border-box;
						// background-image: linear-gradient(to right, #fff, #fff), linear-gradient(to left, #5ee1fcff, #9caaf6ff, #9e8cf6ff, #5d8bfdff);
						// background: rgba(255, 255, 255, 0.8);
						background-color: white;
						// border: 2px solid #9e8cf6ff;
						// border-radius: 44rpx;
						border-radius: 28rpx 28rpx;
						box-sizing: content-box;
						display: flex;
						// align-items: center;
						justify-content: space-between;

						// padding: 20rpx 0;

						@include e(inner) {
							min-height: 48rpx;
							max-height: 600rpx;
							overflow-y: auto;
							padding: 10rpx 24rpx;
							box-sizing: content-box;
							border-radius: 80rpx;
							width: calc(100% - 32rpx - 80rpx);
							line-height: 48rpx;
							font-size: 28rpx;


							// &::placeholder {
							// 	line-height: 48rpx;
							// }
						}

						@include e(confirm) {
							flex-shrink: 0;
							width: 56rpx;
							height: 56rpx;
							margin-right: 18rpx;
							background-color: #26a5ff;
							border-radius: 50%;
							display: flex;
							justify-content: center;
							align-items: center;
						}
					}
				}
			}
		}

	}
</style>
