<template>
    <scroll-view :scroll-x="true" v-if="items && items.length">
        <view class="byt-toolList">
            <view
                @click="itemClick(item[idKey])"
                v-for="(item, index) in items"
                class="byt-toolList-item"
                :style="{
                    borderColor: idList.includes(item[idKey]) ? colorIcon.mainColor || '#448ef7' : ''
                }"
            >
                <image style="width: 32rpx; height: 32rpx" :src="idList.includes(item[idKey]) ? item.activeiIcon : item.icon" mode=""></image>
                <text
                    :style="{
                        color: idList.includes(item[idKey]) ? colorIcon.textMainColor || '#448ef7' : ''
                    }"
                >
                    {{ item[labelKey] }}
                </text>
            </view>
        </view>
    </scroll-view>
</template>

<script>
export default {
    name: 'ToolList',
    emits: ['click', 'update:activeList'],
    props: {
        // 主题色和图标
        colorIcon: {
            type: Object,
            default: () => {
                return {
                    // 主题色
                    mainColor: '#448ef7',
                    // 字体主色
                    textMainColor: '#1890ff'
                };
            }
        },
        activeList: {
            type: Array,
            default: () => []
        },
        // 活动列表
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu.svg',
                    activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu_active.svg',
                    name: '深度思考'
                },
                {
                    id: 2,
                    icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang.svg',
                    activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang_avtive.svg',
                    name: '联网搜索'
                }
            ]
        },
        // icon键值
        idKey: {
            type: String,
            default: 'id'
        },
        // label键值
        labelKey: {
            type: String,
            default: 'name'
        }
    },
    computed: {
        activeListAgent: {
            get() {
                return this.activeList;
            },
            set(val) {
                this.$emit('update:activeList', val);
            }
        }
    },
    watch: {
        activeListAgent: {
            handler(val) {
                this.idList = val;
            },
            immediate: true
        }
    },
    data() {
        return {
            idList: []
        };
    },
    created() {
        // 读取工具栏是否开启缓存
        const activeList = uni.getStorageSync('activeList');
        if (activeList) {
            this.activeListAgent = activeList;
        }
    },
    methods: {
        itemClick(id) {
            const index = this.activeListAgent.findIndex((item) => item == id);
            if (index != -1) {
                this.activeListAgent.splice(index, 1);
            } else {
                this.activeListAgent.push(id);
            }
            uni.setStorageSync('activeList', this.activeListAgent);
            this.$emit('click', id);
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(toolList) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;

    @include eb(item) {
        padding: 10rpx 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16rpx;
        background-color: white;
        border-radius: 16rpx;
        border: 1.5px solid transparent;

        text {
            font-size: 28rpx;
            color: #666666;
        }
    }
}
</style>
