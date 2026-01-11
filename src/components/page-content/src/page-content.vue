<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
      v-bind="contentTableConfig"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" @click="handleNewClick">新增用户</el-button>
      </template>
      <!-- 自定义列的内容 status对应配置文件slotName的值 -->
      <template #status="scope">
        <el-button plain :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createTime="scope">
        <span>{{ formatTime(scope.row.createTime) }}</span>
      </template>
      <template #updateTime="scope">
        <span>{{ formatTime(scope.row.updateTime) }}</span>
      </template>
      <template #operation="scope">
        <div class="operation-btns">
          <el-button type="text" @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex/types'

import { formatTime } from '@/utils/date-format'

import HyTable from '@/base-ui/table'
import store from '@/store'
import { contentTableConfig } from '@/views/main/system/user/config/content.config'

interface Props {
  // 页面名称，作为url路径使用
  pageName: string
}

const props = withDefaults(defineProps<Props>(), {
  pageName: '',
  contentTableConfig: () => ({}),
})

// 1.双向绑定pageInfo分页器信息 currentPage当前页码，pageSize每页显示条数
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

const getPageData = (queryInfo: any = {}) => {
  // 命名空间为 system 的 Action 名称，专门处理 “获取各类页面的列表数据”
  store.dispatch('system/getPageListAction', {
    // 页面名称（作为接口URL路径，比如users、goods等）
    pageName: props.pageName,
    // 查询条件（分页参数为主，可扩展其他检索条件）
    queryInfo: {
      // 偏移量：计算当前页的起始位置（后端常用分页参数）
      // 后端分页常用参数，代表 “跳过多少条数据”（比如第 2 页、每页 10 条 → offset = (2-1)*10 = 10，即跳过前 10 条，取第 11-20 条）
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      // 每页条数
      size: pageInfo.value.pageSize,
      ...queryInfo, //合并额外的查询条件
    },
  })
}

// 首次发起网络请求，获取用户信息
getPageData()

// 监听分页器当前页数或者页面显示数量有变化时，发起网络请求
watch(pageInfo, () => getPageData())

// 2.表格数据 表格数据后面可能会发生改变，使用计算属性
// 将表格数据绑定到<hy-table>组件上
const dataList = computed(() => {
  // return [
  //   { name: 'coderwhy1', enable: 1 },
  //   { name: 'coderwhy2', enable: 1 },
  // ]
  //  假设store的getters中定义了`system/pageListData`，返回列表数据
  return store.getters[`system/pageListData`](props.pageName)
})
// 总条数 表格数据后面可能会发生改变，使用计算属性
const dataCount = computed(() => {
  // return dataList.value.length
  // 假设store的getters中定义了`system/pageListCount`，返回总条数
  return store.getters[`system/pageListCount`](props.pageName)
})
// 3.单击新建用户
const emit = defineEmits<{
  (e: 'newBtnClick'): void
  (e: 'deleteBtnClick', rowData: any): void
  (e: 'editBtnClick', rowData: any): void
}>()
const handleNewClick = () => {
  emit('newBtnClick')
  console.log('新建用户')
}
// 4.单击删除用户
const handleDeleteClick = (rowData: any) => {
  emit('deleteBtnClick', rowData)
  console.log('删除用户', rowData)
}
// 5.单击编辑用户
const handleEditClick = (rowData: any) => {
  emit('editBtnClick', rowData)
  console.log('编辑用户', rowData)
}

defineExpose({ getPageData })
</script>
<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
