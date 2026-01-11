export const contentTableConfig = {
  title: '用户列表',
  // 1.表格列的配置，下面每个配置都会通过v-bind绑定el-table-column
  propList: [
    { prop: 'name', label: '用户名', minWidth: '80' },
    { prop: 'realname', label: '真实姓名', minWidth: 80 },
    { prop: 'mobile', label: '手机号', minWidth: 120 },
    { prop: 'enable', label: '状态', minWidth: 80, slotName: 'enable' },
    {
      prop: 'createTime',
      label: '创建时间',
      minWidth: 180,
      slotName: 'createTime',
    },
    {
      prop: 'updateTime',
      label: '更新时间',
      minWidth: 180,
      slotName: 'updateTime',
    },
    { prop: 'operation', label: '操作', minWidth: 120, slotName: 'operation' },
  ],
  // 是否显示行号列
  showIndexColumn: true,
  // 是否显示选择列
  showSelectColumn: true,
}
