<template>
	<!-- #ifdef APP-PLUS || MP-WEIXIN || H5 -->
	<view class="zx-drag__wrap" :list="list" :style="{ height: getHeight + 'rpx' }" :basedata="baseData">
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || MP-WEIXIN || H5 -->
		<view class="zx-drag__wrap" :style="{ height: getHeight + 'rpx' }">
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="zx-drag__item" v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="{ width:100 / columns + '%', height:  baseData.itemHeight + 'px' }"
				@longpress="longPress" :data-basedata="baseData" :data-edit="isEdit"
				@touchstart="touchstart" :catch:touchmove="dragging?touchmove:''"
				:catch:touchend="dragging?touchend:''">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS || H5 -->
			<view class="zx-drag__item" v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="{ width: 100 / columns + '%', height: itemHeight + 'rpx' }" @longpress="longPress"
				:data-basedata="baseData" :data-edit="isEdit" @touchstart="touchstart"
				@touchmove="touchmove" @touchend="touchend">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->

			<!-- #ifndef APP-PLUS || MP-WEIXIN || H5-->
			<view class="zx-drag__item"
				:class="{'zx-drag__current':current===index,'zx-drag__transition':current!==index && !isInit,'zx-drag__fixed':item.fixed,'zx-drag__hidden':isInit}"
				v-for="(item, index) in list" :key="item.id" :data-index="index"
				:style="itemStyle(index, item)"
				@longpress="longPress" @touchstart="touchstart" @touchmove.stop.prevent="touchmove"
				@touchend="touchend">
				<slot :entity="item.data" :fixed="item.fixed" :index="index" :height="itemHeight" :isEdit="isEdit">
				</slot>
			</view>
			<!-- #endif -->
		</view>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, nextTick } from 'vue'
const props = defineProps({
	listData: { type: Array, default: () => [] },
	columns: { type: Number, default: 3 },
	topSize: { type: Number, default: 0 },
	bottomSize: { type: Number, default: 0 },
	itemHeight: { type: Number, default: 0 },
	scrollTop: { type: Number, default: 0 },
	isEdit: { type: Boolean, default: true }
})
const emit = defineEmits(['click', 'sortend', 'change'])

const baseData = reactive({})
const platform = ref('')
const listWxs = ref([])
const rows = ref(4)
const list = ref([])
const dragging = ref(false)
const isInit = ref(true)

// mpdrag 混入的
const current = ref(-1)
const transX = ref('0px')
const transY = ref('0px')
const startTouch = ref(null)
const tDragging = ref(false)
const sId = ref(null)
const preStartKey = ref(null)

const getHeight = computed(() => rows.value * props.itemHeight)

watch(() => props.listData, () => {
	list.value = []
	setTimeout(() => {
		init()
	}, 0)
}, { deep: true })
watch(() => props.columns, () => {
	list.value = []
	setTimeout(() => {
		init()
	}, 0)
})

function vibrate() {
	// #ifndef H5
	if (platform.value !== 'devtools') uni.vibrateShort()
	// #endif
}
function pageScroll(e) {
	uni.pageScrollTo({
		scrollTop: e.scrollTop,
		duration: 0
	})
}
function drag(e) {
	dragging.value = e.dragging
}
function listChange(e) {
	listWxs.value = e.list
}
function itemClick(e) {
	let index = e.currentTarget.dataset.index
	let item = listWxs.value[index]
	emit('click', {
		key: item.realKey,
		data: item.data,
		extra: e.detail
	})
}
function unique(n = 6) {
	let rnd = ''
	for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10)
	return 'tui_' + new Date().getTime() + rnd
}
function initDom(callback) {
	let { windowWidth, windowHeight, platform: pf } = uni.getSystemInfoSync()
	let remScale = (windowWidth || 375) / 375
	platform.value = pf
	let bd = {}
	bd.windowHeight = windowHeight
	bd.realTopSize = (props.topSize * remScale) / 2
	bd.realBottomSize = (props.bottomSize * remScale) / 2
	bd.columns = props.columns
	bd.rows = rows.value
	const query = uni.createSelectorQuery().in(this)
	query.select('.zx-drag__item').boundingClientRect()
	query.select('.zx-drag__wrap').boundingClientRect()
	query.exec(res => {
		if (res && res.length > 0 && res[0] && res[0].width) {
			bd.itemWidth = res[0].width
			bd.itemHeight = res[0].height
			bd.wrapLeft = res[1].left
			bd.wrapTop = res[1].top + props.scrollTop
			dragging.value = false
			Object.assign(baseData, bd)
			callback && callback()
		}
	})
}
function init() {
	dragging.value = true
	isInit.value = true
	let delItem = item => {
		let obj = { ...item }
		let fixed = obj.fixed || false
		delete obj["fixed"]
		return {
			id: unique(),
			fixed: fixed,
			data: { ...obj }
		}
	}
	let listData = props.listData, _list = []
	listData.forEach((item, index) => {
		_list.push(delItem(item))
	})
	let i = 0, columns = props.columns
	let _list2 = (_list || []).map((item, index) => {
		item.realKey = i++
		item.sortKey = index
		item.tranX = `${(item.sortKey % columns) * 100}%`
		item.tranY = `${Math.floor(item.sortKey / columns) * 100}%`
		return item
	})
	rows.value = Math.ceil(_list2.length / columns)
	list.value = _list2
	listWxs.value = _list2
	if (_list2.length === 0) return
	let delay_time = 1000
	// #ifndef APP-PLUS || MP-WEIXIN || H5
	delay_time = 500
	// #endif
	nextTick(() => {
		setTimeout(() => {
			initDom(() => {
				// #ifndef APP-PLUS || MP-WEIXIN || H5
				_list2.map((item, index) => {
					item.transX = `${index%columns * baseData.itemWidth}px`
					item.transY = `${Math.floor(index/columns) * baseData.itemHeight}px`
				})
				list.value = _list2
				listWxs.value = _list2
				setTimeout(() => {
					isInit.value = false
				}, 500)
				// #endif
			})
		}, delay_time)
	})
}
function sort_end(e) {
	emit('sortend', {
		listData: e.listData
	})
}
function change(e) {
	emit('change', {
		listData: e.listData
	})
}
// 兼容 #ifndef APP-PLUS || MP-WEIXIN || H5 的拖拽逻辑
function isOutRange(x1, y1, x2, y2, x3, y3) {
	return x1 < 0 || x1 >= y1 || x2 < 0 || x2 >= y2 || x3 < 0 || x3 >= y3
}
function sortCore(sKey, eKey) {
	var excludeFix = (cKey, type) => {
		if (list.value[cKey].fixed) {
			var _cKey = type ? --cKey : ++cKey
			return excludeFix(cKey, type)
		}
		return cKey
	}
	let endRealKey = -1
	list.value.forEach((item) => {
		if (item.sortKey === eKey) endRealKey = item.realKey
	})
	return list.value.map((item) => {
		let cKey = item.sortKey
		let rKey = item.realKey
		if (sKey < eKey) {
			if (cKey > sKey && cKey <= eKey) {
				--rKey
				cKey = excludeFix(--cKey, true)
			} else if (cKey === sKey) {
				rKey = endRealKey
				cKey = eKey
			}
		} else if (sKey > eKey) {
			if (cKey >= eKey && cKey < sKey) {
				++rKey
				cKey = excludeFix(++cKey, false)
			} else if (cKey === sKey) {
				rKey = endRealKey
				cKey = eKey
			}
		}
		if (item.sortKey !== cKey && !item.fixed) {
			let columns = Number(props.columns)
			item.transX = (cKey % columns) * baseData.itemWidth + "px"
			item.transY = Math.floor(cKey / columns) * baseData.itemHeight + "px"
			item.sortKey = cKey
			item.realKey = rKey
		}
		return item
	})
}
function emitsEvent(_list, type) {
	let changeList = [], itemList = []
	_list.forEach((item) => {
		changeList[item.sortKey] = item
	})
	changeList.forEach((item) => {
		itemList.push(item.data)
	})
	if (type == "change") {
		change({ listData: itemList })
	} else {
		sort_end({ listData: itemList })
	}
}
function longPress(e) {
	if (!props.isEdit) return
	let touch = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : startTouch.value
	if (!touch) return
	current.value = Number(e.currentTarget.dataset.index)
	let item = list.value[current.value]
	if (item && item.fixed) return
	if (tDragging.value) return
	transX.value = props.columns == 1 ? 0 : touch.clientX - (baseData.itemWidth / 2 + baseData.wrapLeft) + 'px'
	transY.value = touch.clientY - (baseData.itemHeight / 2 + baseData.wrapTop) + 'px'
	sId.value = touch.identifier
	tDragging.value = true
}
function touchstart(e) {
	if (!props.isEdit) return
	startTouch.value = e.changedTouches[0] || e.touches[0]
}
function touchmove(e) {
	if (!props.isEdit || !tDragging.value) return
	let touch = e.changedTouches[0] || e.touches[0]
	if (!touch || sId.value !== touch.identifier) return
	let transX_ = props.columns == 1 ? 0 : touch.clientX - (baseData.itemWidth / 2 + baseData.wrapLeft)
	let transY_ = touch.clientY - (baseData.itemHeight / 2 + baseData.wrapTop)
	if (touch.clientY > baseData.windowHeight - baseData.itemHeight) {
		pageScroll({ scrollTop: touch.pageY + baseData.itemHeight - baseData.windowHeight })
	} else if (touch.clientY < baseData.itemHeight) {
		pageScroll({ scrollTop: touch.pageY - baseData.itemHeight })
	}
	transX.value = transX_ + 'px'
	transY.value = transY_ + 'px'
	let startKey = list.value[current.value].sortKey
	let curX = Math.round(transX_ / baseData.itemWidth)
	let curY = Math.round(transY_ / baseData.itemHeight)
	let endKey = curX + Number(props.columns) * curY
	var item = list.value[endKey]
	if (item && item.fixed) return
	if (isOutRange(curX, Number(props.columns), curY, rows.value, endKey, list.value.length)) return
	if (startKey === endKey || startKey === preStartKey.value) return
	preStartKey.value = startKey
	let _list = sortCore(startKey, endKey)
	listChange({ list: _list })
	emitsEvent(_list, "change")
}
function touchend(e) {
	if (!props.isEdit || !tDragging.value) return
	emitsEvent(list.value, "sortend")
	preStartKey.value = -1
	tDragging.value = false
	current.value = -1
	transX.value = '0px'
	transY.value = '0px'
}
function itemStyle(index, item) {
	let x = index === current.value && !item.fixed ? transX.value : item.transX
	let y = index === current.value && !item.fixed ? transY.value : item.transY
	return {
		width: 100 / props.columns + '%',
		height: props.itemHeight + 'rpx',
		transform: `translate3d(${x}, ${y}, 0px)`
	}
}
onMounted(() => {
	nextTick(() => {
		init()
	})
})
</script>

<style scoped>
	.zx-drag__wrap {
		position: relative;
	}

	.zx-drag__wrap .zx-drag__item {
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
		/* #ifndef APP-PLUS || MP-WEIXIN || H5 */
		transition: transform 0s;
		/* #endif */
	}

	.zx-drag__transition {
		transition: transform 0.35s !important;
	}

	.zx-drag__wrap .zx-drag__current {
		z-index: 10 !important;
	}

	.zx-drag__wrap .zx-drag__fixed {
		z-index: 1 !important;
	}

	.zx-drag__hidden {
		opacity: 0;
		visibility: hidden;
	}
</style>
