import { createStore } from 'vuex'
import loginModule from './login/login'
import { IRootState } from './types'

export default createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      // name: 'dxy',
      age: 18,
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login: loginModule,
  },
})
