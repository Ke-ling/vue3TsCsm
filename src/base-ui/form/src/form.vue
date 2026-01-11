<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :model-value="modelValue[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  ></el-select
                >
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts" setup>
import { IFormItem } from '../types'

interface Props {
  modelValue: any
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
  formItems: IFormItem[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}), //接收formData对象，实现数据的双向绑定
  labelWidth: '100px', //标签名的宽度
  colLayout: () => ({ Xl: 6, lg: 8, md: 12, sm: 24, xs: 24 }), //每一行的布局
  itemStyle: () => ({ padding: '10px 40px' }),
  formItems: () => [], //表单项配置数组
})

const emit = defineEmits<{ (e: 'update:modelValue', newFormData: any): void }>()
/**
 * 处理表单字段值变更事件
 * @param value 变更后的字段值
 * @param field 字段名
 */
const handleValueChange = (value: any, fields: string) => {
  const finalValue = typeof value === 'string' ? value.trim() : value
  emit('update:modelValue', { ...props.modelValue, [fields]: finalValue })
  console.log({ 'props.modelValue': props, fields: fields })
}

defineExpose({ handleValueChange })
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
