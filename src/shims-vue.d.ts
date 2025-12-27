/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

/// <reference types="vite/client" />

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Vue 3 Composition API compiler macros
declare global {
  const defineExpose: (exposed: Record<string, any>) => void
  const defineProps: <T extends Record<string, any>>() => T
  const defineEmits: <T extends Record<string, any>>() => (
    event: keyof T,
    ...args: any[]
  ) => void
  const withDefaults: <T, D extends Record<string, any>>(
    props: T,
    defaults: D
  ) => T & D
}

// Vue Router type declarations
declare module 'vue-router' {
  import type { App } from 'vue'

  interface RouteRecordRaw {
    path: string
    name?: string
    redirect?: string | Location
    component?: any
    children?: RouteRecordRaw[]
    props?: any
  }

  interface Router {
    push(location: any): Promise<void>
    replace(location: any): Promise<void>
    go(delta: number): void
    back(): void
    forward(): void
    install(app: App): void
  }

  export function createRouter(options: any): Router
  export function createWebHistory(base?: string): any
  export type RouteRecordRaw = RouteRecordRaw
}

// Vuex type declarations
declare module 'vuex' {
  import type { App } from 'vue'

  interface Store<S = any> {
    state: S
    getters: any
    commit(type: string, payload?: any): void
    dispatch(type: string, payload?: any): Promise<any>
    install(app: App): void
  }

  export function createStore<S>(options: any): Store<S>
}
