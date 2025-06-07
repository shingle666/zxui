<template>
    <scroll-view :scroll-top="scrollTop" @scrolltoupper="scrolltoupper" @scroll="handleScroll" :scroll-y="true" :style="{ height: height, width: width }">
        <slot name="header"></slot>
		<view class="history-prompt" v-if="showHistoryPrompt">
			<view class="history-prompt__line"></view>
			<text class="history-prompt__text">下拉查看历史对话</text>
			<view class="history-prompt__line"></view>
		</view>
        <view class="byt-bubbleList-box" v-if="items && items.length > 0">
            <basic-loadmore :status="status" v-if="status === 'loading'" />
            <view v-for="(item, index) in items" :key="item.key">
                <slot name="content" :type="item.type" :index="index"></slot>
                <Bubble
                    :colorIcon="colorIcon"
                    v-if="item.role != 'slot'"
                    :typeWhiteList="typeWhiteList"
                    :contentType="item.contentType"
                    :contentAppendData="item.contentAppendData"
                    :placement="placementAgent(item)"
                    :config="configAgent(item)"
                    :createTime="item.createTime"
                    :content="item.content"
                    :deepSeekContent="item.deepSeekContent"
                    :deepSeekStatus="item.deepSeekStatus"
                    :deepSeekTime="item.deepSeekTime"
                    @response="(e) => setResponse(e, index)"
                >
                    <template #footer>
                        <view style="display: flex; align-items: center">
                            <view v-if="item.contentType != 'greeting' && !loading" class="byt-bubbleList-box-copy" @click="onCopy({ content: item.content })">
                                <image
                                    style="width: 28rpx; height: 28rpx"
                                    :src="colorIcon.copyIcon ? colorIcon.copyIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg'"
                                    mode=""
                                ></image>
                                <text
                                    class="byt-bubbleList-box-copy__text"
                                    :style="{ color: colorIcon.textMainColor ? colorIcon.textMainColor : '#1890ff', 'margin-left': '8rpx' }"
                                >
                                    复制
                                </text>
                            </view>

                            <view class="byt-bubbleList-box-copy" v-if="verifyPermission('action', item.contentType)">
                                <image
                                    style="width: 28rpx; height: 28rpx"
                                    :src="colorIcon.actionIcon ? colorIcon.actionIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg'"
                                    mode=""
                                ></image>
                                <text
                                    class="byt-bubbleList-box-copy__text is-action"
                                    :style="{ color: colorIcon.textMainColor ? colorIcon.textMainColor : '#1890ff', 'margin-left': '8rpx' }"
                                >
                                    做活动
                                </text>
                            </view>
                            <view v-if="item.contentType != 'greeting' && !loading" class="byt-bubbleList-box-copy" @click="setResponse({ type: 'resize' }, index)">
                                <image
                                    style="width: 28rpx; height: 28rpx"
                                    :src="colorIcon.refreshIcon ? colorIcon.refreshIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg'"
                                    mode=""
                                ></image>
                                <text
                                    class="byt-bubbleList-box-copy__text"
                                    :style="{ color: colorIcon.textMainColor ? colorIcon.textMainColor : '#1890ff', 'margin-left': '8rpx' }"
                                >
                                    重新提问
                                </text>
                            </view>
                        </view>
                    </template>
                </Bubble>
            </view>

            <view class="list-bottom" style="height: 50px"></view>
        </view>
        <slot name="footer"></slot>

        <!-- 自动到最底部的开关 待开发 -->
        <view v-if="false" class="bubbleList-box-auto-bottom">
            <image :style="{ transform: 'rotate(90deg)' }" src="https://img.yummall.cn/baiyetong/byt-uni-ui/right.svg" mode=""></image>
        </view>
    </scroll-view>
</template>

<script>
// 消息对话框
import Bubble from '../Bubble/Bubble.vue';
// import { BasicLoadmore } from '../../basic';
// 加载更多
import BasicLoadmore from '../../basic/basic-loadmore/basic-loadmore.vue';
import { isJsonString } from '../../../utils/index.js';
export default {
    name: 'BubbleList',
    components: {
        Bubble,
        BasicLoadmore
    },
    emits: ['response', 'scrolltoupper','handleScroll'],
    props: {
        // 主题色和图标
        colorIcon: {
            type: Object,
            default: () => {
                return {
                    // 主题色
                    mainColor: '#448ef7',
                    // 辅助色
                    assistColor: '#a8ecff',
                    // 字体主色
                    textMainColor: '#1890ff',
                    // 复制按钮图标
                    copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg',
                    // 重新提问图标
                    refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg',
                    // 做活动按钮图标
                    actionIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg'
                };
            }
        },
        // 支持的消息类型
        typeWhiteList: {
            type: Array,
            default: () => {
                return ['text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'];
            }
        },
        // 列表数据规则
        roles: {
            type: Object,
            default: () => {
                return {
                    // AI助手
                    ai: {
                        // 有名称就显示，没有就不显示
                        name: 'AI助手',
                        // 头像
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg',
                        // 位置
                        placement: 'start'
                    },
                    // 用户
                    user: {
                        name: '用户名称1',
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/default_avatar.png',
                        placement: 'end'
                    }
                };
            }
        },
        // 列表数据
        items: {
            type: Array,
            default: () => {
                return [
                    {
                        key: '121412424',
                        createTime: '2033-09-09 12:12:12',
                        role: 'ai',
                        content: '我是AI角色',
                        // 内容类型：'text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'
                        contentType: 'text',
                        deepSeekContent: ''
                    },
                    {
                        key: '121412424',
                        createTime: '2033-09-09 12:12:12',
                        role: 'user',
                        content: '我是用户角色',
                        // 内容类型：'text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'
                        contentType: 'text',
                        deepSeekContent: ''
                    }
                ];
            }
        },
        // 高度
        height: {
            type: String,
            default: '100%'
        },
        // 宽度
        width: {
            type: String,
            default: '100%'
        },
        // 滚动条位置
        scrollTop: {
            type: Number,
            default: 0
        },
        // 加载状态
        status: {
            type: String,
            default: 'loadmore'
        },
        //消息回复中...
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
			showHistoryPrompt: true
		};
    },
    async mounted() {},
    computed: {},
    methods: {
        // 做活动工具显示逻辑
        verifyPermission(type, contentType) {
            let permission = this.typeWhiteList.includes(type);
            let tempContentType = contentType == type;
            if (type == 'chart') {
                tempContentType = contentType.startsWith('chart');
            }
            return tempContentType && permission;
        },
        // 复制
        onCopy(item) {
            console.log('复制', item.content);
            const message = item.content;
            uni.setClipboardData({
                data: message,
                success: function () {
                    console.log('复制成功');
                }
            });
        },
        placementAgent(item) {
            return this.roles[item.role] ? this.roles[item.role].placement : 'start';
        },
        configAgent(item) {
            return this.roles[item.role] || {};
        },
        // 消息气泡方法抛出
        setResponse(e, index) {
            this.$emit('response', e, index);
        },
        // 滚动到顶部
        scrolltoupper() {
          console.log('触发滚动到顶部');
			     this.showHistoryPrompt = false;
            this.$emit('scrolltoupper');
        },
		handleScroll(e){
			this.$emit('handleScroll',e.detail)
		}
    }
};
</script>

<style lang="scss" scoped>
.bubbleList-box-auto-bottom {
    position: fixed;
    bottom: 15vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 66rpx;
    height: 66rpx;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: white;
    z-index: 999999;
    box-shadow: 0px 8rpx 10px 0px rgba(0, 0, 0, 0.3);
    margin: 20px auto;

    image {
        width: 36rpx;
        height: 36rpx;
    }
}
@include b(bubbleList-box) {
    max-width: 1800rpx;
    margin: 0 auto;

    @include eb(copy) {
        display: flex;
        align-items: center;
        margin-right: 30rpx;

        @include e(text) {
            margin-left: 10rpx;
            color: #1aa0ff;
            font-size: 24rpx;
            white-space: nowrap;

            &.is-action {
                color: #8848cb;
            }
        }
    }
}
.history-prompt {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 48rpx 0;
		padding: 20px 32rpx;

		&__line {
			width: 64rpx;
			height: 1px;
			background: rgba(0, 0, 0, 0.1);
		}

		&__text {
			padding: 0 20rpx;
			font-size: 24rpx;
			color: rgba(0, 0, 0, 0.4);
			white-space: nowrap;
		}
	}
</style>
