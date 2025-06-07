<template>
    <image
        @click="onClick"
        class="byt-image"
        :style="{
            width,
            height
        }"
        :src="src"
    ></image>
</template>

<script>
export default {
    name: 'basic-image',
    //click:点击图片触发
    emits: ['click'],
    props: {
        // 图片路径
        src: String,
        //图片宽度
        width: {
            type: String,
            default: '28rpx'
        },
        //图片高度
        height: {
            type: String,
            default: '28rpx'
        }
    },
    data() {
        return {};
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss" scoped>
.byt-image {
    flex-shrink: 0;
}
</style>
