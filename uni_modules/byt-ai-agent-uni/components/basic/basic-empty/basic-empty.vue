<template>
    <view class="byt-empty">
        <basic-icon :size="iconSize" :name="iconName" :color="iconColor"></basic-icon>
        <text :style="{ fontSize: fontSize, color: fontColor }">暂无数据</text>
    </view>
</template>

<script>
import BasicIcon from '../basic-icon/basic-icon.vue';
export default {
    name: 'basic-empty',
    components: { BasicIcon },
    props: {
        //图标路径(网络或者本地)
        iconName: {
            type: String,
            default: 'https://img.yummall.cn/baiyetong/byt-uni-ui/empty.svg'
        },
        //图标颜色
        iconColor: {
            type: String,
            default: '#b8b8b8'
        },
        //图标大小
        iconSize: {
            type: String,
            default: '56px'
        },
        //字体大小
        fontSize: {
            type: String,
            default: '16px'
        },
        //字体颜色
        fontColor: {
            type: String,
            default: '#a1a1a2'
        }
    },
    data() {
        return {};
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.byt-empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > text {
        margin-left: 8px;
    }
}
</style>
