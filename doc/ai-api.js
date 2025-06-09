/**
 * AI API 接口封装
 * 基于项目的请求工具封装所有AI相关接口
 */

import requestModule from '../src/utils/request.js'
import XRequest from './x-request.js'

// 解构获取request方法
const { request } = requestModule

/**
 * 复用 request.js 的配置
 * 直接使用 request.js 中定义的 BASE_URL、TIMEOUT 和 HEADER 函数
 */
// 从 request.js 导入配置函数
import { BASE_URL, TIMEOUT, HEADER } from '../src/utils/request.js'

// 使用导入的配置函数
const API_CONFIG = {
  get baseURL() {
    return BASE_URL()
  },
  get timeout() {
    return TIMEOUT()
  },
  get headers() {
    return HEADER()
  }
}

/**
 * 1. Authentication 认证相关接口
 */
export const authAPI = {
  /**
   * 获取认证信息
   * @returns {Promise}
   */
  getAuth() {
    return request({
      url: '/auth',
      method: 'GET'
    })
  }
}

/**
 * 2. Admin 管理员相关接口
 */
export const adminAPI = {
  /**
   * 检查是否为多用户模式
   * @returns {Promise}
   */
  isMultiUserMode() {
    return request({
      url: '/admin/is-multi-user-mode',
      method: 'GET'
    })
  },

  /**
   * 获取用户列表
   * @returns {Promise}
   */
  getUsers() {
    return request({
      url: '/admin/users',
      method: 'GET'
    })
  },

  /**
   * 创建新用户
   * @param {Object} userData 用户数据
   * @returns {Promise}
   */
  createUser(userData) {
    return request({
      url: '/admin/users/new',
      method: 'POST',
      data: userData
    })
  },

  /**
   * 更新用户信息
   * @param {string} id 用户ID
   * @param {Object} userData 用户数据
   * @returns {Promise}
   */
  updateUser(id, userData) {
    return request({
      url: `/admin/users/${id}`,
      method: 'POST',
      data: userData
    })
  },

  /**
   * 删除用户
   * @param {string} id 用户ID
   * @returns {Promise}
   */
  deleteUser(id) {
    return request({
      url: `/admin/users/${id}`,
      method: 'DELETE'
    })
  },

  /**
   * 获取邀请列表
   * @returns {Promise}
   */
  getInvites() {
    return request({
      url: '/admin/invites',
      method: 'GET'
    })
  },

  /**
   * 创建新邀请
   * @param {Object} inviteData 邀请数据
   * @returns {Promise}
   */
  createInvite(inviteData) {
    return request({
      url: '/admin/invite/new',
      method: 'POST',
      data: inviteData
    })
  },

  /**
   * 删除邀请
   * @param {string} id 邀请ID
   * @returns {Promise}
   */
  deleteInvite(id) {
    return request({
      url: `/admin/invite/${id}`,
      method: 'DELETE'
    })
  },

  /**
   * 获取工作空间用户
   * @param {string} workspaceId 工作空间ID
   * @returns {Promise}
   */
  getWorkspaceUsers(workspaceId) {
    return request({
      url: `/admin/workspaces/${workspaceId}/users`,
      method: 'GET'
    })
  },

  /**
   * 更新工作空间用户
   * @param {string} workspaceId 工作空间ID
   * @param {Object} userData 用户数据
   * @returns {Promise}
   */
  updateWorkspaceUsers(workspaceId, userData) {
    return request({
      url: `/admin/workspaces/${workspaceId}/update-users`,
      method: 'POST',
      data: userData
    })
  },

  /**
   * 管理工作空间用户
   * @param {string} workspaceSlug 工作空间标识
   * @param {Object} userData 用户数据
   * @returns {Promise}
   */
  manageWorkspaceUsers(workspaceSlug, userData) {
    return request({
      url: `/admin/workspaces/${workspaceSlug}/manage-users`,
      method: 'POST',
      data: userData
    })
  },

  /**
   * 获取工作空间聊天记录
   * @param {Object} params 查询参数
   * @returns {Promise}
   */
  getWorkspaceChats(params) {
    return request({
      url: '/admin/workspace-chats',
      method: 'POST',
      data: params
    })
  },

  /**
   * 更新管理员偏好设置
   * @param {Object} preferences 偏好设置
   * @returns {Promise}
   */
  updatePreferences(preferences) {
    return request({
      url: '/admin/preferences',
      method: 'POST',
      data: preferences
    })
  }
}

/**
 * 3. Documents 文档相关接口
 */
export const documentsAPI = {
  /**
   * 上传文档
   * @param {FormData} formData 文件数据
   * @returns {Promise}
   */
  uploadDocument(formData) {
    return request({
      url: '/document/upload',
      method: 'POST',
      data: formData,
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * 上传文档到指定文件夹
   * @param {string} folderName 文件夹名称
   * @param {FormData} formData 文件数据
   * @returns {Promise}
   */
  uploadDocumentToFolder(folderName, formData) {
    return request({
      url: `/document/upload/${folderName}`,
      method: 'POST',
      data: formData,
      header: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * 通过链接上传文档
   * @param {Object} linkData 链接数据
   * @returns {Promise}
   */
  uploadDocumentByLink(linkData) {
    return request({
      url: '/document/upload-link',
      method: 'POST',
      data: linkData
    })
  },

  /**
   * 上传原始文本
   * @param {Object} textData 文本数据
   * @returns {Promise}
   */
  uploadRawText(textData) {
    return request({
      url: '/document/raw-text',
      method: 'POST',
      data: textData
    })
  },

  /**
   * 获取文档列表
   * @returns {Promise}
   */
  getDocuments() {
    return request({
      url: '/documents',
      method: 'GET'
    })
  },

  /**
   * 获取文件夹中的文档
   * @param {string} folderName 文件夹名称
   * @returns {Promise}
   */
  getDocumentsInFolder(folderName) {
    return request({
      url: `/documents/folder/${folderName}`,
      method: 'GET'
    })
  },

  /**
   * 获取支持的文件类型
   * @returns {Promise}
   */
  getAcceptedFileTypes() {
    return request({
      url: '/document/accepted-file-types',
      method: 'GET'
    })
  },

  /**
   * 获取元数据架构
   * @returns {Promise}
   */
  getMetadataSchema() {
    return request({
      url: '/document/metadata-schema',
      method: 'GET'
    })
  },

  /**
   * 获取文档详情
   * @param {string} docName 文档名称
   * @returns {Promise}
   */
  getDocument(docName) {
    return request({
      url: `/document/${docName}`,
      method: 'GET'
    })
  },

  /**
   * 创建文件夹
   * @param {Object} folderData 文件夹数据
   * @returns {Promise}
   */
  createFolder(folderData) {
    return request({
      url: '/document/create-folder',
      method: 'POST',
      data: folderData
    })
  },

  /**
   * 删除文件夹
   * @param {Object} folderData 文件夹数据
   * @returns {Promise}
   */
  removeFolder(folderData) {
    return request({
      url: '/document/remove-folder',
      method: 'DELETE',
      data: folderData
    })
  },

  /**
   * 移动文件
   * @param {Object} moveData 移动数据
   * @returns {Promise}
   */
  moveFiles(moveData) {
    return request({
      url: '/document/move-files',
      method: 'POST',
      data: moveData
    })
  }
}

/**
 * 4. Workspaces 工作空间相关接口
 */
export const workspacesAPI = {
  /**
   * 创建新工作空间
   * @param {Object} workspaceData 工作空间数据
   * @returns {Promise}
   */
  createWorkspace(workspaceData) {
    return request({
      url: '/workspace/new',
      method: 'POST',
      data: workspaceData
    })
  },

  /**
   * 获取工作空间列表
   * @returns {Promise}
   */
  getWorkspaces() {
    return request({
      url: '/workspaces',
      method: 'GET'
    })
  },

  /**
   * 获取工作空间详情
   * @param {string} slug 工作空间标识
   * @returns {Promise}
   */
  getWorkspace(slug) {
    return request({
      url: `/workspace/${slug}`,
      method: 'GET'
    })
  },

  /**
   * 删除工作空间
   * @param {string} slug 工作空间标识
   * @returns {Promise}
   */
  deleteWorkspace(slug) {
    return request({
      url: `/workspace/${slug}`,
      method: 'DELETE'
    })
  },

  /**
   * 更新工作空间
   * @param {string} slug 工作空间标识
   * @param {Object} workspaceData 工作空间数据
   * @returns {Promise}
   */
  updateWorkspace(slug, workspaceData) {
    return request({
      url: `/workspace/${slug}/update`,
      method: 'POST',
      data: workspaceData
    })
  },

  /**
   * 获取工作空间聊天记录
   * @param {string} slug 工作空间标识
   * @returns {Promise}
   */
  getWorkspaceChats(slug) {
    return request({
      url: `/workspace/${slug}/chats`,
      method: 'GET'
    })
  },

  /**
   * 更新嵌入向量
   * @param {string} slug 工作空间标识
   * @param {Object} embeddingData 嵌入数据
   * @returns {Promise}
   */
  updateEmbeddings(slug, embeddingData) {
    return request({
      url: `/workspace/${slug}/update-embeddings`,
      method: 'POST',
      data: embeddingData
    })
  },

  /**
   * 更新置顶状态
   * @param {string} slug 工作空间标识
   * @param {Object} pinData 置顶数据
   * @returns {Promise}
   */
  updatePin(slug, pinData) {
    return request({
      url: `/workspace/${slug}/update-pin`,
      method: 'POST',
      data: pinData
    })
  },

  /**
   * 发送聊天消息
   * @param {string} slug 工作空间标识
   * @param {Object} chatData 聊天数据
   * @returns {Promise}
   */
  chat(slug, chatData) {
    return request({
      url: `/workspace/${slug}/chat`,
      method: 'POST',
      data: chatData
    })
  },

  /**
   * 流式聊天
   * @param {string} slug 工作空间标识
   * @param {Object} chatData 聊天数据
   * @param {Object} callbacks 回调函数
   * @returns {Promise}
   */
  streamChat(slug, chatData, callbacks = {}) {
    const xRequest = XRequest.init({
      ...API_CONFIG,
      baseURL: `${API_CONFIG.baseURL}/workspace/${slug}/stream-chat`
    })
    
    // 转换参数格式以符合AnythingLLM API要求
    const requestData = {
      message: chatData.message || (chatData.messages && chatData.messages.length > 0 
        ? chatData.messages[chatData.messages.length - 1].content 
        : ''),
      mode: 'chat',
      sessionId: chatData.sessionId || 'identifier-to-partition-chats-by-external-id',
      attachments: chatData.attachments || [],
      reset: chatData.reset || false,
      model: chatData.model || 'deepseek'
    }
    
    return xRequest.create(requestData, callbacks)
  },

  /**
   * 向量搜索
   * @param {string} slug 工作空间标识
   * @param {Object} searchData 搜索数据
   * @returns {Promise}
   */
  vectorSearch(slug, searchData) {
    return request({
      url: `/workspace/${slug}/vector-search`,
      method: 'POST',
      data: searchData
    })
  }
}

/**
 * 5. System Settings 系统设置相关接口
 */
export const systemAPI = {
  /**
   * 获取环境变量转储
   * @returns {Promise}
   */
  getEnvDump() {
    return request({
      url: '/system/env-dump',
      method: 'GET'
    })
  },

  /**
   * 获取系统信息
   * @returns {Promise}
   */
  getSystemInfo() {
    return request({
      url: '/system',
      method: 'GET'
    })
  },

  /**
   * 获取向量数量
   * @returns {Promise}
   */
  getVectorCount() {
    return request({
      url: '/system/vector-count',
      method: 'GET'
    })
  },

  /**
   * 更新环境变量
   * @param {Object} envData 环境变量数据
   * @returns {Promise}
   */
  updateEnv(envData) {
    return request({
      url: '/system/update-env',
      method: 'POST',
      data: envData
    })
  },

  /**
   * 导出聊天记录
   * @returns {Promise}
   */
  exportChats() {
    return request({
      url: '/system/export-chats',
      method: 'GET'
    })
  },

  /**
   * 删除文档
   * @param {Object} removeData 删除数据
   * @returns {Promise}
   */
  removeDocuments(removeData) {
    return request({
      url: '/system/remove-documents',
      method: 'DELETE',
      data: removeData
    })
  }
}

/**
 * 6. Workspace Threads 工作空间线程相关接口
 */
export const threadsAPI = {
  /**
   * 创建新线程
   * @param {string} slug 工作空间标识
   * @param {Object} threadData 线程数据
   * @returns {Promise}
   */
  createThread(slug, threadData) {
    return request({
      url: `/workspace/${slug}/thread/new`,
      method: 'POST',
      data: threadData
    })
  },

  /**
   * 更新线程
   * @param {string} slug 工作空间标识
   * @param {string} threadSlug 线程标识
   * @param {Object} threadData 线程数据
   * @returns {Promise}
   */
  updateThread(slug, threadSlug, threadData) {
    return request({
      url: `/workspace/${slug}/thread/${threadSlug}/update`,
      method: 'POST',
      data: threadData
    })
  },

  /**
   * 删除线程
   * @param {string} slug 工作空间标识
   * @param {string} threadSlug 线程标识
   * @returns {Promise}
   */
  deleteThread(slug, threadSlug) {
    return request({
      url: `/workspace/${slug}/thread/${threadSlug}`,
      method: 'DELETE'
    })
  },

  /**
   * 获取线程聊天记录
   * @param {string} slug 工作空间标识
   * @param {string} threadSlug 线程标识
   * @returns {Promise}
   */
  getThreadChats(slug, threadSlug) {
    return request({
      url: `/workspace/${slug}/thread/${threadSlug}/chats`,
      method: 'GET'
    })
  },

  /**
   * 线程聊天
   * @param {string} slug 工作空间标识
   * @param {string} threadSlug 线程标识
   * @param {Object} chatData 聊天数据
   * @returns {Promise}
   */
  threadChat(slug, threadSlug, chatData) {
    return request({
      url: `/workspace/${slug}/thread/${threadSlug}/chat`,
      method: 'POST',
      data: chatData
    })
  },

  /**
   * 线程流式聊天
   * @param {string} slug 工作空间标识
   * @param {string} threadSlug 线程标识
   * @param {Object} chatData 聊天数据
   * @param {Object} callbacks 回调函数
   * @returns {Promise}
   */
  threadStreamChat(slug, threadSlug, chatData, callbacks = {}) {
    const xRequest = XRequest.init({
      ...API_CONFIG,
      baseURL: `${API_CONFIG.baseURL}/workspace/${slug}/thread/${threadSlug}/stream-chat`
    })

    console.log('chatData', JSON.stringify(chatData))
    
    // 转换为 AnythingLLM API 格式
    const requestData = {
      message: chatData.message,
      mode: 'chat',
      sessionId: chatData.sessionId || `thread-${threadSlug}-${Date.now()}`,
      attachments: chatData.attachments || [],
      reset: chatData.reset || false,
      stream: true
    }
    
    return xRequest.create(requestData, callbacks)
  }
}

/**
 * 7. User Management 用户管理相关接口
 */
export const usersAPI = {
  /**
   * 获取用户列表
   * @returns {Promise}
   */
  getUsers() {
    return request({
      url: '/users',
      method: 'GET'
    })
  }
}

/**
 * 8. OpenAI Compatible Endpoints OpenAI兼容接口
 */
export const openaiAPI = {
  /**
   * 获取模型列表
   * @returns {Promise}
   */
  getModels() {
    return request({
      url: '/openai/models',
      method: 'GET'
    })
  },

  /**
   * 聊天完成
   * @param {Object} chatData 聊天数据
   * @returns {Promise}
   */
  chatCompletions(chatData) {
    return request({
      url: '/openai/chat/completions',
      method: 'POST',
      data: chatData
    })
  },

  /**
   * 获取嵌入向量
   * @param {Object} embeddingData 嵌入数据
   * @returns {Promise}
   */
  embeddings(embeddingData) {
    return request({
      url: '/openai/embeddings',
      method: 'POST',
      data: embeddingData
    })
  },

  /**
   * 获取向量存储
   * @returns {Promise}
   */
  getVectorStores() {
    return request({
      url: '/openai/vector_stores',
      method: 'GET'
    })
  }
}

/**
 * 9. Embed 嵌入相关接口
 */
export const embedAPI = {
  /**
   * 获取嵌入信息
   * @returns {Promise}
   */
  getEmbed() {
    return request({
      url: '/embed',
      method: 'GET'
    })
  },

  /**
   * 获取嵌入聊天记录
   * @param {string} embedUuid 嵌入UUID
   * @returns {Promise}
   */
  getEmbedChats(embedUuid) {
    return request({
      url: `/embed/${embedUuid}/chats`,
      method: 'GET'
    })
  },

  /**
   * 获取嵌入会话聊天记录
   * @param {string} embedUuid 嵌入UUID
   * @param {string} sessionUuid 会话UUID
   * @returns {Promise}
   */
  getEmbedSessionChats(embedUuid, sessionUuid) {
    return request({
      url: `/embed/${embedUuid}/chats/${sessionUuid}`,
      method: 'GET'
    })
  },

  /**
   * 创建新嵌入
   * @param {Object} embedData 嵌入数据
   * @returns {Promise}
   */
  createEmbed(embedData) {
    return request({
      url: '/embed/new',
      method: 'POST',
      data: embedData
    })
  },

  /**
   * 更新嵌入
   * @param {string} embedUuid 嵌入UUID
   * @param {Object} embedData 嵌入数据
   * @returns {Promise}
   */
  updateEmbed(embedUuid, embedData) {
    return request({
      url: `/embed/${embedUuid}`,
      method: 'POST',
      data: embedData
    })
  },

  /**
   * 删除嵌入
   * @param {string} embedUuid 嵌入UUID
   * @returns {Promise}
   */
  deleteEmbed(embedUuid) {
    return request({
      url: `/embed/${embedUuid}`,
      method: 'DELETE'
    })
  }
}

/**
 * 统一导出所有API
 */
export default {
  auth: authAPI,
  admin: adminAPI,
  documents: documentsAPI,
  workspaces: workspacesAPI,
  system: systemAPI,
  threads: threadsAPI,
  users: usersAPI,
  openai: openaiAPI,
  embed: embedAPI
}

/**
 * 使用示例：
 * 
 * // 导入方式1：按模块导入
 * import { authAPI, workspacesAPI } from '@/utils/ai-api.js'
 * 
 * // 导入方式2：统一导入
 * import aiAPI from '@/utils/ai-api.js'
 * 
 * // 使用示例
 * // 获取认证信息
 * const authInfo = await authAPI.getAuth()
 * 
 * // 创建工作空间
 * const workspace = await workspacesAPI.createWorkspace({
 *   name: '我的工作空间',
 *   description: '这是一个测试工作空间'
 * })
 * 
 * // 流式聊天
 * await workspacesAPI.streamChat('workspace-slug', {
 *   message: '你好',
 *   model: 'gpt-3.5-turbo'
 * }, {
 *   onUpdate: (data) => console.log('收到数据:', data),
 *   onError: (error) => console.error('错误:', error),
 *   onSuccess: (result) => console.log('完成:', result)
 * })
 */