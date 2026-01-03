<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import type { IBreadcrumb } from '@/base-ui/breadcrumb/types'

interface Props {
  breadcrumbs: IBreadcrumb[]
}

const props = withDefaults(defineProps<Props>(), {
  // 面包屑导航 breadcrumbs:[{"name":"首页","path":"/"},{"name":"列表","path":"/list"}]
  breadcrumbs: () => [],
})
</script>
