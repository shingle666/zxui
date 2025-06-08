<template>
	<view class="zx-canvas">
		<!-- #ifdef H5 -->
		<canvas class="canvas" canvas-id="zs1028" id="zs1028" @touchstart="_ontouchstart" @touchmove="_ontouchmove" @touchend="_ontouchend" @touchcancel="_ontouchcancel" @mousedown="_ontouchstart($event,true)" @mousemove="_ontouchmove($event,true)" @mouseup="_ontouchend(true)" :disable-scroll="disableScroll" :hidpi="hidpi"></canvas>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN || MP-KUAISHOU || MP-JD -->
		<canvas class="canvas" id="zs1028" type="2d" @touchstart="_ontouchstart" @touchmove="_ontouchmove" @touchend="_ontouchend" @touchcancel="_ontouchcancel" :disable-scroll="disableScroll"></canvas>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<canvas class="canvas" id="zs1028" @touchstart="_ontouchstart" @touchmove="_ontouchmove" @touchend="_ontouchend" @touchcancel="_ontouchcancel" :disable-scroll="disableScroll"></canvas>
		<!-- #endif -->
		<!-- #ifndef H5 || MP-WEIXIN || MP-KUAISHOU || MP-JD || MP-ALIPAY -->
		<canvas class="canvas" canvas-id="zs1028" id="zs1028" @touchstart="_ontouchstart" @touchmove="_ontouchmove" @touchend="_ontouchend" @touchcancel="_ontouchcancel" :disable-scroll="disableScroll"></canvas>
		<!-- #endif -->
	</view>
</template>

<script setup>
// 导入Vue3组合式API相关方法
import { ref, onMounted, getCurrentInstance } from 'vue';

// 定义属性
const props = defineProps({
	isUse: {
		type: Boolean,
		default: false
	},
	disableScroll: {
		type: Boolean,
		default: false
	},
	hidpi: {
		type: Boolean,
		default: true
	},
	width: {
		type: [Number, String],
		default: 300
	},
	height: {
		type: [Number, String],
		default: 225
	}
});

// 定义事件
const emits = defineEmits(['ready', 'touch_start', 'touch_move', 'touch_end', 'touch_cancel', 'error']);

// 定义响应式状态
const isTouchMode = ref(true);
const _context = ref(null);
const touchPoint = ref(undefined);

// #ifdef H5
const handleMousePoint = function(c, m, e) {
	let isMouse = m == true;
	if (c.value.isTouchMode && isMouse) return false;
	if (isMouse && e?.touches) e.touches.map(t => {
		t.x = t.pageX - c.value._context.node.left;
		t.y = t.pageY - c.value._context.node.top
	});
	return true;
};
// #endif

// 触摸事件处理函数
const _ontouchstart = (e, m) => {
	// #ifdef H5
	if (!handleMousePoint({ value: { isTouchMode: isTouchMode.value, _context: _context.value } }, m, e)) return;
	// #endif
	touchPoint.value = e;
	emits('touch_start', e);
};

const _ontouchmove = (e, m) => {
	// #ifdef H5
	if (!touchPoint.value) return;
	if (!handleMousePoint({ value: { isTouchMode: isTouchMode.value, _context: _context.value } }, m, e)) return;
	// #endif
	touchPoint.value = e;
	emits('touch_move', e);
};

const _ontouchend = (m) => {
	// #ifdef H5
	if (!touchPoint.value) return;
	if (!handleMousePoint({ value: { isTouchMode: isTouchMode.value, _context: _context.value } }, m)) return;
	// #endif
	emits('touch_end', touchPoint.value);
	touchPoint.value = undefined;
};

const _ontouchcancel = () => {
	touchPoint.value = undefined;
	emits('touch_cancel');
};

// Canvas错误处理
const handleCanvasError = (error) => {
	console.error('Canvas error:', error);
	emits('error', { errMsg: error?.message || 'Canvas operation failed' });
};

// Canvas相关API
const canvasToTempFilePath = (config) => {
	try {
		config.canvasId = _context.value.canvasId;
		if (_context.value.canvas) config.canvas = _context.value.canvas;
		
		// 确保有基本的配置
		if (!config.x) config.x = 0;
		if (!config.y) config.y = 0;
		if (!config.width) config.width = _context.value.width;
		if (!config.height) config.height = _context.value.height;
		
		uni.canvasToTempFilePath(config, getCurrentInstance());
	} catch (error) {
		handleCanvasError(error);
		config.fail?.(error);
	}
};

const canvasGetImageData = (config) => {
	// #ifdef MP-WEIXIN || MP-KUAISHOU || MP-JD
	try {
		const { x, y, width, height } = config;
		const { canvas } = _context.value;
		// Uint8ClampedArray
		let ctx = canvas.getContext('2d');
		let data = ctx.getImageData(x, y, width, height);
		config.success?.(data);
	} catch (e) {
		handleCanvasError(e);
		config.fail?.(e);
	} finally {
		config.complete?.();
	}
	// #endif
	// #ifndef MP-WEIXIN || MP-KUAISHOU || MP-JD
	try {
		config.canvasId = _context.value.canvasId;
		if (_context.value.canvas) config.canvas = _context.value.canvas;
		uni.canvasGetImageData(config, getCurrentInstance());
	} catch (error) {
		handleCanvasError(error);
		config.fail?.(error);
	}
	// #endif
};

const canvasPutImageData = (config) => {
	// #ifdef MP-WEIXIN || MP-KUAISHOU || MP-JD
	try {
		const canvas = _context.value.canvas;
		let x = config.x || 0;
		let y = config.y || 0;
		let ctx = canvas.getContext('2d');
		if (config.width || config.height) ctx.putImageData(config.data, x, y, 0, 0, config.width || canvas.width, config.height || canvas.height);
		else ctx.putImageData(config.data, x, y);
		config.success?.();
	} catch (e) {
		handleCanvasError(e);
		config.fail?.(e);
	} finally {
		config.complete?.();
	}
	// #endif
	// #ifndef MP-WEIXIN || MP-KUAISHOU || MP-JD
	try {
		if (config.data?.data) config.data = config.data.data;
		config.canvasId = _context.value.canvasId;
		if (_context.value.canvas) config.canvas = _context.value.canvas;
		uni.canvasPutImageData(config, getCurrentInstance());
	} catch (error) {
		handleCanvasError(error);
		config.fail?.(error);
	}
	// #endif
};

// 创建渐变对象
const createLinearGradient = (x0, y0, x1, y1) => {
	try {
		if (_context.value?.context) {
			return _context.value.context.createLinearGradient(x0, y0, x1, y1);
		}
		return null;
	} catch (error) {
		handleCanvasError(error);
		return null;
	}
};

// 创建圆形渐变
const createCircularGradient = (x, y, r) => {
	try {
		if (_context.value?.context) {
			return _context.value.context.createCircularGradient(x, y, r);
		}
		return null;
	} catch (error) {
		handleCanvasError(error);
		return null;
	}
};

// 在组件挂载后初始化
onMounted(() => {
	const currentInstance = getCurrentInstance();
	const canvasId = "zs1028";
	
	uni.createSelectorQuery().in(currentInstance).select("#" + canvasId).boundingClientRect(node => {
		uni.createSelectorQuery().in(currentInstance).select("#" + canvasId).fields({
			size: true,
			node: true
		}, res => {
			// 应用用户设置的宽高
			const width = typeof props.width === 'number' ? props.width : parseInt(props.width);
			const height = typeof props.height === 'number' ? props.height : parseInt(props.height);
			
			const context = {
				canvasId,
				node,
				width: width || res.width,
				height: height || res.height,
				canvas: res.node || {
					canvasId,
					width: width || res.width,
					height: height || res.height
				},
				zs: {
					canvasToTempFilePath,
					canvasGetImageData,
					canvasPutImageData,
					createLinearGradient,
					createCircularGradient
				}
			};
			context.plugin = context.zs;
			
			// #ifdef H5
			isTouchMode.value = "ontouchstart" in window;
			// #endif
			
			// #ifdef MP-WEIXIN || MP-KUAISHOU || MP-JD
			/**
			 * Create canvas context
			 * @author TA远方
			 * @link https://ext.dcloud.net.cn/publisher?id=752845
			*/
			context.context = (function() {
				Object.assign(context.canvas, { width: context.width, height: context.height });
				const x = context.canvas.getContext('2d');
				const q = [], h = [];
				const t = function(a) { q.push(Promise.resolve(function() { a() })) };
				const draw = function(reserve, callback) {
					q.reduce(function(pre, cur, ind) {
						return Promise.resolve({
							then(resolve, reject) {
								pre.then(function(b) { b(); resolve(cur) }).catch(reject)
							}
						})
					}, Promise.resolve(function() {
						x.beginPath();
						if (!reserve) x.clearRect(0, 0, context.width, context.height)
					})).catch(function(e) {
						handleCanvasError(e);
					}).then(function(a) {
						a?.();
						q.length = 0;
						callback?.()
					})
				};
				const c = {
					setFillStyle(color) { t(function() { x.fillStyle = color }) },
					setFontSize(fontSize) { t(function() { x.font = x.font.replace(/^d+/, fontSize) }) },
					setGlobalAlpha(alpha) { t(function() { x.globalAlpha = alpha }) },
					setLineCap(lineCap) { t(function() { x.lineCap = lineCap }) },
					setLineDash(pattern, offset) { t(function() { x.setLineDash(pattern, offset) }) },
					setLineJoin(lineJoin) { t(function() { x.lineJoin = lineJoin }) },
					setLineWidth(lineWidth) { t(function() { x.lineWidth = lineWidth }) },
					setMiterLimit(miterLimit) { t(function() { x.miterLimit = miterLimit }) },
					setShadow(offsetX, offsetY, blur, color) {
						t(function() {
							{
								if (offsetX !== undefined) x.shadowOffsetX = offsetX;
								if (offsetY !== undefined) x.shadowOffsetY = offsetY;
								if (blur !== undefined) x.shadowBlur = blur;
								if (color !== undefined) x.shadowColor = color;
							}
						})
					},
					setStrokeStyle(color) { t(function() { x.strokeStyle = color }) },
					setTextAlign(align) { t(function() { x.textAlign = align }) },
					setTextBaseline(textBaseline) { t(function() { x.textBaseline = textBaseline }) },
					setTransform(scaleX, skewX, skewY, scaleY, translateX, translateY) { t(function() { x.transform(scaleX, skewX, skewY, scaleY, translateX, translateY) }) },
					drawImage(imageResource, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) {
						let b;
						switch (arguments.length) {
							case 3:
								b = function(i) { x.drawImage(i, dx, dy) };
								break;
							case 5:
								b = function(i) { x.drawImage(i, dx, dy, dWidth, dHeight) };
								break;
							default:
								b = function(i) { x.drawImage(i, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight) }
						}
						let i = h.find(m => m.a == imageResource)?.i;
						if (i) {
							t(() => b(i))
						} else {
							q.push(Promise.resolve({
								then(e, t) {
									i = context.canvas.createImage();
									i.onerror = t;
									i.onload = function() {
										h.push({ a: imageResource, i });
										e(() => b(i))
									};
									i.src = imageResource
								}
							}))
						}
					},
					draw,
					createLinearGradient(x0, y0, x1, y1) {
						return x.createLinearGradient(x0, y0, x1, y1);
					},
					createCircularGradient(x, y, r) {
						return x.createRadialGradient(x, y, 0, x, y, r);
					}
				};
				["font", "shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor", "fillStyle", "globalAlpha", "lineCap", "lineJoin", "lineWidth", "lineDashOffset", "miterLimit", "strokeStyle", "textAlign", "textBaseline"].forEach(function(n) {
					Object.defineProperty(c, n, {
						enumerable: true,
						set(a) {
							t(function() { x[n] = a })
						},
						get() { return x[n] }
					})
				});
				["arc", "arcTo", "bezierCurveTo", "clip", "beginPath", "closePath", "clearRect", "createPattern", "fill", "fillRect", "fillText", "lineTo", "measureText", "moveTo", "quadraticCurveTo", "rect", "restore", "rotate", "save", "scale", "stroke", "strokeRect", "strokeText", "transform", "translate"].forEach(function(n) {
					c[n] = function(...a) {
						t(function() { x[n](...a) })
					}
				});
				return c
			})();
			// #endif
			
			// #ifndef MP-WEIXIN || MP-KUAISHOU || MP-JD
			Object.assign(context.canvas, {
				/**
				 * getCanvasContext
				 * @param contextType 2d，webgl，webgl2任意
				*/
				getContext: (contextType) => uni.createCanvasContext(canvasId, currentInstance),
				createImage() {
					// #ifdef H5
					return new Image();
					// #endif
					// #ifndef H5
					let img = { width: context.width, height: context.height, src: "" };
					Object.defineProperty(img, "src", { set(value) { img.onload?.(img) } });
					return img;
					// #endif
				},
				cancelAnimationFrame(requestID) {
					// #ifdef H5
					window.cancelAnimationFrame(requestID);
					// #endif
				},
				requestAnimationFrame(callback) {
					// #ifdef H5
					window.requestAnimationFrame(callback);
					// #endif
					// #ifndef H5
					setTimeout(callback, 16);
					// #endif
				}
			});
			context.context = context.canvas.getContext();
			
			// 添加渐变创建方法
			if (context.context && !context.context.createLinearGradient) {
				context.context.createLinearGradient = function(x0, y0, x1, y1) {
					// 部分平台不支持直接创建渐变，尝试使用替代方案
					try {
						// #ifdef APP-PLUS || H5
						return context.context.createLinearGradient(x0, y0, x1, y1);
						// #endif
						// #ifndef APP-PLUS || H5
						console.warn('Platform does not support createLinearGradient directly');
						return {
							addColorStop: function() {}
						};
						// #endif
					} catch (e) {
						handleCanvasError(e);
						return {
							addColorStop: function() {}
						};
					}
				};
			}
			
			if (context.context && !context.context.createCircularGradient) {
				context.context.createCircularGradient = function(x, y, r) {
					// 部分平台不支持直接创建渐变，尝试使用替代方案
					try {
						// #ifdef APP-PLUS || H5
						return context.context.createRadialGradient(x, y, 0, x, y, r);
						// #endif
						// #ifndef APP-PLUS || H5
						console.warn('Platform does not support createCircularGradient directly');
						return {
							addColorStop: function() {}
						};
						// #endif
					} catch (e) {
						handleCanvasError(e);
						return {
							addColorStop: function() {}
						};
					}
				};
			}
			// #endif
			
			_context.value = { 
				canvasId, 
				node, 
				canvas: context.canvas, 
				width: context.width, 
				height: context.height,
				context: context.context
			};
			
			if (props.isUse != true) {
				const label = "欢迎使用 <zx-canvas> 点此展开";
				console.groupCollapsed(label);
				console.table({
					"1": { "平台": "H5", "支持动画": "流畅" },
					"2": { "平台": "APP", "支持动画": "可能掉帧" },
					"3": { "平台": "微信小程序", "支持动画": "流畅" },
					"4": { "平台": "其它", "支持动画": "未确定" }
				});
				console.info("要关闭此提示和演示，请给组件<zx-canvas>设置属性:is-use=\"true\"");
				console.info("%c 组件<zx-canvas>文档： https://ext.dcloud.net.cn/publisher?id=752845", "color:orange;");
				console.groupEnd(label);
				context.context.save();
				context.context.setTextAlign("center");
				context.context.setTextBaseline("middle");
				context.context.fillText("欢迎使用 <zx-canvas>", context.width / 2, context.height / 2);
				context.context.restore();
				context.context.draw(false, () => emits('ready', context));
			} else emits('ready', context);
		}).exec();
	}).exec();
});

// 暴露方法供模板使用
defineExpose({
	canvasToTempFilePath,
	canvasGetImageData,
	canvasPutImageData,
	createLinearGradient,
	createCircularGradient
});
</script>

<style lang="scss">
	/* #ifdef MP-WEIXIN */
	zx-canvas{
		width: inherit;
		height: inherit;
	/* #endif */
		
		.zx-canvas{
			width: inherit;
			height: inherit;
			position: relative;
			
			.canvas{
				width: inherit;
				height: inherit;
				display: block;
			}
		}
		
	/* #ifdef MP-WEIXIN */
	}
	/* #endif */
</style>