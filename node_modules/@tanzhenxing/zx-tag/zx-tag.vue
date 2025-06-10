<template>
	<zx-transition mode="fade" :show="show" :disabled="disableTransitions">
		<view class="zx-tag-wrapper">
			<view class="zx-tag" :class="[
				`zx-tag--${shape}`,
				`zx-tag--${normalizedType}`,
				`zx-tag--${normalizedSize}`,
				`zx-tag--${effect}`,
				plain && `zx-tag--plain`,
				plainFill && plain && `zx-tag--plain--fill`,
				round && `zx-tag--round`,
				hit && `zx-tag--hit`,
				disabled && `zx-tag--disabled`,
				closable && `zx-tag--closable`
			]" @tap.stop="clickHandler" :style="[tagStyle]">
				<slot name="icon">
					<view class="zx-tag__icon" v-if="icon">
						<image v-if="image(icon)" :src="icon" :style="[imgStyle]"></image>
						<zx-icon v-else :color="elIconColor" :name="icon" :size="iconSize"></zx-icon>
					</view>
				</slot>
				<slot>
					<text class="zx-tag__text" :style="[textColor]" :class="[
						`zx-tag__text--${normalizedType}`,
						`zx-tag__text--${normalizedSize}`,
						`zx-tag__text--${effect}`,
						plain && `zx-tag__text--plain`
					]">
						{{ text }}
					</text>
				</slot>
				<view class="zx-tag__close" :class="[`zx-tag__close--${normalizedSize}`]" v-if="closable"
					@tap.stop="closeHandler" :style="{ backgroundColor: closeColor }">
					<zx-icon name="close" :size="closeSize" color="#ffffff"></zx-icon>
				</view>
			</view>
		</view>
	</zx-transition>
</template>

<script setup>
/**
 * Tag 标签
 * @description tag组件一般用于标记和选择，我们提供了更加丰富的表现形式，能够较全面的涵盖您的使用场景
 * @tutorial https://zxui.org/components/tag
 * @property {String}			type				标签类型：primary、success、info、warning、danger/error （默认 'primary' ）
 * @property {String}			effect				主题：dark、light、plain （默认 'light' ）
 * @property {Boolean | String}	disabled			不可用（默认 false ）
 * @property {String}			size				标签的大小：large、default、small （默认 'default' ）
 * @property {String}			shape				tag的形状：circle（两边半圆形）, square（方形，带圆角）（默认 'square' ）
 * @property {Boolean}			round				是否为圆形标签（默认 false ）
 * @property {Boolean}			hit					是否有边框描边（默认 false ）
 * @property {String | Number}	text				标签的文字内容
 * @property {String}			bgColor				背景颜色，默认为空字符串，即不处理
 * @property {String}			color				标签字体颜色，默认为空字符串，即不处理
 * @property {String}			borderColor			镂空形式标签的边框颜色
 * @property {String}			closeColor			关闭按钮图标的颜色（默认 #C6C7CB）
 * @property {String | Number}	name				点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
 * @property {Boolean}			plainFill			镂空时是否填充背景色（默认 false ）
 * @property {Boolean}			plain				是否镂空（默认 false ）
 * @property {Boolean}			closable			是否可关闭，设置为true，文字右边会出现一个关闭图标（默认 false ）
 * @property {Boolean}			show				标签显示与否（默认 true ）
 * @property {Boolean}			disableTransitions	是否禁用渐变动画（默认 false ）
 * @property {String}			icon				内置图标，或绝对路径的图片
 * @property {String}			iconColor			图标颜色（默认 #ffffff）
 * @event {Function(index)} click 点击标签时触发 index: 传递的index参数值
 * @event {Function(index)} close closable为true时，点击标签关闭按钮触发 index: 传递的index参数值
 * @example <zx-tag text="标签" type="danger" effect="plain" round></zx-tag>
 */
import { ref, getCurrentInstance, computed } from 'vue';
import zxTransition from '@tanzhenxing/zx-transition/zx-transition.vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';


const { proxy } = getCurrentInstance();

const props = defineProps({
	// 标签类型：primary、success、info、warning、danger、error（兼容）
	type: {
		type: String,
		default: 'primary',
		validator: (value) => ['primary', 'success', 'info', 'warning', 'danger', 'error'].includes(value)
	},
	// 主题：dark、light、plain
	effect: {
		type: String,
		default: 'light',
		validator: (value) => ['dark', 'light', 'plain'].includes(value)
	},
	// 不可用
	disabled: {
		type: [Boolean, String],
		default: false
	},
	// 标签的大小：large、default、small，兼容原有的 medium、mini
	size: {
		type: String,
		default: 'default',
		validator: (value) => ['large', 'default', 'small', 'medium', 'mini'].includes(value)
	},
	// tag的形状，circle（两边半圆形）, square（方形，带圆角）
	shape: {
		type: String,
		default: 'square',
		validator: (value) => ['circle', 'square'].includes(value)
	},
	// 是否为圆形标签
	round: {
		type: Boolean,
		default: false
	},
	// 是否有边框描边
	hit: {
		type: Boolean,
		default: false
	},
	// 标签文字
	text: {
		type: [String, Number],
		default: ''
	},
	// 背景颜色，默认为空字符串，即不处理
	bgColor: {
		type: String,
		default: ''
	},
	// 标签字体颜色，默认为空字符串，即不处理
	color: {
		type: String,
		default: ''
	},
	// 标签的边框颜色
	borderColor: {
		type: String,
		default: ''
	},
	// 关闭按钮图标的颜色
	closeColor: {
		type: String,
		default: ''
	},
	// 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
	name: {
		type: [String, Number],
		default: ''
	},
	// 镂空时是否填充背景色
	plainFill: {
		type: Boolean,
		default: false
	},
	// 是否镂空（废弃，请使用 effect="plain"）
	plain: {
		type: Boolean,
		default: false
	},
	// 是否可关闭
	closable: {
		type: Boolean,
		default: false
	},
	// 是否显示
	show: {
		type: Boolean,
		default: true
	},
	// 是否禁用渐变动画
	disableTransitions: {
		type: Boolean,
		default: false
	},
	// 内置图标，或绝对路径的图片
	icon: {
		type: String,
		default: ''
	},
	// 图标颜色
	iconColor: {
		type: String,
		default: ''
	}
});

// 规范化类型（支持 error 向 danger 的转换）
const normalizedType = computed(() => {
	return props.type === 'error' ? 'danger' : props.type;
});

// 规范化尺寸（支持旧版本尺寸）
const normalizedSize = computed(() => {
	const sizeMap = {
		'mini': 'small',
		'medium': 'default',
		'default': 'default',
		'small': 'small',
		'large': 'large'
	};
	return sizeMap[props.size] || 'default';
});

// 标签样式
const tagStyle = computed(() => {
	const style = {};
	if (props.bgColor) {
		style.backgroundColor = props.bgColor;
	}
	if (props.color) {
		style.color = props.color;
	}
	if (props.borderColor) {
		style.borderColor = props.borderColor;
	}
	return style;
});

// nvue下，文本颜色无法继承父元素
const textColor = computed(() => {
	const style = {};
	if (props.color) {
		style.color = props.color;
	}
	return style;
});

const imgStyle = computed(() => {
	const width = normalizedSize.value === 'large' ? '17px' : normalizedSize.value === 'default' ? '15px' : '13px';
	return {
		width,
		height: width
	};
});

// 关闭按钮尺寸
const closeSize = computed(() => {
	const size = normalizedSize.value === 'large' ? 12 : normalizedSize.value === 'default' ? 10 : 8;
	return size;
});

// 图标大小
const iconSize = computed(() => {
	const size = normalizedSize.value === 'large' ? 21 : normalizedSize.value === 'default' ? 19 : 16;
	return size;
});

// 图标颜色
const elIconColor = computed(() => {
	if (props.iconColor) {
		return props.iconColor;
	}

	// 根据主题和类型确定图标颜色
	if (props.effect === 'dark') {
		return '#ffffff';
	} else if (props.effect === 'plain' || props.plain) {
		const colorMap = {
			'primary': '#409eff',
			'success': '#67c23a',
			'info': '#909399',
			'warning': '#e6a23c',
			'danger': '#f56c6c'
		};
		return colorMap[normalizedType.value] || '#409eff';
	} else {
		return '#ffffff';
	}
});

// 点击关闭按钮
const closeHandler = () => {
	proxy.$emit('close', props.name);
};

// 点击标签
const clickHandler = () => {
	if (props.disabled) return;
	proxy.$emit('click', props.name);
};

// 是否图片格式
const image = (value) => {
	const newValue = value.split('?')[0];
	const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
	return IMAGE_REGEXP.test(newValue);
};
</script>

<style lang="scss" scoped>
// 颜色变量定义
$zx-primary: #2979ff !default;
$zx-success: #07c160 !default;
$zx-info: #909399 !default;
$zx-warning: #ff9900 !default;
$zx-error: #fa3534 !default;

.zx-tag-wrapper {
	position: relative;
}

.zx-tag {
	display: flex;
	flex-direction: row;
	align-items: center;
	border-style: solid;
	border-width: 1px;
	transition: all 0.3s ease;

	&--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&--closable {
		padding-right: 18px;
		position: relative;
	}

	&--circle {
		border-radius: 100px;
	}

	&--square {
		border-radius: 4px;
	}

	&--round {
		border-radius: 100px !important;
	}

	&--hit {
		border-width: 2px !important;
	}

	&__icon {
		margin-right: 4px;
	}

	&__text {
		&--small {
			font-size: 12px;
			line-height: 12px;
		}

		&--default {
			font-size: 13px;
			line-height: 13px;
		}

		&--large {
			font-size: 14px;
			line-height: 14px;
		}
	}

	// 尺寸样式
	&--small {
		height: 24px;
		line-height: 22px;
		padding: 0 7px;

		&.zx-tag--closable {
			padding-right: 20px;
		}
	}

	&--default {
		height: 28px;
		line-height: 26px;
		padding: 0 10px;

		&.zx-tag--closable {
			padding-right: 24px;
		}
	}

	&--large {
		height: 32px;
		line-height: 30px;
		padding: 0 12px;

		&.zx-tag--closable {
			padding-right: 28px;
		}
	}

	// Primary 主色
	&--primary {
		&.zx-tag--dark {
			background-color: $zx-primary;
			border-color: $zx-primary;
			color: #ffffff;
		}

		&.zx-tag--light {
			background-color: #ecf5ff;
			border-color: #d9ecff;
			color: $zx-primary;
		}

		&.zx-tag--plain {
			background-color: transparent;
			border-color: $zx-primary;
			color: $zx-primary;

			&.zx-tag--plain--fill {
				background-color: #ecf5ff;
			}
		}
	}

	// Success 成功
	&--success {
		&.zx-tag--dark {
			background-color: $zx-success;
			border-color: $zx-success;
			color: #ffffff;
		}

		&.zx-tag--light {
			background-color: #f0f9ff;
			border-color: #c2e7b0;
			color: $zx-success;
		}

		&.zx-tag--plain {
			background-color: transparent;
			border-color: $zx-success;
			color: $zx-success;

			&.zx-tag--plain--fill {
				background-color: #f0f9ff;
			}
		}
	}

	// Info 信息
	&--info {
		&.zx-tag--dark {
			background-color: $zx-info;
			border-color: $zx-info;
			color: #ffffff;
		}

		&.zx-tag--light {
			background-color: #f4f4f5;
			border-color: #d3d4d6;
			color: $zx-info;
		}

		&.zx-tag--plain {
			background-color: transparent;
			border-color: $zx-info;
			color: $zx-info;

			&.zx-tag--plain--fill {
				background-color: #f4f4f5;
			}
		}
	}

	// Warning 警告
	&--warning {
		&.zx-tag--dark {
			background-color: $zx-warning;
			border-color: $zx-warning;
			color: #ffffff;
		}

		&.zx-tag--light {
			background-color: #fdf6ec;
			border-color: #f5dab1;
			color: $zx-warning;
		}

		&.zx-tag--plain {
			background-color: transparent;
			border-color: $zx-warning;
			color: $zx-warning;

			&.zx-tag--plain--fill {
				background-color: #fdf6ec;
			}
		}
	}

	// Danger 危险
	&--danger {
		&.zx-tag--dark {
			background-color: $zx-error;
			border-color: $zx-error;
			color: #ffffff;
		}

		&.zx-tag--light {
			background-color: #fef0f0;
			border-color: #fbc4c4;
			color: $zx-error;
		}

		&.zx-tag--plain {
			background-color: transparent;
			border-color: $zx-error;
			color: $zx-error;

			&.zx-tag--plain--fill {
				background-color: #fef0f0;
			}
		}
	}

	// 兼容旧版本样式（废弃）
	&--primary.zx-tag--plain {
		border-color: $zx-primary;
		color: $zx-primary;
		background-color: transparent;
	}

	&--error.zx-tag--plain {
		border-color: $zx-error;
		color: $zx-error;
		background-color: transparent;
	}

	&--warning.zx-tag--plain {
		border-color: $zx-warning;
		color: $zx-warning;
		background-color: transparent;
	}

	&--success.zx-tag--plain {
		border-color: $zx-success;
		color: $zx-success;
		background-color: transparent;
	}

	&--info.zx-tag--plain {
		border-color: $zx-info;
		color: $zx-info;
		background-color: transparent;
	}

	&__close {
		position: absolute;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: rgba(0, 0, 0, 0.4);
		}

		&--small {
			width: 14px;
			height: 14px;
		}

		&--default {
			width: 16px;
			height: 16px;
		}

		&--large {
			width: 18px;
			height: 18px;
		}
	}
}
</style>
