<template>
  <div class="user">
    <h2>用户管理</h2>

    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <!-- pagename是页面名称 作为url路径使用 -->
    <page-content
      ref="pageContentRef"
      page-name="users"
      @new-btn-click="handleNewData"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

// 先提取组件类型，再从提取好的pageContent组件类型中实例约束 组件引用，再将对象响应化
const pageContentRef = ref<InstanceType<typeof PageContent>>()

const handleResetClick = () => {
  pageContentRef.value?.getPageData()
  console.log('重置按钮被点击了')
}
const handleQueryClick = (newFormData: any) => {
  pageContentRef.value?.getPageData(newFormData)
  console.log('查询按钮被点击了', newFormData)
}

const handleNewData = () => {
  console.log('新建用户')
}
</script>

<style scoped lang="less"></style>
