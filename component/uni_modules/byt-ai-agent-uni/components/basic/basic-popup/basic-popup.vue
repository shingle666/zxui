<template>
    <view class="byt-popup" @click="changeShow" v-if="show">
        <view class="byt-popup__load" :style="{ width, height }">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: 'basic-popup',
    //update:show:显示隐藏触发
    emits: ['update:show'],
    props: {
        // 显示控制
        show: {
            type: Boolean,
            value: false
        },
        //高度
        height: {
            type: String,
            value: '160rpx'
        },
        //宽度
        width: {
            type: String,
            value: '600rpx'
        }
    },
    methods: {
        changeShow() {
            console.log('点击了');
            this.$emit('update:show', false);
        }
    }
};
</script>

<style lang="scss" scoped>
.byt-popup {
    transition-duration: 350ms;
    transition-timing-function: ease-out;
    position: fixed;
    inset: 0px;
    z-index: 96;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    &__load {
        width: 600rpx;
        height: 160rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 8rpx;
        background-color: white;
    }
}
</style>
