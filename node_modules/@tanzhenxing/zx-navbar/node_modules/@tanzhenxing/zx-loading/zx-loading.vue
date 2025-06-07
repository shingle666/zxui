<template>
	<!-- 该组件仅作为uni.showLoading的封装 -->
</template>

<script setup>
import {ref, watch, onBeforeUnmount} from 'vue'

/**
 * zx-loading 加载组件
 * @description 加载数据时显示动效，基于uni.showLoading API实现
 * @property {Boolean} show - 是否显示加载组件，默认false
 * @property {String} text - 显示的文本，默认"正在加载..."
 * @property {Boolean} mask - 是否显示透明蒙层，防止触摸穿透，默认false
 */

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	text: {
		type: String,
		default: "正在加载..."
	},
	mask: {
		type: Boolean,
		default: false
	}
})

const emits = defineEmits(['update:show'])

// 监听show属性变化，调用对应的原生API
watch(() => props.show, (newVal) => {
	if (newVal) {
		// 显示加载
		uni.showLoading({
			title: props.text,
			mask: props.mask
		})
	} else {
		// 隐藏加载
		uni.hideLoading()
	}
}, { immediate: true })

// 监听text和mask属性变化，如果loading正在显示，则更新
watch([() => props.text, () => props.mask], ([newText, newMask]) => {
	if (props.show) {
		// 先隐藏再显示，实现更新
		uni.hideLoading()
		uni.showLoading({
			title: newText,
			mask: newMask
		})
	}
})

// 组件销毁时确保隐藏loading
onBeforeUnmount(() => {
	if (props.show) {
		uni.hideLoading()
	}
})

// 关闭加载
const close = () => {
	uni.hideLoading()
	emits('update:show', false)
}

// 显示加载
const open = () => {
	uni.showLoading({
		title: props.text,
		mask: props.mask
	})
	emits('update:show', true)
}

// 暴露方法
defineExpose({
	close,
	open
})
</script>

<style>
/* 使用原生uni.showLoading，无需额外样式 */
</style>
