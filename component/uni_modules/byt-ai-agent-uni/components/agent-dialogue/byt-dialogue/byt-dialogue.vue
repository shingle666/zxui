<template>
    <view class="byt-aidialogue" :class="{ 'is-default-bg': !config.main.background }" :style="aidialogueStyle">
        <!-- 头部 -->
        <Navbar :title="agentNameAgent" bgColor="transparent" :backShow="backShow" :borShow="false">
            <slot></slot>
        </Navbar>
        <!-- 主体 -->
        <view class="byt-aidialogue-bg">
            <!-- 背景角色 -->
            <image v-if="config.main.role" class="byt-aidialogue-bg__role" :src="`https://img.yummall.cn/baiyetong/byt-uni-ui/role_${config.main.role}.svg`"></image>

            <!-- 欢迎栏 -->
            <Welcome
                :colorIcon="colorIconAgent"
                class="byt-aidialogue-bg--float"
                :show="timerShow"
                :description="config.startup.tip"
                :icon="config.startup.avatar"
                :rightIcon="config.startup.rightIcon"
                :rotateIcon="config.startup.rotateIcon"
            ></Welcome>
            <!-- 消息列表 -->
            <view
                class="byt-aidialogue-content byt-aidialogue-bg--float"
                :style="{
                    height: `calc(100% - 50px - 350rpx - env(safe-area-inset-bottom) - ${statusBarHeight + 'px'} - ${moreShow ? '100px' : '0px'})`,
                    transition: 'all 0.2s linear'
                }"
            >
                <BubbleList
                    :colorIcon="colorIconAgent"
                    :typeWhiteList="config.typeWhiteList"
                    :roles="config.roles"
                    :items="bubbleItems"
                    :scrollTop="scrollTop"
                    @scrolltoupper="onPull"
                    :status="recordLoading"
                    @response="setResponse"
                    :loading="answerStatus"
                >
                    <template v-slot:content="{ type }">
                        <Prompts
                            :colorIcon="colorIconAgent"
                            v-if="type == 3 && config.guess"
                            :aiAgentId="agentIdAgent"
                            btnKey="problemCategoryName"
                            textKey="problemName"
                            @itemClick="problemClick"
                        ></Prompts>
                    </template>
                    <template #footer>
                        <view v-if="resizeBtnShow" style="display: flex; flex-direction: row; justify-content: center; align-items: center; margin-top: 24rpx">
                            <basic-icon
                                size="32rpx"
                                style="height: 32rpx"
                                :name="colorIconAgent.refreshIcon ? colorIconAgent.refreshIcon : 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg'"
                            ></basic-icon>
                            <text @click="wxResize" :style="{ color: colorIconAgent.textMainColor ? colorIconAgent.textMainColor : '#1890ff', 'margin-left': '8rpx' }">
                                重新链接
                            </text>
                        </view>
                    </template>
                </BubbleList>
            </view>

            <!-- 输入框 -->
            <view>
                <!-- #ifdef VUE2 -->
                <Sender
                    :colorIcon="colorIconAgent"
                    :loading="answerStatus"
                    :audioShow="config.audio"
                    :quickShow="config.quickShow"
                    :moreListShow="config.moreListShow"
                    :microphone.sync="microphone"
                    :message.sync="message"
                    @focus="onFocus"
                    @submit="setMessage"
                    :slotTopShow="toolListShow"
                    :moreShow.sync="moreShow"
                    :moreList="moreListAgent"
                >
                    <template v-if="toolListShow" #top>
                        <ToolList :colorIcon="colorIconAgent" :items="toolListAgent" :activeList.sync="activeList"></ToolList>
                    </template>
                </Sender>
                <!-- #endif -->
                <!-- #ifdef VUE3 -->
                <Sender
                    :colorIcon="colorIconAgent"
                    :loading="answerStatus"
                    :audioShow="config.audio"
                    :quickShow="config.quickShow"
                    :moreListShow="config.moreListShow"
                    v-model:microphone="microphone"
                    v-model:message="message"
                    @focus="onFocus"
                    @submit="setMessage"
                    :slotTopShow="toolListShow"
                    v-model:moreShow="moreShow"
                    :moreList="moreListAgent"
                >
                    <template v-if="toolListShow" #top>
                        <ToolList :colorIcon="colorIconAgent" :items="toolListAgent" v-model:activeList="activeList"></ToolList>
                    </template>
                </Sender>
                <!-- #endif -->
            </view>
        </view>
    </view>
</template>

<script>
import { Group, isJsonString, getCurrentDateTime, isEmpty, showToast, debounce } from '../../../utils/index.js';
import { chatClearMessage, chatGuessProblem, chatHistoryList, chatOpenNewHistory, chatTechnologyDetail, getDefaultAgent } from '../../../common/api.js';

// import { BasicButton, BasicIcon, BasicLoadmore } from '../../basic';
// 按钮
import BasicButton from '../../basic/basic-button/basic-button.vue';
// 图标
import BasicIcon from '../../basic/basic-icon/basic-icon.vue';
// 加载更多
import BasicLoadmore from '../../basic/basic-loadmore/basic-loadmore.vue';
// import { Navbar, Welcome, Prompts, Bubble, Sender, BubbleList } from '../../core';
// 猜你想问
import Prompts from '../../core/Prompts/Prompts.vue';
// 对话气泡组件
import Bubble from '../../core/Bubble/Bubble.vue';
// 对话气泡组件列表
import BubbleList from '../../core/BubbleList/BubbleList.vue';
// 欢迎语
import Welcome from '../../core/Welcome/Welcome.vue';
// 头部标题组件
import Navbar from '../../core/Navbar/Navbar.vue';
// 输入框
import Sender from '../../core/Sender/Sender.vue';
// 工具列表组件
import ToolList from '../../core/ToolList/ToolList.vue';

import baseConfig from '../../../common/config.js';
const { wsUrl, wsChartPath, getToken } = baseConfig;

export default {
    components: {
        BasicIcon,
        BasicButton,
        BasicLoadmore,
        Welcome,
        Prompts,
        Bubble,
        BubbleList,
        Navbar,
        Sender,
        ToolList
    },
    props: {
        config: {
            type: Object,
            default: () => ({
                // 颜色和图标
                colorIcon: {
                    // 主题色
                    mainColor: '#448ef7',
                    // 辅助色
                    assistColor: '#a8ecff',
                    // 字体主色
                    textMainColor: '#1890ff',
                    // 渐变色
                    linearColor: '#27c9ff,#a8ecff',

                    // 用户消息字体颜色
                    userTextColor: '#FFFFFF',
                    // 用户消息背景色
                    userBgColor: '#448ef7',

                    // 做活动按钮图标
                    actionIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/action.svg',
                    // 复制按钮图标
                    copyIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/copy.svg',
                    // 重新提问图标
                    refreshIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/refresh.svg',

                    // 猜你想问背景颜色
                    guessBgColor: 'url(https://img.yummall.cn/baiyetong/byt-uni-ui/whiteMengDefauld.svg)',
                    // 猜你想问换一换 字体颜色
                    guessChangeColor: '#1890ff',
                    // 猜你想问换一换图标
                    guessChange: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_change.svg',
                    //猜你想问文字头部左边图标
                    guessIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/guess_icon.svg',

                    // 发送框左边图标
                    sendLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendLeft233.svg',
                    // 发送框右边发送按钮
                    sendRightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/sendBtn.svg',
                    // 发送框快速提问关闭图标
                    sendQuickCloseIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIconClose.svg',
                    // 发送框快速提问内容左侧图标
                    sendQuickContentLeftIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/quickIcon1.svg'
                },
                // 头部启动栏欢迎语
                startup: {
                    // 欢迎语
                    tip: '我是红商AI助手。您有任何关于红商集团的问题，我可以随时帮您解答。',
                    //欢迎语人物头像
                    avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
                    // 头像回答旋转动效图标
                    rotateIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_icon_outline.png',
                    // 欢迎语右边背景图标
                    rightIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/header_banner_right.png'
                },
                // 主体内容
                main: {
                    // 背景色
                    // (1.数字类型， 1-4
                    background: 1,
                    // (2.对象类型 { type: 'image' | 'linear' | 'coLor' }
                    //背景图片
                    // background: {
                    // 	type: 'image',
                    // 	url: "https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg", // 1-4
                    // },
                    //渐变色
                    // background: {
                    // 	type: 'linear',
                    // 	url: "-webkit-linear-gradient(top, #ffffff, #f3f4f8 120rpx)", // 1-4
                    // },
                    //纯色
                    // background: {
                    // 	type: 'color',
                    // 	url: "rgb(217 224 255)", // 1-4
                    // },
                    // 背景角色图片
                    role: 1 // 1-4
                },
                // 发送框工具栏功能
                toolList: [
                    {
                        id: 1,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu.svg',
                        activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/shendu_active2.svg',
                        name: '深度思考'
                    },
                    {
                        id: 2,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang.svg',
                        activeiIcon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/lianwang_avtive2.svg',
                        name: '联网搜索'
                    }
                ],
                // 更多工具
                moreList: [
                    {
                        id: 1,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/paishe.svg',
                        name: '拍摄'
                    },
                    {
                        id: 1,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/xiangce.svg',
                        name: '相册'
                    },
                    {
                        id: 2,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/luyin.svg',
                        name: '录音'
                    },

                    {
                        id: 2,
                        icon: 'https://img.yummall.cn/baiyetong/byt-uni-ui/wendang.svg',
                        name: '文档'
                    }
                ],
                // 更多工具显示开关
                moreListShow: true,
                // 快速提问显示开关
                quickShow: true,

                // 猜你喜欢提示语组件显示开关
                guess: false,
                // 输入框音频识别开关
                audio: true,
                // 基础消息配置
                message: {
                    // 回答等待状态提示语
                    answerWait: 'AI助手思考中',
                    // 打开组件问候语
                    greeting: '您好！有什么可以帮助您的？'
                },
                // 支持的消息类型，目前支持 text、chart，其他类型后续待开发
                typeWhiteList: ['text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'],
                // 消息角色配置
                roles: {
                    // AI助手消息配置
                    ai: {
                        // 有名称就显示，没有就不显示
                        name: 'AI助手',
                        // 头像
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/role_icon_1.svg', // 1,2
                        // 位置
                        placement: 'start'
                    },
                    // 用户消息配置
                    user: {
                        name: '用户名称1',
                        avatar: 'https://img.yummall.cn/baiyetong/byt-uni-ui/default_avatar.png',
                        placement: 'end'
                    }
                },
                // 业务用户信息
                userInfo: {
                    //用户id必传，查询历史消息需要
                    userId: '1670672134393978882'
                }
            })
        },
        //ai对话智能体id(必传！！)没有则不可使用
        //1、如果有智能体列表页面（例如listHome页面）的项目，只需要根据token查询平台下的智能体列表，点击对应智能体，将id传给组件即可使用
        //2、如果没有则需要向后端询问查询平台默认智能体对象的接口，在打开对话组件之前先调用获取智能体对象，将id传给组件即可使用
        agentId: {
            type: String,
            default: '',
            required: true
        },
        //对话头部名称
        agentName: {
            type: String,
            default: 'AI助手'
        },
        //整体宽度
        width: {
            type: String,
            default: '100%'
        },
        //整体宽度
        height: {
            type: String,
            default: '100vh'
        },
        // 是否显示头部页面返回按钮
        backShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            // 回答的图片地址数据缓存
            answerImgSrcShow: false,
            answerImgSrc: '',

            // 更多显示
            moreShow: false,

            // 手机状态栏高度
            statusBarHeight: 0,

            // 搜索框工具栏激活功能key数组
            activeList: [],

            // 代理智能体id
            agentIdAgent: '',
            // 代理智能体名称
            agentNameAgent: '',

            // wx通信重新链接限制
            wxFailureRetryLimit: 3,
            // 重试次数
            wxFailureRetryNum: 0,
            // 重试次数达到限制出现的按钮
            resizeBtnShow: false,

            uuid: '',
            loading: false,
            recordList: this.config.guess
                ? [
                      {
                          type: 3
                      }
                  ]
                : [],
            // 查询参数
            queryParams: {
                pagination: {
                    pageNum: 0,
                    pageSize: 10
                },
                dialogueHistoryNo: ''
            },
            recordLoading: 'loadmore',
            answerStatus: false,
            answerChart: false,
            inputStyle: {
                height: '80rpx',
                padding: '16rpx 24rpx'
            },
            message: null,
            microphone: false,
            listHeight: '76vh',
            dataList: [],
            socketTask: null,
            // 确保websocket是打开状态
            is_open_socket: false,
            timer: null,
            timerShow: false,
            jumpTimer: null,
            historyId: '',
            contentHeight: '',
            scrollTop: 99999999,
            // 确认是否为大屏
            wideScreenWidth: 700,
            isWideScreen: false,
            // 智能体详情
            aiForm: {},
            taskOrnamentStr: null
        };
    },
    computed: {
        // 工具栏是否显示
        toolListShow() {
            return this.config.toolList && this.config.toolList.length > 0;
        },
        // 工具栏
        toolListAgent() {
            return this.config.toolList ? this.config.toolList : [];
        },
        // 更多工具
        moreListAgent() {
            return this.config.moreList ? this.config.moreList : [];
        },
        // 主题色和图标代理
        colorIconAgent() {
            return this.config.colorIcon ? this.config.colorIcon : {};
        },
        // 消息列表格式化数据
        bubbleItems: function () {
            const list = this.recordList.map((item) => {
                return {
                    // 业务数据，可以插槽使用
                    ...item,
                    // key
                    key: item.serialNo,
                    // 创建时间
                    createTime: item.createTime,
                    // 角色信息
                    role: item.type == 1 ? 'user' : item.type == 2 ? 'ai' : 'slot',
                    // 内容
                    content: item.content,
                    // 内容类型：'text', 'activity', 'coupon', 'goods', 'chart', 'tables', 'action', 'image'
                    contentType: item.contentType || 'text',
                    // 'chart', 'tables'类型的json数据字符串
                    contentAppendData: item.contentAppendData || null
                };
            });

            return list;
        },
        // 助手样式
        aidialogueStyle: function () {
            let { background } = this.config.main;
            let backgroundKey = 'background-image';
            let backgroundValue = '';
            if (typeof background == 'number') {
                backgroundValue = `url('https://img.yummall.cn/baiyetong/byt-uni-ui/bg2${this.isWideScreen ? '' : '_min'}_${background}.png')`;
            } else if (background && typeof background == 'object') {
                if (background.type == 'image') {
                    backgroundValue = `url(${background.url})`;
                } else if (background.type == 'linear') {
                    backgroundValue = background.url;
                } else if (background.type == 'color') {
                    backgroundKey = 'background-color';
                    backgroundValue = background.url;
                }
            }
            return `width: ${this.width} ; height: ${this.height};  ${backgroundKey}: ${backgroundValue}`;
        }
    },
    async mounted() {
        if (!this.agentId) {
            // setTimeout(() => {
            //     showToast('必须传入智能体id,否则无法使用对话服务');
            // }, 1000);
            // 请求默认智能体
            await this.getAssistant();
        } else {
            this.agentIdAgent = this.agentId;
            this.agentNameAgent = this.agentName;
        }

        let _this = this;
        // socket调用
        await _this.historyAdd();
        // 获取设备宽度
        uni.getSystemInfo({
            success: function (info) {
                console.log('设备的宽度：' + info.windowWidth);
                // 你可以将设备宽度保存在一个变量中供后续使用
                let deviceWidth = info.windowWidth;
                if (deviceWidth >= _this.wideScreenWidth) {
                    _this.isWideScreen = true;
                } else {
                    _this.isWideScreen = false;
                }
                console.log('当前isWideScreen', _this.isWideScreen);
            }
        });
        // 监听键盘高度变化，以便设置输入框的高度
        //  #ifndef H5
        uni.onKeyboardHeightChange((res) => {
            console.log('获取高度', res);
            _this.toBottom();
            if (res.height === 0) {
                _this.focus = false;
            }
        });
        // #endif
        // #ifdef H5
        window.addEventListener('resize', _this.onResizeWidth);
        // #endif

        // 获取状态条高度
        const systemInfo = uni.getSystemInfoSync();
        this.statusBarHeight = systemInfo.statusBarHeight;
    },
    // #ifdef VUE2
    beforeDestroy() {
        this.onClear();
    },
    // #endif
    // #ifdef VUE3
    beforeUnmount() {
        this.onClear();
    },
    // #endif
    methods: {
        isEmpty,
        isJsonString,
        // 当智能体id未传入时，根据token获取默认智能体
        async getAssistant() {
            try {
                //   agentType: 应用类型(1、系统appAgent 2、品牌官 3、数字分身 4、通用copilot)
                const data = await getDefaultAgent({ agentType: 1 });
                console.log('返回的数据是', data?.data);
                const dataObj = data?.data || {};
                const agentId = dataObj.agentId || dataObj.aiAgentId;
                const agentName = dataObj.agentName;

                this.agentIdAgent = agentId;
                this.agentNameAgent = agentName;
            } catch (err) {
                console.log('获取默认智能体报错：', err);
            }
        },
        // 重新链接
        wxResize() {
            showToast('正在重新连接服务器，请稍后再发送');
            this.wxFailureRetryNum = 0;
            this.resizeBtnShow = false;
            this.connectSocketInit();
        },
        onClear() {
            // 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
            // #ifdef H5
            window.removeEventListener('resize', this.onResizeWidth);
            // #endif
            this.closeSocket();
            //清除chatGPT的上下文内容
            chatClearMessage({
                agentId: this.agentIdAgent,
                userId: this.config.userInfo.userId
            });
        },
        onResizeWidth() {
            if (window.innerWidth >= this.wideScreenWidth) {
                this.isWideScreen = true;
            } else {
                this.isWideScreen = false;
            }
            console.log('当前isWideScreen', this.isWideScreen);
        },

        onPull() {
            console.info('用户向上滚动请求历史消息');
            if (this.recordLoading === 'nomore') {
                uni.stopPullDownRefresh();
                return;
            }
            this.queryParams.pagination.pageNum++;
            this.getData(true);
        },
        problemClick(name) {
            this.message = name;
            this.setMessage();
        },
        getData(stopPullDownRefresh = false) {
            this.recordLoading = 'loading';
            chatHistoryList(this.queryParams)
                .then((res) => {
                    let data2 = res.data;
                    data2.sort((a, b) => {
                        // return a.serialNo - b.serialNo;
                        return a.createTime?.localeCompare(b.createTime);
                    });
                    // 修复数据图表
                    data2.forEach((item) => {
                        try {
                            if (item.type == 2) {
                                let obj = JSON.parse(item.content);
                                if (typeof obj == 'object' && obj instanceof Object) {
                                    item.content = obj.answerResult;
                                    if (obj.chartType) {
                                        item.contentType = 'chart_' + obj.chartType;
                                        item.contentAppendData = obj.chartData;
                                    }
                                }
                            }
                        } catch (e) {}
                    });
                    // 去除空数据
                    let data = data2.filter((item) => item.content);
                    console.log('数据是', data2);
                    this.recordList = [...data, ...this.recordList];
                    this.loading = false;
                    if (!data || data.length < this.queryParams.pagination.pageSize) {
                        this.recordLoading = 'nomore';
                    } else {
                        this.recordLoading = 'loadmore';
                    }
                    // if (this.queryParams.pagination.pageNum === 1) {
                    //     this.toBottom();
                    // }
                    if (stopPullDownRefresh) {
                        uni.stopPullDownRefresh();
                    }
                })
                .catch((err) => {
                    showToast(err.msg);
                });
        },

        connectSocketInit() {
            const _this = this;
            // 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
            // 请求路径
            const url = `${wsUrl}${wsChartPath}/${this.historyId}/${this.agentIdAgent}/${getToken()}`;
            _this.socketTask = uni.connectSocket({
                url: url,
                success(data) {
                    console.log('websocket连接成功');
                }
            });

            _this.socketTask.onOpen((res) => {
                console.log('WebSocket连接正常打开中...！');
                _this.is_open_socket = true;
                // 发送提示信息
                _this.debounceShowGreeting();
                _this.jumpTimer = setInterval(() => {
                    console.log('每隔20秒钟发送一次心跳');
                    let ping = {
                        type: 'ping'
                    };
                    _this.socketTask.send({
                        data: JSON.stringify(ping),
                        async success() {
                            console.log('心跳消息发送成功');
                        }
                    });
                }, 20000);

                // 注：只有连接正常打开中 ，才能正常收到消息
                _this.socketTask.onMessage((res) => {
                    clearInterval(_this.timer);
                    _this.timerShow = false;

                    let lastIndex = _this.recordList.length - 1;
                    // 添加一个空消息
                    if (_this.recordList[lastIndex].type !== 2) {
                        _this.recordList.push({
                            createTime: getCurrentDateTime(),
                            type: 2,
                            content: ''
                        });
                        lastIndex += 1;
                    }
                    if (_this.recordList[lastIndex].content.includes(_this.config.message.answerWait)) {
                        _this.recordList[lastIndex].content = '';
                    }
                    const tagList = ['[TEXT]', '[CHARTDATA]', '[DONE]'];
                    if (res.data == tagList[0]) {
                        _this.answerChart = false;
                    } else if (res.data == tagList[1]) {
                        _this.answerChart = true;
                    } else if (res.data == tagList[2]) {
                        // 微信小程序做特殊处理
                        // #ifdef MP-WEIXIN
                        if (_this.answerImgSrc) {
                            _this.recordList[lastIndex].content = _this.recordList[lastIndex].content.replace('......', _this.answerImgSrc);
                            _this.answerImgSrc = '';
                        }
                        // #endif

                        // 结束
                        _this.answerChart = false;
                        _this.answerStatus = false;
                    } else {
                        if (this.answerChart) {
                            let jsonData = {};
                            let len = 0;
                            try {
                                jsonData = JSON.parse(res.data);
                                if (typeof jsonData == 'object' && Object.keys(jsonData).length) {
                                    len = Object.keys(jsonData).length;
                                }
                            } catch (e) {
                                console.log(e);
                            }
                            console.log('数据', jsonData, typeof jsonData);
                            if (len) {
                                // 确认数据追加类型
                                let { chartType, chartData } = jsonData;
                                // 活动： activity
                                // 优惠券： coupon
                                // 商品： goods
                                // 图表1： chart_1
                                // 图表2： chart_2
                                // 图表3： chart_3
                                // 表格： table
                                // 图片 image
                                // 发送 send
                                // 活动 action
                                if (chartType && chartData && !['[]', '{}'].includes(chartData)) {
                                    console.log('当前数据类型', chartType);
                                    _this.recordList[lastIndex].contentType = 'chart_' + chartType;
                                    _this.recordList[lastIndex].contentAppendData = chartData;
                                }
                            }
                        } else {
                            // 微信小程序会疯狂抖动
                            // #ifndef MP-WEIXIN
                            // 图片链接处理优化
                            if (res.data.includes('[](')) {
                                // 缓存
                                _this.answerImgSrc = _this.answerImgSrc + res.data;
                                _this.answerImgSrcShow = true;
                            } else if (res.data.includes(')')) {
                                const imgSrc = _this.answerImgSrc + res.data;
                                let loadingStr = '生成中⠋';
                                if (_this.recordList[lastIndex].content.includes('生成中⠋')) {
                                    loadingStr = '生成中⠋';
                                } else if (_this.recordList[lastIndex].content.includes('生成中⠙')) {
                                    loadingStr = '生成中⠙';
                                } else {
                                    loadingStr = '生成中⠹';
                                }

                                _this.recordList[lastIndex].content = _this.recordList[lastIndex].content.replace(loadingStr, imgSrc);
                                _this.answerImgSrc = '';
                                _this.answerImgSrcShow = false;
                            } else {
                                if (_this.answerImgSrcShow) {
                                    let textStr = _this.recordList[lastIndex].content;
                                    if (!_this.recordList[lastIndex].content.includes('生成中')) {
                                        textStr = textStr + '生成中⠋';
                                    } else {
                                        if (_this.recordList[lastIndex].content.includes('生成中⠋')) {
                                            textStr = textStr.replace('生成中⠋', '生成中⠙');
                                        } else if (_this.recordList[lastIndex].content.includes('生成中⠙')) {
                                            textStr = textStr.replace('生成中⠙', '生成中⠹');
                                        } else {
                                            textStr = textStr.replace('生成中⠹', '生成中⠋');
                                        }
                                    }
                                    // 缓存
                                    _this.answerImgSrc = _this.answerImgSrc + res.data;

                                    _this.recordList[lastIndex].content = textStr;
                                } else {
                                    _this.recordList[lastIndex].content = _this.recordList[lastIndex].content + res.data;
                                }
                            }
                            // #endif

                            // 微信小程序做特殊处理
                            // #ifdef MP-WEIXIN
                            // 图片链接处理优化
                            if (res.data.includes('[](')) {
                                // 缓存
                                _this.answerImgSrc = _this.answerImgSrc + res.data;
                                _this.answerImgSrcShow = true;
                            } else if (res.data.includes(')')) {
                                let loadingStr = '生成中⠙';
                                if (_this.recordList[lastIndex].content.includes('生成中⠙')) {
                                    loadingStr = '生成中⠙';
                                } else if (_this.recordList[lastIndex].content.includes('生成中⠸')) {
                                    loadingStr = '生成中⠸';
                                } else if (_this.recordList[lastIndex].content.includes('生成中⠴')) {
                                    loadingStr = '生成中⠴';
                                } else {
                                    loadingStr = '生成中⠇';
                                }

                                _this.recordList[lastIndex].content = _this.recordList[lastIndex].content.replace(loadingStr, '......');

                                // 缓存
                                _this.answerImgSrc = _this.answerImgSrc + res.data;
                                _this.answerImgSrcShow = false;
                            } else {
                                if (_this.answerImgSrcShow) {
                                    let textStr = _this.recordList[lastIndex].content;
                                    if (!_this.recordList[lastIndex].content.includes('生成中')) {
                                        textStr = textStr + '生成中⠙';
                                    } else {
                                        if (_this.recordList[lastIndex].content.includes('生成中⠙')) {
                                            textStr = textStr.replace('生成中⠙', '生成中⠸');
                                        } else if (_this.recordList[lastIndex].content.includes('生成中⠸')) {
                                            textStr = textStr.replace('生成中⠸', '生成中⠴');
                                        } else if (_this.recordList[lastIndex].content.includes('生成中⠴')) {
                                            textStr = textStr.replace('生成中⠴', '生成中⠇');
                                        } else {
                                            textStr = textStr.replace('生成中⠇', '生成中⠙');
                                        }
                                    }
                                    // 缓存
                                    _this.answerImgSrc = _this.answerImgSrc + res.data;

                                    _this.recordList[lastIndex].content = textStr;
                                } else {
                                    _this.recordList[lastIndex].content = _this.recordList[lastIndex].content + res.data;
                                }
                            }
                            // #endif
                        }
                    }
                    _this.debounceToBottom();
                    // v2 必须强制更新视图，否则无法监听变化
                    _this.$set(_this.recordList, lastIndex, _this.recordList[lastIndex]);
                });
            });

            // 这里仅是事件监听【如果socket关闭了会执行】
            _this.socketTask.onClose(() => {
                console.log('已经被关闭了');
                _this.is_open_socket = false;
                _this.stopAnswer();
            });

            _this.socketTask.onError((err) => {
                console.log('wx链接错误:', err);
                _this.is_open_socket = false;
                _this.stopAnswer();
                if (_this.wxFailureRetryNum < _this.wxFailureRetryLimit) {
                    // 未达到次数限制，失败重试
                    console.log('未达到次数限制，失败重试', _this.wxFailureRetryNum);
                    _this.connectSocketInit();
                    _this.wxFailureRetryNum++;
                } else {
                    _this.resizeBtnShow = true;
                    console.log('达到重新链接次数限制,停止重试，请重新打开页面', _this.wxFailureRetryNum);
                }
                //           setTimeout(() => {
                //               if (_this.wxFailureRetryNum < _this.wxFailureRetryLimit) {
                //                   // 未达到次数限制，失败重试
                //                   console.log('未达到次数限制，失败重试', _this.wxFailureRetryNum);
                //                   _this.connectSocketInit();
                //                   _this.wxFailureRetryNum++;
                //               } else {
                // _this.resizeBtnShow = true
                //                   console.log('达到重新链接次数限制,停止重试，请重新打开页面', _this.wxFailureRetryNum);
                //               }
                //           }, 2000);
            });
        },
        // 终止上一个回复
        stopAnswer() {
            const _this = this;
            console.log('我正在终止回复');
            if (_this.timer) {
                clearInterval(_this.timer);
            }
            _this.answerStatus = false;
            _this.timerShow = false;

            _this.recordList = _this.recordList.filter((item) => item.content?.indexOf(_this.config.message.answerWait) !== 0);
            // 向后端发送后就会中断上一次的消息推送
            // let stop = {
            // 	type: 'stop'
            // };
            // _this.socketTask.send({
            // 	data: JSON.stringify(stop),
            // 	success() {
            // 		console.log('终止回复');
            // 	}
            // });
        },
        // 关闭websocket【离开这个页面的时候执行关闭】
        closeSocket() {
            const _this = this;
            if (this.socketTask) {
                this.socketTask.close({
                    success(res) {
                        _this.is_open_socket = false;
                        console.log('关闭成功', res);
                    },
                    fail(err) {
                        console.log('关闭失败', err);
                    }
                });
                clearInterval(_this.jumpTimer);
            }
        },
        async setMessage() {
            const _this = this;

            if (!_this.agentIdAgent) {
                showToast('必须传入智能体id');
                return;
            }

            if (typeof getToken == 'function') {
                if (!getToken()) {
                    showToast('必须配置token');
                    return;
                }
            } else {
                showToast('getToken必须是函数类型');
                return;
            }

            if (!_this.message || _this.message === '' || _this.message.length <= 0) {
                return;
            }
            if (_this.answerStatus) {
                showToast('请等待当前对话完成');
                return;
            }
            if (_this.is_open_socket === false) {
                console.info('发送消息,socket已关闭,进行重连');
                _this.wxResize();
                return;
            }
            let message = _this.message;
            _this.message = null;
            _this.microphone = false;
            _this.recordList.push({
                createTime: getCurrentDateTime(),
                type: 1,
                content: message
            });
            _this.toBottom();
            _this.answerStatus = true;
            _this.socketTask.send({
                data: message,
                async success() {
                    console.log('消息发送成功');
                }
            });
            //模拟回答中动画
            _this.recordList.push({
                createTime: getCurrentDateTime(),
                type: 2,
                content: ''
            });
            let lastIndex = _this.recordList.length - 1;

            let msg = _this.config.message.answerWait;
            _this.timer = setInterval(() => {
                _this.timerShow = true;

                let content = _this.recordList[lastIndex].content;
                content = content.replace(msg, '');
                if (content.length >= 3) {
                    content = msg + '.';
                } else {
                    content = msg + content + '.';
                }
                _this.recordList[lastIndex].content = content;
            }, 300);
        },
        setResponse(e, index) {
            let { type, data } = e;
            console.log('当前类型是', type, data, '：下标：', index);
            switch (type) {
                case 'send':
                    this.setSend(index);
                case 'resize':
                    this.setNewMessage(index);
                    break;
                default:
                    break;
            }
        },
        setSend(e) {
            console.log('跳转页面', e);
            showToast('跳转页面');
        },
        async setNewMessage(index) {
            clearInterval(this.timer);
            this.answerStatus = false;
            // this.recordList.splice(this.recordList.length - 1, 1);
            // this.message = this.recordList[this.recordList.length - 1].content;
            // //清除chatGPT的上下文内容
            // chatClearMessage({
            // 		agentId: this.agentIdAgent
            // 	})
            // 	.then((res) => {
            // 		this.setMessage();
            // 	})
            // 	.catch((err) => {
            // 		this.setMessage();
            // 	});
            // if(this.recordList.length < 2){
            // 	return;
            // }
            const _this = this;
            if (this.recordList.length < 2) {
                console.log('不允许对问候语提问');
                return;
            }
            let questionData = null;
            for (let i = index; i > 0; i--) {
                if (this.recordList[i].type == 1) {
                    questionData = this.recordList[i];
                    break;
                }
            }
            if (!questionData) {
                console.log('没有找到上一条提问的数据');
                return;
            }
            console.log('上一条提问的数据是', questionData);
            // if (_this.answerStatus) {
            // 	showToast('请等待当前对话完成');
            // 	return;
            // }
            if (_this.is_open_socket === false) {
                console.info('发送消息,socket已关闭,进行重连');
                await _this.connectSocketInit();
            }
            // 1.可编辑上一条提问
            _this.message = questionData.content;
            _this.microphone = false;
            // 2.立即提问
            // let message = questionData.content;
            // // _this.message = null;
            // _this.microphone = false;
            // _this.recordList.push({
            // 	createTime: getCurrentDateTime(),
            // 	type: 1,
            // 	content: message
            // });
            // _this.toBottom();
            // _this.answerStatus = true;
            // _this.socketTask.send({
            // 	data: message,
            // 	async success() {
            // 		console.log('消息发送成功');
            // 	}
            // });
            // //模拟回答中动画
            // _this.recordList.push({
            // 	createTime: getCurrentDateTime(),
            // 	type: 2,
            // 	content: '.'
            // });
            // let lastIndex = _this.recordList.length - 1;

            // let msg = _this.config.message.answerWait;
            // _this.timer = setInterval(() => {
            // 	_this.timerShow = true;

            // 	let content = _this.recordList[lastIndex].content;
            // 	content = content.replace(msg, '');
            // 	if (content.length >= 3) {
            // 		content = msg + '.';
            // 	} else {
            // 		content = msg + content + '.';
            // 	}
            // 	_this.recordList[lastIndex].content = content;
            // }, 300);
        },
        // 显示欢迎信息
        debounceShowGreeting: debounce(function () {
            let _this = this;
            if (this.is_open_socket) {
                let { message } = _this.config;
                // 如果当前历史记录有提示词，并且上下文没有提示，则进行发送
                if (message.greeting && !_this.recordList.some((item) => item.contentType == 'greeting')) {
                    if (!_this.answerStatus) {
                        _this.recordList.push({
                            createTime: getCurrentDateTime(),
                            type: 2,
                            content: message.greeting,
                            contentType: 'greeting'
                        });
                    } else {
                        console.log('欢迎信息未发送');
                    }
                } else {
                    console.log('没有提示信息，或者已发送提示');
                }
            }
        }, 500),
        debounceToBottom: debounce(function () {
            this.toBottom();
        }, 100),
        toBottom() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.scrollTop = this.scrollTop + 1;
                }, 100);
            });
        },
        onFocus() {
            this.microphone = false;
        },
        toTest() {
            this.message = '制定一份端午节商城综合体的营销方案';
        },
        historyAdd() {
            // 获取打开一个新的对话的historyId
            chatOpenNewHistory({
                customerNo: this.config.userInfo.userId,
                assistantNo: '1727988700871720962',
                aiAgentId: this.agentIdAgent
            })
                .then((res) => {
                    let data = res.data;
                    this.historyId = data.serialNo;
                    this.queryParams.dialogueHistoryNo = data.serialNo;
                    this.connectSocketInit();
                })
                .catch((err) => {
                    console.log('------------------');
                });
        },
        // 获取数据json
        getDataJson(data) {
            // 获取json数据
            const { taskOrnament, description } = data;
            let taskOrnamentObj = JSON.parse(taskOrnament || '{}');
            console.log('现在呢', taskOrnamentObj);
            taskOrnamentObj.nodes?.forEach((item) => (item.data = undefined));
            taskOrnamentObj.edges?.forEach((item) => (item.data = undefined));
            this.taskOrnamentStr = JSON.stringify(taskOrnamentObj);
            // 获取首条信息
            // fullWindowMessage.value.tips = description;
            this.recordList.push({
                createTime: getCurrentDateTime(),
                type: 2,
                content: description
            });
            console.log('新数据是', this.taskOrnamentStr, this.recordList);
        },
        getAiDetail() {
            // 获取打开一个新的对话的historyId
            chatTechnologyDetail({
                aiAgentId: this.agentIdAgent
            })
                .then((res) => {
                    console.log('数据是', res.data);
                    this.getDataJson(res.data);
                })
                .catch((err) => {
                    console.log('------------------');
                });
        }
        // onResponseMessage(res) {
        // 	let _this = this;
        // 	clearInterval(_this.timer);
        // 	_this.timerShow = false;

        // 	let lastIndex = _this.recordList.length - 1;
        // 	if (_this.recordList[lastIndex].content.indexOf('AI助手思考中') === 0 || _this
        // 		.recordList[lastIndex].content.indexOf('图片绘制中') === 0) {
        // 		_this.recordList[lastIndex].content = '';
        // 	}
        // 	// 测试结束
        // 	_this.recordList[lastIndex].content = _this.recordList[lastIndex].content + res.answerResult;
        // 	_this.answerStatus = false;
        // 	// 确认数据追加类型
        // 	let {
        // 		chartType,
        // 		chartData
        // 	} = res;
        // 	if (chartType && chartData && !['[]', '{}'].includes(chartData)) {
        // 		console.log("当前数据类型", chartType)
        // 		_this.recordList[lastIndex].contentType = 'chart_' + chartType;
        // 		_this.recordList[lastIndex].contentAppendData = chartData;
        // 	}
        // 	// 测试开始
        // 	// activity, coupon, goods
        // 	// if (lastIndex - 1 >= 0) {
        // 	// 	const preContent = _this.recordList[lastIndex - 1].content;
        // 	// 	if (preContent.includes('活动')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'activity';
        // 	// 	} else if (preContent.includes('优惠券')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'coupon';
        // 	// 	} else if (preContent.includes('商品')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'goods';
        // 	// 	} else if (preContent.includes('图表1')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'chart_1';
        // 	// 	} else if (preContent.includes('图表2')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'chart_2';
        // 	// 	} else if (preContent.includes('图表3')) {
        // 	// 		_this.recordList[lastIndex].contentType = 'chart_3';
        // 	// 	}
        // 	// }
        // },
        // setMessageApi() {
        // 	const _this = this;
        // 	if (!_this.taskOrnamentStr) {
        // 		showToast('请等待当前数据加载');
        // 		return;
        // 	}
        // 	if (!_this.message || _this.message === '' || _this.message.length <= 0) {
        // 		return;
        // 	}
        // 	if (_this.answerStatus) {
        // 		showToast('请等待当前对话完成');
        // 		return;
        // 	}
        // 	let message = _this.message;
        // 	_this.message = null;
        // 	_this.microphone = false;
        // 	_this.recordList.push({
        // 		createTime: getCurrentDateTime(),
        // 		type: 1,
        // 		content: message
        // 	});
        // 	_this.toBottom();
        // 	_this.answerStatus = true;
        // 	//模拟回答中动画
        // 	_this.recordList.push({
        // 		createTime: getCurrentDateTime(),
        // 		type: 2,
        // 		content: '.'
        // 	});
        // 	let lastIndex = _this.recordList.length - 1;

        // 	let msg = 'AI助手思考中';
        // 	// 调用接口
        // 	chatGetAiAgentChat({
        // 			question: message,
        // 			taskOrnament: _this.taskOrnamentStr
        // 		})
        // 		.then((res) => {
        // 			console.log("数据是", res.data)
        // 			this.onResponseMessage(res.data);
        // 		})
        // 		.catch((err) => {
        // 			console.log('请求失败');
        // 		}).finally(() => {
        // 			_this.timerShow = false;

        // 			_this.answerStatus = false;
        // 		});
        // 	// 模拟等待
        // 	_this.timer = setInterval(() => {
        // 		_this.timerShow = true;

        // 		let content = _this.recordList[lastIndex].content;
        // 		content = content.replace(msg, '');
        // 		if (content.length >= 3) {
        // 			content = msg + '.';
        // 		} else {
        // 			content = msg + content + '.';
        // 		}
        // 		_this.recordList[lastIndex].content = content;
        // 	}, 300);
        // }
    }
};
</script>

<style lang="scss" scoped>
view {
    box-sizing: border-box;
}

@include b(aidialogue) {
    overflow-y: hidden;
    overflow-x: hidden;
    padding-top: 2rpx;
    background-size: 100% 100%;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    @include b(aidialogue-bg) {
        position: relative;
        height: 100%;

        @include e(role) {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: calc(100% - 100rpx);
            z-index: 0;
            margin: 0 auto;
        }

        @include m(float) {
            z-index: 1;
        }
    }

    @include b(aidialogue-content) {
        position: relative;
        // padding: 28rpx 0 0;
        z-index: 1;
        border-top-right-radius: 20rpx;
        border-top-left-radius: 20rpx;
        height: calc(100% - 50px - 350rpx - env(safe-area-inset-bottom) - var(--status-bar-height));
        overflow-y: auto;

        @include eb(footer) {
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
    }

    &.is-default-bg {
        background: #ffffff url('https://img.yummall.cn/wxapp/study/img/ai-assistant-bg2.png') top center no-repeat;
        background-size: contain;

        @include b(aidialogue-content) {
            background: -webkit-linear-gradient(top, #ffffff, #f3f4f8 120rpx);
        }
    }

    @include b(aidialogue-tabbar) {
        // #ifndef H5
        height: calc(120rpx + env(safe-area-inset-bottom));
        // #endif
        // #ifdef H5
        height: calc(160rpx);
        // #endif
        position: relative;

        @include e(box) {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 99;
            border-radius: 12px 12px 0px 0px;

            &.is-min {
                background: rgba(255, 255, 255, 0.7);
            }
        }

        @include e(content) {
            max-width: 1800rpx;
            margin: 0 auto;

            @include eb(input) {
                display: flex;
                align-items: center;
                padding: 16rpx 24rpx;

                @include e(audio) {
                    margin-right: 28rpx;
                }

                @include e(textarea) {
                    flex-grow: 1;
                    min-height: 80rpx;
                    border-radius: 88rpx;
                    border: 4rpx solid transparent;
                    // background-clip: padding-box, border-box;
                    // background-origin: padding-box, border-box;
                    // background-image: linear-gradient(to right, #fff, #fff), linear-gradient(to left, #5ee1fcff, #9caaf6ff, #9e8cf6ff, #5d8bfdff);
                    background: rgba(255, 255, 255, 0.8);
                    border: 2px solid #9e8cf6ff;
                    border-radius: 44rpx;
                    box-sizing: content-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    @include e(inner) {
                        min-height: 48rpx;
                        max-height: 500rpx;
                        padding: 16rpx 24rpx;
                        box-sizing: content-box;
                        border-radius: 80rpx;
                        width: calc(100% - 32rpx - 80rpx);
                        line-height: 48rpx;
                        font-size: 28rpx;

                        // &::placeholder {
                        // 	line-height: 48rpx;
                        // }
                    }

                    @include e(confirm) {
                        width: 56rpx;
                        height: 56rpx;
                        margin-right: 18rpx;
                        background-color: #26a5ff;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }
    }
}
</style>
