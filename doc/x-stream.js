import { ref, computed } from 'vue'

/**
 * @description 默认流分隔符
 */
const DEFAULT_STREAM_SEPARATOR = '\n\n'

/**
 * @description 默认部分分隔符
 * @example "event: delta\ndata: {\"key\": \"value\"}"
 */
const DEFAULT_PART_SEPARATOR = '\n'

/**
 * @description 默认键值分隔符，使用冒号(:)分隔键和值
 * @example "event: delta"
 */
const DEFAULT_KV_SEPARATOR = ':'

/**
 * 检查字符串是否不为空或仅包含空白字符
 * @param {string} str - 要检查的字符串
 * @returns {boolean} 是否为有效字符串
 */
const isValidString = (str) => (str ?? '').trim() !== ''

/**
 * 创建流分割转换器
 * @description 基于 DEFAULT_STREAM_SEPARATOR 将流分割成部分的 TransformStream 实例
 * @returns {TransformStream<string, string>} 转换流
 */
function splitStream() {
  // 用于在转换之间存储不完整数据块的缓冲区
  let buffer = ''

  return new TransformStream({
    transform(streamChunk, controller) {
      buffer += streamChunk

      // 基于分隔符分割缓冲区
      const parts = buffer.split(DEFAULT_STREAM_SEPARATOR)

      // 将除最后一个不完整部分外的所有完整部分入队
      parts.slice(0, -1).forEach((part) => {
        // 跳过空部分
        if (isValidString(part)) {
          controller.enqueue(part)
        }
      })

      // 将最后一个不完整部分保存回缓冲区以供下一个块使用
      buffer = parts[parts.length - 1]
    },
    flush(controller) {
      // 如果缓冲区中还有剩余数据，将其作为最终部分入队
      if (isValidString(buffer)) {
        controller.enqueue(buffer)
      }
    },
  })
}

/**
 * 创建部分分割转换器
 * @description 将部分字符串转换为 SSE 输出对象的 TransformStream 实例
 * @returns {TransformStream<string, Object>} 转换流
 */
function splitPart() {
  return new TransformStream({
    transform(partChunk, controller) {
      // 使用部分分隔符将块分割为键值对
      const lines = partChunk.split(DEFAULT_PART_SEPARATOR)

      const sseEvent = lines.reduce((acc, line) => {
        const separatorIndex = line.indexOf(DEFAULT_KV_SEPARATOR)

        if (separatorIndex === -1) {
          throw new Error(
            `在 SSE 行块中未找到键值分隔符 "${DEFAULT_KV_SEPARATOR}"！`,
          )
        }

        // 从行的开始到分隔符提取键
        const key = line.slice(0, separatorIndex)

        // 冒号用于注释行，直接跳过
        if (!isValidString(key)) return acc

        // 从分隔符后提取值
        const value = line.slice(separatorIndex + 1)

        return { ...acc, [key]: value }
      }, {})

      if (Object.keys(sseEvent).length === 0) return

      // 将键值对减少为单个对象并入队
      controller.enqueue(sseEvent)
    },
  })
}

/**
 * 创建 SSE 转换流
 * @description 默认的 SSE 协议转换流
 * @returns {TransformStream<string, Object>} SSE 转换流
 */
function createSSETransformStream() {
  return new TransformStream({
    transform(chunk, controller) {
      // 先通过流分割器
      const streamSplitter = splitStream()
      const partSplitter = splitPart()
      
      // 创建临时流进行处理
      const tempStream = new ReadableStream({
        start(streamController) {
          streamController.enqueue(chunk)
          streamController.close()
        }
      })
      
      // 处理流数据
      const processStream = async () => {
        const reader = tempStream
          .pipeThrough(streamSplitter)
          .pipeThrough(partSplitter)
          .getReader()
          
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) {
            controller.enqueue(value)
          }
        }
      }
      
      processStream().catch(err => {
        console.error('SSE 流处理错误:', err)
      })
    }
  })
}

/**
 * XStream 配置选项
 * @typedef {Object} XStreamOptions
 * @property {ReadableStream<Uint8Array>} readableStream - 二进制数据的可读流
 * @property {TransformStream<string, any>} [transformStream] - 支持自定义的 transformStream 来转换流
 */

/**
 * 转换 Uint8Array 二进制流为 SSE 输出（默认）
 * @description 默认情况下将 Uint8Array 二进制流转换为 SSE 输出
 * @warning XStream 仅支持 utf-8 编码。未来可能支持更多编码
 * @param {XStreamOptions} options - 配置选项
 * @returns {ReadableStream & AsyncGenerator} 可读流和异步生成器
 */
function XStream(options) {
  const { readableStream, transformStream } = options

  if (!(readableStream instanceof ReadableStream)) {
    throw new Error('options.readableStream 必须是 ReadableStream 的实例。')
  }

  // 默认编码是 utf-8
  const decoderStream = new TextDecoderStream()

  const stream = transformStream
    ? // Uint8Array 二进制 -> 字符串 -> 输出
      readableStream.pipeThrough(decoderStream).pipeThrough(transformStream)
    : // Uint8Array 二进制 -> 字符串 -> SSE 部分字符串 -> 默认输出 SSE 对象
      readableStream
        .pipeThrough(decoderStream)
        .pipeThrough(splitStream())
        .pipeThrough(splitPart())

  // 支持异步迭代器
  stream[Symbol.asyncIterator] = async function* () {
    const reader = this.getReader()

    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      if (!value) continue

      // 通过所有转换管道转换的数据
      yield value
    }
  }

  return stream
}

/**
 * 使用 XStream 的 Vue 3 Composition API Hook
 * @param {XStreamOptions} options - XStream 配置选项
 * @returns {Object} 包含流状态和方法的对象
 */
export function useXStream(options = {}) {
  const isStreaming = ref(false)
  const error = ref(null)
  const chunks = ref([])
  const currentStream = ref(null)

  /**
   * 开始流处理
   * @param {ReadableStream<Uint8Array>} readableStream - 可读流
   * @param {TransformStream} [transformStream] - 可选的转换流
   * @returns {Promise<AsyncGenerator>} 异步生成器
   */
  const startStream = async (readableStream, transformStream) => {
    try {
      isStreaming.value = true
      error.value = null
      chunks.value = []

      const streamOptions = {
        readableStream,
        ...(transformStream && { transformStream })
      }

      const stream = XStream(streamOptions)
      currentStream.value = stream

      return stream
    } catch (err) {
      error.value = err
      isStreaming.value = false
      throw err
    }
  }

  /**
   * 停止当前流
   */
  const stopStream = () => {
    if (currentStream.value) {
      try {
        const reader = currentStream.value.getReader()
        reader.cancel()
      } catch (err) {
        console.warn('停止流时出错:', err)
      }
    }
    isStreaming.value = false
    currentStream.value = null
  }

  /**
   * 处理流数据
   * @param {AsyncGenerator} stream - 流生成器
   * @param {Function} onChunk - 处理每个数据块的回调
   * @param {Function} [onComplete] - 流完成时的回调
   * @param {Function} [onError] - 错误处理回调
   */
  const processStream = async (stream, onChunk, onComplete, onError) => {
    try {
      for await (const chunk of stream) {
        if (!isStreaming.value) break
        
        chunks.value.push(chunk)
        if (onChunk) {
          onChunk(chunk)
        }
      }
      
      isStreaming.value = false
      if (onComplete) {
        onComplete(chunks.value)
      }
    } catch (err) {
      error.value = err
      isStreaming.value = false
      if (onError) {
        onError(err)
      }
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
    isStreaming,
    error,
    chunks,
    currentStream,
    
    // 计算属性
    hasError,
    chunkCount,
    lastChunk,
    
    // 方法
    startStream,
    stopStream,
    processStream
  }
}

// 导出主要函数和类型
export {
  XStream,
  splitStream,
  splitPart,
  createSSETransformStream,
  DEFAULT_STREAM_SEPARATOR,
  DEFAULT_PART_SEPARATOR,
  DEFAULT_KV_SEPARATOR
}

export default XStream