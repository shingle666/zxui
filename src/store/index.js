import { createStore } from 'vuex'

// AI 默认配置常量
const DEFAULT_AI_CONFIG = {
  baseURL: 'http://localhost:3001/api/v1',
  model: 'deepseek',
  apiKey: 'K2XG1R3-GQ844B1-GBEZ6J0-FJE7BHW',
  stream: true,
  maxTokens: 2000,
  temperature: 0.7
}

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      user: null,
      isLoggedIn: false,
      // AI 配置
      aiConfig: { ...DEFAULT_AI_CONFIG },
      // 底部导航数据
      tabbarList: [
        { icon: 'home', title: '首页', name: 0, path: '/pages/index/index' },
        { icon: 'server-man', title: 'AI', name: 1, path: '/pages4/ai/ai' },
        { icon: 'integral', title: '专题', name: 2, path: '/pages4/topic/topic', dot: true },
        { icon: 'grid', title: '模板', name: 3, path: '/pages4/template/template' },
        { icon: 'account', title: '我的', name: 4, path: '/pages4/my/my' }
      ]
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
    },
    // AI 配置相关 mutations
    updateAiConfig(state, config) {
      state.aiConfig = { ...state.aiConfig, ...config }
    },
    setAiBaseURL(state, baseURL) {
      state.aiConfig.baseURL = baseURL
    },
    setAiModel(state, model) {
      state.aiConfig.model = model
    },
    setAiApiKey(state, apiKey) {
      state.aiConfig.apiKey = apiKey
    },
    setAiMaxTokens(state, maxTokens) {
      state.aiConfig.maxTokens = maxTokens
    },
    setAiTemperature(state, temperature) {
      state.aiConfig.temperature = temperature
    },
    setAiStream(state, stream) {
      state.aiConfig.stream = stream
    }
  },
  actions: {
    // 在这里定义您的 actions
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    login({ commit }, userData) {
      // 这里可以添加登录逻辑，例如API请求
      commit('setUser', userData)
    },
    logout({ commit }) {
      commit('logout')
    },
    // AI 配置相关 actions
    updateAiConfig({ commit }, config) {
      commit('updateAiConfig', config)
      // 保存到本地存储
      try {
        uni.setStorageSync('aiConfig', config)
      } catch (e) {
        console.error('保存 AI 配置失败:', e)
      }
    },
    loadAiConfig({ commit, state }) {
      try {
        const savedConfig = uni.getStorageSync('aiConfig')
        if (savedConfig) {
          commit('updateAiConfig', savedConfig)
        }
      } catch (e) {
        console.error('加载 AI 配置失败:', e)
      }
    },
    resetAiConfig({ commit }) {
      commit('updateAiConfig', DEFAULT_AI_CONFIG)
      try {
        uni.setStorageSync('aiConfig', DEFAULT_AI_CONFIG)
      } catch (e) {
        console.error('重置 AI 配置失败:', e)
      }
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    tabbarList: state => {
      return state.tabbarList
    },
    user: state => {
      return state.user
    },
    // AI 配置相关 getters
    aiConfig: state => {
      return state.aiConfig
    },
    aiBaseURL: state => {
      return state.aiConfig.baseURL
    },
    aiApiKey: state => {
      return state.aiConfig.apiKey
    },
    aiModelName: state => {
      return state.aiConfig.model
    },
    aiMaxTokens: state => {
      return state.aiConfig.maxTokens
    },
    aiTemperature: state => {
      return state.aiConfig.temperature
    },
    aiStream: state => {
      return state.aiConfig.stream
    }
  }
})

export default store
