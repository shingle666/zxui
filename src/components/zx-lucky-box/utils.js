let windowWidth = uni.getSystemInfoSync().windowWidth
if (windowWidth > 960) windowWidth = 375

export const rpx2px = (value) => {
  if (typeof value === 'string') value = Number(value.replace(/[a-z]*/g, ''))
  return windowWidth / 750 * value
}

export const changeUnits = (value) => {
  value = String(value)
  return Number(value.replace(/^(-*[0-9.]*)([a-z%]*)$/, (value, num, unit) => {
    switch (unit) {
      case 'px':
        num *= 1
        break
      case 'rpx':
        num = rpx2px(num)
        break
      default:
        num *= 1
        break
    }
    return num
  }))
}

export const resolveImage = async (img, canvas, srcName = 'src', resolveName = '$resolve') => {
  const imgObj = canvas.createImage()
  imgObj.onload = () => {
    img[resolveName](imgObj)
  }
  imgObj.onerror = (err) => {
    console.error(err)
  }
  imgObj.src = img[srcName]
}

export function getImage(canvasId, canvas) {
  return new Promise((resolve, reject) => {
    uni.canvasToTempFilePath({
      canvas,
      canvasId,
      success: res => resolve(res),
      fail: err => reject(err)
    }, this)
  })
} 