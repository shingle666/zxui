<template>
    <view class="byt-chart" v-if="dataObj">
        <qiun-data-charts style="width: 100%; height: 200px" :type="chartTypeName" :opts="chartOption" v-if="chartType" :chartData="chartData" />
    </view>
</template>

<script>
import { showToast } from '../../../utils';
// 分包请使用局部注册  如果项目中也有这个组件并全局注册了，可以去除
import qiunDataCharts from './components/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.vue';
export default {
    name: 'Chart',
    components: {
        qiunDataCharts
    },
    props: {
        type: {
            type: String,
            // 3.拆线图 line  2.柱状图 column，1.饼图 pie
            default: 'chart_1'
        },
        dataObj: {
            type: String || null,
            default: '[{"name":"一班","value":50},{"name":"二班","value":30},{"name":"三班","value":20},{"name":"四班","value":18},{"name":"五班","value":8}]'
        }
    },
    computed: {
        chartType() {
            if (!this.type) {
                console.log('数据为空');
                return 0;
            }
            console.log('数据为' + this.type);
            let index = this.type.split('_')[1];
            return Number.isInteger(parseInt(index)) ? parseInt(index) : 0;
        },
        chartTypeName() {
            return this.chartType ? ['pie', 'column', 'line'][this.chartType - 1] : '';
        }
    },
    data() {
        return {
            // // 静态数据, 测试
            // staticData: [
            // 	"{\n \"xAxis\": [\"2024-11-18\", \"2024-11-03\", \"2024-11-06\", \"2024-11-13\", \"2024-11-08\", \"2024-11-05\", \"2024-11-03\", \"2024-11-01\"],\n \"yAxis\": [1, 1, 1, 1, 1, 1, 0, 0]\n}",
            // 	"{\n \"xAxis\": [\"2024-11-18\", \"2024-11-03\", \"2024-11-06\", \"2024-11-13\", \"2024-11-08\", \"2024-11-05\", \"2024-11-03\", \"2024-11-01\"],\n \"yAxis\": [1, 1, 1, 1, 1, 1, 0, 0]\n}",
            // 	"[{\"name\":\"2024-11-18\",\"value\":1},{\"name\":\"2024-11-03\",\"value\":1},{\"name\":\"2024-11-06\",\"value\":1},{\"name\":\"2024-11-13\",\"value\":2},{\"name\":\"2024-11-08\",\"value\":3},{\"name\":\"2024-11-05\",\"value\":4},{\"name\":\"2024-11-03\",\"value\":5},{\"name\":\"2024-11-01\",\"value\":6}]"
            // ],
            //您可以通过修改 config-ucharts.js 文件中下标为 ['column'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
            // 3.拆线图
            lineOption: {
                color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
                padding: [15, 10, 0, 15],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    gridType: 'dash',
                    dashLength: 2
                },
                extra: {
                    line: {
                        type: 'straight',
                        width: 2,
                        activeType: 'hollow'
                    }
                }
            },
            // 2.柱状图
            barOption: {
                color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
                padding: [15, 15, 0, 5],
                enableScroll: false,
                legend: {},
                xAxis: {
                    disableGrid: true
                },
                yAxis: {
                    data: [
                        {
                            min: 0
                        }
                    ]
                },
                extra: {
                    column: {
                        type: 'group',
                        width: 30,
                        activeBgColor: '#000000',
                        activeBgOpacity: 0.08
                    }
                }
            },
            // 1.饼图
            pieOption: {
                color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
                padding: [5, 5, 5, 5],
                enableScroll: false,
                extra: {
                    pie: {
                        activeOpacity: 0.5,
                        activeRadius: 10,
                        offsetAngle: 0,
                        labelWidth: 15,
                        border: false,
                        borderWidth: 3,
                        borderColor: '#FFFFFF'
                    }
                }
            },
            // 数据
            chartOption: {},
            chartData: {}
        };
    },
    created() {
        this.getServerData();
    },
    methods: {
        getServerData() {
            let that = this;
            console.log('正在渲染组件');
            // //模拟从服务器获取数据时的延时
            // setTimeout(() => {
            // 	//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
            // 	let res = {
            // 		categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
            // 		series: [{
            // 				name: '目标值',
            // 				data: [35, 36, 31, 33, 13, 34]
            // 			},
            // 			{
            // 				name: '完成量',
            // 				data: [18, 27, 21, 24, 6, 28]
            // 			}
            // 		]
            // 	};
            // 	this.chartData = JSON.parse(JSON.stringify(res));
            // }, 500);
            if (this.chartType) {
                // 模拟返回数据
                let res = null;
                try {
                    res = JSON.parse(that.dataObj);
                    if (!((res instanceof Array || res instanceof Object) && typeof res == 'object')) {
                        throw new Error('数据格式错误');
                    }
                } catch (e) {
                    console.log('chart解析数据异常', e);
                    return;
                }
                console.log('当前类型是', that.chartType, res);
                if (that.chartType == 1) {
                    that.chartData = {
                        series: [
                            {
                                data: res || []
                            }
                        ]
                    };
                    that.chartOption = that.pieOption;
                } else if (that.chartType == 2) {
                    that.chartData = {
                        categories: res.xAxis || [],
                        series: [
                            {
                                name: res.name,
                                data: res.yAxis || []
                            }
                        ]
                    };
                    that.chartOption = that.barOption;
                } else if (that.chartType == 3) {
                    that.chartData = {
                        categories: res.xAxis || [],
                        series: [
                            {
                                name: res.name,
                                data: res.yAxis || []
                            }
                        ]
                    };
                    that.chartOption = that.lineOption;
                }
                console.log('结果', that.chartData, that.chartOption);
            } else {
                console.log('图表类型错误');
                showToast('图表类型错误');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@include b(chart) {
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
}
</style>
