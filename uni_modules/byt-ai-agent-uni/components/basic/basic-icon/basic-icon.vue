<template>
    <image
        @click="onClick"
        class="byt-icon"
        :style="{
            color,
            width: size,
            height: size
        }"
        :src="src"
        :class="{
            'byt-icon--circle': shape == 'circle'
        }"
    ></image>
</template>

<script>
export default {
    name: 'basic-icon',
    //click:点击图标触发
    emits: ['click'],
    props: {
        // 内置图标名称或者网络图片地址
        name: String,
        //图标颜色
        color: {
            type: String,
            default: '#b8b8b8'
        },
        //图标大小
        size: {
            type: String,
            default: '24rpx'
        },
        //图标行政
        // circle: 圆形
        // default: 默认
        shape: {
            type: String,
            default: 'default'
        }
    },
    computed: {
        src() {
            if (this.name.startsWith('http')) {
                return this.name;
            }
            const map = {
               'arrow-right': 'https://img.yummall.cn/baiyetong/byt-uni-ui/right3.svg'
            };
            return map[this.name];
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
.byt-icon {
    flex-shrink: 0;
    &.byt-icon--circle {
        border-radius: 50%;
    }
}
</style>
