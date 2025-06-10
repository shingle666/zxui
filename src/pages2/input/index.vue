<template>
  <view>
    <zx-navbar title="zx-input 组件使用示例"></zx-navbar>

    <view style="padding: 30rpx;">
      <view>
        <zx-text size="32rpx" :bold="true">基础用法</zx-text>
        <zx-input v-model="inputValue" placeholder="请输入内容" clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">带前后缀图标</zx-text>
        <zx-input v-model="iconInput" placeholder="有前后缀图标" prefixIcon="search" suffixIcon="close"
          @click-prefix-icon="onPrefixClick" @click-suffix-icon="onSuffixClick"></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">密码框</zx-text>
        <zx-input v-model="password" placeholder="请输入密码" password clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">邮箱验证</zx-text>
        <zx-input v-model="email" placeholder="请输入邮箱地址" validate="email" required clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">手机号验证</zx-text>
        <zx-input v-model="phone" placeholder="请输入手机号" validate="mobile" required clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">身份证验证</zx-text>
        <zx-input v-model="idcard" placeholder="请输入身份证号" validate="idcard" required clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">数字验证</zx-text>
        <zx-input v-model="number" placeholder="请输入数字" validate="number" clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">URL验证</zx-text>
        <zx-input v-model="url" placeholder="请输入网址" validate="url" clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">长度验证</zx-text>
        <zx-input v-model="lengthInput" placeholder="最少3个字符，最多10个字符" :minLength="3" :maxLength="10" required
          clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">正则表达式验证</zx-text>
        <zx-input v-model="patternInput" placeholder="只能输入字母和数字" :pattern="/^[a-zA-Z0-9]+$/" clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">自定义验证规则</zx-text>
        <zx-input v-model="customInput" placeholder="用户名（3-20个字符）" :rules="customRules" required clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">实时验证</zx-text>
        <zx-input v-model="realtimeInput" placeholder="实时验证邮箱格式" validate="email" :validateOnInput="true"
          clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">密码强度验证</zx-text>
        <zx-input v-model="strongPassword" placeholder="密码（至少8位，包含大小写字母和数字）" validate="password" password required
          clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">中文验证</zx-text>
        <zx-input v-model="chineseInput" placeholder="只能输入中文" validate="chinese" clearable></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">不同尺寸</zx-text>
        <zx-input v-model="smallInput" size="small" placeholder="小尺寸"></zx-input>
        <zx-input v-model="defaultInput" placeholder="默认尺寸"></zx-input>
        <zx-input v-model="largeInput" size="large" placeholder="大尺寸"></zx-input>
      </view>
      <view>
        <zx-text size="32rpx" :bold="true">手动验证</zx-text>
        <zx-input ref="manualInputRef" v-model="manualInput" placeholder="点击按钮验证" validate="email" clearable></zx-input>
        <zx-button type="primary" @click="validateManual">验证</zx-button>
        <zx-button type="success" @click="clearValidation">清除验证</zx-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
// 引入组件
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxText from '@tanzhenxing/zx-text/zx-text.vue'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'

// 基础用法
const inputValue = ref('');
const iconInput = ref('');
const password = ref('');

// 验证功能
const email = ref('');
const phone = ref('');
const idcard = ref('');
const number = ref('');
const url = ref('');
const lengthInput = ref('');
const patternInput = ref('');
const customInput = ref('');
const realtimeInput = ref('');
const strongPassword = ref('');
const chineseInput = ref('');

// 不同尺寸
const smallInput = ref('');
const defaultInput = ref('');
const largeInput = ref('');

// 手动验证
const manualInput = ref('');
const manualInputRef = ref(null);

// 自定义验证规则
const customRules = [
  {
    validator: (value) => {
      if (value.length < 3) {
        return '用户名至少需要3个字符';
      }
      if (value.length > 20) {
        return '用户名最多20个字符';
      }
      if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        return '用户名只能包含字母、数字和下划线';
      }
      return true;
    }
  }
];

function onPrefixClick() {
  uni.showToast({ title: '点击了前缀图标', icon: 'none' });
}

function onSuffixClick() {
  uni.showToast({ title: '点击了后缀图标', icon: 'none' });
}

// 手动验证
function validateManual() {
  if (manualInputRef.value) {
    const result = manualInputRef.value.validate();
    uni.showToast({
      title: result.valid ? '验证通过' : '验证失败',
      icon: result.valid ? 'success' : 'error'
    });
  }
}

// 清除验证状态
function clearValidation() {
  if (manualInputRef.value) {
    manualInputRef.value.clearValidation();
    uni.showToast({ title: '已清除验证状态', icon: 'none' });
  }
}
</script>
