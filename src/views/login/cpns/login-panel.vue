<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 标签页组件type用于指定标签页的风格类型，可选值有border-card、border-card-top
 、border-card-bottom、border-card-left、border-card-right -->
      <el-tab-pane name="account">
        <!-- 选项卡组件 -->
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon>账号登录
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
        <!-- todo add login form 1 -->
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span
            ><el-icon><Iphone /></el-icon>手机登录</span
          >
        </template>
        <!-- todo add login form 2 -->
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <!-- 表单输入组件 -->
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <!-- 链接组件 -->
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import localCache from '@/utils/cache'
import LoginAccount from './login-account.vue'

// 获取组件对象
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const isKeepPassword = ref(true)
const currentTab = ref('account')

onMounted(() => {
  // 回显用户名和密码
  const name = localCache.getCache('name') || 'coderwhy' || 'dxy'
  const password = localCache.getCache('password') || '123456'
  accountRef.value?.setFormField(name, password)
})
const handleLoginClick = () => {
  // console.log(isKeepPassword.value, '点击登录')
  // accountRef.value?.loginAction()
  // 1.账号登录方式
  if (currentTab.value === 'account') {
    // 是否记住密码，传递给loginAction方法
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    // 2.手机登录方式
  }
}
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
