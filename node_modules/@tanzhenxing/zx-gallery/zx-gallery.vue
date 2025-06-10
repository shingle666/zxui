<template>
	<view class="zx-gallery" :class="{ 'zx-gallery_show': show }" @tap="hideGallery">
		<view class="zx-gallery__info">{{ currentIndex + 1 }}/{{ imgUrls.length }}</view>
		<swiper class="zx-gallery__img__wrap" :indicator-dots="false" @change="onChange" :current="currentIndex"
			:autoplay="false" :duration="500">
			<swiper-item v-for="(item, index) in imgUrls" :key="index">
				<image mode="aspectFit" class="zx-gallery__img" :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="zx-gallery__desc" v-if="!showDelete">
			{{ getDesc(currentIndex) }}
		</view>
		<view class="zx-gallery__operate" hover-class="zx-opacity__del" :hover-start-time="150" @tap.stop="deleteImg"
			v-if="showDelete">
			删除
		</view>
	</view>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';

const emit = defineEmits(['change', 'delete', 'hide']);
const props = defineProps({
	urls: {
		type: Array,
		default: () => []
	},
	showDelete: {
		type: Boolean,
		default: false
	},
	show: {
		type: Boolean,
		default: false
	},
	current: {
		type: Number,
		default: 0
	},
	hideOnClick: {
		type: Boolean,
		default: true
	}
});

const imgUrls = ref([...props.urls]);
const currentIndex = ref(Number(props.current));

watch(() => props.urls, (newVal) => {
	imgUrls.value = [...newVal];
});

watch(() => props.current, (newVal) => {
	currentIndex.value = Number(newVal);
});

onMounted(() => {
	imgUrls.value = [...props.urls];
	currentIndex.value = Number(props.current);
});

function getDesc(index) {
	const item = imgUrls.value[index];
	return item && item.desc ? item.desc : '';
}

function onChange(e) {
	currentIndex.value = e.detail.current;
	emit('change', { current: e.detail.current });
}

function deleteImg() {
	const imgs = imgUrls.value;
	const url = imgs.splice(currentIndex.value, 1);
	emit('delete', { url: url[0], index: currentIndex.value });
	if (imgs.length === 0) {
		hideGallery();
		return;
	}
	currentIndex.value = 0;
	imgUrls.value = imgs;
}

function hideGallery() {
	if (props.hideOnClick) {
		emit('hide', {});
	}
}
</script>

<style scoped>
.zx-gallery {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000;
	z-index: 1000;
	display: none;
}

.zx-gallery__img,
.zx-gallery__operate,
.zx-gallery__desc {
	position: absolute;
	left: 0;
	left: constant(safe-area-inset-left);
	left: env(safe-area-inset-left);
	right: 0;
	right: constant(safe-area-inset-right);
	right: env(safe-area-inset-right)
}

.zx-gallery__img {
	width: 100%;
	height: 100%;
	top: 0;
	top: constant(safe-area-inset-top);
	top: env(safe-area-inset-top);
	bottom: 60px;
	bottom: calc(60px + constant(safe-area-inset-bottom));
	bottom: calc(60px + env(safe-area-inset-bottom));
	background: 50% no-repeat;
	background-size: contain
}

.zx-gallery__operate,
.zx-gallery__desc {
	position: absolute;
	bottom: 0;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: #0d0d0d;
	color: #fff;
	line-height: 60px;
	text-align: center;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 30rpx;
	box-sizing: border-box;
	z-index: 10;
}


.zx-gallery__info {
	color: #fff;
	font-size: 17px;
	line-height: 60px;
	min-height: 60px;
	text-align: center
}

.zx-gallery__img__wrap {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	flex: 1;
	position: relative;
	font-size: 0
}

.zx-gallery__operate {
	position: static
}

.zx-gallery_show {
	display: flex !important;
	flex-direction: column !important;
	flex-wrap: nowrap !important;
}

.zx-opacity__del {
	opacity: 0.5;
}
</style>
