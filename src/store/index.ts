import { createStore } from 'vuex'
import loginModule from './login/login'
import { IRootState } from './types'

const store = createStore<IRootState>({
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

/**
 * 初始化Vuex状态管理
 * 该函数用于在应用启动时从本地缓存恢复用户的登录状态
 * @description 应用启动时调用，自动从localStorage中加载之前保存的登录信息（token、用户信息、用户菜单）并更新到Vuex状态中
 */
export function setupStore() {
  // 触发login模块的loadLocalLogin action，从本地缓存加载登录状态
  store.dispatch('login/loadLocalLogin')
}
//初始化login模块的状态
setupStore()
export default store
