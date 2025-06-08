<template>
    <view
        class="byt-guess"
        v-if="!isEmpty(problemList)"
        :style="{position: 'relative' }"
    >
        <view class="byt-guess__title" style="z-index: 10">
            <view class="byt-guess__title-left">
                <!-- <basic-image width="60rpx" height="60rpx" src="https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg"></basic-image> -->
                <image
                    style="width: 60rpx; height: 60rpx"
                    :src="colorIcon.guessIcon ? colorIcon.guessIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg'"
                    mode=""
                ></image>
                <view class="byt-guess__title-left__icon" style="font-weight: bold">我能帮您做什么</view>
            </view>
            <view class="byt-guess__title-right" @click="onChange">
                <image
                    style="width: 32rpx; height: 32rpx"
                    :src="colorIcon.guessChange ? colorIcon.guessChange : 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg'"
                    mode=""
                ></image>

                <view class="byt-guess__title-right__icon" :style="{ color: colorIcon.guessChangeColor ? colorIcon.guessChangeColor : '#448ef7' }">换一换</view>
            </view>
        </view>
        <view class="byt-guess__tab" style="z-index: 10">
            <!--  <view style="padding: 24rpx">
                <scroll-view :scroll-x="true">
                    <view class="byt-guess__tab-box">
                        <view
                            class="byt-guess__tab-btn"
                            :class="{ 'is-active': problemCategoryKey === key }"
                            v-for="(value, key) in problemList"
                            @click="categoryClick(key)"
                            :key="key"
                            :style="{
                                background: problemCategoryKey === key ? (colorIcon.mainColor ? colorIcon.mainColor : '#448ef7') : '',
                                borderColor: problemCategoryKey === key ? (colorIcon.mainColor ? colorIcon.mainColor : '#448ef7') : ''
                            }"
                        >
                            <text>{{ key }}</text>
                        </view>
                    </view>
                </scroll-view>
            </view> -->

            <view class="byt-guess__tabpane-item" v-for="(sitem, sindex) in problemList[problemCategoryKey]" :key="sindex" @click="problemClick(sitem[textKey])">
                <view class="byt-guess__tabpane-item__index">{{ sindex + 1 }}.{{ sitem[textKey] }}</view>
                <basic-icon name="arrow-right" size="24rpx"></basic-icon>
            </view>
        </view>
    </view>
</template>

<script>
// import { BasicImage, BasicIcon } from '../../basic';
// 图片
import BasicImage from '../../basic/basic-image/basic-image.vue';
// 图标
import BasicIcon from '../../basic/basic-icon/basic-icon.vue';

import { Group, isEmpty } from '../../../utils/index.js';

import { chatGuessProblem } from '../../../common/api.js';
export default {
    name: 'Prompts',
    components: {
        BasicIcon,
        BasicImage
    },
    emits: ['itemClick'],
    props: {
        // 主题色和图标
        colorIcon: {
            type: Object,
            default: () => {
                return {
                    // 主题色
                    mainColor: '#448ef7',
                    // 猜你想问换一换 字体颜色
                    guessChangeColor: '#1890ff',
                    // 猜你想问背景颜色
                    guessBgColor: '-webkit-linear-gradient(top, #dff6ff99, #ffffff 200rpx)',
                    // 猜你想问换一换图标
                    guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg',
                    //猜你想问文字头部左边图标
                    guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg'
                };
            }
        },
        // AI智能体id，查询常用话术
        aiAgentId: {
            type: String,
            default: null
        },
        // 没有智能体id时，传入常用话术数据
        items: {
            type: Array,
            default: () => []
        },
        // btn切换key值
        btnKey: {
            type: String,
            default: 'btnName'
        },
        // 常用话术键值
        textKey: {
            type: String,
            default: 'text'
        }
    },
    data() {
        return {
            problemList: [],
            problemCategoryKey: null,
            currentIndex: 0
        };
    },
    async created() {
        await this.getAllProblemData();
    },
    watch: {
        aiAgentId() {
            this.getAllProblemData();
        }
    },
    methods: {
        isEmpty,
        getAllProblemData() {
            const btnKey = this.btnKey;
            if (this.aiAgentId) {
                chatGuessProblem({
                    aiAgentId: this.aiAgentId
                }).then((res) => {
                    let data = res.data;
                    data = data.sort((a, b) => {
                        const timeA = a.problemCategoryId;
                        const timeB = b.problemCategoryId;
                        return timeA - timeB;
                    });

                    this.problemList = Group(data, btnKey);
                    this.problemCategoryKey = Object.keys(this.problemList)[this.currentIndex];
                });
            } else {
                let data = this.items;
                if (btnKey == 'btnName') {
                    data = [
                        {
                            btnName: '功能',
                            text: '图表'
                        },
                        {
                            btnName: '功能',
                            text: '商品'
                        },
                        {
                            btnName: '功能',
                            text: '优惠券'
                        },
                        {
                            btnName: '功能',
                            text: '活动'
                        },
                        // {
                        //     btnName: '功能',
                        //     text: '图表'
                        // },
                        // {
                        //     btnName: '功能',
                        //     text: '表格'
                        // },
                        // {
                        //     btnName: '功能',
                        //     text: '图片'
                        // }
                    ];
                }
                this.problemList = Group(data, btnKey);
                this.problemCategoryKey = Object.keys(this.problemList)[this.currentIndex];
            }
        },
        categoryClick(key) {
            this.problemCategoryKey = key;
        },
        problemClick(name) {
            this.$emit('itemClick', name);
        },
        onChange() {
            let lent = Object.keys(this.problemList);
            if (this.currentIndex >= lent.length - 1) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.problemCategoryKey = Object.keys(this.problemList)[this.currentIndex];
            console.log('换一项', this.problemCategoryKey);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(guess) {
    // margin: 28rpx 30rpx 40rpx;
    border-radius: 12px;
    opacity: 0.95;
    // border: 1.5px solid #ffffff;
    overflow: hidden;
    background-size: cover !important;
    background-repeat: no-repeat !important;
	background-image: url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMeng2222.svg);
	background-size: cover !important;
	background-repeat: no-repeat !important;
	z-index: 99;
	

    @include e(title) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16rpx 32rpx 16rpx;

        @include eb(left) {
            display: flex;
            align-items: center;

            @include e(icon) {
                margin: 0 4px;
                font-size: 28rpx;
                color: #303133;
            }
        }

        @include eb(right) {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            // padding-left: 18rpx;
            z-index: 10;
            // padding-right: 20rpx;
            width: 160rpx;
            // height: 30px;
            // transform: translate(32rpx, 6px);

            // background-image: url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMeng3333.svg);
            background-size: cover !important;
            background-repeat: no-repeat !important;
            box-sizing: content-box !important;

            @include e(icon) {
                margin-left: 8rpx;
                font-size: 28rpx;
                color: #1890ff;
                position: relative;
                z-index: 10;
            }
        }
    }

    @include e(tab) {
        border-radius: 24rpx 0 24rpx 24rpx;
        // background: -webkit-linear-gradient(top, #dff6ff3d 100rpx, #dff6ffed);
        // background: rgba(255, 255, 255, 0.45);
        // border-top: 1.5px solid #ffffff;
        // background-image: url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMeng2222.svg);
        // background-size: cover !important;
        // background-repeat: no-repeat !important;
        padding: 24rpx 0 8rpx;
        display: flex;
        flex-direction: column;

        @include eb(box) {
            display: flex;
            flex-direction: row;
            // padding: 0 24rpx;
            grid-gap: 8rpx;
            margin-bottom: 28rpx;
        }
        @include eb(btn) {
            // width: 146rpx;
            padding: 0 24rpx;
            height: 54rpx;
            border-radius: 8rpx;
            border: 1px solid #909193;
            color: #909193;
            margin-right: 14rpx;
            flex-shrink: 0;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            text {
                font-size: 28rpx;
            }

            &.is-active {
                background: #1890ff;
                color: white;
                border-color: #1890ff;
            }

            &:last-child {
                margin-right: 0;
            }
        }
    }

    @include e(tabpane-item) {
        margin: 0 24rpx 16rpx;
        padding: 16rpx 24rpx;
        display: flex;
        align-items: center;
        border-radius: 20rpx;
        background: #ffffff;

        @include e(index) {
            font-size: 28rpx;
            flex-grow: 1;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-right: 10rpx;
            color: #3d3d3d;
        }

        &:last-child {
            border-bottom: 0;
        }
    }
}
</style>
