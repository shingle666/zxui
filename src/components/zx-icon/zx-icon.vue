<template>
	<view @tap="onClick">
		<image v-if="isImg" :src="name" :mode="imgMode" :style="[imgStyle, customStyle]"></image>
		<text v-else :style="[iconStyle, customStyle]" :class="iconClass"></text>
	</view>
</template>

<script setup>
/**
 * icon 图标
 * @description 可以同时使用字体图标和图片。
 * @tutorial https://zxui.org/components/icon
 * @property {String}			name			图标名称
 * @property {String}			color			图标颜色
 * @property {String | Number}	size			图标字体大小
 * @property {Boolean}			bold			是否显示粗体
 * @property {String | Number}	index			点击图标的时候传递事件出去的index
 * @property {String}			customPrefix	自定义扩展前缀
 * @property {String}			imgMode			图片的mode
 * @property {String | Number}	width			显示图片小图标时的宽度
 * @property {String | Number}	height			显示图片小图标时的高度
 * @property {String | Number}	top				图标在垂直方向上的定位 用于解决某些情况下，让图标垂直居中的用途
 * @property {Object}			customStyle		icon的样式，对象形式
 * @event {Function}            onClick         点击图标时触发
 * @example 
 * <zx-icon name="eye"></zx-icon>
 */
import { ref, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const props = defineProps({
	// 图标类名
	name: {
		type: String,
		default: ''
	},
	// 图标颜色，可接受主题色
	color: {
		type: String,
		default: '#b0b0b0'
	},
	// 字体大小
	size: {
		type: [String, Number],
		default: '34rpx'
	},
	// 是否显示粗体
	bold: {
		type: Boolean,
		default: false
	},
	// 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
	index: {
		type: [String, Number],
		default: 0
	},
	// 自定义扩展前缀，方便用户扩展自己的图标库
	customPrefix: {
		type: String,
		default: 'zx-icon'
	},
	// 图片的mode
	imgMode: {
		type: String,
		default: ''
	},
	// 用于显示图片小图标时，图片的宽度
	width: {
		type: String,
		default: ''
	},
	// 用于显示图片小图标时，图片的高度
	height: {
		type: String,
		default: ''
	},
	// 用于解决某些情况下，让图标垂直居中的用途
	top: {
		type: String,
		default: ''
	},
	customStyle: {
		type: Object,
		default: function() {
			return {};
		}
	}
});

const iconStyle = computed(() => {
	let style = {};
	style = {
		color: props.color,
		fontSize: props.size,
		lineHeight: props.size,
		fontWeight: props.bold ? 'bold' : 'normal',
		// 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
		top: props.top
	};
	return style;
});
const iconClass = computed(() => {
	let iconClasses = [];
	iconClasses.push(props.customPrefix);
	iconClasses.push(props.customPrefix + '-' + props.name);
	return iconClasses;
});
// 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
const isImg = computed(() => {
	return props.name.indexOf('/') !== -1;
});
const imgStyle = computed(() => {
	let style = {};
	// 如果设置width和height属性，则优先使用，否则使用size属性
	style.width = props.width ? props.width : props.size;
	style.height = props.height ? props.height : props.size;
	return style;
});

const onClick = e => {
	proxy.$emit('onClick', props.index);
};
</script>

<style scoped>
@import './icon.css';

</style>
