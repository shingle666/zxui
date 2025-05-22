<template>
	<view class="canvas-demo">
		<view class="header">
			<text class="title">zx-canvas 示例</text>
		</view>
		
		<view class="tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index" 
				class="tab-item" 
				:class="{ active: currentTab === index }"
				@click="switchTab(index)"
			>
				{{ tab.name }}
			</view>
		</view>
		
		<view class="canvas-container">
			<!-- 基础绘制示例 -->
			<view v-if="currentTab === 0" class="example-container">
				<zx-canvas ref="basicCanvas" :is-use="true" :width="canvasWidth" :height="canvasHeight" @ready="onBasicCanvasReady"></zx-canvas>
				<view class="example-controls">
					<button type="primary" @click="drawBasicShapes">重新绘制</button>
				</view>
			</view>
			
			<!-- 渐变示例 -->
			<view v-if="currentTab === 1" class="example-container">
				<zx-canvas ref="gradientCanvas" :is-use="true" :width="canvasWidth" :height="canvasHeight" @ready="onGradientCanvasReady"></zx-canvas>
				<view class="example-controls">
					<button type="primary" @click="drawGradients">线性渐变</button>
					<button type="primary" @click="drawRadialGradients">径向渐变</button>
				</view>
			</view>
			
			<!-- 画板示例 -->
			<view v-if="currentTab === 2" class="example-container">
				<zx-canvas 
					ref="drawingCanvas" 
					:is-use="true" 
					:width="canvasWidth" 
					:height="canvasHeight" 
					@ready="onDrawingCanvasReady"
					@touch_start="onTouchStart"
					@touch_move="onTouchMove"
					@touch_end="onTouchEnd"
				></zx-canvas>
				<view class="example-controls drawing-controls">
					<view class="color-picker">
						<view v-for="(color, index) in colors" :key="index" 
							class="color-item" 
							:style="{ backgroundColor: color }"
							:class="{ active: currentColor === color }"
							@click="setColor(color)">
						</view>
					</view>
					<view class="brush-size">
						<text>线条粗细: {{ brushSize }}</text>
						<slider :min="1" :max="20" :step="1" :value="brushSize" @change="setBrushSize"></slider>
					</view>
					<button type="default" @click="clearDrawing">清空画板</button>
				</view>
			</view>
			
			<!-- 保存图片示例 -->
			<view v-if="currentTab === 3" class="example-container">
				<zx-canvas ref="saveCanvas" :is-use="true" :width="canvasWidth" :height="canvasHeight" @ready="onSaveCanvasReady"></zx-canvas>
				<view class="example-controls">
					<button type="primary" @click="saveCanvasToImage">保存为图片</button>
				</view>
				
				<view v-if="savedImagePath" class="saved-image">
					<text>保存的图片:</text>
					<image :src="savedImagePath" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import ZxCanvas from '@/components/zx-canvas/zx-canvas.vue';

export default {
	components: {
		ZxCanvas
	},
	data() {
		return {
			tabs: [
				{ name: '基础绘制' },
				{ name: '渐变效果' },
				{ name: '画板' },
				{ name: '保存图片' }
			],
			currentTab: 0,
			canvasWidth: 300,
			canvasHeight: 200,
			// 画板相关数据
			drawingContext: null,
			lastX: 0,
			lastY: 0,
			brushSize: 5,
			currentColor: '#3498db',
			colors: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c', '#34495e', '#000000'],
			// 保存图片相关
			savedImagePath: ''
		};
	},
	mounted() {
		// 根据窗口设置画布大小
		const sysInfo = uni.getSystemInfoSync();
		const windowWidth = sysInfo.windowWidth;
		this.canvasWidth = windowWidth * 0.9;
		this.canvasHeight = this.canvasWidth * 0.7;
	},
	methods: {
		switchTab(index) {
			this.currentTab = index;
		},
		
		// 基础绘制示例
		onBasicCanvasReady(canvas) {
			this.basicCanvas = canvas;
			this.drawBasicShapes();
		},
		drawBasicShapes() {
			const ctx = this.basicCanvas.context;
			
			// 清空画布
			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			
			// 绘制矩形
			ctx.setFillStyle('#3498db');
			ctx.fillRect(20, 20, 80, 80);
			
			// 绘制圆形
			ctx.beginPath();
			ctx.setFillStyle('#e74c3c');
			ctx.arc(180, 60, 40, 0, 2 * Math.PI);
			ctx.fill();
			
			// 绘制三角形
			ctx.beginPath();
			ctx.setFillStyle('#2ecc71');
			ctx.moveTo(50, 150);
			ctx.lineTo(100, 100);
			ctx.lineTo(150, 150);
			ctx.fill();
			
			// 绘制文字
			ctx.setFillStyle('#000000');
			ctx.setTextAlign('center');
			ctx.setFontSize(16);
			ctx.fillText('基础绘制示例', this.canvasWidth / 2, this.canvasHeight - 20);
			
			// 应用绘制
			ctx.draw();
		},
		
		// 渐变示例
		onGradientCanvasReady(canvas) {
			this.gradientCanvas = canvas;
			this.drawGradients();
		},
		drawGradients() {
			const ctx = this.gradientCanvas.context;
			
			// 清空画布
			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			
			// 横向渐变矩形
			const gradient1 = ctx.createLinearGradient(20, 0, 180, 0);
			gradient1.addColorStop(0, '#3498db');
			gradient1.addColorStop(1, '#9b59b6');
			ctx.fillStyle = gradient1;
			ctx.fillRect(20, 20, 160, 50);
			
			// 纵向渐变矩形
			const gradient2 = ctx.createLinearGradient(0, 80, 0, 160);
			gradient2.addColorStop(0, '#f1c40f');
			gradient2.addColorStop(1, '#e67e22');
			ctx.fillStyle = gradient2;
			ctx.fillRect(20, 80, 160, 80);
			
			// 对角线渐变
			const gradient3 = ctx.createLinearGradient(200, 20, 280, 160);
			gradient3.addColorStop(0, '#2ecc71');
			gradient3.addColorStop(0.5, '#1abc9c');
			gradient3.addColorStop(1, '#16a085');
			ctx.fillStyle = gradient3;
			ctx.fillRect(200, 20, 80, 140);
			
			// 说明文字
			ctx.setFillStyle('#000000');
			ctx.setTextAlign('center');
			ctx.setFontSize(16);
			ctx.fillText('线性渐变示例', this.canvasWidth / 2, this.canvasHeight - 20);
			
			// 应用绘制
			ctx.draw();
		},
		drawRadialGradients() {
			const ctx = this.gradientCanvas.context;
			
			// 清空画布
			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			
			// 圆形渐变1
			const gradient1 = ctx.createCircularGradient(100, 70, 50);
			gradient1.addColorStop(0, '#f39c12');
			gradient1.addColorStop(1, '#d35400');
			ctx.fillStyle = gradient1;
			ctx.beginPath();
			ctx.arc(100, 70, 50, 0, 2 * Math.PI);
			ctx.fill();
			
			// 圆形渐变2
			const gradient2 = ctx.createCircularGradient(220, 70, 40);
			gradient2.addColorStop(0, '#3498db');
			gradient2.addColorStop(0.5, '#9b59b6');
			gradient2.addColorStop(1, '#8e44ad');
			ctx.fillStyle = gradient2;
			ctx.beginPath();
			ctx.arc(220, 70, 40, 0, 2 * Math.PI);
			ctx.fill();
			
			// 说明文字
			ctx.setFillStyle('#000000');
			ctx.setTextAlign('center');
			ctx.setFontSize(16);
			ctx.fillText('径向渐变示例', this.canvasWidth / 2, this.canvasHeight - 20);
			
			// 应用绘制
			ctx.draw();
		},
		
		// 画板示例
		onDrawingCanvasReady(canvas) {
			this.drawingCanvas = canvas;
			this.drawingContext = canvas.context;
			
			// 初始化画板
			this.drawingContext.setLineWidth(this.brushSize);
			this.drawingContext.setLineCap('round');
			this.drawingContext.setLineJoin('round');
			this.drawingContext.setStrokeStyle(this.currentColor);
			
			// 清空并绘制背景
			this.drawingContext.setFillStyle('#f8f9fa');
			this.drawingContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			this.drawingContext.draw();
		},
		onTouchStart(e) {
			const touch = e.touches[0];
			this.lastX = touch.x;
			this.lastY = touch.y;
		},
		onTouchMove(e) {
			const touch = e.touches[0];
			const ctx = this.drawingContext;
			
			ctx.beginPath();
			ctx.moveTo(this.lastX, this.lastY);
			ctx.lineTo(touch.x, touch.y);
			ctx.stroke();
			
			// 应用绘制，保留之前的绘制内容
			ctx.draw(true);
			
			// 更新最后的触摸位置
			this.lastX = touch.x;
			this.lastY = touch.y;
		},
		onTouchEnd() {
			// 可以在这里添加绘制结束后的处理逻辑
		},
		setColor(color) {
			this.currentColor = color;
			this.drawingContext.setStrokeStyle(color);
		},
		setBrushSize(e) {
			this.brushSize = e.detail.value;
			this.drawingContext.setLineWidth(this.brushSize);
		},
		clearDrawing() {
			const ctx = this.drawingContext;
			ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			ctx.setFillStyle('#f8f9fa');
			ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			ctx.draw();
		},
		
		// 保存图片示例
		onSaveCanvasReady(canvas) {
			this.saveCanvas = canvas;
			const ctx = canvas.context;
			
			// 绘制一些内容
			ctx.setFillStyle('#f5f6fa');
			ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			
			// 绘制一个渐变背景
			const gradient = ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
			gradient.addColorStop(0, 'rgba(116, 185, 255, 0.3)');
			gradient.addColorStop(1, 'rgba(223, 137, 181, 0.3)');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
			
			// 绘制文字
			ctx.setFillStyle('#333333');
			ctx.setTextAlign('center');
			ctx.setTextBaseline('middle');
			ctx.setFontSize(20);
			ctx.fillText('保存画布为图片', this.canvasWidth / 2, this.canvasHeight / 2);
			
			// 应用绘制
			ctx.draw();
		},
		saveCanvasToImage() {
			const self = this;
			self.savedImagePath = '';
			
			// 使用zx-canvas提供的插件方法保存画布为图片
			self.saveCanvas.zs.canvasToTempFilePath({
				x: 0,
				y: 0,
				width: self.canvasWidth,
				height: self.canvasHeight,
				destWidth: self.canvasWidth * 2, // 输出图片宽度为画布的2倍（提高清晰度）
				destHeight: self.canvasHeight * 2, // 输出图片高度为画布的2倍
				success: function(res) {
					console.log('保存成功:', res);
					self.savedImagePath = res.tempFilePath;
					
					// 可选：保存到相册
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function() {
							uni.showToast({
								title: '已保存到相册',
								icon: 'success'
							});
						},
						fail: function(err) {
							console.error('保存到相册失败:', err);
							if (err.errMsg.indexOf('auth deny') >= 0) {
								uni.showModal({
									title: '提示',
									content: '需要授权保存相册',
									success: function(res) {
										if (res.confirm) {
											uni.openSetting();
										}
									}
								});
							} else {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								});
							}
						}
					});
				},
				fail: function(err) {
					console.error('保存失败:', err);
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss">
.canvas-demo {
	padding: 20rpx;
	
	.header {
		text-align: center;
		margin-bottom: 30rpx;
		
		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
		}
	}
	
	.tabs {
		display: flex;
		border-bottom: 1px solid #eee;
		margin-bottom: 20rpx;
		
		.tab-item {
			flex: 1;
			text-align: center;
			padding: 20rpx 0;
			font-size: 28rpx;
			color: #666;
			
			&.active {
				color: #007AFF;
				border-bottom: 2px solid #007AFF;
			}
		}
	}
	
	.canvas-container {
		width: 100%;
		
		.example-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			
			zx-canvas {
				width: 100%;
				height: 420rpx;
				background-color: #f8f9fa;
				border-radius: 8rpx;
				overflow: hidden;
				box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
			}
			
			.example-controls {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				justify-content: space-around;
				
				button {
					margin: 10rpx;
					font-size: 28rpx;
				}
				
				&.drawing-controls {
					flex-direction: column;
					
					.color-picker {
						display: flex;
						justify-content: space-between;
						margin: 20rpx 0;
						
						.color-item {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							border: 2rpx solid #ddd;
							
							&.active {
								border: 4rpx solid #333;
								transform: scale(1.1);
							}
						}
					}
					
					.brush-size {
						margin: 20rpx 0;
						width: 100%;
						
						text {
							font-size: 28rpx;
							color: #666;
						}
					}
				}
			}
			
			.saved-image {
				margin-top: 30rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				text {
					font-size: 28rpx;
					color: #666;
					margin-bottom: 10rpx;
				}
				
				image {
					width: 80%;
					border: 1rpx solid #eee;
					border-radius: 8rpx;
				}
			}
		}
	}
}
</style>
