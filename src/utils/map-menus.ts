// 导入Vue Router的路由配置类型
import type { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'

/**
 * 将用户菜单映射为Vue Router路由配置
 * @param userMenus 用户菜单数组，包含菜单的层级结构和类型信息
 * @returns 匹配用户菜单的路由配置数组
 */
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  // 定义用于存储最终匹配结果的路由数组
  const routes: RouteRecordRaw[] = []

  // 加载所有可用路由配置
  const allRoutes: RouteRecordRaw[] = []

  // 使用webpack的require.context API自动加载指定目录下的所有路由文件 创建上下文批量加载满足特定条件的模块
  // 参数1: 路由文件所在目录路径
  // 参数2: 是否递归查找子目录
  // 参数3: 匹配.ts后缀的文件
  const routeFiles = require.context('../router/main', true, /\.ts$/)

  // 遍历所有匹配的路由文件路径 routeFiles.keys()返回一个数组，包含所有匹配文件的相对路径
  routeFiles.keys().forEach((key) => {
    // 解析文件路径，获取相对于main目录的路径
    // 例如: './system/user.ts' => 'system/user.ts'
    const routePath = key.split('.')[1]

    // 动态加载路由模块
    const routeModule = require('../router/main' + routePath)

    // 将路由模块的默认导出（即路由配置）添加到allRoutes数组
    allRoutes.push(routeModule.default)
  })

  /**
   * 递归处理菜单结构，筛选出需要的路由配置
   * @param menus 当前层级的菜单数组
   */
  const _recurseGetRoute = (menus: any[]) => {
    // 遍历当前层级的所有菜单
    for (const menu of menus) {
      // 检查菜单类型：type === 2 通常表示是一个可点击的菜单项（而不是目录）
      if (menu.type === 2) {
        // 在所有可用路由中查找与当前菜单URL匹配的路由配置
        const route = allRoutes.find((route) => route.path === menu.url)

        // 如果找到匹配的路由配置
        if (route) {
          // 将该路由配置添加到结果数组中
          routes.push(route)
        } else {
          // 如果当前菜单没有直接匹配的路由，但有子菜单，则递归处理子菜单
          _recurseGetRoute(menu.children)
        }
      }
      // 注意：这里缺少对type !== 2（即目录类型）的处理，可能需要根据实际业务逻辑补充
    }
  }

  // 从顶层菜单开始递归处理
  _recurseGetRoute(userMenus)

  // 返回最终匹配的路由配置数组
  return routes
}

// 将路径转成面包屑
/**
 * 根据当前路径和用户菜单生成面包屑导航
 * @param userMenus 用户菜单数组，包含菜单的层级结构和类型信息
 * @param currentPath 当前页面的路径，用于生成对应的面包屑
 * @returns 生成的面包屑导航数组
 */
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  // 初始化面包屑数组
  const breadcrumbs: IBreadcrumb[] = []
  // 调用pathMapToMenu函数查找菜单并生成面包屑
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  // 返回生成的面包屑导航
  return breadcrumbs
}

/**
 * 根据当前路径从用户菜单中查找匹配的菜单，并可选生成面包屑导航
 * @param userMenus 用户菜单数组，包含菜单的层级结构和类型信息
 * @param currentPath 当前页面的路径，用于匹配对应的菜单
 * @param breadcrumbs 可选参数，用于存储生成的面包屑导航信息
 * @returns 匹配到的菜单对象，如果未找到则返回undefined
 */
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  // 遍历用户菜单数组中的每个菜单
  for (const menu of userMenus) {
    // 如果菜单类型为1（表示目录菜单，包含子菜单）
    if (menu.type === 1) {
      // 递归查找当前目录下的子菜单
      // 使用空数组兜底，防止menu.children为null/undefined时报错
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)

      // 如果在子菜单中找到了匹配的菜单
      if (findMenu) {
        // 将当前目录菜单名称添加到面包屑中（如果提供了breadcrumbs参数）
        breadcrumbs?.push({ name: menu.name })
        // 将找到的子菜单名称添加到面包屑中
        breadcrumbs?.push({ name: findMenu.name })
        // 返回找到的子菜单
        return findMenu
      }
    }
    // 如果菜单类型为2（表示可点击的菜单项）且菜单的URL与当前路径匹配
    else if (menu.type === 2 && menu.url === currentPath) {
      // 返回匹配到的菜单项
      return menu
    }
  }
  // 如果遍历完所有菜单都没有找到匹配项，则返回undefined
}
