import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'

// 引入loading组件
import 'element-plus/es/components/loading/style.css'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true

class HYRequest<T = any> {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors //指定拦截器的类型
  showLoading?: boolean //定义是否显示loading
  loading?: any // loading的组件实例

  constructor(config: HYRequestConfig<T>) {
    this.instance = axios.create(config)
    //默认是否显示加载进度
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    //从config里面取出对应的实例的拦截器
    this.interceptors = config.interceptors

    // 先添加全局拦截器（loading控制）
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求拦截器', config)
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0, 0, 0, 0.2)',
            fullscreen: true,
          })
        }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )

    // 再添加实例特定的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )

    // 响应拦截器：先添加实例特定的，再添加全局的
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 关闭loading
        this.loading?.close()
        return res
      },
      (err) => {
        // 关闭loading
        this.loading?.close()
        if (err.response?.status === 404) {
          // 处理404错误
          console.log('资源不存在')
        }
        return Promise.reject(err)
      }
    )
  }

  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 保存当前的showLoading状态
      const originalShowLoading = this.showLoading

      // 判断某个请求是否需要显示loading
      if (config.showLoading !== undefined) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<T, T>(config)
        .then((res) =>
          // 3.将结果resolve返回出去
          resolve(res)
        )
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          // 恢复原来的showLoading状态
          this.showLoading = originalShowLoading
        })
    })
  }

  /**
   * 发起 GET 请求
   * @template T - 响应数据的类型，默认为 any
   * @param {HYRequestConfig<T>} config - 请求配置对象
   * @returns {Promise<T>} - 返回 Promise 对象，解析后的值为类型 T 的数据
   *
   */
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET',
    })
  }

  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'POST',
    })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE',
    })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH',
    })
  }
}

export default HYRequest
