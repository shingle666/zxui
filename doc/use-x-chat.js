/**
 * use-x-chat - Vue 3 Composition API 聊天工具
 * 基于 uni-app 框架，全平台兼容
 * 支持消息管理、状态控制、流式响应等功能
 */

import { ref, computed } from 'vue'

// 工具函数
function toArray(item) {
  return Array.isArray(item) ? item : [item]
}

// 同步状态管理 Hook
function useSyncState(defaultState, onChange) {
  const stateRef = ref(defaultState)

  function setState(updater) {
    const newValue = typeof updater === 'function' ? updater(stateRef.value) : updater
    if (newValue !== stateRef.value) {
      onChange && onChange(newValue, stateRef.value)
    }
    stateRef.value = newValue
  }

  return [stateRef, setState]
}

// 事件回调 Hook
function useEventCallback(fn) {
  const fnRef = ref(fn)
  fnRef.value = fn
  
  return (...args) => {
    return fnRef.value(...args)
  }
}

/**
 * 主要的聊天 Hook
 * @param {Object} config 配置对象
 * @param {Object} config.agent 代理对象，用于处理请求
 * @param {Array} config.defaultMessages 默认消息列表
 * @param {Function} config.parser 消息解析器，将代理消息转换为气泡消息
 * @param {*} config.requestPlaceholder 请求占位符
 * @param {*} config.requestFallback 请求失败回调
 * @param {Function} config.transformMessage 消息转换函数
 * @param {Function} config.transformStream 流转换函数
 * @param {Function} config.resolveAbortController 中止控制器解析函数
 * @returns {Object} 返回聊天相关的方法和状态
 */
export function useXChat(config = {}) {
  const {
    defaultMessages = [],
    agent,
    requestFallback,
    requestPlaceholder,
    parser,
    transformMessage,
    transformStream,
    resolveAbortController,
  } = config

  // ========================= Agent Messages =========================
  const idRef = ref(0)

  // 默认消息处理
  const defaultMessage = computed(() => 
    defaultMessages.map((info, index) => ({
      id: `default_${index}`,
      status: 'local',
      ...info,
    }))
  )

  const [messages, setMessages] = useSyncState(defaultMessage.value, () => {})

  // 创建消息
  const createMessage = (message, status) => {
    const msg = {
      id: `msg_${idRef.value}`,
      message,
      status,
    }

    idRef.value += 1
    return msg
  }

  // ========================= BubbleMessages =========================
  const parsedMessages = computed(() => {
    const list = []
    messages.value.forEach((agentMsg) => {
      const rawParsedMsg = parser ? parser(agentMsg.message) : agentMsg.message
      const bubbleMsgs = toArray(rawParsedMsg)

      bubbleMsgs.forEach((bubbleMsg, bubbleMsgIndex) => {
        let key = agentMsg.id
        if (bubbleMsgs.length > 1) {
          key = `${key}_${bubbleMsgIndex}`
        }

        list.push({
          id: key,
          message: bubbleMsg,
          status: agentMsg.status,
        })
      })
    })

    return list
  })

  // ============================ Request =============================
  const getFilteredMessages = (msgs) =>
    msgs
      .filter((info) => info.status !== 'loading' && info.status !== 'error')
      .map((info) => info.message)

  // 获取请求消息（过滤掉加载中和错误的消息）
  const getRequestMessages = () => getFilteredMessages(messages.value)

  const getTransformMessage = (params) =>
    typeof transformMessage === 'function' ? transformMessage(params) : params.currentMessage

  // 请求处理
  const onRequest = useEventCallback((requestParams) => {
    if (!agent) {
      console.error('代理参数是必需的，当使用 onRequest 方法时')
      return
    }

    let loadingMsgId = null
    let message
    let otherRequestParams = {}

    if (
      typeof requestParams === 'object' &&
      requestParams?.message
    ) {
      const { message: requestParamsMessage, ...other } = requestParams
      message = requestParamsMessage
      otherRequestParams = other
    } else {
      message = requestParams
    }

    // 添加占位符消息
    setMessages((ori) => {
      let nextMessages = [...ori, createMessage(message, 'local')]

      if (requestPlaceholder) {
        let placeholderMsg

        if (typeof requestPlaceholder === 'function') {
          placeholderMsg = requestPlaceholder(message, {
            messages: getFilteredMessages(nextMessages),
          })
        } else {
          placeholderMsg = requestPlaceholder
        }

        const loadingMsg = createMessage(placeholderMsg, 'loading')
        loadingMsgId = loadingMsg.id

        nextMessages = [...nextMessages, loadingMsg]
      }

      return nextMessages
    })

    // 请求处理
    let updatingMsgId = null
    const updateMessage = (message, status) => {
      let msg = messages.value.find((info) => info.id === updatingMsgId)

      if (!msg) {
        // 如果不存在则创建
        const transformData = getTransformMessage({ currentMessage: message, status })
        msg = createMessage(transformData, status)
        setMessages((ori) => {
          const oriWithoutPending = ori.filter((info) => info.id !== loadingMsgId)
          return [...oriWithoutPending, msg]
        })
        updatingMsgId = msg.id
      } else {
        // 直接更新
        setMessages((ori) => {
          return ori.map((info) => {
            if (info.id === updatingMsgId) {
              const transformData = getTransformMessage({
                originMessage: info.message,
                currentMessage: message,
                status,
              })
              return {
                ...info,
                message: transformData,
                status,
              }
            }
            return info
          })
        })
      }

      return msg
    }

    // 调用代理请求
    if (agent && typeof agent.request === 'function') {
      agent.request(
        {
          message,
          messages: getRequestMessages(),
          ...otherRequestParams,
        },
        {
          onUpdate: (message) => {
            updateMessage(message, 'loading')
          },
          onSuccess: (message) => {
            updateMessage(message, 'success')
          },
          onError: async (error) => {
            if (requestFallback) {
              let fallbackMsg

              if (typeof requestFallback === 'function') {
                fallbackMsg = await requestFallback(message, {
                  error,
                  messages: getRequestMessages(),
                })
              } else {
                fallbackMsg = requestFallback
              }

              setMessages((ori) => [
                ...ori.filter((info) => info.id !== loadingMsgId && info.id !== updatingMsgId),
                createMessage(fallbackMsg, 'error'),
              ])
            } else {
              // 直接移除
              setMessages((ori) => {
                return ori.filter((info) => info.id !== loadingMsgId && info.id !== updatingMsgId)
              })
            }
          },
          onStream: (controller) => {
            resolveAbortController && resolveAbortController(controller)
          },
        },
        transformStream,
      )
    }
  })

  return {
    onRequest,
    messages,
    parsedMessages,
    setMessages,
  }
}

export default useXChat