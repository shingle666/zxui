<template>
	<view class="test-page">
		<view class="section">
			<text class="title">基础图片上传测试</text>
			<zx-upload 
				:file-list="imageList"
				accept="image"
				:max-count="3"
				@afterRead="onImageRead"
				@delete="onImageDelete"
			/>
		</view>
		
		<view class="section">
			<text class="title">文件列表模式测试</text>
			<zx-upload 
				:file-list="fileList"
				list-type="text"
				accept="file"
				:max-count="3"
				@afterRead="onFileRead"
				@delete="onFileDelete"
			/>
		</view>
		
		<view class="section">
			<text class="title">状态信息</text>
			<text class="info">图片数量: {{ imageList.length }}</text>
			<text class="info">文件数量: {{ fileList.length }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const imageList = ref([]);
const fileList = ref([]);

const onImageRead = (event) => {
	console.log('图片读取:', event);
	const { file } = event;
	if (Array.isArray(file)) {
		imageList.value.push(...file);
	} else {
		imageList.value.push(file);
	}
};

const onImageDelete = (event) => {
	console.log('删除图片:', event);
	const { index } = event;
	imageList.value.splice(index, 1);
};

const onFileRead = (event) => {
	console.log('文件读取:', event);
	const { file } = event;
	if (Array.isArray(file)) {
		fileList.value.push(...file);
	} else {
		fileList.value.push(file);
	}
};

const onFileDelete = (event) => {
	console.log('删除文件:', event);
	const { index } = event;
	fileList.value.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.test-page {
	padding: 20rpx;
}

.section {
	margin-bottom: 40rpx;
	padding: 20rpx;
	background: #fff;
	border-radius: 8rpx;
}

.title {
	display: block;
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
}

.info {
	display: block;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 10rpx;
}
</style> 