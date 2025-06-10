<template>
	<view v-if="show" class="zx-number-keyboard" :style="[rootStyle]" @touchmove.stop.prevent="noop">
		<view class="zx-number-keyboard__header" v-if="title || showCloseButton">
			<slot name="title-left">
				<text v-if="title" class="zx-number-keyboard__title">{{ title }}</text>
			</slot>
			<text v-if="showCloseButton" class="zx-number-keyboard__close" @click="onClose">{{ closeButtonText }}</text>
		</view>
		<view class="zx-number-keyboard__body">
			<view class="zx-number-keyboard__keys">
				<template v-for="(key, index) in keys" :key="index">
					<zx-number-keyboard-key :text="key.text" :type="key.type" :wider="key.wider" @press="onPress">
						<template v-if="key.type === 'delete'" #default>
							<slot v-if="$slots.delete" name="delete"></slot>
							<zx-icon v-else name="backspace-fill" size="28"></zx-icon>
							<!-- Reverted to backspace-fill -->
						</template>
						<template v-else-if="key.type === 'extra' && $slots['extra-key']" #default>
							<slot name="extra-key"></slot>
						</template>
						<template v-else-if="key.type === 'extra' && key.text !== ''" #default>
							<text>{{ key.text }}</text>
						</template>
						<template v-else-if="key.type === 'collapse'" #default>
							<zx-icon name="keyboard-26" size="28"></zx-icon> <!-- Reverted to keyboard-26 -->
						</template>
					</zx-number-keyboard-key>
				</template>
			</view>
			<view class="zx-number-keyboard__sidebar" v-if="theme === 'custom'">
				<zx-number-keyboard-key v-if="showDeleteKey" large :text="deleteButtonText" type="delete"
					@press="onPress">
					<template v-if="!$slots.delete" #default>
						<zx-icon name="backspace-fill" size="28"></zx-icon>
					</template>
					<template v-if="$slots.delete">
						<slot name="delete"></slot>
					</template>
				</zx-number-keyboard-key>
				<zx-number-keyboard-key large :text="closeButtonText" type="close" color="blue"
					:loading="closeButtonLoading" @press="onPress" />
			</view>
		</view>
		<view v-if="safeAreaInsetBottom" class="zx-safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref, computed, watch, getCurrentInstance } from 'vue';
import zxNumberKeyboardKey from './zx-number-keyboard-key.vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	},
	theme: {
		type: String,
		default: 'default' // 'default' or 'custom'
	},
	zIndex: {
		type: [Number, String],
		default: 100
	},
	modelValue: {
		type: String,
		default: ''
	},
	maxlength: {
		type: [Number, String],
		default: Infinity
	},
	blurOnClose: {
		type: Boolean,
		default: true
	},
	showDeleteKey: {
		type: Boolean,
		default: true
	},
	randomKeyOrder: {
		type: Boolean,
		default: false
	},
	closeButtonText: {
		type: String,
		default: '完成'
	},
	deleteButtonText: {
		type: String,
		default: '' // Empty to show icon by default
	},
	closeButtonLoading: {
		type: Boolean,
		default: false
	},
	hideOnClickOutside: {
		type: Boolean,
		default: true
	},
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	extraKey: {
		type: [String, Array],
		default: ''
	}
});

const emit = defineEmits(['update:modelValue', 'input', 'delete', 'close', 'blur', 'show', 'hide']);

const instance = getCurrentInstance();

const rootStyle = computed(() => {
	const style = {};
	if (props.zIndex) {
		style.zIndex = props.zIndex;
	}
	return style;
});

const shuffle = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const genBasicKeys = () => {
	const keysArray = Array(9).fill('').map((_, i) => ({ text: String(i + 1) }));
	if (props.randomKeyOrder) {
		return shuffle(keysArray);
	}
	return keysArray;
};

const genDefaultKeys = () => {
	const keys = [
		...genBasicKeys(),
	];
	// If extraKey is a non-empty string, use it as an 'extra' key.
	// Otherwise, for the default layout (matching screenshot 2), use a 'collapse' key for the keyboard icon.
	if (typeof props.extraKey === 'string' && props.extraKey.length > 0) {
		keys.push({ text: props.extraKey, type: 'extra' });
	} else {
		keys.push({ text: '', type: 'collapse' });
	}
	keys.push({ text: '0' });
	keys.push({ text: props.showDeleteKey ? props.deleteButtonText : '', type: props.showDeleteKey ? 'delete' : '' });
	return keys;
};

const genCustomKeys = () => {
	const basicKeys = genBasicKeys();
	const { extraKey } = props;
	const extraKeysArray = Array.isArray(extraKey) ? extraKey : [extraKey].filter(k => k !== '');

	if (extraKeysArray.length === 0) {
		basicKeys.push({ text: '0', wider: true });
	} else if (extraKeysArray.length === 1) {
		basicKeys.push({ text: '0', wider: true }, { text: extraKeysArray[0], type: 'extra' });
	} else if (extraKeysArray.length === 2) {
		basicKeys.push({ text: extraKeysArray[0], type: 'extra' }, { text: '0' }, { text: extraKeysArray[1], type: 'extra' });
	}
	return basicKeys;
};

const keys = computed(() => (props.theme === 'custom' ? genCustomKeys() : genDefaultKeys()));

const showCloseButton = computed(() => props.closeButtonText && props.theme === 'default');

const onBlur = () => {
	if (props.show) {
		emit('blur');
	}
};

const onClose = () => {
	emit('close');
	if (props.blurOnClose) {
		onBlur();
	}
};

const onPress = (text, type) => {
	if (text === '' && type !== 'delete' && type !== 'close') {
		if (type === 'extra') {
			// Consider if blur is needed for empty extra key
		}
		return;
	}

	const value = String(props.modelValue);

	if (type === 'delete') {
		emit('delete');
		emit('update:modelValue', value.slice(0, value.length - 1));
	} else if (type === 'close') {
		onClose();
	} else if (value.length < Number(props.maxlength)) {
		emit('input', text);
		emit('update:modelValue', value + text);
	}
};

// Handle hideOnClickOutside logic if needed, typically done at page level in uniapp
// or by emitting an event and letting parent handle it.

watch(() => props.show, (val) => {
	emit(val ? 'show' : 'hide');
});

const noop = (e) => {
	// Stop touchmove to prevent scrolling while keyboard is open
	e.preventDefault();
	e.stopPropagation();
}

</script>

<style lang="scss" scoped>
.zx-number-keyboard {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #f2f3f5;
	user-select: none;
	padding-bottom: constant(safe-area-inset-bottom);
	/* iOS < 11.2 */
	padding-bottom: env(safe-area-inset-bottom);
	/* iOS >= 11.2 */

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 34px;
		padding-top: 6px;
		color: #909399; // $zx-text-color-secondary
		font-size: 16px; // $zx-font-size-lg
	}

	&__title {
		display: inline-block;
		font-weight: normal; // Match Vant
	}

	&__close {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 100%;
		padding: 0 15px; // $zx-padding-md
		color: #007aff; // $zx-primary-color
		font-size: 14px; // $zx-font-size-md
		line-height: 34px;
	}

	&__body {
		display: flex;
		padding: 6px 0 0 6px;
	}

	&__keys {
		display: flex;
		flex: 3;
		flex-wrap: wrap;
	}

	&__sidebar {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding-right: 6px; // Match key wrapper padding
	}
}

.zx-safe-area-inset-bottom {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}
</style>