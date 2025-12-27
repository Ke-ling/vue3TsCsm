<template>
  <div class="login-account">
    <el-form label-width="60px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import localCache from '@/utils/cache'
import type { ElForm } from 'element-plus'
import { rules } from '../config/account-config'

const store = useStore()

// 定义响应式数据
const account = reactive({
  name: '',
  password: '',
})

// 获取form组件对象，其中InstanceType<typeof ElForm>用于声明form实例类型
const formRef = ref<InstanceType<typeof ElForm>>()

// 提交表单和表单验证
const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // console.log('执行登录逻辑')
      // 判断是否需要记住密码
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
    }

    // 2.进行登录验证
    store.dispatch('login/accountLoginAction', { ...account })
  })
}

const setFormField = (name: string, password: string) => {
  account.name = name || account.name
  account.password = password || account.password
}

// 将组件暴露出去
// eslint-disable-next-line no-undef
defineExpose({
  loginAction,
  setFormField,
})
</script>
