<template>
	<form :disabled="disabled" :report-submit="reportSubmit" @submit="submit()" @reset="reset()">
		<slot></slot>
	</form>
</template>

<script setup>
	import { getCurrentInstance, ref } from 'vue';
	
	const {proxy} = getCurrentInstance();

	const props = defineProps({
		disabled:{
			type: Boolean,
			default: false
		},
		reportSubmit:{
			type: Boolean,
			default: false
		},
	});

	function submit(e) {
		proxy.$emit('submit',e)
	}

	function reset(e) {
		proxy.$emit('reset',e)
	}
</script>

<style>

</style>