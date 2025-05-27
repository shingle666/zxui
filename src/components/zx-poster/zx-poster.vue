<template>
	<canvas :style="{ width: cvWidth + 'px', height: cvHeight + 'px' }" :canvas-id="posterId" :id="posterId"
		class="zx-poster__cv"></canvas>
</template>

<script setup>
import { ref, watch, onMounted,getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()

const emit = defineEmits(['ready'])
const props = defineProps({
	//海报宽度，单位rpx
	width: {
		type: [Number, String],
		default: 800
	},
	//海报高度，单位rpx
	height: {
		type: [Number, String],
		default: 1200
	},
	//像素比
	pixel: {
		type: [Number, String],
		default: 3
	}
})

// 生成唯一ID
const posterId =
	typeof wx !== 'undefined'
		? `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
		: `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`

const cvWidth = ref(400)
const cvHeight = ref(600)
const ctx = ref(null)

function getPX(val) {
	return uni.upx2px(Number(val) * Number(props.pixel))
}

watch(
	() => props.width,
	val => {
		cvWidth.value = getPX(val)
	}
)
watch(
	() => props.height,
	val => {
		cvHeight.value = getPX(val)
	}
)

onMounted(() => {
	cvWidth.value = getPX(props.width)
	cvHeight.value = getPX(props.height)
	setTimeout(() => {
		ctx.value = uni.createCanvasContext(posterId)
		emit('ready', {})
	}, 50)
}
)

function toast(msg) {
	uni.showToast({
		title: msg,
		icon: 'none'
	})
}

function getTextWidth(context, text, fontSize) {
	let width = 0
	// #ifndef MP-ALIPAY || MP-BAIDU
	width = context.measureText(text).width
	// #endif
	// #ifdef MP-ALIPAY || MP-BAIDU
	let sum = 0
	for (let i = 0, len = text.length; i < len; i++) {
		if (text.charCodeAt(i) >= 0 && text.charCodeAt(i) <= 255) sum = sum + 1
		else sum = sum + 2
	}
	width = (sum / 2) * getPX(fontSize)
	// #endif
	return width
}

function getWrapText(text, fontSize, textWidth, width, ctx, rows = 2) {
	let textArr = []
	if (textWidth > width) {
		let fillText = ''
		let lines = 1
		let arr = text.split('')
		for (let i = 0, len = arr.length; i < len; i++) {
			fillText = fillText + arr[i]
			if (getTextWidth(ctx, fillText, fontSize) >= width) {
				if (lines === rows && rows !== -1) {
					if (i !== arr.length - 1) {
						fillText = fillText.substring(0, fillText.length - 1) + '...'
					}
					textArr.push(fillText)
					break
				}
				textArr.push(fillText)
				fillText = ''
				lines++
			} else if (i === arr.length - 1) {
				textArr.push(fillText)
			}
		}
	} else {
		textArr.push(text)
	}
	return textArr
}

function startDrawText(ctx, param) {
	let styles = param.style || {}
	let {
		left,
		top,
		fontSize,
		color,
		baseLine = 'normal',
		textAlign = 'left',
		frontSize,
		spacing,
		opacity = 1,
		lineThrough = false,
		width = 600,
		rows = 1,
		lineHeight = 0,
		fontWeight = 'normal',
		fontStyle = 'normal',
		fontFamily = 'sans-serif'
	} = styles
	ctx.save()
	ctx.beginPath()
	ctx.font = `${fontStyle} ${fontWeight} ${getPX(fontSize)}px ${fontFamily}`
	ctx.setGlobalAlpha(opacity)
	ctx.setFillStyle(color)
	ctx.setTextBaseline(baseLine)
	ctx.setTextAlign(textAlign)
	let textWidth = getTextWidth(ctx, param.text, fontSize)
	width = getPX(width)
	let textArr = getWrapText(param.text, fontSize, textWidth, width, ctx, rows)
	if (param.frontText) {
		ctx.setFontSize(getPX(frontSize))
		left = getTextWidth(ctx, param.frontText, frontSize) + getPX(left + spacing)
		ctx.setFontSize(getPX(fontSize))
	} else {
		left = getPX(left)
	}
	textArr.forEach((item, index) => {
		ctx.fillText(item, left, getPX(top + (lineHeight || fontSize) * index))
	})
	ctx.restore()
	if (lineThrough) {
		let lineY = top
		switch (baseLine) {
			case 'top':
				lineY += fontSize / 2 + 4
				break
			case 'middle':
				break
			case 'bottom':
				lineY -= fontSize / 2 + 4
				break
			default:
				// #ifdef MP-WEIXIN
				lineY -= fontSize / 2 - 3
				// #endif
				// #ifndef MP-WEIXIN
				lineY -= fontSize / 2 - 4
				// #endif
				break
		}
		ctx.save()
		ctx.moveTo(left, getPX(lineY))
		ctx.lineTo(left + textWidth + 2, getPX(lineY))
		ctx.setStrokeStyle(color)
		ctx.stroke()
		ctx.restore()
	}
}

function drawRadiusRect(ctx, styles) {
	let { left, top, width, height, borderRadius } = styles
	let r = getPX(borderRadius / 2)
	left = getPX(left)
	top = getPX(top)
	width = getPX(width)
	height = getPX(height)
	ctx.beginPath()
	ctx.arc(left + r, top + r, r, Math.PI, Math.PI * 1.5)
	ctx.moveTo(left + r, top)
	ctx.lineTo(left + width - r, top)
	ctx.lineTo(left + width, top + r)
	ctx.arc(left + width - r, top + r, r, Math.PI * 1.5, Math.PI * 2)
	ctx.lineTo(left + width, top + height - r)
	ctx.lineTo(left + width - r, top + height)
	ctx.arc(left + width - r, top + height - r, r, 0, Math.PI * 0.5)
	ctx.lineTo(left + r, top + height)
	ctx.lineTo(left, top + height - r)
	ctx.arc(left + r, top + height - r, r, Math.PI * 0.5, Math.PI)
	ctx.lineTo(left, top + r)
	ctx.lineTo(left + r, top)
}

function startDrawImage(ctx, param) {
	let styles = param.style || {}
	let { left, top, width, height, borderRadius = 0, borderWidth = 0, borderColor } = styles
	ctx.save()
	if (borderRadius > 0) {
		drawRadiusRect(ctx, styles)
		ctx.strokeStyle = 'rgba(0,0,0,0)'
		// #ifndef MP-BAIDU || MP-TOUTIAO
		ctx.stroke()
		// #endif
		ctx.clip()
	}
	ctx.drawImage(param.src, getPX(left), getPX(top), getPX(width), getPX(height))
	if (borderWidth && borderWidth > 0) {
		ctx.setStrokeStyle(borderColor)
		ctx.setLineWidth(getPX(borderWidth))
		ctx.stroke()
	}
	ctx.restore()
}

function startDrawRect(ctx, param) {
	let styles = param.style || {}
	let {
		width,
		height,
		left,
		top,
		borderWidth,
		backgroundColor,
		gradientColor,
		gradientType = 1,
		borderColor,
		borderRadius = 0,
		opacity = 1,
		shadow
	} = styles
	if (backgroundColor) {
		ctx.save()
		ctx.setGlobalAlpha(opacity)
		if (gradientColor) {
			let grd = null
			if (gradientType == 1) {
				grd = ctx.createLinearGradient(0, 0, getPX(width), getPX(height))
			} else {
				grd = ctx.createLinearGradient(0, getPX(width), getPX(height), 0)
			}
			grd.addColorStop(0, backgroundColor)
			grd.addColorStop(1, gradientColor)
			ctx.setFillStyle(grd)
		} else {
			ctx.setFillStyle(backgroundColor)
		}
		if (shadow) {
			const { offsetX, offsetY, blur, color } = shadow
			ctx.shadowOffsetX = getPX(offsetX)
			ctx.shadowOffsetY = getPX(offsetY)
			ctx.shadowBlur = blur
			ctx.shadowColor = color
		}
		if (borderRadius > 0) {
			drawRadiusRect(ctx, styles)
			ctx.fill()
		} else {
			ctx.fillRect(getPX(left), getPX(top), getPX(width), getPX(height))
		}
		ctx.restore()
	}
	if (borderWidth) {
		ctx.save()
		ctx.setGlobalAlpha(opacity)
		ctx.setStrokeStyle(borderColor)
		ctx.setLineWidth(getPX(borderWidth))
		if (borderRadius > 0) {
			drawRadiusRect(ctx, styles)
			ctx.stroke()
		} else {
			ctx.strokeRect(getPX(left), getPX(top), getPX(width), getPX(height))
		}
		ctx.restore()
	}
}

function startDrawLine(ctx, param) {
	let styles = param.style
	let { left, top, endLeft, endTop, color, width = 1 } = styles
	ctx.save()
	ctx.beginPath()
	ctx.setStrokeStyle(color)
	ctx.setLineWidth(getPX(width))
	ctx.moveTo(getPX(left), getPX(top))
	ctx.lineTo(getPX(endLeft), getPX(endTop))
	ctx.stroke()
	ctx.closePath()
	ctx.restore()
}

function judgeIosPermissionPhotoLibrary() {
	// #ifdef APP-PLUS
	var result = 0
	var PHPhotoLibrary = plus.ios.import('PHPhotoLibrary')
	var authStatus = PHPhotoLibrary.authorizationStatus()
	if (authStatus === 0) {
		result = -1
	} else if (authStatus == 3) {
		result = 1
		console.log('相册权限已经开启')
	} else {
		result = 0
		console.log('相册权限没有开启')
	}
	plus.ios.deleteObject(PHPhotoLibrary)
	return result
	// #endif
}

function requestAndroidPermission(permissionID) {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.android.requestPermissions(
			[permissionID],
			function (resultObj) {
				var result = 0
				for (var i = 0; i < resultObj.granted.length; i++) {
					var grantedPermission = resultObj.granted[i]
					result = 1
				}
				for (var i = 0; i < resultObj.deniedPresent.length; i++) {
					var deniedPresentPermission = resultObj.deniedPresent[i]
					result = 0
				}
				for (var i = 0; i < resultObj.deniedAlways.length; i++) {
					var deniedAlwaysPermission = resultObj.deniedAlways[i]
					result = -1
				}
				resolve(result)
			},
			function (error) {
				resolve({ code: error.code, message: error.message })
			}
		)
	})
	// #endif
}

function gotoAppPermissionSetting(isAndroid) {
	// #ifdef APP-PLUS
	if (!isAndroid) {
		var UIApplication = plus.ios.import('UIApplication')
		var application2 = UIApplication.sharedApplication()
		var NSURL2 = plus.ios.import('NSURL')
		var setting2 = NSURL2.URLWithString('app-settings:')
		application2.openURL(setting2)
		plus.ios.deleteObject(setting2)
		plus.ios.deleteObject(NSURL2)
		plus.ios.deleteObject(application2)
	} else {
		var Intent = plus.android.importClass('android.content.Intent')
		var Settings = plus.android.importClass('android.provider.Settings')
		var Uri = plus.android.importClass('android.net.Uri')
		var mainActivity = plus.android.runtimeMainActivity()
		var intent = new Intent()
		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
		var uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
		intent.setData(uri)
		mainActivity.startActivity(intent)
	}
	// #endif
}

async function judgePermissionPhotoLibrary(callback) {
	// #ifndef APP-PLUS || MP-WEIXIN || MP-QQ
	callback && callback(true)
	// #endif
	// #ifdef APP-PLUS
	const res = uni.getDeviceInfo()
	let result
	let isAndroid = res.platform.toLocaleLowerCase() == 'android'
	if (isAndroid) {
		result = await requestAndroidPermission('android.permission.WRITE_EXTERNAL_STORAGE')
	} else {
		result = judgeIosPermissionPhotoLibrary()
	}
	if (result == 1) {
		callback && callback(true)
	} else {
		if (!(!isAndroid && result == -1)) {
			uni.showModal({
				title: '提示',
				content: '您还没有开启相册权限，是否立即开启？',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						gotoAppPermissionSetting(isAndroid)
					}
				}
			})
		} else {
			callback && callback(true)
		}
	}
	// #endif
	// #ifdef MP-WEIXIN || MP-QQ
	uni.authorize({
		scope: 'scope.writePhotosAlbum',
		success() {
			callback && callback(true)
		},
		fail() {
			uni.showModal({
				title: '提示',
				content: '您还没有开启相册权限，是否立即开启？',
				showCancel: true,
				success: res => {
					if (res.confirm) {
						wx.openSetting({ success() {} })
					}
				}
			})
		}
	})
	// #endif
}

function imgDownload(url) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: url,
			success: res => {
				resolve(res.tempFilePath)
			},
			fail: err => {
				reject(false)
			}
		})
	})
}

function base64ToImg(base64) {
	const uniqueId = `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
	return new Promise((resolve, reject) => {
		// #ifdef MP-WEIXIN
		const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || []
		let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
		const filePath = `${wx.env.USER_DATA_PATH}/${uniqueId}.${format}`
		wx.getFileSystemManager().writeFile({
			filePath,
			data: arrayBuffer,
			encoding: 'binary',
			success() {
				resolve(filePath)
			},
			fail() {
				reject(false)
			}
		})
		// #endif
		// #ifdef APP-PLUS
		let bitmap = new plus.nativeObj.Bitmap(uniqueId)
		bitmap.loadBase64Data(
			base64,
			function () {
				bitmap.save(
					`_doc/${uniqueId}.png`,
					{},
					function (e) {
						let target = e.target
						resolve(target)
					},
					function (e) {
						reject(false)
					}
				)
			},
			function () {
				reject(false)
			}
		)
		// #endif
		// #ifdef H5
		resolve(base64)
		// #endif
		// #ifndef MP-WEIXIN || APP-PLUS || H5
		reject(false)
		// #endif
	})
}

function startDraw(data, callback) {
	if (ctx.value) {
		ctx.value.clearRect(0, 0, cvWidth.value, cvHeight.value)
		data.forEach(item => {
			if (item.type === 'image') {
				startDrawImage(ctx.value, item)
			} else if (item.type === 'text') {
				startDrawText(ctx.value, item)
			} else if (item.type === 'rect') {
				startDrawRect(ctx.value, item)
			} else if (item.type === 'line') {
				startDrawLine(ctx.value, item)
			}
		})
		const platform = uni.getWindowInfo().platform
		let time = 80
		if (platform === 'android') {
			time = 300
		}
		setTimeout(() => {
			ctx.value.draw(false, () => {
				setTimeout(() => {
					// #ifdef MP-ALIPAY
					ctx.value.toTempFilePath({
						success: res => {
							callback && callback(res.apFilePath)
						},
						fail: err => {
							callback && callback(false)
						}
					})
					// #endif
					// #ifndef MP-ALIPAY
					uni.canvasToTempFilePath(
						{
							x: 0,
							y: 0,
							canvasId: posterId,
							fileType: 'png',
							quality: 1,
							success: function (res) {
								callback && callback(res.tempFilePath)
							},
							fail() {
								callback && callback(false)
							}
						},
						proxy
					)
					// #endif
				}, time)
			})
		}, 50)
	} else {
		callback && callback(false)
	}
}

function draw(data, callback) {
	if (!data || data.length === 0) return
	let func = [],
		idxes = []
	data.forEach((item, index) => {
		if (item.type === 'image') {
			if (item.imgType == 2) {
				func.push(imgDownload(item.src))
				idxes.push(index)
			}
			// #ifdef APP-PLUS || H5 || MP-WEIXIN
			if (item.imgType == 3) {
				func.push(base64ToImg(item.src))
				idxes.push(index)
			}
			// #endif
		}
	})
	if (func.length > 0) {
		Promise.all(func)
			.then(res => {
				res.forEach((imgRes, idx) => {
					let item = data[idxes[idx]]
					item.src = imgRes
				})
				startDraw(data, callback)
			})
			.catch(err => {
				console.log(err)
				toast('图片处理失败!')
			})
	} else {
		startDraw(data, callback)
	}
}

function save(file) {
	// #ifdef H5
	uni.previewImage({ urls: [file] })
	// #endif
	// #ifndef H5
	judgePermissionPhotoLibrary(res => {
		if (res) {
			uni.saveImageToPhotosAlbum({
				filePath: file,
				success: res => {
					toast('图片已保存到相册')
				},
				fail: res => {
					toast('图片保存失败')
				}
			})
		}
	})
	// #endif
}

// 对外暴露方法
defineExpose({
	draw,
	save
})
</script>

<style scoped>
	.zx-poster__cv {
		position: fixed;
		left: -9999px;
		bottom: 0;
	}
</style>
