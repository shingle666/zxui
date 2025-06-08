<template>
    <view class="byt-message">
        <view v-if="createTime" class="byt-message__time">{{ createTime }}</view>
        <view
            class="byt-message__content is-wide"
            :class="{
                'is-auto': isAuto,
                'is-mine': !isAuto,
                'is-avatar': configAgent.avatar,
                'is-username': configAgent.name
            }"
        >
            <!-- 头像 -->
            <view v-if="configAgent.avatar" class="byt-message__content-avatar">
                <basic-icon size="62rpx" shape="circle" :name="configAgent.avatar"></basic-icon>
            </view>
            <view class="byt-message__content-box" :style="{ background: !isAuto ? (colorIcon.userBgColor ? colorIcon.userBgColor : '#448ef7') : '', opacity: 0.95 }">
                <!-- 用户名称 -->
                <view v-if="configAgent.name" class="byt-message__content-box__username">
                    {{ configAgent.name }}
                </view>
                <!-- 左边 -->
                <template v-if="isAuto">
                    <!-- 发送 -->
                    <view v-if="verifyPermission('send')" class="byt-message__content-box__text byt-message__content-box--default" style="padding-bottom: 14rpx">
                        <zero-markdown-view :markdown="msgContent(content)"></zero-markdown-view>
                        <text class="byt-message__content-box__text-btn" style="margin-left: 0" @click="onSend">去发送</text>
                    </view>
                    <view v-else>
                        <!-- 深度思考回答格式化组件 -->
                        <Think v-if="deepSeekContent" :status="deepSeekStatus" :time="deepSeekTime" :content="deepSeekContent"></Think>
                        <!-- 文本或者图文 -->
                        <zero-markdown-view :markdown="msgContent(content)"></zero-markdown-view>
                    </view>

                    <!-- 图表 -->
                    <Chart v-if="verifyPermission('chart')" :type="contentType" :dataObj="contentAppendData"></Chart>
                    <!-- 表格 -->
                    <Tables v-if="verifyPermission('tables')" :columns="JSON.parse(contentAppendData).tableColumns" :data="JSON.parse(contentAppendData).tableData"></Tables>
                    <!-- 活动  -->
                    <Activity v-if="verifyPermission('activity')" :items="JSON.parse(contentAppendData)"></Activity>
                    <!-- 优惠券 -->
                    <Coupon v-if="verifyPermission('coupon')" :items="JSON.parse(contentAppendData)"></Coupon>
                    <!-- 商品 -->
                    <Goods v-if="verifyPermission('goods')" :items="JSON.parse(contentAppendData)"></Goods>

                    <!-- 功能栏 -->
                    <view class="byt-message__content-box__response">
                        <slot name="footer"></slot>
                    </view>
                </template>
                <!-- 右边 -->
                <template v-else>
                    <view class="byt-message__content-box__text" :style="{ color: colorIcon.userTextColor ? colorIcon.userTextColor : '#FFFFFF' }">
                        <zero-markdown-view :markdown="msgContent(content)"></zero-markdown-view>
                    </view>
                </template>
            </view>
        </view>
    </view>
</template>

<script>
import Think from '../Think/Think.vue';
import { Group, isJsonString, getCurrentDateTime } from '../../../utils/index.js';
import zeroMarkdownView from './components/zero-markdown-view/components/zero-markdown-view/zero-markdown-view.vue';
// import { BasicIcon } from '../../basic';
// 图标
import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
// 活动
import Activity from '../Activity/Activity.vue';
// 优惠券
import Coupon from '../Coupon/Coupon.vue';
// 商品
import Goods from '../Goods/Goods.vue';
// 图表
import Chart from '../Chart/Chart.vue';
// 表格
import Tables from '../Tables/Tables.vue';

export default {
    name: 'Bubble',
    components: {
        BasicIcon,
        Activity,
        Coupon,
        Goods,
        Chart,
        Tables,
        zeroMarkdownView,
        Think
    },
    emits: ['response'],
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

                    // 渐变色
                    linearColor: '#00E1CA,#90F3D0',

                    // 用户消息字体颜色
                    userTextColor: '#FFFFFF',
                    // 用户消息背景色
                    userBgColor: '#448ef7'
                };
            }
        },
        // 信息位置 start | end
        placement: {
            type: String,
            default: 'start'
        },
        // 消息类型：目前 'text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'
        contentType: {
            type: String,
            default: 'text'
        },
        config: {
            type: Object,
            default: () => {
                return {
                    // 有名称就显示，没有就不显示
                    name: 'AI助手',
                    // 头像
                    avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg',
                    // 位置
                    placement: 'start'
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
        // 图表或者表格的数据
        contentAppendData: {
            type: String || null,
            default: null
        },
        // 创建时间
        createTime: {
            type: String,
            default: ''
        },
        // 消息内容
        content: {
            type: String,
            default: ''
        },
        // 深度思考回答
        deepSeekContent: {
            type: String,
            default: ''
        },
        // 深度思考状态
        deepSeekStatus: {
            type: Boolean,
            default: false
        },
        // 深度思考时间
        deepSeekTime: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {};
    },
    async mounted() {},
    computed: {
        // 是否在左边
        isAuto() {
            return this.placement === 'start';
        },
        // 配置项代理判空
        configAgent() {
            return this.config || {};
        }
    },
    methods: {
        isJsonString,
        // 流式markdown语法优化
        msgContent(content) {
            if (!content) {
                return content;
            }
            let htmlString = content;
            if (htmlString[htmlString.length - 1] != '\n') {
                htmlString += '\n';
            }
            return htmlString;
        },
        // 根据类型和权限显示消息组件
        verifyPermission(type) {
            let permission = this.typeWhiteList.includes(type);
            let tempContentType = this.contentType == type;
            if (type == 'chart') {
                tempContentType = this.contentType.startsWith('chart');
            }
            return tempContentType && permission;
        },
        // 图片消息保存图片
        previewImage(url) {
            uni.previewImage({
                // showmenu:true,
                current: 1,
                urls: [url],
                longPressActions: {
                    itemList: ['保存图片'],
                    success(data) {
                        that.saveImage(url);
                    },
                    fail: function (err) {
                        console.log(err.errMsg);
                    }
                }
            });
        },
        saveImage(src) {
            uni.downloadFile({
                url: src,
                success: function (res) {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: function () {
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                            },
                            fail: function (err) {
                                console.log('保存失败：', err);
                            }
                        });
                    }
                },
                fail: function (err) {
                    console.log('下载失败：', err);
                }
            });
        },
        // 去发送
        onSend() {
            console.log('去发送');
            this.$emit('response', {
                type: 'send'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(message) {
    @include e(time) {
        text-align: center;
        margin: 24rpx 0;
        font-size: 24rpx;
        color: #949099;
    }

    @include e(content) {
        display: flex;
        padding: 0 24rpx;
        margin: 32rpx 0;
        $selector: &;

        @include eb(box) {
            position: relative;
            // padding: 28rpx 32rpx;
            padding: 8rpx 24rpx;
            border-radius: 0 24rpx 24rpx 24rpx;
            background: rgba(255, 255, 255, 0.9);
            // max-width: 574rpx;
            max-width: 740rpx;
            box-sizing: border-box;

            @include e(text) {
                white-space: break-spaces;
                word-break: break-all;
                line-height: 48rpx;
                font-size: 28rpx;
                min-width: 0;

                @include eb(btn) {
                    font-size: 14px;
                    color: #8848cb;
                    margin-left: 10px;
                }
            }

            @include e(btn) {
                padding: 16rpx 26rpx;
                border-radius: 60rpx;
                background: #3378ff14;
                color: #3378ffff;
                flex-shrink: 0;
            }

            @include e(response) {
                padding: 10rpx 16rpx;
                border-radius: 4px;
                // border: 0.5px solid #2979ff7a;
                left: 0rpx;
                bottom: -50rpx;
                position: absolute;
                display: flex;
                align-items: center;
                width: 100%;
            }

            @include m(default) {
                color: #333333;
            }

            @include e(username) {
                display: none;
                position: absolute;
                top: -44rpx;
                color: #666666;
                font-size: 28rpx;
                white-space: nowrap;
            }
        }

        @include eb(avatar) {
            display: none;
            width: 62rpx;
            height: 62rpx;
            position: relative;
            top: -10rpx;
        }

        &.is-avatar {
            #{$selector + '-box'} {
                max-width: 610rpx;
            }

            #{$selector + '-avatar'} {
                display: block;
            }
        }

        &.is-username {
            #{$selector + '-box'} {
                margin-top: 40rpx;

                @include e(username) {
                    display: block;
                    white-space: nowrap;
                    max-width: 200rpx;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }

        &.is-auto {
            flex-direction: row;

            #{$selector + '-box'} {
                margin-bottom: 60rpx;

                @include e(username) {
                    left: 0;
                }

                @include e(text) {
                    min-width: 60rpx;
                }
            }

            #{$selector + '-avatar'} {
                margin-right: 16rpx;
            }
        }

        &.is-mine {
            flex-direction: row-reverse;

            #{$selector + '-box'} {
                margin-left: 16rpx;
                position: relative;
                // padding: 28rpx 32rpx;
                border-radius: 24rpx 0 24rpx 24rpx;
                background: rgba(26, 160, 255, 0.9);
                color: white;

                @include e(text) {
                    color: white;
                }

                @include e(username) {
                    right: 0;
                    text-align: right;
                }
            }

            #{$selector + '-avatar'} {
                margin-left: 16rpx;
            }
        }

        &.is-wide {
            #{$selector + '-box'} {
                max-width: calc(100% - 40px);
            }
        }
    }
}
</style>
