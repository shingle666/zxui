<template>
	<view
		class="zx-tabbar-item"
		:style="customStyle"
		@click.stop="onClick"
	>
		<zx-badge
			v-if="dot || badge"
			:isDot="!!dot"
			:text="badge"
			:style="badgeStyle"
			type="primary"
			max="99"
			absolute="rightTop"
			bgColor="#ff0000"
		>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<zx-icon v-if="icon" :name="icon" :color="active ? activeColor : inactiveColor" size="45rpx"></zx-icon>
				<zx-text :text="text" :color="active ? activeColor : inactiveColor" lines="1" size="30rpx" lineHeight="40rpx"></zx-text>
			</view>
		</zx-badge>
		<template v-else>
			<view style="display: flex;flex-direction: column;align-items: center;">
				<zx-icon v-if="icon" :name="icon" :color="active ? activeColor : inactiveColor" size="45rpx"></zx-icon>
				<zx-text :text="text" :color="active ? activeColor : inactiveColor" lines="1" size="30rpx" lineHeight="40rpx"></zx-text>
			</view>
		</template>
	</view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	name: [String, Number, null],
	icon: String,
	text: String,
	badge: [String, Number, null],
	dot: Boolean,
	badgeStyle: [Object, String],
	active: Boolean,
	activeColor: {
		type: String,
		default: '#ff0000'
	},
	inactiveColor: {
		type: String,
		default: '#7d7e80'
	},
	customStyle: {
		type: Object,
		default: () => ({})
	}
});

const emit = defineEmits(['click']);

function onClick() {
	emit('click', props.name);
}
</script>

<style lang="scss" scoped>
.zx-tabbar-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex: 1;
}

/* #ifdef MP */
// 小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
:host {
	flex: 1;
}
/* #endif */
</style>
