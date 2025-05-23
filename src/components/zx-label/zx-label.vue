<template>
	<view class="zx-label__box" :class="{'zx-label__full':isFull}" :style="{padding:padding,margin:margin}"
		@tap.stop="onClick">
		<slot></slot>
	</view>
</template>

<script setup>

	import { ref, defineProps, defineExpose, provide, inject, onMounted, nextTick, getCurrentInstance } from 'vue';

	// 获取组件实例
	const { proxy } = getCurrentInstance();
	
	// 设置组件名称，用于组件通信
	proxy.$options = proxy.$options || {};
	proxy.$options.name = 'zx-label';

	const props = defineProps({
		padding: {
			type: String,
			default: '0'
		},
		margin: {
			type: String,
			default: '0'
		},
		isFull: {
			type: Boolean,
			default: false
		},
		for: {
			type: String,
			default: ''
		}
	});

	const childrens = ref([]);
	const targetElement = ref(null);

	// 当点击 label 时触发
	const onClick = () => {
		// 如果有指定for属性，优先处理
		if (props.for) {
			handleForAttribute();
			return;
		}
		
		// 如果没有for属性，但有子组件
		if (childrens.value && childrens.value.length > 0) {
			// 根据文档，内部有多个控件时默认触发第一个控件
			if (childrens.value[0] && childrens.value[0].labelClick) {
				childrens.value[0].labelClick();
			}
		}
	};

	// 处理for属性指定的元素
	const handleForAttribute = () => {
		// 获取页面中通过ID指定的元素
		const pages = getCurrentPages();
		if (pages.length) {
			const currentPage = pages[pages.length - 1];
			nextTick(() => {
				uni.createSelectorQuery().in(currentPage)
					.select('#' + props.for)
					.fields({
						context: true,
						node: true
					}, (res) => {
						if (res && res.node) {
							// 如果找到了元素，模拟点击该元素
							const el = res.node;
							if (el.triggerEvent) {
								el.triggerEvent('tap');
							} else if (el.labelClick) {
								el.labelClick();
							}
						}
					})
					.exec();
			});
		}
	};

	// 暴露给父组件的属性和方法
	defineExpose({
		childrens
	});
</script>

<style scoped>
	.zx-label__box {
		box-sizing: border-box;
	}

	.zx-label__full {
		flex: 1;
		width: 100%;
	}
</style>
