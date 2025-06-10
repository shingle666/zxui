<template>
	<view class="zx-lazyload__box"
		:style="{ backgroundColor: placeholder ? 'transparent' : backgroundColor, width: width, height: height ? height : 'auto', borderRadius: radius, paddingLeft: padding }"
		@tap="handleClick">
		<image class="zx-lazyload__img"
			:class="{ 'zx-img__hidden': !placeholder && fadeShow && !show, 'zx-img__appear': show && !placeholder && fadeShow }"
			:style="{ height: height === 'auto' ? false : height, borderRadius: radius }"
			:src="show ? src + srcParams : placeholder" :mode="mode" :lazy-load="nativeLazyLoad" :fade-show="fadeShow"
			:webp="webp" :show-menu-by-longpress="showMenuByLongpress" :draggable="draggable" @load="load"
			@error="error" :id="elId"></image>
		<slot></slot>
	</view>
</template>

<script setup>
import { ref, computed, getCurrentInstance, watch, onMounted, onBeforeUnmount } from 'vue';

const { proxy } = getCurrentInstance();
const instance = getCurrentInstance();

const props = defineProps({
	//图片路径
	src: {
		type: String,
		default: ''
	},
	//图片链接附加参数，如七牛云图片处理
	srcParams: {
		type: String,
		default: ''
	},
	//占位图路径
	placeholder: {
		type: String,
		default: ''
	},
	//占位背景色，placeholder有值时失效
	backgroundColor: {
		type: String,
		default: '#f1f1f1'
	},
	//图片的裁剪模式，参考image组件mode属性
	mode: {
		type: String,
		default: 'aspectFill'
	},
	//图片显示动画效果,无占位图时有效
	fadeShow: {
		type: Boolean,
		default: true
	},
	//默认不解析 webP 格式，只支持网络资源 微信小程序2.9.0
	webp: {
		type: Boolean,
		default: false
	},
	//开启长按图片显示识别小程序码菜单 微信小程序2.7.0
	showMenuByLongpress: {
		type: Boolean,
		default: false
	},
	//鼠标长按是否能拖动图片 仅H5平台 3.1.1+ 有效
	draggable: {
		type: Boolean,
		default: true
	},
	//图片宽度
	width: {
		type: String,
		default: '230rpx'
	},
	//图片高度，如果高度设置为auto，mode值需要设置为widthFix
	height: {
		type: String,
		default: '180rpx'
	},
	//图片圆角值，如：10rpx
	radius: {
		type: String,
		default: '0rpx'
	},
	//节点布局区域的下边界,目标节点区域以下 bottom(px) 时，就会触发回调函数
	bottom: {
		type: [Number, String],
		default: 50
	},
	//是否停止监听，设置为true时回调函数将不再触发
	disconnect: {
		type: Boolean,
		default: false
	},
	//图片在列表中的索引值
	index: {
		type: Number,
		default: 0
	},
	//是否开启懒加载，自定义实现
	lazyLoad: {
		type: Boolean,
		default: true
	},
	//是否使用原生的lazy-load属性（仅微信小程序、百度小程序、抖音小程序、飞书小程序支持）
	nativeLazyLoad: {
		type: Boolean,
		default: false
	},
	//内边距
	padding: {
		type: String,
		default: '0rpx'
	},
	//加载失败时显示的图片
	errorImage: {
		type: String,
		default: ''
	}
});

// 定义事件
const emits = defineEmits(['error', 'load', 'click']);

const show = ref(false);
const elId = ref('');
const observer = ref(null);
const isError = ref(false);
const imageSrc = computed(() => {
	if (isError.value && props.errorImage) {
		return props.errorImage;
	}
	return show.value ? props.src + props.srcParams : props.placeholder;
});

onMounted(() => {
	elId.value = unique() + props.index;

	// 是否开启懒加载
	if (!props.lazyLoad) {
		show.value = true;
		return;
	}

	proxy.$nextTick(() => {
		setTimeout(() => {
			// #ifndef H5
			if (!props.disconnect) {
				initObserver();
			} else {
				show.value = true;
			}
			// #endif

			// #ifdef H5
			if (!props.disconnect && window.self === window.top) {
				initObserver();
			} else {
				show.value = true;
			}
			// #endif
		}, 50);
	});
});

onBeforeUnmount(() => {
	removeObserver();
});

// 监听src变化，重置错误状态
watch(() => props.src, () => {
	isError.value = false;
});

// 监听disconnect属性变化
watch(() => props.disconnect, (newVal) => {
	if (newVal) {
		removeObserver();
		show.value = true;
	} else if (!show.value) {
		initObserver();
	}
});

const unique = (n) => {
	n = n || 6;
	let rnd = '';
	for (let i = 0; i < n; i++) rnd += Math.floor(Math.random() * 10);
	return 'zx_img_' + new Date().getTime() + rnd;
};

const removeObserver = () => {
	if (observer.value) {
		observer.value.disconnect();
		observer.value = null;
	}
};

const initObserver = () => {
	if (observer.value || show.value) {
		return;
	}

	try {
		let element = elId.value ? `#${elId.value}` : '.zx-lazyload__img';
		observer.value = uni.createIntersectionObserver(instance, {
			thresholds: [0],
			observeAll: true,
			nativeMode: true
		});

		observer.value.relativeToViewport({
			bottom: Number(props.bottom) || 50
		}).observe(element, (res) => {
			if (res.intersectionRatio > 0 && !show.value) {
				show.value = true;
				removeObserver();
			}
		});
	} catch (e) {
		console.error('创建IntersectionObserver失败', e);
		show.value = true;
		removeObserver();
	}
};

const error = (e) => {
	isError.value = true;
	emits('error', {
		detail: e.detail,
		index: props.index
	});
};

const load = (e) => {
	emits('load', {
		detail: e.detail,
		index: props.index
	});
};

const handleClick = (e) => {
	emits('click', {
		index: props.index
	});
};

// 暴露方法供父组件调用
defineExpose({
	// 手动触发加载图片
	loadImage: () => {
		show.value = true;
		removeObserver();
	}
});
</script>

<style scoped>
.zx-lazyload__box {
	display: inline-flex;
	position: relative;
	flex-shrink: 0;
	overflow: hidden;
}

.zx-lazyload__img {
	width: 100%;
	display: block;
	flex-shrink: 0;
	transition: opacity 0.3s linear;
}

.zx-img__hidden {
	opacity: 0;
	visibility: hidden;
}

.zx-img__appear {
	opacity: 1;
	visibility: visible;
}
</style>
