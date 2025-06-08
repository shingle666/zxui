<template>
	<view class="zx-skeleton" :class="{ 'zx-skeleton--animated': animated }">
		<!-- 骨架屏模板部分 -->
		<view v-if="internalLoading" class="zx-skeleton__wrapper">
			<!-- 渲染多个模板 -->
			<view 
				v-for="(item, index) in count" 
				:key="index" 
				class="zx-skeleton__item"
				:style="{ marginBottom: index < count - 1 ? '20rpx' : '0' }"
			>
				<slot name="template">
					<!-- 默认模板 - 头像+标题+段落 -->
					<view class="zx-skeleton__header">
						<zx-skeleton-item variant="circle" :size="60" :animated="animated" />
						<view class="zx-skeleton__title">
							<zx-skeleton-item variant="h3" :width="'40%'" :animated="animated" />
							<zx-skeleton-item variant="text" :width="'60%'" :animated="animated" />
						</view>
					</view>
					<!-- 段落行 -->
					<view class="zx-skeleton__paragraph">
						<zx-skeleton-item 
							v-for="row in rows" 
							:key="row" 
							variant="text" 
							:width="row === 1 ? '33%' : row === rows ? '61%' : '100%'"
							:style="{ marginBottom: row < rows ? '16rpx' : '0' }"
							:animated="animated"
						/>
					</view>
				</slot>
			</view>
		</view>
		
		<!-- 真实内容部分 -->
		<view v-else class="zx-skeleton__content">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

/**
 * zx-skeleton 骨架屏组件
 * @description 在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好
 * @property {Boolean} loading - 是否显示骨架屏，true 显示骨架屏，false 显示真实内容
 * @property {Boolean} animated - 是否开启动画效果
 * @property {Number} count - 渲染多少个骨架屏模板
 * @property {Number} rows - 骨架屏段落数量
 * @property {Number|Object} throttle - 渲染延迟，可以是数字（延迟显示）或对象 { leading: 500, trailing: 500, initVal: true }
 * @event {Function} click - 点击骨架屏触发事件
 */

// 定义组件名称
defineOptions({
	name: 'zx-skeleton'
})

// 定义 props
const props = defineProps({
	loading: {
		type: Boolean,
		default: true
	},
	animated: {
		type: Boolean,
		default: false
	},
	count: {
		type: Number,
		default: 1
	},
	rows: {
		type: Number,
		default: 3
	},
	throttle: {
		type: [Number, Object],
		default: 0
	}
})

// 定义事件
const emit = defineEmits(['click'])

// 内部状态
const internalLoading = ref(props.loading)

// 节流处理
const throttleTimer = ref(null)
const initTimer = ref(null)

// 处理节流逻辑
const handleThrottle = (newLoading) => {
	if (typeof props.throttle === 'number') {
		// 简单延迟
		if (props.throttle > 0) {
			clearTimeout(throttleTimer.value)
			throttleTimer.value = setTimeout(() => {
				internalLoading.value = newLoading
			}, props.throttle)
		} else {
			internalLoading.value = newLoading
		}
	} else if (typeof props.throttle === 'object') {
		// 复杂节流配置
		const { leading = 0, trailing = 0, initVal = false } = props.throttle
		
		// 处理初始值
		if (initVal !== undefined && initTimer.value === null) {
			internalLoading.value = initVal
			initTimer.value = true
			return
		}
		
		clearTimeout(throttleTimer.value)
		
		if (newLoading && leading > 0) {
			// 显示时的延迟
			throttleTimer.value = setTimeout(() => {
				internalLoading.value = newLoading
			}, leading)
		} else if (!newLoading && trailing > 0) {
			// 隐藏时的延迟
			throttleTimer.value = setTimeout(() => {
				internalLoading.value = newLoading
			}, trailing)
		} else {
			internalLoading.value = newLoading
		}
	} else {
		internalLoading.value = newLoading
	}
}

// 监听 loading 变化
watch(() => props.loading, (newLoading) => {
	handleThrottle(newLoading)
}, { immediate: true })

// 点击事件
const onClick = () => {
	emit('click')
}

// 清理定时器
const clearTimers = () => {
	if (throttleTimer.value) {
		clearTimeout(throttleTimer.value)
		throttleTimer.value = null
	}
}

// 组件卸载时清理定时器
import { onBeforeUnmount } from 'vue'
onBeforeUnmount(() => {
	clearTimers()
})
</script>

<style lang="scss" scoped>
.zx-skeleton {
	width: 100%;
	
	&__wrapper {
		width: 100%;
	}
	
	&__item {
		width: 100%;
	}
	
	&__header {
		display: flex;
		align-items: center;
		margin-bottom: 32rpx;
	}
	
	&__title {
		flex: 1;
		margin-left: 32rpx;
		
		.zx-skeleton-item:first-child {
			margin-bottom: 16rpx;
		}
	}
	
	&__paragraph {
		width: 100%;
	}
	
	&__content {
		width: 100%;
	}
	
	// 动画效果
	&--animated {
		.zx-skeleton-item {
			background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
			background-size: 400% 100%;
			animation: zx-skeleton-loading 1.4s ease infinite;
		}
	}
}

@keyframes zx-skeleton-loading {
	0% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0 50%;
	}
}
</style>
