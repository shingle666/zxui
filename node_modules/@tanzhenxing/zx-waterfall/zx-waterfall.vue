<template>
	<view class="zx-waterfall" :style="{ paddingLeft: leftGap, paddingRight: rightGap, background: backgroundColor, borderRadius: radius }">
		<view class="list" id="zx-waterfall__left" :style="{ marginRight: columnGap }">
			<view v-for="(item, index) in leftList" :key="item.id || index" class="item">
				<slot name="left" :entity="item" :index="index" :isList="columnCount == 1"></slot>
			</view>
		</view>
		<view v-if="columnCount > 1" class="list" id="zx-waterfall__right">
			<view v-for="(item, index) in rightList" :key="item.id || index" class="item">
				<slot name="right" :entity="item" :index="index" :isList="columnCount == 1"></slot>
			</view>
		</view>
		<view v-if="loading" class="loading-wrapper">
			<slot name="loading">
				<view class="loading">加载中...</view>
			</slot>
		</view>
		<view v-if="finished" class="finished-wrapper">
			<slot name="finished">
				<view class="finished">没有更多了</view>
			</slot>
		</view>
		<view v-if="error" class="error-wrapper">
			<slot name="error">
				<view class="error" @click="$emit('retry')">加载失败，点击重试</view>
			</slot>
		</view>
	</view>
</template>

<script setup>
/**
 * zx-waterfall 瀑布流组件
 * @description 一个支持H5、小程序和App的跨平台瀑布流组件
 * @property {Array} listData - 列表数据
 * @property {Number} pageSize - 每页数据条数(固定条数)
 * @property {Number} type - 数据分组类型: 1-简单左右分组，2-计算高度进行分组
 * @property {Number} columnCount - 瀑布流列数，目前支持最大值为2
 * @property {String} columnGap - 列与列的间隙
 * @property {String} leftGap - 左侧和列表的间隙
 * @property {String} rightGap - 右侧和列表的间隙
 * @property {String} backgroundColor - 列表背景色
 * @property {String} radius - 列表外层容器圆角值
 * @property {Boolean} loading - 是否处于加载状态
 * @property {Boolean} finished - 是否已加载完成所有数据
 * @property {Boolean} error - 是否加载失败
 * @property {Number} delay - 延迟计算时间(ms)，避免频繁计算
 * @event {Function} retry - 加载失败时点击重试的回调
 */
import { ref, watch, getCurrentInstance, onMounted, nextTick } from 'vue';

const { proxy } = getCurrentInstance();
const emit = defineEmits(['retry', 'change']);

const props = defineProps({
	// 列表数据，不建议一次性加载过多数据
	listData: {
		type: Array,
		default: () => []
	},
	// 每页数据条数(固定条数),当总数据长度小于等于该数时表示第一页数据，刷新重置
	pageSize: {
		type: Number,
		default: 10
	},
	// 数据分组类型：1-简单左右分组，按顺序排列，伪瀑布流 2-计算左右容器高度进行分组
	type: {
		type: Number,
		default: 1
	},
	// 瀑布流列数，目前支持最大值为2
	columnCount: {
		type: Number,
		default: 2
	},
	// 列与列的间隙
	columnGap: {
		type: String,
		default: '10rpx'
	},
	// 左侧和列表的间隙
	leftGap: {
		type: String,
		default: '10rpx'
	},
	// 右侧和列表的间隙
	rightGap: {
		type: String,
		default: '10rpx'
	},
	// 列表背景色，可使用渐变色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	// 列表外层容器圆角值
	radius: {
		type: String,
		default: '0'
	},
	// 是否处于加载状态
	loading: {
		type: Boolean,
		default: false
	},
	// 是否已加载完成所有数据
	finished: {
		type: Boolean,
		default: false
	},
	// 是否加载失败
	error: {
		type: Boolean,
		default: false
	},
	// 延迟计算时间(ms)，避免频繁计算
	delay: {
		type: Number,
		default: 50
	}
});

const leftListConst = ref([]);
const leftList = ref([]);
const rightList = ref([]);
const init = ref(true);

// 监听列表数据变化
watch(() => props.listData, (newVal) => {
	if (newVal && newVal.length > 0) {
		nextTick(() => {
			initData();
		});
	}
}, { deep: true });

// 监听列数变化
watch(() => props.columnCount, (newVal) => {
	columnChange(newVal);
}, { immediate: false });

onMounted(() => {
	init.value = false;
	columnChange(props.columnCount);
});

// 列数变化处理
const columnChange = (val) => {
	if (props.columnCount < 2) {
		leftList.value = [...props.listData];
		rightList.value = [];
	} else {
		if (val && val == 2) {
			leftList.value = [...leftListConst.value];
		}
		initData();
	}
	emit('change', {
		leftList: leftList.value,
		rightList: rightList.value
	});
};

// 初始化数据
const initData = () => {
	if (props.columnCount < 2) {
		leftList.value = [...props.listData];
		return;
	}
	
	if (props.type == 1) {
		getSubGroup();
	} else {
		getArrayByHeight();
	}
};

// 获取新增的数据
const getDiffList = () => {
	let diffList = [];
	let total = props.listData.length;
	
	if (total <= props.pageSize) {
		// 首页数据或刷新，重置列表
		leftListConst.value = [];
		leftList.value = [];
		rightList.value = [];
	}
	
	let sum = leftListConst.value.length + rightList.value.length;
	let diff = total - sum;
	
	if (diff > 0) {
		// 筛选出新增的数据
		diffList = [...props.listData].slice(sum);
	}
	
	return diffList;
};

// 简单左右分组（适用于type=1）
const getSubGroup = () => {
	if (!props.listData || props.listData.length === 0) return;
	
	let newLeftList = [];
	let newRightList = [];
	let data = getDiffList();
	
	data.forEach((item, index) => {
		if (index % 2 === 0) {
			newLeftList.push(item);
		} else {
			newRightList.push(item);
		}
	});
	
	leftList.value = [...leftList.value, ...newLeftList];
	leftListConst.value = [...leftListConst.value, ...newLeftList];
	rightList.value = [...rightList.value, ...newRightList];
};

// 按照高度计算分组（适用于type=2）
const getArrayByHeight = async () => {
	if (!props.listData || props.listData.length === 0) return;
	
	let data = getDiffList();
	for (let item of data) {
		await render(item);
	}
};

// 延迟函数
const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// 渲染单个项目
const render = async (item) => {
	await sleep(props.delay);
	
	try {
		const obj = await getContainerHeight();
		if (obj && typeof obj.leftHeight === 'number') {
			if (obj.leftHeight <= obj.rightHeight) {
				leftList.value.push(item);
				leftListConst.value.push(item);
			} else {
				rightList.value.push(item);
			}
			return true;
		}
	} catch (error) {
		console.error('瀑布流计算高度出错:', error);
		return false;
	}
};

// 获取容器高度
const getContainerHeight = () => {
	return new Promise((resolve, reject) => {
		const query = uni.createSelectorQuery().in(proxy);
		const nodes = query.selectAll('#zx-waterfall__left, #zx-waterfall__right');
		
		nodes.boundingClientRect().exec((res) => {
			if (res && res[0] && res[0].length >= 2) {
				const rects = res[0];
				const leftHeight = rects[0].height;
				const rightHeight = rects[1].height;
				
				resolve({
					leftHeight: leftHeight,
					rightHeight: rightHeight
				});
			} else {
				reject('获取容器高度失败');
			}
		});
	});
};

// 暴露方法给父组件
defineExpose({
	resetList: () => {
		leftListConst.value = [];
		leftList.value = [];
		rightList.value = [];
	},
	getListData: () => {
		return {
			leftList: leftList.value,
			rightList: rightList.value
		};
	}
});
</script>

<style lang="scss" scoped>
.zx-waterfall {
	width: 100%;
	display: inline-flex;
	justify-content: space-between;
	flex-direction: row;
	flex-wrap: wrap;
	box-sizing: border-box;
	align-items: flex-start;
	position: relative;

	.list {
		flex: 1;
		
		.item {
			margin-bottom: 10rpx;
		}
	}
	
	.loading-wrapper,
	.finished-wrapper,
	.error-wrapper {
		width: 100%;
		padding: 20rpx 0;
		text-align: center;
		color: #969799;
		font-size: 28rpx;
	}
	
	.error {
		color: #ff4d4f;
	}
}
</style>
