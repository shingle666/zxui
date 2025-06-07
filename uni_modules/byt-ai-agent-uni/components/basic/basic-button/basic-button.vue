<template>
    <button
        class="byt-button"
        :style="{
            background: color
        }"
        :class="{
            'byt-button--circle': shape == 'circle'
        }"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'basic-button',
    //click:点击按钮触发
    emits: ['click'],
    props: {
        // 按钮文字
        text: String,
        // 按钮背景颜色
        color: {
            type: String,
            default: '#b8b8b8'
        },
        //按钮形状 square:方形 circle:圆形
        shape: {
            type: String,
            default: 'square'
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
.byt-button {
    font-size: 28rpx;
    color: white;
    &.byt-button--circle {
        border-top-right-radius: 100px;
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 100px;
    }
}
</style>
