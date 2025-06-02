<template>
	<view class="zx-avatar-cropper">
		<!-- 裁剪容器 -->
		<view 
			v-if="showCropper" 
			class="zx-avatar-cropper__container"
			:style="containerStyle"
		>
			<!-- 图片显示区域 -->
			<view class="zx-avatar-cropper__image-container" :style="imageContainerStyle">
				<image 
					class="zx-avatar-cropper__image"
					:src="imageSrc"
					mode="aspectFit"
					:style="imageStyle"
					@load="onImageLoad"
					@touchstart="onTouchStart"
					@touchmove="onTouchMove"
					@touchend="onTouchEnd"
				></image>
			</view>
			
			<!-- 裁剪框 -->
			<view 
				class="zx-avatar-cropper__crop-box"
				:class="[`zx-avatar-cropper__crop-box--${shape}`]"
				:style="cropBoxStyle"
			>
				<!-- 裁剪框边框 -->
				<view class="zx-avatar-cropper__crop-border"></view>
				
				<!-- 四个角的控制点 -->
				<view 
					v-if="resizable"
					class="zx-avatar-cropper__handle zx-avatar-cropper__handle--nw"
					@touchstart.stop="onHandleTouchStart('nw', $event)"
					@touchmove.stop="onHandleTouchMove"
					@touchend.stop="onHandleTouchEnd"
				></view>
				<view 
					v-if="resizable"
					class="zx-avatar-cropper__handle zx-avatar-cropper__handle--ne"
					@touchstart.stop="onHandleTouchStart('ne', $event)"
					@touchmove.stop="onHandleTouchMove"
					@touchend.stop="onHandleTouchEnd"
				></view>
				<view 
					v-if="resizable"
					class="zx-avatar-cropper__handle zx-avatar-cropper__handle--sw"
					@touchstart.stop="onHandleTouchStart('sw', $event)"
					@touchmove.stop="onHandleTouchMove"
					@touchend.stop="onHandleTouchEnd"
				></view>
				<view 
					v-if="resizable"
					class="zx-avatar-cropper__handle zx-avatar-cropper__handle--se"
					@touchstart.stop="onHandleTouchStart('se', $event)"
					@touchmove.stop="onHandleTouchMove"
					@touchend.stop="onHandleTouchEnd"
				></view>
			</view>
			
			<!-- 遮罩层 -->
			<view class="zx-avatar-cropper__mask">
				<!-- 上遮罩 -->
				<view 
					class="zx-avatar-cropper__mask-part zx-avatar-cropper__mask-top"
					:style="maskTopStyle"
				></view>
				<!-- 左遮罩 -->
				<view 
					class="zx-avatar-cropper__mask-part zx-avatar-cropper__mask-left"
					:style="maskLeftStyle"
				></view>
				<!-- 右遮罩 -->
				<view 
					class="zx-avatar-cropper__mask-part zx-avatar-cropper__mask-right"
					:style="maskRightStyle"
				></view>
				<!-- 下遮罩 -->
				<view 
					class="zx-avatar-cropper__mask-part zx-avatar-cropper__mask-bottom"
					:style="maskBottomStyle"
				></view>
			</view>
		</view>
		
		<!-- 操作按钮 -->
		<view v-if="showCropper" class="zx-avatar-cropper__toolbar">
			<view class="zx-avatar-cropper__toolbar-left">
				<zx-button 
					v-if="showRotateBtn"
					type="default" 
					size="small" 
					@click="rotateLeft"
				>
					<zx-icon name="rotate-left" size="32rpx"></zx-icon>
				</zx-button>
				<zx-button 
					v-if="showRotateBtn"
					type="default" 
					size="small" 
					@click="rotateRight"
					style="margin-left: 20rpx;"
				>
					<zx-icon name="rotate-right" size="32rpx"></zx-icon>
				</zx-button>
				<zx-button 
					v-if="showResetBtn"
					type="default" 
					size="small" 
					@click="reset"
					style="margin-left: 20rpx;"
				>
					重置
				</zx-button>
			</view>
			<view class="zx-avatar-cropper__toolbar-right">
				<zx-button 
					type="default" 
					size="small" 
					@click="cancel"
				>
					取消
				</zx-button>
				<zx-button 
					type="primary" 
					size="small" 
					@click="confirm"
					style="margin-left: 20rpx;"
				>
					确定
				</zx-button>
			</view>
		</view>
		
		<!-- 选择图片按钮 -->
		<view v-if="!showCropper" class="zx-avatar-cropper__select">
			<zx-button 
				type="primary" 
				@click="chooseImage"
				:loading="loading"
			>
				{{ selectText }}
			</zx-button>
		</view>
	</view>
</template>

<script setup>
/**
 * AvatarCropper 头像裁剪
 * @description 头像裁剪组件，支持图片选择、裁剪、旋转等功能
 * @tutorial https://zxui.org/components/avatar-cropper
 * @property {String}          src              图片地址
 * @property {String}          shape            裁剪框形状 circle | square （默认 'circle'）
 * @property {Number}          cropSize         裁剪框大小，单位rpx （默认 400）
 * @property {Number}          outputSize       输出图片大小，单位px （默认 200）
 * @property {Number}          quality          图片质量，0-1 （默认 0.8）
 * @property {Boolean}         resizable        是否可调整裁剪框大小 （默认 true）
 * @property {Boolean}         showRotateBtn    是否显示旋转按钮 （默认 true）
 * @property {Boolean}         showResetBtn     是否显示重置按钮 （默认 true）
 * @property {String}          selectText       选择图片按钮文字 （默认 '选择图片'）
 * @property {String}          maskColor        遮罩颜色 （默认 'rgba(0, 0, 0, 0.5)'）
 * @property {String}          borderColor      裁剪框边框颜色 （默认 '#ffffff'）
 * @property {Number}          borderWidth      裁剪框边框宽度 （默认 2）
 * @property {Number}          minCropSize      最小裁剪框大小 （默认 100）
 * @property {Number}          maxCropSize      最大裁剪框大小 （默认 600）
 * @event    {Function}        confirm          确认裁剪时触发，返回裁剪后的图片路径
 * @event    {Function}        cancel           取消裁剪时触发
 * @event    {Function}        error            发生错误时触发
 * @example  <zx-avatar-cropper @confirm="onConfirm" @cancel="onCancel"></zx-avatar-cropper>
 */

import { ref, computed, watch, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const emits = defineEmits(['confirm', 'cancel', 'error']);

const props = defineProps({
	// 图片地址
	src: {
		type: String,
		default: ''
	},
	// 裁剪框形状
	shape: {
		type: String,
		default: 'circle' // circle | square
	},
	// 裁剪框大小
	cropSize: {
		type: Number,
		default: 400
	},
	// 输出图片大小
	outputSize: {
		type: Number,
		default: 200
	},
	// 图片质量
	quality: {
		type: Number,
		default: 0.8
	},
	// 是否可调整裁剪框大小
	resizable: {
		type: Boolean,
		default: true
	},
	// 是否显示旋转按钮
	showRotateBtn: {
		type: Boolean,
		default: true
	},
	// 是否显示重置按钮
	showResetBtn: {
		type: Boolean,
		default: true
	},
	// 选择图片按钮文字
	selectText: {
		type: String,
		default: '选择图片'
	},
	// 遮罩颜色
	maskColor: {
		type: String,
		default: 'rgba(0, 0, 0, 0.5)'
	},
	// 裁剪框边框颜色
	borderColor: {
		type: String,
		default: '#ffffff'
	},
	// 裁剪框边框宽度
	borderWidth: {
		type: Number,
		default: 2
	},
	// 最小裁剪框大小
	minCropSize: {
		type: Number,
		default: 100
	},
	// 最大裁剪框大小
	maxCropSize: {
		type: Number,
		default: 600
	}
});

// 响应式数据
const imageSrc = ref('');
const showCropper = ref(false);
const loading = ref(false);
const imageInfo = ref({});
const containerSize = ref({ width: 0, height: 0 });
const imageSize = ref({ width: 0, height: 0 });
const imagePosition = ref({ x: 0, y: 0 });
const imageScale = ref(1);
const imageRotate = ref(0);
const cropBox = ref({
	x: 0,
	y: 0,
	width: props.cropSize,
	height: props.cropSize
});

// 触摸相关
const touching = ref(false);
const touchStartPos = ref({ x: 0, y: 0 });
const touchStartImagePos = ref({ x: 0, y: 0 });
const touchStartCropBox = ref({ x: 0, y: 0, width: 0, height: 0 });
const resizeHandle = ref('');

// 计算属性
const containerStyle = computed(() => {
	return {
		width: '100%',
		height: '100vh',
		position: 'relative',
		overflow: 'hidden',
		backgroundColor: '#000000'
	};
});

const imageContainerStyle = computed(() => {
	return {
		width: '100%',
		height: '100%',
		position: 'relative'
	};
});

const imageStyle = computed(() => {
	return {
		width: imageSize.value.width + 'px',
		height: imageSize.value.height + 'px',
		transform: `translate(${imagePosition.value.x}px, ${imagePosition.value.y}px) scale(${imageScale.value}) rotate(${imageRotate.value}deg)`,
		transformOrigin: 'center center',
		transition: touching.value ? 'none' : 'transform 0.3s ease'
	};
});

const cropBoxStyle = computed(() => {
	return {
		position: 'absolute',
		left: cropBox.value.x + 'px',
		top: cropBox.value.y + 'px',
		width: cropBox.value.width + 'px',
		height: cropBox.value.height + 'px',
		border: `${props.borderWidth}px solid ${props.borderColor}`,
		boxSizing: 'border-box',
		pointerEvents: 'none'
	};
});

// 遮罩样式
const maskTopStyle = computed(() => {
	return {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: cropBox.value.y + 'px',
		backgroundColor: props.maskColor
	};
});

const maskLeftStyle = computed(() => {
	return {
		position: 'absolute',
		top: cropBox.value.y + 'px',
		left: '0',
		width: cropBox.value.x + 'px',
		height: cropBox.value.height + 'px',
		backgroundColor: props.maskColor
	};
});

const maskRightStyle = computed(() => {
	return {
		position: 'absolute',
		top: cropBox.value.y + 'px',
		left: (cropBox.value.x + cropBox.value.width) + 'px',
		width: `calc(100% - ${cropBox.value.x + cropBox.value.width}px)`,
		height: cropBox.value.height + 'px',
		backgroundColor: props.maskColor
	};
});

const maskBottomStyle = computed(() => {
	return {
		position: 'absolute',
		top: (cropBox.value.y + cropBox.value.height) + 'px',
		left: '0',
		width: '100%',
		height: `calc(100% - ${cropBox.value.y + cropBox.value.height}px)`,
		backgroundColor: props.maskColor
	};
});

// 方法
const initCropper = () => {
	// 获取系统信息
	uni.getSystemInfo({
		success: (res) => {
			containerSize.value = {
				width: res.windowWidth,
				height: res.windowHeight
			};
			
			// 初始化裁剪框位置
			cropBox.value = {
				x: (containerSize.value.width - props.cropSize) / 2,
				y: (containerSize.value.height - props.cropSize) / 2,
				width: props.cropSize,
				height: props.cropSize
			};
		}
	});
};

const chooseImage = () => {
	loading.value = true;
	uni.chooseImage({
		count: 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: (res) => {
			imageSrc.value = res.tempFilePaths[0];
			showCropper.value = true;
			initCropper();
		},
		fail: (err) => {
			emits('error', err);
		},
		complete: () => {
			loading.value = false;
		}
	});
};

// 监听src变化
watch(() => props.src, (newSrc) => {
	if (newSrc) {
		imageSrc.value = newSrc;
		showCropper.value = true;
		initCropper();
	}
}, { immediate: true });


const onImageLoad = (e) => {
	const { width, height } = e.detail;
	imageInfo.value = { width, height };
	
	// 计算图片显示尺寸
	const containerWidth = containerSize.value.width;
	const containerHeight = containerSize.value.height;
	const imageRatio = width / height;
	const containerRatio = containerWidth / containerHeight;
	
	let displayWidth, displayHeight;
	if (imageRatio > containerRatio) {
		// 图片更宽，以容器高度为准
		displayHeight = containerHeight;
		displayWidth = displayHeight * imageRatio;
	} else {
		// 图片更高，以容器宽度为准
		displayWidth = containerWidth;
		displayHeight = displayWidth / imageRatio;
	}
	
	imageSize.value = { width: displayWidth, height: displayHeight };
	imagePosition.value = {
		x: (containerWidth - displayWidth) / 2,
		y: (containerHeight - displayHeight) / 2
	};
};

// 触摸事件处理
const onTouchStart = (e) => {
	touching.value = true;
	const touch = e.touches[0];
	touchStartPos.value = { x: touch.clientX, y: touch.clientY };
	touchStartImagePos.value = { ...imagePosition.value };
};

const onTouchMove = (e) => {
	if (!touching.value) return;
	e.preventDefault();
	
	const touch = e.touches[0];
	const deltaX = touch.clientX - touchStartPos.value.x;
	const deltaY = touch.clientY - touchStartPos.value.y;
	
	imagePosition.value = {
		x: touchStartImagePos.value.x + deltaX,
		y: touchStartImagePos.value.y + deltaY
	};
};

const onTouchEnd = () => {
	touching.value = false;
};

// 控制点触摸事件
const onHandleTouchStart = (handle, e) => {
	resizeHandle.value = handle;
	touching.value = true;
	const touch = e.touches[0];
	touchStartPos.value = { x: touch.clientX, y: touch.clientY };
	touchStartCropBox.value = { ...cropBox.value };
};

const onHandleTouchMove = (e) => {
	if (!touching.value || !resizeHandle.value) return;
	e.preventDefault();
	
	const touch = e.touches[0];
	const deltaX = touch.clientX - touchStartPos.value.x;
	const deltaY = touch.clientY - touchStartPos.value.y;
	
	const startBox = touchStartCropBox.value;
	let newBox = { ...startBox };
	
	switch (resizeHandle.value) {
		case 'nw':
			newBox.x = startBox.x + deltaX;
			newBox.y = startBox.y + deltaY;
			newBox.width = startBox.width - deltaX;
			newBox.height = startBox.height - deltaY;
			break;
		case 'ne':
			newBox.y = startBox.y + deltaY;
			newBox.width = startBox.width + deltaX;
			newBox.height = startBox.height - deltaY;
			break;
		case 'sw':
			newBox.x = startBox.x + deltaX;
			newBox.width = startBox.width - deltaX;
			newBox.height = startBox.height + deltaY;
			break;
		case 'se':
			newBox.width = startBox.width + deltaX;
			newBox.height = startBox.height + deltaY;
			break;
	}
	
	// 保持正方形
	if (props.shape === 'circle') {
		const size = Math.min(newBox.width, newBox.height);
		newBox.width = size;
		newBox.height = size;
	}
	
	// 限制最小最大尺寸
	newBox.width = Math.max(props.minCropSize, Math.min(props.maxCropSize, newBox.width));
	newBox.height = Math.max(props.minCropSize, Math.min(props.maxCropSize, newBox.height));
	
	// 限制边界
	newBox.x = Math.max(0, Math.min(containerSize.value.width - newBox.width, newBox.x));
	newBox.y = Math.max(0, Math.min(containerSize.value.height - newBox.height, newBox.y));
	
	cropBox.value = newBox;
};

const onHandleTouchEnd = () => {
	touching.value = false;
	resizeHandle.value = '';
};

// 旋转功能
const rotateLeft = () => {
	imageRotate.value -= 90;
};

const rotateRight = () => {
	imageRotate.value += 90;
};

// 重置功能
const reset = () => {
	imageScale.value = 1;
	imageRotate.value = 0;
	initCropper();
	onImageLoad({ detail: imageInfo.value });
};

// 取消
const cancel = () => {
	showCropper.value = false;
	imageSrc.value = '';
	emits('cancel');
};

// 确认裁剪
const confirm = () => {
	if (!imageSrc.value) {
		emits('error', '请先选择图片');
		return;
	}
	
	// 创建canvas进行裁剪
	const ctx = uni.createCanvasContext('cropCanvas');
	const pixelRatio = uni.getSystemInfoSync().pixelRatio || 1;
	
	// 计算裁剪区域在原图中的位置和尺寸
	const scaleX = imageInfo.value.width / imageSize.value.width;
	const scaleY = imageInfo.value.height / imageSize.value.height;
	
	const cropX = (cropBox.value.x - imagePosition.value.x) * scaleX;
	const cropY = (cropBox.value.y - imagePosition.value.y) * scaleY;
	const cropWidth = cropBox.value.width * scaleX;
	const cropHeight = cropBox.value.height * scaleY;
	
	// 设置canvas尺寸
	const canvasSize = props.outputSize;
	ctx.scale(pixelRatio, pixelRatio);
	
	// 绘制裁剪后的图片
	ctx.drawImage(
		imageSrc.value,
		cropX, cropY, cropWidth, cropHeight,
		0, 0, canvasSize, canvasSize
	);
	
	ctx.draw(false, () => {
		// 导出图片
		uni.canvasToTempFilePath({
			canvasId: 'cropCanvas',
			quality: props.quality,
			success: (res) => {
				showCropper.value = false;
				imageSrc.value = '';
				emits('confirm', res.tempFilePath);
			},
			fail: (err) => {
				emits('error', err);
			}
		});
	});
};
</script>

<style lang="scss" scoped>
.zx-avatar-cropper {
	position: relative;
	width: 100%;
	height: 100%;
	
	&__container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #000000;
	}
	
	&__image-container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	&__image {
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: center center;
	}
	
	&__crop-box {
		position: absolute;
		box-sizing: border-box;
		pointer-events: none;
		z-index: 10;
		
		&--circle {
			border-radius: 50%;
		}
		
		&--square {
			border-radius: 8rpx;
		}
	}
	
	&__crop-border {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: inherit;
		border-radius: inherit;
		box-sizing: border-box;
	}
	
	&__handle {
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background-color: #ffffff;
		border: 2rpx solid #007aff;
		border-radius: 50%;
		pointer-events: auto;
		z-index: 11;
		
		&--nw {
			top: -10rpx;
			left: -10rpx;
			cursor: nw-resize;
		}
		
		&--ne {
			top: -10rpx;
			right: -10rpx;
			cursor: ne-resize;
		}
		
		&--sw {
			bottom: -10rpx;
			left: -10rpx;
			cursor: sw-resize;
		}
		
		&--se {
			bottom: -10rpx;
			right: -10rpx;
			cursor: se-resize;
		}
	}
	
	&__mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 5;
	}
	
	&__mask-part {
		position: absolute;
	}
	
	&__toolbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40rpx;
		box-sizing: border-box;
		z-index: 20;
		
		&-left {
			display: flex;
			align-items: center;
		}
		
		&-right {
			display: flex;
			align-items: center;
		}
	}
	
	&__select {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}
}

/* 隐藏的canvas */
.crop-canvas {
	position: fixed;
	top: -9999px;
	left: -9999px;
	width: 200px;
	height: 200px;
}
</style>