<template>
  <div class="hy-table">
    <!-- 表格头部 -->
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot></div
      ></slot>
    </div>
    <!-- 表格主体 -->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 表格列是否显示可勾选 -->
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <!-- 表格列是否显示序号 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <!-- 表格列：用户名 -->
      <!-- <el-table-column
        prop="name"
        label="用户名"
        align="center"
        width="120"
      ></el-table-column> -->
      <!-- 表格列：状态 -->
      <!-- <el-table-column
        prop="enable"
        label="状态"
        align="center"
        show-overflow-tooltip
      > -->
      <!-- e使用插槽自定义表格列 -->
      <!-- <template #default="scope"
          ><el-button>{{
            scope.row.enable ? '启用' : '禁用'
          }}</el-button></template
        >
      </el-table-column> -->

      <!-- 动态添加其他列 -->
      <template v-for="propItem in propList" :key="propItem.key">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot></template
          ></el-table-column
        >
      </template>
    </el-table>
    <!-- 表格尾部 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <!-- 表格尾部的分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="listCount"
        ></el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  listData: Array<any>
  listCount?: number
  page?: {
    currentPage: number
    pageSize: number
  }
  propList: Array<any>
  childrenProps?: any
  showIndexColumn?: boolean
  showSelectionColumn?: boolean
  showFooter?: boolean
}

// 定义属性，并且带上默认值
const props = withDefaults(defineProps<Props>(), {
  title: '',
  listData: () => [],
  listCount: 0,
  page: () => ({
    currentPage: 1,
    pageSize: 10,
  }),
  propList: () => [],
  childrenProps: () => ({}), //el-table的属性
  showIndexColumn: true,
  showSelectionColumn: false, //是否显示勾选列
  showFooter: true,
})

// 定义输入框的输入事件
const emit = defineEmits<{
  (e: 'selectionChange', value: any): void
  (e: 'update:page', value: any): void
}>()

// 处理表格每一行勾选状态的变化——el-table的selection-change事件
const handleSelectionChange = (val: any) => {
  emit('selectionChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('update:page', {
    ...props.page,
    currentPage: val,
  })
}
const handleSizeChange = (val: number) => {
  emit('update:page', {
    ...props.page,
    pageSize: val,
  })
}

// 对外暴露的方法
defineExpose({ handleSelectionChange, handleCurrentChange, handleSizeChange })
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;

  .el-pagination {
    text-align: right;
  }
}
</style>
