<template>
    <view class="byt-listPage-wrapper">
        <Navbar bgColor="transparent" :borShow="false">
            <template #title>
                <view class="byt-listPage-wrapper-top">
                    <view class="byt-listPage-wrapper-top-item" v-for="(item, index) in list" :key="index" @click="clickTabs(index)">
                        <text>{{ item.name }}</text>
                        <view class="byt-listPage-wrapper-top-item-line" v-if="index == current"></view>
                    </view>
                </view>
            </template>
        </Navbar>
        <scroll-view class="byt-listPage-content" scroll-y v-if="contentList.length > 0">
            <view
                class="byt-listPage-content-list"
                :class="{ 'byt-listPage-content-list-bg': item.selected }"
                v-for="(item, index) in contentList"
                :key="index"
                @click="toChat(item)"
            >
                <view class="byt-listPage-content-list-img">
                    <image :src="item.agentIcon" class="byt-listPage-content-list-img" />
                </view>
                <view class="byt-listPage-content-list-text">
                    <view class="byt-listPage-text">
                        {{ item.agentName }}
                    </view>
                    <text class="byt-listPage-content-list-desc">
                        {{ item.content || item.description }}
                    </text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import { chatSessionList, chatTechnologyList } from '../common/api.js';
// import { Navbar } from '../components';
// 头部标题组件
import Navbar from '../components/core/Navbar/Navbar.vue';
export default {
    components: {
        Navbar
    },
    data() {
        return {
            current: 0,
            list: [
                // {
                // 	name: '对话',
                // 	vlaue: 0
                // },
                {
                    name: '智能体',
                    value: 1
                }
            ],
            contentList: []
        };
    },
    onLoad() {
        this.clickTabs(this.current);
    },
    methods: {
        getPageList() {
            chatSessionList()
                .then((res) => {
                    let data = res.data;
                    data = data.filter((item) => !(item.content === null && item.isDefault === false));
                    this.contentList = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getAiAgentList(params) {
            chatTechnologyList({
                issueFlag: 0
            })
                .then((res) => {
                    let data = res.data;
                    this.contentList = data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /**
         * 功能：切换tabs
         * @param {Object} value 切换item值
         */
        clickTabs(index) {
            this.current = index;
            this.getAiAgentList();
            // if (this.current === 0) {
            // 	this.getPageList();
            // } else {
            // }
        },
        toChat(item) {
            console.log(item);
            uni.navigateTo({
                url: `/uni_modules/byt-ai-agent-uni/pages/index?agentType=${item.agentType}&agentId=${item.agentId || item.aiAgentId}&agentName=${item.agentName}`
            });
        }
    }
};
</script>

<style lang="scss" scoped>
view {
    box-sizing: border-box;
}

.byt-listPage-wrapper {
    overflow-y: hidden;
    width: 100vw;
    height: 100vh;
    padding-top: 2rpx;
    background: #ffffff url('https://img.yummall.cn/wxapp/study/img/ai-assistant-bg3.png') no-repeat;
    background-size: 100% 100%;

    .byt-listPage-wrapper-top {
        display: flex;
        flex-direction: row;
        align-items: center;

        .byt-listPage-wrapper-top-item {
            margin-right: 8px;
            min-width: 40px;
            height: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;

            text {
                font-size: 28rpx;
            }

            .byt-listPage-wrapper-top-item-line {
                width: 30px;
                height: 3px;
                background-color: #0a82d4;
                margin-top: 2px;
                border-radius: 2px;
            }
        }
    }

    .byt-listPage-content {
        width: 100vw;
        height: calc(100vh - 88px - env(safe-area-inset-bottom) - var(--status-bar-height));

        .byt-listPage-content-list {
            width: 100vw;
            height: 152rpx;
            display: flex;
            align-items: center;
            flex-direction: row;
            padding: 28rpx;

            .byt-listPage-content-list-img {
                border-radius: 50%;
                background-color: #6cd8ff;
                width: 104rpx;
                height: 104rpx;
            }

            .byt-listPage-content-list-text {
                width: 500rpx;
                display: flex;
                height: 86rpx;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 48rpx;

                .byt-listPage-text {
                    font-size: 32rpx;
                }

                .byt-listPage-content-list-desc {
                    font-size: 26rpx;
                    white-space: nowrap;
                    /* 防止换行 */
                    overflow: hidden;
                    /* 隐藏溢出内容 */
                    text-overflow: ellipsis;
                    /* 显示省略号 */
                    color: #666666;
                }
            }
        }

        .byt-listPage-content-list-bg {
            background-color: #fff3f3 !important;
        }
    }
}
</style>
