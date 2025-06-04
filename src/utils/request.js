/**
 * uni-app网络请求封装
 */

import store from '../store/index.js'

// 基础配置
// 从 store.getters.aiConfig 获取配置
const BASE_URL = () => store.getters.aiConfig.baseURL; // 设置API基础URL
const TIMEOUT = () => store.getters.aiConfig.timeout || 60000; // 请求超时时间，单位ms
const HEADER = () => ({
  'content-type': 'application/json;charset=UTF-8',
  'authorization': `Bearer ${store.getters.aiConfig.apiKey}`
});

/**
 * 请求拦截器
 * @param {Object} config 请求配置
 */
function requestInterceptor(config) {
  // 可在这里处理请求前的数据，比如添加统一请求头、token等
  const token = uni.getStorageSync('token');
  if (token) {
    config.header = { 
      ...config.header,
      'Authorization': `Bearer ${token}` 
    };
  }
  
  return config;
}

/**
 * 响应拦截器
 * @param {Object} response 响应结果
 */
function responseInterceptor(response) {
  // 可在这里处理响应数据
  // 例如：统一的数据格式处理、错误码处理等
  if (response.statusCode === 200) {
    // 请求成功
    return response.data;
  } else {
    // 处理错误状态码
    handleError(response);
    return Promise.reject(response);
  }
}

/**
 * 错误处理
 * @param {Object} error 错误信息
 */
function handleError(error) {
  // 处理请求错误
  let message = '';
  switch (error.statusCode) {
    case 400:
      message = '请求错误';
      break;
    case 401:
      message = '未授权，请重新登录';
      // 可以在这里处理登录过期的逻辑
      // uni.navigateTo({ url: '/pages/login/login' });
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '请求地址出错';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '服务器内部错误';
      break;
    case 501:
      message = '服务未实现';
      break;
    case 502:
      message = '网关错误';
      break;
    case 503:
      message = '服务不可用';
      break;
    case 504:
      message = '网关超时';
      break;
    default:
      message = `未知错误(${error.statusCode})`;
  }
  
  // 显示错误提示
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  });
}

/**
 * 封装网络请求
 * @param {Object} options - 请求配置项
 * @returns {Promise} 请求结果
 */
function request(options = {}) {
  return new Promise((resolve, reject) => {
    // 合并请求配置
    const config = {
      url: options.url || '',
      data: options.data || {},
      method: options.method || 'GET',
      header: options.header || HEADER(),
      dataType: options.dataType || 'json',
      responseType: options.responseType || 'text',
      timeout: options.timeout || TIMEOUT(),
      ...options
    };
    
    // 拼接完整URL
    if (options.baseUrl !== false) {
      config.url = (options.baseUrl || BASE_URL()) + config.url;
    }
    
    // 应用请求拦截器
    const requestConfig = requestInterceptor(config);
    
    // 发起请求
    const requestTask = uni.request({
      ...requestConfig,
      success: (res) => {
        // 应用响应拦截器
        const result = responseInterceptor(res);
        resolve(result);
      },
      fail: (err) => {
        // 请求失败
        handleError(err);
        reject(err);
      },
      complete: () => {
        // 请求完成时的处理
      }
    });
    
    // 返回requestTask，以便可以中断请求
    return requestTask;
  });
}

/**
 * 封装GET请求
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options - 其他配置项
 */
function get(url, data = {}, options = {}) {
  return request({
    url,
    data,
    method: 'GET',
    ...options
  });
}

/**
 * 封装POST请求
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options - 其他配置项
 */
function post(url, data = {}, options = {}) {
  return request({
    url,
    data,
    method: 'POST',
    ...options
  });
}

/**
 * 封装PUT请求
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options - 其他配置项
 */
function put(url, data = {}, options = {}) {
  return request({
    url,
    data,
    method: 'PUT',
    ...options
  });
}

/**
 * 封装DELETE请求
 * @param {String} url - 请求地址
 * @param {Object} data - 请求参数
 * @param {Object} options - 其他配置项
 */
function del(url, data = {}, options = {}) {
  return request({
    url,
    data,
    method: 'DELETE',
    ...options
  });
}

/**
 * 上传文件
 * @param {String} url - 上传地址
 * @param {Object} options - 上传配置
 */
function upload(url, options = {}) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    const header = token ? { 'Authorization': `Bearer ${token}` } : {};
    
    uni.uploadFile({
      url: (options.baseUrl || BASE_URL()) + url,
      filePath: options.filePath,
      name: options.name || 'file',
      formData: options.formData || {},
      header: { ...header, ...(options.header || {}) },
      success: (res) => {
        if (res.statusCode === 200) {
          // 处理返回的数据
          let data = res.data;
          try {
            if (typeof data === 'string') {
              data = JSON.parse(data);
            }
            resolve(data);
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

// 导出配置函数
export { BASE_URL, TIMEOUT, HEADER };

// 导出方法
export default {
  request,
  get,
  post,
  put,
  delete: del,
  upload
};