<template>
    <view v-if="showAgent" :style="{ opacity: maskShow ? 1 : 0 }" class="byt-quickQuestion">
        <view class="byt-quickQuestion-box">
            <scroll-view :scroll-y="true" style="height: calc(100% - 44px - 56rpx)">
                <view class="byt-quickQuestion-box-itemBox">
                    <view @click="moreListClick(item[labelKey])" class="byt-quickQuestion-box-itemBox-item" v-for="item in items">
                        <image style="width: 32rpx; height: 32rpx" :src="contentLeftIcon" mode=""></image>
                        <text>{{ item[labelKey] }}</text>
                    </view>
                </view>
            </scroll-view>
            <image @click="close" :src="closeIcon" mode=""></image>
        </view>
    </view>
</template>

<script>
export default {
    name: 'QuickQuestion',
    emits: ['click'],
    props: {
        show: {
            type: Boolean,
            default: false
        },
        // 内容左侧图标
        contentLeftIcon: {
            type: String,
            default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'
        },
        // 关闭按钮图标
        closeIcon: {
            type: String,
            default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg'
        },
        // 活动列表
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    name: '帮我查一下商品'
                },
                {
                    id: 2,
                    name: '帮我查一下图表'
                },
                {
                    id: 3,
                    name: '帮我查一下优惠券'
                },

                {
                    id: 4,
                    name: '帮我查一下活动'
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
        showAgent: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit('update:show', val);
            }
        }
    },
    data() {
        return {
            maskShow: false
        };
    },
    watch: {
        show(val) {
            setTimeout(() => {
                this.maskShow = val;
            }, 50);
        }
    },
    methods: {
        close() {
            this.maskShow = false;
            setTimeout(() => {
                this.showAgent = false;
            }, 200);
        },
        moreListClick(content) {
            this.$emit('itemClick', content);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(quickQuestion) {
    position: absolute;
    width: 100%;
    bottom: 0;
    // #ifdef MP-WEIXIN
    position: fixed;
    width: 100vw;
    // #endif
    // #ifdef APP
    bottom: calc(env(safe-area-inset-bottom) - 40rpx);
    // #endif
    left: 0;
    z-index: 99999;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    transition: all 0.2s linear;

    @include eb(box) {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        // #ifndef H5
        padding: calc(18px + env(safe-area-inset-bottom)) 53rpx;
        // #endif
        // #ifdef H5
        padding: calc(22px) 46rpx;
        // #endif

        box-sizing: border-box;
        gap: 16px;
        max-width: 1800rpx;
        margin: 0 auto;

        @include eb(itemBox) {
            min-height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 12px;

            @include eb(item) {
                background-color: white;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                gap: 12rpx;
                padding: 18rpx 24rpx;
                border-radius: 24rpx;
                max-width: 100%;
                width: fit-content;

                image {
                    margin-top: 2px;
                }
                text {
                    font-size: 28rpx;
                }
            }
        }

        image {
            width: 56rpx;
            height: 56rpx;
            flex-shrink: 0;
        }
    }
}
</style>
