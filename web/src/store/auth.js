export default {
  namespaced: true,
  state: () => ({
    isLogin: false,
    userInfo: {},
  }),
  mutations: {
    SET_IS_LOGIN (state, isLogin) {
      state.isLogin = isLogin
    },
    SET_USER_INFO (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {},
  getters: {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
  }
}