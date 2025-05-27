<template>
  <form
    class="zx-form"
    :class="[
      labelPosition ? `zx-form--label-${labelPosition}` : '',
      { 'zx-form--inline': inline },
      { [`zx-form--${size}`]: size },
    ]"
    :disabled="disabled"
    :report-submit="reportSubmit"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <slot></slot>
  </form>
</template>

<script setup>
import { getCurrentInstance, ref, provide, reactive, computed, toRefs } from "vue";

const { proxy } = getCurrentInstance();

const props = defineProps({
  // 表单数据对象
  model: {
    type: Object,
  },
  // 表单验证规则
  rules: {
    type: Object,
  },
  // 表单项标签的宽度
  labelWidth: {
    type: [String, Number],
    default: "100rpx",
  },
  // 表单项标签的位置，可选值：right/left/top
  labelPosition: {
    type: String,
    default: "left",
  },
  // 是否禁用该表单内的所有组件
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否开启行内表单模式
  inline: {
    type: Boolean,
    default: false,
  },
  // 用于控制该表单内组件的尺寸
  size: {
    type: String,
    values: ["large", "default", "small"],
    default: "default",
  },
  // 表单验证触发方式
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  // 是否在提交表单时自动获取formId
  reportSubmit: {
    type: Boolean,
    default: false,
  },
  // 是否隐藏所有表单项的错误提示
  hideRequiredAsterisk: {
    type: Boolean,
    default: false,
  },
  // 当校验失败时，是否滚动到第一个错误表单项
  scrollToError: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "reset", "validate"]);

// 收集表单项组件实例
const fields = reactive([]);

// 注册表单项
function registerField(field) {
  if (field) {
    fields.push(field);
  }
}

// 移除表单项
function unregisterField(field) {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
}

// 验证整个表单
async function validate(callback) {
  if (!props.model) {
    console.warn("[zx-form] model is required for validate to work!");
    return Promise.reject("表单验证需要 model 属性");
  }

  let valid = true;
  let count = 0;
  let invalidFields = {};

  const fieldsLength = fields.length;
  if (fieldsLength === 0 && callback) {
    callback(true);
  }

  let promise;
  if (callback) {
    promise = null;
  } else {
    promise = new Promise((resolve, reject) => {
      callback = function (isValid, invalidFields) {
        if (isValid) {
          resolve(true);
        } else {
          reject(invalidFields);
        }
      };
    });
  }

  // 验证所有表单项
  fields.forEach((field) => {
    field.validate("", (message, field) => {
      if (message) {
        valid = false;
        invalidFields[field.prop] = message;
      }

      if (++count === fieldsLength) {
        callback(valid, invalidFields);
      }
    });
  });

  return promise;
}

// 验证部分表单项
function validateField(fieldProps, callback) {
  if (!props.model) {
    console.warn("[zx-form] model is required for validateField to work!");
    return;
  }

  const propsArr = [].concat(fieldProps);
  const validateFields = fields.filter((field) => propsArr.indexOf(field.prop) !== -1);

  validateFields.forEach((field) => {
    field.validate("", callback);
  });
}

// 重置表单
function resetFields() {
  if (!props.model) {
    console.warn("[zx-form] model is required for resetFields to work!");
    return;
  }

  fields.forEach((field) => {
    field.resetField();
  });
}

// 清除表单验证
function clearValidate(props = []) {
  const propsArr = [].concat(props);
  const fieldsToValidate = props.length
    ? fields.filter((field) => propsArr.indexOf(field.prop) > -1)
    : fields;

  fieldsToValidate.forEach((field) => {
    field.clearValidate();
  });
}

// 提交表单
function handleSubmit(e) {
  if (props.model) {
    validate((valid, invalidFields) => {
      emit("submit", {
        detail: {
          value: props.model,
          valid,
          invalidFields,
        },
      });
    });
  } else {
    emit("submit", e);
  }
  return false;
}

// 重置表单
function handleReset(e) {
  resetFields();
  emit("reset", e);
  return false;
}

// 提供表单上下文给子组件
provide("zxForm", {
  ...toRefs(props),
  registerField,
  unregisterField,
  resetFields,
  clearValidate,
  validateField,
  validate,
});

// 暴露方法给父组件
defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  fields,
});
</script>

<style lang="scss" scoped>
.zx-form {
  font-size: 28rpx;
}
.zx-form--inline {
  display: flex;
  flex-wrap: wrap;
}
.zx-form--label-left .label {
  text-align: left;
}
.zx-form--label-right .label {
  text-align: right;
}
.zx-form--label-top .label {
  padding: 0 0 10rpx 0;
}
.zx-form--label-top .zx-form-item {
  flex-direction: column;
}
.zx-form--large {
  font-size: 32rpx;
}
.zx-form--small {
  font-size: 24rpx;
}
</style>
