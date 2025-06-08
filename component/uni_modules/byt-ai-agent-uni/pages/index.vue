<template>
    <view>
        <byt-dialogue :config="agentConfig" :agentId="agentId" :agentName="agentName"></byt-dialogue>
    </view>
</template>

<script>
// import { BytDialogue } from '../components';
import BytDialogue from '../components/agent-dialogue/byt-dialogue/byt-dialogue.vue';
export default {
    component: {
        BytDialogue
    },
    data() {
        return {
            agentType: '',
            agentId: '',
            agentName: ''
        };
    },
    onLoad(option) {
        this.agentType = option.agentType;
        this.agentId = option.agentId;
        // 解决小程序query中文乱码
        this.agentName = decodeURIComponent(option.agentName);
        console.log('当前生成的内容是：' + this.agentType + ',' + this.agentId + ',' + this.agentName);
    },
    computed: {
        // ...mapGetters({
        // 	userInfo: 'getUserInfo',
        // }),
        // 配置项
        agentConfig: function () {
            return {
                // 颜色和图标
                colorIcon: {
                    // 主题色
                    mainColor: '#B6F85E',
                    // 辅助色
                    assistColor: '#EBFFD1',
                    // 字体主色
                    textMainColor: '#74CB00',
                    // 渐变色
                    linearColor: '#00E1CA,#90F3D0',

                    // 用户消息字体颜色
                    userTextColor: '#010103',
                    // 用户消息背景色
                    userBgColor: '#EBFFD1',

                    // 复制按钮图标
                    copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy_2.svg',
                    // 重新提问图标
                    refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh——2.svg',

                    // 猜你想问背景颜色
                    // -webkit-linear-gradient(top, #e9faf3,#90F3D0 200rpx)
                    guessBgColor: 'url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMeng1111.svg)',
                    // 猜你想问换一换 字体颜色
                    guessChangeColor: '#04D4BE',
                    // 猜你想问换一换图标
                    guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/huanyihuan.svg',
                    //猜你想问文字头部左边图标
                    guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/cainixiaowenpng.png',

                    // 发送框左边图标
                    sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft.svg',
                    // 发送框右边发送按钮
                    sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/newFasong.svg',
                    // 发送框快速提问关闭图标
                    sendQuickCloseIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose2.svg',
                    // 发送框快速提问内容左侧图标
                    sendQuickContentLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon12.svg'
                },
                // 头部启动栏
                startup: {
                    // 我是红商AI助手。您可以输入任何想要创作图像的主题，我们将为您创作。
                    tip: '我是红商AI助手。您有任何关于红商集团的问题，我可以随时帮您解答。',
                    avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_2.svg', // 1,2
                    // 头像回答旋转动效图标
                    rotateIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xuanzhuan.png',
                    // 欢迎语右边背景图标
                    rightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/AIrightbgimg.png'
                },
                // 主体内容
                main: {
                    // 背景色
                    // (1.数字类型， 1-4
                    // background: 1,
                    // (2.对象类型 { type: 'image' | 'linear' | 'coLor' }
                    // background: {
                    // 	type: 'image',
                    // 	url: "https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg", // 1-4
                    // },
                    background: {
                        type: 'linear',
                        url: '-webkit-linear-gradient(top,#f1fcf2 0%,#f8fdf5 44%, #EBFFD1 100%)' // 1-4
                    },
                    // background: {
                    // 	type: 'color',
                    // 	url: "rgb(217 224 255)", // 1-4
                    // },
                    // 背景角色
                    role: 1 // 1-4
                },
                // 发送框工具栏功能
                toolList: [
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
                ],
                // 更多工具
                moreList: [
                    {
                        id: 1,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe1.svg',
                        name: '拍摄'
                    },
                    {
                        id: 1,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce1.svg',
                        name: '相册'
                    },
                    {
                        id: 2,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin1.svg',
                        name: '录音'
                    },
                    {
                        id: 2,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang1.svg',
                        name: '文档'
                    }
                ],

                // // 颜色和图标
                // colorIcon: {
                //     // 主题色
                //     mainColor: '#448ef7',
                //     // 辅助色
                //     assistColor: '#a8ecff',
                //     // 字体主色
                //     textMainColor: '#1890ff',
                //     // 渐变色
                //     linearColor: '#27c9ff,#a8ecff',

                //     // 用户消息字体颜色
                //     userTextColor: '#FFFFFF',
                //     // 用户消息背景色
                //     userBgColor: '#448ef7',

                //     // 做活动按钮图标
                //     actionIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg',
                //     // 复制按钮图标
                //     copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg',
                //     // 重新提问图标
                //     refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg',

                //     // 猜你想问背景颜色
                //     guessBgColor: 'url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMengDefauld.svg)',
                //     // 猜你想问换一换 字体颜色
                //     guessChangeColor: '#1890ff',
                //     // 猜你想问换一换图标
                //     guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg',
                //     //猜你想问文字头部左边图标
                //     guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg',

                //     // 发送框左边图标
                //     sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft233.svg',
                //     // 发送框右边发送按钮
                //     sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg'
                // },
                // // 头部启动栏欢迎语
                // startup: {
                //     // 欢迎语
                //     tip: '我是红商AI助手。您有任何关于红商集团的问题，我可以随时帮您解答。',
                //     //欢迎语人物头像
                //     avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
                //     // 头像回答旋转动效图标
                //     rotateIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png',
                //     // 欢迎语右边背景图标
                //     rightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'
                // },
                // // 主体内容
                // main: {
                //     // 背景色
                //     // (1.数字类型， 1-4
                //     background: 1,
                //     // (2.对象类型 { type: 'image' | 'linear' | 'coLor' }
                //     //背景图片
                //     // background: {
                //     // 	type: 'image',
                //     // 	url: "https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg", // 1-4
                //     // },
                //     //渐变色
                //     // background: {
                //     // 	type: 'linear',
                //     // 	url: "-webkit-linear-gradient(top, #ffffff, #f3f4f8 120rpx)", // 1-4
                //     // },
                //     //纯色
                //     // background: {
                //     // 	type: 'color',
                //     // 	url: "rgb(217 224 255)", // 1-4
                //     // },
                //     // 背景角色图片
                //     role: 1 // 1-4
                // },
                // // 发送框工具栏功能
                // toolList: [
                //     {
                //         id: 1,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu.svg',
                //         activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu_active2.svg',
                //         name: '深度思考'
                //     },
                //     {
                //         id: 2,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang.svg',
                //         activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang_avtive2.svg',
                //         name: '联网搜索'
                //     }
                // ],
                // // 更多工具
                // moreList: [
                //     {
                //         id: 1,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe.svg',
                //         name: '拍摄'
                //     },
                //     {
                //         id: 1,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce.svg',
                //         name: '相册'
                //     },
                //     {
                //         id: 2,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin.svg',
                //         name: '录音'
                //     },

                //     {
                //         id: 2,
                //         icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang.svg',
                //         name: '文档'
                //     }
                // ],

                // 更多工具显示开关
                moreListShow: true,
                // 快速提问显示开关
                quickShow: true,

                // 猜你喜欢
                guess: true,
                // 音频识别
                audio: true,
                // 基础消息配置
                message: {
                    // 等待状态提示语
                    answerWait: 'AI助手思考中',
                    // 问候语
                    greeting: '您好！有什么可以帮助您的？'
                },
                // 支持的消息类型
                typeWhiteList: ['text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'],
                // 消息角色配置
                roles: {
                    // AI助手消息配置
                    ai: {
                        // 有名称就显示，没有就不显示
                        name: 'AI助手',
                        // 头像
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_2.svg', // 1,2
                        // 位置
                        placement: 'start'
                    },
                    // 用户消息配置
                    user: {
                        name: '用户名称1',
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg',
                        placement: 'end'
                    }
                },
                // 用户信息
                userInfo: {
                    // userId: this.userInfo.userId,
                    userId: '1670672134393978882'
                }
            };
        }
    }
};
</script>

<style lang="scss" scoped></style>
