<template>
    <view v-if="contentAgent" class="byt-think">
        <view @click="expandShow = !expandShow" class="byt-think-topBox">
            <span :class="{ 'breath-text': status }">{{ status ? statusStr : '已深度思考(用时' + time + '秒)' }}</span>
            <image :style="{ transform: expandShow ? 'rotate(90deg)' : 'rotate(-90deg)' }" src="https://img.yummall.cn/baiyetong/byt-uni-ui/right.svg" mode=""></image>
        </view>
        <zero-markdown-view v-if="expandShow" :markdown="msgContent(contentAgent)"></zero-markdown-view>
    </view>
</template>

<script>
import zeroMarkdownView from '../Bubble/components/zero-markdown-view/components/zero-markdown-view/zero-markdown-view.vue';
export default {
    components: { zeroMarkdownView },
    name: 'think',
    props: {
        // 内容
        content: {
            type: String,
            default: ''
        },
        // 思考状态
        status: {
            type: Boolean,
            default: false
        },
        // 思考时间
        time: {
            type: Number,
            default: 0
        }
    },
    // 加载效果
    // watch: {
    //     status: {
    //         handler(val) {
    //             const _this = this;
    //             if (val) {
    //                 _this.timer = this.loadStatus();
    //             } else {
    //                 clearInterval(_this.timer);
    //             }
    //         },
    //         immediate: true
    //     }
    // },
    data() {
        return {
            expandShow: true,
            // statusStr: '思考中⠙',
            statusStr: '思考中...',
            timer: '0'
        };
    },
    computed: {
        contentAgent() {
            let text = this.content || '';
            text = '>' + text;
            text = text.replace(/\n/g, '\n>');

            return text;
        }
    },
    methods: {
        // 思考中加载文字
        loadStatus() {
            let timer = setInterval(() => {
                if (this.statusStr.includes('思考中⠙')) {
                    this.statusStr = '思考中⠸';
                } else if (this.statusStr.includes('思考中⠸')) {
                    this.statusStr = '思考中⠴';
                } else if (this.statusStr.includes('思考中⠴')) {
                    this.statusStr = '思考中⠇';
                } else {
                    this.statusStr = '思考中⠙';
                }
            }, 150);
            return timer;
        },
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
        }
    }
};
</script>

<style lang="scss" scoped>
.breath-text {
    animation: breath 1.5s ease-in-out infinite;
}

@keyframes breath {
    0%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
}

@include b(think) {
    display: flex;
    flex-direction: column;
    padding-top: 24rpx;
    @include eb(topBox) {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16rpx 32rpx;
        background-color: #f4f6f8;
        width: fit-content;
        border-radius: 16rpx;

        span {
            font-size: 28rpx;
            color: #666666;
            margin-right: 8rpx;
            font-weight: bold;
        }
        image {
            width: 32rpx;
            height: 32rpx;
        }
    }
}
</style>
