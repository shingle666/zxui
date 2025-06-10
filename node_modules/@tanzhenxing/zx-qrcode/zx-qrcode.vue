<template>
	<view class="zx-qrcode">
		<canvas :canvas-id="canvasId" :id="canvasId" :style="{width:size+'px', height:size+'px'}" @longpress="saveQrcode" @error="handleError"></canvas>
		<view v-if="loading" class="loading-mask">
			<text class="loading-text">加载中...</text>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, watch, nextTick } from 'vue';
import QRCode from './qrcode.js';

const { proxy } = getCurrentInstance();
const props = defineProps({
	canvasId: {
		type: String,
		default: 'qrcodeId'
	},
	size: {
		type: Number,
		default: 150
	},
	text: {
		type: String,
		default: 'https://zxui.org/'
	},
	bgColor: {
		type: String,
		default: '#FFFFFF'
	},
	color: {
		type: String,
		default: '#000000'
	},
	// 二维码纠错级别 L/M/Q/H
	correctLevel: {
		type: Number,
		default: 0  // 对应 QRErrorCorrectLevel.M
	},
	// 是否自动保存到相册，默认需要长按才保存
	autoSave: {
		type: Boolean,
		default: false
	},
	// 是否显示边框
	showBorder: {
		type: Boolean,
		default: false
	},
	// 边框宽度
	borderWidth: {
		type: Number,
		default: 8
	},
	// 边框颜色
	borderColor: {
		type: String,
		default: '#000000'
	},
	// 二维码边距
	margin: {
		type: Number,
		default: 10
	},
	// 延迟时间(ms)，微信小程序中绘制完成后需要一定延迟才能导出图片
	delay: {
		type: Number,
		default: 300
	}
});

const loading = ref(true);
const canvasObj = ref(null);
const hasError = ref(false);
const errorMsg = ref('');
const imgPath = ref('');
const isWxMiniProgram = ref(false);

// 检测当前环境是否为微信小程序
const checkPlatform = () => {
	// #ifdef MP-WEIXIN
	isWxMiniProgram.value = true;
	// #endif
};

// 生成二维码
const generateQRCode = () => {
	loading.value = true;
	hasError.value = false;
	errorMsg.value = '';
	
	try {
		// 延迟执行以确保 canvas 已准备好
		nextTick(() => {
			// 创建二维码对象
			if (isWxMiniProgram.value) {
				// 微信小程序环境使用回调
				canvasObj.value = new QRCode(props.canvasId, {
					text: props.text,
					width: props.size,
					height: props.size,
					colorDark: props.color,
					colorLight: props.bgColor,
					correctLevel: props.correctLevel,
					callback: (res) => {
						// 小程序环境下，通过回调获取图片
						imgPath.value = res.path;
						proxy.$emit('getImg', res.path);
						loading.value = false;
						
						// 如果设置了自动保存，则自动保存到相册
						if (props.autoSave) {
							saveToAlbum(res.path);
						}
					}
				});
			} else {
				// 其他环境
				canvasObj.value = new QRCode(props.canvasId, {
					text: props.text,
					width: props.size,
					height: props.size,
					colorDark: props.color,
					colorLight: props.bgColor,
					correctLevel: props.correctLevel
				});
				
				// 使用延迟确保二维码绘制完成
				setTimeout(() => {
					convertToImage();
					
					// 如果需要显示边框，绘制边框
					if (props.showBorder) {
						drawBorder();
					}
				}, props.delay);
			}
		});
	} catch (error) {
		handleError(error);
	}
};

// 绘制边框
const drawBorder = () => {
	try {
		const ctx = uni.createCanvasContext(props.canvasId);
		const borderSize = props.size + props.borderWidth * 2;
		
		// 绘制边框
		ctx.setFillStyle(props.borderColor);
		ctx.fillRect(0, 0, borderSize, borderSize);
		
		// 绘制白色背景
		ctx.setFillStyle(props.bgColor);
		ctx.fillRect(props.borderWidth, props.borderWidth, props.size, props.size);
		
		// 绘制二维码图像
		ctx.draw(true, () => {
			// 绘制完成后等待一段时间
			setTimeout(() => {
				// 确保加载状态更新
				if (loading.value) {
					loading.value = false;
				}
			}, props.delay);
		});
	} catch (error) {
		console.error('绘制边框失败', error);
	}
};

// 转换为图片
const convertToImage = () => {
	// 如果是微信小程序，使用回调形式
	const canvasToTempFilePathOptions = {
		x: 0,
		y: 0,
		width: props.size,
		height: props.size,
		destWidth: props.size,
		destHeight: props.size,
		canvasId: props.canvasId,
		success: (res) => {
			imgPath.value = res.tempFilePath;
			proxy.$emit('getImg', res.tempFilePath);
			loading.value = false;
			
			// 如果设置了自动保存，则自动保存到相册
			if (props.autoSave) {
				saveToAlbum(res.tempFilePath);
			}
		},
		fail: (err) => {
			handleError(err);
		}
	};
	
	// 微信小程序环境下，需要在 draw 回调中调用
	if (isWxMiniProgram.value) {
		const ctx = uni.createCanvasContext(props.canvasId);
		ctx.draw(true, () => {
			// 确保绘制完成后再导出图片
			setTimeout(() => {
				uni.canvasToTempFilePath(canvasToTempFilePathOptions);
			}, props.delay);
		});
	} else {
		uni.canvasToTempFilePath(canvasToTempFilePathOptions);
	}
};

// 保存到相册
const saveToAlbum = (filePath) => {
	if (!filePath) {
		uni.showToast({
			title: '图片路径为空',
			icon: 'none'
		});
		return;
	}
	
	uni.saveImageToPhotosAlbum({
		filePath: filePath,
		success: () => {
			uni.showToast({
				title: '图片已保存到相册'
			});
		},
		fail: (err) => {
			if (err.errMsg && err.errMsg.indexOf('auth deny') >= 0) {
				uni.showModal({
					title: '提示',
					content: '需要您授权保存相册',
					showCancel: false
				});
			} else {
				uni.showToast({
					title: '保存失败',
					icon: 'none'
				});
			}
		}
	});
};

// 长按保存
const saveQrcode = () => {
	if (loading.value || hasError.value) return;
	
	if (!imgPath.value) {
		// 如果图片路径为空，需要先生成图片
		if (isWxMiniProgram.value) {
			// 微信小程序环境使用回调
			const ctx = uni.createCanvasContext(props.canvasId);
			ctx.draw(true, () => {
				setTimeout(() => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: props.size,
						height: props.size,
						destWidth: props.size,
						destHeight: props.size,
						canvasId: props.canvasId,
						success: (res) => {
							saveToAlbum(res.tempFilePath);
						},
						fail: (err) => {
							handleError(err);
						}
					});
				}, props.delay);
			});
		} else {
			uni.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: props.size,
				height: props.size,
				destWidth: props.size,
				destHeight: props.size,
				canvasId: props.canvasId,
				success: (res) => {
					saveToAlbum(res.tempFilePath);
				},
				fail: (err) => {
					handleError(err);
				}
			});
		}
	} else {
		// 直接使用已有的图片路径
		saveToAlbum(imgPath.value);
	}
};

// 错误处理
const handleError = (error) => {
	loading.value = false;
	hasError.value = true;
	errorMsg.value = typeof error === 'string' ? error : (error.errMsg || '生成二维码失败');
	console.error('二维码生成错误:', error);
	proxy.$emit('error', error);
};

// 重新生成二维码
const refresh = () => {
	generateQRCode();
};

// 清除二维码
const clear = () => {
	try {
		const ctx = uni.createCanvasContext(props.canvasId);
		ctx.clearRect(0, 0, props.size, props.size);
		ctx.draw();
		imgPath.value = '';
	} catch (error) {
		console.error('清除二维码失败', error);
	}
};

// 监听文本变化重新生成二维码
watch(() => props.text, (newVal, oldVal) => {
	if (newVal !== oldVal) {
		generateQRCode();
	}
});

// 监听大小变化
watch(() => props.size, (newVal, oldVal) => {
	if (newVal !== oldVal) {
		generateQRCode();
	}
});

// 监听颜色变化
watch([() => props.color, () => props.bgColor], () => {
	generateQRCode();
});

onMounted(() => {
	checkPlatform();
	generateQRCode();
});

// 向父组件暴露方法
defineExpose({
	saveQrcode,
	refresh,
	clear,
	getImgPath: () => imgPath.value
});
</script>

<style scoped>
.zx-qrcode {
	position: relative;
	display: inline-block;
}

.loading-mask {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.7);
	display: flex;
	align-items: center;
	justify-content: center;
}

.loading-text {
	font-size: 14px;
	color: #666;
}
</style>
