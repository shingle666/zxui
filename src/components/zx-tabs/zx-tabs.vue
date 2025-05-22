<template>
	<view class="zx-tabs" :style="getStyle">
		<slot name="left"></slot>
		<view class="scroll-view-container">
			<scroll-view :class="scrollViewClass" :scroll-x="true" :scroll-left="scrollLeft" :scroll-with-animation="true">
				<block v-for="(item, index) in lists" :key="'tabs_' + index">
					<view :class="'tab-item-' + index" :style="getItemStyle" @click="clickHandler(item, index)">
						<!-- 占位空间 -->
						<view :style="getLineStyle"></view>
						<!-- 标题 -->
						<view :style="[currentIndex === index && !item.disabled ? activeStyle : inactiveStyle, { fontSize: fontSize }]">
							<text :style="{ color: item.disabled ? disabledColor : '' }">{{ item[keyName] }}</text>
						</view>
						<!-- 线条 -->
						<view class="flex-center">
							<view :style="[getLineStyle, { backgroundColor: currentIndex === index && !item.disabled ? lineColor : 'transparent' }]"></view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
		<slot name="right"></slot>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 宽度
	width: {
		type: String,
		default: '690rpx'
	},
	// 高度
	height: {
		type: String,
		default: '90rpx'
	},
	// 背景色
	backgroundColor: {
		type: String,
		default: 'transparent'
	},
	// 数据项
	items: {
		type: Array,
		default: () => {
			return [];
		}
	},
	// 默认读取的键名
	keyName: {
		type: String,
		default: 'name'
	},
	// 当前选中标签的索引
	index: {
		type: Number,
		default: 0
	},
	// 内边距
	padding: {
		type: String,
		default: '20rpx'
	},
	// 外边距
	margin: {
		type: String,
		default: '20rpx'
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 禁用时字体颜色
	disabledColor: {
		type: String,
		default: '#999999'
	},
	// 字体大小
	fontSize: {
		type: String,
		default: '32rpx'
	},
	// 菜单选择中时的样式
	activeStyle: {
		type: Object,
		default: () => {
			return { color: '#303133', fontWeight: 'bold', transform: 'scale(1.05)' };
		}
	},
	// 菜单非选中时的样式
	inactiveStyle: {
		type: Object,
		default: () => {
			return { color: '#606266' };
		}
	},
	// 线条宽度
	lineWidth: {
		type: String,
		default: '40rpx'
	},
	// 线条高度
	lineHeight: {
		type: String,
		default: '6rpx'
	},
	// 线条颜色
	lineColor: {
		type: String,
		default: '#3c9cff'
	},
	// 线条顶部距离
	lineTop: {
		type: String,
		default: '10rpx'
	}
});

const scrollLeft = ref(0);
const scrollViewWidth = ref(0); // scroll view 宽度
const scrollViewHeight = ref(0); // scroll view 高度
const tabsWidth = ref(0); // tabs 总宽度
const currentIndex = ref(0);
const scrollViewClass = ref('scroll-view');
const lists = ref(null);
const windowWidth = ref(0);

onMounted(async () => {
	currentIndex.value = props.index;
	lists.value = props.items;
	let systemInfo = uni.getWindowInfo();
	windowWidth.value = systemInfo.screenWidth;

	// 获取导航区块信息
	let rect = await getRect('.' + scrollViewClass.value);
	scrollViewWidth.value = rect.width;
	scrollViewHeight.value = rect.height;
	// 获取列表项信息
	let all_item = await getAllItemRect();
	all_item.forEach((item, index) => {
		lists.value[index].width = item.width;
		lists.value[index].left = item.left;
		tabsWidth.value += item.width;
	});
});
// 组件样式
const getStyle = computed(() => {
	let width = windowWidth.value;
	if(tabsWidth.value<windowWidth.value){
		width = tabsWidth.value;
	}
	return {
		backgroundColor: props.backgroundColor,
		paddingTop: props.margin,
		paddingBottom: props.margin,
		height: props.height,
		width: width + 'px'
	};
});

// 列表项样式
const getItemStyle = computed(() => {
	return {
		paddingLeft: props.padding,
		paddingRight: props.padding,
		display: 'inline-block'
	};
});

// 线条样式
const getLineStyle = computed(() => {
	return {
		width: props.lineWidth,
		height: props.lineHeight,
		marginTop: props.lineTop
	};
});

// 点击某一个标签
const clickHandler = async (item, index) => {
	currentIndex.value = index;
	// 当前元素中点 左距离
	if (item.left > windowWidth.value * 0.5) {
		scrollLeft.value = item.left - windowWidth.value + item.width * 0.5;
	} else {
		scrollLeft.value = 0;
	}

	proxy.$emit('change', {
		...item,
		index
	});
};

// 获取所有标签的尺寸
const getAllItemRect = async () => {
	let arr = [];
	for (let i = 0; i < lists.value.length; i++) {
		let item = await getRect(`.tab-item-${i}`);
		arr.push(item);
	}
	return arr;
};
// 查询节点信息
const getRect = async (selector) => {
	return new Promise((resolve) => {
		uni.createSelectorQuery()
			.in(proxy)
			.select(selector)
			.boundingClientRect((res) => {
				resolve(res);
			})
			.exec();
	});
};

defineExpose({ clickHandler });
</script>

<style scoped>
.zx-tabs {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
/* 不显示滚动条 */
::-webkit-scrollbar {
	display: none;
}
scroll-view ::-webkit-scrollbar {
	display: none;
}

.scroll-view-container {
	flex: 1;
	overflow: auto hidden;
}
.scroll-view {
	display: flex;
	flex-direction: row;
	white-space: nowrap;
	width: 100%;
	scrollbar-width: none;
	align-items: center;
	justify-content: center;
}
.flex-center {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
</style>
