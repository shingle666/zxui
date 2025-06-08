<template>
	<view class="zx-password-input" :style="customStyle">
		<view class="zx-password-input__security" :class="{ 'zx-password-input__security--gutter': gutter > 0 }" @tap.stop="onTouchStart">
			<view
				v-for="(item, index) in length"
				:key="index"
				class="zx-password-input__item"
				:style="{
					marginRight: gutter > 0 && index < length - 1 ? addUnit(gutter) : 0,
					width: addUnit(itemWidth),
					height: addUnit(itemHeight)
				}"
				:class="{ 'zx-password-input__item--focus': focused && index === (value || '').length }"
			>
				<text v-if="mask && (value || '').length > index" class="zx-password-input__dot"></text>
				<text v-else-if="!mask && (value || '').length > index" class="zx-password-input__char">{{ (value || '')[index] }}</text>
				<view v-if="focused && index === (value || '').length" class="zx-password-input__cursor"></view>
			</view>
		</view>
		<view v-if="info || errorInfo" class="zx-password-input__message" :class="{ 'zx-password-input__message--error': errorInfo }">
			{{ errorInfo || info }}
		</view>
	</view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
	customStyle: {
		type: [String, Object],
		default: ''
	},
	value: {
		type: String,
		default: ''
	},
	info: {
		type: String,
		default: ''
	},
	errorInfo: {
		type: String,
		default: ''
	},
	length: {
		type: [Number, String],
		default: 6
	},
	gutter: {
		type: [Number, String],
		default: 0
	},
	mask: {
		type: Boolean,
		default: true
	},
	focused: {
		type: Boolean,
		default: false
	},
	// 自定义项目宽度和高度，方便调整
	itemWidth: {
		type: [Number, String],
		default: 'auto' // 默认为auto，如果gutter为0则均分，否则可以指定固定宽度
	},
	itemHeight: {
		type: [Number, String],
		default: 50
	}
});

const emit = defineEmits(['focus', 'update:value']);

const addUnit = (value) => {
	if (value === null || value === undefined || value === '') return '';
	value = String(value);
	return /[^0-9]$/.test(value) ? value : `${value}rpx`;
};

const onTouchStart = (event) => {
	// event.stopPropagation(); // 在uniapp中，tap事件默认会冒泡，如果需要阻止，可以考虑其他方式或根据具体场景决定
	emit('focus', event);
};

// 监听value变化，确保长度不超过props.length
watch(
	() => props.value,
	(newValue) => {
		if (newValue && newValue.length > Number(props.length)) {
			emit('update:value', newValue.slice(0, Number(props.length)));
		}
	}
);

</script>

<style lang="scss" scoped>
.zx-password-input {
	position: relative;
	margin: 0 30rpx; /* 对应 --van-password-input-margin: 0 var(--van-padding-md) */
	user-select: none;
	width: calc(100% - 60rpx);

	&__security {
		display: flex;
		width: 100%;
		height: var(--zx-password-input-height, 100rpx); /* 对应 --van-password-input-height: 50px */
		cursor: pointer;
		border: 1rpx solid #ebedf0; /* 对应 BORDER_SURROUND */
		border-radius: var(--zx-password-input-radius, 12rpx); /* 对应 --van-password-input-radius: 6px */
		overflow: hidden; /* 防止cursor溢出边框 */

		&--gutter {
			border: none; /* 有间距时，外层容器无边框，由item自行处理 */
		}
	}

	&__item {
		position: relative;
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--zx-password-input-text-color, #323233); /* 对应 --van-password-input-text-color */
		font-size: var(--zx-password-input-font-size, 40rpx); /* 对应 --van-password-input-font-size: 20px */
		line-height: 1.2;
		background: var(--zx-password-input-background, #f7f8fa); /* 对应 --van-password-input-background */

		&:not(:last-child) {
			border-right: 1rpx solid #ebedf0; /* 对应 BORDER_LEFT，这里用border-right实现类似效果 */
		}

		.zx-password-input__security--gutter & {
			border: 1rpx solid #ebedf0; /* 有间距时，每个item都有边框 */
			border-radius: var(--zx-password-input-radius, 12rpx);
			&:not(:last-child) {
				border-right: 1rpx solid #ebedf0; /* 保持原有逻辑，但gutter模式下通常不需要这个 */
			}
		}
	}

	&__dot {
		position: absolute;
		top: 50%;
		left: 50%;
		width: var(--zx-password-input-dot-size, 20rpx); /* 对应 --van-password-input-dot-size: 10px */
		height: var(--zx-password-input-dot-size, 20rpx);
		background: var(--zx-password-input-dot-color, #323233); /* 对应 --van-password-input-dot-color */
		border-radius: 100%;
		transform: translate(-50%, -50%);
	}

	&__char {
		// 明文展示时的样式，可以根据需要调整
	}

	&__cursor {
		position: absolute;
		top: 50%;
		left: 50%;
		width: var(--zx-password-input-cursor-width, 2rpx); /* 对应 --van-password-input-cursor-width: 1px */
		height: var(--zx-password-input-cursor-height, 40%); /* 对应 --van-password-input-cursor-height: 40% */
		background: var(--zx-password-input-cursor-color, #323233); /* 对应 --van-password-input-cursor-color */
		transform: translate(-50%, -50%);
		animation: zx-cursor-flicker var(--zx-password-input-cursor-duration, 1s) infinite;
	}

	&__message {
		margin-top: var(--zx-padding-md, 20rpx); /* 对应 --van-padding-md */
		font-size: var(--zx-password-input-info-font-size, 28rpx); /* 对应 --van-password-input-info-font-size: var(--van-font-size-md) */
		text-align: center;
		color: var(--zx-password-input-info-color, #969799); /* 对应 --van-password-input-info-color */

		&--error {
			color: var(--zx-password-input-error-info-color, #ee0a24); /* 对应 --van-password-input-error-info-color */
		}
	}
}

@keyframes zx-cursor-flicker {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>