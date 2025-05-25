import deepMerge from './deepMerge';

/**
 * 生成随机字符串
 * @param {Number} length 字符串长度，默认32位
 * @returns {String} 随机字符串
 */
function getNonceStr(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const maxPos = chars.length;
  let nonce = '';
  for (let i = 0; i < length; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return nonce;
}

/**
 * 延时函数
 * @param {Number} ms 延时时长，默认30ms
 * @returns {Promise} Promise对象
 */
function sleep(ms = 30) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 获取当前操作系统
 * @returns {String} 操作系统名称：ios、android、windows、macos、linux
 */
function os() {
  // #ifdef APP-PLUS
  return plus.os.name.toLowerCase();
  // #endif
  
  // #ifdef H5
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    return 'ios';
  }
  if (userAgent.indexOf('Android') > -1) {
    return 'android';
  }
  if (userAgent.indexOf('Windows') > -1) {
    return 'windows';
  }
  if (userAgent.indexOf('Mac') > -1) {
    return 'macos';
  }
  if (userAgent.indexOf('Linux') > -1) {
    return 'linux';
  }
  return 'unknown';
  // #endif
  
  // #ifdef MP
  return 'mp';
  // #endif
  
  return 'unknown';
}

// 工具函数集合
const util = {
  deepMerge,
  getNonceStr,
  sleep,
  os
};

export default util; 