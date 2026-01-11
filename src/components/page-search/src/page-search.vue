<template>
  <div class="page-search">
    <hy-form v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import HyForm from '@/base-ui/form'
import { searchFormConfig } from '@/views/main/system/user/config/search.config'

interface Props {
  searchFormConfig: any
}
const props = withDefaults(defineProps<Props>(), {
  searchFormConfig: () => ({}),
})

const emit = defineEmits<{
  (e: 'resetBtnClick'): void
  (e: 'queryBtnClick', newFormData: any): void
}>()

// 1. formData表单中的属性
const formItems = props.searchFormConfig.formItems ?? []
const formOriginData: any = {
  // name: null,
  // enable: null,
}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 用户单击重置按钮
const handleResetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}

// 用户单击查询按钮
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
defineExpose({ handleResetClick, handleQueryClick })
</script>
<style scoped>
.header {
  color: red;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
