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

/**
 * 为数字或字符串添加单位，默认'px'
 * @param {String | Number} value 需要添加单位的值
 * @param {String} unit 单位，默认'px'
 * @returns {String} 添加单位后的值
 */
function addUnit(value, unit = 'px') {
  if (value == null) {
    return undefined;
  }
  return /^-?\d+(\.\d+)?$/.test(String(value)) ? `${value}${unit}` : String(value);
}

/**
 * 创建BEM规范的命名空间
 * @param {String} name 组件名称
 * @returns {Function} 返回一个函数，用于生成BEM类名
 */
function createNamespace(name) {
  const prefixedName = `zx-${name}`;
  const bem = (modifier, subModifier) => {
    if (modifier && typeof modifier === 'string') {
      const base = `${prefixedName}__${modifier}`;
      if (subModifier && typeof subModifier === 'string') {
        return `${base}_${subModifier}`;
      }
      return base;
    }
    if (modifier && typeof modifier === 'object') {
      // bem('block', { mod1: true, mod2: false }) => 'zx-block zx-block--mod1'
      let result = prefixedName;
      for (const key in modifier) {
        if (Object.prototype.hasOwnProperty.call(modifier, key) && modifier[key]) {
          result += ` ${prefixedName}--${key}`;
        }
      }
      return result;
    }
    return prefixedName;
  };
  return [prefixedName, bem];
}

// 工具函数集合
const util = {
  deepMerge,
  getNonceStr,
  sleep,
  os,
  addUnit,
  createNamespace
};

export default util;

export {
  deepMerge,
  getNonceStr,
  sleep,
  os,
  addUnit,
  createNamespace
};