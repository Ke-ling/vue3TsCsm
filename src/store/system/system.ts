import { Module } from 'vuex/types'
import { IRootState } from '@/store/types'
import { ISystemState } from './type'
import { getPageListData } from '@/sevices/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  // 函数形式的state，返回ISystemState类型
  state: (): ISystemState => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    }
  },
  mutations: {
    // 用户相关mutations
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    // 角色相关mutations
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    // 商品相关mutations
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    // 菜单相关mutations
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
  },
  getters: {
    pageListData(state) {
      // 在 Vuex 中，getter 默认只接收 state 作为参数，如果需要接收额外参数，应该让 getter 返回一个函数
      // return (state as any)[`${pageName}List`]
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      // return (state as any)[`${pageName}Count`]
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl users/list
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 2.向页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储在state中 当 API 响应的 data 属性为 undefined 时，直接解构 list 和 totalCount 会导致错误
      // const { list, totalCount } = pageResult.data
      const data = pageResult.data || {}
      const { list = [], totalCount = 0 } = data

      // 4.将pageName改为首字母大写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      // changeUsersList changeRolesList
      // 不用给每个页面（users/roles/goods）写commit语句，一个语句适配多页面 Mutation触发
      // commit提交的函数名称必须和mutations中的函数名称一致
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
  },
}

export default systemModule
