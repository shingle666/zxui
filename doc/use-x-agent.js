import { computed, ref } from 'vue'

/**
 * 请求函数信息接口
 * @typedef {Object} RequestFnInfo
 * @property {Array} [messages] - 消息数组
 * @property {*} [message] - 单个消息
 * @property {string} [baseURL] - 基础URL
 * @property {string} [key] - API密钥
 * @property {string} [model] - 模型名称
 * @property {string} [dangerouslyApiKey] - 危险的API密钥
 */

/**
 * 请求回调函数
 * @typedef {Object} RequestCallbacks
 * @property {Function} onUpdate - 更新回调
 * @property {Function} onSuccess - 成功回调
 * @property {Function} onError - 错误回调
 * @property {Function} [onStream] - 流回调
 */

/**
 * 请求函数类型
 * @typedef {Function} RequestFn
 * @param {RequestFnInfo} info - 请求信息
 * @param {RequestCallbacks} callbacks - 回调函数
 * @param {Function} [transformStream] - 流转换函数
 */

/**
 * 预设配置接口
 * @typedef {Object} XAgentConfigPreset
 * @property {string} baseURL - 基础URL
 * @property {string} key - API密钥
 * @property {string} model - 模型名称
 * @property {string} dangerouslyApiKey - 危险的API密钥
 */

/**
 * 自定义配置接口
 * @typedef {Object} XAgentConfigCustom
 * @property {RequestFn} [request] - 自定义请求函数
 */

/**
 * Agent配置类型
 * @typedef {Partial<XAgentConfigPreset> & XAgentConfigCustom} XAgentConfig
 */

let uuid = 0

/**
 * XAgent类 - 用于模型调度的Agent
 * 这是一个包装类，避免开发者获取过多原始对象信息
 */
export class XAgent {
  /**
   * 构造函数
   * @param {XAgentConfig} config - Agent配置
   */
  constructor(config) {
    this.config = config
    this.requestingMap = ref({})
  }

  /**
   * 完成请求
   * @param {number} id - 请求ID
   * @private
   */
  finishRequest(id) {
    delete this.requestingMap.value[id]
  }

  /**
   * 发起请求
   * @param {RequestFnInfo} info - 请求信息
   * @param {RequestCallbacks} callbacks - 回调函数
   * @param {Function} [transformStream] - 流转换函数
   */
  request = (info, callbacks, transformStream) => {
    const { request } = this.config
    const { onUpdate, onSuccess, onError, onStream } = callbacks

    const id = uuid
    uuid += 1
    this.requestingMap.value[id] = true

    if (request) {
      request(info, {
        onStream: (abortController) => {
          if (this.requestingMap.value[id]) {
            onStream && onStream(abortController)
          }
        },
        // 状态应该是唯一的
        // 一旦获得成功或错误就不应该再获得更多消息
        onUpdate: (message) => {
          if (this.requestingMap.value[id]) {
            onUpdate(message)
          }
        },
        onSuccess: (message) => {
          if (this.requestingMap.value[id]) {
            onSuccess(message)
            this.finishRequest(id)
          }
        },
        onError: (error) => {
          if (this.requestingMap.value[id]) {
            onError(error)
            this.finishRequest(id)
          }
        }
      }, transformStream)
    }
  }

  /**
   * 检查是否正在请求
   * @returns {boolean} 是否正在请求
   */
  isRequesting() {
    return Object.keys(this.requestingMap.value).length > 0
  }
}

/**
 * 创建默认请求函数
 * @param {Object} config - 配置对象
 * @param {string} config.baseURL - 基础URL
 * @param {string} [config.model] - 模型名称
 * @param {string} [config.dangerouslyApiKey] - API密钥
 * @returns {RequestFn} 请求函数
 */
function createDefaultRequest({ baseURL, model, dangerouslyApiKey }) {
  return async (info, callbacks, transformStream) => {
    const { onUpdate, onSuccess, onError, onStream } = callbacks
    
    try {
      // 创建AbortController用于取消请求
      const abortController = new AbortController()
      
      // 通知流开始
      onStream && onStream(abortController)
      
      // 准备请求数据
      const requestData = {
        model: model || info.model,
        messages: info.messages || [info.message].filter(Boolean),
        stream: true,
        ...info
      }
      
      // 准备请求头
      const headers = {
        'Content-Type': 'application/json'
      }
      
      if (dangerouslyApiKey) {
        headers['Authorization'] = dangerouslyApiKey
      }
      
      // 发起请求
      const response = await uni.request({
        url: baseURL,
        method: 'POST',
        data: requestData,
        header: headers,
        timeout: 30000
      })
      
      if (response.statusCode === 200) {
        // 模拟流式响应处理
        const data = response.data
        
        if (Array.isArray(data)) {
          // 如果返回数组，逐个处理
          data.forEach(item => {
            onUpdate(item)
          })
          onSuccess(data)
        } else {
          // 单个响应
          onUpdate(data)
          onSuccess([data])
        }
      } else {
        throw new Error(`请求失败: ${response.statusCode}`)
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('未知错误')
      onError(err)
    }
  }
}

/**
 * useXAgent Hook
 * 用于模型调度的 Agent 钩子
 * @param {XAgentConfig} config - Agent配置
 * @returns {Array} 返回包含agent的数组
 */
export default function useXAgent(config) {
  const { request, ...restConfig } = config
  
  const agent = computed(() => {
    return new XAgent({
      request: request || createDefaultRequest({
        baseURL: restConfig.baseURL,
        model: restConfig.model,
        dangerouslyApiKey: restConfig.dangerouslyApiKey
      }),
      ...restConfig
    })
  })

  return [agent]
}

/**
 * 导出类型定义（用于JSDoc）
 * @typedef {XAgent} XAgent
 * @typedef {RequestFn} RequestFn
 * @typedef {XAgentConfigPreset} XAgentConfigPreset
 * @typedef {XAgentConfigCustom} XAgentConfigCustom
 * @typedef {XAgentConfig} XAgentConfig
 */