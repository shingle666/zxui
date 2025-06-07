<template>
    <!-- #ifndef MP -->
    <view
        v-if="showAgent"
        class="byt-floating"
        :style="{
            ...boxStyle,
            bottom: isFloating ? draggableY + 'px' : '0px',
            right: isFloating ? draggableX + 'px' : '0px'
        }"
    >
        <view class="byt-floating__topbox" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd">
            <view class="byt-floating__topbox-left">AI助手</view>

            <view class="byt-floating__topbox-right">
                <view v-if="typeButton" class="byt-floating__topbox-right-typeButton">
                    <view @click="typeChange(1)" class="byt-floating__topbox-right-typeButton-iconBtn">
                        <basic-icon size="24px" name="https://img.yummall.cn/baiyetong/byt-uni-ui/xuanfu1.png"></basic-icon>
                    </view>
                    <view @click="typeChange(2)" class="byt-floating__topbox-right-typeButton-iconBtn">
                        <basic-icon size="24px" name="https://img.yummall.cn/baiyetong/byt-uni-ui/xifu.svg"></basic-icon>
                    </view>
                    <view @click="typeChange(3)" class="byt-floating__topbox-right-typeButton-iconBtn">
                        <basic-icon size="24px" name="https://img.yummall.cn/baiyetong/byt-uni-ui/quanping.svg"></basic-icon>
                    </view>
                </view>
                <view v-else></view>
                <view @click="close" class="byt-floating__topbox-right-close">
                    <basic-icon size="24px" name="https://img.yummall.cn/baiyetong/byt-uni-ui/close.svg"></basic-icon>
                </view>
            </view>
        </view>
        <view class="byt-floating__bottomBox">
            <!-- #ifdef VUE2 -->
            <Conversations
                :items="conversationsList"
                @addItem="addItem"
                :activeKey.sync="conversationsActiveKey"
                v-if="type == 3"
                height="calc(100vh - 44px)"
                width="300px"
            ></Conversations>
            <!-- #endif -->
            <!-- #ifdef VUE3 -->
            <Conversations
                :items="conversationsList"
                @addItem="addItem"
                v-model:activeKey="conversationsActiveKey"
                v-if="type == 3"
                height="calc(100vh - 44px)"
                width="300px"
            ></Conversations>
            <!-- #endif -->
            <view>
                <byt-dialogue :agentId="agentId" :width="AIwidth" :backShow="false" :height="AIheight"></byt-dialogue>
            </view>
        </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef MP -->
    <view style="font-size: 36px; text-align: center">组件不支持小程序，请使用条件编译去除</view>
    <!-- #endif -->
</template>

<script>
// import { BasicButton, BasicIcon, BasicEmpty } from '../../basic';
// 按钮
import BasicButton from '../../basic/basic-button/basic-button.vue';
// 空状态
import BasicEmpty from '../../basic/basic-empty/basic-empty.vue';
// 图标
import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
// import { Conversations } from '../../core';
// 管理对话
import Conversations from '../../core/Conversations/Conversations.vue';
import BytDialogue from '../byt-dialogue/byt-dialogue.vue';
export default {
    name: 'byt-floating',
    components: {
        BasicIcon,
        BasicButton,
        BasicEmpty,
        BytDialogue,
        Conversations
    },
    // update:show:弹窗显示变量变动触发
    //update:type：类型切换变动
    //close：关闭弹窗
    emits: ['update:show', 'update:type', 'close'],
    props: {
        // 弹窗显示
        show: {
            type: Boolean,
            default: false
        },
        // 模式1、悬浮拖动，2、吸附，3、全屏
        type: {
            type: Number,
            default: 1
        },
        // 是否显示组件默认类型切换按钮 ,如果这个设置为true则必须给type双向绑定变量才可以 type.sync
        typeButton: {
            type: Boolean,
            default: false
        },
        agentId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // 是否悬浮
            isFloating: true,
            AIwidth: '375px',
            AIheight: '80vh',

            draggableX: 100, // 初始 X 坐标
            draggableY: 20, // 初始 Y 坐标
            startX: 0, // 触摸开始时的 X 坐标
            startY: 0, // 触摸开始时的 Y 坐标
            isDragging: false, // 是否正在拖动
            // 会话列表当前会话下标
            conversationsActiveKey: 1,
            //会话列表
            conversationsList: [
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
        };
    },
    computed: {
        // 双向绑定弹窗显示隐藏
        showAgent: {
            get() {
                return this.show;
            },
            set(val) {
                this.$emit('update:show', val);
            }
        },
        // 类型双向绑定
        typeAgent: {
            get() {
                return this.type;
            },
            set(val) {
                this.$emit('update:type', val);
            }
        },
        // 根据模式不同响应式样式
        boxStyle() {
            switch (this.typeAgent) {
                case 1:
                    console.log('窗口悬浮');
                    this.AIwidth = '375px';
                    this.AIheight = '80vh';
                    this.isFloating = true;
                    return {
                        position: 'fixed',
                        bottom: '20px',
                        right: '100px'
                    };
                    break;
                case 2:
                    console.log('窗口吸附');
                    this.AIwidth = '375px';
                    this.AIheight = '80vh';
                    this.isFloating = false;
                    return {
                        position: 'fixed',
                        bottom: '0px',
                        right: '0px'
                    };
                    break;
                case 3:
                    console.log('窗口全屏');
                    this.AIwidth = 'calc(100vw - 300px)';
                    this.AIheight = 'calc(100vh - 44px)';
                    this.isFloating = false;
                    return {
                        position: 'fixed',
                        bottom: '0px',
                        right: '0px',
                        width: '100vw',
                        height: '100vh'
                    };
                    break;
                default:
                    console.log('窗口悬浮');
                    this.isFloating = true;
                    return {
                        position: 'fixed',
                        bottom: '20px',
                        right: '100px'
                    };
                    break;
            }
        }
    },
    methods: {
        // 新增会话
        addItem() {
            this.conversationsList.push({
                name: '我是第一个回话' + new Date().getTime(),
                id: new Date().getTime()
            });
        },
        // 按下
        onTouchStart(event) {
            // #ifdef H5
            this.startX = window.innerWidth - event.touches[0].clientX - this.draggableX;
            this.startY = window.innerHeight - event.touches[0].clientY - this.draggableY;
            this.isDragging = true;
            // #endif
            // #ifndef H5
            const systemInfo = uni.getSystemInfoSync();
            this.startX = systemInfo.screenWidth - event.touches[0].clientX - this.draggableX;
            this.startY = systemInfo.screenHeight - event.touches[0].clientY - this.draggableY;
            this.isDragging = true;
            // #endif
        },
        // 拖动
        onTouchMove(event) {
            if (this.isDragging && this.isFloating) {
                // #ifdef H5
                this.draggableX = window.innerWidth - event.touches[0].clientX - this.startX;
                this.draggableY = window.innerHeight - event.touches[0].clientY - this.startY;

                // 可选：限制拖动范围
                // 例如，不允许拖动到屏幕外
                let maxX = window.innerWidth - 385; // 100 是拖动元素的宽度
                let maxY = window.innerHeight - (window.innerHeight * 0.8 + 80); // 100 是拖动元素的高度

                if (this.draggableX < 0) this.draggableX = 0;
                if (this.draggableY < 0) this.draggableY = 0;
                if (this.draggableX > maxX) this.draggableX = maxX;
                if (this.draggableY > maxY) this.draggableY = maxY;
                // #endif

                // #ifndef H5
                const systemInfo = uni.getSystemInfoSync();
                this.draggableX = systemInfo.screenWidth - event.touches[0].clientX - this.startX;
                this.draggableY = systemInfo.screenHeight - event.touches[0].clientY - this.startY;

                // 可选：限制拖动范围
                // 例如，不允许拖动到屏幕外
                let maxX = systemInfo.screenWidth - 385; // 100 是拖动元素的宽度
                let maxY = systemInfo.screenHeight - (systemInfo.screenHeight * 0.8 + 80); // 100 是拖动元素的高度

                if (this.draggableX < 0) this.draggableX = 0;
                if (this.draggableY < 0) this.draggableY = 0;
                if (this.draggableX > maxX) this.draggableX = maxX;
                if (this.draggableY > maxY) this.draggableY = maxY;
                // #endif
            }
        },
        // 停止
        onTouchEnd() {
            this.isDragging = false;
        },

        // 弹窗类型切换
        typeChange(type) {
            this.typeAgent = type;
        },
        // 关闭弹窗
        close() {
            this.$emit('close', false);
            this.showAgent = false;
        }
    }
};
</script>

<style scoped lang="scss">
view {
    box-sizing: border-box;
}

@include b(floating) {
    transition: all 0.2s;
    position: fixed;
    width: 385px;
    bottom: 20px;
    right: 100px;
    padding: 0 0 8px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 0px 10px #f1f1f1;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;

    @include e(topbox) {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 8px 15px;
        justify-content: space-between;
        align-items: center;

        @include eb(left) {
            font-size: 16px;
            font-weight: 600;
        }

        @include eb(right) {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            @include eb(typeButton) {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                margin-right: 24px;

                @include eb(iconBtn) {
                    margin-left: 24px;
                }
            }

            @include eb(close) {
                display: flex;
                align-items: center;
            }
        }
    }

    @include e(bottomBox) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        @include eb(left) {
            flex-shrink: 0;
            width: 380px;
            height: calc(100vh - 50px);
            background-color: #f7f9fc;
            display: flex;
            flex-direction: column;
            padding: 16px 0 0;
            box-sizing: border-box;
            position: relative;

            @include eb(listBox) {
                height: calc(100vh - 50px - 90px);
                overflow: auto;
                padding: 12px 15px;

                @include eb(listItem) {
                    padding: 8px;
                    border-radius: 8px;
                    background-color: white;
                    margin-bottom: 16px;
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
    }
}
</style>
