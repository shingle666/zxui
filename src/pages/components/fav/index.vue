<template>
	<view class="container">
		<uni-card is-full title="基础用法">
			<view class="fav-demo-item">
				<view class="fav-demo-title">默认未收藏状态</view>
				<zx-fav :checked="false" @click="onBasicClick"></zx-fav>
			</view>
			<view class="fav-demo-item">
				<view class="fav-demo-title">已收藏状态</view>
				<zx-fav :checked="true" @click="onBasicClick"></zx-fav>
			</view>
		</uni-card>
		
		<uni-card is-full title="自定义样式">
			<view class="fav-demo-item">
				<view class="fav-demo-title">自定义背景色和文本色</view>
				<zx-fav 
					:checked="customStyleChecked" 
					bgColor="#f8f8f8"
					fgColor="#333333"
					bgColorChecked="#ff6600"
					fgColorChecked="#ffffff"
					@click="onCustomStyleClick"
				></zx-fav>
			</view>
			<view class="fav-demo-item">
				<view class="fav-demo-title">圆角样式</view>
				<zx-fav 
					:checked="circleChecked" 
					circle 
					bgColorChecked="#409eff"
					@click="onCircleClick"
				></zx-fav>
			</view>
			<view class="fav-demo-item">
				<view class="fav-demo-title">自定义宽度</view>
				<zx-fav 
					:checked="widthChecked" 
					width="120px"
					@click="onWidthClick"
				></zx-fav>
			</view>
		</uni-card>
		
		<uni-card is-full title="禁用状态">
			<view class="fav-demo-item">
				<view class="fav-demo-title">禁用未收藏状态</view>
				<zx-fav :checked="false" disabled></zx-fav>
			</view>
			<view class="fav-demo-item">
				<view class="fav-demo-title">禁用已收藏状态</view>
				<zx-fav :checked="true" disabled></zx-fav>
			</view>
		</uni-card>
		
		<uni-card is-full title="自定义内容">
			<view class="fav-demo-item">
				<view class="fav-demo-title">自定义文本内容</view>
				<zx-fav 
					:checked="customTextChecked" 
					:contentText="{ contentDefault: '加入收藏', contentFav: '已加入收藏' }"
					@click="onCustomTextClick"
				></zx-fav>
			</view>
		</uni-card>
		
		<uni-card is-full title="自定义图标">
			<view class="fav-demo-item">
				<view class="fav-demo-title">无图标</view>
				<zx-fav 
					:checked="noIconChecked" 
					:star="false"
					@click="onNoIconClick"
				></zx-fav>
			</view>
			<view class="fav-demo-item">
				<view class="fav-demo-title">心形图标</view>
				<zx-fav 
					:checked="heartIconChecked" 
					iconName="heart-fill"
					iconSize="16"
					@click="onHeartIconClick"
				></zx-fav>
			</view>
		</uni-card>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法状态
const onBasicClick = () => {
	uni.showToast({
		title: '点击了收藏按钮',
		icon: 'none'
	});
};

// 自定义样式状态
const customStyleChecked = ref(false);
const onCustomStyleClick = () => {
	customStyleChecked.value = !customStyleChecked.value;
	uni.showToast({
		title: customStyleChecked.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	});
};

// 圆角样式状态
const circleChecked = ref(false);
const onCircleClick = () => {
	circleChecked.value = !circleChecked.value;
	uni.showToast({
		title: circleChecked.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	});
};

// 自定义宽度状态
const widthChecked = ref(false);
const onWidthClick = () => {
	widthChecked.value = !widthChecked.value;
	uni.showToast({
		title: widthChecked.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	});
};

// 自定义内容状态
const customTextChecked = ref(false);
const onCustomTextClick = () => {
	customTextChecked.value = !customTextChecked.value;
	uni.showToast({
		title: customTextChecked.value ? '已加入收藏' : '已取消收藏',
		icon: 'none'
	});
};

// 无图标状态
const noIconChecked = ref(false);
const onNoIconClick = () => {
	noIconChecked.value = !noIconChecked.value;
	uni.showToast({
		title: noIconChecked.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	});
};

// 心形图标状态
const heartIconChecked = ref(false);
const onHeartIconClick = () => {
	heartIconChecked.value = !heartIconChecked.value;
	uni.showToast({
		title: heartIconChecked.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	});
};
</script>

<style lang="scss">
.container {
	padding-bottom: 30px;
}

.fav-demo-item {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 10px 0;
	
	&:not(:last-child) {
		border-bottom: 1px solid #eee;
	}
}

.fav-demo-title {
	font-size: 14px;
	color: #333;
}
</style>