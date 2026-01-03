<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 1.控制菜单的宽度 -->
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <!-- 2.头部栏 -->
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <!-- 子路由占位 -->
          <div class="page-info"><router-view /></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavMenu from '@/components/nav-menu/src/nav-menu.vue'
import NavHeader from '@/components/nav-header/src/nav-header.vue'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);
  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  color: #fff;
  transition: width 0.3s linear;
  scrollbar-width: none; /* Firefox浏览器中隐藏滚动条 */
  -ms-overflow-style: none; /* IE 10+浏览器中隐藏滚动条 */

  &::-webkit-scrollbar {
    /* WebKit内核浏览器（Chrome、Safari等）的滚动条选择器 */
    display: none; /* 隐藏滚动条 */
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
