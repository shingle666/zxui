import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      // 在这里定义您的状态
      count: 0,
      user: null,
      isLoggedIn: false
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
    }
  }
})

export default store
