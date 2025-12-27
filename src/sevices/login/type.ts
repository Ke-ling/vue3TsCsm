export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
  [key: string]: any // 添加索引签名，允许动态访问属性
}
