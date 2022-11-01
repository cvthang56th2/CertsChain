import auth from './auth'

export default {
  modules: {
    auth,
  },
  state: () => ({
    isLoading: false
  }),
  mutations: {
    SET_IS_LOADING (state, isLoading) {
      state.isLoading = isLoading
    },
  },
  actions: {},
  getters: {
    isLoading: state => state.isLoading
  }
}