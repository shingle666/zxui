<template>
  <view class="container">
    <view class="header">
      <text class="title">Invoice 发票</text>
      <text class="description">展示申请发票页面，支持多种表单项类型和验证</text>
    </view>
    
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="section-description">最简单的发票表单，包含发票类型选择和基本信息填写</view>
      <zx-invoice
        :data="basicData"
        v-model:form-value="basicForm"
        :rules="basicRules"
        @submit="handleBasicSubmit"
      />
    </view>
    
    <view class="demo-section">
      <view class="section-title">完整发票信息</view>
      <view class="section-description">包含完整的发票信息表单，支持个人和企业发票</view>
      <zx-invoice
        ref="fullInvoiceRef"
        :data="fullData"
        v-model:form-value="fullForm"
        :rules="fullRules"
        :submit-loading="fullSubmitLoading"
        submit-text="提交发票申请"
        @submit="handleFullSubmit"
        @change="handleFormChange"
      />
    </view>
    
    <view class="demo-section">
      <view class="section-title">自定义提交按钮</view>
      <view class="section-description">隐藏默认提交按钮，使用自定义按钮和验证</view>
      <zx-invoice
        ref="customInvoiceRef"
        :data="customData"
        v-model:form-value="customForm"
        :rules="customRules"
        :submit="false"
        @validate="handleCustomValidate"
      />
      
      <view class="custom-actions">
        <zx-button @click="handleReset">重置表单</zx-button>
        <zx-button type="primary" @click="handleCustomSubmit" :loading="customSubmitLoading">
          自定义提交
        </zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">动态表单</view>
      <view class="section-description">根据发票类型动态显示不同的表单项</view>
      <view class="type-selector">
        <zx-button 
          :type="dynamicType === 'personal' ? 'primary' : 'default'"
          @click="switchDynamicType('personal')"
        >
          个人发票
        </zx-button>
        <zx-button 
          :type="dynamicType === 'company' ? 'primary' : 'default'"
          @click="switchDynamicType('company')"
        >
          企业发票
        </zx-button>
      </view>
      <zx-invoice
        :data="dynamicData"
        v-model:form-value="dynamicForm"
        :rules="dynamicRules"
        submit-text="提交动态表单"
        @submit="handleDynamicSubmit"
      />
    </view>
    
    <view class="demo-section">
      <view class="section-title">表单验证示例</view>
      <view class="section-description">展示各种验证规则的使用</view>
      <zx-invoice
        :data="validateData"
        v-model:form-value="validateForm"
        :rules="validateRules"
        submit-text="验证并提交"
        @submit="handleValidateSubmit"
      />
    </view>
    
    <!-- 底部间距 -->
    <view class="bottom-space"></view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 基础用法
const basicForm = ref({
  type: '',
  title: ''
})

const basicData = ref([
  {
    type: 'radio',
    label: '发票类型',
    formItemProp: 'type',
    required: true,
    radioLabel: [
      { label: '个人', value: '1' },
      { label: '企业', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '发票抬头',
    placeholder: '请输入发票抬头',
    formItemProp: 'title',
    required: true
  }
])

const basicRules = ref({
  type: [{ required: true, message: '请选择发票类型' }],
  title: [{ required: true, message: '请输入发票抬头' }]
})

const handleBasicSubmit = (result) => {
  if (result.valid) {
    uni.showToast({
      title: '基础表单提交成功',
      icon: 'success'
    })
    console.log('基础表单提交成功', result.values)
  } else {
    uni.showToast({
      title: '请检查表单信息',
      icon: 'none'
    })
  }
}

// 完整发票信息
const fullInvoiceRef = ref(null)
const fullSubmitLoading = ref(false)
const fullForm = ref({
  type: '',
  title: '',
  taxNumber: '',
  address: '',
  phone: '',
  bankName: '',
  bankAccount: '',
  email: '',
  remark: ''
})

const fullData = ref([
  {
    type: 'radio',
    label: '发票类型',
    formItemProp: 'type',
    required: true,
    radioLabel: [
      { label: '个人', value: '1' },
      { label: '企业', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '发票抬头',
    placeholder: '请输入发票抬头',
    formItemProp: 'title',
    required: true,
    maxlength: 50
  },
  {
    type: 'input',
    label: '纳税人识别号',
    placeholder: '请输入纳税人识别号',
    formItemProp: 'taxNumber',
    required: true,
    maxlength: 20
  },
  {
    type: 'input',
    label: '注册地址',
    placeholder: '请输入注册地址',
    formItemProp: 'address',
    maxlength: 100
  },
  {
    type: 'input',
    label: '注册电话',
    placeholder: '请输入注册电话',
    formItemProp: 'phone',
    inputType: 'number',
    maxlength: 11
  },
  {
    type: 'input',
    label: '开户银行',
    placeholder: '请输入开户银行',
    formItemProp: 'bankName',
    maxlength: 50
  },
  {
    type: 'input',
    label: '银行账户',
    placeholder: '请输入银行账户',
    formItemProp: 'bankAccount',
    inputType: 'number',
    maxlength: 30
  },
  {
    type: 'input',
    label: '邮箱地址',
    placeholder: '请输入邮箱地址',
    formItemProp: 'email',
    inputType: 'email',
    maxlength: 50
  },
  {
    type: 'input',
    label: '备注信息',
    placeholder: '请输入备注信息（可选）',
    formItemProp: 'remark',
    maxlength: 200
  }
])

const fullRules = ref({
  type: [{ required: true, message: '请选择发票类型' }],
  title: [
    { required: true, message: '请输入发票抬头' },
    { min: 2, max: 50, message: '发票抬头长度在 2 到 50 个字符' }
  ],
  taxNumber: [
    { required: true, message: '请输入纳税人识别号' },
    { min: 15, max: 20, message: '纳税人识别号长度在 15 到 20 个字符' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
  ],
  email: [
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱地址' }
  ]
})

const handleFullSubmit = async (result) => {
  if (result.valid) {
    fullSubmitLoading.value = true
    try {
      // 模拟提交请求
      await new Promise(resolve => setTimeout(resolve, 2000))
      uni.showToast({
        title: '完整表单提交成功',
        icon: 'success'
      })
      console.log('完整表单提交成功', result.values)
    } catch (error) {
      uni.showToast({
        title: '提交失败',
        icon: 'error'
      })
    } finally {
      fullSubmitLoading.value = false
    }
  } else {
    uni.showToast({
      title: '请检查表单信息',
      icon: 'none'
    })
  }
}

const handleFormChange = (values) => {
  console.log('表单数据变化', values)
}

// 自定义提交按钮
const customInvoiceRef = ref(null)
const customSubmitLoading = ref(false)
const customForm = ref({
  type: '',
  title: '',
  amount: ''
})

const customData = ref([
  {
    type: 'radio',
    label: '发票类型',
    formItemProp: 'type',
    required: true,
    radioLabel: [
      { label: '增值税普通发票', value: '1' },
      { label: '增值税专用发票', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '发票抬头',
    placeholder: '请输入发票抬头',
    formItemProp: 'title',
    required: true
  },
  {
    type: 'input',
    label: '发票金额',
    placeholder: '请输入发票金额',
    formItemProp: 'amount',
    inputType: 'number',
    required: true
  }
])

const customRules = ref({
  type: [{ required: true, message: '请选择发票类型' }],
  title: [{ required: true, message: '请输入发票抬头' }],
  amount: [
    { required: true, message: '请输入发票金额' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入正确的金额格式' }
  ]
})

const handleCustomValidate = (result) => {
  console.log('自定义验证结果', result)
}

const handleReset = () => {
  customInvoiceRef.value?.resetFields()
  uni.showToast({
    title: '表单已重置',
    icon: 'success'
  })
}

const handleCustomSubmit = async () => {
  try {
    await customInvoiceRef.value?.validate()
    customSubmitLoading.value = true
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    uni.showToast({
      title: '自定义提交成功',
      icon: 'success'
    })
    console.log('自定义提交成功', customForm.value)
  } catch (error) {
    uni.showToast({
      title: '验证失败',
      icon: 'error'
    })
  } finally {
    customSubmitLoading.value = false
  }
}

// 动态表单
const dynamicType = ref('personal')
const dynamicForm = ref({
  name: '',
  idCard: '',
  companyName: '',
  taxNumber: ''
})

const dynamicData = computed(() => {
  const baseData = []
  
  if (dynamicType.value === 'personal') {
    baseData.push(
      {
        type: 'input',
        label: '姓名',
        placeholder: '请输入姓名',
        formItemProp: 'name',
        required: true
      },
      {
        type: 'input',
        label: '身份证号',
        placeholder: '请输入身份证号',
        formItemProp: 'idCard',
        required: true,
        maxlength: 18
      }
    )
  } else {
    baseData.push(
      {
        type: 'input',
        label: '公司名称',
        placeholder: '请输入公司名称',
        formItemProp: 'companyName',
        required: true
      },
      {
        type: 'input',
        label: '纳税人识别号',
        placeholder: '请输入纳税人识别号',
        formItemProp: 'taxNumber',
        required: true
      }
    )
  }
  
  return baseData
})

const dynamicRules = computed(() => {
  if (dynamicType.value === 'personal') {
    return {
      name: [{ required: true, message: '请输入姓名' }],
      idCard: [
        { required: true, message: '请输入身份证号' },
        { pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, message: '请输入正确的身份证号' }
      ]
    }
  } else {
    return {
      companyName: [{ required: true, message: '请输入公司名称' }],
      taxNumber: [
        { required: true, message: '请输入纳税人识别号' },
        { min: 15, max: 20, message: '纳税人识别号长度在 15 到 20 个字符' }
      ]
    }
  }
})

const switchDynamicType = (type) => {
  dynamicType.value = type
  // 清空表单数据
  dynamicForm.value = {
    name: '',
    idCard: '',
    companyName: '',
    taxNumber: ''
  }
}

const handleDynamicSubmit = (result) => {
  if (result.valid) {
    uni.showToast({
      title: '动态表单提交成功',
      icon: 'success'
    })
    console.log('动态表单提交成功', result.values)
  }
}

// 表单验证示例
const validateForm = ref({
  email: '',
  phone: '',
  website: '',
  age: '',
  score: ''
})

const validateData = ref([
  {
    type: 'input',
    label: '邮箱地址',
    placeholder: '请输入邮箱地址',
    formItemProp: 'email',
    inputType: 'email',
    required: true
  },
  {
    type: 'input',
    label: '手机号码',
    placeholder: '请输入手机号码',
    formItemProp: 'phone',
    inputType: 'number',
    required: true,
    maxlength: 11
  },
  {
    type: 'input',
    label: '网站地址',
    placeholder: '请输入网站地址',
    formItemProp: 'website'
  },
  {
    type: 'input',
    label: '年龄',
    placeholder: '请输入年龄',
    formItemProp: 'age',
    inputType: 'number'
  },
  {
    type: 'input',
    label: '评分',
    placeholder: '请输入评分（0-100）',
    formItemProp: 'score',
    inputType: 'number'
  }
])

const validateRules = ref({
  email: [
    { required: true, message: '请输入邮箱地址' },
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱地址' }
  ],
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
  ],
  website: [
    { pattern: /^https?:\/\/.+/, message: '请输入正确的网站地址' }
  ],
  age: [
    { pattern: /^[1-9]\d*$/, message: '年龄必须是正整数' },
    { 
      validator: (rule, value) => {
        if (value && (parseInt(value) < 1 || parseInt(value) > 150)) {
          return '年龄必须在 1-150 之间'
        }
        return true
      }
    }
  ],
  score: [
    { pattern: /^\d+(\.\d+)?$/, message: '评分必须是数字' },
    {
      validator: (rule, value) => {
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
          return '评分必须在 0-100 之间'
        }
        return true
      }
    }
  ]
})

const handleValidateSubmit = (result) => {
  if (result.valid) {
    uni.showToast({
      title: '验证表单提交成功',
      icon: 'success'
    })
    console.log('验证表单提交成功', result.values)
  } else {
    uni.showToast({
      title: '验证失败，请检查输入',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
  padding: 40rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .description {
    display: block;
    font-size: 28rpx;
    color: #666;
    line-height: 1.5;
  }
}

.demo-section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    padding: 30rpx 30rpx 10rpx;
  }
  
  .section-description {
    display: block;
    font-size: 26rpx;
    color: #666;
    padding: 0 30rpx 20rpx;
    line-height: 1.4;
  }
}

.custom-actions {
  display: flex;
  gap: 20rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-top: 1rpx solid #eee;
}

.type-selector {
  display: flex;
  gap: 20rpx;
  padding: 0 30rpx 20rpx;
}

.bottom-space {
  height: 200rpx;
}

// 深色模式适配
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #1a1a1a;
  }
  
  .header,
  .demo-section {
    background: #2d2d2d;
  }
  
  .header .title {
    color: #fff;
  }
  
  .header .description,
  .section-description {
    color: #ccc;
  }
  
  .section-title {
    color: #fff;
  }
  
  .custom-actions {
    background: #333;
    border-top-color: #444;
  }
}
</style>