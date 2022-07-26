export default {
  namespaced: true,
  state: () => ({
    isLogin: false
  }),
  mutations: {
    SET_IS_LOGIN (state, isLogin) {
      state.isLogin = isLogin
    }
  },
  actions: {},
  getters: {
    isLogin: state => state.isLogin
  }
}