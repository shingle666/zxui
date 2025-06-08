<template>
    <view class="byt-activity">
        <view class="byt-activity__tabpane-item" v-for="(sitem, sindex) in items" :key="sindex" @click="activityClick(sitem)">
            <view class="byt-activity__tabpane-item__index">{{ sitem[labelKey] }}</view>
            <basic-icon class="byt-activity__tabpane-item__arrow" name="arrow-right" color="#1890FF" size="28rpx"></basic-icon>
        </view>
    </view>
</template>

<script>
// import { BasicIcon, BasicImage } from '../../basic';
// 图标
import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
// 图片
import BasicImage from '../../basic/basic-image/basic-image.vue';

import { Group, isEmpty } from '../../../utils/index.js';

import { chatGuessProblem } from '../../../common/api.js';
export default {
    name: 'Activity',
    components: { BasicIcon, BasicImage },
    emits: ['click'],
    props: {
        // 活动列表
        items: {
            type: Array,
            default: () => [
                { id: 1, name: '这是活动名称这是活动名称' },
                { id: 2, name: '这是活动名称这是活动名称2' },
                { id: 3, name: '这是活动名称这是活动名称3这是活动名称这是活动名称' }
            ]
        },
        // label键值
        labelKey: {
            type: String,
            default: 'name'
        }
    },
    data() {
        return {};
    },
    methods: {
        isEmpty,
        activityClick(row) {
            this.$emit('click', row);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(activity) {
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
    @include e(tab) {
        padding: 24rpx 16rpx 0;
        display: flex;
        @include eb(btn) {
            width: 146rpx;
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
        padding: 28rpx 0;
        display: flex;
        align-items: center;
        border-bottom-width: 0.5px !important;
        border-color: #dadbde !important;
        border-bottom-style: solid;
        @include e(index) {
            font-size: 28rpx;
            flex-grow: 1;
            color: #1890ff;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            padding-right: 10rpx;
        }

        @include e(arrow) {
            position: relative;
            top: 0rpx;
        }

        &:last-child {
            border-bottom: 0;
        }
    }
}
</style>
