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

// 模拟登录响应数据
const mockLoginResponse: IDataType<ILoginResult> = {
  code: 200,
  data: {
    id: 1,
    name: 'coderwhy',
    token: 'mock-token-123456',
  },
}

// 模拟用户信息响应数据
const mockUserInfoResponse: IDataType = {
  code: 200,
  data: {
    id: 1,
    name: 'coderwhy',
    role: {
      id: 1,
      name: 'admin',
      description: '系统管理员',
    },
    avatar: '',
    phone: '13800138000',
    email: 'admin@example.com',
  },
}

// 模拟用户菜单响应数据
const mockUserMenusResponse: IDataType = {
  code: 200,
  data: [
    {
      id: 38,
      name: '系统总览',
      type: 1,
      url: '/main/analysis',
      icon: 'el-icon-monitor',
      sort: 1,
      children: [
        {
          id: 39,
          url: '/main/analysis/overview',
          icon: 'el-icon-server',
          name: '核心技术',
          sort: 106,
          type: 2,
          children: null,
          parentId: 38,
        },
        {
          id: 40,
          url: '/main/analysis/dashboard',
          icon: 'el-icon-data-analysis',
          name: '商品统计',
          sort: 107,
          type: 2,
          children: null,
          parentId: 38,
        },
      ],
    },
    {
      id: 41,
      name: '系统管理',
      type: 1,
      url: '/main/system',
      icon: 'el-icon-setting',
      sort: 2,
      children: [
        {
          id: 42,
          name: '用户管理',
          type: 2,
          url: '/main/system/user',
          icon: 'el-icon-user',
          sort: 108,
          children: null,
          parentId: 41,
        },
        {
          id: 43,
          name: '角色管理',
          type: 2,
          url: '/main/system/role',
          icon: 'el-icon-role',
          sort: 108,
          children: null,
          parentId: 41,
        },
        {
          id: 44,
          name: '部门管理',
          type: 2,
          url: '/main/system/department',
          icon: 'el-icon-department',
          sort: 109,
          children: null,
          parentId: 41,
        },
        {
          id: 45,
          name: '菜单管理',
          type: 2,
          url: '/main/system/menu',
          icon: 'el-icon-menu',
          sort: 109,
          children: null,
          parentId: 41,
        },
      ],
    },
  ],
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
  // 检查是否使用模拟数据（可以通过环境变量或配置控制）
  const USE_MOCK_DATA = true // 这里可以改为从环境变量获取

  if (USE_MOCK_DATA) {
    // 使用模拟数据
    return new Promise<IDataType>((resolve, reject) => {
      setTimeout(() => {
        if (account.name === 'coderwhy' && account.password === '123456') {
          console.log('登录成功 - 返回模拟数据:', mockLoginResponse)
          resolve(mockLoginResponse)
        } else {
          reject({
            code: 401,
            message: '账号或密码错误',
          })
        }
      }, 500)
    })
  } else {
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
}

/**
 * 根据用户ID请求用户信息
 * 向服务器发送获取用户信息的请求并返回用户数据
 * @param id 用户ID，用于指定要查询的用户
 * @returns Promise<IDataType> - 包含用户信息的数据对象
 *          成功时返回包含用户详细信息的对象
 */
export function requestUserInfoByID(
  id: number
): Promise<IDataType<ILoginResult>> {
  const USE_MOCK_DATA = true // 这里可以改为从环境变量获取

  if (USE_MOCK_DATA) {
    // 使用模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('获取用户信息 - 返回模拟数据:', mockUserInfoResponse)
        resolve(mockUserInfoResponse)
      }, 300)
    })
  } else {
    // 调用封装的hyRequest实例的get方法发送用户信息请求
    // 指定泛型IDataType以获得类型安全的返回值
    // showLoading: false 表示不显示加载动画，避免不必要的UI干扰
    return hyRequest.get<IDataType>({
      url: LoginAPI.LoginUserInfo + '/' + id, //拼接用户信息请求URL，添加斜杠分隔符
      showLoading: false, //禁用加载动画显示
    })
  }
}

/**
 * 根据角色ID请求用户菜单权限
 * 向服务器发送获取用户菜单的请求并返回菜单数据
 * @param id 角色ID，用于指定要查询的角色对应的菜单权限
 * @returns Promise<IDataType> - 包含用户菜单权限的数据对象
 *          成功时返回包含菜单树结构和权限信息的对象
 */
export function requestUserMenusByRoleId(id: number): Promise<IDataType> {
  const USE_MOCK_DATA = true // 这里可以改为从环境变量获取

  if (USE_MOCK_DATA) {
    // 使用模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('获取用户菜单 - 返回模拟数据:', mockUserMenusResponse)
        resolve(mockUserMenusResponse)
      }, 400)
    })
  } else {
    // 调用封装的hyRequest实例的get方法发送用户菜单请求
    // 指定泛型IDataType以获得类型安全的返回值
    // 注意：URL拼接中存在重复的斜杠，可能需要根据实际API规范调整
    return hyRequest.get<IDataType>({
      url: LoginAPI.UserMenus + '/' + id + '/menu', //拼接用户菜单请求URL，添加斜杠分隔符
      showLoading: false, //禁用加载动画显示
    })
  }
}
