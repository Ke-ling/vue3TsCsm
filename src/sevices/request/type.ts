import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
// 1.定义拦截器的类型, T 是响应res.data的类型
export interface HYRequestInterceptors<T = any> {
  requestInterceptors?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (err: any) => any
  responseInterceptors?: (
    res: AxiosResponse<T>
  ) => AxiosResponse<T> | Promise<AxiosResponse<T>>
  responseInterceptorsCatch?: (err: any) => any
}

export interface HYRequestConfig<T = any> extends AxiosRequestConfig {
  // 2.这里可以扩展自己的类型
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
