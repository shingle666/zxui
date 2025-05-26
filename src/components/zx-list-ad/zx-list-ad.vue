<template>
	<!-- #ifdef APP-NVUE -->
	<cell>
		<!-- #endif -->
		<view class="zx-list-ad">
			<view v-if="borderShow" :class="{'zx-list--border':border,'zx-list-item--first':isFirstChild}"></view>
			<ad style="width: 200px;height: 300px;border-width: 1px;border-color: red;border-style: solid;" :adpid="adpid"
			 :unit-id="unitId" :appid="appid" :apid="apid" :type="type" @error="aderror" @close="closeAd"></ad>
		</view>
		<!-- #ifdef APP-NVUE -->
	</cell>
	<!-- #endif -->

</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, getCurrentInstance } from 'vue'

const props = defineProps({
	adpid: { type: [String, Number], default: '' },
	unitId: { type: String, default: '' },
	appid: { type: String, default: '' },
	apid: { type: String, default: '' },
	type: { type: String, default: 'feed' },
	title: { type: String, default: '' }
})

const emit = defineEmits(['error', 'close'])

const isFirstChild = ref(false)
const border = ref(false)
const borderShow = ref(true)

function getForm(name = 'zxList') {
	let parent = getCurrentInstance()?.proxy?.$parent
	let parentName = parent?.$options?.name
	while (parentName !== name) {
		parent = parent?.$parent
		if (!parent) return false
		parentName = parent?.$options?.name
	}
	return parent
}

onMounted(() => {
	const list = getForm()
	if (list) {
		if (!list.firstChildAppend) {
			list.firstChildAppend = true
			isFirstChild.value = true
		}
		border.value = list.border
	}
})

function aderror(e) {
	emit('error', e)
}
function closeAd(e) {
	borderShow.value = false
	emit('close', e)
}
</script>

<style lang="scss">
$zx-border-color: #e5e5e5;
$zx-spacing-row-lg: 16px;

.zx-list-ad {
	position: relative;
	border: 1px red solid;
}

.zx-list--border {
	position: relative;
	padding-bottom: 1px;
	/* #ifdef APP-PLUS */
	border-top-color: $zx-border-color;
	border-top-style: solid;
	border-top-width: 0.5px;
	/* #endif */
	margin-left: $zx-spacing-row-lg;
}

/* #ifndef APP-NVUE */
.zx-list--border:after {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(.5);
	transform: scaleY(.5);
	background-color: $zx-border-color;
}

.zx-list-item--first:after {
	height: 0px;
}
/* #endif */
</style>
