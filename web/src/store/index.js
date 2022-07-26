import auth from './auth'

export default {
  modules: {
    auth,
  },
  state: () => ({
    userType: null
  }),
  mutations: {
    SET_USER_TYPE (state, userType) {
      state.userType = userType
    }
  },
  actions: {},
  getters: {
    userType: state => state.userType
  }
}