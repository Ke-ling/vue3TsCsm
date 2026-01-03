<template>
  <div class="hy-form">
    <!-- 头部提供插槽 -->
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 表单区域 -->
    <el-form :label-width="labelWidth">
      <el-row>
        <el-col v-bind="colLayout">
          <el-form-item label="用户名">
            <!--  @update:modelValue 双向绑定的标准事件名，用于监听组件内部 modelValue 的变更 -->
            <el-input
              :model-value="modelValue.name"
              placeholder="请输入用户名"
              @update:modelValue="handleValueChange($event, 'name')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-bind="colLayout">
          <el-form-item label="状态">
            <el-select
              :model-value="modelValue.enable"
              placeholder="选择状态"
              @update:modelValue="handleValueChange($event, 'enable')"
            >
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: any
  labelWidth?: string
  colLayout?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}), //接收formData对象，实现数据的双向绑定
  labelWidth: '100px', //标签名的宽度
  colLayout: () => ({ Xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }), //每一行的布局
})

// 定义并类型约束自定义组件要触发的事件
const emit = defineEmits<{
  (e: 'update:modelValue', newFormData: any): void
}>()

/**
 * 处理表单字段值变更事件
 * @param value 变更后的字段值
 * @param fields 变更的字段名
 * ...props.modelValue 展开运算符，将当前的 modelValue 对象展开，确保其他未变更的字段保持不变
 */
const handleValueChange = (value: any, fields: string) => {
  const finalValue = typeof value === 'string' ? value.trim() : value
  emit('update:modelValue', { ...props.modelValue, [fields]: finalValue })
}

defineExpose({ handleValueChange })
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
