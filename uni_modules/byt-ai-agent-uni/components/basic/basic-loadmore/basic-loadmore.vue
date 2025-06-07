<template>
    <view class="byt-loadmore">
        <basic-icon v-if="status == 'loading'" size="60rpx" name="https://img.yummall.cn/baiyetong/byt-uni-ui/load_more.svg" />
        <view class="byt-loadmore__text">{{ statusName }}</view>
    </view>
</template>

<script>
import BasicIcon from '../basic-icon/basic-icon.vue';
export default {
    name: 'basic-loadmore',
    components: {
        BasicIcon
    },
    props: {
        //状态: loadmore:加载更多, nomore:没有更多了, loading:加载中
        status: {
            type: String,
            default: 'loading'
        }
    },
    computed: {
        statusName: function () {
            switch (this.status) {
                case 'loadmore':
                    return '加载更多';
                case 'nomore':
                    return '没有更多了';
                case 'loading':
                    return '加载中';
                default:
                    return '加载中';
            }
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.byt-loadmore {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(96, 98, 102);
    font-size: 14px;
    line-height: 14px;

    &__text {
        margin-left: 6rpx;
    }
}
</style>
