<template>
    <view class="byt-coupon">
        <view class="byt-coupon__tabpane-item" v-for="(sitem, sindex) in items" :key="sindex" @click="couponClick(sitem)">
            <view class="byt-coupon__tabpane-item__left">
                <view class="byt-coupon__tabpane-item__left__name">
                    <text>￥</text>
                    {{ sitem[labelObj[0]] }}
                </view>
                <view class="byt-coupon__tabpane-item__left__desc">满{{ sitem[labelObj[1]] }}元可用</view>
            </view>
            <view class="byt-coupon__tabpane-item__right">
                <view class="byt-coupon__tabpane-item__right__name">{{ sitem[labelObj[2]] }}</view>
                <view class="byt-coupon__tabpane-item__right__desc">{{ sitem[labelObj[3]] }} - {{ sitem[labelObj[4]] }}</view>
            </view>
        </view>
    </view>
</template>

<script>
import { Group, isEmpty } from '../../../utils/index.js';

import { chatGuessProblem } from '../../../common/api.js';
export default {
    name: 'Coupon',
    emits: ['click'],
    props: {
        // 优惠券列表
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    price: 3000,
                    fullPrice: 1000,
                    name: '这是券的名称这是券的名称这是券的名称这是券的名称',
                    deadlineStart: '2024/10/12',
                    deadlineEnd: '2024/11/12'
                },
                {
                    id: 2,
                    price: 3000,
                    fullPrice: 1000,
                    name: '这是券的名称',
                    deadlineStart: '2024/10/12',
                    deadlineEnd: '2024/11/12'
                },
                {
                    id: 3,
                    price: 3000,
                    fullPrice: 1000,
                    name: '这是券的名称',
                    deadlineStart: '2024/10/12',
                    deadlineEnd: '2024/11/12'
                }
            ]
        },
        // 数据键值
        labelObj: {
            type: Array,
            default: () => ['price', 'fullPrice', 'name', 'deadlineStart', 'deadlineEnd']
        }
    },
    data() {
        return {};
    },
    methods: {
        isEmpty,
        couponClick(row) {
            this.$emit('click', row);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(coupon) {
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
        background: #fff9fa;
        margin-bottom: 28rpx;
        border-radius: 8rpx;

        @include e(left) {
            padding: 32rpx 0;
            width: 180rpx;
            border-right: 1px solid #ffd7d36b;
            flex-shrink: 0;
            @include e(name) {
                text-align: center;
                color: #fa2c19;
                font-size: 36rpx;
                font-weight: bold;
                text {
                    font-size: 20rpx;
                }
            }
            @include e(desc) {
                text-align: center;
                margin-top: 8rpx;
                font-size: 20rpx;
                color: #988283;
            }
        }

        @include e(right) {
            padding: 32rpx 0 24rpx 24rpx;
            width: calc(100% - 180rpx - 20rpx);
            box-sizing: border-box;

            @include e(name) {
                color: #333333;
                font-size: 24rpx;
                font-weight: bold;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            @include e(desc) {
                margin-top: 16rpx;
                font-size: 20rpx;
                color: #b09d9d;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }
    }
}
</style>
