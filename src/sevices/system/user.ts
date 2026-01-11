import hyRequest from '../index'
import type { IDataType } from '../type'
import type { IUser, IUserListQuery, IUserListData } from './type'

enum UserAPI {
  UserList = '/users/list',
  CreateUser = '/users',
  UpdateUser = '/users',
  DeleteUser = '/users',
  BatchDeleteUser = '/users/batch',
}

// 模拟用户列表数据
const mockUserListResponse: IDataType<IUserListData> = {
  code: 200,
  data: {
    list: [
      {
        id: 1,
        name: 'admin',
        phone: '13800138000',
        email: 'admin@example.com',
        avatar: '',
        role: {
          id: 1,
          name: 'admin',
          description: '系统管理员',
        },
        createTime: '2023-01-01 00:00:00',
        updateTime: '2023-01-01 00:00:00',
      },
      {
        id: 2,
        name: 'user1',
        phone: '13800138001',
        email: 'user1@example.com',
        avatar: '',
        role: {
          id: 2,
          name: 'user',
          description: '普通用户',
        },
        createTime: '2023-01-02 00:00:00',
        updateTime: '2023-01-02 00:00:00',
      },
      {
        id: 3,
        name: 'user2',
        phone: '13800138002',
        email: 'user2@example.com',
        avatar: '',
        role: {
          id: 2,
          name: 'user',
          description: '普通用户',
        },
        createTime: '2023-01-03 00:00:00',
        updateTime: '2023-01-03 00:00:00',
      },
    ],
    total: 3,
  },
}

/**
 * 获取用户列表
 * @param query 查询参数
 * @returns Promise<IDataType<IUserListData>>
 */
export function requestUserList(
  query: IUserListQuery
): Promise<IDataType<IUserListData>> {
  const USE_MOCK_DATA = true // 可以改为从环境变量获取

  if (USE_MOCK_DATA) {
    // 使用模拟数据
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('获取用户列表 - 返回模拟数据:', mockUserListResponse)
        resolve(mockUserListResponse)
      }, 300)
    })
  } else {
    // 调用真实API
    return hyRequest.get<IDataType<IUserListData>>({
      url: UserAPI.UserList,
      params: query,
      showLoading: false,
    })
  }
}

/**
 * 创建用户
 * @param user 用户信息
 * @returns Promise<IDataType>
 */
export function createUser(user: Partial<IUser>): Promise<IDataType> {
  return hyRequest.post<IDataType>({
    url: UserAPI.CreateUser,
    data: user,
  })
}

/**
 * 更新用户
 * @param id 用户ID
 * @param user 用户信息
 * @returns Promise<IDataType>
 */
export function updateUser(
  id: number,
  user: Partial<IUser>
): Promise<IDataType> {
  return hyRequest.patch<IDataType>({
    url: `${UserAPI.UpdateUser}/${id}`,
    data: user,
  })
}

/**
 * 删除用户
 * @param id 用户ID
 * @returns Promise<IDataType>
 */
export function deleteUser(id: number): Promise<IDataType> {
  return hyRequest.delete<IDataType>({
    url: `${UserAPI.DeleteUser}/${id}`,
  })
}

/**
 * 批量删除用户
 * @param ids 用户ID数组
 * @returns Promise<IDataType>
 */
export function batchDeleteUser(ids: number[]): Promise<IDataType> {
  return hyRequest.delete<IDataType>({
    url: UserAPI.BatchDeleteUser,
    data: ids,
  })
}
