<template>
    <scroll-view :scroll-y="true" :style="{ height: height, maxHeight: maxHeight, minHeight: minHeight }" ref="table" class="byt-table">
        <scroll-view :scroll-x="true">
            <view class="byt-table-main">
                <view
                    class="byt-table-main-title"
                    v-for="(item, index) in columns"
                    :key="item.key"
                    :style="{
                        width: (item.width ? item.width : columns.length > Number(colNum) ? tableWidth / (Number(colNum) - 0.08) : '') + 'rpx',
                        position: 'sticky',
                        right: item.fixed == 'right' ? '0' : '',
                        left: item.fixed == 'left' ? '0' : ''
                    }"
                    :class="{
                        'byt-table-main-box-shadow': item.fixed,
                        'byt-table-main-flex-1': !item.width && columns.length <= Number(colNum)
                    }"
                >
                    <view
                        @click="toast(item.title)"
                        :style="{
                            width: (item.width ? item.width : columns.length > Number(colNum) ? tableWidth / (Number(colNum) - 0.08) : '') + 'rpx'
                        }"
                        class="byt-table-main-title-item"
                        :class="{
                            'byt-table-main-title__flex-1': !item.width && columns.length <= Number(colNum),
                            'byt-table-main-title__jty-start': item.align == 'left',
                            'byt-table-main-title__jty-center': item.align == 'center',
                            'byt-table-main-title__jty-end': item.align == 'right'
                        }"
                    >
                        <text class="byt-table-main-title-item-text">{{ item.title }}</text>
                    </view>
                    <view class="byt-table-main-title__flex-col">
                        <text
                            @click="toast(itemC)"
                            class="byt-table-main-title__flex-col-text"
                            :class="{
                                'byt-table-main-title__flex-col__jty-start': item.align == 'left',
                                'byt-table-main-title__flex-col__jty-center': item.align == 'center',
                                'byt-table-main-title__flex-col__jty-end': item.align == 'right'
                            }"
                            v-for="(itemC, indexC) in data.map((itemV) => itemV[item.key])"
                            v-if="itemC"
                        >
                            {{ itemC }}
                        </text>
                    </view>
                    <view v-if="item.slotShow" class="byt-table-main-title-flex-col">
                        <view
                            v-if="item.slotShow"
                            class="byt-table-main-title__flex-col-text"
                            :class="{
                                'byt-table-main-title__flex-col__jty-start': item.align == 'left',
                                'byt-table-main-title__flex-col__jty-center': item.align == 'center',
                                'byt-table-main-title__flex-col__jty-end': item.align == 'right'
                            }"
                            v-for="(itemC, indexC) in data.length"
                        >
                            <slot :row="data[indexC]"></slot>
                        </view>
                    </view>
                </view>
            </view>
            <view v-if="data.length == 0" class="byt-table-empty">
                <basic-empty v-if="true"></basic-empty>
            </view>
        </scroll-view>
    </scroll-view>
</template>

<script>
// import { BasicEmpty } from '../../basic';
// 空状态
import BasicEmpty from '../../basic/basic-empty/basic-empty.vue';
import { showToast } from '../../../utils/index.js';
export default {
    name: 'Tables',
    components: {
        BasicEmpty
    },
    props: {
        // 需要展示的列
        columns: {
            type: Array,
            default: () => {
                // 必须单引号
                // 列对象格式
                const obj = {
                    // 标题
                    title: '1',
                    // 主键key
                    key: '1',
                    // 宽度，没设置则自动
                    width: '',
                    // 文本对齐
                    align: 'left',
                    // 定位位置，left:只能第一列设置，right:只能最后一列设置
                    fixed: 'right',
                    // 操作按钮的插槽开关
                    slotShow: false
                };

                return [
                    {
                        title: '苹果',
                        key: 'a',
                        align: 'center'
                    },
                    {
                        title: '橘子',
                        key: 'b',
                        align: 'center'
                    },
                    {
                        title: '哈密瓜',
                        key: 'c',
                        align: 'center'
                    },
                    {
                        title: '西瓜',
                        key: 'd',
                        align: 'center'
                    }
                ];
            }
        },
        // 数据
        data: {
            type: Array,
            default: () => [
                {
                    a: '10000元/斤',
                    b: '200元/斤',
                    c: '300元/斤',
                    d: '300元/斤'
                },
                {
                    a: '2200元/斤',
                    b: '2300元/斤',
                    c: '2400元/斤',
                    d: '2500元/斤'
                }
            ]
        },
        // 高度
        height: {
            type: String,
            default: ''
        },
        // 最大高度
        maxHeight: {
            type: String,
            default: ''
        },
        // 最小高度
        minHeight: {
            type: String,
            default: ''
        },
        // 展示的最大列数
        colNum: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            tableWidth: 750
        };
    },
    mounted() {
        this.tableWidth = this.$refs.table.$el.clientWidth * 2;
        console.log('表格宽度：', this.tableWidth);
    },
    methods: {
        toast(title) {
            showToast(title);
        }
    }
};
</script>

<style scoped lang="scss">
view {
    box-sizing: border-box;
}

@include b(table) {
    border: 1px solid #f1f1f1 !important;

    @include eb(empty) {
        padding-top: 24rpx;
        padding-bottom: 24rpx;
    }

    @include eb(main) {
        display: flex;
        flex-direction: row;
        align-items: center;

        @include eb(box-shadow) {
            box-shadow: 0px 0 10px rgba(0, 0, 0, 0.3);
            z-index: 99;
        }
        @include eb(flex-1) {
            flex: 1;
        }

        @include eb(title) {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex-shrink: 0;

            @include eb(item) {
                display: flex;
                flex-direction: row;
                background-color: #f4f4f4;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                align-items: center;

                @include eb(text) {
                    font-size: 28rpx;
                    height: 30px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    padding-left: 10rpx;
                    padding-right: 10rpx;
                }
            }
            @include e(flex-1) {
                flex: 1;
            }
            @include e(jty-start) {
                justify-content: flex-start;
            }
            @include e(jty-center) {
                justify-content: center;
            }
            @include e(jty-end) {
                justify-content: flex-end;
            }
            @include e(flex-col) {
                display: flex;
                flex-direction: column;

                @include eb(text) {
                    font-size: 28rpx;
                    height: 40px;
                    padding-left: 10rpx;
                    padding-right: 10rpx;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    background-color: white;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                @include e(jty-start) {
                    justify-content: flex-start;
                }
                @include e(jty-center) {
                    justify-content: center;
                }
                @include e(jty-end) {
                    justify-content: flex-end;
                }
            }
        }
    }
}
</style>
