// 用户列表查询参数
export interface IUserListQuery {
  name?: string
  phone?: string
  email?: string
  page: number
  size: number
}

// 用户信息接口
export interface IUser {
  id: number
  name: string
  phone?: string
  email?: string
  avatar?: string
  role: {
    id: number
    name: string
    description: string
  }
  createTime: string
  updateTime: string
}

// 用户列表响应数据
export interface IUserListData {
  list: IUser[]
  total: number
}
