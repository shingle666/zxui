<template>
	<view
		class="zx-avatar"
		:class="[`zx-avatar--${shape}`, loading ? 'zx-avatar--loading' : '', customClass]"
		:style="avatarStyle"
		@click="clickHandler"
	>
		<slot>
			<!-- #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU  -->
			<open-data v-if="mpAvatar && allowMp" type="userAvatarUrl" :style="[{ width: size, height: size }]" />
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN && MP-QQ && MP-BAIDU  -->
			<template v-if="mpAvatar && allowMp"></template>
			<!-- #endif -->
			<zx-icon v-else-if="icon" :name="icon" :size="fontSize" :color="color"></zx-icon>
			<zx-text v-else-if="text" :text="text" :size="fontSize" :color="color" align="center"></zx-text>
			<image
				v-else
				class="zx-avatar__image"
				:class="[`zx-avatar__image--${shape}`, imgClass]"
				:src="avatarUrl || defaultUrl"
				:mode="mode"
				@error="errorHandler"
				@load="loadCompleted"
				:style="[{ width: size, height: size }]"
			></image>
			<view v-if="loading && !text && !icon && !mpAvatar" class="zx-avatar__loading">
				<view class="zx-avatar__loading-icon" :style="loadingStyle"></view>
			</view>
			<zx-badge
				v-if="badge"
				:text="badge"
				:bg-color="badgeColor"
				:offset="badgeOffset"
				:is-dot="badgeIsDot"
				:show-zero="badgeShowZero"
				:absolute="badgePosition"
				:size="badgeFontSize"
				:scale="badgeScale"
				:badgeStyle="badgeStyle"
			>
			</zx-badge>
		</slot>
	</view>
</template>

<script setup>
/**
 * Avatar  头像
 * @description 展示头像
 * @tutorial https://zxui.org/components/avatar
 * @property {String}			src				头像路径，如加载失败，将会显示默认头像(不能为相对路径)
 * @property {String}			shape			头像形状  （ circle (默认) | square）
 * @property {String | Number}	size			头像尺寸，可以为指定字符串(large, default, mini)，或者数值 （默认 40 ）
 * @property {String}			mode			头像图片的裁剪类型，与uni的image组件的mode参数一致，如效果达不到需求，可尝试传widthFix值 （默认 'scaleToFill' ）
 * @property {String}			text			用文字替代图片，级别优先于src
 * @property {String}			bgColor			背景颜色，一般显示文字时用 （默认 '#c0c4cc' ）
 * @property {String}			color			文字颜色 （默认 '#ffffff' ）
 * @property {String | Number}	fontSize		文字大小  （默认 18 ）
 * @property {String}			icon			显示的图标
 * @property {Boolean}			mpAvatar		显示小程序头像，只对百度，微信，QQ小程序有效  （默认 false ）
 * @property {Boolean}			randomBgColor	是否使用随机背景色  （默认 false ）
 * @property {String}			defaultUrl		加载失败的默认头像(组件有内置默认图片)
 * @property {String | Number}	colorIndex		如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
 * @property {String}			name			组件标识符  （默认 'level' ）
 * @property {Boolean}			preview			是否允许点击头像预览  （默认 false ）
 * @property {String|Number}   	badge           显示在头像右上角的徽标内容
 * @property {String}          	badgeColor      徽标背景颜色 （默认 '#ff4d4f' ）
 * @property {Object}          	badgeStyle      自定义徽标样式
 * @property {String}          	customClass     自定义样式类名
 * @property {String}          	imgClass        自定义图片样式类名
 * @property {Boolean}         	lazyLoad        是否开启图片懒加载
 * @property {String}          	loadingColor    加载动画颜色 （默认 '#ffffff' ）
 * @property {Array}           	badgeOffset     徽标的偏移量 （默认 [0, 0] ）
 * @property {Boolean}         	badgeIsDot      徽标是否显示为一个小点 （默认 false ）
 * @property {Boolean}         	badgeShowZero   值为零时是否显示Badge （默认 true ）
 * @property {String}          	badgePosition   徽标的位置 （默认 'rightTop' ）
 * @property {String}          	badgeFontSize   徽标的字体大小 （默认 '22rpx' ）
 * @property {Number}          	badgeScale      徽标的缩放比例 （默认 0.8 ）
 * @event    {Function}        	click           点击组件时触发   index: 用户传递的标识符
 * @event    {Function}        	error           图片加载失败时触发
 * @event    {Function}        	load            图片加载完成时触发
 * @example  <zx-avatar :src="src" mode="square"></zx-avatar>
 */

import { ref, getCurrentInstance, watch, onMounted, computed } from 'vue';

const { proxy } = getCurrentInstance();
const emits = defineEmits(['click', 'error', 'load']);

const props = defineProps({
	// 头像图片绝对路径
	src: {
		type: String,
		default: ''
	},
	// 头像形状，circle-圆形，square-方形
	shape: {
		type: String,
		default: 'circle'
	},
	// 头像尺寸
	size: {
		type: [String, Number],
		default: '100rpx'
	},
	// 裁剪模式
	mode: {
		type: String,
		default: 'aspectFill'
	},
	// 显示的文字
	text: {
		type: String,
		default: ''
	},
	// 背景色
	bgColor: {
		type: String,
		default: '#c0c4cc'
	},
	// 文字颜色
	color: {
		type: String,
		default: '#ffffff'
	},
	// 文字大小
	fontSize: {
		type: [String, Number],
		default: '36rpx'
	},
	// 显示的图标
	icon: {
		type: String,
		default: ''
	},
	// 显示小程序头像，只对百度，微信，QQ小程序有效
	mpAvatar: {
		type: Boolean,
		default: false
	},
	// 是否使用随机背景色
	randomBgColor: {
		type: Boolean,
		default: false
	},
	// 加载失败的默认头像(组件有内置默认图片)
	defaultUrl: {
		type: String,
		default: ''
	},
	// 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
	colorIndex: {
		type: [String, Number],
		default: 0
	},
	// 组件标识符
	name: {
		type: String,
		default: 'avatar'
	},
	// 点击头像是否可以预览
	preview: {
		type: Boolean,
		default: false
	},
	// 徽标内容
	badge: {
		type: [String, Number, Boolean],
		default: ''
	},
	// 徽标背景颜色
	badgeColor: {
		type: String,
		default: '#ff4d4f'
	},
	// 自定义徽标样式
	badgeStyle: {
		type: Object,
		default: () => ({})
	},
	// 自定义类名
	customClass: {
		type: String,
		default: ''
	},
	// 图片类名
	imgClass: {
		type: String,
		default: ''
	},
	// 是否开启图片懒加载
	lazyLoad: {
		type: Boolean,
		default: false
	},
	// 加载动画颜色
	loadingColor: {
		type: String,
		default: '#ffffff'
	},
	// 徽标的偏移量
	badgeOffset: {
		type: Array,
		default: () => [0, 0]
	},
	// 徽标是否显示为一个小点
	badgeIsDot: {
		type: Boolean,
		default: false
	},
	// 值为零时是否显示Badge
	badgeShowZero: {
		type: Boolean,
		default: true
	},
	// 徽标的位置
	badgePosition: {
		type: String,
		default: 'rightTop'
	},
	// 徽标的字体大小
	badgeFontSize: {
		type: String,
		default: '22rpx'
	},
	// 徽标的缩放比例
	badgeScale: {
		type: Number,
		default: 0.8
	}
});

const base64Avatar = ref(
	'data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjREMEQwRkY0RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjREMEQwRkY1RjgwNDExRUE5OTY2RDgxODY3NkJFODMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEQwRDBGRjJGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEQwRDBGRjNGODA0MTFFQTk5NjZEODE4Njc2QkU4MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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'
);

// 如果配置randomBgColor参数为true，在图标或者文字的模式下，会随机从中取出一个颜色值当做背景色
const colors = ref([
	'#ffb34b',
	'#f2bba9',
	'#f7a196',
	'#f18080',
	'#88a867',
	'#bfbf39',
	'#89c152',
	'#94d554',
	'#f19ec2',
	'#afaae4',
	'#e1b0df',
	'#c38cc1',
	'#72dcdc',
	'#9acdcb',
	'#77b1cc',
	'#448aca',
	'#86cefa',
	'#98d1ee',
	'#73d1f1',
	'#80a7dc'
]);

const avatarUrl = ref('');
const allowMp = ref(false);
const loading = ref(false);

onMounted(() => {
	avatarUrl.value = props.src;
	init();
});

// 头像样式计算属性
const avatarStyle = computed(() => {
	const bgColor = props.text || props.icon 
		? (props.randomBgColor 
			? colors.value[props.colorIndex !== '' ? props.colorIndex : random(0, 19)] 
			: props.bgColor) 
		: 'transparent';
	
	return {
		backgroundColor: bgColor,
		width: props.size,
		height: props.size
	};
});

// 加载动画样式
const loadingStyle = computed(() => {
	return {
		borderColor: `${props.loadingColor} transparent transparent transparent`
	};
});

const init = () => {
	// #ifdef MP-WEIXIN || MP-QQ || MP-BAIDU
	allowMp.value = true;
	// #endif
};

// 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
const isImg = () => {
	return props.src.indexOf('/') !== -1;
};

// 图片加载时失败时触发
const errorHandler = () => {
	loading.value = false;
	avatarUrl.value = props.defaultUrl || base64Avatar.value;
	emits('error', props.name);
};

// 图片加载完成
const loadCompleted = () => {
	loading.value = false;
	emits('load', props.name);
};

const clickHandler = () => {
	emits('click', props.name);
	
	// 如果允许预览，则预览图片
	if (props.preview && avatarUrl.value && !props.text && !props.icon && !props.mpAvatar) {
		uni.previewImage({
			urls: [avatarUrl.value],
			current: avatarUrl.value
		});
	}
};

const random = (min, max) => {
	if (min >= 0 && max > 0 && max >= min) {
		const gab = max - min + 1;
		return Math.floor(Math.random() * gab + min);
	}
	return 0;
};

// 监听头像src的变化
watch(
	() => props.src,
	(newVal) => {
		if (newVal) {
			loading.value = true;
		}
		avatarUrl.value = newVal;
		// 如果没有传src，则主动触发error事件，用于显示默认的头像，否则src为''空字符等的时候，会无内容展示
		if (!newVal) {
			errorHandler();
		}
	},
	{ immediate: true }
);
</script>

<style lang="scss" scoped>
.zx-avatar {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;

	&--circle {
		border-radius: 50%;
	}

	&--square {
		border-radius: 10rpx;
	}

	&--loading {
		opacity: 0.6;
	}

	&__image {
		width: 100%;
		height: 100%;
		
		&--circle {
			border-radius: 50%;
		}

		&--square {
			border-radius: 10rpx;
		}
	}
  
	&__loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.2);

		&-icon {
			width: 40%;
			height: 40%;
			border: 4rpx solid #ffffff;
			border-radius: 50%;
			border-color: #ffffff transparent transparent transparent;
			animation: zx-avatar-loading 1s linear infinite;
		}
	}
}

@keyframes zx-avatar-loading {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
