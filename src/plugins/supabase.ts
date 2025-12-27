import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

// 从环境变量获取配置
const supabaseUrl = process.env.VUE_APP_SUPABASE_URL as string
const supabaseKey = process.env.VUE_APP_SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '请配置 VUE_APP_SUPABASE_URL 和 VUE_APP_SUPABASE_KEY 环境变量'
  )
}

// 初始化 Supabase 客户端
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// 认证相关工具函数
export const authService = {
  // 邮箱密码登录
  signInWithEmail: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),

  // 手机号登录（发送验证码）
  signInWithPhone: (phone: string) =>
    supabase.auth.signInWithOtp({
      phone,
      options: { channel: 'sms' },
    }),

  // 验证手机验证码
  verifyPhoneOtp: (phone: string, token: string) =>
    supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    }),

  // 注册
  signUp: (email: string, password: string, phone?: string) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: { phone },
      },
    }),

  // 退出登录
  signOut: () => supabase.auth.signOut(),

  // 获取当前用户
  getCurrentUser: () => supabase.auth.getUser(),

  // 监听认证状态变化
  onAuthStateChange: (
    callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]
  ) => supabase.auth.onAuthStateChange(callback),
}

export default supabase
