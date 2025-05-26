<template>
	<view class="zx-barcode">
		<canvas :canvas-id="canvasId" :id="canvasId" :style="canvasStyle" @longpress="saveBarcode"></canvas>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed, watchEffect } from 'vue';
import barcode from './barcode.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	canvasId: {
		type: String,
		default: 'barcodeId'
	},
	width: {
		type: Number,
		default: 690
	},
	height: {
		type: Number,
		default: 180
	},
	text: {
		type: String,
		default: '1221339122586765388'
	},
	background: {
		type: String,
		default: '#ffffff'
	},
	foreground: {
		type: String,
		default: '#000000'
	},
	autoWidth: {
		type: Boolean,
		default: true
	},
	disabled: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['getImg']);

// 自动计算画布样式
const canvasStyle = computed(() => {
	return {
		width: props.width + 'rpx',
		height: props.height + 'rpx',
		background: props.background
	};
});

// 将绘制条形码的逻辑封装到函数中，方便重复调用
const drawBarcode = () => {
	const ctx = uni.createCanvasContext(props.canvasId, proxy);
	
	// 调用barcode.js中的绘制函数
	const barcodeConfig = {
		foregroundColor: props.foreground,
		backgroundColor: props.background
	};
	
	barcode.code128(ctx, props.text, uni.upx2px(props.width), uni.upx2px(props.height), barcodeConfig);
	
	// 生成临时文件路径
	setTimeout(() => {
		uni.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: uni.upx2px(props.width),
			height: uni.upx2px(props.height),
			destWidth: uni.upx2px(props.width),
			destHeight: uni.upx2px(props.height),
			canvasId: props.canvasId,
			success: (res) => {
				emit('getImg', res.tempFilePath);
			},
			fail: (err) => {
				console.error('生成条形码图片失败:', err);
			},
			complete: () => {
				// 兼容不同平台的处理
			}
		}, proxy);
	}, 300);
};

// 监听文本变化，自动重绘条形码
watchEffect(() => {
	if (props.text) {
		setTimeout(() => {
			drawBarcode();
		}, 100);
	}
});

onMounted(() => {
	drawBarcode();
});

// 保存条形码到相册
const saveBarcode = () => {
	if (props.disabled) return;
	
	uni.canvasToTempFilePath({
		x: 0,
		y: 0,
		width: uni.upx2px(props.width),
		height: uni.upx2px(props.height),
		destWidth: uni.upx2px(props.width),
		destHeight: uni.upx2px(props.height),
		canvasId: props.canvasId,
		success: (res) => {
			// 判断平台
			// #ifdef APP-PLUS || MP-WEIXIN || MP-QQ
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: () => {
					uni.showToast({
						title: '图片已保存到相册',
						icon: 'success'
					});
				},
				fail: (err) => {
					console.error('保存图片失败:', err);
					if (err.errMsg.indexOf('auth deny') >= 0) {
						uni.showToast({
							title: '请授权相册权限',
							icon: 'none'
						});
					}
				}
			});
			// #endif
			
			// #ifdef H5
			// H5环境下通过a标签模拟下载
			const a = document.createElement('a');
			a.href = res.tempFilePath;
			a.download = 'barcode.png';
			a.click();
			// #endif
		},
		fail: (err) => {
			console.error('生成临时图片失败:', err);
		}
	}, proxy);
};

// 刷新条形码
const refresh = () => {
	drawBarcode();
};

// 导出方法
defineExpose({
	saveBarcode,
	refresh
});
</script>

<style>
.zx-barcode {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}
</style>
