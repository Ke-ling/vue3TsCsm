<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" alt="Logo" class="img" />
      <!-- 折叠时隐藏标题 -->
      <span v-if="!collapse" class="title"> 后台管理系统 {{ collapse }}</span>
    </div>
    <!-- 菜单导航 -->
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#bfcbd9"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <!-- <el-icon> <Setting> 是固定写法 -->
                <!-- <el-icon><component :is="'Setting'"></component> 是动态写法 -->
                <!-- <component :is="'Setting'"></component> -->
                <component :is="formatIcon(item)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单的具体选项
          <el-menu-item :index="'39'"><span>核心技术</span></el-menu-item>
          <el-menu-item :index="'40'"><span>商品统计</span></el-menu-item>
          <el-menu-item :index="'41'"
            ><el-icon><ChatDotRound></ChatDotRound></el-icon
            ><span>核心技术</span></el-menu-item
          > -->
            <!-- 遍历里面的二级菜单item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <el-icon v-if="subitem.icon"
                  ><component :is="formatIcon(subitem)"></component
                ></el-icon>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <el-icon v-if="item.icon">
              <component :is="formatIcon(item)"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ChatDotRound } from '@element-plus/icons-vue/dist/types'
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { IStoreType } from '@/store/types'
import { useRouter } from 'vue-router'

interface Props {
  collapse: boolean
}

//1. 定义属性，并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  collapse: true, //菜单默认展开
})

// 2.获取登录后的用户菜单
const store = useStore<IStoreType>()
const userMenus = computed(() => store.state.login.userMenus)

// 3.格式化icon，返回el-icon-setting，我们只需要返回Setting
const formatIcon = computed(() => {
  return (item: any) => {
    return item.icon.replace('el-icon-', '')
  }
})

// 4.处理菜单的单击事件
const router = useRouter()
const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found',
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      // padding-left: 50px !important;
      // padding-left: 50px;
      padding-left: calc(var(--el-menu-base-level-padding) * 2) !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
