<template>
	<!-- #ifdef APP-PLUS -->
	<text :data-url="url" @tap="clickHandler" :style="[linkStyle, customStyle]" :class="[
		`zx-link--${type}`,
		disabled && 'zx-link--disabled',
		underline === 'always' && 'zx-link--underline'
	]">
		<slot name="icon"></slot>
		<slot>{{ text }}</slot>
	</text>
	<!-- #endif -->

	<!-- #ifdef H5 -->
	<a v-if="!disabled" :href="url" class="zx-link" target="_blank" :style="[linkStyle, customStyle]" :class="[
		`zx-link--${type}`,
		underline === 'always' && 'zx-link--underline',
		underline === 'hover' && 'zx-link--underline-hover'
	]">
		<slot name="icon"></slot>
		<slot>{{ text }}</slot>
	</a>
	<text v-else class="zx-link zx-link--disabled" :class="`zx-link--${type}`" :style="[linkStyle, customStyle]">
		<slot name="icon"></slot>
		<slot>{{ text }}</slot>
	</text>
	<!-- #endif -->

	<!-- #ifdef MP -->
	<text class="zx-link" :class="[
		`zx-link--${type}`,
		disabled && 'zx-link--disabled',
		underline === 'always' && 'zx-link--underline',
		underline === 'hover' && 'zx-link--underline-hover'
	]" :style="[linkStyle, customStyle]" @tap="clickHandler">
		<slot name="icon"></slot>
		<slot>{{ text }}</slot>
	</text>
	<!-- #endif -->

</template>

<script setup>
/**
 * link 超链接
 * @description 该组件为超链接组件，在不同平台有不同表现形式：在APP平台会通过plus环境打开内置浏览器，在小程序中把链接复制到粘贴板，同时提示信息，在H5中通过window.open打开链接。
 * @tutorial https://zxui.org/components/link
 * @property {String}			url		    跳转的链接
 * @property {String}			text		超链接的文本，可以使用slot替代
 * @property {String}			type		链接类型，可选值为 default/primary/success/warning/danger/info
 * @property {String}			underline	控制下划线显示，可选值为 always/hover/never
 * @property {Boolean}			disabled	是否禁用状态
 * @property {String}			color		文字颜色，会覆盖type对应的颜色
 * @property {String ｜ Number}	fontSize	字体大小，单位px或rpx
 * @property {String ｜ Number}	lineHeight	行高，单位px或rpx
 * @property {String}			mpTips		各个小程序平台把链接复制到粘贴板后的提示语
 * @property {Object}			customStyle	定义需要用到的外部样式
 *
 * @example <zx-link url="https://example.com" type="primary">链接文本</zx-link>
 * @example <zx-link url="https://example.com" :disabled="true">禁用链接</zx-link>
 * @example <zx-link url="https://example.com" underline="always">总是显示下划线</zx-link>
 */
import { computed } from 'vue';

// 定义props
const props = defineProps({
	// 跳转链接
	url: {
		type: String,
		default: ''
	},
	// 链接文字，也可通过slot传入
	text: {
		type: String,
		default: ''
	},
	// 链接类型
	type: {
		type: String,
		default: 'default',
		validator: (value) => {
			return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
		}
	},
	// 下划线控制
	underline: {
		type: String,
		default: 'hover',
		validator: (value) => {
			return ['always', 'hover', 'never'].includes(value)
		}
	},
	// 是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	// 文字颜色（会覆盖type）
	color: {
		type: String,
		default: ''
	},
	// 字体大小
	fontSize: {
		type: [String, Number],
		default: '28rpx'
	},
	// 行高
	lineHeight: {
		type: [String, Number],
		default: '50rpx'
	},
	// 小程序提示文本
	mpTips: {
		type: String,
		default: '链接已复制，请在浏览器打开'
	},
	// 自定义样式
	customStyle: {
		type: Object,
		default: () => ({})
	}
});

// 链接颜色映射
const typeColorMap = {
	default: '#606266',
	primary: '#409eff',
	success: '#67c23a',
	warning: '#e6a23c',
	danger: '#f56c6c',
	info: '#909399'
};

// 计算链接样式
const linkStyle = computed(() => {
	const style = {
		fontSize: props.fontSize,
		lineHeight: props.lineHeight
	};

	// 如果设置了自定义颜色，则使用自定义颜色，否则使用类型对应的颜色
	if (props.color) {
		style.color = props.color;
	} else {
		style.color = typeColorMap[props.type];
	}

	return style;
});

// 点击处理
const clickHandler = () => {
	if (props.disabled) return;

	// 针对不同平台的处理
	// #ifdef APP-PLUS
	openUrlForApp();
	// #endif

	// #ifdef MP
	copyLinkToClipboard();
	// #endif
};

// APP端打开链接
const openUrlForApp = () => {
	if (props.url) {
		// 使用plus环境打开内置浏览器
		plus.runtime.openURL(props.url);
	}
};

// 小程序复制链接到剪贴板
const copyLinkToClipboard = () => {
	if (props.url) {
		uni.setClipboardData({
			data: props.url,
			success: () => {
				uni.showToast({
					title: props.mpTips,
					icon: 'none'
				});
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.zx-link {
	text-decoration: none;
	display: inline-flex;
	align-items: center;

	// 类型样式
	&--default {
		color: #606266;
	}

	&--primary {
		color: #409eff;
	}

	&--success {
		color: #67c23a;
	}

	&--warning {
		color: #e6a23c;
	}

	&--danger {
		color: #f56c6c;
	}

	&--info {
		color: #909399;
	}

	// 禁用样式
	&--disabled {
		color: #c0c4cc;
		cursor: not-allowed;
		opacity: 0.7;
		pointer-events: none;
	}

	// 下划线样式
	&--underline {
		text-decoration: underline;
	}

	// 悬停下划线
	/* #ifdef H5 */
	&--underline-hover {
		&:hover {
			text-decoration: underline;
		}
	}

	/* #endif */
}
</style>
