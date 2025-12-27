//本地缓存工具类 ，对window.localStorage进行封装
class LocalCache {
  // 将value转化为JSON String，再存储到localStorage
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value && value !== 'undefined' && value !== 'null') {
      try {
        return JSON.parse(value)
      } catch (error) {
        console.error(`解析缓存数据失败: ${key}`, error)
        return null
      }
    }
    return null
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
