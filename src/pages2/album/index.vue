<template>
	<view class="container">
		<!-- 标题 -->
		<view class="title">
			<text>相册组件示例</text>
		</view>

		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">
				<text>基础用法</text>
			</view>
			<view class="section-content">
				<zx-album :urls="baseUrls"></zx-album>
			</view>
		</view>

		<!-- 单图展示 -->
		<view class="section">
			<view class="section-title">
				<text>单图展示</text>
			</view>
			<view class="section-content">
				<zx-album :urls="singleImageUrls" singleSize="400rpx"></zx-album>
			</view>
		</view>

		<!-- 自定义配置 -->
		<view class="section">
			<view class="section-title">
				<text>自定义配置</text>
			</view>
			<view class="section-content">
				<zx-album 
					:urls="baseUrls" 
					multipleSize="180rpx" 
					space="20rpx" 
					:rowCount="2"
				></zx-album>
			</view>
		</view>

		<!-- 可删除模式 -->
		<view class="section">
			<view class="section-title">
				<text>可删除模式</text>
			</view>
			<view class="section-content">
				<zx-album 
					:urls="editableUrls" 
					:deletable="true"
					@delete="onImageDelete"
				></zx-album>
			</view>
		</view>

		<!-- 加载状态演示 -->
		<view class="section">
			<view class="section-title">
				<text>加载状态</text>
			</view>
			<view class="section-content">
				<zx-album 
					:urls="baseUrls" 
					:loading="isLoading"
				></zx-album>
				<button class="toggle-btn" @click="toggleLoading">切换加载状态</button>
			</view>
		</view>

		<!-- 对象数组形式 -->
		<view class="section">
			<view class="section-title">
				<text>对象数组形式</text>
			</view>
			<view class="section-content">
				<zx-album 
					:urls="objectUrls" 
					keyName="imageUrl"
					@error="onImageError"
				></zx-album>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';
// 引入组件
import ZxAlbum from '@tanzhenxing/zx-album/zx-album.vue';

// 基础图片列表
const baseUrls = ref([
	'https://cdn.mp.ac.cn/album/1.jpg',
	'https://cdn.mp.ac.cn/album/2.jpg',
	'https://cdn.mp.ac.cn/album/3.jpg',
	'https://cdn.mp.ac.cn/album/4.jpg',
	'https://cdn.mp.ac.cn/album/5.jpg',
	'https://cdn.mp.ac.cn/album/6.jpg'
]);

// 单图展示
const singleImageUrls = ref([
	'https://cdn.mp.ac.cn/album/1.jpg'
]);

// 可编辑的图片列表
const editableUrls = ref([
	'https://cdn.mp.ac.cn/album/1.jpg',
	'https://cdn.mp.ac.cn/album/2.jpg',
	'https://cdn.mp.ac.cn/album/3.jpg',
	'https://cdn.mp.ac.cn/album/4.jpg'
]);

// 对象数组形式
const objectUrls = ref([
	{ imageUrl: 'https://cdn.mp.ac.cn/album/1.jpg', id: 1 },
	{ imageUrl: 'https://cdn.mp.ac.cn/album/2.jpg', id: 2 },
	{ imageUrl: 'https://cdn.mp.ac.cn/album/3.jpg', id: 3 },
	// 故意放一个错误地址测试错误处理
	{ imageUrl: 'https://cdn.mp.ac.cn/album/image.jpg', id: 4 }
]);

// 加载状态
const isLoading = ref(true);

// 切换加载状态
const toggleLoading = () => {
	isLoading.value = !isLoading.value;
};

// 删除图片
const onImageDelete = (index) => {
	uni.showModal({
		title: '提示',
		content: `确定要删除第${index + 1}张图片吗？`,
		success: (res) => {
			if (res.confirm) {
				editableUrls.value.splice(index, 1);
				uni.showToast({
					title: '删除成功',
					icon: 'success'
				});
			}
		}
	});
};

// 图片加载错误
const onImageError = (data) => {
	console.log('图片加载失败', data);
	uni.showToast({
		title: '有图片加载失败',
		icon: 'none'
	});
};
</script>

<style lang="scss">
.container {
	padding: 30rpx;
}

.title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 40rpx;
	text-align: center;
}

.section {
	margin-bottom: 50rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #333;
}

.section-content {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
}

.toggle-btn {
	margin-top: 20rpx;
	background-color: #2979ff;
	color: #fff;
	font-size: 28rpx;
}
</style>
