<template>
	<view>
		<view :style="getStyle()" class="flex-row" @click="change">
			<view v-if="!switchStatus" class="flex-row flex-center" :style="getCircleStyle()"></view>
			<view class="flex-row flex-center flex1">
				<text :style="{color: textColor}">{{switchStatus?activeValue:inactiveValue}}</text>
			</view>
			<view v-if="switchStatus" class="flex-row flex-center" :style="getCircleStyle()"></view>
		</view>
	</view>
</template>

<script setup>
/**
 * switch 开关选择器
 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
 * @tutorial https://zxui.org/components/switch
 * @property {Boolean}						loading			是否处于加载中（默认 false ）
 * @property {Boolean}						disabled		是否禁用（默认 false ）
 * @property {Number}			size			开关尺寸，单位px （默认 25 ）
 * @property {String}						activeColor		打开时的背景色 （默认 '#2979ff' ）
 * @property {String} 						inactiveColor	关闭时的背景色 （默认 '#ffffff' ）
 * @property {Boolean}	value			通过v-model双向绑定的值 
 * @property {String}	 activeValue		
 * @property {String} 	inactiveValue	
 * @property {Number}				space			圆点与外边框的距离 （默认 0 ）
 * @property {Object}						customStyle		定义需要用到的外部样式
 */

import { ref, onMounted, computed, getCurrentInstance, watch } from 'vue';

const { proxy } = getCurrentInstance();

const props = defineProps({
	// 是否为加载中状态
	loading: {
		type: Boolean,
		default: false
	},
	// 是否为禁用装填
	disabled: {
		type: Boolean,
		default: false
	},
	// 开关尺寸，单位rpx
	size: {
		type: Number,
		default: 50
	},
	// 打开时的背景颜色
	activeColor: {
		type: String,
		default: '#2979ff'
	},
	// 关闭时的背景颜色
	inactiveColor: {
		type: String,
		default: '#cacbcc'
	},
	// 通过v-model双向绑定的值
	value: {
		type: Boolean,
		default: false
	},
	// switch打开时的值
	activeValue: {
		type: String,
		default: '开启'
	},
	// switch关闭时的值
	inactiveValue: {
		type: String,
		default: '关闭'
	},
	// 圆点与外边框的距离
	space: {
		type: Number,
		default: 10
	},
	// 
	color:{
		type: String,
		default: '#ffffff'
	},
	textColor:{
		type: String,
		default: '#ffffff'
	},
	customStyle: {
		type: Object,
		default: () => {
			return {};
		}
	}
});

const buttonText = ref('');
const switchStatus = ref(false);
const bgColor = ref('#ffffff');

onMounted(()=>{
	switchStatus.value = props.value;
});

watch(()=>props.value,(val)=>{
	switchStatus.value = val;
})

/**
 * 开关样式
 */
const getStyle = ()=>{
	let style = {
		backgroundColor: '',
		padding: props.space+'rpx', 
		borderRadius: props.size+'rpx',
		width: props.size * 3 + 'rpx',
	};
	if(switchStatus.value){
		style.backgroundColor = props.activeColor;
	} else {
		style.backgroundColor = props.inactiveColor;
	}
	return style;
}
/**
 * 圆形按钮样式
 */
const getCircleStyle = ()=>{
	let style = {
		backgroundColor: '#ffffff',
		height: props.size+'rpx',
		width: props.size+'rpx',
		borderRadius: props.size+'rpx'
	};
	return style;
}

const change = ()=>{
	switchStatus.value = !switchStatus.value;
	proxy.$emit('change',switchStatus.value);
}
</script>

<style scoped>
.flex-row {
	display: flex;
	flex-direction: row;
}
.flex-center {
	align-items: center;
	justify-content: center;
}
.flex1 {
	flex: 1;
}
</style>
