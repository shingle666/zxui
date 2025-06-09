/**
 * XRequest - 基于 uni-app 的 AI 请求工具
 * 兼容 H5、微信小程序、其他小程序平台、App
 * 支持流式和非流式响应
 */

import { ref, computed } from 'vue'
import XStream from './x-stream.js'

/**
 * 默认配置
 */
const DEFAULT_CONFIG = {
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
}

/**
 * XRequest 类
 */
class XRequestClass {
  constructor(options = {}) {
    this.baseURL = options.baseURL || ''
    this.model = options.model || ''
    this.timeout = options.timeout || DEFAULT_CONFIG.timeout
    this.headers = {
      ...DEFAULT_CONFIG.headers,
      ...options.headers
    }
    
    // 危险的 API Key 设置（仅用于开发环境）
    if (options.dangerouslyApiKey) {
      this.headers.Authorization = options.dangerouslyApiKey
    }
    
    // 自定义请求函数
    this.customFetch = options.fetch
  }
  
  /**
   * 创建请求实例
   * @param {Object} options 配置选项
   * @returns {XRequestClass} 请求实例
   */
  static init(options) {
    if (!options.baseURL || typeof options.baseURL !== 'string') {
      throw new Error('baseURL 是必需的且必须是字符串类型')
    }
    return new XRequestClass(options)
  }
  
  /**
   * 发起请求
   * @param {Object} params 请求参数
   * @param {Object} callbacks 回调函数
   * @param {Function} transformStream 自定义流转换器
   */
  async create(params = {}, callbacks = {}, transformStream = null) {
    const {
      model = this.model,
      stream = false,
      messages = [],
      ...otherParams
    } = params
    
    const {
      onSuccess = () => {},
      onError = () => {},
      onUpdate = () => {},
      onStream = () => {}
    } = callbacks
    
    // 构建请求数据
    const requestData = {
      model,
      stream,
      ...otherParams
    }
    
    // 创建 AbortController 用于取消请求
    const abortController = {
      signal: null,
      abort: () => {
        if (this.requestTask) {
          this.requestTask.abort()
        }
      }
    }
    
    // 通知外部可以控制请求
    onStream(abortController)
    
    try {
      if (stream) {
        // 流式请求处理
        await this._handleStreamRequest(requestData, callbacks, transformStream, abortController)
      } else {
        // 普通请求处理
        await this._handleNormalRequest(requestData, callbacks, abortController)
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('未知错误')
      onError(err)
      throw err
    }
  }
  
  /**
   * 处理普通请求
   */
  async _handleNormalRequest(requestData, callbacks, abortController) {
    const { onSuccess, onError, onUpdate } = callbacks
    
    return new Promise((resolve, reject) => {
      this.requestTask = uni.request({
        url: this.baseURL,
        method: 'POST',
        data: requestData,
        header: this.headers,
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            const data = res.data
            onUpdate(data)
            onSuccess([data])
            resolve(data)
          } else {
            const error = new Error(`请求失败，状态码: ${res.statusCode}`)
            onError(error)
            reject(error)
          }
        },
        fail: (err) => {
          const error = new Error(err.errMsg || '请求失败')
          onError(error)
          reject(error)
        }
      })
    })
  }
  
  /**
   * 处理流式请求
   */
  async _handleStreamRequest(requestData, callbacks, transformStream, abortController) {
    const { onSuccess, onError, onUpdate } = callbacks
    
    // 在小程序环境中，我们需要模拟流式响应
    // 因为小程序不支持真正的流式请求
    if (this._isMiniprogramEnv()) {
      return this._handleMiniprogramStream(requestData, callbacks, abortController)
    }
    
    // H5 环境使用 fetch 实现流式请求
    if (this._isH5Env()) {
      return this._handleH5Stream(requestData, callbacks, transformStream, abortController)
    }
    
    // App 环境回退到普通请求
    return this._handleNormalRequest(requestData, callbacks, abortController)
  }
  
  /**
   * H5 环境流式请求处理
   */
  async _handleH5Stream(requestData, callbacks, transformStream, abortController) {
    const { onSuccess, onError, onUpdate } = callbacks
    console.log('H5 环境流式请求处理',JSON.stringify(requestData))

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(requestData),
        signal: abortController.signal
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      if (!response.body) {
        throw new Error('响应体为空')
      }
      
      const chunks = []
      
      // 使用 XStream 处理流数据
      const streamOptions = {
        readableStream: response.body
      }
      
      if (transformStream) {
        streamOptions.transformStream = transformStream
      }
      
      const stream = XStream(streamOptions)
      
      for await (const chunk of stream) {
        if (abortController.signal?.aborted) {
          break
        }
        
        chunks.push(chunk)
        onUpdate(chunk)
      }
      
      onSuccess(chunks)
    } catch (error) {
      if (error.name === 'AbortError') {
        onError(new Error('请求已取消'))
      } else {
        onError(error)
      }
      throw error
    }
  }
  
  /**
   * 小程序环境流式请求模拟
   */
  async _handleMiniprogramStream(requestData, callbacks, abortController) {
    const { onSuccess, onError, onUpdate } = callbacks
    
    return new Promise((resolve, reject) => {
      this.requestTask = uni.request({
        url: this.baseURL,
        method: 'POST',
        data: requestData,
        header: this.headers,
        timeout: this.timeout,
        success: (res) => {
          if (res.statusCode === 200) {
            const data = res.data
            
            // 模拟流式响应，将完整响应分块处理
            if (data && data.choices && data.choices[0] && data.choices[0].delta) {
              // OpenAI 格式响应
              onUpdate(data)
              onSuccess([data])
            } else if (typeof data === 'string') {
              // 文本响应，模拟分块
              this._simulateTextStream(data, onUpdate, onSuccess)
            } else {
              // 其他格式响应
              onUpdate(data)
              onSuccess([data])
            }
            
            resolve(data)
          } else {
            const error = new Error(`请求失败，状态码: ${res.statusCode}`)
            onError(error)
            reject(error)
          }
        },
        fail: (err) => {
          const error = new Error(err.errMsg || '请求失败')
          onError(error)
          reject(error)
        }
      })
    })
  }
  
  /**
   * 模拟文本流式输出
   */
  _simulateTextStream(text, onUpdate, onSuccess) {
    const chunks = []
    const words = text.split('')
    let currentText = ''
    
    const interval = setInterval(() => {
      if (words.length === 0) {
        clearInterval(interval)
        onSuccess(chunks)
        return
      }
      
      currentText += words.shift()
      const chunk = {
        choices: [{
          delta: {
            content: currentText
          }
        }]
      }
      
      chunks.push(chunk)
      onUpdate(chunk)
    }, 50) // 每50ms输出一个字符
  }
  
  /**
   * 检查是否为小程序环境
   */
  _isMiniprogramEnv() {
    // #ifdef MP
    return true
    // #endif
    
    // #ifndef MP
    return false
    // #endif
  }
  
  /**
   * 检查是否为 H5 环境
   */
  _isH5Env() {
    // #ifdef H5
    return true
    // #endif
    
    // #ifndef H5
    return false
    // #endif
  }
}

/**
 * 创建 XRequest 实例的工厂函数
 */
const XRequest = XRequestClass

/**
 * 使用 XRequest 的 Vue 3 Composition API Hook
 * @param {Object} options 配置选项
 * @returns {Object} 包含请求状态和方法的对象
 */
export function useXRequest(options = {}) {
  const isLoading = ref(false)
  const error = ref(null)
  const data = ref(null)
  const chunks = ref([])
  const currentRequest = ref(null)
  
  // 创建请求实例
  const requestInstance = ref(null)
  
  /**
   * 初始化请求实例
   */
  const init = (config) => {
    requestInstance.value = XRequest(config)
    return requestInstance.value
  }
  
  /**
   * 发起请求
   */
  const create = async (params, customCallbacks = {}) => {
    if (!requestInstance.value) {
      throw new Error('请先调用 init 方法初始化请求实例')
    }
    
    isLoading.value = true
    error.value = null
    chunks.value = []
    
    const callbacks = {
      onSuccess: (responseChunks) => {
        data.value = responseChunks
        isLoading.value = false
        customCallbacks.onSuccess?.(responseChunks)
      },
      onError: (err) => {
        error.value = err
        isLoading.value = false
        customCallbacks.onError?.(err)
      },
      onUpdate: (chunk) => {
        chunks.value.push(chunk)
        customCallbacks.onUpdate?.(chunk)
      },
      onStream: (abortController) => {
        currentRequest.value = abortController
        customCallbacks.onStream?.(abortController)
      }
    }
    
    try {
      await requestInstance.value.create(params, callbacks, customCallbacks.transformStream)
    } catch (err) {
      // 错误已在 callbacks.onError 中处理
    }
  }
  
  /**
   * 取消当前请求
   */
  const abort = () => {
    if (currentRequest.value) {
      currentRequest.value.abort()
      currentRequest.value = null
      isLoading.value = false
    }
  }
  
  // 计算属性
  const hasError = computed(() => error.value !== null)
  const chunkCount = computed(() => chunks.value.length)
  const lastChunk = computed(() => {
    const len = chunks.value.length
    return len > 0 ? chunks.value[len - 1] : null
  })
  
  return {
    // 状态
    isLoading,
    error,
    data,
    chunks,
    currentRequest,
    requestInstance,
    
    // 计算属性
    hasError,
    chunkCount,
    lastChunk,
    
    // 方法
    init,
    create,
    abort
  }
}

// 导出
export {
  XRequestClass,
  XRequest
}

export default XRequest