// 获取多端 windowWidth，兼容 H5、小程序、App
export function useUniAppSystemInfo() {
  let windowWidth = 375;
  // #ifdef H5 || APP-PLUS
  if (typeof uni !== 'undefined' && uni.getSystemInfoSync) {
    windowWidth = uni.getWindowInfo().windowWidth;
  }
  // #endif
  // #ifdef MP
  if (typeof wx !== 'undefined' && wx.getSystemInfoSync) {
    windowWidth = wx.getSystemInfoSync().windowWidth;
  }
  // #endif
  return { windowWidth };
} 