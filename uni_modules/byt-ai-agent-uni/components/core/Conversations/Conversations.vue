<template>
    <scroll-view :scroll-y="true" class="byt-sidebar-left" :style="{ height: height, width: width }">
        <view :scroll-y="true" class="byt-sidebar-left-listBox">
            <view v-if="items.length" v-for="(item, index) in items" @click="change(item, index)" class="byt-sidebar-left-listBox-listItem" :class="{ active: activeKey == index }">
                {{ item[labelkey] }}
            </view>
            <basic-empty v-else></basic-empty>
        </view>
        <view class="byt-sidebar-left-bottomItem">
            <view class="byt-sidebar-left-bottomItem-button">
                <basic-button text="+ 新建对话" @click="addItem" color="#51a3f8"></basic-button>
            </view>
        </view>
    </scroll-view>
</template>

<script>
// import { BasicEmpty, BasicButton } from '../../basic';
// 按钮
import BasicButton from '../../basic/basic-button/basic-button.vue';
// 空状态
import BasicEmpty from '../../basic/basic-empty/basic-empty.vue';
export default {
    name: 'Conversations',
    components: {
        BasicButton,
        BasicEmpty
    },
    emits: ['update:activeKey', 'activeChange', 'addItem'],
    props: {
        // 高度
        height: {
            type: String,
            default: 'calc(100vh - 50px)'
        },
        // 宽度
        width: {
            type: String,
            default: '300px'
        },
        // 当前选中的下标
        activeKey: {
            type: Number,
            default: 0
        },
        // 会话列表数据源
        items: {
            type: Array,
            default: () => [
                {
                    name: '我是第一个回话',
                    id: '1'
                },
                {
                    name: '我是第2个会话',
                    id: '2'
                },
                {
                    name: '我是第3个会话',
                    id: '3'
                }
            ]
        },
        labelkey: {
            type: String,
            default: 'name'
        }
    },
    data() {
        return {};
    },
    computed: {
        activeKeyAgent: {
            get() {
                return this.activeKey;
            },
            set(val) {
                this.$emit('update:activeKey', val);
            }
        }
    },
    methods: {
        // 选中变更回调
        change(item, index) {
            this.activeKeyAgent = index;
            this.$emit('activeChange', item);
        },
        addItem() {
            this.$emit('addItem');
        }
    }
};
</script>

<style scoped lang="scss">
view {
    box-sizing: border-box;
}

@include b(sidebar-left) {
    flex-shrink: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    // padding: 16px 0 0;
    box-sizing: border-box;
    position: relative;

    @include eb(listBox) {
        height: calc(100% - 65px);
        overflow: auto;
        padding: 12px 15px;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;

        @include eb(listItem) {
            font-size: 14px;
            padding: 12px 10px;
            border-radius: 8px;
            margin-bottom: 12px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
        }
        & > .active {
            background-color: #f0f0f0;
        }
    }

    @include eb(bottomItem) {
        width: 100%;
        position: absolute;
        bottom: 0px;
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;

        @include eb(button) {
            width: 80%;
        }
    }
}
</style>
