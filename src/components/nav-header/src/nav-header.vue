<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <component :is="isFold ? 'expand' : 'fold'"></component>
    </el-icon>
    <div class="content">
      <!-- <div>bread</div> -->
      <hy-breadcrumb :breadcrumbs="breadcrumbs"></hy-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import UserInfo from '@/components/nav-header/src/user-info.vue'
import HyBreadcrumb from '@/base-ui/breadcrumb/src/breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import type { IStoreType } from '@/store/types'

const store = useStore<IStoreType>()
const route = useRoute()

const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})

//1.定义一个isFold状态，用于控制菜单是否折叠
const isFold = ref(false)

// 2.注册需要触发的emit事件
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

// 3.对外暴露俩个属性
defineExpose({
  isFold,
  handleFoldClick,
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
