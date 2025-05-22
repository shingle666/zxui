<template>
  <view class="container">
    <view class="section">
      <view class="section-title">基础表单</view>
      <zx-form 
        ref="basicFormRef"
        :model="basicForm" 
        :rules="basicRules" 
        label-width="180rpx"
      >
        <zx-form-item label="用户名" prop="username">
          <zx-input v-model="basicForm.username" placeholder="请输入用户名"></zx-input>
        </zx-form-item>
        <zx-form-item label="密码" prop="password">
          <zx-input v-model="basicForm.password" type="password" placeholder="请输入密码"></zx-input>
        </zx-form-item>
        <zx-form-item label="邮箱" prop="email">
          <zx-input v-model="basicForm.email" placeholder="请输入邮箱"></zx-input>
        </zx-form-item>
        <zx-form-item>
          <zx-button type="primary" @click="submitBasicForm">提交</zx-button>
          <zx-button @click="resetBasicForm" style="margin-left: 20rpx;">重置</zx-button>
        </zx-form-item>
      </zx-form>
    </view>

    <view class="section">
      <view class="section-title">行内表单</view>
      <zx-form 
        ref="inlineFormRef"
        :model="inlineForm" 
        :rules="inlineRules" 
        inline
      >
        <zx-form-item label="姓名" prop="name">
          <zx-input v-model="inlineForm.name" placeholder="请输入姓名"></zx-input>
        </zx-form-item>
        <zx-form-item label="手机号" prop="phone">
          <zx-input v-model="inlineForm.phone" placeholder="请输入手机号"></zx-input>
        </zx-form-item>
        <zx-form-item>
          <zx-button type="primary" @click="submitInlineForm">查询</zx-button>
        </zx-form-item>
      </zx-form>
    </view>

    <view class="section">
      <view class="section-title">不同对齐方式</view>
      <view class="sub-section">
        <view class="sub-title">顶部对齐 (top)</view>
        <zx-form 
          :model="alignForm" 
          label-position="top"
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="alignForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
          <zx-form-item label="地址">
            <zx-input v-model="alignForm.address" placeholder="请输入地址"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
      <view class="sub-section">
        <view class="sub-title">左对齐 (left)</view>
        <zx-form 
          :model="alignForm" 
          label-position="left"
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="alignForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
          <zx-form-item label="地址">
            <zx-input v-model="alignForm.address" placeholder="请输入地址"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
      <view class="sub-section">
        <view class="sub-title">右对齐 (right)</view>
        <zx-form 
          :model="alignForm" 
          label-position="right"
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="alignForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
          <zx-form-item label="地址">
            <zx-input v-model="alignForm.address" placeholder="请输入地址"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
    </view>

    <view class="section">
      <view class="section-title">表单验证</view>
      <zx-form 
        ref="validateFormRef"
        :model="validateForm" 
        :rules="validateRules" 
        label-width="180rpx"
      >
        <zx-form-item label="用户名" prop="username">
          <zx-input v-model="validateForm.username" placeholder="请输入用户名"></zx-input>
        </zx-form-item>
        <zx-form-item label="年龄" prop="age">
          <zx-input v-model="validateForm.age" type="number" placeholder="请输入年龄"></zx-input>
        </zx-form-item>
        <zx-form-item label="邮箱" prop="email">
          <zx-input v-model="validateForm.email" placeholder="请输入邮箱"></zx-input>
        </zx-form-item>
        <zx-form-item label="手机号" prop="phone">
          <zx-input v-model="validateForm.phone" placeholder="请输入手机号"></zx-input>
        </zx-form-item>
        <zx-form-item>
          <zx-button type="primary" @click="submitValidateForm">提交</zx-button>
          <zx-button @click="resetValidateForm" style="margin-left: 20rpx;">重置</zx-button>
        </zx-form-item>
      </zx-form>
    </view>

    <view class="section">
      <view class="section-title">不同尺寸</view>
      <view class="sub-section">
        <view class="sub-title">大尺寸 (large)</view>
        <zx-form 
          :model="sizeForm" 
          size="large"
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="sizeForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
      <view class="sub-section">
        <view class="sub-title">默认尺寸 (default)</view>
        <zx-form 
          :model="sizeForm" 
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="sizeForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
      <view class="sub-section">
        <view class="sub-title">小尺寸 (small)</view>
        <zx-form 
          :model="sizeForm" 
          size="small"
          label-width="180rpx"
        >
          <zx-form-item label="用户名">
            <zx-input v-model="sizeForm.username" placeholder="请输入用户名"></zx-input>
          </zx-form-item>
        </zx-form>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 基础表单
const basicFormRef = ref(null);
const basicForm = reactive({
  username: '',
  password: '',
  email: ''
});
const basicRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
};

// 行内表单
const inlineFormRef = ref(null);
const inlineForm = reactive({
  name: '',
  phone: ''
});
const inlineRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
};

// 不同对齐方式表单
const alignForm = reactive({
  username: '',
  address: ''
});

// 表单验证
const validateFormRef = ref(null);
const validateForm = reactive({
  username: '',
  age: '',
  email: '',
  phone: ''
});
const validateRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' },
    { validator: (rule, value, callback) => {
      if (value < 18) {
        callback(new Error('年龄必须大于等于18岁'));
      } else {
        callback();
      }
    }, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
  ]
};

// 不同尺寸表单
const sizeForm = reactive({
  username: ''
});

// 表单提交方法
function submitBasicForm() {
  basicFormRef.value.validate((valid, invalidFields) => {
    if (valid) {
      uni.showToast({
        title: '表单验证通过',
        icon: 'success'
      });
      console.log('基础表单数据:', basicForm);
    } else {
      console.log('表单验证失败', invalidFields);
    }
  });
}

function resetBasicForm() {
  basicFormRef.value.resetFields();
}

function submitInlineForm() {
  inlineFormRef.value.validate((valid, invalidFields) => {
    if (valid) {
      uni.showToast({
        title: '表单验证通过',
        icon: 'success'
      });
      console.log('行内表单数据:', inlineForm);
    } else {
      console.log('表单验证失败', invalidFields);
    }
  });
}

function submitValidateForm() {
  validateFormRef.value.validate((valid, invalidFields) => {
    if (valid) {
      uni.showToast({
        title: '表单验证通过',
        icon: 'success'
      });
      console.log('验证表单数据:', validateForm);
    } else {
      console.log('表单验证失败', invalidFields);
    }
  });
}

function resetValidateForm() {
  validateFormRef.value.resetFields();
}
</script>

<style>
.container {
  padding: 30rpx;
}

.section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 20rpx;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6rpx;
  width: 8rpx;
  height: 36rpx;
  background-color: #409eff;
  border-radius: 4rpx;
}

.sub-section {
  margin-bottom: 40rpx;
}

.sub-title {
  font-size: 30rpx;
  margin-bottom: 20rpx;
  color: #606266;
}
</style>
