<template>
    <view class="byt-goods">
        <view class="byt-goods__tabpane-item" v-for="(sitem, sindex) in items" :key="sindex" @click="goodsClick(sitem)">
            <view class="byt-goods__tabpane-item__left">
                <basic-image :src="sitem[labelObj[0]]" width="172rpx" height="152rpx"></basic-image>
            </view>
            <view class="byt-goods__tabpane-item__right">
                <view class="byt-goods__tabpane-item__right__name">{{ sitem[labelObj[1]] }}</view>
                <view class="byt-goods__tabpane-item__right__desc">{{ sitem[labelObj[2]] }}</view>
                <view class="byt-goods__tabpane-item__right__price">
                    <text>￥</text>
                    {{ sitem[labelObj[3]] }}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import { BasicImage } from '../../basic';
// 图片
import BasicImage from '../../basic/basic-image/basic-image.vue';
import { Group, isEmpty } from '../../../utils/index.js';
import { chatGuessProblem } from '../../../common/api.js';
export default {
    name: 'Goods',
    components: { BasicImage },
    emits: ['click'],
    props: {
        // 优惠券列表
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    price: 3000,
                    url: 'https://img.alicdn.com/bao/uploaded/i3/2055770076/O1CN01jEkYK61CQr2Na3EO7_!!0-saturn_solar.jpg',
                    name: '商品名称商品名称',
                    desc: '商品介绍商品介绍商品介绍商品介绍'
                },
                {
                    id: 2,
                    price: 3000,
                    url: 'https://img.alicdn.com/imgextra/i3/2187216215/O1CN01sEeK2J1vmWYkhJGxP_!!2187216215-0-alimamacc.jpg',
                    name: '商品名称商品名称',
                    desc: '商品介绍商品介绍商品介绍商品介绍'
                },
                {
                    id: 3,
                    price: 3000,
                    url: 'https://img.alicdn.com/imgextra/i4/2187216215/O1CN01wJNoxl1vmWYmoUyrH_!!2187216215-0-alimamacc.jpg',
                    name: '商品名称商品名称',
                    desc: '商品介绍商品介绍商品介绍商品介绍'
                }
            ]
        },
        // 数据键值
        labelObj: {
            type: Array,
            default: () => ['url', 'name', 'desc', 'price']
        }
    },
    data() {
        return {};
    },
    methods: {
        isEmpty,
        goodsClick(row) {
            this.$emit('click', row);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(goods) {
    @include e(title) {
        display: flex;
        align-items: center;
        padding: 20rpx 32rpx;
        @include eb(icon) {
            margin: 0 4px;
            font-size: 32rpx;
            color: #303133;
        }
    }
    @include e(tabpane-item) {
        display: flex;
        align-items: center;
        background: white;
        margin-bottom: 28rpx;
        border-radius: 8rpx;

        @include e(left) {
            width: 172rpx;
            .byt-image {
                border-radius: 8rpx;
            }
        }

        @include e(right) {
            padding-left: 24rpx;
            // flex-grow: 1;
            width: calc(100% - 172rpx);
            box-sizing: border-box;
            @include e(name) {
                color: #333333;
                font-size: 26rpx;
                font-weight: bold;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            @include e(desc) {
                margin-top: 8rpx;
                font-size: 24rpx;
                color: #b09d9d;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            @include e(price) {
                margin-top: 8rpx;
                color: #fa2c19;
                font-size: 32rpx;
                text {
                    font-size: 24rpx;
                }
            }
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
