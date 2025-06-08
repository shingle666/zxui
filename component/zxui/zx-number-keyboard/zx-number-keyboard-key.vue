<template>
	<view class="zx-key__wrapper" :class="{ 'zx-key__wrapper--wider': wider }">
		<view
			class="zx-key"
			:class="[{ 'zx-key--active': active }, { 'zx-key--large': large }, { 'zx-key--blue': color === 'blue' && type !== 'delete' && type !== 'close' }, { 'zx-key--delete': type === 'delete' } ]"
			@touchstart.stop.prevent="onTouchStart"
			@touchend.stop.prevent="onTouchEnd"
			@touchcancel.stop.prevent="onTouchEnd"
		>
			<slot v-if="type === 'delete' && text === ''"></slot>
			<slot v-else-if="type === 'extra' && text === ''"></slot>
			<slot v-else-if="type === 'collapse'"></slot> <!-- Slot for collapse icon, content provided by parent -->
			<template v-else-if="type === 'close' && color === 'blue'">
				<text>{{ text }}</text>
			</template>
			<template v-else-if="type === 'delete' && text !== ''">
				<text>{{ text }}</text>
			</template>
			<zx-loading-icon v-else-if="loading" class="zx-key__loading-icon" />
			<text v-else>{{ text }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import zxLoadingIcon from '../zx-loading-icon/zx-loading-icon.vue'; // Assuming zx-loading-icon component exists

const props = defineProps({
	text: [String, Number],
	type: String, // 'delete', 'extra', 'close'
	wider: Boolean,
	large: Boolean,
	color: String, // 'blue'
	loading: Boolean
});

const emit = defineEmits(['press']);

const active = ref(false);

const onTouchStart = () => {
	active.value = true;
};

const onTouchEnd = () => {
	if (active.value) {
		active.value = false;
		emit('press', props.text, props.type);
	}
};

</script>

<style lang="scss" scoped>
.zx-key__wrapper {
	position: relative;
	flex: 1;
	// flex-basis: 33.3333333%; // Handled by parent flex wrap
	box-sizing: border-box;
	padding: 0 6px 6px 0;

	&--wider {
		flex-basis: 66.6666666%;
	}
}

.zx-key {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 48px; // --van-number-keyboard-key-height
	font-size: 28px; // --van-number-keyboard-key-font-size
	line-height: 1.5;
	background-color: #fff; // --van-number-keyboard-key-background
	border-radius: 8px; // --van-radius-lg
	// cursor: pointer; // Not applicable on mobile
	// Haptic feedback can be added via uni.vibrateShort if needed

	&--active {
		background-color: #ebedf0; // --van-number-keyboard-key-active-color
	}

	&--large {
		// For custom theme sidebar buttons
		height: 100%; // Fill available height in sidebar
		// For sidebar delete button, it might need to be as tall as two rows of keys + spacing
		// This needs to be calculated or set based on the specific layout of the custom theme
		// If it's a single button like 'Done', 100% height is fine.
		// If there are two buttons (delete, done), they share the height.
		// For now, let's assume it fills the column cell.
	}

	&--blue {
		// For custom theme 'Done' button
		color: #fff; // --van-number-keyboard-button-text-color
		background-color: #007aff; // --van-primary-color
		&.zx-key--active {
			background-color: #0056b3; // Darken primary color on active
		}
	}

	&--delete {
		// For delete button in default and custom theme
		font-size: 16px; // --van-number-keyboard-delete-font-size, or use icon
		// If using an icon, ensure icon size is appropriate
		// background-color: #ebedf0; // Can be different for delete key if needed
		// &.zx-key--active {
		// 	background-color: #dcdfe6;
		// }
	}

	&__loading-icon {
		// Ensure loading icon color matches text color for blue button
		// This might need to be handled by passing color prop to zx-loading-icon
		// or by specific styles here if zx-loading-icon doesn't adapt.
		// For blue button, loading icon should be white.
		// For default button, it should be the default text color.
		color: inherit; // Default, may need override for blue button
	}
}

// Special handling for blue button loading icon color
.zx-key--blue .zx-key__loading-icon {
	// This assumes zx-loading-icon uses currentColor or can be styled via CSS vars
	// If not, you might need a prop for zx-loading-icon color
	// Forcing white color for loading icon on blue button
	// This is a common pattern, but check zx-loading-icon capabilities
	// Example: if zx-loading-icon is an SVG, you might set its 'fill' or 'stroke'
	// For simplicity, assuming it inherits or a class can set its color.
	// If zx-loading-icon is a font icon, 'color' should work.
	// If it's a component with its own color logic, this might not work directly.
	// Let's assume zx-loading-icon will be white if its parent has white text.
}

</style>