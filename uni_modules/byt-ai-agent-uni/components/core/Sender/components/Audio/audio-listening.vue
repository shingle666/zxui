<template>
    <basic-popup class="byt-listening" :show="show" @update:show="changeShow" width="230rpx">
        <template #default>
            <view class="byt-listening__load--rect1 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect2 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect3 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect4 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect5 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect6 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect7 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect8 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect1 byt-listening__load-item"></view>
            <view class="byt-listening__load--rect2 byt-listening__load-item"></view>
        </template>
    </basic-popup>
</template>

<script>
import BasicPopup from '../../../../basic/basic-popup/basic-popup.vue';
export default {
    name: 'audio-listening',
    components: {
        BasicPopup
    },
    props: {
        show: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        changeShow(e) {
            console.log('点击了');
            this.$emit('update:show', e);
        }
    }
};
</script>

<style lang="scss" scoped>
.byt-listening {
    &__load {
        &-item {
            background-color: #3378ffff;
            height: 80rpx;
            width: 10rpx;
            margin-right: 6rpx;
            animation: stretchdelay 1s infinite ease-in-out;
        }

        &--rect2 {
            animation-delay: 0.1s;
        }

        &--rect3 {
            animation-delay: 0.2s;
        }

        &--rect4 {
            animation-delay: 0.3s;
        }

        &--rect5 {
            animation-delay: 0.4s;
        }

        &--rect6 {
            animation-delay: 0.5s;
        }

        &--rect7 {
            animation-delay: 0.6s;
        }

        &--rect8 {
            animation-delay: 0.7s;
        }
    }
}

@keyframes stretchdelay {
    0%,
    100% {
        transform: scaleY(0.9);
        -webkit-transform: scaleY(0.9);
    }

    50% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }
}
</style>
