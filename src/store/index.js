import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 在这里定义您的状态
      count: 0,
      user: null,
      isLoggedIn: false,
      // 底部导航数据
      tabbarList: [
        { icon: 'home', title: '首页', name: 0, path: '/pages/index/index' },
        { icon: 'server-man', title: 'AI', name: 1, path: '/pages/ai/ai' },
        { icon: 'integral', title: '专题', name: 2, path: '/pages/topic/topic', dot: true },
        { icon: 'grid', title: '模板', name: 3, path: '/pages/template/template' },
        { icon: 'account', title: '我的', name: 4, path: '/pages/my/my' }
      ]
    }
  },
  mutations: {
    // 在这里定义您的 mutations
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    setUser(state, user) {
      state.user = user
      state.isLoggedIn = !!user
    },
    logout(state) {
      state.user = null
      state.isLoggedIn = false
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
    }
  },
  getters: {
    // 在这里定义您的 getters
    doubleCount: state => {
      return state.count * 2
    },
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    tabbarList: state => {
      return state.tabbarList
    }
  }
})

export default store
