import hyRequest from '../index'
import type { IAccount, ILoginResult } from './type'
import type { IDataType } from '../type'
import { authService } from '@/plugins/supabase'

enum LoginAPI {
  //登录的接口，默认会加上BASE_URL作为前缀
  // AccountLogin = './login',
  AccountLogin = '/login',
  LoginUserInfo = '/users', //users/id
  UserMenus = '/role', //role/id/menu
}

/**
 * 账号登录请求函数
 * 向服务器发送登录请求并返回登录结果
 * @param account 用户账号信息对象
 * @param account.name 用户名
 * @param account.password 密码
 * @returns Promise<IDataType<ILoginResult>> - 包含登录结果的数据对象
 *          成功时返回包含用户id、用户名和token的对象
 */
export function accountLoginRequest(account: IAccount) {
  // 调用封装的hyRequest实例的post方法发送登录请求
  // 指定泛型IDataType<ILoginResult>以获得类型安全的返回值
  return hyRequest
    .post<IDataType<ILoginResult>>({
      url: LoginAPI.AccountLogin,
      data: account, //用户名和密码
    })
    .then((response) => {
      // 添加调试日志
      console.log('登录响应数据:', response)
      return response
    })
    .catch((error) => {
      // 添加错误日志
      console.error('登录请求失败:', error)
      throw error
    })
}

/**
 * 根据用户ID请求用户信息
 * 向服务器发送获取用户信息的请求并返回用户数据
 * @param id 用户ID，用于指定要查询的用户
 * @returns Promise<IDataType> - 包含用户信息的数据对象
 *          成功时返回包含用户详细信息的对象
 */
export function requestUserInfoByID(id: number) {
  // 调用封装的hyRequest实例的get方法发送用户信息请求
  // 指定泛型IDataType以获得类型安全的返回值
  // showLoading: false 表示不显示加载动画，避免不必要的UI干扰
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + '/' + id, //拼接用户信息请求URL，添加斜杠分隔符
    showLoading: false, //禁用加载动画显示
  })
}

/**
 * 根据角色ID请求用户菜单权限
 * 向服务器发送获取用户菜单的请求并返回菜单数据
 * @param id 角色ID，用于指定要查询的角色对应的菜单权限
 * @returns Promise<IDataType> - 包含用户菜单权限的数据对象
 *          成功时返回包含菜单树结构和权限信息的对象
 */
export function requestUserMenusByRoleId(id: number) {
  // 调用封装的hyRequest实例的get方法发送用户菜单请求
  // 指定泛型IDataType以获得类型安全的返回值
  // 注意：URL拼接中存在重复的斜杠，可能需要根据实际API规范调整
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + '/' + id + '/menu', //拼接用户菜单请求URL，添加斜杠分隔符
    showLoading: false, //禁用加载动画显示
  })
}
