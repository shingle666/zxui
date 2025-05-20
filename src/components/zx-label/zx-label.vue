<template>
	<view class="zx-label__box" :class="{'zx-label__full':isFull}" :style="{padding:padding,margin:margin}"
		@tap.stop="onClick">
		<slot></slot>
	</view>
</template>

<script setup>
	//该组件主要用于zx-radio，zx-checkbox，zx-switch组件外层，类似label功能
	import { ref, defineProps, defineExpose } from 'vue';

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
		}
	});

	const childrens = ref([]);

	const onClick = () => {
		if (childrens.value && childrens.value.length > 0) {
			for (let child of childrens.value) {
				child.labelClick();
			}
		}
	};

	// 暴露给父组件的属性和方法
	defineExpose({
		childrens
	});
</script>

<style scoped>
	.zx-label__box {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.zx-label__full {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
</style>
