<template>
	<view class="byt-moreList" style="border-radius: 0px 0px 28rpx  28rpx;">
		<swiper class="byt-moreList-swiper" indicator-color="#D9E0D6" indicator-active-color="#999999"
			:indicator-dots="itemsAgnet.length > 1" :autoplay="false" :interval="2000" :duration="500">
			<swiper-item v-for="(item, index) in itemsAgnet">
				<view class="byt-moreList-swiper-item">
					<view class="byt-moreList-swiper-item-box" v-for="(V, VIndex) in item">
						<view class="byt-moreList-swiper-item-box-icon">
							<image :src="V.icon" mode=""></image>
						</view>
						<text class="byt-moreList-swiper-item-box-text">{{ V[labelKey] }}</text>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: 'MoreList',
		emits: ['click'],
		props: {
			// 活动列表
			items: {
				type: Array,
				default: () => [{
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
				]
			},
			// icon键值
			idKey: {
				type: String,
				default: 'id'
			},
			// label键值
			labelKey: {
				type: String,
				default: 'name'
			}
		},
		computed: {
			itemsAgnet() {
				return this.chunkArray(this.items, 4);
			}
		},
		data() {
			return {};
		},
		methods: {
			chunkArray(arr, size) {
				const result = [];

				for (let i = 0; i < arr.length; i += size) {
					result.push(arr.slice(i, i + size));
				}

				return result;
			},
			moreListClick(row) {
				this.$emit('click', row);
			}
		}
	};
</script>

<style lang="scss" scoped>
	@include b(moreList) {
		height: 120px;
		max-width: 1800rpx;
		margin: 0 auto;
		background-color: #fff;
		border-top: 1rpx solid rgba(0, 0, 0, 0.1);
		border-radius: 0 0 28rpx 28rpx;

		@include eb(swiper) {
			height: 100%;

			@include eb(item) {
				height: 100%;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 12rpx;
				align-items: center;
				background-color: #fff;
				border-radius: 0 0 28rpx 28rpx;
				padding:0 10rpx;


				@include eb(box) {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 8px;
					padding-bottom: 12px;


					@include eb(icon) {
						width: 60px;
						height: 60px;
						border-radius: 12px;
						background-color: white;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 24rpx;
						background: #FAFAFA;

						image {
							width: 24px;
							height: 24px;
						}
					}

					@include eb(text) {
						font-size: 28rpx;
					}
				}
			}
		}
	}
</style>