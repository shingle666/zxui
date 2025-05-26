<template>
	<view class="zx-more" :class="{ disabled, loading }" @click="handleClick">
		<slot name="prefix"></slot>
		<text :style="getStyle">
			<slot>{{ text }}</slot>
		</text>
		<slot name="suffix">
			<zx-icon v-if="!loading" :name="iconName" :color="color" size="32rpx"></zx-icon>
			<zx-icon v-else name="loading" :color="color" size="32rpx" class="loading-icon"></zx-icon>
		</slot>
	</view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	color: { type: String, default: '#555555' },
	text: { type: String, default: '更多' },
	size: { type: String, default: '28rpx' },
	link: { type: String, default: '' },
	linkType: { type: String, default: 'navigateTo' },
	iconName: { type: String, default: 'arrow-right-double' },
	disabled: { type: Boolean, default: false },
	loading: { type: Boolean, default: false }
});

const getStyle = computed(() => ({
	color: props.color,
	fontSize: props.size
}));

function handleClick() {
	if (props.disabled || props.loading) return;
	if (props.link) {
		switch (props.linkType) {
			case 'redirectTo':
				uni.redirectTo({ url: props.link });
				break;
			case 'reLaunch':
				uni.reLaunch({ url: props.link });
				break;
			case 'switchTab':
				uni.switchTab({ url: props.link });
				break;
			default:
				uni.navigateTo({ url: props.link });
				break;
		}
	}
}
</script>

<style scoped>
.zx-more {
	display: flex;
	flex-direction: row;
	align-items: center;
	cursor: pointer;
	user-select: none;
	transition: opacity 0.2s;
}
.zx-more.disabled {
	opacity: 0.5;
	pointer-events: none;
	cursor: not-allowed;
}
.zx-more.loading {
	pointer-events: none;
}
.loading-icon {
	animation: zx-spin 1s linear infinite;
}
@keyframes zx-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
