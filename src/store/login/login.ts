import {
  accountLoginRequest,
  requestUserInfoByID,
  requestUserMenusByRoleId,
} from '@/sevices/login/login'
import localCache from '@/utils/cache'

import { Module } from 'vuex/types'
import type { IAccount } from '@/sevices/login/type'
import type { ILoginState } from './types'
import type { IRootState } from '../types'

import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '', //登录成功后获取到的token
      userInfo: {}, //登录成功后获取到的用户信息
      userMenus: [], //登录成功后获取到的用户菜单
      permissions: [], //登录成功后获取到的用户权限
    }
  },
  getters: {},
  mutations: {
    changeToken(state: ILoginState, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo // 保存用户信息
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus // 保存用户菜单
    },
  },
  actions: {
    // 1.登录的action
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      // 1.1调用登录的服务，获取登录的结果loginRequest
      const loginResult = await accountLoginRequest(payload)

      // 检查loginResult和loginResult.data是否存在
      if (!loginResult || !loginResult.data) {
        console.error('登录响应数据为空:', loginResult)
        return
      }
      // 1.2 处理登录成功后的用户信息和令牌管理
      const { id, token } = loginResult.data
      // 调用Vuex状态管理的commit方法，触发名为changeToken的mutation
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoRequest = await requestUserInfoByID(id)
      const userInfo = userInfoRequest.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusRequest = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusRequest.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
  },
}

export default loginModule
